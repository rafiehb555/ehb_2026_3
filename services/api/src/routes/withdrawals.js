// User-facing Withdrawal Routes — Phase 8 Epic C.4

import { Router } from 'express';
import {
  submitWithdrawalRequest,
  verifyTwoFactor,
  listMyWithdrawals,
} from '../services/withdrawalService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/request', requireAuth, async (req, res, next) => {
  try {
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const userAgent = req.headers['user-agent'];
    const result = await submitWithdrawalRequest({
      userId: req.user.id,
      sourceWallet: req.body?.sourceWallet || 'main',
      amountUsd: Number(req.body?.amountUsd),
      destinationType: req.body?.destinationType,
      destinationAddress: req.body?.destinationAddress,
      destinationLabel: req.body?.destinationLabel,
      ipAddress,
      userAgent,
    });
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/2fa', requireAuth, async (req, res, next) => {
  try {
    const result = await verifyTwoFactor({
      requestId: req.params.id,
      twoFactorCode: req.body?.twoFactorCode,
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const items = await listMyWithdrawals(req.user.id, { limit: Number(req.query.limit || 50) });
    res.json({ withdrawals: items });
  } catch (e) {
    next(e);
  }
});

export default router;
