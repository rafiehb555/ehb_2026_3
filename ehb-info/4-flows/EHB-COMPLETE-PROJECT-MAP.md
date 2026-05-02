# EHB TECHNOLOGIES (PVT.) LTD. — COMPLETE PROJECT FILE MAP & MASTER DATA

> **Purpose:** Yeh file poore EHB project ki complete map hai — har file ki location, kya info hai,
> aur consolidated master data. Is file ko copy karke kisi bhi PC pe kisi bhi AI agent ko dein,
> woh start-to-end pura project rebuild kar sakta hai.
>
> **Last Updated:** 2026-04-21
> **Version:** 1.0

---

## TABLE OF CONTENTS

1. Company Identity & Mission
2. Core Systems (8)
3. 38 Industries (Complete List)
4. Tech Stack & Architecture
5. Design System Tokens
6. DMO Scoring Formula
7. STL Level System (L1–L10)
8. Trust Chain MIN Rule
9. Revenue Split & Franchise Model
10. FILE MAP — Every File with Location & Contents
11. How to Rebuild from Scratch

---

## 1. COMPANY IDENTITY & MISSION

- **Company:** EHB Technologies (Pvt.) Ltd.
- **Founded:** 2008
- **HQ:** Islamabad, Pakistan
- **Founder/CEO:** Muhammad Rafi
- **Mission:** Unify 38 industries in one global super-app with AI + blockchain trust.
- **Tagline:** Education · Health · Business
- **Target Scale:** 1M+ users, $500M+ volume, 50+ countries
- **Language Policy:** Communication bilingual (English + Roman Urdu). Code in English.

---

## 2. CORE SYSTEMS (8)

| # | System | Code | Description |
|---|--------|------|-------------|
| 1 | AI Department | AI | Recommendation, fraud detection, AI Lawyer, Diagnosis, Tutor, Resume Builder, Business Advisor |
| 2 | Blockchain | CHAIN | Polkadot-based CRB certificate hashes, on-chain STL proofs, multi-relay architecture |
| 3 | Finance / Wallet | WALLET | EHB wallet, EHBGC/EHBGX tokens, escrow, 40/25/20/15 revenue split |
| 4 | Affiliate System | AFF | Multi-level referral tracking, 5 commission types (direct/level/pool/franchise/product) |
| 5 | Franchise System | FRAN | Country → Corporate → Sub hierarchy, 4-tier (Online/City/State/Country) |
| 6 | JPS | JPS | Job Profile & Skill — AI matching, exams, contracts, designations |
| 7 | Verification (PSS/CRB/STL) | VERIFY | PSS=KYC/liveness/AML, CRB=docs/exams/inspections, STL=L0→L10 trust scoring |
| 8 | DMO | DMO | Decentralized Management Office — 8-step user flow, L10 approval, policy engine |

---

## 3. 38 INDUSTRIES (Complete List)

### Phase 1 — CORE (16)
| Code | Full Name |
|------|-----------|
| GSM | GoSellr Marketplace |
| WMS | Warehouse Management System |
| HPS | Healthcare & Pharmacy Services |
| OBS | Online Business Services |
| OLS | Online Learning System |
| LDS | Legal & Documentation Services |
| AGTS | Agriculture & Trade Services |
| HMS | Hotel & Hospitality Management |
| ITS | IT & Software Services |
| SOT | Social & Community Platform |
| ERS | Emergency & Rescue Services |
| EFS | E-commerce & Fulfillment |
| EHB_TUBE | EHB Media Platform |
| EPS | Event & Party Services |
| EAS | Employment & Agency Services |
| ELS | E-Learning System |

