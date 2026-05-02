# GoSellr — EHB Marketplace

**Status:** Canonical spec (v1.0) · Merged from `uploads/ehb_gosellr.md` (Batch-2, 2026-04-11) + Batch-1 detail in `DMO.md §22.15`
**Related:** `STL.md §4` (MIN rule) · `Wallet.md` · `Finance.md`

---

## 1. Purpose

GoSellr (also referenced as **GoSellr GSM — Global Shopping Management System** in the Industry list) is EHB's flagship **e-commerce + service marketplace**. It is the first industry that ships end-to-end and the reference implementation for every other EHB industry.

## 2. What it supports

- **Product selling** — physical goods, digital goods, subscriptions
- **Service marketplace** — freelancers, on-site services, home services
- **Delivery system** — rider network (LDS), last-mile fulfilment

## 3. User types (from Batch-1)

1. **Sellers** — product merchants, any STL
2. **Riders** — delivery providers (LDS integration)
3. **Service Providers** — freelancers and on-site service workers
4. **Companies** — bulk sellers with multiple SKUs and branches
5. **Franchisers** — territorial operators (see `Franchise.md`), separate STL ladder

## 4. Basic flow (Batch-2)

```
Search → Product → Order → Delivery
```

## 5. Full 10-step order flow (Batch-1 canonical, `DMO.md §22.15`)

```
1. Browse       — UI shows full STL chain on each card
2. Create       — cart build, address selection
3. Validate     — POST /api/stl/validate-product → finalStl + blockingLayer
4. Assign       — seller notification, rider dispatch (if physical)
5. Execute      — order fulfilment
6. Complete     — delivery confirmed, proof uploaded
7. Distribute   — revenue split (see §7)
8. STL impact   — positive activity, rating, possible STL bump
9. Complaint    — dispute window opens
10. Up-Guard    — fraud check on seller/rider/product patterns
```

## 6. Product card anti-fraud UI (Batch-1 canonical)

Every product card and product detail page **must** show the full STL chain so buyers see the weakest link:

```
┌───────────────────────────────────┐
│  [Product image]                  │
│  Product Name                     │
│  ★★★★☆ 4.3  ·  $24.99             │
├───────────────────────────────────┤
│  🛡 Trust chain                   │
│  Product   L7 PRO                 │
│  Seller    L6 HIGH                │
│  Company   L4 STANDARD  ← weakest │
│  Owner     L6 HIGH                │
│  Final     L4 STANDARD            │
└───────────────────────────────────┘
```

The weakest layer is highlighted — this is the "STL badge bleed" pattern from §23.3 suggestion S3.

## 7. Revenue Split (CONFIRMED — LOCKED, 2026-04-19)

**85/10/5 Model — Founder confirmed:**

| Party | Share | Detail |
|---|---:|---|
| **Seller** | 85% | Dynamic: 80–90% based on STL (see Commission.md §2.1) |
| **Franchise Network** | 10% | Sub 5% · Master 2% · Corporate 1.5% · Country 1% · HQ Extra 0.5% |
| **Platform (EHB HQ)** | 5% | Adjusts inversely with seller STL (0–10%) |

**Previous 70/10/10/10 model is DEPRECATED.** See `Commission.md` for full spec.

**Pakistan:** No Country Franchise → Country 1% goes to HQ (effective HQ = 6.5%).

## 8. STL integration

Every order touches STL at three points:

1. **Pre-order** — validate product chain (MIN rule), block if any layer is FREE
2. **Post-order** — seller STL recalc based on rating + complaints
3. **Over rolling window** — activity score feeds DMO

## 9. Review & Rating System (CONFIRMED)

**STL-based Review Windows (CONFIRMED — LOCKED):**

| Seller STL Level | Review Window | Rationale |
|---|---|---|
| L1–L3 (FREE–NORMAL) | 30 days | Low trust = longer validation |
| L4–L6 (STANDARD–HIGH) | 14 days | Medium trust |
| L7–L8 (PRO–VIP) | 7 days | High trust = fast resolution |
| L9–L10 (ELITE–SUPREME) | 3 days | Top trust = fastest |

**Rating segmentation by rater STL tier:**
- VIP/ELITE ratings carry more weight than FREE/BASIC ratings
- Weighted formula: `(vipRating × 3 + eliteRating × 2 + normalRating × 1) / (vipCount × 3 + eliteCount × 2 + normalCount × 1)`
- Protects against rating manipulation by low-STL troll accounts

## 10. Confirmed Rules (v2.0)

