import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "Unnamed Quiz" },
    course: String,
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    untilDate: String,
    points: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    numberOfQuestions: { type: Number, default: 0 },
  },
  { collection: "quizzes" }
);
export default quizSchema;
