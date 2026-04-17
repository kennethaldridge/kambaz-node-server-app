import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuestionsDao(db) {
  const findQuestionsForQuiz = (quizId) =>
    model.find({ quiz: quizId }).sort({ order: 1 });
  const findQuestionById = (questionId) =>
    model.findById(questionId);
  const createQuestion = (question) => {
    const _id = uuidv4();
    return model.create({ ...question, _id });
  };
  const updateQuestion = (questionId, updates) =>
    model.updateOne({ _id: questionId }, { $set: updates });
  const deleteQuestion = (questionId) =>
    model.deleteOne({ _id: questionId });
  const deleteQuestionsForQuiz = (quizId) =>
    model.deleteMany({ quiz: quizId });
  const deleteQuestionsForQuizIds = (quizIds) =>
    model.deleteMany({ quiz: { $in: quizIds } });
  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestionsForQuiz,
    deleteQuestionsForQuizIds,
  };
}
