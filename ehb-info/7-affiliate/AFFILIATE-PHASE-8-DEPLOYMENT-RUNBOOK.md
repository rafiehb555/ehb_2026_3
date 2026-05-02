# EHB Affiliate Program — Phase 8 Deployment Checklist & Runbook

> **Pilot:** Pakistan-first soft launch
> **Spec:** `ehb-info/departments/Affiliate.md` §13.8.4 (launch strategy) + §14 (architecture diagrams)
> **Source:** Founder directive 2026-04-26 — comprehensive enterprise deployment guide
> **Owner roles documented per task** with estimated SLA/times

This is a step-by-step actionable guide to deploy the Pakistan pilot safely — covering pre-deploy checks, deployment steps, verification, rollback, DMO/ops procedures, and post-deploy monitoring.

---

## 1. Pre-deployment (Policy, Legal, & Business)

### 1.1 Legal sign-off
- **Owner:** Legal / Head of Compliance
- **Deliverable:** Country checklist completed (licenses, tax/VAT, consumer protection alignment)
- **Done when:** Signed approval document in compliance system

### 1.2 Policy & config prepared
- **Owner:** Product + Compliance
- **Deliverable:** Config entries for hard rules, 80/20 thresholds, country toggles (Pakistan)
- **Done when:** Config saved and versioned in admin console
- **Code reference:** `services/api/src/services/affiliateConfigService.js` + `models/AffiliateConfig.js`

### 1.3 Pilot scope & guardrails defined
- **Owner:** Product
- **Deliverable:** Pilot cohort size, caps per rank, tightened fraud thresholds, DMO review SLAs
- **Done when:** Pilot plan published and stakeholders notified

### 1.4 Finance readiness
- **Owner:** Finance
- **Deliverable:** Payout schedule, reserve account funded, reversal policy & accounting entries defined
- **Done when:** Funding confirmed and bookkeeping entries approved

### 1.5 KYC & payment providers contracted
- **Owner:** Payments / Product
- **Deliverable:** Payment gateway credentials (JazzCash + HBL), KYC vendor onboarding (NADRA + Jumio), test credentials
- **Done when:** Test transactions succeed and KYC API responsive
- **Code reference:** `services/api/src/adapters/{bank,kyc,usdt}/`

---

## 2. Pre-deployment (Technical)

### 2.1 Infra & security prep
- **Owner:** Platform / Infra
- **Deliverable:** Staging cluster mirrors prod topography; WAF and DDoS protections configured (Cloudflare); KMS provisioned
- **Done when:** Infrastructure terraform applied and security scan passes

### 2.2 Service readiness & feature flags
- **Owner:** Engineering
- **Deliverable:** Microservices provisioned (Auth, Users, Orders, Affiliate Engine, Wallets, Fraud, Admin), feature flags for pilot features enabled but off
- **Done when:** Smoke tests pass in staging
- **Code reference:** `services/api/src/services/countryFeatureFlags.js`

### 2.3 Data readiness & seeding
- **Owner:** Data / Engineering
- **Deliverable:** Seed pilot users, seeded products, pilot configs, test KYC docs
- **Done when:** Seed script run in staging and validated
- **Command:** `node services/api/src/scripts/seed.js` + `node scripts/migrate-affiliate-grandfathering.js --apply`

### 2.4 Observability & runbook wiring
- **Owner:** SRE / Monitoring
- **Deliverable:** Dashboards (KPIs), alerts (error rates, fraud scores, revenue thresholds), logging & tracing (Jaeger / OpenTelemetry)
- **Done when:** Alerts triggered in test, runbooks accessible
- **Phase 2 deferred:** see `AFFILIATE-PHASE-2-BACKLOG.md` item #13

### 2.5 Automated tests & compliance tests
- **Owner:** QA / Engineering
- **Deliverable:** Regression suite for finance flows, compliance tests for hard rules
- **Done when:** CI passes and tests in nightly run are green
- **Command:** `node scripts/smoke-test-affiliate.js` (32-step automated suite)

---

## 3. Deployment Day — Canary / Controlled Rollout

