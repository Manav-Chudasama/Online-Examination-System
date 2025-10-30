import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  percentage: { type: Number, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      chosenOption: { type: Number }, // index of chosen option
      isCorrect: { type: Boolean },
      timeTakenSec: { type: Number },
    },
  ],
  //   encryptedExcelPath: { type: String }, // path to AES-encrypted Excel file
  //   aiFeedback: { type: String }, // personalized feedback by AI
  submittedAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", ResultSchema);

export default Result;
