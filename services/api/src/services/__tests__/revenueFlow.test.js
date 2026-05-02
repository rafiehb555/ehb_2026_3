/**
 * Revenue Flow Test — Concrete distribution validation.
 *
 * Tests the $200 healthcare order example from
 * `ehb-info/11-franchise/FRANCHISE-REVENUE-FLOW.md`.
 *
 * Run: npm test revenueFlow
 */

const fs = require('fs');
const path = require('path');

// Load FLOW-SCHEMA constants
const schema = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../../../..', 'ehb-info/5-specs/FLOW-SCHEMA.json'),
    'utf8'
  )
);

// =====================================================================
// Distribution function (real implementation)
// =====================================================================

function distributeOrderRevenue({
  orderValue,
  industry,
  hasRider = false,
  sellerId,
  riderId,
  subFranchiseId,
  corporateFranchiseId,
  masterFranchiseId,
  countryFranchiseId,
}) {
  // Step 1: 70/10/10/10 split per Order Flow
  const sellerShare = orderValue * 0.70;
  const riderShare = hasRider ? orderValue * 0.10 : 0;
  const franchiseShare = orderValue * 0.10;
  // Without rider, that 10% goes to EHB
  const ehbShare = orderValue * 0.10 + (hasRider ? 0 : orderValue * 0.10);

  // Step 2: Franchise 10% → 5-tier split (40/15/25/15/5)
  const subShare = franchiseShare * 0.40;
  const corporateShare = franchiseShare * 0.15;
  const masterShare = franchiseShare * 0.25;
  const countryShare = franchiseShare * 0.15;
  const hqBuffer = franchiseShare * 0.05;

  return {
    orderValue,
    industry,
    distribution: {
      seller: { id: sellerId, amount: round(sellerShare) },
      rider: { id: riderId || null, amount: round(riderShare) },
      sub: { id: subFranchiseId, amount: round(subShare) },
      corporate: { id: corporateFranchiseId, amount: round(corporateShare) },
      master: { id: masterFranchiseId, amount: round(masterShare) },
      country: { id: countryFranchiseId, amount: round(countryShare) },
      ehb_treasury: { amount: round(ehbShare + hqBuffer) },
    },
    totals: {
      sum: round(sellerShare + riderShare + subShare + corporateShare + masterShare + countryShare + ehbShare + hqBuffer),
      shouldEqual: orderValue,
    },
  };
}

function round(n) {
  return Math.round(n * 100) / 100;
}

// =====================================================================
// Tests
// =====================================================================

