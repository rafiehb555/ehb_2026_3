# EHB Development 2026

EHB Technologies (Pvt.) Ltd. — Global Super-App monorepo.

**Tagline:** One Platform. 38 Industries. 700+ Services. Infinite Trust.

> **Status:** Phase 1 in progress — DMO Demo + Franchise Model + AI Services Marketplace.
> See [`EHB-PHASE-1-DMO-FRANCHISE-AI.md`](./EHB-PHASE-1-DMO-FRANCHISE-AI.md) for the 12-week build plan.

## Quick Links

- [Master Plan](./EHB-MASTER-PLAN.md) — Consolidated master of all systems, departments, industries.
- [Phase 1 Plan](./EHB-PHASE-1-DMO-FRANCHISE-AI.md) — Current cycle build plan.
- [Agent Rules](./CLAUDE.md) — AI agent context and hard rules.
- [Project Pulse](./ehb-status.json) — Live status, top-5 priorities, blockers.
- [Canonical Specs](./ehb-info/) — Department, industry, and system specs (source of truth).

## Repository Layout

```
ehb_2026_3/
├── apps/
│   └── web/                Next.js 14 frontend (port 3000)
├── services/
│   ├── api/                Express + Mongoose REST API (port 5000)
│   └── ai/                 Express + OpenAI AI service (port 8080)
├── packages/
│   ├── types/              Shared TypeScript types
│   ├── config/             Shared config
│   ├── ui/                 Shared UI components
│   └── utils/              Shared utilities
├── data/
│   └── seeds/              Demo seed data (users, franchise pricing, industries)
├── ehb-info/               🔑 MASTER INFO HUB — canonical specs (read-only source of truth)
├── docs/                   Supporting documentation
├── design-system/          Living design system
└── backup/                 Safety backups (gitignored)
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- MongoDB 7 (local or MongoDB Atlas)
- An OpenAI API key (for Phase 1 AI Services Marketplace)

## Getting Started (Local Development)

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and fill in values
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_SECRET, OPENAI_API_KEY

# 3. Start MongoDB (if local)
# Option A: via Docker
docker run -d --name ehb-mongo -p 27017:27017 mongo:7
# Option B: use MongoDB Atlas free tier and update MONGODB_URI

# 4. Seed demo data
pnpm seed

# 5. Start all services (web + api + ai)
pnpm dev

# Or start individually
pnpm dev:web    # http://localhost:3000
pnpm dev:api    # http://localhost:5000
pnpm dev:ai     # http://localhost:8080
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start all services in watch mode |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Run `tsc --noEmit` across monorepo |
| `pnpm test` | Run all test suites |
| `pnpm test:stl` | Run 58 STL gold-master regression tests |
| `pnpm seed` | Seed demo data into MongoDB |

## Demo Routes (Phase 1)

Once services are running, these pages are live:

**Public**
- `/` — Landing with 3 pillar cards
- `/register` → `/pss` → `/dmo` — Full onboarding flow
- `/login` — Sign in (demo: `dmo.manager@ehb.com` / `ehbDmo2026` after seed)
- `/franchise` — 14-tier pricing matrix (Sub L1–L10 + OF1–OF4)
- `/franchise/apply?tier=sub&level=L1` — 4-step application wizard
- `/franchise/my` — Franchisee dashboard (demo data)
- `/franchise/calculator` — Interactive commission projector
- `/ai-marketplace` — 7-service AI storefront
- `/ai-marketplace/lawyer|diagnosis|tutor|resume|business|fraud|recommend` — Invoke any service

**DMO Workspace** (full iOS Classic + Diamond theme switcher)
- `/dmo` — Dashboard with 4 live KPIs + STL distribution bar chart
- `/dmo/stl` — Leaderboard + drill-in + MIN-chain validator
- `/dmo/approvals` — Franchise applications queue
- `/dmo/franchise` — All franchises list with filters
- `/dmo/franchise/[serial]` — Franchise detail (commission ledger, owner, application)
- `/dmo/ai-assistant` — AI invocation stats + flagged responses
- 13 more stub modules (pss, crb, up-guard, applications, wallet-control, earnings-engine,
  refill-management, complaints, activity-engine, task-system, analytics, blockchain-control,
  notifications, settings) — all routed, placeholder UI with scheduled wave

## Tech Stack

- **Frontend:** Next.js 14 App Router · TypeScript · Tailwind CSS · Plastic Coat Design System
- **API:** Node 20 · Express · Mongoose · JWT auth · Socket.IO
- **AI:** Node 20 · Express · OpenAI SDK (gpt-4 + gpt-3.5-turbo)
- **Database:** MongoDB 7
- **Build:** pnpm workspaces + Turborepo

## Language Policy

- **Conversation:** Roman Urdu + English bilingual
- **Code / commits / variable names / UI copy:** English only
- **Commit format:** `feat(module): summary`
  - Modules: `stl`, `dmo`, `pss`, `crb`, `jps`, `wallet`, `franchise`, `ai`, `web`, `api`, `infra`, `docs`

## Contributing

Before making changes:

1. Read [`CLAUDE.md`](./CLAUDE.md) for agent rules (applies to humans too).
2. Check [`ehb-status.json`](./ehb-status.json) for current week's priorities.
3. Review the canonical spec for your domain in [`ehb-info/departments/`](./ehb-info/departments/).
4. Back up any files you'll touch to `backup/<feature>-YYYY-MM-DD/`.

## License

UNLICENSED — Proprietary to EHB Technologies (Pvt.) Ltd.

## Contact

- **Founder/CEO:** Muhammad Rafi · ehb.rafi@gmail.com · +92 346 4385 703
- **HQ:** Creative Minds College, Main Simly Dam Road, Bharakahu, Islamabad 44000, Pakistan
