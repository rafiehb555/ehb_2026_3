# EHB MASTER INFO — Single Source of Truth

**Company:** EHB Technologies (Pvt.) Ltd.
**Document version:** 1.0
**Created:** 2026-04-11
**Maintained by:** EHB engineering + AI agents
**Scope:** Company-wide reference for product, platform, departments, and governance

> This file is the **portable master brief** for EHB. Every AI agent (Claude,
> Cursor, Copilot, Aider, Continue, Cody) should read this file before writing
> any new code, plan, or doc. It merges every piece of legacy information
> found across the repo into a single, re-structured, gap-fixed document.
>
> **Rule:** Whenever new authoritative information is added by the user, it
> is merged here and the *Changelog* at the bottom gets a new entry. Legacy
> docs stay in `/docs/` for history; this file stays canonical.

---

## 0. How to read this file

1. **Section 1–3** = who we are, what we build, why.
2. **Section 4** = the 8 core systems (PSS, CRB, STL, DMO, JPS, Wallet, AI, Blockchain).
3. **Section 5–6** = 32 industries + shared-tools map.
4. **Section 7** = franchise hierarchy and revenue split.
5. **Section 8** = stack, ports, monorepo layout.
6. **Section 9** = design system non-negotiables.
7. **Section 10** = 8-step user flow + 70-day roadmap.
8. **Section 11** = agent rules (the hard "do not" list).
9. **Section 12** = open gaps and integration warnings.
10. **Section 13** = glossary + renaming history (SQL→STL, EDR→CRB).
11. **Section 14** = advanced planning suggestions (added by Claude).
12. **Changelog** = who changed what, when, why.

---

## 1. Company at a glance

| Field | Value |
|-------|-------|
| Legal name | EHB Technologies (Pvt.) Ltd. |
| Tagline | Education · Health · Business |
| Pillars | 3 (Education, Health, Business) — hence "EHB" |
| Vision | One unified global super-app uniting **32 industries** across **50+ countries** |
| Trust backbone | AI + Polkadot blockchain |
| Target scale | 1M+ users · $500M+ economic volume · multi-level franchise network |
| Language policy | Roman Urdu + English for conversation; English for code, commits, UI |
| Primary HQ | Pakistan (with regional hubs in Asia/Europe/Americas) |

**One-line identity:**
EHB is a vertically-integrated super-platform that bundles 32 regulated +
unregulated industries under a single AI-verified trust score, a single
wallet, and a single 4-tier franchise network, so that any user in any
country can access any service with one identity and one economic record.

---

## 2. What problem EHB solves

Every industry today is fragmented: separate logins, separate KYCs, separate
trust scores, separate payment rails, separate governance. A Pakistani
shopkeeper, a Dubai doctor, an EU lawyer, and a US student share zero
infrastructure. EHB collapses that into **one trust stack**:

1. **One identity** (PSS) — KYC/KYB done once, reused everywhere.
2. **One physical proof** (CRB) — verified in person, hashed on-chain.
3. **One trust score** (STL L0–L8) — computed from PSS + CRB + behaviour + earnings.
4. **One governance brain** (DMO) — enforces policy, resolves disputes, audits everyone.
5. **One wallet** (EHB Wallet + EHBGC) — multi-currency, escrow-ready, split-paying.
6. **One skill engine** (JPS) — AI-matched jobs, resumes, and designations.
7. **One AI stack** — 100+ modules on top of OpenAI/Claude for legal, medical, education, commerce.
8. **One immutable log** (Polkadot) — every certificate, every STL milestone, every dispute settled.

When all 8 click together, any new industry can launch in weeks instead of
years because ~70% of the building blocks are already live.

---

## 3. Target scale and phasing

| Metric | Goal |
|--------|------|
| Industries (total) | 32 |
| Industries (Phase-1) | 6 |
| Countries (Phase-1) | Pakistan, UAE (expanding into UK, US, EU, India) |
| Countries (long-term) | 50+ |
| Users (launch target) | 1M+ |
| Economic volume (launch target) | $500M+ |
| AI modules planned | 100+ |
| Core platform departments | 8 |
| Shared-tools reuse | ~70% across industries |
| Franchise model | Country → Corporate → Sub |
| Revenue split | 40% provider / 25% sub / 20% corporate / 15% country |

---

## 4. The 8 core systems

### 4.1 PSS — Proof & Security System
KYC / KYB, liveness detection, AML screening, fraud detection, document
authenticity, address verification, behavioural risk monitoring. Every user
passes PSS on signup. PSS is the **first gate** before anything else.

**Key APIs:** `/api/pss/status`, `/api/pss/submit`, `/api/pss/review`.
**Owner of final review:** DMO PSS panel.

### 4.2 CRB — Central Record Blockchain
(Previously: EDR — "Exam Decision Registry". Renamed on 2026-04-11. CRB officially renamed to "Central Record Blockchain" on 2026-04-19.)
Physical office verification, professional certification (doctors, lawyers,
engineers), legal compliance, product/service authentication. Every
certificate hash goes on-chain (Polkadot). **6-month refilling cycle**.
CRB success boosts STL by **+15**.

**Physical verification is what makes EHB bank-level trustworthy** — it is
the hardest competitor moat because it requires a franchise network on the
ground.

### 4.3 STL — Service Trust Level
(Previously: SQL — "Service Quality Level". Renamed on 2026-04-11.)
A multi-level scoring system computed from PSS + CRB + DMO actions +
earnings + behaviour. Formula lives in
`services/api/stl-replit/services/stlService.js` and is **protected by
58 gold-master regression tests**. Every commit runs `npm run test:stl` —
58 pass / 0 fail is non-negotiable.

> ⚠️ **CONTRADICTION PENDING** (2026-04-11, Batch-1): Legacy code +
> tests use **L0 → L8 SUPREME (9 levels)**. Batch-1 user input
> introduces **L1 → L10 SUPREME (10 levels)** with coin-lock ladder,
> refill cadence, and complaint caps. Migration plan drafted in
> `departments/DMO.md §23.3 S1` (feature flag `STL_V2_ENABLED`).
> **Blocking resolution** — see `departments/DMO.md §24 row 1` and §25.1.
> Until user confirms, the legacy 9-level model remains canonical for
> code + tests.

**Final rule (legacy):** `STL = MIN(score, lock, pss, crb, dmo)` — the
weakest link wins. You cannot fake your way up.

**Final rule (Batch-1 master anti-fraud, awaiting confirmation):**
`FINAL EHB-STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)` —
extends the weakest-link principle across the full seller chain so a
fake company or compromised owner instantly caps every product listed
under it. Surface API planned: `POST /api/stl/validate-product`
returning `{ finalStl, blockingLayer }`. Canonical spec in
`departments/DMO.md §22.2`.

**Canonical 10-level ladder (Batch-2 confirmed 2026-04-11):**

| Level | Name     | Score band | Min locked EHBGC |
|-------|----------|-----------:|-----------------:|
| L1    | FREE     |       0–20 |                0 |
| L2    | BASIC    |      21–40 |               20 |
| L3    | NORMAL   |      41–60 |               40 |
| L4    | STANDARD |      61–75 |              100 |
| L5    | ADVANCED |      76–85 |              200 |
| L6    | HIGH     |      86–92 |              400 |
| L7    | PRO      |      93–96 |              800 |
| L8    | VIP      |      97–98 |             2000 |
| L9    | ELITE    |         99 |             4000 |
| L10   | SUPREME  |        100 |          10000+ |

Full spec (upgrade/downgrade conditions, composite formula, decay, multi-entity MIN rule) is in `ehb-info/departments/STL.md`. Legacy docs used a 5-tier FREE/BASIC/MEDIUM/HIGH/VIP model — that is **deprecated**. Production code still uses a 9-level L0–L8 ladder protected by 58 gold-master tests — migration plan documented in `DMO.md §23.3 S1`.

STL is **multi-entity** — users, sellers, products, franchises each have
their own score, with the rule `Product ≤ Seller ≤ User`.

### 4.4 DMO — Decentralized Management Office
The central governance authority. **DMO is the brain of EHB**. It does not
run operations — it approves, monitors, enforces, audits, and routes.

DMO owns:
- The 8-step user flow (Registration → JPS → STL → PSS → CRB → DMO → Score → Active)
- The L8 SUPREME manual approval
- The 40/25/20/15 revenue split enforcement
- Platform policy
- Suspension / restoration authority over every service

See `ehb-info/departments/DMO.md` for the full DMO plan.

### 4.5 JPS — Job Profile & Skill
AI-powered job/skill matching, professional profiles, designations, exam
system, 6-month contract cycles, employer ↔ employee connection engine.
Builds on top of PSS identity + CRB certification.

### 4.6 Wallet / Finance
EHB wallet + EHBGC, escrow, multi-currency (50+ countries), franchise revenue
distribution, affiliate commissions, AML monitoring, fee engine, payout engine.
Escrow **must** be wired into every paid booking flow before that industry
can go live — this is currently the **largest blocker for Phase-1 paid launches**.

Wallet types: **Main**, **Earnings**, **Lock**.
Income types: Commission, Franchise, Referral, Product bonus, AI services.

### 4.7 AI Department
6 flagship AI modules (Phase-1 focus):

| Module | Industry | Function |
|--------|----------|----------|
| AI Lawyer         | Legal      | Case triage, document drafting, risk analysis |
| AI Diagnosis      | Medical    | Symptom triage, report explanation |
| AI Resume Builder | Jobs       | CV generation and optimization |
| AI Course Tutor   | Education  | Adaptive learning paths |
| AI Business Advisor | Commerce | SME services |
| AI Fraud Detector | DMO        | Transaction + review abuse detection |

**Rule:** AI is an **advisor**, the platform is the **final authority**.
AI never writes STL directly — it proposes, DMO/system confirms.

### 4.8 Blockchain
Polkadot-based. Stores **immutable hashes** for CRB certificates, STL
milestone snapshots, franchise contracts, high-risk DMO actions (bans,
freezes). Currently ~10% complete; contract work pending in Phase-3.

---

## 5. 32 industries

### 5.1 Phase-1 (active — 6)

| Code     | Industry              | Build % | Notes |
|----------|-----------------------|---------|-------|
| GSM      | E-commerce (GoSellr)  | 60      | Marketplace backbone |
| OLS      | Legal Services        | 30      | AI Lawyer integration |
| WMS      | Medical & Health      | 20      | HIPAA-aligned, AI Diagnosis |
| HPS/OBS  | Education & Learning  | 15      | LMS, AI Course Tutor |
| JPS      | Jobs & HR             | 30      | Identity + skill stack |
| AGTS     | Travel & Tourism      | 10      | Cross-border bookings |

### 5.2 Phase-2 / Phase-3 queue (26)

Finance, Consulting, Construction, Agriculture, Automotive, Hospitality,
Real Estate, Entertainment, Media, Fashion, Beauty, Fitness, Logistics,
Manufacturing, Energy, Technology, Telecom, Government, NGO, Sports, Music,
Gaming, Food, Pets, Weddings, Events.

**Pattern:** Every new industry plugs into the same 8 core systems, so the
delta to launch is only (a) industry-specific UI, (b) industry-specific
compliance rules, (c) industry-specific AI prompts, (d) industry-specific
CRB checklist.

### 5.3 Industry-verification STL impact

(From `industry-stl-impact-system.md`, legacy docs.)

| Industry          | STL boost | Security tier |
|-------------------|-----------|---------------|
| Healthcare        | +5 | Premium |
| Legal             | +5 | Premium |
| Electrical        | +5 | High |
| Solar Installation| +5 | High |
| Construction      | +4 | High |
| Security          | +4 | High |
| IT & Electronics  | +4 | Medium |
| Automotive        | +3 | Medium |
| Plumbing          | +3 | Medium |
| HVAC              | +3 | Medium |

**Security tiers:**
- **Basic Secure** — document upload only
- **Medium Secure** — documents + on-site audit
- **High Secure** — CRB physical inspection + certificate
- **Premium Secure** — multi-industry certifications combined

**Audit cadence examples:**
- Healthcare: 3 months (7-day grace)
- Electrical / Solar / Construction / IT: 6 months (14-day grace)
- Legal: 12 months (30-day grace)

---

## 6. Shared tools map

### 6.1 Cross-industry (~70% reuse)
- Booking engine (Medical, Legal, Education, Travel, Local services)
- Payment gateway + EHB Wallet (all industries)
- Messaging + notifications (all industries)
- Reviews + ratings (marketplace + services)
- Analytics dashboards (DMO, franchise, affiliate)

### 6.2 Industry-specific extensions
- **Medical** — prescriptions, lab reports, medical records (HIPAA)
- **Legal** — contracts, case files, court documents
- **Education** — LMS, exams, assignments, course builder
- **Travel** — flight/hotel search, itineraries, visa flows
- **Commerce** — inventory, returns, shipping

### 6.3 Trust badge system (on every user/provider card)

| Icon | Meaning | Source |
|------|---------|--------|
| 🛡️ | PSS Verified (green) | PSS |
| 🏛️ | CRB Certified (blue) | CRB |
| ⭐ | STL Level (gold)    | STL  |
| 🌐 | DMO Registered (purple) | DMO |
| 🏢 | Franchise Verified (orange) | Franchise |
| 🔁 | Refilling Count (grey) | CRB refill |
| ⚠ | Complaints (red/green) | Complaint system |

---

## 7. Franchise hierarchy

```
Global Super Admin (EHB Board)
        ↓
Country Franchise   (country-level operations + validation)
        ↓
Corporate Franchise (city / sector operations)
        ↓
Sub Franchise       (local onboarding, inspections, support)
```

**Revenue split:** `40 / 25 / 20 / 15`
- 40% → service provider
- 25% → sub franchise
- 20% → corporate franchise
- 15% → country franchise

**DMO enforcement rule:** Any paid transaction that cannot compute this
split cleanly is **rejected** at the wallet layer. This is the most
important economic invariant in the platform.

---

## 8. Stack, ports, monorepo

### 8.1 Runtime stack

| Layer      | Tech                                            | Port  | Folder                          |
|------------|-------------------------------------------------|-------|---------------------------------|
| Frontend   | Next.js 14 App Router + TS + Tailwind + Prisma  | 3000  | `apps/web/`                     |
| API        | Node 20 + Express + Mongoose (ESM)              | 5000  | `services/api/stl-replit/`      |
| AI backend | Node 20 + Express + OpenAI (CommonJS)           | 8080  | `services/ai/`                  |
| Database   | MongoDB 7 (logical DBs: `ehb_dev`, `ehb_ai_memory`) | 27017 | external                     |

Future (planned in DMO architecture docs): PostgreSQL primary, Redis cache,
Kafka event bus, Elasticsearch, IPFS, Polkadot, Kubernetes (EKS/GKE), AWS
KMS / HashiCorp Vault for keys.

### 8.2 Monorepo layout

```
EHB DEVELOPMENT 2026/
├── apps/web/                    Next.js 14 frontend
├── services/api/stl-replit/     Main API (Express+Mongoose)
├── services/ai/                 AI backend (OpenAI)
├── services/workers/            Background jobs (CRB escalation, fraud)
├── packages/{ui,types,utils,config}   Shared libraries
├── infrastructure/scripts/      START-LOCAL.bat v3, deploy scripts
├── data/ehb-data/               Industry + service seeds (32 industries)
├── docs/                        LAUNCH_GUIDE, PROJECT_STRUCTURE, EHB_CONTEXT, DMO plans
├── design-system/               EHB-UIUX-SYSTEM.md, ai-behavior.md
├── ehb-info/                    *** THIS folder — master merged brief ***
└── backup/                      Safety backups (gitignored)
```

Decision table for "where does new code go" → `docs/PROJECT_STRUCTURE.md` §11.

### 8.3 Canonical APIs (subset)

| Method | Path                  | Tag    | Status  |
|--------|-----------------------|--------|---------|
| POST   | /api/auth/register    | Auth   | LIVE    |
| POST   | /api/auth/login       | Auth   | LIVE    |
| GET    | /api/stl/:userId      | STL    | LIVE    |
| POST   | /api/stl/recalc       | STL    | LIVE    |
| GET    | /api/pss/status       | PSS    | PARTIAL |
| POST   | /api/crb/submit       | CRB    | PARTIAL |
| GET    | /api/dmo/queue        | DMO    | LIVE    |
| POST   | /api/dmo/fraud        | DMO    | LIVE    |
| GET    | /api/wallet/balance   | Wallet | PENDING |
| POST   | /api/wallet/escrow    | Wallet | PENDING |
| POST   | /api/ai/adjust        | AI     | PARTIAL |
| GET    | /api/franchise/list   | Franch.| PENDING |

Full live list is rendered at `/development` tab **APIs** and in `ehb-status.json`.

---

## 9. Design system (non-negotiable)

**Palette (brand-locked):**
- Background: `#0C0E1A` (main) · `#13162A` (cards) · `#1A1D33` (nested)
- Purple (primary): `#7B6EF6` · Light purple: `#A098F8`
- Teal (success / live): `#2BBFA0`
- Amber (warning / partial): `#F0A030`
- Red (error / pending): `#F05858`
- Green (confirmed): `#38C878`

**Typography:** `DM Sans`, system sans-serif fallback.
**Borders:** `1px solid rgba(255,255,255,0.08)` for cards, `rgba(255,255,255,0.07)` for dividers.
**Radii:** 12 for cards, 8 for inputs/buttons, 5–6 for chips.
**Style:** Dark glassmorphism. No rounded-full circles beyond avatars / status dots.
**Chips:** 15% background + 30% border + full-colour foreground.

**Living source of truth:** `design-system/EHB-UIUX-SYSTEM.md` +
`design-system/ai-behavior.md`. Every UI task must read those two files
top-to-bottom before writing code. The auto-upgrade rule is hard: a plain
"just show X" brief must be upgraded to a clickable glass card with icon,
chip, motion, and drill-in drawer before commit.

**Admin theme override:** The DMO admin UI (`/admin/*`) uses a light-mode
admin palette (`#f8fafc` bg, `#1e293b` sidebar, `#3b82f6` primary). This
is the only allowed divergence from the dark brand palette — it is
documented in `docs/ui-ux/dmo-admin-system.md`.

---

## 10. Flows and roadmap

### 10.1 8-step user flow (DMO-owned)

```
Registration → JPS profile → STL init → PSS verify → CRB certify →
  DMO approval → Score calculation → Active (service access)
```

### 10.2 Provider flow

```
Provider signup → PSS identity verification → CRB skill certification →
  STL level assignment → Service listing (via DMO) → Orders + earnings
```

### 10.3 Franchise flow

```
Country franchise → Corporate franchise → Sub franchise →
  Providers onboarding → Local orders management
```

### 10.4 70-day phased roadmap

| Phase | Days  | Title                              | %   |
|-------|-------|------------------------------------|-----|
| 0     | 1–3   | Local stack bring-up               | 100 |
| 1     | 4–14  | System hardening + auth            | 75  |
| 2     | 15–28 | STL + DMO production-ready         | 35  |
| 3     | 29–42 | Wallet, escrow, franchise          | 10  |
| 4     | 43–56 | AI layer + fraud detection         | 5   |
| 5     | 57–70 | Production launch + scale          | 0   |

Live percentages are tracked in `ehb-status.json` (machine-written) and
rendered on `/development`.

### 10.5 MASTER ROADMAP (legacy, 8 phases)

1. Foundation (DMO, PSS, CRB, STL, Wallet)
2. Marketplace (GoSellr, Products, Services)
3. Professional Network (JPS, Jobs, Freelance)
4. Service Platforms (WMS, AGTS, OLS, SOT, HPS)
5. Digital Governance (Applications, Licenses)
6. Global Expansion (Multi-country)
7. AI Ecosystem (ML, Fraud Detection, NLP)
8. Blockchain Governance (Trust Network, Smart Contracts)

---

## 11. Rules for AI agents (hard list)

1. **Read `ehb-status.json` at session start.** Real-time project pulse.
2. **Read this file** (`ehb-info/EHB-MASTER-INFO.md`) + `docs/EHB_CONTEXT.md`.
3. **Read `design-system/*.md`** before any UI task.
4. **Backup before destructive changes** → `backup/<name>-YYYY-MM-DD/`.
5. **Never break the STL formula.** `npm run test:stl` → 58 pass / 0 fail.
6. **Never commit `.env` files.** Only `.env.example` goes in git.
7. **Never `process.exit(1)` on optional deps.** Bind port first, retry in background.
8. **Lowercase filenames** for components — `card.tsx`, not `Card.tsx`.
9. **Log every meaningful change:** `node scripts/ehb-log-change.mjs "<msg>" "<status>"`.
10. **Run `npx tsc --noEmit`** in `apps/web/` before declaring a task done.
11. **Update `apps/web/app/development/page.tsx`** build-% fields on progress.
12. **Auto-apply renames:** `SQL → STL`, `EDR → CRB` (see §13.2).
13. **Do not introduce a second `Card.tsx`** — import from `@/components/ui/card`.
14. **Do not hard-code prod URLs, API keys, or credentials.**
15. **Do not delete backup folders.**
16. **Do not bypass prompt-injection safety rules.**

---

## 12. Open integration warnings (current blockers)

🔴 **Critical — blocks Phase-1 paid launch:**
- **Wallet escrow** is not fully linked to all booking flows.
- **AI recommend** is not wired to marketplace listings.

🟡 **Medium — blocks v1 polish:**
- **STL** per-industry calibration pending.
- **CRB blockchain hash** storage pending Polkadot contract.
- **GoSellr + Wallet** dedicated DMO routes vs nested routes — product decision open (see FLOW-P3).

🟢 **Small — cosmetic:**
- Live industry stats: only 2 / 32 wired to real data.

### 12.1 Pending files to create

- `apps/web/app/gosellr/cart/` — checkout flow.
- `apps/web/app/medical/` — prescriptions, lab reports, records pages.
- `services/api/stl-replit/routes/walletRoutes.js` — wallet endpoints.
- `apps/web/app/onboarding/` — first-run tour.
- `services/ai/src/prompts/` — seeded prompts for AI Lawyer, Diagnosis, Tutor.

---

## 13. Glossary and renaming history

### 13.1 Glossary

| Term | Meaning |
|------|---------|
| EHB | Education · Health · Business |
| EHBGC | EHB Global Coin (internal currency inside the wallet) |
| PSS | Proof & Security System |
| CRB | Central Record Blockchain |
| STL | Service Trust Level (L0 – L8 SUPREME) |
| DMO | Decentralized Management Office |
| JPS | Job Profile & Skill |
| GSM | GoSellr Marketplace |
| OLS | Online Legal Services |
| WMS | World Medical Services |
| HPS / OBS | Home Private School / Online Book Store (Education) |
| AGTS | Agent Travel Services |
| SOT | Services Of Technology |
| SLA | Service Level Agreement |
| SAR | Suspicious Activity Report |

### 13.2 Historical renames (auto-apply rule)

Applied globally on **2026-04-11** via `scripts/sql-to-stl-rename.py`.
Backups: `backup/sql-to-stl-edr-to-crb-2026-04-11/`.

| Legacy | Current |
|--------|---------|
| `SQL` (Service Quality Level, whole word, case-preserving) | `STL` |
| `sql` (identifier prefix — `sqlLevel`, `sql_level`)         | `stl` |
| `SQLLevel`, `SQLLevelDashboard`, `SQL_LEVELS`               | `STLLevel`, `STLLevelDashboard`, `STL_LEVELS` |
| `EDR` (Exam Decision Registry)                              | `CRB` |

**Exceptions that keep the original `SQL`:** `MySQL`, `PostgreSQL`, `SQLite`,
`NoSQL`, `PL/SQL`, `T-SQL`, and raw database-language comments. These are
the real SQL, not the legacy EHB acronym.

---

## 14. Advanced planning (AI-added suggestions)

These are structural improvements that are **not** in the legacy docs but
follow logically from the rest of the platform. Each one is tagged
`[SUGGESTION]` so it is easy to distinguish from user-authored content.

### 14.1 `[SUGGESTION]` Trust contract (cross-department invariant)
Publish a single `packages/types/src/trust-contract.ts` that encodes
`MIN(score, lock, pss, crb, dmo)` as a TypeScript type + runtime validator.
Every service (STL, DMO, Wallet, AI, Franchise) imports from it. Then the
gold-master test suite can assert "no service bypasses the trust contract".

### 14.2 `[SUGGESTION]` DMO event bus
DMO owns governance but has no canonical event bus today. Add a
`dmo.events.*` namespace on the future Kafka / EventBridge layer:
`dmo.events.pss.flagged`, `dmo.events.crb.approved`, `dmo.events.stl.dropped`,
`dmo.events.wallet.amlflagged`, `dmo.events.franchise.terminated`. Every
panel in the DMO dashboard becomes a consumer of the same event stream;
new modules just subscribe.

### 14.3 `[SUGGESTION]` Revenue-split machine-readable source of truth
The `40 / 25 / 20 / 15` split is documented in prose. Extract it into
`packages/config/src/revenue-split.ts` so:
- Wallet enforces it on every paid txn.
- DMO dashboard reports drift automatically.
- Country-specific overrides can be layered without code changes (e.g. EU
  might require a VAT slice).

### 14.4 `[SUGGESTION]` Incident channel → DMO alert pipeline
Today's `DMOAlert` table is internal. Wire it to Slack / Email / WhatsApp
with severity-based routing (critical → PagerDuty, high → Slack #dmo-war-room,
medium → ticket queue). Response-time SLAs are already in the security doc
(15 min critical → 24h low) — this just operationalises them.

### 14.5 `[SUGGESTION]` CRB refilling calendar as a platform primitive
The 6-month refilling cycle is mentioned in multiple docs but has no UI
primitive. Add a `RefillingCalendar` component (red = overdue, amber = within
grace, green = fresh) that every industry card reuses. DMO inspectors get
the same component scoped to their assigned franchises.

### 14.6 `[SUGGESTION]` AI decision-assistant telemetry
The AI Decision Assistant proposes → DMO confirms. Log every
`{proposed, confirmed, reason}` tuple in a `dmo_ai_decisions` table. After
90 days, compute agreement rate per module — if DMO consistently overrides
the AI in (say) CRB, the AI model for CRB is miscalibrated and needs
retraining. This is the only way to stop AI drift from silently rotting
the platform.

### 14.7 `[SUGGESTION]` Blockchain-anchor batching
Writing every certificate to Polkadot individually is expensive. Batch
hashes Merkle-tree style and commit the root once per hour. The
per-certificate proof is a Merkle path (cheap), so downstream verification
stays constant-time. This is standard in rollup/anchor systems; it reduces
gas cost by 2–3 orders of magnitude.

### 14.8 `[SUGGESTION]` "DMO diff" feature
Every DMO action (override, approve, ban, freeze) produces a diff between
the previous and new state of the target entity. Surface those diffs in
the audit-trail viewer with side-by-side colouring. Regulators and
franchise auditors can read the platform's governance history like a
Git log. This is cheap to build and extremely valuable for compliance
conversations (GDPR, PECA, DIFC).

### 14.9 `[SUGGESTION]` Franchise scorecard → STL feedback loop
Franchises already have a performance score. Feed that score back into
the STL of the providers they onboard (bad franchise → slight STL ceiling
for its providers). This penalises lazy franchises without punishing
individual providers, and creates an economic incentive for sub-franchises
to vet their providers carefully.

### 14.10 `[SUGGESTION]` Kill-switch pattern
Every paid industry gets a `dmo.kill-switch.<industry>` config key. If DMO
Director flips it, all writes in that industry pause with a friendly
"temporarily paused for audit" banner, but reads keep working. This
protects the platform during an incident without nuking the user experience.

---

## 15. Departments index

Per-department detailed plans live under `ehb-info/departments/`. Each
department file merges its legacy docs, fixes gaps, and holds
`[AWAITING USER INPUT]` markers where the user is expected to fill in
specifics during planning.

| Department | File | Status |
|------------|------|--------|
| DMO — Decentralized Management Office  | `ehb-info/departments/DMO.md`         | **v1.2 — Batch-1 + Batch-2 merged** |
| STL — Service Trust Level              | `ehb-info/departments/STL.md`         | **v1.0 — Batch-2 merged** |
| PSS — Personal Security System         | `ehb-info/departments/PSS.md`         | **v1.0 — Batch-2 merged** |
| CRB — Central Record Blockchain     | `ehb-info/departments/CRB.md`         | **v2.0 — Batch-2 merged, renamed 2026-04-19** |
| Wallet / Trusty Wallet                 | `ehb-info/departments/Wallet.md`      | **v1.0 — Batch-2 merged** |
| Blockchain                             | `ehb-info/departments/Blockchain.md`  | **v1.0 — Batch-2 merged** |
| GoSellr — Marketplace                  | `ehb-info/departments/GoSellr.md`     | **v1.0 — Batch-2 merged** |
| Franchise Network                      | `ehb-info/departments/Franchise.md`   | **v1.0 — Batch-2 merged** |
| Finance                                | `ehb-info/departments/Finance.md`     | **v1.0 — Batch-2 merged** |
| Affiliate                              | `ehb-info/departments/Affiliate.md`   | **v1.0 — Batch-2 merged** |
| Industries catalogue                   | `ehb-info/departments/Industries.md`  | **v1.0 — Batch-2 merged** |
| JPS — Job Profile & Skill              | *(pending — see Industries.md §4 Q3)* | — |
| AI Department                          | *(pending)*                           | — |

---

## Changelog

| Date       | Author | Change |
|------------|--------|--------|
| 2026-04-11 | Claude | v1.0 — initial merge of `docs/EHB_CONTEXT.md`, `docs/development/EHB_DMO_PLAN.md`, `docs/architecture/dmo-master-architecture.md`, `docs/architecture/dmo-blueprint.md`, `docs/architecture/dmo-data-flow.md`, `docs/architecture/dmo-global-data-flow.md`, `docs/architecture/dmo-ai-decision-engine.md`, `docs/architecture/dmo-bank-level-security.md`, `docs/database/dmo-master-database.md`, `docs/ui-ux/dmo-admin-system.md`, `docs/flows/FLOW-P3-dmo-governance.md`, `docs/ehb-dmo-and-home-data-snapshot.md`, `docs/ehb-info/EHB_stl 0.md`, `CLAUDE.md`, `design-system/EHB-UIUX-SYSTEM.md` into one re-structured master file. Added §14 advanced planning suggestions. |
| 2026-04-11 | Claude | v1.1 — Batch-1 merge (see `departments/DMO.md §22`). §4.3 flagged STL 9↔10 contradiction + added master MIN rule `MIN(product, seller, company, owner)`. |
| 2026-04-11 | Claude | v1.2 — **Batch-2 merge** (13 uploaded `.md` files). §4.3 replaced with canonical 10-level ladder + coin lock minimums. §15 departments index expanded — 11 of 13 department files now live under `ehb-info/departments/` (DMO v1.2, STL/PSS/CRB/Wallet/Blockchain/GoSellr/Franchise/Finance/Affiliate/Industries each v1.0). Only JPS + AI Department remain pending. |

---

---

## 16. MASTER PLAN — Complete Business Flow & User Journeys

> **Added:** 2026-04-12 — v2.0 Master Plan Edition
> **Sources:** All collected data from D:\EHB 1, D:\EHB, D:\ehb ui ux, Downloads\ehb .md files, project docs (100+ files analyzed)
> **See also:** `ehb-info/uploaded-information.md` for raw collected data

### 16.1 Company Legal Identity

| Field | Value |
|-------|-------|
| Legal Name | EHB Technologies (SMC-Private) Limited |
| Corporate UID | 0179621 |
| Registration | Section 16, Companies Act 2017 (XIX of 2017) |
| AJK Registration | No. 285 MZD, Companies Ordinance 1984 |
| AJK Name | EHB- Education Health and Business (PVT) Limited |
| Founded | 2008 (by Muhammad Rafi) |
| Registered | 2010 (applied), 2015 (public survey), 2016 (approved) |
| Active Since | 2017+ |
| Founder | Muhammad Rafi |
| Managing Director | Mohammad Tufail |
| HQ Address | Creative Minds College, Main Simly Dam Road, Bharakahu, Islamabad, 44000, Punjab, Pakistan |
| Contact | +92 346 4385 703 |
| Email | ehb.rafi@gmail.com / rafi.ehb@gmail.com |
| Full Form | Education, Health, and Business |

### 16.2 The Big Picture — How EHB Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EHB GLOBAL SUPER-APP                             │
│                                                                     │
│  "One Platform. 32 Industries. 700+ Services. Infinite Trust."     │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   PSS    │  │   CRB    │  │   STL    │  │   DMO    │           │
│  │Identity &│→ │Certify & │→ │Trust     │→ │Govern &  │           │
│  │Security  │  │Verify    │  │Score     │  │Control   │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│       ↕              ↕             ↕              ↕                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Wallet  │  │Franchise │  │Affiliate │  │    AI    │           │
│  │EHBGC Coin│  │Territory │  │Referral  │  │Advisory  │           │
│  │& Escrow  │  │Network   │  │Network   │  │& Fraud   │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│       ↕              ↕             ↕              ↕                │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │              32 INDUSTRY MODULES                         │       │
│  │  GoSellr | WMS | OLS | HPS | JPS | AGTS | HMS | ...    │       │
│  └─────────────────────────────────────────────────────────┘       │
│       ↕                                                            │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │              BLOCKCHAIN (Immutable Ledger)               │       │
│  │  BSC → Mosaic → Polkadot (3-phase migration)            │       │
│  └─────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

### 16.3 Complete User Journey — From Registration to Active Use

