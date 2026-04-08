import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: String,
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
    points: Number,
    date_available: String,
    time_available: String,
    date_due: String,
    time_due: String,
    dt_available: String,
    dt_due: String,
    group: String,
    display_grade: String,
    submission_type: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;
