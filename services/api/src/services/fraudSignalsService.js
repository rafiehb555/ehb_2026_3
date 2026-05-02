// Fraud Signals Service — Phase 8 Epic B.1 + B.4
//
// Spec: ehb-info/departments/Affiliate.md §13.6.7 (anti-fraud) + Phase 8 architecture
//
// MVP: deterministic signal collection + simple risk scoring.
// Phase 2: ML model consumes these for anomaly detection.

import FraudSignal from '../models/FraudSignal.js';
import DmoReviewQueue from '../models/DmoReviewQueue.js';
import { isConnected } from '../config/db.js';

// ─── RISK THRESHOLDS (admin-tunable in Phase 2) ──────────────────────────

const RISK_THRESHOLDS = {
  autoFlag: 50,    // auto-flag for DMO review
  autoBlock: 80,   // hard block (rare — usually post-review)
};

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Record a fraud signal event.
 * Computes risk score from deterministic flags. Auto-queues for DMO if score ≥ threshold.
 *
 * @param {object} input - { userId, eventType, ipAddress, userAgent, deviceFingerprint, geoCountry, relatedUserId, orderId, sessionId }
 */
export async function recordSignal(input) {
  if (!isConnected()) return { ok: false, note: 'in-memory' };

  const flags = [];
  let riskScore = 0;

  // Deterministic flag computation
  if (input.relatedUserId && input.ipAddress) {
    // Check if related user has same IP (wash-trade signal)
    const sameIpRelated = await FraudSignal.findOne({
      userId: input.relatedUserId,
      ipAddress: input.ipAddress,
      createdAt: { $gte: new Date(Date.now() - 24 * 3600_000) },
    });
    if (sameIpRelated) {
      flags.push('same_ip_as_related_user');
      riskScore += 30;
    }
  }

  // Velocity check — how many signals from this IP in last hour
  if (input.ipAddress) {
    const recentFromIp = await FraudSignal.countDocuments({
      ipAddress: input.ipAddress,
      eventType: input.eventType,
      createdAt: { $gte: new Date(Date.now() - 3600_000) },
    });
    if (recentFromIp >= 20) {
      flags.push('high_velocity_per_ip');
      riskScore += 25;
    }
  }

  // Self-purchase attempt
  if (input.eventType === 'self_purchase_attempt') {
    flags.push('self_purchase');
    riskScore += 15; // not blocking, just signal
  }

  // High-risk countries (proxy: country missing or known high-risk)
  if (input.geoCountry && ['IR', 'KP', 'SY', 'CU'].includes(input.geoCountry)) {
    flags.push('high_risk_country');
    riskScore += 40;
  }

  riskScore = Math.min(riskScore, 100);

  let action = 'allowed';
  if (riskScore >= RISK_THRESHOLDS.autoBlock) action = 'blocked';
  else if (riskScore >= RISK_THRESHOLDS.autoFlag) action = 'queued_for_review';

  const signal = await FraudSignal.create({
    ...input,
    flags,
    riskScore,
    action,
  });

  // Auto-queue to DMO if flagged
  if (action === 'queued_for_review' || action === 'blocked') {
    const severity = riskScore >= 80 ? 'critical' : riskScore >= 65 ? 'high' : 'medium';
    await DmoReviewQueue.create({
      targetUserId: input.userId,
      targetType: 'affiliate',
      targetId: input.userId ? String(input.userId) : null,
      flagReason: flags[0] || 'pattern_anomaly',
      flagSeverity: severity,
      flagDetails: `Risk score ${riskScore}. Flags: ${flags.join(', ')}`,
      relatedSignals: [signal._id],
      status: 'pending',
    });
  }

  return { ok: true, signalId: signal._id, riskScore, flags, action };
}

/**
 * Aggregate signals for a user — used by DMO console + risk dashboards.
 */
export async function getUserSignalSummary(userId) {
  if (!isConnected()) return null;
  const since = new Date(Date.now() - 30 * 86400_000);
  const result = await FraudSignal.aggregate([
    { $match: { userId, createdAt: { $gte: since } } },
    {
      $group: {
        _id: null,
        totalSignals: { $sum: 1 },
        avgRiskScore: { $avg: '$riskScore' },
        maxRiskScore: { $max: '$riskScore' },
        flaggedCount: { $sum: { $cond: [{ $eq: ['$action', 'queued_for_review'] }, 1, 0] } },
        blockedCount: { $sum: { $cond: [{ $eq: ['$action', 'blocked'] }, 1, 0] } },
      },
    },
  ]);
  return result[0] || { totalSignals: 0, avgRiskScore: 0, maxRiskScore: 0, flaggedCount: 0, blockedCount: 0 };
}

/** List flagged DMO queue items for admin console. */
export async function listDmoQueue({ status = 'pending', limit = 50 } = {}) {
  if (!isConnected()) return [];
  return DmoReviewQueue.find({ status })
    .populate('targetUserId', 'name email')
    .populate('relatedSignals')
    .sort({ flagSeverity: -1, createdAt: -1 })
    .limit(limit)
    .lean();
}

/** Resolve a DMO queue item with action. */
export async function resolveDmoQueueItem({ queueId, reviewerId, resolution, notes }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const item = await DmoReviewQueue.findById(queueId);
  if (!item) throw Object.assign(new Error('Queue item not found'), { status: 404 });

  item.status = resolution === 'clear' ? 'resolved_clear' : 'resolved_action';
  item.resolvedAt = new Date();
  item.resolvedBy = reviewerId;
  item.resolution = resolution;
  item.resolutionNotes = notes;
  await item.save();

  return { ok: true, queueId, resolution };
}