| Rule | Value | Source |
|---|---|---|
| Commission model | 85% Seller / 10% Franchise / 5% Platform | Founder confirmed 2026-04-19 |
| Buyer order limit | Unlimited | Founder confirmed 2026-04-19 |
| Self-delivery | Seller choice (self or DMO rider) | Founder confirmed 2026-04-19 |
| COD | Rider Trusty Wallet required | Founder confirmed 2026-04-19 |
| Refund | Full clawback from all wallets | Founder confirmed 2026-04-19 |
| Currency | USD only (EHBGC for coin locks only) | Founder confirmed 2026-04-19 |
| Escrow | Instant (no hold period) | Founder confirmed 2026-04-19 |
| Cross-country | 50/50 split between buyer & seller franchise chains | Founder confirmed 2026-04-19 |

## 11. Confirmed Rules (Additional — v2.1)

| Rule | Value | Source |
|---|---|---|
| Return: Wrong/Damaged | Seller pays return shipping | Founder confirmed 2026-04-19 |
| Return: Change of mind | Buyer pays return shipping | Founder confirmed 2026-04-19 |
| Return: Fraud case | Seller pays + penalty applied | Founder confirmed 2026-04-19 |
| Multi-seller cart | Allowed with AI-powered grouping optimization (see §12) | Founder confirmed 2026-04-19 |
| Rider assignment | STL-weighted + proximity + availability. Priority: 1.Nearby 2.High STL 3.Available 4.Round-robin fallback | Founder confirmed 2026-04-19 |
| First 3 MVP pages | 1.Homepage (AI Marketplace) 2.Product Listing 3.Product Detail | Founder confirmed 2026-04-19 |
| Service orders | Same 85/10/5 base split, affiliate commission is category-based | Founder confirmed 2026-04-19 |

## 12. AI Cart Grouping Engine (CONFIRMED — LOCKED)

Multi-seller cart is allowed with AI-powered optimization for delivery cost and speed.

### 12.1 Step-by-Step Flow

```
User adds multiple products
  ↓
System detects different sellers
  ↓
AI grouping engine runs
  ↓
Orders grouped by priority:
  1. Same seller (highest priority)
  2. Same location / nearby sellers
  3. High STL sellers
  4. Lowest delivery cost
  ↓
System suggests best grouping option
  ↓
User confirms OR manually overrides
  ↓
Orders auto-split and created
```

### 12.2 AI Decision Logic

System checks 4 factors for optimal grouping:

| Factor | Priority | Logic |
|---|---|---|
| Same seller products | 1 (highest) | Group all items from same seller |
| Distance (nearby sellers) | 2 | Merge orders from nearby sellers |
| STL level | 3 | Prefer high-trust sellers |
| Delivery cost | 4 (final) | Minimize total delivery fees |

### 12.3 Example

User cart: Item A (Seller 1), Item B (Seller 1), Item C (Seller 2), Item D (Seller 3)

**AI Result:**
- Order 1 → Seller 1 (A + B) — same seller grouped
- Order 2 → Seller 2 + 3 (if nearby) — location merged

### 12.4 Critical Rule

❌ NEVER: 5 different sellers = 5 separate deliveries (if avoidable)
✅ ALWAYS: Group where possible to reduce trips

### 12.5 User Experience

- **Option A (AI Recommended):** Fast delivery, low cost, grouped orders
- **Option B (Manual):** User selects grouping manually

### 12.6 Delivery Cost Impact

| Scenario | Cost |
|---|---|
| Same seller → 1 delivery fee | Lowest |
| Nearby sellers → merged delivery | Low |
| Far sellers → separate delivery | Standard per order |

### 12.7 Future Advanced Features

- Smart warehouse routing
- Franchise-area grouping
- Bulk order optimization

## 13. Open questions

(None at this time — all phase-1 MVP specs confirmed)

## Changelog

| Date       | Ver | Change |
|------------|-----|--------|
| 2026-04-11 | 1.0 | Created; merged Batch-2 basic flow with Batch-1 full 10-step + UI spec |
| 2026-04-19 | 2.0 | Added STL-based review system, rating segmentation, confirmed rules (85/10/5 commission, unlimited buyer, self-delivery, COD rider wallet, full clawback, instant escrow, 50/50 cross-country) |
| 2026-04-19 | 2.1 | Review windows LOCKED (30/14/7/3 days by STL). Return policy, multi-seller cart, rider assignment, MVP pages, service commission all confirmed. |
| 2026-04-19 | 2.2 | AI Cart Grouping Engine added (LOCKED). Revenue split updated to confirmed 85/10/5 model. All open questions resolved for Phase-1 MVP. |
