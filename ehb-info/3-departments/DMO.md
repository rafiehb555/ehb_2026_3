# DMO — Decentralized Management Office

**Department:** DMO
**Role in EHB:** The governance brain of the entire platform — 7 engines, decision core, dashboard
**Document version:** 2.0 (deep detail provided by founder 2026-04-14)
**Created:** 2026-04-11
**Status:** 🟡 Planning in progress — user is about to provide new info
**Parent doc:** `ehb-info/EHB-MASTER-INFO.md`

> **How this file works:**
> 1. Sections marked `[MERGED]` are pre-existing content pulled from the
>    13+ legacy docs, rewritten in a single structured voice.
> 2. Sections marked `[AWAITING USER INPUT]` are gaps where I need the
>    user (Rafi) to tell me the specifics. I will fill them as they come in.
> 3. Sections marked `[SUGGESTION]` are proposals I added. They can be
>    accepted, modified, or rejected by the user.
> 4. Every edit lands in the *Changelog* at the bottom.

---

## 0. TL;DR — what DMO is

DMO is **not** an operations team. It is the **governance, policy,
enforcement, and audit layer** that sits above every industry, every
service, and every other department. It approves, monitors, enforces,
audits, and routes. It owns the 8-step user flow, the revenue split, the
L8 SUPREME approval, the ban/freeze authority, and the full audit trail.

> "DMO = the brain of the entire EHB ecosystem." — `EHB_DMO_PLAN.md`

DMO is staffed by **EHB employees + AI automation** (AI proposes, human
confirms for sensitive actions; AI decides alone for low-risk routine).

---

## 1. Scope of control — what DMO oversees  `[MERGED]`

DMO has authority over:

1. **GoSellr** — marketplace listings, commissions, seller bans.
2. **JPS** — designations, exams, 6-month contracts, courses.
3. **PSS** — identity review, blacklist, fraud.
4. **CRB** — certificate issuance, inspection reports, inspector audits.
5. **STL** — override, freeze, bulk recalc, appeals.
6. **Franchise network** — applications, KPIs, audits, termination.
7. **Wallet & AML** — AML queue, large withdrawals, EHBGC rate.
8. **Complaint system** — Tier 5/6 resolution, SLA enforcement.
9. **Affiliate system** — commission integrity, abuse detection.
10. **Platform policy** — feature flags, kill switches, regional rules.

DMO does **not** run day-to-day service delivery (no doctors, no lawyers,
no teachers, no drivers) — it governs the people and systems that do.

---

## 2. Role hierarchy  `[MERGED]`

### 2.1 Seven DMO roles (v3.0 note: Admin = DMO-only, not a public user type)

| Code | Role | Primary function | Notes |
|------|------|------------------|-------|
| `SUPER_ADMIN`   | Super Admin (EHB Board) | Full platform access, final policy | Internal staff only |
| `DMO_DIRECTOR`  | DMO Director            | Heads DMO, reports to board | Internal staff only |
| `DMO_MANAGER`   | DMO Manager             | Per-module ownership (PSS, CRB, STL, etc.) | Internal staff only |
| `DMO_ANALYST`   | DMO Analyst             | Data monitoring + reports | Internal staff only |
| `DMO_SUPPORT`   | DMO Support             | Complaint handling, user support | Internal staff only |
| `DMO_INSPECTOR` | DMO Inspector           | CRB / PSS audit oversight | Internal staff only |
| `AI_SYSTEM`     | AI System               | Automated scoring / routing | Automated, not human |

**Important (PSS.md v3.0 alignment):** "Admin" is **NOT a public user type**. It is a **DMO-only internal role**. The 9 public user types are: Buyer, Seller, Service Provider, Rider, Inspector, Franchise, Employer, Job Seeker, Production Company. Admins are EHB employees staffing DMO with L8+ PSS verification + mandatory 2FA.

### 2.2 Officer hierarchy (operations side)

```
SUPER_ADMIN (Board)
    │
    ├── DMO Director
    │       │
    │       ├── DMO Manager — PSS
    │       ├── DMO Manager — CRB
    │       ├── DMO Manager — STL
    │       ├── DMO Manager — Wallet / AML
    │       ├── DMO Manager — Complaint
    │       ├── DMO Manager — Franchise
    │       └── DMO Manager — Marketplace / JPS
    │
    ├── DMO Analysts (data, reporting)
    ├── DMO Support (user support, complaints tier 1–3)
    ├── DMO Inspectors (CRB audits, PSS audits)
    └── AI Systems (automation layer)
```

### 2.3 Department-head → officer workflow pattern  `[MERGED]`

```
Application submitted
  → DMO validation (completeness check)
  → Junior Officer (initial review)
  → Senior Officer (secondary review)
  → Department Head (final approval)
  → APPROVED   ↘  Certificate issued, DMO registry entry, blockchain hash
     REJECTED  ↘  Reason provided, appeal option
```

---

## 3. DMO control layers  `[MERGED]`

DMO operates on 5 layers:

1. **Interface layer** — mobile app, web app, franchise portal, officer portal, admin dashboard.
2. **Application layer** — GoSellr, WMS, AGTS, OLS, SOT, EHB Tube, HPS, OBS.
3. **Trust & verification layer** — PSS · CRB · STL.
4. **Governance layer** — application processing, cert issuance, license mgmt, penalty enforcement, compliance monitoring.
5. **Infrastructure layer** — PostgreSQL, Redis, Elasticsearch, Kafka/RabbitMQ, Polkadot, IPFS, logging/alerting.

---

## 4. Module-specific DMO panels  `[MERGED]`

DMO exposes one panel per domain. Each panel is a dashboard + queue + action set.

### 4.1 PSS panel — identity review
- Pending manual reviews queue (priority-sorted)
- AI confidence score per submission
- Side-by-side: uploaded CNIC vs extracted data
- One-click: approve / request resubmission / reject + flag fraud
- Daily stats: submissions, auto-approved, manual, rejected
- Manages PSS blacklist

### 4.2 CRB panel — physical verification
- CRB applications queue (Submitted → Under Review → Approved)
- Inspection report viewer (photos, GPS map, checklist)
- Inspector accountability tracker
- Certificate issue / revoke / expire
- Franchise CRB routing performance
- 6-month refilling calendar

### 4.3 STL panel — trust scoring
- Live STL leaderboard (users, services, products)
- STL distribution graph (L1–L5 breakdown)
- Recent STL drops > 20 points (auto-alert)
- Manual override tool: `userId + new score + reason`
- Appeal queue + resolution
- STL audit log (who changed what, when, why)
- Bulk recalculation after system events
- Freeze / unfreeze

### 4.4 GoSellr panel — marketplace
- Flagged products queue (AI-detected issues)
- Commission ledger (40/25/20/15 daily reconciliation)
- Seller performance league (by STL + sales)
- Category management
- Banned sellers list + reinstatement

### 4.5 JPS panel — jobs & hiring
- Pending designation upgrade requests (L5+)
- Exam results distribution (AI-proctored)
- 6-month contract expiry calendar
- Skill-course approval queue
- Inspector designation management

### 4.6 Franchise panel
- Geo map of all active franchises
- KPI heatmap (green / yellow / red)
- Audit queue
- Application review pipeline
- Earning distribution verifier
- Suspension / termination tool

### 4.7 Wallet & AML panel
- AML queue (sorted by risk score)
- Real-time transaction anomaly feed
- Escrow dispute list
- EHBGC rate history + adjustment
- Platform revenue tracker

### 4.8 Complaint panel
- Tier 5+ queue
- Trend analytics (type / region / time)
- Franchise complaint-handling scorecard
- Penalty application tool
- Bulk resolution for similar cases

---

## 5. Automation layer  `[MERGED]`

### 5.1 Fully automated — no human needed

| Process | Trigger | Auto action |
|---------|---------|-------------|
| STL recalc                  | Order completed       | Recalc for all parties |
| Fraud signal                | STL < 40              | Auto-signal to PSS |
| SLA breach                  | Timer expires         | Escalate to next tier |
| Low-risk AML flag           | Small deposit normal  | Auto-clear |
| Duplicate complaint         | Same issue filed      | Auto-merge |
| CRB expiry reminder         | 30 days before        | Auto-notify |
| Contract renewal notice     | Day 150               | Auto-email + dashboard alert |
| Low inventory               | Stock threshold       | Auto-notify seller |

### 5.2 Human required — always

- PSS identity manual review
- CRB final certificate approval
- STL override requests
- Franchise suspension / termination
- Account banning
- High-risk AML decisions
- Tier 5+ complaint resolution

### 5.3 Hybrid — AI proposes, human confirms

- Complaint resolution
- STL appeals
- Franchise audits
- Application routing decisions

---

## 6. AI decision engine  `[MERGED]`

DMO's AI engine is split into 6 models:

1. **Verification AI** — KYC decisions, document analysis, face match
2. **Risk AI** — fraud detection, risk scoring, AML monitoring
3. **Workflow AI** — application routing, priority, auto-approve
4. **STL AI** — trust scoring, rank update, penalty calculation
5. **Compliance AI** — policy check, SAR generation, audit trail
6. **Recommendation AI** — user match, service recommendation, content

### 6.1 Decision thresholds

| Decision       | Condition                               |
|----------------|-----------------------------------------|
| Auto approve   | Risk < 30 AND all checks pass           |
| Auto reject    | Risk > 80 OR fraud detected             |
| Manual review  | 30 ≤ Risk ≤ 80, edge cases              |
| Escalate       | VIP user, high value, complex case      |
| Monitor        | Borderline cases, new patterns          |

### 6.2 STL scoring weights (default)

| Factor                  | Weight |
|-------------------------|--------|
| Verification status     | 25%    |
| Transaction history     | 20%    |
| Customer reviews        | 20%    |
| Complaint history       | 15%    |
| Compliance record       | 20%    |

### 6.3 Model performance targets

| Metric              | Target          | Alert threshold |
|---------------------|-----------------|-----------------|
| Accuracy            | > 98%           | < 95%           |
| False positive rate | < 2%            | > 5%            |
| Latency             | < 100 ms        | > 500 ms        |
| Throughput          | 1 000 req/sec   | < 500 req/sec   |

### 6.4 DMO Scoring Formula  `[NEW — 2026-04-20]`

DMO scoring powers user progression, eligibility, and platform authority. This is the **master score** that combines trust, activity, behavior, and risk into a single 0–100 scale (L1–L10 SUPREME).

#### Components (0–100 each, normalized)

