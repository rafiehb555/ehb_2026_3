import { Router } from 'express';
import {
  applyAsRider,
  setAvailability,
  getMyRider,
  listOnlineRiders,
} from '../services/riderService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/apply', requireAuth, async (req, res, next) => {
  try {
    const r = await applyAsRider({
      userId: req.user.id,
      zone: req.body?.zone,
      vehicleType: req.body?.vehicleType,
    });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const r = await getMyRider(req.user.id);
    res.json(r || { note: 'Not applied as rider yet' });
  } catch (e) {
    next(e);
  }
});

router.post('/availability', requireAuth, async (req, res, next) => {
  try {
    const r = await setAvailability(req.user.id, req.body?.online);
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/online', requireAuth, requireRole('DMO_MANAGER', 'DMO_DIRECTOR', 'SUPER_ADMIN', 'DMO_ANALYST'), async (req, res, next) => {
  try {
    res.json({ riders: await listOnlineRiders() });
  } catch (e) {
    next(e);
  }
});

export default router;
