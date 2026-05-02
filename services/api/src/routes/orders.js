import { Router } from 'express';
import {
  createOrder,
  payOrder,
  markReady,
  confirmDelivery,
  cancelOrder,
  listMyOrders,
  listSellerOrders,
  getOrder,
} from '../services/orderService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const o = await createOrder({
      buyerId: req.user.id,
      items: req.body?.items,
      deliveryAddress: req.body?.deliveryAddress,
    });
    res.json(o);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/pay', requireAuth, async (req, res, next) => {
  try {
    const o = await payOrder(req.params.id, req.user.id);
    res.json(o);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/mark-ready', requireAuth, async (req, res, next) => {
  try {
    const o = await markReady(req.params.id, req.user.id);
    res.json(o);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/confirm-delivery', requireAuth, async (req, res, next) => {
  try {
    const o = await confirmDelivery(req.params.id, req.user.id);
    res.json(o);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/cancel', requireAuth, async (req, res, next) => {
  try {
    const o = await cancelOrder(req.params.id, req.user.id);
    res.json(o);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const orders = await listMyOrders(req.user.id);
    res.json({ orders });
  } catch (e) {
    next(e);
  }
});

router.get('/seller', requireAuth, async (req, res, next) => {
  try {
    const orders = await listSellerOrders(req.user.id);
    res.json({ orders });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const o = await getOrder(req.params.id);
    if (!o) return res.status(404).json({ error: 'Order not found' });
    res.json(o);
  } catch (e) {
    next(e);
  }
});

export default router;
