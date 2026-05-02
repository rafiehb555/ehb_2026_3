/**
 * EHB · Monetization Service
 *
 * Revenue streams:
 *   1. Transaction fee (already in 70/10/10/10 split — EHB share)
 *   2. Withdrawal fee (1-2%)
 *   3. STL boost — paid temporary upgrade
 *   4. Sponsored listings (ads)
 *   5. Franchise licensing (one-time + ongoing)
 *   6. Premium subscriptions (white-label, advanced analytics)
 *   7. AI marketplace usage fees
 *   8. Data analytics API (paid tier)
 */

const FEES = {
  transaction_pct: 10,                   // already part of revenue split
  withdrawal: {
    domestic_pct: 1.0, domestic_min_usd: 0.50,
    international_pct: 2.0, international_min_usd: 2.00,
    instant_premium_pct: 0.5,            // additional for instant
  },
  stl_boost: {
    boost_to_l4_30days_usd: 50,          // visibility boost
    boost_to_l5_30days_usd: 150,
    boost_to_l6_30days_usd: 400,
    note: "Boost = visibility ranking only. Real STL via earning + verification.",
  },
  sponsored_listing: {
    cpc_min_usd: 0.10,
    cpc_max_usd: 5.00,
    cpm_default_usd: 10,
    placement_premium: { top: 3, side: 1, related: 1 },
  },
  franchise_licensing: {
    sub_one_time_usd: 5000,
    corporate_one_time_usd: 25000,
    master_one_time_usd: 100000,
    country_one_time_usd: 500000,
    renewal_yearly_pct: 5,
  },
  premium_subscription: {
    business_monthly_usd: 50,
    enterprise_monthly_usd: 500,
    white_label_monthly_usd: 5000,
  },
  ai_marketplace: {
    free_quota_per_day: 3,
    pay_per_call_usd: 0.20,
    bulk_pack_1000_usd: 100,
  },
  data_analytics_api: {
    starter_monthly_usd: 99,
    pro_monthly_usd: 499,
    enterprise_monthly_usd: 4999,
  },
};

// =====================================================================
// Withdrawal fee calculator
// =====================================================================
export function computeWithdrawalFee({ amount, currency = 'USD', isInternational = false, instant = false }) {
  const cfg = isInternational ? FEES.withdrawal.international_pct : FEES.withdrawal.domestic_pct;
  const minFee = isInternational ? FEES.withdrawal.international_min_usd : FEES.withdrawal.domestic_min_usd;
  let fee = Math.max(amount * (cfg / 100), minFee);
  if (instant) fee += amount * (FEES.withdrawal.instant_premium_pct / 100);
  return { fee: Math.round(fee * 100) / 100, net_amount: Math.round((amount - fee) * 100) / 100, currency };
}

// =====================================================================
// STL boost purchase
// =====================================================================
export function priceStlBoost(targetLevel) {
  const map = {
    4: FEES.stl_boost.boost_to_l4_30days_usd,
    5: FEES.stl_boost.boost_to_l5_30days_usd,
    6: FEES.stl_boost.boost_to_l6_30days_usd,
  };
  return { target_level: targetLevel, duration_days: 30, price_usd: map[targetLevel] || null };
}

// =====================================================================
// Sponsored listing pricing
// =====================================================================
export function quoteSponsoredListing({ placement = 'top', impressions = 1000, clicks = 0 }) {
  const placementMul = FEES.sponsored_listing.placement_premium[placement] || 1;
  const cpm = FEES.sponsored_listing.cpm_default_usd * placementMul;
  const cpcCost = clicks * FEES.sponsored_listing.cpc_max_usd;
  const cpmCost = (impressions / 1000) * cpm;
  return { placement, impressions, clicks, cpm_cost_usd: cpmCost, cpc_cost_usd: cpcCost, total_min_usd: cpmCost };
}

// =====================================================================
// Franchise licensing
// =====================================================================
export function quoteFranchiseLicense(tier) {
  const map = {
    SUB: FEES.franchise_licensing.sub_one_time_usd,
    CORPORATE: FEES.franchise_licensing.corporate_one_time_usd,
    MASTER: FEES.franchise_licensing.master_one_time_usd,
    COUNTRY: FEES.franchise_licensing.country_one_time_usd,
  };
  const oneTime = map[tier];
  return {
    tier,
    one_time_usd: oneTime,
    yearly_renewal_usd: oneTime * (FEES.franchise_licensing.renewal_yearly_pct / 100),
  };
}

// =====================================================================
// Premium subscription
// =====================================================================
export function getPremiumPlans() {
  return [
    { plan: 'business', monthly_usd: FEES.premium_subscription.business_monthly_usd, features: ['advanced_analytics', 'priority_support', '10x_API_quota'] },
    { plan: 'enterprise', monthly_usd: FEES.premium_subscription.enterprise_monthly_usd, features: ['SLA', 'dedicated_AM', 'custom_integrations', '100x_API_quota'] },
    { plan: 'white_label', monthly_usd: FEES.premium_subscription.white_label_monthly_usd, features: ['rebrand', 'self_host', 'unlimited_users', 'priority_engineering'] },
  ];
}

// =====================================================================
// AI marketplace fee
// =====================================================================
export function quoteAiCall({ freeUsedToday = 0 }) {
  if (freeUsedToday < FEES.ai_marketplace.free_quota_per_day) {
    return { cost_usd: 0, source: 'free_quota', remaining_free: FEES.ai_marketplace.free_quota_per_day - freeUsedToday - 1 };
  }
  return { cost_usd: FEES.ai_marketplace.pay_per_call_usd, source: 'pay_per_call' };
}

export const FEE_SCHEDULE = FEES;

export default {
  computeWithdrawalFee,
  priceStlBoost,
  quoteSponsoredListing,
  quoteFranchiseLicense,
  getPremiumPlans,
  quoteAiCall,
  FEE_SCHEDULE,
};
