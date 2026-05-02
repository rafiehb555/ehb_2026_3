# EHB · Franchise Earnings Model

> **Status:** Canonical v1.0 · 2026-04-30

## Revenue split (locked per `EHB-MASTER-INFO.md §4.4`)

```
Order revenue 100%
   ├─ Seller        70%
   ├─ Rider         10%
   ├─ Franchise     10% (split below)
   └─ EHB           10%

Franchise 10% split (5-tier flow per founder lock v2.0):

Customer Payment
   ↓
Escrow (Wallet)
   ↓
Bottom-up split:
   Micro (executor, biggest share if direct task) →
   Sub (territory commission) →
   Corporate (segment commission) →
   Master (regional commission) →
   Country (national commission) →
   EHB HQ (platform) →
```

Approximate per-tier commission share:

| Tier | Share of franchise 10% |
|---|---|
| Micro (if direct delivery) | varies — keeps work-portion of seller 70% |
| Sub | 40% |
| Corporate | 15% |
| Master | 25% |
| Country | 15% |
| EHB HQ | 5% (oversight) |

## Per-order earnings example

Order value $100:
- Seller: $70
- Rider: $10
- Franchise: $10 → Sub $4 / Master $2.50 / Corporate $2 / Country $1.50
- EHB: $10

## Multiple revenue streams

Beyond order commission:

| Stream | Source | Frequency |
|---|---|---|
| **Order commission** | 10% split | Per-order |
| **Verification fees** | Per PSS L7+ verification | Per-action |
| **CRB exam admin fees** | Per-exam administered | Per-event |
| **Refill audit fees** | Per refill cycle audited | Quarterly |
| **Industry-specific premiums** | Healthcare/Legal/Finance higher | Per-tier |
| **Penalty share** | % of slashed amount in territory | Per-incident |
| **Subscription tiers** | If franchise sells premium memberships | Monthly |
| **Lock yield** | 4-6% APY on locked capital | Daily |

## Tier-based monthly earnings (estimates)

| Tier | Low (slow market) | Medium | High (active market) |
|---|---:|---:|---:|
| Sub L1 | $200 | $500 | $1,500 |
| Sub L5 | $1,000 | $3,000 | $8,000 |
| Sub L10 | $5,000 | $15,000 | $40,000 |
| Master | $20,000 | $80,000 | $200,000 |
| Corporate | $100K | $500K | $2M |
| Country | $500K | $5M | $20M |

These are illustrative — actual depends on territory size, industry mix, time invested.

## Penalty share

When DMO slashes a user/seller in your territory:
- Slashed EHBGC distributed:
  - 60% → EHB Treasury (anti-fraud reserves)
  - 25% → Your franchise (incentive to flag fraud)
  - 15% → Master franchise above you

This rewards franchises for actively detecting fraud (skin-in-game).

## Yield on capital lock

Your locked franchise capital ($5K-$50M) earns 4-6% APY:
- Streamed daily in EHBGC
- Higher tier = higher rate
- Sub L1: 4% · Master: 5% · Country: 6%

## Settlement timing

- Daily: yield distributed
- Weekly: order commissions settled
- Monthly: full reconciliation + variable payouts
- Quarterly: bonus calculations

## Cost structure

To run a franchise:

| Cost | Approx |
|---|---|
| Office rent | $200-2000/mo (varies by tier) |
| Inspector salaries | $300-1000/inspector/mo |
| Tech infrastructure | $50-200/mo |
| Marketing | 10-20% of revenue |
| Compliance | $100-500/mo |
| Insurance | $100-500/mo |

Net margin: typically 30-50% of gross franchise revenue.

## Cross-references

- Onboarding: `FRANCHISE-ONBOARDING.md`
- Roles: `FRANCHISE-ROLES.md`
- Penalty: `FRANCHISE-PENALTY.md`
- Commission spec: `3-departments/Commission.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial earnings model |