### Phase 2 — EXPANSION (16)
| Code | Full Name |
|------|-----------|
| RES | Real Estate Services |
| FBS | Food & Beverage Services |
| ATS | Automotive & Transport |
| CNS | Construction Services |
| BCS | Beauty & Cosmetics |
| FWS | Fashion & Wear |
| MAS | Media & Advertising |
| GES | Government & Education |
| PTS | Pets & Animal Services |
| WES | Wellness & Fitness |
| FIN | Finance & Banking |
| TCS | Telecom Services |
| MFS | Manufacturing |
| EDS | Energy & Distribution |
| GSS | Gaming & Sports |
| DTS | Digital & Tech Services |

### Phase 3 — NEW (6)
| Code | Full Name |
|------|-----------|
| INS | Insurance Services |
| LSM | Lifestyle & Management |
| HCS | Home Care Services |
| SCS | Security & Compliance |
| RRS | Rental & Resource Sharing |
| CMS | Content & Media Streaming |

---

## 4. TECH STACK & ARCHITECTURE

| Layer | Technology | Port |
|-------|-----------|------|
| Frontend | Next.js 14 App Router + TypeScript + Tailwind | 3000 |
| API | Node 20 + Express + Mongoose (ESM) | 5000 |
| AI Backend | Node 20 + Express + OpenAI (CommonJS) | 8080 |
| Database | MongoDB 7 | 27017 |
| ORM (web) | Prisma (for Next.js) | — |
| Blockchain | Polkadot/Moonbeam | — |
| Package Manager | pnpm (monorepo) | — |
| Build Tool | Turborepo | — |

### Monorepo Layout
```
EHB DEVELOPMENT 2026/
├── apps/web/                    Next.js frontend (150+ pages)
├── services/api/stl-replit/     REAL backend (Express+Mongoose)
├── services/ai/                 AI backend (OpenAI)
├── packages/types/              Shared TypeScript types (13 modules)
├── packages/config/             Shared config
├── packages/ui/                 Shared UI components
├── packages/utils/              Shared utilities
├── infrastructure/scripts/      Startup scripts
├── data/ehb-data/               Industry + service seeds
├── ehb-info/                    🔑 MASTER INFO HUB (all specs)
├── design-system/               Living design system
├── docs/                        Documentation (100+ files)
└── backup/                      Safety backups (gitignored)
```

---

## 5. DESIGN SYSTEM TOKENS

### iOS Classic + Diamond Dual Theme System

| Token | iOS Classic | Diamond |
|-------|------------|---------|
| bg | #e8edf2 | #04060e |
| card | #bdd0e0 | #081420 |
| nested | #b5c8d8 | #060e1c |
| a1 (dark accent) | #b8780a | #0080c8 |
| a2 (medium accent) | #d89020 | #00a8e8 |
| a3 (bright accent) | #f8b830 | #30d0ff |
| a4 (light accent) | #ffe090 | #b0f0ff |
| text | #18283a | #d8f4ff |
| textSecondary | #2a3c50 | #a0d8f0 |
| textMuted | #4a5c70 | #5898b8 |
| ok (green) | #1a7020 | #00b050 |
| wn (warning) | #7a4a00 | #c89000 |
| fl (fail/red) | #7a1010 | #e04040 |

### Plastic Coating (3 layers on every card)
1. **Gloss** — top 48% translucent gradient overlay
2. **Shimmer** — diagonal sweep animation (4.5s infinite)
3. **Depth Shadow** — 3D box-shadow (cardTop + cardBottom + spread)

### 3D Buttons
- Gold/Blue/Green/Red variants
- 5px depth bar underneath
- Hover: translateY(-2px)
- Active/Press: translateY(5px), shadow removed

### Legacy Design (non-DMO pages)
- Background: #0C0E1A
- Card: #13162A
- Nested: #1A1D33
- Purple: #7B6EF6 / Light purple: #A098F8
- Teal: #2BBFA0 / Amber: #F0A030
- Font: DM Sans
- Style: Dark glassmorphism

---

## 6. DMO SCORING FORMULA

```
DMO_SCORE = (Activity × 0.30) + (Behavior × 0.30) + (Performance × 0.20) − (Risk × 0.20)
Range: 0–100 (clamped)
```

