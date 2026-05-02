// Industry Rate Service — v3.2 §12.6
//
// Spec: ehb-info/departments/Affiliate.md §12.6 (v3.2)
// Founder lock: 2026-04-25
//
// Maps each of the 38 EHB industries to one of 6 commission categories,
// each with its own Direct/L1/L2 rates.
//
// Track A "default" (10/5/2) used by industryCode='GSM' / unknown / null.
// Other industries lookup their category for specific rates.

// ─── INDUSTRY → CATEGORY MAP (per spec §12.6) ────────────────────────────

export const INDUSTRY_CATEGORY = {
  // High-Margin Services (15/5/2)
  OBS: 'HIGH_MARGIN', OLS: 'HIGH_MARGIN', ITS: 'HIGH_MARGIN',
  MAS: 'HIGH_MARGIN', FIN: 'HIGH_MARGIN', INS: 'HIGH_MARGIN',

  // Standard Products (10/5/2 — default Track A)
  GSM: 'STANDARD', FWS: 'STANDARD', BCS: 'STANDARD',
  FBS: 'STANDARD', EFS: 'STANDARD', GSS: 'STANDARD',

  // Commodity / Volume (7/3/1)
  LDS: 'COMMODITY', AGTS: 'COMMODITY', EDS: 'COMMODITY',
  MFS: 'COMMODITY', ATS: 'COMMODITY',

  // Recurring Services (8/3/1 per cycle)
  WMS: 'RECURRING', HPS: 'RECURRING', WES: 'RECURRING',
  HCS: 'RECURRING', TCS: 'RECURRING', CMS: 'RECURRING',

  // Premium / High-Ticket (5/2/1)
  RES: 'PREMIUM', CNS: 'PREMIUM', HMS: 'PREMIUM',
  EAS: 'PREMIUM', SCS: 'PREMIUM',

  // Strategic / Government (6/2/1 + KPI bonus)
  GES: 'STRATEGIC', JPS: 'STRATEGIC', ERS: 'STRATEGIC',
  ELS: 'STRATEGIC', EHB_TUBE: 'STRATEGIC',

  // Phase 2/3 expansion industries — defaulted to STANDARD until categorized
  // (LSM, RRS, DTS not yet specified per §12.6)
  LSM: 'STANDARD', RRS: 'STANDARD', DTS: 'STANDARD',

  // Special: franchise sales handled by Track B (not Track A categories)
  FRANCHISE: 'FRANCHISE_TRACK_B',
};

// ─── PER-CATEGORY RATES (admin-tunable in Phase 2 via affiliate_config) ──

export const CATEGORY_RATES = {
  HIGH_MARGIN: {
    direct: 0.15, l1: 0.05, l2: 0.02,
    networkPool: 0.05,         // 5% of price for Track A network split (info)
    description: 'High-margin services (Education / Legal / IT / Media / Finance / Insurance)',
  },
  STANDARD: {
    direct: 0.10, l1: 0.05, l2: 0.02,
    networkPool: 0.05,
    description: 'Standard products (E-commerce / Fashion / Cosmetics / Food / Events / Gaming) — default',
  },
  COMMODITY: {
    direct: 0.07, l1: 0.03, l2: 0.01,
    networkPool: 0.03,
    description: 'Commodity/volume (Logistics / Agriculture / Energy / Manufacturing / Automotive)',
  },
  RECURRING: {
    direct: 0.08, l1: 0.03, l2: 0.01,
    networkPool: 0.04,
    description: 'Recurring services per cycle (Health / Telecom / Subscriptions)',
    perCycle: true, // commission earned every billing cycle, not just first
  },
  PREMIUM: {
    direct: 0.05, l1: 0.02, l2: 0.01,
    networkPool: 0.03,
    description: 'Premium/high-ticket (Real Estate / Construction / Hotels)',
  },
  STRATEGIC: {
    direct: 0.06, l1: 0.02, l2: 0.01,
    networkPool: 0.03,
    kpiBonus: 0.02, // performance-based extra
    description: 'Strategic/government (Jobs / Govt / Education systems / EHB_TUBE)',
  },
  FRANCHISE_TRACK_B: {
    // Handled by trackBService — return null rates so Track A skips
    direct: 0, l1: 0, l2: 0, networkPool: 0,
    description: 'Franchise sales — uses Track B 10-level cascade instead',
    skipTrackA: true,
  },
};

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Resolve commission rates for a given industryCode.
 * Returns Track A {direct, l1, l2, networkPool} for the industry's category.
 * Defaults to STANDARD (10/5/2) if industryCode is null/unknown.
 */
export function getRatesForIndustry(industryCode) {
  const category = INDUSTRY_CATEGORY[industryCode] || 'STANDARD';
  const rates = CATEGORY_RATES[category] || CATEGORY_RATES.STANDARD;
  return { category, ...rates };
}

/** Get just the network pool % for an industry (for hidden 5% split). */
export function getNetworkPoolPercent(industryCode) {
  return getRatesForIndustry(industryCode).networkPool;
}

/** All categories — for /info endpoint. */
export function listAllCategories() {
  return Object.entries(CATEGORY_RATES).map(([cat, rates]) => ({
    category: cat,
    ...rates,
    industries: Object.entries(INDUSTRY_CATEGORY)
      .filter(([_, c]) => c === cat)
      .map(([code]) => code),
  }));
}

/** Check if Track A should skip this industry (franchise sales bypass to Track B). */
export function shouldSkipTrackA(industryCode) {
  const cat = INDUSTRY_CATEGORY[industryCode];
  return CATEGORY_RATES[cat]?.skipTrackA === true;
}
