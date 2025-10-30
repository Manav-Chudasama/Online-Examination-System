import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["superadmin","admin", "teacher", "student"], required: true },
  studentId: { type: String }, // for students only
  subjects: [{ type: String }], // subjects handled (for teachers)
  assignedTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }], // for students
  createdTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }], // for teachers
  dateJoined: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

const User = mongoose.model("User", UserSchema);

export default User;
