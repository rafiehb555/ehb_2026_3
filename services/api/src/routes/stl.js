import { Router } from 'express';
import { calculateSTL, effectsForLevel, validateProductChain } from '../services/stlService.js';

const router = Router();

router.get('/score/:userId', (req, res) => {
  // Demo stub: derive from query for Phase 1 Week 1
  const pss = Number(req.query.pss || 3);
  const crb = Number(req.query.crb || 2);
  const dmo = Number(req.query.dmo || 2);
  const result = calculateSTL({ pssLevel: pss, crbLevel: crb, dmoLevel: dmo });
  res.json({ userId: req.params.userId, ...result });
});

router.post('/validate-product', (req, res) => {
  const { productSTL, sellerSTL, companySTL, ownerSTL } = req.body || {};
  const result = validateProductChain({ productSTL, sellerSTL, companySTL, ownerSTL });
  res.json(result);
});

router.get('/effects/:level', (req, res) => {
  const level = Number(req.params.level);
  res.json({ level, effects: effectsForLevel(level) });
});

export default router;
