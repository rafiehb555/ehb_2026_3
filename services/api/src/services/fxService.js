/**
 * EHB · FX Service — multi-currency conversion
 *
 * Sources:
 *   - Country JSONs (`fx_to_usd` field) — manual canonical
 *   - External API (e.g., exchangeratesapi.io / ECB) — daily refresh
 *   - Cache TTL: 24 hours (FX changes daily, not minute-by-minute)
 *
 * Functions:
 *   - convert({ amount, from, to })
 *   - quote({ amount, from, to }) — with 0.5% buffer for risk
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COUNTRIES_DIR = path.join(__dirname, '../../../../ehb-info/_settings/countries');

// =====================================================================
// FX rate to USD (loaded from country JSONs)
// =====================================================================
const fxToUsdCache = new Map();
let lastLoaded = 0;
const RELOAD_TTL_MS = 24 * 60 * 60 * 1000;

function loadAllRates() {
  if (Date.now() - lastLoaded < RELOAD_TTL_MS && fxToUsdCache.size > 0) return;
  fxToUsdCache.clear();
  if (!fs.existsSync(COUNTRIES_DIR)) return;
  const files = fs.readdirSync(COUNTRIES_DIR).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(COUNTRIES_DIR, f), 'utf8'));
      const code = data.currency?.code;
      const rate = data.currency?.fx_to_usd;
      if (code && rate) fxToUsdCache.set(code, rate);
    } catch {
      // skip invalid
    }
  }
  fxToUsdCache.set('USD', 1.0); // identity
  lastLoaded = Date.now();
}

// =====================================================================
// Convert
// =====================================================================
export function convert({ amount, from, to }) {
  loadAllRates();
  const fromRate = fxToUsdCache.get(from);
  const toRate = fxToUsdCache.get(to);
  if (fromRate == null || toRate == null) {
    return { ok: false, error: `Missing FX rate: ${from} or ${to}` };
  }
  const usd = amount * fromRate;
  const result = usd / toRate;
  return {
    ok: true,
    from_amount: amount,
    from_currency: from,
    to_amount: round2(result),
    to_currency: to,
    rate: round4(fromRate / toRate),
    via_usd: true,
  };
}

// =====================================================================
// Quote with risk buffer (0.5%)
// =====================================================================
export function quote({ amount, from, to, bufferPct = 0.5 }) {
  const c = convert({ amount, from, to });
  if (!c.ok) return c;
  const fee = c.to_amount * (bufferPct / 100);
  return {
    ...c,
    fee_amount: round2(fee),
    fee_pct: bufferPct,
    final_amount: round2(c.to_amount - fee),
  };
}

// =====================================================================
// List all known rates
// =====================================================================
export function listRates() {
  loadAllRates();
  return Object.fromEntries(fxToUsdCache);
}

function round2(n) { return Math.round(n * 100) / 100; }
function round4(n) { return Math.round(n * 10000) / 10000; }

export default { convert, quote, listRates };
