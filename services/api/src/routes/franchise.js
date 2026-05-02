import { Router } from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  submitApplication,
  getFranchiseBySerial,
  getMyFranchises,
  findTierPricing,
} from '../services/franchiseService.js';
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pricingPath = join(__dirname, '../../../../data/seeds/franchise-pricing.json');

const router = Router();

router.get('/pricing', (req, res) => {
  try {
    const pricing = JSON.parse(readFileSync(pricingPath, 'utf8'));
    res.json(pricing);
  } catch (e) {
    res.status(500).json({ error: 'pricing seed not found', detail: e.message });
  }
});

router.get('/calculator', (req, res) => {
  const tier = req.query.tier || 'L1';
  const monthlyVolume = Number(req.query.monthlyVolume || 0);
  const platformCut = monthlyVolume * 0.02;
  const tierInfo = findTierPricing(tier);
  res.json({
    tier,
    tierInfo,
    monthlyVolume,
    platformCut,
    split: {
      company: platformCut * 0.4,
      sub: platformCut * 0.25,
      master: platformCut * 0.2,
      corporate: platformCut * 0.15,
    },
  });
});

router.post('/apply', async (req, res, next) => {
  try {
    // If authenticated, use real userId. Otherwise accept as anonymous demo.
    const auth = req.headers.authorization || '';
    let userId = null;
    if (auth.startsWith('Bearer ')) {
      try {
        const { verifyToken } = await import('../middleware/auth.js');
        const payload = verifyToken(auth.slice(7));
        userId = payload.id;
      } catch {}
    }

    const { tier, level, country = 'PK', area, kycSnapshot } = req.body || {};
    if (!level) {
      return res.status(400).json({ error: 'level required (e.g. L1, OF2)' });
    }
    const app = await submitApplication({
      userId,
      type: tier,
      level,
      country,
      area,
      kycSnapshot,
    });
    res.json({
      applicationId: app.applicationId,
      status: app.status,
      tier: app.type,
      level: app.level,
      country: app.country,
      message: 'Application received. DMO will review within 48h.',
    });
  } catch (e) {
    next(e);
  }
});

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const franchises = await getMyFranchises(req.user.id);
    res.json({ franchises });
  } catch (e) {
    next(e);
  }
});

router.get('/:serial', async (req, res, next) => {
  try {
    const f = await getFranchiseBySerial(req.params.serial);
    if (!f) return res.status(404).json({ error: 'Franchise not found' });
    res.json(f);
  } catch (e) {
    next(e);
  }
});

export default router;
