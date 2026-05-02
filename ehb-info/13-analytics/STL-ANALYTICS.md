# STL Analytics — EHB Platform

> **Owner:** DMO Council + Data Team
> **Purpose:** Watch trust score health across the platform.

## Daily Metrics
- Total STL recomputes
- Average STL by country / industry / role
- STL distribution histogram (L1–L10)
- Up-grades vs down-grades / day
- Slashing events / day (by type T1–T8)

## Cohort Analysis
- New user → L4 time (median)
- L4 → L7 time (median)
- Retention by STL band
- Earnings curve by STL level (validates "higher STL = more earnings" assumption)

## Drift & Integrity
- STL formula version live (must = canonical)
- Discrepancy count (formula vs stored)
- Anchor coverage (% STL events successfully anchored)
- Replay test pass rate

## Fairness
- STL distribution by gender / country / age (where collected)
- Watch for bias: does any cohort cluster low?
- Flag if any segment > 2 std-dev below average

## Top / Bottom Lists
- Top 100 STL gainers (week)
- Top 100 STL droppers (week)
- Most-slashed industries (month)
- Stale STL (no recompute > 30 days)

## Founder Daily View
1. Total platform STL average
2. Slashing events overnight
3. Anchor failure rate
4. New L7+ promotions
5. Anomaly flags

## Linked
- `../1-master/EHB-MASTER-PLAN.md` § STL
- `../5-economy/SLASHING-RULES.md`
- `../6-audits/SECURITY-AUDIT.md`
