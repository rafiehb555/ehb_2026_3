// KYC Routes — v3.3 §13.6.5
// Spec: ehb-info/departments/Affiliate.md §13.6.5 (v3.3)

import { Router } from 'express';
import {
  getTierLadder,
  submitDocument,
  verifyDocument,
  computeKycTier,
  getMyKycStatus,
  checkTierLimit,
  TIER_LIMITS,
  TIER_REQUIRED_DOCUMENTS,
} from '../services/kycService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/kyc/info
 * Public — KYC tier ladder + requirements + limits.
 */
router.get('/info', (req, res) => {
  res.json(getTierLadder());
});

/**
 * GET /api/kyc/me
 * Authenticated — full KYC status for current user.
 */
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const status = await getMyKycStatus(req.user.id);
    res.json(status);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/kyc/submit
 * Authenticated — submit a new KYC document.
 * Body: { documentType, fileUrl, extractedData? }
 */
router.post('/submit', requireAuth, async (req, res, next) => {
  try {
    const { documentType, fileUrl, extractedData } = req.body || {};
    if (!documentType || !fileUrl) {
      return res.status(400).json({ error: 'documentType + fileUrl required' });
    }
    const result = await submitDocument({
      userId: req.user.id,
      documentType,
      fileUrl,
      extractedData,
    });
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

/**
 * POST /api/kyc/verify
 * Admin — verify or reject a submitted document.
 * Body: { documentId, decision: 'verified'|'rejected', rejectedReason? }
 */
router.post(
  '/verify',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'DMO_INSPECTOR'),
  async (req, res, next) => {
    try {
      const { documentId, decision, rejectedReason } = req.body || {};
      if (!documentId || !decision) {
        return res.status(400).json({ error: 'documentId + decision required' });
      }
      const result = await verifyDocument({
        documentId,
        reviewerId: req.user.id,
        decision,
        rejectedReason,
      });
      res.json(result);
    } catch (e) {
      if (e.status) return res.status(e.status).json({ error: e.message });
      next(e);
    }
  }
);

/**
 * POST /api/kyc/check-limit
 * Authenticated — check if a proposed wallet operation is within tier limits.
 * Body: { amountUsd, direction: 'in'|'out' }
 */
router.post('/check-limit', requireAuth, async (req, res, next) => {
  try {
    const { amountUsd, direction } = req.body || {};
    if (!amountUsd) return res.status(400).json({ error: 'amountUsd required' });
    const result = await checkTierLimit({
      userId: req.user.id,
      amountUsd: Number(amountUsd),
      direction,
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/kyc/tier
 * Authenticated — just current tier number (lightweight, for header badges).
 */
router.get('/tier', requireAuth, async (req, res, next) => {
  try {
    const tier = await computeKycTier(req.user.id);
    res.json({ tier, name: TIER_LIMITS[tier]?.name, limits: TIER_LIMITS[tier] });
  } catch (e) {
    next(e);
  }
});

export default router;
