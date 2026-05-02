# EHB · Order Flow

> **Status:** Canonical v1.0 · 2026-04-30

## State machine

```
DRAFT → SUBMITTED → PAYMENT_HELD → ACCEPTED → IN_PROGRESS
   ↓                                                ↓
CANCELLED                                       FULFILLED
                                                    ↓
                                                REVIEWED
                                                    ↓
                                                SETTLED
                                                    ↓
                                                ANCHORED (on-chain)
```

Alternate paths:
- DISPUTE_OPEN → DISPUTE_RESOLVED → SETTLED / REFUNDED
- REFUND_REQUESTED → REFUND_APPROVED → REFUNDED

## States detail

| State | Definition | Trigger | Auto-action |
|---|---|---|---|
| DRAFT | Buyer building cart | Add to cart | None |
| SUBMITTED | Buyer placed order | Click checkout | Validate stock, STL, lock |
| PAYMENT_HELD | Money in escrow | Payment confirmed | Notify seller |
| ACCEPTED | Seller accepted | Seller click accept (or auto if FAST mode) | Start fulfillment timer |
| IN_PROGRESS | Work happening | Acceptance | Track milestones |
| FULFILLED | Seller delivered | Seller marks done · buyer confirms OR auto after N days | Open review window |
| REVIEWED | Buyer left review | Review submitted (or auto-skip after 7 days) | Apply weighted rating |
| SETTLED | Funds released | Cooling period (7-30d) ends, no dispute | Pay seller, rider, franchise, EHB |
| ANCHORED | On-chain hash | Settlement complete | Polkadot batch |
| CANCELLED | Order cancelled | Buyer cancels (within window) OR seller declines | Refund buyer |
| DISPUTE_OPEN | Complaint filed | Buyer/seller dispute | DMO triage |

## Revenue split (locked per `EHB-MASTER-INFO.md §4.4`)

```
Order revenue = 100%
   ├─ Seller     70%
   ├─ Rider      10% (if delivery applies, else 0)
   ├─ Franchise  10%  (split 40/25/20/15: Sub / Master / Corporate / Country)
   └─ EHB        10%  (platform commission)
```

If no rider: rider's 10% redistributes to Seller (boosting to 80%).

## Timing rules

| Step | SLA |
|---|---|
| Seller accept | <24h (or auto-decline) |
| Fulfillment | Per-listing-quoted time (default 7 days) |
| Buyer review | 7 days after fulfillment (auto-skip after) |
| Cooling period | 7d (low-value, FAST mode) → 30d (high-value, CRITICAL) |
| Dispute window | 30d after fulfillment |
| Refund response | 48h |

## Per-mode timing

| DMO Mode | Acceptance auto? | Cooling period |
|---|:---:|---|
| FAST | Yes (if seller STL ≥ L5) | 7 days |
| BALANCED | Manual seller accept | 14 days |
| STRICT | Manual + senior approval | 30 days |
| CRITICAL | Manual + senior + DMO Council | 30 days + extra hold |

## Events emitted

For DMO + AI consumption:

- `order.submitted` { orderId, buyerId, sellerId, value, industry }
- `order.payment.held` { orderId, amount, currency }
- `order.accepted` { orderId, sellerId, eta }
- `order.fulfilled` { orderId }
- `order.reviewed` { orderId, rating, reviewerSTL }
- `order.settled` { orderId, distribution: {seller, rider, franchise, ehb} }
- `order.anchored` { orderId, txHash }
- `order.cancelled` { orderId, reason }
- `order.disputed` { orderId, by: 'buyer'|'seller', reason }

## STL impact

| Outcome | STL effect |
|---|---|
| Order completed (5-star) | +0.2 to seller STL |
| Order completed (rating ≥4) | +0.1 |
| Order with complaint upheld | -1.0 |
| Late delivery (>3 in window) | -1.0 |
| Refund without seller fault | 0 |
| Refund with seller fault | -0.5 |

## Open questions

- Multi-currency settlement timing (when EHBGC vs USD vs PKR)
- Cross-border orders — which jurisdiction governs disputes?
- Partial fulfillment handling

## Cross-references

- Payment: `PAYMENT-FLOW.md`
- Escrow: `ESCROW-FLOW.md`
- Dispute: `DISPUTE-FLOW.md`
- Refund: `REFUND-FLOW.md`
- DMO modes: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial order flow with state machine + 70/10/10/10 split |
