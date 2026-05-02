# EHB · Reward & Yield

> **Status:** Canonical v1.0 · 2026-04-30
> **Locked decision:** Q13 in `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1`

## Yield rules

> **4–6% APY on locked EHBGC. Hard cap 6%. Variable rate. ALL sources allowed.**

## Yield sources (hybrid per Q13)

| Source | Contribution | Sustainability |
|---|---|---|
| Platform fees | High (volume-driven) | Self-funding when GMV high |
| Treasury reserves | Medium (capital cushion) | Limited duration |
| Minor inflation | Low (controlled mint) | Last-resort, cap 1%/year |
| Slashed lock redirect | Bonus (anti-fraud cycle) | Reinforces honest users |

## Yield rate schedule (proposed)

| User STL | Rate | Reasoning |
|---|:---:|---|
| L1-L3 | 4.0% | Entry tier |
| L4-L6 | 4.5% | Standard |
| L7-L8 | 5.0% | Trusted |
| L9-L10 | 6.0% | Elite reward |

Ladder incentivizes upgrading STL.

## Yield distribution

- **Streamed daily** (continuous compounding)
- Paid in EHBGC by default
- Option to auto-convert to fiat
- Yield earned during entity-active period
- Paused during dispute / under-review

## Yield calculation

```
Daily yield = locked_EHBGC × (rate / 365)
Annual = locked_EHBGC × rate
```

Example: 1,000 EHBGC at 5% APY = 50 EHBGC/year = ~0.137 EHBGC/day.

## Yield cap (6% hard limit)

> **No matter what, total yield issued NEVER exceeds 6% of locked aggregate.**

If platform success → fee inflows allow > 6% theoretically — surplus goes to:
1. Treasury reserves (priority)
2. Burn fund (deflationary support)
3. Ecosystem grants

## Burn-vs-Lock yield difference

| Action | Yield | Trade-off |
|---|---|---|
| Lock | 4-6% APY | Recoverable, growing balance |
| Burn | 0% APY | Permanent +1 STL boost · faster status climb |

Choice depends on user goal:
- Long-term commitment + passive income → Lock
- Status climbing + permanent prestige → Burn

## During slashing

- Slashed amount: yield stops on that portion immediately
- Surviving lock continues yield
- 30-day appeal window: yield paused on disputed amount

## Reward beyond yield

Other rewards in the EHB ecosystem:

| Reward | Source | Trigger |
|---|---|---|
| Order completion bonus | DMO | 5-star review + on-time delivery |
| Streak bonus | DMO | 90 days clean = +1 STL |
| Top-rated AI session | AI Marketplace | 5-star buyer rating |
| Referral commission | Affiliate | Friend signup + first transaction |
| Industry-first listing | Marketing | First seller in new category |
| Vouching reward | Franchise | Vouching transfer = small EHBGC bonus |

## Yield + tax

- Tax handling varies per country
- EHB issues 1099-equivalent (US) / withholding certificates (PK) where required
- User responsible for personal tax filing
- Yield income classified as "rewards" not "interest" (utility, not financial product)

## Sustainability check (open question per Q13)

At platform scale, can EHB pay 4-6% APY without printing?

**Math:**
- If $100M total locked at 5% avg = $5M/year yield burden
- If platform GMV is $200M at 10% fees = $20M revenue
- 25% of revenue → yield = sustainable

This holds IF:
- GMV grows faster than locks
- Platform fees stay healthy (not undercut by competitors)
- Treasury reserves maintained for buffer years

If math fails: rate can drop (variable) or yield can pause.

## Cross-references

- Lock: `LOCK-LOGIC.md`
- Tokenomics: `TOKENOMICS.md`
- Treasury: `TREASURY-SYSTEM.md`
- Locked decisions: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1 #8 #13`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial yield system from locked Q13 |
