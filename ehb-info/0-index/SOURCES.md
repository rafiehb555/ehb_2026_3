# SOURCES — What got merged into `ehb-info/`

**Created:** 2026-04-11
**Purpose:** Inventory of every legacy doc that was merged into
`EHB-MASTER-INFO.md` and `departments/DMO.md`, so future agents know
exactly where each piece of content came from.

> **Rule:** legacy docs stay in `/docs/`, `/design-system/`, etc. for
> historical reference. `ehb-info/` is the merged, re-structured,
> gap-fixed, single source of truth going forward.

---

## 1. Company-wide source files (merged into EHB-MASTER-INFO.md)

| # | File | Lines | Primary contribution |
|---|------|-------|----------------------|
| 1 | `docs/EHB_CONTEXT.md` | 245 | Gold-master company context (pillars, vision, stack, 8 systems, 32 industries, roadmap, agent rules) |
| 2 | `CLAUDE.md` | ~230 | Portable agent context (identical intent to EHB_CONTEXT, mirrors AGENTS.md) |
| 3 | `design-system/EHB-UIUX-SYSTEM.md` | (large, in-memory) | Design-system source of truth — palette, tokens, components, Cinematic Hero pattern |
| 4 | `docs/ehb-info/EHB_stl 0.md` | 146 | Legacy STL overview snapshot (E2E test status, STL L1–L8, multi-entity rule, wallet types, earning types) |

## 2. DMO-specific source files (merged into departments/DMO.md)

| # | File | Lines | Primary contribution |
|---|------|-------|----------------------|
| 1 | `docs/development/EHB_DMO_PLAN.md` | 500 | **Gold-master DMO plan** — 12 parts covering roles, dashboards, panels, automation, reporting, comms, RBAC, audit, advanced features, Prisma models, API routes |
| 2 | `docs/architecture/dmo-master-architecture.md` | 345 | 5-layer architecture, DMO internal modules, admin dashboard sidebar, officer hierarchy, workflow engine |
| 3 | `docs/architecture/dmo-blueprint.md` | 510 | Principles, core components (API gateway, DMO core, event bus, blockchain anchor), 8 DMO modules, 16+ core tables, 13 canonical APIs, 8-step user journey, security model, tech stack, deployment |
| 4 | `docs/architecture/dmo-data-flow.md` | 293 | Core data flow, 3-layer data architecture, multi-region flow, data sync patterns |
| 5 | `docs/architecture/dmo-global-data-flow.md` | 252 | Global multi-region infra (Asia/Europe/Americas hubs), data sovereignty by country, DR, compliance frameworks |
| 6 | `docs/architecture/dmo-ai-decision-engine.md` | 223 | 6 AI models (Verification, Risk, Workflow, STL, Compliance, Recommendation), decision thresholds, scoring weights, performance targets, tech stack |
| 7 | `docs/architecture/dmo-bank-level-security.md` | 376 | 8-layer security model, MFA, RBAC+ABAC, encryption, HSM key mgmt, blockchain audit, SIEM, incident response, SLAs, compliance |
| 8 | `docs/database/dmo-master-database.md` | 443 | 15 modules × ~170–200 tables spec (User & Identity, Prof Profile, Company, Product, Service, PSS, CRB, STL, Application Workflow, Officer, Wallet, Franchise, Notifications, Blockchain, System Admin) |
| 9 | `docs/ui-ux/dmo-admin-system.md` | 412 | Light-mode admin wireframe, 14-item sidebar, dashboard stats, page specs, components library, responsive rules |
| 10 | `docs/flows/FLOW-P3-dmo-governance.md` | 120 | Design-flow anchor, role hierarchy, module panels ↔ workspace `DmoSectionWorkspace` mapping, open questions |
| 11 | `docs/ehb-dmo-and-home-data-snapshot.md` | 142 | Snapshot consolidating DMO admin sidebar, dev-control dashboard, trust-badge system, STL impact, industry verification, master roadmap |

**Total legacy lines absorbed:** ~3 762 lines across 15 files.

---

## 2.5 Batch-2 user-uploaded source files (merged 2026-04-11)

