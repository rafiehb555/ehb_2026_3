import Complaint from '../models/Complaint.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { isConnected } from '../config/db.js';
import { applyPenaltyLadder } from './penaltyService.js';
import { logActivity } from './auditService.js';
import { emit as emitRealtime } from './realtime.js';
import { emit as emitEvent } from './eventBus.js';
import { applyAutoDecision } from './autoDecisionEngine.js';
import { metrics } from '../middleware/metrics.js';

const TIER_SLA_HOURS = { 1: 72, 2: 48, 3: 24, 4: 12, 5: 6, 6: 2 };

function classifyTier(category, amount = 0) {
  if (category === 'fraud') return 6;
  if (category === 'abusive_behavior') return 5;
  if (category === 'refund_dispute' && amount > 500) return 4;
  if (category === 'item_damaged' || category === 'not_as_described') return 3;
  if (category === 'late_delivery') return 2;
  return 1;
}

function nextComplaintNumber() {
  return 'CMP-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export async function fileComplaint({
  filerId,
  againstUserId,
  orderId,
  category,
  summary,
  details,
  evidence,
}) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  if (!category) throw Object.assign(new Error('category required'), { status: 400 });

  let order = null;
  if (orderId) {
    order = await Order.findById(orderId);
    if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  }

  const tier = classifyTier(category, order?.totals?.totalUsd || 0);
  const deadlineMs = (TIER_SLA_HOURS[tier] || 72) * 60 * 60 * 1000;

  const complaint = await Complaint.create({
    complaintNumber: nextComplaintNumber(),
    filerId,
    againstUserId,
    orderId,
    category,
    tier,
    summary,
    details,
    evidence: evidence || [],
    slaDeadlineAt: new Date(Date.now() + deadlineMs),
    status: 'open',
  });

  // Update product/order complaint counters
  if (order) {
    for (const it of order.items || []) {
      await Product.updateOne({ _id: it.productId }, { $inc: { 'stats.complaintCount': 1 } });
    }
  }

  await logActivity({
    actorUserId: filerId,
    action: 'complaint.filed',
    target: 'complaint',
    targetId: complaint._id.toString(),
    after: { tier, category, orderId: orderId || null },
  });

  emitRealtime('/dmo', 'complaint:filed', {
    complaintNumber: complaint.complaintNumber,
    tier,
    category,
  });

  // P4: emit complaint.filed event + auto-decision review of accused user
  metrics.complaintFiled(`T${tier}`);
  await emitEvent('complaint.filed', {
    complaintId: complaint._id.toString(),
    complaintNumber: complaint.complaintNumber,
    filerId: String(filerId),
    againstUserId: String(againstUserId),
    type: `T${tier}`,
    tier,
    category,
    orderId: orderId || null,
    severity: tier >= 5 ? 'critical' : tier >= 3 ? 'high' : 'medium',
  });

  // Auto-decision: trigger penalty review for accused user
  applyAutoDecision({
    user: { id: String(againstUserId), stl: { level: 0 } },
    signals: {},
    complaints: { upheld_30d: 1, upheld_180d: 1 },
  }).catch(() => {});

  return complaint.toObject();
}

export async function listMyComplaints(userId, limit = 50) {
  if (!isConnected()) return [];
  return Complaint.find({ filerId: userId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function listPendingComplaints({ limit = 100 } = {}) {
  if (!isConnected()) return [];
  return Complaint.find({ status: { $in: ['open', 'in_review', 'escalated'] } })
    .sort({ tier: -1, createdAt: 1 })
    .limit(limit)
    .lean();
}

export async function getComplaint(idOrNumber) {
  if (!isConnected()) return null;
  const q = /^[0-9a-f]{24}$/i.test(idOrNumber) ? { _id: idOrNumber } : { complaintNumber: idOrNumber };
  return Complaint.findOne(q).lean();
}

export async function resolveComplaint({ complaintId, reviewerId, action, notes, upheld = true }) {
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) throw Object.assign(new Error('Complaint not found'), { status: 404 });
  if (!['open', 'in_review', 'escalated', 'appealing'].includes(complaint.status)) {
    throw Object.assign(new Error(`Already ${complaint.status}`), { status: 409 });
  }
  complaint.status = upheld ? 'resolved' : 'rejected';
  complaint.resolution = {
    by: reviewerId,
    at: new Date(),
    action: action || (upheld ? 'penalty_applied' : 'dismissed'),
    notes,
  };
  await complaint.save();

  let penaltyResult = null;
  if (upheld && complaint.againstUserId) {
    penaltyResult = await applyPenaltyLadder({
      userId: complaint.againstUserId,
      reason: `Complaint ${complaint.complaintNumber} upheld`,
      complaintId: complaint._id,
      appliedBy: reviewerId,
      tier: complaint.tier,
      category: complaint.category,
    });
  }

  await logActivity({
    actorUserId: reviewerId,
    action: 'complaint.resolved',
    target: 'complaint',
    targetId: complaint._id.toString(),
    after: { upheld, action, penalty: penaltyResult?.action || null },
  });

  emitRealtime('/dmo', 'complaint:resolved', {
    complaintNumber: complaint.complaintNumber,
    upheld,
  });

  // P4: emit complaint.resolved + slashing event if applicable
  await emitEvent('complaint.resolved', {
    complaintId: complaint._id.toString(),
    complaintNumber: complaint.complaintNumber,
    againstUserId: String(complaint.againstUserId),
    outcome: upheld ? 'UPHELD' : 'REJECTED',
    tier: complaint.tier,
    penalty: penaltyResult?.action || null,
  });
  if (upheld && penaltyResult?.action === 'slash') {
    await emitEvent('stl.slashed', {
      userId: String(complaint.againstUserId),
      reason: `complaint_T${complaint.tier}`,
      slash_pct: penaltyResult?.slashPct,
    });
  }

  return { complaint: complaint.toObject(), penalty: penaltyResult };
}

export async function appealComplaint({ complaintId, userId, appealNotes }) {
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) throw Object.assign(new Error('Complaint not found'), { status: 404 });
  if (complaint.status !== 'resolved' && complaint.status !== 'rejected') {
    throw Object.assign(new Error('Only resolved/rejected complaints can be appealed'), { status: 409 });
  }
  complaint.status = 'appealing';
  complaint.appealNotes = appealNotes;
  await complaint.save();
  emitRealtime('/dmo', 'complaint:appealed', { complaintNumber: complaint.complaintNumber });
  return complaint.toObject();
}