```
STEP 1: REGISTRATION
  User downloads EHB app / visits website
  → Creates account (email + phone)
  → Receives welcome + wallet initialization (L1 FREE, 0 EHBGC)
  → Directed to complete profile

STEP 2: JPS PROFILE SETUP
  → Fill personal info, skills, education, experience
  → Select industry categories of interest
  → AI suggests matching services/jobs

STEP 3: STL INITIALIZATION
  → System assigns L1 FREE (score 0-20)
  → Shows upgrade path: "Lock 20 EHBGC → reach L2 BASIC"
  → Displays benefits ladder for each level

STEP 4: PSS VERIFICATION (Identity)
  → Basic: Upload CNIC/ID + phone OTP (→ Basic Verified)
  → Full: Liveness face match + address proof (→ Fully Verified)
  → Trust score calculated (0-100)
  → PSS-STL component updated

STEP 5: CRB CERTIFICATION (Skills)
  → Select service category
  → Take category exam (theory + practical, 70% pass)
  → Upload multimedia proofs (degrees, certificates, videos)
  → Inspector review (physical if Advanced/Professional)
  → CRB-STL component updated

STEP 6: DMO APPROVAL
  → DMO reviews composite profile (PSS + CRB + JPS)
  → AI pre-screens for fraud flags
  → DMO Manager approves/rejects
  → If approved → proceed to activation

STEP 7: SCORE CALCULATION
  → STL = weighted(PSS_trust, CRB_verify, DMO_activity, coin_lock) − complaint_penalty
  → Master rule: FINAL = MIN(product, seller, company, owner)
  → Level assigned based on score band

STEP 8: ACTIVE — SERVICE ACCESS
  → Can now list services/products in their industry
  → Can buy from marketplace
  → Can earn commissions
  → Can apply for franchise
  → Ongoing: CRB refills (6-month cycle), STL recalculation
```

### 16.4 Franchise Business Model — Complete Flow

```
FRANCHISE HIERARCHY:
┌──────────────────────────────┐
│  EHB GLOBAL HQ (Super Admin) │
│  → Platform development       │
│  → Policy creation            │
│  → Global strategy            │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│  COUNTRY FRANCHISE (L1)      │
│  → Country-level ops          │
│  → Regulatory compliance      │
│  → Receives 15% of revenue    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│  CORPORATE FRANCHISE (L2)    │
│  → City/sector operations     │
│  → Business development       │
│  → Receives 20% of revenue    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│  SUB FRANCHISE (L3)          │
│  → Local onboarding           │
│  → Physical inspections (CRB) │
│  → Helpline / complaint desk  │
│  → Receives 25% of revenue    │
└──────────────────────────────┘

FRANCHISE APPLICATION FLOW:
1. Apply for territory (online form)
2. CRB verification of franchise applicant
3. STL assessment (minimum L4 STANDARD required)
4. DMO approval
5. Territory assignment (exclusive by area)
6. Training & onboarding
7. Activation — start operations
```

### 16.5 Revenue & Earnings Model

#### GoSellr Order Revenue Split (Outer)
```
Customer pays $100 for a product:
  → Seller receives: $70 (70%)
  → Rider receives:  $10 (10%)
  → Franchise share: $10 (10%)
  → Platform fee:    $10 (10%)
```

#### Platform Fee Cascade (Inner — the 10%)
```
Platform's $10 splits into:
  → Country Franchise: $4.00 (40%)
  → Corporate Franchise: $2.50 (25%)
  → Sub Franchise: $2.00 (20%)
  → EHB HQ: $1.50 (15%)
```

#### Service Charges by Department
| Department | Charge Type | Range |
|-----------|-------------|-------|
| GoSellr | Per transaction | 5-10% of sale amount |
| CRB | Exam + certification | Per exam/verification |
| PSS | Profile verification | Per verification type |
| DMO | Business management | Based on tools used |
| AI Services | Per use / subscription | TBD |

#### Wallet Economics
- FREE users: Limited access, no protection guarantee
- BASIC+ users: Full guarantee, company responsible for quality
- Coin lock creates "skin in the game" — higher lock = higher trust = more business

### 16.6 GoSellr — Complete E-Commerce Flow

```
BUYER FLOW:
1. Open app → nearest stores displayed
2. Browse products (STL badges visible on every product/seller)
3. Add to cart → review order
4. Select delivery boy (multiple shown with charges)
5. Choose payment (EHBGC wallet / external)
6. Place order → escrow locks payment
7. Track delivery (real-time)
8. Receive product → confirm delivery
9. Escrow releases payment to seller
10. Rate & review (impacts STL)

SELLER FLOW:
1. Register business → PSS verify → CRB certify
2. List products (each product gets STL badge)
3. Receive order notification
4. Prepare & hand to rider
5. Track delivery status
6. Receive payment (after escrow release)
7. View analytics (sales, ratings, STL trends)

RIDER FLOW:
1. Register → PSS verify → CRB certify (delivery category)
2. Go online in app
3. Receive delivery task (priority by STL level)
4. Accept → navigate to pickup
5. Confirm pickup → navigate to dropoff
6. Deliver → get proof of delivery
7. Earn delivery fee → wallet credit
8. View stats (speed rating, customer rating, franchise rating)

DELIVERY PROMISES:
- 15 minutes to 1 hour (nearest store)
- Max 12 hours (basic service)
- Replacement within 1 day (Basic+ STL)
- Complaint response within 15 minutes
- Franchise office in every city for physical support
```

### 16.7 Trust-Based Economy — How STL Drives Everything

```
THE TRUST LOOP:
┌─────────────────────────────────────────────┐
│                                             │
│   Verify Identity (PSS)                     │
│        ↓                                    │
│   Certify Skills (CRB)                      │
│        ↓                                    │
│   Lock Coins (Wallet)                       │
│        ↓                                    │
│   Calculate STL Score                       │
│        ↓                                    │
│   Higher STL = Better Visibility            │
│        ↓                                    │
│   More Orders = More Earnings               │
│        ↓                                    │
│   Good Reviews = STL Upgrade                │
│        ↓                                    │
│   Refill CRB every 6 months                │
│        ↓                                    │
│   Loop continues → Trust compounds          │
│                                             │
└─────────────────────────────────────────────┘

TRUST PROTECTION GUARANTEE:
- FREE level: Company NOT responsible (no verification)
- BASIC level: Company guarantees product quality
- NORMAL+: Full protection — delivery, quality, money
- VIP/ELITE/SUPREME: Premium protection + priority support

WHY STL MATTERS:
- Buyers see STL badges → choose higher-trust sellers
- Sellers invest in verification → get more business
- Fraudsters can't game it → MIN rule (weakest link)
- Coin lock = financial commitment → reduces fraud
- CRB refills = continuous quality → prevents degradation
```

### 16.8 AI Department — Complete System

```
6 FLAGSHIP AI MODULES:
┌──────────────────────────────────────────────┐
│  1. AI LAWYER (Legal/OLS)                    │
│     → Case triage, document drafting          │
│     → Risk analysis, legal research           │
│     → Contract review                         │
│                                              │
│  2. AI DIAGNOSIS (Medical/WMS)               │
│     → Symptom triage with confidence scoring  │
│     → Report explanation                      │
│     → Emergency protocol (severity detection) │
│                                              │
│  3. AI RESUME BUILDER (Jobs/JPS)             │
│     → CV generation & optimization            │
│     → Skill gap analysis                      │
│     → Job match recommendations               │
│                                              │
│  4. AI COURSE TUTOR (Education/HPS)          │
│     → Adaptive learning paths                 │
│     → Progress tracking                       │
│     → Personalized study plans                │
│                                              │
│  5. AI BUSINESS ADVISOR (Commerce)           │
│     → SME consulting                          │
│     → Market analysis                         │
│     → Growth recommendations                  │
│                                              │
│  6. AI FRAUD DETECTOR (DMO)                  │
│     → Transaction pattern analysis            │
│     → Review abuse detection                  │
│     → Up-Guard automated monitoring           │
└──────────────────────────────────────────────┘

CRITICAL RULE: AI advises → DMO/Platform confirms
AI NEVER makes final decisions alone.

AI WIDGET (on every page):
- Fixed bottom-right, always visible
- Text + voice input (Web Speech API)
- Contextual help based on current page
- Can navigate user to any section
- Shows STL status on request
```

### 16.9 Blockchain Integration — 3-Phase Plan

```
PHASE 1 — Binance Smart Chain (Current)
  → EHBGC as BEP-20 token
  → Basic transactions + coin locks
  → Smart contracts for escrow

PHASE 2 — Mosaic Blockchain (EHB Proprietary)
  → Permissioned/hybrid chain
  → Full STL audit trail
  → CRB certificate hash storage
  → Franchise validations

PHASE 3 — Polkadot Parachain (Full Decentralization)
  → Cross-chain bridges
  → True decentralized governance
  → International regulatory compliance

WHAT GOES ON-CHAIN:
- All financial transactions
- Coin lock/unlock events
- STL level changes
- CRB certificate hashes
- Franchise territory validations
- Merkle-batched hourly (reduce gas costs)

FLOW: User Action → DMO Validation → MongoDB state update → Blockchain record (async)
```

### 16.10 Complete Page Map & Content Architecture

```
GLOBAL LAYOUT (applies to ALL pages):
┌──────────────────────────────────────────────────────────┐
│  TOP BAR (sticky, always visible)                         │
│  [Logo] [Contextual Search] [Nav Tabs] [Theme] [Wallet]  │
├──────────────────────────────────────────────────────────┤
│  INDUSTRIES BAR (horizontal scroll, 32 industries)        │
├─────────┬────────────────────────────────────────────────┤
│ SIDEBAR │  PAGE CONTENT                                   │
│ (module │  (varies by page)                               │
│  pages) │                                                 │
├─────────┴────────────────────────────────────────────────┤
│  FOOTER                                                   │
└──────────────────────────────────────────────────────────┘
                                          [AI Widget ↗]

PAGE MAP:
/                          → Home (hero, featured industries, how-it-works)
/marketplace               → All services/products across 32 industries
/gosellr                   → GoSellr e-commerce (products, cart, checkout)
/gosellr/seller            → Seller dashboard (orders, analytics, inventory)
/gosellr/rider             → Rider dashboard (deliveries, earnings, routes)
/medical (wms)             → Doctors, clinics, appointments, prescriptions
/legal (ols)               → Lawyers, cases, documents, AI Lawyer
/education (hps)           → Courses, tutors, certifications, AI Tutor
/jobs (jps)                → Job listings, skill matching, AI Resume
/travel (agts)             → Flights, hotels, packages, bookings
/books (obs)               → Digital & physical books, publishers
/technology (sot)          → Web/app dev services, AI tools
/media (ehb-tube)          → Verified video platform
/machinery (hms)           → Industrial machinery services
/dmo                       → DMO Dashboard (governance overview)
/dmo/stl                   → STL Level management & ladder
/dmo/crb                   → CRB Certification & refill tracker
/dmo/pss                   → PSS KYC verification & trust scores
/dmo/wallet                → Wallet (balance, transactions, escrow)
/dmo/franchise             → Franchise management (hierarchy, territory)
/dmo/affiliate             → Affiliate/referral program
/dmo/complaints            → Complaint management queue
/dmo/analytics             → Platform-wide analytics
/profile                   → User profile (multi-role: buyer/seller/rider/franchise)
/onboarding                → First-time user flow (8 steps)
/settings                  → Account settings, theme, notifications
/ai                        → AI Marketplace (plugins, agents, tools)
```

### 16.11 How Different Roles Experience the Platform

```
BUYER EXPERIENCE:
- Sees: marketplace, products, STL badges, AI recommendations
- Actions: browse, buy, book, rate, refer
- Dashboard: orders, wallet, bookings, AI suggestions, STL progress

SELLER EXPERIENCE:
- Sees: seller dashboard, order queue, analytics, inventory
- Actions: list products, fulfill orders, manage store, view earnings
- Dashboard: active orders, revenue, wallet, conversion rate, STL level

RIDER EXPERIENCE:
- Sees: delivery dashboard, task queue, route map
- Actions: accept deliveries, navigate, confirm pickup/dropoff
- Dashboard: active tasks, earnings today, speed/customer/franchise ratings

FRANCHISE OWNER EXPERIENCE:
- Sees: territory dashboard, user growth, revenue, complaints
- Actions: onboard users, coordinate CRB inspections, resolve complaints
- Dashboard: territory map, performance KPIs, revenue split, compliance

ADMIN/DMO EXPERIENCE:
- Sees: governance dashboard, all module panels, fraud alerts
- Actions: approve/reject applications, enforce policies, manage STL
- Dashboard: 7 module panels (PSS/CRB/STL/GoSellr/Wallet/Franchise/Complaint)
```

### 16.12 Quality Guarantee by STL Level

| STL Level | Company Guarantees | Protection |
|-----------|-------------------|------------|
| FREE (L1) | Nothing — use at own risk | No protection |
| BASIC (L2) | Product quality | Basic replacement |
| NORMAL (L3) | Quality + correct pricing | Replacement + partial refund |
| STANDARD (L4) | Quality + delivery + pricing | Full refund within policy |
| ADVANCED (L5) | All above + fast resolution | Priority support |
| HIGH (L6) | All above + dedicated support | Premium protection |
| PRO (L7) | All above + insurance | Insured transactions |
| VIP (L8) | All above + personal manager | White-glove service |
| ELITE (L9) | All above + legal support | Full legal protection |
| SUPREME (L10) | Everything — zero risk | Complete guarantee |

### 16.13 Data Flow Architecture

```
COMPLETE DATA FLOW FOR A GOSELLR ORDER:

1. BUYER places order
   → Frontend: POST /api/orders/create
   → Validates: buyer STL, product STL, seller STL
   → Master rule: MIN(all STLs) determines protection level
   → Escrow: POST /api/wallet/escrow (locks payment)

2. SELLER receives notification
   → WebSocket push to seller dashboard
   → Seller accepts → status: IN_PROGRESS
   → Prepares product → calls rider

3. RIDER assigned
   → AI matches nearest available rider (STL-weighted priority)
   → Rider accepts → navigates to pickup
   → Confirms pickup → POST /api/delivery/pickup

4. DELIVERY in progress
   → Real-time tracking (GPS updates every 10s)
   → Buyer sees rider on map
   → Franchise monitors delivery timing

5. DELIVERY complete
   → Rider confirms → POST /api/delivery/complete
   → Buyer confirms receipt
   → Escrow released: POST /api/wallet/release

6. REVENUE DISTRIBUTION
   → Outer split: Seller 70%, Rider 10%, Franchise 10%, Platform 10%
   → Inner split (platform's 10%): Country 40%, Corporate 25%, Sub 20%, HQ 15%
   → All credits to respective wallets
   → Blockchain: transaction hash recorded

7. POST-ORDER
   → Buyer rates seller + rider (impacts their STL)
   → Complaint window opens (dispute period)
   → If complaint: DMO Up-Guard investigates
   → STL recalculated for all parties
   → CRB activity logged (toward refill requirements)
```

### 16.14 Open Questions Requiring Business Decisions

**Source:** `D:\ehb ui ux\EHB Questions.docx`

1. **Wallet:** Will earnings be paid to internal wallet first, or directly to bank/Easypaisa/JazzCash?
2. **Affiliate:** What are exact bonus amounts, level depth, percentage rates, abuse caps?
3. **Blockchain:** Is it required for MVP or Phase 2/3 only?
4. **AI Sophistication:** What level of AI is expected in first 3 months?
5. **Franchise Territory:** Are territories exclusive by city/region?
6. **Multi-Role:** How does the UI handle one person being buyer + seller + franchise owner simultaneously?
7. **Document Verification:** Manual admin, AI-assisted, or NADRA integration?
8. **Payment Gateway:** Stripe, Easypaisa, JazzCash — which for MVP?

---

## 18. Affiliate Program — Complete Structure

> **Added:** 2026-04-12 — from Google Docs upload

### Bonus Types
1. **Direct Bonus** — One-time on referral signup
2. **Indirect Bonus** — From indirect network activity
3. **Level Bonus** — 15 levels deep
4. **Rank & Reward** — Achievement-based rewards
5. **Promotion Bonus** — Promotional incentives
6. **Fast Bonus** — Early action rewards
7. **Franchise Installment System** — Installment payments for franchise booking

### Key Rules
- ALL percentages are admin-configurable (changeable anytime)
- Generation plan: unlimited legs/downlines
- One joining link per user (works for all programs)
- One-click attach affiliate to any new EHB service
- E-commerce affiliate: only verified companies/brands
- Company sets affiliate amount per product → system auto-distributes

### Wallet Structure (Affiliate)
| Wallet | Purpose | Transfer Rules |
|--------|---------|----------------|
| P-Wallet | Package earnings | No user-to-user ($1 fee if allowed) |
| E-Wallet | General earnings | User-to-user transfers OK |
| Level Wallet | Level bonus income | Transfer to E-Wallet only ($1 fee) |
| Auto Pool Wallet | Pool earnings | Transfer to E-Wallet only ($1 fee) |
| Main Wallet | Aggregated balance | Used for purchases, deposits, withdrawals |

### Fees
- P-Wallet → E-Wallet: $1
- Level Wallet → E-Wallet: $1
- Pool Wallet → E-Wallet: $1
- E-Wallet → Bank/USDT withdrawal: 5%

---

## 19. Franchise Booking — Detailed Flow

> **Added:** 2026-04-12 — from Google Docs upload

### Booking System
- 3 Rounds, after every 100 franchises sold → 20% price increase
- 3 Phases, 100 franchises per phase
- Promo system with start/end dates

### Post-Purchase Activation
1. After purchase → email sent with activation link
2. Owner generates security code
3. Code required to activate franchise + enable withdrawals
4. Without code: NO withdrawals possible

### Training Schedule
- Sub Franchise: Daily 10pm + Weekly Monday 10pm (via Master Franchise)
- Master Franchise: Weekly/monthly 11pm (via Corporate, admin-set)
- Seller: Daily/weekly (via Corporate or Company)

---

## 20. GoSellr Delivery Timer System

> **Added:** 2026-04-12 — from Google Docs upload

### Delivery Rules
- Timer starts after order packed
- Minimum: 5 minutes, Maximum: 30 minutes
- Seller gives ETA when accepting order
- Must leave shop within ETA → else franchise notification
- Buyer sees: rider profile + live Google Maps ETA
- Late delivery → franchise notified → calls rider → confirms new time to buyer

### Order Notifications (go to 3 parties)
1. Seller
2. Delivery Rider
3. Area Franchise
- If nobody picks up → franchise resolves or rejects
- If no franchise in area → forward to nearest franchise

### AI Auto Complaint System (Normal+ STL)
- Auto-complaints generated for: delay, non-delivery, wrong product, damaged, replacement needed
- Escalation: Store Owner → Sub Franchise → Brand Company (12hr) → Master Franchise

---

## 21. OLS — Online Law Services Detail

> **Added:** 2026-04-12 — from Google Docs upload

### Features (visible after 5000+ registered users)
- Filter: service type, city/nearby, category, STL level, country, price range
- Types: Licensed-based, Practice-based
- Contracts: Monthly, Yearly, Contract-based
- Daily office lawyer (set hours), Remote, Online consultant

### Lawyer Rules
- Free registration (FREE STL)
- Above FREE: must register with licensed lawyer OR provide own license
- Max 22 monthly clients per lawyer
- Minimum monthly fee: 25,000 PKR
- Registration duration: 6 months (then re-register/re-verify)
- 3 complaints → client shifted to different lawyer

### Fully Secure Service
- User pays full fee in advance → escrow holds
- Released to lawyer on case completion
- Refunded if not completed
- Requires BASIC+ profile

---

## 22. Seller Types & Registration

> **Added:** 2026-04-12 — from Google Docs upload

### 5 Seller Types
1. Company / Own Products
2. Dealer
3. Distributor
4. Trader
5. Store Owner

### Store Owner Registration Requirements
- PSS KYC verified
- Store info: area size, total products, start date, employees
- Minimum 10 store photos (inside + outside)
- Minimum 5 store videos
- Employee list with JPS IDs (auto-pull data)

### Stock Management
- Below 500 units → red warning
- Near empty → notification to owner + brand company + sub franchise
- Empty → auto notification to restock

---

## 23. Naming Legacy Reference

| Legacy Name | Current Name | First Used | Changed To |
|-------------|-------------|-----------|------------|
| SQL (Service Quality Level) | STL (Service Trust Level) | 2022 | 2026-04-11 |
| EDR (Exam Decision Registry) | CRB (Central Record Blockchain) | 2022 | 2026-04-11, updated 2026-04-19 |
| EMO (Easy Management Office) | DMO (Decentralized Management Office) | 2022 | 2026 |
| Ali Dad | GoSellr | 2022 | 2023 |

---

## 24. EHB AD System (Web 3.0 Verified Advertising)

**Concept:** Blockchain-backed verified advertisement platform with smart contract fee locking.

**Ad Verification Chain:** Ad Submission → Fee Lock (smart contract) → Physical Verification (Sub-Franchise, 1-month validity) → Ads Responsive Review (AI-assigned) → Ads Sub-Responsive 1 & 2 → Master Franchise + 10 JPS Experts (if needed) → Final Decision

**Fee Distribution:** Master Franchise 5%, Corporate 1%, Ads Dept 60%, JPS Reviewers 20%, EHB Company 14%

**Penalty for incorrect approvals:** 5% locked balance loss. Rejection requires resubmission within 7 days. One free resubmission after corrections.

---

## 25. GoSellr 7-Level Supply Chain Hierarchy

| Level | Type | Role |
|-------|------|------|
| 1 | Manufacturer/Company | Product creator, brand owner |
| 2 | Authorized Dealer | Direct from company, regional |
| 3 | Distributor | Large quantity, multi-dealer supply |
| 4 | Wholesaler | Bulk sales to retailers |
| 5 | Trader | Buy & sell, flexible sourcing |
| 6 | Storekeeper/Retailer | Direct to customer (main visible seller) |
| 7 | Online Seller | Virtual store, dropshipping |

**Multi-Level Pricing:** Base → +10% (Dealer) → +15% (Distributor) → +20% (Wholesaler) → +30% (Retailer)

**Dynamic pricing:** High STL = lower commission, Low STL = higher charges

**Store Types:** Single Store, Multi-Branch, Franchise Store, Virtual Store

**Order Commission Split:** Seller 70%, Company 10%, Franchise 10%, Affiliate 10%

---

## 26. Blockchain 5-Phase Roadmap (Detailed)

| Phase | Timeline | Focus | Key Tech |
|-------|----------|-------|----------|
| 1 | 2025 Q3 | Affiliate + Wallet + Order | BSC + Moonbeam + Polkadot |
| 2 | 2025 Q4 | Fine + Badge + NFT + EHBGC Launch | Polkadot + Subchain |
| 3 | 2026 Q1 | Validator + Staking + Governance | Mosaic Blockchain (Substrate) |
| 4 | 2026 Q2 | Cross-Chain Bridge + G6 Identity | Highway + G6 + Parachains |
| 5 | 2026-27 | AI + Blockchain Merge | Mosaic + Polkadot + AI Layer |

**Architecture:** EHB Core → Mosaic Galaxy (Base) → Parachain Layer → Mosaic Highway Relay (Decentralized) → Centralized Relay (Fast) → EHB Wallet

**Tokens:** EHBGC (main: payments, staking, governance), EHBSC (stablecoin: daily transactions, salary)

**Validators:** 2000-3000 planned, stake EHBGC to run node, earn transaction fees + block rewards

**Parachains:** GoSellr = Commerce Chain, JPS = Job Chain, STL = Trust Chain, Wallet = Finance Chain

---

## 27. Additional Industry Services (from ehb docs2)

### 27.1 AGTS (Advanced Global Traveling Services)
- Verified booking: Flights, Hotels, Transport, Tour Packages, Travel Agents
- STL-based access tiers (Free=view only → VIP=first class+global emergency)
- AI trip planner, multilingual AI translation, geo-based emergency button
- Backend: agts_users, agts_flights, agts_hotels, agts_agents, agts_tours, agts_bookings

### 27.2 EHB Tube (Verified Media Platform)
- AI + franchise verified video content platform
- Proof-based uploads, STL-tagged visibility, Watch-and-Earn model
- Monetization: Ad income + reward tokens + affiliate
- STL tiers: Free=2 videos/month → VIP=global spotlight+sponsor priority
- Backend: etube_users, etube_channels, etube_videos, etube_earnings

### 27.3 OBS (Online Book Store)
- Global book/educational content platform with AI libraries + blockchain copyright
- AI Book Reader (summary + Q&A + voice), Verified Author badges
- STL tiers: Free=previews → VIP=resell+global publish
- Institution libraries for schools
- Backend: obs_users, obs_books, obs_authors, obs_institutions

### 27.4 SOT (Services of Technology)
- Developer tool marketplace + tech service platform
- Verified tool uploads, project-based hiring (Upwork/Fiverr model)
- Code AI assistant, bug reporting center, tool version management
- STL tiers: Free=1 tool → VIP=unlimited+AI SEO+global sales

---

## 28. STL Governance Deep Model (from ehb docs2)

### Level Up Factors (Max Score Impact)
- PSS Verification: +40
- CRB Certification: +20
- Performance: +20
- Behavior: +20
- Reviews: +10
- Industry Verification: +10

### Level Down Penalties
| Action | Score Impact |
|--------|-------------|
| Fake product/fraud | -50 |
| Valid complaint | -10 |
| Late delivery | -5 |
| Order cancellation | -5 |
| Inactive 30 days | -5 |
| Inactive 60 days | -10 |
| Inactive 90 days | -20 |
| Failed inspection | -30 |

**Auto-downgrade:** STL < 40 → Auto L1 + Fraud Monitoring ON

### Complaint Lock System
- 1-2 complaints: Warning
- 3 complaints: Level Up Block (cannot upgrade STL)
- 5+ complaints: STL Drop
- Until ALL complaints resolved: No STL upgrade, premium features locked

### CRB Anti-Corruption Rotation
Different franchise assigned for each verification/refilling cycle. Same franchise never repeats consecutively. If no franchise in area → nearest area. If no franchise in country → STL locked at L1-L2.

---

## 29. 50+ Industry Master List (from ehb docs2 database schema)

**Core (6):** Education (EDU), Health (WMS), E-Commerce (GSM), Law (OLS), Jobs (JPS), Travel (AGTS)

**Lifestyle (8):** Real Estate, Automotive, Fashion, Beauty, Sports, Entertainment, Music, Food

**Technical (5):** Information Technology (SOT), Construction, Agriculture, Logistics, Manufacturing

**Professional (3):** Human Resource Management, Freelancing, Consulting

**Security (3):** Security Services, Telecom, Energy

**Social (4):** Environmental, Research, Non-Profit/NGO, Government

**Future (5):** Robotics, IoT, Biotechnology, Space Technology, Quantum Technology

**Total: 34+ industries (expandable to 50+ with sub-industries)**

**Structure:** Each industry → 3 categories (Basic, Advanced, Premium) → 20+ services per category = 700+ total services

---

## 30. Complete Bonus Types (19+ from Urdu docs)

1. Direct Referral (5%, instant)
2. Team Performance (8%, level-distributed)
3. Rank Achievement (2%, milestone-based)
4. Passive Income (3%, franchise lifetime)
5. Global Pool (2%, quarterly, 5% company profit shared)
6. Generational Wealth (2%, preserved for family, 5-year minimum)
7. Service-Based (2%, per sale)
8. Leadership (1%, mentoring)
9. Auto-Reinvestment (1% auto-reinvested)
10. Dynamic Level (2% at L10, 4% at L20)
11. AI Performance (AI-determined based on activity)
12. Education & Training ($50 per session)
13. Anniversary (1% extra per anniversary)
14. Product/Service-Specific (varies by industry)
15. DeFi Token Rewards (10 tokens per $100 commission)
16. Sustainability ($50 per 10 eco-actions)
17. AI Gamification (points for challenges)
18. Infinity (unlimited depth earning)
19. Lifetime Loyalty

---

## §31 — Complete Industries with Services & Microservices (50+)

> Every industry below runs on **14 shared EHB microservices** (stl-service, pss-integration-service, crb-integration-service, payment-service, wallet-service, review-rating-service, notification-service, analytics-service, ai-recommendation-service, dispute-service, affiliate-service, franchise-service, search-service, dmo-compliance-service). Only industry-specific services/microservices are listed per industry.

### 31.1 — GoSellr — powered by EHB (E-Commerce Marketplace)

**Services:** Product Listing & Catalog Management, 7-Level Seller Hierarchy (Manufacturer → Online Seller), Multi-Level Pricing Engine (+10% to +30%), Order Management System (OMS), Cart & Checkout, Payment Gateway (Fiat + Crypto), Delivery & Shipping Management, Returns & Refund Processing, Seller Dashboard & Analytics, Buyer Dashboard & Order Tracking.

**Microservices:** product-catalog-service, pricing-engine-service, inventory-service, order-service, cart-service, payment-service, shipping-service, review-rating-service, seller-onboarding-service, search-service, notification-service, dispute-service, analytics-service, trusty-wallet-routing-service.

### 31.2 — JPS — powered by EHB (Job Profile & Skill)

**Services:** Job Posting & Application, AI-Based Job Matching, Skill Assessment & Testing, Resume/CV Builder, Company Hiring Dashboard, Inspector Hiring & Training Pipeline, Freelancer Marketplace, Interview Scheduling.

**Microservices:** job-posting-service, application-service, ai-matching-service, skill-assessment-service, resume-service, company-dashboard-service, inspector-pipeline-service, freelancer-service, interview-service, notification-service, analytics-service.

### 31.3 — OLS — powered by EHB (Online Legal Services)

**Services:** Lawyer Directory & Search, Online Legal Consultation (Video/Chat), Document Drafting & Review, Case Management, Legal AI Assistant, Court Filing Assistance, Contract Generator, Dispute Resolution (ADR).

**Microservices:** lawyer-directory-service, consultation-service, document-service, case-management-service, legal-ai-service, court-filing-service, contract-generator-service, adr-service, billing-service, notification-service.

### 31.4 — WMS — powered by EHB (Worldwide Medical Services)

**Services:** Doctor Directory & Appointment Booking, Telemedicine (Video/Chat), E-Pharmacy & Medicine Delivery, Lab Test Booking & Results, AI Diagnosis Assistant, Medical Records (EHR), Hospital/Clinic Management, Emergency Services Locator.

**Microservices:** doctor-directory-service, appointment-service, telemedicine-service, pharmacy-service, lab-service, ai-diagnosis-service, ehr-service, hospital-management-service, emergency-service, insurance-service, notification-service.

### 31.5 — HPS/OBS — powered by EHB (Home & Online Book Store + Education)

**Services:** Book Catalog & E-Commerce, E-Book Reader & Library, Online Courses & LMS, Tutor Marketplace, AI Tutor Assistant, School/University Management, Student Dashboard, Certification & Exams.

**Microservices:** book-catalog-service, ebook-reader-service, course-service, lms-service, tutor-service, ai-tutor-service, school-management-service, exam-service, certification-service, content-service, notification-service.

### 31.6 — AGTS — powered by EHB (AI Global Travel System)

**Services:** Flight Booking & Comparison, Hotel Booking & Reviews, Tour Package Management, Visa Assistance & Processing, Travel Insurance, Car Rental & Transport, AI Travel Planner, Travel Guide & Recommendations.

**Microservices:** flight-service, hotel-service, tour-package-service, visa-service, insurance-service, transport-service, ai-planner-service, review-service, payment-service, notification-service.

### 31.7 — Finance & Banking — powered by EHB

**Services:** Digital Banking Dashboard, Loan & Credit Services, Investment Portfolio Management, Insurance Marketplace, Tax Filing & Advisory, Accounting & Bookkeeping, Payment Processing.

**Microservices:** account-service, loan-service, investment-service, insurance-marketplace-service, tax-service, accounting-service, payment-processing-service, kyc-service, analytics-service.

### 31.8 — Real Estate — powered by EHB

**Services:** Property Listing & Search, Virtual Property Tours, Rental Management, Property Valuation AI, Mortgage Calculator & Assistance, Agent/Broker Directory, Legal Documentation, Construction Progress Tracking.

**Microservices:** property-listing-service, search-service, rental-management-service, valuation-service, mortgage-service, agent-service, document-service, construction-service, notification-service.

### 31.9 — Consulting — powered by EHB

**Services:** Consultant Directory & Booking, Project Management Dashboard, Online Consultation (Video/Chat), Proposal & Contract Management, Business Analysis Tools, Industry-Specific Advisory.

**Microservices:** consultant-directory-service, booking-service, project-service, proposal-service, analytics-service, billing-service, communication-service.

### 31.10 — Construction & Infrastructure — powered by EHB

**Services:** Contractor & Builder Directory, Project Planning & Management, Material Procurement Marketplace, Architectural Design, Building Inspection & Quality, Equipment Rental, Workforce Management.

**Microservices:** contractor-service, project-management-service, procurement-service, design-service, inspection-service, equipment-service, workforce-service, document-service.

### 31.11 — Agriculture & Farming — powered by EHB

**Services:** Crop Marketplace (Farm to Table), Farm Equipment Marketplace, AI Crop Advisory, Weather & Soil Analytics, Livestock Management, Supply Chain Tracking, Agricultural Loans & Insurance.

**Microservices:** crop-marketplace-service, equipment-service, ai-advisory-service, weather-service, livestock-service, supply-chain-service, finance-service, analytics-service.

### 31.12 — Automotive — powered by EHB

**Services:** Vehicle Marketplace (New & Used), Spare Parts & Accessories, Workshop & Service Booking, Vehicle Insurance, Rental & Leasing, AI Vehicle Diagnostics, Driving School Integration.

**Microservices:** vehicle-listing-service, parts-service, workshop-service, insurance-service, rental-service, diagnostics-service, driving-school-service, review-service.

### 31.13 — Hospitality — powered by EHB

