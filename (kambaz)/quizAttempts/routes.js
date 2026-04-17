import QuizAttemptsDao from "./dao.js";
import QuizzesDao from "../quizzes/dao.js";
import QuestionsDao from "../questions/dao.js";

export default function QuizAttemptRoutes(app, db) {
  const attemptsDao = QuizAttemptsDao(db);
  const quizzesDao = QuizzesDao(db);
  const questionsDao = QuestionsDao(db);

  const findAttemptsForQuiz = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      const { quizId } = req.params;
      const attempts = await attemptsDao.findAttemptsForQuizByUser(quizId, currentUser._id);
      res.json(attempts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const findLatestAttempt = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      const { quizId } = req.params;
      const attempt = await attemptsDao.findLatestAttempt(quizId, currentUser._id);
      res.json(attempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const submitAttempt = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }

      const { quizId } = req.params;
      const userId = currentUser._id;

      const quiz = await quizzesDao.findQuizById(quizId);
      const count = await attemptsDao.countAttempts(quizId, userId);

      if (!quiz.multipleAttempts && count >= 1) {
        res.status(403).json({ message: "No attempts remaining" }); return;
      }
      if (quiz.multipleAttempts && count >= quiz.howManyAttempts) {
        res.status(403).json({ message: "No attempts remaining" }); return;
      }

      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      const questionsMap = {};
      for (const q of questions) {
        questionsMap[q._id] = q;
      }

      const { answers } = req.body;
      let score = 0;
      const gradedAnswers = (answers || []).map(({ question: qId, answer }) => {
        const q = questionsMap[qId];
        if (!q) return { question: qId, answer, isCorrect: false };

        let isCorrect = false;
        if (q.type === "MULTIPLE_CHOICE") {
          const choice = (q.choices || []).find((c) => c.text === answer);
          isCorrect = choice ? choice.isCorrect : false;
        } else if (q.type === "TRUE_FALSE") {
          isCorrect = answer.toLowerCase() === String(q.correctAnswer).toLowerCase();
        } else if (q.type === "FILL_IN_BLANK") {
          isCorrect = (q.correctAnswers || []).some(
            (a) => a.toLowerCase() === (answer || "").toLowerCase()
          );
        }

        if (isCorrect) score += q.points || 0;
        return { question: qId, answer, isCorrect };
      });

      const attempt = await attemptsDao.createAttempt({
        quiz: quizId,
        user: userId,
        answers: gradedAnswers,
        score,
        attemptNumber: count + 1,
        submittedAt: new Date().toISOString(),
      });

      res.json(attempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuiz);
  app.get("/api/quizzes/:quizId/attempts/latest", findLatestAttempt);
  app.post("/api/quizzes/:quizId/attempts", submitAttempt);
}