1. **Activity Score (30% weight)**
   - Daily usage frequency
   - Order / service transaction count
   - Consistency over last 30 / 90 days
   - Formula: `(orders_per_month / avg_platform) × 100`
   - **Bonus:** +5 for streak > 30 days without gap

2. **Behavior Score (30% weight)**
   - Complaint count (lower = better)
   - On-time delivery / service completion
   - Customer review average (1–5 stars → 20–100 scale)
   - Response time to messages
   - Formula: `(5_star_reviews + low_complaints) / total_interactions × 100`
   - **Bonus:** +5 for > 4.5 avg rating

3. **Performance Score (20% weight)**
   - Service completion rate
   - Delivery speed (on-time %)
   - Quality metrics (returns, refunds, disputes)
   - Certification / skill level (STL level proxy)
   - Formula: `(completed / attempted) × 100`
   - **Bonus:** +5 for L5+ STL level

4. **Risk Score (20% weight — subtracted)**
   - Fraud detection flags
   - Suspicious payment patterns
   - Chargebacks / refunds as % of volume
   - AML / sanctions screening results
   - **Penalty:** –20 for fraud detected, –10 for chargebacks > 2%, –5 for AML flag

#### Final Formula

```
DMO_SCORE = (Activity × 0.30) + (Behavior × 0.30) + (Performance × 0.20) − (Risk × 0.20)
Range: 0–100
Clamped: [0, 100]
```

#### Level Mapping (DMO Levels L1–L10)

| Score | Level | Name | Authority | Features |
|-------|-------|------|-----------|----------|
| 90–100 | L10 | SUPREME | Full platform control | Unlimited listings, direct franchises, policy voice |
| 80–89 | L9 | ELITE | High authority | 500+ active listings, bulk operations |
| 70–79 | L8 | VIP | Senior user | 200+ active listings, team accounts |
| 60–69 | L7 | PRO | Established | 100+ active listings, franchise eligible |
| 50–59 | L6 | HIGH | Growing | 50+ listings, multi-service enabled |
| 40–49 | L5 | ADVANCED | Active | Full feature set, seller tools |
| 30–39 | L4 | STANDARD | Regular | Service listing, reviews, messaging |
| 20–29 | L3 | NORMAL | Verified | Buying enabled, limited selling |
| 10–19 | L2 | BASIC | New user | Limited to read, no listing |
| 0–9 | L1 | FREE | Unverified | Browse only, PSS pending |

#### Score Change Events

**Score UP (increase immediately, logged):**
- Successful order / service completion: +2
- Customer gives 5-star review: +3
- No complaints in 30-day period: +5
- High activity week (> median transactions): +4
- PSS KYC completion: +10
- 3-month anniversary (no issues): +5

**Score DOWN (decrease immediately, logged):**
- Customer complaint filed: –5 (per complaint, first 5/month)
- Late delivery / service delay (> SLA): –3
- Fraud detected: –20 (permanent until resolved)
- Inactive 30 days: –10 (gradual, once per month)
- Refund / dispute won against user: –3
- Policy violation: –8 (per violation type)
- Chargebacks > 2%: –15 (block new transactions until resolved)

#### DMO Mode Routing

Each industry is assigned a DMO **Mode** (from `Industries.md §5`) that determines how fast DMO approves users:

| Mode | Approval Speed | Risk Tolerance | Condition |
|------|---|---|---|
| **FAST** | < 2 hours | Auto-approve if Activity > 70 AND Behavior > 75 | Low-risk industries (GSM, FBS, LDS, ELS) |
| **BALANCED** | 1–3 days | Require manager review; AI suggests, human approves | Medium-risk (HPS, OBS, EPS, ITS, etc.) |
| **STRICT** | 3–7 days | Require senior manager + field inspection (CRB) | High-risk (OLS, RES, LSM, HCS, MFS) |
| **CRITICAL** | 7–14 days | Require director + legal + compliance audit | Very high-risk (FIN, INS, SCS, WMS, EFS) |

#### Recalculation Schedule

- **Real-time trigger:** On every transaction, complaint, review, or activity event
- **Nightly batch:** Full recalc for all users (00:00 UTC)
- **Weekly adjustment:** Decay inactivity penalty (–1 per week, capped at –10)
- **On-demand:** Manual recalc by DMO Manager for appeals / disputes

#### Appeal Process

1. User → DMO → Files appeal (reason + evidence)
2. DMO Analyst reviews (24 hours)
3. If score < user's previous, manual manager review
4. Decision + reasoning logged to audit trail
5. If overturned, score reset + user notified

---

## 7. Reporting system  `[MERGED]`

| Report                        | Frequency | Audience            |
|-------------------------------|-----------|---------------------|
| Daily Platform Summary        | Daily     | DMO Director        |
| Weekly KPI Report             | Weekly    | HO Board            |
| Monthly Earnings Report       | Monthly   | Franchise + HO      |
| STL Distribution Report       | Weekly    | DMO Analysts        |
| Fraud Intelligence Report     | Weekly    | PSS Authority       |
| CRB Performance Report        | Monthly   | Franchise Chain     |
| Complaint Resolution Report   | Monthly   | All Franchise       |
| AML Compliance Report         | Monthly   | Legal + Compliance  |

**Generation pipeline:**
`Cron → fetch data from all modules → AI summarises trends + anomalies
→ PDF/Excel generated → delivered via email + dashboard → archived`

---

## 8. Communication channels  `[MERGED]`

| Channel           | Purpose                     |
|-------------------|-----------------------------|
| Platform bell     | All users                   |
| Email (SendGrid)  | Official notices            |
| WhatsApp API      | Urgent alerts               |
| SMS               | OTPs, critical              |
| Push notification | Mobile app users            |
| Dashboard banner  | Login-time warning          |
| In-app chat       | Direct to franchise / user  |

**Message types:** policy announcements, STL alerts, complaint updates, CRB
reminders, contract reminders, penalty notices, fraud warnings, welcome
messages.

---

## 9. RBAC — who can do what  `[MERGED]`

| Action           | SUPER | DIRECTOR | MANAGER | ANALYST | SUPPORT |
|------------------|-------|----------|---------|---------|---------|
| Override STL     | ✅    | ✅       | Limited | ❌      | ❌      |
| Ban account      | ✅    | ✅       | ❌      | ❌      | ❌      |
| Approve CRB      | ✅    | ✅       | ✅      | ❌      | ❌      |
| Resolve complaint| ✅    | ✅       | ✅      | ✅      | ✅      |
| View all data    | ✅    | ✅       | Module  | Module  | Limited |
| Issue penalty    | ✅    | ✅       | ✅      | ❌      | ❌      |
| Generate reports | ✅    | ✅       | ✅      | ✅      | ❌      |
| Manage DMO staff | ✅    | ✅       | ❌      | ❌      | ❌      |

---

## 10. Audit trail  `[MERGED]`

Every DMO action is logged to an immutable audit log.

**Fields:**

```
DMOAuditLog {
  id
  actionType         (STL_OVERRIDE / ACCOUNT_BAN / CRB_APPROVE / …)
  dmoUserId          (who did it)
  targetId           (affected user/entity id)
  targetType         (USER / FRANCHISE / COMPLAINT / CRB / STL / WALLET / …)
  previousValue      (JSON snapshot)
  newValue           (JSON snapshot)
  reason             (REQUIRED — cannot be blank)
  timestamp
  ipAddress
  sessionId
  blockchainHash     (optional, for critical actions)
}
```

**Rules:**
- No DMO action without a reason — system-enforced.
- All overrides require 2-step approval: propose → senior confirm.
- Logs are immutable (no edit / delete).
- High-risk actions (ban, freeze, termination) → Blockchain hash stored.
- Monthly audit review by DMO Director.

---

## 11. Advanced DMO features  `[MERGED]`

1. **AI Decision Assistant** — before a DMO manual decision, AI shows
   evidence summary, historical precedents, recommended outcome + confidence,
   appeal-likelihood. Human still decides.
2. **DMO Performance Scorecard** — each staff member scored on
   decision accuracy (appeal outcome), speed (SLA), volume. Monthly review.
3. **Real-Time Anomaly Feed** — 24/7 AI-streamed anomalies, colour-coded
   (red act / orange watch / yellow note), one-click to the relevant panel.
4. **Cross-Platform Fraud Intelligence** — fraud signal in any module
   triggers parallel checks across GoSellr + JPS + PSS + Wallet.
5. **Compliance Calendar** — auto-populates with KYC renewals, CRB refilling,
   franchise contract renewals, STL review dates. Staff assigned per item.
6. **DMO Knowledge Base** — searchable history of past decisions, auto-
   extracted precedents, institutional memory.

---

## 12. Database models (Prisma-style)  `[MERGED]`

```prisma
model DMOUser {
  id
  userId
  dmoRole              (DIRECTOR/MANAGER/ANALYST/SUPPORT/INSPECTOR)
  moduleAccess         String[]
  performanceScore     (0-100)
  casesHandled         Int
  decisionAccuracyRate Decimal
  isActive             Boolean
  joinedAt
}

model DMOAuditLog {
  id
  dmoUserId
  actionType
  targetId
  targetType      (USER / FRANCHISE / COMPLAINT / CRB / STL / WALLET / ...)
  previousValue   Json
  newValue        Json
  reason          (required)
  ipAddress
  sessionId
  blockchainHash  (optional)
  timestamp
}

model DMOAlert {
  id
  type            (FRAUD_SIGNAL / AML_FLAG / SLA_BREACH / ANOMALY / CRITICAL_COMPLAINT)
  priority        (CRITICAL / HIGH / MEDIUM / LOW)
  entityId
  entityType
  description
  assignedTo      dmoUserId?
  status          (NEW / ACKNOWLEDGED / IN_REVIEW / RESOLVED)
  createdAt
  resolvedAt
}

model DMOReport {
  id
  type            (DAILY_SUMMARY / WEEKLY_KPI / MONTHLY_EARNINGS / …)
  generatedAt
  generatedBy     (SYSTEM / dmoUserId)
  period
  fileUrl         (PDF / Excel)
  distributedTo   String[]
}

model PlatformConfig {
  key             (unique)
  value
  description
  lastUpdatedBy   (dmoUserId)
  lastUpdatedAt
  changeLog       Json
}
```

Total DMO-touching database footprint from `dmo-master-database.md`:
**~170–200 tables** across 15 modules. (Full list in the SOURCES file.)

---

## 13. API routes  `[MERGED]`

