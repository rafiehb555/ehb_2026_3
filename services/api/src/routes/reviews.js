import { Router } from 'express';
import { postReview, listProductReviews, listSellerReviews } from '../services/reviewService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const r = await postReview({ buyerId: req.user.id, ...req.body });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/product/:id', async (req, res, next) => {
  try {
    const rows = await listProductReviews(req.params.id);
    res.json({ reviews: rows });
  } catch (e) {
    next(e);
  }
});

router.get('/seller/:id', async (req, res, next) => {
  try {
    const rows = await listSellerReviews(req.params.id);
    res.json({ reviews: rows });
  } catch (e) {
    next(e);
  }
});

export default router;
