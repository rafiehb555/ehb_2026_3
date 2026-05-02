import Review from '../models/Review.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { recomputeProductStats } from './gosellrService.js';
import { logActivity } from './auditService.js';

export async function postReview({ orderId, buyerId, productId, sellerId, rating, title, body }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (String(order.buyerId) !== String(buyerId)) throw Object.assign(new Error('Forbidden'), { status: 403 });
  if (order.status !== 'confirmed') throw Object.assign(new Error('Can review only confirmed orders'), { status: 409 });

  const buyer = await User.findById(buyerId).select('stl');
  const review = await Review.create({
    orderId,
    productId,
    sellerId,
    buyerId,
    buyerStlTier: buyer?.stl?.level || 1,
    rating: Math.max(1, Math.min(5, Math.round(rating))),
    title,
    body,
    verified: true,
  });

  if (productId) await recomputeProductStats(productId);
  await logActivity({
    actorUserId: buyerId,
    action: 'review.posted',
    target: 'product',
    targetId: String(productId || sellerId),
    after: { rating, orderId },
  });
  return review.toObject();
}

export async function listProductReviews(productId, { limit = 50 } = {}) {
  if (!isConnected()) return [];
  return Review.find({ productId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function listSellerReviews(sellerId, { limit = 50 } = {}) {
  if (!isConnected()) return [];
  return Review.find({ sellerId }).sort({ createdAt: -1 }).limit(limit).lean();
}
