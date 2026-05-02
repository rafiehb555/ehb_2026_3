import { Router } from 'express';
import { assignRiderToOrder, recordDeliveryEvent } from '../services/riderService.js';
import Delivery from '../models/Delivery.js';
import { isConnected } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/:orderId/assign', requireAuth, async (req, res, next) => {
  try {
    const r = await assignRiderToOrder(req.params.orderId);
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/event', requireAuth, async (req, res, next) => {
  try {
    const d = await recordDeliveryEvent({
      deliveryId: req.params.id,
      event: req.body?.event,
      lat: req.body?.lat,
      lng: req.body?.lng,
      notes: req.body?.notes,
    });
    res.json(d);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isConnected()) return res.status(503).json({ error: 'DB not connected' });
    const d = await Delivery.findById(req.params.id).lean();
    if (!d) return res.status(404).json({ error: 'Delivery not found' });
    res.json(d);
  } catch (e) {
    next(e);
  }
});

export default router;
