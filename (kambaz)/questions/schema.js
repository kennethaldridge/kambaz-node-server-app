import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    title: { type: String, default: "New Question" },
    points: { type: Number, default: 1 },
    question: { type: String, default: "" },
    choices: [{ text: String, isCorrect: Boolean }],
    correctAnswer: { type: Boolean, default: true },
    correctAnswers: [String],
    order: { type: Number, default: 0 },
  },
  { collection: "questions" }
);
export default questionSchema;
