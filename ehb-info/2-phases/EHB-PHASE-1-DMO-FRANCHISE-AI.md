# EHB PHASE 1 — DMO DEMO + FRANCHISE MODEL + AI SERVICES MARKETPLACE

> **This is the Phase 1 build plan for the current development cycle.**
> Companion to `EHB-MASTER-PLAN.md`.
>
> **Owner:** Muhammad Rafi (Founder/CEO, EHB Technologies Pvt. Ltd.)
> **Target duration:** 12 weeks (3 months) to demo-ready state
> **Geographic target:** Islamabad + Pakistan-wide soft launch
> **Last Updated:** 2026-04-21
> **Version:** 1.0
> **Language:** Conversation = Roman Urdu + English · Code = English only

---

## TABLE OF CONTENTS

1. Mission & Success Criteria
2. In-Scope / Out-of-Scope
3. The Three Pillars (What We Are Building)
4. Architecture (Monorepo + Service Topology)
5. Data Models (MongoDB Collections)
6. API Endpoints (All Routes Needed)
7. UI/UX Pages (Next.js Route Map)
8. 12-Week Build Timeline (Week-by-Week)
9. Team / Role Assignments
10. Acceptance Criteria (Demo-Ready Checklist)
11. Demo Script (How to Show It to a Stakeholder)
12. Risks & Mitigations
13. Post-Phase-1 Handoff (What Unlocks Phase 2)

---

## 1. MISSION & SUCCESS CRITERIA

### Mission

Deliver a demoable, end-to-end slice of the EHB platform showing **three
interlocking value stories**:

1. **Governance works** — A DMO dashboard that lets an EHB staff user see
   pending approvals, STL scores, franchise applications, and AI fraud flags
   in one place.
2. **Franchise economy works** — A prospective franchisee can browse Sub L1–L10
   or Online OF1–OF4 packages, submit an application with dual pricing (USD +
   EHBGC), get approved by DMO, and see their serial number + commission
   projection.
3. **AI Services Marketplace works** — An STL-verified user can browse 7 AI
   services (Lawyer, Diagnosis, Tutor, Resume Builder, Business Advisor,
   Fraud Detector, Recommendation), subscribe, and invoke each with a working
   OpenAI-backed response.

### Success Criteria (Demo-Ready = All of these true)

- [ ] A new user can register → complete PSS L3 (basic KYC) → get an STL score
- [ ] A user can click "Apply for Franchise" → choose Sub L1 or OF1 → submit
- [ ] A DMO operator logs in, sees the franchise application in a queue, approves
      it, and the applicant sees serial number `EHB-PK-R1-P1-L1-001`
- [ ] A user can browse AI Services Marketplace → pick "AI Resume Builder" →
      submit their profile → receive a generated resume
- [ ] DMO dashboard shows real KPIs: users, franchises, AI invocations, revenue
- [ ] `npx tsc --noEmit` exits 0
- [ ] STL gold-master tests pass 58/58
- [ ] iOS Classic + Diamond theme switches work on DMO dashboard
- [ ] Public demo URL is live (staging) and shareable with stakeholders

---

## 2. IN-SCOPE / OUT-OF-SCOPE

### In-Scope for Phase 1

- Web-only (no React Native mobile yet)
- English UI (Roman Urdu support deferred to Phase 2 for UI copy)
- Single country: Pakistan (PK country code hard-coded)
- Wallet as stub (EHBGC balance simulated; no real payment gateway)
- Polkadot blockchain as stub (hash generation simulated, no real RPC call)
- MongoDB with demo seed data (no production DB yet)
- OpenAI direct API calls for AI modules (no fine-tuning, no custom models)
- Authentication: email + password + JWT (no OAuth/SSO yet)
- One language: English (bilingual copy added in Phase 2)

### Out-of-Scope (Deferred)

- JazzCash / Easypaisa / Stripe real payment
- Polkadot mainnet deployment (Phase 4)
- All 38 industries (only a flag-based industry registry; GoSellr deferred to
  Phase 3 of technical waves)
- React Native mobile app (Phase 17)
- Production-grade AML / fraud detection (AI Fraud module is demo-only)
- Multi-language i18n framework
- Admin PSS L8+ 2FA mandatory enforcement (demo uses permissive admin login)
- 2% commission split on real orders (franchise commission is projected, not
  settled)

---

## 3. THE THREE PILLARS (What We Are Building)

### 3.1 Pillar A — DMO Demo Dashboard

A Next.js workspace at `/dmo/*` with:

**19 Canonical Modules (4 sidebar groups):**

