// Country Feature Flags — Phase 8 Epic F.3 (Governance Workflow)
//
// Single source of truth for which features are enabled per country.
// Default: Pakistan-first launch; other countries gated.
//
// Phase 2: persist in DB + admin UI to toggle.

const COUNTRY_FEATURES = {
  PK: {
    enabled: true,
    affiliateProgram: true,
    franchisePurchase: true,
    walletDeposits: ['USDT_TRC20', 'BANK_PK_JAZZCASH', 'BANK_PK_HBL'],
    walletWithdrawals: ['USDT_TRC20', 'BANK_PK_JAZZCASH', 'BANK_PK_HBL'],
    kycVendors: ['nadra', 'jumio'],
    complianceCertification: 'SECP',
    complianceSignedOff: true,
  },
  AE: {
    enabled: false, // Phase 2
    affiliateProgram: false,
    franchisePurchase: false,
    walletDeposits: [],
    walletWithdrawals: [],
    kycVendors: ['jumio'],
    complianceCertification: 'MOEC',
    complianceSignedOff: false,
    plannedActivation: 'Q3 2026',
  },
  US: {
    enabled: false, // Phase 2
    affiliateProgram: false,
    franchisePurchase: false,
    walletDeposits: [],
    walletWithdrawals: [],
    kycVendors: ['jumio'],
    complianceCertification: 'FTC + state MTL',
    complianceSignedOff: false,
    plannedActivation: 'Q4 2027',
  },
  IN: {
    enabled: false,
    affiliateProgram: false,
    walletDeposits: [],
    walletWithdrawals: [],
    kycVendors: ['jumio'],
    complianceCertification: 'RBI',
    complianceSignedOff: false,
    plannedActivation: 'Q3 2026',
  },
  GB: {
    enabled: false,
    affiliateProgram: false,
    walletDeposits: [],
    walletWithdrawals: [],
    kycVendors: ['jumio'],
    complianceCertification: 'FCA + DTI',
    complianceSignedOff: false,
    plannedActivation: 'Q3 2026',
  },
  DEFAULT: {
    enabled: false,
    affiliateProgram: false,
    walletDeposits: [],
    walletWithdrawals: [],
    kycVendors: [],
    complianceCertification: 'not certified',
    complianceSignedOff: false,
  },
};

/** Get feature flags for a country. */
export function getCountryFeatures(country) {
  return COUNTRY_FEATURES[country] || COUNTRY_FEATURES.DEFAULT;
}

/** Check if a specific feature is enabled in a country. */
export function isFeatureEnabledInCountry(country, feature) {
  const flags = getCountryFeatures(country);
  return Boolean(flags[feature]);
}

/** List all countries + their status (for admin overview). */
export function listAllCountryFlags() {
  return Object.entries(COUNTRY_FEATURES)
    .filter(([k]) => k !== 'DEFAULT')
    .map(([country, flags]) => ({ country, ...flags }));
}
