// Affiliate Routes — v3.2-MVP
// Spec: ehb-info/departments/Affiliate.md §12 (v3.2)
// MVP scope: Track A 2-level cascade + 3 bonuses + DAM-ready referral link generator.

import { Router } from 'express';
import {
  joinAffiliate,
  getMyAffiliate,
  getNetworkTree,
  listMyCommissions,
  getEarningsBreakdown,
  buildReferralLink,
  processStlUpgrade,
  reverseOrderCommissions,
  TRACK_A_LEVEL_RATES,
  TRACK_A_NETWORK_POOL_PERCENT,
  MVP_MAX_DEPTH,
  BONUS_CONFIG,
} from '../services/affiliateService.js';
import {
  getCapStatus,
  DAILY_CAP_BY_RANK,
  MONTHLY_CAP_MULTIPLIER,
  PER_TX_CAP_USD,
} from '../services/cappingService.js';
import {
  getRankProgress,
  evaluateAndPromote,
  RANK_REQUIREMENTS,
  RANK_ACHIEVEMENT_BONUS_USD,
} from '../services/rankEngineService.js';
import { processFranchiseSale, TRACK_B_LEVEL_RATES, TRACK_B_TOTAL_RATE } from '../services/trackBService.js';
import {
  evaluateTeamPerformanceBonus,
  evaluateRetentionUplift,
  awardMonthlyLeaderBonuses,
  applySuperFranchiseBonus,
  distributeGlobalPool,
  BONUS_CONFIG as ALL_BONUSES_CONFIG,
} from '../services/bonusService.js';
import { listAllCategories, getRatesForIndustry } from '../services/industryRateService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/affiliate/leaderboard
 * Public — country-wise top earners (10 ranked by lifetime/monthly earnings).
 * Per Affiliate.md §9 endpoints. Optional filter: ?country=PK&period=monthly
 *
 * Falls back to demo data when DB is empty.
 */
