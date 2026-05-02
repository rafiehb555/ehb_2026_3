# Performance Audit — EHB Platform

> **Owner:** Engineering / SRE
> **Cadence:** Monthly + on traffic spikes
> **Status:** Template (baseline pending)

## Performance Targets

| Metric | Target | Measure |
|--------|--------|---------|
| API p95 latency | < 200ms | Per route |
| API p99 latency | < 500ms | Per route |
| Web TTFB | < 600ms | Edge cache |
| Web FCP | < 1.5s | Real users |
| Web LCP | < 2.5s | Real users |
| DB query p95 | < 50ms | Mongo profiler |
| Order submit → escrow lock | < 800ms | End-to-end |
| STL recompute | < 100ms | Per user |
| Anchor confirmation | < 30s | Polkadot |

## Load Targets

| Concurrency | Status |
|-------------|--------|
| 100 RPS | Phase 1 |
| 1,000 RPS | Phase 2 |
| 10,000 RPS | Phase 3 |
| 100,000 RPS | Future |

## Audit Checklist

### Frontend
- [ ] Lighthouse score > 90 (perf, a11y, SEO)
- [ ] Bundle size < 200KB (compressed)
- [ ] Code splitting per route
- [ ] Image optimization (WebP/AVIF)
- [ ] Font subsetting
- [ ] No render-blocking resources

### API
- [ ] Indexes on all hot queries
- [ ] N+1 queries eliminated
- [ ] Pagination on all list endpoints
- [ ] Connection pooling sized
- [ ] Response compression (gzip/brotli)
- [ ] CDN for static assets

### Database
- [ ] Slow query log reviewed
- [ ] Index hit ratio > 95%
- [ ] Working set fits in RAM
- [ ] Sharding strategy validated (if > 100GB)
- [ ] Read replicas for analytics

### Cache
- [ ] Redis for session + STL hot reads
- [ ] CDN for static + signed URLs
- [ ] Cache hit ratio > 80%
- [ ] Invalidation strategy documented

### Async
- [ ] Event queue p95 latency < 1s
- [ ] Dead-letter queue < 0.1% of events
- [ ] Retry storms prevented
- [ ] Workers horizontally scalable

## Tools
k6 (load), Lighthouse (web), New Relic (APM), MongoDB Compass (DB), Sentry (errors).

## Linked
- `SCALABILITY-PLAN.md`
- `12-operations/MONITORING.md`
