import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    prompt: String,
    options: [String],
    correctIndex: Number,
    explanation: String,
  },
  { _id: true }
);

const CrbExamSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true }, // e.g. "CRB-MED-L3-MCQ"
    title: String,
    industry: { type: String, default: 'GSM' }, // GSM / WMS / OLS / HPS / JPS
    type: { type: String, enum: ['mcq', 'practical', 'video'], default: 'mcq' },
    levelTarget: { type: Number, min: 1, max: 10 },
    passPct: { type: Number, default: 70 },
    durationMin: { type: Number, default: 30 },
    questions: [QuestionSchema],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CrbExam || mongoose.model('CrbExam', CrbExamSchema);
