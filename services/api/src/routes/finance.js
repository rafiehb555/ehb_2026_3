/**
 * EHB · Finance Routes — /api/finance
 *
 * Endpoints:
 *   GET    /api/finance/overview                — platform totals (admin)
 *   GET    /api/finance/me/earnings             — current user's earnings ledger
 *   GET    /api/finance/users/:id/earnings      — admin view
 *   POST   /api/finance/earnings/:earningId/approve  — DMO approves payout
 *   POST   /api/finance/earnings/:earningId/reject   — DMO rejects
 *   POST   /api/finance/earnings/:earningId/pay      — mark paid (after wallet release)
 *   GET    /api/finance/reports                 — aggregated platform report
 *   GET    /api/finance/tax/rate                — get tax rate for country/industry
 *   POST   /api/finance/tax/compute             — compute tax on amount
 *   POST   /api/finance/fx/convert              — currency conversion
 *   GET    /api/finance/fx/rates                — list all known FX rates
 *   POST   /api/finance/reconcile               — run reconciliation (admin)
 *   GET    /api/finance/health                  — health check
 */

import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as finance from '../services/financeService.js';
import * as tax from '../services/taxEngine.js';
import * as fx from '../services/fxService.js';

const router = Router();

// =====================================================================
// RBAC — admin/DMO only
// =====================================================================
const ADMIN_ROLES = ['DMO_STAFF', 'DMO_SENIOR', 'DMO_COUNCIL', 'FOUNDER', 'SUPER_ADMIN'];
function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'EHB-AUTH-1003' });
  if (!ADMIN_ROLES.includes(req.user.role)) return res.status(403).json({ error: 'EHB-AUTH-1008' });
  next();
}

// =====================================================================
// User-facing — own earnings
// =====================================================================
router.get('/me/earnings', requireAuth, async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;
    const earnings = await finance.getUserEarnings({
      userId: req.user.id, status, fromDate, toDate,
      limit: Number(req.query.limit) || 100,
    });
    res.json({ count: earnings.length, items: earnings });
  } catch (err) {
    res.status(500).json({ error: 'EHB-SYS-90001', message: err.message });
  }
});

// =====================================================================
// Admin — overview
// =====================================================================
router.get('/overview', requireAuth, requireAdmin, async (req, res) => {
  try {
    const o = await finance.getOverview();
    res.json(o);
  } catch (err) {
    res.status(500).json({ error: 'EHB-SYS-90001', message: err.message });
  }
});

router.get('/users/:id/earnings', requireAuth, requireAdmin, async (req, res) => {
  const earnings = await finance.getUserEarnings({ userId: req.params.id, ...req.query });
  res.json({ count: earnings.length, items: earnings });
});

// =====================================================================
// DMO actions
// =====================================================================
router.post('/earnings/:earningId/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const result = await finance.approveEarning({
      earningId: req.params.earningId,
      approvedBy: req.user.id,
      notes: req.body.notes,
    });
    res.json({ ok: true, earning: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: 'EHB-FIN-7001', message: err.message });
  }
});

router.post('/earnings/:earningId/reject', requireAuth, requireAdmin, async (req, res) => {
  const { reason } = req.body || {};
  if (!reason) return res.status(400).json({ error: 'EHB-VALID-9001', message: 'reason required' });
  const result = await finance.rejectEarning({
    earningId: req.params.earningId,
    rejectedBy: req.user.id,
    reason,
  });
  res.json({ ok: true, earning: result });
});

router.post('/earnings/:earningId/pay', requireAuth, requireAdmin, async (req, res) => {
  const result = await finance.markPaid({
    earningId: req.params.earningId,
    polkadotHash: req.body?.polkadot_hash,
  });
  res.json({ ok: true, earning: result });
});

// =====================================================================
// Reports
// =====================================================================
router.get('/reports', requireAuth, requireAdmin, async (req, res) => {
  const groupBy = req.query.groupBy || 'industry'; // industry | country | type | status
  const report = await finance.getPlatformReport({
    fromDate: req.query.fromDate,
    toDate: req.query.toDate,
    groupBy,
  });
  res.json({ groupBy, items: report });
});

router.post('/reconcile', requireAuth, requireAdmin, async (req, res) => {
  const { fromDate, toDate } = req.body || {};
  const result = await finance.reconcile({ fromDate, toDate });
  res.json(result);
});

// =====================================================================
// Tax
// =====================================================================
router.get('/tax/rate', (req, res) => {
  const { country, industry } = req.query;
  if (!country) return res.status(400).json({ error: 'EHB-VALID-9001', message: 'country required' });
  const rate = tax.getVatRate({ country, industry });
  res.json({ country, industry: industry || null, vat_rate_pct: rate });
});

router.post('/tax/compute', (req, res) => {
  const { amount, country, industry, taxIncluded } = req.body || {};
  if (!amount || !country) return res.status(400).json({ error: 'EHB-VALID-9001' });
  const result = tax.computeTax({ amount, country, industry, taxIncluded });
  res.json(result);
});

router.post('/tax/invoice', requireAuth, async (req, res) => {
  const result = tax.generateTaxInvoice(req.body);
  res.json(result);
});

// =====================================================================
// FX
// =====================================================================
router.post('/fx/convert', (req, res) => {
  const { amount, from, to } = req.body || {};
  if (!amount || !from || !to) return res.status(400).json({ error: 'EHB-VALID-9001' });
  const result = fx.convert({ amount, from, to });
  res.json(result);
});

router.post('/fx/quote', (req, res) => {
  const { amount, from, to, bufferPct } = req.body || {};
  if (!amount || !from || !to) return res.status(400).json({ error: 'EHB-VALID-9001' });
  const result = fx.quote({ amount, from, to, bufferPct });
  res.json(result);
});

router.get('/fx/rates', (req, res) => {
  res.json(fx.listRates());
});

// =====================================================================
// Health
// =====================================================================
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'finance' });
});

export default router;
