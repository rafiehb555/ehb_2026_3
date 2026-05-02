// Order Service — cart → order → escrow → delivery → settlement.

import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { validateProductChain } from './stlService.js';
import { lockEhbgc, unlockEhbgc } from './walletService.js';
import { settleCommission } from './commissionService.js';
import { distributeCommissions as distributeAffiliateCommissions } from './affiliateService.js';
import { anchor } from './blockchainService.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { emit as emitRealtime } from './realtime.js';
import { emit as emitEvent } from './eventBus.js';
import { applyAutoDecision } from './autoDecisionEngine.js';
import { scanAndAlert } from './fraudDetection.js';

function nextOrderNumber() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function createOrder({ buyerId, items, deliveryAddress }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  if (!items?.length) throw Object.assign(new Error('items required'), { status: 400 });

  const buyer = await User.findById(buyerId);
  if (!buyer) throw Object.assign(new Error('Buyer not found'), { status: 404 });

  // Resolve products + compute totals + MIN-chain per item
  const resolved = [];
  let subtotal = 0;
  let minChainLevel = 10;
  let blockingLayer = null;

  for (const it of items) {
    const product = await Product.findById(it.productId);
    if (!product) throw Object.assign(new Error(`Product ${it.productId} not found`), { status: 404 });
    if (product.status !== 'active') throw Object.assign(new Error(`Product ${product.title} not active`), { status: 409 });
    if (product.stock < (it.quantity || 1)) {
      throw Object.assign(new Error(`Insufficient stock for ${product.title}`), { status: 409 });
    }

    const seller = await User.findById(product.sellerId).select('stl');
    const sellerStl = seller?.stl?.level || 1;

    const chain = validateProductChain({
      productSTL: product.productStl,
      sellerSTL: sellerStl,
      companySTL: 8,
      ownerSTL: sellerStl,
    });

    if (chain.finalStl < minChainLevel) {
      minChainLevel = chain.finalStl;
      blockingLayer = chain.blockingLayer;
    }

    const qty = Math.max(1, it.quantity || 1);
    const sub = product.priceUsd * qty;
    subtotal += sub;

    resolved.push({
      productId: product._id,
      sellerId: product.sellerId,
      title: product.title,
      unitPriceUsd: product.priceUsd,
      quantity: qty,
      subtotalUsd: sub,
      productStl: product.productStl,
      sellerStl,
    });
  }

  const shipping = 0; // Phase 2 simple: no shipping calc
  const platformFee = subtotal * 0.02;
  const total = subtotal + shipping;

  const orderNumber = nextOrderNumber();
  const order = await Order.create({
    orderNumber,
    buyerId,
    items: resolved,
    totals: {
      subtotalUsd: subtotal,
      shippingUsd: shipping,
      platformFeeUsd: platformFee,
      totalUsd: total,
    },
    status: 'pending',
    finalStl: minChainLevel,
    blockingLayer,
    delivery: { address: deliveryAddress },
    timeline: [{ at: new Date(), event: 'created', by: String(buyerId) }],
  });

  await logActivity({
    actorUserId: buyerId,
    action: 'order.created',
    target: 'order',
    targetId: order._id.toString(),
    after: { orderNumber, total, items: resolved.length },
  });

  emitRealtime('/orders', 'order:placed', { orderNumber, total, buyerId });

  // P4: emit domain event + run fraud scan
  await emitEvent('order.created', {
    orderId: order._id.toString(),
    orderNumber,
    buyerId: String(buyerId),
    industry: resolved[0]?.industry || 'GSM',
    amount: total,
  });
  scanAndAlert({ userId: String(buyerId), signals: { orders_last_hour: 1 } }).catch(() => {});

  return order.toObject();
}

/** Lock escrow (EHBGC-simulated) → mark paid */
export async function payOrder(orderId, buyerId) {
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (String(order.buyerId) !== String(buyerId)) {
    throw Object.assign(new Error('Forbidden'), { status: 403 });
  }
  if (order.status !== 'pending') throw Object.assign(new Error(`Already ${order.status}`), { status: 409 });

  try {
    await lockEhbgc({
      userId: buyerId,
      amount: order.totals.totalUsd, // simplified: 1 EHBGC = 1 USD
      purpose: 'escrow_order',
      referenceId: order.orderNumber,
    });
  } catch (e) {
    // degrade gracefully — mark paid with note
    console.warn('[order] wallet lock failed (stubbed):', e.message);
  }

  order.status = 'paid';
  order.escrow = { locked: true, amountUsd: order.totals.totalUsd, lockedAt: new Date() };
  order.timeline.push({ at: new Date(), event: 'paid', by: String(buyerId) });
  await order.save();
  emitRealtime('/orders', 'order:paid', { orderNumber: order.orderNumber });
  return order.toObject();
}