### 4 Components

**Activity Score (30%):** orders/month, login frequency, 30-day consistency
- Bonus: +5 for streak >30 days

**Behavior Score (30%):** complaints, on-time delivery, review avg, response time
- Bonus: +5 for >4.5★ rating

**Performance Score (20%):** completion rate, delivery speed, refund disputes, skill level
- Bonus: +5 for L5+ STL

**Risk Score (20% deducted):** fraud flags, payment anomalies, chargebacks, AML signals
- Penalties: –20 fraud, –10 for >2% chargebacks, –5 for AML alert

### Score Change Events
| Event | Points |
|-------|--------|
| Order completion | +2 |
| 5-star review | +3 |
| 30-day no-complaints | +5 |
| High-activity week | +4 |
| PSS completion | +10 |
| Complaint received | –5 |
| Late delivery | –3 |
| Fraud detection | –20 |
| 30-day inactivity | –10 |
| Dispute filed | –3 |
| Policy violation | –8 |

---

## 7. STL LEVEL SYSTEM (L1–L10)

| Level | Code | Name | Score Range | EHBGC Lock | Authority |
|-------|------|------|------------|------------|-----------|
| 1 | L1 | FREE | 0–9 | 0 | Browse only, PSS pending |
| 2 | L2 | BASIC | 10–19 | 20 | Read-only, no listing |
| 3 | L3 | NORMAL | 20–29 | 40 | Buying enabled, limited sell |
| 4 | L4 | STANDARD | 30–39 | 80 | Service listing, reviews |
| 5 | L5 | ADVANCED | 40–49 | 200 | Full feature set, seller tools |
| 6 | L6 | HIGH | 50–59 | 400 | 50+ listings, multi-service |
| 7 | L7 | PRO | 60–69 | 800 | 100+ listings, franchise eligible |
| 8 | L8 | VIP | 70–79 | 2,000 | 200+ listings, team accounts |
| 9 | L9 | ELITE | 80–89 | 5,000 | 500+ listings, bulk operations |
| 10 | L10 | SUPREME | 90–100 | 10,000+ | Unlimited, policy voice, governance |

### Level Colors (Gradient from → to)
| Level | From | To |
|-------|------|-----|
| L1 | #64748b | #475569 |
| L2 | #22c55e | #16a34a |
| L3 | #06b6d4 | #0891b2 |
| L4 | #3b82f6 | #2563eb |
| L5 | #8b5cf6 | #7c3aed |
| L6 | #f59e0b | #d97706 |
| L7 | #ef4444 | #dc2626 |
| L8 | #ec4899 | #db2777 |
| L9 | #f97316 | #ea580c |
| L10 | #fbbf24 | #f59e0b |

---

## 8. TRUST CHAIN MIN RULE

```
Final_STL = MIN(Product_STL, Seller_STL, Company_STL, Owner_STL)
```

- If any entity in the chain has low STL, the final displayed trust level = lowest
- This is the anti-fraud mechanism — ensures no entity can fake trust
- Company STL is often the bottleneck (must be upgraded separately)
- Validated via: `POST /api/stl/validate-product` → `{ finalStl, blockingLayer }`

---

## 9. REVENUE SPLIT & FRANCHISE MODEL

### Earnings Distribution
- 70% Seller/Provider
- 10% Rider/Delivery
- 10% Franchise Network
- 10% EHB Platform

### Franchise Hierarchy (40/25/20/15)
| Tier | Revenue Share |
|------|-------------|
| Country Franchise | 40% of franchise cut |
| Corporate Franchise | 25% |
| Sub Franchise | 20% |
| Online Franchise | 15% |

### 8-Step User Flow (DMO-Owned)
```
Registration → JPS Profile → STL Init → PSS Verify → CRB Certify →
DMO Approval → Score Calculation → Active (service access)
```

---

## 10. FILE MAP — Every File with Location & Contents