**Services:** Hotel & Resort Booking, Restaurant Reservation & Delivery, Event Venue Management, Catering Services, Hospitality Staff Hiring (JPS), Guest Experience Management, Tourism Package Integration.

**Microservices:** hotel-booking-service, restaurant-service, venue-service, catering-service, staff-service, guest-service, tourism-service.

### 31.14 — Fashion — powered by EHB

**Services:** Fashion Marketplace, Designer/Brand Directory, Custom Tailoring Platform, Fashion AI Stylist, Trend Analytics, Size Guide & Virtual Try-On, Sustainable Fashion Section.

**Microservices:** fashion-catalog-service, designer-service, tailoring-service, ai-stylist-service, trend-service, virtual-tryon-service, sustainability-service.

### 31.15 — Beauty & Cosmetics — powered by EHB

**Services:** Beauty Products Marketplace, Salon & Spa Booking, Beauty Professional Directory, Skin Analysis AI, Tutorial & Training Content, Subscription Boxes.

**Microservices:** product-catalog-service, salon-booking-service, professional-service, skin-analysis-service, content-service, subscription-service.

### 31.16 — Fitness & Wellness — powered by EHB

**Services:** Gym & Fitness Center Directory, Personal Trainer Marketplace, Workout & Diet Planning AI, Wellness Product Shop, Mental Health & Meditation, Health Tracking Integration.

**Microservices:** gym-directory-service, trainer-service, workout-service, diet-service, wellness-shop-service, mental-health-service, health-tracking-service.

### 31.17 — Food & Beverages — powered by EHB

**Services:** Restaurant Delivery & Ordering, Grocery Marketplace, Recipe & Cooking Platform, Food Catering, Food Truck & Street Food Directory, Cloud Kitchen.

**Microservices:** restaurant-ordering-service, grocery-service, recipe-service, catering-service, food-truck-service, cloud-kitchen-service, delivery-service, review-service.

### 31.18 — Pets & Animals — powered by EHB

**Services:** Pet Marketplace (Buy/Adopt), Vet Directory & Booking, Pet Products & Food Shop, Pet Grooming & Boarding, Pet Insurance, Lost & Found Pet Network.

**Microservices:** pet-marketplace-service, vet-service, pet-shop-service, grooming-service, boarding-service, insurance-service, lost-found-service.

### 31.19 — Weddings & Events — powered by EHB

**Services:** Event Planning & Management, Vendor Marketplace (Venues, Caterers, Decorators), Wedding Planning AI, Photography & Videography Booking, Invitation & RSVP Management, Budget Planning Tool.

**Microservices:** event-planning-service, vendor-marketplace-service, ai-planner-service, photography-service, invitation-service, budget-service, venue-service.

### 31.20 — Home & Garden — powered by EHB

**Services:** Home Services Marketplace (Plumber, Electrician, etc.), Furniture & Decor Shop, Interior Design Platform, Garden & Landscaping, Smart Home Products, Home Renovation Management.

**Microservices:** home-service-marketplace, furniture-shop-service, interior-design-service, garden-service, smart-home-service, renovation-service.

### 31.21 — Art & Crafts — powered by EHB

**Services:** Art Marketplace (Original & Prints), Artist Directory & Commission, Craft Supplies Shop, Art Classes & Workshops, Art Gallery & Exhibition Platform, NFT Art Integration.

**Microservices:** art-marketplace-service, artist-service, supplies-shop-service, classes-service, gallery-service, nft-service.

### 31.22 — SOT — powered by EHB (School of Technology)

**Services:** Tech Course Marketplace, Coding Bootcamps, Certification Programs, AI/ML Training, Tech Mentor Matching, Hackathon & Competition Platform, Corporate Training.

**Microservices:** course-service, bootcamp-service, certification-service, ai-training-service, mentor-service, hackathon-service, corporate-service.

### 31.23 — EHB Tube — powered by EHB (Video Platform)

**Services:** Video Upload & Streaming, Content Creator Dashboard, Monetization & Ad System, Live Streaming, Video Courses Integration, Community & Comments.

**Microservices:** video-service, creator-dashboard-service, monetization-service, live-stream-service, course-integration-service, community-service, recommendation-service, moderation-service.

### 31.24 — Entertainment — powered by EHB

**Services:** Event Ticketing & Booking, Movie/Show Streaming, Entertainment Venue Directory, Artist & Performer Booking, Fan Community Platform.

**Microservices:** ticketing-service, streaming-service, venue-service, artist-booking-service, community-service.

### 31.25 — Media & Publishing — powered by EHB

**Services:** News & Article Platform, Digital Publishing Tools, Author & Writer Marketplace, Print-on-Demand, Content Syndication, Journalism & Reporting Tools.

**Microservices:** news-service, publishing-service, writer-marketplace-service, print-service, syndication-service, journalism-service.

### 31.26 — Music & Audio — powered by EHB

**Services:** Music Streaming Platform, Artist & Band Profiles, Music Production Marketplace, Podcast Hosting & Distribution, Music Equipment Shop, Event & Concert Management.

**Microservices:** streaming-service, artist-service, production-service, podcast-service, equipment-shop-service, concert-service.

### 31.27 — Gaming & Esports — powered by EHB

**Services:** Game Marketplace (Digital), Esports Tournament Platform, Gaming Community & Social, Game Streaming Integration, Gaming Hardware Shop, Game Development Resources.

**Microservices:** game-marketplace-service, tournament-service, community-service, streaming-service, hardware-shop-service, dev-resources-service.

### 31.28 — Sports & Athletics — powered by EHB

**Services:** Sports Equipment Marketplace, Coaching & Training Platform, Sports Event Management, Athlete Profiles & Scouting, Sports Venue Booking, Fantasy Sports & Predictions.

**Microservices:** equipment-service, coaching-service, event-service, athlete-service, venue-service, fantasy-service.

### 31.29 — Energy & Utilities — powered by EHB

**Services:** Solar & Renewable Energy Marketplace, Utility Bill Management, Energy Audit & Consulting, EV Charging Station Network, Smart Meter Integration, Energy Trading Platform.

**Microservices:** solar-service, bill-management-service, audit-service, ev-charging-service, smart-meter-service, trading-service.

### 31.30 — Telecom — powered by EHB

**Services:** Mobile Plan Comparison & Switching, Internet Service Marketplace, Device Marketplace, Telecom Business Solutions, Network Coverage Checker, Customer Support AI.

**Microservices:** plan-comparison-service, isp-service, device-service, business-service, coverage-service, support-service.

### 31.31 — Manufacturing — powered by EHB

**Services:** B2B Manufacturing Marketplace, Factory & Equipment Directory, Supply Chain Management, Quality Control Platform, Raw Material Sourcing, Custom Manufacturing Orders.

**Microservices:** b2b-marketplace-service, factory-directory-service, supply-chain-service, quality-service, material-sourcing-service, custom-order-service.

### 31.32 — Logistics — powered by EHB

**Services:** Shipping & Freight Marketplace, Warehouse Management, Fleet Management, Last-Mile Delivery Network, Customs & Documentation, Route Optimization AI.

**Microservices:** shipping-service, warehouse-service, fleet-service, last-mile-service, customs-service, route-service.

### 31.33 — Government Services — powered by EHB

**Services:** E-Government Portal Integration, Document Processing & Verification, Public Complaint System, Citizen Services Directory, Government Job Portal (JPS), Public Tender & Procurement.

**Microservices:** document-service, verification-service, complaint-service, services-directory, tender-service.

### 31.34 — NGO & Non-Profit — powered by EHB

**Services:** Donation & Fundraising Platform, Volunteer Management, Project Impact Tracking, Transparency & Reporting, Community Engagement Tools.

**Microservices:** donation-service, volunteer-service, project-service, transparency-service, community-service.

### 31.35 — Security Services — powered by EHB

**Services:** Security Guard Marketplace, CCTV & Surveillance Solutions, Cybersecurity Services, Access Control Systems, Security Audit & Consulting, Emergency Response System.

**Microservices:** guard-service, surveillance-service, cyber-service, access-control-service, audit-service, emergency-service.

### 31.36 — Space & Aerospace — powered by EHB

**Services:** Satellite Services Marketplace, Aerospace Parts Procurement, Space Education, Drone Services, Aerial Survey Booking.

**Microservices:** satellite-service, parts-procurement-service, education-service, drone-service, aerial-survey-service.

### 31.37 — Insurance — powered by EHB

**Services:** Policy Comparison, Claim Management, AI Risk Assessment, Agent Directory, Digital Policy Issuance.

**Microservices:** policy-comparison-service, claim-service, risk-assessment-service, agent-service, policy-issuance-service.

### 31.38 — Pharmacy — powered by EHB

**Services:** Online Pharmacy, Prescription Management, Medicine Delivery, Drug Interaction Checker, Pharmacy Directory.

**Microservices:** pharmacy-catalog-service, prescription-service, delivery-service, interaction-checker-service, directory-service.

### 31.39 — Cleaning Services — powered by EHB

**Services:** Home Cleaning Booking, Commercial Cleaning, Laundry Services, Pest Control, Disinfection Services.

**Microservices:** home-cleaning-service, commercial-cleaning-service, laundry-service, pest-control-service, disinfection-service.

### 31.40 — Transportation — powered by EHB

**Services:** Ride-Hailing, Bus/Train Booking, Cargo Transport, Vehicle Pooling, Route Planning.

**Microservices:** ride-service, public-transport-service, cargo-service, pooling-service, route-planning-service.

### 31.41 — Childcare & Parenting — powered by EHB

**Services:** Daycare Directory, Babysitter Booking, Parenting Courses, Child Health Tracking, Toy & Kids Marketplace.

**Microservices:** daycare-service, babysitter-service, courses-service, health-tracking-service, kids-marketplace-service.

### 31.42 — Senior Care — powered by EHB

**Services:** Elderly Care Services, Nursing Home Directory, Home Health Aide Booking, Medical Alert Systems, Companionship Services.

**Microservices:** care-service, nursing-home-service, aide-booking-service, alert-service, companionship-service.

### 31.43 — Freelancing — powered by EHB

**Services:** Freelancer Marketplace, Project Bidding, Milestone Payments, Portfolio Showcase, Client Management.

**Microservices:** freelancer-marketplace-service, bidding-service, milestone-payment-service, portfolio-service, client-management-service.

### 31.44 — Printing & Signage — powered by EHB

**Services:** Print-on-Demand, Business Card/Banner Design, Signage Installation, Custom Merchandise, Packaging Design.

**Microservices:** print-service, design-service, signage-service, merchandise-service, packaging-service.

### 31.45 — Recycling & Waste — powered by EHB

**Services:** Waste Collection Scheduling, Recycling Marketplace, E-Waste Management, Composting Services, Environmental Consulting.

**Microservices:** waste-collection-service, recycling-marketplace-service, ewaste-service, composting-service, consulting-service.

### 31.46 — Language & Translation — powered by EHB

**Services:** Translation Marketplace, Interpreter Booking, Language Courses, AI Translation, Document Localization.

**Microservices:** translation-service, interpreter-service, language-course-service, ai-translation-service, localization-service.

### 31.47 — Photography — powered by EHB

**Services:** Photographer Booking, Photo Editing Services, Stock Photo Marketplace, Printing Services, Studio Rental.

**Microservices:** photographer-service, editing-service, stock-photo-service, printing-service, studio-service.

### 31.48 — Moving & Storage — powered by EHB

**Services:** Moving Company Comparison, Packing Services, Storage Unit Rental, Furniture Assembly, International Relocation.

**Microservices:** moving-service, packing-service, storage-service, assembly-service, relocation-service.

### 31.49 — Coworking & Office — powered by EHB

**Services:** Coworking Space Booking, Virtual Office, Meeting Room Rental, Office Supplies, Office Design Services.

**Microservices:** coworking-service, virtual-office-service, meeting-room-service, supplies-service, office-design-service.

### 31.50 — Handyman Services — powered by EHB

**Services:** Home Repair Booking, Appliance Installation, Plumbing/Electrical, Painting, Carpentry.

**Microservices:** repair-service, installation-service, plumbing-electrical-service, painting-service, carpentry-service.

### 31.51 — 14 Shared EHB Microservices (Common to ALL Industries)

Every industry above automatically includes these platform-wide microservices:

1. **stl-service** — Industry-specific STL scoring & level management (STL — EHB Department)
2. **pss-integration-service** — User/business verification (PSS — EHB Department)
3. **crb-integration-service** — Physical inspection & certification (CRB — EHB Department)
4. **payment-service** — Fiat + EHBGC coin payment processing (Wallet — EHB Department)
5. **wallet-service** — Trusty wallet, locked/free balance, escrow (Wallet — EHB Department)
6. **review-rating-service** — User reviews & star ratings
7. **notification-service** — Push, email, SMS notifications
8. **analytics-service** — Dashboard & reporting per industry
9. **ai-recommendation-service** — AI-based suggestions & personalization (AI — EHB Department)
10. **dispute-service** — Complaint handling & resolution (DMO — EHB Department)
11. **affiliate-service** — Referral tracking & bonus calculation (Affiliate — EHB Department)
12. **franchise-service** — Franchise area management & order routing (Franchise — EHB Department)
13. **search-service** — Full-text search with filters & AI
14. **dmo-compliance-service** — Governance & policy enforcement (DMO — EHB Department)

---

## §32 — EHB Finance & Service Charges System (Final)

### 32.1 — Base Service Charge (Global Rule)

Every order: **2% service charge** applied to Buyer and Seller. Delivery rider has separate 1% rule. This 2% forms the main revenue pool.

### 32.2 — 2% Distribution Split (Final Confirmed)

| Level | Share % | Role |
|-------|---------|------|
| Company (EHB) | 50% | Main control + system maintenance |
| Sub Franchise | 30% | Local operations |
| Master Franchise | 15% | Area management |
| Corporate Franchise | 3% | Country upper layer |
| Country Franchise | 2% | National level |

**Formula Example:** Order = 10,000 PKR → 2% charge = 200 PKR → Company 100 + Sub Franchise 60 + Master 30 + Corporate 6 + Country 4.

### 32.3 — Extra Charges by Role

| Role | Charge % | Notes |
|------|----------|-------|
| Buyer | 2% | On every order |
| Manufacturer | 1% | Production level, bulk sellers |
| Distributor → Shopkeeper | 2% | All seller levels below manufacturer |
| Delivery Rider | 1% | Deducted from rider earnings (system maintenance + tracking) |

### 32.4 — Admin Panel Dynamic Control

All charges are adjustable from the Company Admin Panel:

**Configurable Fields:**
- `service_charge`: 2% (adjustable)
- `company_share`: 50% (adjustable)
- `sub_franchise_share`: 30% (adjustable)
- `master_franchise_share`: 15% (adjustable)
- `corporate_franchise_share`: 3% (adjustable)
- `country_franchise_share`: 2% (adjustable)
- `rider_charge`: 1% (adjustable)
- `manufacturer_charge`: 1% (adjustable)
- `seller_charge`: 2% (adjustable)

### 32.5 — DMO Finance Control (Core Rule)

Every transaction flow: `Order → DMO Validate → Charges Apply → Wallet Distribution → Blockchain Log`

### 32.6 — Smart Charge Enhancements (Future)

1. **Dynamic Charges (AI-based):** High demand → charges increase, Low demand → charges decrease
2. **STL-based Discount:** High STL seller → lower charges, Low STL → higher charges
3. **VIP Users:** VIP buyers → reduced fees
4. **Franchise Bonus Mode:** Active franchise → extra % bonus

### 32.7 — Payment Flow Summary

```
User Payment → DMO Escrow → Charges Deduct → Remaining → Seller/Rider → 2% → Franchise Distribution
```

---

## §33 — EHB Seller Flow (Final Advanced + Auto System)

### 33.1 — Master Seller Flow

```
Register → JPS Profile → Business Setup → PSS → CRB → Wallet Lock → STL Assign → Listing → Orders → Delivery → Payment → Growth
```

### 33.2 — Step 1: Seller Registration

**Rule:** Seller kahin se bhi signup kare → JPS profile auto create.

**Flow:** `Signup → JPS Profile → Affiliate Auto ON → Referral Link Generate → DMO Save`

**Seller Type Selection (at registration):**
1. Manufacturer — pricing auto +10%
2. Brand Owner — pricing auto +15%
3. Distributor — pricing auto +18%
4. Wholesaler — pricing auto +20%
5. Retailer — pricing auto +22%
6. Reseller — pricing auto +25%
7. Online Seller — pricing auto +30%

Type selection determines: pricing adjustment, charge rate (1% for manufacturer, 2% for others), and listing rules.

### 33.3 — Step 2: Business Setup

**Required Info:** Business Name, Category/Industry, Location, Contact Info.

**Additional Fields:** Multiple warehouse locations, Delivery capability selection, Store timing, Shop images upload.

### 33.4 — Step 3: PSS Verification (Mandatory)

**Levels:**
- Basic → ID + Phone verification
- Full → Face recognition + Address verification

**Impact:** Low trust → STL blocked, High trust → fast growth path.

### 33.5 — Step 4: CRB Verification

**Flow:** `Apply → Inspector Assign (rotated from different franchise) → Visit → Check → Report → Result`

**Checkpoints:** Product quality, Business existence verification, Skills assessment.

**Fail Case:** Retry allowed, STL freeze until passed.

### 33.6 — Step 5: Trusty Wallet Setup (Critical)

**Rule:** `Locked Balance ≥ Order Value` — seller must have enough locked EHBGC to cover order values.

**If insufficient:** Order will NOT be received by seller, OR order routes to franchise with sufficient locked amount.

### 33.7 — Step 6: STL Assignment

Based on: PSS score + CRB result + Wallet lock amount + Activity history.

| Condition | STL Range |
|-----------|-----------|
| Basic user (just registered) | L1–L2 |
| Verified + wallet locked | L3–L5 |
| High trust + performance | L6–L10 |

### 33.8 — Step 7: Product Listing System

**Seller adds:** Product name, Price, Images, Category.

**Auto Systems:**
- Price auto-adjusts based on seller type (+10% to +30%)
- STL level auto-attaches to every product (MIN rule applies)
- AI quality check on images and descriptions

### 33.9 — Step 8: Order Receive System

**Flow:** `Order → DMO Check → Seller Wallet Check → Accept`

**Conditions for receiving order:** Wallet lock available for order value, STL level acceptable, Complaint count below threshold.

### 33.10 — Step 9: Delivery (Seller Side)

**Options:** Self delivery (own rider), Platform rider, Franchise delivery.

**Smart Logic:** If delay detected → franchise gets alert → re-assign option available.

### 33.11 — Step 10: Payment System

**Flow:** `Order Complete → DMO Validate → Charges Deduct → Payment Release`

**Charges Applied:** Seller 2% (or 1% if manufacturer), Rider 1%, Buyer 2%. Distribution per §32.2.

### 33.12 — Step 11: Review & STL Impact

**Good Seller:** STL increases, ranking improves, more orders received.

**Bad Seller:** Complaints → STL drops, orders decrease, ban risk at 5+ complaints.

### 33.13 — Step 12: Seller Growth System

**Upgrade Factors:** More sales volume, good reviews, wallet lock increase, CRB re-verification pass.

**Benefits:** Higher ranking, lower charges (future), priority order assignment.

### 33.14 — Step 13: Risk & Fraud Control

**DMO monitors for:** Fake orders, fake products, wallet fraud.

**Actions:** Account freeze, earnings blocked, STL immediate drop to L1.

### 33.15 — Advanced Auto Features

1. **Smart Auto Pricing:** Market comparison + best price suggestion AI
2. **Auto Order Boost:** High STL → more visibility in search
3. **Seller Health Score:** Combined metric of complaints + delivery time + reviews
4. **Auto CRB Refill Reminder:** Notification before CRB certification expires
5. **Emergency Mode:** Seller unavailable → auto-disable listings

---

## §34 — EHB Delivery System (Advanced Control + Rules + Expanded Network)

### 34.1 — Delivery Sources (4 Types)

1. **Shopkeeper Rider (Self Delivery)** — seller uses own rider
2. **Platform Rider (EHB Internal)** — EHB's own riders
3. **Independent Riders (Public Apply)** — anyone can register as rider
4. **3rd Party Companies** — Uber, Bykea, Careem, TCS, Leopards, etc.

### 34.2 — Self Delivery Rules (Critical)

**Wallet Rule:** `Shopkeeper Wallet Locked Balance ≥ 2× Order Value`

**Charges:** Rider fee 1% (shopkeeper pays) + Seller charge 2% (normal rule).

**Responsibility:** If any issue (late delivery, damage, fraud) → 100% responsibility on shopkeeper.

### 34.3 — Independent Rider System

**Registration Flow:** `Apply → JPS Profile → PSS Verify → Wallet Setup → STL Assign → Activate Rider`

**Entry Requirements:** STL ≥ L2 (minimum), PSS verified, Trusty Wallet active.

**Wallet Limit Rule:** `Max Order Value ≤ Rider Wallet Balance` — rider can only take orders up to their wallet balance. Example: Wallet = 5,000 → max 5,000 value order.

### 34.4 — 3rd Party Delivery Integration

**Flow:** `Order → API Call → 3rd Party Rider Assign → Tracking Sync → Delivery → Confirmation`

**Rules:** STL check optional (company-level trust used), payment escrow still through EHB, tracking system sync mandatory.

**Charges:** Negotiated per API contract, EHB service charge still applies.

### 34.5 — Smart Delivery Routing (Priority Logic)

System auto-selects delivery method by priority:
1. Self Delivery (if seller eligible + wallet sufficient)
2. Independent Rider (nearest + highest STL)
3. EHB Platform Rider
4. 3rd Party Company

**Selection factors:** Wallet balance, STL level, distance, delivery speed history, availability.

### 34.6 — Rule Violations & Penalties

| Violation Count | Action |
|----------------|--------|
| 1st | Warning |
| 2nd | STL drop |
| 3rd | Fine (wallet deduction) |
| 4th | Order block |
| 5th | Account freeze |

**Fine Rates:** Late delivery → 1-2% penalty, Fake delivery update → 5% penalty, Fraud → full account block + wallet freeze.

### 34.7 — Full Order Tracking System

Buyer + Franchise both can see: Order placed time, Order picked by seller, Preparation time, Dispatch time, Rider pickup time, Delivery time.

**Metrics tracked:** Shop processing time, Rider travel time, Total delivery time.

### 34.8 — Franchise Control Dashboard (Multi-Operator)

**Features:** Multiple operators per franchise dashboard, orders auto-divided among operators.

**Alert System:**
- Order placed → Seller + Franchise both get alert
- Seller no response in 2-3 min → Franchise alert → Call seller → Force accept
- Order picked but not dispatched in 5-10 min → Auto alert → Franchise calls
- Continued delay → Franchise can cancel OR shift to another seller

### 34.9 — Auto Order Reassign System

**Flow:** `Delay → Franchise Alert → No Action → Auto Reassign to nearby seller`

**Conditions:** Nearby seller available, wallet sufficient, STL acceptable.

### 34.10 — Customer Communication on Delay

On delay: Customer gets call → new ETA provided → Options: Wait, Cancel, or Replace with different seller.

### 34.11 — AI Monitoring System

**Detects:** Slow sellers, slow riders, high-delay areas, fraud patterns.

**Auto Actions:** Seller ranking decrease, rider block, route change suggestions.

### 34.12 — Delivery Performance Score

Based on: Delivery time, complaints, success rate.

**Impact:** High score → more orders assigned, Low score → fewer orders.

### 34.13 — Rider Level System (Future)

- L2 riders → Small value orders only
- L5 riders → Medium value orders
- L8+ riders → High value orders

### 34.14 — Advanced Features

1. **Auto Backup Seller:** Every order has a backup seller pre-assigned
2. **Heatmap System:** Identify slow delivery areas
3. **Priority Orders:** High STL buyer → faster delivery
4. **Emergency Override:** Franchise instant control
5. **Geo-Fencing:** Dangerous areas auto-blocked
6. **Night Mode:** Restricted delivery during night hours
7. **Rider Insurance:** High STL riders get insurance coverage

### 34.15 — Final Delivery Flow

```
Order Place → DMO Check → Delivery Type Select (Self/Rider/3rd Party)
→ Wallet + STL Check → Assign Rider → Live Tracking
→ Delivery Complete → Payment Release → STL Update
```

---

## §35 — Escrow & Refund System (Final)

### 35.1 — 2-Phase Escrow System

**Flow:** `Order Delivered → 24 Hours Soft Hold → 7 Days Protection Period → Final Release`

**Phase 1 — Soft Hold (24 Hours):** After delivery confirmation, buyer gets 24 hours to check product. If no issue raised → moves to Phase 2.

**Phase 2 — Protection Period (7 Days):** Return/complaint window. Seller's payment stays in "pending" state.

**Final Release:** After 7 days with no complaint → auto release to seller wallet. If complaint filed → hold extended until resolution.

**Fast Release Option:** High STL buyer + High STL seller → escrow released in 24 hours (trust-based fast-track).

### 35.2 — Refund Flow

**Flow:** `Return Request → DMO Review → Approval → Refund → STL Impact`

**Refund Source Priority:**
1. Escrow (primary — if payment still held)
2. Seller Wallet (if escrow already released)
3. Franchise backup (edge case — rare)

**Refund Method:** Same method as original payment — Wallet → Wallet, Fiat → Bank/wallet, Crypto → Wallet.

**Timeline:**

| Step | Time |
|------|------|
| Request review | 24–48 hours |
| Pickup return | 1–3 days |
| Refund release | 24 hours after item received |

**Fraud Protection:** Fake return → penalty on buyer, Seller at fault → STL drop on seller.

---

## §36 — EHBGC Coin Value System

### 36.1 — Hybrid Value Model

**Phase 1 (Launch):** Fixed value — `1 EHBGC = 1 USD` (recommended starting point for stability).

**Phase 2 (Growth):** Semi-floating — controlled by Company + DMO + market demand. No free fluctuation — stability required for trusty wallet system to work.

**Control:** DMO — EHB Department + Admin Panel. Value adjustments require governance approval.

> **Claude Suggestion:** Phase 1 mein 1 EHBGC = 1 USD is smart because it simplifies all wallet calculations, escrow holds, and franchise deposits. Phase 2 mein floating start karne se pehle ensure karein ke sufficient liquidity aur trade volume ho — otherwise wild swings trusty wallet system ko break kar sakte hain. Consider a ±5% band limit per month for semi-floating phase.

---

## §37 — Minimum Order Values

### 37.1 — Industry-wise Flexible Minimums

| Industry | Min Order | Reason |
|----------|-----------|--------|
| GoSellr (General E-commerce) | 500 PKR | Cover delivery + charges |
| Food & Beverages | 200 PKR | Small orders common |
| Medical/WMS | No minimum | Health emergency priority |
| Services (OLS, Consulting, etc.) | Custom per service | Varies by provider |
| Education (HPS/OBS) | No minimum | Books can be low value |

**Logic:** Small orders below minimum = loss risk after charges + delivery cost. Minimum ensures profitability for seller and platform.

**Admin Control:** All minimums adjustable from Admin Panel per industry.

> **Claude Suggestion:** Consider a "delivery fee threshold" approach instead of hard minimums — orders below 500 PKR get a small delivery surcharge (e.g., 50 PKR) rather than being blocked entirely. This keeps all customers happy while covering costs.

---

## §38 — Buyer Flow (Complete Step-by-Step)

### 38.1 — Master Buyer Flow

```
Signup → JPS Profile → Browse → Select → Order → Payment → Track → Receive → Review → Complaint/Return → Refund → STL Update
```

### 38.2 — Step-by-Step Detail

**Step 1 — Signup:** Auto JPS profile created + referral/affiliate link generated.

**Step 2 — Browse:** AI-powered search, category browse, STL-filtered results. Buyer can filter by: price, STL level, seller type, delivery time, location.

**Step 3 — Product Select:** Product page shows: price, seller STL, product STL (MIN rule), seller type (Manufacturer/Retailer/etc.), reviews, delivery estimate.

**Step 4 — Order Place:** Select quantity, delivery address (manual entry allowed), delivery preference (self/rider/3rd party if applicable), apply coupons/EHBGC.

**Step 5 — Payment:** Options: Fiat (JazzCash, Easypaisa, bank, COD) + Crypto (EHBGC). Payment goes to DMO escrow immediately.

**Step 6 — Tracking:** Live tracking: order confirmed → seller preparing → dispatched → rider picked → in transit → delivered. Buyer + Franchise both see status.

**Step 7 — Delivery Receive:** Buyer confirms receipt. 24-hour soft hold starts.

**Step 8 — Review:** Rate product (1-5 stars) + seller (1-5 stars) + delivery (1-5 stars). Written review optional.

**Step 9 — Complaint (Optional):** Within 7-day protection period. File complaint → DMO reviews → resolution.

**Step 10 — Return/Refund (If Needed):** Return request → DMO approval → pickup arranged → refund per §35.2 timeline.

**Step 11 — STL Impact:** Buyer's review affects seller's STL. Buyer also has STL — frequent fake complaints → buyer STL drops → reduced complaint power.

> **Claude Suggestion:** Add a "Buyer Trust Score" — buyers with high STL get priority customer service, faster refunds, and early access to deals. Buyers who abuse complaints/returns get flagged. This creates a two-sided trust ecosystem — not just seller trust, but buyer trust too.

---

## §39 — Franchise Owner Flow (Complete)

### 39.1 — Master Franchise Flow

```
Apply → Purchase → Wallet Lock → Area Assign → Setup → Hire Inspectors → Operations → Earnings → Dashboard Control
```

### 39.2 — Step-by-Step Detail

**Step 1 — Apply:** Submit application via EHB platform → select franchise level (Sub/Master/Corporate/Country).

**Step 2 — Purchase:** Pay franchise fee (Sub $1-10K, Master $20-50K, Corporate $250K+). Payment goes to EHB company.

**Step 3 — Wallet Lock:** Lock required EHBGC amount in trusty wallet. This backs order guarantees in their territory.

**Step 4 — Area Assign:** DMO assigns geographic territory. Exclusivity based on franchise level.

**Step 5 — Setup:** Receive franchise kit (branding, training materials, dashboard access). Configure local settings.

**Step 6 — Hire Inspectors:** Post inspector jobs via JPS → EHB training schedule → trained inspectors deployed. Salary auto-deducted from franchise wallet → paid to inspector via JPS monthly.

**Step 7 — Operations (Daily):**
- Monitor all orders in territory
- Handle seller/buyer complaints
- Track delivery performance
- Manage local sellers onboarding
- CRB inspection coordination (rotated from OTHER franchises for anti-corruption)

**Step 8 — Earnings:** Revenue from 2% service charge split (Sub Franchise gets 30%, Master gets 15%, etc. per §32.2). Additional earnings from franchise referrals.

**Step 9 — Dashboard Control:**
- Live orders view (multi-operator support)
- Delay alerts (2-3 min / 5-10 min thresholds)
- Seller performance rankings
- Rider tracking
- Revenue & earnings reports
- Inspector management
- Complaint resolution panel

> **Claude Suggestion:** Add a "Franchise Health Score" — combining order volume, complaint resolution speed, seller satisfaction, inspector quality, and revenue growth. Low-scoring franchises get DMO intervention. High-scoring franchises get territory expansion offers and bonus percentages.

---

## §40 — STL Level Requirements (Exact Specifications)

### 40.1 — Level-by-Level Requirements

| Level | Requirements | PSS | CRB | Wallet Lock | Activity | Complaints |
|-------|-------------|-----|-----|-------------|----------|------------|
| L1 | Signup only | None | None | None | None | N/A |
| L2 | Basic PSS | Basic (ID+Phone) | None | None | Active account | 0 |
| L3 | Full PSS + Activity | Full (Face+Address) | None | Optional | 30+ days active | 0 |
| L4 | CRB Started | Full | Applied | Minimum lock | 60+ days | ≤1 resolved |
| L5 | CRB Passed + Wallet | Full | Passed | Required (min threshold) | 90+ days | ≤1 resolved |
| L6 | Consistent Performance | Full | Passed | Active | 6+ months | ≤2 resolved |
| L7 | High Activity | Full | Re-verified | Increased | 9+ months, high volume | ≤2 resolved |
| L8 | Strong Reviews + Wallet | Full | Re-verified | High lock | 12+ months, top reviews | ≤1 in last 6 months |
| L9 | Premium Trust (Company Guarantee starts) | Full | Multiple passes | High lock | 18+ months, premium metrics | 0 in last 6 months |
| L10 | Supreme/Legendary | Full | Continuous | Maximum | 24+ months, top 1% | 0 in last 12 months |

### 40.2 — Key STL Rules

- **3 complaints = STL upgrade blocked** (cannot go higher until resolved)
- **5+ complaints = STL drops** (automatic level reduction)
- **Fraud = immediate L1 drop** (regardless of current level)
- **CRB fail = level freeze** (cannot move up until CRB passed)
- **L9+ = Company Guarantee** — EHB is responsible for product quality at this level
- **Free STL (L1-L8) = Company NOT responsible** — buyer assumes risk

### 40.3 — STL Upgrade Blockers

Upgrade will NOT happen even if all criteria met, if:
- Any unresolved complaint exists
- CRB certification expired (re-verification needed)
- Wallet lock below minimum for target level
- Account flagged by AI fraud detection
- Negative review ratio above 15% in last 90 days

> **Claude Suggestion:** Consider adding "STL Decay" — if a seller is inactive for 90+ days, STL slowly drops (e.g., 1 level per 90 days of inactivity). This prevents ghost accounts with high STL from misleading buyers. Also, add "STL Recovery Path" — after a fraud flag is cleared, seller doesn't jump back to old level but climbs back at 2× speed (faster than new seller, but not instant).

---

