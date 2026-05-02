# EHB · Escrow Flow

> **Status:** Canonical v1.0 · 2026-04-30
> **Locked decision:** 100% project value escrow (per Q5 in `EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1`)

## Master rule

> **Buyer pays 100% of project value upfront → held in EHB escrow → released to seller after cooling period IF no dispute.**

This is the **trust mechanism** that protects buyers (don't pay seller until satisfied) AND sellers (money is locked, can't disappear).

## States

```
HELD (escrow active)
   ↓
   ├─ Auto-release (cooling period ends, no dispute) → RELEASED
   ├─ Dispute opened → DISPUTED → resolution → RELEASED or REFUNDED
   ├─ Buyer approves explicitly → RELEASED (faster, before cooling ends)
   └─ Refund approved → REFUNDED
```

## Timing

| Trigger | Action |
|---|---|
| Order paid | Money in escrow immediately |
| Buyer "Approve & Release" click | Manual release (overrides cooling) |
| Cooling period ends (no dispute) | Auto-release |
| Dispute filed | Hold until resolved |
| Dispute resolved seller-favor | Release |
| Dispute resolved buyer-favor | Refund |

## Cooling periods (per DMO mode)

| DMO Mode | Cooling | Reason |
|---|:---:|---|
| FAST | 7 days | Low-value, low-risk goods |
| BALANCED | 14 days | Standard |
| STRICT | 30 days | High-value or regulated |
| CRITICAL | 30 days + senior approval | Financial / Healthcare / Legal |

## Multi-party split (at release)

```
Total escrow = $1000
   ↓
Split per ORDER-FLOW.md:
   ├─ Seller = $700 (or $800 if no rider)
   ├─ Rider = $100
   ├─ Franchise = $100 (split: Sub $40 / Master $25 / Corp $20 / Country $15)
   └─ EHB = $100
```

## Currency handling

| Buyer pays in | Held as | Settlement |
|---|---|---|
| USD | USD | USD or local currency to seller |
| EHBGC | EHBGC | EHBGC (default) or auto-convert |
| Local fiat | Local fiat | Same currency to seller (or convert) |

## Escrow vs Entity Lock (different things!)

| | Entity Lock | Escrow |
|---|---|---|
| What | Long-term EHBGC commitment | Per-order buyer payment |
| Owner | Seller / Service entity | Buyer's payment |
| Released when | Entity closes (+30d cool) | Cooling ends or dispute resolves |
| Purpose | Skin-in-game | Buyer protection |
| Slashable | Yes (per slashing rules) | Returned on dispute (not slashed) |

Per locked Q10 — these are officially separate.

## Special cases

### High-value orders ($10K+)

- Mandatory 30-day cooling regardless of mode
- DMO Senior approval required for release
- Inspector field-verification optional

### Subscription / recurring

- Escrow per billing period
- Auto-renewal needs explicit re-authorization quarterly

### Multi-installment

- Escrow per milestone
- Each milestone has own cooling
- Dispute on one doesn't freeze others

### Crypto orders

- Buy in EHBGC → held in smart-contract escrow
- Rate locked at moment of capture
- Settle in EHBGC by default

## Open questions

- Insurance for escrow funds (in case EHB itself fails — bankruptcy protection)
- Multi-currency escrow risk (volatility hedge)
- Cross-border tax handling on escrow

## Cross-references

- Order: `ORDER-FLOW.md`
- Payment: `PAYMENT-FLOW.md`
- Dispute: `DISPUTE-FLOW.md`
- Refund: `REFUND-FLOW.md`
- Lock vs escrow split: `EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1 #10`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial escrow flow with 100% rule + cooling periods |
