# EHB · Reputation System

> **Status:** Canonical v1.0 · 2026-04-30
> **Built on:** STL + DMO + Buyer Trust Score (3 reputation signals)

## 1. Three reputation signals

EHB has THREE reputation scores that work together:

| Score | Owner | Range | Updates on |
|---|---|---|---|
| **STL** (Service Trust Level) | Every user/seller/product/service/franchise | L1–L10 (0–100 score) | PSS + CRB + DMO events |
| **Buyer Trust Score (BTS)** | Buyers only | 0–100 | Order completion, false complaint history |
| **Reviewer Weight** | Anyone leaving a review | 0.3× to 3× | Reviewer's STL at time of review |

## 2. STL reputation (primary)

See `3-departments/STL.md` and `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md`.

Composite: PSS + CRB + DMO + (industry boost) + EHBGC lock modifier
MIN-chain: weakest entity caps the chain
Source caps: PSS=L5, Franchise=L8, CRB=L9, DMO=L10

## 3. Buyer Trust Score (BTS) — separate ladder

Buyers don't have STL (they're not earning entities), but they DO have a trust signal that sellers see:

| BTS | Tier | Effects |
|---|---|---|
| 90–100 | 🌟 Trusted Buyer | Priority shipping · refund auto-approved · less friction on disputes |
| 70–89 | ✅ Reliable | Standard treatment |
| 50–69 | ⚠ Watched | Manual review on big orders |
| <50 | 🚩 High-Risk | Limited transactions · prepay required · sellers warned |

### BTS inputs

| Signal | Effect |
|---|---|
| Order completed without dispute | +0.5 |
| 5-star review of valid receipt | +0.3 |
| Honest complaint upheld in their favor | +1.0 (incentive to file legit) |
| False complaint upheld against them | -3.0 |
| Multiple buyers complaining about same buyer | -5.0 |
| 30+ days inactive | -0.1/day |

## 4. Reviewer Weight

When a buyer leaves a review:

```
weighted_rating = star_rating × reviewer_weight

reviewer_weight =
  3.0  if reviewer.STL >= L8
  2.0  if reviewer.STL == L7
  1.5  if reviewer.STL == L6
  1.0  if reviewer.STL ∈ [L4, L5]
  0.5  if reviewer.STL == L3
  0.3  if reviewer.STL ∈ [L1, L2]
```

This is shown publicly on product cards: "4.6 trust-weighted average · 71 of 84 reviews from L5+ buyers"

## 5. Reputation-as-a-service flow

```
Event happens (order, review, complaint)
   ↓
Event posted to event bus
   ↓
DMO consumes events
   ↓
Reputation engine recalculates:
   - User's STL (if affected)
   - Buyer's BTS (if affected)
   - Reviewer weight applied to any product/seller/service rating
   ↓
On-chain anchor for major changes
   ↓
UI updates real-time
```

## 6. Cross-entity reputation

Per MIN-chain:

```
Owner STL drops L8 → L5 due to fraud
   ↓
All companies he owns: STL capped at L5
   ↓
All sellers under those companies: STL capped at L5
   ↓
All products listed by those sellers: STL capped at L5
   ↓
Customers see this on every product card
```

This is the **anti-fraud cascade** — trust is multiplicative not additive.

## 7. Reputation recovery paths

If user/seller drops in STL or BTS, can recover by:

1. **Time-based decay** — old penalties fade slowly (~3-month rolling window)
2. **Streak bonuses** — 90 days clean record = +1 STL
3. **Re-verification** — re-do PSS / CRB exam with higher tier
4. **Witness vouching** — 3 verified L7+ users vouch (boost +1)
5. **Franchise vouching** — Sub L5+ vouches (boost +1, franchise carries co-risk)
6. **Insurance / lock burn** — burn EHBGC for permanent +1

## 8. Reputation bombing protection

Multiple safeguards against fake review attacks:

- Reviewer weight: low-STL accounts can't tank a high-STL seller
- BTS penalty for false complaints: -3 per upheld false complaint
- AI Anomaly Detector: sudden spike in negative reviews triggers DMO review
- Locked EHBGC required to file high-impact complaints (skin in game)
- Cross-platform IP / device fingerprint detection

## 9. Open questions

- BTS exact formula calibration (founder to refine)
- Time decay rate per reputation type
- Cross-platform reputation export (long-term: SPI/W3C standards)
- Anonymous review allowance (privacy vs accountability tradeoff)

## Cross-references

- STL canonical: `3-departments/STL.md`
- DMO governance: `3-departments/DMO.md`
- Locked decisions: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial reputation system spec — 3 signals, BTS introduced |
