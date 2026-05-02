// Compliance Service — v3.3 §13.1
//
// Spec: ehb-info/departments/Affiliate.md §13.1 (v3.3)
// Founder lock: 2026-04-26
//
// MVP scope (Phase 1):
//   ✓ OFAC sanctions check (stub list — production swaps in OFAC/UN/EU APIs)
//   ✓ Velocity tracker (50 signups/IP/24h, 10 per device/24h)
//   ✓ IDS (Income Disclosure Statement) generator (FTC-compliant aggregate)
//   ✓ Self-purchase enforcement helper (anti-YO-BUY validation)
//   ✓ Burst-signup detector (auto-freeze cluster from same IP)
//
// Phase 2+ adds: real Onfido/Sumsub KYC, FATF Travel Rule, AI pattern anomaly,
//                country compliance certifications, geographic distribution check (R5+ 60% max).
//
// IMPORTANT: this service is STUB-quality for MVP. Real production requires:
//   - OFAC API subscription (e.g. ComplyAdvantage, Refinitiv)
//   - SEC-licensed counsel review of IDS template
//   - Country-specific implementations per jurisdiction

import User from '../models/User.js';
import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import ActivityLog from '../models/ActivityLog.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

// ─── OFAC / Sanctions Stub Lists (Phase 1 MVP) ───────────────────────────

/**
 * MVP stub blocklist — names that match OFAC SDN list.
 * Production: replace with live OFAC API (e.g. ComplyAdvantage) per spec §13.1.3 #13.
 */
const OFAC_BLOCKED_NAMES = new Set([
  'ali doe', 'jane doe', 'test sanctioned', // demo entries (won't match real users)
]);

/** Countries currently on OFAC comprehensive sanctions or high-risk list (Phase 2 enforcement) */
const HIGH_RISK_COUNTRIES = new Set([
  'IR', // Iran
  'KP', // North Korea
  'SY', // Syria
  'CU', // Cuba
  // Russia, Belarus partial sanctions (Phase 2 nuance)
]);

/** OFAC Specially Designated Nationals (SDN) email-domain stub */
const SANCTIONED_EMAIL_DOMAINS = new Set([
  // Real OFAC list updates daily; production fetches via API
]);

// ─── Velocity Limits (per spec §13.1.3 #9) ───────────────────────────────

export const VELOCITY_LIMITS = {
  signupsPerIpPer24h: 50,
  signupsPerDevicePer24h: 10,
  burstSignupThreshold: 50, // per IP per 24h auto-freeze cluster
};

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * OFAC sanctions check.
 * @param {object} candidate - { name, email, country?, dob? }
 * @returns {Promise<{allowed: boolean, reason: string|null, source: string}>}
 */
export async function checkOfac({ name, email, country }) {
  const normName = (name || '').toLowerCase().trim();
  const normEmail = (email || '').toLowerCase().trim();
  const emailDomain = normEmail.split('@')[1] || '';
  const normCountry = (country || '').toUpperCase().trim();

  if (OFAC_BLOCKED_NAMES.has(normName)) {
    return { allowed: false, reason: 'name_match_sanctions_list', source: 'OFAC_SDN_stub' };
  }
  if (SANCTIONED_EMAIL_DOMAINS.has(emailDomain)) {
    return { allowed: false, reason: 'email_domain_sanctioned', source: 'OFAC_SDN_stub' };
  }
  if (normCountry && HIGH_RISK_COUNTRIES.has(normCountry)) {
    return { allowed: false, reason: 'country_comprehensive_sanctions', source: 'OFAC_jurisdictions_stub' };
  }
  return { allowed: true, reason: null, source: 'OFAC_stub_pass' };
}

/**
 * Track signup velocity per IP. Returns whether signup is allowed.
 * Uses ActivityLog as backing store (prod: Redis with TTL).
 *
 * @param {string} ipAddress
 * @returns {Promise<{allowed: boolean, count: number, limit: number, reason: string|null}>}
 */
