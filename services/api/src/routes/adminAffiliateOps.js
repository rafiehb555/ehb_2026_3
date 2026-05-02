// Admin Affiliate Operations Routes — Phase 8 Epics B.4 + C.4 + F.2 + F.3
//
// DMO Review Queue · Withdrawal admin approval · Audit exports · Country flags

import { Router } from 'express';
import {
  listDmoQueue,
  resolveDmoQueueItem,
  getUserSignalSummary,
} from '../services/fraudSignalsService.js';
import {
  submitWithdrawalRequest,
  verifyTwoFactor,
  adminApprove,
  adminReject,
  executeWithdrawal,
  listMyWithdrawals,
  listAdminQueue,
} from '../services/withdrawalService.js';
import {
  exportActivityLog,
  exportCommissions,
  generate80_20DailyReport,
} from '../services/auditExportService.js';
import {
  getCountryFeatures,
  isFeatureEnabledInCountry,
  listAllCountryFlags,
} from '../services/countryFeatureFlags.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// ─── DMO Review Queue (Epic B.4) ─────────────────────────────────────────

router.get(
  '/dmo/queue',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'DMO_INSPECTOR'),
  async (req, res, next) => {
    try {
      const items = await listDmoQueue({
        status: req.query.status || 'pending',
        limit: Number(req.query.limit || 50),
      });
      res.json({ items, total: items.length });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/dmo/queue/:id/resolve',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'DMO_INSPECTOR'),
  async (req, res, next) => {
    try {
      const { resolution, notes } = req.body || {};
      const result = await resolveDmoQueueItem({
        queueId: req.params.id,
        reviewerId: req.user.id,
        resolution,
        notes,
      });
      res.json(result);
    } catch (e) {
      if (e.status) return res.status(e.status).json({ error: e.message });
      next(e);
    }
  }
);

router.get(
  '/dmo/user/:userId/signals',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'DMO_INSPECTOR'),
  async (req, res, next) => {
    try {
      const summary = await getUserSignalSummary(req.params.userId);
      res.json(summary || {});
    } catch (e) {
      next(e);
    }
  }
);

// ─── Withdrawal Admin Queue (Epic C.4) ───────────────────────────────────

router.get(
  '/withdrawals/queue',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const items = await listAdminQueue({
        status: req.query.status || 'pending_admin_review',
        limit: Number(req.query.limit || 50),
      });
      res.json({ items, total: items.length });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/withdrawals/:id/approve',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const result = await adminApprove({
        requestId: req.params.id,
        adminId: req.user.id,
        notes: req.body?.notes,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/withdrawals/:id/reject',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const result = await adminReject({
        requestId: req.params.id,
        adminId: req.user.id,
        reason: req.body?.reason,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/withdrawals/:id/execute',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const result = await executeWithdrawal({ requestId: req.params.id });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

// ─── Audit Exports (Epic F.2) ────────────────────────────────────────────

router.get(
  '/exports/activity-log',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const result = await exportActivityLog({
        from: req.query.from,
        to: req.query.to,
        action: req.query.action,
        actorUserId: req.query.actorUserId,
        format: req.query.format || 'csv',
      });
      if (result.csv) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="activity-log-${Date.now()}.csv"`);
        return res.send(result.csv);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/exports/commissions',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const result = await exportCommissions({
        from: req.query.from,
        to: req.query.to,
        type: req.query.type,
        status: req.query.status,
        format: req.query.format || 'csv',
      });
      if (result.csv) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="commissions-${Date.now()}.csv"`);
        return res.send(result.csv);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/exports/80-20-report',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const report = await generate80_20DailyReport({ days: Number(req.query.days || 1) });
      res.json(report);
    } catch (e) {
      next(e);
    }
  }
);

// ─── Country Feature Flags (Epic F.3) ────────────────────────────────────

router.get('/country-flags', (req, res) => {
  res.json({ countries: listAllCountryFlags() });
});

router.get('/country-flags/:country', (req, res) => {
  res.json(getCountryFeatures(req.params.country));
});

router.get('/country-flags/:country/feature/:feature', (req, res) => {
  res.json({
    country: req.params.country,
    feature: req.params.feature,
    enabled: isFeatureEnabledInCountry(req.params.country, req.params.feature),
  });
});

export default router;