### 🔑 TIER 1: MASTER FILES (Copy these first — enough to rebuild 80%)

| # | File | Location | Lines | What It Contains |
|---|------|----------|-------|-----------------|
| 1 | **EHB-MASTER-INFO.md** | `ehb-info/` | 6,407 | DEFINITIVE master brief — company identity, 8 systems, industries, franchise, revenue split, stack, design, full changelog |
| 2 | **EHB-MASTER-DEVELOPMENT-PLAN.md** | `ehb-info/` | 2,488 | 100-week roadmap, 5 phases, 90 spec sections, 7 user types, 7 role-based STL formulas, 150+ pages, 200+ APIs |
| 3 | **EHB-BUILD-BLUEPRINT.md** | `ehb-info/` | 1,548 | 12-phase technical plan with deliverables, data models, API endpoints per phase |
| 4 | **EHB-API-SPEC.md** | `ehb-info/` | 1,607 | Complete HTTP API reference — 12 phases, all endpoints, request/response, Socket.IO events |
| 5 | **EHB-DATABASE-SCHEMA.md** | `ehb-info/` | 1,028 | MongoDB schema for 17+ collections with indexes, TTL, sharding |
| 6 | **CLAUDE.md** | `root` | 324 | AI agent context — stack, rules, design system, naming migrations, commit format |
| 7 | **EHB-UIUX-SYSTEM.md** | `design-system/` | 1,185 | Living design system — tokens, components, motion, responsive, accessibility |
| 8 | **ai-behavior.md** | `design-system/` | 296 | AI design thinking rules, upgrade ladder, forbidden patterns |

### 📋 TIER 2: DEPARTMENT CANONICAL FILES (One per system)

| # | File | Location | Lines | System |
|---|------|----------|-------|--------|
| 9 | **STL.md** | `ehb-info/departments/` | 140 | STL 10-level ladder, composite formula, MIN chain, behavioral triggers |
| 10 | **PSS.md** | `ehb-info/departments/` | 402 | 27 verification features, 5 categories, role requirements, point mapping |
| 11 | **CRB.md** | `ehb-info/departments/` | 110 | Certification, inspections, refill cadence, blockchain hashing |
| 12 | **DMO.md** | `ehb-info/departments/` | 1,969 | 7 roles, 8 modules, 10-level ladder, SaaS billing, 7 engines, policy |
| 13 | **JPS.md** | `ehb-info/departments/` | 180 | Career platform, AI matching, exams, contracts, salary models |
| 14 | **Franchise.md** | `ehb-info/departments/` | 808 | 4-tier hierarchy, KPIs, L8 source cap, regional rules |
| 15 | **Affiliate.md** | `ehb-info/departments/` | 563 | 5 commission types, multi-level L1–L5, STL-gated earning |
| 16 | **Commission.md** | `ehb-info/departments/` | 382 | Payment flows, fraud detection, chargeback, 40/25/20/15 split |
| 17 | **Wallet.md** | `ehb-info/departments/` | 186 | Multi-currency, escrow, token economics, withdrawal flows |
| 18 | **Token.md** | `ehb-info/departments/` | 309 | EHBGC tokenomics, staking, yield, governance, conversion |
| 19 | **Finance.md** | `ehb-info/departments/` | 118 | Payment gateway, cash flow, revenue split automation |
| 20 | **AI.md** | `ehb-info/departments/` | 144 | 7 AI modules — recommendation, fraud, lawyer, diagnosis, tutor, resume, advisor |
| 21 | **Blockchain.md** | `ehb-info/departments/` | 69 | Polkadot implementation, validators, multi-relay, on-chain governance |
| 22 | **Industries.md** | `ehb-info/departments/` | 137 | 38 industries, 3 phases, vertical governance, STL calibration |
| 23 | **GoSellr.md** | `ehb-info/departments/` | 211 | E-commerce module, seller verification, buyer protection |
| 24 | **Seller.md** | `ehb-info/departments/` | 187 | Onboarding, STL tracking, performance, dispute resolution |
| 25 | **Rider.md** | `ehb-info/departments/` | 234 | Verification, assignment algorithm, SLA, incentive structure |

