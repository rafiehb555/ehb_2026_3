# EHB · Franchise Config (limits, territories, multipliers)

> **Status:** Canonical v1.0 · 2026-04-30

## Tier limits

| Tier | Max territories | Max sub-tier subordinates | Max EHBGC lock per |
|---|:---:|:---:|---:|
| Micro | 1 (individual) | 0 | 100 EHBGC |
| Sub L1-L10 | 1 zone | unlimited Micros | 5K-50K EHBGC |
| Corporate | 1 company | unlimited Subs | $50K-$1M |
| Master | 1 metro | 50 Subs avg · 5 Corporates | $100K-$500K |
| Country | 1 country | unlimited Masters | $5M-$50M |

## Territory limits

- **Sub:** 1-10 sq km (Sub L1-L10 ladder)
- **Corporate:** unlimited within metro
- **Master:** full metro / 1-5M population
- **Country:** entire country
- **Backup partners:** max 2 per Country

## Industry caps

- Single-industry franchise: 1 industry only (locked)
- Multi-industry curated: up to 5 industries (premium tier)
- All-industry default: full 38 (standard for most franchises)

## Revenue multipliers

| Tier | Order commission share | Verification fee % | Penalty share % |
|---|:---:|:---:|:---:|
| Sub | 40% (of franchise 10%) | 60% | 25% |
| Corporate | 15% | 20% (specialty) | 0% |
| Master | 25% | 25% | 15% |
| Country | 15% | 10% | 0% |
| EHB HQ | 5% | 5% | 60% (anti-fraud) |

## Industry STL multiplier (per franchise)

Per `4-flows/INDUSTRY-STL-MULTIPLIER.md`:
- Healthcare/Legal/Finance: 2.0× (premium)
- Construction/Security/Real Estate: 1.5×
- IT/Electronics/GSM: 1.3×
- Most others: 1.0×-1.2×

## Capital requirements (locked)

| Tier | Min | Typical | Max |
|---|---:|---:|---:|
| Micro | 20 EHBGC ($2) | 100 EHBGC | — |
| Sub L1 | $5K | $5K-$10K | — |
| Sub L10 | $50K | $50K | — |
| Corporate | $50K | $200K | $1M |
| Master | $100K | $250K | $500K |
| Country (small) | $5M | $10M | $15M (Phase-1) |
| Country (medium) | $10M | $20M | $30M (Phase-2) |
| Country (large) | $30M | $40M | $50M (Phase-3 USA/CN/IN) |

## Tier promotion thresholds

| Promotion | Required |
|---|---|
| Micro → Sub L1 | $5K capital + 6 months active + STL L4+ + 90 days clean |
| Sub L1 → L5 | $25K cumulative + STL L6+ + Master endorsement |
| Sub L10 → Corporate | $50K + STL L8 + business registration |
| Sub L10 → Master | $100K + STL L8 + DMO Council interview |
| Master → Country | $5M+ + STL L9 + Founder approval |

## Cross-references

- Model: `EHB-FRANCHISE-MODEL.md`
- Earnings: `FRANCHISE-EARNINGS.md`
- Requirements: `FRANCHISE-REQUIREMENTS.md`
- STL: `FRANCHISE-STL.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial config + limits |