```
# Dashboard
GET    /api/dmo/dashboard              Overview stats + alerts
GET    /api/dmo/alerts                 All active alerts
PATCH  /api/dmo/alerts/[id]            Acknowledge / resolve

# PSS Controls
GET    /api/dmo/pss/queue              Pending manual reviews
PATCH  /api/dmo/pss/review/[id]        Approve / reject / flag

# CRB Controls
GET    /api/dmo/crb/queue              Pending CRB applications
PATCH  /api/dmo/crb/approve/[id]       Final approval
GET    /api/dmo/crb/reports            All inspection reports
PATCH  /api/dmo/crb/certificate/revoke Revoke certificate

# STL Controls
POST   /api/dmo/stl/override           Manual override
POST   /api/dmo/stl/freeze/[userId]    Freeze STL
POST   /api/dmo/stl/recalc/bulk        Bulk recalc
GET    /api/dmo/stl/appeals            Appeal queue
PATCH  /api/dmo/stl/appeals/[id]       Resolve appeal

# User Controls
GET    /api/dmo/users/[id]             Full user profile (all data)
POST   /api/dmo/users/[id]/ban         Ban account
POST   /api/dmo/users/[id]/freeze      Freeze account
POST   /api/dmo/users/[id]/restrict    Apply restriction

# Platform Config
GET    /api/dmo/config                 All settings
PATCH  /api/dmo/config/[key]           Update setting

# Reports
GET    /api/dmo/reports                All reports
POST   /api/dmo/reports/generate       Trigger generation
GET    /api/dmo/reports/[id]           Download

# Audit
GET    /api/dmo/audit                  Full audit log
GET    /api/dmo/audit/[dmoUserId]      Per-staff audit log

# AI
GET    /api/dmo/ai/anomalies           Real-time anomaly feed
GET    /api/dmo/ai/suggestions/[caseId] AI decision suggestion
```

---

## 14. Data flow  `[MERGED]`

### 14.1 High-level flow

```
User action (register / apply / transact / request service)
     ↓
Application layer (industry service processes the request)
     ↓
DMO processing (validation, verification, routing)
     ↓
       ┌──────────┼──────────┐
       ↓          ↓          ↓
     PSS        CRB        STL
   (if needed)(if needed)(always)
       ↓          ↓          ↓
       └──────────┼──────────┘
                  ↓
           DMO database (store processed data)
                  ↓
           Blockchain hash (immutable record for critical data)
```

### 14.2 Multi-region flow (data sovereignty)

```
User device
   → CDN (Cloudflare / CloudFront)
   → Country node (Pakistan / UAE / Germany / USA / …)
   → Regional hub (Asia Singapore / Europe Frankfurt / Americas Virginia)
   → Global DMO core (central coordination)
   → Blockchain registry (Polkadot)
```

**Core rule:** **USER DATA STAYS IN ITS ORIGINATING COUNTRY.**

| Data type          | Sync strategy          | Latency  |
|--------------------|------------------------|----------|
| User PII           | No sync (stays local)  | n/a      |
| STL scores         | Real-time sync         | < 1 sec  |
| Blockchain hashes  | Immediate              | < 5 sec  |
| Service listings   | Periodic (hourly)      | 1 hour   |
| Analytics          | Batch (daily)          | 24 hours |
| Certifications     | Real-time              | < 1 sec  |

---

## 15. Security model  `[MERGED]`

DMO is bank-level because it handles financial transactions, KYC, government
services, and sensitive business data.

**Security layers (top to bottom):**
1. **Perimeter** — WAF, DDoS protection, rate limiting, IP filtering
2. **Authentication** — password, OTP, biometric, face auth, FIDO2 hardware keys, MFA mandatory
3. **Authorization** — RBAC + ABAC + policy engine + permissions
4. **Application** — input validation, CSRF/XSS protection, API security
5. **Encryption** — AES-256 at rest, TLS 1.3 in transit, field-level encryption, mTLS between services
6. **Blockchain** — immutable audit logs, hash verification
7. **Monitoring** — SIEM, IDS/IPS, audit logs
8. **Incident response** — classify → contain → investigate → recover → post-mortem

**Session rules:**
- Session timeout: 30 min
- Max concurrent sessions: 3
- Secure cookies: `HttpOnly`, `Secure`, `SameSite`
- Session invalidation on password change

**Key management:**
- Master key in HSM (AWS KMS / Azure Key Vault / HashiCorp Vault)
- DEKs rotate every 90 days
- Hierarchical key derivation

**Incident SLAs:**

| Severity | Response time | Resolution time |
|----------|---------------|-----------------|
| Critical | 15 min        | 4 hours         |
| High     | 1 hour        | 24 hours        |
| Medium   | 4 hours       | 72 hours        |
| Low      | 24 hours      | 1 week          |

**Compliance frameworks:** GDPR, ISO 27001, PCI DSS, SOC 2, HIPAA, PECA, DIFC, CCPA, DPDP.

---

## 16. Admin dashboard (14-section sidebar)  `[MERGED]`

| Icon | Label | Route | Purpose |
|------|-------|-------|---------|
| 📊 | Dashboard                 | `/admin`               | Overview + stats |
| 👥 | User Management           | `/admin/users`         | All users |
| 🔧 | Service Providers         | `/admin/providers`     | Verified providers |
| 🏢 | Companies                 | `/admin/companies`     | Registered companies |
| 🏛️ | Government Officers       | `/admin/officers`      | DMO officers |
| 🌐 | Franchise Network         | `/admin/franchise`     | Franchises |
| ✅ | Verification (PSS)        | `/admin/pss`           | PSS reviews |
| 📋 | Certification (CRB)       | `/admin/crb`           | CRB certs |
| 📜 | Certificates & Licenses   | `/admin/certificates`  | Issued docs |
| 📝 | Application Management    | `/admin/applications`  | All applications |
| 💰 | Financial Management      | `/admin/finance`       | Txns, fees |
| 🔔 | Notifications & Penalties | `/admin/notifications` | Alerts |
| ⛓️ | Blockchain Records        | `/admin/blockchain`    | Immutable logs |
| ⚙️ | Settings                  | `/admin/settings`      | System config |

**Admin theme:** light mode. Background `#f8fafc`, sidebar `#1e293b`,
primary `#3b82f6`, success `#10b981`, warning `#f59e0b`, danger `#ef4444`.
This is the **only** approved divergence from the dark brand palette.

**Responsive:**
- Desktop > 1280 px → expanded sidebar (240 px) + full grid
- Tablet 768–1280 px → collapsed sidebar (64 px) + 2 columns
- Mobile < 768 px → drawer sidebar + 1 column

---

## 17. DMO workspace (dark-mode, inside `/dmo/*`)  `[MERGED]`

Inside the user-facing dark app, DMO is exposed via
`components/dmo/DmoSectionWorkspace.tsx` with keys:

| Key | Base route | Notes |
|-----|------------|-------|
| `pss`         | `/dmo/pss`          | Flagged ID review, blacklist |
| `crb`         | `/dmo/crb`          | Certificates, inspections |
| `stl` (label "EHB-STL") | `/dmo/stl` | Override, freeze, appeals, recalc |
| `jps`         | `/dmo/jps`          | Designations, exams, contracts |
| `franchise`   | `/dmo/franchise`    | Applications, KPIs, audits |
| `applications`| `/dmo/applications` | Intake workflows |
| `approvals`   | `/dmo/approvals`    | Approval pipelines |
| `industry`    | `/dmo/industry`     | Verification queue |
| `automation`  | `/dmo/automation`   | Rules, triggers, fraud |
| `refilling`   | `/dmo/refilling`    | 6-month cycle |
| `affiliate`   | `/dmo/affiliate`    | Affiliate governance |

**EHB-STL sub-views:** `scores` | `breakdown` | `history` | `ranking`.

**Open product decisions** (from FLOW-P3):
- GoSellr + Wallet dedicated DMO routes vs nested under existing sections.
- `penalty` / complaint tier views — final URL list vs plan Part 4.8.

---

## 18. Tech stack (DMO-specific)  `[MERGED]`

| Component        | Technology                     |
|------------------|--------------------------------|
| ML framework     | TensorFlow / PyTorch           |
| Model serving    | TensorFlow Serving             |
| Feature store    | Feast                          |
| MLOps            | MLflow / Kubeflow              |
| Stream processing| Apache Flink                   |
| Rules engine     | Drools / custom                |
| Message queue    | Kafka                          |
| Cache            | Redis cluster                  |
| Search           | Elasticsearch                  |
| Storage          | S3 + IPFS                      |
| Blockchain       | Polkadot                       |
| Container        | Kubernetes (EKS / GKE)         |
| Load balancer    | AWS ALB / Nginx                |
| Key mgmt         | HSM + AWS KMS / Vault          |

---

## 19. Advanced planning suggestions  `[SUGGESTION]`

These propose structural improvements to DMO based on gaps I noticed
while merging the legacy docs. Each one is stand-alone and cheap to
implement relative to the platform's ambition.

### 19.1 `[SUGGESTION]` DMO event bus namespace
Today's DMO has no canonical event namespace. Define:

```
dmo.events.pss.flagged
dmo.events.pss.cleared
dmo.events.crb.submitted
dmo.events.crb.approved
dmo.events.crb.revoked
dmo.events.stl.dropped
dmo.events.stl.overridden
dmo.events.wallet.aml_flagged
dmo.events.wallet.escrow_disputed
dmo.events.franchise.audit_failed
dmo.events.franchise.terminated
dmo.events.complaint.tier5_escalated
dmo.events.fraud.detected
dmo.events.policy.changed
dmo.events.kill_switch.toggled
```

Every DMO panel becomes a consumer of the same stream. New modules just
subscribe — no new plumbing per feature.

### 19.2 `[SUGGESTION]` Canonical `DMOAction` wrapper
Replace ad-hoc override / ban / freeze / approve APIs with a single
`POST /api/dmo/action` endpoint that takes a `DMOAction` envelope:

```ts
type DMOAction =
  | { type: 'STL_OVERRIDE'; target; newScore; reason }
  | { type: 'ACCOUNT_BAN'; target; reason; duration? }
  | { type: 'CRB_APPROVE'; application; notes }
  | { type: 'CRB_REVOKE';  certificate; reason }
  | { type: 'WALLET_FREEZE'; wallet; reason }
  | { type: 'KILL_SWITCH';  industry; on }
  | ...
```

Every action funnels through the same validation, audit-log write,
blockchain hook, RBAC check, and 2-step confirmation. One codepath, one
test suite, one failure mode.

