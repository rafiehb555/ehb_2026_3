# EHB Affiliate — Production Deployment Runbook

> **Version:** v3.11
> **Status:** Production-ready · Pakistan pilot soft launch
> **Date:** 2026-04-27
> **Owner:** Muhammad Rafi (founder/CEO) · EHB Technologies (Pvt.) Ltd.

This is the canonical guide for taking the EHB Affiliate program from `D:\ehb_2026_3` to production. Follow it step-by-step.

---

## 📋 Pre-deploy checklist (T-7 days)

### Legal & Compliance
- [ ] Pakistan SECP filing reviewed by counsel
- [ ] Income Disclosure Statement (IDS) reviewed by FTC counsel
- [ ] T&Cs, Privacy Policy, KYC/AML guidelines reviewed
- [ ] OFAC sanctions list refresh job tested
- [ ] Velocity caps configured per `.env` (50 signups/IP/24h)

### Infrastructure
- [ ] MongoDB Atlas / DigitalOcean cluster provisioned (replica set 3 nodes)
- [ ] Redis cluster provisioned (1GB minimum)
- [ ] AWS SES / SendGrid configured + DKIM verified for `noreply@ehb.com`
- [ ] Cloudflare DNS pointing to load balancer
- [ ] SSL certs issued (Let's Encrypt or AWS ACM)
- [ ] Sentry project created → `SENTRY_DSN` ready

### Vendor accounts (production credentials)
- [ ] **JazzCash** — Merchant account approved (sandbox→production migration)
- [ ] **HBL Bank** — API access provisioned + IP whitelisted
- [ ] **NADRA** — KYC vendor agreement signed + API key issued
- [ ] **Tron** — Hot/Warm/Cold wallet addresses created + funded
- [ ] **OpenAI** — Production API key with $500/mo budget
- [ ] **Twilio** — Account SID for SMS 2FA

### Codebase
- [ ] All STL gold-master tests pass (`pnpm test:stl` → 58/58)
- [ ] Smoke test passes (`node scripts/smoke-test-affiliate.js` → 32/32)
- [ ] CI green on main branch (`affiliate-ci.yml`)
- [ ] Backup of `D:\ehb_2026_3` made to off-site storage
- [ ] `git tag v3.11` created and pushed

---

## 🚀 Deployment paths — pick one

### Option A — Docker Compose on a single VPS (simplest)

**Best for:** Pakistan pilot · 100-500 invite-only users · single-region.

```bash
# 1. Provision a VPS (4 vCPU, 8GB RAM, 100GB SSD)
#    - DigitalOcean Singapore: $48/mo
#    - AWS Lightsail Singapore: $40/mo
#    - Linode Singapore: $40/mo

# 2. SSH in and install Docker + Docker Compose
ssh root@your-vps-ip
apt update && apt install -y docker.io docker-compose-plugin git
systemctl enable docker --now

# 3. Clone repo
git clone git@github.com:ehb-tech/ehb-2026-3.git /opt/ehb
cd /opt/ehb

# 4. Configure environment
cp .env.example .env
nano .env
# Fill in: JWT_SECRET, JAZZCASH_*, HBL_*, NADRA_API_KEY, TRON_PRIVATE_KEY_*,
# OPENAI_API_KEY, AWS_SES_*, SENTRY_DSN, MONGODB_URI

# 5. Start everything
docker compose up -d --build

# 6. Seed initial admin user + demo data
docker compose exec api node scripts/seed.js

# 7. Run smoke test against production
docker compose exec api node scripts/smoke-test-affiliate.js

# 8. Check health
curl https://ehb.com/api/health/affiliate
```

**Setup time:** ~30 min · **Cost:** ~$50/mo · **Downtime risk:** medium (single point of failure)

---

### Option B — AWS ECS Fargate (production-grade)

**Best for:** Post-pilot scale · multi-region · auto-scaling.

```bash
# 1. Push images to ECR
aws ecr create-repository --repository-name ehb-api
aws ecr create-repository --repository-name ehb-web
docker build -f Dockerfile.api -t ehb-api:v3.11 .
docker build -f Dockerfile.web -t ehb-web:v3.11 .
docker tag ehb-api:v3.11 <account>.dkr.ecr.<region>.amazonaws.com/ehb-api:v3.11
docker tag ehb-web:v3.11 <account>.dkr.ecr.<region>.amazonaws.com/ehb-web:v3.11
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
docker push <account>.dkr.ecr.<region>.amazonaws.com/ehb-api:v3.11
docker push <account>.dkr.ecr.<region>.amazonaws.com/ehb-web:v3.11

# 2. Apply Terraform (infra/terraform/aws-ecs.tf — provided separately)
cd infra/terraform
terraform init
terraform plan -var-file=production.tfvars
terraform apply

# 3. Run DB migrations + seed via ECS Run Task
aws ecs run-task --cluster ehb-prod --task-definition ehb-seed --launch-type FARGATE
```

**Setup time:** ~4 hours · **Cost:** ~$300/mo · **Downtime risk:** low

---

### Option C — Vercel (web) + Railway (api+db)

**Best for:** quick deploy without DevOps · NOT recommended for production at scale (vendor lock-in).

```bash
# Web → Vercel
vercel link
vercel env add NEXT_PUBLIC_API_URL https://api.ehb.com
vercel --prod

# API + Mongo → Railway
railway up
railway run pnpm seed
```

**Setup time:** ~15 min · **Cost:** ~$80/mo · **Downtime risk:** low (managed)

---

## 🔐 Production secrets — checklist

Generate strong secrets BEFORE first deploy:

```bash
# JWT secret (256 bits)
openssl rand -hex 64

# Session secret (256 bits)
openssl rand -hex 64

# Webhook signing secret (128 bits)
openssl rand -hex 32

# Tron wallet seeds — DO NOT REUSE across hot/warm/cold
node -e "const t=require('tronweb');const w=t.utils.crypto.genPriKey();console.log(t.utils.crypto.pkToAddress(w),'-->',w.toString('hex'))"
```

**Store in:**
- AWS Secrets Manager (production)
- HashiCorp Vault (enterprise)
- 1Password Business (team handoff)
- **NEVER** in Git, Slack, or email

---

## 🎯 Day-of-deploy checklist (T0)

```bash
# T-2h: Code freeze on main branch
git tag v3.11-rc1
git push --tags

# T-1h: Final smoke test on staging
curl https://staging.ehb.com/api/health/affiliate
node scripts/smoke-test-affiliate.js --env staging

# T-30min: Deploy to production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps --build api web

# T-15min: Verify health
curl https://ehb.com/api/health/affiliate | jq .
# Expect: {"overall":"ok","checks":{...}}

# T-10min: Smoke test against production
node scripts/smoke-test-affiliate.js --env production --invite-only

# T-5min: Enable feature flags (initially, only PK)
curl -X POST https://ehb.com/api/admin/affiliate/country-flags \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"country":"PK","feature":"affiliate_track_a","enabled":true}'

# T0: Open up signups
# (no action needed — public flag enables on first launch)

# T+15min: Monitor
watch -n 5 'curl -s https://ehb.com/api/health/affiliate | jq .overall'

# T+1h: First user signups visible in
curl https://ehb.com/api/admin/affiliate/dmo/queue | jq '.items | length'

# T+24h: Daily reconciliation kicks in
curl https://ehb.com/api/admin/affiliate/exports/80-20-report
```

---

## 📊 Monitoring (set up before launch)

### Health check probes

| Probe | URL | Check Interval | Alert Threshold |
|---|---|---|---|
| **Liveness** | `/api/health/affiliate/lite` | 10s | 3 failures = restart |
| **Readiness** | `/api/health/affiliate/ready` | 5s during startup | block traffic until ready |
| **Deep** | `/api/health/affiliate` | 60s | page on `overall=fail` |
| **80/20 watchdog** | `/api/admin/affiliate/exports/80-20-report?days=7` | hourly | alert if `valuePct > 90%` |

### Pingdom / UptimeRobot

```
Public health: GET https://ehb.com/api/health (every 30s)
Affiliate deep: GET https://ehb.com/api/health/affiliate (every 60s)
Welcome page: GET https://ehb.com/affiliate (every 5min)
```

### Sentry alerts

```
Frontend error rate > 1% in 5min → Slack #ehb-incidents
Backend 5xx rate > 0.5% in 5min → PagerDuty
Slow query > 2s on commission queries → Grafana annotation
```

### Grafana dashboards

```
Dashboard 1: API health (RPS, p95 latency, error rate, memory)
Dashboard 2: Affiliate KPIs (signups/h, commissions/h, payout volume)
Dashboard 3: Compliance (DMO queue depth, KYC backlog, OFAC matches)
```

---

## 🧯 Rollback procedure (emergency)

If production is broken within 1 hour of deploy:

```bash
# 1. INSTANT — feature flag off (no rebuild needed)
curl -X POST https://ehb.com/api/admin/affiliate/country-flags \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"country":"PK","feature":"affiliate_track_a","enabled":false}'

# 2. If feature flag isn't enough — rollback container
docker compose pull
docker tag ehb/api:v3.10 ehb/api:current
docker compose up -d --no-deps api web

# 3. If DB schema corrupted — restore from snapshot
mongorestore --uri="$MONGODB_URI" /backups/ehb-2026-04-26-pre-deploy/

# 4. Pause withdrawals (separately from feature flag)
curl -X POST https://ehb.com/api/admin/affiliate/config \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"key":"withdrawals_paused","value":true,"reason":"deploy rollback"}'

# 5. Post-mortem within 48h (per Phase 8 runbook §5.3)
```

---

## 🎓 Post-deploy validation (T+1, T+24h, T+7d)

### T+1 hour

- [ ] At least 1 successful signup
- [ ] At least 1 successful product purchase via referral link
- [ ] Commission credited to affiliate wallet
- [ ] No P0 errors in Sentry
- [ ] DMO queue has 0 critical-risk cases

### T+24 hours

- [ ] Daily reconciliation job ran successfully
- [ ] 80/20 report shows healthy distribution
- [ ] Nightly OFAC list refresh succeeded
- [ ] No commission reversal storms (>5% reversal rate)
- [ ] First withdrawal request submitted and approved

### T+7 days

- [ ] Cohort retention metrics calculated
- [ ] Refund rate < 5%
- [ ] Mean time-to-first-sale < 48h
- [ ] DMO review SLA hit (4h initial, 48h resolution)
- [ ] Customer support tickets < 50/day

---

## 🛠️ Common operational tasks

### Add a new country to active list

```bash
# 1. File feature flag
curl -X POST https://ehb.com/api/admin/affiliate/country-flags \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"country":"AE","enabled":true}'

# 2. Update env var
# AFFILIATE_LIVE_COUNTRIES=PK,AE

# 3. Restart API to pick up config
docker compose restart api
```

### Pause all withdrawals (compliance hold)

```bash
curl -X POST https://ehb.com/api/admin/affiliate/config \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"key":"withdrawals_paused","value":true}'
```

### Reverse a commission (after refund)

```bash
curl -X POST https://ehb.com/api/affiliate/reverse-order \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"orderId":"ORD-12345","reason":"customer requested refund"}'
```

### Export commission CSV for finance

```bash
curl "https://ehb.com/api/admin/affiliate/exports/commissions?from=2026-04-01&to=2026-04-30&format=csv" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -o april-2026-commissions.csv
```

### Force rank re-evaluation for a user

```bash
curl -X POST https://ehb.com/api/affiliate/rank/evaluate \
  -H "Authorization: Bearer $USER_TOKEN"
```

---

## 📞 Support contacts

| Role | Contact |
|---|---|
| **Founder/CEO** | Muhammad Rafi · ehb.rafi.mr@gmail.com |
| **Engineering Lead** | (TBD) · eng@ehb.com |
| **Compliance Lead** | (TBD) · compliance@ehb.com |
| **Finance Lead** | (TBD) · finance@ehb.com |
| **DMO Director** | (TBD) · dmo@ehb.com |
| **Legal Counsel** | (TBD) · legal@ehb.com |

**24/7 incident response:**
- PagerDuty: `ehb-affiliate-prod`
- Slack: `#ehb-incidents`
- Email: `oncall@ehb.com`

---

## 📚 Companion documentation

- [`AFFILIATE-TESTING-PACKAGE.md`](./AFFILIATE-TESTING-PACKAGE.md) — QA tester guide
- [`AFFILIATE-PHASE-8-DEPLOYMENT-RUNBOOK.md`](./AFFILIATE-PHASE-8-DEPLOYMENT-RUNBOOK.md) — full pilot deployment
- [`AFFILIATE-V3.2-MVP-RUNBOOK.md`](./AFFILIATE-V3.2-MVP-RUNBOOK.md) — launch playbook
- [`AFFILIATE-DEVELOPER-HANDOFF.md`](./AFFILIATE-DEVELOPER-HANDOFF.md) — developer bundle
- [`AFFILIATE-PHASE-2-BACKLOG.md`](./AFFILIATE-PHASE-2-BACKLOG.md) — 15 deferred items
- [`ehb-info/departments/Affiliate.md`](./ehb-info/departments/Affiliate.md) — canonical spec v3.11

---

## ⚖️ Legal reminders

- **EHB is NOT MLM.** Income only from real product/service sales.
- **80/20 rule:** R3+ must earn ≥80% from external customers.
- **30-day cooling-off:** Refunds reverse commissions automatically.
- **OFAC + FATF:** Sanctions screening + Travel Rule for crypto ≥$1,000.
- **Pakistan SECP-aligned:** PK pilot live; UAE/IN/UK/US Phase 2.
- **IDS public:** `/api/compliance/ids` always returns aggregate stats.

---

*EHB Technologies (Pvt.) Ltd. · Production Deployment Runbook v3.11 · 2026-04-27*
