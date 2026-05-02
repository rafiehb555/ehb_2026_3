import { Router } from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  getSellerStorefront,
} from '../services/gosellrService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const items = await listProducts({
      q: req.query.q,
      category: req.query.category,
      minStl: req.query.minStl ? Number(req.query.minStl) : undefined,
      sort: req.query.sort || 'rank',
      limit: Number(req.query.limit || 50),
    });
    res.json({ items });
  } catch (e) {
    next(e);
  }
});

router.get('/products/:slugOrId', async (req, res, next) => {
  try {
    const p = await getProduct(req.params.slugOrId);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (e) {
    next(e);
  }
});

router.post('/products', requireAuth, async (req, res, next) => {
  try {
    const p = await createProduct({ sellerId: req.user.id, ...req.body });
    res.json(p);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/sellers/:id', async (req, res, next) => {
  try {
    const s = await getSellerStorefront(req.params.id);
    if (!s) return res.status(404).json({ error: 'Seller not found' });
    res.json(s);
  } catch (e) {
    next(e);
  }
});

export default router;
