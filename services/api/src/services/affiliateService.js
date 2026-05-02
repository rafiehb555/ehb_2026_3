// Affiliate Service — v3.2-MVP (Track A Product Affiliate)
//
// Spec: ehb-info/departments/Affiliate.md §12 (v3.2)
// Founder lock: 2026-04-25
//
// MVP scope (Phase 1):
//   • Track A 2-layer GoSellr commission cascade
//       Layer 1 (Seller): seller-defined 5–30% margin → 100% to direct salesperson (handled by orderService).
//       Layer 2 (Network): platform 5% of product price, hidden, split 60/30/10
//                         MVP caps cascade at L1 (3%) + L2 (1.5%) — L3 (0.5%) deferred to Phase 2.
//   • 3 bonuses:
//       - First Sale Bonus  : $5 fixed, one-time per user
//       - STL Purchase Bonus: L1 3% / L2 2% / L3 1% of upgrade payment, one-time per upgrade event
//       - Fast Sale Bonus   : 4 same-pkg sales / week → 1 free pkg, max 2 free/week
//   • Basic anti-fraud: self-purchase block, refund-aware reversal hook (orderService).
//
// NOT in MVP (Phase 2): Track B 10-level franchise cascade · 8 remaining bonuses ·
//                       Rank engine (R1–R10) · Industry categories · Dynamic pricing ·
//                       3-layer price lock · Active legs / multi-industry trackers ·
//                       Franchise activation flow · Admin flexibility config layer.

import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import {
  creditAffiliateWallet,
  debitAffiliateWalletForReversal,
} from './affiliateWalletService.js';
import { applyCapAndLog } from './cappingService.js';
import { evaluateAndPromote } from './rankEngineService.js';
import { applyMatchingBonus, applyActivationBonus } from './bonusService.js';
import { getRatesForIndustry, shouldSkipTrackA } from './industryRateService.js';

// ─── v3.2-MVP CONFIG (admin-tunable in Phase 2 via affiliate_config) ─────

/** Track A network pool (5% of product price) split per spec §12.2 */
export const TRACK_A_NETWORK_POOL_PERCENT = 0.05;
export const TRACK_A_LEVEL_RATES = {
  // share of total product price (== 60% / 30% / 10% of the 5% pool)
  1: 0.03, // L1 direct upline   = 3.0%
  2: 0.015, // L2                = 1.5%
  3: 0.005, // L3 (Phase 2)      = 0.5%
};

/** MVP caps cascade depth at L2; Phase 2 will lift to L3 then full Track B 10-level. */
export const MVP_MAX_DEPTH = 2;

/** First Sale Bonus — $5 USD fixed, one-time (spec §12.7 #4) */
export const FIRST_SALE_BONUS_USD = 5;

/** STL Purchase Bonus — % of upgrade payment, one-time per upgrade (spec §12.7 #2) */
export const STL_BONUS_RATES = {
  1: 0.03, // L1 direct upline = 3%
  2: 0.02, // L2               = 2%
  3: 0.01, // L3 (Phase 2)     = 1%
};
export const STL_BONUS_MAX_DEPTH_MVP = 2; // L3 deferred to Phase 2

/** Fast Sale Bonus — 4 same-package sales/week → 1 free pkg; cap 2/week (spec §12.7 #1) */
export const FAST_SALE_TRIGGER_COUNT = 4;
export const FAST_SALE_WEEKLY_FREE_CAP = 2;

// ─── HELPERS ──────────────────────────────────────────────────────────────

