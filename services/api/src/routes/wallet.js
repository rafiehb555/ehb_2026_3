import { Router } from 'express';
import {
  getBalance,
  lockEhbgc,
  unlockEhbgc,
  transferEhbgc,
  listTransactions,
} from '../services/walletService.js';
import { charge, refund } from '../services/paymentGateway.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/balance/:userId', async (req, res, next) => {
  try {
    const w = await getBalance(req.params.userId);
    res.json(w);
  } catch (e) {
    next(e);
  }
});

router.post('/lock-ehbgc', requireAuth, async (req, res, next) => {
  try {
    const { amount, purpose, referenceId } = req.body || {};
    const r = await lockEhbgc({ userId: req.user.id, amount, purpose, referenceId });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/unlock-ehbgc', requireAuth, async (req, res, next) => {
  try {
    const { amount, referenceId } = req.body || {};
    const r = await unlockEhbgc({ userId: req.user.id, amount, referenceId });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/transfer', requireAuth, async (req, res, next) => {
  try {
    const { toUserId, amount, notes } = req.body || {};
    const r = await transferEhbgc({
      fromUserId: req.user.id,
      toUserId,
      amount,
      notes,
    });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/transactions/:userId', requireAuth, async (req, res, next) => {
  try {
    const txs = await listTransactions({
      userId: req.params.userId,
      limit: Number(req.query.limit || 50),
    });
    res.json({ transactions: txs });
  } catch (e) {
    next(e);
  }
});

router.post('/pay', requireAuth, async (req, res, next) => {
  try {
    const { provider, amount, currency, meta } = req.body || {};
    const r = await charge({ provider, amount, currency, meta });
    res.json(r);
  } catch (e) {
    next(e);
  }
});

router.post('/refund', requireAuth, async (req, res, next) => {
  try {
    const { provider, gatewayRef, amount, reason } = req.body || {};
    const r = await refund({ provider, gatewayRef, amount, reason });
    res.json(r);
  } catch (e) {
    next(e);
  }
});

export default router;
