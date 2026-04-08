import mongoose from "mongoose";
import enrollmentSchema from "./schema.js";
export default mongoose.model("EnrollmentModel", enrollmentSchema);
