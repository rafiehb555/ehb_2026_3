# Commission — EHB Revenue & Distribution Engine

**Status:** Canonical spec (v2.0) · 2026-04-19 — LOCKED
**Related:** `Franchise.md` · `Affiliate.md` · `Wallet.md` · `DMO.md` · `GoSellr.md`

---

## 1. Purpose

The Commission system is the financial backbone of EHB. It defines HOW money flows through the platform — from order placement to final wallet credit. Three earning engines + one distribution model = the complete revenue architecture.

**STATUS: LOCKED — Do not modify without founder (Rafi) explicit approval.**

---

## 2. Three Earning Engines (LOCKED)

### 2.1 Engine 1: Order Commission (85/10/5 Split)

Every order on the platform follows the **85/10/5 distribution model:**

| Party | Share | Description |
|---|---|---|
| **Seller** | 85% | Seller keeps the majority of the order value |
| **Franchise Network** | 10% | Distributed across the franchise chain |
| **Platform (EHB HQ)** | 5% | Company revenue |

- **Trigger:** Order completed successfully
- **Example:** $100 order → Seller $85, Franchise Network $10, Platform $5

#### Franchise Network Sub-Distribution (10% portion)

| Franchise Level | Share of 10% | Of Total Order |
|---|---|---|
| Sub Franchise | 5% | 5% of order |
| Master Franchise | 2% | 2% of order |
| Corporate Franchise | 1.5% | 1.5% of order |
| Country Franchise | 1% | 1% of order |
| HQ Extra | 0.5% | 0.5% of order |

#### Example: $100 Order

```
Customer pays: $100

Seller:                  $85.00 (85%)
Franchise Network:       $10.00 (10%)
  ├── Sub Franchise:      $5.00 (5%)
  ├── Master Franchise:   $2.00 (2%)
  ├── Corporate:          $1.50 (1.5%)
  ├── Country:            $1.00 (1%)
  └── HQ Extra:           $0.50 (0.5%)
Platform (HQ):            $5.00 (5%)
                         ------
Total:                  $100.00
```

#### Pakistan Special Case

Since Pakistan has no Country Franchise (HQ controls directly):
- Country Franchise share (1%) goes to HQ
- Effective HQ share in Pakistan: 5% + 0.5% + 1% = 6.5%

### Dynamic Seller Share (CONFIRMED)

The 85% seller share is the BASE default. It adjusts dynamically based on seller STL level:

| Condition | Seller Share | Franchise | Platform |
|---|---|---|---|
| New seller (low STL) | 80% | 10% | 10% |
| Normal seller | 85% | 10% | 5% |
| High STL seller | 88% | 10% | 2% |
| VIP STL seller | 90% | 10% | 0% (subsidized) |

**Logic:** Higher trust = higher earnings. Quality sellers rewarded with reduced platform fee.

**Rule:** Franchise network share (10%) is ALWAYS fixed. Only seller vs platform share adjusts.

### 2.2 Engine 2: Affiliate Product Commission (Amazon-style)

When products are sold through affiliate referral links, the affiliate earns a category-based commission percentage.

- **Model:** Amazon Associates style — different categories have different rates
- **Who earns:** The affiliate who referred the buyer
- **Source:** Comes from seller's margin (not additional charge to buyer)
- **Categories:** Admin-configurable per industry/category

| Category Example | Commission Rate |
|---|---|
| Electronics | 3-5% |
| Fashion | 8-12% |
| Health/Beauty | 6-10% |
| Food/Grocery | 2-4% |
| Services | 5-8% |
| Education | 8-15% |

*(Exact category rates to be configured by admin per country)*

### 2.3 Engine 3: Franchise Sale Commission (30% to Affiliate Network)

When a franchise is sold through the affiliate/referral network, 30% of the franchise sale price goes to the affiliate chain.

- **Rate:** 30% of franchise sale price
- **Distribution:** Multi-level referral chain (L1: 5%, L2: 3%, L3: 2%, remaining to pool)
- **Example:** $20,000 franchise sold → $6,000 goes to affiliate network
  - L1 (direct referrer): 5% = $1,000
  - L2 (indirect): 3% = $600
  - L3 (deep): 2% = $400
  - Remaining: distributed per system rules

---

## 3. Level-wise Direct Commission (Sub Franchise)

Sub Franchises earn additional direct commission based on their level:

| Category | Levels | Direct % | Team Override % | City Bonus % | Daily Cap |
|---|---|---|---|---|---|
| Foundation | L1 | 5% | — | — | $200 |
| Foundation | L2 | 5% | — | — | $350 |
| Foundation | L3 | 5% | — | — | $500 |
| Growth | L4 | 7% | 2% | — | $750 |
| Growth | L5 | 7% | 2% | — | $1,200 |
| Growth | L6 | 7% | 3% | — | $2,000 |
| Growth | L7 | 7% | 3% | — | $3,500 |
| Elite | L8 | 10% | 3% | 2% | Unlimited |
| Elite | L9 | 10% | 3% | 3% | Unlimited |
| Elite | L10 | 10% | 3% | 5% | Unlimited |