## §41 — Approved System Enhancements (6/6 Suggestions Approved + Upgraded)

> Source: Claude suggestions from §35-§40, reviewed and approved by Rafi (founder) with upgrades on 2026-04-13.

### 41.1 — EHBGC Band Limit ✅ APPROVED + UPGRADED

**Original:** ±5% monthly limit on coin value fluctuation in Phase 2.

**Upgrade:** Phase 2: ±5% band. Phase 3: AI dynamic band (±3% to ±7%) based on market conditions. Prevents pump & dump, ensures stable economy, builds investor trust.

### 41.2 — Delivery Fee Threshold ✅ APPROVED + UPGRADED

**Original:** Orders below minimum get small surcharge instead of being blocked.

**Upgrade:** Show "Low Order Fee" label in UI so buyer knows why extra charge applies. Better UX than hard blocking small orders.

### 41.3 — Buyer Trust Score (BSTL) ✅ APPROVED — CRITICAL FEATURE

**Renamed to BSTL (Buyer STL).** Full buyer scoring system parallel to seller STL. Impact: Fake complaints decrease, fraud buyers controlled, sellers protected.

**BSTL affects:** Complaint weight (high BSTL = more weight), refund speed, access to premium sellers, return limits. High BSTL gets priority service, faster refunds, early access. Low BSTL = reduced complaint power.

### 41.4 — Franchise Health Score ✅ APPROVED + UPGRADED

**Auto Area Expansion:** Top-scoring franchises get automatic territory expansion offers. Low-scoring franchises get DMO intervention (warning → restriction → territory reduction).

**Score Factors:** Order throughput, complaint resolution speed, seller onboarding rate, inspector quality scores, revenue growth, delivery performance.

### 41.5 — STL Decay ✅ APPROVED + UPGRADED (3-Stage)

- **30 days inactive** → Warning notification sent
- **60 days inactive** → Soft drop begins (1 level down)
- **90 days inactive** → Full decay starts (continues dropping per 30-day cycle)

Prevents ghost accounts with high STL while giving fair warning.

### 41.6 — STL Recovery Path ✅ APPROVED + UPGRADED

**Max Restore Limit:** Recovery at 2× normal speed BUT maximum restore level = previous level minus 1. Example: Was L8 → dropped to L1 for fraud → after clearance recovers at 2× speed → max recovery L7 (not L8) → must earn L8 naturally. Ensures accountability while being fair.

---

## §42 — Inspector Flow (CRB Backbone — Production Ready)

### 42.1 — Master Inspector Flow

```
Apply (JPS) → Screening → Training → Certification → Wallet Lock → Deployment → Daily Inspections → Report → Review (CRB/DMO) → Payment → Performance Score → Rotation
```

### 42.2 — Step 1: Hiring (JPS Integration)

**Apply Form (via JPS):**
- CNIC + selfie (PSS verification)
- City/Area selection
- Skills — category-wise: electronics, food, medical, services, etc.
- Experience (optional but scored)
- Availability: full-time or part-time

**Screening (Auto + Manual):**
- PSS trust score ≥ threshold (e.g., 60/100)
- No major complaints on record
- Basic literacy test (in-app)
- Device check (camera + GPS required for inspection work)

**Output:** Shortlisted / Rejected / Waitlist

### 42.3 — Step 2: Training System

**Duration:** 3–5 days (hybrid model):
- Day 1–2: Online modules (self-paced)
- Day 3: Live session (Zoom or training center)
- Day 4–5: Field simulation (optional but recommended)

**Training Modules:**
1. CRB Rules & Ethics
2. Category-Specific Checks (food safety, electronics quality, service standards)
3. Evidence Capture Standards (photo/video quality requirements)
4. Structured Report Writing
5. Fraud Patterns & Red Flags Recognition
6. Inspection App Usage (hands-on)
7. Anti-Corruption Policy (zero tolerance)

**Assessment:** MCQ + Practical (mock inspection). Pass mark ≥ 70%. Fail = 2 retries allowed with cooldown period between each.

### 42.4 — Step 3: Certification & Activation

- **CRB Certificate** — digital, issued upon passing assessment
- **Inspector ID** — QR-based, scannable by sellers and franchise operators
- **STL Requirement:** Inspector must be ≥ L2 (minimum)
- **Wallet Lock:** Small bond required (1,000–5,000 EHBGC) — inspector active only if bond locked

### 42.5 — Step 4: Deployment (Anti-Corruption Rotation — CRITICAL)

**Rotation Logic:**
- Inspector NEVER inspects same seller twice consecutively
- Cross-franchise assignment (nearest DIFFERENT franchise area)
- Randomized + AI-weighted selection: distance factor, skill/category match, past integrity score

**Assignment Algorithm:**
```
Assignment = Random(eligible inspectors) with constraints:
  - NOT same inspector as last 2 inspections for this seller
  - NOT from same franchise if possible
  - Skill/category match required
  - Distance optimization (nearest eligible)
```

### 42.6 — Step 5: Daily Workflow

**Targets:** 5–15 inspections per day (varies by category and distance).

**Job Flow:**
```
Task Assigned → Accept (within 5 min) → Travel → On-site Check → Capture Evidence → Submit Report → Next Task
```

**SLAs:**
- Accept task: ≤ 5 minutes
- Reach location: ETA tracked via maps
- On-site time: 10–30 minutes (category dependent)
- Report submission: ≤ 10 minutes after visit

### 42.7 — Step 6: Inspection Checklist (Category-Based)

**Common Checks (all categories):**
- Business existence verification (geo-location + signage)
- Owner identity match (PSS verification)
- Product/service availability confirmation
- Pricing consistency check
- Hygiene/safety check (where applicable)

**Mandatory Evidence:**
- GPS tag (auto-captured)
- Photos (minimum 5)
- Short video (10–30 seconds)
- Structured form (tick checkboxes + written notes)

### 42.8 — Step 7: Report Submission System

**In-App Form Features:**
- Auto-populated fields (time, GPS coordinates, inspector ID)
- Checklist tick boxes per category
- Media upload (photos + video)
- Final verdict options: Pass ✅ / Conditional Pass ⚠️ / Fail ❌

**Flow:** `Submit → CRB Queue → Auto checks → Human review (if flagged)`

### 42.9 — Step 8: Review (CRB + DMO)

**Auto Validation Checks:**
- GPS mismatch detection (was inspector actually at location?)
- Media quality check (blurry/unusable evidence?)
- Pattern anomaly detection (suspiciously fast inspections, all-pass streaks)

**Human Review (if auto-flagged):** Senior CRB reviewer manually verifies report.

**Outcomes:**
- **Pass:** Seller gets STL boost
- **Conditional Pass:** Limited STL increase + re-check scheduled within 30 days
- **Fail:** Seller STL freeze/downgrade + must re-apply for CRB verification

### 42.10 — Step 9: Payment Structure (Hybrid Model)

**Per-Inspection Pay:**
- Base rate: 300–800 PKR per inspection (varies by category difficulty)
- Bonus: High-quality report bonus, difficult category premium
- Penalty: Rejected/low-quality report = payment deducted

**Example Calculation:** 10 inspections × 500 PKR average = 5,000 PKR/day (gross)

**Payout Schedule:**
- Daily earnings calculated at end of day
- T+1 wallet credit (next day)
- Weekly withdrawal allowed from wallet

> **Claude Suggestion:** Consider tiered pay: L2 inspector = 300 PKR base, experienced L5+ inspector = 600 PKR base, expert L8+ = 800 PKR. This incentivizes inspectors to maintain high performance and grow their own STL.

### 42.11 — Step 10: Inspector Performance Score (IPS)

**IPS Score (0–100):**

| Factor | Weight |
|--------|--------|
| On-time rate | 20 points |
| Report quality | 30 points |
| Accuracy (verified outcomes) | 20 points |
| Complaint ratio (against inspector) | 20 points |
| Task acceptance rate | 10 points |

**Impact:**
- High IPS (80+) → More tasks assigned + higher pay tier + priority assignments
- Medium IPS (50-79) → Normal task flow
- Low IPS (<50) → Fewer tasks / probation / re-training required

### 42.12 — Step 11: Penalties & Fraud Control

| Issue | Action |
|-------|--------|
| Late arrival | Warning → IPS decrease |
| Poor quality report | Payment cut for that inspection |
| Fake inspection (not at location) | Wallet fine + STL drop |
| Collusion with seller | Permanent ban + wallet freeze |
| Bribery attempt | Immediate suspension + DMO investigation |

**Fraud Detection:** AI monitors for patterns — suspiciously fast inspections, always-pass verdicts, GPS anomalies, repeated same-seller assignments (rotation violation).

### 42.13 — Step 12: Re-Inspection & CRB Refill

- **Scheduled re-inspections:** CRB schedules for all verified sellers (e.g., every 6 months)
- **Random surprise checks:** AI-selected high-risk sellers get unannounced inspections
- **Failed refill inspection:** Seller faces STL downgrade risk

### 42.14 — Step 13: Communication System

- In-app chat/call with franchise operator
- Emergency helpline (DMO direct)
- Task alerts, delay alerts, reassignment notices
- Seller no-show notifications

### 42.15 — Edge Cases

- **No-show seller:** Mark as no-show → auto-reschedule within 48 hours → seller gets warning
- **Unsafe area:** Geo-flag system → assign different inspector with area familiarity OR escort
- **Large facility:** Multi-inspector assignment (2-3 inspectors for warehouses/factories)
- **Inspector unavailable mid-day:** Auto-reassign remaining tasks to nearest available

### 42.16 — Franchise Role (Inspector Management)

Franchise operators can:
- View all live inspections in their territory
- Override or assist in delay situations
- Request re-check for specific sellers
- Quality audit inspectors (review their reports)
- Flag inspector behavior issues to CRB

### 42.17 — Final Inspector Summary

```
JPS Hire → Screen → Train (3-5 days) → Certify → Wallet Bond Lock
→ Smart Anti-Corruption Rotation → Daily 5-15 Inspections → Evidence-based Reports
→ CRB Auto+Human Validate → Per-Inspection Pay (300-800 PKR) → IPS Score
→ High IPS = More Tasks + Higher Pay → Rotate to prevent corruption
```

### 42.18 — Approved Inspector Enhancements (3/3)

1. **Tiered Inspector Pay ✅ APPROVED:** L2 inspector = 300 PKR base, L5+ = 600 PKR, L8+ = 800 PKR. Incentivizes performance growth.
2. **Inspector Specialization Badges ✅ APPROVED:** 95%+ accuracy in a category = "Specialist" badge (e.g., Food Safety Specialist). Priority assignment + 20% pay premium for specialists.
3. **Dual-Inspector for High-Value ✅ APPROVED:** L8+ seller CRB verification requires 2 independent inspectors. Both reports must match. Mismatch = senior review. Extra cost but extreme trust guarantee.

---

## §43 — Complaint & Dispute System (Final — Production Ready)

### 43.1 — Master Complaint Flow

```
Complaint Filed → AI Auto-Review → (Auto-Resolve OR Escalate) → Seller Notified
→ Evidence Collection → Human Review (DMO/CRB) → Decision → Action (Refund/Replace/Reject)
→ Appeal (optional) → Finalize → STL/BSTL Impact
```

### 43.2 — Step 1: Complaint Filing

**Where:** Order page → "File Complaint" button.

**Categories (Industry-aware):**
1. Not Received
2. Wrong Item/Service
3. Damaged/Defective
4. Late Delivery
5. Overcharge
6. Quality/Hygiene Issue
7. Behavior Issue
8. Return Request
9. Fraud/Suspicious Activity

**Evidence (Required for most cases):** Photos (minimum 2), Video (optional but carries high weight), Chat logs (auto-attached from order), Written notes (structured form).

### 43.3 — Step 2: AI Auto-Review (First Line)

**Goals:** Spam filtering, quick resolution for clear-cut cases, priority scoring.

**Auto-Resolve Cases:**
- Late delivery — auto-confirmed from delivery logs, instant partial refund
- Minor mismatch — policy-based partial refund (e.g., wrong color but correct product)
- Duplicate complaints — auto-merge and notify

**Logic:** `AI checks → if confidence ≥ threshold → auto decision, else → escalate to human`

### 43.4 — Step 3: Seller Notification

**Instant alert** sent to seller. **Response window: 12 hours.**

**Seller Options:**
- Accept fault → triggers quick resolution (fast-track refund/replacement)
- Provide counter-evidence (photos, chat logs, shipping proof)
- Request CRB re-inspection (for quality disputes)

### 43.5 — Step 4: Evidence Consolidation

**System auto-collects:**
- Full order logs (timestamps, amounts)
- Delivery timeline (pickup to delivery)
- Rider GPS trail
- Chat history between buyer-seller
- Previous complaints history (buyer BSTL weight applied)
- Seller complaint history and STL record

### 43.6 — Step 5: Human Review (DMO + CRB)

**Triggers for human review:**
- High-value orders (above threshold, e.g., 50,000+ PKR)
- Conflicting evidence (buyer says X, seller says Y)
- Fraud flags detected by AI
- Appeal cases
- Repeat offenders (either side)

**Who reviews:**
- DMO Dispute Resolution Engine — for standard disputes
- CRB — when physical quality/verification is needed (may trigger re-inspection)

### 43.7 — Step 6: Resolution Types

| Type | When Applied |
|------|-------------|
| Full Refund | Not received / major defect / fraud confirmed |
| Partial Refund | Minor issue / partial damage |
| Replacement | Product/service fixable, seller willing |
| Reject Complaint | Invalid / insufficient evidence / fake |
| Warning Only | Minor first-time violation by seller |

### 43.8 — Step 7: Time SLAs (Strict)

| Step | SLA |
|------|-----|
| AI auto-review | Instant to 2 hours |
| Seller response window | ≤ 12 hours |
| Human review | 24–48 hours |
| Final resolution | ≤ 72 hours total |
| Refund processing | ≤ 24 hours after decision |

### 43.9 — Step 8: Appeal Process

**Who can appeal:** Buyer OR Seller (either party).

**Rules:**
- Only 1 appeal allowed per complaint
- Must add NEW evidence not previously submitted
- Appeal goes to Senior Reviewer (different person from original reviewer)

**Flow:** `Appeal Filed → Senior Review → Final Decision (no further appeal allowed)`

### 43.10 — Step 9: BSTL (Buyer Trust) Impact

**Complaint Weight by BSTL:**

| Buyer BSTL | Complaint Weight | Effect |
|------------|-----------------|--------|
| High (L7+) | Strong — trusted complaint | Fast-tracked, higher credibility |
| Medium (L4-L6) | Normal weight | Standard process |
| Low (L1-L3) | Weak — needs more proof | Additional evidence required |

**Fake Complaint Penalties:**
- BSTL drops
- Monetary penalty (wallet deduction)
- Feature restrictions (e.g., COD blocked, complaint limit imposed)
- Repeat fake complainers → account flagged

### 43.11 — Step 10: Seller STL Impact

| Case | Effect |
|------|--------|
| Valid complaint against seller | STL decreases |
| Multiple valid complaints (3+) | STL upgrade blocked |
| Multiple valid complaints (5+) | STL level drops |
| Fraud proven | Severe penalty — possible L1 drop + account freeze |

### 43.12 — Refund Execution (Linked to §35)

**Source Priority:** 1. Escrow (if still held), 2. Seller Wallet, 3. Franchise Backup (edge case).

**Method:** Same as original payment — fiat→bank, crypto→wallet, EHBGC→wallet.

### 43.13 — Fraud Protection

**Detection:** Repeated fake complaints from same buyer, seller-buyer collusion patterns, pattern abuse (always claiming "not received").

**Actions:** Auto-flag → Manual audit → Account freeze if confirmed.

### 43.14 — Dispute Dashboard (Franchise + Admin)

**Shows:** Open complaints with SLA timers, high-risk cases flagged, refund totals, top violators (buyers and sellers), resolution rate metrics, average resolution time.

### 43.15 — Special Rules

- **High STL Fast Track:** L8+ buyer OR seller → resolution SLA reduced to ≤ 24 hours
- **High Value Orders:** Mandatory human review (no auto-resolve)
- **Repeat Offenders:** Auto-escalation to senior review regardless of case type

### 43.16 — Mediation Mode (Advanced)

Optional live mediation via chat or video call. Used for complex disputes where text-based evidence is insufficient. Moderator: DMO dispute agent. Both parties present evidence in real-time.

### 43.17 — Final Complaint Summary

```
File (9 categories + evidence) → AI Check (auto-resolve OR escalate)
→ Seller Reply (12h window) → Evidence Consolidate → Human Review (DMO/CRB)
→ Decision (Refund/Replace/Reject) → Appeal (1 chance, new evidence required)
→ Close → STL drop (seller) + BSTL impact (buyer)
```

> **Claude Suggestion:** Add a "Complaint Score" per complaint — combining evidence quality, response time, resolution type, and appeal outcome. This score feeds into both STL and BSTL calculations with more granularity than just "valid/invalid". Also consider "Seller Auto-Accept" — if seller doesn't respond within 12 hours, complaint auto-accepted as valid (seller at fault by default).

---

## §44 — Affiliate System (Final — Production Ready)

### 44.1 — Master Affiliate Flow

```
User Join (JPS) → Referral Link Auto-Generated → Invite Users → Activity (Orders/Franchise)
→ Bonus Calculate → Wallet Credit → Withdrawal
```

**Core Rule:** Every user is automatically an affiliate from signup. Unique referral link generated. All activity tracked by DMO.

### 44.2 — Phase 1 Bonuses (Active from Launch — 5 Types)

**1. Direct Referral Bonus:**
- 5% of referee's first transaction OR fixed 500 PKR (whichever is higher)
- One-time per referred user

**2. Order Commission Bonus:**
- 1% of every order placed by your direct referrals
- Ongoing — as long as referral is active

**3. Franchise Sale Bonus:**
- Sub Franchise referral = 5% of franchise fee
- Master Franchise referral = 3% of franchise fee
- Corporate Franchise referral = 2% of franchise fee

**4. Level Income (Team Bonus — Multi-Level):**

| Level | Earning % | Description |
|-------|-----------|-------------|
| L1 (Direct) | 2% | Your direct referrals' orders |
| L2 | 1% | Your referrals' referrals |
| L3 | 0.5% | Third level deep |
| L4–L10 | 0.1% each | Levels 4 through 10 |

**5. Activity Bonus:**
- Monthly target complete (e.g., 10 active referrals) → fixed bonus (e.g., 2,000 PKR)

### 44.3 — Phase 2 Bonuses (Expansion — 5 Types)

**6. Matching Bonus:** Percentage match of your downline's earnings (e.g., 10% of direct referral's affiliate earnings).

**7. Leadership Bonus:** Team size + performance milestones. 50+ active team → 1,000 PKR/month. 200+ active team → 5,000 PKR/month.

**8. Rank Achievement Bonus:** One-time bonus when unlocking new rank (Bronze, Silver, Gold, Platinum, Diamond).

**9. Retention Bonus:** Maintaining 80%+ active user rate in your team → monthly bonus.

**10. Industry Activation Bonus:** When a new industry activates on the platform → early adopter referrers in that industry get bonus.

### 44.4 — Phase 3 Bonuses (Advanced — 9 Types)

11. **Global Pool Bonus** — Top performers share in global revenue pool
12. **Profit Sharing** — Top affiliates get quarterly profit share
13. **Car Fund** — Rank-based monthly car allowance
14. **House Fund** — Rank-based housing contribution
15. **Travel Fund** — Annual travel reward for top performers
16. **Education Fund** — Children's education support for high-rank affiliates
17. **Retirement Fund** — Long-term loyalty savings program
18. **VIP Pool** — Exclusive high-earner pool
19. **Special Rewards** — Seasonal/event-based bonuses

### 44.5 — Depth Level System

**Max Depth:** 10 levels of earning.

