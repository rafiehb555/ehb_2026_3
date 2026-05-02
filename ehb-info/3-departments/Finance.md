# Finance — EHB Financial System

**Status:** Canonical spec (v1.0) · Merged from `uploads/ehb_finance.md` (Batch-2, 2026-04-11)
**Related:** `Wallet.md` · `GoSellr.md §7` · `Franchise.md §5`

---

## 1. Purpose

EHB Finance is the **money-handling layer**. It sits above the wallet and below the DMO: the wallet *holds* money, finance *moves and accounts for* money, and DMO *approves* that movement. It is responsible for payments, fees, payouts, and financial fraud controls.

## 2. Components

1. **Wallet** — the Trusty Wallet (see `Wallet.md`)
2. **Earnings system** — ledger that tracks pending → approved → paid
3. **Payments** — customer → platform (order checkout), platform → seller/rider/franchise (payouts)
4. **Fees** — platform commission, lock fees, withdrawal fees

## 3. Revenue sources

- Transaction fees (per order, per transfer)
- Franchise fees (territory license, renewal)
- Verification fees (CRB physical + exam)
- Marketplace commissions (the 10% platform slice of every GoSellr order)

## 4. Earning distribution

Every successful order distributes to four parties (see `GoSellr.md §7` for numbers):

1. Seller income
2. Rider income
3. Franchise share
4. Platform fee

All four flows are **logged, auditable, and blockchain-anchored** (Phase-2+).

## 5. Financial control (DMO)

- **Validate earnings** — no payout is released without DMO approval (`POST /api/dmo/approve-earning`)
- **Apply penalties** — complaints, fraud flags, missed refills all hit the earning ledger
- **Detect fraud** — Up-Guard signals (abnormal transfer, round-trip loop, velocity spike) halt payouts

## 6. Goal

A controlled and transparent financial ecosystem where every EHBGC can be traced from source to destination.

## 7. Revenue Streams (CONFIRMED — 5 Separate Streams)

All revenue streams are kept separate, no mixing, all admin controllable.

### Stream 1: Order Commission (85/10/5)
- **Source:** Every completed order
- **Split:** Seller 85% (dynamic 80-90%) / Franchise 10% / Platform 5%
- **Volume:** Recurring, scales with orders
- **See:** `Commission.md` for full spec

### Stream 2: Affiliate Commission
- **Source:** Product sales through affiliate links
- **Rates:** Category-based (Electronics 3-5%, Fashion 10-15%, Beauty 15-25%, etc.)
- **Volume:** Variable, depends on affiliate activity
- **See:** `Affiliate.md` for full spec

### Stream 3: Franchise Sales
- **Source:** New franchise purchases (USD entry + EHBGC hold)
- **Distribution:** 30% to affiliate network (L1: 5%, L2: 3%, L3: 2%)
- **Volume:** One-time per franchise, recurring with growth
- **See:** `Franchise.md` for pricing tiers

### Stream 4: DMO Subscription
- **Source:** Monthly fees from users + country franchises
- **User SaaS:** PKR 500-5000/month based on STL level
- **Country fee:** $1,000 base + 1% monthly order volume
- **Volume:** Recurring monthly
- **See:** `DMO.md §31` for billing system

### Stream 5: Token Fees
- **Source:** EHBGX ↔ EHBGC conversions + staking
- **Conversion:** 5% (EHBGX→EHBGC), 2% (EHBGC→EHBGX)
- **Staking:** Platform keeps spread between payout APY and actual yield
- **Volume:** Variable, grows with token adoption
- **See:** `Token.md` for full spec

### Additional Revenue Sources

| Source | Type | Frequency |
|---|---|---|
| PSS Verification fees | $5-$100 per verification | Per user |
| CRB Inspection fees | $20-$500 per inspection | Per seller/company |
| Certificate renewals | 50% of original fee | Semi-annual/annual |
| Rider insurance deduction | 5-10 PKR per delivery | Per delivery |
| Penalties/fines | Variable | Event-based |

## 8. Financial Rules (LOCKED)

| Rule | Value |
|---|---|
| Commission currency | USD (EHBGC for locks only) |
| Escrow hold | Instant (no hold period) |
| Refund model | Full clawback from all wallets |
| Min withdrawal | 1,000 PKR |
| Max daily withdrawal | $10,000 |
| Commission hold | 24 hours (from Wallet.md legacy) |
| Cross-country split | 50/50 between buyer & seller franchise chains |
| Rate changes | Apply to NEW orders only (never retroactive) |

## 9. Open questions for next batch

1. **Fiat on-ramp / off-ramp providers** per launch country
2. **Tax handling** — who collects VAT/GST/sales tax per country?
3. **Payout cadence** — instant, daily, weekly?
4. **Minimum payout threshold** before earnings can be withdrawn

## Changelog

| Date       | Ver | Change |
|------------|-----|--------|
| 2026-04-19 | 2.0 | Major update: 5 revenue streams documented (Order Commission, Affiliate, Franchise Sales, DMO Subscription, Token Fees). Additional sources added. Financial rules locked. Dual token system integrated. |
| 2026-04-11 | 1.0 | Created from Batch-2 `uploads/ehb_finance.md` |
