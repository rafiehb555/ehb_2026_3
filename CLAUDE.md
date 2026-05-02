# CLAUDE.md — AI Agent Context for EHB Development 2026

> This file is read by AI agents (Claude, Cursor, etc.) at the start of every
> session to understand the project. Keep it concise and current.

## 1. Project Identity

- **Name:** EHB Technologies (Pvt.) Ltd. — Global Super-App
- **Founder/CEO:** Muhammad Rafi
- **Mission:** Unify 38 industries in one platform with AI + Polkadot trust backbone
- **Tagline:** "One Platform. 38 Industries. 700+ Services. Infinite Trust."
- **Current phase:** Phase 1 — DMO Demo + Franchise Model + AI Services Marketplace

## 2. 🚨 MANDATORY AUTO-LOAD PROTOCOL (every task)

**BEFORE answering ANY task, Claude MUST:**

1. **Read `ehb-info/0-index/AGENT-CONTEXT-BUNDLE.md` FIRST** — this is the master index
2. Use the **Task → Files Lookup table** in that bundle to identify relevant files
3. Read the top 3-5 most-relevant files identified
4. Cross-reference with `FLOW-SCHEMA-V2.json` for any technical constants
5. Plan + answer with founder communication style (Roman Urdu + English, short)

**If user task is trivial (e.g., quick question), at minimum read AGENT-CONTEXT-BUNDLE.md.**

## 3. Canonical Files (used by AGENT-CONTEXT-BUNDLE)

1. `ehb-info/0-index/AGENT-CONTEXT-BUNDLE.md` ⭐ — MASTER INDEX (read first)
2. `ehb-info/_settings/REGISTRY.json` — machine-readable topic index
3. `ehb-info/_settings/SOURCE-OF-TRUTH.md` — who owns what
4. `ehb-info/_settings/EHB-CORE-ENGINE.md` — single AI/Wallet/Chain pattern
5. `ehb-info/0-index/MASTER-DASHBOARD.md` — current state snapshot
6. `ehb-info/0-index/CLAUDE-FOUNDER-COMMUNICATION-RULES.md` — response template
7. `ehb-info/5-specs/FLOW-SCHEMA-V2.json` — all technical constants
8. `ehb-info/2-phases/EHB-PHASE-1-DMO-FRANCHISE-AI.md` — current phase
9. `ehb-status.json` (workspace root) — real-time project pulse

## 3. Language Policy

- **Conversation:** Roman Urdu + English bilingual (natural code-switching)
- **Code, commits, variable names, UI copy:** English only
- **Commit format:** `feat(module): summary` — modules: `stl`, `dmo`, `pss`, `crb`, `jps`, `wallet`, `franchise`, `ai`, `web`, `api`, `infra`, `docs`

## 4. Tech Stack

| Layer | Tech | Port |
|-------|------|------|
| Frontend | Next.js 14 App Router + TypeScript + Tailwind | 3000 |
| API | Node 20 + Express + Mongoose (ESM) | 5000 |
| AI | Node 20 + Express + OpenAI (CommonJS) | 8080 |
| DB | MongoDB 7 | 27017 |
| Monorepo | pnpm + Turborepo | — |

## 5. Hard Rules

### Do

- Read `EHB-MASTER-PLAN.md` + `EHB-PHASE-1-DMO-FRANCHISE-AI.md` before any feature work
- Backup before destructive changes → `backup/<name>-YYYY-MM-DD/`
- Use **lowercase filenames** for components (`card.tsx`, not `Card.tsx`)
- Apply auto-renames: **SQL → STL**, **EDR → CRB** (except in `MySQL`/`PostgreSQL` strings)
- Read `design-system/EHB-UIUX-SYSTEM.md` + `ai-behavior.md` before any UI work
- Keep every new UI "auto-upgraded": glass card + icon + chip + motion + drill-in drawer
- Check `ehb-status.json` at session start for current week's priorities
- **On ANY UI/UX change** (code in `apps/web/**`, `theme.ts`, `components/`, `lib/data/`), always update the relevant canonical file in `ehb-info/15-ui-system/` in the SAME task. See `15-ui-system/UIUX-AUTO-SAVE-PROTOCOL.md`.
- Read `15-ui-system/HOME-PAGE-DESIGN.md` before any home page modification.

### Don't

- Never modify `services/api/src/services/stlService.js` without regenerating all 58 gold-master tests
- Never commit `.env` files — use `.env.example`
- Never `process.exit(1)` on optional deps (Mongo, OpenAI) — degrade gracefully
- Never break the `ThemeTokens` type contract in `apps/web/lib/dmo/theme.ts`
- Never ship "basic" UI — always auto-upgrade (see Do rule above)
- Never use `localStorage` / `sessionStorage` in React artifacts
- **Never change UI/UX code without updating its canonical spec** in `ehb-info/15-ui-system/`. No code without doc.
- Never duplicate UI specs outside `ehb-info/15-ui-system/`.
- Never change LOCKED tokens (home page sections, STL gradients, plastic coating, theme switcher) without founder approval.

## 6. STL Formula (Protected — 58 Gold-Master Tests)

```
PSS_points = (PSS_level / 10) × 40         // 0–40
CRB_points = (CRB_level / 10) × 40         // 0–40
DMO_points = (DMO_level / 10) × 40         // 0–40
Score      = PSS_points + CRB_points + DMO_points   // 0–120
Final_STL  = MIN(Score / 1.2, lowest_component + 1) // 0–100
```

**MIN-chain rule:**

```
FINAL_EHB_STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)
```

Source caps: PSS=L5, Franchise=L8, CRB=L9, DMO=L10.

## 7. Design System Shortcuts

### iOS Classic + Diamond Dual Theme (DMO pages)

See `apps/web/lib/dmo/theme.ts` for exact tokens. Every card ships with 3-layer
plastic coating (gloss + shimmer + depth shadow).

### Legacy Dark Glass (Non-DMO pages)

- BG `#0C0E1A` · Card `#13162A` · Nested `#1A1D33`
- Purple `#7B6EF6` (primary) · Teal `#2BBFA0` · Amber `#F0A030`
- Font: DM Sans · Radius 12 cards / 8 inputs / 5–6 chips

## 8. Commit Example

```
feat(franchise): add serial number generator for Sub L1–L10

Implements EHB-PK-R1-P1-L{level}-{seq} format with atomic counter.
Tested against 14 tier scenarios. Adds caps enforcement stub.
```

## 9. Status & Priorities

Always read `ehb-status.json` — top-5 priorities for current week, known blockers,
phase progress. Update it at end of each working session.

---

*EHB Technologies (Pvt.) Ltd. — Agent Rules v1.0 — 2026-04-21*
