import QuestionsDao from "./dao.js";

export default function QuestionRoutes(app, db) {
  const dao = QuestionsDao(db);

  const findQuestionsForQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const questions = await dao.findQuestionsForQuiz(quizId);
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createQuestion = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { quizId } = req.params;
      const question = { ...req.body, quiz: quizId };
      const newQuestion = await dao.createQuestion(question);
      res.json(newQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const findQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;
      const question = await dao.findQuestionById(questionId);
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { questionId } = req.params;
      const status = await dao.updateQuestion(questionId, req.body);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { questionId } = req.params;
      const status = await dao.deleteQuestion(questionId);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.get("/api/questions/:questionId", findQuestionById);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
}
