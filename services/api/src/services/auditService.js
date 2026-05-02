import ActivityLog from '../models/ActivityLog.js';
import { isConnected } from '../config/db.js';

const memLog = [];

export async function logActivity({ actorUserId, action, target, targetId, before, after, ip, userAgent, meta }) {
  const entry = {
    actorUserId,
    action,
    target,
    targetId,
    before,
    after,
    ip,
    userAgent,
    meta,
    ts: new Date(),
  };
  if (isConnected()) {
    try {
      await ActivityLog.create(entry);
    } catch (e) {
      console.warn('[audit] failed to write log:', e.message);
    }
  } else {
    memLog.push(entry);
    if (memLog.length > 1000) memLog.shift(); // cap
  }
  return entry;
}

export async function listActivity({ actorUserId, action, target, limit = 100 } = {}) {
  if (isConnected()) {
    const q = {};
    if (actorUserId) q.actorUserId = actorUserId;
    if (action) q.action = action;
    if (target) q.target = target;
    return ActivityLog.find(q).sort({ createdAt: -1 }).limit(limit).lean();
  }
  return memLog.slice(-limit).reverse();
}