describe('Revenue Flow — concrete distribution', () => {
  test('Test 1: $200 healthcare order (no rider, virtual consult)', () => {
    const result = distributeOrderRevenue({
      orderValue: 200,
      industry: 'WMS',
      hasRider: false,
      sellerId: 'doctor_001',
      subFranchiseId: 'sub_karachi_saddar_001',
      corporateFranchiseId: 'corp_healthcare_pk_001',
      masterFranchiseId: 'master_karachi_001',
      countryFranchiseId: 'country_pk',
    });

    // Verify totals
    expect(result.totals.sum).toBe(200);

    // Verify per-tier amounts (per FRANCHISE-REVENUE-FLOW.md example)
    expect(result.distribution.seller.amount).toBe(140); // 70%
    expect(result.distribution.rider.amount).toBe(0); // no rider
    expect(result.distribution.sub.amount).toBe(8); // 4%
    expect(result.distribution.corporate.amount).toBe(3); // 1.5%
    expect(result.distribution.master.amount).toBe(5); // 2.5%
    expect(result.distribution.country.amount).toBe(3); // 1.5%

    // EHB Treasury gets 10% (rider absent so +10%) + 0.5% (HQ buffer) = 21
    // = $200 × 0.10 + $200 × 0.10 + $200 × 0.005 = 21
    expect(result.distribution.ehb_treasury.amount).toBe(21);
  });

  test('Test 2: $100 e-commerce order (with rider delivery)', () => {
    const result = distributeOrderRevenue({
      orderValue: 100,
      industry: 'GSM',
      hasRider: true,
      sellerId: 'seller_001',
      riderId: 'rider_001',
      subFranchiseId: 'sub_001',
      corporateFranchiseId: 'corp_001',
      masterFranchiseId: 'master_001',
      countryFranchiseId: 'country_pk',
    });

    expect(result.totals.sum).toBe(100);
    expect(result.distribution.seller.amount).toBe(70);
    expect(result.distribution.rider.amount).toBe(10);
    expect(result.distribution.sub.amount).toBe(4);
    expect(result.distribution.corporate.amount).toBe(1.5);
    expect(result.distribution.master.amount).toBe(2.5);
    expect(result.distribution.country.amount).toBe(1.5);
    expect(result.distribution.ehb_treasury.amount).toBe(10.5); // 10% + 0.5% HQ
  });

  test('Test 3: $1000 legal consult (high-value, no rider)', () => {
    const result = distributeOrderRevenue({
      orderValue: 1000,
      industry: 'OLS',
      hasRider: false,
      sellerId: 'lawyer_001',
      subFranchiseId: 'sub_legal_001',
      corporateFranchiseId: 'corp_legal_001',
      masterFranchiseId: 'master_lhr_001',
      countryFranchiseId: 'country_pk',
    });

    expect(result.totals.sum).toBe(1000);
    expect(result.distribution.seller.amount).toBe(700);
    expect(result.distribution.rider.amount).toBe(0);
    expect(result.distribution.sub.amount).toBe(40);
    expect(result.distribution.corporate.amount).toBe(15);
    expect(result.distribution.master.amount).toBe(25);
    expect(result.distribution.country.amount).toBe(15);
    expect(result.distribution.ehb_treasury.amount).toBe(105); // 10% + 0.5% HQ
  });

  test('Test 4: Verify revenue split constants match FLOW-SCHEMA.json (5-tier locked)', () => {
    expect(schema.constants.revenue_split).toEqual([70, 10, 10, 10]);
    // Canonical 5-tier: [Sub, Corporate, Master, Country, HQ_buffer]
    expect(schema.constants.franchise_split).toEqual([40, 15, 25, 15, 5]);
    // Sum check
    const sum = schema.constants.franchise_split.reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
  });

  test('Test 5: Slashing cap (50% max per window)', () => {
    expect(schema.constants.slashing.max_per_window).toBe(50);
  });

  test('Test 6: STL lock ladder (canonical L1-L10)', () => {
    expect(schema.stl_lock_ladder.L1).toBe(0);
    expect(schema.stl_lock_ladder.L7).toBe(800);
    expect(schema.stl_lock_ladder.L10).toBe(10000);
    // Guard: ensure NO L0 key exists (legacy L0-L8 fully migrated)
    expect(schema.stl_lock_ladder.L0).toBeUndefined();
    // Guard: full L1-L10 ladder present
    for (let i = 1; i <= 10; i++) {
      expect(schema.stl_lock_ladder[`L${i}`]).toBeDefined();
    }
  });

  test('Test 7: Industry multipliers (Healthcare 2.0×)', () => {
    expect(schema.industry_multipliers.WMS).toBe(2.0);
    expect(schema.industry_multipliers.OLS).toBe(2.0);
    expect(schema.industry_multipliers.GSM).toBe(1.3);
    expect(schema.industry_multipliers._default).toBe(1.0);
  });

  test('Test 8: Min STL per industry (Healthcare requires L4)', () => {
    expect(schema.min_stl_per_industry.WMS).toBe(4);
    expect(schema.min_stl_per_industry.OLS).toBe(3);
    expect(schema.min_stl_per_industry.FIN).toBe(4);
    expect(schema.min_stl_per_industry.GSM).toBe(1);
  });
});

// Export for use in non-test contexts (smoke tests, demos)
module.exports = { distributeOrderRevenue };
