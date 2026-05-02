# EHB · Franchise Revenue Flow (concrete money flow)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Show exact money path from buyer → through franchise tiers → to all parties.

---

## 🔥 Master flow

```
User Payment ($100)
   ↓
Escrow (held by EHB Wallet)
   ↓ (cooling period ends · no dispute)
SPLIT 70/10/10/10:
   ├─ Seller         70%  ($70)
   ├─ Rider          10%  ($10) [if delivery]
   ├─ Franchise      10%  ($10) [split below]
   └─ EHB HQ         10%  ($10)

Franchise 10% ($10) — split per 5-tier:
   ├─ Sub           40%   ($4.00)
   ├─ Master        25%   ($2.50)
   ├─ Corporate     20%   ($2.00) [WAS REVISED — now 15%]
   └─ Country       15%   ($1.50)

UPDATE per founder lock v2.0 (5-tier):
   ├─ Sub           40%   ($4.00)
   ├─ Corporate     15%   ($1.50)
   ├─ Master        25%   ($2.50)
   ├─ Country       15%   ($1.50)
   └─ EHB HQ buffer  5%   ($0.50)
```

---

## Real-world example: Karachi healthcare order $200

```
Buyer in Karachi pays $200 for medical consult (WMS industry)

Escrow held: $200

Industry: WMS (multiplier 2.0×)
DMO mode: CRITICAL (30-day cooling)

After 30 days · no dispute · settlement triggered:

Total = $200

Distribution:
├─ Service Provider (doctor)    $140 (70%)
├─ Rider                        $0 (no delivery, virtual consult)
├─ Franchise tier split           $20 (10%)
│   ├─ Sub L5 Karachi-Saddar    $8.00 (40%)
│   ├─ Corporate (Healthcare)   $3.00 (15%)
│   ├─ Master Karachi           $5.00 (25%)
│   ├─ Country Pakistan         $3.00 (15%)
│   └─ EHB HQ buffer            $1.00 (5%)
├─ EHB Platform (commission)    $40 (20%) [includes redirected rider 10%]
└─ Total accounted              $200 ✓
```

---

## Per-tier earnings sources

### Country Franchise

```
Per order in country:                    1.5% of $value
  ├─ Verification fees (PSS L7+):        $30-200 per
  ├─ Industry-specific premiums:         varies
  ├─ Country-level subscription:         $X/year per organization
  ├─ Penalty share (when slashing):      0% (treasury keeps)
  └─ Lock yield on capital:              4-6% APY on $5M-$50M
```

### Master Franchise

```
Per order in metro:                      2.5% of $value
  ├─ Sub-franchise approval fees:        $500-2000 per Sub onboarded
  ├─ Quality audit fees:                 quarterly
  └─ Lock yield:                         4-6% APY on $100K-$500K
```

### Corporate Franchise

```
Per order in segment:                    1.5% of $value
  ├─ Service/product premium fees:       per industry
  ├─ Employee onboarding fees:           per employee
  └─ Lock yield:                         4-6% APY
```

### Sub Franchise (L1-L10)

```
Per order in zone:                       4.0% of $value
  ├─ User verification fees:             $20-200 per L7+ verification
  ├─ CRB exam admin fees:                $30-100 per exam
  ├─ Multimedia validation:              $50-150 per
  ├─ Vouching reward (when vouched user earns):  small bonus
  ├─ Penalty share (slashes in zone):    25% of slashed amount
  ├─ Refill audit fees:                  quarterly
  └─ Lock yield:                         4-6% APY on $5K-$50K
```

### Micro Franchise

```
Per task completed:                      Direct payment from order
  ├─ E.g., delivery $1-3 per
  ├─ Service session $20-200
  ├─ Affiliate commission 5-15%
  └─ Lock yield:                         4-6% APY on 100 EHBGC
```

---

## Settlement timing

