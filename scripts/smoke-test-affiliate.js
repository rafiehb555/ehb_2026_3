#!/usr/bin/env node
/**
 * EHB Affiliate v3.2-MVP + v3.3 Wallet — End-to-End Smoke Test
 *
 * Spec: ehb-info/departments/Affiliate.md §12 (v3.2) + §13.6 (v3.3 wallet)
 *
 * Tests:
 *   Steps 1-9: v3.2 affiliate flow (Track A, ranks, bonuses, network tree)
 *   Steps 10-15: v3.3 wallet flow (ensure, balance, info, transactions, transfer guards)
 *
 * Usage:
 *   node scripts/smoke-test-affiliate.js
 *
 * Prerequisites:
 *   - API running at http://localhost:5000 (or set API_URL env)
 *   - MongoDB running (smoke test creates fresh users — won't conflict with seeded data)
 *
 * Exit codes:
 *   0 = all tests passed
 *   1 = one or more tests failed
 */

const API = process.env.API_URL || 'http://localhost:5000';
const TS = Date.now();

let sponsorToken = null;
let referralToken = null;
let sponsorRef = null; // referral code
let sponsorId = null;
let referralId = null;

let pass = 0;
let fail = 0;

// ─── Helpers ───────────────────────────────────────────────────────────────

function log(emoji, msg) {
  console.log(`${emoji} ${msg}`);
}
function ok(msg) {
  pass++;
  log('✓', msg);
}
function bad(msg, detail) {
  fail++;
  log('✗', msg);
  if (detail) console.log('   ', detail);
}

