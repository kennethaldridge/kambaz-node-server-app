import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao(db) {
  const findQuizzesForCourse = (courseId) =>
    model.find({ course: courseId });
  const findQuizById = (quizId) =>
    model.findById(quizId);
  const createQuiz = (quiz) => {
    const _id = uuidv4();
    return model.create({ ...quiz, _id });
  };
  const updateQuiz = (quizId, quizUpdates) =>
    model.updateOne({ _id: quizId }, { $set: quizUpdates });
  const deleteQuiz = (quizId) =>
    model.deleteOne({ _id: quizId });
  const deleteQuizzesForCourse = (courseId) =>
    model.deleteMany({ course: courseId });
  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    deleteQuizzesForCourse,
  };
}
