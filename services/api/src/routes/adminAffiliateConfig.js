// Admin Affiliate Config Routes — v3.3 §13.8
// Spec: ehb-info/departments/Affiliate.md §13.8 (v3.3)
//
// Routes restricted to SUPER_ADMIN + DMO_DIRECTOR.
// Phase 2 adds: approval workflow, scheduled changes, A/B test rollout.

import { Router } from 'express';
import {
  getCurrentConfig,
  updateConfig,
  resetConfig,
} from '../services/affiliateConfigService.js';
import { listAllCategories } from '../services/industryRateService.js';
import { TRACK_A_LEVEL_RATES, BONUS_CONFIG as MVP_BONUSES } from '../services/affiliateService.js';
import { TRACK_B_LEVEL_RATES } from '../services/trackBService.js';
import { DAILY_CAP_BY_RANK, MONTHLY_CAP_MULTIPLIER, PER_TX_CAP_USD } from '../services/cappingService.js';
import { RANK_REQUIREMENTS } from '../services/rankEngineService.js';
import { TIER_LIMITS } from '../services/kycService.js';
import { listBankAdapters } from '../adapters/bank/index.js';
import { listKycAdapters } from '../adapters/kyc/index.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/admin/affiliate/config
 * Authenticated (SUPER_ADMIN/DMO_DIRECTOR) — current full config snapshot.
 */
router.get(
  '/config',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const dbConfig = await getCurrentConfig();
      const codeDefaults = {
        trackA: {
          networkPoolPercent: 5,
          l1Percent: 3,
          l2Percent: 1.5,
          mvpMaxDepth: 2,
          rates: TRACK_A_LEVEL_RATES,
        },
        trackB: {
          enabled: true,
          levelRates: TRACK_B_LEVEL_RATES,
        },
        bonuses: MVP_BONUSES,
        capping: {
          dailyByRank: DAILY_CAP_BY_RANK,
          monthlyMultiplier: MONTHLY_CAP_MULTIPLIER,
          perTxCapUsd: PER_TX_CAP_USD,
        },
        ranks: RANK_REQUIREMENTS,
        kycTiers: TIER_LIMITS,
        industryCategories: listAllCategories(),
        adapters: {
          bank: listBankAdapters(),
          kyc: listKycAdapters(),
        },
      };

      res.json({
        codeDefaults,
        dbOverrides: dbConfig,
        effective: dbConfig
          ? { ...codeDefaults, ...dbConfig }
          : codeDefaults,
        version: dbConfig?.version || 1,
        cacheNote: 'Hot-reload within 60s per spec §12.16.2',
      });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * PUT /api/admin/affiliate/config
 * Authenticated — update config (creates new version).
 * Body: { updates: { trackA?, trackB?, bonuses?, capping?, ... }, reason? }
 */
router.put(
  '/config',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const { updates, reason } = req.body || {};
      if (!updates || typeof updates !== 'object') {
        return res.status(400).json({ error: 'updates object required' });
      }
      const result = await updateConfig({
        updates,
        updatedBy: req.user.id,
        updatedFor: reason,
      });
      res.json(result);
    } catch (e) {
      if (e.status) return res.status(e.status).json({ error: e.message });
      next(e);
    }
  }
);

/**
 * POST /api/admin/affiliate/config/reset
 * SUPER_ADMIN only — wipe DB overrides, return to code defaults.
 */
router.post(
  '/config/reset',
  requireAuth,
  requireRole('SUPER_ADMIN'),
  async (req, res, next) => {
    try {
      const result = await resetConfig({ updatedBy: req.user.id });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