### Step 0 — Freeze & communication
- **Owner:** Product
- **Action:** Announce deployment window to stakeholders and support teams; code freeze on non-critical changes
- **Time:** T-24h

### Step 1 — Enable infrastructure & deploy baseline
- **Owner:** Platform / CI
- **Action:** Deploy services to pilot namespace; migrate DB schemas with online migrations (dry-run beforehand)
- **Verification:** Health checks OK; smoke tests pass
- **Time:** T0 → +30–60 mins

### Step 2 — Feature flag ON to 1% traffic (canary)
- **Owner:** Feature flag owner / Engineering
- **Action:** Enable pilot features for 1% of traffic or selected user cohort
- **Verification:** Monitor KPIs (errors, latency, commission pipeline, wallet ledger integrity)
- **Time:** +30–90 mins

### Step 3 — DMO manual readiness & queue active
- **Owner:** DMO Lead
- **Action:** Ensure reviewers logged in, alerting set for fraud signals, sample cases prepared
- **Verification:** Test alert lifecycle; simulate high-risk event and ensure DMO queue receives it
- **Code reference:** `GET /api/admin/affiliate/dmo/queue`

### Step 4 — Run small live transactions
- **Owner:** QA / Product
- **Action:** Execute test purchases end-to-end with affiliate attribution; validate commission creation (pending), ledger entries, and payout workflows
- **Verification:** Expected ledger entries created; commission pending shows correctly; no commissions paid for self-buy test

### Step 5 — Expand cohort to 10% after stability window
- **Owner:** Engineering / Product
- **Action:** Increase feature flag to 10% if no critical issues; continue monitoring
- **Verification:** KPIs stable; fraud score acceptable; reconciliation job shows no mismatches
- **Time window:** 24–48 hours

### Step 6 — Expand to full pilot cohort if stable
- **Owner:** Product / Engineering
- **Action:** Move pilot cohort to intended percentage (as defined in pilot plan)
- **Verification:** All systems green; manual DMO operations within SLA; finance reconciles daily

---

## 4. Post-deployment — Monitoring, Reconciliation & Escalation

### 4.1 Real-time monitoring
- **Owner:** SRE / DMO
- **Metrics:** Checkout success rate, commission pipeline latency, fraud-score distribution, reversed commissions, pending balances
- **Alerts:**
  - Error rate >1% on checkout
  - Fraud high-risk rate spike (>X per hour)
  - Reconciliation mismatch > threshold

### 4.2 Nightly reconciliation
- **Owner:** Finance / Reconciliation Team
- **Action:** Run reconciliation job; reconcile orders → ledger → wallet → payouts; flag mismatches
- **Outputs:** Daily reconciliation report; list of reversals and reasons
- **Code reference:** `GET /api/admin/affiliate/exports/commissions` (CSV export)

### 4.3 DMO review cadence
- **Owner:** DMO Lead
- **Process:** Triage high-risk cases daily, escalate to legal for complex cases, reverse commissions where applicable
- **SLA:** Initial review within 4 hours, full resolution within 48 hours for critical cases

### 4.4 User communications
- **Owner:** Support / Product
- **Templates:**
  - Commission paid
  - Commission reversed (reason + appeal link)
  - KYC required
  - Withdrawal status
- **Channels:** Email, in-app notifications

### 4.5 Patch & hotfixes
- **Owner:** Engineering
- **Policy:** Emergency fix pipeline; changes deployed via hotfix branch with post-deploy verification; rolling back if new issues found

---

## 5. Rollback Plan

### 5.1 Immediate rollback conditions
- Critical payment failures
- Widespread commission miscalculation
- Major data corruption
- Significant fraud spike beyond control

### 5.2 Rollback steps
1. **Feature flag OFF** for pilot features (instant mitigation for behavioral changes)
2. **If code change required:** roll back deployments via CI/CD to previous stable tag
3. **Restore DB from pre-deploy snapshot** ONLY if data corruption verified (coordinate with legal/finance)
4. **Pause payouts** if ledger integrity compromised; inform finance & compliance
5. **Post-mortem & incident report** within 48 hours

### 5.3 Owners
- Engineering (rollback)
- Finance (payout hold)
- Legal/Compliance (notification)
- Product (communication)

