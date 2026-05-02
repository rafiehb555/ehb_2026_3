/**
 * DMO Control Center — admin endpoints (DB-backed via DmoQueueItem model).
 *
 * Mounted at /api/dmo/control.
 *
 * Capabilities:
 *   - Unified queue (complaints + applications + flagged users) — paginated
 *   - Filters (industry, country, STL level, severity, type, status)
 *   - Atomic actions: approve, reject, escalate, penalize
 *   - Rule: DMO only intervenes on fraud / dispute / violation
 *   - Audit log: every action appended to history[]
 *
 * Audience: DMO_ANALYST + DMO_MANAGER + DMO_DIRECTOR + SUPER_ADMIN
 */

import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { metrics } from '../middleware/metrics.js';

// Lazy-load models so the route file doesn't crash if Mongo is offline.
let DmoQueueItem = null;
async function getModel() {
  if (DmoQueueItem) return DmoQueueItem;
  const mod = await import('../models/index.js');
  DmoQueueItem = mod.default?.DmoQueueItem || mod.DmoQueueItem;
  return DmoQueueItem;
}

const router = Router();

// =====================================================================
// RBAC — only DMO staff
// =====================================================================
const DMO_ROLES = ['DMO_STAFF', 'PSS_OFFICER', 'CRB_OFFICER', 'DMO_SENIOR', 'DMO_COUNCIL', 'FOUNDER'];

function requireDmoStaff(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'EHB-AUTH-1003', message: 'Authentication required' });
  if (!DMO_ROLES.includes(req.user.role)) {
    return res.status(403).json({ error: 'EHB-AUTH-1008', message: 'DMO staff access required', current_role: req.user.role });
  }
  next();
}

// =====================================================================
// DMO Trigger Rules — when does DMO intervene?
// =====================================================================
const DMO_TRIGGER_REASONS = ['fraud', 'dispute', 'violation'];

function shouldDmoIntervene({ reason, severity, autoFlags = [] }) {
  if (DMO_TRIGGER_REASONS.includes(reason)) return true;
  if (severity === 'critical' || severity === 'high') return true;
  if (autoFlags.includes('fraud_detected') || autoFlags.includes('multi_complaint')) return true;
  return false;
}

// =====================================================================
// Endpoints
// =====================================================================

/**
 * GET /api/dmo/control/queue
 *
 * Query: industry, country, type, severity, status, stl_min, stl_max,
 *        page (default 1), limit (default 20), sort (default -createdAt)
 */