### 🎨 TIER 3: THEME & UI CODE FILES

| # | File | Location | Lines | Contents |
|---|------|----------|-------|----------|
| 26 | **theme.ts** | `apps/web/lib/dmo/` | 214 | iOS Classic + Diamond tokens, ThemeTokens type, plastic coat tokens |
| 27 | **ehb-theme.css** | `apps/web/components/ehb-ui/` | 203 | CSS animations (sweep, sparkle, live-blink), STL level variables |
| 28 | **DmoThemeProvider.tsx** | `apps/web/components/dmo/` | ~200 | Theme context, CSS override generator, plastic class styling |
| 29 | **DmoThemeSwitcher.tsx** | `apps/web/components/dmo/` | 138 | 2-button switcher (iOS Classic / Diamond) with 3D active state |
| 30 | **ThemeCSSInjector.tsx** | `apps/web/components/` | ~250 | CSS variable injection for both themes across entire app |

### ⚙️ TIER 4: BACKEND BUSINESS LOGIC

| # | File | Location | Lines | Logic |
|---|------|----------|-------|-------|
| 31 | **stlService.js** | `services/api/stl-replit/services/` | 133 | Core STL formula (PROTECTED — 58 gold-master tests) |
| 32 | **dmoScoringService.js** | `services/api/stl-replit/services/` | 580 | DMO 4-component scoring (Activity/Behavior/Performance/Risk) |
| 33 | **dmoDecisionEngine.js** | `services/api/stl-replit/services/` | 747 | DMO approval/appeal/compliance engine |
| 34 | **walletService.js** | `services/api/stl-replit/services/` | 441 | Balance, escrow, multi-currency, settlement |
| 35 | **orderService.js** | `services/api/stl-replit/services/` | 349 | Order lifecycle, escrow release, dispute |
| 36 | **affiliateService.js** | `services/api/stl-replit/services/` | 389 | Referral tracking, commission accrual, tier promotion |
| 37 | **commissionService.js** | `services/api/stl-replit/services/` | 346 | Tier splits, referral bonuses, multi-party settlement |
| 38 | **franchiseService.js** | `services/api/stl-replit/services/` | 350 | Application, license, royalty, performance monitoring |
| 39 | **pssService.js** | `services/api/stl-replit/services/` | 300 | KYC/KYB verification, liveness, AML screening |
| 40 | **riderService.js** | `services/api/stl-replit/services/` | 395 | Availability, performance, certification, earnings |

### 📊 TIER 5: DATA MODELS (MongoDB/Mongoose)

| # | File | Location | Lines | Collection |
|---|------|----------|-------|-----------|
| 41 | **User.js** | `services/api/stl-replit/models/` | 171 | Users — embedded PSS/CRB/DMO/Franchise scoring |
| 42 | **DmoScore.js** | `services/api/stl-replit/models/` | 103 | DMO scores — activity/behavior/risk/performance |
| 43 | **Industry.js** | `services/api/stl-replit/models/` | 72 | Industry registry — code, phase, minStl |
| 44 | **Order.js** | `services/api/stl-replit/models/` | 128 | Orders — escrow, payment, delivery tracking |
| 45 | **Affiliate.js** | `services/api/stl-replit/models/` | 114 | Affiliates — referrals, commissions, tier |
| 46 | **Wallet.js** | `services/api/stl-replit/models/` | 102 | Wallets — balance, transactions, escrow |
| 47 | **Rider.js** | `services/api/stl-replit/models/` | 101 | Riders — certifications, performance, geo |
| 48 | **Commission.js** | `services/api/stl-replit/models/` | 98 | Commissions — splits, payout, settlement |
| 49 | **DmoDecision.js** | `services/api/stl-replit/models/` | 85 | DMO decisions — approvals, appeals, audit |
| 50 | **CRB_Certificate.js** | `services/api/stl-replit/models/` | 74 | Certificates — exams, proofs, chain hashes |
| 51 | **Franchise.js** | `services/api/stl-replit/models/` | 41 | Franchise — license, royalty, operations |

