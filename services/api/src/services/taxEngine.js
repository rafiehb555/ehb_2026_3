/**
 * EHB · Tax Engine — per-country tax computation
 *
 * Handles:
 *   - VAT / GST / Sales Tax (consumption taxes)
 *   - Withholding tax (services + cross-border)
 *   - Industry-specific exemptions (healthcare often 0%)
 *   - Tax invoice generation
 *
 * Source: ehb-info/9-legal/COUNTRY-SPECIFIC-LAWS.md
 *         ehb-info/_settings/countries/<CODE>.json
 *
 * Tax rates are read from country JSON; fall back to defaults below.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COUNTRIES_DIR = path.join(__dirname, '../../../../ehb-info/_settings/countries');

// =====================================================================
// Country tax cache (loaded once)
// =====================================================================
const taxCache = new Map();

function loadCountry(code) {
  if (taxCache.has(code)) return taxCache.get(code);
  try {
    const file = path.join(COUNTRIES_DIR, `${code}.json`);
    if (!fs.existsSync(file)) return null;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    taxCache.set(code, data);
    return data;
  } catch {
    return null;
  }
}

// =====================================================================
// Default tax rates (fallback if country file missing)
// =====================================================================
const DEFAULT_RATES = {
  PK: { vat: 17, withholding: 1, currency: 'PKR' },
  AE: { vat: 5, corporate: 9, currency: 'AED' },
  SA: { vat: 15, currency: 'SAR' },
  TR: { vat: 18, currency: 'TRY' },
  MY: { sst: 6, currency: 'MYR' },
  US: { sales_tax_avg: 7, currency: 'USD' },
  GB: { vat: 20, currency: 'GBP' },
  DE: { vat: 19, currency: 'EUR' },
  FR: { vat: 20, currency: 'EUR' },
  IN: { gst: 18, currency: 'INR' },
};

// =====================================================================
// Industry-specific exemptions / overrides
// =====================================================================
const INDUSTRY_TAX_OVERRIDES = {
  WMS: { vat_pct: 0, note: 'Healthcare typically 0% in most countries' },
  HCS: { vat_pct: 0, note: 'Health compliance — exempt' },
  EDS: { vat_pct: 0, note: 'Education — exempt in PK + many others' },
  HPS: { vat_pct: 0, note: 'Skills/Education exempt' },
  OBS: { vat_pct: 0, note: 'Books — exempt or reduced in many countries' },
};

// =====================================================================
// Get applicable VAT rate
// =====================================================================
export function getVatRate({ country, industry }) {
  const cConfig = loadCountry(country);
  let rate;
  if (cConfig?.compliance?.vat_pct != null) {
    rate = cConfig.compliance.vat_pct;
  } else if (cConfig?.compliance?.gst != null) {
    rate = cConfig.compliance.gst;
  } else if (cConfig?.compliance?.sst_pct != null) {
    rate = cConfig.compliance.sst_pct;
  } else {
    rate = DEFAULT_RATES[country]?.vat ?? DEFAULT_RATES[country]?.gst ?? DEFAULT_RATES[country]?.sst ?? 0;
  }

  // Apply industry override
  const override = INDUSTRY_TAX_OVERRIDES[industry];
  if (override?.vat_pct != null) rate = override.vat_pct;

  return rate;
}

// =====================================================================
// Compute tax-inclusive amounts
// =====================================================================
export function computeTax({ amount, country, industry, taxIncluded = false }) {
  const rate = getVatRate({ country, industry });
  let net, tax, gross;
  if (taxIncluded) {
    gross = amount;
    net = amount / (1 + rate / 100);
    tax = gross - net;
  } else {
    net = amount;
    tax = amount * (rate / 100);
    gross = net + tax;
  }
  return {
    country,
    industry,
    rate_pct: rate,
    net: round2(net),
    tax: round2(tax),
    gross: round2(gross),
    tax_included: taxIncluded,
  };
}

// =====================================================================
// Withholding tax (services, cross-border)
// =====================================================================
export function computeWithholding({ grossAmount, country, isCrossBorder = false }) {
  const rate = country === 'PK'
    ? (isCrossBorder ? 15 : 1)
    : (DEFAULT_RATES[country]?.withholding ?? 0);

  const withhold = grossAmount * (rate / 100);
  return {
    rate_pct: rate,
    withhold: round2(withhold),
    net: round2(grossAmount - withhold),
    is_cross_border: isCrossBorder,
  };
}

// =====================================================================
// Tax invoice generator
// =====================================================================
export function generateTaxInvoice({ orderId, buyer, seller, items, country, industry, currency = 'USD' }) {
  const subtotal = items.reduce((s, it) => s + (it.price * it.qty), 0);
  const tax = computeTax({ amount: subtotal, country, industry });
  return {
    invoice_number: `INV-${Date.now()}-${orderId}`,
    issue_date: new Date().toISOString().slice(0, 10),
    seller: { name: seller.name, ntn: seller.ntn || null, address: seller.address || null },
    buyer: { name: buyer.name, country: buyer.country },
    items,
    subtotal: tax.net,
    tax_amount: tax.tax,
    tax_rate_pct: tax.rate_pct,
    total: tax.gross,
    currency,
    note: INDUSTRY_TAX_OVERRIDES[industry]?.note || `${country} standard rate applies`,
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export default {
  getVatRate,
  computeTax,
  computeWithholding,
  generateTaxInvoice,
};