| Group | Modules |
|-------|---------|
| Overview | Dashboard |
| Verification | STL Management · PSS Monitoring · CRB Monitoring · Up-Guard |
| Operations | Applications · Approvals · Wallet Control · Earnings Engine · Refill Management · Complaints · Franchise Control |
| Intelligence | Activity Engine · Task System · AI Assistant · Analytics · Blockchain Control · Notifications · Settings |

**Phase 1 deliverable depth:**

- All 19 sidebar entries routed (no 404s)
- **Dashboard** = fully functional KPI card grid (4 KPIs: Active Users, Pending
  Franchise Apps, AI Invocations Today, Platform Revenue)
- **Approvals** = functional queue with franchise applications
- **Franchise Control** = list + detail view (read-only)
- **STL Management** = leaderboard + single-user drilldown
- **AI Assistant** = embedded chat widget (reuses AI Recommendation module)
- Other 13 modules = stub pages with "Coming in Phase 2" card + placeholder layout
- iOS Classic + Diamond theme switcher working in header
- Plastic coating (gloss + shimmer + depth) on every card
- Role-based access: `DMO_MANAGER` sees everything, `DMO_ANALYST` sees read-only

### 3.2 Pillar B — Franchise Model

**User-facing pages:**

- `/franchise` — landing + pricing matrix (14 tiers: Sub L1–L10 + OF1–OF4)
- `/franchise/apply` — multi-step form (choose tier → KYC check → dual pricing
  confirm → submit)
- `/franchise/my` — franchisee's operator dashboard (after approval): serial
  number, commission projection, sub-network stats
- `/franchise/calculator` — commission calculator (enter monthly order volume →
  see projected earnings at each tier)

**DMO-side pages:**

- `/dmo/franchise` — list view of all franchises (filterable by level, country,
  status, round/phase)
- `/dmo/franchise/applications` — queue of pending applications (approve/reject/
  request-more-info actions)
- `/dmo/franchise/[id]` — detail view with application, serial number, PSS/CRB
  status, commission ledger

**Business logic:**

- Serial number generator: `EHB-PK-R1-P1-L{level}-{seq}` for physical,
  `EHB-PK-R1-P1-OF{tier}-{seq}` for online (seq is country-level sequence)
- Round/Phase system: currently hard-coded to R1P1 for Pakistan; admin override
  via `/dmo/settings/franchise-phases`
- Dual pricing enforcement: USD captured + EHBGC lock requirement simulated in
  wallet stub
- Commission cap per day: enforced in projection calculator (not in real settlement)
- Cap enforcement: 25 subs per Master, 25 masters per Corporate — blocks new
  applications when cap reached (with override button for DMO_MANAGER)

### 3.3 Pillar C — AI Services Marketplace

**Marketplace storefront at `/ai-marketplace`:**

- Grid of 7 service cards (glass card + icon + 1-liner + pricing + "Try Now" CTA):
  1. **AI Lawyer** (OLS) — legal case triage + doc drafting
  2. **AI Diagnosis** (WMS) — symptom-based prediction + referral
  3. **AI Resume Builder** (JPS) — CV generation from profile
  4. **AI Tutor** (HPS) — adaptive learning, study plans
  5. **AI Business Advisor** (GoSellr) — SME consulting, pricing, inventory
  6. **AI Fraud Detector** (DMO) — transaction anomaly, review abuse detection
  7. **AI Recommendation** (Cross-industry) — product / service / job suggestions

**Per-service detail page** `/ai-marketplace/[service]`:

- Hero: service name, pricing (per-invocation or subscription), STL required
- Input form (service-specific — symptoms for Diagnosis, case details for Lawyer,
  profile JSON for Resume Builder)
- "Invoke" button → calls `/api/ai/{service}` → shows formatted response
- Confidence score badge on output
- Mandatory disclaimer ("not legal advice" / "consult a doctor" / etc.)
- Invocation history for the logged-in user
- "Add to favorites" + "Share result" buttons

**Subscription & Gating:**

- Free tier: 3 invocations per user per day per service
- Paid tier (requires EHBGC wallet balance): unlimited
- STL gate: services require STL L3+ (Normal) minimum; L5+ for Lawyer & Diagnosis
- Rate limiting at API layer (Redis-backed if available, in-memory otherwise)

**Admin / DMO side:**

- `/dmo/ai-assistant` shows: total invocations today, top services, user feedback,
  flagged responses (thumbs-down reviews)
- Operator can review a flagged AI response and mark it for retraining

---