---

## 4. Online Franchise Commission

| Tier | Direct % | Referral L1 | Referral L2 | Referral L3 | Daily Cap |
|---|---|---|---|---|---|
| OF1 ($100) | 3% | 5% | 2% | 1% | $50 |
| OF2 ($250) | 4% | 5% | 2% | 1% | $150 |
| OF3 ($750) | 5% | 5% | 2% | 1% | $300 |
| OF4 ($1,500) | 6% | 5% | 2% | 1% | $500 |

---

## 5. STL-Based Bonus System

| STL Level | Bonus on Commission |
|---|---|
| FREE–BASIC (L1-L2) | 0% (no bonus) |
| NORMAL (L3) | +1% |
| STANDARD-HIGH (L4-L6) | +2% |
| PRO-VIP (L7-L8) | +3% |
| ELITE-SUPREME (L9-L10) | +3% |

---

## 6. Penalty System (PSS Linked)

| Trigger | Impact |
|---|---|
| Late delivery | Commission cut 10% |
| Customer complaint | Commission cut 20% |
| Fraud detected | Commission frozen + investigation |
| Repeated violations | Account suspension |

---

## 7. Commission Calculation Code (Reference)

```javascript
function calculateOrderCommission(orderAmount, franchiseTree) {
  const sellerShare = orderAmount * 0.85;
  const networkShare = orderAmount * 0.10;
  const platformShare = orderAmount * 0.05;

  const distribution = {
    seller: sellerShare,
    sub: orderAmount * 0.05,
    master: orderAmount * 0.02,
    corporate: orderAmount * 0.015,
    country: orderAmount * 0.01,
    hq_extra: orderAmount * 0.005,
    platform: platformShare
  };

  // Pakistan special case
  if (franchiseTree.country === 'PK') {
    distribution.platform += distribution.country;
    distribution.country = 0;
  }

  return {
    orderAmount,
    sellerReceives: sellerShare,
    networkTotal: networkShare,
    platformTotal: platformShare,
    distribution,
    timestamp: new Date()
  };
}
```

### Complete Commission Pipeline

```javascript
async function processOrderCommission(order) {
  // Step 1: Calculate base distribution
  const distribution = calculateOrderCommission(order.amount, order.franchiseTree);

  // Step 2-5: Process each recipient
  for (const [role, amount] of Object.entries(distribution.distribution)) {
    const user = await getUser(order.franchiseTree[role]);
    // Step 4: Apply STL bonus
    const withBonus = applySTLBonus(user, amount);
    // Step 5: Apply penalties
    const final = applyPenalty(user, withBonus.totalCommission);
    // Step 6: Update wallet
    await updateWallet(user.id, final.finalCommission);
    // Step 7: CRB blockchain record
    await crbRecord(user.id, 'commission', { orderId: order.id, amount: final.finalCommission, role });
  }

  // Step 8: Affiliate commission (if referral chain exists)
  if (order.referralChain && order.referralChain.length > 0) {
    const affiliateCommissions = calculateAffiliateEarnings(order.amount, order.referralChain);
    for (const ac of affiliateCommissions) {
      await updateWallet(ac.userId, ac.earning);
      await crbRecord(ac.userId, 'affiliate_commission', { orderId: order.id, amount: ac.earning, level: ac.level });
    }
  }
}
```

---

## 8. Franchise Sale Commission Code

```javascript
function calculateFranchiseSaleCommission(salePrice, referralChain) {
  const totalAffiliatePool = salePrice * 0.30; // 30% to network
  const rates = { L1: 0.05, L2: 0.03, L3: 0.02 };

  const commissions = referralChain.map((ref, index) => {
    const level = `L${index + 1}`;
    const rate = rates[level] || 0;
    return {
      userId: ref.id,
      level: index + 1,
      rate,
      commission: salePrice * rate
    };
  });

  return {
    salePrice,
    totalAffiliatePool,
    commissions,
    remaining: totalAffiliatePool - commissions.reduce((s, c) => s + c.commission, 0)
  };
}
```

---

## 9. Attribution Model

- **Default:** Last Click Wins
- **Cookie duration:** 30 days
- **Override:** Admin can manually attribute
- **Dispute:** DMO resolves attribution conflicts

---

## 10. Admin Configurable Rules

| Rule | Default | Admin Can Change |
|---|---|---|
| Seller share | 85% | Yes |
| Sub commission | 5% | Yes |
| Master commission | 2% | Yes |
| Corporate commission | 1.5% | Yes |
| Country commission | 1% | Yes |
| HQ extra | 0.5% | Yes |
| Platform share | 5% | Yes |
| Affiliate L1 | 5% | Yes |
| Affiliate L2 | 2% | Yes |
| Affiliate L3 | 1% | Yes |
| STL bonus rates | 0-3% | Yes |
| Penalty rates | 10-20% | Yes |
| Daily caps | Level-based | Yes |

**Rule:** Changes apply to NEW orders only (never retroactive). Country-specific rules allowed.

---

## 11. Token Integration (CONFIRMED)

