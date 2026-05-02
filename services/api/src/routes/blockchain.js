import { Router } from 'express';
import {
  anchor,
  verify,
  listProofs,
  hashPayload,
  blockchainMeta,
} from '../services/blockchainService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/meta', (req, res) => {
  res.json(blockchainMeta);
});

router.post('/hash', (req, res) => {
  const hash = hashPayload(req.body || {});
  res.json({ hash });
});

router.post('/anchor', requireAuth, async (req, res, next) => {
  try {
    const { targetType, targetId, payload } = req.body || {};
    const proof = await anchor({ targetType, targetId, payload });
    res.json(proof);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/verify/:hash', async (req, res, next) => {
  try {
    const r = await verify({ hash: req.params.hash });
    res.json(r);
  } catch (e) {
    next(e);
  }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { hash, payload } = req.body || {};
    const r = await verify({ hash, payload });
    res.json(r);
  } catch (e) {
    next(e);
  }
});

router.get('/proofs', requireAuth, async (req, res, next) => {
  try {
    const { targetType, targetId } = req.query;
    const proofs = await listProofs({
      targetType,
      targetId,
      limit: Number(req.query.limit || 50),
    });
    res.json({ proofs });
  } catch (e) {
    next(e);
  }
});

export default router;
