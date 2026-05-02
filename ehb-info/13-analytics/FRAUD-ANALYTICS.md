# EHB · Fraud Analytics

> **Status:** Canonical v1.0 · 2026-04-30

## Tracked fraud metrics

### Volume
- Fraud incidents per day / week / month
- T6 (highest severity) cluster events
- Slash events count + total $ slashed
- False-positive rate

### Quality
- Fraud detection latency (time from action → flag)
- AI confidence score distribution
- DMO confirmation rate
- Appeal overturn rate

### Geographic
- Fraud heat map by region
- Country-by-country fraud rates
- Industry-by-industry rates
- Cross-border fraud patterns

### Temporal
- Time-of-day fraud patterns
- Day-of-week patterns
- Seasonal patterns
- Spike detection

### User-level
- Repeat offenders
- New accounts likely-fraud (within 30 days)
- High-STL fraud (rare but critical)
- Cluster connections (graph)

## Fraud KPIs

| KPI | Target | Reason |
|---|---|---|
| Fraud rate | <0.5% of orders | Trust foundation |
| False-positive rate | <2% | User-friendliness |
| Detection latency | <1h after action | Damage limitation |
| Appeal overturn | <10% | DMO accuracy |
| Recovery (slash collected) | >70% | Anti-fraud reserves |

## Up-Guard live monitoring

Live dashboard for senior DMO:
- T6 cluster alerts (immediate)
- Suspicious account creation patterns
- Sudden GMV spikes
- Geographic anomalies
- Cross-account device fingerprints

## Per-industry fraud analytics

Industries with higher fraud rates get extra scrutiny:
- WMS/OLS: Forged credentials watch
- FIN/INS: Money laundering patterns
- GSM: Counterfeit goods detection
- ATS/RES: High-value item fraud
- LDS: Delivery scam patterns

## Reporting

- Real-time alerts (Up-Guard)
- Daily DMO summary
- Weekly trends report
- Monthly board update
- Quarterly compliance report

## ML model performance

- Precision / Recall per fraud type
- Model drift detection
- Retraining cadence
- A/B testing of model updates

## Cross-references

- AI Fraud: `10-ai-system/FRAUD-DETECTION.md`
- DMO Up-Guard: `3-departments/DMO.md`
- Slashing: `5-economy/SLASHING-RULES.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial fraud analytics |
