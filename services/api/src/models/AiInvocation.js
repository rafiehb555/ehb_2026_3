import mongoose from 'mongoose';

const AiInvocationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    service: {
      type: String,
      enum: ['lawyer', 'diagnosis', 'tutor', 'resume', 'business', 'fraud', 'recommend'],
      required: true,
      index: true,
    },
    input: { type: mongoose.Schema.Types.Mixed },
    output: {
      text: String,
      confidence: Number,
      disclaimer: String,
      meta: mongoose.Schema.Types.Mixed,
    },
    flagged: { type: Boolean, default: false, index: true },
    feedback: { type: String, enum: ['up', 'down', null], default: null },
    feedbackReason: String,
  },
  { timestamps: true }
);

AiInvocationSchema.index({ service: 1, createdAt: -1 });
AiInvocationSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.AiInvocation || mongoose.model('AiInvocation', AiInvocationSchema);
