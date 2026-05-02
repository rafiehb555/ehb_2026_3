# EHB Scale Playbook — From 100K → 1B Users

> **Owner:** SRE + Engineering Lead
> **Source:** `1-master/SCALABILITY-PLAN.md`

## Phase Targets vs Architecture

| Phase | Users | API RPS | DB | Cache | CDN |
|-------|------:|--------:|----|-------|-----|
| 1 | 100K | 100 | Single replica set | Optional | Cloudflare free |
| 2 | 1M | 1,000 | Sharded by country | Redis cluster | Cloudflare Pro |
| 3 | 10M | 10,000 | Multi-shard + read replicas | Redis cluster (per region) | CF Enterprise + Argo |
| Mature | 100M-1B | 100,000 | Sharded across 6+ regions, hot-cold tiering | Distributed Redis | Multi-CDN, edge functions |

## Sharding Strategy

### Phase 2 — Shard by `country`
- `users_PK`, `users_AE`, `users_SA`, etc.
- Cross-country queries via fan-out (rare; only DMO + audit)

### Phase 3 — Shard by `country × industry` for hot industries
- `orders_PK_GSM`, `orders_PK_WMS`
- Other industries stay in country-only shards

### Mature — Add tier
- Hot data: in-memory + SSD
- Warm data: SSD
- Cold data: object storage (S3 / GCS) — queried via aggregation jobs

## Read Replicas
- 2 replicas in primary region (read-heavy queries auto-route)
- 1 replica in each secondary region (latency optimization)
- Lag-tolerant queries (e.g., analytics, leaderboards) prefer replicas

## Cache Strategy — Tiered

```
Tier 1: Edge (Cloudflare) — static + signed URLs (TTL 24h)
Tier 2: Regional Redis cluster — STL, profiles, hot reads (TTL 60s-5min)
Tier 3: Application local (LRU 1k entries) — multi-call dedup within request
Tier 4: DB read replicas
Tier 5: DB primary
```

Target: 80%+ cache hit ratio at Tier 1+2 combined.

## CDN Strategy
- All static `/static/*`, `/_next/image*` → Cloudflare cached
- API responses NEVER cached at CDN (data sensitivity)
- Webhook endpoints → bypass CDN (raw body needed)
- Listing images → CDN with WebP/AVIF auto-conversion

## API Horizontal Scaling
- Stateless services behind ALB/NLB
- Health check: `/api/health` returns 200
- Pods scale up at 70% CPU, scale in at 30%
- Min 3 replicas per region (HA)
- HPA: target 100 RPS per pod

## Queue Scaling
- BullMQ workers scale with queue depth
- Workers per queue: min 2, max 50
- Dead-letter monitor: alert if backlog grows

## Anchor Batching (Polkadot)
- Don't anchor every order individually
- Batch every 100 orders OR 60s (whichever first)
- Reduces chain cost by 100×
- Merkle root anchored; proofs derived offline

## Database Optimization
- Indexes on every hot query path (already in models)
- Compound indexes for state machines (e.g., `{state: 1, createdAt: -1}`)
- No `.populate()` in hot paths — use lookups + join in app
- Hot collection size monitoring (alert at 50GB)

## Cost Optimization at Scale
- Spot instances for workers (50%+ discount)
- Reserved instances for DB primary
- Egress optimization (CDN cached, no cross-region pulls)
- AI provider tier-down at 80% of monthly budget

## Linked
- `../1-master/SCALABILITY-PLAN.md`
- `../6-audits/PERFORMANCE-AUDIT.md`
- `MONITORING.md`
