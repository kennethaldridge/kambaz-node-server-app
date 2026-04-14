import QuizzesDao from "./dao.js";

export default function QuizRoutes(app, db) {
  const dao = QuizzesDao(db);

  const findQuizzesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizzes = await dao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createQuizForCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { courseId } = req.params;
      const quiz = { ...req.body, course: courseId };
      const newQuiz = await dao.createQuiz(quiz);
      res.json(newQuiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const findQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await dao.findQuizById(quizId);
      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { quizId } = req.params;
      const status = await dao.updateQuiz(quizId, req.body);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) { res.sendStatus(401); return; }
      if (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
        res.sendStatus(403); return;
      }
      const { quizId } = req.params;
      const status = await dao.deleteQuiz(quizId);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