### 19.3 `[SUGGESTION]` Kill-switch pattern per industry
`dmo.kill-switch.<industry>` config key. If DMO Director flips it, all
**writes** in that industry pause with a friendly "temporarily paused for
audit" banner, but **reads** keep working. Lets DMO contain incidents
surgically without nuking UX.

### 19.4 `[SUGGESTION]` Decision latency SLA per action type
Today DMO has incident SLAs (from security doc) but not decision SLAs.
Add, for example:

| Action type         | Max latency        |
|---------------------|--------------------|
| PSS manual review   | 24 hours           |
| CRB approval        | 72 hours           |
| STL override        | 1 hour             |
| Ban                 | 15 minutes         |
| Complaint tier 5    | 48 hours           |

DMO Performance Scorecard already exists — wire it to these SLAs and show
a red flag when staff consistently misses them.

### 19.5 `[SUGGESTION]` Blockchain-anchor batching
Polkadot writes are expensive. Batch hashes Merkle-tree style, commit the
root hourly, per-certificate proof = Merkle path. 2–3 orders of magnitude
cheaper, same verification guarantees.

### 19.6 `[SUGGESTION]` AI decision telemetry
Log every `{ AI-proposed outcome, DMO-confirmed outcome, disagreement-reason }`
triple to `dmo_ai_decisions`. After 90 days, compute agreement rate per module.
If DMO consistently overrides AI in (say) CRB, the CRB model is miscalibrated
and needs retraining. This is the only way to prevent AI drift from silently
rotting governance.

### 19.7 `[SUGGESTION]` "DMO diff" audit viewer
Every DMO action already stores `previousValue + newValue`. Render these as
a side-by-side coloured diff (git-log style). Regulators and franchise
auditors read the platform's governance history like a code diff. Cheap
to build, huge value for GDPR / PECA / DIFC conversations.

### 19.8 `[SUGGESTION]` Refilling calendar as a platform primitive
Ship a `<RefillingCalendar />` component (red = overdue, amber = grace,
green = fresh). Every industry card reuses it. DMO inspectors see the
same component scoped to their assigned franchises.

### 19.9 `[SUGGESTION]` Franchise scorecard → STL feedback loop
Feed franchise KPI back into provider STL ceiling. A bad franchise slightly
caps its providers' STL until the franchise cleans up. Penalises lazy
franchises without directly punishing individual providers.

### 19.10 `[SUGGESTION]` DMO public audit report
Monthly public-facing report: "this month DMO issued X certs, banned Y
accounts, resolved Z complaints, overrode STL N times, paid out
$M in franchise commissions." Publicly verifiable via blockchain anchors.
This is a **trust amplifier** — most platforms hide their governance;
publishing it becomes a competitive moat.

---

## 20. Open questions for the user `[AWAITING USER INPUT]`

Before I can fully plan DMO's internal data and user flow, I need
the following from you. Please answer in the order that's easiest — I will
merge each answer into the right section above.

### 20.1 DMO operating model
- [ ] Is DMO **centralised** (single HQ staff + AI) or **federated**
      (each country has its own DMO node with a global coordinator)?
      — the legacy docs hint at both; which is the current direction?
- [ ] Who is the very first DMO Director in real life (single name / role)?
      This determines whose approval flow we build first.
- [ ] How many DMO staff are expected at launch (Phase-1)? 5? 20? 100?

### 20.2 DMO user flow (the 8 steps)
- [ ] Confirm the 8 steps still map as:
      `Register → JPS → STL init → PSS → CRB → DMO approval → Score → Active`
- [ ] Where does **Wallet setup** sit in this flow — before PSS, during DMO
      approval, or after Active?
- [ ] What's the **user UX** during DMO approval — a waiting screen, an
      email, or something else? How long should they expect to wait?

### 20.3 DMO decision rights
- [ ] Which decisions absolutely **must** reach a human (not AI-only)?
      Current merged list is in §5.2 — please confirm or edit.
- [ ] Should L8 SUPREME STL require **1** manual approval or **2** (dual
      control)?
- [ ] Can a DMO Manager unilaterally override a Director's decision?
      Current matrix in §9 says no — confirm?

### 20.4 DMO economics
- [ ] Does DMO take a **cut** of platform revenue to fund itself, or is it
      funded by EHB HQ directly?
- [ ] How are DMO staff bonuses calculated — tied to the Performance
      Scorecard only, or also to franchise KPIs?

### 20.5 DMO data & sovereignty
- [ ] Confirm: **all PII stays in originating country**, global DMO only
      sees metadata + hashes. Legacy docs say yes — confirm for 2026?
- [ ] Which countries are launch-critical for DMO compliance? Pakistan and
      UAE only, or is EU/US in Phase-1?
- [ ] Is there any regulation requiring **local government access** to
      the DMO audit log? (PK / UAE / EU — each has different rules.)

### 20.6 DMO ↔ other systems
- [ ] **DMO ↔ STL:** should STL overrides be **instant** (applied + hashed)
      or **staged** (visible to user only after 24h review window)?
- [ ] **DMO ↔ CRB:** does a DMO rejection kill the CRB certificate, or
      does the certificate stay valid with a "DMO flagged" overlay?
- [ ] **DMO ↔ Wallet:** if DMO freezes a wallet, can the user still receive
      refunds from existing bookings?
- [ ] **DMO ↔ Complaint:** when a complaint is resolved at Tier 5, does
      that auto-trigger an STL recalc for both parties?

### 20.7 DMO UI priorities
- [ ] For the **first UI build**, which 3 DMO panels are most important?
      (PSS? CRB? STL? Franchise? Wallet/AML? Complaint?)
- [ ] Should the dark-mode `/dmo/*` workspace and the light-mode
      `/admin/*` dashboard be **two separate apps** or **one app with a
      theme toggle**?
- [ ] Target first launch date for the DMO dashboard (internal / external)?

### 20.8 DMO governance of itself
- [ ] Who audits DMO? Is there an external auditor role, or is it
      DMO Director → Board → Blockchain proof = public audit?
- [ ] Do DMO audit logs ever get published publicly (full or redacted),
      or are they strictly internal?

### 20.9 Phase-1 MVP cut
- [ ] Of everything listed in §4, what's the **minimum** set that must
      ship for DMO to be "usable" at Phase-1 launch?
- [ ] What can be faked with mock data / dashboards for launch and
      replaced with real automation in Phase-2?

### 20.10 Anything else
- [ ] Anything legacy docs got **wrong** about DMO that I should ignore?
- [ ] Any specific DMO feature you have in mind that is **not** in any
      legacy doc — I should capture it here before building.

---

## 21. Implementation status (live)

| Area | Source-of-truth doc | Code location | Status |
|------|---------------------|----------------|--------|
| DMO dashboard UI        | `components/dmo/DmoSectionWorkspace.tsx` | `apps/web/` | PARTIAL |
| `/api/dmo/queue`         | routes/dmoRoutes.js | `services/api/stl-replit/` | LIVE |
| `/api/dmo/fraud`         | routes/dmoRoutes.js | `services/api/stl-replit/` | LIVE |
| STL override API         | —                   | —                          | PENDING |
| CRB approve API          | —                   | —                          | PENDING |
| Wallet freeze API        | —                   | —                          | PENDING |
| Audit log storage        | —                   | —                          | PENDING |
| AI decision assistant    | —                   | —                          | PENDING |
| Blockchain anchor        | —                   | —                          | PENDING (Phase-3) |
| Real-time anomaly feed   | —                   | —                          | PENDING |
| Admin dashboard          | `docs/ui-ux/dmo-admin-system.md` | — | NOT STARTED |

---

---

## 22. BATCH 1 — User input (2026-04-11) — canonical updates  `[USER INPUT]`

> Rafi ne 2026-04-11 ko DMO + STL + GoSellr ka poora spec bheja (9 Claude
> prompts + roadmap + API + frontend + database). Yeh section uss batch
> ko merge karta hai, contradictions flag karta hai, aur gaps list karta hai.
>
> **Rule:** Jahan bhi legacy docs se contradiction hai, Batch-1 user input
> ko **draft canonical** bana raha hun — lekin Rafi ki final confirmation
> tak §29 mein `[CONFLICT]` marker laga hai.

### 22.1 STL — now 10 levels (was 9)  `[CONFLICT with legacy L0–L8]`

| # | Level     | Score band | Coins (EHBGC) | Locked coins | Refills | Complaints allowed |
|---|-----------|-----------|---------------|--------------|---------|--------------------|
| L1 | FREE     | 0–20      | 0             | 0            | 0       | Low limit          |
| L2 | BASIC    | 21–40     | 50            | 20           | 1       | 2–6                |
| L3 | NORMAL   | 41–60     | 100           | 40           | 2       | 2–6                |
| L4 | STANDARD | 61–75     | 250           | 100          | 3       | 8–14               |
| L5 | ADVANCED | 76–85     | 500           | 200          | 4       | 8–14               |
| L6 | HIGH     | 86–92     | 1 000         | 400          | 5       | 8–14               |
| L7 | PRO      | 93–96     | 2 000         | 800          | 6       | Strict             |
| L8 | VIP      | 97–98     | 5 000         | 2 000        | 7       | Strict             |
| L9 | ELITE    | 99        | 10 000        | 4 000        | 8       | Strict             |
| L10 | SUPREME 👑 | 100     | 25 000+       | 10 000+      | 10+     | Strict             |

**Legacy conflict:** `docs/EHB_CONTEXT.md`, `CLAUDE.md`, and
`ehb-info/EHB-MASTER-INFO.md §4.3` all document STL as **L0 → L8 SUPREME**
(9 levels). Batch-1 says **L1 → L10 SUPREME** (10 levels). The
gold-master `stlService.js` + 58 regression tests are built on the L0–L8
model. Any rewrite to 10 levels will **break the STL test suite** and must
be planned as a formal migration (see §29.1).

### 22.2 STL master rule — "lowest = final"  `[NEW]`

```
FINAL EHB-STL = MIN(
  productSTL,
  sellerSTL,
  companySTL,
  ownerSTL
)
```

Anti-fraud invariant: agar kisi bhi layer ka STL `FREE` hai to poora
product `FREE` show karega. Yeh legacy `MIN(score, lock, pss, crb, dmo)`
rule ke upar **ek aur layer** hai — legacy rule user-level pe lagta hai,
yeh rule product-display-level pe lagta hai.

**Implementation:** naya API `POST /api/stl/validate-product` takes
`{ productId, sellerId, companyId, ownerId }` → returns `finalStl, blockingLayer`.

### 22.3 Coin-lock + refill + complaint table (L1–L10)
See §22.1 — combined table for fast lookup. This is the **source of truth**
for the STL requirement matrix going forward.

