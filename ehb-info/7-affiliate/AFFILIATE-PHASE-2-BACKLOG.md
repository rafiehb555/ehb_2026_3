# Affiliate Program — Phase 2 Backlog

> **Source:** Audit of Phase 8 epics + architecture diagram (2026-04-26)
> **Status:** Phase 1 (v3.3) production-ready. This doc tracks what's deferred to Phase 2+ and why.

This is the canonical backlog of items that are **scaffolded or documented** in the codebase but require **external infrastructure / vendor onboarding** to fully implement. Listed in priority order.

---

## 🔴 Tier 1 — Required Before Real-Money Launch

### 1. Real Banking Integrations (Pakistan)
- **Files affected:** `services/api/src/adapters/bank/jazzcash.js` · `hbl.js`
- **Current:** stub responses with simulated success after delay
- **Phase 2 needs:**
  - JazzCash Merchant Services API credentials (`JAZZCASH_MERCHANT_ID`, `JAZZCASH_PASSWORD`, `JAZZCASH_INTEGRITY_SALT`)
  - HBL Merchant Services credentials
  - Webhook endpoints registered with both
  - End-to-end test in JazzCash + HBL sandboxes
- **Estimate:** 3-4 weeks · 1 backend dev + business onboarding

### 2. Real USDT TRC20 Integration (Tron)
- **File:** `services/api/src/adapters/usdt/tron-trc20.js`
- **Current:** stub address generation + stub broadcast
- **Phase 2 needs:**
  - TronWeb library install
  - Hot wallet HD derivation strategy
  - Hardware-secured signing key (HSM or AWS KMS)
  - Tron node URL (TronGrid or self-hosted)
  - Background job to watch deposit addresses
- **Estimate:** 2 weeks · 1 backend dev + DevOps

### 3. Real KYC Vendor Integrations
- **Files:** `services/api/src/adapters/kyc/nadra.js` · `jumio.js`
- **Current:** stub `verified` responses
- **Phase 2 needs:**
  - NADRA Verisys API onboarding (Pakistani business entity required)
  - Jumio Netverify account + API keys
  - Webhook handlers for async verification results
  - Document storage with encryption at rest
- **Estimate:** 4-6 weeks · 1 backend dev + legal onboarding

### 4. 2FA Provider Integration
- **File:** `services/api/src/services/withdrawalService.js` (`verifyTwoFactor`)
- **Current:** accepts any 6-digit code
- **Phase 2 needs:**
  - TOTP library (`otplib`) for app-based 2FA
  - SMS provider for fallback (Twilio / 2Factor.in)
  - Backup codes storage (encrypted)
  - User enrollment flow
- **Estimate:** 1 week · 1 full-stack dev

---

## 🟡 Tier 2 — Production-Hardening (Months 1-3 post-launch)

### 5. Kafka Event Streaming
- **Architecture:** Phase 8 §D.2 (Order → Kafka → Fraud → Commission)
- **Current:** synchronous service calls within Express monolith
- **Phase 2 needs:**
  - Kafka cluster (Confluent Cloud or self-hosted)
  - Topics: `orders`, `commissions`, `fraud-signals`, `withdrawals`, `reversals`
  - Producers in `orderService` + `affiliateService`
  - Consumer groups for each downstream service
  - At-least-once semantics + idempotency keys
- **Estimate:** 4-6 weeks · 1 backend dev + DevOps

### 6. Postgres Financial Ledger
- **Architecture:** Phase 8 §D.4 (ACID-compliant ledger separate from MongoDB)
- **Current:** all financial records in Mongo `Transaction` collection
- **Phase 2 needs:**
  - Postgres 16 setup
  - Double-entry ledger schema (debits/credits)
  - Migration from existing Mongo Transaction records
  - Nightly reconciliation job (Mongo wallets ↔ Postgres ledger)
  - Rollback procedures for mismatches
- **Estimate:** 6-8 weeks · 1 backend dev + DBA review

### 7. ML Anomaly Detection (Fraud)
- **Architecture:** Phase 8 §B.3
- **Current:** deterministic rules in `fraudSignalsService.js`
- **Phase 2 needs:**
  - Feature store (FraudSignal aggregations)
  - Model training pipeline (Python / scikit-learn / XGBoost)
  - Inference service (Flask / FastAPI)
  - A/B test framework against rules-only baseline
  - Model versioning + drift monitoring
- **Estimate:** 8-12 weeks · 1 ML eng + 1 backend dev

### 8. Frontend Admin DMO Console
- **Current:** only API endpoints exist (`/api/admin/affiliate/*`)
- **Phase 2 needs:**
  - Next.js admin pages under `/dmo/affiliate-config` + `/dmo/withdrawals` + `/dmo/fraud-queue`
  - Audit log viewer with filtering
  - Country flag toggle UI
  - Withdrawal approval/rejection workflow UI
  - Real-time updates via Socket.IO (already present in /dmo namespace)
