import mongoose from 'mongoose';

const CrbAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'CrbExam', required: true },
    examCode: String,
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    answers: [Number], // index per question
    scorePct: Number,
    passed: Boolean,
    levelAwarded: Number,
    certificateHash: String,
  },
  { timestamps: true }
);

CrbAttemptSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.CrbAttempt || mongoose.model('CrbAttempt', CrbAttemptSchema);
