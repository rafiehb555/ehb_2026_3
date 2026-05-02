# EHB · Payment Flow

> **Status:** Canonical v1.0 · 2026-04-30
> **Built on:** Wallet adapter pattern + multi-currency

## Payment states

```
INITIATED → AUTHORIZED → CAPTURED → ESCROWED → SPLIT → DISTRIBUTED → ANCHORED
                ↓                                                       ↓
            DECLINED                                                 SETTLED
```

## Step-by-step

### 1. INITIATED (buyer clicks pay)
- Order ID + amount + currency
- Buyer's payment method selected (wallet, card, EHBGC, bank transfer)

### 2. AUTHORIZED (payment provider check)
- Card auth · OR · wallet balance check · OR · crypto signature
- Per-region adapter (`services/api/src/adapters/payment/`)

### 3. CAPTURED (money taken from buyer)
- Funds held by payment provider · NOT yet to seller

### 4. ESCROWED (held by EHB, see `ESCROW-FLOW.md`)
- Buyer money in EHB escrow account
- Seller can see "payment held" but not access yet

### 5. SPLIT (computed, not paid yet)
- Per `ORDER-FLOW.md` revenue split:
  - Seller 70% · Rider 10% · Franchise 10% · EHB 10%
- Recorded as transactions, status PENDING

### 6. DISTRIBUTED (after cooling period)
- Settled to each party's wallet
- See `ORDER-FLOW.md` cooling rules

### 7. ANCHORED (Polkadot)
- Daily batch hashed + posted on-chain
- Audit trail for regulator + dispute

## Multi-currency support (Phase 1: 50+ countries)

| Currency | Adapter | Notes |
|---|---|---|
| USD | Stripe / PayPal | Global default |
| PKR | JazzCash · Easypaisa · NayaPay | Pakistan |
| AED | Stripe-AE · Mashreq · Telr | UAE |
| SAR | Stripe-SA · STC Pay | Saudi |
| INR | Razorpay · UPI | India |
| GBP | Stripe-UK · GoCardless | UK |
| EUR | Stripe-EU · Mollie | EU SEPA |
| EHBGC | Native blockchain | Internal token |

Adapter pattern allows swap-in of any new gateway per region.

## EHBGC payments

When buyer pays in EHBGC:
- Direct token transfer to escrow contract
- USD-equivalent locked at moment of capture (volatility hedge)
- Settle to seller in EHBGC (default) or auto-convert to fiat (option)

## Failure handling

| Failure | Auto-action |
|---|---|
| Card declined | Retry with backup method · notify buyer |
| Insufficient wallet | Top-up flow · pause order |
| Crypto reorg | Wait 6 confirmations before commit |
| Adapter timeout | Failover to backup adapter |
| Suspected fraud | Hold + DMO review |

## Fee structure

| Fee type | Charged to | Rate |
|---|---|---|
| Platform commission | Buyer (built into price) | 10% (split among rider/franchise/EHB) |
| Payment processing | Seller (deducted from settlement) | 1-3% per gateway |
| Currency conversion | Seller | Mid-market + 0.5% |
| EHBGC settlement | None | 0% (internal) |
| Refund processing | Refunder party | $1 fixed |

## Open questions

- EHBGC ↔ fiat liquidity (where do we top up reserves?)
- Tax handling per country (VAT/GST)
- Fee discount for high-STL sellers (yes/no?)
- Subscription billing infrastructure (Phase-2)

## Cross-references

- Wallet: `3-departments/Wallet.md`
- Token: `3-departments/Token.md`
- Order flow: `ORDER-FLOW.md`
- Escrow: `ESCROW-FLOW.md`
- Adapters: `5-specs/ADAPTER-SPECS.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial payment flow + multi-currency mapping |
