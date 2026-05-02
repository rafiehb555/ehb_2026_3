# EHB · Refund Flow

> **Status:** Canonical v1.0 · 2026-04-30

## Flow

```
REFUND_REQUESTED (buyer)
   ↓
SELLER NOTIFIED
   ↓
   ├─ Seller approves (within 48h) → REFUND_APPROVED
   ├─ Seller declines → DISPUTE_OPEN (see DISPUTE-FLOW.md)
   └─ No response (after 48h) → AUTO_APPROVED (per BTS)
      ↓
PAYMENT REVERSAL
   ↓
ESCROW RELEASED to buyer
   ↓
ORDER STATUS → REFUNDED
   ↓
SETTLEMENT_REVERSED (seller payout cancelled)
   ↓
ANCHORED
```

## Refund eligibility window

| Reason | Window |
|---|---|
| Item not received | 30 days from order |
| Wrong item | 14 days from receipt |
| Quality issue | 7 days from receipt |
| Buyer's remorse (no fault) | 24h after delivery (only if seller allows) |
| Service not delivered | 7 days from agreed date |

## Approval logic

```
IF seller_approves OR buyer_BTS >= 80 (auto-approve high-trust buyers):
   → APPROVE refund

ELSE IF seller declines AND buyer_BTS < 50:
   → AI Mediator review

ELSE:
   → DMO Investigation
```

## Refund types

| Type | What happens |
|---|---|
| Full refund | 100% to buyer · seller takes loss |
| Partial refund | Specified % · negotiated |
| Replacement | Item swap, no money movement |
| Credit | EHB wallet credit (faster, no fee) |
| Slash + refund | Seller fault confirmed · refund + slash from lock |

## STL impact on refunds

| Outcome | Seller STL | Buyer BTS |
|---|---|---|
| Refund without seller fault | 0 | -0.2 (slight, abuse signal) |
| Refund with seller fault | -0.5 | +0.5 |
| Refund with seller's malice | -2.0 + slash | +1.0 (compensated) |
| Buyer's false refund attempt | +0.5 (seller compensated) | -3.0 |

## Refund payment timing

| Payment method | Refund time |
|---|---|
| EHB wallet | Instant |
| EHBGC | Instant |
| Card | 3-7 business days |
| Bank transfer | 5-10 days |

## Fees

- Refund processing: $1 fixed (deducted from refund amount or charged to fault party)
- Currency conversion (if cross-currency): mid-market + 0.5%

## Open questions

- Partial refund auto-suggestion algorithm
- Refund insurance product (premium for buyers)
- Refund analytics — flag sellers with high refund rate

## Cross-references

- Order: `ORDER-FLOW.md`
- Payment: `PAYMENT-FLOW.md`
- Dispute: `DISPUTE-FLOW.md`
- Reputation: `REPUTATION-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial refund flow |
