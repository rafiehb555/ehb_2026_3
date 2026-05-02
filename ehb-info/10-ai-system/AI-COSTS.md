# AI Costs — EHB Platform

> **Owner:** AI Team + Finance
> **Goal:** Keep AI cost < 5% of GMV.

## Cost Tracking Per Use-Case

| Use-Case | Avg Tokens (in+out) | Model | $/call | Volume/day | $/day |
|----------|---------------------|-------|--------|-----------|-------|
| Industry match | 500 | Haiku | $0.0005 | 50K | $25 |
| Service match | 1.2K | Haiku | $0.0012 | 30K | $36 |
| STL explainer | 800 | Sonnet | $0.0024 | 5K | $12 |
| Support reply | 1.5K | Sonnet | $0.0045 | 2K | $9 |
| Dispute summary | 4K | Opus | $0.060 | 500 | $30 |
| Listing checker | 600 | Sonnet | $0.0018 | 10K | $18 |
| Fraud detector | 2K | Sonnet | $0.006 | 5K | $30 |
| Founder brief | 8K | Opus | $0.120 | 1 | $0.12 |
| Embeddings | 500 | embed-3 | $0.0001 | 100K | $10 |
| **Total** | | | | | **~$170/day** |

(Phase 1 estimates. Will rise with scale.)

## Optimization Levers

### 1. Caching
- Common questions → cached answer (5-min TTL for changing data, 24h for static)
- Hit rate target: 30%

### 2. Truncation
- Limit context to relevant slice
- Use embeddings to rank then send top-k

### 3. Model downgrade
- Try cheap model first; escalate only if uncertain

### 4. Batch
- Group similar prompts (e.g., daily fraud scan)

### 5. Pre-compute
- STL explainers for common levels — precompute, serve from cache

### 6. Local models
- Run small classifiers on-device or self-hosted

## Cost Alerts
- Daily AI spend > 110% of forecast → alert
- Cost per active user > target → investigate
- Sudden spike in any single use-case → investigate

## Per-Country Allocation
- Phase 1 countries: AI cost amortized across larger user base
- Phase 3 (US, EU): higher token costs, plan accordingly

## Budget Approval
- Monthly cap per use-case
- Auto-degrade (move to cheaper model) at 80% of cap
- Auto-disable at 100% (with manual override)

## Linked
- `AI-MODELS.md`
- `AI-PROMPTS.md`
- `../13-analytics/REVENUE-ANALYTICS.md`
