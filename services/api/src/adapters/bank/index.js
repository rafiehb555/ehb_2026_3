// Bank Adapter Registry — v3.3
// Returns the right adapter based on country + adapter name.

import jazzcash from './jazzcash.js';
import hbl from './hbl.js';

const REGISTRY = {
  JAZZCASH_PK: jazzcash,
  HBL_PK: hbl,
  // Phase 2: add UAE (EmiratesNBD, ADCB, FAB), USA (Plaid), IN (UPI), UK (Open Banking)
};

export function getBankAdapter(name) {
  const adapter = REGISTRY[name];
  if (!adapter) {
    throw new Error(`Unknown bank adapter: ${name}. Available: ${Object.keys(REGISTRY).join(', ')}`);
  }
  return adapter;
}

export function listBankAdapters() {
  return Object.entries(REGISTRY).map(([key, a]) => ({
    key,
    name: a.name,
    vendor: a.vendor,
    country: a.country,
    enabled: a.enabled,
    isStub: a.isStub,
  }));
}

export { jazzcash, hbl };
