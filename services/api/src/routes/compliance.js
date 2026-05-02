// Compliance Routes — v3.3 §13.1
// Spec: ehb-info/departments/Affiliate.md §13.1 (v3.3)

import { Router } from 'express';
import {
  checkOfac,
  trackSignupVelocity,
  evaluateSignup,
  generateIDS,
  validateNotSelfPurchase,
  checkGeographicDistribution,
  check80_20IncomeRule,
  getComplianceStatus,
  VELOCITY_LIMITS,
} from '../services/complianceService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/compliance/info
 * Public — disclose what compliance checks EHB enforces.
 */
router.get('/info', (req, res) => {
  res.json({
    spec: 'EHB Compliance v3.3 §13.1',
    enforced: {
      ofac: 'OFAC SDN sanctions list (stub MVP — production via ComplyAdvantage/Refinitiv API)',
      velocity: VELOCITY_LIMITS,
      selfPurchase: 'STRICT: STL credit YES, downline commission NO, First Sale Bonus only with external sale within 30 days',
      coolingOffDays: 30,
      legalPositioning: 'EHB is NOT MLM — Affiliate + Marketplace + Service Platform',
      hardRules: [
        'Income only from real product/service sales',
        'No YO BUY (no forced self-purchase to unlock earning)',
        'No fake/empty/overpriced packages',
        'No unlimited-depth income',
        'No referral-only income',
      ],
      jurisdictionPosture: {
        PK: 'compliant (SECP) — launch-1 default',
        UAE: 'Phase 2 (MOEC license required)',
        US: 'Phase 2 (FTC Endorsement Guides + state-by-state MTL)',
        UK: 'Phase 2 (DTI compliance + FCA if any investment framing)',
      },
    },
  });
});

/**
 * GET /api/compliance/ids
 * Public — Income Disclosure Statement (FTC-compliant aggregate).
 * REQUIRED to be visible at every recruitment touchpoint.
 */
router.get('/ids', async (req, res, next) => {
  try {
    const ids = await generateIDS();
    res.json(ids);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/compliance/ofac/check
 * Public — pre-signup OFAC check (called by signup forms).
 * Body: { name, email, country }
 */
router.post('/ofac/check', async (req, res, next) => {
  try {
    const { name, email, country } = req.body || {};
    const result = await checkOfac({ name, email, country });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/compliance/signup/evaluate
 * Public — combined OFAC + velocity gate (used internally by auth router).
 * Body: { name, email, country }
 * Headers: x-forwarded-for or req.ip captured automatically
 */
router.post('/signup/evaluate', async (req, res, next) => {
  try {
    const { name, email, country } = req.body || {};
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const result = await evaluateSignup({ name, email, country, ipAddress });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/compliance/velocity/stats
 * Admin — velocity check stats (DMO_DIRECTOR+).
 */
router.get(
  '/velocity/stats',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
      const result = await trackSignupVelocity(ipAddress);
      res.json({ ip: ipAddress, ...result, limits: VELOCITY_LIMITS });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * GET /api/compliance/me
 * Authenticated — comprehensive compliance status for current user.
 * Returns: geographic distribution + 80/20 income rule check
 */
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const status = await getComplianceStatus(req.user.id);
    res.json(status);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/compliance/self-purchase/check
 * Authenticated — anti-YO-BUY validator (used internally before crediting commission).
 * Body: { buyerId, affiliateId }
 */
router.post('/self-purchase/check', requireAuth, async (req, res, next) => {
  try {
    const { buyerId, affiliateId } = req.body || {};
    const result = await validateNotSelfPurchase(buyerId, affiliateId);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