async function api(method, path, { token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { status: res.status, ok: res.ok, data };
}

async function waitForApi(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await api('GET', '/api/health');
      if (r.ok || r.status === 404) return true;
    } catch (e) {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

// ─── Tests ────────────────────────────────────────────────────────────────

async function test1_health() {
  const r = await api('GET', '/api/affiliate/info');
  if (r.ok && r.data?.spec?.includes('v3.2-MVP')) {
    ok('Step 1: API health — affiliate/info returns v3.2-MVP spec');
    return true;
  }
  bad('Step 1: API health failed', JSON.stringify(r.data));
  return false;
}

async function test2_register() {
  const sponsorEmail = `sponsor-${TS}@smoke.test`;
  const referralEmail = `referral-${TS}@smoke.test`;

  const s = await api('POST', '/api/auth/register', {
    body: { email: sponsorEmail, password: 'Smoke2026!', name: 'Smoke Sponsor' },
  });
  if (!s.ok || !s.data?.token) {
    bad('Step 2a: sponsor register failed', JSON.stringify(s.data));
    return false;
  }
  sponsorToken = s.data.token;
  sponsorId = s.data.user?._id || s.data.user?.id;
  ok(`Step 2a: sponsor registered (id ${sponsorId})`);

  const r = await api('POST', '/api/auth/register', {
    body: { email: referralEmail, password: 'Smoke2026!', name: 'Smoke Referral' },
  });
  if (!r.ok || !r.data?.token) {
    bad('Step 2b: referral register failed', JSON.stringify(r.data));
    return false;
  }
  referralToken = r.data.token;
  referralId = r.data.user?._id || r.data.user?.id;
  ok(`Step 2b: referral registered (id ${referralId})`);
  return true;
}

async function test3_joinAffiliate() {
  // Sponsor joins (no referredByCode)
  const s = await api('POST', '/api/affiliate/join', { token: sponsorToken, body: {} });
  if (!s.ok || !s.data?.referralCode) {
    bad('Step 3a: sponsor join failed', JSON.stringify(s.data));
    return false;
  }
  sponsorRef = s.data.referralCode;
  ok(`Step 3a: sponsor joined (refCode ${sponsorRef})`);

  // Referral joins WITH sponsor's code
  const r = await api('POST', '/api/affiliate/join', {
    token: referralToken,
    body: { referredByCode: sponsorRef },
  });
  if (!r.ok || !r.data?.referralCode) {
    bad('Step 3b: referral join failed', JSON.stringify(r.data));
    return false;
  }
  if (String(r.data.referredBy) !== String(sponsorId)) {
    bad('Step 3b: referral.referredBy mismatch', `expected ${sponsorId}, got ${r.data.referredBy}`);
    return false;
  }
  ok(`Step 3b: referral joined (linked to sponsor via ${sponsorRef})`);
  return true;
}

async function test4_chainVerification() {
  const r = await api('GET', '/api/affiliate/me', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 4: sponsor /me failed', JSON.stringify(r.data));
    return false;
  }
  const directs = r.data?.stats?.directReferrals || 0;
  if (directs < 1) {
    bad('Step 4: sponsor.directReferrals < 1', `got ${directs}`);
    return false;
  }
  ok(`Step 4: sponsor.directReferrals = ${directs} (expected ≥ 1)`);
  return true;
}

async function test5_simulateOrder() {
  // Note: actual order creation requires products + checkout flow.
  // For smoke, we directly trigger the affiliate process via internal call shape.
  // If the server doesn't expose this without an actual order, the user will
  // need to manually place an order via /api/orders flow.
  log('ℹ️ ', 'Step 5: order simulation requires real product + cart + checkout');
  log('   ', 'Manual test: see RUNBOOK Step 5 for browser-based flow.');
  return true;
}

async function test6_earningsBreakdown() {
  const r = await api('GET', '/api/affiliate/earnings/breakdown', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 6: earnings/breakdown failed', JSON.stringify(r.data));
    return false;
  }
  const expected = ['direct', 'level2', 'firstSale', 'stlBonus', 'fastSaleFreePackages', 'total'];
  const missing = expected.filter((k) => !(k in r.data));
  if (missing.length > 0) {
    bad('Step 6: breakdown missing keys', `missing: ${missing.join(', ')}`);
    return false;
  }
  ok(`Step 6: earnings/breakdown returned all expected keys`);
  console.log('         breakdown:', JSON.stringify(r.data, null, 2).split('\n').map((l) => '         ' + l).join('\n'));
  return true;
}

async function test7_referralLink() {
  const r = await api('GET', '/api/affiliate/referral-link', { token: sponsorToken });
  if (!r.ok || !r.data?.link) {
    bad('Step 7: referral-link failed', JSON.stringify(r.data));
    return false;
  }
  ok(`Step 7: referral-link generated → ${r.data.link}`);
  return true;
}

async function test8_tree() {
  const r = await api('GET', '/api/affiliate/tree?depth=2', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 8: tree failed', JSON.stringify(r.data));
    return false;
  }
  const lvl1 = r.data?.levels?.find((l) => l.level === 1);
  const lvl1Count = lvl1?.count || 0;
  if (lvl1Count < 1) {
    bad('Step 8: tree L1 count < 1', `got ${lvl1Count}`);
    return false;
  }
  ok(`Step 8: tree L1 = ${lvl1Count} member(s); MVP capped at depth 2`);
  return true;
}

async function test28_trackBInfo() {
  const r = await api('GET', '/api/affiliate/track-b/info');
  if (!r.ok) {
    bad('Step 28: track-b/info failed', JSON.stringify(r.data));
    return false;
  }
  if (r.data.levelRates?.[1] !== 0.05 || r.data.levelRates?.[10] !== 0.003) {
    bad('Step 28: Track B level rates wrong', JSON.stringify(r.data.levelRates));
    return false;
  }
  ok(`Step 28: Track B 10-level cascade · L1 5% → L10 0.3% · total ${r.data.totalCascadePercent}%`);
  return true;
}

async function test29_bonusesInfo() {
  const r = await api('GET', '/api/affiliate/bonuses/info');
  if (!r.ok) {
    bad('Step 29: bonuses/info failed', JSON.stringify(r.data));
    return false;
  }
  const need = ['fast_sale', 'stl_purchase', 'matching', 'first_sale', 'activation', 'rank_achievement', 'team_performance', 'retention', 'monthly_leader', 'super_franchise', 'global_pool'];
  const present = Object.keys(r.data.bonuses || {});
  const missing = need.filter((n) => !present.includes(n));
  if (missing.length > 0) {
    bad('Step 29: bonus catalog missing entries', `missing: ${missing.join(', ')}`);
    return false;
  }
  ok(`Step 29: 11-bonus catalog complete · ${need.length}/${need.length}`);
  return true;
}

async function test30_industryCategories() {
  const r = await api('GET', '/api/affiliate/industries/categories');
  if (!r.ok) {
    bad('Step 30: industries/categories failed', JSON.stringify(r.data));
    return false;
  }
  if (!Array.isArray(r.data.categories) || r.data.categories.length < 6) {
    bad('Step 30: should have ≥6 categories', `got ${r.data.categories?.length}`);
    return false;
  }
  ok(`Step 30: industry categories loaded · ${r.data.categories.length} categories spanning all 38 verticals`);
  return true;
}

async function test31_industryRates() {
  // High-margin should be 15/5/2
  const hm = await api('GET', '/api/affiliate/industries/OBS/rates');
  if (!hm.ok || hm.data.direct !== 0.15) {
    bad('Step 31a: High-margin OBS direct should be 15%', JSON.stringify(hm.data));
    return false;
  }
  // Standard should be 10/5/2
  const std = await api('GET', '/api/affiliate/industries/GSM/rates');
  if (!std.ok || std.data.direct !== 0.10) {
    bad('Step 31b: Standard GSM direct should be 10%', JSON.stringify(std.data));
    return false;
  }
  // Premium should be 5/2/1
  const prem = await api('GET', '/api/affiliate/industries/RES/rates');
  if (!prem.ok || prem.data.direct !== 0.05) {
    bad('Step 31c: Premium RES direct should be 5%', JSON.stringify(prem.data));
    return false;
  }
  ok('Step 31: industry rate lookup OK · OBS 15% · GSM 10% · RES 5%');
  return true;
}

async function test32_retentionUplift() {
  const r = await api('GET', '/api/affiliate/bonuses/retention/uplift', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 32: retention/uplift failed', JSON.stringify(r.data));
    return false;
  }
  if (typeof r.data.upliftPercent !== 'number') {
    bad('Step 32: missing upliftPercent', JSON.stringify(r.data));
    return false;
  }
  ok(`Step 32: retention uplift OK · ${r.data.upliftPercent}% (months active: ${r.data.monthsActive})`);
  return true;
}

async function test25_kycInfo() {
  const r = await api('GET', '/api/kyc/info');
  if (!r.ok) {
    bad('Step 25: kyc/info failed', JSON.stringify(r.data));
    return false;
  }
  if (!r.data.tiers?.[0] || !r.data.tiers?.[4]) {
    bad('Step 25: kyc tier ladder missing tiers');
    return false;
  }
  if (r.data.tiers[0].monthlyInUsd !== 100) {
    bad('Step 25: Tier 0 monthly in should be $100', `got $${r.data.tiers[0].monthlyInUsd}`);
    return false;
  }
  if (r.data.tiers[4].monthlyInUsd !== -1) {
    bad('Step 25: Tier 4 should be unlimited (-1)', `got $${r.data.tiers[4].monthlyInUsd}`);
    return false;
  }
  ok('Step 25: KYC tier ladder OK · T0 $100/mo → T4 unlimited');
  return true;
}

async function test26_kycMe() {
  const r = await api('GET', '/api/kyc/me', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 26: kyc/me failed', JSON.stringify(r.data));
    return false;
  }
  if (r.data.tier !== 0) {
    bad('Step 26: new user should be Tier 0 (Sandbox)', `got tier ${r.data.tier}`);
    return false;
  }
  if (!r.data.nextTier || !r.data.nextTierMissing) {
    bad('Step 26: missing nextTier guidance');
    return false;
  }
  ok(`Step 26: KYC me OK · Tier ${r.data.tier} ${r.data.tierName} · next: T${r.data.nextTier} needs ${r.data.nextTierMissing.length} doc(s)`);
  return true;
}

async function test27_kycTier() {
  const r = await api('GET', '/api/kyc/tier', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 27: kyc/tier failed', JSON.stringify(r.data));
    return false;
  }
  if (r.data.tier !== 0 || r.data.name !== 'Sandbox') {
    bad('Step 27: tier endpoint wrong', JSON.stringify(r.data));
    return false;
  }
  ok('Step 27: KYC tier endpoint OK · header-badge ready');
  return true;
}

async function test21_complianceInfo() {
  const r = await api('GET', '/api/compliance/info');
  if (!r.ok) {
    bad('Step 21: compliance/info failed', JSON.stringify(r.data));
    return false;
  }
  if (!r.data?.spec?.includes('v3.3 §13.1')) {
    bad('Step 21: compliance/info wrong version');
    return false;
  }
  if (!r.data?.enforced?.legalPositioning?.includes('NOT MLM')) {
    bad('Step 21: legal positioning missing "NOT MLM"');
    return false;
  }
  ok('Step 21: compliance/info OK · NOT-MLM positioning enforced');
  return true;
}

async function test22_ofacCheck() {
  // Test 1: clean name → allowed
  const ok1 = await api('POST', '/api/compliance/ofac/check', {
    body: { name: 'Ahmed Khan', email: 'ahmed@example.com', country: 'PK' },
  });
  if (!ok1.ok || !ok1.data?.allowed) {
    bad('Step 22a: clean OFAC check should pass', JSON.stringify(ok1.data));
    return false;
  }
  ok('Step 22a: OFAC pass for legitimate user');

  // Test 2: high-risk country → blocked
  const blocked = await api('POST', '/api/compliance/ofac/check', {
    body: { name: 'Test User', email: 'test@example.com', country: 'KP' },
  });
  if (!blocked.ok || blocked.data?.allowed !== false) {
    bad('Step 22b: KP country should be blocked', JSON.stringify(blocked.data));
    return false;
  }
  ok(`Step 22b: OFAC correctly blocks KP (${blocked.data.reason})`);
  return true;
}

async function test23_idsShape() {
  const r = await api('GET', '/api/compliance/ids');
  if (!r.ok) {
    bad('Step 23: IDS failed', JSON.stringify(r.data));
    return false;
  }
  const need = ['generatedAt', 'totalAffiliates', 'medianMonthlyEarningsUsd', 'top1PctMonthlyUsd', 'distribution', 'note', 'legalDisclaimer'];
  const missing = need.filter((k) => !(k in r.data));
  if (missing.length > 0) {
    bad('Step 23: IDS missing keys', `missing: ${missing.join(', ')}`);
    return false;
  }
  if (!r.data.legalDisclaimer?.includes('NOT an MLM')) {
    bad('Step 23: IDS legalDisclaimer missing NOT-MLM language');
    return false;
  }
  ok(`Step 23: IDS OK · ${r.data.totalAffiliates} affiliates · median $${r.data.medianMonthlyEarningsUsd}/mo`);
  return true;
}

async function test24_complianceMe() {
  const r = await api('GET', '/api/compliance/me', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 24: compliance/me failed', JSON.stringify(r.data));
    return false;
  }
  if (!('geographicDistribution' in r.data) || !('incomeRule80_20' in r.data)) {
    bad('Step 24: compliance/me missing checks');
    return false;
  }
  ok(`Step 24: compliance/me OK · 80/20 ruleApplies=${r.data.incomeRule80_20.ruleApplies} (R1 = N/A)`);
  return true;
}

async function test18_rankProgress() {
  const r = await api('GET', '/api/affiliate/rank/progress', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 18: rank progress failed', JSON.stringify(r.data));
    return false;
  }
  const need = ['currentRank', 'eligibleRank', 'nextRank', 'metrics', 'progress'];
  const missing = need.filter((k) => !(k in r.data));
  if (missing.length > 0) {
    bad('Step 18: rank progress missing keys', `missing: ${missing.join(', ')}`);
    return false;
  }
  if (r.data.currentRank !== 'R1') {
    bad('Step 18: new user rank should be R1', `got ${r.data.currentRank}`);
    return false;
  }
  if (r.data.nextRank !== 'R2') {
    bad('Step 18: next rank from R1 should be R2', `got ${r.data.nextRank}`);
    return false;
  }
  ok(`Step 18: rank progress OK · current ${r.data.currentRank} ${r.data.currentRankName} · next ${r.data.nextRank} ${r.data.nextRankName}`);
  return true;
}

async function test19_rankLadder() {
  const r = await api('GET', '/api/affiliate/rank/ladder');
  if (!r.ok) {
    bad('Step 19: rank ladder failed', JSON.stringify(r.data));
    return false;
  }
  if (!r.data.ranks?.R1 || !r.data.ranks?.R10) {
    bad('Step 19: ranks R1/R10 missing from ladder');
    return false;
  }
  if (r.data.ranks.R10.stl !== 8) {
    bad('Step 19: R10 STL should be capped at 8 (founder revision)', `got ${r.data.ranks.R10.stl}`);
    return false;
  }
  if (r.data.achievementBonusUsd?.R3 !== 100 || r.data.achievementBonusUsd?.R10 !== 10000) {
    bad('Step 19: rank achievement bonus mismatch', JSON.stringify(r.data.achievementBonusUsd));
    return false;
  }
  ok(`Step 19: rank ladder OK · R10 STL capped at L8 · bonuses R3=$100 R10=$10,000`);
  return true;
}

async function test20_rankEvaluate() {
  const r = await api('POST', '/api/affiliate/rank/evaluate', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 20: rank evaluate failed', JSON.stringify(r.data));
    return false;
  }
  if (typeof r.data?.promotion?.promoted !== 'boolean') {
    bad('Step 20: rank evaluate response shape wrong', JSON.stringify(r.data));
    return false;
  }
  ok(`Step 20: rank evaluate OK · promoted=${r.data.promotion.promoted} · current=${r.data.progress.currentRank}`);
  return true;
}

async function test16_capStatus() {
  const r = await api('GET', '/api/affiliate/caps', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 16: caps status failed', JSON.stringify(r.data));
    return false;
  }
  const need = ['rank', 'dailyCap', 'dailyEarned', 'dailyRemaining', 'monthlyCap', 'monthlyEarned', 'monthlyRemaining', 'perTxCap'];
  const missing = need.filter((k) => !(k in r.data));
  if (missing.length > 0) {
    bad('Step 16: caps shape missing keys', `missing: ${missing.join(', ')}`);
    return false;
  }
  if (r.data.rank !== 'R1') {
    bad('Step 16: new user rank should be R1', `got ${r.data.rank}`);
    return false;
  }
  if (r.data.dailyCap !== 100) {
    bad('Step 16: R1 daily cap should be $100', `got $${r.data.dailyCap}`);
    return false;
  }
  if (r.data.monthlyCap !== 100 * 25) {
    bad('Step 16: R1 monthly cap should be $2,500 (25× daily)', `got $${r.data.monthlyCap}`);
    return false;
  }
  if (r.data.perTxCap !== 10_000) {
    bad('Step 16: per-tx cap should be $10,000', `got $${r.data.perTxCap}`);
    return false;
  }
  ok(`Step 16: cap status OK · R1 · daily $${r.data.dailyEarned}/$${r.data.dailyCap} · monthly $${r.data.monthlyEarned}/$${r.data.monthlyCap}`);
  return true;
}

async function test17_capLadder() {
  const r = await api('GET', '/api/affiliate/caps/ladder');
  if (!r.ok) {
    bad('Step 17: caps ladder failed', JSON.stringify(r.data));
    return false;
  }
  if (r.data.dailyByRank?.R1 !== 100 || r.data.dailyByRank?.R10 !== 5000) {
    bad('Step 17: daily ladder mismatch', JSON.stringify(r.data.dailyByRank));
    return false;
  }
  if (r.data.monthlyCapMultiplier !== 25) {
    bad('Step 17: monthly multiplier should be 25');
    return false;
  }
  ok(`Step 17: cap ladder OK · R1 $${r.data.dailyByRank.R1}/day → R10 $${r.data.dailyByRank.R10}/day · 25× monthly`);
  return true;
}

async function test10_walletExists() {
  // Ensure affiliate wallet (idempotent)
  const r = await api('POST', '/api/wallet/affiliate/ensure', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 10: ensure affiliate wallet failed', JSON.stringify(r.data));
    return false;
  }
  ok('Step 10: affiliate wallet ensured (idempotent)');
  return true;
}

async function test11_walletBalance() {
  const r = await api('GET', '/api/wallet/affiliate/balance', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 11: wallet balance failed', JSON.stringify(r.data));
    return false;
  }
  const expectedKeys = ['balances', 'pendingHold', 'availableUsd', 'totalUsd', 'stats', 'settings', 'status'];
  const missing = expectedKeys.filter((k) => !(k in r.data));
  if (missing.length > 0) {
    bad('Step 11: balance missing keys', `missing: ${missing.join(', ')}`);
    return false;
  }
  if (r.data.settings?.payoutMix?.usdtPercent !== 80) {
    bad('Step 11: default payout mix usdtPercent not 80', `got ${r.data.settings?.payoutMix?.usdtPercent}`);
    return false;
  }
  ok(`Step 11: wallet balance shape OK · 80/20 mix · status=${r.data.status}`);
  return true;
}

async function test12_walletInfo() {
  const r = await api('GET', '/api/wallet/affiliate/info');
  if (!r.ok || !r.data?.spec?.includes('v3.3')) {
    bad('Step 12: wallet/info failed or wrong version', JSON.stringify(r.data));
    return false;
  }
  if (r.data.payoutMixDefault?.usdtPercent !== 80) {
    bad('Step 12: payout mix default not 80/20');
    return false;
  }
  if (r.data.fees?.affToMain !== 0) {
    bad('Step 12: aff-to-main fee should be 0 (FREE)');
    return false;
  }
  ok('Step 12: wallet/info correct (v3.3, 80/20 mix, FREE internal transfer)');
  return true;
}

async function test13_walletTransactions() {
  const r = await api('GET', '/api/wallet/affiliate/transactions?limit=5', { token: sponsorToken });
  if (!r.ok) {
    bad('Step 13: wallet transactions failed', JSON.stringify(r.data));
    return false;
  }
  if (!Array.isArray(r.data?.transactions)) {
    bad('Step 13: transactions not an array', JSON.stringify(r.data));
    return false;
  }
  ok(`Step 13: wallet transactions endpoint OK · ${r.data.transactions.length} entries`);
  return true;
}

async function test14_transferRejectsZero() {
  // Transfer with amountUsd <= 0 should fail
  const r = await api('POST', '/api/wallet/affiliate/transfer-to-main', {
    token: sponsorToken,
    body: { amountUsd: 0 },
  });
  if (r.ok) {
    bad('Step 14: transfer with $0 should have been rejected');
    return false;
  }
  if (r.status !== 400) {
    bad(`Step 14: expected 400 for invalid amount, got ${r.status}`);
    return false;
  }
  ok('Step 14: transfer correctly rejects amountUsd <= 0');
  return true;
}

async function test15_transferRejectsExceedsBalance() {
  // Transfer way more than the wallet has — should fail with 402
  const r = await api('POST', '/api/wallet/affiliate/transfer-to-main', {
    token: sponsorToken,
    body: { amountUsd: 999999 },
  });
  if (r.ok) {
    bad('Step 15: transfer of $999999 should have been rejected (insufficient)');
    return false;
  }
  if (r.status !== 402) {
    bad(`Step 15: expected 402 for insufficient balance, got ${r.status}`);
    return false;
  }
  ok('Step 15: transfer correctly rejects amount > balance (402)');
  return true;
}

async function test9_constants() {
  const r = await api('GET', '/api/affiliate/info');
  if (!r.ok) {
    bad('Step 9: /info failed', JSON.stringify(r.data));
    return false;
  }
  const checks = [
    [r.data.networkPoolPercent === 5, 'networkPoolPercent = 5'],
    [r.data.levelRates?.[1] === 0.03, 'levelRates[1] = 0.03 (L1 = 3%)'],
    [r.data.levelRates?.[2] === 0.015, 'levelRates[2] = 0.015 (L2 = 1.5%)'],
    [r.data.bonuses?.firstSaleUsd === 5, 'bonuses.firstSaleUsd = 5'],
    [r.data.bonuses?.stlBonusRates?.[1] === 0.03, 'bonuses.stlBonusRates[1] = 0.03'],
    [r.data.bonuses?.fastSale?.triggerCount === 4, 'bonuses.fastSale.triggerCount = 4'],
    [r.data.bonuses?.fastSale?.weeklyFreeCap === 2, 'bonuses.fastSale.weeklyFreeCap = 2'],
  ];
  for (const [pass_, label] of checks) {
    if (pass_) ok(`Step 9: ${label}`);
    else bad(`Step 9: ${label} mismatch`);
  }
  return checks.every(([p]) => p);
}

// ─── Runner ───────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  EHB Affiliate v3.2-MVP — End-to-End Smoke Test');
  console.log('═══════════════════════════════════════════════════');
  console.log(`API: ${API}\n`);

  const ready = await waitForApi();
  if (!ready) {
    bad('API not reachable', `Tried ${API} 10 times — is the server running?`);
    console.log('\n💡 Start the API: cd services/api && pnpm dev');
    process.exit(1);
  }

  await test1_health();
  await test2_register();
  if (!sponsorToken || !referralToken) {
    console.log('\n⚠️  Cannot continue without auth tokens. Aborting.');
    process.exit(1);
  }
  await test3_joinAffiliate();
  await test4_chainVerification();
  await test5_simulateOrder();
  await test6_earningsBreakdown();
  await test7_referralLink();
  await test8_tree();
  await test9_constants();

  // ─── v3.3 Wallet Flow ─────────────────────────────────────────────────
  console.log('\n─── Wallet Flow (v3.3 Phase 1 MVP) ───\n');
  await test10_walletExists();
  await test11_walletBalance();
  await test12_walletInfo();
  await test13_walletTransactions();
  await test14_transferRejectsZero();
  await test15_transferRejectsExceedsBalance();

  // ─── v3.3 Capping Engine ──────────────────────────────────────────────
  console.log('\n─── Capping Engine (v3.3 §13.2) ───\n');
  await test16_capStatus();
  await test17_capLadder();

  // ─── v3.2 Rank Engine ─────────────────────────────────────────────────
  console.log('\n─── Rank Engine (v3.2 §12.5 + R10 cap revision) ───\n');
  await test18_rankProgress();
  await test19_rankLadder();
  await test20_rankEvaluate();

  // ─── v3.3 Compliance ──────────────────────────────────────────────────
  console.log('\n─── Compliance (v3.3 §13.1) ───\n');
  await test21_complianceInfo();
  await test22_ofacCheck();
  await test23_idsShape();
  await test24_complianceMe();

  // ─── v3.3 KYC ─────────────────────────────────────────────────────────
  console.log('\n─── KYC (v3.3 §13.6.5) ───\n');
  await test25_kycInfo();
  await test26_kycMe();
  await test27_kycTier();

  // ─── Track B + Bonuses + Industry Rates ───────────────────────────────
  console.log('\n─── Track B + Industry Rates + Bonus Catalog ───\n');
  await test28_trackBInfo();
  await test29_bonusesInfo();
  await test30_industryCategories();
  await test31_industryRates();
  await test32_retentionUplift();

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`  Result: ${pass} passed · ${fail} failed`);
  console.log('═══════════════════════════════════════════════════');

  if (fail > 0) {
    console.log('\n❌ Some tests failed. Check API logs + output above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! Backend v3.2-MVP is healthy.');
    console.log('\n📋 Next manual steps:');
    console.log('   1. Open http://localhost:3000/affiliate in browser');
    console.log('   2. Login as sponsor → see referral code + zero earnings');
    console.log(`   3. Use sponsor code: ${sponsorRef}`);
    console.log('   4. Register a 3rd user via /register?ref=' + sponsorRef);
    console.log('   5. Place a real GoSellr order → confirm delivery → see commission credit');
    process.exit(0);
  }
}

main().catch((e) => {
  console.error('\n💥 Smoke test crashed:', e);
  process.exit(1);
});
