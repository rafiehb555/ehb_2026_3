// Affiliate Deep Health Check Routes
//
// Standard /api/health pings the gateway. These routes give detailed
// diagnostics for the affiliate subsystem — used by ops dashboards,
// PagerDuty health checks, k8s liveness probes, and pre-deploy verification.

import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const isConnected = () => mongoose.connection?.readyState === 1;

/**
 * GET /api/health/affiliate
 * Deep affiliate-system health check.
 *
 * Returns 200 if all subsystems are nominal, 503 if any critical subsystem
 * is down. Includes timing data for each check.
 */
router.get('/', async (req, res) => {
  const startedAt = Date.now();
  const checks = {};
  const issues = [];

  // ── Mongo connectivity ──────────────────────────────────────────────────
  const mongoStart = Date.now();
  try {
    if (!isConnected()) throw new Error('not connected');
    await mongoose.connection.db.admin().ping();
    checks.mongo = {
      status: 'ok',
      latencyMs: Date.now() - mongoStart,
      readyState: mongoose.connection.readyState,
    };
  } catch (e) {
    checks.mongo = { status: 'fail', error: e.message };
    issues.push('mongo connection failed');
  }

  // ── Affiliate model — count active affiliates ──────────────────────────
  if (isConnected()) {
    try {
      const Affiliate = (await import('../models/Affiliate.js')).default;
      const t = Date.now();
      const total = await Affiliate.estimatedDocumentCount();
      const activeThisMonth = await Affiliate.countDocuments({
        'stats.thisMonthEarningsUsd': { $gt: 0 },
      }).catch(() => null);
      checks.affiliates = {
        status: 'ok',
        latencyMs: Date.now() - t,
        total,
        activeThisMonth,
      };
    } catch (e) {
      checks.affiliates = { status: 'fail', error: e.message };
      issues.push('affiliate count query failed');
    }

    // ── Commission processing latency (last 24h) ────────────────────────
    try {
      const AffiliateCommission = (await import('../models/AffiliateCommission.js')).default;
      const t = Date.now();
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recent = await AffiliateCommission.countDocuments({ createdAt: { $gte: oneDayAgo } });
      const pending = await AffiliateCommission.countDocuments({ status: 'pending' });
      const reversed24h = await AffiliateCommission.countDocuments({
        status: 'reversed',
        reversedAt: { $gte: oneDayAgo },
      });
      checks.commissions = {
        status: 'ok',
        latencyMs: Date.now() - t,
        last24h: recent,
        pending,
        reversed24h,
      };
      // Health alert if reversal rate > 5%
      if (recent > 100 && reversed24h / recent > 0.05) {
        checks.commissions.warning = `High reversal rate: ${((reversed24h / recent) * 100).toFixed(1)}%`;
        issues.push('high commission reversal rate');
      }
    } catch (e) {
      checks.commissions = { status: 'fail', error: e.message };
      issues.push('commission query failed');
    }

    // ── DMO Review Queue — pending count + critical risk ────────────────
    try {
      const DmoReviewQueue = (await import('../models/DmoReviewQueue.js')).default;
      const t = Date.now();
      const pending = await DmoReviewQueue.countDocuments({ status: 'pending' });
      const critical = await DmoReviewQueue.countDocuments({
        status: 'pending',
        riskScore: { $gte: 70 },
      });
      checks.dmoQueue = {
        status: 'ok',
        latencyMs: Date.now() - t,
        pending,
        critical,
      };
      if (critical > 50) {
        checks.dmoQueue.warning = `${critical} critical-risk cases pending review`;
        issues.push('dmo queue backlog');
      }
    } catch (e) {
      checks.dmoQueue = { status: 'degraded', note: 'collection may not exist yet' };
    }

    // ── Withdrawal Queue ─────────────────────────────────────────────────
    try {
      const WithdrawalRequest = (await import('../models/WithdrawalRequest.js')).default;
      const t = Date.now();
      const pendingApproval = await WithdrawalRequest.countDocuments({
        status: 'pending_admin_review',
      });
      const pendingValueUsd = await WithdrawalRequest.aggregate([
        { $match: { status: 'pending_admin_review' } },
        { $group: { _id: null, total: { $sum: '$amountUsd' } } },
      ]).then((r) => r[0]?.total || 0);
      checks.withdrawals = {
        status: 'ok',
        latencyMs: Date.now() - t,
        pendingApproval,
        pendingValueUsd,
      };
    } catch (e) {
      checks.withdrawals = { status: 'degraded', note: 'collection may not exist yet' };
    }

    // ── KYC submissions ─────────────────────────────────────────────────
    try {
      const KycDocument = (await import('../models/KycDocument.js')).default;
      const t = Date.now();
      const pendingReview = await KycDocument.countDocuments({ status: 'pending' });
      checks.kyc = {
        status: 'ok',
        latencyMs: Date.now() - t,
        pendingReview,
      };
    } catch (e) {
      checks.kyc = { status: 'degraded', note: 'collection may not exist yet' };
    }

    // ── Affiliate Wallet — total balances ───────────────────────────────
    try {
      const AffiliateWallet = (await import('../models/AffiliateWallet.js')).default;
      const t = Date.now();
      const totals = await AffiliateWallet.aggregate([
        {
          $group: {
            _id: null,
            totalUsdt: { $sum: '$balances.usdt' },
            totalEhbgc: { $sum: '$balances.ehbgc' },
            count: { $sum: 1 },
          },
        },
      ]);
      const t0 = totals[0] || { totalUsdt: 0, totalEhbgc: 0, count: 0 };
      checks.wallets = {
        status: 'ok',
        latencyMs: Date.now() - t,
        walletCount: t0.count,
        totalUsdtUsd: t0.totalUsdt,
        totalEhbgc: t0.totalEhbgc,
      };
    } catch (e) {
      checks.wallets = { status: 'degraded', note: 'collection may not exist yet' };
    }
  }

  // ── Service-level checks (no DB needed) ──────────────────────────────────
  // Capping engine config
  try {
    const cappingService = await import('../services/cappingService.js');
    checks.cappingEngine = {
      status: 'ok',
      perTxCapUsd: cappingService.PER_TX_CAP_USD,
      monthlyCapMultiplier: cappingService.MONTHLY_CAP_MULTIPLIER,
      ranks: Object.keys(cappingService.DAILY_CAP_BY_RANK || {}).length,
    };
  } catch (e) {
    checks.cappingEngine = { status: 'fail', error: e.message };
    issues.push('capping engine import failed');
  }

  // Compliance service (OFAC + IDS)
  try {
    const complianceService = await import('../services/complianceService.js');
    checks.compliance = {
      status: 'ok',
      hasGenerateIDS: typeof complianceService.generateIDS === 'function',
    };
  } catch (e) {
    checks.compliance = { status: 'fail', error: e.message };
    issues.push('compliance service import failed');
  }

  // Email templates
  try {
    const emailModule = await import('../services/emailTemplates.js');
    const templates = emailModule.EMAIL_TEMPLATES || {};
    checks.emailTemplates = {
      status: 'ok',
      count: Object.keys(templates).length,
    };
  } catch (e) {
    checks.emailTemplates = { status: 'degraded', error: e.message };
  }

  // ── Memory + uptime ──────────────────────────────────────────────────────
  const mem = process.memoryUsage();
  checks.process = {
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    memoryRss: `${(mem.rss / 1024 / 1024).toFixed(1)} MB`,
    memoryHeapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB`,
  };

  // ── Verdict ──────────────────────────────────────────────────────────────
  const allOk = Object.values(checks).every(
    (c) => c.status === 'ok' || c.status === 'degraded'
  );
  const anyFail = Object.values(checks).some((c) => c.status === 'fail');

  const response = {
    overall: anyFail ? 'fail' : allOk ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    affiliateVersion: 'v3.11',
    issues: issues.length > 0 ? issues : undefined,
    checks,
  };

  res.status(anyFail ? 503 : 200).json(response);
});

/**
 * GET /api/health/affiliate/lite
 * Lightweight liveness probe — just checks Mongo connection.
 * Used by k8s liveness probe (called every 10s).
 */
router.get('/lite', (req, res) => {
  if (isConnected()) {
    res.json({ status: 'ok', readyState: mongoose.connection.readyState });
  } else {
    res.status(503).json({ status: 'fail', readyState: mongoose.connection?.readyState ?? 0 });
  }
});

/**
 * GET /api/health/affiliate/ready
 * Readiness probe — checks DB + critical service imports.
 * Used by k8s readiness probe (called every 5s during startup).
 */
router.get('/ready', async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ status: 'not-ready', reason: 'mongo not connected' });
  }
  try {
    await import('../services/affiliateService.js');
    await import('../services/complianceService.js');
    await import('../services/cappingService.js');
    res.json({ status: 'ready' });
  } catch (e) {
    res.status(503).json({ status: 'not-ready', reason: e.message });
  }
});

export default router;