## 4. ARCHITECTURE (Monorepo + Service Topology)

### 4.1 Monorepo Layout (Additions for Phase 1)

```
EHB DEVELOPMENT 2026/
├── apps/
│   └── web/                     Next.js 14 App Router + TypeScript
│       ├── app/
│       │   ├── (public)/
│       │   │   ├── page.tsx                     Landing
│       │   │   ├── franchise/
│       │   │   │   ├── page.tsx                 Pricing matrix
│       │   │   │   ├── apply/page.tsx           Multi-step form
│       │   │   │   ├── my/page.tsx              Franchisee dashboard
│       │   │   │   └── calculator/page.tsx      Commission calculator
│       │   │   └── ai-marketplace/
│       │   │       ├── page.tsx                 7-service grid
│       │   │       └── [service]/page.tsx       Service detail + invoke
│       │   ├── (auth)/
│       │   │   ├── login/page.tsx
│       │   │   ├── register/page.tsx
│       │   │   └── pss/page.tsx                 KYC step
│       │   └── dmo/                             DMO workspace (see §3.1)
│       ├── components/
│       │   ├── dmo/                             Sidebar, topbar, cards
│       │   ├── franchise/                       Pricing card, apply form, calculator
│       │   ├── ai/                              Service card, invoke panel, chat widget
│       │   └── ui/                              Plastic card, 3D button, chip, drawer
│       └── lib/
│           ├── stl/engine.ts                    STL calc (frontend mirror)
│           ├── dmo/theme.ts                     iOS Classic + Diamond tokens
│           ├── franchise/serial.ts              Serial number generator
│           └── api-client.ts                    fetch wrapper for /api/*
├── services/
│   ├── api/                                     Express + Mongoose (port 5000)
│   │   ├── src/
│   │   │   ├── models/                          User, Franchise, AIInvocation, etc.
│   │   │   ├── routes/                          /auth, /pss, /stl, /franchise, /dmo, /ai
│   │   │   ├── services/                        Business logic (stlService.js, etc.)
│   │   │   └── middleware/                      auth, rbac, rate-limit
│   └── ai/                                      Express + OpenAI (port 8080)
│       ├── src/
│       │   ├── modules/                         lawyer.js, diagnosis.js, resume.js, etc.
│       │   └── routes/ai.js                     Aggregator
├── packages/
│   ├── types/                                   Shared TS types (13 modules)
│   └── config/                                  Env, constants
└── data/
    └── seeds/                                   Demo users, franchises, industries
```

### 4.2 Service Topology

```
Browser (Next.js @ localhost:3000)
       │
       ├─ /api/auth/*, /api/pss/*, /api/stl/*, /api/franchise/*, /api/dmo/*
       │                ↓
       │         services/api (Express @ 5000) ──→ MongoDB (27017)
       │
       └─ /api/ai/* (proxied)
                        ↓
                  services/ai (Express @ 8080) ──→ OpenAI API
                        ↑
                services/api calls for: STL gating, invocation logging
```

### 4.3 Ports & Environment

