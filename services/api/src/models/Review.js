import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', index: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    buyerStlTier: { type: Number, min: 1, max: 10 }, // snapshot — for segmented display
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: String,
    body: String,
    verified: { type: Boolean, default: true },
    flagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ sellerId: 1, createdAt: -1 });
ReviewSchema.index({ buyerId: 1, orderId: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
