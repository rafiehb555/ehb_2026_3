# EHB TECHNOLOGIES — Claude Project Brief (Paste-Ready)

> Ye file Claude.ai project banatay waqt paste karnay ke liye hai.
> Do versions niche diye gaye hain:
> 1) **SHORT** — "What are you trying to achieve?" field mein paste karein
> 2) **LONG** — Project Knowledge files ke taur par upload karein

---

## 🟣 VERSION 1 — SHORT (Project Description Field ke liye)

```
EHB Technologies (SMC-Private) Limited — Pakistan-based tech company (UID 0179621,
founded 2008 by Muhammad Rafi, HQ Islamabad). Humara mission ek GLOBAL SUPER-APP
banana hai jo 32 industries ko ek hi platform pe unify karay — Education, Health,
Business ke 3 pillars ke under, AI + Polkadot blockchain trust backbone ke sath.

TAGLINE: "One Platform. 32 Industries. 700+ Services. Infinite Trust."

CORE 8 SYSTEMS:
1. PSS (Proof & Security System) — KYC/KYB, liveness, AML, fraud
2. CRB (Central Record Blockchain) — physical + legal verification, on-chain hash
3. STL (Service Trust Level) — L1–L10 ladder (FREE→SUPREME), formula = MIN(score, lock, pss, crb, dmo)
4. DMO (Decentralized Management Office) — central governance brain
5. JPS (Job Profile & Skill) — AI-powered job/skill matching
6. Wallet / EHBGC — multi-currency, escrow, 40/25/20/15 revenue split
7. AI Department — AI Lawyer, Diagnosis, Tutor, Resume Builder, Business Advisor, Fraud Detector
8. Blockchain — Polkadot-based, immutable hashes for certificates & STL milestones

PHASE-1 INDUSTRIES (6): GoSellr (E-commerce), OLS (Legal), WMS (Medical),
HPS/OBS (Education), JPS (Jobs), AGTS (Travel).
PHASE-2/3 QUEUE (26): Finance, Real Estate, Hospitality, Automotive, Agriculture,
Construction, Consulting, Energy, Technology, Telecom, Media, Entertainment,
Fashion, Beauty, Fitness, Logistics, Manufacturing, Government, NGO, Sports,
Music, Gaming, Food, Pets, Weddings, Events.

FRANCHISE MODEL: Global → Country → Corporate → Sub (4 tiers).
REVENUE SPLIT: 40% provider / 25% sub / 20% corporate / 15% country.
TARGET SCALE: 1M+ users, $500M+ economic volume, 50+ countries.

TECH STACK:
- Frontend: Next.js 14 App Router + TypeScript + Tailwind + Prisma (port 3000)
- API: Node 20 + Express + Mongoose ESM (port 5000)
- AI Backend: Node 20 + Express + OpenAI CommonJS (port 8080)
- DB: MongoDB 7 (ports 27017); future: PostgreSQL, Redis, Kafka, Polkadot
- Monorepo: apps/web, services/api/stl-replit, services/ai, packages/*, infrastructure/scripts, data/ehb-data, docs/, design-system/, ehb-info/

DESIGN SYSTEM (non-negotiable, dark glassmorphism):
- BG #0C0E1A / Card #13162A / Nested #1A1D33
- Purple #7B6EF6 (primary), Teal #2BBFA0, Amber #F0A030, Red #F05858, Green #38C878
- Font: DM Sans; Radius 12 cards / 8 inputs / 5–6 chips
- Border: 1px rgba(255,255,255,0.08)
- Auto-upgrade rule: never ship "basic" UI — always glass card + icon + chip + motion + drill-in drawer

LANGUAGE POLICY:
- Conversation: Roman Urdu + English (bilingual)
- Code / commits / UI copy: English only
- Commit format: feat(module): summary; modules: stl, dmo, pss, crb, jps, wallet, franchise, ai, web, api, infra, docs

HARD RULES FOR AGENTS:
1. STL formula protected by 58 gold-master tests — npm run test:stl → 58/0 non-negotiable
2. Backup before destructive change → backup/<name>-YYYY-MM-DD/
3. Lowercase filenames for components (card.tsx not Card.tsx)
4. Never commit .env; use .env.example
5. Never process.exit(1) on optional deps (Mongo, API keys)
6. Auto-apply renames: SQL→STL, EDR→CRB (except MySQL/PostgreSQL/etc.)
7. Read ehb-status.json at session start for real-time pulse
8. Read design-system/EHB-UIUX-SYSTEM.md + ai-behavior.md before any UI work

CURRENT BLOCKERS:
🔴 Wallet escrow not wired to all booking flows
🔴 AI recommend not wired to marketplace listings
🟡 STL per-industry calibration pending
🟡 CRB blockchain hash pending Polkadot contract

FOUNDER: Muhammad Rafi | MD: Mohammad Tufail
CONTACT: ehb.rafi@gmail.com, +92 346 4385 703
HQ: Creative Minds College, Main Simly Dam Road, Bharakahu, Islamabad 44000, Pakistan
```

---

## 🟣 VERSION 2 — LONG (Project Knowledge Files ke liye Upload karein)

Claude project banane ke baad, "Project knowledge" section mein ye files upload karein
(taake Claude har chat mein in ka full context recall kar sake):

1. **`ehb-info/EHB-MASTER-INFO.md`** ← primary brain (264 KB, full spec)
2. **`ehb-info/EHB-MASTER-DEVELOPMENT-PLAN.md`** ← roadmap
3. **`ehb-info/uploaded-information.md`** ← raw collected data
4. **`CLAUDE.md`** (repo root) ← agent rules
5. **`EHB-FOLDER-FLOW-MASTER.md`** (repo root) ← folder architecture contract
6. **`design-system/EHB-UIUX-SYSTEM.md`** ← UI tokens + patterns
7. **`design-system/ai-behavior.md`** ← AI design thinking rules
8. **`ehb-status.json`** (repo root) ← real-time project pulse
9. **`ehb-info/USER-FLOWS-COMPLETE.md`** ← user journeys
10. **`ehb-info/DMO-DEVELOPMENT-PHASES.md`** ← DMO phases

Individual department deep-dives (optional, upload per need):
- `ehb-info/departments/DMO.md` (v1.2)
- `ehb-info/departments/STL.md`, `PSS.md`, `CRB.md`
- `ehb-info/departments/Wallet.md`, `Blockchain.md`
- `ehb-info/departments/GoSellr.md`, `Franchise.md`
- `ehb-info/departments/Finance.md`, `Affiliate.md`, `Industries.md`

---

## 🟣 HOW TO USE

**Step 1:** Claude.ai pe project banayein — naam `EHB TECHNOLOGIES LIMITED` (already filled).

**Step 2:** "What are you trying to achieve?" field mein upar di gayi **SHORT** version paste kar dein (triple-backtick block ke beech ka text).

**Step 3:** Project create hone ke baad, "Project knowledge" → "Add files" pe click karein aur VERSION 2 ki files upload karein. **Minimum 4 files zaroor upload karein:**
- EHB-MASTER-INFO.md
- CLAUDE.md
- design-system/EHB-UIUX-SYSTEM.md
- ehb-status.json

**Step 4:** Pehli chat mein likhein:
> "Aap EHB Technologies ke official AI agent hain. Har response se pehle project knowledge files read karein, Roman Urdu + English bilingual reply karein, aur design system + agent rules ka strict follow karein."

Bas — project ab fully EHB-aware hai.