router.get('/leaderboard', async (req, res) => {
  const country = (req.query.country || 'all').toString().toUpperCase();
  const period = (req.query.period || 'monthly').toString();
  const limit = Math.min(50, Number(req.query.limit || 10));

  const DEMO_LEADERBOARD = [
    { rank: 1, name: 'Ahmed K.', initial: 'AK', country: 'PK', rankBadge: 'R7', monthlyUsd: 3180, lifetimeUsd: 42400, network: 1240, joinedMonths: 14 },
    { rank: 2, name: 'Sarah J.', initial: 'SJ', country: 'PK', rankBadge: 'R6', monthlyUsd: 2840, lifetimeUsd: 38200, network: 982, joinedMonths: 12 },
    { rank: 3, name: 'Imran S.', initial: 'IS', country: 'PK', rankBadge: 'R5', monthlyUsd: 1920, lifetimeUsd: 28400, network: 720, joinedMonths: 10 },
    { rank: 4, name: 'Zara B.', initial: 'ZB', country: 'PK', rankBadge: 'R5', monthlyUsd: 1640, lifetimeUsd: 24800, network: 612, joinedMonths: 9 },
    { rank: 5, name: 'Fatima A.', initial: 'FA', country: 'PK', rankBadge: 'R4', monthlyUsd: 1240, lifetimeUsd: 18200, network: 482, joinedMonths: 8 },
    { rank: 6, name: 'Bilal F.', initial: 'BF', country: 'PK', rankBadge: 'R4', monthlyUsd: 980, lifetimeUsd: 14600, network: 380, joinedMonths: 7 },
    { rank: 7, name: 'Nadia S.', initial: 'NS', country: 'PK', rankBadge: 'R3', monthlyUsd: 720, lifetimeUsd: 9800, network: 240, joinedMonths: 6 },
    { rank: 8, name: 'Hassan M.', initial: 'HM', country: 'PK', rankBadge: 'R3', monthlyUsd: 580, lifetimeUsd: 7200, network: 198, joinedMonths: 5 },
    { rank: 9, name: 'Ayesha R.', initial: 'AR', country: 'PK', rankBadge: 'R3', monthlyUsd: 420, lifetimeUsd: 5400, network: 142, joinedMonths: 4 },
    { rank: 10, name: 'Omar T.', initial: 'OT', country: 'PK', rankBadge: 'R2', monthlyUsd: 280, lifetimeUsd: 3200, network: 89, joinedMonths: 3 },
  ];

  try {
    const { default: Affiliate } = await import('../models/Affiliate.js');
    const total = await Affiliate.countDocuments();

    if (total === 0) {
      // Filter demo by country
      let demo = DEMO_LEADERBOARD;
      if (country !== 'ALL') demo = demo.filter((d) => d.country === country);
      return res.json({
        period,
        country,
        total: demo.length,
        leaderboard: demo.slice(0, limit),
        isDemoData: true,
        generatedAt: new Date().toISOString(),
      });
    }

    // Real data — sort by lifetime/monthly earnings, apply country filter, limit
    const matchStage = country !== 'ALL' ? { country } : {};
    const sortField = period === 'lifetime' ? 'stats.lifetimeEarningsUsd' : 'stats.thisMonthEarningsUsd';

    const leaderboard = await Affiliate.find(matchStage)
      .select('_id userId referralCode rank stats country createdAt')
      .sort({ [sortField]: -1 })
      .limit(limit)
      .lean();

    res.json({
      period,
      country,
      total: leaderboard.length,
      leaderboard: leaderboard.map((a, i) => ({
        rank: i + 1,
        userId: a.userId,
        rankBadge: a.rank,
        country: a.country || 'PK',
        monthlyUsd: a.stats?.thisMonthEarningsUsd || 0,
        lifetimeUsd: a.stats?.lifetimeEarningsUsd || 0,
        network: a.stats?.networkSize || 0,
      })),
      isDemoData: false,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    res.json({
      period,
      country,
      total: DEMO_LEADERBOARD.length,
      leaderboard: DEMO_LEADERBOARD.slice(0, limit),
      isDemoData: true,
      generatedAt: new Date().toISOString(),
    });
  }
});

/**
 * POST /api/affiliate/promotional-assets/download
 * Auth required — logs a download event for analytics + returns asset metadata.
 * Per Affiliate.md §9 endpoints + §6.4 promotional assets.
 *
 * Body:
 *   { assetType: 'banner' | 'copy_template' | 'email_signature' | 'pitch',
 *     assetId: string, format?: 'svg'|'png'|'html'|'text' }
 *
 * Response: { assetUrl, downloadCount, asset: {...} }
 */
router.post('/promotional-assets/download', requireAuth, async (req, res) => {
  const { assetType, assetId, format = 'svg' } = req.body || {};

  if (!assetType || !assetId) {
    return res.status(400).json({ error: 'assetType and assetId are required' });
  }

  const validTypes = ['banner', 'copy_template', 'email_signature', 'pitch'];
  if (!validTypes.includes(assetType)) {
    return res.status(400).json({ error: `assetType must be one of: ${validTypes.join(', ')}` });
  }

  // Demo asset metadata (frontend already generates SVGs via AffiliatePromoMaterials component)
  const ASSET_CATALOG = {
    banner: {
      square: { name: 'Square', size: '1080×1080', useCase: 'Instagram · WhatsApp DP' },
      story: { name: 'Story', size: '1080×1920', useCase: 'IG/FB Stories · WA Status' },
      landscape: { name: 'Landscape', size: '1200×628', useCase: 'Twitter · LinkedIn · FB' },
      leaderboard: { name: 'Leaderboard', size: '728×90', useCase: 'Web banner ad' },
      sidebar: { name: 'Sidebar', size: '300×600', useCase: 'Web sidebar ad' },
      sig: { name: 'Email signature', size: '600×120', useCase: 'Gmail / Outlook' },
    },
    copy_template: {
      short: { name: 'Short (SMS / Twitter)', maxChars: 280 },
      medium: { name: 'Medium (WhatsApp / DM)', maxChars: 600 },
      long: { name: 'Long-form (FB / LinkedIn)', maxChars: 2000 },
      pro: { name: 'Professional (Cold email)', maxChars: 2000 },
    },
    email_signature: {
      default: { name: 'EHB Affiliate Signature (HTML)', format: 'html' },
    },
    pitch: {
      OBS: { name: 'Education / Online Business School' },
      WMS: { name: 'Wellness & Medical' },
      OLS: { name: 'Online Legal Services' },
      GSM: { name: 'GoSellr Marketplace' },
      JPS: { name: 'Jobs & Skills' },
    },
  };

  const asset = ASSET_CATALOG[assetType]?.[assetId];
  if (!asset) {
    return res.status(404).json({ error: `Asset not found: ${assetType}/${assetId}` });
  }

  // Phase 2 todo: persist download event to AffiliateAssetDownload collection
  // For now, log to console + return metadata
  // eslint-disable-next-line no-console
  console.info(
    `[promotional-assets] user=${req.user?.id} downloaded ${assetType}/${assetId} (${format})`
  );

  res.json({
    success: true,
    asset: {
      type: assetType,
      id: assetId,
      format,
      ...asset,
    },
    // Frontend already has SVG generator; this URL is a future S3 placeholder
    assetUrl: `/api/affiliate/promotional-assets/${assetType}/${assetId}.${format}`,
    note: 'Frontend AffiliatePromoMaterials component generates SVG/HTML inline; this endpoint logs the download for analytics.',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/affiliate/promotional-assets/catalog
 * Public — list all available promotional assets (banners, copy, pitches).
 */
router.get('/promotional-assets/catalog', (req, res) => {
  res.json({
    banners: [
      { id: 'square', name: 'Square (1080×1080)', useCase: 'Instagram · WhatsApp DP' },
      { id: 'story', name: 'Story (1080×1920)', useCase: 'IG/FB Stories · WA Status' },
      { id: 'landscape', name: 'Landscape (1200×628)', useCase: 'Twitter · LinkedIn · FB' },
      { id: 'leaderboard', name: 'Leaderboard (728×90)', useCase: 'Web banner ad' },
      { id: 'sidebar', name: 'Sidebar (300×600)', useCase: 'Web sidebar ad' },
      { id: 'sig', name: 'Email signature (600×120)', useCase: 'Gmail / Outlook' },
    ],
    copyTemplates: [
      { id: 'short', name: 'Short (SMS / Twitter)', maxChars: 280 },
      { id: 'medium', name: 'Medium (WhatsApp / DM)', maxChars: 600 },
      { id: 'long', name: 'Long-form (FB / LinkedIn post)', maxChars: 2000 },
      { id: 'pro', name: 'Professional (Cold email)', maxChars: 2000 },
    ],
    industryPitches: [
      { id: 'OBS', name: 'Education / Online Business School' },
      { id: 'WMS', name: 'Wellness & Medical' },
      { id: 'OLS', name: 'Online Legal Services' },
      { id: 'GSM', name: 'GoSellr Marketplace' },
      { id: 'JPS', name: 'Jobs & Skills' },
    ],
    note: 'Per Affiliate.md §6.4 + §17.6 — frontend AffiliatePromoMaterials component generates assets client-side with referral code embedded.',
  });
});

/**
 * GET /api/affiliate/stats
 * Public — platform-wide aggregate counters for the Welcome page.
 * Falls back to realistic pilot-phase demo numbers when DB is empty / offline.
 */
router.get('/stats', async (req, res) => {
  // Demo fallback (used during pilot before real data accumulates).
  const DEMO_STATS = {
    totalAffiliates: 12847,
    activeThisMonth: 4612,
    medianMonthlyEarningsUsd: 47.0,
    top1PctMonthlyUsd: 3240.0,
    top10PctMonthlyUsd: 612.0,
    lifetimePaidOutUsd: 1200000,
    countriesActive: 1,
    pilotCountry: 'PK',
    rankDistribution: {
      R1: 8420, R2: 2410, R3: 980, R4: 540, R5: 280,
      R6: 130, R7: 60, R8: 20, R9: 6, R10: 1,
    },
    industryEarningsLeaderboard: [
      { code: 'GSM', label: 'GoSellr Marketplace', monthlyUsd: 18420 },
      { code: 'OBS', label: 'Online Business School', monthlyUsd: 12180 },
      { code: 'WMS', label: 'Wellness & Medical', monthlyUsd: 8940 },
      { code: 'JPS', label: 'Jobs & Skills', monthlyUsd: 6720 },
      { code: 'OLS', label: 'Online Legal', monthlyUsd: 4280 },
    ],
    isDemoData: true,
    generatedAt: new Date().toISOString(),
  };

  try {
    const { default: Affiliate } = await import('../models/Affiliate.js');
    const total = await Affiliate.countDocuments();
    if (total === 0) return res.json(DEMO_STATS);

    const activeThisMonth = await Affiliate.countDocuments({ 'stats.thisMonthEarningsUsd': { $gt: 0 } });
    const allEarnings = await Affiliate.find({}).select('stats rank').lean();
    const monthly = allEarnings.map((a) => a.stats?.thisMonthEarningsUsd || 0).sort((a, b) => a - b);
    const median = monthly[Math.floor(monthly.length / 2)] || 0;
    const top1 = monthly[Math.floor(monthly.length * 0.99)] || 0;
    const top10 = monthly[Math.floor(monthly.length * 0.9)] || 0;
    const lifetime = allEarnings.reduce((s, a) => s + (a.stats?.lifetimeEarningsUsd || 0), 0);
    const rankBuckets = {};
    for (const a of allEarnings) {
      const r = a.rank || 'R1';
      rankBuckets[r] = (rankBuckets[r] || 0) + 1;
    }

    res.json({
      totalAffiliates: total,
      activeThisMonth,
      medianMonthlyEarningsUsd: +median.toFixed(2),
      top1PctMonthlyUsd: +top1.toFixed(2),
      top10PctMonthlyUsd: +top10.toFixed(2),
      lifetimePaidOutUsd: +lifetime.toFixed(2),
      countriesActive: 1,
      pilotCountry: 'PK',
      rankDistribution: rankBuckets,
      industryEarningsLeaderboard: DEMO_STATS.industryEarningsLeaderboard, // TODO Phase 2: aggregate from commissions
      isDemoData: false,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    res.json(DEMO_STATS);
  }
});

/**
 * GET /api/affiliate/info
 * Public — returns the v3.2-MVP rates + bonus config so UIs can render dynamically.
 */
router.get('/info', (req, res) => {
  res.json({
    spec: 'EHB Affiliate v3.2-MVP',
    track: 'A (Product Affiliate)',
    mvpMaxDepth: MVP_MAX_DEPTH,
    networkPoolPercent: TRACK_A_NETWORK_POOL_PERCENT * 100,
    levelRates: TRACK_A_LEVEL_RATES,
    bonuses: BONUS_CONFIG,
    description:
      'Track A: 5% network pool of product price split L1=3% / L2=1.5% (L3=0.5% deferred to Phase 2). ' +
      'Bonuses: First Sale ($5 fixed), STL Purchase (3%/2%), Fast Sale (4 sales/wk → 1 free pkg, cap 2/wk).',
  });
});

/**
 * POST /api/affiliate/join
 * Authenticated — creates affiliate record (idempotent).
 * Body: { referredByCode?: string }
 */
router.post('/join', requireAuth, async (req, res, next) => {
  try {
    const aff = await joinAffiliate({
      userId: req.user.id,
      referredByCode: req.body?.referredByCode,
    });
    res.json(aff);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

/**
 * GET /api/affiliate/me
 * Authenticated — fetch my affiliate record.
 */
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const aff = await getMyAffiliate(req.user.id);
    res.json(aff || { note: 'not yet joined' });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/tree?depth=2
 * Authenticated — network tree (MVP capped at depth 2).
 */
router.get('/tree', requireAuth, async (req, res, next) => {
  try {
    const requestedDepth = Number(req.query.depth || MVP_MAX_DEPTH);
    const depth = Math.min(requestedDepth, MVP_MAX_DEPTH);
    const tree = await getNetworkTree(req.user.id, depth);
    res.json(tree);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/commissions?limit=50&type=direct
 * Authenticated — list my commissions, optionally filtered by type.
 */
router.get('/commissions', requireAuth, async (req, res, next) => {
  try {
    const commissions = await listMyCommissions(req.user.id, {
      limit: Number(req.query.limit || 50),
      type: req.query.type,
    });
    res.json({ commissions });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/earnings/breakdown
 * Authenticated — earnings breakdown by source for dashboard widget.
 */
router.get('/earnings/breakdown', requireAuth, async (req, res, next) => {
  try {
    const breakdown = await getEarningsBreakdown(req.user.id);
    if (!breakdown) return res.status(404).json({ error: 'affiliate record not found' });
    res.json(breakdown);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/caps
 * Authenticated — current cap status (daily/monthly used + remaining + per-tx cap).
 */
router.get('/caps', requireAuth, async (req, res, next) => {
  try {
    const status = await getCapStatus(req.user.id);
    res.json(status);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/rank/progress
 * Authenticated — current rank + metrics + progress toward next rank.
 */
router.get('/rank/progress', requireAuth, async (req, res, next) => {
  try {
    const progress = await getRankProgress(req.user.id);
    res.json(progress);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/affiliate/rank/evaluate
 * Authenticated — manual trigger to re-evaluate + promote if eligible.
 */
router.post('/rank/evaluate', requireAuth, async (req, res, next) => {
  try {
    const result = await evaluateAndPromote(req.user.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/rank/ladder
 * Public — full R1-R10 ladder + bonuses.
 */
router.get('/rank/ladder', (req, res) => {
  res.json({
    ranks: RANK_REQUIREMENTS,
    achievementBonusUsd: RANK_ACHIEVEMENT_BONUS_USD,
    note:
      'Founder-locked v3.2 §12.5: R1 Starter → R10 Global Leader. ' +
      'R10 STL capped at L8 (achievable via Franchise alone). ' +
      'Rank Achievement Bonus (major ranks only): R3 $100 · R5 $500 · R7 $2,000 · R10 $10,000.',
  });
});

/**
 * GET /api/affiliate/caps/ladder
 * Public — full rank-cap ladder for transparency / dashboards.
 */
router.get('/caps/ladder', (req, res) => {
  res.json({
    dailyByRank: DAILY_CAP_BY_RANK,
    monthlyCapMultiplier: MONTHLY_CAP_MULTIPLIER,
    perTxCapUsd: PER_TX_CAP_USD,
    note:
      'Founder-locked v3.3 §13.2: per-rank daily cap (R1 $100 → R10 $5,000). ' +
      'Monthly = 25× daily. Per-tx hard cap $10K. ' +
      'Overflow → EHB rebate pool (NEVER clawed back; user keeps already-earned).',
  });
});

/**
 * GET /api/affiliate/referral-link?productId=optional
 * Authenticated — generate a referral link for sharing (with optional product context for DAM).
 */
router.get('/referral-link', requireAuth, async (req, res, next) => {
  try {
    const aff = await getMyAffiliate(req.user.id);
    if (!aff) return res.status(404).json({ error: 'affiliate not joined yet — call /join first' });

    const baseUrl = process.env.PUBLIC_BASE_URL || 'ehb.com';
    const link = buildReferralLink({
      baseUrl,
      referralCode: aff.referralCode,
      productId: req.query.productId,
    });
    res.json({ referralCode: aff.referralCode, link });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/track-b/info
 * Public — Track B (10-level franchise cascade) rates + total.
 */
router.get('/track-b/info', (req, res) => {
  res.json({
    spec: 'EHB Affiliate Track B — Franchise Sale Cascade',
    levelRates: TRACK_B_LEVEL_RATES,
    totalCascadePercent: +(TRACK_B_TOTAL_RATE * 100).toFixed(2),
    rankGated: true,
    note: 'Each upline earns levels their rank unlocks. R1=L1 only · R10=L1-L10. Unclaimed % → EHB rebate pool.',
  });
});

/**
 * POST /api/affiliate/track-b/process
 * Internal — trigger Track B distribution on franchise purchase.
 * Body: { buyerId, franchiseTier, priceUsd, purchaseId }
 */
router.post(
  '/track-b/process',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'AI_SYSTEM'),
  async (req, res, next) => {
    try {
      const { buyerId, franchiseTier, priceUsd, purchaseId } = req.body || {};
      if (!buyerId || !priceUsd) {
        return res.status(400).json({ error: 'buyerId + priceUsd required' });
      }
      const result = await processFranchiseSale({ buyerId, franchiseTier, priceUsd, purchaseId });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * GET /api/affiliate/bonuses/info
 * Public — full 11-bonus catalog with current config.
 */
router.get('/bonuses/info', (req, res) => {
  res.json({
    spec: 'EHB Affiliate v3.2 §12.7 — 11-Bonus Catalog',
    bonuses: {
      // Tier 1 — Auto-Cascade
      fast_sale: { tier: 'auto', ...BONUS_CONFIG.fastSale },
      stl_purchase: { tier: 'auto', ...BONUS_CONFIG.stlBonusRates },
      matching: { tier: 'auto', ...ALL_BONUSES_CONFIG.matching },
      // Tier 2 — Achievement
      first_sale: { tier: 'achievement', amountUsd: BONUS_CONFIG.firstSaleUsd },
      activation: { tier: 'achievement', ...ALL_BONUSES_CONFIG.activation },
      rank_achievement: { tier: 'achievement', amounts: RANK_ACHIEVEMENT_BONUS_USD },
      // Tier 3 — Performance
      team_performance: { tier: 'performance', ...ALL_BONUSES_CONFIG.teamPerformance },
      retention: { tier: 'performance', ...ALL_BONUSES_CONFIG.retention },
      monthly_leader: { tier: 'performance', ...ALL_BONUSES_CONFIG.monthlyLeader },
      // Tier 4 — Elite
      super_franchise: { tier: 'elite', ...ALL_BONUSES_CONFIG.superFranchise },
      global_pool: { tier: 'elite', ...ALL_BONUSES_CONFIG.globalPool },
    },
  });
});

/**
 * POST /api/affiliate/bonuses/team-performance/evaluate
 * Authenticated — manual trigger for monthly Team Performance Bonus.
 */
router.post('/bonuses/team-performance/evaluate', requireAuth, async (req, res, next) => {
  try {
    const result = await evaluateTeamPerformanceBonus(req.user.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/affiliate/bonuses/retention/uplift
 * Authenticated — current retention uplift percentage.
 */
router.get('/bonuses/retention/uplift', requireAuth, async (req, res, next) => {
  try {
    const result = await evaluateRetentionUplift(req.user.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/affiliate/bonuses/monthly-leader/award
 * Admin — award Monthly Leader Bonus to top 10 (per country).
 */
router.post(
  '/bonuses/monthly-leader/award',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const { country, prizeUsdEach } = req.body || {};
      const result = await awardMonthlyLeaderBonuses({ country, prizeUsdEach });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * POST /api/affiliate/bonuses/global-pool/distribute
 * Admin — distribute Global Pool Bonus among R8+ users.
 * Body: { poolUsd } - typically 1% of monthly NET PROFIT
 */
router.post(
  '/bonuses/global-pool/distribute',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR'),
  async (req, res, next) => {
    try {
      const { poolUsd } = req.body || {};
      if (!poolUsd || poolUsd <= 0) {
        return res.status(400).json({ error: 'poolUsd > 0 required' });
      }
      const result = await distributeGlobalPool({ poolUsd });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * GET /api/affiliate/industries/categories
 * Public — full industry → category mapping with rates.
 */
router.get('/industries/categories', (req, res) => {
  res.json({
    spec: 'EHB Affiliate v3.2 §12.6 — 6 Industry Categories',
    categories: listAllCategories(),
  });
});

/**
 * GET /api/affiliate/industries/:industryCode/rates
 * Public — get the rate structure for a specific industry.
 */
router.get('/industries/:industryCode/rates', (req, res) => {
  const rates = getRatesForIndustry(req.params.industryCode);
  res.json({ industryCode: req.params.industryCode, ...rates });
});

/**
 * POST /api/affiliate/stl-upgrade-bonus
 * Internal trigger — called by stlService when a user upgrades their STL level.
 * Body: { buyerUserId, upgradePaymentUsd }
 * Restricted to internal services or DMO admins.
 */
router.post(
  '/stl-upgrade-bonus',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'AI_SYSTEM'),
  async (req, res, next) => {
    try {
      const { buyerUserId, upgradePaymentUsd } = req.body || {};
      if (!buyerUserId || !upgradePaymentUsd) {
        return res.status(400).json({ error: 'buyerUserId + upgradePaymentUsd required' });
      }
      const r = await processStlUpgrade({
        buyerUserId,
        upgradePaymentUsd: Number(upgradePaymentUsd),
      });
      res.json(r);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * POST /api/affiliate/reverse-order
 * Internal — refund clawback hook. Called by orderService on refund.
 * Body: { orderId, reason? }
 */
router.post(
  '/reverse-order',
  requireAuth,
  requireRole('SUPER_ADMIN', 'DMO_DIRECTOR', 'AI_SYSTEM'),
  async (req, res, next) => {
    try {
      const { orderId, reason } = req.body || {};
      if (!orderId) return res.status(400).json({ error: 'orderId required' });
      const r = await reverseOrderCommissions({ orderId, reason });
      res.json(r);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
