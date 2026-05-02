/**
 * EHB · Growth Engine
 *
 * Three modules:
 *   1. Referral system — track referrer → referee chain
 *   2. Auto rewards — milestone-triggered bonuses
 *   3. Campaign engine — time-bounded promotions
 *
 * Wired to event bus: every order/signup/STL upgrade → check rewards.
 */

import { emit } from './eventBus.js';

// =====================================================================
// 1. REFERRAL SYSTEM
// =====================================================================
const REFERRAL_CONFIG = {
  level_1_pct: 5,          // direct referral commission
  level_2_pct: 3,          // referral's referral
  level_3_pct: 2,          // 3 deep
  max_depth: 3,
  signup_bonus_usd: 5,     // referee gets $5 credit
  referrer_bonus_usd: 5,   // referrer gets $5 on referee first transaction
  l4_milestone_bonus: 10,  // referrer gets $10 when referee reaches L4
};

export async function recordReferral({ referrerCode, refereeUserId }) {
  // Find referrer by code
  // Append to referral_chain on both users
  // Emit event for tracking
  await emit('referral.recorded', { referrerCode, refereeUserId });
  return { ok: true, referrerCode };
}

export async function calculateReferralCommission({ orderAmount, refereeUserId, depth = 1 }) {
  if (depth > REFERRAL_CONFIG.max_depth) return [];
  const commissions = [];
  // Walk up the chain (max 3 levels)
  for (let level = 1; level <= REFERRAL_CONFIG.max_depth; level++) {
    const pct = REFERRAL_CONFIG[`level_${level}_pct`];
    if (!pct) break;
    commissions.push({ level, pct, amount: orderAmount * (pct / 100) });
  }
  return commissions;
}

// =====================================================================
// 2. AUTO REWARDS — milestone-triggered
// =====================================================================
export const MILESTONES = [
  { id: 'first_purchase', name: 'First Purchase', reward_ehbgc: 5, criteria: 'orders_count >= 1' },
  { id: 'first_review', name: 'First Review', reward_ehbgc: 2, criteria: 'reviews_count >= 1' },
  { id: 'l3_reached', name: 'STL L3 Reached', reward_ehbgc: 10, criteria: 'stl_level >= 3' },
  { id: 'l4_reached', name: 'STL L4 Reached', reward_ehbgc: 25, criteria: 'stl_level >= 4' },
  { id: 'l7_reached', name: 'STL L7 Reached', reward_ehbgc: 100, criteria: 'stl_level >= 7' },
  { id: 'l10_reached', name: 'STL L10 — SUPREME', reward_ehbgc: 1000, criteria: 'stl_level >= 10' },
  { id: 'first_franchise', name: 'First Franchise', reward_ehbgc: 50, criteria: 'franchise_apps >= 1' },
  { id: 'cross_industry_3', name: 'Active in 3+ Industries', reward_ehbgc: 30, criteria: 'industries_active >= 3' },
];

export async function checkMilestones({ userId, userStats }) {
  const reached = [];
  for (const m of MILESTONES) {
    // Evaluate criteria (simple eval — replace with safe parser in prod)
    try {
      if (matchesCriteria(userStats, m.criteria) && !userStats.milestones_claimed?.includes(m.id)) {
        reached.push(m);
        await emit('milestone.reached', { userId, milestone: m });
      }
    } catch {
      /* skip */
    }
  }
  return reached;
}

function matchesCriteria(stats, criteria) {
  const [key, op, val] = criteria.split(/\s+/);
  const left = stats[key];
  const right = Number(val);
  switch (op) {
    case '>=': return left >= right;
    case '>': return left > right;
    case '==': return left == right;
    case '<=': return left <= right;
    case '<': return left < right;
    default: return false;
  }
}

// =====================================================================
// 3. CAMPAIGN ENGINE — time-bounded promotions
// =====================================================================
const activeCampaigns = new Map();

export function createCampaign({ id, name, type, multiplier_pct, target, start, end, eligible_countries, eligible_industries }) {
  activeCampaigns.set(id, {
    id, name, type, multiplier_pct, target,
    start: new Date(start),
    end: new Date(end),
    eligible_countries: eligible_countries || ['*'],
    eligible_industries: eligible_industries || ['*'],
    metrics: { impressions: 0, conversions: 0, revenue: 0 },
  });
  return activeCampaigns.get(id);
}

export function listActiveCampaigns({ now = new Date() } = {}) {
  const active = [];
  for (const c of activeCampaigns.values()) {
    if (now >= c.start && now <= c.end) active.push(c);
  }
  return active;
}

export function applyCampaignBonus({ baseAmount, country, industry }) {
  const now = new Date();
  let bonus = 0;
  for (const c of listActiveCampaigns({ now })) {
    const countryOk = c.eligible_countries.includes('*') || c.eligible_countries.includes(country);
    const industryOk = c.eligible_industries.includes('*') || c.eligible_industries.includes(industry);
    if (countryOk && industryOk) bonus += baseAmount * (c.multiplier_pct / 100);
  }
  return bonus;
}

export default {
  recordReferral,
  calculateReferralCommission,
  checkMilestones,
  createCampaign,
  listActiveCampaigns,
  applyCampaignBonus,
  MILESTONES,
  REFERRAL_CONFIG,
};
