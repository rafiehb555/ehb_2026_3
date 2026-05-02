# EHB · Lock Logic (canonical)

> **Status:** Canonical v1.0 · 2026-04-30
> **Source:** All 10 locked decisions in `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1`

## Master rule

> **Lock = Responsibility (entity), NOT Identity (PSS).**
> Identity / Buyer / Job-Seeker / Admin = NO lock.
> Service / Shop / Rider / Inspector / Franchise / Production-Co / Employer = YES lock.

## Two distinct lock types (DO NOT confuse)

| Type | Purpose | Owner | Released when |
|---|---|---|---|
| **Entity Lock** | Long-term commitment per STL level | Earning entity | Manual close + 30-day cooling |
| **Per-Engagement Escrow** | Per-order buyer payment protection | Buyer's payment | Cooling ends or dispute resolves |

This file covers Entity Lock. For Escrow see `4-flows/ESCROW-FLOW.md`.

## Lock formula (HYBRID model — locked Q1)

```
Final Lock = Base STL Lock × Industry Multiplier
```

## Base lock per STL level

| Level | Base EHBGC | USD-eq (~$0.10) |
|---|---:|---:|
| L1 FREE | 0 | $0 |
| L2 BASIC | 20 | $2 |
| L3 NORMAL | 40 | $4 |
| L4 STANDARD | 100 | $10 |
| L5 ADVANCED | 200 | $20 |
| L6 HIGH | 400 | $40 |
| L7 PRO | 800 | $80 |
| L8 VIP | 2,000 | $200 |
| L9 ELITE | 4,000 | $400 |
| L10 SUPREME | 10,000+ | $1,000+ |

## Industry multiplier (locked Q16)

See `4-flows/INDUSTRY-STL-MULTIPLIER.md` for all 38 industries.

## Per-entity lock matrix (locked Q1, Q14, Q15)

| Entity | Lock tier | Base lock |
|---|---|---|
| Personal (PSS) | NONE | 0 |
| Buyer profile | NONE | 0 |
| JPS / Skill profile | NONE baseline | 0 (escrow per paid project only) |
| Job Seeker | NONE | 0 |
| Admin (DMO) | NONE (employed) | 0 |
| Service Provider | STANDARD | per STL ladder × industry mult |
| Seller / Shop | STANDARD | per STL ladder × industry mult |
| Rider | SMALL | 50 EHBGC base · scales L2-L8 |
| Inspector | MEDIUM | 200-800 (per tenure) |
| Employer | MEDIUM | 500 EHBGC per active job posting |
| Franchisee | LARGE | $5K (Sub L1) – $50K (Sub L10) |
| Production Company | LARGE | $10K – $100K (multi-product impact) |

## Lock examples

### Example 1: Service Provider L7 in Healthcare

```
Base L7 = 800 EHBGC
Healthcare multiplier = 2.0×
Final = 800 × 2.0 = 1,600 EHBGC (~$160)
```

### Example 2: Seller L5 in GoSellr (electronics)

```
Base L5 = 200 EHBGC
GSM multiplier = 1.3×
Final = 200 × 1.3 = 260 EHBGC (~$26)
```

### Example 3: Franchise Sub L8

```
Per Franchise.md ladder = $30K (not via STL formula, fixed tier)
Industry multiplier doesn't apply to franchise (already large)
```

## Pooling (locked Q7)

Multi-entity user can pool locks:
- Risk shared in pool
- Only faulty entity slashed (per Q6)
- Pool admin can rebalance
- Pool exit: 30-day notice

## Lock release (locked Q5)

```
Entity close request
   ↓
30-day cooling period (anti-fraud)
   ↓
If no complaints: release lock to wallet
If complaints open: hold until resolved
```

## Premature unlock (unified Q12)

```
Days < 15 (grace): no penalty
Days ≥ 15:
   → 15% slash on unlocked amount
   → 2-level STL downgrade
   → Repeat unlocks: escalating penalty
```

## Insurance alternative (Q8)

Instead of lock, can pay insurance premium:
- 5% of would-be-lock amount per year
- Same protection
- Better for low-capital high-skill providers

See `Insurance.md` (TODO).

## Volatility handling (Q5)

- EHBGC value drops → required EHBGC count goes up (USD-pegged)
- EHBGC value rises → required EHBGC count goes down
- Existing locks: grandfathered (no retroactive)

## Cross-references

- Locked decisions: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §14-§16`
- Industry multipliers: `4-flows/INDUSTRY-STL-MULTIPLIER.md`
- Slashing: `SLASHING-RULES.md`
- Yield: `REWARD-YIELD.md`
- Wallet: `3-departments/Wallet.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial lock logic from 10 locked decisions |