**Unlock Conditions (based on affiliate's own STL):**
- STL L1–L2 → Earn from 1–2 levels deep only
- STL L3–L5 → Earn from up to 5 levels deep
- STL L6+ → Full 10 levels unlocked

### 44.6 — Payout Rules

**Calculation:** Daily earning calculation (real-time tracking).

**Withdrawal Frequency:** Weekly OR Monthly (user choice).

**Minimum Withdrawal:** 2,000 PKR.

**Methods:** EHB Wallet, Bank transfer, Crypto (EHBGC).

### 44.7 — Anti-Fraud System

**DMO monitors for:** Fake referrals (bot-created accounts), self-referral loops, inactive ghost referrals, bonus manipulation.

**Actions:** Bonus cancelled, wallet frozen, account banned for repeat offenders.

### 44.8 — Affiliate Dashboard (User Side)

**Shows:** Total earnings (lifetime + current period), Team size (total + active), Active user count, Referral link + QR code, Bonus breakdown per type, Withdrawal history, Team tree visualization, Rank progress bar.

### 44.9 — Admin Control

Admin Panel can adjust: All bonus percentages, depth levels, payout rules (minimum, frequency), phase activation/deactivation, rank thresholds.

### 44.10 — STL Impact on Affiliate Earnings

**High STL user:** Higher earning potential (more depth levels unlocked), bonus multiplier (e.g., STL L8+ gets 1.2× on all bonuses).

**Low STL user:** Limited depth (1-2 levels), no multiplier, some bonus types locked.

### 44.11 — Smart Improvements (Approved)

1. **BSTL Filter:** Fake users' earnings auto-blocked based on low BSTL
2. **Active Team Rule:** Inactive referrals (30+ days no activity) → no bonus from their activity
3. **Performance Multiplier:** Top 10% affiliates get 1.5× bonus multiplier
4. **Geo-Based Bonus:** New city expansion → extra 2% on all referrals from that city for first 90 days

### 44.12 — Final Affiliate Summary

```
Auto-Join → Referral Link → Invite → Orders/Franchise Activity
→ 19 Bonus Types (Phase-wise) → Up to 10 Levels Deep
→ Daily Calculation → Weekly/Monthly Payout (min 2,000 PKR)
→ STL-based Multiplier → Anti-Fraud Protected
```

> **Claude Suggestion:** Add "Affiliate Leaderboard" — public ranking of top affiliates per city/country. Creates healthy competition. Also consider "Referral Streak Bonus" — 5 consecutive active referrals in 30 days = 2× bonus on 6th referral. This incentivizes consistent activity rather than one-time bursts.

---

## §45 — Admin Panel (Final — System Control Center)

### 45.1 — Master Admin Flow

```
Login → Role Check → Dashboard → Module Access → Action → DMO Validation → System Update → Audit Log
```

### 45.2 — Role & Permission System

| Role | Access Level | Description |
|------|-------------|-------------|
| Super Admin | Full control | All modules, all settings, all overrides. Only 1-2 persons (founder level) |
| Admin | Limited control | Most modules, cannot change Super Admin settings or core STL formula |
| Operator | Task-based | Assigned specific modules only (e.g., complaint handling, order monitoring) |
| Finance Admin | Finance only | Charges, splits, payouts, escrow, revenue reports |
| Compliance Admin | PSS/CRB/Complaint | Verification oversight, complaint review, inspector management |

**Permission System:** Each role → custom permissions → module-level access control. Permissions are granular: view/edit/delete/approve per module.

### 45.3 — Main Dashboard

**Real-time metrics displayed:**
- Total users (active/inactive)
- Active orders (in-progress)
- Revenue (daily/weekly/monthly with comparison)
- Open complaints (with SLA timers)
- STL distribution chart (how many users at each level)
- Franchise performance ranking
- System alerts (fraud, delays, anomalies)
- Top sellers, top industries, top regions

### 45.4 — User Management

**Features:**
- View all users (searchable, filterable by role/STL/status)
- Ban / Unban user accounts
- Freeze user wallet
- Change user role
- Manual STL override (restricted to Super Admin, requires reason + audit log)
- View user complaint history
- View user transaction history
- BSTL management (buyer trust scores)

### 45.5 — Finance Control

**Admin can adjust:**
- Service charge percentage (currently 2%)
- Distribution split (currently 50/30/15/3/2)
- Rider charge (currently 1%)
- Manufacturer charge (currently 1%)
- Seller charge (currently 2%)
- Escrow hold periods
- Payout approval rules

**Finance Dashboard:**
- Total earnings (real-time)
- Split breakdown per franchise level
- Refund totals
- Pending payouts
- Revenue per industry
- Franchise earnings comparison

### 45.6 — Industry Management

**Controls per industry:**
- Enable / Disable industry (toggle on/off)
- Set minimum order value
- Set industry-specific rules (e.g., COD on/off per industry)
- Feature toggle (delivery types, payment methods)
- Industry-specific STL rules (if different from global)
- Service charge override per industry

### 45.7 — Franchise Management

**Features:**
- Approve / Reject new franchise applications
- Assign geographic territory
- Monitor franchise performance (Health Score)
- View franchise earnings & splits
- Override orders in franchise territory
- Territory expansion/reduction
- Inspector assignment oversight
- Franchise communication channel

### 45.8 — STL Global Control

**Admin can:**
- Modify STL level requirements (§40 table)
- Adjust decay rates (30/60/90 day thresholds)
- Adjust recovery speed multiplier
- Set BSTL rules
- Force STL re-calculation for specific users
- View STL distribution analytics
- Set STL-based feature gates (e.g., what features unlock at L5)

### 45.9 — Complaint System Control

**Admin can:**
- View all complaints (filterable by status/category/SLA)
- Override AI decisions
- Assign human reviewers
- Force refund or reject
- Manage appeals
- Set SLA thresholds
- View complaint analytics (resolution rate, average time, top categories)

### 45.10 — Affiliate System Control

**Admin can:**
- Change all bonus percentages
- Enable/disable specific bonus types
- Adjust depth levels
- Modify payout rules (minimum, frequency)
- Activate/deactivate phases (Phase 1/2/3)
- View affiliate performance analytics
- Flag suspicious affiliate activity

### 45.11 — Notification System Control

**Admin can:**
- Create system-wide announcements
- Send targeted notifications: all users, specific roles, specific STL levels, location-based, industry-based
- Schedule notifications (time-delayed)
- Manage notification templates
- Control notification channels (push, email, SMS, in-app)

### 45.12 — Reports & Analytics

**Available Reports:**
- Sales report (daily/weekly/monthly/yearly)
- User growth (registration, active, churned)
- Complaint ratio (per seller, per industry, per region)
- Delivery performance (average time, success rate, delay rate)
- Affiliate earnings (per user, per tier, per region)
- Franchise statistics (revenue, orders, complaints per franchise)
- STL analytics (level distribution, upgrade/downgrade trends)
- Inspector performance (IPS scores, inspection volume, pass rates)
- Financial summary (revenue, costs, margins, projections)

### 45.13 — Fraud & Security (DMO Control)

**Monitor for:**
- Suspicious activity patterns
- Fake accounts
- Fraudulent transactions
- Abnormal order patterns
- Wallet manipulation attempts

**Actions:**
- Auto-freeze flagged accounts
- Manual investigation workflow
- Permanent ban with evidence documentation
- IP/device blocking

### 45.14 — System Settings

**Global Controls:**
- EHBGC coin value management (band limits per §41.1)
- Language settings (Urdu + English for Phase 1)
- Currency settings (PKR primary, USD secondary)
- API integration management (3rd party delivery, payment gateways)
- Maintenance mode toggle
- Feature flags (enable/disable features globally)

### 45.15 — Audit Trail & Logs

**Every admin action is logged:**
- Who performed the action (admin user ID + name)
- What was changed (module, field, setting)
- When (timestamp)
- Before/after values
- Reason (required for sensitive changes like STL override)
- IP address of admin

**Logs are:** Immutable (cannot be deleted), searchable, exportable, DMO-backed.

### 45.16 — Real-Time Control

All admin changes apply instantly: `Change Setting → DMO Validate → System Update → User Impact Immediate`

No deployment needed — settings are dynamic and database-driven.

### 45.17 — Advanced Admin Features

1. **Simulation Mode:** Test new rules/charges without affecting production. "What if service charge was 3%?" — see projected impact before applying.
2. **AI Admin Assistant:** Suggests improvements based on data patterns. Detects anomalies and alerts admins. "Complaint rate in Food industry up 15% this week" type insights.
3. **Emergency Kill Switch:** Instantly disable: all orders, all payments, specific industry, specific franchise, specific feature. For crisis management (server issues, fraud waves, legal compliance).
4. **Smart Alerts:** Auto-alert admin on: high complaint spikes, delivery delay increases, fraud pattern detection, revenue drop, system health issues.

### 45.18 — Final Admin Summary

```
Admin Login → Role-Based Dashboard → Manage: Users, Finance, Industries, Franchises,
STL, Complaints, Affiliates, Notifications → All Changes Logged
→ Real-Time Application → AI-Assisted Monitoring → Emergency Controls Available
```

> **Claude Suggestion:** Add "Admin Activity Score" — track how responsive each admin/operator is. If complaints pile up because an operator isn't reviewing them, the system auto-alerts Super Admin. Also consider "Scheduled Rule Changes" — ability to schedule a charge or rule change for future date (e.g., "change service charge to 2.5% starting July 1st") rather than only instant changes. This helps plan business transitions.

### 45.19 — Approved Admin Enhancements (2/2)

1. **Admin Activity Score ✅ APPROVED:** Score = Response Time + Resolution Rate + Accuracy. Low score → auto Super Admin alert. Ensures operator accountability.
2. **Scheduled Rule Changes ✅ APPROVED:** Rule Versioning System — `Current Rule → Future Rule → Auto Activate (timestamp-based)`. Example: "2% → 2.5% from July 1", "COD disable next week".

---

## §46 — Notification System (Final — Production Ready)

### 46.1 — Master Notification Flow

```
Event Occurs → DMO Trigger → Rule Check → Channel Select → Send → Log
```

### 46.2 — Buyer Notifications

| Event | Channel | Priority |
|-------|---------|----------|
| Order Confirmed | Push + In-app | Normal |
| Order Shipped/Dispatched | Push | Normal |
| Out for Delivery | Push + SMS | High |
| Delivered | Push | Normal |
| Complaint Update | Push + Email | High |
| Refund Processed | Push + Email | High |
| STL/BSTL Change | In-app | Low |
| Promotion/Deal | Push (opt-in) | Low |

### 46.3 — Seller Notifications

| Event | Channel | Priority |
|-------|---------|----------|
| New Order Received | Push + Sound Alert | Critical |
| Complaint Filed Against | Push + Email | High |
| STL Level Change | In-app | Normal |
| CRB Verification Due | Push + Email | High |
| Payment Released | In-app | Normal |
| Low Inventory Alert | Push | Normal |
| Wallet Lock Warning | Push + Email | High |

### 46.4 — Franchise Notifications

| Event | Channel | Priority |
|-------|---------|----------|
| Order Delay Alert (2-3 min) | Push + Sound | Critical |
| Seller No Response (5-10 min) | Push + Sound | Critical |
| New Seller Registration | In-app | Normal |
| Complaint Escalation | Push | High |
| Inspector Report Submitted | In-app | Normal |
| Revenue/Earnings Update | In-app | Low |
| Territory Performance Alert | Push + Email | Normal |

### 46.5 — Inspector Notifications

| Event | Channel | Priority |
|-------|---------|----------|
| New Inspection Task | Push | Critical |
| Schedule Change | Push | High |
| Payment Credit | In-app | Normal |
| Performance Score Update | In-app | Low |
| Re-training Required | Push + Email | High |

### 46.6 — Channel Rules

| Channel | Use Case | Cost |
|---------|----------|------|
| Push Notification | Real-time alerts, all events | Free |
| SMS | Critical only (delivery OTP, security) | Paid per SMS |
| Email | Reports, complaints, detailed updates | Low cost |
| In-app | All activity logs, non-urgent | Free |

### 46.7 — Smart Notification Rules

- **High STL users** → priority notifications (faster delivery)
- **Silent hours** (11 PM – 7 AM) → delay non-critical, allow critical only
- **Duplicate block** → same notification not sent twice within 5 minutes
- **Frequency cap** → max 10 non-critical notifications per user per day
- **Channel preference** → users can customize which channels they receive

---

## §47 — COD (Cash on Delivery) System (Final — Strict & Safe)

### 47.1 — COD Decision: ALLOWED (But Controlled)

COD is enabled but with strict controls to prevent fraud.

### 47.2 — COD Eligibility Rules

**COD BLOCKED when:**
- Buyer has ≥ 2 unresolved complaints
- Buyer BSTL is low (below L3)
- Order value exceeds threshold (e.g., 20,000 PKR)
- First-time buyer with no PSS verification
- Seller has disabled COD for their products

**COD ALLOWED when:**
- Buyer is PSS verified
- Buyer BSTL is good (L3+)
- Seller allows COD
- Order value within limit
- Delivery area supports COD

### 47.3 — COD Transaction Flow

```
Order Place (COD selected) → Company Creates Virtual Escrow Entry → Delivery
→ Cash Collected by Rider → Rider Deposits within 24h → Wallet Update
→ Normal Escrow Flow (24h soft + 7 day protection) → Seller Payment
```

### 47.4 — Cash Handling Rules

- Rider collects exact amount from buyer at delivery
- Rider must deposit cash within **24 hours** via designated deposit method (franchise office, bank transfer, mobile wallet)
- System tracks all COD collections vs deposits per rider
- Mismatch triggers automatic alert

### 47.5 — COD Fraud Protection

| Case | Action |
|------|--------|
| Buyer refuses to accept/pay | BSTL drop + COD blocked for buyer |
| Rider doesn't deposit cash | Wallet fine + STL drop + possible block |
| Seller sends wrong item (COD abuse) | Seller STL drop + refund from seller wallet |
| Repeated COD refusals by buyer | Permanent COD ban for that buyer |

### 47.6 — COD Limits

- **Per order max:** 20,000 PKR (admin adjustable)
- **Per user daily max:** 50,000 PKR
- **COD availability:** Admin can toggle per industry, per city, per franchise

### 47.7 — Future COD Improvements

- COD insurance (rider-level protection)
- Smart COD scoring (AI predicts COD success probability)
- COD premium charge (small fee for COD orders to cover risk)

---

## §48 — Rider Flow (Complete — Production Ready)

### 48.1 — Master Rider Flow

```
Signup → JPS Profile → PSS Verify → Wallet Setup → STL ≥ L2 → Zone Assign
→ Accept Orders → Pickup → Deliver → Cash/Payment Handle → Rating → Growth
```

### 48.2 — Step 1: Signup & Verification

- Signup via app → JPS profile auto-created
- PSS verification: CNIC + selfie + device check (GPS + camera required)
- Vehicle verification: license, vehicle registration, insurance (if applicable)
- Background check via PSS

### 48.3 — Step 2: Wallet & STL

- Wallet setup required with minimum balance lock
- **Wallet Limit Rule:** Max order value ≤ rider wallet balance
- STL ≥ L2 required to activate as rider
- Higher STL = higher value orders allowed

### 48.4 — Step 3: Zone Assignment

- **City → Area → Route** assignment
- Based on: rider's home location, rider preference, demand density
- Zones can overlap (multiple riders per zone)
- Dynamic reassignment during peak hours

### 48.5 — Step 4: Order Handling

- **Accept:** Task appears → rider has 60 seconds to accept → auto-reassign if no response
- **Pickup:** Navigate to seller → confirm pickup (photo + code) → update status
- **Deliver:** Navigate to buyer → deliver → collect payment (if COD) → confirm delivery (photo/OTP)
- **Return:** If buyer refuses → return to seller → report filed

### 48.6 — Step 5: Earnings Model

| Type | Amount | Details |
|------|--------|---------|
| Base per delivery | 100–300 PKR | Varies by distance/city |
| Distance bonus | + per km | Beyond base radius |
| Peak hour bonus | +50% | Lunch (12-2 PM), Dinner (7-10 PM) |
| High STL bonus | +20% | Rider STL L5+ |
| COD handling fee | +50 PKR | Per COD order |
| Batch bonus | +100 PKR | 10+ deliveries in a day |

### 48.7 — Step 6: Rider Performance Score (RPS)

| Factor | Weight |
|--------|--------|
| Delivery speed (vs estimated) | 25 points |
| Customer rating | 25 points |
| Acceptance rate | 20 points |
| COD deposit compliance | 15 points |
| Complaint ratio | 15 points |

**Impact:** High RPS (80+) = more orders + peak hour priority. Low RPS (<50) = fewer orders / probation.

### 48.8 — Penalties

| Issue | Action |
|-------|--------|
| Late delivery | Warning → RPS drop |
| Order refused/damaged | Fine from wallet |
| COD cash not deposited | Wallet freeze + STL drop |
| Fraud (fake delivery) | Permanent ban + wallet freeze |
| Rude behavior | Warning → STL drop |

### 48.9 — Rider Growth Path

- L2 rider → small orders, local zone
- L5 rider → medium orders, expanded zone, peak hour eligible
- L8+ rider → high-value orders, premium zones, insurance coverage, team lead opportunities

### 48.10 — Rider Dashboard

**Shows:** Today's earnings, pending orders, completed deliveries, RPS score, zone map, COD balance (to deposit), withdrawal option, performance history.

---

## §49 — AI Department System (Full Detail)

### 49.1 — AI Modules Overview

5 core AI modules powering the EHB platform:

1. **AI Helpline (Chatbot)**
2. **AI Fraud Detection**
3. **AI Recommendation Engine**
4. **AI Delivery Optimization**
5. **AI Risk Scoring**

### 49.2 — Module 1: AI Helpline (Chatbot)

**Flow:** `User Question → AI Process → Answer → If confidence < threshold → Escalate to Human Agent`

**Features:**
- Bilingual: Urdu + English (auto language detection)
- Context-aware (knows user's order history, STL, complaints)
- Available 24/7
- Handles: order tracking, complaint filing, FAQ, product info, account help

**Escalation Rules:**
- AI confidence < 70% → offer human agent
- Sensitive topics (fraud, legal) → immediate human escalation
- User requests human → instant transfer
- 3 failed AI attempts → auto-escalate

**Human Agent Tiers:**
- Tier 1: General support (operators)
- Tier 2: Specialized (complaint/finance)
- Tier 3: Senior (fraud/legal/escalation)

### 49.3 — Module 2: AI Fraud Detection

**Triggers (real-time monitoring):**
- Fake orders: same buyer-seller, circular transactions
- Fake complaints: pattern of always claiming "not received"
- Referral abuse: bot-created accounts, self-referral loops
- Wallet manipulation: unusual deposit/withdrawal patterns
- Fake reviews: bulk positive reviews from related accounts
- Inspector collusion: always-pass patterns for specific sellers

**Actions:**
- Low risk → flag + monitor
- Medium risk → restrict features + notify admin
- High risk → auto-freeze account + DMO investigation
- Critical → immediate ban + wallet freeze + law enforcement alert (if fraud amount > threshold)

### 49.4 — Module 3: AI Recommendation Engine

**Factors used for product/service recommendations:**
- User browsing history and purchase history
- User location (nearby sellers/services)
- User STL level (show appropriate level products)
- Trending products in user's area
- Seasonal trends
- Similar user behavior (collaborative filtering)
- Seller STL and reviews
- Price range preference

**Applied in:** Home page, search results, "You may also like", post-purchase, notifications.

### 49.5 — Module 4: AI Delivery Optimization

**Functions:**
- **Best Route:** Calculate optimal delivery route for riders (multi-drop optimization)
- **Best Rider:** Match order to most suitable rider (distance + STL + capacity + speed history)
- **Delay Prediction:** Predict likely delays before they happen (seller prep time patterns, traffic data)
- **Demand Forecasting:** Predict peak hours/areas → pre-position riders
- **Auto-Reassign:** Predict rider failure → pre-select backup rider

### 49.6 — Module 5: AI Risk Scoring

**Every order gets a risk score (0-100):**

| Factor | Weight |
|--------|--------|
| Buyer BSTL | 20 |
| Seller STL | 20 |
| Order value | 15 |
| Payment method (COD = higher risk) | 15 |
| Delivery distance | 10 |
| Historical fraud patterns | 20 |

**Risk Actions:**
- Low risk (0-30) → auto-approve, standard flow
- Medium risk (31-60) → extra verification step
- High risk (61-80) → manual review required
- Critical risk (81-100) → auto-block + admin alert

### 49.7 — AI System Technical Notes

- **Phase 1:** Rule-based AI (if-then logic, thresholds) — works without ML training data
- **Phase 2:** Machine Learning models trained on platform data (after 6+ months of data collection)
- **Phase 3:** Deep Learning + NLP for chatbot, image recognition for inspection, predictive analytics

> **Claude Suggestion:** For Phase 1, start with rule-based systems — they don't need training data and can launch Day 1. As the platform collects data, train ML models to gradually replace rules. This avoids the "cold start" problem. Also consider "AI Transparency Report" — monthly report showing AI decisions: how many orders flagged, how many auto-resolved, accuracy rate. This builds trust with users who want to know AI is fair.

---

## §50 — Multi-Language & Multi-Currency System

### 50.1 — Phase 1 (Launch)

- **Languages:** Urdu + English (confirmed)
- **Currency:** PKR only
- **UI:** RTL support for Urdu, LTR for English, user can toggle
- **Content:** All system text bilingual, AI chatbot bilingual

### 50.2 — Phase 2 (Expansion)

- **Languages:** Arabic, Hindi, Turkish, French, Spanish (based on expansion countries)
- **Currencies:** USD, AED, SAR, GBP, EUR (based on franchise countries)
- **Translation:** AI-assisted translation + manual review for legal/critical text
- **Currency conversion:** Real-time exchange rate integration

---

## §51 — Marketing & Launch Strategy

### 51.1 — Phase 1 (Pre-Launch & Launch — Islamabad/Rawalpindi)

- **Local Ads:** Targeted social media ads (Facebook, Instagram) in Islamabad/Rawalpindi
- **WhatsApp Marketing:** Direct outreach to potential sellers, franchise buyers, early adopters
- **Influencer Partnerships:** Local tech/business influencers
- **First 100 Sellers:** Personal outreach to existing contacts, market visits, incentive program (reduced charges for first 3 months)
- **First 10 Franchises:** Direct approach to existing business contacts, franchise presentation events
- **Launch Event:** Local tech event or online webinar showcasing the platform

### 51.2 — Phase 2 (Growth)

- **Social Media:** Full-scale campaigns across all platforms
- **SEO:** Website optimization, content marketing, blog
- **Referral Campaigns:** Affiliate system activated, referral bonuses boosted
- **PR:** Tech media coverage, startup community engagement
- **Partnerships:** Collaboration with local businesses, chambers of commerce

### 51.3 — Phase 3 (Scale)

- **National Campaign:** TV, radio, billboards in major cities
- **International:** Country-specific marketing per franchise territory
- **Brand Building:** EHB as trusted global marketplace brand

---

## §52 — Legal Documents System

### 52.1 — Required Legal Documents

1. **Terms of Service (ToS):** Platform usage rules, liability limits, dispute resolution clause, account termination rules
2. **Privacy Policy:** Data collection, storage (AWS encrypted), sharing rules, Pakistan data laws compliance, future GDPR readiness
3. **Seller Agreement:** Seller obligations, commission acknowledgment, STL compliance, product quality guarantee, account termination clauses
4. **Franchise Agreement:** Territory rights, fee structure, duration (contract period), renewal terms, performance obligations, termination clauses
5. **Buyer Agreement:** Purchase terms, return/refund policy acknowledgment, complaint process, COD terms
6. **Inspector Agreement:** Confidentiality, anti-corruption clause, performance requirements, payment terms
7. **Rider Agreement:** Delivery obligations, COD handling responsibilities, vehicle/insurance requirements, payment terms
8. **Affiliate Agreement:** Bonus terms, anti-fraud clause, payout conditions

### 52.2 — Legal Compliance Notes

- SECP registered (confirmed)
- Pakistan's electronic commerce laws applicable
- Data hosted on AWS with encryption
- Future: blockchain-based data sovereignty when DMO migrates to Polkadot

---

## §53 — Company Internal Structure & Hierarchy

### 53.1 — Core Leadership

| Role | Responsibility |
|------|---------------|
| CEO (Founder — Rafi) | Vision, strategy, overall direction |
| CTO | Technology architecture, development oversight |
| COO | Daily operations, franchise management |
| Finance Head | Revenue, charges, payouts, accounting |
| AI Head | AI modules development, ML models, chatbot |
| Operations Head | Delivery, logistics, rider management |

### 53.2 — Department Heads (13 Departments)

Each of the 13 EHB Departments needs a lead:
- STL — EHB Department Lead
- PSS — EHB Department Lead
- CRB — EHB Department Lead
- DMO — EHB Department Lead
- Wallet — EHB Department Lead
- Blockchain — EHB Department Lead
- GoSellr — powered by EHB Lead
- Franchise — EHB Department Lead
- Finance — EHB Department Lead
- Affiliate — EHB Department Lead
- JPS — EHB Department Lead
- AI — EHB Department Lead
- Industries — EHB Department Lead

### 53.3 — Phase 1 Realistic Team (5-10 devs)

Given the 5-10 dev team decision:
- 2 Full-stack developers (Next.js + Node.js)
- 1 Backend specialist (MongoDB, APIs)
- 1 AI/ML developer
- 1 UI/UX designer
- 1 Mobile developer (React Native)
- 1 DevOps (AWS, deployment)
- 1-2 QA/Operations
- CEO handles strategy + business + franchise sales

### 53.4 — Confirmation Questions (From User)

**Pending confirmations needed:**
1. COD Limit: 20,000 PKR per order — confirmed or change?
2. Rider Base Rate: 150 PKR per delivery — confirmed or change?
3. Language Phase 1: Urdu + English — confirmed?
4. EHBGC Value: 1 EHBGC = 1 USD start — confirmed?

---

## §54 — PSS Deep System (27 Verification & Security Features)

> Added: 2026-04-13 | Source: User provided directly | Version: v3.2
> PSS = Personal Security System — EHB Department
> This section replaces the shallow PSS overview with production-ready depth.

### 54.1 — PSS Master Architecture

PSS is the **security backbone** of the entire EHB platform. Every user (buyer, seller, rider, inspector, franchise owner) must pass through PSS verification gates before accessing platform features. PSS directly feeds the STL scoring formula (+40 points max).

**Master Flow:** User Signup → Basic PSS (ID + Liveness) → Enhanced PSS (AML + Address) → Ongoing Monitoring → Periodic Re-verification → STL Score Update

**27 Features organized in 5 categories:**
- **Identity Verification (Features 1-6):** Who is this person?
- **Financial Monitoring (Features 7-8):** What are they doing with money?
- **Business Verification (Feature 9):** Is the business real?
- **Behavioral & Device Intelligence (Features 10-11, 17-21):** Are they trustworthy?
- **Compliance & Screening (Features 12-16, 22-27):** Are they legally safe?

---

### 54.2 — Feature 1: ID Verification

| Item | Detail |
|------|--------|
| What | Passport, national ID card (CNIC), driving license scan & verification |
| How | OCR + database cross-check (NADRA for Pakistan, international APIs) |
| Use in EHB | Required for ALL users at signup (STL L1 minimum). Sellers need enhanced ID for L3+. |
| STL Impact | +10 points (part of PSS 40-point allocation) |
| Phase | Phase 1 (Day 1) |

---

### 54.3 — Feature 2: Liveness Detection

| Item | Detail |
|------|--------|
| What | Anti-spoofing check — blink, smile, head turn to prove real human |
| How | AI-powered facial analysis, detects printed photos/video playback/masks |
| Use in EHB | Required with ID verification. Prevents fake accounts. |
| STL Impact | Part of ID verification score |
| Phase | Phase 1 (Day 1) |

---

### 54.4 — Feature 3: AML Screening

| Item | Detail |
|------|--------|
| What | Anti-Money Laundering — checks against sanctions lists, terrorist lists, PEP (Politically Exposed Persons) |
| How | API integration with global AML databases (OFAC, UN, EU lists) |
| Use in EHB | Required for sellers (L3+), franchise owners, high-value buyers (50K+ PKR orders). Auto-blocks sanctioned individuals. |
| STL Impact | +5 points for clear AML |
| Phase | Phase 1 (Day 1) |

---

### 54.5 — Feature 4: Address Verification

| Item | Detail |
|------|--------|
| What | Verify physical address via utility bill, bank statement, or government document |
| How | Document upload + OCR extraction + optional CRB physical verification |
| Use in EHB | Required for sellers (business address), franchise owners, riders. Optional for buyers but boosts BSTL. |
| STL Impact | +5 points |
| Phase | Phase 1 |

---

### 54.6 — Feature 5: Ongoing ID Monitoring

| Item | Detail |
|------|--------|
| What | Post-onboarding continuous monitoring of identity documents for changes/expiry/fraud |
| How | Periodic background checks, database re-queries, expiry alerts |
| Use in EHB | All verified users monitored. If ID expires or gets flagged, STL frozen until re-verified. Feeds periodic verification (Feature 26). |
| STL Impact | Maintains existing PSS score; failure = freeze |
| Phase | Phase 2 |

---

### 54.7 — Feature 6: Questionnaires

| Item | Detail |
|------|--------|
| What | Custom onboarding questions tailored to user role (seller, franchise, rider, etc.) |
| How | Dynamic forms generated by PSS based on user type and industry |
| Use in EHB | Seller questionnaire: business type, volume, supply chain. Franchise: territory knowledge, investment capacity. Rider: area familiarity, vehicle type. |
| STL Impact | +2 points (completeness bonus) |
| Phase | Phase 1 |

---

### 54.8 — Feature 7: Transaction Monitoring

| Item | Detail |
|------|--------|
| What | Real-time monitoring of suspicious money movement patterns |
| How | AI rule engine + anomaly detection: unusual amounts, frequency, destinations |
| Use in EHB | Monitors all wallet transactions, escrow releases, affiliate payouts. Flags: sudden large withdrawals, circular transfers, rapid order-cancel patterns. Feeds AI Fraud Detection (§49). |
| STL Impact | Violation = immediate STL freeze + investigation |
| Phase | Phase 1 (rule-based) → Phase 2 (ML) |

---

### 54.9 — Feature 8: Crypto Monitoring — Active

| Item | Detail |
|------|--------|
| What | Blockchain wallet and transaction risk assessment |
| How | On-chain analysis, wallet risk scoring, mixer/tumbler detection |
| Use in EHB | Phase 2+ when EHBGC goes semi-floating and Polkadot integration activates. Monitors EHBGC transactions for laundering, wash trading, sanctions evasion. |
| STL Impact | High-risk wallet = transaction block + review |
| Phase | Phase 2-3 (with blockchain rollout) |

---

### 54.10 — Feature 9: Business Verification (KYB)

| Item | Detail |
|------|--------|
| What | Know Your Business — company registration, director verification, business legitimacy |
| How | SECP database check (Pakistan), international business registries, director ID cross-match |
| Use in EHB | Required for: Corporate/Master franchise owners, Manufacturer/Wholesaler sellers (GoSellr L4-L5 types), any entity doing 500K+ PKR monthly. |
| STL Impact | +8 points (business entities get higher PSS allocation) |
| Phase | Phase 1 |

---

### 54.11 — Feature 10: Behavior Monitoring

| Item | Detail |
|------|--------|
| What | Detect bots, account takeover attempts, behavioral anomalies |
| How | Mouse/touch pattern analysis, session timing, action sequence analysis, impossible travel detection |
| Use in EHB | Protects against: bot-generated fake orders, account hijacking, automated affiliate fraud, inspector app manipulation. Integrated with AI Fraud Detection. |
| STL Impact | Bot detection = immediate freeze; anomaly = warning + enhanced monitoring |
| Phase | Phase 1 (basic rules) → Phase 2 (ML behavioral models) |

---

### 54.12 — Feature 11: Face Authentication 2FA

| Item | Detail |
|------|--------|
| What | Face scan as second factor for sensitive operations (not just login) |
| How | Facial recognition matching against stored liveness template |
| Use in EHB | Triggered for: wallet withdrawals >10K PKR, escrow release, STL level changes, franchise territory changes, admin actions. Replaces OTP for high-security operations. |
| STL Impact | Enables higher STL operations; failure = operation blocked |
| Phase | Phase 1 (critical operations) |

---

### 54.13 — Feature 12: Travel Rule Compliance

| Item | Detail |
|------|--------|
| What | Crypto regulation — sharing sender/receiver info for virtual asset transfers |
| How | FATF Travel Rule protocol implementation for EHBGC transfers |
| Use in EHB | Phase 2+ when EHBGC enables cross-border transfers. Required for regulatory compliance in crypto-friendly jurisdictions. |
| STL Impact | Compliance enables international features |
| Phase | Phase 3 |

---

### 54.14 — Feature 13: Non-Document Verification

| Item | Detail |
|------|--------|
| What | Verify identity through national databases, credit bureaus, telco records without requiring document upload |
| How | API queries to NADRA, credit bureaus (Pakistan), Aadhaar (India expansion), etc. |
| Use in EHB | Alternative verification path for users without easy document access. Speeds up onboarding for buyers. Cross-validates document-based verification for sellers. |
| STL Impact | +3 points (supplementary verification) |
| Phase | Phase 1 (Pakistan NADRA) → Phase 2 (international) |

---

### 54.15 — Feature 14: Reusable KYC

| Item | Detail |
|------|--------|
| What | Once verified on EHB, identity data reusable across all 50+ industries without re-verification |
| How | Centralized PSS identity vault, cross-platform token, user consent management |
| Use in EHB | User verifies once → can access GoSellr, OLS, WMS, AGTS, all industries. Major UX advantage. User controls data sharing per industry. |
| STL Impact | PSS score carries across all industries |
| Phase | Phase 1 (core feature — single verification) |

---

### 54.16 — Feature 15: Age Estimation

| Item | Detail |
|------|--------|
| What | AI-based face analysis to estimate user age |
| How | Facial age estimation model, cross-validated with ID document DOB |
| Use in EHB | Age-restricted industries (if applicable), additional fraud detection layer (ID says 25 but face says 50 = flag), child safety protection. |
| STL Impact | Mismatch = enhanced verification required |
| Phase | Phase 2 |

---

### 54.17 — Feature 16: Video Identification

| Item | Detail |
|------|--------|
| What | Live video call verification for highest-trust requirements |
| How | Video call with trained PSS agent or AI-assisted video analysis |
| Use in EHB | Required for: L8+ STL upgrade, Country/Corporate franchise, inspector certification, high-value dispute resolution. CRB inspectors may use for remote verification. |
| STL Impact | +5 points (premium verification) |
| Phase | Phase 2 |

---

### 54.18 — Feature 17: Applicant Scoring

| Item | Detail |
|------|--------|
| What | Composite risk score generated from ALL PSS data points combined |
| How | AI model aggregates: ID score, liveness score, AML status, behavior score, device score, email/phone risk → single 0-100 PSS Applicant Score |
| Use in EHB | This IS the PSS contribution to STL. Score 0-40 maps directly to PSS's 40-point STL allocation. Low score = restricted features, high score = full platform access. |
| STL Impact | Direct 0-40 point mapping to STL formula |
| Phase | Phase 1 (rule-based) → Phase 2 (ML scoring) |

---

### 54.19 — Feature 18: Device Intelligence

| Item | Detail |
|------|--------|
| What | Track device fingerprint, detect multi-account, emulator, rooted devices |
| How | Device fingerprinting SDK, hardware ID tracking, emulator detection algorithms |
| Use in EHB | Prevents: multiple fake accounts from same device, affiliate self-referral farming, bot operations, inspector using emulator to fake GPS. One device = max 2 accounts (buyer + seller role). |
| STL Impact | Multi-account detection = all accounts frozen |
| Phase | Phase 1 |

---

### 54.20 — Feature 19: Email Risk Scoring

| Item | Detail |
|------|--------|
| What | Assess risk of email address — disposable, temporary, fake, or legitimate |
| How | Email domain analysis, age check, pattern detection (temp-mail, guerrilla mail, etc.) |
| Use in EHB | Signup gate: disposable email = blocked. New domain email = enhanced verification. Corporate email = trust bonus for business accounts. |
| STL Impact | +1 point for verified legitimate email |
| Phase | Phase 1 |

---

### 54.21 — Feature 20: Phone Risk Scoring

| Item | Detail |
|------|--------|
| What | Detect burner phones, VoIP numbers, SIM swap risk |
| How | Telco API integration, number age, carrier type analysis, SIM swap detection |
| Use in EHB | Signup gate: VoIP/burner = blocked or enhanced verification. SIM swap detected = account freeze + re-verify. Pakistan numbers verified via PTA database. |
| STL Impact | +1 point for verified legitimate phone |
| Phase | Phase 1 |

---

### 54.22 — Feature 21: IP Scoring

| Item | Detail |
|------|--------|
| What | Detect VPN, proxy, Tor, datacenter IPs, geo-mismatch |
| How | IP intelligence API, geo-location, ISP analysis, known proxy/VPN database |
| Use in EHB | Login from VPN = warning (not block, since some users legitimately use VPN). Tor = blocked for financial operations. Geo-mismatch (ID says Lahore, IP says Nigeria) = enhanced verification. |
| STL Impact | Suspicious IP = enhanced monitoring |
| Phase | Phase 1 |

---

### 54.23 — Feature 22: Counterparty Screening

| Item | Detail |
|------|--------|
| What | Screen recipients of wallet transfers/payments against sanctions and risk lists |
| How | Real-time screening API on every outbound transfer |
| Use in EHB | Before any wallet-to-wallet transfer, EHBGC withdrawal, or external payment — recipient screened. Blocks transfers to sanctioned entities. |
| STL Impact | Attempting sanctioned transfer = immediate freeze |
| Phase | Phase 1 |

---

### 54.24 — Feature 23: Institution Screening

| Item | Detail |
|------|--------|
| What | Verify banks and financial institutions involved in EHB transactions |
| How | Bank sanctions database, correspondent banking risk assessment |
| Use in EHB | When sellers/franchise owners add bank accounts for payout — bank screened. Ensures EHB doesn't route money through sanctioned institutions. |
| STL Impact | N/A (operational compliance) |
| Phase | Phase 1 |

---

### 54.25 — Feature 24: Payment Details Screening

| Item | Detail |
|------|--------|
| What | Scan payment descriptions, notes, and metadata for suspicious content |
| How | NLP analysis of payment notes, pattern matching for coded language |
| Use in EHB | Wallet transfer notes scanned for: sanctions evasion codes, illegal activity references, threatening content. Flagged transfers held for review. |
| STL Impact | Flagged payment = hold + review |
| Phase | Phase 2 |

---

### 54.26 — Feature 25: Suspicious Payment Details

| Item | Detail |
|------|--------|
| What | Detect red flags in payment metadata — round amounts, structured transactions, rapid-fire transfers |
| How | Rule engine + ML pattern detection on transaction metadata |
| Use in EHB | Catches: structuring (multiple transfers just below threshold), smurfing, round-trip payments, wash transactions. Integrates with Transaction Monitoring (Feature 7). |
| STL Impact | Pattern detection = enhanced monitoring or freeze |
| Phase | Phase 1 (rules) → Phase 2 (ML) |

---

### 54.27 — Feature 26: Periodic Verifications

| Item | Detail |
|------|--------|
| What | Scheduled re-verification of user identity at defined intervals |
| How | Calendar-based triggers, risk-based frequency adjustment |
| Use in EHB | Schedule: L1-L3 = annual, L4-L6 = semi-annual, L7+ = quarterly. High-risk users = monthly. Franchise owners = quarterly mandatory. Expired verification = STL decay starts (30-day warning per §41). |
| STL Impact | Skipped re-verification = STL decay activation |
| Phase | Phase 1 |

---

### 54.28 — Feature 27: Regulatory Reports

| Item | Detail |
|------|--------|
| What | Suspicious Activity Reports (SAR) filing to financial regulators (FMU Pakistan, international) |
| How | Auto-generated SAR from flagged transactions, manual filing by compliance team |
| Use in EHB | When Transaction Monitoring or AML Screening flags a user → SAR auto-drafted → Compliance Admin reviews → Files with FMU (Financial Monitoring Unit, State Bank of Pakistan). Required for legal compliance. |
| STL Impact | SAR filed = account under review, potential freeze |
| Phase | Phase 1 (manual) → Phase 2 (auto-draft) |

---

### 54.29 — PSS Feature-to-STL Mapping Summary

| Category | Features | Max STL Points |
|----------|----------|---------------|
| Identity Core | ID(1) + Liveness(2) + Address(4) | 15 pts |
| Financial Compliance | AML(3) + Transaction(7) + Counterparty(22) | 8 pts |
| Business | KYB(9) + Questionnaire(6) | 10 pts |
| Digital Trust | Email(19) + Phone(20) + Device(18) + IP(21) | 4 pts |
| Premium Verification | Video(16) + Non-Doc(13) | 3 pts |
| **TOTAL PSS** | **27 features** | **40 pts max** |

### 54.30 — PSS Tiered Requirements by User Role

| User Role | Minimum PSS | Required Features | Optional (Bonus) |
|-----------|-------------|-------------------|-----------------|
| Buyer | Basic | ID(1), Liveness(2), Phone(20), Email(19) | Address(4), AML(3) for BSTL boost |
| Seller | Enhanced | ID(1), Liveness(2), AML(3), Address(4), KYB(9 if business), Device(18) | Video(16) for L8+ |
| Rider | Enhanced | ID(1), Liveness(2), Address(4), Phone(20), Device(18), Face 2FA(11) | — |
| Inspector | Full | ID(1), Liveness(2), AML(3), Address(4), Video(16), Device(18), Face 2FA(11) | — |
| Franchise Owner | Full + KYB | ALL identity features + KYB(9) + AML(3) + Video(16) | Crypto(8) for Phase 2 |
| Admin | Full + Face 2FA | ID(1), Liveness(2), Face 2FA(11), Device(18), IP(21) | — |

---

## §55 — Global Trust Engine (GTE) — Master Architecture

> Added: 2026-04-13 | Source: User provided directly | Version: v3.3
> GTE = The overarching trust infrastructure that PSS, CRB, DMO, STL all feed into.

### 55.1 — Core Concept

```
Internet = Data Trust Problem
EHB = Trust Infrastructure Solution
```

Everything on the platform — users, products, services, companies, franchises — is governed by Trust Score + Verification + Behavior. EHB is not just a marketplace, it's a **Global Trust Engine** (like Google for data + Amazon for commerce + Binance for security — all in one).

### 55.2 — 8 System Layers

| Layer | Name | Role | Key System |
|-------|------|------|------------|
| 1 | Identity Layer | Who is this person? | PSS (27 features, §54) |
| 2 | Trust Engine | How trusted are they? | STL (L1-L10, §40) + BSTL (§41) |
| 3 | Risk Engine | Are they dangerous? | AI Fraud Detection (§49) |
| 4 | Decision Engine | What action to take? | DMO (rule + AI hybrid) |
| 5 | Franchise Governance | Local control & execution | Franchise System (§39) |
| 6 | DMO Supreme | Global override authority | DMO L8 Supreme (§4) |
| 7 | Wallet Engine | Economic trust + stake | Wallet + EHBGC (§36) |
| 8 | Real-Time Monitoring | Live detection & response | AI + Notification (§46, §49) |

### 55.3 — GTE Trust Formula (Extended)

```
FINAL TRUST = STL Score + Behavior Score + Wallet Strength + History - Risk - Penalties
```

**Weight Factors (Founder Confirmed):**

| Factor | Weight | Description |
|--------|--------|-------------|
| STL Quality | 25% | Core STL level (PSS+CRB+Performance+Behavior) |
| Behavior | 20% | Reviews, delivery, activity patterns |
| Wallet Lock | 20% | Locked EHBGC amount (skin in the game) |
| Activity | 15% | Active engagement, order frequency |
| History | 10% | Long-term performance record |
| Risk | -10% | AI fraud detection flags |
| Penalties | -10% | Active penalties and complaints |

### 55.4 — GTE Decision Matrix

| Trust Level | Risk Level | Action |
|-------------|------------|--------|
| High | Low | Auto Approve |
| Medium | Medium | Franchise Review |
| Low | High | DMO Review |
| Very Low | Very High | Auto Block + Freeze |

### 55.5 — GTE Master Flow

```
User Action
  ↓
DMO Trigger (detect action type)
  ↓
PSS Identity + Trust Check
  ↓
Wallet Lock Verification
  ↓
STL Level Evaluation
  ↓
Trust Score Calculation (all factors)
  ↓
AI Risk Analysis
  ↓
Decision Engine (auto/franchise/DMO/block)
  ↓
Execution (approve/reject/review)
  ↓
Live Monitoring
  ↓
Penalty / Reward
  ↓
Dynamic Trust Update
```

### 55.6 — GTE Database Collections

```
users, entities, stl_records, trust_scores, risk_scores,
wallet_locks, activity_logs, penalties, franchises,
crb_reviews, dmo_decisions, audit_logs
```

---

## §56 — 4 Final Configuration Decisions (LOCKED)

> Added: 2026-04-13 | Source: Founder confirmed directly | Version: v3.3
> These decisions are FINAL and locked into the system configuration.

### 56.1 — Decision 1: Wallet Lock System (FINAL)

**Rule:** Wallet lock REQUIRED for business roles, NOT for buyers.

| Role | Lock Required | Lock Rule |
|------|--------------|-----------|
| Seller | YES | ≥ 1× order value |
| Self-delivery Seller | YES | ≥ 2× order value |
| Rider | YES | ≤ wallet limit orders |
| Franchise Owner | YES | Minimum lock required (by tier) |
| Company/Business | YES | High stake required |
| Normal Buyer | NO | No lock needed |

**Logic:** Business Role = Risk → Must Lock. User Role = Low Risk → No Lock.

**System Behavior:**
- Wallet ↓ → Order access ↓
- Wallet ↑ → Trust ↑ + Orders ↑

### 56.2 — Decision 2: Trust Score Visibility (FINAL)

**Rule:** YES — Fully Visible

| Viewer | Visibility |
|--------|-----------|
| User (self) | Own full score + breakdown |
| Public | Summary level only (e.g. L5, L8) |
| Admin | Full breakdown of all factors |

**UI Display:**
```
Trust Level: L6
Score: 78/100
Status: Good
```

**Optional Advanced View (for user):** STL breakdown, Behavior Score, Wallet Strength, Risk Score.

### 56.3 — Decision 3: Penalty System (FINAL — HYBRID)

**Rule:** BOTH Auto + Manual penalties.

**Auto Penalties (System applies immediately):**

| Event | Action |
|-------|--------|
| Late delivery | Warning |
| Valid complaint | STL drop |
| Fraud detected | Account freeze |

**Manual Penalties (Applied by authorized humans):**
- Company Admin and Franchise can apply
- Types: Warning, Fine (wallet deduct), STL drop, Account freeze

**Priority Rule:** Auto System → First. Manual Override → Higher Authority only.

### 56.4 — Decision 4: AI Level (FINAL — ADVANCED)

**Rule:** ADVANCED level AI (full automation target).

**6 AI Capabilities (locked):**

| Module | What |
|--------|------|
| 1. Fraud Detection AI | Fake users, multi-account, fake orders, fake complaints |
| 2. Behavior AI | User pattern analysis, risk prediction |
| 3. Recommendation AI | Products, services, jobs personalization |
| 4. Delivery AI | Best rider, route optimization, delay prediction |
| 5. Decision AI | Low risk = auto approve, Medium = franchise, High = DMO |
| 6. Predictive AI | Fraud before happening, risk alerts |

**3-Phase Rollout:** Phase 1 = Rule-based (Day 1) → Phase 2 = ML (6+ months) → Phase 3 = Deep Learning + NLP.

---

## §57 — PSS + DMO Integration (Decision Flow)

> Added: 2026-04-13 | Source: User provided directly | Version: v3.3
> How PSS and DMO work together as the platform's brain.

### 57.1 — Core Relationship

```
PSS = Trust Engine (Score banata hai — tells HOW trusted)
DMO = Control Engine (Decision leta hai — decides WHAT to allow)
```

### 57.2 — Integration Flow

```
User Action
  ↓
DMO Trigger ("Is this action risky or normal?")
  ↓
DMO → PSS Request: { userId, action, amount }
  ↓
PSS Analysis (STL, Trust Score, Wallet, Behavior, Risk)
  ↓
PSS Response: { trustLevel, trustScore, riskScore, allowed, recommendation }
  ↓
DMO Final Decision (auto/franchise/DMO review/block)
  ↓
Execution + Webhook Response
  ↓
Platform Update
```

### 57.3 — PSS Response Format

```json
{
  "trustLevel": "L5",
  "trustScore": 72,
  "riskScore": 10,
  "allowed": true,
  "recommendation": "AUTO_APPROVE"
}
```

### 57.4 — Real Use Cases

**Order Placement (Normal):**
User Order → DMO → PSS: STL L6, Wallet OK, Risk low → DMO: APPROVE

**Risky User:**
User Order → PSS: STL L2, Complaints high, Risk high → DMO: BLOCK or REVIEW

**Seller Product Listing:**
Add Product → PSS: CRB not passed → DMO: REJECT

**Delivery Assignment:**
Rider Accept → PSS: Wallet low → DMO: REJECT TASK

**Complaint Resolution:**
Complaint → PSS: Buyer BSTL high → DMO: PRIORITY RESOLUTION

### 57.5 — Decision Matrix (PSS → DMO)

| Trust | Risk | DMO Action |
|-------|------|-----------|
| High | Low | Auto approve |
| Medium | Medium | Franchise review |
| Low | High | DMO review |
| Very low | Very high | Block + freeze |

---

## §58 — PSS + CRB Integration (Verification Flow)

> Added: 2026-04-13 | Source: User provided directly | Version: v3.3
> How PSS digital trust and CRB physical verification work together.

### 58.1 — Core Relationship

```
PSS = Digital trust (score-based, continuous)
CRB = Physical verification (inspection-based, periodic)
```

**Key Rule:** PSS without CRB = weak trust. CRB without PSS = no scalability. Together = Real Trust.

### 58.2 — Integration Flow

```
User Action
  ↓
PSS Trust Check (digital)
  ↓
CRB Verification (if triggered)
  ↓
CRB Report → PSS Update
  ↓
DMO Decision
```

### 58.3 — CRB Trigger Conditions

| Case | CRB Required? |
|------|--------------|
| New seller registration | YES |
| High value seller (500K+ monthly) | YES |
| STL upgrade L4+ | YES |
| Valid complaint filed | YES |
| Random audit (system scheduled) | YES |
| Buyer registration | NO |
| Normal order flow | NO |

### 58.4 — CRB Report → PSS Update

```
CRB PASS → PSS Trust ↑ + STL upgrade allowed
CRB CONDITIONAL → PSS holds, re-inspection scheduled
CRB FAIL → PSS Trust ↓ + STL blocked
```

### 58.5 — Advanced CRB Rules (Founder Confirmed)

**Rule 1 — CRB Mandatory by Level:**
L1–L3 = No CRB needed. L4+ = CRB mandatory.

**Rule 2 — CRB Expiry:**
Every 6 months → mandatory re-check (aligns with Periodic Verification Feature 26).

**Rule 3 — Dual Inspection (L8+):**
2 independent inspectors required. Reports must match. (Already in §42.18)

**Rule 4 — Fail Handling Escalation:**
1st fail → Retry allowed.
2nd fail → STL drop.
3rd fail → Account ban.

### 58.6 — Data Flow

```
CRB Inspection Reports → pss_records update → trust_scores recalculate
→ stl_levels change → dmo_decisions adjust
```

---

## §59 — PSS + CRB + DMO + Franchise — Complete 4-System Integration

> Added: 2026-04-13 | Source: User provided directly | Version: v3.3
> The complete operating system where AI + Local Human Control + Trust work together.

### 59.1 — Core Roles

```
PSS = Trust Engine (marks system — scores users)
CRB = Verification Engine (checking teacher — proves reality)
DMO = Decision Engine (principal — final authority)
Franchise = Execution Engine (teacher — local control)
```

### 59.2 — Complete 9-Step Flow

```
STEP 1: User Action (order, register, complaint, delivery)
  ↓
STEP 2: DMO Trigger (auto? franchise? CRB? DMO review?)
  ↓
STEP 3: PSS Trust Check (STL, trust score, wallet, behavior)
  ↓
STEP 4: CRB Verification (if needed — new seller, L4+, complaint)
  ↓
STEP 5: Franchise Role (local control — verify, monitor, handle)
  ↓
STEP 6: DMO Final Decision (based on PSS + CRB + Franchise input)
  ↓
STEP 7: Execution (approve/reject/review)
  ↓
STEP 8: Real-Time Monitoring (delivery delay, complaint, fraud)
  ↓
STEP 9: Trust Update (Good → STL ↑, Bad → STL ↓, Fraud → Freeze)
```

### 59.3 — 4-Level Control Hierarchy

| Level | Controller | Role | Speed |
|-------|-----------|------|-------|
| 1 | AI (DMO) | Auto decisions (majority of actions) | Instant |
| 2 | PSS | Trust scoring (continuous) | Real-time |
| 3 | Franchise | Local execution & monitoring | Minutes-Hours |
| 4 | DMO Supreme | Global override (rare, high-stakes) | Hours |

### 59.4 — Franchise Powers & Limits

**Franchise CAN:**
- Monitor orders in territory
- Call seller/rider for issues
- Handle local complaints
- Suggest decisions to DMO
- Manage local CRB inspectors

**Franchise CANNOT:**
- Override DMO decisions
- Change STL directly
- Bypass system rules
- Access other territories

### 59.5 — Franchise Performance Impact

**Performance-based system:**
- Good performance → More power, area expansion, higher revenue
- Bad performance → Auto replacement, area reduction
- Revenue directly linked to accuracy and speed

**Auto Escalation:** If franchise fails to act → DMO automatically takes over.

### 59.6 — Real Use Cases (4-System)

**Seller Registration:** Seller apply → PSS check → CRB inspection → Franchise verify → DMO approve

**Order System:** Order place → PSS check → DMO allow → Franchise monitor delivery

**Delivery Issue:** Delay detected → Franchise alert → Franchise call rider → Fix OR reassign

**Complaint:** Complaint filed → AI check → Franchise review → CRB (if needed) → DMO decision

---

## §60 — STL Dynamic Trust Formula (Upgraded)

> Added: 2026-04-13 | Source: User confirmed weight factors | Version: v3.3

### 60.1 — Enhanced STL Formula

```
STL Level = f(STL Quality × 25% + Behavior × 20% + Wallet Lock × 20% + Activity × 15% + History × 10% - Risk × 10% - Penalties × 10%)
```

### 60.2 — Dynamic STL Properties (Confirmed)

**Dynamic:** STL is NOT static. Changes in real-time based on behavior.

**STL Decay (from §41):** 30 days warning → 60 days soft drop → 90 days full decay.

**Category-Based:** Same user in different industries can have different STL rules applied.

**Level Up Path:**
```
L1→L2: Basic verification (PSS)
L2→L3: Activity + clean record
L3→L4: Full PSS verification
L4→L5: CRB inspection pass
L5→L6: Consistent performance
L6→L7: High activity sustained
L7→L8: Strong wallet + excellent reviews
L8→L9: Long history, zero fraud
L9→L10: Elite performance, maximum trust
```

**Level Down Triggers:** Complaints → STL ↓. Inactivity → STL decay. Fraud → Freeze.

### 60.3 — Wallet Lock by STL Level

| STL Level | Wallet Lock Rule |
|-----------|-----------------|
| L1-L2 | No lock (buyer level) |
| L3 | Small lock |
| L4-L5 | Medium lock |
| L6-L7 | High lock |
| L8-L10 | Very high lock |

### 60.4 — STL → Bonus Link

Higher STL unlocks:
- More order access
- Lower charges (future phase)
- More affiliate earning depth (§44)
- Premium listing visibility
- Faster escrow release (§35)

---

## §61 — DMO 7 Engines Deep Detail (Central Brain)

> Added: 2026-04-14 | Source: User provided directly | Version: v3.4
> DMO = Decentralized Management Office — EHB's central brain with 7 specialized engines.

### 61.1 — DMO Core Structure

```
DMO = 7 Engines + Decision Core + Governance + Dashboard
```

### 61.2 — Engine 1: Decision Engine (CORE)

**Role:** Final decision-maker for all platform actions.

**Input:** PSS Trust Score + CRB Result + Risk Score + Wallet Status

**Output:** `AUTO_APPROVE` / `REVIEW` / `REJECT` / `FREEZE`

**Approval Chain:**
- AUTO MODE: Low risk + High STL = instant approval
- SEMI-AUTO: Medium risk = Franchise involved in review
- MANUAL: High risk = DMO Supreme review

### 61.3 — Engine 2: Risk Engine (AI-Powered)

**Role:** Real-time fraud and risk detection.

**Detects:**
- Fake users (identity fraud)
- Multi-account abuse (same device/IP)
- Suspicious order patterns
- Fake complaints / review manipulation
- Inspector collusion

**Output:** Risk Score (0-100) fed to Decision Engine.

### 61.4 — Engine 3: Trust Engine (PSS Integration)

**Role:** Receives and processes trust data from PSS.

**Data Sources:**
- STL Level (L1-L10)
- Behavior Score (activity patterns)
- History (long-term performance)
- BSTL (buyer trust)

**Function:** Converts raw PSS data into actionable trust metrics for Decision Engine.

### 61.5 — Engine 4: Compliance Engine

**Role:** Enforces rules and regulations.

**Enforces:**
- KYC/KYB requirements (PSS Feature tiers)
- Legal compliance (SECP, AML, data privacy)
- Industry-specific rules (medical, legal, finance have stricter requirements)
- Platform policies (COD limits, wallet rules, delivery SLAs)

### 61.6 — Engine 5: Finance Engine

**Role:** Controls all money movement.

**Functions:**
- Escrow management (2-phase: 24h soft + 7-day protection)
- Service charge calculation (2% base)
- Revenue distribution (50/30/15/3/2 split)
- Wallet lock enforcement
- Payout scheduling (T+1 for inspectors, weekly for sellers)
- Refund processing

### 61.7 — Engine 6: Operations Engine

**Role:** Real-time order and delivery monitoring.

**Functions:**
- Order lifecycle tracking
- Delivery delay detection (auto-alert at threshold)
- Rider tracking and performance (RPS)
- Franchise territory alerts
- Auto-reassignment (rider timeout 60s → next rider)
- SLA enforcement

### 61.8 — Engine 7: Analytics Engine

**Role:** Data analysis and reporting.

**Analyzes:**
- Platform performance metrics
- Growth trends (users, orders, revenue)
- Fraud patterns and trends
- Franchise comparative performance
- Industry-level analytics
- AI model accuracy metrics

### 61.9 — DMO Decision Flow (Complete)

```
User Action
  ↓
DMO Trigger (action categorized)
  ↓
Risk Engine (fraud/risk assessment)
  ↓
Trust Engine (PSS data retrieval)
  ↓
Compliance Engine (rules check)
  ↓
Finance Engine (wallet/escrow check)
  ↓
Operations Engine (operational status)
  ↓
Decision Engine (final verdict)
  ↓
Result → Execute + Log + Monitor
```

**Data Flow Between Engines:** Risk → Trust → Compliance → Finance → Operations → Decision

### 61.10 — DMO Dashboard (Department Head View)

**Main Screen:** Total actions, Approvals vs. rejections, Risk alerts, Fraud cases

**6 Tabs:**
1. **Live Decisions** — Real-time approvals/rejections stream
2. **Risk Monitor** — High-risk users flagged, active investigations
3. **Complaints** — Pending / resolved / escalated
4. **Finance** — Escrow status, pending payouts, charge collection
5. **Franchise** — Territory performance, health scores
6. **Audit Logs** — All actions with who/what/when/before-after

### 61.11 — DMO Governance Rules

DMO controls: STL updates, penalties, escrow releases, fraud actions, system-wide policy changes.

**Override Levels:**

| Level | Power |
|-------|-------|
| AI (auto) | Handles 80%+ of decisions |
| Franchise | Can suggest, escalate |
| DMO Admin | Can override AI + Franchise |
| DMO Supreme (L8) | Final authority, can override anything |

---

## §62 — Franchise Dashboard (Full UI & Screens)

> Added: 2026-04-14 | Source: User provided directly | Version: v3.4
> Complete franchise dashboard screens, tabs, and daily workflow.

### 62.1 — Login Flow

```
Login → Role Check → Territory Verification → Dashboard Load
```

### 62.2 — Main Dashboard Screen

**Displays:**
- Active orders (real-time count)
- Delayed orders (with timer)
- Today's revenue
- Pending complaints (SLA timer)
- Franchise Health Score

### 62.3 — 7 Dashboard Tabs

**Tab 1: Orders**
- Order list with status (pending/active/delivered/cancelled)
- Delay timer (auto-highlight overdue)
- Assign rider button
- Order detail drill-in

**Tab 2: Sellers**
- Seller list in territory
- STL level per seller
- Verification status (PSS/CRB)
- Performance metrics
- Action: message, flag, request CRB

**Tab 3: Riders**
- Active riders with live location
- RPS (Rider Performance Score)
- Available / on-delivery / offline status
- Earnings today
- Action: assign, message, report

**Tab 4: Inspectors**
- Assigned inspections in territory
- Inspection reports (Pass/Conditional/Fail)
- Inspector performance (IPS score)
- Schedule management

**Tab 5: Complaints**
- Pending complaints with SLA countdown
- Resolve / Escalate buttons
- Complaint history
- BSTL of complainant visible

**Tab 6: Revenue**
- Daily/weekly/monthly earnings
- Commission breakdown (50/30/15/3/2 share)
- Pending payouts
- Franchise performance bonus

**Tab 7: Settings**
- Notification preferences
- Team management
- Territory view (map)
- Franchise profile

### 62.4 — Franchise Daily Workflow

```
Login → Check alerts → Monitor orders → Handle delays
→ Resolve complaints → Check rider performance → Review revenue
```

### 62.5 — Franchise Controls & Limits

**CAN:** Monitor orders, call seller/rider, handle complaints, suggest decisions, manage local inspectors, view territory analytics.

**CANNOT:** Override DMO, change STL directly, bypass system, access other territories, modify charges/splits.

---

## §63 — Wallet System Deep Detail

> Added: 2026-04-14 | Source: User provided directly | Version: v3.4
> Complete wallet system — deposits, withdrawals, security, dashboard.

### 63.1 — Deposit Methods

| Method | Availability | Speed |
|--------|-------------|-------|
| Bank Transfer | Pakistan (all banks) | 1-24h |
| JazzCash | Pakistan | Instant |
| Easypaisa | Pakistan | Instant |
| Crypto (EHBGC) | Global | Minutes |
| Card Payment | Phase 2 | Instant |

### 63.2 — Withdrawal Rules

- **Daily limit:** Configurable by admin (default TBD)
- **Weekly settlement:** Auto-payout for sellers (escrow cleared)
- **Minimum withdrawal:** 2,000 PKR (aligns with affiliate payout min)
- **Methods:** Bank, JazzCash, Easypaisa, Crypto
- **Processing:** T+1 for verified users, T+3 for new users

### 63.3 — Wallet Balance Types

| Type | Description |
|------|------------|
| Free Balance | Available for use/withdrawal |
| Locked Balance | Locked for trust (wallet lock system per §56.1) |
| Escrow Hold | In active order escrow (§35) |
| Pending | Incoming funds not yet cleared |
| Earnings | From sales/affiliate/franchise — converts to free after escrow |

### 63.4 — Wallet Security

- **Face Authentication 2FA** for withdrawals >10K PKR (PSS Feature 11)
- **OTP** for all transactions
- **Device binding** (PSS Feature 18)
- **Transaction logging** (immutable audit trail)
- **Suspicious pattern detection** (PSS Feature 7 + AI Fraud)

### 63.5 — Wallet Dashboard (User View)

**Shows:**
- Total Balance (with locked/free breakdown)
- Recent Transactions (in/out/escrow)
- Earnings Summary (daily/weekly/monthly)
- Lock Status (required vs. actual)
- Deposit / Withdraw buttons

### 63.6 — EHBGC Integration

- 1 EHBGC = 1 USD (Phase 1 fixed)
- Phase 2: Semi-floating with ±5% AI-controlled band
- Lock EHBGC = Trust boost in STL scoring
- Stake system (Phase 2): Lock for earnings

---

## §64 — JPS System Deep Detail (Job Platform)

> Added: 2026-04-14 | Source: User provided directly | Version: v3.4
> JPS = Job Profile & Skill — AI-powered job matching platform.

### 64.1 — Employer Flow

```
Register → PSS Verify → Post Job → Receive Applications → AI Rank → Interview → Hire → Rate
```

### 64.2 — Job Seeker Flow

```
Signup → Build Profile (skills, experience, location) → PSS Verify
→ Browse/Apply Jobs → AI Match Notifications → Interview → Get Hired → Rate
```

### 64.3 — AI Matching Engine

**Factors:**
- Skills match (primary — skill tags vs. job requirements)
- Location proximity
- Experience level match
- STL level (higher STL = priority in results)
- Salary expectation fit
- Industry experience
- Availability

### 64.4 — JPS Dashboard — Employer View

- Posted jobs list
- Applications per job
- AI-ranked candidates
- Interview schedule
- Hire/Reject actions
- Company STL visible

### 64.5 — JPS Dashboard — Job Seeker View

- Matched jobs (AI recommended)
- Application status tracker
- Profile completeness meter
- Skill suggestions (AI)
- Interview schedule

### 64.6 — JPS Internal Use (EHB Hiring)

JPS is also used internally by EHB for hiring:
- CRB Inspectors (§42)
- Riders (§48)
- Franchise staff
- Support agents

### 64.7 — JPS Revenue Model

- Free job posting (basic)
- Premium listing (paid — higher visibility)
- Featured employer badge (paid)
- AI advanced matching (premium feature)
- Commission on successful hire (% of first month — Phase 2)

---

## §65 — 4 Final Confirmations (LOCKED)

> Added: 2026-04-14 | Source: Founder confirmed ALL 4 | Version: v3.4
> These were pending since v3.1 (§53.4). Now officially LOCKED.

### 65.1 — COD Limit: 20,000 PKR — CONFIRMED

```
Max COD per order = 20,000 PKR
```
- Orders > 20K PKR → COD not available, online payment only
- Orders ≤ 20K PKR → COD allowed (if BSTL L3+ and seller allows)

### 65.2 — Rider Base Rate: 150 PKR — CONFIRMED

```
Base Delivery Fee = 150 PKR per delivery
```
- Plus: Distance bonus (per km), Peak time bonus (+50%), High STL rider (+20%), COD handling (+50 PKR), Batch bonus (+100 PKR for 10+/day)

### 65.3 — Language System: Auto-Detect + Global — CONFIRMED (UPGRADED)

```
User Location → Auto Detect → Local Language Apply
```

| Country | Default Language |
|---------|-----------------|
| Pakistan | Urdu + English |
| UAE | Arabic + English |
| Turkey | Turkish |
| Germany | German |
| Global fallback | English |

**System Logic:** IP/GPS → Country Detect → Default Language Set → User can manually change

**Advanced:** AI translation (real-time), multi-language content, RTL support (Arabic, Urdu)

**Note:** Phase 1 = Urdu + English. Phase 2+ = full multi-language per territory.

### 65.4 — EHBGC Value: 1 USD = 1 EHBGC — CONFIRMED

```
1 EHBGC = 1 USD (Starting Phase)
```
- Future: Controlled floating with ±5% AI-managed band
- Admin + AI can adjust within band limits

---

## §66 — Language System Advanced (Global Auto-Detect)

> Added: 2026-04-14 | Source: User upgraded from simple to auto-detect global | Version: v3.4

### 66.1 — System Architecture

```
User Opens App → IP/GPS Detection → Country Identified
→ Default Language + Currency Set → User Can Override
```

### 66.2 — Phase Rollout

| Phase | Languages | Currencies |
|-------|-----------|-----------|
| Phase 1 | Urdu + English | PKR |
| Phase 2 | +Arabic, Hindi, Turkish, French, Spanish | +USD, AED, SAR, GBP, EUR |
| Phase 3 | All franchise territory languages | All local currencies |

### 66.3 — Technical Features

- AI real-time translation for user-generated content
- Manual human review for legal text translations
- RTL (Right-to-Left) support for Arabic and Urdu
- Real-time exchange rates for currency conversion
- Franchise territory determines default language/currency

---

## §67 — Seller/Service Provider Fee Model (FINAL)

> Added: 2026-04-14 | Source: Founder confirmed | Version: v3.5
> Replaces any previous fee assumptions. This is the LOCKED model.

### 67.1 — Fee Rules (LOCKED)

| Fee Type | Status | Detail |
|----------|--------|--------|
| Monthly Fee | NO | No monthly subscription for sellers |
| Listing Fee | FREE | Zero cost to list products/services |
| Service Charge | 2% per order | Applied on successful sale (§32) |
| STL Verification Fee | PAID | One-time per level upgrade (PSS + CRB cost) |
| STL Refill Fee | PAID | Every 6 months — re-verification required |

### 67.2 — STL Refill System (NEW — Every 6 Months)

```
STL Active → 6 Months Pass → STL Expires → Refill Required
→ Pay Fee → Re-Verification (CRB/PSS) → STL Renewed
```

**Benefits:**
- Eliminates fake/dormant sellers automatically
- Maintains platform quality continuously
- Creates recurring revenue stream for EHB
- Aligns with CRB 6-month expiry (§58.5 Rule 2)

### 67.3 — Order Value Based Control (for sellers without wallet lock)

Since product sellers don't have EHBGC lock requirement:

```
Low STL seller → Low order value limit
High STL seller → High order value limit
```

This ensures trust without requiring financial lockup from small shopkeepers.

---

## §68 — EHBGC Lock System (REVISED — Final)

> Added: 2026-04-14 | Source: Founder revised decision | Version: v3.5
> IMPORTANT: This OVERRIDES §56.1 wallet lock rules for product sellers.

### 68.1 — Who Must Lock EHBGC (REVISED)

| Role | Lock Required? | Reason |
|------|---------------|--------|
| Franchise Owner | YES (50,000+ EHBGC min) | Territory commitment |
| Service Provider | YES (by STL level) | Service = risk, must have skin in game |
| Self-Delivery Seller | YES (2× order value) | Rider fraud protection |
| Rider | YES (≤ wallet limit orders) | Cash handling trust |
| **Product Seller (shopkeeper)** | **NO** | CRB + STL + complaints = enough trust |
| Normal Buyer | NO | Low risk |

### 68.2 — Service Provider Lock Amounts (by STL)

| STL Level | EHBGC Lock Required |
|-----------|-------------------|
| L3 | 100 EHBGC |
| L5 | 700 EHBGC |
| L7 | 3,000 EHBGC |
| L10 | 30,000 EHBGC |

### 68.3 — Franchise Lock Impact

```
More EHBGC locked → More territory/area power
Less EHBGC locked → Limited control area
```

Minimum: 50,000 EHBGC for any franchise level.

### 68.4 — Product Seller Indirect Trust (No Lock Needed)

Product sellers are protected by 4 layers instead of wallet lock:
1. CRB inspection (physical verification)
2. STL score (dynamic trust)
3. Complaint system (customer protection)
4. Franchise control (local monitoring)

---

## §69 — Product STL System (NEW)

> Added: 2026-04-14 | Source: User introduced product-level STL | Version: v3.5
> NEW CONCEPT: STL now applies to PRODUCTS, not just users.

### 69.1 — Core Concept

```
Previously: STL = User trust only
Now: STL = User trust + Product trust
```

Every product/listing gets its own STL score based on:

| Factor | Impact |
|--------|--------|
| Seller STL | Base score inherited |
| Product Reviews | Customer feedback |
| Complaint Rate | Problems reported |
| CRB Verification | Physical inspection pass |
| Return Rate | How often returned |

### 69.2 — Product STL Examples

| Product | Expected STL | Reason |
|---------|-------------|--------|
| iPhone (verified seller) | L8 | Known brand + high STL seller + CRB verified |
| Local handmade product | L4 | New seller, limited reviews |
| Fresh food item | L5 (fast decay) | Quality degrades, needs frequent CRB |

### 69.3 — Product STL Impact

- Higher product STL → Better search ranking, more visibility
- Lower product STL → Warning labels, lower in results
- Product STL decays faster than user STL for perishable/quality-sensitive items

### 69.4 — MIN Rule Update

Original: `FINAL_STL = MIN(product, seller, company, owner)`

This rule already included "product" — now it's formally defined with its own scoring system.

---

## §70 — GoSellr Category System (Global Database-Ready)

> Added: 2026-04-14 | Source: User provided full category tree | Version: v3.5
> Structure: Industry → Category → Subcategory → Product Type → Rules

### 70.1 — Category Architecture

```
Industry → Category → Subcategory → Product Type → Rules → CRB Type → STL Logic
```

### 70.2 — Electronics Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Mobiles | Smartphones, Feature Phones, Refurbished | CRB: device check, Warranty required, Return: 7 days |
| Computers | Laptops, Desktops, Tablets | CRB: device check, Warranty required, Return: 7 days |
| Accessories | Chargers, Headphones, Power banks | Return: 7 days |
| Gaming | Consoles, Controllers | Warranty required |

### 70.3 — Fashion Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Men | Shirts, Pants, Suits | Return: 3-5 days, Size verification |
| Women | Dresses, Abaya, Jewelry | Return: 3-5 days, Hygiene rules |
| Kids | Boys, Girls clothing | Return: 3-5 days |
| Footwear | Shoes, Sandals | Return: 3-5 days, Size verification |

### 70.4 — Home & Kitchen Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Furniture | Tables, Chairs, Beds, Wardrobes | CRB: physical inspection, Return: 5-7 days |
| Kitchen Appliances | Blenders, Ovens, Microwaves | Warranty, Return: 5-7 days |
| Home Decor | Wall art, Cushions, Rugs | Return: 5-7 days |
| Lighting | Lamps, LED, Fixtures | Return: 5-7 days |

### 70.5 — Grocery & Food Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Fresh Food | Fruits, Vegetables, Meat | CRB: hygiene, Expiry check, Return: LIMITED |
| Packaged Food | Snacks, Canned goods | Expiry check, Return: LIMITED |
| Beverages | Drinks, Juices, Water | Expiry check |
| Dairy | Milk, Cheese, Yogurt | CRB: hygiene, Cold chain required |

### 70.6 — Health & Medical Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Medicines | OTC, Prescription | Prescription required, CRB: license verification |
| Equipment | BP monitors, Thermometers | Warranty, Return: 7 days |
| Supplements | Vitamins, Proteins | Expiry check |

### 70.7 — Automotive Industry

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Cars | New, Used | CRB: authenticity + condition, Warranty |
| Bikes | New, Used | CRB: authenticity |
| Spare Parts | Engine, Body, Electrical | CRB: authenticity, Warranty |
| Accessories | Mats, Covers, Electronics | Return: 7 days |

### 70.8 — Services Industry (CRITICAL — Wallet Lock Required)

| Category | Subcategories | Rules |
|----------|--------------|-------|
| Home Services | Electrician, Plumber, AC repair | PSS + CRB mandatory, STL critical, Wallet lock |
| Cleaning | Home, Office cleaning | PSS mandatory, STL ≥ L3 |
| Education | Tutors, Courses, Training | PSS mandatory |
| Legal | Lawyer, Documentation | PSS + CRB mandatory, STL ≥ L5 (OLS rules §21) |
| Medical | Doctor, Nurse, Consultation | PSS + CRB mandatory, License required |

### 70.9 — Category Engine Backend Structure

```json
{
  "industry": "Electronics",
  "category": "Mobiles",
  "subcategory": "Smartphones",
  "rules": {
    "return_days": 7,
    "crb_required": true,
    "warranty_required": true,
    "min_seller_stl": "L4",
    "cod_allowed": true
  },
  "stl_logic": {
    "min_level": "L4",
    "boost_if_verified": true,
    "decay_speed": "normal"
  }
}
```

### 70.10 — AI Category Features

- **Auto Category Detection:** AI classifies products into correct category from title/description/images
- **Dynamic Rules:** Category rules can change per franchise territory (food rules stricter in hot climate)
- **Auto Category Creation:** If product doesn't fit existing categories, AI proposes new subcategory for admin approval

---

## §71 — Return & Exchange Policy (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder approved framework | Version: v3.6

### 71.1 — Universal Return Rules

```
Refund Source Priority: Escrow → Seller Wallet → Platform Backup (last resort)
Pickup: Platform rider (auto-scheduled)
Evidence: Photos/Video required (except late delivery — auto-detected)
SLA: Decision ≤ 72 hours | Refund ≤ 24 hours after approval
```

### 71.2 — Category-Wise Return Policy

| Category | Window | Condition | Fee |
|----------|--------|-----------|-----|
| Electronics | 7 days | Original box + no damage | 0% (valid) / 5-10% (change-of-mind) |
| Fashion | 3-5 days | Unworn + tags attached | 0% / buyer pays return shipping |
| Furniture | 5-7 days | Original condition | 0% / 5-10% restocking |
| Food/Grocery | 24 hrs (issue only) | Quality issue proof | 0% (no change-of-mind returns) |
| Health/Medical | 0-2 days | Sealed items only | 0% |
| Services | Before start / within 48h | Not delivered as promised | 0% |

### 71.3 — Resolution Matrix

| Case | Outcome |
|------|---------|
| Wrong item | Full refund + seller STL drop |
| Damaged in delivery | Full refund + CRB re-check + rider penalty |
| Not received | Instant refund (EHB Trust Guarantee) |
| Change-of-mind | Partial refund (restocking fee 5-10%) + buyer pays return shipping |
| Quality issue | Full/partial refund based on CRB assessment |

### 71.4 — EHB Trust Guarantee (APPROVED)

- Sellers L5+ → Instant refund from escrow (no waiting for investigation)
- Platform covers if seller's escrow insufficient
- Builds massive buyer confidence (like Amazon A-to-Z)
- Only applies to PSS-verified buyers with BSTL L3+

---

## §72 — STL Verification & Refill Fees (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder approved fee structure | Version: v3.6

### 72.1 — Fee Schedule

| Level Range | Fee (PKR) | Includes |
|-------------|-----------|----------|
| L1-L3 | 500 | Basic PSS verification |
| L4-L5 | 2,000 | Full PSS + CRB inspection |
| L6-L7 | 5,000 | Enhanced checks + performance review |
| L8-L10 | 10,000 | Dual CRB inspection + video verification |

### 72.2 — Refill Cycle

```
STL Active → 6 Months → Refill Window Opens → Pay Fee → Re-Verification → STL Renewed
```

### 72.3 — Fee Rules

- **Early renewal** (before expiry): 20% discount
- **Failed verification**: No refund + retry at 50% fee
- **Missed refill deadline**: STL auto-decay starts (30-day warning per §41)
- **Revenue stream**: Recurring every 6 months for all active sellers/service providers

---

## §73 — Franchise Lock Tiers (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder approved tiers | Version: v3.6

### 73.1 — Lock Amount by Franchise Tier

| Tier | EHBGC Lock | Territory Power |
|------|-----------|----------------|
| Sub Franchise | 50,000 | Local area (neighborhood/town) |
| Master Franchise | 200,000 | City-level control |
| Corporate Franchise | 500,000 | Province/region |
| Country Franchise | 1,000,000 | National operations |

### 73.2 — Lock Impact Rules

```
Higher Lock → More Orders → More Revenue Share → More Authority
Lock Drop → Territory limit reduced
Performance ↓ → Forced downgrade
Expansion request → Extra lock required
```

### 73.3 — Revenue Link

Franchise revenue share (from 50/30/15/3/2 split) scales with lock amount and performance. Higher lock + good performance = bonus revenue tier.

---

## §74 — Rating vs STL Separation (FINAL)

> Added: 2026-04-14 | Source: Founder approved separation | Version: v3.6

### 74.1 — Two-System Design

| Type | Visibility | Purpose | Scale |
|------|-----------|---------|-------|
| Rating (stars) | PUBLIC | Buyer trust indicator | 1-5 stars |
| STL (level) | Internal + partial | System access control | L1-L10 |

### 74.2 — UI Display

```
Public View:  ⭐ 4.6 Rating  |  🏅 Trusted Seller
Admin View:   ⭐ 4.6 Rating  |  STL L7  |  Trust Score: 82/100
```

- Buyers see: Star rating + badge (no raw STL number)
- Sellers see: Their own STL level + breakdown
- Admin sees: Full detail of both

---

## §75 — Seller Performance Badges (APPROVED)

> Added: 2026-04-14 | Source: Claude suggestion, founder approved | Version: v3.6

### 75.1 — Badge System

| Badge | Condition | Benefit |
|-------|-----------|---------|
| Rising Star | New seller, fast growth trajectory | Visibility boost |
| Trusted Seller | STL L5+ with 100+ orders | Priority listing |
| Premium Partner | STL L8+ with 500+ orders | Featured placement + lower fees |
| GoSellr Verified | CRB verified + top reviews | Maximum trust badge |

### 75.2 — Badge Rules

- Badges auto-assigned by system (no manual application)
- Lost if conditions no longer met (STL drop = badge drop)
- Multiple badges can stack
- Visible on seller profile, product listings, and search results

---

## §76 — Buyer Loyalty Program + Insurance (APPROVED)

> Added: 2026-04-14 | Source: Claude suggestion, founder approved | Version: v3.6

### 76.1 — Buyer Loyalty System

- **EHBGC Cashback**: % back on qualifying orders
- **Monthly Targets**: Hit order target → bonus EHBGC reward
- **BSTL Growth**: Loyal buyers get BSTL boost (more trust, better complaint weight)

### 76.2 — Rider Insurance Pool

- **Funding**: 5-10 PKR deducted per delivery → insurance pool
- **Coverage**: Accident, health, vehicle damage
- **STL Bonus**: High STL riders get better coverage
- **Purpose**: Rider retention + safety net

### 76.3 — Product Return Insurance

- **For L5+ sellers**: Automatic return insurance (platform absorbs return cost)
- **For lower STL**: Buyer handles return
- **Incentive**: Motivates sellers to grow STL for insurance benefit

---

## §77 — EHB AD System Deep (LOCKED)

> Added: 2026-04-14 | Source: Founder provided deep detail | Version: v3.6

### 77.1 — Ad Flow

```
Advertiser Register → PSS Verify → Create Ad → AI Content Scan
→ DMO Approval → Publish → Monitor → Pay
```

### 77.2 — Pricing Models

| Model | Description |
|-------|------------|
| CPC (Cost Per Click) | Pay per click on ad |
| CPM (Cost Per 1000 Views) | Pay per impression |
| STL Boost | High STL advertiser = cheaper ad rates |

### 77.3 — Ad Trust Rules

- Low STL advertiser → Limited ad reach
- Fake/misleading ads → Auto ban + penalty + STL drop
- AI scans ad content for fraud, misleading claims, prohibited items
- CRB-verified advertiser gets "Verified Ad" badge

### 77.4 — Ad Revenue

- Ad revenue goes into EHB company revenue (separate from service charge)
- Franchise gets share of local ads in territory

---

## §78 — Blockchain Plan (REVISED — Binance Smart Chain First)

> Added: 2026-04-14 | Source: Founder revised strategy | Version: v3.6
> IMPORTANT: Original plan was Polkadot-first. Founder decided Binance Smart Chain (BSC) first, then migrate to Polkadot.

### 78.1 — Revised Phase Plan

**Phase 1 (NOW — Launch):**
- Off-chain (MongoDB database)
- Hash stored for future blockchain migration
- EHBGC as internal token (database-tracked)

**Phase 2 (6-12 months — Binance Smart Chain):**
- EHBGC as BEP-20 token on BSC
- CRB certificates stored as on-chain hashes
- Basic escrow smart contract
- Wallet lock verification on-chain
- Reason: BSC is cheaper, faster, bigger ecosystem for Phase 2

**Phase 3 (12-24 months — Polkadot Migration):**
- Migrate to Polkadot parachain (Moonbeam EVM-compatible)
- Full smart contracts: Escrow, Lock, Rewards, STL verification
- Cross-chain bridges (BSC ↔ Polkadot)
- Data sovereignty per franchise territory
- Reason: Polkadot gives better governance, parachains, cross-chain for global scale

### 78.2 — Why Binance First (Founder's Reasoning)

```
BSC: Low fees, fast, large community, easy BEP-20 token
Polkadot: Better long-term but complex, expensive parachain auction
Strategy: Start cheap (BSC) → Scale premium (Polkadot)
```

### 78.3 — Smart Contract Roadmap

| Contract | Phase | Chain |
|----------|-------|-------|
| EHBGC Token (BEP-20) | Phase 2 | BSC |
| Escrow Contract | Phase 2 | BSC |
| CRB Hash Storage | Phase 2 | BSC |
| Wallet Lock Contract | Phase 2 | BSC |
| Full Governance | Phase 3 | Polkadot |
| Cross-chain Bridge | Phase 3 | BSC ↔ Polkadot |

---

## §79 — Seasonal Rules Engine (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder approved with detail | Version: v3.7

### 79.1 — Core Logic

```
Date + Location + Industry → AI Auto-Adjusts Rules
```

### 79.2 — Season-Specific Rules

**Ramadan:**
- Food: CRB hygiene = STRICT mode, Delivery SLA = 2 hours (Iftar priority orders)
- Grocery: Stock priority boost in search
- Sellers: High STL sellers get extra visibility
- Operating hours adjusted for Suhoor/Iftar

**Eid al-Fitr:**
- Fashion: Return window extended to 7 days, order limits increased
- Gifts: Featured category auto-created
- Delivery: Express priority for gift items

**Back-to-School:**
- Education category: Boosted ranking
- AI suggests relevant discounts
- Tutoring services highlighted

**Black Friday / Sale Events:**
- All categories: Express delivery priority
- AI checks for fake discounts (price inflated then "discounted")
- High order volume → extra CRB spot-checks

### 79.3 — AI Role in Seasonal Engine

- Auto-detects season based on calendar + country
- Auto-adjusts: Delivery SLA, CRB strictness, search visibility, category prominence
- Franchise territory determines which seasons apply (Ramadan in Pakistan, Christmas in US, etc.)

---

## §80 — Mobile App Architecture (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder confirmed tech stack | Version: v3.7

### 80.1 — Tech Stack

```
Frontend: React Native (cross-platform)
Backend: Node.js (existing Express APIs)
Push Notifications: Firebase Cloud Messaging (FCM)
```

### 80.2 — Core Mobile Features

- Push notifications (order updates, complaints, alerts)
- GPS tracking (delivery real-time, rider tracking)
- Camera integration (KYC selfie, CRB evidence photos/video, product photos)
- Offline mode (limited browsing, saved products — no transactions offline)
- Biometric auth (fingerprint/face for wallet access)

### 80.3 — App Rollout Strategy

| Phase | Platform | Market |
|-------|----------|--------|
| Phase 1 | Android | Pakistan (primary market) |
| Phase 2 | iOS | Pakistan + early international |
| Phase 3 | Both | Global (per franchise territory) |

### 80.4 — App vs Web Feature Parity

- Phase 1: Mobile = Buyer app + Seller app + Rider app (3 separate apps)
- Admin/Franchise dashboards remain web-only initially
- Phase 2: Franchise mobile app added

---

## §81 — Seller Premium Subscription (FINAL)

> Added: 2026-04-14 | Source: Founder confirmed optional model | Version: v3.7

### 81.1 — Two-Tier System

**Free (Default — All Sellers):**
- Product listing (unlimited)
- Order management
- Basic analytics (sales count, revenue)
- Standard search ranking

**Premium (Optional Monthly Subscription):**
- Priority search ranking (above free sellers at same STL)
- Advanced analytics (trends, demographics, AI recommendations)
- AI suggestions ("Stock more X", "Price Y is too high", competitor benchmarking anonymized)
- Priority customer support
- Featured seller badge (additional to STL badges)

### 81.2 — Critical Rule

```
STL remains the CORE trust system.
Premium ONLY boosts visibility — it does NOT affect trust score or STL level.
A Premium L3 seller still ranks BELOW a free L5 seller.
```

### 81.3 — Pricing

- TBD by admin (adjustable per territory/industry)
- Expected range: 1,000 - 5,000 PKR/month
- Franchise gets % of premium subscriptions in their territory

---

## §82 — Wallet Withdrawal Limits (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder confirmed limits | Version: v3.7

### 82.1 — Withdrawal Limits by Role

| Role | Daily Limit | Monthly Limit |
|------|------------|--------------|
| Buyer | 50,000 PKR | 500,000 PKR |
| Seller | 200,000 PKR | 2,000,000 PKR |
| Franchise | 500,000 PKR | Unlimited (reviewed) |

### 82.2 — Withdrawal Rules

- KYC verification required for ALL withdrawals
- Higher STL → higher limits possible (admin can adjust per user)
- Suspicious activity → auto-hold pending review
- First-time withdrawal → additional verification step
- Per-transaction max = daily limit (one large or multiple small)

---

## §83 — Customer Support System (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder approved tier system | Version: v3.7

### 83.1 — 4-Tier Support System

```
Tier 1: AI Chatbot → Instant (24/7, Urdu + English)
Tier 2: Franchise Support → ≤ 4 hours (local, 8AM-10PM)
Tier 3: Central Support → ≤ 12 hours (complex issues, 24/7)
Tier 4: DMO Escalation → ≤ 24 hours (critical only)
```

### 83.2 — AI Chatbot Features (Tier 1)

- Urdu + English auto-detect
- Context-aware (knows user's orders, STL, complaint history)
- Auto ticket creation when cannot resolve
- Handles: order status, tracking, basic complaints, FAQ, account help
- Escalates at <70% confidence or sensitive topics

### 83.3 — Support Features

- **Ticket System:** Auto-created, tracked, SLA monitored
- **Chat System:** In-app real-time chat with support agents
- **Call Support:** Phase 2 (voice support via VoIP)
- **Knowledge Base:** Self-service FAQ + video tutorials

### 83.4 — Escalation Flow

```
User Issue → AI Chatbot (try resolve)
  → Cannot resolve → Create Ticket → Route to Franchise
  → Complex → Central Support
  → Critical (fraud, legal, L8+ dispute) → DMO
```

---

## §84 — MULTI-LAYER TRUST ARCHITECTURE (REVOLUTIONARY UPGRADE)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0
> CRITICAL: This section REDEFINES the entire STL system architecture.
> EHB becomes WORLD'S FIRST MULTI-DIMENSION TRUST SYSTEM.

### 84.1 — Architecture Revelation

```
PREVIOUS UNDERSTANDING (DEPRECATED):
  PSS → flat points (0-40) → added to STL
  CRB → +15 points → added to STL
  DMO → governance only (no scoring)
  STL = single combined score

NEW ARCHITECTURE (CONFIRMED):
  PSS has its OWN 10-level system → PSS-L1 to PSS-L10
  CRB has its OWN 10-level system → CRB-L1 to CRB-L10
  DMO has its OWN 10-level system → DMO-L1 to DMO-L10
  
  These 3 sub-levels COMBINE → FINAL EHB-STL-LEVEL
```

### 84.2 — Why This Matters

Traditional platforms (Amazon, Uber, Fiverr) use a single flat rating or score.
EHB uses a **3-dimensional trust system** where:
- A person's IDENTITY trust (PSS) is separate from their PHYSICAL trust (CRB) and BEHAVIORAL trust (DMO)
- You can have high identity verification but low physical proof — system catches it
- You can have perfect inspections but suspicious behavior — system catches it
- NO dimension can be faked independently — all 3 must align

---

## §85 — PSS Internal 10 Levels (Identity Trust Dimension)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0

### 85.1 — PSS Level Ladder

| PSS Level | Name | Verification Required | What Gets Checked |
|-----------|------|----------------------|-------------------|
| PSS-L1 | Email Only | Email verification | Email exists, not disposable |
| PSS-L2 | Phone Verified | Phone OTP | Phone number real, not VoIP/burner |
| PSS-L3 | ID Uploaded | CNIC/Passport upload | OCR scan + database check (NADRA) |
| PSS-L4 | Face Matched | Face match vs ID photo | AI comparison: selfie vs document photo |
| PSS-L5 | Address Verified | Address proof document | Utility bill/bank statement + optional CRB |
| PSS-L6 | Liveness Passed | Anti-spoof liveness check | Blink, smile, head turn — proves real human |
| PSS-L7 | Device Bound | Device fingerprint locked | One device = one identity, emulator blocked |
| PSS-L8 | Video Verified | Live video identification | Video call with PSS agent or AI video analysis |
| PSS-L9 | Continuous Monitor | Ongoing monitoring active | Behavior patterns, transaction monitoring, AML continuous |
| PSS-L10 | Fully Verified + History | All 27 features + clean history | Complete PSS profile with long-term trust record |

### 85.2 — PSS Level Rules

```
Level Up: Complete next verification step → auto upgrade
Level Down: Document expired → drop. Fraud detected → freeze. Re-verify failed → drop.
Maintenance: PSS-L6+ requires periodic re-check (every 6 months per refill cycle)
Max for Buyer: PSS-L6 (typical), PSS-L10 (power buyer)
Min for Seller: PSS-L4 (basic seller), PSS-L6 (standard), PSS-L8+ (premium)
Min for Franchise: PSS-L8 (sub), PSS-L9 (master/corporate), PSS-L10 (country)
```

### 85.3 — PSS Level → Feature Unlock

| PSS Level | What Unlocks |
|-----------|-------------|
| PSS-L1 | Browse products, basic search |
| PSS-L2 | Create account, save wishlist |
| PSS-L3 | Purchase (limited), COD (limited) |
| PSS-L4 | Full buying, start seller registration |
| PSS-L5 | Seller listing, wallet deposit |
| PSS-L6 | Full selling, rider eligible |
| PSS-L7 | Wallet withdrawal, higher limits |
| PSS-L8 | Inspector eligible, franchise application |
| PSS-L9 | Admin eligible, premium operations |
| PSS-L10 | Supreme access, all features unlocked |

---

## §86 — CRB Internal 10 Levels (Physical Trust Dimension)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0

### 86.1 — CRB Level Ladder

| CRB Level | Name | Inspection Status | What It Means |
|-----------|------|-------------------|---------------|
| CRB-L1 | None | No inspection done | New user, no physical verification |
| CRB-L2 | Basic | Basic document check | Remote document review only |
| CRB-L3 | 1 Pass | First inspection passed | Single inspector visit, basic checklist |
| CRB-L4 | 2 Passes | Two inspections passed | Proven consistency across 2 checks |
| CRB-L5 | Verified | Fully verified status | Complete CRB certification active |
| CRB-L6 | Re-checked | 6-month re-verification passed | Maintained standards after re-check |
| CRB-L7 | Multi-Category | Verified in multiple categories | Passed inspections for 2+ industry types |
| CRB-L8 | Dual Inspector | Dual inspection system passed | 2 independent inspectors, reports matched |
| CRB-L9 | Continuous Audit | Under continuous CRB audit | Regular scheduled + surprise inspections |
| CRB-L10 | Premium Verified | Highest CRB certification | Continuous dual inspection + zero fails + long history |

### 86.2 — CRB Level Rules

```
Level Up: Pass next inspection tier → upgrade
Level Down: Fail inspection → drop (1st fail: retry, 2nd: drop, 3rd: ban per §58.5)
Expiry: CRB expires every 6 months → re-check required → miss = CRB level drops
Buyer default: CRB-L1 (buyers don't need physical inspection)
Seller minimum: CRB-L3 (first pass required for L4+ EHB-STL)
L8+ dual: Two independent inspectors, reports must match
Industry matters: Food CRB = hygiene focus, Electronics = authenticity, Medical = license check
```

### 86.3 — CRB Level → Impact

| CRB Level | Impact on Platform |
|-----------|-------------------|
| CRB-L1 | No CRB badge, limited categories |
| CRB-L2 | Basic document verified badge |
| CRB-L3 | "CRB Checked" badge, standard selling |
| CRB-L4 | Higher search ranking |
| CRB-L5 | "CRB Verified" badge, full categories |
| CRB-L6 | Maintained trust, renewal confirmed |
| CRB-L7 | Multi-industry selling enabled |
| CRB-L8 | Premium listing, EHB Trust Guarantee eligible |
| CRB-L9 | Maximum trust, lowest complaint scrutiny |
| CRB-L10 | Legendary CRB status, platform showcase seller |

---

## §87 — DMO Internal 10 Levels (Behavioral Trust Dimension)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0

### 87.1 — DMO Level Ladder

| DMO Level | Name | Behavioral Status | What It Means |
|-----------|------|-------------------|---------------|
| DMO-L1 | New | Just registered | No platform history, unknown behavior |
| DMO-L2 | Clean | No complaints | Basic activity, zero issues |
| DMO-L3 | Active | Regular activity | Consistent platform usage, no flags |
| DMO-L4 | Verified | DMO-reviewed | Passed DMO verification/approval |
| DMO-L5 | Trusted | Trust established | Good track record over time |
| DMO-L6 | Strong | Strong compliance | High compliance score, follows all rules |
| DMO-L7 | High Compliance | Excellent record | Long history, excellent metrics |
| DMO-L8 | Elite | DMO Elite status | Manual DMO Supreme review passed |
| DMO-L9 | Premium | Premium trusted | Near-perfect record, board notification level |
| DMO-L10 | Supreme | Supreme authority trust | Highest DMO trust, board approved |

### 87.2 — DMO Level Factors

```
DMO Score is calculated from:
  + Complaint history (fewer complaints = higher)
  + Resolution compliance (responds on time = higher)
  + Policy adherence (follows rules = higher)
  + Activity consistency (regular usage = higher)
  + Fraud signals (none = higher)
  + Dispute outcomes (wins = higher)
  + Time on platform (longer = higher)
  
  - Complaints received = drops
  - Policy violations = drops
  - Fraud flags = FREEZE
  - Inactivity = decay
```

### 87.3 — DMO Level → Authority

| DMO Level | What It Controls |
|-----------|-----------------|
| DMO-L1 | Restricted access, monitored closely |
| DMO-L2 | Standard access |
| DMO-L3 | Full buyer/seller features |
| DMO-L4 | Verified badge from DMO |
| DMO-L5 | Trusted operations, reduced review |
| DMO-L6 | Auto-approve most actions |
| DMO-L7 | Priority processing, reduced SLA |
| DMO-L8 | Admin-eligible, franchise management |
| DMO-L9 | DMO reviewer eligible |
| DMO-L10 | Supreme authority, platform governance |

---

## §88 — HYBRID Combination Formula (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder chose OPTION C (Hybrid) | Version: v4.0
> This is the MOST IMPORTANT formula in the entire EHB system.

### 88.1 — The HYBRID Model (3 Steps)

```
STEP 1: THRESHOLD CHECK
  → If ANY sub-level < minimum required for target → BLOCK upgrade
  → Example: Want EHB-STL L5? All 3 must meet L5 minimum thresholds

STEP 2: WEIGHTED CALCULATION
  → Weighted Score = (PSS-Level × Weight) + (CRB-Level × Weight) + (DMO-Level × Weight)
  → Round down to nearest integer

STEP 3: CAP BY LOWEST
  → Final EHB-STL CANNOT exceed lowest sub-level by more than +1
  → This prevents one strong area from masking a weak area
```

### 88.2 — Formula Example

```
User has:
  PSS = L8 (strong identity)
  CRB = L5 (average physical)
  DMO = L7 (good behavior)

STEP 1: Check thresholds → all meet minimum? YES
STEP 2: Weighted = (8 × 40%) + (5 × 35%) + (7 × 25%) = 3.2 + 1.75 + 1.75 = 6.7 → L6
STEP 3: Lowest = CRB L5 → Max allowed = L5 + 1 = L6
FINAL EHB-STL = L6 ✓ (within cap)

Another example:
  PSS = L9, CRB = L3, DMO = L8
STEP 2: Weighted = (9×40%) + (3×35%) + (8×25%) = 3.6 + 1.05 + 2.0 = 6.65 → L6
STEP 3: Lowest = CRB L3 → Max allowed = L3 + 1 = L4
FINAL EHB-STL = L4 ← CAPPED! CRB is the bottleneck
```

### 88.3 — Why HYBRID is Best

```
vs MIN Rule: Not too strict — allows growth even if one area is slightly behind
vs Pure Average: Not too lenient — one weak area still limits the final score
HYBRID = Best of both worlds:
  ✅ Rewards balanced growth across all 3 dimensions
  ✅ Prevents any single dimension from being ignored
  ✅ Still allows +1 grace so users aren't permanently stuck
  ✅ Makes fraud nearly impossible (must fake 3 independent systems)
```

### 88.4 — Minimum Thresholds Per EHB-STL Level

| Target EHB-STL | Min PSS | Min CRB | Min DMO |
|----------------|---------|---------|---------|
| L1 (FREE) | PSS-L1 | CRB-L1 | DMO-L1 |
| L2 (BASIC) | PSS-L2 | CRB-L1 | DMO-L2 |
| L3 (NORMAL) | PSS-L3 | CRB-L1 | DMO-L3 |
| L4 (STANDARD) | PSS-L4 | CRB-L3 | DMO-L4 |
| L5 (ADVANCED) | PSS-L5 | CRB-L5 | DMO-L5 |
| L6 (HIGH) | PSS-L6 | CRB-L5 | DMO-L6 |
| L7 (PRO) | PSS-L7 | CRB-L7 | DMO-L7 |
| L8 (VIP) | PSS-L8 | CRB-L8 | DMO-L8 |
| L9 (ELITE) | PSS-L9 | CRB-L9 | DMO-L9 |
| L10 (SUPREME) | PSS-L10 | CRB-L10 | DMO-L10 |

---

## §89 — Role-Based STL Formula (FINAL LOCKED)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0
> Different user roles use different components for their STL calculation.

### 89.1 — Formula Per Role

```
👤 BUYER:
   EHB-STL = f(PSS-Level, DMO-Level)
   CRB not required (buyers don't get inspected)
   Wallet = optional multiplier (lock EHBGC for boost)

🏪 SELLER:
   EHB-STL = f(PSS-Level, CRB-Level, DMO-Level)
   All 3 dimensions required
   Wallet = multiplier for service providers only

🛠️ SERVICE PROVIDER (electrician, doctor, lawyer, etc.):
   EHB-STL = f(PSS-Level, CRB-Level, DMO-Level, Wallet-Lock)
   Wallet lock MANDATORY (L3=100, L5=700, L7=3K, L10=30K EHBGC)
   Strictest formula — highest trust required

🏍️ RIDER:
   EHB-STL = f(PSS-Level, DMO-Level, RPS)
   RPS = Rider Performance Score (0-100)
   CRB not standard (vehicle check only)

🕵️ INSPECTOR:
   EHB-STL = f(PSS-Level, CRB-Level, DMO-Level, IPS)
   IPS = Inspector Performance Score (0-100)
   Must be highest trust — they verify others

🏢 FRANCHISE OWNER:
   EHB-STL = f(PSS-Level, CRB-Level, DMO-Level, Wallet-Lock, Performance)
   ALL dimensions + massive wallet lock + territory performance
   Sub=50K, Master=200K, Corporate=500K, Country=1M EHBGC lock

👨‍💼 ADMIN/DMO OPERATOR:
   EHB-STL = f(PSS-Level, DMO-Level)
   Must be L8+ to operate DMO
   Internal hire, highest security
```

### 89.2 — Wallet as Multiplier

```
Wallet Lock Impact:
  No lock → base score only
  Small lock → +5% trust boost
  Medium lock → +10% trust boost
  High lock → +15% trust boost
  Maximum lock → +20% trust boost

Wallet does NOT create a separate level — it MULTIPLIES the combined score.
Think of it as: "How much skin in the game do you have?"
```

### 89.3 — Complete Trust Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   EHB-STL-LEVEL (Final)                  │
│              L1 ──── L5 ──── L8 ──── L10                │
└───────────────────────┬─────────────────────────────────┘
                        │
            ┌───────────┼───────────┐
            │           │           │
     ┌──────▼──────┐ ┌──▼────┐ ┌───▼──────┐
     │  PSS Level  │ │ CRB   │ │  DMO     │
     │  (Identity) │ │Level  │ │ Level    │
     │  L1 → L10   │ │(Phys.)│ │(Behavior)│
     │             │ │L1→L10 │ │ L1→L10   │
     └──────┬──────┘ └──┬────┘ └───┬──────┘
            │           │          │
     27 PSS Features  Inspector   7 Engines
     ID,Face,AML...  Visit+Check  Decision,Risk,
                     Pass/Fail    Trust,Compliance,
                                  Finance,Ops,Analytics
                        │
                 ┌──────▼──────┐
                 │   WALLET    │
                 │ (Multiplier)│
                 │  Lock EHBGC │
                 └─────────────┘
```

---

## §90 — Complete User Flows — Page-by-Page (All 7 Types)

> Added: 2026-04-14 | Source: Founder confirmed directly | Version: v4.0

### 90.1 — Buyer Flow (12 Steps)

```
Step 1:  Landing Page → Categories, Featured, Search, Login/Register
Step 2:  Register (JPS) → Name, Phone, OTP → Profile auto-create, Affiliate link auto-generate, BSTL=L1
Step 3:  Home Dashboard → AI recommendations, Nearby sellers, Trending products
Step 4:  Product Listing → Card: Image, Name, Price, Rating⭐, Badge🏅, Delivery time
Step 5:  Product Detail → Images, Description, Seller badge, Reviews, Return policy, Delivery time
Step 6:  Cart → Products list, Total price, Delivery fee
Step 7:  Order Placement → Address → Payment (Wallet/COD) → Confirm
Step 8:  Order Tracking → Live map, Rider details, Time
Step 9:  Delivery → OTP confirm, Receive
Step 10: Review → Rating⭐, Feedback text
Step 11: Complaint (optional) → Upload proof, Submit → AI → Franchise → DMO
Step 12: Loyalty + Affiliate → Cashback, Earnings from referrals
```

### 90.2 — Seller Flow (9 Steps)

```
Step 1: Register (JPS) → Select seller role
Step 2: PSS Verification → CNIC, Face, Address
Step 3: Add Product → Name, Category, Price, Images
Step 4: Product Live → STL calculate, Visible in marketplace
Step 5: Receive Order → Notification, Accept/Reject
Step 6: Prepare Order → Pack, Ready for delivery
Step 7: Delivery → Assign rider (or self), Track
Step 8: Payment Release → Escrow → Wallet (after 24h soft + 7d full)
Step 9: Growth → Reviews ↑, STL ↑, expand products
```

### 90.3 — Rider Flow (6 Steps)

```
Step 1: Signup → Verify (PSS) → Zone assign
Step 2: Accept order (60 seconds to respond)
Step 3: Pickup → Navigate to seller, photo + pickup code
Step 4: Deliver → Navigate to buyer, OTP/photo confirm
Step 5: COD Handle → Cash collect, deposit within 24h
Step 6: Earn → Base + distance + peak bonus + COD fee
```

### 90.4 — Franchise Owner Flow (6 Steps)

```
Step 1: Buy → EHBGC lock, contract sign
Step 2: Setup → Territory boundaries, team assign
Step 3: Manage Dashboard → Orders, Sellers, Riders, Complaints (7 tabs)
Step 4: Daily Work → Login → Alerts → Orders → Issues → Reports
Step 5: Handle Issues → Delayed orders, complaints, seller problems
Step 6: Earn → Revenue share from all transactions in territory
```

### 90.5 — Inspector Flow (6 Steps)

```
Step 1: Apply → JPS, screening, PSS verify
Step 2: Train → 3-5 days, 7 modules, pass assessment ≥70%
Step 3: Assign → Zone, rotation (anti-corruption), category match
Step 4: Inspect → Checklist, GPS+Photos+Video, on-site 10-30 min
Step 5: Report → Pass/Conditional/Fail, submit in-app
Step 6: Earn → 300-800 PKR per inspection, T+1 payout
```

### 90.6 — Employer Flow (JPS — 4 Steps)

```
Step 1: Register → Company profile, PSS verify
Step 2: Post Job → Title, requirements, salary, STL minimum
Step 3: Hire → Review applications (AI match score), interview, offer
Step 4: Pay → Contract, 6-month cycles, wallet-based payment
```

### 90.7 — Job Seeker Flow (JPS — 4 Steps)

```
Step 1: Profile → Skills, education, experience, certifications (CRB verified)
Step 2: Apply → Browse jobs, AI recommendations, submit application
Step 3: Interview → Schedule, attend, feedback
Step 4: Job → Accept offer, contract, start working
```

### 90.8 — Master System View

```
ALL Users enter through → JPS (profile creation)
  ↓
ALL Actions monitored by → DMO (governance)
  ↓
ALL Trust scored by → PSS (identity) + CRB (physical)
  ↓
ALL Decisions made by → DMO Decision Engine
  ↓
FINAL TRUST = EHB-STL-LEVEL (3-dimensional)
```

---

## §91 — Cross-System Integration Reference (User Flows)

> Added: 2026-04-14 | Source: Comprehensive flow analysis | Version: v4.1

**Reference file:** `ehb-info/USER-FLOWS-COMPLETE.md` (dedicated user flow document)

### 91.1 — Every Action Touches 3 Systems

Every user action on EHB touches GoSellr (marketplace), DMO (governance), and Franchise (territory) simultaneously. The trust engine (PSS+CRB+DMO → HYBRID → STL) gates every feature.

### 91.2 — Key Integration Points

| Integration | Flow Direction | What Happens |
|-------------|---------------|-------------|
| Order → DMO | GoSellr → DMO Decision Engine | Every order validated by DMO before processing |
| Order → Franchise | GoSellr → Franchise Dashboard | Every order visible in territory franchise dashboard |
| Complaint → Franchise → DMO | GoSellr → AI → Franchise → DMO Central | 4-layer complaint resolution |
| Payment → Escrow → Split | Wallet → DMO Finance → Franchise Revenue | 50/30/15/3/2 split on every transaction |
| STL Change → Feature Gate | Trust Engine → GoSellr | STL recalc triggers feature lock/unlock |
| Inspection → CRB → STL | Inspector → CRB Report → DMO → STL | Physical inspection directly affects STL via HYBRID cap |

### 91.3 — Data Flow Direction

```
All data enters through → JPS (user identity)
All actions monitored by → DMO (7 engines simultaneously)
All trust scored by → HYBRID formula (PSS+CRB+DMO)
All territory managed by → Franchise hierarchy (Country→Corporate→Master→Sub)
All transactions through → Wallet (escrow + split)
All disputes through → AI → Franchise → DMO Central → Senior DMO
```

---

---

## §92 — Continuous Education Policy, Refilling, Rating & Rule Number

> Added: 2026-04-14 | Source: Founder direction | Version: v4.2

### 92.1 — EHB Continuous Education Policy (CEP)

EHB Technologies mandates that **every service provider, seller, franchise owner, inspector, and rider** must maintain continuous education in their field. This is NOT optional — it is a **core trust requirement** that directly impacts STL.

**Core Rules:**

1. **Book Admission (Mandatory):** Every non-buyer user must maintain active enrollment in at least 2 courses/books related to their registered field at all times.
2. **6-Month Exam Cycle:** Every 6 months, EHB conducts field-specific examinations. Users MUST take these exams to maintain their STL level.
3. **Exam Grading System:**
   - **A+ (90-100%)** — Exceptional. STL boost: +0.5 level potential
   - **A (80-89%)** — Strong. STL maintained fully
   - **B+ (70-79%)** — Acceptable. STL maintained
   - **B (60-69%)** — Warning zone. STL frozen (no upgrades until next exam)
   - **C (50-59%)** — Failing. STL drops by 1 level
   - **F (<50%)** — Critical fail. STL drops by 2 levels + account review by DMO
   - **No Show** — Absent without approved reason → STL frozen + DMO flag

4. **Exam History Display:** Card shows `{count}x {lastGrade}` — e.g. "5x A+" means user has taken 5 exams total, and their most recent result was A+.

5. **Buyer Exception:** Buyers are NOT required to take exams (they are consumers, not service providers). Their exam field shows "N/A".

6. **Why This Matters:** EHB ensures every professional on the platform stays current in their field. A doctor who hasn't studied new medical advances in 3 years is a risk. A seller who doesn't understand product safety standards is a risk. Continuous education eliminates these risks.

### 92.2 — Refilling (Re-verification) System

**Definition:** "Refilling" is when a user goes through the verification process again — either voluntarily (to upgrade STL) or mandatorily (periodic re-check).

**Refilling Triggers:**

| Trigger | Type | Frequency |
|---------|------|-----------|
| PSS KYC renewal | Mandatory | Every 12 months |
| CRB physical re-inspection | Mandatory | Every 6 months (sellers), 12 months (others) |
| DMO behavioral review | Automatic | Continuous (every 90 days snapshot) |
| Voluntary upgrade | Voluntary | Anytime user wants to improve their level |
| After STL drop | Mandatory | Must re-verify within 30 days of any drop |
| After complaint resolved | Conditional | If complaint resulted in STL reduction |

**Refilling Count Display:** Card shows `{count}x` — e.g. "3x" means user has been through 3 refilling cycles. **Higher refilling count = MORE trusted** (they've been verified multiple times).

**Refilling Impact on STL:**
- Each successful refilling strengthens the user's trust profile
- Failed refilling (found discrepancies) → immediate STL drop + DMO review
- Voluntary refilling before deadline → small STL boost (+0.2)

### 92.3 — Rating System

**5-Star Rating** displayed on every user card. Sources:

| User Type | Who Rates Them | What Gets Rated |
|-----------|---------------|-----------------|
| Seller | Buyers + Inspectors | Product quality, delivery speed, communication |
| Buyer | Sellers | Payment reliability, communication, returns honesty |
| Rider | Buyers + Sellers | Speed, handling, professionalism |
| Inspector | DMO + Sellers | Accuracy, fairness, professionalism |
| Franchise | DMO Central + Users in territory | Territory management, dispute resolution |
| Service Provider | Clients + CRB | Service quality, professionalism, compliance |

**Rating ↔ STL Interaction:**
- Rating < 3.0 → DMO auto-investigation, STL frozen
- Rating < 2.0 → Account suspended pending review
- Rating > 4.5 → Eligible for accelerated STL upgrade
- Rating is a FACTOR in DMO's behavioral scoring (contributes to DMO level)

### 92.4 — Rule Number (EHB Registration ID)

**Format:** `EHB-{4-digit unique number}`

Every registered user on EHB gets a permanent **Rule Number** (also called EHB ID). This is:
- Assigned at JPS registration (auto-generated, sequential)
- Permanent — never changes even if account is suspended/reactivated
- Displayed on all cards, invoices, inspection reports, and certificates
- Used as reference in all DMO proceedings, disputes, and communications
- Format: `EHB-0001` through `EHB-9999` (Phase 1), expandable to `EHB-XXXXXX` in Phase 2

### 92.5 — Overall Trust Level Word Scale

The top of every STL card shows the **overall trust level** as a human-readable word with a progress bar. This gives an instant visual summary — users don't need to understand L1-L10 numbers.

| STL Range | Trust Word | Color | Bar Fill | Meaning |
|-----------|-----------|-------|----------|---------|
| L1 | **Weak** | Red (#F05858) | 10% | New/unverified — limited access |
| L2 | **Basic** | Amber (#F0A030) | 20% | Minimum verification done |
| L3-L4 | **Moderate** | Blue (#29ABE2) | 30-40% | Growing trust — standard access |
| L5-L6 | **Trusted** | Teal (#2BBFA0) | 50-60% | Solid trust — most features unlocked |
| L7 | **Strong** | Purple (#A098F8) | 70% | High trust — professional tier |
| L8-L9 | **Excellent** | Green (#38C878) | 80-90% | Elite trust — full platform access |
| L10 | **Supreme** | Gradient (Teal→Purple→Amber) | 100% | Maximum trust — VIP everything |

**Why words matter:** A regular user doesn't understand "L6 HIGH" — but they instantly understand "Trusted" with a green bar at 60%. This is EHB's way of making the complex 3D trust system simple for every user.

### 92.6 — STL Card Meta Fields Summary

Every EHB-STL-LEVEL card now displays these 4 meta fields:

| Field | Icon | Example | Meaning |
|-------|------|---------|---------|
| Rule # | 🆔 | EHB-7421 | User's permanent EHB registration number |
| Rating | ⭐ | ★★★★☆ 4.2 | 5-star rating from relevant raters |
| Refilling | 🔄 | 3x | Number of times verified/re-verified |
| Exam | 📝 | 5x A+ | Exam count + last exam grade (N/A for buyers) |

### 92.6 — Database Schema Additions

```typescript
// User model additions
interface UserMetaFields {
  ruleNumber: string;           // "EHB-7421" — auto-generated at registration
  rating: {
    average: number;            // 0.0 - 5.0
    totalRatings: number;       // total number of ratings received
    breakdown: {                // count per star
      star5: number;
      star4: number;
      star3: number;
      star2: number;
      star1: number;
    };
  };
  refilling: {
    count: number;              // total refilling cycles completed
    lastRefillDate: Date;
    nextRefillDue: Date;
    history: Array<{
      date: Date;
      type: 'PSS' | 'CRB' | 'DMO' | 'VOLUNTARY';
      result: 'PASS' | 'FAIL' | 'PARTIAL';
      stlImpact: number;       // +0.2, -1, etc.
    }>;
  };
  continuousEducation: {
    enrolledCourses: Array<{
      courseId: string;
      courseName: string;
      field: string;            // related to user's registered field
      enrollDate: Date;
      status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
    }>;
    exams: {
      totalTaken: number;       // e.g. 5
      lastExamDate: Date;
      lastExamGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'NO_SHOW';
      nextExamDue: Date;        // every 6 months
      history: Array<{
        examId: string;
        date: Date;
        field: string;
        score: number;          // 0-100
        grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'NO_SHOW';
        stlImpact: number;
      }>;
    };
    isExempt: boolean;          // true for Buyers
  };
}
```

### 92.7 — API Endpoints (New)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/user/:id/meta` | Get user's rule#, rating, refilling, exam info |
| POST | `/api/refilling/initiate/:userId` | Start a refilling cycle |
| GET | `/api/refilling/history/:userId` | Get refilling history |
| POST | `/api/exam/submit/:userId` | Submit exam result |
| GET | `/api/exam/history/:userId` | Get exam history |
| GET | `/api/exam/upcoming` | Get upcoming exams for current user |
| POST | `/api/rating/submit` | Submit a rating for a user |
| GET | `/api/rating/:userId` | Get user's rating breakdown |
| GET | `/api/education/courses/:userId` | Get enrolled courses |
| POST | `/api/education/enroll` | Enroll in a course |

---

## §93 — Employee & Job Seeker STL System (JPS Employment Trust)

> Added: 2026-04-14 | Source: Founder direction | Version: v4.3

### 93.1 — Overview

JPS (Job Profile & Skill) is not just for matching — it's also a **trust gateway for employment**. Every person who creates a JPS profile and gets employed has their own STL card. There are 4 distinct employment statuses:

| Status | Description | STL Card Type |
|--------|-------------|---------------|
| **Job Seeker** | Profile created, actively looking, not yet hired | Basic card — limited trust |
| **EHB Employee** | Hired by EHB Technologies directly | Premium card — highest internal trust |
| **Franchise Employee** | Hired by a franchise office via JPS | Franchise-linked card — trust tied to franchise owner |
| **Open Market Employee** | Hired by an external company registered on EHB | External card — trust depends on employer's STL |

### 93.2 — Job Seeker STL Rules

A job seeker has just created their JPS profile. They are NOT employed yet.

**What they have:**
- JPS Profile (skills, resume, education, experience)
- Basic PSS verification (email + phone minimum)
- JPS Score (AI-calculated match potential, 0-100)
- No CRB (they're not providing physical services yet)
- Minimal DMO history

**STL Calculation:** `JOB_SEEKER_STL = PSS × 55% + DMO × 45%` (CRB excluded)

**Max Achievable STL:** L4 (STANDARD) — cannot go higher without employment because no employer verification, no CRB, limited DMO.

**Card Shows:**
- Profile completeness, Resume upload status, Skill count, JPS Score
- Exam shows "Pending" (first exam after employment starts)

### 93.3 — EHB Employee STL Rules

Employees hired directly by EHB Technologies (Pvt.) Ltd. get the highest internal trust treatment.

**Why higher trust:**
- EHB verifies its own employees thoroughly (PSS L7+ mandatory at hiring)
- CRB physical verification done by company (office visit, document verification)
- DMO directly monitors (EHB has access to employee behavior data)
- Continuous education enforced by company HR

**STL Calculation:** `EHB_EMPLOYEE_STL = PSS × 35% + CRB × 30% + DMO × 25% + PERFORMANCE × 10%`

**Performance Score** (unique to EHB employees):
- Quarterly performance review (0-100)
- Code quality / task completion / team feedback
- Directly impacts STL

**Card Shows:**
- Company: "EHB Tech" badge (verified), Department, Join date
- Higher trust floor: Minimum L5 after probation (3 months)

### 93.4 — Franchise Employee STL Rules

Employees hired by a franchise office (via JPS job matching).

**Key rule — MIN chain applies:**
```
FRANCHISE_EMPLOYEE_STL = MIN(Employee's own STL, Franchise Owner STL)
```

If franchise owner's STL drops, ALL their employees' effective STL also drops. This incentivizes franchise owners to maintain their own trust.

**STL Calculation:** `OWN_STL = PSS × 40% + CRB × 30% + DMO × 30%`
Then: `EFFECTIVE_STL = MIN(OWN_STL, franchise_owner_stl)`

**Card Shows:**
- Franchise name + branch, Role/position, Owner's STL (visible — transparency)
- If owner STL is limiting: warning indicator "Limited by Franchise Owner STL"

### 93.5 — Open Market Employee STL Rules

Employees hired by external companies registered on EHB platform.

**Key rule — Employer STL matters:**
```
OPEN_MARKET_EMPLOYEE_STL = MIN(Employee's own STL, Employer Company STL)
```

**Important differences from EHB/Franchise employees:**
- External company's STL may be lower (they're not EHB-verified internally)
- CRB may be N/A (depending on job type — office worker vs field worker)
- Company itself needs to maintain its STL for employees to benefit

**STL Calculation:** `OWN_STL = PSS × 50% + DMO × 50%` (CRB optional based on job type)
Then: `EFFECTIVE_STL = MIN(OWN_STL, employer_company_stl)`

**Card Shows:**
- Company name, Role, Employer's STL (visible)
- If employer STL is low: warning "Your trust is limited by employer's STL"

### 93.6 — Employment STL Comparison Table

| Feature | Job Seeker | EHB Employee | Franchise Employee | Open Market |
|---------|-----------|-------------|-------------------|-------------|
| PSS Required | L2+ | L7+ | L5+ | L3+ |
| CRB Required | No | Yes (company) | Yes | Optional |
| DMO Active | Minimal | Full | Full | Moderate |
| Exam Required | After hiring | Every 6 months | Every 6 months | Every 6 months |
| MAX STL | L4 | L10 | Limited by owner | Limited by employer |
| Min STL (after probation) | L1 | L5 | L3 | L2 |
| Performance Score | JPS Score | Quarterly review | Franchise review | Employer review |
| Refilling Cycle | N/A | 12 months | 6 months | 12 months |

### 93.7 — Transition Flow

```
Job Seeker (L2) → Gets hired by EHB → EHB Employee (instant boost to L5+)
Job Seeker (L2) → Gets hired by Franchise → Franchise Employee (L3 floor)
Job Seeker (L2) → Gets hired by External → Open Market Employee (L2, grows with employer)
Employee leaves job → STL frozen for 30 days → Must find new job or drops to Job Seeker level
```

### 93.8 — Database Schema (Employment Extensions)

```typescript
interface EmploymentProfile {
  employmentStatus: 'JOB_SEEKER' | 'EHB_EMPLOYEE' | 'FRANCHISE_EMPLOYEE' | 'OPEN_MARKET';
  employer?: {
    companyId: string;
    companyName: string;
    companyStl: number;           // employer's current STL
    type: 'EHB' | 'FRANCHISE' | 'EXTERNAL';
    franchiseId?: string;         // if franchise employee
    department?: string;
    role: string;
    joinDate: Date;
    probationEnd?: Date;
  };
  jpsProfile: {
    jpsScore: number;             // 0-100 AI match score
    skills: string[];
    resumeUploaded: boolean;
    education: Array<{ degree: string; institution: string; year: number }>;
    experience: Array<{ company: string; role: string; duration: string }>;
    appliedJobs: number;
    interviewsCompleted: number;
  };
  performanceScore?: number;      // 0-100 (only for employed)
  effectiveStl: number;           // after MIN rule applied
  stlLimitedBy?: string;          // "FRANCHISE_OWNER" | "EMPLOYER" | null
}
```

### 93.9 — API Endpoints (Employment)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/jps/profile/:userId` | Get JPS profile with employment status |
| POST | `/api/jps/apply/:jobId` | Apply for a job |
| PUT | `/api/jps/employment/update` | Update employment status (hired/left) |
| GET | `/api/jps/employer-stl/:companyId` | Get employer's STL (for MIN rule) |
| GET | `/api/jps/employee-card/:userId` | Get complete employee STL card data |
| POST | `/api/jps/performance/submit` | Submit performance review score |

---

## §94 — Industry Card Types & GoSellr Product Card

> Added: 2026-04-14 | Source: Founder direction | Version: v4.4

### 94.1 — 7 Card Template Groups for 32 Industries

All 32 industries map to **7 card templates**. Same base STL card structure (Trust Level strip, ring badge, PSS/CRB/DMO bars, meta strip, quick buttons) but with industry-specific differences.

| Group | Template | Industries (Count) | Key Difference |
|-------|----------|-------------------|----------------|
| **A** | Product Seller | E-commerce, Food, Fashion, Beauty, Pets, Gaming (products), Automotive (parts), Technology (products) — **8** | Standard seller card. Only **category tags** and **CRB checklist** change. |
| **B** | Professional Service | Medical, Legal, Education, Finance, Consulting, Technology (services), Fitness — **7** | **License verification** via CRB, **Wallet Lock mandatory**, **Cases/Services** button, field exam mandatory. |
| **C** | Venue/Location | Real Estate, Hospitality, Construction, Entertainment (venues), Sports, Weddings, Events — **7** | **Location Verified** badge, **Property STL** (building CRB), **Capacity** indicator, CRB weight **45%** (heavy). |
| **D** | Digital Content | Media, Music, Gaming (content), Entertainment (digital) — **4** | **No CRB** (0% weight). PSS×55% + DMO×45%. Shows **Content count** + **Engagement** metric. |
| **E** | Logistics/Transport | Logistics, Travel (AGTS) — **2** | Same as Rider card. Logistics adds **Fleet Size** + **Route STL**. Travel adds **Destination Verified**. |
| **F** | B2B/Industrial | Manufacturing, Energy, Agriculture, Telecom — **4** | Company-level card. **Factory Inspection** (CRB 45%), **Supply Chain STL**, **Compliance Cert**. MIN = Product≤Factory≤Company≤Owner. |
| **G** | Government/NGO | Government, NGO — **2** | **Government License #**, **Govt Audit** (not regular CRB), **Min floor L5**, **Transparency Score**. |

**Total: 8+7+7+4+2+4+2 = 34 mappings for 32 industries** (some industries appear in 2 groups — e.g. Gaming has products AND content).

### 94.2 — HYBRID Formula Weight Variations by Group

| Group | PSS | CRB | DMO | Extra |
|-------|-----|-----|-----|-------|
| A: Sellers | 40% | 35% | 25% | — |
| B: Service | 40% | 35% | 25% | +License |
| C: Venue | 35% | **45%** | 20% | Building inspection |
| D: Digital | **55%** | **0%** | **45%** | No CRB |
| E: Logistics | **45%** | **0%** | **35%** | +RPS 20% |
| F: B2B | 40% | **45%** | 15% | Factory inspection |
| G: Govt | 35% | **40%** | 25% | Govt audit |

### 94.3 — GoSellr Product Card Structure

Every product listed on GoSellr has its own **Product STL Card**:

**Card Layout (visible before click):**
1. Product image with STL badge (top-right) and CRB Inspected tag (top-left)
2. Product name + price
3. **Guarantee Strip** — Money Back Guarantee time + Replacement time (or "Not Offered" if seller doesn't provide)
4. **PSS / CRB / DMO Trust Bars** — Seller's 3-dimensional trust levels shown as labeled progress bars with percentage fill
5. Seller strip (seller avatar, name, STL level, rating, refills)
6. Meta chips: Stock status, CRB status, Product rating, Warranty/Return
7. **MIN Rule Chain** visualization: Product STL ≥ Seller STL ≥ Company STL ≥ Owner STL → FINAL

**Guarantee Strip details:**
- 💰 **Money Back Guarantee** — Seller specifies number of days (e.g. "30 Days"). If not offered, shows "❌ Not Offered"
- 🔄 **Replacement** — Seller specifies replacement window (e.g. "15 Days"). If not offered, shows "❌ Not Offered"
- Both fields are **optional** — seller enters during product listing. Cards without either show red "Not Offered" chip
- Guarantee time directly affects **buyer trust perception** and is factored into product STL scoring

**PSS/CRB/DMO Bar details:**
- 3 horizontal bars showing seller's individual trust dimensions
- PSS bar: Identity verification level (L1-L10), color-coded by level range
- CRB bar: Physical inspection level (L1-L10), shows "N/A" if CRB not applicable (Digital Content group)
- DMO bar: Behavioral trust level (L1-L10)
- Bar fill percentage = (level ÷ 10) × 100
- Color scale: L1-3 Red (#F05858), L4-5 Amber (#F0A030), L6-7 Teal (#2BBFA0), L8-10 Purple (#7B6EF6)

**Click/Popup (full breakdown):**
1. **Trust Breakdown** — Full MIN rule with bottleneck indicator (which link is weakest)
2. **Product Details** — Category, Brand, Stock count, List date, CRB inspection date, Warranty, Return policy, Money Back Guarantee period, Replacement period
3. **Seller Trust Profile** — Full seller card inline (STL, rating, refills, exam grade, PSS/CRB/DMO levels)
4. **Product Reviews** — Rating chart, buyer reviews (each reviewer shows their own STL level)
5. **Delivery & Payment** — Delivery time, COD availability, Wallet payment, Escrow protection

### 94.4 — Product STL Calculation

```
PRODUCT_STL = MIN(
  product_own_stl,      // Based on category inspection + complaint rate
  seller_stl,           // Seller's 3D HYBRID STL
  company_stl,          // If seller has company registration
  owner_stl             // Owner's personal STL
)
```

**Product's own STL factors:**
- CRB inspection result (if applicable)
- Product complaint rate (returns/complaints ÷ orders)
- Product rating (buyer reviews)
- Category compliance (does it meet category requirements?)
- Listing completeness (photos, description, specs)
- **Money Back Guarantee offered** — products with guarantee get +0.5 STL bonus (max L10)
- **Replacement policy offered** — products with replacement get +0.3 STL bonus (max L10)

### 94.5 — Product Guarantee & Protection Schema

```javascript
// Product listing — guarantee fields
{
  money_back_guarantee: {
    offered: Boolean,         // true/false
    days: Number,             // e.g. 30 (only if offered=true)
    conditions: String,       // "Unused, original packaging"
    escrow_hold: Boolean      // true = payment held in escrow until guarantee period ends
  },
  replacement_policy: {
    offered: Boolean,         // true/false
    days: Number,             // e.g. 15 (only if offered=true)
    conditions: String,       // "Defective or damaged items only"
    free_shipping: Boolean    // true = seller pays return shipping
  },
  seller_trust_display: {
    pss_level: Number,        // 1-10 (from seller's PSS)
    crb_level: Number,        // 1-10 (from seller's CRB), null if N/A
    dmo_level: Number,        // 1-10 (from seller's DMO)
    show_on_card: Boolean     // always true for GoSellr products
  }
}
```

**API Endpoints (GoSellr Product Guarantee):**
1. `POST /api/products/:id/guarantee` — Seller sets guarantee/replacement terms
2. `GET /api/products/:id/guarantee` — Fetch guarantee info for product card
3. `PUT /api/products/:id/guarantee` — Update guarantee terms
4. `POST /api/products/:id/guarantee/claim` — Buyer initiates money-back or replacement claim
5. `GET /api/products/:id/trust-display` — Fetch seller PSS/CRB/DMO levels for card display

### 94.6 — Reference File

Visual demo of all industry card groups + GoSellr product card:
`ehb-info/EHB-INDUSTRY-CARDS-MAP.html`

---

## Changelog (Main)

| Date       | Author | Change |
|------------|--------|--------|
| 2026-04-11 | Claude | v1.0 — initial merge of `docs/EHB_CONTEXT.md`, `docs/development/EHB_DMO_PLAN.md`, `docs/architecture/dmo-master-architecture.md`, `docs/architecture/dmo-blueprint.md`, `docs/architecture/dmo-data-flow.md`, `docs/architecture/dmo-global-data-flow.md`, `docs/architecture/dmo-ai-decision-engine.md`, `docs/architecture/dmo-bank-level-security.md`, `docs/database/dmo-master-database.md`, `docs/ui-ux/dmo-admin-system.md`, `docs/flows/FLOW-P3-dmo-governance.md`, `docs/ehb-dmo-and-home-data-snapshot.md`, `docs/ehb-info/EHB_stl 0.md`, `CLAUDE.md`, `design-system/EHB-UIUX-SYSTEM.md` into one re-structured master file. Added §14 advanced planning suggestions. |
| 2026-04-11 | Claude | v1.1 — Batch-1 merge (see `departments/DMO.md §22`). §4.3 flagged STL 9↔10 contradiction + added master MIN rule `MIN(product, seller, company, owner)`. |
| 2026-04-11 | Claude | v1.2 — **Batch-2 merge** (13 uploaded `.md` files). §4.3 replaced with canonical 10-level ladder + coin lock minimums. §15 departments index expanded — 11 of 13 department files now live under `ehb-info/departments/` (DMO v1.2, STL/PSS/CRB/Wallet/Blockchain/GoSellr/Franchise/Finance/Affiliate/Industries each v1.0). Only JPS + AI Department remain pending. |
| 2026-04-12 | Claude | v2.1 — **Google Docs batch.** Added §18 Affiliate Program (15-level, 7 bonus types, wallet structure, fees), §19 Franchise Booking (rounds/phases/activation flow), §20 GoSellr Delivery Timer (5-30min, AI auto-complaint), §21 OLS Law Services (lawyer registration, 22 client limit, escrow), §22 Seller Types & Registration (5 types, stock management). Updated `uploaded-information.md` with PART 22 (9 uploaded .docx files + pasted Google Docs text). |
| 2026-04-12 | Claude | v2.0 — **MASTER PLAN Edition.** Collected ALL information from 7 folders (D:\EHB 1, D:\EHB, D:\ehb ui ux, Downloads\ehb .md file, Downloads\ehb-global-ai-marketplace, Downloads\ui design example, EHB DEVELOPMENT 2026 project). Added §16 Master Plan (company legal identity, big picture diagram, complete user journey, franchise flow, revenue model, GoSellr complete flows, trust-based economy, AI department, blockchain 3-phase plan, page map, role experiences, STL guarantees, data flow architecture, open questions). Added §17 naming legacy reference. Created `ehb-info/uploaded-information.md` with raw collected data. |

---

| 2026-04-12 | Claude | v2.2 — **ehb docs2 batch (43 files).** Added §24 EHB AD System (Web 3.0 verified advertising), §25 GoSellr 7-Level Supply Chain, §26 Blockchain 5-Phase Roadmap (detailed), §27 Industry Services (AGTS, EHB Tube, OBS, SOT), §28 STL Governance Deep Model (level up/down factors, complaint lock, CRB rotation), §29 50+ Industry Master List, §30 Complete Bonus Types (19+). Updated `uploaded-information.md` with PART 22 (ehb docs2 batch). |

---

| 2026-04-13 | Claude | v2.3 — **Industries Deep Dive.** Added §31 Complete Industries with Services & Microservices (50 industries + 14 shared platform microservices). Each industry includes core services list and specific microservices breakdown. Updated `uploaded-information.md` with PART 23 (same data). Naming convention applied: industries use "powered by EHB", departments use "EHB Department". |

---

| 2026-04-13 | Claude | v2.4 — **Business Logic Edition.** Added §32 Finance & Service Charges System (2% base charge, 50/30/15/3/2 franchise split, role-based charges, admin dynamic control, DMO finance flow). Added §33 Seller Flow (13-step complete flow from registration to growth, 7 seller types with pricing, PSS/CRB/wallet/STL integration, fraud control, 5 auto features). Added §34 Delivery System (4 delivery types, self-delivery 2× wallet rule, independent rider system, 3rd party API integration, smart routing, penalties, franchise multi-operator dashboard, auto reassign, AI monitoring, rider levels). Updated `uploaded-information.md` with PART 24. |

---

| 2026-04-13 | Claude | v2.5 — **Core Systems Edition.** Added §35 Escrow & Refund System (2-phase escrow, refund flow, fast release), §36 EHBGC Coin Value (fixed Phase 1, semi-floating Phase 2), §37 Minimum Order Values (industry-wise), §38 Buyer Flow (11-step complete), §39 Franchise Owner Flow (9-step complete with daily ops), §40 STL Level Requirements (exact L1-L10 table with PSS/CRB/wallet/activity/complaint requirements + upgrade blockers). Self delivery 2× wallet rule confirmed. Claude suggestions added for coin bands, delivery fee threshold, buyer trust score, franchise health score, STL decay/recovery. Updated `uploaded-information.md` with PART 25. |

---

| 2026-04-13 | Claude | v2.6 — **Enhancements Edition.** Added §41 Approved System Enhancements (6/6 Claude suggestions approved by founder with upgrades): EHBGC band limit (±5% → AI dynamic), Delivery fee threshold (Low Order Fee label), BSTL Buyer Trust Score (renamed from Buyer STL), Franchise Health Score (auto area expansion), STL Decay (3-stage: 30/60/90 day), STL Recovery Path (max restore = previous-1). Updated `uploaded-information.md` with PART 26. |

---

| 2026-04-13 | Claude | v2.7 — **Inspector Edition.** Added §42 Inspector Flow (17 sub-sections): JPS hiring, 3-5 day hybrid training (7 modules), CRB certification, wallet bond (1K-5K EHBGC), anti-corruption rotation algorithm, daily 5-15 inspection workflow with SLAs, category-based checklists, evidence requirements (GPS+photos+video), in-app report system (Pass/Conditional/Fail), CRB+DMO auto+human review, hybrid payment (300-800 PKR per inspection, T+1 payout), IPS performance score (0-100), penalties & fraud control, re-inspection schedule, edge cases, franchise inspector management. Updated `uploaded-information.md` with PART 27. |

---

| 2026-04-13 | Claude | v2.8 — **Trust & Earnings Edition.** Added §42.18 Inspector Enhancements (3/3 approved: tiered pay, specialization badges, dual-inspector). Added §43 Complaint & Dispute System (17 sub-sections: 9 complaint categories, AI auto-review, 12h seller window, DMO+CRB human review, 5 resolution types, strict SLAs ≤72h, 1-appeal process, BSTL complaint weighting, mediation mode). Added §44 Affiliate System (12 sub-sections: 19 bonus types in 3 phases, 10-level depth with STL-unlock, payout rules min 2K PKR, anti-fraud, admin control, STL multiplier, 4 smart improvements). Updated `uploaded-information.md` with PART 28. |

---

| 2026-04-13 | Claude | v2.9 — **Admin Panel Edition (SYSTEM COMPLETE).** Added §45 Admin Panel (18 sub-sections): 5-role permission system (Super Admin/Admin/Operator/Finance/Compliance), real-time dashboard, user management with STL override, finance control (all charges/splits adjustable), industry management (enable/disable/COD toggle), franchise management (approve/territory/health), STL global control, complaint control, affiliate control, notification system, 9 report types, fraud monitoring, system settings (EHBGC/language/currency), immutable audit trail, real-time control, 4 advanced features (simulation mode, AI assistant, kill switch, smart alerts). Updated `uploaded-information.md` with PART 29. **ALL CORE SYSTEMS NOW DEFINED: §1–§45.** |

---

| 2026-04-13 | Claude | v3.0 — **🔥 SYSTEM 100% COMPLETE.** Added §45.19 Admin Enhancements (2/2 approved: activity score, scheduled rules). Added §46 Notification System (buyer/seller/franchise/inspector notifications, 4 channels, smart rules). Added §47 COD System (controlled COD, eligibility rules, cash handling, fraud protection, limits). Added §48 Rider Flow (10 sub-sections: signup to growth, earnings model 100-300 PKR + bonuses, RPS score, zone system, penalties). Added §49 AI Department (5 modules: Helpline chatbot Urdu+English, Fraud Detection, Recommendation Engine, Delivery Optimization, Risk Scoring 0-100). 3-phase AI approach: rule-based → ML → deep learning. Updated `uploaded-information.md` with PART 30. **ALL 49 SECTIONS DEFINED — ZERO MISSING CORE SYSTEMS.** |

---

| 2026-04-13 | Claude | v3.1 — **Launch Readiness Edition.** Added §50 Multi-Language & Currency (Urdu+English Phase 1, multi-language Phase 2), §51 Marketing & Launch Strategy (3-phase), §52 Legal Documents (8 required agreements), §53 Company Structure (core leadership + 13 dept heads + Phase 1 team). 4 pending confirmations logged. Updated `uploaded-information.md` with PART 31. **53 SECTIONS TOTAL.** |

---

| 2026-04-13 | Claude | v3.2 — **PSS Deep Dive Edition.** Added §54 PSS Deep System — 27 verification & security features with full detail. PSS now DEEP. Updated `uploaded-information.md` with PART 32. **54 SECTIONS TOTAL.** |

---

| 2026-04-13 | Claude | v3.3 — **Global Trust Engine + Integration Edition.** Added §55-§60 (GTE architecture, 4 config decisions, PSS+DMO, PSS+CRB, 4-system integration, STL dynamic formula). **60 SECTIONS.** |

---

| 2026-04-14 | Claude | v3.4 — **Deep Systems + Confirmations Edition.** Added §61-§66 (DMO 7 engines, Franchise dashboard, Wallet deep, JPS deep, 4 confirmations locked, Language advanced). **66 SECTIONS.** |

---

| 2026-04-14 | Claude | v3.5 — **Economy + Categories Edition.** Added §67-§70 (fee model, EHBGC lock revised, product STL, GoSellr categories). **70 SECTIONS.** |

---

| 2026-04-14 | Claude | v3.6 — **Commercial + Policy + Blockchain Edition.** Added §71-§78 (return policy, STL fees, franchise tiers, rating/badges, loyalty, AD system, blockchain BSC-first). **78 SECTIONS.** |

---

| 2026-04-14 | Claude | v3.7 — **FINAL GAPS CLOSED Edition.** Added §79 Seasonal Rules Engine (Ramadan/Eid/Back-to-School/Black Friday + AI auto-detect by country). Added §80 Mobile App Architecture (React Native, FCM, 3 apps: Buyer+Seller+Rider, Phase 1 Android Pakistan). Added §81 Seller Premium Subscription (free default + optional premium for analytics/ranking, STL remains core — premium only boosts visibility). Added §82 Wallet Withdrawal Limits (Buyer 50K/500K, Seller 200K/2M, Franchise 500K/unlimited). Added §83 Customer Support System (4-tier: AI chatbot instant → Franchise ≤4h → Central ≤12h → DMO ≤24h, ticket system, Urdu+English). Updated `uploaded-information.md` with PART 40. **83 SECTIONS TOTAL — ALL GAPS CLOSED — 100% SPEC COMPLETE.** |

---

| 2026-04-14 | Claude | v4.0 — **🔥 MULTI-LAYER TRUST ARCHITECTURE Edition.** Added §84 Multi-Layer Trust Architecture (3-dimensional system: PSS L1-L10 + CRB L1-L10 + DMO L1-L10 → HYBRID → Final EHB-STL). Added §85 PSS Internal 10 Levels (Identity Trust: Email→Phone→CNIC→FaceMatch→Address→Liveness→DeviceBind→Video→ContinuousMonitor→FullVerified). Added §86 CRB Internal 10 Levels (Physical Trust: None→Basic→1Pass→2Passes→Verified→Rechecked→MultiCategory→DualInspector→ContinuousAudit→PremiumVerified). Added §87 DMO Internal 10 Levels (Behavioral Trust: New→Clean→Active→Verified→Trusted→Strong→HighCompliance→Elite→Premium→Supreme). Added §88 HYBRID Combination Formula (Threshold→Weighted PSS×40%+CRB×35%+DMO×25%→Cap by lowest+1, with wallet multiplier +5% to +20%). Added §89 Role-Based STL Formulas (7 roles: Buyer, Seller, ServiceProvider, Rider, Inspector, Franchise, Admin — each with different dimension weights). Added §90 Complete User Flows page-by-page (all 7 user types). Updated `uploaded-information.md` with PART 41. **90 SECTIONS — WORLD'S FIRST 3-DIMENSIONAL TRUST SYSTEM FULLY DEFINED.** |

---

| 2026-04-14 | Claude | v4.2 — **Continuous Education & Card Meta Edition.** Added §92 Continuous Education Policy (CEP) — mandatory 6-month exams for all non-buyer users, 2-course enrollment requirement, grading system A+ to F with STL impact. Added Refilling System (re-verification tracking, 6 trigger types, count displayed on card). Added Rating System (5-star, role-specific raters, STL interaction rules). Added Rule Number (EHB-XXXX permanent registration ID). Added STL Card Meta Fields (Rule#, Rating, Refilling, Exam on every card). Added database schema for new fields + 10 new API endpoints. **92 SECTIONS.** |

---

| 2026-04-14 | Claude | v4.3 — **Employee & Job Seeker Trust Edition.** Added §93 Employee & Job Seeker STL System (JPS Employment Trust) — 4 employment statuses (Job Seeker, EHB Employee, Franchise Employee, Open Market), each with distinct STL formula, MIN rule chains (employee STL limited by employer STL), transition flow (seeker→employed→left), JPS Score integration, performance score for employed users, database schema extensions, 6 new API endpoints. STL Card Component updated with 4 new cards (Job Seeker, EHB Employee, Franchise Staff, Open Market Employee). **93 SECTIONS.** |

---

| 2026-04-14 | Claude | v4.4 — **Industry Card Types & Product Card Edition.** Added §94 — mapped all 32 industries into 7 card template groups (A: Product Sellers ×8, B: Professional Service ×7, C: Venue/Location ×7, D: Digital Content ×4, E: Logistics ×2, F: B2B/Industrial ×4, G: Govt/NGO ×2). Each group has unique HYBRID formula weights (e.g. Venue CRB=45%, Digital CRB=0%). Added GoSellr Product Card with MIN rule chain visualization, click popup with trust breakdown, seller profile, reviews, delivery info. Created `EHB-INDUSTRY-CARDS-MAP.html` interactive demo with all groups + difference matrix table. **94 SECTIONS.** |

---

| 2026-04-14 | Claude | v4.5 — **Product Protection & Trust Display Edition.** Updated §94.3 GoSellr Product Card — added Guarantee Strip (Money Back Guarantee days + Replacement days), PSS/CRB/DMO Trust Bars (3 horizontal progress bars showing seller's 3D trust dimensions), color scale L1-3 Red / L4-5 Amber / L6-7 Teal / L8-10 Purple. Updated §94.4 — added guarantee/replacement as STL bonus factors (+0.5 and +0.3). Added §94.5 Product Guarantee & Protection Schema (database fields + 5 new API endpoints). Updated EHB-INDUSTRY-CARDS-MAP.html with live guarantee strips + PSS/CRB/DMO bars on all 3 product cards. **94 SECTIONS (expanded).** |

---

*EHB Technologies (Pvt.) Ltd. — master brief · v4.5 · 2026-04-14 · 100% SPECIFICATION COMPLETE — 94 Sections — Product Protection & Trust Display*
