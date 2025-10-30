import mongoose from "mongoose";

const TestAssignmentSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedAt: { type: Date, default: Date.now }, // when admin assigned the test
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // admin who assigned
  testDate: { type: Date, required: true }, // scheduled date for the test
  startTime: { type: Date, required: true }, // when test becomes available for this student
  endTime: { type: Date, required: true }, // when test auto-closes
  durationMinutes: { type: Number, required: true }, // duration in minutes
  status: {
    type: String,
    enum: ["assigned", "in_progress", "completed", "expired"],
    default: "assigned",
  },
  testStartedAt: { type: Date }, // when student actually started the test
  completedAt: { type: Date }, // when test was completed
});

const TestAssignment = mongoose.model("TestAssignment", TestAssignmentSchema);

export default TestAssignment;