Rafi uploaded 13 structured `.md` files directly during Batch-2. Each file became (or was merged into) a canonical `ehb-info/departments/` file. The uploads remain in `/sessions/great-stoic-turing/mnt/uploads/` as historical reference.

| # | File                                     | Lines | Merged into                        |
|---|-------------------------------------------|------:|-------------------------------------|
| 1 | `uploads/ehb_full_system.md`              |   162 | `EHB-MASTER-INFO.md` overview + §4 |
| 2 | `uploads/ehb_stl.md`                      |    75 | `departments/STL.md` (new)         |
| 3 | `uploads/ehb_dmo.md`                      |    18 | `departments/DMO.md §26`           |
| 4 | `uploads/ehb_pss.md`                      |    55 | `departments/PSS.md` (new)         |
| 5 | `uploads/ehb_crb.md`                      |    53 | `departments/CRB.md` (new)         |
| 6 | `uploads/ehb_gosellr.md`                  |    13 | `departments/GoSellr.md` (new)     |
| 7 | `uploads/ehb_affiliate.md`                |    12 | `departments/Affiliate.md` (new)   |
| 8 | `uploads/ehb_franchise.md`                |    18 | `departments/Franchise.md` (new)   |
| 9 | `uploads/ehb_franchise_earnings.md`       |    34 | `departments/Franchise.md` (new)   |
|10 | `uploads/ehb_finance.md`                  |    30 | `departments/Finance.md` (new)     |
|11 | `uploads/ehb_trusty_wallet.md`            |   194 | `departments/Wallet.md` (new)      |
|12 | `uploads/ehb_blockchain.md`               |    38 | `departments/Blockchain.md` (new)  |
|13 | `uploads/EHB_Industry_System.md`          |   118 | `departments/Industries.md` (new)  |

**Total Batch-2 lines absorbed:** ~820 lines across 13 files.

### Key canonical updates from Batch-2

1. STL 10-level names + score bands are now explicit (see `STL.md §2`)
2. Coin lock ladder is now a single-number form (see `Wallet.md §3`); Batch-1 dual-ladder is deprecated
3. Wallet lock duration bonuses (1/2/3 year tiers) are now documented (see `Wallet.md §4`)
4. Wallet is 2 buckets not 3 (Locked + Free); legacy Main/Earnings/Lock is deprecated (see `Wallet.md §2`)
5. Blockchain phases BSC → Mosaic → Polkadot confirmed (see `Blockchain.md §2`)
6. PSS = "Personal Security System" confirmed (not "Proof & Security System")

### New contradictions introduced by Batch-2 (awaiting user)

- **C1** CRB full name: Refill Board (canonical file) vs Regulatory Board (Industry file) vs Registry Board (legacy)
- **C2** Coin lock numbers: Batch-1 dual ladder vs Batch-2 single ladder
- **C3** Industry count: legacy 32 vs Batch-2 16 (10 main + 6 support)
- **C4** Wallet bucket model: 3 wallets vs 2 buckets
- **C5** Phase-1 launch set: legacy 6 vs Batch-2 10 main industries
- **C6** JPS status: Batch-2 doesn't list JPS as a standalone industry

All six tracked in `DMO.md §26.3`.

---

## 3. Files discovered but NOT merged (intentionally)

These files were found during the scan but left in place because they
belong to other departments or concerns that will be handled in later
passes. They will be merged into their own `ehb-info/departments/*.md`
files when the user moves on from DMO.

### 3.1 PSS (Proof & Security System)
- `docs/architecture/pss-*.md` *(if present — will merge into `ehb-info/departments/PSS.md`)*

### 3.2 CRB (Central Record Blockchain)
- `docs/architecture/crb-*.md` *(for future `ehb-info/departments/CRB.md`)*

### 3.3 STL (Service Trust Level)
- `docs/flows/FLOW-P2-trust-stack.md`
- `services/api/stl-replit/services/stlService.js` (code, not doc)
- `design-system/ehb-stl-design-system.md` *(if present)*
- STL gold-master tests in `services/api/stl-replit/tests/`
- → future `ehb-info/departments/STL.md`