---

## 6. Post-Pilot — Evaluation & Expansion Gate

### 6.1 Pilot duration
**30–60 days** (per plan)

### 6.2 Daily & weekly KPI reports (Product analytics)
- Conversion rate
- Revenue growth
- Fraud rate
- Reversals
- New user signups
- KYC pass rate
- Payout success rate

### 6.3 Go / No-Go criteria to expand
- Legal sign-off OK
- Fraud rates within acceptable thresholds
- Reconciliation within tolerance for 7 consecutive days
- No critical severity incidents in last 14 days

### 6.4 Pass / Fail
- **If pass:** prepare country onboarding checklist for next country (UAE / India / UK / USA)
- **If fail:** remediate prioritized list, re-run pilot after fixes

---

## 7. Operational Runbooks / Playbooks

### 7.1 Fraud spike playbook
- **Detect:** threshold trigger → DMO lead notified
- **Actions:**
  1. Throttle signups / checkout
  2. Increase manual reviews
  3. Pause promotions
  4. Run forensic export

### 7.2 Commission reversal playbook
1. Detect suspicious order → DMO review
2. Confirm
3. Reverse via secure job
4. Notify finance & user
- **Code reference:** `POST /api/affiliate/reverse-order`

### 7.3 Payout failure playbook
1. Detect gateway failure → pause payouts
2. Alert finance / SRE
3. Attempt alternate provider or retry per policy

### 7.4 Data incident playbook
- **If PII leak suspected:**
  1. Isolate systems
  2. Enable rotation of keys
  3. Notify legal
  4. Follow breach notification rules

---

## 8. Roles & Contacts

| Role | Responsibility |
|---|---|
| **Deployment Owner** | Head of Engineering — on-call mobile |
| **DMO Lead** | Head of Compliance — primary contact for fraud cases |
| **Finance Lead** | Head of Finance — payout & reconciliation owner |
| **Platform/SRE Lead** | Infra — rollback & infra issues |
| **Product Owner** | Affiliate Product Lead — scope & communication |
| **Support Lead** | CS Manager — user communication |
| **Legal Contact** | Lead Counsel — regulatory escalations |

---

## 9. Time Estimates (Pilot deploy)

| Phase | Duration |
|---|---|
| Pre-deploy checks | 1–2 weeks (parallel tasks) |
| Staging validation | 3–5 days |
| Canary deploy & 1% test | 1 day |
| 1% → 10% expansion window | 1–2 days |
| Full pilot rollout (cohort) | 1–3 days |
| Pilot observation | 30–60 days |

> *Note: these are estimations and assume pre-existing infra and teams.*

---

## 10. Safety & Compliance Notes

- **Audit everything** — every config change and admin action must be logged with signer and timestamp.
- **Don't enable franchise or full bonuses during pilot** unless explicitly approved by legal and finance.
- **Maintain reserve funds** for reversals and chargebacks.

---

## Appendix: Quick Commands / Checks (for engineers)

### Health check endpoints
```
GET /api/health                      — gateway
GET /api/health/auth
GET /api/health/orders
GET /api/health/affiliate
GET /api/health/wallets
```

### Key logs to check
- `commission-processor` logs — errors, idempotency failures
- `wallet-transaction` logs — ledger mismatch warnings
- Kafka consumer lag (Phase 2): `kafka-consumer-group --describe`

### Important dashboards
- Commission pipeline latency and backlog
- Fraud risk score distribution
- Checkout success & payment gateway errors
- Reconciliation mismatch counts

### Useful smoke commands
```powershell
# Full automated suite (32 steps)
node scripts/smoke-test-affiliate.js

# Migration dry-run
node scripts/migrate-affiliate-grandfathering.js

# Migration apply
node scripts/migrate-affiliate-grandfathering.js --apply

# 80/20 daily report
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/admin/affiliate/exports/80-20-report

# Country flags
curl http://localhost:5000/api/admin/affiliate/country-flags

# DMO queue
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/admin/affiliate/dmo/queue
```

---

*EHB Technologies (Pvt.) Ltd. · Affiliate Phase 8 Deployment Runbook · 2026-04-26 · Pakistan Pilot*
