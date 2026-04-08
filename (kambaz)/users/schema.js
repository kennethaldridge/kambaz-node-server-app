import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: String,
    role: { type: String, default: "USER" },
    loginId: String,
    section: String,
    lastActivity: String,
    totalActivity: String,
  },
  { collection: "users" }
);
export default userSchema;
