import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    category: {
      type: String,
      enum: ['order', 'delivery', 'franchise', 'complaint', 'stl', 'ai', 'system', 'wallet'],
      required: true,
      index: true,
    },
    title: String,
    body: String,
    severity: { type: String, enum: ['info', 'warn', 'critical'], default: 'info' },
    link: String,
    meta: mongoose.Schema.Types.Mixed,
    read: { type: Boolean, default: false, index: true },
    readAt: Date,
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
