import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Franchise from '../models/Franchise.js';
import FranchiseApplication from '../models/FranchiseApplication.js';
import AiInvocation from '../models/AiInvocation.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import {
  listPendingApplications,
  approveApplication,
  rejectApplication,
  requestInfo,
} from '../services/franchiseService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listActivity } from '../services/auditService.js';

const router = Router();

router.get('/kpis', async (req, res) => {
  if (!isConnected()) {
    return res.json({
      activeUsers: 50,
      pendingFranchiseApps: 7,
      aiInvocationsToday: 128,
      platformRevenueUsd: 12450,
      stlDistribution: { L1: 12, L2: 8, L3: 10, L4: 8, L5: 6, L6: 4, L7: 2 },
      updatedAt: new Date().toISOString(),
      source: 'memory',
    });
  }

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [activeUsers, pendingApps, invocationsToday, revenueAgg, stlBuckets] = await Promise.all([
      User.countDocuments({}),
      FranchiseApplication.countDocuments({ status: 'pending' }),
      AiInvocation.countDocuments({ createdAt: { $gte: since } }),
      Transaction.aggregate([
        { $match: { type: 'commission_credit', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      User.aggregate([{ $group: { _id: '$stl.level', count: { $sum: 1 } } }]),
    ]);

    const stlDistribution = {};
    for (let l = 1; l <= 10; l++) stlDistribution[`L${l}`] = 0;
    stlBuckets.forEach((b) => {
      if (b._id) stlDistribution[`L${b._id}`] = b.count;
    });

    res.json({
      activeUsers,
      pendingFranchiseApps: pendingApps,
      aiInvocationsToday: invocationsToday,
      platformRevenueUsd: revenueAgg[0]?.total || 0,
      stlDistribution,
      updatedAt: new Date().toISOString(),
      source: 'mongodb',
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/applications/queue', async (req, res, next) => {
  try {
    const queue = await listPendingApplications({ limit: Number(req.query.limit || 50) });
    res.json({
      queue: queue.map((a) => ({
        id: a.applicationId || a._id,
        userId: a.userId,
        tier: a.type,
        level: a.level,
        country: a.country,
        submittedAt: a.submittedAt,
        status: a.status,
        area: a.area,
      })),
    });
  } catch (e) {
    next(e);
  }
});

router.post('/applications/:id/approve', requireAuth, requireRole('DMO_MANAGER', 'SUPER_ADMIN', 'DMO_DIRECTOR'), async (req, res, next) => {
  try {
    const result = await approveApplication({
      applicationId: req.params.id,
      reviewerId: req.user.id,
      notes: req.body?.notes,
    });
    res.json(result);
  } catch (e) {
    if (e.status) res.status(e.status).json({ error: e.message });
    else next(e);
  }
});

router.post('/applications/:id/reject', requireAuth, requireRole('DMO_MANAGER', 'SUPER_ADMIN', 'DMO_DIRECTOR'), async (req, res, next) => {
  try {
    const app = await rejectApplication({
      applicationId: req.params.id,
      reviewerId: req.user.id,
      reason: req.body?.reason,
    });
    res.json(app);
  } catch (e) {
    if (e.status) res.status(e.status).json({ error: e.message });
    else next(e);
  }
});

router.post('/applications/:id/request-info', requireAuth, requireRole('DMO_MANAGER', 'SUPER_ADMIN', 'DMO_DIRECTOR'), async (req, res, next) => {
  try {
    const app = await requestInfo({
      applicationId: req.params.id,
      reviewerId: req.user.id,
      message: req.body?.message,
    });
    res.json(app);
  } catch (e) {
    if (e.status) res.status(e.status).json({ error: e.message });
    else next(e);
  }
});

router.get('/activity', requireAuth, async (req, res, next) => {
  try {
    const logs = await listActivity({
      actorUserId: req.query.actorUserId,
      action: req.query.action,
      target: req.query.target,
      limit: Number(req.query.limit || 100),
    });
    res.json({ logs });
  } catch (e) {
    next(e);
  }
});

// Called by the AI service to log each invocation into MongoDB.
router.post('/ai-invocation-log', async (req, res) => {
  if (!isConnected()) return res.json({ ok: false, note: 'db not connected' });
  try {
    const { userId, service, input, output } = req.body || {};
    await AiInvocation.create({
      userId: mongoose.isValidObjectId(userId) ? userId : null,
      service,
      input,
      output,
    });
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

router.get('/stl-leaderboard', async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || 100);
    if (!isConnected()) {
      return res.json({ leaderboard: [], source: 'memory' });
    }
    const users = await User.find({})
      .sort({ 'stl.score': -1 })
      .limit(limit)
      .select('name email pss.level crb.level dmo.level stl')
      .lean();
    res.json({ leaderboard: users });
  } catch (e) {
    next(e);
  }
});

export default router;
