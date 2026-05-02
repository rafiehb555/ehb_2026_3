# Monitoring & Observability — EHB Platform

> **Owner:** SRE + Engineering
> **Goals:** Detect → diagnose → resolve, fast.

## The 4 Golden Signals
For every service:
- **Latency** — p50, p95, p99
- **Traffic** — RPS, concurrent users
- **Errors** — 4xx, 5xx, exception rate
- **Saturation** — CPU, memory, queue depth

## Stack
- **Metrics:** Prometheus + Grafana
- **APM:** New Relic / Datadog
- **Logs:** Loki / CloudWatch
- **Traces:** OpenTelemetry → Tempo / Jaeger
- **Errors:** Sentry
- **Status page:** Statuspage.io
- **Alerting:** PagerDuty

## Key Dashboards

### Platform overview
- Overall RPS, p95, error rate
- DB connections, replication lag
- Cache hit ratio
- Event queue depth + dead-letter

### STL health
- Daily STL recompute count
- Average STL by country / industry
- Slashing events / day
- STL formula integrity (gold-master tests last run)

### Trust + Money
- Orders submitted / settled
- Escrow funds locked
- Refund rate
- Anchor failure rate
- Franchise payouts processed

### Business
- New users / day
- Active users (DAU/WAU/MAU)
- Revenue / day by country / industry
- Top 10 sellers, top 10 services

## Alerts → Runbooks
Every alert → linked runbook in `RUNBOOKS.md`. Alert without runbook = alert quality bug.

## SLO Targets

| Service | Availability | Latency p95 |
|---------|--------------|-------------|
| API | 99.9% | 200ms |
| Web | 99.95% | 1.5s LCP |
| Payment | 99.95% | 800ms |
| AI | 99.5% | 2s |
| Anchor | 99.0% | 30s |

## Logs Standards
- Structured JSON
- Correlation ID on every request
- PII masked
- 90-day retention (warm), 7-year (cold for legal)

## Tracing
- Every public API request traced
- Spans: route → service → DB / external
- p95 trace sampled, errors always sampled

## Linked
- `ONCALL.md`
- `RUNBOOKS.md`
- `../6-audits/PERFORMANCE-AUDIT.md`
