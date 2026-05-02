// Audit Export Service — Phase 8 Epic F.2
//
// Generates CSV/JSON exports of compliance + financial events for regulator-ready reports.
// MVP: filter ActivityLog by date/action/user/country and emit CSV.

import ActivityLog from '../models/ActivityLog.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import { isConnected } from '../config/db.js';

/** Convert an array of objects to CSV (RFC 4180). */
function toCsv(rows, columns) {
  if (rows.length === 0) return columns.join(',') + '\n';
  const escape = (v) => {
    if (v === null || v === undefined) return '';
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const header = columns.join(',') + '\n';
  const body = rows.map((r) => columns.map((c) => escape(r[c])).join(',')).join('\n');
  return header + body + '\n';
}

/**
 * Export ActivityLog entries.
 * @param {object} filter - { from, to, action, actorUserId, format: 'csv' | 'json' }
 */
export async function exportActivityLog({ from, to, action, actorUserId, format = 'csv' } = {}) {
  if (!isConnected()) return { ok: false, note: 'in-memory' };

  const q = {};
  if (from) q.createdAt = { ...q.createdAt, $gte: new Date(from) };
  if (to) q.createdAt = { ...q.createdAt, $lte: new Date(to) };
  if (action) q.action = action;
  if (actorUserId) q.actorUserId = actorUserId;

  const logs = await ActivityLog.find(q)
    .populate('actorUserId', 'name email')
    .sort({ createdAt: -1 })
    .limit(10_000)
    .lean();

  const rows = logs.map((l) => ({
    timestamp: l.createdAt,
    actorUserId: l.actorUserId?._id || l.actorUserId,
    actorName: l.actorUserId?.name || '',
    actorEmail: l.actorUserId?.email || '',
    action: l.action,
    target: l.target,
    targetId: l.targetId,
    before: l.before,
    after: l.after,
  }));

  if (format === 'json') {
    return { ok: true, data: rows, total: rows.length };
  }
  const csv = toCsv(rows, ['timestamp', 'actorUserId', 'actorName', 'actorEmail', 'action', 'target', 'targetId', 'before', 'after']);
  return { ok: true, csv, total: rows.length, contentType: 'text/csv' };
}

/**
 * Export commission records (financial audit).
 */
export async function exportCommissions({ from, to, type, status, format = 'csv' } = {}) {
  if (!isConnected()) return { ok: false };

  const q = {};
  if (from) q.createdAt = { ...q.createdAt, $gte: new Date(from) };
  if (to) q.createdAt = { ...q.createdAt, $lte: new Date(to) };
  if (type) q.type = type;
  if (status) q.status = status;

  const comms = await AffiliateCommission.find(q)
    .populate('earnerUserId', 'name email')
    .populate('sourceUserId', 'name email')
    .sort({ createdAt: -1 })
    .limit(10_000)
    .lean();

  const rows = comms.map((c) => ({
    timestamp: c.createdAt,
    earnerUserId: c.earnerUserId?._id || c.earnerUserId,
    earnerName: c.earnerUserId?.name || '',
    sourceUserId: c.sourceUserId?._id || c.sourceUserId,
    sourceName: c.sourceUserId?.name || '',
    type: c.type,
    track: c.track,
    level: c.level,
    productPriceUsd: c.productPriceUsd,
    rateApplied: c.rateApplied,
    amountUsd: c.amountUsd,
    industryCode: c.industryCode,
    status: c.status,
    paidAt: c.paidAt,
    reversedAt: c.reversedAt,
    reversedReason: c.reversedReason,
    notes: c.notes,
  }));

  if (format === 'json') {
    return { ok: true, data: rows, total: rows.length };
  }
  const csv = toCsv(rows, [
    'timestamp', 'earnerUserId', 'earnerName', 'sourceUserId', 'sourceName',
    'type', 'track', 'level', 'productPriceUsd', 'rateApplied', 'amountUsd',
    'industryCode', 'status', 'paidAt', 'reversedAt', 'reversedReason', 'notes',
  ]);
  return { ok: true, csv, total: rows.length, contentType: 'text/csv' };
}

/**
 * Generate 80/20 daily report — Phase 8 Epic A.4.
 * Computes % of revenue from external customers vs affiliate-network sales.
 */
export async function generate80_20DailyReport({ days = 1 } = {}) {
  if (!isConnected()) return { ok: false };

  const since = new Date(Date.now() - days * 86400_000);

  const result = await AffiliateCommission.aggregate([
    { $match: { status: 'paid', paidAt: { $gte: since } } },
    {
      $group: {
        _id: null,
        totalCommissionsUsd: { $sum: '$amountUsd' },
        totalDirectUsd: { $sum: { $cond: [{ $eq: ['$type', 'direct'] }, '$amountUsd', 0] } },
        totalLevelUsd: { $sum: { $cond: [{ $eq: ['$type', 'level'] }, '$amountUsd', 0] } },
        totalCount: { $sum: 1 },
      },
    },
  ]);

  const stats = result[0] || { totalCommissionsUsd: 0, totalDirectUsd: 0, totalLevelUsd: 0, totalCount: 0 };

  // Heuristic: external = direct sales (closed by salesperson on real customer)
  // Internal/network = level commissions (cascade)
  // Phase 2: refine by checking buyer ↔ seller relationships
  const externalUsd = stats.totalDirectUsd;
  const internalUsd = stats.totalLevelUsd;
  const total = externalUsd + internalUsd;
  const externalPercent = total > 0 ? +((externalUsd / total) * 100).toFixed(1) : 100;
  const compliant = externalPercent >= 80;

  return {
    ok: true,
    period: { since: since.toISOString(), days },
    totalCommissionsUsd: stats.totalCommissionsUsd,
    totalDirectUsd: externalUsd,
    totalLevelUsd: internalUsd,
    externalPercent,
    threshold: 80,
    compliant,
    alert: !compliant ? `External-customer share ${externalPercent}% < 80% threshold` : null,
    asOf: new Date().toISOString(),
  };
}
