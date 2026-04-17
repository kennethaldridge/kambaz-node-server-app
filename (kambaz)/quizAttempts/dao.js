import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao(db) {
  const findAttemptsForQuizByUser = (quizId, userId) =>
    model.find({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });
  const findLatestAttempt = (quizId, userId) =>
    model.findOne({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });
  const createAttempt = (attempt) => {
    const _id = uuidv4();
    return model.create({ ...attempt, _id });
  };
  const countAttempts = (quizId, userId) =>
    model.countDocuments({ quiz: quizId, user: userId });
  const deleteAttemptsForQuiz = (quizId) =>
    model.deleteMany({ quiz: quizId });
  const deleteAttemptsForQuizIds = (quizIds) =>
    model.deleteMany({ quiz: { $in: quizIds } });
  return {
    findAttemptsForQuizByUser,
    findLatestAttempt,
    createAttempt,
    countAttempts,
    deleteAttemptsForQuiz,
    deleteAttemptsForQuizIds,
  };
}