/** Generate ISO week key like "2026-W17" — used for Fast Sale weekly tracker. */
export function getIsoWeekKey(date = new Date()) {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  // Thursday in current week determines the year per ISO 8601
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/** Generate a referral code from user name + random suffix. */
function genReferralCode(name = '') {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 6) || 'ref';
  return `${slug}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Build a public referral link for the DAM page (spec §12.3.3). */
export function buildReferralLink({ baseUrl = 'ehb.com', referralCode, productId }) {
  if (productId) return `${baseUrl}/product/${productId}?ref=${referralCode}`;
  return `${baseUrl}/ref/${referralCode}`;
}

/** Anti-fraud: block self-purchase (spec §12.13). */
function isSelfPurchase(buyerUserId, affiliateUserId) {
  if (!buyerUserId || !affiliateUserId) return false;
  return String(buyerUserId) === String(affiliateUserId);
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────

/**
 * Apply to become an affiliate (or fetch existing).
 * If `referredByCode` provided, links the new user to their sponsor's chain.
 */
export async function joinAffiliate({ userId, referredByCode }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });

  let aff = await Affiliate.findOne({ userId });
  if (aff) return aff.toObject();

  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

  let upstream = [];
  let referredBy = null;

  if (referredByCode) {
    const sponsor = await Affiliate.findOne({ referralCode: referredByCode });
    if (sponsor) {
      // Anti-fraud: self-referral block
      if (String(sponsor.userId) === String(userId)) {
        throw Object.assign(new Error('Self-referral not allowed'), { status: 400 });
      }
      referredBy = sponsor.userId;
      // Build upstream chain (capped at 10 for Phase 2; MVP only uses [0] and [1])
      upstream = [sponsor.userId, ...(sponsor.upstream || []).slice(0, 9)];

      await Affiliate.updateOne(
        { _id: sponsor._id },
        { $inc: { 'stats.directReferrals': 1, 'stats.networkSize': 1 } }
      );
      if (upstream.length > 1) {
        await Affiliate.updateMany(
          { userId: { $in: upstream.slice(1) } },
          { $inc: { 'stats.networkSize': 1 } }
        );
      }
    }
  }

  aff = await Affiliate.create({
    userId,
    referralCode: genReferralCode(user.name || user.email),
    referredBy,
    upstream,
    rank: 'R1',
    eligible: (user.stl?.level || 1) >= 1,
    activatedAt: new Date(),
    productAffiliateEnabled: true,
  });

  await logActivity({
    actorUserId: userId,
    action: 'affiliate.joined',
    target: 'affiliate',
    targetId: aff._id.toString(),
    after: { code: aff.referralCode, hasSponsor: Boolean(referredBy) },
  });

  return aff.toObject();
}

export async function getMyAffiliate(userId) {
  if (!isConnected()) return null;
  return Affiliate.findOne({ userId }).lean();
}

/**
 * Get full network tree under a user.
 * MVP caps at depth 2 (L1 + L2). Phase 2 will lift to 10.
 */
export async function getNetworkTree(userId, maxDepth = MVP_MAX_DEPTH) {
  if (!isConnected()) return { levels: [] };
  const depth = Math.min(maxDepth, 10);
  const levels = [];
  let current = [userId];

  for (let d = 1; d <= depth && current.length > 0; d++) {
    const next = await Affiliate.find({ referredBy: { $in: current } })
      .populate('userId', 'name email stl')
      .lean();
    if (!next.length) break;
    levels.push({
      level: d,
      count: next.length,
      members: next.map((m) => ({
        userId: m.userId?._id || m.userId,
        name: m.userId?.name || 'Unknown',
        stlLevel: m.userId?.stl?.level || 1,
        rank: m.rank || 'R1',
        code: m.referralCode,
        joinedAt: m.createdAt,
      })),
    });
    current = next.map((m) => m.userId?._id || m.userId);
  }
  return { levels };
}

/**
 * Track A — Process product order commission (called by orderService.confirmDelivery).
 *
 * Flow:
 *   1. Calculate network pool = 5% of product price
 *   2. Distribute L1 (3%) + L2 (1.5%) to upstream chain
 *   3. Trigger First Sale Bonus if buyer's first sale
 *   4. Update Fast Sale weekly tracker
 *
 * @param {object} order - Order document (must include buyerId, productId, totals.totalUsd, sellerProfitPercent?)
 */
export async function processProductOrder(order) {
  if (!isConnected()) return { distributed: 0 };
  if (!order || !order.buyerId) return { distributed: 0, note: 'invalid order' };

  const productPriceUsd = order.totals?.totalUsd || order.amountUsd || 0;
  if (productPriceUsd <= 0) return { distributed: 0, note: 'zero-value order' };

  const buyerAff = await Affiliate.findOne({ userId: order.buyerId });
  if (!buyerAff) return { distributed: 0, note: 'buyer not in affiliate program' };

  // Audit fix #20 — resolve industryCode from Product (Order has productId, not industryCode directly)
  let resolvedIndustryCode = order.industryCode || null;
  if (!resolvedIndustryCode && order.productId) {
    try {
      const Product = (await import('../models/Product.js')).default;
      const product = await Product.findById(order.productId).select('industry').lean();
      resolvedIndustryCode = product?.industry || 'GSM';
    } catch (e) {
      // Product lookup failed — fall through with null industryCode
    }
  }

  const commissions = [];

  // ─── Track A cascade (L1 + L2 in MVP) ─────────────────────────────────
  const chain = [buyerAff.referredBy, ...(buyerAff.upstream || [])].filter(Boolean);

  for (let i = 0; i < Math.min(chain.length, MVP_MAX_DEPTH); i++) {
    const upstreamUserId = chain[i];
    const level = i + 1;

    // Anti-fraud: skip self-referral chain
    if (isSelfPurchase(order.buyerId, upstreamUserId)) continue;

    const earner = await User.findById(upstreamUserId).select('stl');
    if (!earner) continue;

    const rate = TRACK_A_LEVEL_RATES[level];
    if (!rate) continue;

    const amount = productPriceUsd * rate;
    if (amount <= 0) continue;

    commissions.push({
      earnerUserId: upstreamUserId,
      sourceUserId: order.buyerId,
      type: level === 1 ? 'direct' : 'level',
      track: 'A',
      level,
      orderId: order._id,
      productPriceUsd,
      orderValueUsd: productPriceUsd,
      rateApplied: rate,
      amountUsd: amount,
      sellerProfitPercent: order.sellerProfitPercent || null,
      networkPoolPercent: TRACK_A_NETWORK_POOL_PERCENT * 100,
      industryCode: resolvedIndustryCode,
      status: 'paid',
      paidAt: new Date(),
    });
  }

  // ─── First Sale Bonus (one-time per user) ─────────────────────────────
  if (chain.length > 0) {
    const directUplineUserId = chain[0];
    const directAff = await Affiliate.findOne({ userId: directUplineUserId });
    if (directAff && !directAff.firstSaleClaimedAt) {
      // The "first sale" trigger is for the direct upline's first downline-driven sale.
      // We mark it claimed and credit $5.
      commissions.push({
        earnerUserId: directUplineUserId,
        sourceUserId: order.buyerId,
        type: 'first_sale',
        track: null,
        orderId: order._id,
        productPriceUsd,
        amountUsd: FIRST_SALE_BONUS_USD,
        rateApplied: null,
        status: 'paid',
        paidAt: new Date(),
      });
      await Affiliate.updateOne(
        { _id: directAff._id },
        {
          $set: { firstSaleClaimedAt: new Date() },
          $inc: { 'stats.firstSaleBonusEarnedUsd': FIRST_SALE_BONUS_USD },
        }
      );
    }
  }

  // ─── Apply capping (v3.3 §13.2) BEFORE persist + credit ───────────────
  // For each commission, check daily/monthly/per-tx caps. Overflow → EHB rebate pool.
  // Caller-owned commissions array is mutated to reflect allowed amount only.
  for (const c of commissions) {
    try {
      const { allowed, overflow, reason } = await applyCapAndLog(c.earnerUserId, c.amountUsd, {
        source: c.type,
        orderId: order._id,
      });
      if (overflow > 0) {
        // Stamp commission record so admin can audit cap-trimmed entries
        c.amountUsd = allowed;
        c.notes = `cap_trimmed:${reason} · overflow $${overflow.toFixed(2)} routed to rebate pool`;
      }
    } catch (e) {
      console.warn('[affiliate] cap evaluation failed (allowing full):', e.message);
    }
  }

  // Filter out fully-zeroed commissions (cap fully blocked)
  const allowedCommissions = commissions.filter((c) => c.amountUsd > 0);

  // ─── Persist commissions + bump aggregates + CREDIT AFFILIATE WALLET ──
  if (allowedCommissions.length > 0) {
    await AffiliateCommission.insertMany(allowedCommissions);
    for (const c of allowedCommissions) {
      const incFields = {
        'stats.lifetimeEarningsUsd': c.amountUsd,
        'stats.thisMonthEarningsUsd': c.amountUsd,
      };
      if (c.type === 'direct') incFields['stats.directEarnedUsd'] = c.amountUsd;
      if (c.type === 'level') incFields['stats.level2EarnedUsd'] = c.amountUsd;

      await Affiliate.updateOne({ userId: c.earnerUserId }, { $inc: incFields });

      await Transaction.create({
        toUserId: c.earnerUserId,
        type: 'commission_credit',
        currency: 'USD',
        amount: c.amountUsd,
        status: 'completed',
        referenceId: order.orderNumber || String(order._id),
        referenceType: `affiliate_${c.type}${c.level ? `_L${c.level}` : ''}`,
        notes: c.notes,
      });

      // v3.3 — credit AffiliateWallet (80% USDT + 20% EHBGC default)
      // Audit fix #19: reverse commission if wallet refuses (frozen) or errors — keeps ledger consistent
      try {
        const walletResult = await creditAffiliateWallet(c.earnerUserId, c.amountUsd, {
          source: c.type,
          orderId: order._id,
          sourceUserId: order.buyerId,
        });
        if (walletResult?.ok === false) {
          await AffiliateCommission.updateOne(
            { earnerUserId: c.earnerUserId, orderId: order._id, type: c.type, level: c.level },
            {
              $set: {
                status: 'reversed',
                reversedAt: new Date(),
                reversedReason: `wallet_refused:${walletResult.status || 'unknown'}`,
              },
            }
          );
          console.warn(`[affiliate] wallet refused credit (${walletResult.status}); commission reversed`);
        }
      } catch (e) {
        console.warn('[affiliate] wallet credit failed:', e.message);
        // Best-effort: keep commission as 'paid' but flag for admin reconciliation
        try {
          await AffiliateCommission.updateOne(
            { earnerUserId: c.earnerUserId, orderId: order._id, type: c.type, level: c.level },
            { $set: { notes: `wallet_credit_error:${e.message}` } }
          );
        } catch (_) {}
      }
    }
  }

  // ─── Fast Sale Bonus tracker (weekly) ─────────────────────────────────
  // Triggered for the direct upline (the affiliate who closed the sale via referral link)
  if (chain.length > 0 && order.productId) {
    await evaluateFastSaleBonus(chain[0], String(order.productId), productPriceUsd, order._id);
  }

  // ─── Matching Bonus (v3.2 §12.7 #3) — fire on each Track A direct/level commission ───
  for (const c of allowedCommissions) {
    if (c.type === 'direct' || c.type === 'level') {
      try {
        await applyMatchingBonus({
          downlineEarnerId: c.earnerUserId,
          downlineEarningUsd: c.amountUsd,
          downlineCommissionType: c.type,
          orderId: order._id,
        });
      } catch (e) {
        console.warn('[affiliate] matching bonus failed:', e.message);
      }
    }
  }

  // ─── Activation Bonus (v3.2 §12.7 #5) — one-time on buyer's first purchase ───
  // Fire only if this is buyer's first qualifying order (proxied by checking for prior activation event).
  if (chain[0]) {
    try {
      await applyActivationBonus({
        buyerUserId: order.buyerId,
        referrerUserId: chain[0],
        purchaseAmountUsd: productPriceUsd,
        orderId: order._id,
      });
    } catch (e) {
      console.warn('[affiliate] activation bonus failed:', e.message);
    }
  }

  // ─── Rank engine — re-evaluate all earners after commission distribution ───
  // Auto-promotes anyone who now qualifies for higher rank + credits Rank Achievement Bonus.
  const earnerIds = [...new Set(allowedCommissions.map((c) => String(c.earnerUserId)))];
  for (const eid of earnerIds) {
    try {
      await evaluateAndPromote(eid);
    } catch (e) {
      console.warn(`[affiliate] rank evaluation failed for ${eid}:`, e.message);
    }
  }

  return {
    distributed: allowedCommissions.length,
    totalUsd: allowedCommissions.reduce((a, b) => a + b.amountUsd, 0),
    capTrimmed: commissions.filter((c) => c.notes?.startsWith('cap_trimmed')).length,
    ranksEvaluated: earnerIds.length,
  };
}

/**
 * STL Purchase Bonus — credit upline when a referral upgrades their STL level.
 * @param {string} buyerUserId - the user upgrading their STL
 * @param {number} upgradePaymentUsd - the actual payment for upgrade (NOT coin lock)
 */
export async function processStlUpgrade({ buyerUserId, upgradePaymentUsd }) {
  if (!isConnected()) return { distributed: 0 };
  if (!upgradePaymentUsd || upgradePaymentUsd <= 0) return { distributed: 0 };

  const buyerAff = await Affiliate.findOne({ userId: buyerUserId });
  if (!buyerAff) return { distributed: 0, note: 'buyer not in affiliate program' };

  const chain = [buyerAff.referredBy, ...(buyerAff.upstream || [])].filter(Boolean);
  const commissions = [];

  for (let i = 0; i < Math.min(chain.length, STL_BONUS_MAX_DEPTH_MVP); i++) {
    const upstreamUserId = chain[i];
    const level = i + 1;
    const rate = STL_BONUS_RATES[level];
    if (!rate) continue;

    const amount = upgradePaymentUsd * rate;
    if (amount <= 0) continue;

    commissions.push({
      earnerUserId: upstreamUserId,
      sourceUserId: buyerUserId,
      type: 'stl_purchase',
      track: null,
      level,
      productPriceUsd: upgradePaymentUsd,
      rateApplied: rate,
      amountUsd: amount,
      status: 'paid',
      paidAt: new Date(),
    });
  }

  if (commissions.length > 0) {
    await AffiliateCommission.insertMany(commissions);
    for (const c of commissions) {
      await Affiliate.updateOne(
        { userId: c.earnerUserId },
        {
          $inc: {
            'stats.lifetimeEarningsUsd': c.amountUsd,
            'stats.thisMonthEarningsUsd': c.amountUsd,
            'stats.stlBonusEarnedUsd': c.amountUsd,
          },
        }
      );
      await Transaction.create({
        toUserId: c.earnerUserId,
        type: 'commission_credit',
        currency: 'USD',
        amount: c.amountUsd,
        status: 'completed',
        referenceId: `stl_upgrade_${buyerUserId}_${Date.now()}`,
        referenceType: `affiliate_stl_purchase_L${c.level}`,
      });

      // v3.3 — credit AffiliateWallet
      try {
        await creditAffiliateWallet(c.earnerUserId, c.amountUsd, {
          source: 'stl_purchase',
          sourceUserId: buyerUserId,
        });
      } catch (e) {
        console.warn('[affiliate] STL wallet credit failed:', e.message);
      }
    }
  }

  return { distributed: commissions.length };
}

/**
 * Fast Sale Bonus evaluator — increments weekly counter for (affiliate × product),
 * awards a free package once threshold (4) is hit, respecting weekly cap (2).
 */
export async function evaluateFastSaleBonus(affiliateUserId, productId, productPriceUsd, orderId) {
  const aff = await Affiliate.findOne({ userId: affiliateUserId });
  if (!aff) return { awarded: false };

  const currentWeek = getIsoWeekKey();
  const tracker = aff.fastSaleTracker || {};
  const sameProductSales = tracker.sameProductSales || new Map();

  // Reset tracker if week rolled over
  let workingMap;
  let freeAwardedThisWeek = tracker.freePackagesAwardedThisWeek || 0;
  if (tracker.weekKey !== currentWeek) {
    workingMap = new Map();
    freeAwardedThisWeek = 0;
  } else {
    workingMap =
      sameProductSales instanceof Map
        ? new Map(sameProductSales)
        : new Map(Object.entries(sameProductSales));
  }

  const currentCount = (workingMap.get(productId) || 0) + 1;
  workingMap.set(productId, currentCount);

  let awarded = false;

  if (
    currentCount >= FAST_SALE_TRIGGER_COUNT &&
    currentCount % FAST_SALE_TRIGGER_COUNT === 0 && // award on 4th, 8th, 12th… same-pkg sale
    freeAwardedThisWeek < FAST_SALE_WEEKLY_FREE_CAP
  ) {
    awarded = true;
    freeAwardedThisWeek += 1;

    await AffiliateCommission.create({
      earnerUserId: affiliateUserId,
      type: 'fast_sale',
      track: null,
      orderId,
      productPriceUsd,
      amountUsd: productPriceUsd, // 1 FREE same-pkg = same value
      rateApplied: null,
      status: 'paid',
      paidAt: new Date(),
    });

    await Affiliate.updateOne(
      { _id: aff._id },
      {
        $inc: { 'stats.fastSaleBonusFreePackages': 1 },
      }
    );

    // v3.3 — credit AffiliateWallet (free pkg = USD-equivalent of price)
    try {
      await creditAffiliateWallet(affiliateUserId, productPriceUsd, {
        source: 'fast_sale',
        orderId,
      });
    } catch (e) {
      console.warn('[affiliate] fast-sale wallet credit failed:', e.message);
    }
  }

  // Persist updated tracker
  await Affiliate.updateOne(
    { _id: aff._id },
    {
      $set: {
        'fastSaleTracker.weekKey': currentWeek,
        'fastSaleTracker.sameProductSales': Object.fromEntries(workingMap),
        'fastSaleTracker.freePackagesAwardedThisWeek': freeAwardedThisWeek,
      },
    }
  );

  return { awarded, weekKey: currentWeek, currentCount, freeAwardedThisWeek };
}

/** List my commissions, optionally filtered by type. */
export async function listMyCommissions(userId, { limit = 50, type } = {}) {
  if (!isConnected()) return [];
  const q = { earnerUserId: userId };
  if (type) q.type = type;
  return AffiliateCommission.find(q).sort({ createdAt: -1 }).limit(limit).lean();
}

/**
 * Earnings breakdown by source — for affiliate dashboard widget.
 * Returns: { direct, level2, firstSale, stlBonus, fastSaleFreePackages, total }
 */
export async function getEarningsBreakdown(userId) {
  if (!isConnected()) return null;
  const aff = await Affiliate.findOne({ userId }).lean();
  if (!aff) return null;
  return {
    direct: aff.stats?.directEarnedUsd || 0,
    level2: aff.stats?.level2EarnedUsd || 0,
    firstSale: aff.stats?.firstSaleBonusEarnedUsd || 0,
    stlBonus: aff.stats?.stlBonusEarnedUsd || 0,
    fastSaleFreePackages: aff.stats?.fastSaleBonusFreePackages || 0,
    total: aff.stats?.lifetimeEarningsUsd || 0,
    pending: aff.stats?.pendingEarningsUsd || 0,
  };
}

/**
 * Refund clawback — called by orderService when an order is refunded within 90 days.
 * Reverses all commissions tied to the order; debits stats.
 */
export async function reverseOrderCommissions({ orderId, reason = 'refund' }) {
  if (!isConnected()) return { reversed: 0 };
  const commissions = await AffiliateCommission.find({
    orderId,
    status: 'paid',
  }).lean();

  if (commissions.length === 0) return { reversed: 0 };

  await AffiliateCommission.updateMany(
    { orderId, status: 'paid' },
    { $set: { status: 'reversed', reversedAt: new Date(), reversedReason: reason } }
  );

  for (const c of commissions) {
    const dec = {
      'stats.lifetimeEarningsUsd': -c.amountUsd,
      'stats.thisMonthEarningsUsd': -c.amountUsd,
    };
    if (c.type === 'direct') dec['stats.directEarnedUsd'] = -c.amountUsd;
    if (c.type === 'level') dec['stats.level2EarnedUsd'] = -c.amountUsd;
    if (c.type === 'first_sale') dec['stats.firstSaleBonusEarnedUsd'] = -c.amountUsd;
    if (c.type === 'stl_purchase') dec['stats.stlBonusEarnedUsd'] = -c.amountUsd;

    await Affiliate.updateOne({ userId: c.earnerUserId }, { $inc: dec });

    // v3.3 — debit AffiliateWallet (refund clawback per §13.6.7 90-day rule)
    try {
      await debitAffiliateWalletForReversal(c.earnerUserId, c.amountUsd, {
        reason,
        orderId,
        originalCommissionType: c.type,
      });
    } catch (e) {
      console.warn('[affiliate] wallet clawback failed:', e.message);
    }
  }

  return { reversed: commissions.length };
}

// ─── BACKWARD COMPAT (v1.0 callers) ───────────────────────────────────────
// Some existing code may still call distributeCommissions(order); alias to new function.
export const distributeCommissions = processProductOrder;

// Constants exported for /info endpoint introspection
export const RATES = TRACK_A_LEVEL_RATES;
export const BONUS_CONFIG = {
  firstSaleUsd: FIRST_SALE_BONUS_USD,
  stlBonusRates: STL_BONUS_RATES,
  fastSale: {
    triggerCount: FAST_SALE_TRIGGER_COUNT,
    weeklyFreeCap: FAST_SALE_WEEKLY_FREE_CAP,
  },
};
