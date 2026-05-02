// Penalty Service — progressive ladder:
//  1st upheld complaint            → warning
//  2nd upheld in 3 weeks           → fine (scaled by tier)
//  3rd upheld in 3 weeks           → STL -2
//  fraud category (tier 6)         → STL = 1 (FREE) + suspend
//  accumulated L1 > 30 days        → terminate

import Penalty from '../models/Penalty.js';
import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { emit as emitRealtime } from './realtime.js';

const THREE_WEEKS_MS = 21 * 24 * 60 * 60 * 1000;

export async function applyPenaltyLadder({ userId, reason, complaintId, appliedBy, tier = 1, category }) {
  if (!isConnected()) return null;
  const user = await User.findById(userId);
  if (!user) return null;

  // Count recent upheld complaints against this user
  const recentCount = await Complaint.countDocuments({
    againstUserId: userId,
    status: 'resolved',
    createdAt: { $gte: new Date(Date.now() - THREE_WEEKS_MS) },
  });

  let action = 'warning';
  let stlDrop = 0;
  let fineUsd = 0;

  if (category === 'fraud' || tier === 6) {
    action = 'stl_drop';
    stlDrop = (user.stl?.level || 1) - 1; // drop to L1
    if (stlDrop < 0) stlDrop = 0;
  } else if (recentCount >= 3) {
    action = 'stl_drop';
    stlDrop = 2;
  } else if (recentCount === 2) {
    action = 'fine';
    fineUsd = [0, 10, 25, 50, 100, 200, 500][tier] || 50;
  } else {
    action = 'warning';
  }

  const penalty = await Penalty.create({
    userId,
    reason,
    action,
    severity: tier,
    complaintId,
    appliedBy,
    stlDrop: stlDrop || undefined,
    fineUsd: fineUsd || undefined,
  });

  if (stlDrop > 0) {
    const newLevel = Math.max(1, (user.stl?.level || 1) - stlDrop);
    await User.updateOne({ _id: userId }, { $set: { 'stl.level': newLevel } });
    emitRealtime('/dmo', 'stl:drop-alert', {
      userId: String(userId),
      newLevel,
      droppedBy: stlDrop,
      reason,
    });
  }

  await logActivity({
    actorUserId: appliedBy,
    action: `penalty.${action}`,
    target: 'user',
    targetId: String(userId),
    after: { reason, stlDrop, fineUsd },
  });

  return penalty.toObject();
}

export async function listMyPenalties(userId) {
  if (!isConnected()) return [];
  return Penalty.find({ userId }).sort({ createdAt: -1 }).lean();
}