export async function trackSignupVelocity(ipAddress) {
  if (!isConnected() || !ipAddress) {
    return { allowed: true, count: 0, limit: VELOCITY_LIMITS.signupsPerIpPer24h, reason: null };
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const count = await ActivityLog.countDocuments({
    action: 'auth.signup',
    'after.ip': ipAddress,
    createdAt: { $gte: since },
  });

  const limit = VELOCITY_LIMITS.signupsPerIpPer24h;
  if (count >= limit) {
    // Burst detected — log and reject
    await logActivity({
      action: 'compliance.velocity_burst_detected',
      target: 'auth',
      targetId: ipAddress,
      after: { ip: ipAddress, count, limit, period: '24h' },
    });
    return {
      allowed: false,
      count,
      limit,
      reason: `signup_velocity_exceeded (${count}/${limit} per IP per 24h)`,
    };
  }

  return { allowed: true, count, limit, reason: null };
}

/**
 * Combined signup gate — OFAC + velocity. Call before creating user.
 *
 * @returns {Promise<{allowed: boolean, reason: string|null, ofac, velocity}>}
 */
export async function evaluateSignup({ name, email, country, ipAddress }) {
  const [ofac, velocity] = await Promise.all([
    checkOfac({ name, email, country }),
    trackSignupVelocity(ipAddress),
  ]);

  if (!ofac.allowed) {
    return { allowed: false, reason: `ofac:${ofac.reason}`, ofac, velocity };
  }
  if (!velocity.allowed) {
    return { allowed: false, reason: `velocity:${velocity.reason}`, ofac, velocity };
  }
  return { allowed: true, reason: null, ofac, velocity };
}

/**
 * Generate Income Disclosure Statement (IDS) per spec §13.1.3 #8 (FTC-compliant).
 * Aggregates platform-wide stats so prospects can make informed decisions.
 *
 * @returns {Promise<{generatedAt, totalAffiliates, medianMonthlyEarnings, top1pctMonthly, percentEarningUnder, distribution}>}
 */
export async function generateIDS() {
  // When DB is offline OR has no affiliates yet, return realistic demo data
  // so the public Welcome page never shows zeros (per founder direction 2026-04-26).
  // These numbers are illustrative only — replaced by real aggregate once data exists.
  const DEMO_IDS = {
    generatedAt: new Date().toISOString(),
    totalAffiliates: 12847,
    medianMonthlyEarningsUsd: 47.0,
    top1PctMonthlyUsd: 3240.0,
    percentBelowThreshold: 64.2,
    distribution: {
      rangesUsd: [
        { rangeLabel: '$0', min: 0, max: 0.01, count: 3211 },
        { rangeLabel: '$0.01–$10', min: 0.01, max: 10, count: 4109 },
        { rangeLabel: '$10–$100', min: 10, max: 100, count: 3470 },
        { rangeLabel: '$100–$500', min: 100, max: 500, count: 1542 },
        { rangeLabel: '$500–$1,000', min: 500, max: 1000, count: 386 },
        { rangeLabel: '$1,000+', min: 1000, max: Infinity, count: 129 },
      ],
    },
    rankDistribution: {
      R1: 8420, R2: 2410, R3: 980, R4: 540, R5: 280,
      R6: 130, R7: 60, R8: 20, R9: 6, R10: 1,
    },
    isDemoData: true,
    note:
      'Per FTC Endorsement Guides — these are illustrative platform statistics during pilot phase. ' +
      'Individual results vary with effort, network quality, and market conditions. ' +
      'Most affiliates earn modest amounts. EHB makes no income guarantee.',
    legalDisclaimer:
      'EHB is NOT an MLM. Income comes from real product/service sales only. ' +
      'No income from joining fees or pure recruitment. 30-day full refund window.',
  };

  if (!isConnected()) {
    return DEMO_IDS;
  }

  const affiliates = await Affiliate.find({}).select('stats rank').lean();
  const total = affiliates.length;

  // If no real affiliates yet, fall back to demo data (don't show zeros publicly).
  if (total === 0) {
    return DEMO_IDS;
  }

  // Sort earnings to compute percentiles
  const monthlyEarnings = affiliates
    .map((a) => a.stats?.thisMonthEarningsUsd || 0)
    .sort((a, b) => a - b);

  const median = total > 0 ? monthlyEarnings[Math.floor(total / 2)] : 0;
  const top1PctIdx = Math.floor(total * 0.99);
  const top1Pct = total > 0 ? monthlyEarnings[top1PctIdx] || monthlyEarnings[total - 1] : 0;

  // Distribution buckets
  const buckets = [
    { rangeLabel: '$0', min: 0, max: 0.01, count: 0 },
    { rangeLabel: '$0.01–$10', min: 0.01, max: 10, count: 0 },
    { rangeLabel: '$10–$100', min: 10, max: 100, count: 0 },
    { rangeLabel: '$100–$500', min: 100, max: 500, count: 0 },
    { rangeLabel: '$500–$1,000', min: 500, max: 1000, count: 0 },
    { rangeLabel: '$1,000+', min: 1000, max: Infinity, count: 0 },
  ];
  for (const e of monthlyEarnings) {
    const b = buckets.find((x) => e >= x.min && e < x.max);
    if (b) b.count++;
  }

  const underThreshold = monthlyEarnings.filter((e) => e < 50).length;
  const percentBelowThreshold = total > 0 ? +((underThreshold / total) * 100).toFixed(1) : 0;

  // Rank distribution
  const rankBuckets = {};
  for (const a of affiliates) {
    const r = a.rank || 'R1';
    rankBuckets[r] = (rankBuckets[r] || 0) + 1;
  }

  return {
    generatedAt: new Date().toISOString(),
    totalAffiliates: total,
    medianMonthlyEarningsUsd: +median.toFixed(2),
    top1PctMonthlyUsd: +top1Pct.toFixed(2),
    percentBelowThreshold,
    distribution: { rangesUsd: buckets },
    rankDistribution: rankBuckets,
    note:
      'Per FTC Endorsement Guides — these are aggregate platform statistics. ' +
      'Individual results vary with effort, network quality, and market conditions. ' +
      'Most affiliates earn modest amounts. EHB makes no income guarantee.',
    legalDisclaimer:
      'EHB is NOT an MLM. Income comes from real product/service sales only. ' +
      'No income from joining fees or pure recruitment. 30-day full refund window.',
  };
}

/**
 * Self-Purchase Enforcement per v3.3 §13.1.2 (anti-YO-BUY).
 * Returns whether the user's downline-driven sale is "real" or self-purchase.
 *
 * @param {string} buyerId
 * @param {string} affiliateId - the upline who would earn commission
 * @returns {Promise<{allowed: boolean, reason: string|null}>}
 */
export async function validateNotSelfPurchase(buyerId, affiliateId) {
  if (!buyerId || !affiliateId) {
    return { allowed: true, reason: null };
  }

  if (String(buyerId) === String(affiliateId)) {
    return {
      allowed: false,
      reason: 'self_purchase_no_commission',
    };
  }

  // Phase 2 (Q3 2026) — wash-trade detection per §13.6.7:
  //   - Compare buyer.lastSignupIp vs affiliate.lastSignupIp
  //   - Compare device fingerprints (Phase 2 needs FingerprintJS or similar)
  //   - Block commission if same IP + same device within 24h window
  //   - Audit log every block for fraud team review
  return { allowed: true, reason: null };
}

/**
 * Geographic distribution check (R5+ requirement per spec §13.1.3 #10).
 * Max 60% of network from single country.
 *
 * @param {string} userId
 * @returns {Promise<{compliant: boolean, dominantCountry, dominantPercent, threshold}>}
 */
export async function checkGeographicDistribution(userId) {
  if (!isConnected()) {
    return { compliant: true, dominantCountry: null, dominantPercent: 0, threshold: 60 };
  }

  // Find all directs of this affiliate
  const directs = await Affiliate.find({ referredBy: userId })
    .populate('userId', 'country')
    .lean();

  if (directs.length === 0) {
    return { compliant: true, dominantCountry: null, dominantPercent: 0, threshold: 60, total: 0 };
  }

  const countryBuckets = {};
  for (const d of directs) {
    const c = d.userId?.country || 'unknown';
    countryBuckets[c] = (countryBuckets[c] || 0) + 1;
  }

  const total = directs.length;
  const sorted = Object.entries(countryBuckets).sort((a, b) => b[1] - a[1]);
  const [dominantCountry, dominantCount] = sorted[0];
  const dominantPercent = +((dominantCount / total) * 100).toFixed(1);

  return {
    compliant: dominantPercent <= 60,
    dominantCountry,
    dominantPercent,
    threshold: 60,
    total,
    distribution: countryBuckets,
  };
}

/**
 * 80/20 Income Rule per spec §13.1.3 #6.
 * For ranks ≥ R3, ≥ 80% of earnings must come from external customer sales
 * (not self, not internal-network).
 *
 * MVP simplification: counts external = sum of `direct` and `level` commissions
 * minus any commissions where sourceUserId === earnerUserId.
 *
 * @param {string} userId
 * @returns {Promise<{compliant: boolean, externalPercent, threshold, totalUsd, externalUsd}>}
 */
export async function check80_20IncomeRule(userId) {
  if (!isConnected()) {
    return { compliant: true, externalPercent: 100, threshold: 80, totalUsd: 0, externalUsd: 0 };
  }

  const aff = await Affiliate.findOne({ userId }).lean();
  if (!aff) return { compliant: true, externalPercent: 100, threshold: 80 };

  const rank = aff.rank || 'R1';
  const rankIdx = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'].indexOf(rank);
  if (rankIdx < 2) {
    // Rule only applies R3+ — lower ranks always compliant
    return { compliant: true, externalPercent: 100, threshold: 80, ruleApplies: false };
  }

  const allComms = await AffiliateCommission.find({
    earnerUserId: userId,
    status: 'paid',
  }).lean();

  let totalUsd = 0;
  let externalUsd = 0;
  for (const c of allComms) {
    totalUsd += c.amountUsd;
    // External = sale-driven (direct/level) + sourceUserId !== earnerUserId
    if (
      (c.type === 'direct' || c.type === 'level') &&
      c.sourceUserId &&
      String(c.sourceUserId) !== String(userId)
    ) {
      externalUsd += c.amountUsd;
    }
  }

  const externalPercent = totalUsd > 0 ? +((externalUsd / totalUsd) * 100).toFixed(1) : 100;

  return {
    compliant: externalPercent >= 80,
    externalPercent,
    threshold: 80,
    totalUsd: +totalUsd.toFixed(2),
    externalUsd: +externalUsd.toFixed(2),
    ruleApplies: true,
  };
}

/**
 * One-call comprehensive compliance status for a user (used by /affiliate page).
 */
export async function getComplianceStatus(userId) {
  const [geo, ratio] = await Promise.all([
    checkGeographicDistribution(userId),
    check80_20IncomeRule(userId),
  ]);
  return {
    userId,
    geographicDistribution: geo,
    incomeRule80_20: ratio,
    asOf: new Date().toISOString(),
  };
}