### 22.4 STL scoring formula (Batch-1)  `[NEW]`

```
STL_SCORE =
  (PSS_WEIGHT   × trustScore)         +   // trust
  (CRB_WEIGHT   × verification+refill) +   // skill
  (DMO_WEIGHT   × activity+behaviour)  +   // engagement
  (LOCK_WEIGHT  × lockedCoins)         -   // economic stake
  (COMPLAINT_PENALTY × validComplaints)    // punishment
```

**Missing from user input** — exact numeric weights. I will assume
equal 25 % split across PSS/CRB/DMO/Lock with complaints as a raw
deduction, until Rafi confirms. `[AWAITING USER INPUT § 29.2]`

### 22.5 Upgrade conditions  `[NEW]`
All of the following must be TRUE simultaneously:
- PSS trust stable
- CRB verification **complete for that level**
- Required refill done
- Required coins locked (see §22.1)
- Complaints within the allowed ceiling
- DMO activity sufficient
→ Only then `upgradeEligible = true`.

### 22.6 Downgrade conditions  `[NEW]`
Any ONE of these triggers a downgrade:
- Complaints exceed level ceiling
- Locked coins drop below requirement
- Activity drops significantly (DMO threshold TBD)
- CRB refill expired
- Fraud detected by DMO Up-Guard

---

### 22.7 DMO now has 18 modules (was 8)  `[EXPANDED]`

Batch-1 canonical module list:

| # | Module | Primary job |
|---|--------|-------------|
| 1  | Dashboard (Overview)          | Real-time system state view |
| 2  | STL Management                | Level tracking, upgrade/downgrade |
| 3  | PSS Monitoring                | Trust, KYC, complaints |
| 4  | CRB Monitoring                | Verification, exams, refills |
| 5  | Activity Engine               | Track every user action |
| 6  | Task System                   | Dynamic task assignment |
| 7  | Earnings Engine               | Base + bonus + penalty |
| 8  | Up-Guard (Fraud System)       | Anomaly + fake-earning detection |
| 9  | AI Assistant                  | Suggestions, prioritisation |
| 10 | Blockchain Control            | Write to chain, verify hashes |
| 11 | Wallet Control                | Total / locked / available balance |
| 12 | Applications / Approvals      | Role + feature requests |
| 13 | Complaints Management         | Submission → review → penalty |
| 14 | Refill Management             | Schedule + enforce |
| 15 | Franchise Control             | Separate STL, network KPIs |
| 16 | Analytics & Reports           | Daily/weekly/monthly insights |
| 17 | Notifications System          | Info / warning / alert tiers |
| 18 | Settings / Permissions        | Config, roles, kill switches |

**Legacy conflict:** `EHB_DMO_PLAN.md` says DMO has 8 core module panels
(PSS, CRB, STL, GoSellr, JPS, Franchise, Wallet+AML, Complaint). Batch-1
expands this to 18 including operational tools (Tasks, Earnings, Up-Guard,
Activity, AI, Blockchain, Applications, Refill, Analytics, Notifications,
Settings). **I am treating Batch-1 as canonical** — 8 was a subset view,
18 is the full ops view.

### 22.8 "Dashboard Management Office" vs "Decentralized Management Office" `[CONFLICT]`

Batch-1 uses **both** names:
- "DMO (Dashboard Management Office)" — in the Module-9 prompt for STL
- "DMO (Decentralized Management Office)" — in the governance prompt

Legacy docs consistently use **"Decentralized Management Office"**.
I am keeping **Decentralized** as canonical because:
- It already appears in `CLAUDE.md`, `EHB_CONTEXT.md`, `EHB_DMO_PLAN.md`
- "Decentralized" matches the blockchain + franchise + multi-country model
- "Dashboard" is too UI-centric for a governance layer

Rafi — confirm? `[AWAITING USER INPUT § 29.3]`

---

### 22.9 Activity Engine + Task System — full detail  `[NEW]`

**Activity engine tracks:** login frequency, time on platform, orders,
service usage, CRB/PSS/wallet interactions. Every action → activity score delta.

**Task types:**
1. **Mandatory** — CRB verification, refill completion, profile completion
2. **Growth** — complete services, improve wallet balance
3. **Bonus** — extra actions for extra rewards

**Dynamic generation rule:**
```
if (user.crb.incomplete)      → task("Complete 2 verifications")
if (user.refill.missing)      → task("Add 1 refill")
if (user.wallet.low)          → task("Lock 500 more coins")
if (user.activity.low)        → task("Complete 3 orders this week")
```

**Task completion flow:** assign → user action → system verify → mark
complete → reward (STL score +, activity score +, earnings unlock).

**Edge cases:**
- New user → simple tasks only
- Advanced user → complex tasks
- Inactive user → re-engagement tasks
- Overactive (suspicious) → route to Up-Guard

### 22.10 Earnings Engine + Up-Guard — full detail  `[NEW]`

**Earning types:**
1. **Base** — fixed per action
2. **Bonus** — high activity, high STL
3. **Commission** — service / marketplace income
4. **Penalty deduction** — bad performance, complaints

**Calculation flow:**
```
action → eligibility check → base earning → add bonuses →
  subtract penalties → send to Up-Guard → approved/pending/rejected →
  credit to wallet
```

**Up-Guard fraud detection signals:**
- 10× earning spike in short window
- Repeated identical actions (bot pattern)
- High earning but low activity (inconsistency)
- Known bot-like browsing fingerprints

**Up-Guard actions:**
- Suspicious → flag account, mark earnings `pending`
- Confirmed fraud → freeze wallet, block earnings, manual review

**Earning status states:** `pending | approved | rejected`.
**Risk levels:** `LOW | MEDIUM | HIGH`.

**Rule:** Earnings never bypass Up-Guard. Even admin-triggered earnings
go through the validation pipeline.

### 22.11 Wallet + Blockchain — Batch-1 canonical  `[NEW]`

**Wallet structure (3 balances):**
1. Total balance
2. Locked balance (STL requirement, cannot be used)
3. Free balance (usable)

**Lock rules:**
- Each STL level requires a minimum locked coin amount (see §22.1)
- Lock duration: 1–3 years (Batch-1 mentions "optional")
- Unlocking below requirement → downgrade risk

**Blockchain phased roadmap:**
1. **Phase 1** — Binance Smart Chain (BSC) for fast launch
2. **Phase 2** — Mosaic blockchain
3. **Phase 3** — Polkadot parachain (long-term)

**Legacy conflict:** `EHB_CONTEXT.md` + `CLAUDE.md` + MASTER file all
hard-code Polkadot as the blockchain. Batch-1 introduces BSC → Mosaic →
Polkadot as a 3-phase progression. **Treating Batch-1 as canonical** —
BSC for Phase-1 launch makes infinitely more sense than waiting for
Polkadot parachain provisioning. `[MASTER file §4.8 needs update]`

**Blockchain records (what goes on-chain):**
- Transactions above threshold
- Coin locks (immutable proof of stake)
- STL milestone changes
- Verification records (CRB)
- Critical DMO actions (bans, freezes)

---

### 22.12 PSS — Trust Engine (Batch-1 canonical)  `[MERGED]`

**Full name correction:** Batch-1 says
**PSS = Personal Security System**, not "Proof & Security System" (legacy).
I am treating Batch-1 as canonical. `[CONFLICT 29.4]`

**PSS validates:**
- Identity (CNIC/Passport)
- Face verification (selfie match)
- Contact verification (email/phone)
- Profile completeness
- Complaint history

**Verification levels:** `Unverified | Basic Verified | Fully Verified`.
**Trust score inputs:** KYC completion, profile completeness, complaint
history, behaviour.

**Complaint handling flow:**
1. Complaint submitted
2. Stored + reviewed (auto or manual)
3. Decision: valid → penalty, invalid → ignore
4. Trust score updated

**Penalty actions:**
- Fake info → penalty, STL downgrade
- High complaint ratio → account restriction
- Fraud → account suspension (extreme cases)

**Edge cases:**
- New user → low trust default (seeded)
- Fake KYC → immediate penalty
- Complaint spike → Up-Guard alert

### 22.13 CRB — Skill + Refill Engine (Batch-1 canonical)  `[MERGED]` `[RESOLVED 2026-04-19]`

**Full name correction:** CRB = **Central Record Blockchain** (confirmed by founder 2026-04-19).
Previously conflicted between "Certification & Refill Board", "Certification & Registry Board",
and "Certification & Regulatory Board". Naming now unified.

**CRB responsibilities:**
- Skill verification (digital)
- Physical verification (via franchise)
- Exam system (theory / practical / service-based)
- Refill system — **activity renewal** ensures user stays active
- Multimedia proof validation (video, image, document, audio)

**Verification types:**
- Basic
- Advanced
- Professional
(Higher STL requires more + higher-tier verifications)

**Refill rules (per §22.1):** L2→1, L3→2, L4→3, L5→4, L6→5, L7→6, L8→7,
L9→8, L10→10+. Missing refill → upgrade blocked → downgrade risk.

**Multimedia proof:**
- User uploads video / image / document / audio
- AI-based auto-validation (authenticity, consistency)
- Manual review (franchise) for edge cases

**Failure conditions:** exam failed / verification rejected / refill missing
→ upgrade blocked and score reduced in some cases.

---

### 22.14 GoSellr — user types + STL impact  `[NEW]`

GoSellr marketplace has **2 main categories**, each with sub-types:

#### Category A — Service Providers
1. **Sellers (product)** — STL controls product listing limit, daily order
   limit, visibility ranking, commission rate. High STL → featured, low
   commission. Low STL → limited, high commission.
2. **Riders (delivery)** — STL controls order assignment, route priority,
   earning per delivery.
3. **Service Providers (skill-based)** — STL controls service ranking,
   visibility, pricing power. CRB + STL together decide credibility.
4. **Companies / Brands** — STL controls featured-brand status, bulk-order
   eligibility, commission tier.

#### Category B — Franchisers  `[SEPARATE STL system]`
Franchise STL is **independent** from provider STL. Four franchise tiers:

| Tier | Coin lock (EHBGC) |
|------|------------------|
| Online Franchise  | 5 000 |
| City Franchise    | 20 000 |
| State Franchise   | 50 000 |
| Country Franchise | 100 000+ |

**Role:** system management, CRB verification, user onboarding, quality
control. High franchise STL → more control + more earnings + area dominance.

**Downgrade triggers:** low performance, high complaints, low coin balance.

