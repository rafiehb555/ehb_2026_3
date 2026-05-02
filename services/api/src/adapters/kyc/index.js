// KYC Adapter Registry — v3.3
//
// Routes document verification to the right vendor based on:
//   - Document type (CNIC → NADRA, Passport → Jumio, etc.)
//   - User's country
//   - Vendor health / quota
//
// Strategy: NADRA for Pakistani CNIC (cheaper, faster, official),
//           Jumio for everything else (global coverage).

import nadra from './nadra.js';
import jumio from './jumio.js';

const ADAPTERS = { nadra, jumio };

/**
 * Resolve which adapter should handle a given document.
 */
export function pickAdapter({ documentType, country }) {
  if (documentType === 'cnic' && country === 'PK') return nadra;
  // Default: Jumio for everything else
  return jumio;
}

export function getAdapter(name) {
  const a = ADAPTERS[name];
  if (!a) throw new Error(`Unknown KYC adapter: ${name}`);
  return a;
}

export function listKycAdapters() {
  return Object.entries(ADAPTERS).map(([key, a]) => ({
    key,
    name: a.name,
    vendor: a.vendor,
    country: a.country,
    enabled: a.enabled,
    isStub: a.isStub,
    supportedDocs: a.supportedDocs,
  }));
}

export { nadra, jumio };
