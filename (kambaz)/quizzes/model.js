import mongoose from "mongoose";
import quizSchema from "./schema.js";
export default mongoose.model("QuizModel", quizSchema);