### 📝 TIER 6: SHARED TYPES (TypeScript)

| # | File | Location | Lines | Types |
|---|------|----------|-------|-------|
| 52 | **index.ts** | `packages/types/src/` | 23 | Re-exports all 13 type modules |
| 53 | **stl.ts** | `packages/types/src/` | 110 | STL scoring, levels, progression |
| 54 | **user.ts** | `packages/types/src/` | 151 | User profiles, roles, subscriptions |
| 55 | **api.ts** | `packages/types/src/` | 137 | API contracts, pagination, errors |
| 56 | **crb.ts** | `packages/types/src/` | 103 | CRB certification, verification |
| 57 | **order.ts** | `packages/types/src/` | 98 | Orders, booking, escrow |
| 58 | **industry.ts** | `packages/types/src/` | 98 | Industry registry, categories |
| 59 | **commission.ts** | `packages/types/src/` | 86 | Commission tiers, payouts |
| 60 | **wallet.ts** | `packages/types/src/` | 80 | Wallet, transactions, escrow |
| 61 | **pss.ts** | `packages/types/src/` | 79 | PSS verification, KYC |
| 62 | **affiliate.ts** | `packages/types/src/` | 69 | Affiliate, referral tracking |
| 63 | **rider.ts** | `packages/types/src/` | 65 | Rider profiles, certifications |
| 64 | **franchise.ts** | `packages/types/src/` | 42 | Franchise operations |
| 65 | **product.ts** | `packages/types/src/` | 41 | Product/service listings |

### 🧠 TIER 7: FRONTEND ENGINE FILES (STL/DMO Logic)

| # | File | Location | Lines | Logic |
|---|------|----------|-------|-------|
| 66 | **engine.ts** | `apps/web/lib/stl/` | 696 | Core STL calculation engine (frontend) |
| 67 | **fullSnapshot.ts** | `apps/web/lib/stl/` | 291 | STL state snapshot builder |
| 68 | **verificationStandards.ts** | `apps/web/lib/industry/` | 597 | Industry-specific verification standards |
| 69 | **services.ts** | `apps/web/lib/industry/` | 370 | Per-industry service catalog |
| 70 | **demoStore.ts** | `apps/web/lib/dmo/` | 369 | DMO demo data (applications, approvals) |
| 71 | **dynamicEngine.ts** | `apps/web/lib/stl/` | 185 | Real-time STL recalculation |
| 72 | **phases.ts** | `apps/web/lib/dmo/` | 108 | DMO roadmap phases |
| 73 | **config.ts** | `apps/web/lib/industry/` | 67 | Master industry config (all 38) |

### 📚 TIER 8: SUPPORTING DOCS & ARCHITECTURE (100+ files)

| Directory | File Count | Contents |
|-----------|-----------|----------|
| `docs/architecture/` | 60+ | Platform, microservices, database, blockchain, AI, franchise, KYC, metaverse, tokenomics |
| `docs/agents/` | 25 | Agent catalog, playbooks, workflows, quickstart |
| `docs/flows/` | 18 | User flows, economics, module dependencies |
| `docs/development/` | 18 | Migration, feature plans, UI design |
| `docs/strategy/` | 13 | Affiliate, DAO, franchise, global expansion, fundraising, investor pitch, token economy |
| `docs/ui-ux/` | 13 | Navigation maps, wireframes, design systems |
| `docs/features/` | 5 | DMO, GoSellr, PSS, STL, Wallet feature plans |
| `docs/roadmap/` | 4 | Full roadmap, phases, status |
| `ehb-info/prototypes/` | 3 | HTML interactive prototypes (DMO dashboard, flow diagram, themes) |
| `ehb-info/` | 4 | HTML ecosystem visualizations |