### 22.15 GoSellr order flow — 10 canonical steps  `[NEW]`

```
1. Product / service browsing          (STL-ranked results)
2. Order creation                      (buyer places order)
3. Order validation                    (seller STL, product verified, availability)
4. Order assignment                    (rider for product, direct for service)
5. Order execution                     (seller prepares / provider performs)
6. Order completion                    (buyer confirms / auto-confirm)
7. Earning distribution                (see §22.16)
8. STL impact                          (seller/rider/provider STL recomputed)
9. Complaint handling (if any)         (PSS + STL impact)
10. Up-Guard check                     (fake order / abnormal pattern detection)
```

**Order statuses:** `pending | accepted | in_progress | completed | cancelled | disputed`.

### 22.16 Revenue split for GoSellr orders  `[CONFLICT with legacy franchise split]`

Batch-1 canonical split for **product orders**:

| Party    | Share |
|----------|-------|
| Seller   | 70%   |
| Rider    | 10%   |
| Franchise| 10%   |
| Platform | 10%   |

**Legacy conflict:** `CLAUDE.md`, `EHB_CONTEXT.md`, and
`EHB-MASTER-INFO.md §7` document the split as **40 % provider / 25 % sub /
20 % corporate / 15 % country** — that is the **franchise-network revenue
split** (how platform revenue is distributed across the 4-tier franchise
hierarchy).

These are **two different splits for two different things:**
1. **Order split** (Batch-1) — where each paid order's money goes:
   seller / rider / franchise / platform.
2. **Franchise split** (legacy) — where the platform's 10 %-15 % slice is
   sub-distributed across country → corporate → sub franchises.

**Resolution:** keep both. Treat the Batch-1 order split as the
**outer split** and the legacy 40/25/20/15 as the **inner split** of the
franchise share. Rafi — confirm this reading? `[AWAITING § 29.6]`

### 22.17 Product card — UI anti-fraud spec  `[NEW]`

Every product card on the marketplace must show the full STL chain so
buyers can see the weakest link:

```
[Product name]
⭐ EHB-STL: <final = MIN of below>
  Product STL   : <level>
  Seller STL    : <level>
  Company STL   : <level>
  Owner STL     : <level>
🔁 Refills verified : N
🧪 CRB verified    ✔/✗
🔐 PSS trusted     ✔/✗
🧠 DMO active      ✔/✗
⭐ Rating           : 4.8 (advanced ratings breakdown by STL tier)
```

**Rule:** if final EHB-STL is FREE (because one layer is FREE), the card
shows a red "NOT VERIFIED" overlay even if the other 3 layers are VIP.
This is the platform's core anti-fraud invariant.

### 22.18 Product detail page — "Amazon + EHB" spec  `[NEW]`

Beyond normal Amazon data (price, images, description, reviews), the
detail page shows **4 EHB-exclusive panels**:

1. **Trust panel** — full STL chain breakdown
2. **Verification panel** — CRB, PSS, DMO, refill count
3. **Industry analysis** — industry-specific safety scores
   (e.g. "Electronics 92 %, Health 70 %, Battery risk: medium")
4. **Franchise verification** — which franchise(s) certified this product
5. **Advanced ratings** — ratings segmented by rater's STL tier
   (`VIP rating: 4.9 | ELITE: 4.8 | Normal: 4.5`)
6. **Refill history** — last 5 refill timestamps

**Why segmented ratings:** a VIP rating is more trustworthy than a FREE
rating. Legacy docs do not capture this. Batch-1 makes it explicit.

---

### 22.19 Full DMO + GoSellr API surface (Batch-1)  `[NEW]`

Top-level namespace structure:

```
/api/
  auth/         register · login · me · logout
  users/        profile · update · :id
  stl/          status · history · check-upgrade · validate-product
  pss/          status · kyc-submit · complaints · complaint-submit
  crb/          status · upload-proof · submit-exam · refill · history
  dmo/          dashboard · tasks · task-complete · activity · risk-status
  products/     list · :id · create · update · :id/stl
  orders/       create · :id · user · assign-rider · complete · cancel · validate
  riders/       available · assign · profile
  wallet/       get · lock · transfer · history
  earnings/     list · calculate · history · distribute
  franchise/    list · apply · performance
  complaints/   create · user · resolve
  notifications/list · send
  analytics/    user · system
  security/     check         (Up-Guard)
```

**New anti-fraud API:** `POST /api/stl/validate-product` —
input `{ productId, sellerId, companyId, ownerId }` →
output `{ finalStl, blockingLayer, passes[4], finalRisk }`.

**New earning API:** `POST /api/earnings/distribute` —
automatically splits each order per §22.16.

**New security API:** `POST /api/security/check` — Up-Guard validation
called from every earning event.

This surface is **not yet reflected in `services/api/stl-replit/routes/`**
— it's a net-new spec. Migration plan required (see §29.8).

### 22.20 Frontend pages + user journey (Batch-1)  `[NEW]`

| # | Page | Key data |
|---|------|----------|
| 1 | Home                | Slider, search (STL-filtered), categories, featured, top sellers, nearby, franchise, roadmap |
| 2 | Product listing     | Filters (STL / price / location / verification), STL-ranked cards |
| 3 | Product detail 🔥   | Trust panel + verification panel + industry analysis + franchise verification + segmented ratings + refill history |
| 4 | Cart / checkout     | Shows seller STL + product STL + final EHB-STL before confirm |
| 5 | Order tracking      | Live status + rider STL + rating |
| 6 | User dashboard      | STL · earnings · tasks · wallet · orders · notifications |
| 7 | DMO dashboard 🧠    | Activity score · risk level · earnings · tasks · AI suggestions |
| 8 | Seller dashboard    | Products · orders · earnings · STL · verification |
| 9 | Rider dashboard     | Available orders · active delivery · earnings · STL |
| 10| Franchise dashboard | Users · verifications · earnings · performance · complaints |

**User journey:** `Home → Search → Product card → Detail → Order →
Track → Review → Repeat`. Every step is STL-aware.

---

### 22.21 Implementation roadmap — 7 phases (Batch-1)  `[NEW]`

| Phase | Title                     | Modules |
|-------|---------------------------|---------|
| 1 | Core Foundation               | Dashboard, STL basic, Wallet basic, Activity tracking |
| 2 | Trust + Verification          | PSS, CRB (KYC, complaints, uploads, refill, basic exams) |
| 3 | Behaviour + Earning           | Activity engine, Task system, Earnings engine, Up-Guard basics |
| 4 | Governance + Control          | Applications, Approvals, Complaint decisions, Penalties |
| 5 | Analytics + AI                | Reports, alerts, smart recommendations |
| 6 | Blockchain Integration        | BSC → Mosaic prep → Polkadot plan |
| 7 | Scaling + Optimisation        | Redis cache, background jobs, rate limiting, logging |

**Legacy conflict:** `EHB_CONTEXT.md` already has a **70-day 5-phase**
roadmap (Days 1–3 bring-up / 4–14 hardening / 15–28 STL+DMO / 29–42
wallet+franchise / 43–56 AI / 57–70 launch). Batch-1's 7-phase roadmap is
more **architectural** (what gets built) vs legacy's **time-based**
(when). **Treating them as complementary** — legacy = calendar, Batch-1 =
dependency order. Both get pinned.

### 22.22 Auto-development agent system (Batch-1)  `[NEW]`

Batch-1 proposes splitting development across **6 parallel AI agents**,
each owning one folder under `services/`:

```
Agent 1 → services/stl/         → STL engine + scoring
Agent 2 → services/pss/         → Trust + KYC
Agent 3 → services/crb/         → Verification + refill + exams
Agent 4 → services/dmo/         → Control center + dashboard
Agent 5 → services/wallet/      → Wallet + blockchain
Agent 6 → services/analytics/   → Reports + notifications
```

**Isolation rules:**
- Each agent works only in its own folder
- No cross-imports (only through APIs)
- Shared utilities go in `packages/`
- No duplicate logic

**Legacy conflict:** Today the backend is a **single monolith** at
`services/api/stl-replit/`. Batch-1 wants **microservice-per-module**.
Migration is non-trivial — I flag this as `[STRATEGIC DECISION 29.9]`.

### 22.23 Database schema plan — tables by module  `[NEW]`

Batch-1 proposes 10 table groups (complementary to legacy's 15-module,
~170-200-table spec in `dmo-master-database.md`):

| Group | Tables (conceptual) |
|-------|---------------------|
| Users         | id, name, email, phone, role (user/provider/franchise), created_at |
| STL           | level, score, history |
| PSS           | kyc_status, trust_score, complaints_count, verification_level |
| CRB           | verification_records, exam_results, refill_records, multimedia_uploads |
| DMO           | activity_logs, task_assignments, task_completion, risk_flags |
| Wallet        | total_balance, locked_balance, transactions, coin_lock_records |
| Earnings      | history, bonus, penalties, status |
| Governance    | applications, approvals, complaints |
| Analytics     | activity_reports, performance_logs |
| Notifications | messages, alerts, status |

**Integration with legacy:** legacy's 15-module / 170-200-table spec is
**more granular**. Batch-1's 10-group view is the **simplified launch
plan**. I am treating them as **phase-1 (Batch-1 groups)** and **phase-2+
(legacy granular)**.

---

### 22.24 STL popup / hover detail (Batch-1 UI spec)  `[NEW]`

When a user hovers over their STL badge:

```
EHB-STL LEVEL: <label> (L<n>)
─────────────────────────────
PSS    → Verified (Score: 72 %)
CRB    → Verification: 3/5 · Exams: 4/5 · Refill: 3/4
DMO    → Activity: Active · Earning: Growing · Tasks: 70 % complete
Wallet → Total: X · Locked: Y / required
```

This becomes a shared component: `<STLDetailPopover />` in `packages/ui/`.

---

## 23. My analysis — problems, gaps, new suggestions

### 23.1 Problems in Batch-1 itself (what I would fix)

1. **STL weight numbers missing.** §22.4 formula has no numeric weights.
   I will draft 25/25/25/25 + complaint deduction unless Rafi picks other
   numbers.
2. **Lock duration ambiguous.** Batch-1 says "1–3 years, optional" — that
   is too loose for production. I'll propose a 12-month minimum lock
   with an optional 36-month bonus tier that adds +5 % earnings.
3. **"Dashboard Management Office" naming bug** — §22.8.
4. **Revenue split contradiction** — §22.16. I proposed the "outer + inner"
   resolution but Rafi must confirm.