router.get('/queue', requireAuth, requireDmoStaff, async (req, res) => {
  const Model = await getModel();
  if (!Model) return res.status(503).json({ error: 'EHB-SYS-90002', message: 'DB unavailable' });

  const { industry, country, type, severity, status } = req.query;
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(100, parseInt(req.query.limit || '20', 10));
  const skip = (page - 1) * limit;
  const sort = req.query.sort || '-createdAt';

  const filter = {};
  if (industry) filter.industry = industry;
  if (country) filter.country = country;
  if (type) filter.type = type;
  if (severity) filter.severity = severity;
  if (status) filter.status = status;
  if (req.query.stl_min || req.query.stl_max) {
    filter['payload.user_stl'] = {};
    if (req.query.stl_min) filter['payload.user_stl'].$gte = Number(req.query.stl_min);
    if (req.query.stl_max) filter['payload.user_stl'].$lte = Number(req.query.stl_max);
  }

  const [items, total] = await Promise.all([
    Model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);

  res.json({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    items,
    filters_applied: { industry, country, type, severity, status, stl_min: req.query.stl_min, stl_max: req.query.stl_max },
  });
});

/**
 * POST /api/dmo/control/items — create a queue item.
 * Caller verifies severity meets DMO threshold; otherwise handled by department.
 */
router.post('/items', requireAuth, requireDmoStaff, async (req, res) => {
  const Model = await getModel();
  if (!Model) return res.status(503).json({ error: 'EHB-SYS-90002' });

  const { type, reason, severity = 'medium', industry, country, payload, autoFlags, userId } = req.body || {};
  if (!type || !reason || !payload) {
    return res.status(400).json({ error: 'EHB-VALID-9001', message: 'Required: type, reason, payload' });
  }
  const intervene = shouldDmoIntervene({ reason, severity, autoFlags });
  if (!intervene) {
    return res.json({ accepted: false, message: 'Item does not meet DMO intervention rules — handled by department.' });
  }

  const itemId = `dmo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const created = await Model.create({
    itemId, type, reason, severity, industry, country, payload, autoFlags, userId,
  });

  metrics.complaintFiled(type);
  res.status(201).json({ accepted: true, item: created });
});

/**
 * POST /api/dmo/control/:itemId/action — apply a decision atomically.
 *
 * Body: { action: "approve" | "reject" | "escalate" | "penalize", reason, slash_pct?, escalate_to? }
 */
router.post('/:itemId/action', requireAuth, requireDmoStaff, async (req, res) => {
  const Model = await getModel();
  if (!Model) return res.status(503).json({ error: 'EHB-SYS-90002' });

  const { action, reason, slash_pct, escalate_to } = req.body || {};
  if (!action || !['approve', 'reject', 'escalate', 'penalize'].includes(action)) {
    return res.status(400).json({ error: 'EHB-VALID-9003', message: 'Invalid action' });
  }

  const historyEntry = {
    action,
    reason,
    slashPct: slash_pct,
    actorId: req.user.id,
    actorRole: req.user.role,
    at: new Date(),
  };

  // Atomic update via $set + $push
  const update = {
    $push: { history: historyEntry },
    $set: { updatedAt: new Date() },
  };

  switch (action) {
    case 'approve':
      update.$set.status = 'RESOLVED';
      update.$set.outcome = 'UPHELD';
      update.$set.resolvedAt = new Date();
      break;
    case 'reject':
      update.$set.status = 'RESOLVED';
      update.$set.outcome = 'REJECTED';
      update.$set.resolvedAt = new Date();
      break;
    case 'escalate':
      update.$set.status = 'ESCALATED';
      if (escalate_to) update.$set.escalatedTo = escalate_to;
      break;
    case 'penalize':
      update.$set.status = 'RESOLVED';
      update.$set.outcome = 'UPHELD';
      update.$set.slashPct = slash_pct;
      update.$set.resolvedAt = new Date();
      break;
  }

  const updated = await Model.findOneAndUpdate(
    { itemId: req.params.itemId },
    update,
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: 'EHB-COMPLAINT-5002', message: 'Item not found' });

  // TODO: if penalize → wallet.slash(payload.userId, slash_pct)
  res.json({ ok: true, item: updated });
});

/**
 * GET /api/dmo/control/stats — aggregated metrics for DMO dashboard
 */
router.get('/stats', requireAuth, requireDmoStaff, async (req, res) => {
  const Model = await getModel();
  if (!Model) return res.status(503).json({ error: 'EHB-SYS-90002' });

  const [open, resolved, escalated, total] = await Promise.all([
    Model.countDocuments({ status: 'OPEN' }),
    Model.countDocuments({ status: 'RESOLVED' }),
    Model.countDocuments({ status: 'ESCALATED' }),
    Model.countDocuments(),
  ]);

  const byTypeAgg = await Model.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]);
  const bySeverityAgg = await Model.aggregate([{ $group: { _id: '$severity', count: { $sum: 1 } } }]);
  const byIndustryAgg = await Model.aggregate([{ $match: { industry: { $exists: true } } }, { $group: { _id: '$industry', count: { $sum: 1 } } }]);

  const byType = Object.fromEntries(byTypeAgg.map((x) => [x._id, x.count]));
  const bySeverity = Object.fromEntries(bySeverityAgg.map((x) => [x._id, x.count]));
  const byIndustry = Object.fromEntries(byIndustryAgg.map((x) => [x._id, x.count]));

  res.json({
    total,
    open,
    resolved,
    escalated,
    by_type: byType,
    by_severity: bySeverity,
    by_industry: byIndustry,
    intervention_rules: DMO_TRIGGER_REASONS,
  });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'dmo-control', persistence: 'mongoose', intervention_rules: DMO_TRIGGER_REASONS });
});

export default router;
export { shouldDmoIntervene, DMO_TRIGGER_REASONS };