| Service | Port | Env vars |
|---------|------|----------|
| Next.js web | 3000 | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_AI_URL` |
| API | 5000 | `MONGODB_URI`, `JWT_SECRET`, `AI_SERVICE_URL` |
| AI | 8080 | `OPENAI_API_KEY`, `API_SERVICE_URL` |
| MongoDB | 27017 | (local) |

---

## 5. DATA MODELS (MongoDB Collections)

### 5.1 `users`

```js
{
  _id, email, passwordHash,
  role: 'user' | 'franchisee' | 'DMO_MANAGER' | 'DMO_ANALYST' | 'SUPER_ADMIN',
  pss: {
    level: 0-10,
    status: 'pending' | 'verified' | 'rejected',
    submittedAt, verifiedAt,
    documents: [{ type, url, hash }]
  },
  crb: {
    level: 0-10,
    certifications: [{ name, issuer, hash, expiresAt }]
  },
  dmo: {
    level: 1-10,
    score: 0-100,
    lastRecalc
  },
  stl: {
    score: 0-100,
    level: 1-10,         // derived label FREE..SUPREME
    history: [{ ts, score, event }]
  },
  wallet: {
    ehbgcBalance: Number,
    ehbgcLocked: Number,
    usdBalance: Number   // simulated for demo
  },
  createdAt, updatedAt
}
```

### 5.2 `franchises`

```js
{
  _id,
  serialNumber: 'EHB-PK-R1-P1-L1-001',
  ownerUserId: ObjectId,
  type: 'sub' | 'online' | 'master' | 'corporate' | 'country',
  level: 'L1'..'L10' | 'OF1'..'OF4' | 'M' | 'C' | 'C1'..'C5',
  country: 'PK',
  round: 1, phase: 1,
  pricing: {
    usdPaid: Number,
    ehbgcLocked: Number,
    commissionCapPerDay: Number,
    directCommissionRate: Number  // only for online
  },
  geography: {
    area: String,      // for sub
    city: String,      // for master
    state: String,     // for corporate
    country: String    // for country
  },
  parent: {
    masterId: ObjectId,      // for sub
    corporateId: ObjectId,   // for master
    countryFranchiseId: ObjectId  // for corporate
  },
  status: 'pending' | 'active' | 'suspended' | 'terminated',
  application: {
    submittedAt, reviewedAt, reviewerId,
    activationGate: { pssLevel, stlLevel, met: Boolean },
    decision: 'approved' | 'rejected' | 'needs_info',
    decisionReason: String
  },
  commissionLedger: [{
    ts, orderId, orderValue, platformCut, splitTo, amount
  }],
  kpi: {
    usersInZone: Number,
    ordersThisMonth: Number,
    earningsThisMonth: Number
  },
  createdAt, updatedAt
}
```

### 5.3 `ai_invocations`

```js
{
  _id,
  userId,
  service: 'lawyer' | 'diagnosis' | 'tutor' | 'resume' | 'business' | 'fraud' | 'recommend',
  input: Object,           // service-specific
  output: {
    text: String,
    confidence: Number,    // 0-1
    disclaimer: String,
    meta: Object           // model, tokens, latency
  },
  flagged: Boolean,
  feedback: 'up' | 'down' | null,
  feedbackReason: String,
  createdAt
}
```

### 5.4 `ai_service_config`

```js
{
  _id: 'lawyer' | 'diagnosis' | ...,
  displayName, description, icon,
  pricing: { perInvocation, monthly, freeDailyQuota },
  gates: { pssMin, stlMin },
  prompt: String,           // system prompt for OpenAI
  model: 'gpt-4' | 'gpt-3.5-turbo',
  enabled: Boolean
}
```

### 5.5 `franchise_applications`

(Can be embedded in `franchises` as `application` — or separate for queue performance.)

```js
{
  _id,
  userId, tier, level, country,
  pricingConfirmed: { usdPaid, ehbgcReserved },
  kycSnapshot: { pssLevel, crbLevel, stlLevel },
  status: 'pending' | 'approved' | 'rejected' | 'needs_info',
  submittedAt, reviewedAt, reviewerId,
  notes: String
}
```

### 5.6 `activity_logs` (Audit Trail)

```js
{
  _id, actorUserId, action, target, targetId,
  before: Object, after: Object,
  ip, userAgent, ts
}
```

### 5.7 Indexes

- `users.email` unique
- `franchises.serialNumber` unique
- `franchises.country + round + phase + level` compound (for seq generation)
- `franchises.ownerUserId`
- `ai_invocations.userId + createdAt` compound (for quota)
- `ai_invocations.service + createdAt` for analytics
- `franchise_applications.status + submittedAt` for DMO queue

---

## 6. API ENDPOINTS (All Routes Needed)

### 6.1 Auth

- `POST /api/auth/register` — email + password → returns JWT
- `POST /api/auth/login` — returns JWT + user profile
- `GET /api/auth/me` — returns current user (from JWT)

### 6.2 PSS / CRB / STL

- `POST /api/pss/submit` — upload documents, get pending status
- `GET /api/pss/status/:userId` — returns PSS level + state
- `POST /api/crb/submit-exam` — demo stub
- `GET /api/stl/score/:userId` — returns STL score + level + breakdown
- `POST /api/stl/validate-product` — returns `{ finalStl, blockingLayer }`
  (for MIN-chain demo)
- `GET /api/stl/effects/:level` — returns visibility, fee, earnings cap

### 6.3 Franchise

- `GET /api/franchise/pricing` — returns 14-tier pricing matrix
- `POST /api/franchise/apply` — submit application → returns application ID
- `GET /api/franchise/my` — returns current user's franchises + status
- `GET /api/franchise/:id` — returns detail (owner-only or DMO-only)
- `POST /api/franchise/:id/upgrade` — request level upgrade
- `GET /api/franchise/calculator?tier=L3&monthlyVolume=50000` — projection

### 6.4 DMO

- `GET /api/dmo/kpis` — dashboard numbers
- `GET /api/dmo/applications/queue` — franchise applications pending
- `POST /api/dmo/applications/:id/approve` — DMO_MANAGER action
- `POST /api/dmo/applications/:id/reject` — with reason
- `POST /api/dmo/applications/:id/request-info` — ask for more docs
- `GET /api/dmo/stl-leaderboard?limit=100&level=L7+`
- `POST /api/dmo/stl-override` — L10 SUPREME only, audited
- `GET /api/dmo/activity-log?filter=...`

### 6.5 AI Services

- `GET /api/ai/services` — list of 7 services with config (pricing, gates)
- `POST /api/ai/lawyer` — `{ caseDescription }` → legal triage
- `POST /api/ai/diagnosis` — `{ symptoms, age, history }` → prediction
- `POST /api/ai/tutor` — `{ topic, currentLevel }` → study plan
- `POST /api/ai/resume` — `{ jpsProfile }` → generated CV
- `POST /api/ai/business` — `{ businessStage, question }` → advisor response
- `POST /api/ai/fraud` — `{ transactionData }` → risk score
- `POST /api/ai/recommend` — `{ userId, context }` → ranked suggestions
- `POST /api/ai/feedback/:invocationId` — `{ rating, reason }`
- `GET /api/ai/my-invocations` — user's history
- `GET /api/ai/quota` — remaining free invocations today

### 6.6 Wallet (Stub)

- `GET /api/wallet/balance/:userId`
- `POST /api/wallet/lock-ehbgc` — simulate lock for franchise activation
- `POST /api/wallet/unlock-ehbgc`
- `GET /api/wallet/transactions/:userId`

### 6.7 Real-Time (Socket.IO)

- Namespace `/dmo` — event `franchise:new-application`, `stl:drop-alert`
- Namespace `/ai` — event `ai:invocation` for live feed

---

## 7. UI/UX PAGES (Next.js Route Map)

| Route | Scope | Phase 1 depth |
|-------|-------|---------------|
| `/` | Public landing | Full — hero + 3 pillar cards + CTA to register |
| `/login`, `/register`, `/pss` | Auth + KYC | Full |
| `/franchise` | Pricing matrix | Full — 14 tiers, filter by Sub/Online/Master |
| `/franchise/apply` | Multi-step form | Full — tier → KYC → pricing → submit |
| `/franchise/my` | Franchisee dashboard | Full — serial, commission projection, KPIs |
| `/franchise/calculator` | Commission calc | Full — interactive |
| `/ai-marketplace` | 7-service grid | Full |
| `/ai-marketplace/[service]` | Service detail + invoke | Full for all 7 services |
| `/dmo` | Dashboard | Full — 4 KPIs + recent activity feed |
| `/dmo/stl` | STL leaderboard + drill | Full |
| `/dmo/approvals` | Franchise applications queue | Full |
| `/dmo/franchise` | Franchise list | Full — list + filter |
| `/dmo/franchise/[id]` | Detail | Full |
| `/dmo/ai-assistant` | AI ops panel | Full — invocation stats, flagged responses |
| `/dmo/analytics` | Placeholder | Stub |
| `/dmo/pss`, `/dmo/crb`, `/dmo/up-guard` | Verification | Stub with demo data |
| `/dmo/wallet-control`, `/dmo/earnings-engine`, `/dmo/refill-management`, `/dmo/complaints` | Operations | Stub |
| `/dmo/activity-engine`, `/dmo/task-system`, `/dmo/blockchain-control`, `/dmo/notifications`, `/dmo/settings` | Intelligence/Admin | Stub |

**Total Phase 1 pages = 21 functional + 11 stub = 32 routes.**

---

## 8. 12-WEEK BUILD TIMELINE (Week-by-Week)

### Week 1 — Foundation

- Initialize pnpm monorepo: `apps/web`, `services/api`, `services/ai`, `packages/*`
- Set up Turborepo, TypeScript, ESLint, Prettier
- Next.js 14 skeleton, Tailwind, dark glass base theme
- Express + Mongoose baseline, MongoDB connection, JWT middleware
- OpenAI SDK + health endpoint in `services/ai`
- Commit baseline, set up CI (lint + typecheck on push)

### Week 2 — Auth + PSS (Basic)

- `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- `POST /api/pss/submit` with file upload (demo — no real document OCR)
- `GET /api/pss/status/:userId`
- Web: `/login`, `/register`, `/pss` multi-step form
- User model + JWT + RBAC middleware
- **Milestone:** user can register, log in, see dummy PSS status

### Week 3 — STL Engine + DMO Shell

- Port `stlService.js` from `EHB-MASTER-INFO` spec — implement formula
- Write 58 gold-master tests (regenerate baseline if needed)
- `/api/stl/score/:userId`, `/api/stl/validate-product`, `/api/stl/effects/:level`
- Web: `/dmo/layout.tsx` with sidebar (19 modules, 4 groups), topbar, theme switcher
- iOS Classic + Diamond tokens in `lib/dmo/theme.ts`
- Plastic coating CSS, 3D button component
- **Milestone:** `/dmo` shows empty dashboard with working theme switcher

### Week 4 — DMO Dashboard + STL Leaderboard

- `/dmo` dashboard: 4 KPI cards (Users, Pending Apps, AI Invocations, Revenue)
- `/dmo/stl` leaderboard: top 100 users by STL score
- `/dmo/stl/[userId]` drill: component breakdown (PSS/CRB/DMO), history chart
- `/api/dmo/kpis`, `/api/dmo/stl-leaderboard`
- Role-based sidebar rendering (DMO_MANAGER vs DMO_ANALYST)
- **Milestone:** DMO dashboard demoable

### Week 5 — Franchise Pricing & Application Form

- Seed `franchise_pricing` config (14 tiers)
- `/api/franchise/pricing` endpoint
- `/franchise` pricing matrix page (with plastic cards, filter by Sub/Online)
- `/franchise/apply` 4-step form: choose tier → KYC check → dual pricing confirm → submit
- Serial number generator `lib/franchise/serial.ts`
- `POST /api/franchise/apply` creates `franchise_applications` entry
- **Milestone:** a user can submit an application end-to-end

### Week 6 — DMO Approvals Queue

- `/api/dmo/applications/queue` with pagination + filters
- `/dmo/approvals` queue UI (table + search + filter by level/country)
- `POST /api/dmo/applications/:id/approve` — creates `franchises` entry, assigns
  serial number, locks EHBGC (simulated)
- `POST /api/dmo/applications/:id/reject` with reason
- `POST /api/dmo/applications/:id/request-info` notification
- Activity log entry on each action
- **Milestone:** DMO can approve a franchise application; user sees serial

### Week 7 — Franchisee Dashboard + Commission Calculator

- `/franchise/my` franchisee dashboard — serial, level, KPIs, commission ledger
- `/franchise/calculator` interactive calculator (monthly volume → projected
  earnings at each tier using 40/25/20/15 split + daily caps)
- `/api/franchise/my`, `/api/franchise/calculator?tier=X&volume=Y`
- **Milestone:** franchisee story complete end-to-end

### Week 8 — DMO Franchise Control Panel

- `/dmo/franchise` list view with filters (level, country, status, round/phase)
- `/dmo/franchise/[id]` detail: owner, serial, PSS/CRB, application history,
  commission ledger, KPI charts
- Cap enforcement (25 subs/Master, 25 masters/Corporate) with override button
- `/api/franchise/:id` (DMO-only access)
- Round/Phase admin panel in `/dmo/settings`
- **Milestone:** DMO has full franchise visibility

### Week 9 — AI Marketplace Backend (4 services)

- `services/ai` modules: `lawyer.js`, `diagnosis.js`, `resume.js`, `tutor.js`
- Each with: service-specific prompt, OpenAI call (gpt-3.5 for Tutor, gpt-4 for
  Lawyer/Diagnosis), confidence scoring, disclaimer injection
- `POST /api/ai/{lawyer|diagnosis|resume|tutor}` endpoints
- Quota middleware (3 free/day/service)
- STL gate middleware (L3+ for basic, L5+ for Lawyer/Diagnosis)
- `ai_invocations` logging
- **Milestone:** 4 AI services invocable via API

### Week 10 — AI Marketplace Backend (3 more services) + Frontend

- `business.js`, `fraud.js`, `recommend.js`
- `POST /api/ai/{business|fraud|recommend}`
- `GET /api/ai/services` returns 7-service config
- `/ai-marketplace` frontend: 7-card grid
- `/ai-marketplace/[service]` detail + input form + invoke + response render
- Invocation history tab on service page
- **Milestone:** AI Services Marketplace is clickable + invocable

### Week 11 — AI Ops Panel + Polish

- `/dmo/ai-assistant` dashboard: invocation stats (per-service, per-day),
  top users, flagged responses queue
- `POST /api/ai/feedback/:invocationId` endpoint (thumbs up/down)
- Embedded AI chat widget (bottom-right floating button on all pages)
- Socket.IO `/ai` namespace: live invocation feed on DMO dashboard
- **Milestone:** AI ops story complete

### Week 12 — Integration, Seed Data, Demo Prep

- Seed database with: 50 demo users (various STL levels), 10 approved
  franchises (mixed Sub + Online), 200+ AI invocations
- Demo script rehearsal (see §11)
- Fix all typecheck errors: `npx tsc --noEmit` exits 0
- Run full STL test suite: 58/58 pass
- Deploy to staging (Vercel for web, Railway/Render for API + AI, MongoDB Atlas)
- Smoke test on staging
- Record demo video (backup in case live demo fails)
- Update `ehb-status.json` with Phase 1 completion
- **Milestone:** Demo-ready, public staging URL, video backup

---

## 9. TEAM / ROLE ASSIGNMENTS

Assuming a 4-person squad. If solo, Rafi drives all tracks sequentially.

| Role | Focus | Weeks |
|------|-------|-------|
| Lead engineer (Rafi or stand-in) | Architecture, STL engine, DMO shell, integration | 1–12 |
| Backend engineer | API service, auth, franchise, DMO endpoints, MongoDB | 1–10 |
| Frontend engineer | Next.js pages, design system, DMO UI, AI Marketplace UI | 2–12 |
| AI engineer | OpenAI integration, 7 AI modules, prompt tuning, quota + gating | 7–11 |

**Cross-functional checkpoints** every Friday:
- Demo-so-far (15 min)
- Blockers (10 min)
- Next week priority (5 min)
- Update `ehb-status.json` (top-5 priorities for next week)

---

## 10. ACCEPTANCE CRITERIA (Demo-Ready Checklist)

### Functional

- [ ] Register → Log in → submit PSS → see STL score ≥ L3
- [ ] Browse `/franchise` → see 14-tier pricing matrix with filter
- [ ] Submit franchise application for Sub L1 (Pakistan) → get "pending" status
- [ ] As DMO_MANAGER, log in → see application in `/dmo/approvals` queue → approve
- [ ] As applicant, refresh `/franchise/my` → see serial `EHB-PK-R1-P1-L1-001`,
      commission projection, $200/day cap
- [ ] Open `/ai-marketplace` → see 7 services with pricing + STL gates
- [ ] Click "AI Resume Builder" → input JPS profile → get generated CV with
      confidence score + disclaimer
- [ ] Invoke AI Diagnosis with demo symptoms → get prediction + "consult a doctor"
- [ ] `/dmo` dashboard shows: user count = 50, pending apps = X, AI invocations
      today = >50, revenue placeholder
- [ ] `/dmo/ai-assistant` shows per-service invocation counts, flagged responses
- [ ] Theme switcher toggles iOS Classic ↔ Diamond on `/dmo/*` (all cards re-render)

### Technical

- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npm run test:stl` → 58/58 pass
- [ ] `npm run test` (if broader suite exists) → 0 failures
- [ ] MongoDB has seed data loaded
- [ ] Public staging URL responds within 3s first paint
- [ ] Lighthouse performance ≥ 85 on dev build for `/dmo`
- [ ] `grep -rn '\bSQL\b\|\bEDR\b' --exclude-dir=node_modules .` returns 0 hits
      (legacy names purged)

### Process

- [ ] `ehb-status.json` updated with Phase 1 completion + Phase 2 top-5
- [ ] Demo video recorded (5 min walkthrough)
- [ ] `CHANGELOG.md` updated with 2026-MM-DD entry
- [ ] README updated with "How to run locally" for Phase 1

---

## 11. DEMO SCRIPT (How to Show It to a Stakeholder)

**Audience:** Potential investor / franchise partner / tech advisor.
**Duration:** 12 minutes.

### Act 1 — The User Story (3 min)

1. Open `/` landing. Point to tagline: "One Platform. 38 Industries."
2. Register as "Ahmed" → submit PSS (upload CNIC demo) → land at `/pss`
3. Show STL score = L3 (derived from PSS).

### Act 2 — The AI Marketplace (3 min)

4. Navigate to `/ai-marketplace`. Show 7-service grid.
5. Click "AI Resume Builder". Fill dummy JPS profile.
6. Invoke. Show generated CV + confidence score + disclaimer.
7. Click thumbs-up feedback.
8. Mention gating: "If Ahmed were L1 FREE, Diagnosis would be locked."

### Act 3 — The Franchise Story (3 min)

9. Navigate to `/franchise`. Show pricing matrix. Highlight L1 Basic = $5K USD +
   5K EHBGC locked.
10. Click "Apply" for Sub L1. Fill 4-step form. Submit.
11. Log out. Log in as `dmo.manager@ehb.com`.
12. Open `/dmo/approvals`. Show Ahmed's pending application.
13. Click "Approve". Serial `EHB-PK-R1-P1-L1-001` generated.
14. Log out, log in as Ahmed. Open `/franchise/my`. Show serial +
    projected commission at 1000 orders/month.

### Act 4 — The DMO Governance Story (3 min)

15. Log in as DMO_MANAGER. Open `/dmo`. Show 4 KPIs.
16. Click `/dmo/stl`. Show leaderboard. Drill into a user; show STL component
    breakdown (PSS + CRB + DMO → MIN-chain).
17. Toggle theme switcher iOS Classic ↔ Diamond. Show plastic coat shimmer.
18. Click `/dmo/ai-assistant`. Show invocation stats from Act 2.
19. Show flagged response queue (if any thumbs-down from Act 2).

### Close (30s)

20. "Phase 1 delivered: 3 interlocking stories — governance, franchise economy,
    and AI services. Phase 2 unlocks: GoSellr marketplace, wallet real money,
    complaints, and 16 more industries."

---

## 12. RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| OpenAI costs balloon during demo | Med | Med | Use gpt-3.5 for 5 of 7 services; cache identical invocations; 3/day free quota |
| STL formula regression tests break during DMO integration | Low | High | Never modify `stlService.js`; new logic in separate files; mock in tests |
| Franchise serial number collisions | Low | Med | Use MongoDB findOneAndUpdate + atomic counter per (country, round, phase, level) |
| Theme switcher breaks on dynamic routes | Med | Low | CSS variables on `<html>`, injected via `ThemeCSSInjector`; snapshot test |
| PSS OCR / document verification out of scope | High | Low | Demo uses manual mock approval; flag disclaimer on demo page |
| Cap enforcement edge cases (25 subs/master) | Med | Med | Unit test; add `force: true` override param for DMO_MANAGER |
| MongoDB Atlas free tier hits quota during demo | Med | Med | Use dedicated demo DB; prune `ai_invocations` older than 7 days nightly |
| Polkadot stub goes "live" accidentally | Low | High | Hard-code `BLOCKCHAIN_ENABLED=false` in Phase 1 env; log warning if true |
| Team velocity slower than 12 weeks | Med | High | Weeks 11–12 are buffer + polish; can cut to 10-week hard deadline by dropping 3 stub modules |
| AI responses produce unsafe content | Low | High | System prompt with safety rules + disclaimer; thumbs-down triggers DMO review |

---

## 13. POST-PHASE-1 HANDOFF (What Unlocks Phase 2)

When Phase 1 is demo-ready and stakeholders sign off, Phase 2 activates:

1. **Technical Wave 3–4 depth:** Real CRB inspection workflow, DMO 7-engine
   split (Decision, Risk, Trust, Finance, Operations, Analytics, AI).
2. **GoSellr marketplace (Wave 5):** Product listings, buyer orders, ratings,
   DMO gates, ranking engine — real transactions with STL-aware visibility.
3. **Wallet + real payments (Wave 6):** JazzCash / Easypaisa / Stripe
   integration, real EHBGC lock, 2% commission split settlement.
4. **Complaints + penalties (Wave 7):** Full penalty ladder, progressive
   downgrades, appeal flow.
5. **Full franchise ops (Wave 8):** Rider assignment, delivery tracking,
   multi-tier commission actual settlement (not projection).
6. **AI Marketplace V2 (Wave 9 extended):** 100+ plugin catalog, custom agent
   creation, subscription tiers, developer SDK.
7. **Notifications + Real-Time (Wave 10):** Socket.IO everywhere, live
   delivery tracking, push notifications.
8. **Admin panel + final integration (Waves 11–12):** L8+ admins with 2FA, full
   audit, soft launch in Islamabad → 20 cities.

**Phase 2 kickoff deliverable:** A `EHB-PHASE-2-PLAN.md` similar to this file,
scoped against Phase 1's actual outcomes + stakeholder feedback.

---

## CHANGELOG

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-21 | 1.0 | Initial Phase 1 plan — DMO demo + Franchise dual-track + AI Services Marketplace (7 modules). 12-week timeline, 32 Next.js routes, 5 MongoDB collections, 40+ API endpoints. |

---

*EHB Technologies (Pvt.) Ltd. — Phase 1 Build Plan v1.0 — 2026-04-21*
*Companion to `EHB-MASTER-PLAN.md`. Built from `ehb-info/` canonical specs.*
