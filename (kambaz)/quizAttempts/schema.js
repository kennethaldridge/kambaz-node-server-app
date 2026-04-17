import mongoose from "mongoose";
const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,
    user: String,
    answers: [{ question: String, answer: String, isCorrect: Boolean }],
    score: Number,
    attemptNumber: Number,
    submittedAt: String,
  },
  { collection: "quizAttempts" }
);
export default quizAttemptSchema;