### 3.4 JPS (Job Profile & Skill)
- `docs/flows/FLOW-P4-jps-*.md` *(if present — future `ehb-info/departments/JPS.md`)*

### 3.5 Wallet / Finance
- Pending wallet docs — future `ehb-info/departments/Wallet.md`

### 3.6 AI Department
- `services/ai/README.md` + AI module specs — future `ehb-info/departments/AI.md`

### 3.7 Blockchain
- Pending Polkadot contract specs — future `ehb-info/departments/Blockchain.md`

### 3.8 Franchise
- `docs/flows/franchise-*.md` *(if present — future `ehb-info/departments/Franchise.md`)*

### 3.9 Design / UI
- `design-system/EHB-UIUX-SYSTEM.md` — treated as **living** source of truth;
  not duplicated into ehb-info, but referenced from `EHB-MASTER-INFO.md §9`.
- `design-system/ai-behavior.md` — same treatment.

### 3.10 Project structure / operations
- `docs/PROJECT_STRUCTURE.md` — where-does-code-go decision table. Referenced
  from `EHB-MASTER-INFO.md §8.2`.
- `docs/LAUNCH_GUIDE.md` — local stack bring-up. Referenced from CLAUDE.md §10.

### 3.11 Roadmap
- `docs/roadmap/MASTER-ROADMAP.md` — referenced from `EHB-MASTER-INFO.md §10.5`.

---

## 4. Merge principles applied

1. **Re-structure, don't copy.** Every section was re-written into a
   single structured voice. No copy-paste blocks.
2. **De-duplicate.** The same concept (e.g. 40/25/20/15 revenue split)
   appears in ~8 legacy docs. It's canonicalised once in
   `EHB-MASTER-INFO.md §7` and referenced everywhere else.
3. **Fix gaps.** Where legacy docs are silent (e.g. no DMO event bus,
   no per-action decision latency SLA), AI suggestions are added and
   tagged `[SUGGESTION]` so user can accept / modify / reject.
4. **Mark unknowns.** Anything that legacy docs contradict or leave
   ambiguous is logged as `[AWAITING USER INPUT]` in
   `departments/DMO.md §20`.
5. **Preserve immutables.** STL formula, 58 gold-master tests, design
   palette, SQL→STL + EDR→CRB rename history, agent hard-rules are
   quoted verbatim into `EHB-MASTER-INFO.md §4.3, §9, §11, §13`.
6. **Changelog everything.** Every file in `ehb-info/` has a bottom
   Changelog section. Every future edit must append a row.

---

## 5. How to extend `ehb-info/` going forward

When the user provides new DMO info:
1. Read the new info.
2. Merge it into `departments/DMO.md` in the right section.
3. If it resolves an `[AWAITING USER INPUT]` marker, delete the marker
   and fold the answer into the main prose.
4. If it contradicts a `[MERGED]` section, replace the merged section
   and log the change in the Changelog with a `overrides legacy` note.
5. If it's a new concept, add a new section and mark the source.
6. Append to the Changelog.
7. Cross-reference it from `EHB-MASTER-INFO.md` if it's company-wide.
8. Run `node scripts/ehb-log-change.mjs "<msg>" "partial"` if a build
   impact is introduced.

When the user moves to a new department (e.g. PSS):
1. Create `ehb-info/departments/PSS.md` using `DMO.md` as template.
2. Merge the listed §3 legacy files for that department.
3. Update the `EHB-MASTER-INFO.md §15` departments index.
4. Add a row to this `SOURCES.md`.

---

## Changelog

| Date       | Author | Change |
|------------|--------|--------|
| 2026-04-11 | Claude | v1.0 — initial inventory of ~15 merged files + future-department placeholders. |
| 2026-04-11 | Claude | v1.1 — **Batch-2 merge**: added §2.5 with 13 uploaded .md files (~820 lines absorbed). 10 new canonical department files created under `departments/`. 6 new contradictions logged (C1–C6). |

---

*EHB SOURCES — merge inventory · v1.1 · 2026-04-11 · Batch-2 merged*
