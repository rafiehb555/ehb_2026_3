# EHB Launch Playbook — Production Readiness + Phased Rollout

> **Status:** v1.0 · 2026-04-30
> **Owner:** Founder + Engineering Lead + Country Franchise

---

## ✅ PRE-LAUNCH CHECKLIST

### Code & Infra
- [ ] `pnpm install` clean — no warnings, all deps resolve
- [ ] `pnpm test` green (STL gold-master 58/58 + revenue 8/8 + smoke 22/22)
- [ ] `pnpm lint` zero errors
- [ ] `node scripts/check-duplication.mjs` passes
- [ ] `node scripts/smoke-test-e2e.mjs` 22/22

### Secrets & Config
- [ ] `.env` configured per environment (dev/staging/prod)
- [ ] No `.env` committed to git
- [ ] Secrets in vault/manager (AWS Secrets / Doppler / Vault)
- [ ] All API keys rotated within 90 days
- [ ] DB credentials rotated
- [ ] JWT_SECRET unique per environment

### Monitoring & Alerts
- [ ] Prometheus scraping all services
- [ ] Grafana 6 dashboards live
- [ ] PagerDuty on-call rotation set
- [ ] Sentry error tracking enabled
- [ ] Status page (Statuspage.io) configured
- [ ] All 10 alert rules in `alerts.yml` enabled

### Backups & DR
- [ ] Daily DB backups automated
- [ ] Monthly DR drill scheduled
- [ ] Backup restore validated last 30 days
- [ ] Polkadot keys in HSM, Shamir-sharded
- [ ] Cross-region replication active

### Security
- [ ] Pen test completed (clean or P0 fixed)
- [ ] OWASP Top 10 covered
- [ ] DDoS protection active (Cloudflare)
- [ ] Rate limiters tuned per route
- [ ] WAF rules deployed
- [ ] All endpoints HTTPS only
- [ ] HSTS preload
- [ ] CSP headers
- [ ] No PII in logs

### Compliance (per launch country)
- [ ] Legal entity formed
- [ ] Payment partner signed (Stripe / JazzCash / etc.)
- [ ] KYC partner signed (NADRA / EIDA / Absher / etc.)
- [ ] Data Processing Agreement signed
- [ ] TOS translated to local language
- [ ] Privacy notice published
- [ ] Cookie policy published
- [ ] AML policy enforced
- [ ] Tax registration complete (VAT/GST/Sales)
- [ ] Industry licenses obtained (healthcare, legal, finance)
- [ ] Local regulators notified

### Customer Readiness
- [ ] Support team hired + trained
- [ ] Help docs published
- [ ] Onboarding flow tested with 50+ beta users
- [ ] Refund flow tested (real money)
- [ ] Dispute flow tested (real complaints)

### Legal
- [ ] Founder agreement signed
- [ ] Co-founder vesting locked
- [ ] IP assignment from contractors
- [ ] Open-source license compliance check

---

## 🚀 PHASED ROLLOUT STRATEGY

### **Phase 1 — Pakistan Launch** (Months 0-3)
**Why first:** Founder's home market; cheapest acquisition; STL system proves out
**Targets:**
- 100K registered users in 90 days
- 10K active sellers
- $1M GMV
- 1 Country Franchise + 4 Master + 30 Corporate + 200 Sub + 1,000 Micro
- 5 industries live: GSM, OLS (basic), HPS, EAS, ELS

**Marketing:**
- Founder tour: Karachi, Lahore, Islamabad (3 cities, 6 events)
- Influencer onboarding: 50 micro-influencers, 5 macro
- Referral campaign: $5 + $5 (already in code)
- Local press: Dawn, Express Tribune, ProPakistani

**Constraints:**
- JazzCash + EasyPaisa as primary payment
- Urdu + English UI
- L4+ healthcare requires medical board verification

### **Phase 2 — UAE + Saudi Arabia + Turkey + Malaysia** (Months 3-9)
**Why these:** Pakistani diaspora, high purchasing power, regulator-friendly
**Targets:**
- 500K total users
- 30 industries live
- $10M GMV
- All 17 Phase-1 countries' Country Franchises filled

**Marketing:**
- Cross-border referral bonus (Pakistanis abroad → Pakistan)
- UAE/SA arabic localization
- Turkey: localized via TR partnership
- Local payment partners (Mada, Iyzico, FPX) integrated

### **Phase 3 — Global** (Months 9-24)
**Why now:** Scale validated, infrastructure proven
**Targets:**
- 10M users
- All 38 industries
- $100M GMV
- 17 countries fully active

**Markets to add:** UK, Germany, France, US, Canada, Indonesia, Egypt

---

## 📈 LAUNCH-DAY RUNBOOK

### T-7 days
- Final smoke test in staging
- Comms team prepares press release
- Status page set to "Pre-launch"
- All on-call engineers on standby

### T-1 day
- Deploy production binaries
- Scale-up: API → 10 pods, Workers → 5 pods
- Cache warmup for top industries
- Status page: "Launching tomorrow"
- Founder Twitter teaser

### T-0 (Launch)
- 09:00: Open registration in beta cohort (1k invites)
- 11:00: Monitor metrics; verify no error spikes
- 13:00: Press release goes live
- 15:00: Influencer posts coordinated
- 18:00: Open registration to public
- 20:00: Founder live AMA on Twitter Spaces

### T+1 day
- Daily metrics review
- Founder daily brief at 09:00
- Support queue triage
- Fix any P0/P1 issues from day 1

### T+7 days
- Week-1 retro
- KPI review vs targets
- Adjust marketing spend based on conversion

---

## 🎯 SUCCESS METRICS — Launch Day

| Metric | Target |
|--------|-------:|
| Sign-ups in 24h | 5,000 |
| First transaction within 24h | 500 |
| API uptime | 99.9% |
| API p95 latency | < 200ms |
| Error rate | < 0.5% |
| Support response time | < 1h |
| Conversion (visit → signup) | > 5% |
| Activation (signup → first txn) | > 20% |

---

## 🚨 LAUNCH ABORT CRITERIA

Pull launch if:
- API error rate > 5% sustained
- DB unavailable > 5 min
- Polkadot anchor failures > 10%
- Payment provider down for ALL methods
- Founder + Eng Lead vote: abort

Re-launch within 7 days post-fix.

---

## 🌍 PER-COUNTRY COMPLIANCE GATE (must pass before activation)

| Item | PK | AE | SA | TR | MY | QA | KW | OM | ID | EG | GB | US | CA | DE | FR | CN | IN |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Legal entity | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | — | — | — | — | — | — | — | — | — | — | — | — |
| Payment partner | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | — | — | — | — | — | — | — | — | — | — | — | — |
| KYC partner | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | — | — | — | — | — | — | — | — | — | — | — | — |
| TOS translated | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | — | — | — | — | — | — | — | — | — | — |
| Tax registration | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | — | — | — | — | — | — | — | — | — | — | — | — |
| Industry licenses | ⏳ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

(✅ done · ⏳ in progress · — not started)

---

## Linked
- `EHB-PHASE-1-DMO-FRANCHISE-AI.md`
- `EHB-PHASE-2-PLAN.md`
- `../9-legal/COUNTRY-SPECIFIC-LAWS.md`
- `../12-operations/SCALE-PLAYBOOK.md`
- `../12-operations/RUNBOOKS.md`
