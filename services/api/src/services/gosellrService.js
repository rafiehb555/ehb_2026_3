import Product from '../models/Product.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import { validateProductChain } from './stlService.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

/** STL-weighted ranking score for sort. */
export function rankingScore(p) {
  const stl = p.productStl || 5;
  const rating = p.stats?.ratingAvg || 0;
  const complaints = p.stats?.complaintCount || 0;
  const orders = p.stats?.orders || 0;
  const speedHr = p.stats?.deliverySpeedHours || 24;
  // higher STL + higher rating + more orders + faster delivery; fewer complaints
  return (
    stl * 10 + rating * 15 - complaints * 5 + Math.min(orders, 500) * 0.05 + (48 / Math.max(speedHr, 1))
  );
}

export async function listProducts({ q, category, minStl, sellerId, limit = 50, sort = 'rank' }) {
  if (!isConnected()) return [];
  const filter = { status: 'active' };
  if (category) filter.category = category;
  if (sellerId) filter.sellerId = sellerId;
  if (minStl) filter.productStl = { $gte: minStl };
  if (q) filter.title = { $regex: q, $options: 'i' };
  const docs = await Product.find(filter).limit(limit).lean();
  if (sort === 'rank') {
    docs.sort((a, b) => rankingScore(b) - rankingScore(a));
  } else if (sort === 'price_asc') {
    docs.sort((a, b) => a.priceUsd - b.priceUsd);
  } else if (sort === 'price_desc') {
    docs.sort((a, b) => b.priceUsd - a.priceUsd);
  } else if (sort === 'newest') {
    docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return docs;
}

export async function getProduct(slugOrId) {
  if (!isConnected()) return null;
  const q = mongoose_isId(slugOrId)
    ? { $or: [{ _id: slugOrId }, { slug: slugOrId }] }
    : { slug: slugOrId };
  const p = await Product.findOne(q).lean();
  if (!p) return null;
  const seller = await User.findById(p.sellerId).select('name email stl pss crb').lean();
  const chain = validateProductChain({
    productSTL: p.productStl,
    sellerSTL: seller?.stl?.level || 1,
    companySTL: 8, // company STL stub — Phase 3 introduces Company model
    ownerSTL: seller?.stl?.level || 1,
  });
  const recentReviews = await Review.find({ productId: p._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  return { ...p, seller, chain, recentReviews };
}

export async function createProduct({ sellerId, title, description, category, priceUsd, stock, productStl, images = [], tags = [] }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const seller = await User.findById(sellerId);
  if (!seller) throw Object.assign(new Error('Seller not found'), { status: 404 });
  if ((seller.stl?.level || 0) < 4) {
    throw Object.assign(new Error('Seller STL must be L4+ to list products'), { status: 403 });
  }
  const slug = slugify(title) + '-' + Math.random().toString(36).slice(2, 6);
  const p = await Product.create({
    sellerId,
    title,
    slug,
    description,
    category,
    priceUsd,
    stock: stock ?? 1,
    productStl: Math.max(1, Math.min(10, productStl || 5)),
    images,
    tags,
  });
  await logActivity({
    actorUserId: sellerId,
    action: 'product.created',
    target: 'product',
    targetId: p._id.toString(),
    after: { title, priceUsd, productStl: p.productStl },
  });
  return p.toObject();
}

export async function getSellerStorefront(sellerId) {
  if (!isConnected()) return null;
  const seller = await User.findById(sellerId).select('name email stl pss crb').lean();
  if (!seller) return null;
  const products = await Product.find({ sellerId, status: 'active' }).lean();
  const reviewAgg = await Review.aggregate([
    { $match: { sellerId: seller._id } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  return {
    seller,
    products,
    aggregate: reviewAgg[0] || { avg: 0, count: 0 },
  };
}

export async function recomputeProductStats(productId) {
  if (!isConnected()) return;
  const agg = await Review.aggregate([
    { $match: { productId: toObjectId(productId) } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (agg[0]) {
    await Product.updateOne(
      { _id: productId },
      {
        'stats.ratingAvg': Math.round(agg[0].avg * 100) / 100,
        'stats.ratingCount': agg[0].count,
      }
    );
  }
}

function slugify(s) {
  return (s || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

function mongoose_isId(v) {
  return /^[0-9a-f]{24}$/i.test(String(v || ''));
}

function toObjectId(id) {
  // lazy import to avoid circular deps in tests
  const mongoose = require('mongoose');
  return new mongoose.Types.ObjectId(id);
}
