import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  totalQuestions: { type: Number, default: 0 },
  testDate: { type: Date, required: true },
  durationMinutes: { type: Number, default: 60 },
  encryptionKey: { type: String, required: true }, // AES key for questions
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  createdAt: { type: Date, default: Date.now },
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
