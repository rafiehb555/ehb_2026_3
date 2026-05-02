# Scalability Plan — EHB Platform

> **Owner:** Engineering Lead + SRE

## Growth Targets

| Phase | Users | Orders/day | Countries |
|-------|-------|-----------|-----------|
| 1 | 100K | 5K | 5 |
| 2 | 1M | 100K | 11 |
| 3 | 10M | 1M | 17+ |
| Mature | 100M | 10M | 50+ |

## Scaling Strategy

### Stateless Services
- API horizontally scaled behind load balancer
- AI service horizontally scaled
- Web served via edge (CDN + edge functions)

### Database
- Phase 1: single MongoDB cluster, replica sets
- Phase 2: shard by user_country
- Phase 3: shard by user_country × industry where hot
- Read replicas for analytics
- Archived data → cold storage

### Cache
- Redis for sessions, hot reads, idempotency keys
- CDN for static + signed URLs
- Per-country edge cache
- 80%+ hit rate target

### Queue
- Event queue scales with workers
- Kafka / Pulsar at high scale
- Dead-letter retention 30 days
- Cross-region replication

### AI
- Multi-region OpenAI / Anthropic regions
- Self-hosted models for cost control + privacy
- Embedding cache + warm pool

### Anchor
- Polkadot batch anchoring (cost amortized)
- Async (async-first design)
- Off-chain tree, root anchored

## Cost Projections

| Phase | Monthly infra | $/active user |
|-------|---------------|---------------|
| 1 | $20K | $0.20 |
| 2 | $150K | $0.15 |
| 3 | $1.2M | $0.12 |

(rough — refine as scale)

## Bottlenecks Anticipated

| Layer | Bottleneck | Mitigation |
|-------|------------|------------|
| API | Connection pool | Pool sizing + keep-alive |
| DB | Hot shard (one country dominant) | Shard by industry |
| AI | Provider rate limit | Multi-provider + self-hosted |
| Anchor | Polkadot block time | Batch anchoring |
| Storage | Listing images | CDN + tiered storage |
| Search | Fuzzy industry/service | Elasticsearch / Meilisearch |

## Migration Strategy
Each scale change is forward-compatible: code deployed first, data migration in background, cleanup last. Never downtime.

## Capacity Planning
- Load test quarterly to 3× current peak
- Headroom: 30% during normal hours
- Burst handling: autoscale to 2× headroom in 60s

## Linked
- `../6-audits/PERFORMANCE-AUDIT.md`
- `../12-operations/MONITORING.md`
- `../12-operations/BACKUP-DR.md`