| Earning Type | Token |
|---|---|
| Order earnings (seller/franchise) | EHBGC (stable) |
| Affiliate bonus | EHBGX (growth) |
| Franchise bonus | Mixed (EHBGC base + EHBGX bonus) |
| STL achievement reward | EHBGX |
| Promotional campaigns | EHBGX |

See `Token.md` for full dual token specification.

---

## 12. Self-Delivery Rule

- **Seller can choose** to deliver their own order OR use a DMO rider
- If seller self-delivers: rider share (if any) goes back to seller
- If DMO rider used: standard rider earning applies

---

## 13. Commission Flow (End-to-End)

```
1. Order Placed
2. Payment Confirmed
3. Commission Engine Triggered
   ├── Calculate 85/10/5 base split
   ├── Distribute franchise network (Sub 5%, Master 2%, Corp 1.5%, Country 1%, HQ Extra 0.5%)
   ├── Check affiliate referral chain
   ├── Calculate affiliate commission (if applicable)
   ├── Apply STL bonus (0-3% based on trust level)
   ├── Apply penalties (if violations exist)
   ├── Up-Guard fraud check
   └── Credit all wallets
4. CRB Blockchain Record Created
5. Notifications Sent
```

---

## 14. Resolved Answers (LOCKED)

| # | Question | Answer | Date |
|---|---|---|---|
| 1 | **Currency** | USD Only — EHBGC sirf coin lock ke liye, commission USD mein | 2026-04-19 |
| 2 | **Escrow timing** | Instant — order complete = immediate wallet credit | 2026-04-19 |
| 3 | **COD** | Rider must maintain Trusty Wallet balance. Orders only received if wallet has funds. Commission deducted from rider's wallet on cash collection | 2026-04-19 |
| 4 | **Cross-country orders** | 50/50 Split — both buyer and seller country franchise chains get equal share of 10% network | 2026-04-19 |
| 5 | **Self-delivery** | Seller Choice — seller can deliver themselves or use DMO rider | 2026-04-19 |
| 6 | **Commission model** | 85/10/5 (NOT 2% service charge) — confirmed by founder | 2026-04-19 |

## 15. Additional Resolved Answers (LOCKED)

| # | Question | Answer | Date |
|---|---|---|---|
| 7 | **Buyer order limit** | Unlimited — no daily cap on buyer orders | 2026-04-19 |
| 8 | **Review window** | STL-based: Seller STL L4+ = min 1 week review window. Higher seller STL = shorter window, lower STL = longer window. Company sets minimum per STL level, seller can extend but never reduce below company minimum | 2026-04-19 |
| 9 | **Refund** | Full Clawback — refund triggers commission reversal from ALL wallets (seller + franchise chain + platform) | 2026-04-19 |
| 10 | **DMO Fee** | Both models coexist: Individual users pay SaaS billing (PKR 500-5000/month per STL level from DMO.md §31), Country Franchise pays $1,000 base + 1% monthly order volume | 2026-04-19 |
| 11 | **Service orders** | Same 85/10/5 base split for services. Affiliate commission varies by service category (admin configurable) | 2026-04-19 |
| 12 | **Product categories** | Electronics 3-5%, Fashion 10-15%, Beauty 15-25%, Home & Kitchen 8-12%, Groceries 2-4%, Health 10-18%, Books/Education 5-10%. Admin changeable per country | 2026-04-19 |
| 13 | **Return shipping** | Wrong/Damaged = seller pays. Change of mind = buyer pays. Fraud = seller + penalty | 2026-04-19 |

## 16. All Open Questions RESOLVED

| # | Question | Answer | Date |
|---|---|---|---|
| 14 | **Minimum commission payout** | 1,000 PKR (or equivalent EHBGC). Below threshold = hold in wallet | 2026-04-19 |
| 15 | **Revenue streams separation** | All 5 streams separate, no mixing, admin controllable: 1.Service Fee 2.Affiliate 3.Franchise Sales 4.DMO Subscription 5.Token Fees | 2026-04-19 |

**Status: ALL commission questions resolved. System ready for development.**

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-19 | 1.0 | Created with 2% service charge model (40% Company + 60% Franchise) |
| 2026-04-19 | 2.0 | **CORRECTED** to 85/10/5 split model per founder confirmation. Seller 85%, Franchise Network 10% (Sub 5%, Master 2%, Corp 1.5%, Country 1%, HQ Extra 0.5%), Platform 5%. Added level-wise direct commission, online franchise commission, STL bonus, penalty system, self-delivery rule. LOCKED. |
| 2026-04-19 | 3.0 | Added dynamic seller share (80-90% based on STL), token integration (EHBGC/EHBGX), franchise dual pricing reference |
| 2026-04-19 | 3.1 | Service commission confirmed (85/10/5 + category affiliate). Product categories locked. Return policy locked. |
| 2026-04-19 | 3.2 | All open questions resolved. Min payout = 1000 PKR. Revenue streams separated (5 streams). |

---

*EHB Technologies (Pvt.) Ltd. · Commission Department v2.0 · 2026-04-19 · LOCKED*