| Trigger | When |
|---|---|
| Real-time | Yield (daily streaming) |
| Per-order (after cooling) | Order commissions to all tiers |
| Weekly | Aggregate reconciliation |
| Monthly | Tier audit + variable bonuses |
| Quarterly | Refill cycle settlement + bonuses |

---

## Distribution mechanics

```
Order completes →
Wallet smart-contract triggers split:

1. Calculate split per 5-tier
2. Move funds to each party's locked wallet
3. Notification to each party
4. Polkadot anchor (audit)
5. Per-day settlement to spendable wallet (after cooling)
6. Each party can withdraw / reinvest
```

---

## Per-country revenue distribution (estimate Year-1)

Based on phase-1 launch:

```
Pakistan (PK):       $200M GMV/yr → $5M EHB rev/yr → $4M franchise pool
   ├─ Country PK:    $750K
   ├─ 5 Masters:     $2.5M total
   ├─ 50 Corporates: $250K total
   ├─ 500 Subs:      $400K total
   └─ 5000+ Micros:  $100K total

UAE (AE):            $100M GMV → $2.5M EHB → $2M franchise
   (similar split)

(Saudi, Turkey, Malaysia similar scaled)
```

---

## Penalty share distribution

When DMO slashes an entity:

```
Slashed amount distributed:
   ├─ EHB Treasury:  60% (anti-fraud reserves)
   ├─ Sub Franchise: 25% (in zone — incentive to flag)
   └─ Master:        15% (above Sub — chain accountability)
```

This rewards franchises for active fraud detection.

---

## Edge cases

### No franchise in territory

If no franchise covers a zone:
- Sub's 40% redirects to nearest Master
- Master's 25% increases temporarily until Sub onboarded

### Multi-industry order

If order spans multiple industries:
- Primary industry takes 60% of franchise share
- Secondary industries split remaining 40%

### Cross-border order

Buyer in PK, Seller in UAE:
- PK Country gets buyer-side commissions
- UAE Country gets seller-side commissions
- Conflict resolution via DMO Council if disputed

### Refund

If order refunded:
- All distributions reversed proportionally
- Audit anchor of reversal
- Time-stamped both directions

---

## Implementation pattern

```typescript
// services/api/src/services/distributionService.js

async function distributeOrderRevenue(orderId) {
  const order = await Order.findById(orderId);
  const value = order.value;

  // Split 70/10/10/10
  const sellerShare = value * 0.70;
  const riderShare = order.requiresRider ? value * 0.10 : 0;
  const franchiseShare = value * 0.10;
  const ehbShare = value * 0.10 + (order.requiresRider ? 0 : value * 0.10);

  // Franchise 10% split
  const subShare = franchiseShare * 0.40;
  const corporateShare = franchiseShare * 0.15;
  const masterShare = franchiseShare * 0.25;
  const countryShare = franchiseShare * 0.15;
  const hqBuffer = franchiseShare * 0.05;

  // Move funds + audit
  await wallet.credit(order.sellerId, sellerShare);
  if (order.riderId) await wallet.credit(order.riderId, riderShare);
  await wallet.credit(order.subFranchiseId, subShare);
  await wallet.credit(order.corporateFranchiseId, corporateShare);
  await wallet.credit(order.masterFranchiseId, masterShare);
  await wallet.credit(order.countryFranchiseId, countryShare);
  await wallet.credit(EHB_TREASURY, ehbShare + hqBuffer);

  // Polkadot anchor
  await blockchain.anchor({ orderId, distributions: {...} });
}
```

---

## Cross-references

- Master franchise model: `EHB-FRANCHISE-MODEL.md`
- Earnings detail: `FRANCHISE-EARNINGS.md`
- Country list: `COUNTRY-FRANCHISE-LIST.md`
- Order flow: `4-flows/ORDER-FLOW.md`
- Wallet: `3-departments/Wallet.md`
- Commission: `3-departments/Commission.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial revenue flow with concrete examples + code pattern |
