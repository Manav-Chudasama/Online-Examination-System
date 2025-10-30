import mongoose from "mongoose";

const QuestionSubSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  encryptedQuestion: { type: String, required: true },
  encryptedOptions: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const QuestionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  subject: { type: String, required: true },
  questions: [QuestionSubSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