5. **Up-Guard thresholds are vague.** "10× earning spike" is mentioned
   but the baseline (spike against what window?) is not defined. I will
   draft: "spike vs trailing 7-day median × 10".
6. **Task generation rules are hard-coded in prose.** They should live in
   a `packages/config/src/task-rules.ts` JSON-like file so the user can
   add/remove rules without code changes.
7. **No timeout for "pending" earnings.** If an earning sits in
   `pending` forever, the wallet grows stale. Draft rule: pending > 72 h
   → auto-escalate to DMO manual review, > 7 days → auto-reject with
   appeal window.
8. **Order validation step 3 lacks company-trust check.** Steps check
   seller STL but not company STL, even though §22.17 requires the
   full chain. I will add `companySTL` to the order-validation API.

### 23.2 Gaps between Batch-1 and legacy

1. **Complaint Tier 1-6 system** (legacy) is not mentioned in Batch-1.
   Keeping it from legacy.
2. **Blockchain anchor batching / Merkle tree** (my suggestion §19.5) is
   not in Batch-1. Still recommend for cost reduction on BSC.
3. **DMO Event Bus** (my suggestion §19.1) is not in Batch-1. Without it,
   the 6-agent auto-dev plan (§22.22) will struggle to sync state.
4. **Multi-region / data sovereignty** (legacy §14.2) is not in Batch-1.
   Assuming still canonical because PECA/DIFC/GDPR require it.
5. **Kill-switch per industry** (my suggestion §19.3) — recommended.

### 23.3 New suggestions (on top of §19)

**S1. STL 10-level migration plan** — since Batch-1 changes L0–L8 → L1–L10,
I propose:
- Map legacy L0 → new L1 FREE (same meaning)
- Map legacy L1 → new L2 BASIC
- Map legacy L2–L7 → new L3–L8 (one-shift)
- Add NEW L9 ELITE, L10 SUPREME on top
- Update 58 gold-master tests to L1–L10 addressing
- Add a feature flag `STL_V2_ENABLED` for safe rollout

**S2. Rating weight by rater STL tier** — new idea from §22.18. I will
implement a simple weighted-average:
```
weightedRating =
  (viprating × 3 + eliteRating × 2 + normalRating × 1) /
  (viprCount × 3 + eliteCount × 2 + normalCount × 1)
```
This protects against rating manipulation by L1 FREE troll accounts.

**S3. Product "STL badge bleed"** — show the blocking layer explicitly:
```
⚠ This product is rated FREE because:
   Owner STL is FREE (L1)
```
Transparency makes buyers trust the system more.

**S4. Coin lock "insurance"** — give users an 'unlock' cooldown (e.g.
24 h) so that an attacker who steals a wallet cannot instantly drain
locked coins and trigger a cascading STL downgrade.

**S5. Franchise + provider STL cross-penalty cap** — if Franchise tries
to game STL by onboarding fake providers, cap the damage: a franchise
can only influence the STL of providers it onboarded, never globally.

---

## 24. Blocked until Rafi answers — CONSOLIDATED CONTRADICTIONS  `[AWAITING]`

These are the only items I cannot resolve alone. I am NOT progressing
into code until each is answered.

| # | Topic | Legacy says | Batch-1 says | My default |
|---|-------|-------------|--------------|------------|
| 1 | STL level count        | L0–L8 SUPREME (9)            | L1–L10 SUPREME (10)         | Batch-1 canonical |
| 2 | STL formula weights    | Implicit in stlService.js    | Not specified               | Default 25/25/25/25 |
| 3 | DMO acronym            | Decentralized                | Dashboard (once) / Decentralized (once) | Decentralized |
| 4 | PSS full name          | Proof & Security System      | Personal Security System    | Batch-1 canonical |
| 5 | CRB full name          | Central Record Blockchain    | Central Record Blockchain   | RESOLVED 2026-04-19 |
| 6 | Revenue split          | 40/25/20/15 (franchise tiers)| 70/10/10/10 (order)         | Both (outer + inner) |
| 7 | Blockchain stack       | Polkadot only                | BSC → Mosaic → Polkadot     | Batch-1 canonical |
| 8 | DMO module count       | 8 core panels                | 18 modules                  | Batch-1 canonical (superset) |
| 9 | Backend architecture   | Monolith (`stl-replit/`)     | 6 microservices             | Keep monolith for Phase-1, split in Phase-7 |
| 10| Database scope         | ~170-200 tables (15 modules) | ~60 tables (10 groups)      | Phased: Batch-1 Phase-1, legacy Phase-2 |

---

## 25. Next batch — what I need from Rafi

To unblock implementation planning, I need the following (in any order):

**§ 25.1 Resolve §24 contradictions** — one line each is enough:
`"1 → Batch-1 canonical, update tests"` / `"2 → use 25/30/25/15/-5 weights"` / etc.

**§ 25.2 STL weights (concrete numbers)** — what percentage of the STL
score comes from PSS, CRB, DMO, Lock? Where does the complaint deduction
fall?

**§ 25.3 Up-Guard thresholds (concrete numbers)** — what counts as a
"spike"? I proposed 10× trailing 7-day median; Rafi can override.

**§ 25.4 Lock duration policy** — minimum months? Optional extended tier?
Early-unlock penalty?

**§ 25.5 "Product STL" computation** — who computes it? Auto from
(sellerSTL + companySTL + CRB checks)? Or set manually by seller +
validated by CRB?

**§ 25.6 Franchise STL vs provider STL** — do franchise and provider
tiers use the **same** 10-level ladder or two different ones?
Batch-1 hints at two different systems.

**§ 25.7 First 3 DMO panels to build** — out of 18 modules in §22.7,
which 3 ship first?

**§ 25.8 First 3 GoSellr pages to build** — of the 10 in §22.20, which
3 ship first?

**§ 25.9 Launch country** — Pakistan only? Pakistan + UAE?

**§ 25.10 Production timeline** — when does DMO Phase-1 (as per Batch-1
§22.21 Phase-1) need to be live?

---

## 26. BATCH 2 — 13 uploaded .md files (2026-04-11) — canonical department split  `[USER INPUT]`

Rafi uploaded 13 structured `.md` files covering the full department list. To keep this DMO file focused on *DMO-only* content, each non-DMO department now has its **own canonical file** under `ehb-info/departments/`. The tables, rules, and spec that used to live only here in §22 are now split across those files and this file links out to them.

### 26.1 New department files created from Batch-2

| Department     | File                                 | Batch-2 source                     |
|----------------|--------------------------------------|-------------------------------------|
| STL            | `departments/STL.md`                 | `uploads/ehb_stl.md`                |
| PSS            | `departments/PSS.md`                 | `uploads/ehb_pss.md`                |
| CRB            | `departments/CRB.md`                 | `uploads/ehb_crb.md`                |
| Wallet         | `departments/Wallet.md`              | `uploads/ehb_trusty_wallet.md`      |
| Blockchain     | `departments/Blockchain.md`          | `uploads/ehb_blockchain.md`         |
| GoSellr        | `departments/GoSellr.md`             | `uploads/ehb_gosellr.md`            |
| Franchise      | `departments/Franchise.md`           | `uploads/ehb_franchise.md` + `uploads/ehb_franchise_earnings.md` |
| Finance        | `departments/Finance.md`             | `uploads/ehb_finance.md`            |
| Affiliate      | `departments/Affiliate.md`           | `uploads/ehb_affiliate.md`          |
| Industries     | `departments/Industries.md`          | `uploads/EHB_Industry_System.md`    |
| DMO            | `departments/DMO.md` (this file)     | `uploads/ehb_dmo.md` + prior legacy |
| *(full system)* | — (merged into `EHB-MASTER-INFO.md`) | `uploads/ehb_full_system.md`        |

### 26.2 Canonical updates Batch-2 gave us (that override Batch-1)

1. **STL 10-level names are now explicit** — L1 FREE · L2 BASIC · L3 NORMAL · L4 STANDARD · L5 ADVANCED · L6 HIGH · L7 PRO · L8 VIP · L9 ELITE · L10 SUPREME. See `STL.md §2`.
2. **STL score bands are now explicit** — `0–20 / 21–40 / 41–60 / 61–75 / 76–85 / 86–92 / 93–96 / 97–98 / 99 / 100`. See `STL.md §2`.
3. **Coin lock ladder is now the simpler single-number form** — L1:0, L2:20, L3:40, L4:100, L5:200, L6:400, L7:800, L8:2000, L9:4000, L10:10000+. The Batch-1 dual-number ladder (§22.1) is **deprecated** pending user confirmation. Canonical in `Wallet.md §3`.
4. **PSS = Personal Security System** — confirmed again. Batch-1 was right.
5. **Wallet lock duration bonuses** — 1 / 2 / 3 year tiers with stacking fee reductions. See `Wallet.md §4`. This answers my §23.3 S4 suggestion (unlock cooldown) with real numbers.
6. **Wallet bucket model is 2 buckets (Locked + Free)** — not 3. Earnings flow as a pending→approved→Free ledger state, not a separate wallet. See `Wallet.md §2`.
7. **Blockchain phases confirmed BSC → Mosaic → Polkadot**. See `Blockchain.md §2`.

### 26.3 New contradictions Batch-2 introduced (NOT resolved)

| #  | Topic                       | Legacy / prior       | Batch-2                                    | Status |
|----|------------------------------|----------------------|---------------------------------------------|--------|
| C1 | CRB full name               | Central Record Blockchain | RESOLVED 2026-04-19: Founder confirmed "Central Record Blockchain" as canonical | `[RESOLVED]` |
| C2 | Coin lock numbers           | Batch-1 dual (L2 50/20 etc) | Batch-2 single (L2:20 etc)               | `[AWAITING]` |
| C3 | Industry count              | Legacy 32 industries  | Batch-2 lists 16 (10 main + 6 support)      | `[AWAITING]` — is 16 the new target or Phase-1 only? |
| C4 | Wallet bucket model         | Legacy 3 wallets (Main/Earnings/Lock) | Batch-2 2 buckets (Locked/Free) | `[AWAITING]` |
| C5 | Phase-1 industry launch set | Legacy 6 (GoSellr/WMS/OLS/HPS/OBS/JPS/AGTS) | Batch-2 10 main industries               | `[AWAITING]` |
| C6 | JPS status                  | Legacy = its own industry/system | Batch-2 industry list omits JPS (maybe merged into HPS/EPS) | `[AWAITING]` |

### 26.4 Where the DMO file focuses from here on

This DMO.md file **stays the department file for DMO only**. The §22 Batch-1 content remains in place for full history, but going forward **new STL, PSS, CRB, Wallet, etc. facts go into their own department files**, not here. This file's future content should only be:

