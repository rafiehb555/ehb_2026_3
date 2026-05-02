// Affiliate Wallet Routes — v3.3 Phase 1 MVP
// Spec: ehb-info/departments/Affiliate.md §13.6 (v3.3)

import { Router } from 'express';
import {
  ensureAffiliateWallet,
  getAffiliateWalletBalance,
  transferAffiliateToMain,
  listAffiliateTransactions,
  DEFAULT_PAYOUT_MIX,
  FEE_AFF_TO_MAIN,
  FEE_MAIN_TO_AFF,
} from '../services/affiliateWalletService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/wallet/affiliate/info
 * Public — returns Phase 1 MVP wallet config (rates, fees, limits).
 */
router.get('/info', (req, res) => {
  res.json({
    spec: 'EHB Affiliate Wallet v3.3 Phase 1 MVP',
    payoutMixDefault: DEFAULT_PAYOUT_MIX,
    fees: {
      affToMain: FEE_AFF_TO_MAIN,
      mainToAff: FEE_MAIN_TO_AFF,
      withdrawal: 'Phase 2 (USDT TRC20: $1 flat) · Phase 3 (bank: 2%)',
    },
    description:
      'Affiliate Wallet stores commission earnings in 80% USDT + 20% EHBGC default. ' +
      'MVP: balance tracking + free internal transfer to Main Wallet. ' +
      'Phase 2: USDT TRC20 deposit/withdraw. Phase 3: bank rails + KYC tier 3+.',
  });
});

/**
 * POST /api/wallet/affiliate/ensure
 * Authenticated — idempotent create-if-not-exists.
 */
router.post('/ensure', requireAuth, async (req, res, next) => {
  try {
    const wallet = await ensureAffiliateWallet(req.user.id);
    res.json(wallet);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/wallet/affiliate/balance
 * Authenticated — full snapshot for dashboard.
 */
router.get('/balance', requireAuth, async (req, res, next) => {
  try {
    const balance = await getAffiliateWalletBalance(req.user.id);
    res.json(balance);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/wallet/affiliate/transfer-to-main
 * Authenticated — internal transfer Aff → Main (FREE, instant).
 * Body: { amountUsd: number }
 */
router.post('/transfer-to-main', requireAuth, async (req, res, next) => {
  try {
    const amountUsd = Number(req.body?.amountUsd);
    if (!amountUsd || amountUsd <= 0) {
      return res.status(400).json({ error: 'amountUsd must be > 0' });
    }
    const result = await transferAffiliateToMain(req.user.id, amountUsd);
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

/**
 * POST /api/wallet/affiliate/withdraw
 * Phase 2 stub — external withdrawal (USDT TRC20 / bank rails).
 *
 * MVP returns 501 (Not Implemented) per audit fix #1.
 * Phase 2 (Q3 2026) will implement: USDT TRC20 + Pakistan banks (JazzCash + HBL).
 * Phase 3 (Q4 2026) will add: USDT ERC20/BEP20 + UAE/IN/UK/USA bank rails.
 *
 * Body: { destination: 'USDT_TRC20' | 'BANK_PK_JAZZCASH' | 'BANK_PK_HBL' | ..., address?, amountUsd, network? }
 */
router.post('/withdraw', requireAuth, async (req, res) => {
  return res.status(501).json({
    error: 'External withdrawal not yet implemented',
    phase: 'Phase 2 (Q3 2026)',
    workaround:
      'For now, transfer Affiliate Wallet → Main Wallet via /transfer-to-main, then use Main Wallet operations.',
    plannedDestinations: ['USDT_TRC20', 'BANK_PK_JAZZCASH', 'BANK_PK_HBL'],
    plannedFeeSchedule: {
      USDT_TRC20: '$1 flat',
      BANK_PK: '2% (min $2 max $50)',
    },
  });
});

/**
 * GET /api/wallet/affiliate/transactions?limit=50&type=
 * Authenticated — affiliate-wallet related transaction history.
 */
router.get('/transactions', requireAuth, async (req, res, next) => {
  try {
    const txns = await listAffiliateTransactions(req.user.id, {
      limit: Number(req.query.limit || 50),
      type: req.query.type,
    });
    res.json({ transactions: txns });
  } catch (e) {
    next(e);
  }
});

export default router;
