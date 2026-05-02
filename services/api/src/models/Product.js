import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    category: { type: String, index: true },
    industry: { type: String, default: 'GSM' }, // GSM, WMS, HPS, OLS, etc.
    priceUsd: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    images: [String],
    stock: { type: Number, default: 0 },
    productStl: { type: Number, default: 5, min: 1, max: 10 }, // per-product STL input
    minBuyerStl: { type: Number, default: 1 }, // buyer STL gate
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'flagged', 'removed'],
      default: 'active',
      index: true,
    },
    stats: {
      views: { type: Number, default: 0 },
      orders: { type: Number, default: 0 },
      ratingAvg: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 },
      complaintCount: { type: Number, default: 0 },
      deliverySpeedHours: { type: Number, default: 24 }, // rolling avg
    },
    tags: [String],
    franchiseZone: String, // e.g. city/area for geo-ranking
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ sellerId: 1, status: 1 });
ProductSchema.index({ 'stats.ratingAvg': -1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