- DMO panels (the 18 modules)
- DMO user flows
- DMO RBAC, audit, admin UI
- DMO ↔ everything-else integration contracts

### 26.5 What I still need from Rafi (Batch-3)

These add to `§25` and must be answered together:

1. **C1–C6 resolution** (6 new contradictions above)
2. **STL formula weights** — real numbers for `w_pss, w_crb, w_dmo, w_lock, w_complaint`
3. **Refill window length** per STL level (monthly? quarterly? yearly?)
4. **Complaint window** (30/60/90 days?)
5. **First 3 DMO panels to ship** (out of the 18 in §22.5)
6. **First 3 GoSellr pages to ship**
7. **Launch country** for Phase-1 franchise pilot
8. **Production timeline** — target weeks/months for each of the 7 phases

---

## 27. DMO 10-Level Ladder (Final Names)

DMO has its own 10-level ladder based on: Behavior (50%) + Activity (30%) + Risk Intelligence (20%).

| Level | Name | Description |
|-------|------|-------------|
| L1 | Basic User | Limited tools, high restrictions |
| L2 | Active | Basic functions, learning phase |
| L3 | Verified | Basic automation, limited analytics |
| L4 | Stable | Standard tools, moderate analytics |
| L5 | Professional | Full operations tools, complaint handling |
| L6 | Strong Operator | Advanced reports, team management |
| L7 | Business Owner | AI automation, franchise interaction, full analytics |
| L8 | High Performer | Multi-system control, high automation |
| L9 | Authority | Priority decisions, advanced AI tools |
| L10 | Elite | Full control, admin-level power |

**Important:** DMO levels show as NUMBERS only (no named labels). Only EHB-STL gets named labels (FREE/BASIC/.../SUPREME).

---

## 28. DMO = SaaS Payment Model

- **DMO is a paid subscription system**
- **Monthly fee auto-deducted from user earnings**
- **No earnings → manual payment required**
- **No payment → DMO level decreases**
- **DMO subscription = STL maintenance + tools access**

---

## 29. DMO Modules (Complete)

Group into 8 categories:

### 29.1 Core Control
- PSS Monitoring
- CRB Monitoring
- DMO STL
- Verification

### 29.2 Management
- EHB STL Management
- Operations
- Applications
- Approvals

### 29.3 Finance
- Wallet Control
- Earnings Engine
- Refill Management

### 29.4 Risk & Control
- Complaints
- Up-Guard (Security Layer)
- Fraud Detection

### 29.5 Business Control
- Franchise Control
- Offline → Online Conversion

### 29.6 AI System
- Intelligence Engine
- Activity Engine
- Task System
- AI Assistant

### 29.7 Data System
- Analytics
- Notifications
- Settings
- Live Monitoring

### 29.8 Advanced
- Blockchain Control

---

## 30. Admin = DMO Internal Role

- **Admin is NOT a separate public user type**
- **Admin = internal EHB staff operating within DMO**
- **DMO Roles:** Super Admin, Admin, Operator, Franchise Operator
- **PSS requirement for Admin:** L8+ with mandatory 2FA

---

## 31. DMO SaaS Billing System

DMO operates as a paid SaaS (Software as a Service) platform.

### 31.1 Fee Structure

| EHB-STL Level | Monthly Fee (PKR) |
|---|---|
| L1–L2 | FREE |
| L3–L4 | 500 |
| L5–L6 | 1,000 |
| L7–L8 | 3,000 |
| L9–L10 | 5,000 |

### 31.2 Billing Flow

1. **Month start** → system checks wallet balance
2. **Auto-deduct** from earnings/wallet
3. **If insufficient** → 7-day warning
4. **If still unpaid** → 15-day grace period
5. **After grace** → DMO level decreases by 1
6. **Continued non-payment** → further downgrades

### 31.3 Billing Features

- Billing history (all invoices)
- Auto invoice generation (per cycle)
- Subscription status display (current level + renewal date)
- Grace period tracking (7–15 days)
- Payment notifications + escalation alerts

### 31.4 Key Rule

**DMO subscription = STL maintenance + tools access.** No payment = no growth. Users who fail to maintain payment lose DMO level, restricting their platform capabilities until paid.

---

## 32. DMO Master Control Integration

This section documents the 5 core engines that power DMO's automated governance:

### 32.1 Decision Engine

The central brain that processes all platform events and routes them to appropriate handlers.

```javascript
// DMO Decision Engine - Core Logic
async function dmoDecisionEngine(event) {
  const riskScore = await assessRisk(event);
  const userSTL = await getSTL(event.userId);
  const history = await getHistory(event.userId);
  
  if (riskScore > 80) {
    return { action: 'BLOCK', reason: 'High risk detected', escalate: true };
  }
  if (riskScore > 50) {
    return { action: 'REVIEW', reason: 'Medium risk — manual review', assignTo: 'DMO_MANAGER' };
  }
  if (userSTL.level <= 2 && event.type === 'HIGH_VALUE') {
    return { action: 'HOLD', reason: 'Low STL + high value — escrow hold', duration: '48h' };
  }
  return { action: 'APPROVE', reason: 'Low risk — auto-approved', log: true };
}
```

**Decision types handled:**
- Order validation (STL check + fraud check)
- Seller approval/suspension
- Rider assignment optimization
- Complaint routing + escalation
- STL recalculation triggers
- Wallet operations (freeze/release)
- Franchise KPI enforcement

### 32.2 Risk Engine

Real-time risk assessment combining multiple signals:

**Input signals:**
- PSS trust score
- CRB verification status
- STL level + trajectory
- Complaint history (count + severity)
- Transaction patterns (Up-Guard)
- Geographic anomalies
- Time-based patterns

**Risk levels:**

| Risk Score | Level | DMO Action |
|---|---|---|
| 0-30 | LOW | Auto-approve |
| 31-50 | MEDIUM | Monitor + log |
| 51-80 | HIGH | Manual review required |
| 81-100 | CRITICAL | Auto-block + escalate |

### 32.3 Behavior Engine

Tracks and scores user behavior across all platform interactions:

**Behavior factors:**
- Login frequency + session duration
- Order completion rate
- Response time to messages
- Complaint resolution willingness
- CRB refill compliance
- Platform engagement depth

**Behavior score weight in DMO level:**
- Behavior: 50%
- Activity: 30%
- Risk Intelligence: 20%

### 32.4 Permission Engine

Controls what each user/role can do based on their STL, DMO level, and verification status:

```javascript
function checkPermission(userId, action) {
  const user = getUser(userId);
  const permissions = {
    'SELL_PRODUCT': { minSTL: 2, minPSS: 2, crbRequired: true },
    'ACCEPT_ORDER': { minSTL: 2, minPSS: 1 },
    'BECOME_RIDER': { minSTL: 2, minPSS: 2, trainingRequired: true },
    'BUY_FRANCHISE': { minSTL: 3, minPSS: 3, minDMO: 3 },
    'SELL_FRANCHISE': { minSTL: 5, minPSS: 3, franchiseType: 'OF3+' },
    'BULK_ORDER': { minSTL: 4, maxDaily: getSTLCap(user.stlLevel) },
    'WITHDRAW_LARGE': { minSTL: 3, amlCheck: true, manualApproval: true },
  };
  
  const rule = permissions[action];
  if (!rule) return { allowed: false, reason: 'Unknown action' };
  if (user.stlLevel < rule.minSTL) return { allowed: false, reason: `Requires STL L${rule.minSTL}+` };
  if (rule.minPSS && user.pssLevel < rule.minPSS) return { allowed: false, reason: `Requires PSS L${rule.minPSS}+` };
  if (rule.crbRequired && !user.crbVerified) return { allowed: false, reason: 'CRB verification required' };
  return { allowed: true };
}
```

### 32.5 Auto Action System

Automated responses to platform events — no human intervention needed for routine operations:

| Trigger | Auto Action | Condition |
|---|---|---|
| Order completed | STL recalculate for all parties | Always |
| STL drops below L2 | Restrict selling privileges | Auto |
| 3 complaints in 7 days | Temporary account hold | Auto |
| Refill deadline missed | Send warning → 7-day grace → downgrade | Staged |
| Wallet below lock requirement | STL freeze + notification | Auto |
| Fraud signal confirmed | Wallet freeze + earnings hold + DMO alert | Auto |
| SLA breach (complaint) | Auto-escalate to next level | Timer-based |
| New franchise application | Route to correct franchise level for review | Auto |
| Rider no deliveries for 7 days | Mark inactive + notification | Auto |
| Seller no orders for 30 days | CRB refill reminder | Auto |

---

## Changelog

| Date       | Author | Change |
|------------|--------|--------|
| 2026-04-11 | Claude | v1.0 — initial merge of 13 legacy docs into one structured DMO department file. Added §19 advanced suggestions. Added §20 open questions for the user to fill. |
| 2026-04-11 | Claude | v1.1 — **Batch-1 merge** (Rafi's 9-prompt DMO+STL+GoSellr spec): added §22 (10-level STL, 18 DMO modules, Up-Guard, GoSellr order flow, product-card anti-fraud, API surface, frontend pages, 7-phase roadmap), §23 (my analysis + 5 new suggestions), §24 (10 consolidated contradictions awaiting Rafi), §25 (next-batch info needed). |
| 2026-04-11 | Claude | v1.2 — **Batch-2 merge** (13 `.md` files uploaded): split STL/PSS/CRB/Wallet/Blockchain/GoSellr/Franchise/Finance/Affiliate/Industries into their own canonical files under `departments/`. Added §26 with 7 canonical overrides and 6 new contradictions (C1–C6). This DMO.md file is now DMO-only. |
| 2026-04-18 | Claude | v1.3 — Added DMO 10-level ladder (§27), SaaS payment model (§28), complete modules list in 8 categories (§29), Admin as DMO-only role (§30). |
| 2026-04-18 | Claude | v1.4 — Updated DMO level names to final (Basic User→Elite, L1–L10). Added SaaS billing system (§31): fee table, billing flow, grace period, key rule. |
| 2026-04-19 | Claude | v2.0 — Added DMO Master Control Integration (§32): 5 engines (Decision, Risk, Behavior, Permission, Auto Action). CRB renamed to "Central Record Blockchain" (§22.13 conflict RESOLVED). |

---

*EHB DMO — department plan · v2.0 · 2026-04-19 · Added DMO Master Control Integration (5 engines). CRB confirmed as Central Record Blockchain.*