- **Estimate:** 4-6 weeks · 1 frontend dev

### 9. 30-Day Pending Hold Scheduler
- **File:** `models/AffiliateWallet.js` field `pendingHold`
- **Current:** field exists but never used
- **Phase 2 needs:**
  - Job scheduler (BullMQ / Temporal)
  - Daily job: promote pendingHold → balances after 30 days
  - Refund clawback path: debit pendingHold first, then balances
- **Estimate:** 2 weeks · 1 backend dev

---

## 🔵 Tier 3 — Scale & Compliance (Months 3-12)

### 10. Multi-Region Active-Active (3 regions)
- **Architecture:** Phase 8 §D + §E (Asia / EU / Americas)
- **Current:** single-region deployment ready
- **Phase 2 needs:**
  - DB sharding by country
  - Region routing at edge (Cloudflare Workers)
  - Cross-region replication strategy
  - DR runbooks (RPO 5min / RTO 15min)
- **Estimate:** 12-16 weeks · 2 backend devs + DevOps

### 11. KMS + Secrets Management
- **Architecture:** Phase 8 §E.2
- **Current:** secrets in `.env` (development), no KMS integration
- **Phase 2 needs:**
  - AWS KMS / GCP KMS / HashiCorp Vault
  - Secret rotation automation
  - Encrypted env var loading
  - PII encryption at rest with KMS-managed keys
- **Estimate:** 3-4 weeks · 1 DevOps

### 12. WAF + DDoS Protection
- **Architecture:** Phase 8 §E.2
- **Current:** none
- **Phase 2 needs:**
  - Cloudflare WAF rules (OWASP top 10)
  - Rate limiting at edge
  - DDoS auto-mitigation
- **Estimate:** 1-2 weeks · 1 DevOps

### 13. Observability Stack
- **Architecture:** Phase 8 §E.4
- **Current:** console logs only
- **Phase 2 needs:**
  - OpenTelemetry instrumentation
  - Prometheus metrics
  - Grafana dashboards
  - Jaeger distributed tracing
  - Loki log aggregation
- **Estimate:** 4-6 weeks · 1 DevOps

### 14. Country Rollout (UAE / India / UK / USA)
- **Current:** Pakistan-only feature flags enabled
- **Phase 2 needs (per country):**
  - Local entity setup (legal)
  - Banking license / registration
  - Local KYC vendor onboarding
  - Local marketing site translations
  - Compliance officer per jurisdiction
- **Estimate:** 6-12 months total · 1 legal + 1 ops + 1 backend per rollout wave

### 15. Compliance Test Suite + Legal QA
- **Architecture:** Phase 8 §H.2
- **Current:** smoke test only (32 steps)
- **Phase 2 needs:**
  - End-to-end financial regression suite (Cypress / Playwright)
  - Compliance evidence generation (screenshots, exports)
  - Legal QA sign-off workflow
  - Continuous compliance monitoring
- **Estimate:** 4 weeks · 1 QA + 1 legal

---

## 📋 Quick Reference — Where Each Phase 2 Item Lives in Code

| Phase 2 item | File / location | Status indicator |
|---|---|---|
| JazzCash real | `adapters/bank/jazzcash.js` | `isStub: true` |
| HBL real | `adapters/bank/hbl.js` | `isStub: true` |
| Tron USDT real | `adapters/usdt/tron-trc20.js` | `isStub: true` |
| NADRA real | `adapters/kyc/nadra.js` | `isStub: true` |
| Jumio real | `adapters/kyc/jumio.js` | `isStub: true` |
| Real 2FA | `services/withdrawalService.js` line 90 | accepts any 6-digit code |
| Pending hold scheduler | `models/AffiliateWallet.js` field `pendingHold` | unused in MVP |
| ML anomaly | `services/fraudSignalsService.js` | rules-only |
| Kafka events | not yet wired | sync calls only |
| Postgres ledger | not yet wired | Mongo only |
| Admin frontend | `app/dmo/affiliate-*/page.tsx` | not yet built |
| KMS | not yet wired | `.env` only |

## 🎯 Recommended Phase 2 Sprint Sequence

**Sprint 1-2 (Weeks 1-4):** Real banking (JazzCash + HBL) + Real 2FA → unblock Pakistan-real-money launch.

**Sprint 3-4 (Weeks 5-8):** Real USDT TRC20 + NADRA KYC → unlock crypto withdrawals + tier upgrades.

**Sprint 5-6 (Weeks 9-12):** Frontend admin DMO console + 30-day pending hold scheduler.

**Sprint 7-8 (Weeks 13-16):** Kafka migration (read-only first, then full).

**Sprint 9-12 (Months 4-6):** Postgres ledger + observability + KMS + WAF.

**Months 6-12:** ML model + multi-region + country rollouts.

---

*EHB Technologies (Pvt.) Ltd. · Affiliate Phase 2 Backlog · 2026-04-26*
