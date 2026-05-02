# DMO Development Phases — Full Rebuild Plan

**Owner:** Rafi — EHB Technologies (Pvt.) Ltd.
**Date created:** 2026-04-11
**Status:** Phase 1 in progress
**Scope:** Full rebuild of the DMO (Decentralized Management Office) workspace in
`apps/web/app/dmo/*` — sidebar, layout, landing dashboard, 18 canonical modules,
design tokens, and naming cleanup — then forward through Phases 2–5 until every
DMO sub-card is fast, correct, and production-grade.

---

## Why phases

Instead of trying to rebuild the entire DMO in one giant commit (risky, slow to
validate, impossible to review), we split the work into 5 phases. Each phase is:

1. **Self-contained** — it ships working code at the end, even if later phases
   are incomplete. The app never breaks between phases.
2. **Type-clean** — every phase must end with `npx tsc --noEmit` exit 0.
3. **Backed up** — files changed in a phase are backed up to
   `backup/dmo-rebuild-2026-04-11/phase-N/` before the first rewrite.
4. **Design-system-compliant** — every new UI follows
   `design-system/EHB-UIUX-SYSTEM.md` and `design-system/ai-behavior.md`
   (auto-upgrade rule, dark glass, DM Sans, #7B6EF6 purple, #2BBFA0 teal).
5. **Naming-correct** — every new file uses the canonical names:
   STL = Service Trust Level, CRB = Central Record Blockchain,
   PSS = Personal Security System. Legacy "Smart Tracking & Logistics",
   "Credit & Reputation Badge", "Platform Security System" strings are purged.

---

## Phase 1 — Foundation (in progress)

**Goal:** Replace the DMO shell (sidebar, layout, landing dashboard) with a
canonical 18-module structure that uses the correct EHB naming, the new design
tokens, and the speed patterns we already landed for `useSTL` / Redis / RBAC.

### Phase 1 modules in scope

Foundation files only — no deep module pages yet. Those come in Phases 2–5.

### Phase 1 task breakdown

| # | Task | File(s) |
|---|------|---------|
| 1.1 | Back up existing DMO shell files | `backup/dmo-rebuild-2026-04-11/phase-1/` |
| 1.2 | Rewrite navigation with 18 canonical modules grouped into 4 sections | `apps/web/components/dmo/navigation.ts` |
| 1.3 | Rewrite sidebar with group headers, correct active states, EHB design tokens | `apps/web/components/dmo/DmoSidebar.tsx` |
| 1.4 | New DMO topbar: breadcrumb + live pulse dot + action buttons | `apps/web/components/dmo/DmoTopbar.tsx` (new) |
| 1.5 | Rewrite layout shell to wire new sidebar + topbar | `apps/web/app/dmo/layout.tsx` |
| 1.6 | Rewrite landing dashboard with correct STL/CRB/PSS naming, 4 KPI cards, live pulse | `apps/web/app/dmo/page.tsx` |
| 1.7 | Stub pages for canonical modules not yet routed (up-guard, ai-assistant, wallet-control, blockchain-control, activity-engine, task-system, earnings-engine, complaints, analytics) | `apps/web/app/dmo/<module>/page.tsx` |
| 1.8 | Full TypeScript check | `npx tsc --noEmit` |

### Phase 1 acceptance criteria

- Sidebar shows 18 canonical modules, grouped into Overview / Verification / Operations / Intelligence.
- Clicking any module routes without a 404.
- Landing page `/dmo` shows correct definitions (STL = Service Trust Level, etc.).
- No legacy "Smart Tracking & Logistics", "Credit & Reputation Badge", "Platform Security System" strings remain in DMO files.
- `npx tsc --noEmit` exits 0.
- First paint after click is instant (no blank skeleton), because the `useSTL` module cache + demo snapshot seeding is already in place.

---

## Phase 2 — Core Verification

**Goal:** Build out the four verification engines with real data where available, demo snapshots where not.

### Modules

1. **STL Management** (`/dmo/stl/*`) — live scores, breakdown, history, ranking, refill schedule, anti-fraud MIN rule visualization.
2. **PSS Monitoring** (`/dmo/pss/*`) — KYC cases, liveness, AML, risk scoring, fraud alerts.
3. **CRB Monitoring** (`/dmo/crb/*`) — document review, inspection scheduling, certificate issuance, expiry tracking.
4. **Up-Guard** (`/dmo/up-guard/*`) — new module, continuous monitoring layer over STL + PSS + CRB signals.

### Acceptance criteria

- STL Management page uses the real `getStlFullSnapshotForUser` pipeline already wired in Phase 1.
- PSS/CRB pages use existing routes under `/dmo/pss/*` and `/dmo/crb/*` if present, otherwise stub with demo data.
- Up-Guard is scaffolded even if no real data source exists yet (demo snapshot).
- Every drill-in card opens instantly (module cache + animated-in content).

---

## Phase 3 — Financial & Operations

**Goal:** Wire the financial and operational modules so franchise owners and admins can see money flow and day-to-day work queues.

### Modules

1. **Wallet Control** (`/dmo/wallet-control`) — EHB wallet, escrow, balances, coin lock ladder.
2. **Earnings Engine** (`/dmo/earnings-engine`) — 40/25/20/15 revenue split, payouts, history.
3. **Applications / Approvals** (`/dmo/applications/*`, `/dmo/approvals/*`) — already routed, refresh UI to match new sidebar styling.
4. **Refill Management** (`/dmo/refill-management` or keep `/dmo/refilling`) — active, expiring, expired, completed refills.
5. **Complaints** (`/dmo/complaints`) — new module, penalty ladder integration.

### Acceptance criteria

- Every financial number is either a real API field or clearly marked "demo".
- Approvals queue supports filter by STL level and by industry.
- Complaints module includes the penalty ladder from §25 of EHB-MASTER-INFO.

---

## Phase 4 — Network & Intelligence

**Goal:** Bring in franchise network, activity, task automation, AI, and analytics.

### Modules

1. **Franchise Control** (`/dmo/franchise/*`) — Country → Corporate → Sub hierarchy, tasks, escalations, reports.
2. **Activity Engine** (`/dmo/activity-engine`) — per-user activity feed, rolling 24h / 7d windows.
3. **Task System** (`/dmo/task-system`) — task queues, SLA timers, owner routing.
4. **AI Assistant** (`/dmo/ai-assistant`) — chat surface for DMO operators, scoped to their workspace.
5. **Analytics** (`/dmo/analytics`) — KPI dashboards, trend charts, segmented by module.

### Acceptance criteria

- Franchise hierarchy tree renders with real or demo data.
- Activity Engine uses a virtualized list for scroll performance.
- AI Assistant uses the existing `services/ai` backend contract; falls back to a local suggestion list if unreachable.

---

## Phase 5 — Admin & Polish

**Goal:** Finish the long tail: notifications, blockchain control, settings, and a full audit pass.

### Modules

1. **Notifications** (`/dmo/notifications/*`) — critical, warnings, system alerts, read/unread state.
2. **Blockchain Control** (`/dmo/blockchain-control`) — on-chain STL proofs, CRB certificate hashes, explorer links.
3. **Settings** (`/dmo/settings/*`) — users, roles, permissions, system config.
4. **Final audit** — run the naming grep (`grep -rn '\\bSQL\\b\\|\\bEDR\\b' --exclude-dir=node_modules .`) and zero out any legacy hits, re-run `npm run test:stl`, full `npx tsc --noEmit`, lighthouse pass.

### Acceptance criteria

- `grep` for legacy names returns zero DMO hits.
- `npm run test:stl` shows 58/58 pass.
- Every page in `/dmo/*` has lighthouse performance ≥ 90 in dev build.
- DMO sidebar is feature-complete with all 18 canonical modules wired to working (or demo) pages.

---

## Canonical 18 DMO modules (the source of truth)

Grouped into four sidebar sections.

### 1. Overview
- **Dashboard** — `/dmo`

### 2. Verification
- **STL Management** — `/dmo/stl`
- **PSS Monitoring** — `/dmo/pss`
- **CRB Monitoring** — `/dmo/crb`
- **Up-Guard** — `/dmo/up-guard`

### 3. Operations
- **Applications** — `/dmo/applications`
- **Approvals** — `/dmo/approvals`
- **Wallet Control** — `/dmo/wallet-control`
- **Earnings Engine** — `/dmo/earnings-engine`
- **Refill Management** — `/dmo/refill-management`
- **Complaints** — `/dmo/complaints`
- **Franchise Control** — `/dmo/franchise`

### 4. Intelligence
- **Activity Engine** — `/dmo/activity-engine`
- **Task System** — `/dmo/task-system`
- **AI Assistant** — `/dmo/ai-assistant`
- **Analytics** — `/dmo/analytics`
- **Blockchain Control** — `/dmo/blockchain-control`
- **Notifications** — `/dmo/notifications`
- **Settings** — `/dmo/settings`

*(That is Dashboard + 4 Verification + 7 Operations + 7 Intelligence = 19
items. JPS was folded into Applications because it is not a DMO module per
the Batch-2 canonical list — if Rafi wants it back as its own sidebar
entry we add it in Phase 4.)*

---

## Deferred / not in DMO rebuild scope

- Legacy `/dmo/jps/*` pages (JPS is its own department).
- Legacy `/dmo/penalty/*` (folded into Complaints).
- Legacy `/dmo/affiliate/*` (moves to `/wallet/affiliate` in Phase 3 or later).
- Legacy `/dmo/industry/*` and `/dmo/automation/*` (fold into Analytics + AI Assistant respectively).

These routes keep working but are not primary sidebar entries in the new
structure.

---

*This document is versioned. Any phase that deviates from this plan must
update the relevant section and add a changelog line below.*

## Changelog

- **2026-04-11** — Document created. Phase 1 kicked off.
