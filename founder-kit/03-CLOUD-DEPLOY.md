# Step 3 — Cloud Deployment Guide

> **Timeline:** 1 week (after legal + payment in progress)
> **Cost (Phase 1):** ~$200-500/month
> **Priority:** P1 — system needs to be live, not local

## Recommended Stack — Phase 1 (Pakistan launch)

### Option A — Simplest (RECOMMENDED for start)
| Service | Provider | Tier | $/mo |
|---------|----------|------|-----:|
| Web (Next.js) | Vercel | Hobby/Pro | 0-20 |
| API + AI | Railway / Render | Hobby | 5-20 each |
| MongoDB | MongoDB Atlas M0/M10 | Free/$59 | 0-59 |
| Redis | Upstash | Free | 0-10 |
| CDN | Cloudflare | Free | 0 |
| DNS | Cloudflare | Free | 0 |
| Email | Resend | Free 3K | 0 |
| **Total** | | | **~$10-110/mo** |

### Option B — Production-grade (when revenue starts)
| Service | Provider | $/mo |
|---------|----------|-----:|
| Compute | AWS ECS Fargate | 200 |
| MongoDB | Atlas M30 | 200 |
| Redis | Elasticache | 100 |
| CDN | CloudFront | 20 |
| Storage | S3 | 10 |
| Monitoring | Datadog/Grafana Cloud | 100 |
| **Total** | | **~$630/mo** |

---

## Quick Deploy (Option A — within 1 day)

### 1. Web → Vercel
```bash
cd apps/web
vercel
# Follow prompts; auto-detects Next.js
```
Set env in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://api.ehb.com
```

### 2. API → Railway
```bash
# Connect repo on railway.app
# Auto-deploys on push to EHB-PVT-LTD-4
```
Set env:
```
MONGO_URI=mongodb+srv://...
REDIS_URL=rediss://...
JWT_SECRET=<generate-strong>
STRIPE_SECRET_KEY=sk_test_...
JAZZCASH_MERCHANT_ID=...
OPENAI_API_KEY=sk-...
NODE_ENV=production
```

### 3. AI Service → Railway (separate service)
Same repo, different start command: `node services/ai/src/index.js`

### 4. Workers (BullMQ) → Railway worker service
Start command: `node services/api/src/infra/workers.js`

### 5. MongoDB → Atlas
- Create M0 free cluster (Phase 1 OK)
- Whitelist Railway/Vercel IPs (or use 0.0.0.0/0 + auth)
- Get connection string → set in API service env

### 6. Redis → Upstash
- Create free tier
- Get URL → set `REDIS_URL` in API + Workers

### 7. DNS → Cloudflare
- Add `ehb.com` zone
- Point `api.ehb.com` → Railway domain (CNAME)
- Point `ehb.com` + `www.ehb.com` → Vercel domain
- Apply config from `infra/cdn-cloudflare.json`

---

## Docker Compose (local + small VPS)

`docker-compose.yml` (already exists in project root). Use for:
- Local dev with all services
- Small VPS deployment (DigitalOcean Droplet, Hetzner)

```bash
docker-compose up -d
```

---

## Production Deployment Checklist

### Pre-deploy
- [ ] All env vars set (no `dev-secret-change-me`)
- [ ] JWT_SECRET = strong random (use `openssl rand -base64 32`)
- [ ] Database backups configured (Atlas auto-backups)
- [ ] SSL/HTTPS enforced (Vercel/Railway auto)
- [ ] Sentry DSN set for error tracking
- [ ] Rate limits configured (`middleware/security.js`)

### Post-deploy
- [ ] `curl https://api.ehb.com/api/health` → 200
- [ ] `curl https://api.ehb.com/api/metrics` → metrics output
- [ ] Sign up test user → confirm signup event fires
- [ ] Place test order → confirm flow completes
- [ ] Upload test webhook from Stripe sandbox → confirm receipt
- [ ] Open Grafana → confirm metrics streaming

---

## Environment-specific Notes

### Phase 2 (UAE/SA expansion)
- Add UAE/SA region in Cloudflare for low latency
- Atlas: enable region-specific replicas
- Add Mada / Telr payment adapters

### Phase 3 (Global)
- Migrate to AWS multi-region or GCP
- Implement DB sharding (see `12-operations/SCALE-PLAYBOOK.md`)
- Add Polkadot batch anchoring queue

---

## Linked
- `infra/multi-region.yml`
- `infra/cdn-cloudflare.json`
- `infra/monitoring/prometheus.yml`
- `ehb-info/12-operations/DEPLOYMENT.md`