export async function markReady(orderId, sellerId) {
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  const hasItems = order.items.some((i) => String(i.sellerId) === String(sellerId));
  if (!hasItems) throw Object.assign(new Error('Not your order'), { status: 403 });
  if (!['paid', 'ready'].includes(order.status)) {
    throw Object.assign(new Error(`Cannot mark ready from ${order.status}`), { status: 409 });
  }
  order.status = 'ready';
  order.timeline.push({ at: new Date(), event: 'ready', by: String(sellerId) });
  await order.save();
  emitRealtime('/orders', 'order:ready', { orderNumber: order.orderNumber });
  return order.toObject();
}

export async function confirmDelivery(orderId, buyerId) {
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (String(order.buyerId) !== String(buyerId)) throw Object.assign(new Error('Forbidden'), { status: 403 });
  if (!['delivered', 'in_transit', 'assigned', 'ready'].includes(order.status)) {
    throw Object.assign(new Error(`Cannot confirm from ${order.status}`), { status: 409 });
  }

  order.status = 'confirmed';
  order.escrow.releasedAt = new Date();
  order.timeline.push({ at: new Date(), event: 'confirmed', by: String(buyerId) });

  // Release escrow (simulated — real payment provider would trigger payout)
  try {
    await unlockEhbgc({
      userId: buyerId,
      amount: order.totals.totalUsd,
      referenceId: order.orderNumber,
    });
  } catch {}

  // Commission settlement 40/25/20/15 + rider 10% + EHB 10% + seller 70%
  const settlement = await settleCommission(order);
  order.commissionSettled = true;
  order.commissionBreakdown = settlement;
  await order.save();

  // Affiliate distribution — v3.2-MVP Track A 2-level cascade (L1 3% + L2 1.5% of price)
  // + First Sale Bonus + Fast Sale Bonus tracker. Spec: Affiliate.md §12.2.
  // (Backward-compat alias: distributeCommissions === processProductOrder in affiliateService.)
  try {
    const affResult = await distributeAffiliateCommissions(order);
    if (affResult.distributed > 0) {
      console.log(`[order] Affiliate v3.2: distributed ${affResult.distributed} commissions, $${affResult.totalUsd?.toFixed(2)}`);
    }
  } catch (e) {
    console.warn('[order] affiliate distribution failed:', e.message);
  }

  // Anchor order completion on chain
  try {
    await anchor({
      targetType: 'commission_settlement',
      targetId: order.orderNumber,
      payload: { total: order.totals.totalUsd, settlement },
    });
  } catch {}

  await logActivity({
    actorUserId: buyerId,
    action: 'order.confirmed',
    target: 'order',
    targetId: order._id.toString(),
    after: { orderNumber: order.orderNumber, settlement },
  });

  emitRealtime('/orders', 'order:confirmed', {
    orderNumber: order.orderNumber,
    total: order.totals.totalUsd,
  });

  // P4: emit settled event → triggers STL recompute via subscriptions + auto-decision
  await emitEvent('order.settled', {
    orderId: order._id.toString(),
    orderNumber: order.orderNumber,
    buyerId: String(order.buyerId),
    sellerId: String(order.sellerId),
    industry: order.items?.[0]?.industry || 'GSM',
    amount: order.totals.totalUsd,
    settlement,
  });
  // Auto-decision: trigger visibility / penalty review post-settlement
  applyAutoDecision({
    user: { id: String(order.sellerId), stl: { level: order.finalStl || 1 } },
    signals: {},
    complaints: { upheld_30d: 0, upheld_180d: 0 },
  }).catch(() => {});

  return order.toObject();
}

export async function cancelOrder(orderId, userId) {
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (order.status === 'confirmed' || order.status === 'refunded') {
    throw Object.assign(new Error(`Cannot cancel ${order.status}`), { status: 409 });
  }
  order.status = 'cancelled';
  order.timeline.push({ at: new Date(), event: 'cancelled', by: String(userId) });
  if (order.escrow?.locked) {
    try {
      await unlockEhbgc({
        userId: order.buyerId,
        amount: order.totals.totalUsd,
        referenceId: order.orderNumber,
      });
    } catch {}
  }
  await order.save();
  emitRealtime('/orders', 'order:cancelled', { orderNumber: order.orderNumber });
  return order.toObject();
}

export async function listMyOrders(buyerId, limit = 50) {
  if (!isConnected()) return [];
  return Order.find({ buyerId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function listSellerOrders(sellerId, limit = 50) {
  if (!isConnected()) return [];
  return Order.find({ 'items.sellerId': sellerId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function getOrder(orderId) {
  if (!isConnected()) return null;
  if (mongoose.isValidObjectId(orderId)) {
    return Order.findById(orderId).lean();
  }
  return Order.findOne({ orderNumber: orderId }).lean();
}