### 🔧 TIER 9: CONFIG & BUILD FILES

| File | Location | Contents |
|------|----------|----------|
| **package.json** | `root` | pnpm monorepo, turbo build, Node 20+ |
| **turbo.json** | `root` | Build pipeline, caching |
| **pnpm-workspace.yaml** | `root` | Workspace: apps/, services/, packages/ |
| **tsconfig.base.json** | `root` | TS path aliases |
| **ehb-status.json** | `root` | Real-time build health, priorities |
| **.cursorrules** | `root` | Cursor AI agent rules (mirror of CLAUDE.md) |
| **EHB-FOLDER-FLOW-MASTER.md** | `root` | Hybrid Architecture v1 folder spec |

---

## 11. HOW TO REBUILD FROM SCRATCH

### Step 1: Copy these files to new PC (priority order)

```
MINIMUM SET (can rebuild 90% of project):
├── ehb-info/EHB-MASTER-INFO.md          ← Company + all systems
├── ehb-info/EHB-MASTER-DEVELOPMENT-PLAN.md ← Full roadmap
├── ehb-info/EHB-BUILD-BLUEPRINT.md      ← 12-phase technical plan
├── ehb-info/EHB-API-SPEC.md             ← All API endpoints
├── ehb-info/EHB-DATABASE-SCHEMA.md      ← All DB schemas
├── ehb-info/departments/*.md            ← All 17 department specs
├── ehb-info/EHB-COMPLETE-PROJECT-MAP.md ← THIS FILE (map + master data)
├── CLAUDE.md                            ← AI agent rules
├── design-system/EHB-UIUX-SYSTEM.md    ← Design system
├── design-system/ai-behavior.md         ← AI design rules
└── apps/web/lib/dmo/theme.ts            ← Theme tokens (exact values)
```

### Step 2: Give agent this prompt

```
You are rebuilding the EHB Technologies super-app from master specifications.

Read these files in order:
1. EHB-COMPLETE-PROJECT-MAP.md (overview + file map)
2. CLAUDE.md (agent rules + stack)
3. EHB-MASTER-INFO.md (full company context)
4. EHB-BUILD-BLUEPRINT.md (12-phase plan)
5. All files in departments/ folder
6. EHB-UIUX-SYSTEM.md + ai-behavior.md (design)
7. EHB-API-SPEC.md + EHB-DATABASE-SCHEMA.md (technical)

Then build phase by phase following the blueprint.
Tech stack: Next.js 14 + Express + MongoDB + Prisma.
Design: iOS Classic + Diamond dual theme with plastic coating.
```

### Step 3: Verify

- Run `npx tsc --noEmit` — must be 0 errors
- Check `localhost:3000/dmo` — should show full dashboard
- Check `localhost:5000/api/health` — API must respond
- STL formula tests: `npm run test:stl` — must pass 58/58

---

## NAMING MIGRATIONS (Auto-correct these everywhere)

| Legacy | Current | Rule |
|--------|---------|------|
| SQL (Service Quality Level) | STL (Service Trust Level) | Whole-word only, NOT inside MySQL/PostgreSQL |
| EDR (Exam Decision Registry) | CRB (Central Record Blockchain) | Whole-word replace |
| SQLLevel | STLLevel | Case-preserving |
| sql_level | stl_level | Identifier prefix |

---

## CRITICAL PROTECTED FILES (Never modify without tests)

1. `services/api/stl-replit/services/stlService.js` — 58 gold-master regression tests
2. `apps/web/lib/dmo/theme.ts` — ThemeTokens type contract
3. `ehb-info/departments/*.md` — Canonical department specs (versioned)

---

*EHB Technologies (Pvt.) Ltd. — Complete Project Map v1.0 — 2026-04-21*
*Generated by Claude for Rafi — copy this file to rebuild anywhere.*
