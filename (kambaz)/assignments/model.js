import mongoose from "mongoose";
import assignmentSchema from "./schema.js";
export default mongoose.model("AssignmentModel", assignmentSchema);
