# Refund Policy — EHB Platform

> **Scope:** All orders across 38 industries
> **Authority:** DMO Council + per-country consumer law
> **Last reviewed:** 2026-04-30

## Default Cooling-Off Periods

| Industry Class | Period | Refund Type |
|----------------|--------|-------------|
| Physical goods (GSM, AGTS) | 7 days | Full unless used |
| Digital goods (EHB_TUBE, EHB_MUSIC) | 24 hours | Full if not consumed |
| Services (WMS, OLS, FIN) | Pre-delivery only | Full before fulfilment starts |
| Subscriptions | 14 days from start | Pro-rated |
| Custom services | Per-contract | Per terms |

## Refund Triggers

| Reason | Refund % | Authority |
|--------|----------|-----------|
| Seller no-show | 100% | Auto |
| Quality failure (verified) | 100% | DMO |
| Late delivery > SLA | 25-100% | Auto-graded |
| Buyer remorse (within cooling) | 100% | Auto |
| Buyer remorse (after cooling) | 0% | N/A |
| Fraud / scam (verified) | 100% + slash seller | DMO |
| Force majeure | 100% | DMO |

## Refund Flow (Auto)

1. Buyer files refund request
2. System checks cooling-off window
3. If within → auto-approve + escrow release to buyer
4. If outside → DMO mediation queue (T2 complaint)
5. Outcome → refund or denial + STL adjustment
6. Refund processed via original payment method
7. Event anchored to chain

## Country Overrides
Where local law mandates longer cooling-off, that wins:
- EU (DE, FR, GB): 14 days for distance contracts
- Saudi Arabia: 7 days mandatory
- UAE: 14 days for online retail
- Australia/UK: statutory rights cannot be waived

## Non-Refundable
- Used digital downloads
- Personalised goods (post-production)
- Time-bound services after delivery
- Gambling/lottery products (where allowed)

## Linked
- `4-flows/REFUND-FLOW.md`
- `5-economy/SLASHING-RULES.md`
- `4-flows/DISPUTE-FLOW.md`
