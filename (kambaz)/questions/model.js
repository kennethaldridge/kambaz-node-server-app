import mongoose from "mongoose";
import questionSchema from "./schema.js";
export default mongoose.model("QuestionModel", questionSchema);
