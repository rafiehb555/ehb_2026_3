# KPI Definitions — EHB Platform

> **Owner:** Data Team
> **Single source of truth for every metric — formula + owner + cadence.**

## North-Star

**Verified Trustful Transactions (VTT)** = orders that:
- Settle without dispute
- Have ≥ 4-star average review
- Are anchored to chain
- Both parties at L4+

This is the metric that captures EHB's mission.

## Acquisition

| KPI | Formula | Owner | Cadence |
|-----|---------|-------|---------|
| New users | count(new accounts) | Growth | Daily |
| Activation rate | (% new users → first transaction within 7d) | Growth | Daily |
| CAC | Marketing spend / new activated | Growth | Weekly |
| Channel mix | new users by channel | Growth | Weekly |

## Engagement

| KPI | Formula | Owner | Cadence |
|-----|---------|-------|---------|
| DAU | distinct users active in 24h | Product | Daily |
| WAU | distinct users active in 7d | Product | Weekly |
| MAU | distinct users active in 30d | Product | Monthly |
| DAU/MAU | stickiness ratio | Product | Daily |
| Sessions / user | sessions / DAU | Product | Daily |

## Trust

| KPI | Formula | Owner | Cadence |
|-----|---------|-------|---------|
| Avg STL | mean(stl.level across all active users) | DMO | Daily |
| L4+ % | users with stl ≥ 4 / total | DMO | Daily |
| Slashing rate | slashings / 1M actions | DMO | Daily |
| Anchor success | anchored / attempted | SRE | Hourly |

## Money

| KPI | Formula | Owner | Cadence |
|-----|---------|-------|---------|
| GMV | sum(order amount where state=SETTLED) | Finance | Daily |
| Take-rate | EHB_revenue / GMV | Finance | Daily |
| Refund rate | refunded / settled | Finance | Daily |
| Escrow held | sum(amount where state=PAYMENT_HELD) | Finance | Real-time |
| Lock TVL | sum(EHBGC locked) | Finance | Hourly |

## Operations

| KPI | Formula | Owner | Cadence |
|-----|---------|-------|---------|
| Order p95 latency | submit→escrow timing | SRE | Hourly |
| Dispute median TTR | time from open→resolved | DMO | Daily |
| Complaint backlog | open complaints | DMO | Daily |
| API uptime | 1 - (down min / total min) | SRE | Daily |

## Industry & Country
Same KPIs sliced by `industry` and `country`. Stored in same metric system, dimensions tagged.

## Linked
- `../1-master/SUCCESS-METRICS.md`
- `STL-ANALYTICS.md`
- `FRAUD-ANALYTICS.md`
