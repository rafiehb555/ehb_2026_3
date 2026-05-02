# 🚀 START HERE — EHB Developer Onboarding

> **For new developers joining EHB Technologies (Pvt.) Ltd.**
> Read this file FIRST. Everything else can wait.

---

## ⏱ 5-Minute Setup

```bash
# 1. Clone + install
git clone <repo-url> ehb_2026_3
cd ehb_2026_3
pnpm install

# 2. Environment
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, OPENAI_API_KEY (optional)

# 3. Start everything
pnpm dev          # Runs web (3000) + api (5000) + ai (8080)

# 4. Verify
curl http://localhost:5000/health   # API alive
open http://localhost:3000          # Web app
```

If `pnpm dev` works → **you're done with setup**.

---

## 📖 Read In This Order (30 minutes)

| # | File | Why |
|---|------|-----|
| 1 | `CLAUDE.md` | Project rules + tech stack + STL formula |
| 2 | `ehb-info/0-index/COMPLETE-SUMMARY.md` | What got built, where it lives |
| 3 | `ehb-info/_settings/EHB-CORE-ENGINE.md` | Single AI / Wallet / Blockchain pattern |
| 4 | `ehb-info/_settings/SOURCE-OF-TRUTH.md` | Which file owns which topic |
| 5 | `ehb-info/5-specs/FLOW-SCHEMA-V2.json` | Executable workflow schema |

**That's it.** The rest of `ehb-info/` is reference — read on demand.

---

## 🏗 What You're Building

EHB = **One platform. 38 industries. 700+ services.**

The whole system runs on **5 shared engines** (NOT 38 separate apps):

```
        ┌───────────────────────────────────────────────────┐
        │   1. CORE AI       (one brain — services/ai)      │
        │   2. CORE WALLET   (one money layer — adapter)    │
        │   3. CORE CHAIN    (one audit layer — adapter)    │
        │   4. DMO DASHBOARD (one ops view — apps/web/dmo)  │
        │   5. STL ENGINE    (one trust score — services)   │
        └───────────────────────────────────────────────────┘
                          ▲
                          │  industry = config (JSON), NOT a fork
                          │
        ┌─────────────────┴─────────────────┐
        │   38 industries plug in via:      │
        │   industry_multiplier × min_stl    │
        └────────────────────────────────────┘
```

If you ever feel like "let me build a separate service for industry X" → **STOP**.
Read `EHB-CORE-ENGINE.md`. Industry is config, not code.

---

## 🗂 Repo Layout

```
ehb_2026_3/
├── apps/
│   └── web/                    # Next.js 14 frontend (port 3000)
│       ├── app/                # App Router pages
│       └── lib/canonical/      # ⭐ Imports FLOW-SCHEMA.json
├── services/
│   ├── api/                    # Node + Express + Mongoose (port 5000)
│   │   └── src/
│   │       ├── adapters/       # ⭐ Wallet + Blockchain (swap-ready)
│   │       ├── middleware/     # auth.js, stlGate.js
│   │       ├── models/         # ⭐ Mongoose schemas (User, Order, ...)
│   │       └── services/       # stlService, eventEngine, eventQueue
│   └── ai/                     # OpenAI bridge (port 8080)
├── ehb-info/                   # 📚 Domain docs (READ-ONLY for code)
│   ├── 0-index/
│   ├── 1-master/
│   ├── 5-specs/                # ⭐ FLOW-SCHEMA-V2.json (canonical)
│   ├── 11-franchise/
│   └── _settings/              # SOURCE-OF-TRUTH, ENFORCEMENT-RULES
├── scripts/                    # check-duplication, validate-references
├── ehb-status.json             # Real-time project pulse
├── CLAUDE.md                   # AI agent rules
└── START-HERE.md               # 👈 You are here
```

---

## 🧪 First Task — Run The Tests

```bash
# Revenue distribution (8 tests)
pnpm test revenueFlow

# STL formula (58 gold-master tests — DO NOT modify stlService.js without these)
pnpm test stl

# Duplication scan (CI gate)
node scripts/check-duplication.mjs
```

Green = ready to ship. Red = read the failure, fix the smallest unit, re-run.

---

## ⚖️ Hard Rules (Memorize These)

1. **Never** edit `services/api/src/services/stlService.js` without re-running all 58 STL tests.
2. **Never** hardcode an STL lock value — read from `FLOW-SCHEMA-V2.json` `stl_lock_ladder`.
3. **Never** call wallet/chain libraries directly — go through `adapters/wallet/` and `adapters/blockchain/`.
4. **Never** add a new industry as code — add it to `industry_multipliers` + `min_stl_per_industry` in the schema.
5. **Never** commit `.env`. Use `.env.example`.
6. **Never** `process.exit(1)` on optional deps (Mongo, OpenAI) — degrade gracefully.

---

## 🔑 Most Important Files

| File | What Lives There |
|------|------------------|
| `ehb-info/5-specs/FLOW-SCHEMA-V2.json` | Single source of truth — events, steps, retries, rollbacks |
| `services/api/src/services/stlService.js` | STL formula (PROTECTED — 58 tests) |
| `services/api/src/adapters/wallet/walletAdapter.js` | Wallet interface — swap in-memory → Stripe → Polkadot |
| `services/api/src/adapters/blockchain/blockchainAdapter.js` | Chain interface — swap mock → real Polkadot |
| `services/api/src/services/eventQueue.js` | Async retry + dead-letter queue |
| `services/api/src/models/index.js` | All Mongoose schemas |
| `services/api/src/middleware/auth.js` | JWT auth + password hashing + API keys |
| `services/api/src/middleware/stlGate.js` | Route-level STL access control |

---

## 🆘 If You Get Stuck

| Symptom | Try This |
|---------|----------|
| "Where does X live?" | `ehb-info/_settings/SOURCE-OF-TRUTH.md` |
| "What's the STL formula?" | `CLAUDE.md` § 6 |
| "How does franchise revenue split?" | `ehb-info/11-franchise/FRANCHISE-REVENUE-FLOW.md` |
| "What are the 38 industries?" | `ehb-info/3-departments/industries/` |
| "Is this duplicated?" | `node scripts/check-duplication.mjs` |
| Still stuck | Ask in `#ehb-dev` Slack, tag `@founder` |

---

## ✅ Definition of "Onboarded"

You can answer **yes** to all of these:

- [ ] `pnpm dev` runs without errors
- [ ] `pnpm test` passes (revenue + STL)
- [ ] You know what `FLOW-SCHEMA-V2.json` is for
- [ ] You can name the 5 core engines (AI, Wallet, Chain, DMO, STL)
- [ ] You know why industry = config, not code
- [ ] You read `CLAUDE.md` end-to-end

Hit all six → **you're ready to ship**. Pick a ticket from `ehb-status.json` priorities.

---

## 📜 Commit Style

```
feat(stl): add L7 lock validation to gate middleware

- Reads min_lock from FLOW-SCHEMA-V2.json
- Returns 403 with upgrade_path when insufficient
- Tested against 4 boundary cases

Refs: ehb-info/5-specs/FLOW-SCHEMA-V2.json
```

Modules: `stl`, `dmo`, `pss`, `crb`, `jps`, `wallet`, `franchise`, `ai`, `web`, `api`, `infra`, `docs`.

---

*EHB Technologies (Pvt.) Ltd. · Founder: Muhammad Rafi · 2026*
*Last updated: 2026-04-30*
