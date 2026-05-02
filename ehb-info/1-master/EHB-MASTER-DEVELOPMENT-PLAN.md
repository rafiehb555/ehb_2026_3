# EHB MASTER DEVELOPMENT PLAN

**Company:** EHB Technologies (Pvt.) Ltd.
**Document Version:** 1.0
**Created:** 2026-04-14
**Based on:** EHB-MASTER-INFO.md v4.0 (90 sections, 100% specification complete + Multi-Layer Trust Architecture)
**Team Model:** AI-Led Development + 2-3 Junior Developers
**Goal:** Take EHB from 30% built → 100% production-ready
**Planning Horizon:** 100 years (built to last, built to scale)

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Development Philosophy](#2-development-philosophy)
3. [Team Structure & AI Automation](#3-team-structure)
4. [Technology Architecture](#4-technology-architecture)
5. [12 AI Skills for Auto-Management](#5-skills)
6. [Auto-Working .md Files](#6-md-files)
7. [PHASE 1: Core Trust Engine (Weeks 1-8)](#phase-1)
8. [PHASE 2: Marketplace & Services (Weeks 9-16)](#phase-2)
9. [PHASE 3: Franchise & Mobile (Weeks 17-24)](#phase-3)
10. [PHASE 4: AI Layer & Expansion (Weeks 25-32)](#phase-4)
11. [PHASE 5: Blockchain & Global Scale (Weeks 33-40)](#phase-5)
12. [Page-by-Page Development Map](#12-page-map)
13. [Complete API Specification](#13-api-spec)
14. [Complete Database Schema](#14-database)
15. [Security Architecture](#15-security)
16. [100-Year Scalability Plan](#16-scalability)
17. [Risk Management](#17-risk)
18. [Quality Assurance](#18-qa)
19. [Deployment Strategy](#19-deployment)
20. [Budget & Timeline Summary](#20-budget)

---

## 1. Executive Summary

EHB Technologies is building a global super-app that unifies 38 industries under one AI + blockchain trust system. The platform is currently ~30% built with core STL formula protected by 58 tests, basic auth, and partial PSS/GoSellr interfaces. **Phase 1 launches 16 core industries** with DMO behavioral scoring (L1–L10), DMO Mode routing (FAST/BALANCED/STRICT/CRITICAL), and real-time score recalculation.

This Master Plan takes EHB from 30% → 100% across 5 phases (40 weeks), using an AI-led development approach where Claude/AI agents handle 85%+ of coding, architecture, and testing, with 2-3 junior developers providing manual verification, CRB physical testing, and deployment support.

**Key Numbers:**
- 90 specification sections fully documented (v4.0 — Multi-Layer Trust Architecture)
- 8 core systems to build (PSS, CRB, STL, DMO, JPS, Wallet, AI, Blockchain)
- **3-Dimensional Trust System:** PSS (Identity L1-L10) + CRB (Physical L1-L10) + DMO (Behavioral L1-L10) → HYBRID Formula → Final EHB-STL-LEVEL
- **38 Industries in 3 Tiers:** Phase 1 (16 CORE), Phase 2 (16 EXPANSION), Phase 3 (6 NEW)
- **DMO Scoring Formula:** 4 components (Activity 30%, Behavior 30%, Performance 20%, Risk 20%) + DMO Mode routing
- 6 Phase-1 industries (GoSellr, Legal, Medical, Education, Jobs, Travel)
- 7 user types (Buyer, Seller, Rider, Inspector, Franchise Owner, Admin, Affiliate)
- 7 role-based STL formulas (different dimensions per role)
- 4 franchise dashboard levels (Sub, Master, Corporate, Country)
- 150+ pages to build
- 200+ API endpoints
- 50+ database collections
- 12 AI development skills
- 20+ auto-working .md files

---

## 2. Development Philosophy

### 2.1 AI-First Development
```
RULE: AI writes 85%+ of all code
RULE: Every feature starts with a spec → then AI builds it
RULE: Junior devs verify, test, and deploy — they don't architect
RULE: AI agents auto-manage through skills and .md configuration files
```

### 2.2 Trust-First Architecture (3-Dimensional)
```
ARCHITECTURE: Multi-Layer Trust System (World's First)
  PSS = Identity Trust Dimension (L1-L10) — 27 verification features
  CRB = Physical Trust Dimension (L1-L10) — Inspector-based certification
  DMO = Behavioral Trust Dimension (L1-L10) — 7 governance engines
  HYBRID FORMULA: Threshold → Weighted (PSS×40% + CRB×35% + DMO×25%) → Cap by lowest+1
  WALLET = Trust Multiplier (+5% to +20% based on EHBGC lock)

RULE: Nothing goes live without PSS verification gate (Identity)
RULE: Nothing touches money without STL check (Combined Trust)
RULE: Nothing gets approved without DMO governance (Behavioral)
RULE: Nothing is certified without CRB physical proof (Physical)
RULE: No dimension can be faked independently — all 3 must align
```

### 2.3 Quality Standards
```
MINDSET CHECK: "If Apple, Stripe, or Tesla saw this screen, would they sign it?"
CODE STANDARD: TypeScript strict mode, 80%+ test coverage
UI STANDARD: Premium glassmorphism, 4-theme system, responsive
SECURITY STANDARD: Bank-level encryption, zero-trust architecture
```

### 2.4 100-Year Building Principles
```
1. MODULAR: Every system is a pluggable module — can replace any part without touching others
2. SCALABLE: Architecture supports 1M → 100M → 1B users without rewrites
3. EXTENSIBLE: New industry = config + UI + rules (not new architecture)
4. MAINTAINABLE: Self-documenting code, auto-generated docs, living specs
5. RESILIENT: No single point of failure, graceful degradation, auto-recovery
6. AUDITABLE: Every action logged, every decision traceable, blockchain-backed
7. FUTURE-PROOF: Abstract integrations (payment, blockchain, AI provider can swap)
```

---

## 3. Team Structure & AI Automation

### 3.1 Team Roles

| Role | Who | Responsibility | Hours/Week |
|------|-----|---------------|------------|
| Product Owner | Rafi (Founder) | Vision, decisions, approvals | 20-30 |
| AI Lead Architect | Claude/AI Agent | Architecture, coding, testing, docs | 24/7 auto |
| Junior Dev 1 | Hire | Frontend verification, manual UI testing, deployment | 40 |
| Junior Dev 2 | Hire | Backend verification, API testing, database management | 40 |
| Junior Dev 3 (optional) | Hire | Mobile development assist, QA | 40 |

### 3.2 AI Automation Areas

| Area | AI Responsibility | Human Responsibility |
|------|------------------|---------------------|
| Code Writing | 95% — AI writes all feature code | 5% — Review + minor fixes |
| Architecture | 90% — AI designs all systems | 10% — Founder approval |
| Testing | 85% — AI writes all tests | 15% — Manual UI/UX testing |
| Documentation | 100% — AI auto-generates all docs | 0% — Just review |
| UI/UX Design | 90% — AI designs all interfaces | 10% — Visual review |
| Database Schema | 95% — AI designs all schemas | 5% — Migration verification |
| API Design | 95% — AI designs all endpoints | 5% — Postman testing |
| Deployment | 70% — AI scripts everything | 30% — Server setup + monitoring |
| Security Audit | 80% — AI scans + fixes | 20% — Penetration testing |
| Planning | 85% — AI plans sprints | 15% — Founder priorities |

### 3.3 Daily Workflow

```
MORNING (AI runs overnight):
  AI → Generates day's code based on sprint plan
  AI → Runs all tests
  AI → Updates ehb-status.json
  AI → Generates daily report

DAYTIME (Devs work):
  Dev 1 → Reviews AI-generated frontend code
  Dev 1 → Tests UI manually across devices
  Dev 2 → Reviews AI-generated backend code
  Dev 2 → Tests API with Postman
  Both → Deploy to staging if all green

EVENING (AI runs):
  AI → Processes dev feedback
  AI → Fixes reported issues
  AI → Prepares next day's sprint
  Founder → Reviews progress, makes decisions
```

---

## 4. Technology Architecture

### 4.1 Stack (Confirmed)

| Layer | Technology | Port | Status |
|-------|-----------|------|--------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | 3000 | 30% built |
| API | Node.js 20 + Express + Mongoose (ESM) | 5000 | 25% built |
| AI Backend | Node.js 20 + Express + OpenAI (CJS) | 8080 | 15% built |
| Database | MongoDB 7 (ehb_dev, ehb_ai_memory) | 27017 | 20% built |
| Cache | Redis (Phase 2) | 6379 | 0% |
| Queue | BullMQ (Phase 2) | — | 0% |
| Search | MongoDB Atlas Search (Phase 1) → Elasticsearch (Phase 3) | — | 0% |
| Blockchain | BSC BEP-20 (Phase 2) → Polkadot (Phase 3) | — | 0% |
| Mobile | React Native (Phase 3) | — | 0% |
| CDN | Cloudflare (assets) + AWS S3 (uploads) | — | 0% |
| Monitoring | PM2 + Sentry + custom dashboards | — | 0% |

### 4.2 Monorepo Structure (Target)

```
EHB DEVELOPMENT 2026/
├── apps/
│   ├── web/                          Next.js 14 frontend
│   │   ├── app/                      App Router pages
│   │   │   ├── (auth)/               Auth pages (login, register, forgot)
│   │   │   ├── (buyer)/              Buyer pages
│   │   │   ├── (seller)/             Seller pages
│   │   │   ├── (rider)/              Rider pages
│   │   │   ├── (inspector)/          Inspector pages
│   │   │   ├── (franchise)/          Franchise dashboards
│   │   │   ├── admin/                DMO admin panel
│   │   │   ├── gosellr/              GoSellr marketplace
│   │   │   ├── jps/                  Job Profile & Skill
│   │   │   ├── wallet/               Wallet system
│   │   │   ├── support/              Support & help
│   │   │   └── development/          Dev dashboard
│   │   ├── components/               Shared UI components
│   │   │   ├── ui/                   Base UI (card, button, input, etc.)
│   │   │   ├── layout/               Header, sidebar, footer
│   │   │   ├── charts/               Recharts components
│   │   │   ├── forms/                Form components
│   │   │   └── features/             Feature-specific components
│   │   └── lib/                      Utils, hooks, API client
│   └── mobile/                       React Native (Phase 3)
│       ├── buyer-app/
│       ├── seller-app/
│       └── rider-app/
├── services/
│   ├── api/stl-replit/               Main Express API
│   │   ├── routes/                   Route files
│   │   ├── controllers/              Controller logic
│   │   ├── services/                 Business logic
│   │   ├── models/                   Mongoose models
│   │   ├── middleware/               Auth, validation, rate-limit
│   │   ├── validation/               Zod schemas
│   │   └── config/                   DB, env, constants
│   ├── ai/                           AI backend
│   │   ├── src/routes/               AI route files
│   │   ├── src/services/             AI service logic
│   │   └── src/prompts/              AI prompt templates
│   └── workers/                      Background jobs
│       ├── stl-recalc/               STL recalculation worker
│       ├── crb-escalation/           CRB escalation worker
│       ├── fraud-detection/          Fraud monitoring worker
│       ├── notification/             Notification dispatcher
│       └── wallet-reconcile/         Wallet reconciliation worker
├── packages/
│   ├── ui/                           Shared React components
│   ├── types/                        TypeScript types/interfaces
│   ├── utils/                        Shared utilities
│   └── config/                       Shared configuration
├── infrastructure/
│   ├── scripts/                      Build/deploy scripts
│   ├── docker/                       Docker configs
│   └── k8s/                          Kubernetes configs (Phase 4)
├── data/
│   └── ehb-data/                     Seed data (38 industries, Phase 1/2/3 tiers)
├── docs/                             Documentation
├── design-system/                    UI/UX design system
├── ehb-info/                         Master specs (this folder)
└── .claude/skills/                   AI development skills
```

### 4.3 Environment Configuration

```env
# .env.example — Phase 1 required variables

# Server
NODE_ENV=development
PORT=5000
AI_PORT=8080

# Database
MONGODB_URI=mongodb://localhost:27017/ehb_dev
MONGODB_AI_URI=mongodb://localhost:27017/ehb_ai_memory

# Auth
JWT_SECRET=<generate-random-256-bit>
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d

# PSS Verification APIs
NADRA_API_KEY=<pending>
LIVENESS_API_KEY=<pending>
AML_API_KEY=<pending>

# AI
OPENAI_API_KEY=<your-key>
AI_MODEL=gpt-4-turbo
AI_FALLBACK_MODEL=gpt-3.5-turbo

# Storage
AWS_S3_BUCKET=ehb-uploads
AWS_ACCESS_KEY=<your-key>
AWS_SECRET_KEY=<your-key>
AWS_REGION=ap-south-1

# Push Notifications
FCM_SERVER_KEY=<pending>

# Payment
STRIPE_SECRET_KEY=<pending-phase-2>
EASYPAISA_API_KEY=<pending-phase-2>
JAZZCASH_API_KEY=<pending-phase-2>

# Blockchain (Phase 2)
BSC_RPC_URL=https://bsc-dataseed.binance.org
BSC_WALLET_PRIVATE_KEY=<pending>
EHBGC_CONTRACT_ADDRESS=<pending>
```

---

## 5. 12 AI Development Skills (ALL APPROVED)

These skills will be created as `.claude/skills/` folders, each with a `SKILL.md` that auto-triggers when relevant tasks are detected.

### Skill 1: `ehb-uiux-auto-designer` (EXISTS — Upgrade Needed)
**Location:** `.claude/skills/ehb-uiux-auto-designer/`
**Trigger:** Any UI/UX design task for EHB
**Upgrades Needed:**
- Add all 32 industry accent color definitions
- Add complete component library reference
- Add responsive breakpoint rules
- Add animation/motion specs
- Add accessibility checklist
- Add all 7 user type dashboard layouts

### Skill 2: `ehb-frontend-builder`
**Location:** `.claude/skills/ehb-frontend-builder/`
**Trigger:** "create page", "build component", "frontend", "Next.js"
**What it does:**
- Reads design system before any UI code
- Auto-generates Next.js pages with proper routing
- Creates TypeScript components with props
- Applies glassmorphism styling automatically
- Generates responsive layouts (mobile → desktop)
- Creates form components with Zod validation
- Auto-connects to API endpoints
- Generates loading/error/empty states

### Skill 3: `ehb-backend-builder`
**Location:** `.claude/skills/ehb-backend-builder/`
**Trigger:** "create API", "backend", "endpoint", "route", "Express"
**What it does:**
- Creates Express routes with proper middleware chain
- Generates controller → service → model structure
- Auto-adds auth middleware (JWT verification)
- Auto-adds STL level checks where needed
- Auto-adds rate limiting
- Creates Zod validation schemas
- Generates Mongoose models with proper indexes
- Auto-logs to audit trail
- Creates Postman collection entries

### Skill 4: `ehb-database-schema`
**Location:** `.claude/skills/ehb-database-schema/`
**Trigger:** "database", "schema", "model", "collection", "MongoDB"
**What it does:**
- Designs MongoDB schemas with proper types + indexes
- Creates Mongoose model files with validation
- Generates migration scripts for schema changes
- Creates seed data files
- Adds proper timestamps (createdAt, updatedAt)
- Adds soft delete (isDeleted flag)
- Creates compound indexes for query optimization
- Generates data flow diagrams

### Skill 5: `ehb-api-generator`
**Location:** `.claude/skills/ehb-api-generator/`
**Trigger:** "API", "endpoint", "REST", "generate routes"
**What it does:**
- Generates full CRUD endpoints from model definition
- Creates OpenAPI/Swagger documentation
- Generates Postman collection
- Creates request/response TypeScript types
- Adds pagination, filtering, sorting helpers
- Creates API versioning structure
- Generates API rate limit configuration
- Creates webhook endpoints where needed

### Skill 6: `ehb-test-writer`
**Location:** `.claude/skills/ehb-test-writer/`
**Trigger:** "test", "testing", "coverage", "jest", "vitest"
**What it does:**
- Generates unit tests for services
- Generates integration tests for API routes
- Generates E2E tests for critical flows
- Creates test fixtures and factories
- Generates STL formula regression tests (protect 58 gold masters)
- Creates load/performance test scripts
- Generates security test cases
- Auto-runs and reports results

### Skill 7: `ehb-deployment`
**Location:** `.claude/skills/ehb-deployment/`
**Trigger:** "deploy", "production", "staging", "CI/CD"
**What it does:**
- Generates Docker configs (Dockerfile, docker-compose)
- Creates CI/CD pipeline (GitHub Actions)
- Generates deployment scripts (PM2, systemd)
- Creates health check endpoints
- Generates monitoring alerts
- Creates rollback procedures
- Generates environment setup scripts
- Creates SSL/TLS configuration

### Skill 8: `ehb-documentation`
**Location:** `.claude/skills/ehb-documentation/`
**Trigger:** "docs", "documentation", "README", "API docs"
**What it does:**
- Auto-generates API documentation from code
- Creates user guides per user type
- Generates admin manual
- Creates franchise operator guide
- Generates developer onboarding docs
- Creates architecture diagrams (Mermaid)
- Updates ehb-status.json automatically
- Creates changelog entries

### Skill 9: `ehb-stl-calculator`
**Location:** `.claude/skills/ehb-stl-calculator/`
**Trigger:** "STL", "trust level", "score", "calculate"
**What it does:**
- Validates STL formula changes against 58 gold masters
- Generates STL migration scripts (9-level → 10-level)
- Creates STL simulation tools (what-if scenarios)
- Generates STL decay/recovery schedules
- Creates STL dashboard data providers
- Validates MIN rule across entity chain
- Tests EHBGC lock ladder compliance

### Skill 10: `ehb-flow-validator`
**Location:** `.claude/skills/ehb-flow-validator/`
**Trigger:** "flow", "user journey", "validate flow", "check integration"
**What it does:**
- Validates complete user flows (registration → active)
- Checks PSS → CRB → STL → DMO chain integrity
- Validates payment flows (order → escrow → release)
- Checks franchise hierarchy permissions
- Validates notification triggers
- Tests escalation paths
- Generates flow diagrams
- Reports broken/missing connections

### Skill 11: `ehb-security-auditor`
**Location:** `.claude/skills/ehb-security-auditor/`
**Trigger:** "security", "audit", "vulnerability", "penetration"
**What it does:**
- Scans code for security vulnerabilities (OWASP Top 10)
- Validates JWT implementation
- Checks input sanitization
- Validates rate limiting configuration
- Tests CORS configuration
- Checks file upload security
- Validates encryption implementation
- Generates security report

### Skill 12: `ehb-performance-optimizer`
**Location:** `.claude/skills/ehb-performance-optimizer/`
**Trigger:** "performance", "optimize", "speed", "cache", "slow"
**What it does:**
- Analyzes page load times
- Optimizes database queries (index suggestions)
- Implements caching strategy (Redis)
- Optimizes bundle size (code splitting)
- Creates lazy loading for components
- Optimizes image delivery (WebP, CDN)
- Creates performance benchmarks
- Generates lighthouse reports

---

## 6. Auto-Working .md Files

These `.md` files will be placed throughout the project to auto-guide AI agents during development.

### 6.1 Project-Level .md Files

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | Root | Master agent instructions (EXISTS — keep updated) |
| `AGENTS.md` | Root | Cross-agent instructions (EXISTS — keep updated) |
| `ehb-status.json` | Root | Real-time project health (EXISTS — auto-updated) |
| `SPRINT-PLAN.md` | Root | Current sprint goals + daily tasks |
| `DEVELOPMENT-STANDARDS.md` | Root | Coding standards, naming, patterns |
| `INTEGRATION-MAP.md` | Root | System-to-system connection map |

### 6.2 Design System .md Files

| File | Location | Purpose |
|------|----------|---------|
| `EHB-UIUX-SYSTEM.md` | `design-system/` | Complete UI/UX design system (EXISTS) |
| `ai-behavior.md` | `design-system/` | AI auto-upgrade rules (EXISTS) |
| `COMPONENT-LIBRARY.md` | `design-system/` | All available components catalog |
| `THEME-SYSTEM.md` | `design-system/` | 4-theme definitions + switching logic |
| `RESPONSIVE-RULES.md` | `design-system/` | Breakpoints + layout rules |
| `ANIMATION-GUIDE.md` | `design-system/` | Motion/transition standards |

### 6.3 Integration & Flow Files

| File | Location | Purpose |
|------|----------|---------|
| `USER-FLOWS-COMPLETE.md` | `ehb-info/` | **Complete user flows — all 7 user types with GoSellr + DMO + Franchise integration, step-by-step system interactions, cross-system data flows, trust impact at every step** |

### 6.4 Feature-Specific .md Files

| File | Location | Purpose |
|------|----------|---------|
| `PSS-DEVELOPMENT.md` | `docs/features/` | PSS 27 features build guide |
| `STL-DEVELOPMENT.md` | `docs/features/` | STL 10-level 3-dimensional migration + HYBRID formula |
| `DMO-DEVELOPMENT.md` | `docs/features/` | DMO 7 engines build guide |
| `WALLET-DEVELOPMENT.md` | `docs/features/` | Wallet + escrow build guide |
| `GOSELLR-DEVELOPMENT.md` | `docs/features/` | GoSellr marketplace build guide |
| `JPS-DEVELOPMENT.md` | `docs/features/` | Job system build guide |
| `FRANCHISE-DEVELOPMENT.md` | `docs/features/` | 4-level franchise dashboard guide |
| `CRB-DEVELOPMENT.md` | `docs/features/` | CRB inspection system build guide |
| `AI-DEVELOPMENT.md` | `docs/features/` | AI modules build guide |
| `BLOCKCHAIN-DEVELOPMENT.md` | `docs/features/` | BSC → Polkadot build guide |
| `MOBILE-DEVELOPMENT.md` | `docs/features/` | React Native 3-app guide |
| `NOTIFICATION-DEVELOPMENT.md` | `docs/features/` | Notification system build guide |

### 6.4 Auto-Management .md Files

| File | Location | Purpose |
|------|----------|---------|
| `AUTO-DEPLOY.md` | `infrastructure/` | Auto-deployment instructions |
| `AUTO-TEST.md` | `infrastructure/` | Auto-testing pipeline |
| `AUTO-BACKUP.md` | `infrastructure/` | Auto-backup schedule |
| `AUTO-MONITOR.md` | `infrastructure/` | Auto-monitoring alerts |
| `AUTO-SCALE.md` | `infrastructure/` | Auto-scaling rules |

---

## PHASE 1: Core Trust Engine (Weeks 1-8)
<a id="phase-1"></a>

**Goal:** Build the 4 foundational systems that everything else depends on.
**Priority Order:** PSS (Identity L1-L10) → CRB (Physical L1-L10) → DMO (Behavioral L1-L10) → STL HYBRID Engine → Wallet Multiplier (each builds on the previous, 3-dimensional architecture)
**Build Target:** These 4 systems must be 100% functional before Phase 2 starts.

### Phase 1 — Week-by-Week Breakdown

#### Week 1-2: PSS (Personal Security System)

**Database Models:**

```
Collection: users
{
  _id: ObjectId,
  email: String (unique, indexed),
  phone: String (unique, indexed),
  password: String (bcrypt hashed),
  role: enum ['buyer', 'seller', 'rider', 'inspector', 'franchise_owner', 'admin'],
  pssStatus: enum ['pending', 'basic_verified', 'enhanced_verified', 'rejected'],
  pssData: {
    idVerification: {
      type: enum ['cnic', 'passport', 'driving_license'],
      number: String (encrypted),
      frontImage: String (S3 URL),
      backImage: String (S3 URL),
      ocrResult: Object,
      verified: Boolean,
      verifiedAt: Date,
      verificationMethod: String
    },
    livenessCheck: {
      selfieImage: String (S3 URL),
      score: Number (0-100),
      passed: Boolean,
      checkedAt: Date
    },
    faceMatch: {
      matchScore: Number (0-100),
      passed: Boolean,
      matchedAt: Date
    },
    addressVerification: {
      address: String,
      city: String,
      province: String,
      country: String (default 'PK'),
      postalCode: String,
      proofImage: String (S3 URL),
      verified: Boolean
    },
    amlScreening: {
      status: enum ['clear', 'flagged', 'blocked'],
      lastChecked: Date,
      flags: [String]
    },
    deviceFingerprint: {
      deviceId: String,
      os: String,
      browser: String,
      ip: String,
      geo: { lat: Number, lng: Number },
      trustScore: Number
    },
    biometricAuth: {
      enabled: Boolean,
      type: enum ['fingerprint', 'face'],
      enrolledAt: Date
    }
  },
  stlLevel: Number (1-10, default 1),
  stlScore: Number (0-100, default 0),
  bstlScore: Number (0-100, buyer trust score),
  isActive: Boolean (default true),
  isBanned: Boolean (default false),
  banReason: String,
  lastLogin: Date,
  loginHistory: [{
    ip: String,
    device: String,
    location: String,
    timestamp: Date,
    success: Boolean
  }],
  createdAt: Date,
  updatedAt: Date,
  isDeleted: Boolean (default false)
}
Indexes: email (unique), phone (unique), role, stlLevel, pssStatus, isActive

Collection: pss_verifications
{
  _id: ObjectId,
  userId: ObjectId (ref: users, indexed),
  verificationType: enum ['id', 'liveness', 'face_match', 'address', 'aml', 'business', 'device', 'biometric'],
  status: enum ['pending', 'approved', 'rejected', 'expired'],
  data: Object (type-specific verification data),
  reviewedBy: ObjectId (ref: users, nullable — DMO admin),
  reviewNote: String,
  stlPointsAwarded: Number,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
Indexes: userId + verificationType (compound), status, expiresAt

Collection: pss_alerts
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  alertType: enum ['suspicious_login', 'device_change', 'aml_flag', 'multiple_accounts', 'fraud_pattern'],
  severity: enum ['low', 'medium', 'high', 'critical'],
  details: Object,
  status: enum ['open', 'investigating', 'resolved', 'dismissed'],
  assignedTo: ObjectId (ref: users, admin),
  resolvedAt: Date,
  createdAt: Date
}
Indexes: userId, alertType, severity, status
```

**API Endpoints (PSS):**

| Method | Endpoint | Auth | STL | Description |
|--------|----------|------|-----|-------------|
| POST | `/api/auth/register` | None | — | Register new user |
| POST | `/api/auth/login` | None | — | Login (returns JWT) |
| POST | `/api/auth/refresh` | Refresh | — | Refresh JWT token |
| POST | `/api/auth/forgot-password` | None | — | Send reset email |
| POST | `/api/auth/reset-password` | Token | — | Reset password |
| GET | `/api/pss/status/:userId` | JWT | — | Get PSS verification status |
| POST | `/api/pss/verify/id` | JWT | — | Submit ID verification |
| POST | `/api/pss/verify/liveness` | JWT | — | Submit liveness check |
| POST | `/api/pss/verify/face-match` | JWT | — | Submit face match |
| POST | `/api/pss/verify/address` | JWT | — | Submit address verification |
| POST | `/api/pss/verify/business` | JWT | L3+ | Submit business verification |
| GET | `/api/pss/verify/aml/:userId` | JWT+Admin | — | Run AML screening |
| POST | `/api/pss/device/register` | JWT | — | Register device fingerprint |
| GET | `/api/pss/alerts` | JWT+Admin | — | List PSS alerts |
| PATCH | `/api/pss/alerts/:id` | JWT+Admin | — | Update alert status |
| POST | `/api/pss/review/:verificationId` | JWT+Admin | L8 | DMO review of verification |

**Frontend Pages (PSS):**

| Page | Route | Content |
|------|-------|---------|
| Register | `/register` | Email/phone, password, role selector, terms checkbox |
| Login | `/login` | Email/phone, password, "forgot password" link, biometric option |
| Forgot Password | `/forgot-password` | Email input, send reset link |
| Reset Password | `/reset-password` | New password + confirm |
| PSS Dashboard | `/pss/dashboard` | **PSS Internal Level (L1-L10):** Current PSS level badge, 10-step verification ladder (Email→Phone→CNIC→FaceMatch→Address→Liveness→DeviceBind→Video→ContinuousMonitor→FullVerified), each step shows status (pending/verified/rejected/expired), PSS level impact on final EHB-STL, next verification step action button |
| ID Verification | `/pss/verify/id` | Document type selector, camera/upload for front+back, OCR auto-fill preview, submit button |
| Liveness Check | `/pss/verify/liveness` | Camera view, instruction overlay (blink/smile/turn), AI analysis progress, result display |
| Face Match | `/pss/verify/face-match` | Side-by-side: ID photo vs selfie, match score display, auto-proceed if >80% |
| Address Verify | `/pss/verify/address` | Address form (auto-fill from ID), proof of address upload, map pin confirmation |
| Business Verify | `/pss/verify/business` | Business name, registration number, SECP check, business documents upload |
| PSS Admin Panel | `/admin/pss` | Pending verifications queue, search users, verification detail view, approve/reject with notes, alert management |

**UI Components for PSS:**

| Component | Description | Used In |
|-----------|-------------|---------|
| `VerificationStepper` | 5-step progress bar (ID → Liveness → Face → Address → Complete) | PSS Dashboard |
| `DocumentUploader` | Camera + file upload with preview, crop, OCR overlay | ID Verify, Address |
| `LivenessCamera` | Real-time face detection with instruction prompts | Liveness Check |
| `FaceMatchComparison` | Side-by-side photo comparison with score | Face Match |
| `PSSStatusCard` | Glass card showing PSS completion %, STL impact | Dashboard, Profile |
| `VerificationBadge` | Small badge (green check / yellow pending / red rejected) | All user cards |
| `AlertCard` | Alert display with severity color coding | Admin PSS |
| `ReviewPanel` | Admin review interface with approve/reject/note | Admin PSS |

---

#### Week 3-4: STL (Service Trust Level) — 3-Dimensional HYBRID Engine

> **v4.0 ARCHITECTURE:** STL is no longer a single flat score. It combines 3 independent
> sub-level systems (PSS L1-L10, CRB L1-L10, DMO L1-L10) via the HYBRID formula:
> Step 1: Threshold check → Step 2: Weighted (PSS×40% + CRB×35% + DMO×25%) → Step 3: Cap by lowest+1

**Database Models:**

```
Collection: stl_records (v4.0 — 3-Dimensional Trust Architecture)
{
  _id: ObjectId,
  entityType: enum ['user', 'product', 'company', 'franchise'],
  entityId: ObjectId (indexed),
  role: enum ['buyer', 'seller', 'service_provider', 'rider', 'inspector', 'franchise_owner', 'admin'],
  
  // === FINAL COMBINED LEVEL ===
  level: Number (1-10),
  levelName: enum ['FREE', 'BASIC', 'NORMAL', 'STANDARD', 'ADVANCED', 'HIGH', 'PRO', 'VIP', 'ELITE', 'SUPREME'],
  
  // === 3-DIMENSIONAL SUB-LEVELS (NEW v4.0) ===
  pssLevel: {
    level: Number (1-10),
    name: enum ['EMAIL_ONLY', 'PHONE_VERIFIED', 'ID_UPLOADED', 'FACE_MATCHED', 'ADDRESS_VERIFIED', 'LIVENESS_PASSED', 'DEVICE_BOUND', 'VIDEO_VERIFIED', 'CONTINUOUS_MONITOR', 'FULLY_VERIFIED'],
    verifications: {
      email: Boolean, phone: Boolean, cnic: Boolean, faceMatch: Boolean,
      address: Boolean, liveness: Boolean, deviceBound: Boolean,
      videoVerified: Boolean, continuousMonitor: Boolean, fullHistory: Boolean
    },
    lastVerified: Date,
    expiresAt: Date
  },
  crbLevel: {
    level: Number (1-10),
    name: enum ['NONE', 'BASIC', 'ONE_PASS', 'TWO_PASSES', 'VERIFIED', 'RECHECKED', 'MULTI_CATEGORY', 'DUAL_INSPECTOR', 'CONTINUOUS_AUDIT', 'PREMIUM_VERIFIED'],
    inspectionCount: Number (default 0),
    lastInspection: Date,
    nextInspectionDue: Date,
    categories: [String],
    inspectorIds: [ObjectId]
  },
  dmoLevel: {
    level: Number (1-10),
    name: enum ['NEW', 'CLEAN', 'ACTIVE', 'VERIFIED', 'TRUSTED', 'STRONG', 'HIGH_COMPLIANCE', 'ELITE', 'PREMIUM', 'SUPREME'],
    factors: {
      complaintHistory: Number (0-100),
      resolutionCompliance: Number (0-100),
      policyAdherence: Number (0-100),
      activityConsistency: Number (0-100),
      fraudSignals: Number (0-100),
      disputeOutcomes: Number (0-100),
      timeOnPlatform: Number (days)
    }
  },
  
  // === HYBRID FORMULA RESULTS ===
  hybridCalc: {
    weightedScore: Number (result of PSS×40% + CRB×35% + DMO×25%),
    lowestSubLevel: Number (min of PSS, CRB, DMO levels),
    capApplied: Boolean (true if capped by lowest+1),
    thresholdsPassed: Boolean (all minimums met),
    walletMultiplier: Number (1.0 to 1.20),
    formulaVersion: String (default 'HYBRID_v1')
  },
  
  // === ROLE-SPECIFIC SCORES ===
  roleSpecific: {
    rps: Number (0-100, Rider Performance Score — riders only),
    ips: Number (0-100, Inspector Performance Score — inspectors only),
    franchisePerformance: Number (0-100, franchise owners only)
  },
  
  // === WALLET LOCK ===
  lockedEHBGC: Number (default 0),
  minLockedRequired: Number,
  walletBoostPercent: Number (0, 5, 10, 15, or 20),
  
  // === REFILL & DECAY (unchanged) ===
  refillCycle: {
    lastRefill: Date,
    nextRefill: Date,
    fee: Number (PKR),
    status: enum ['active', 'warning', 'expired', 'grace']
  },
  decay: {
    stage: enum ['none', 'warning_30d', 'reduction_60d', 'suspension_90d'],
    decayStartDate: Date,
    lastWarning: Date
  },
  
  // === HISTORY ===
  history: [{
    fromLevel: Number,
    toLevel: Number,
    fromPSS: Number, toPSS: Number,
    fromCRB: Number, toCRB: Number,
    fromDMO: Number, toDMO: Number,
    reason: String,
    changedAt: Date,
    changedBy: String (system/admin/auto)
  }],
  isActive: Boolean (default true),
  createdAt: Date,
  updatedAt: Date
}
Indexes: entityType + entityId (compound unique), level, role, pssLevel.level, crbLevel.level, dmoLevel.level, refillCycle.nextRefill

Collection: stl_events
{
  _id: ObjectId,
  entityType: String,
  entityId: ObjectId,
  eventType: enum ['level_up', 'level_down', 'score_change', 'lock_change', 'refill', 'decay_start', 'decay_stop', 'penalty', 'bonus'],
  details: Object,
  previousScore: Number,
  newScore: Number,
  previousLevel: Number,
  newLevel: Number,
  triggeredBy: String,
  createdAt: Date
}
Indexes: entityId, eventType, createdAt
```

**API Endpoints (STL — v4.0 3-Dimensional):**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/stl/:userId` | JWT | Get user's full STL record (includes PSS/CRB/DMO sub-levels) |
| GET | `/api/stl/product/:productId` | JWT | Get product STL (MIN rule applied) |
| POST | `/api/stl/recalc` | JWT+System | Trigger HYBRID formula recalculation |
| GET | `/api/stl/breakdown/:userId` | JWT | Get 3-dimensional breakdown (PSS-level, CRB-level, DMO-level, weighted score, cap info) |
| GET | `/api/stl/history/:userId` | JWT | Get STL level change history (includes sub-level changes) |
| POST | `/api/stl/validate-product` | JWT | Validate MIN rule: product ≤ seller ≤ company ≤ owner |
| GET | `/api/stl/requirements/:level` | JWT | Get requirements for target level (min PSS, min CRB, min DMO thresholds) |
| POST | `/api/stl/simulate` | JWT | Simulate "what-if" — given PSS/CRB/DMO inputs, return projected EHB-STL |
| GET | `/api/stl/bottleneck/:userId` | JWT | Identify which dimension is the bottleneck (lowest sub-level capping final STL) |
| POST | `/api/stl/refill/pay` | JWT | Pay refill fee |
| GET | `/api/stl/refill/status/:userId` | JWT | Check refill cycle status |
| GET | `/api/stl/decay/check` | System | Check all users for decay (across all 3 dimensions) |
| GET | `/api/stl/admin/overview` | JWT+Admin | STL system overview stats (3D distribution) |
| PATCH | `/api/stl/admin/override` | JWT+Admin(L8) | Manual STL override (DMO) — can override individual dimensions |
| GET | `/api/stl/admin/at-risk` | JWT+Admin | Users near decay/downgrade (any dimension) |
| GET | `/api/stl/admin/dimension-stats` | JWT+Admin | Distribution per dimension (PSS/CRB/DMO level histograms) |
| GET | `/api/pss/level/:userId` | JWT | Get PSS sub-level details and verification status |
| POST | `/api/pss/level/recalc/:userId` | JWT+System | Recalculate PSS level from verification data |
| GET | `/api/crb/level/:userId` | JWT | Get CRB sub-level details and inspection history |
| POST | `/api/crb/level/recalc/:userId` | JWT+System | Recalculate CRB level from inspection data |
| GET | `/api/dmo/level/:userId` | JWT | Get DMO sub-level details and behavioral factors |
| POST | `/api/dmo/level/recalc/:userId` | JWT+System | Recalculate DMO level from behavioral data |
| GET | `/api/user/:id/meta` | JWT | Get user's rule#, rating, refilling count, exam info |
| POST | `/api/refilling/initiate/:userId` | JWT | Start a refilling cycle (PSS/CRB/DMO/voluntary) |
| GET | `/api/refilling/history/:userId` | JWT | Get refilling history with dates, types, results |
| POST | `/api/exam/submit/:userId` | JWT+System | Submit exam result with score and grade |
| GET | `/api/exam/history/:userId` | JWT | Get exam history (count, dates, grades, STL impacts) |
| GET | `/api/exam/upcoming` | JWT | Get next scheduled exam date and field |
| POST | `/api/rating/submit` | JWT | Submit a rating for a user (1-5 stars + review) |
| GET | `/api/rating/:userId` | JWT | Get user's rating breakdown (avg, per-star count) |
| GET | `/api/education/courses/:userId` | JWT | Get user's enrolled courses list |
| POST | `/api/education/enroll` | JWT | Enroll in a course (must be field-related) |
| GET | `/api/jps/profile/:userId` | JWT | Get JPS profile with employment status and JPS score |
| POST | `/api/jps/apply/:jobId` | JWT | Apply for a job listing |
| PUT | `/api/jps/employment/update` | JWT+System | Update employment status (hired/left/transferred) |
| GET | `/api/jps/employer-stl/:companyId` | JWT | Get employer's STL for MIN rule calculation |
| GET | `/api/jps/employee-card/:userId` | JWT | Get complete employee STL card data with employer chain |
| POST | `/api/jps/performance/submit` | JWT+Admin | Submit quarterly performance review score |

**Frontend Pages (STL — v4.0 3-Dimensional):**

| Page | Route | Content |
|------|-------|---------|
| STL Dashboard | `/stl/dashboard` | **3-DIMENSIONAL VIEW:** Current final EHB-STL level badge (large center), 3 sub-level cards (PSS gauge, CRB gauge, DMO gauge), HYBRID formula visualization (weights shown), bottleneck indicator (which dimension is limiting), wallet multiplier display, level progression ladder (10 levels), refill countdown |
| PSS Level Detail | `/stl/pss` | PSS sub-level (L1-L10) with 10-step verification ladder, completed verifications (green checkmarks), next verification step highlighted, action buttons (verify phone, upload CNIC, do liveness check), expiry warnings |
| CRB Level Detail | `/stl/crb` | CRB sub-level (L1-L10) with inspection history, next inspection due, categories verified, inspector reports list, "Book Inspection" button for upgrades |
| DMO Level Detail | `/stl/dmo` | DMO sub-level (L1-L10) with behavioral factor breakdown (complaint history, compliance, activity, fraud signals), factor trend charts, improvement tips |
| STL History | `/stl/history` | Timeline of all STL events (level up/down, sub-level changes — PSS/CRB/DMO individually tracked), filter by date range and dimension, chart visualization |
| STL Upgrade Guide | `/stl/upgrade` | **3-DIMENSIONAL CHECKLIST:** For each target level — shows min PSS required, min CRB required, min DMO required, current gaps per dimension, prioritized action items ("Your CRB is the bottleneck — schedule inspection"), wallet lock recommendation |
| STL Simulator | `/stl/simulator` | Interactive "what-if" tool — slide PSS/CRB/DMO levels, see projected final STL in real-time, shows threshold blocks and cap effects |
| STL Refilling Dashboard | `/stl/refill` | Current cycle status, refilling count badge, fee display, early renewal discount (20%), payment options, history log of all past refillings with results |
| Continuous Education | `/education` | Enrolled courses list, next exam date countdown, exam history with grades (5x A+), course enrollment portal, field-specific course catalog |
| Exam Portal | `/education/exam` | Take current exam, timer, questions (field-specific), instant grading, grade display with STL impact message |
| Exam History | `/education/history` | Timeline of all exams taken with dates, scores, grades, STL impact per exam |
| Rating Dashboard | `/rating` | User's rating breakdown (5-star chart), who rated, recent reviews, rating trend over time |
| JPS Job Seeker Profile | `/jps/profile` | JPS score, skills list, resume, education, experience, applied jobs count, interview history, "Improve Profile" tips |
| JPS Employee Card | `/jps/employee/:id` | Employee STL card view — shows employment type (EHB/Franchise/Open Market), employer STL, MIN rule effect, performance score |
| JPS Job Board | `/jps/jobs` | Available jobs with employer STL visible, filter by field/location/STL requirement, apply button |
| JPS Employment History | `/jps/history` | Timeline of all employment — seeker→hired→transitions, STL changes at each transition |
| STL Admin Panel | `/admin/stl` | **3D ANALYTICS:** System-wide STL distribution, per-dimension distribution (PSS histogram, CRB histogram, DMO histogram), bottleneck analysis (most common limiting dimension), at-risk users list (any dimension near decay), manual override panel (can override individual dimensions), HYBRID formula config editor |
| Product STL View | `/stl/product/:id` | Product trust score, MIN rule visualization (product STL ≤ seller STL ≤ company STL ≤ owner STL), seller's 3D breakdown, CRB status, complaint/return rates |

**HYBRID Formula Threshold Table (§88.4):**

| Target EHB-STL | Min PSS | Min CRB | Min DMO | EHBGC Lock |
|----------------|---------|---------|---------|------------|
| L1 (FREE) | PSS-L1 | CRB-L1 | DMO-L1 | 0 |
| L2 (BASIC) | PSS-L2 | CRB-L1 | DMO-L2 | 0 |
| L3 (NORMAL) | PSS-L3 | CRB-L1 | DMO-L3 | 100 |
| L4 (STANDARD) | PSS-L4 | CRB-L3 | DMO-L4 | 300 |
| L5 (ADVANCED) | PSS-L5 | CRB-L5 | DMO-L5 | 700 |
| L6 (HIGH) | PSS-L6 | CRB-L5 | DMO-L6 | 1,500 |
| L7 (PRO) | PSS-L7 | CRB-L7 | DMO-L7 | 3,000 |
| L8 (VIP) | PSS-L8 | CRB-L8 | DMO-L8 | 7,000 |
| L9 (ELITE) | PSS-L9 | CRB-L9 | DMO-L9 | 15,000 |
| L10 (SUPREME) | PSS-L10 | CRB-L10 | DMO-L10 | 30,000 |

**Role-Based Formula Reference (§89):**

| Role | Dimensions Used | Wallet | Extra Score |
|------|----------------|--------|-------------|
| Buyer | PSS + DMO | Optional multiplier | — |
| Seller | PSS + CRB + DMO | Optional multiplier | — |
| Service Provider | PSS + CRB + DMO | Mandatory lock | — |
| Rider | PSS + DMO | — | RPS (0-100) |
| Inspector | PSS + CRB + DMO | — | IPS (0-100) |
| Franchise Owner | PSS + CRB + DMO | Mandatory (50K-1M) | Performance |
| Admin/DMO | PSS + DMO | — | Must be L8+ |

**HYBRID Formula Implementation (§88):**
```
function calculateEHBSTL(pssLevel, crbLevel, dmoLevel, role, walletLock) {
  // Step 1: Threshold check
  const thresholds = getThresholdsForLevel(targetLevel);
  if (pssLevel < thresholds.minPSS || crbLevel < thresholds.minCRB || dmoLevel < thresholds.minDMO) {
    return BLOCK; // Cannot reach target level
  }
  
  // Step 2: Weighted calculation (role determines which dimensions)
  let weighted;
  if (role === 'buyer' || role === 'admin') {
    weighted = (pssLevel * 0.55) + (dmoLevel * 0.45); // No CRB for buyers
  } else {
    weighted = (pssLevel * 0.40) + (crbLevel * 0.35) + (dmoLevel * 0.25);
  }
  let level = Math.floor(weighted);
  
  // Step 3: Cap by lowest + 1
  const lowest = Math.min(pssLevel, crbLevel, dmoLevel);
  level = Math.min(level, lowest + 1);
  
  // Step 4: Wallet multiplier (optional boost)
  const boost = getWalletBoost(walletLock); // 1.0 to 1.20
  level = Math.min(10, Math.floor(level * boost));
  
  return level;
}
```

---

#### Week 5-6: DMO (Decentralized Management Office)

**Database Models:**

```
Collection: dmo_decisions
{
  _id: ObjectId,
  decisionType: enum ['user_approval', 'seller_approval', 'franchise_approval', 'stl_override', 'ban', 'unban', 'freeze', 'unfreeze', 'policy_change', 'dispute_resolution', 'complaint_resolution', 'crb_review'],
  targetType: enum ['user', 'seller', 'product', 'franchise', 'system'],
  targetId: ObjectId,
  status: enum ['pending', 'approved', 'rejected', 'escalated', 'auto_resolved'],
  priority: enum ['low', 'medium', 'high', 'critical'],
  requiredLevel: Number (STL level needed to approve),
  data: Object (decision-specific data),
  aiRecommendation: {
    action: String,
    confidence: Number (0-100),
    reasoning: String,
    autoApproved: Boolean
  },
  assignedTo: ObjectId (ref: users, admin),
  reviewedBy: ObjectId,
  reviewNote: String,
  reviewedAt: Date,
  escalatedTo: ObjectId,
  escalatedReason: String,
  slaDeadline: Date,
  createdAt: Date,
  updatedAt: Date
}
Indexes: status + priority (compound), decisionType, targetId, assignedTo, slaDeadline

Collection: dmo_policies
{
  _id: ObjectId,
  policyName: String (unique),
  category: enum ['trust', 'finance', 'compliance', 'operations', 'security'],
  rules: [{
    ruleId: String,
    condition: Object (JSON rule engine format),
    action: String,
    priority: Number
  }],
  version: Number,
  isActive: Boolean,
  activatedAt: Date,
  scheduledChange: {
    newRules: [Object],
    activateAt: Date
  },
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

Collection: dmo_audit_log
{
  _id: ObjectId,
  action: String,
  actor: {
    userId: ObjectId,
    role: String,
    stlLevel: Number,
    ip: String,
    device: String
  },
  target: {
    type: String,
    id: ObjectId,
    name: String
  },
  details: Object,
  previousState: Object,
  newState: Object,
  isReversible: Boolean,
  reversedAt: Date,
  reversedBy: ObjectId,
  createdAt: Date
}
Indexes: action, actor.userId, target.id, createdAt

Collection: complaints
{
  _id: ObjectId,
  complainantId: ObjectId (ref: users),
  complainantRole: String,
  respondentId: ObjectId (ref: users),
  respondentRole: String,
  orderId: ObjectId (ref: orders, nullable),
  category: enum ['wrong_item', 'damaged', 'not_received', 'quality', 'fraud', 'behavior', 'service_issue', 'payment', 'delivery'],
  description: String,
  evidence: [{
    type: enum ['photo', 'video', 'document', 'screenshot'],
    url: String (S3),
    uploadedAt: Date
  }],
  status: enum ['filed', 'ai_review', 'seller_response', 'franchise_review', 'central_review', 'dmo_escalation', 'resolved', 'appealed'],
  aiAssessment: {
    category: String,
    severity: String,
    suggestedResolution: String,
    confidence: Number,
    autoResolvable: Boolean
  },
  resolution: {
    type: enum ['refund_full', 'refund_partial', 'replacement', 'stl_penalty', 'ban', 'dismissed', 'mediation'],
    amount: Number,
    note: String,
    resolvedBy: ObjectId,
    resolvedAt: Date
  },
  sellerResponse: {
    text: String,
    evidence: [Object],
    respondedAt: Date
  },
  appeal: {
    reason: String,
    status: enum ['pending', 'upheld', 'overturned'],
    reviewedBy: ObjectId,
    reviewedAt: Date
  },
  sla: {
    deadline: Date,
    breached: Boolean,
    tier: Number (1-4)
  },
  stlImpact: {
    complainantStlChange: Number,
    respondentStlChange: Number
  },
  createdAt: Date,
  updatedAt: Date
}
Indexes: complainantId, respondentId, orderId, status, category, createdAt
```

**API Endpoints (DMO):**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dmo/queue` | JWT+Admin | Get pending decisions queue |
| GET | `/api/dmo/queue/:id` | JWT+Admin | Get decision detail |
| POST | `/api/dmo/decide/:id` | JWT+Admin | Approve/reject decision |
| POST | `/api/dmo/escalate/:id` | JWT+Admin | Escalate to higher level |
| GET | `/api/dmo/audit` | JWT+Admin(L8) | View audit log |
| GET | `/api/dmo/policies` | JWT+Admin | List active policies |
| POST | `/api/dmo/policies` | JWT+Admin(L8) | Create/update policy |
| POST | `/api/dmo/schedule-policy` | JWT+Admin(L8) | Schedule policy change |
| GET | `/api/dmo/stats` | JWT+Admin | DMO dashboard statistics |
| POST | `/api/complaints` | JWT | File a complaint |
| GET | `/api/complaints/:id` | JWT | Get complaint detail |
| PATCH | `/api/complaints/:id/respond` | JWT(seller) | Seller responds to complaint |
| POST | `/api/complaints/:id/review` | JWT+Admin | Review complaint |
| POST | `/api/complaints/:id/resolve` | JWT+Admin | Resolve complaint |
| POST | `/api/complaints/:id/appeal` | JWT | Appeal resolution |
| GET | `/api/complaints/user/:userId` | JWT | User's complaints |
| POST | `/api/dmo/fraud/report` | JWT+System | Report fraud signal |
| GET | `/api/dmo/fraud/dashboard` | JWT+Admin | Fraud monitoring dashboard |
| POST | `/api/dmo/ban/:userId` | JWT+Admin(L8) | Ban user |
| POST | `/api/dmo/unban/:userId` | JWT+Admin(L8) | Unban user |
| POST | `/api/dmo/freeze/:userId` | JWT+Admin | Freeze wallet |
| GET | `/api/dmo/simulation` | JWT+Admin(L8) | Simulation mode (test rule changes) |

**Frontend Pages (DMO):**

| Page | Route | Content |
|------|-------|---------|
| DMO Dashboard | `/admin/dmo` | Decision queue (priority sorted), SLA countdowns, auto-resolved vs pending counts, 7 engine status indicators, fraud alerts, system health |
| Decision Queue | `/admin/dmo/queue` | List of pending decisions with filters (type, priority, SLA), each card shows: target, type, AI recommendation, deadline |
| Decision Detail | `/admin/dmo/queue/:id` | Full context of decision, AI recommendation with confidence %, approve/reject/escalate buttons, note field, audit trail |
| Complaint Center | `/admin/dmo/complaints` | All complaints with filters (status, category, severity), SLA tracker, resolution stats |
| Complaint Detail | `/admin/dmo/complaints/:id` | Complaint info, evidence viewer, seller response, AI assessment, resolution options, appeal status |
| Policy Manager | `/admin/dmo/policies` | Active policies list, edit policy rules (JSON editor), schedule future changes, version history |
| Fraud Monitor | `/admin/dmo/fraud` | Real-time fraud signals, risk heatmap, pattern detection alerts, manual investigation tools |
| Audit Trail | `/admin/dmo/audit` | Searchable audit log with filters, actor/target/action columns, time range, export |
| DMO Analytics | `/admin/dmo/analytics` | Resolution time trends, complaint category breakdown, SLA compliance rate, staff performance |
| Simulation Mode | `/admin/dmo/simulation` | "What if" rule testing, projected impact analysis, sandbox environment |

---

#### Week 7-8: Wallet System

**Database Models:**

```
Collection: wallets
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique indexed),
  totalBalance: Number (locked + free, display only),
  lockedBalance: Number (STL collateral),
  freeBalance: Number (spendable),
  currency: String (default 'EHBGC'),
  fiatEquivalent: {
    amount: Number,
    currency: String (default 'PKR'),
    rate: Number (1 EHBGC = X PKR)
  },
  lockDetails: {
    stlLockAmount: Number,
    stlLockLevel: Number,
    voluntaryLockAmount: Number,
    voluntaryLockTerm: enum ['none', '1year', '2year', '3year'],
    voluntaryLockStartDate: Date,
    voluntaryLockEndDate: Date,
    voluntaryLockBonuses: [String]
  },
  earnings: {
    pending: Number (not yet approved),
    approved: Number (available to claim),
    totalLifetime: Number
  },
  withdrawalLimits: {
    dailyLimit: Number,
    monthlyLimit: Number,
    dailyUsed: Number,
    monthlyUsed: Number,
    lastDailyReset: Date,
    lastMonthlyReset: Date
  },
  kycVerified: Boolean,
  isFrozen: Boolean (default false),
  frozenReason: String,
  frozenBy: ObjectId,
  frozenAt: Date,
  createdAt: Date,
  updatedAt: Date
}
Indexes: userId (unique), isFrozen, lockedBalance

Collection: transactions
{
  _id: ObjectId,
  walletId: ObjectId (ref: wallets),
  userId: ObjectId (ref: users),
  type: enum ['deposit', 'withdrawal', 'transfer_in', 'transfer_out', 'escrow_hold', 'escrow_release', 'escrow_refund', 'lock', 'unlock', 'earning_credit', 'fee_deduction', 'penalty', 'reward', 'franchise_split'],
  amount: Number,
  currency: String,
  status: enum ['pending', 'processing', 'completed', 'failed', 'reversed'],
  reference: {
    type: enum ['order', 'complaint', 'stl_refill', 'franchise_fee', 'affiliate_bonus', 'ad_payment', 'subscription'],
    id: ObjectId
  },
  counterparty: {
    userId: ObjectId,
    walletId: ObjectId,
    name: String
  },
  metadata: Object (type-specific data),
  blockchainTxHash: String (Phase 2+),
  fee: Number,
  netAmount: Number (amount - fee),
  balanceBefore: Number,
  balanceAfter: Number,
  createdAt: Date,
  completedAt: Date
}
Indexes: walletId + createdAt (compound), userId, type, status, reference.id, blockchainTxHash

Collection: escrows
{
  _id: ObjectId,
  orderId: ObjectId (ref: orders),
  buyerId: ObjectId,
  sellerId: ObjectId,
  amount: Number,
  serviceFee: Number (2% of amount),
  franchiseSplit: {
    subFranchise: Number (25%),
    corporateFranchise: Number (20%),
    countryFranchise: Number (15%)
  },
  sellerAmount: Number (40%),
  status: enum ['held', 'soft_release', 'full_release', 'refunded', 'disputed'],
  holdStartDate: Date,
  softReleaseDate: Date (holdStart + 24h),
  fullReleaseDate: Date (holdStart + 7d),
  releasedAt: Date,
  refundedAt: Date,
  disputeId: ObjectId (ref: complaints),
  createdAt: Date,
  updatedAt: Date
}
Indexes: orderId (unique), buyerId, sellerId, status
```

**API Endpoints (Wallet):**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/wallet/balance` | JWT | Get wallet balances |
| GET | `/api/wallet/transactions` | JWT | List transactions (paginated) |
| GET | `/api/wallet/transactions/:id` | JWT | Transaction detail |
| POST | `/api/wallet/deposit` | JWT | Initiate deposit |
| POST | `/api/wallet/withdraw` | JWT+KYC | Initiate withdrawal |
| POST | `/api/wallet/transfer` | JWT | P2P transfer |
| POST | `/api/wallet/lock` | JWT | Lock EHBGC for STL |
| POST | `/api/wallet/unlock` | JWT | Unlock EHBGC (triggers STL recalc) |
| POST | `/api/wallet/lock/voluntary` | JWT | Voluntary term lock (1/2/3 yr) |
| GET | `/api/wallet/earnings` | JWT | Get earnings breakdown |
| POST | `/api/wallet/earnings/claim` | JWT | Claim approved earnings |
| POST | `/api/wallet/escrow/create` | JWT+System | Create escrow for order |
| POST | `/api/wallet/escrow/release/:orderId` | JWT+System | Release escrow |
| POST | `/api/wallet/escrow/refund/:orderId` | JWT+Admin | Refund from escrow |
| GET | `/api/wallet/escrow/:orderId` | JWT | Get escrow status |
| POST | `/api/wallet/freeze/:userId` | JWT+Admin | Freeze wallet |
| POST | `/api/wallet/unfreeze/:userId` | JWT+Admin(L8) | Unfreeze wallet |
| GET | `/api/wallet/admin/overview` | JWT+Admin | System-wide wallet stats |
| GET | `/api/wallet/limits` | JWT | Get withdrawal limits |

**Frontend Pages (Wallet):**

| Page | Route | Content |
|------|-------|---------|
| Wallet Dashboard | `/wallet` | Total/Locked/Free balance cards (glass style), recent transactions list, quick actions (deposit/withdraw/transfer/lock), earnings summary card |
| Transaction History | `/wallet/transactions` | Full transaction list with filters (type, date, status), export to CSV, search by reference |
| Transaction Detail | `/wallet/transactions/:id` | Full transaction info, counterparty, reference link, blockchain hash (Phase 2), status timeline |
| Deposit | `/wallet/deposit` | Payment method selector (bank, Easypaisa, JazzCash), amount input, fee preview, confirmation |
| Withdraw | `/wallet/withdraw` | Amount input, withdrawal method, fee preview, daily/monthly limit display, KYC check gate, confirmation |
| Transfer | `/wallet/transfer` | Recipient search (by phone/email/username), amount input, note, fee preview, confirmation |
| EHBGC Lock | `/wallet/lock` | Current lock status, STL level requirement display, lock/unlock amount input, voluntary lock options (1/2/3 yr with benefits), STL impact preview |
| Earnings | `/wallet/earnings` | Pending/Approved/Total tabs, earning sources breakdown (orders, affiliate, franchise), claim button, earning history |
| Escrow Monitor | `/wallet/escrow` | Active escrows list, countdown timers (soft release 24h, full release 7d), status badges |
| Wallet Admin | `/admin/wallet` | System-wide balances, frozen wallets, large transaction alerts, reconciliation status |

---

### Phase 1 Summary

| System | DB Collections | API Endpoints | Frontend Pages | Components |
|--------|---------------|---------------|----------------|------------|
| PSS | 3 | 16 | 11 | 8 |
| STL | 2 | 13 | 6 | 10 |
| DMO | 4 | 22 | 10 | 12 |
| Wallet | 3 | 18 | 10 | 8 |
| **TOTAL Phase 1** | **12** | **69** | **37** | **38** |

---

## PHASE 2: Marketplace & Services (Weeks 9-16)
<a id="phase-2"></a>

**Goal:** Build GoSellr marketplace, JPS job system, CRB inspection, and Affiliate system.
**Depends on:** Phase 1 (PSS, STL, DMO, Wallet must be complete)

### Week 9-12: GoSellr Marketplace

**Database Models:**

```
Collection: products
{
  _id: ObjectId,
  sellerId: ObjectId (ref: users, indexed),
  shopId: ObjectId (ref: shops),
  title: String,
  slug: String (unique, indexed),
  description: String,
  shortDescription: String,
  industry: String (indexed),
  category: String (indexed),
  subcategory: String,
  productType: String,
  images: [{
    url: String (S3),
    alt: String,
    isPrimary: Boolean,
    order: Number
  }],
  pricing: {
    basePrice: Number,
    salePrice: Number,
    currency: String (default 'PKR'),
    costPrice: Number (hidden, for analytics),
    minOrderQty: Number (default 1),
    maxOrderQty: Number
  },
  variants: [{
    name: String (e.g., "Color", "Size"),
    options: [{
      value: String,
      priceModifier: Number,
      stock: Number,
      sku: String
    }]
  }],
  inventory: {
    totalStock: Number,
    reservedStock: Number (in active orders),
    availableStock: Number (total - reserved),
    lowStockThreshold: Number,
    trackInventory: Boolean (default true)
  },
  shipping: {
    weight: Number (kg),
    dimensions: { length: Number, width: Number, height: Number },
    freeShipping: Boolean,
    shippingCost: Number,
    estimatedDelivery: String
  },
  stl: {
    productStlScore: Number,
    productStlLevel: Number,
    sellerStlLevel: Number,
    reviewScore: Number,
    complaintRate: Number,
    returnRate: Number,
    crbVerified: Boolean,
    lastCalculated: Date
  },
  rules: {
    returnDays: Number,
    crbRequired: Boolean,
    warrantyRequired: Boolean,
    minSellerStl: Number,
    codAllowed: Boolean,
    prescriptionRequired: Boolean,
    expiryDateRequired: Boolean,
    coldChainRequired: Boolean
  },
  ratings: {
    average: Number (1-5),
    count: Number,
    distribution: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number }
  },
  tags: [String],
  isActive: Boolean (default true),
  isFeatured: Boolean (default false),
  isApproved: Boolean (default false, needs DMO review),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date,
  isDeleted: Boolean (default false)
}
Indexes: sellerId, slug (unique), industry + category (compound), stl.productStlLevel, pricing.salePrice, ratings.average, isActive + isApproved (compound), tags

Collection: shops
{
  _id: ObjectId,
  ownerId: ObjectId (ref: users, indexed),
  name: String,
  slug: String (unique),
  logo: String (S3 URL),
  banner: String (S3 URL),
  description: String,
  industry: String,
  categories: [String],
  address: {
    street: String,
    city: String,
    province: String,
    country: String,
    postalCode: String,
    coordinates: { lat: Number, lng: Number }
  },
  contact: {
    phone: String,
    email: String,
    whatsapp: String
  },
  stlLevel: Number (inherited from owner),
  ratings: { average: Number, count: Number },
  badges: [enum: 'rising_star', 'trusted_seller', 'premium_partner', 'gosellr_verified'],
  subscription: {
    type: enum ['free', 'premium'],
    expiresAt: Date
  },
  operatingHours: [{
    day: String,
    open: String,
    close: String,
    isClosed: Boolean
  }],
  deliveryOptions: {
    selfDelivery: Boolean,
    platformDelivery: Boolean,
    pickupAvailable: Boolean
  },
  isActive: Boolean,
  isVerified: Boolean (CRB),
  createdAt: Date,
  updatedAt: Date
}

Collection: orders
{
  _id: ObjectId,
  orderNumber: String (unique, auto-generated),
  buyerId: ObjectId (ref: users),
  sellerId: ObjectId (ref: users),
  shopId: ObjectId (ref: shops),
  items: [{
    productId: ObjectId,
    title: String,
    image: String,
    variant: Object,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number
  }],
  pricing: {
    subtotal: Number,
    deliveryFee: Number,
    serviceFee: Number (2%),
    discount: Number,
    total: Number,
    currency: String
  },
  payment: {
    method: enum ['wallet', 'cod', 'easypaisa', 'jazzcash', 'card'],
    status: enum ['pending', 'paid', 'refunded', 'partially_refunded'],
    transactionId: ObjectId (ref: transactions),
    codAmount: Number
  },
  delivery: {
    type: enum ['platform_rider', 'self_delivery', 'pickup', 'digital'],
    address: Object,
    riderId: ObjectId (ref: users),
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    status: enum ['pending', 'confirmed', 'preparing', 'ready', 'dispatched', 'in_transit', 'delivered', 'returned']
  },
  escrowId: ObjectId (ref: escrows),
  status: enum ['placed', 'confirmed', 'preparing', 'shipped', 'delivered', 'completed', 'cancelled', 'returned', 'disputed'],
  timeline: [{
    status: String,
    timestamp: Date,
    actor: String,
    note: String
  }],
  complaint: {
    hasComplaint: Boolean,
    complaintId: ObjectId
  },
  review: {
    hasReview: Boolean,
    reviewId: ObjectId
  },
  franchiseTerritory: {
    subFranchiseId: ObjectId,
    corporateId: ObjectId,
    countryId: ObjectId
  },
  createdAt: Date,
  updatedAt: Date
}
Indexes: orderNumber (unique), buyerId + createdAt, sellerId + createdAt, status, delivery.riderId, franchiseTerritory.subFranchiseId

Collection: reviews
{
  _id: ObjectId,
  orderId: ObjectId (ref: orders),
  productId: ObjectId (ref: products),
  reviewerId: ObjectId (ref: users),
  sellerId: ObjectId (ref: users),
  rating: Number (1-5),
  title: String,
  text: String,
  images: [String (S3 URLs)],
  isVerifiedPurchase: Boolean,
  sellerResponse: {
    text: String,
    respondedAt: Date
  },
  helpful: { yes: Number, no: Number },
  status: enum ['pending', 'published', 'flagged', 'removed'],
  stlImpact: Number (points added/deducted from seller),
  createdAt: Date,
  updatedAt: Date
}

Collection: carts
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique),
  items: [{
    productId: ObjectId,
    shopId: ObjectId,
    variant: Object,
    quantity: Number,
    addedAt: Date
  }],
  updatedAt: Date
}

Collection: wishlists
{
  _id: ObjectId,
  userId: ObjectId,
  products: [ObjectId],
  updatedAt: Date
}
```

**API Endpoints (GoSellr):**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Optional | List products (search, filter, sort, paginate) |
| GET | `/api/products/:slug` | Optional | Product detail |
| POST | `/api/products` | JWT(seller) | Create product |
| PATCH | `/api/products/:id` | JWT(seller) | Update product |
| DELETE | `/api/products/:id` | JWT(seller) | Soft delete product |
| GET | `/api/products/recommendations` | JWT | AI recommendations |
| GET | `/api/shops/:slug` | Optional | Shop detail + products |
| POST | `/api/shops` | JWT(seller) | Create shop |
| PATCH | `/api/shops/:id` | JWT(seller) | Update shop |
| GET | `/api/cart` | JWT | Get cart |
| POST | `/api/cart/add` | JWT | Add to cart |
| PATCH | `/api/cart/update` | JWT | Update cart item qty |
| DELETE | `/api/cart/remove/:productId` | JWT | Remove from cart |
| POST | `/api/orders` | JWT(buyer) | Place order (creates escrow) |
| GET | `/api/orders` | JWT | List orders (buyer or seller) |
| GET | `/api/orders/:id` | JWT | Order detail |
| PATCH | `/api/orders/:id/status` | JWT(seller/system) | Update order status |
| POST | `/api/orders/:id/cancel` | JWT(buyer) | Cancel order |
| POST | `/api/reviews` | JWT(buyer) | Submit review |
| GET | `/api/reviews/product/:productId` | Optional | Product reviews |
| POST | `/api/reviews/:id/respond` | JWT(seller) | Seller responds to review |
| GET | `/api/wishlist` | JWT | Get wishlist |
| POST | `/api/wishlist/:productId` | JWT | Toggle wishlist |
| GET | `/api/categories` | Optional | Category tree |
| GET | `/api/search` | Optional | Full-text search with AI ranking |
| POST | `/api/products/:id/guarantee` | JWT(seller) | Set money-back guarantee & replacement terms |
| GET | `/api/products/:id/guarantee` | Optional | Fetch guarantee info for product card display |
| PUT | `/api/products/:id/guarantee` | JWT(seller) | Update guarantee/replacement terms |
| POST | `/api/products/:id/guarantee/claim` | JWT(buyer) | Initiate money-back or replacement claim |
| GET | `/api/products/:id/trust-display` | Optional | Fetch seller PSS/CRB/DMO levels for product card |

**Frontend Pages (GoSellr — Buyer View):**

| Page | Route | Content |
|------|-------|---------|
| Home/Marketplace | `/gosellr` | Hero banner, featured products, categories grid, trending, deals, AI recommendations, search bar |
| Search Results | `/gosellr/search?q=` | Product grid with filters (category, price range, STL level, rating, COD available), sort options, AI-suggested filters |
| Category Page | `/gosellr/category/:slug` | Category header, subcategory tabs, products grid, filters sidebar |
| Product Detail | `/gosellr/product/:slug` | Image gallery (zoom), title, price (sale badge), STL badge, **Guarantee Strip** (Money Back days + Replacement days), **PSS/CRB/DMO Trust Bars**, seller info card, variants selector, quantity, add to cart, buy now, description tabs (Details/Specs/Reviews/Shipping), MIN rule chain, related products |
| Shop Page | `/gosellr/shop/:slug` | Shop banner/logo, shop info (rating, STL, badges), products grid, about, contact |
| Cart | `/gosellr/cart` | Items list (grouped by shop), quantity controls, price breakdown, remove button, proceed to checkout |
| Checkout | `/gosellr/checkout` | Delivery address (saved or new), delivery method, payment method (wallet/COD/mobile money), order summary, place order button |
| Order Tracking | `/gosellr/orders/:id` | Order status timeline, items, delivery tracking (map + rider location if platform delivery), estimated delivery, contact support |
| My Orders | `/gosellr/orders` | Tabs (Active/Completed/Cancelled/Returned), order cards with status badges |
| Write Review | `/gosellr/review/:orderId` | Star rating, title, text, photo upload, submit |

**Frontend Pages (GoSellr — Seller View):**

| Page | Route | Content |
|------|-------|---------|
| Seller Dashboard | `/seller/dashboard` | Today's stats (orders, revenue, returns), pending orders, STL status, low stock alerts, recent reviews |
| Product Manager | `/seller/products` | Product list (active/draft/out-of-stock), search, add new product button |
| Add/Edit Product | `/seller/products/new` `/seller/products/:id/edit` | Title, description, category selector (cascading), images upload (drag-drop), pricing, variants builder, inventory, shipping, rules preview (auto from category) |
| Order Manager | `/seller/orders` | New orders (accept/reject), preparing, shipped, completed tabs, bulk actions, export |
| Order Detail | `/seller/orders/:id` | Customer info (limited), items, payment status, delivery status, actions (confirm, ship, provide tracking) |
| Reviews Manager | `/seller/reviews` | All reviews, respond button, rating distribution chart |
| Shop Settings | `/seller/shop/settings` | Shop name, logo, banner, description, operating hours, delivery options |
| Seller Analytics | `/seller/analytics` | Revenue charts, top products, customer demographics, STL trend, return rate, complaint rate |

**GoSellr Product Card Component (EXACT spec per founder):**

```
┌─────────────────────────────────────────────┐
│ [Product Image - 16:9 ratio]                │
│                                              │
│  ♥ (wishlist)              🏅 STL L7         │
├─────────────────────────────────────────────┤
│ Product Title (max 2 lines, ellipsis)        │
│                                              │
│ ★ 4.6 (234 reviews)    📦 Free Shipping     │
│                                              │
│ ₨ 2,500  ₨̶ ̶3̶,̶0̶0̶0̶  (-17%)                  │
│                                              │
│ 🛡️ PSS ✓   🏛️ CRB ✓   ⭐ Trusted Seller   │
│                                              │
│ [Add to Cart]  [Buy Now]                     │
└─────────────────────────────────────────────┘
```

**Card Data Fields:**
1. Product image (primary)
2. Wishlist toggle (heart icon)
3. STL level badge (colored)
4. Product title
5. Star rating + review count
6. Shipping badge (free or cost)
7. Sale price + original price + discount %
8. Trust badges row (PSS/CRB/Seller badge)
9. Action buttons (Add to Cart / Buy Now)

---

### Week 13-14: JPS (Job Profile & Skill) + CRB

**JPS Database Models:**

```
Collection: jps_profiles
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique),
  headline: String,
  summary: String,
  skills: [{
    name: String,
    level: enum ['beginner', 'intermediate', 'advanced', 'expert'],
    verified: Boolean (CRB verified),
    endorsements: Number
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    verified: Boolean (CRB)
  }],
  experience: [{
    company: String,
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    verified: Boolean
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    crbHash: String (blockchain),
    verified: Boolean
  }],
  portfolio: [{
    title: String,
    description: String,
    url: String,
    images: [String]
  }],
  preferences: {
    jobTypes: [enum: 'full_time', 'part_time', 'contract', 'freelance'],
    industries: [String],
    locations: [String],
    remoteOk: Boolean,
    salaryRange: { min: Number, max: Number, currency: String }
  },
  completeness: Number (0-100%),
  stlLevel: Number,
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}

Collection: jobs
{
  _id: ObjectId,
  employerId: ObjectId (ref: users),
  companyName: String,
  title: String,
  description: String,
  requirements: [String],
  skills: [{ name: String, required: Boolean }],
  location: { city: String, province: String, country: String, remote: Boolean },
  type: enum ['full_time', 'part_time', 'contract', 'freelance'],
  salary: { min: Number, max: Number, currency: String, period: String },
  industry: String,
  minStlLevel: Number,
  contractDuration: Number (months, default 6),
  applications: Number (count),
  status: enum ['open', 'closed', 'filled', 'draft'],
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}

Collection: job_applications
{
  _id: ObjectId,
  jobId: ObjectId (ref: jobs),
  applicantId: ObjectId (ref: users),
  coverLetter: String,
  resumeUrl: String,
  matchScore: Number (AI-calculated),
  status: enum ['applied', 'shortlisted', 'interview', 'offered', 'accepted', 'rejected'],
  interviewDate: Date,
  notes: String,
  createdAt: Date
}
```

**CRB Database Models:**

```
Collection: crb_inspections
{
  _id: ObjectId,
  targetType: enum ['seller', 'product', 'service', 'franchise'],
  targetId: ObjectId,
  inspectorId: ObjectId (ref: users),
  inspectionType: enum ['initial', 'periodic', 'complaint_driven', 're_inspection'],
  category: String (industry-specific checklist),
  checklist: [{
    item: String,
    passed: Boolean,
    note: String,
    evidence: String (S3 URL)
  }],
  evidence: {
    photos: [String],
    videos: [String],
    documents: [String],
    gpsLocation: { lat: Number, lng: Number },
    timestamp: Date
  },
  result: enum ['pass', 'conditional', 'fail'],
  score: Number (0-100),
  report: String,
  review: {
    autoReview: { passed: Boolean, score: Number },
    humanReview: {
      reviewedBy: ObjectId,
      status: enum ['pending', 'approved', 'rejected'],
      note: String,
      reviewedAt: Date
    }
  },
  stlImpact: Number,
  blockchainHash: String,
  expiresAt: Date (6 months from approval),
  scheduledDate: Date,
  completedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
Indexes: targetId + targetType, inspectorId, result, expiresAt, status

Collection: crb_inspectors
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique),
  specializations: [String],
  zone: { city: String, areas: [String] },
  performance: {
    totalInspections: Number,
    passRate: Number,
    avgScore: Number,
    complaintRate: Number,
    ips: Number (Inspector Performance Score 0-100)
  },
  walletBond: Number (1K-5K EHBGC),
  training: {
    completed: Boolean,
    completedAt: Date,
    modules: [{
      name: String,
      passed: Boolean,
      score: Number
    }]
  },
  isActive: Boolean,
  lastInspectionDate: Date,
  nextRotation: Date,
  createdAt: Date
}
```

---

### Week 15-16: Affiliate System

**Database Models:**

```
Collection: affiliates
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique),
  referralCode: String (unique),
  referredBy: ObjectId (ref: affiliates, nullable),
  level: Number (depth in tree),
  downline: [ObjectId] (direct referrals),
  downlineCount: Number,
  totalEarnings: Number,
  pendingEarnings: Number,
  stlMultiplier: Number (1.0 - 2.0 based on STL),
  bonuses: [{
    type: enum ['direct_referral', 'team_bonus', 'leadership_bonus', 'monthly_target', 'rank_bonus', 'special_event', 'industry_bonus'],
    amount: Number,
    earnedAt: Date,
    paidOut: Boolean
  }],
  rank: enum ['starter', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'elite'],
  isActive: Boolean,
  createdAt: Date
}

Collection: affiliate_transactions
{
  _id: ObjectId,
  affiliateId: ObjectId,
  type: String,
  sourceUserId: ObjectId (who generated the earning),
  sourceAction: String (what they did),
  amount: Number,
  level: Number (depth),
  status: enum ['pending', 'approved', 'paid', 'rejected'],
  paidAt: Date,
  createdAt: Date
}
```

### Phase 2 Summary

| System | DB Collections | API Endpoints | Frontend Pages | Components |
|--------|---------------|---------------|----------------|------------|
| GoSellr | 6 | 24 | 18 | 25 |
| JPS | 3 | 15 | 10 | 12 |
| CRB | 2 | 12 | 8 | 10 |
| Affiliate | 2 | 10 | 6 | 8 |
| **TOTAL Phase 2** | **13** | **61** | **42** | **55** |

---

## PHASE 3: Franchise & Mobile (Weeks 17-24)
<a id="phase-3"></a>

**Goal:** Build 4-level franchise dashboards, rider system, notification engine, and start mobile apps.

### Week 17-20: Franchise Dashboard System (4 Levels)

**Each franchise level gets a complete dashboard with different data scope and permissions:**

#### Sub Franchise Dashboard
**Route:** `/franchise/sub/dashboard`
**Scope:** Local area (neighborhood/town)
**EHBGC Lock:** 50,000

**7 Tabs:**

| Tab | Content |
|-----|---------|
| Overview | Local order count, local revenue (25% share), active sellers count, active riders count, pending tasks, alert cards |
| Sellers | Sellers in territory list, seller STL distribution chart, new registrations, seller performance rankings |
| Orders | Local orders feed (real-time), delayed order alerts (2-3 min warning), order volume chart (hourly), COD collection status |
| Support | Local complaints assigned, SLA countdowns, escalation options, resolution stats |
| Inspections | CRB inspections due in territory, inspector assignment, inspection results, re-inspection scheduling |
| Finance | Revenue share breakdown, pending payouts, transaction history, franchise fee status |
| Settings | Territory boundaries (map view), operating hours, contact info, team members |

#### Master Franchise Dashboard
**Route:** `/franchise/master/dashboard`
**Scope:** City-level
**EHBGC Lock:** 200,000

**Same 7 tabs + additional data:**
- Sees all Sub Franchises in their city
- Comparative performance charts (sub vs sub)
- City-level analytics and trends
- Sub franchise health scores
- Can escalate issues from sub to corporate
- Revenue: 20% share from all subs in city

#### Corporate Franchise Dashboard
**Route:** `/franchise/corporate/dashboard`
**Scope:** Province/region
**EHBGC Lock:** 500,000

**7 tabs + strategic view:**
- Sees all Master Franchises in province
- Regional market analysis
- Franchise expansion recommendations (AI)
- Policy compliance monitoring
- Revenue: 20% share from entire region
- Can propose new territory assignments

#### Country Franchise Dashboard
**Route:** `/franchise/country/dashboard`
**Scope:** National operations
**EHBGC Lock:** 1,000,000

**7 tabs + national view:**
- All Corporate Franchises in country
- National performance dashboard
- Country-specific rule management
- International compliance (data sovereignty)
- Revenue: 15% share from entire country
- Reports directly to DMO/Board

**Franchise Database Models:**

```
Collection: franchises
{
  _id: ObjectId,
  ownerId: ObjectId (ref: users),
  type: enum ['sub', 'master', 'corporate', 'country'],
  name: String,
  territory: {
    country: String,
    province: String,
    city: String,
    areas: [String],
    boundaries: { type: 'Polygon', coordinates: [[[Number]]] }
  },
  parentFranchise: ObjectId (ref: franchises, nullable),
  childFranchises: [ObjectId],
  lockedEHBGC: Number,
  healthScore: Number (0-100),
  performance: {
    totalOrders: Number,
    totalRevenue: Number,
    activeSellers: Number,
    activeRiders: Number,
    avgResponseTime: Number,
    complaintResolutionRate: Number,
    stlAverage: Number
  },
  revenue: {
    sharePercentage: Number,
    totalEarned: Number,
    pendingPayout: Number,
    lastPayout: Date
  },
  team: [{
    userId: ObjectId,
    role: enum ['owner', 'manager', 'operator', 'support'],
    addedAt: Date
  }],
  contract: {
    startDate: Date,
    endDate: Date,
    renewalDate: Date,
    status: enum ['active', 'probation', 'suspended', 'terminated']
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Week 21-22: Rider System + Notification Engine

**Rider Database:**

```
Collection: riders
{
  _id: ObjectId,
  userId: ObjectId (ref: users, unique),
  vehicle: {
    type: enum ['bike', 'car', 'bicycle'],
    registrationNumber: String,
    model: String,
    verified: Boolean
  },
  zone: {
    city: String,
    areas: [String],
    homeLocation: { lat: Number, lng: Number }
  },
  isOnline: Boolean,
  currentLocation: { lat: Number, lng: Number, updatedAt: Date },
  currentOrderId: ObjectId,
  performance: {
    totalDeliveries: Number,
    avgDeliveryTime: Number,
    customerRating: Number,
    acceptanceRate: Number,
    codComplianceRate: Number,
    rps: Number (Rider Performance Score 0-100)
  },
  earnings: {
    todayEarnings: Number,
    weekEarnings: Number,
    monthEarnings: Number,
    codBalance: Number (to deposit)
  },
  stlLevel: Number,
  isActive: Boolean,
  createdAt: Date
}

Collection: delivery_tasks
{
  _id: ObjectId,
  orderId: ObjectId,
  riderId: ObjectId,
  sellerId: ObjectId,
  buyerId: ObjectId,
  status: enum ['assigned', 'accepted', 'pickup_arrived', 'picked_up', 'in_transit', 'arrived', 'delivered', 'failed', 'returned'],
  pickup: {
    address: Object,
    coordinates: { lat: Number, lng: Number },
    arrivedAt: Date,
    pickedUpAt: Date,
    pickupCode: String,
    pickupPhoto: String
  },
  delivery: {
    address: Object,
    coordinates: { lat: Number, lng: Number },
    estimatedTime: Date,
    arrivedAt: Date,
    deliveredAt: Date,
    deliveryOTP: String,
    deliveryPhoto: String
  },
  payment: {
    isCOD: Boolean,
    codAmount: Number,
    codCollected: Boolean,
    codDepositedAt: Date
  },
  distance: Number (km),
  earning: Number (base + distance + bonuses),
  timeline: [{
    status: String,
    timestamp: Date,
    location: { lat: Number, lng: Number }
  }],
  createdAt: Date
}

Collection: notifications
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  type: String,
  title: String,
  body: String,
  data: Object,
  channels: [enum: 'push', 'email', 'sms', 'in_app'],
  priority: enum ['low', 'normal', 'high', 'critical'],
  status: enum ['pending', 'sent', 'delivered', 'read', 'failed'],
  readAt: Date,
  sentAt: Date,
  createdAt: Date
}
Indexes: userId + createdAt, status, type
```

---

### Week 23-24: Mobile App Foundation (React Native)

**3 Separate Apps:**

| App | Target User | Core Screens |
|-----|-------------|-------------|
| EHB Buyer | Buyers | Home, Search, Product Detail, Cart, Checkout, Orders, Profile, Wallet, Support |
| EHB Seller | Sellers | Dashboard, Products, Orders, Reviews, Analytics, Shop Settings, Wallet |
| EHB Rider | Riders | Task Queue, Active Delivery (Map), Earnings, Performance, COD Balance, Profile |

**Shared Mobile Components:**
- Auth screens (login/register/PSS verification via camera)
- Push notification handling (FCM)
- GPS tracking (rider location reporting)
- Camera integration (KYC, CRB evidence, product photos)
- Offline mode (cached products, saved cart)
- Biometric auth (wallet access)

### Phase 3 Summary

| System | DB Collections | API Endpoints | Frontend Pages | Components |
|--------|---------------|---------------|----------------|------------|
| Franchise | 1 | 20 | 28 (7 per level) | 20 |
| Rider | 2 | 15 | 8 | 12 |
| Notifications | 1 | 8 | 3 | 6 |
| Mobile Foundation | — | — | 30 (across 3 apps) | 40 |
| **TOTAL Phase 3** | **4** | **43** | **69** | **78** |

---

## PHASE 4: AI Layer & Expansion (Weeks 25-32)
<a id="phase-4"></a>

**Goal:** Build 5 AI modules, expand to all 6 Phase-1 industries, advanced analytics.

### AI Modules to Build

| Module | Backend Route | Frontend Integration |
|--------|--------------|---------------------|
| AI Helpline (Chatbot) | `/api/ai/chat` | Floating widget on all pages, dedicated support page |
| AI Fraud Detection | `/api/ai/fraud/*` | DMO fraud dashboard, real-time alerts |
| AI Recommendation | `/api/ai/recommend/*` | Product cards, search results, home page |
| AI Delivery Optimization | `/api/ai/delivery/*` | Rider assignment, route planning |
| AI Risk Scoring | `/api/ai/risk/*` | Order processing, DMO decision queue |

### Industry Expansion (Phase-1 Industries)

| Industry | Key Pages | Unique Features |
|----------|-----------|-----------------|
| Legal (OLS) | Lawyer search, consultation booking, case management | AI Lawyer, document drafting, 22 client limit |
| Medical (WMS) | Doctor search, appointment booking, prescriptions | AI Diagnosis, HIPAA compliance, lab reports |
| Education (HPS/OBS) | Course catalog, LMS, tutor matching | AI Course Tutor, adaptive learning |
| Travel (AGTS) | Hotel/flight search, itinerary builder | Cross-border bookings, visa flows |
| Jobs (JPS) | Already built in Phase 2 — enhance with AI matching | AI Resume Builder, Interview Prep |

### Phase 4 Summary

| System | New Pages | New APIs | New Components |
|--------|-----------|----------|---------------|
| AI Modules (5) | 10 | 25 | 15 |
| Legal (OLS) | 12 | 15 | 10 |
| Medical (WMS) | 15 | 18 | 12 |
| Education (HPS) | 12 | 15 | 10 |
| Travel (AGTS) | 10 | 12 | 8 |
| **TOTAL Phase 4** | **59** | **85** | **55** |

---

## PHASE 5: Blockchain & Global Scale (Weeks 33-40)
<a id="phase-5"></a>

**Goal:** BSC blockchain integration, multi-country rollout, premium features, optimization.

### Blockchain (BSC — Phase 2 of Blockchain Roadmap)

| Task | Description |
|------|-------------|
| EHBGC BEP-20 Token | Deploy token contract on BSC |
| Escrow Smart Contract | On-chain escrow for orders |
| CRB Hash Storage | Store inspection certificates on-chain |
| Wallet Lock Contract | On-chain EHBGC lock verification |
| Bridge Preparation | Prepare for Polkadot migration |

### Multi-Country Rollout

| Task | Description |
|------|-------------|
| Multi-language | Full i18n (Urdu, English, Arabic, Hindi) |
| Multi-currency | PKR, USD, AED, SAR with real-time conversion |
| Data Sovereignty | Country-specific data partitioning |
| Local Payment | Easypaisa/JazzCash (PK), Sadad (SA), UAE Pay |
| Local Compliance | SECP (PK), DFSA (UAE), local laws |

### Premium Features

| Feature | Description |
|---------|-------------|
| Seller Premium Subscription | Analytics, priority ranking, AI suggestions |
| Ad System | CPC/CPM ads with STL trust scoring |
| Advanced Analytics | AI-powered business insights for sellers |
| Seasonal Rules Engine | Auto-adjust by country/season |
| Multi-vendor Cart | Buy from multiple sellers in one checkout |

### Phase 5 Summary

| System | New Pages | New APIs | New Components |
|--------|-----------|----------|---------------|
| Blockchain | 5 | 15 | 8 |
| Multi-country | 10 | 20 | 12 |
| Premium Features | 15 | 20 | 15 |
| Performance/Scale | — | — | — |
| **TOTAL Phase 5** | **30** | **55** | **35** |

---

## GRAND TOTAL — All Phases

| Phase | Weeks | DB Collections | API Endpoints | Pages | Components |
|-------|-------|---------------|---------------|-------|------------|
| Phase 1 (Core Trust) | 1-8 | 12 | 69 | 37 | 38 |
| Phase 2 (Marketplace) | 9-16 | 13 | 61 | 42 | 55 |
| Phase 3 (Franchise+Mobile) | 17-24 | 4 | 43 | 69 | 78 |
| Phase 4 (AI+Industries) | 25-32 | 8 | 85 | 59 | 55 |
| Phase 5 (Blockchain+Scale) | 33-40 | 5 | 55 | 30 | 35 |
| **GRAND TOTAL** | **40 weeks** | **42** | **313** | **237** | **261** |

---

## 15. Security Architecture

### 15.1 Authentication & Authorization

```
Layer 1: JWT (access + refresh tokens)
Layer 2: Role-based access control (RBAC)
Layer 3: STL-level gating (certain actions need minimum STL)
Layer 4: PSS verification gates
Layer 5: Device fingerprinting
Layer 6: Rate limiting (per user, per IP, per endpoint)
Layer 7: CORS + CSP headers
Layer 8: Input validation (Zod schemas on every endpoint)
```

### 15.2 Data Security

```
Encryption at rest: AES-256 for sensitive fields (ID numbers, financial data)
Encryption in transit: TLS 1.3 everywhere
Key management: AWS KMS (Phase 1), HashiCorp Vault (Phase 2)
Password hashing: bcrypt (12 rounds)
PII protection: Encrypted fields + access logging
Backup encryption: All backups AES-256 encrypted
```

### 15.3 Fraud Prevention (Multi-Layer)

```
Layer 1: AI real-time monitoring (rule-based Phase 1, ML Phase 2)
Layer 2: PSS device fingerprinting + behavioral analysis
Layer 3: DMO Up-Guard pattern detection
Layer 4: Wallet rate limiting + anomaly detection
Layer 5: CRB physical verification (human layer)
Layer 6: Franchise local monitoring (human layer)
Layer 7: Blockchain audit trail (immutable evidence)
```

---

## 16. 100-Year Scalability Plan

### 16.1 Architecture Principles for Century-Scale

| Principle | Implementation |
|-----------|---------------|
| **Microservices Ready** | Monolith first → extract services as needed. Each core system (PSS, STL, DMO, Wallet) has clean boundaries and can become independent services. |
| **Database Agnostic** | Repository pattern abstracts MongoDB. Can migrate to PostgreSQL, CockroachDB, or planet-scale DB without changing business logic. |
| **AI Provider Agnostic** | AI service layer abstracts OpenAI. Can swap to Claude, Gemini, Llama, or custom models. |
| **Blockchain Agnostic** | BSC → Polkadot → future chains. Abstraction layer for all on-chain operations. |
| **Multi-Cloud Ready** | Not locked to AWS. Can run on GCP, Azure, or self-hosted. |
| **Event-Driven Core** | All system events published to message bus. Any new system can subscribe without touching existing code. |
| **Plugin Architecture** | New industries = plugins. Standard interface: UI components, API routes, rules, CRB checklists. No core changes. |
| **Data Sovereignty** | Country-level data partitioning. Each franchise territory can run independently if needed. |
| **Zero-Downtime Updates** | Blue-green deployments, feature flags, canary releases. |
| **Self-Healing** | Health checks → auto-restart → auto-scale → alert if persistent. |

### 16.2 Growth Phases

| Phase | Users | Countries | Industries | Infrastructure |
|-------|-------|-----------|------------|---------------|
| Year 1 | 100K | 2 | 6 | Single region, MongoDB |
| Year 3 | 1M | 10 | 15 | Multi-region, read replicas |
| Year 5 | 10M | 25 | 25 | Kubernetes, microservices |
| Year 10 | 100M | 50+ | 32 | Global edge network |
| Year 25 | 500M | 100+ | 50+ | Planet-scale distributed |
| Year 50 | 1B+ | Global | 100+ | Autonomous AI operations |
| Year 100 | Multi-B | Universal | All industries | Self-evolving platform |

### 16.3 Technology Evolution Path

```
2026: MongoDB + Express + Next.js + React Native
2028: Add PostgreSQL (financial), Redis, Kafka
2030: Kubernetes + microservices migration
2032: Full blockchain governance (Polkadot)
2035: AI-first operations (80% auto-managed)
2040: Quantum-ready encryption
2050: Decentralized autonomous organization (DAO)
2075: Neural interface integration
2100: Universal commerce protocol
```

---

## 17. Risk Management

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI code quality issues | High | Medium | 58 STL gold-master tests, CI/CD, code review |
| Database migration needed | High | Low | Repository pattern, abstraction layer |
| Blockchain integration complexity | Medium | High | Start with BSC (simple), migrate to Polkadot later |
| Developer hiring difficulty | Medium | Medium | AI-led development reduces dependency |
| Security breach | Critical | Low | Bank-level encryption, multi-layer fraud detection |
| Regulatory changes | High | Medium | Abstracted compliance layer, per-country rules |
| Scale beyond MongoDB | Medium | Medium | Planned PostgreSQL migration path |
| AI provider changes | Low | Medium | Abstraction layer, multi-provider support |

---

## 18. Quality Assurance

### 18.1 Testing Strategy

| Type | Coverage Target | Tools | Frequency |
|------|----------------|-------|-----------|
| Unit Tests | 80% | Jest/Vitest | Every commit |
| Integration Tests | 70% | Supertest | Every PR |
| E2E Tests | Critical flows | Playwright | Daily |
| STL Formula Tests | 100% (58 gold masters) | Jest | Every commit |
| Security Tests | OWASP Top 10 | Custom + OWASP ZAP | Weekly |
| Performance Tests | Key endpoints | k6/Artillery | Weekly |
| Accessibility Tests | WCAG 2.1 AA | axe-core | Per feature |

### 18.2 CI/CD Pipeline

```
Code Push → Lint → Type Check → Unit Tests → Build → Integration Tests
→ Security Scan → Deploy to Staging → E2E Tests → Manual Review → Deploy to Production
```

---

## 19. Deployment Strategy

### 19.1 Phase 1 (Launch)

```
Frontend: Vercel (Next.js optimized)
Backend: AWS EC2 or Railway (Node.js)
Database: MongoDB Atlas (managed)
Storage: AWS S3 (uploads)
CDN: Cloudflare
SSL: Let's Encrypt (auto-renewed)
Monitoring: PM2 + Sentry + UptimeRobot
```

### 19.2 Phase 2+ (Scale)

```
Frontend: Vercel (same, scales automatically)
Backend: AWS ECS or Kubernetes
Database: MongoDB Atlas (sharded) + PostgreSQL (financial)
Cache: Redis (ElastiCache)
Queue: BullMQ + Redis
Search: MongoDB Atlas Search → Elasticsearch
CDN: Cloudflare Pro
Monitoring: Datadog or Grafana Cloud
```

---

## 20. Budget & Timeline Summary

### 20.1 Timeline

| Phase | Duration | Start | End | Key Deliverable |
|-------|----------|-------|-----|-----------------|
| Phase 1 | 8 weeks | Week 1 | Week 8 | PSS + STL + DMO + Wallet (100% functional) |
| Phase 2 | 8 weeks | Week 9 | Week 16 | GoSellr + JPS + CRB + Affiliate |
| Phase 3 | 8 weeks | Week 17 | Week 24 | Franchise dashboards + Rider + Mobile |
| Phase 4 | 8 weeks | Week 25 | Week 32 | AI modules + 5 more industries |
| Phase 5 | 8 weeks | Week 33 | Week 40 | Blockchain + Multi-country + Premium |

### 20.2 Estimated Monthly Costs

| Item | Cost/Month (PKR) | Notes |
|------|-----------------|-------|
| Junior Dev 1 | 80,000-120,000 | Full-stack frontend |
| Junior Dev 2 | 80,000-120,000 | Backend |
| Junior Dev 3 (optional) | 60,000-100,000 | Mobile/QA |
| AI API (OpenAI) | 15,000-30,000 | Development phase |
| MongoDB Atlas | 10,000-25,000 | M10+ cluster |
| Vercel Pro | 3,000-5,000 | Frontend hosting |
| AWS (S3 + EC2) | 10,000-20,000 | Backend + storage |
| Domain + SSL | 2,000 | Annual prorated |
| Miscellaneous | 10,000 | Tools, licenses |
| **TOTAL** | **270,000-445,000** | Per month during development |

### 20.3 Post-Launch Running Costs

| Item | Cost/Month | Notes |
|------|-----------|-------|
| Infrastructure (scaled) | 50,000-200,000 | Depends on user volume |
| AI API | 30,000-100,000 | Scales with usage |
| Team | 300,000-500,000 | Expanded team |
| **TOTAL Post-Launch** | **380,000-800,000** | Scales with revenue |

---

## NEXT STEPS — Immediate Actions

### Week 0 (This Week — Pre-Development)

1. ✅ Master Development Plan (THIS DOCUMENT)
2. Create all 12 AI development skills
3. Create all auto-working .md files
4. Set up development environment
5. Verify existing codebase (30% check)
6. Create SPRINT-PLAN.md for Week 1
7. Hire/assign Junior Devs

### Week 1 (Development Begins)

1. Start PSS database models
2. Start PSS API endpoints
3. Start PSS frontend pages
4. Set up CI/CD pipeline
5. Configure MongoDB Atlas

---

*EHB Technologies (Pvt.) Ltd. — Master Development Plan v1.3 — 2026-04-14*
*AI-Led Development · 40 Weeks · 30% → 100% · Built for 100 Years*

---

## DMO Sidebar — STL Section (authoritative spec)

**Sidebar group:** Verification
**Department:** DMO (Decentralized Management Office)

### Entry 1 — EHB STL MANAGEMENT
- **Route:** `/dmo/stl`
- **Label (sidebar):** `EHB STL MANAGEMENT` (all caps)
- **Purpose:** Operational dashboard for the shipped EHB master STL — scoring, breakdown, history, ranking, per-user drilldowns.
- **Sub-items:** Overview · EHB-STL-LEVEL reference · Scores · Breakdown · History · Ranking.

### Entry 2 — DMO STL (NEW, v1.2)
- **Route:** `/dmo/dmo-stl`
- **Label (sidebar):** `DMO STL`
- **Purpose:** ONE consolidated reference page for everything STL. For DMO operators, franchise admins, and auditors.
- **Sections on the page:**
  1. **Hero** — 3-line definition of STL.
  2. **Levels L0 → L8** — 9 cards: FREE (grey) → BASIC (blue) → NORMAL (green) → HIGH (amber) → VIP (orange) → ULTRA (pink) → DIAMOND (purple) → PLATINUM (EHB purple) → SUPREME (EHB blue). Each card shows band, color, perks.
  3. **Formula & inputs** — master MIN-rule across PSS score, CRB score, DMO score, coin-lock tier; shows input bands.
  4. **4 STL types** — PSS-STL (cap L4 on identity), CRB-STL (cap L6 on physical+legal verification, on-chain hash), DMO-STL (cap L7 on governance bonus), EHB-STL (master, shipped, full range).
  5. **Coin lock tiers** — lock amount → level boost mapping.
  6. **Live preview** — STLUserCard rendered at every level for design QA.
- **Component reuse:** `@/components/stl/STLUserCard` (single source of truth for the visual card).
- **Design:** Dark glassmorphism per §6 of AGENTS.md. No lists in prose — uses glass cards with icon + color chip + band pill.

---

## Auto-Save Rule (v1.3, 2026-04-14) — MANDATORY

> Every new information point, decision, rename, route, API, model field, UI
> pattern, design token, or policy change discussed in any Cowork / Claude
> Code / Cursor session — no matter how small — **must be auto-appended to
> this Master Development Plan** before the session ends.
>
> Mirror the entry (when relevant) to:
> - `EHB-FOLDER-FLOW-MASTER.md` — folder/route/flow changes
> - `design-system/EHB-UIUX-SYSTEM.md` — UI tokens/components/patterns
> - `docs/EHB_CONTEXT.md` — architectural facts
> - `ehb-status.json` via `scripts/ehb-log-change.mjs` — build-state change
>
> No verbal-only agreements. If it's not in this file, it doesn't exist.
> Agents reading this file at session start treat every line as ground truth.

---

## Update Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-14 | v1.0 | Initial Master Development Plan — 40-week schedule, full API/frontend/database specs |
| 2026-04-14 | v1.1 | Added 5 GoSellr Product Guarantee APIs (guarantee set/get/update, claim, trust-display). Updated Product Detail page spec with Guarantee Strip + PSS/CRB/DMO Trust Bars. |
| 2026-04-14 | v1.2 | DMO Sidebar: renamed "EHB STL Management" → "EHB STL MANAGEMENT" (all-caps). Added new sidebar entry **"DMO STL"** (route: `/dmo/dmo-stl`) — a single consolidated page showing all STL concepts: L0→L8 levels, master MIN-formula + input bands (PSS/CRB/DMO), the 4 STL types (PSS-STL cap L4, CRB-STL cap L6, DMO-STL cap L7, EHB-STL master), coin-lock tiers, and live STLUserCard previews per level. Updated CTA labels across DMO landing pages. |
| 2026-04-15 | v1.7 | **PSS Phase-2 shipped — user-side + backend completion.** (A) User-facing routes added under `apps/web/app/pss/`: `/pss` landing (3+2 action cards), `/pss/submit` (4-step wizard: identity → entity → documents → review with live progress bar + validation), `/pss/status/[id]` (live stage bar + RiskMeter + CriteriaChecklist + AuditTimeline + next-action panel), `/pss/refill/[id]` (missing-criteria filler with progress + re-score CTA), `/pss/badges` (on-chain certificate gallery with Polkadot hash + block), `/pss/franchise` (3-tier application: sub/corporate/country + requirements). (B) Backend modules completed: `modules/criteria/criteriaStore.js` (7 platform criteria sets seeded — gs_product_v4, ols_lawyer_v2, hps_doctor_v3, jps_freelancer_v2, wms_service_v1, obs_course_v1, agts_travel_v1) and `modules/audit/auditLog.js` (Mongoose AuditEvent model with SHA-256 hash-chain + verifyChain integrity check). (C) New API endpoints (routes wired into `server.js`): `GET /criteria`, `GET /criteria/:setName`, `GET /criteria/for/:platformId/:entityType`, `POST /users/verify`, `POST /users/bulk-status`, `POST /platforms/register` (returns platformKey + webhookSecret once), `GET /platforms`, `POST /platforms/:id/rotate`, `GET /ops/queue`, `POST /ops/:id/decision`, `POST /ops/:id/reroute`, `GET /ops/:id/audit`. (D) `modules/webhook/webhookDispatcher.js` — HMAC-signed outbound delivery with 3x exponential retry (0/30s/5min), in-memory queue (swap to BullMQ+Redis in prod), 8s abort timeout. (E) `packages/pss-client` extended with: `getCriteriaFor`, `getQueue`, `decideCase`, `rerouteCase`, `getAudit`, `registerPlatform`, `rotatePlatformKeys`. (F) Sidebar (`components/dmo/navigation.tsx`) gained `pss-crb` → `/dmo/pss/crb`. |
| 2026-04-15 | v1.6 | **PSS real implementation — Phase-1 delivered.** (A) Reusable components in `apps/web/components/pss/`: `PSSCaseCard`, `AuditTimeline`, `RuleBuilder`, `WebhookStatusChip`, `CriteriaChecklist`, `RiskMeter`. (B) Mock data centralized in `apps/web/lib/pss/pssMockData.ts` (7 cases, 5 audit events, 15 criteria, 5 GoSellr rules, 6 webhook logs). (C) New Next.js pages wired to sidebar: `/dmo/pss/queue` (filtered case grid, 4 risk filters + 5 platform filters), `/dmo/pss/cases/[id]` (drill-in: subject + risk meter + criteria checklist + audit timeline + 4 action buttons), `/dmo/pss/rules` (per-platform rule builder, priority-ordered, operator support gte/lte/eq/between), `/dmo/pss/webhooks` (delivery monitor + HMAC snippet), `/dmo/pss/crb` (L6→L8 override UI with on-chain push). (D) Sidebar nav (`components/dmo/navigation.tsx`) extended with 4 new entries: Operator queue · Rule engine · Webhook monitor. (E) Backend scaffold created: `services/api/pss-backend/` (Express + Mongoose, port 6000, fail-open DB pattern per AGENTS.md §7.5), models `stlRequest` + `platformRule`, modules `stl-engine` (score calc + band map + PSS cap rule L4/L7/L8) + `rule-engine` (priority evaluator) + `webhook/webhookSigner` (HMAC SHA-256 + retry backoff), route `stlRoutes` (POST /stl/submit with idempotency, GET /stl/status/:id, internal `processPendingRequest`). (F) Shared lib `packages/pss-client/` — the golden rule: platforms only ever call PSS through this client. |
| 2026-04-14 | v1.5 | **PSS UI/UX Prototype v1.0 delivered** — interactive single-file HTML at `ehb-info/EHB-PSS-UIUX-PROTOTYPE.html`. 10 click-through screens mapping the full 9-step STL flow: (0) user-flow overview with owner-color legend [user/PSS/DMO/CRB], (1) seller submit, (2) criteria load + request envelope, (3) score calc + L0→L8 band map, (4) admin rule engine with priority-ordered rules, (5) DMO operator queue with risk filters, (6) case drill-in (criteria breakdown + audit timeline + operator actions), (7) franchise manual review (PMDC-style license check for HPS doctor), (8) CRB override + on-chain hash push for L8, (9) signed webhook + live buyer-facing product card with STL badge, (10) refilling loop (ongoing KYC/license lifecycle). Built on EHB glassmorphism tokens (#0C0E1A / #13162A / #7B6EF6 / #2BBFA0 / #F0A030). Keyboard navigation (← →). |
| 2026-04-14 | v1.4 | **PSS Master Plan v1.0 added** as sibling doc `ehb-info/EHB-PSS-MASTER-PLAN.md`. Covers: PSS as central trust engine (Proof & Security System), 4 structural principles, 8 core responsibilities, 9-step STL approval flow, STL score→level mapping (PSS caps at L4; L5–L7 franchise; L8 CRB-only), admin rule engine with priority-ordered routing, franchise auto-create (per-platform × per-area), CRB override authority, PSS↔DMO integration protocol (DMO acts only via PSS API — single source of truth), 27 PSS capabilities audit (23/27 enabled), tech architecture (Next.js + NestJS/Nx + MongoDB Atlas; no direct platform-to-platform calls), 11 PSS API endpoints, 4-week Phase-1 roadmap. Source upload docs normalized: SQ→STL, EDR→CRB, PSS full-form = "Proof & Security System". |
| 2026-04-14 | v1.3 | **Auto-save rule activated:** Every new piece of information, decision, rename, route, API, UI pattern, or design token we discuss in any session MUST be auto-appended to this Master Development Plan (and mirrored to `EHB-FOLDER-FLOW-MASTER.md` / `design-system/EHB-UIUX-SYSTEM.md` where relevant). No verbal-only agreements — everything persists here. |
