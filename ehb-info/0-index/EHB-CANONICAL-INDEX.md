# EHB Canonical Index

**Status:** Master index (v1.0) · 2026-04-15

> **Golden rule:** Before designing or building ANY feature, agent or human, consult this page to find the authoritative spec. All canonical docs are the **single source of truth** for their domain.

---

## Canonical Department Specs

Located in `ehb-info/departments/` — each is versioned and machine-readable.

### Service & Trust

| File | Ver | Status | Last Updated | Summary |
|------|-----|--------|--------------|---------|
| **STL.md** | 1.0 | Canonical | 2026-04-11 | 10-level ladder (L1 FREE → L10 SUPREME, 0–100 score), MIN-chain rule, composite formula, upgrade/downgrade conditions, 58 gold-master tests protected |
| **PSS.md** | 2.0 | **Deep spec** | 2026-04-13 | 27 verification features across 5 categories (Identity, Financial, Business, Behavioral, Compliance), role-based requirements (Buyer/Seller/Rider/Inspector/Franchise/Admin), STL contribution 0–40 points |
| **CRB.md** | 2.0 | Canonical | 2026-04-19 | Central Record Blockchain, refill cadence per STL level, on-chain certificate hashing (Polkadot), L9 ELITE source cap |
| **JPS.md** | 1.1 | Canonical | 2026-04-18 | Job Profile & Skill system — career platform with 8 dashboard sections, AI matching, exams, contracts, designations, inspector management, STL-gated job access. All 11 open questions locked: salary model (full-time + freelance + commission), wallet-first payment, FREE user limits, AI matching priority, contract violation penalties. |

### Governance & Operations

| File | Ver | Status | Last Updated | Summary |
|------|-----|--------|--------------|---------|
| **DMO.md** | 1.4 | Canonical | 2026-04-18 | 7 DMO roles, 8 module categories, 10-level ladder (Basic User→Elite), SaaS billing model (PKR 500–5000/month), approval panels, policy engine, admin oversight |
| **Franchise.md** | 1.0 | Canonical | 2026-04-11 | 4-tier model (Online/City/State/Country), hierarchical structure, L8 VIP source cap |

### Growth & Finance

| File | Ver | Status | Last Updated | Summary |
|------|-----|--------|--------------|---------|
| **Affiliate.md** | 1.0 | Canonical | 2026-04-18 | Referral growth engine: 5 commission types (direct/level/pool/franchise/product), multi-level (L1-L5), STL-gated earning (L1 FREE → L5 ADVANCED), DMO anti-abuse, 4 API endpoints, data model, 10 open questions |

### Portfolio

| File | Ver | Status | Last Updated | Summary |
|------|-----|--------|--------------|---------|
| **Industries.md** | 1.0 | Canonical | 2026-04-11 | 10 Main industries (GSM, WMS, HPS, OBS, OLS, AGTS, HMS, ITS, SOT, EHB Tube) + 6 Support (LDS, ERS, EFS, EPS, EAS, ELS) = 16 total; includes global vertical mapping |

---

## How to Use This Index

### I'm designing a feature for [domain]

1. **STL-related** (levels, ranking, trust score) → Read `STL.md`
2. **User verification, KYC, identity** → Read `PSS.md`
3. **Certification, exams, refill** → Read `CRB.md`
4. **DMO operations, approval panels, governance** → Read `DMO.md`
5. **Franchise tiers, hierarchy** → Read `Franchise.md`
6. **Industry categorization** → Read `Industries.md`

### I'm migrating legacy code (SQL → STL, 9-level → 10-level)

1. Read `STL.md §2` for the canonical 10-level ladder and V1↔V2 mapping (if present)
2. Check `CLAUDE.md §6.2` for auto-renaming rules (SQL→STL, EDR→CRB)
3. If code touches verification, consult `PSS.md §5` (point mapping)

### I'm adding a new industry

1. Read `Industries.md` and `scripts/add-industry.mjs`
2. Follow `EHB-FOLDER-FLOW-MASTER.md` before creating any files
3. Update `ehb-info/departments/Industries.md` with new entry
4. Run `node scripts/ehb-canonical-sync.mjs` to auto-sync master plans

### I'm writing UI copy or help text

1. Consult `STL.md §7` for level effects (visibility, fees, earnings)
2. Consult `PSS.md §4–§6` for role-specific requirements
3. Use Roman Urdu + English per `CLAUDE.md §1` language policy

---

## Auto-Sync Workflow

When **any canonical file changes:**

1. Edit the `.md` file in `ehb-info/departments/`
2. Run `node scripts/ehb-canonical-sync.mjs`
3. Verify changes in:
   - `ehb-info/EHB-PSS-MASTER-PLAN.md` (§ AUTO:PSS-CANONICAL)
   - `ehb-info/EHB-MASTER-DEVELOPMENT-PLAN.md` (§ AUTO:CANONICAL-SUMMARY)
   - `CLAUDE.md` (§ 5 / AUTO:CANONICAL-COUNTS)
4. Commit both canonical and synced files together

---

## Version Control & Deprecation

- **Canonical files use semantic versioning** (Major.Minor)
- **Backwards-incompatible changes → Major bump** (e.g., 1.0 → 2.0)
- **Additive changes → Minor bump** (e.g., 1.0 → 1.1)
- **Deprecated versions** are archived in `backup/` with date stamp
- **Gold-master tests** for STL (§ 9 of `STL.md`) are immutable and must pass 100%

---

## Source Caps (Immutable Rule)

These are hard limits on how high a user can climb using **only** that source:

| Source | Cap | Notes |
|--------|-----|-------|
| **PSS (Identity)** | L5 ADVANCED | 27 features, 0–40 STL points |
| **Franchise** | L8 VIP | 4-tier hierarchy, corporate trust |
| **CRB (Certification)** | L9 ELITE | Exams, refills, on-chain proofs |
| **DMO (Governance)** | L10 SUPREME | Manual approval, founder-only |

**MIN-chain rule:**
```
FINAL_EHB_STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)
```
If any layer is L1 FREE, the entire chain is L1 FREE.

---

## Related Master Plans & Build Documentation

**Master Plans (Auto-Synced):**
- **`EHB-PSS-MASTER-PLAN.md`** — detailed PSS integration roadmap
- **`EHB-MASTER-DEVELOPMENT-PLAN.md`** — weekly priorities, blockers, deadlines
- **`EHB-UIUX-SYSTEM.md`** — UI tokens, components, patterns (living design system)
- **`CLAUDE.md`** — AI agent instructions, naming migrations, stack

**Build & Technical Documentation:**
- **`EHB-BUILD-BLUEPRINT.md`** (v1.0) — Complete 12-phase technical implementation roadmap (foundation, auth+PSS, CRB+STL, DMO 7-engines, GoSellr, wallet, complaints, franchise+delivery, AI marketplace, notifications, admin, final launch). Includes DMO dashboard spec (23 modules), API data structures, all MongoDB models, testing strategy, deployment checklist, 6-month roadmap.
- **`EHB-API-SPEC.md`** (v1.0) — Complete HTTP API reference for all endpoints across 12 phases (Auth, PSS, CRB, STL, DMO, Products, Orders, Wallet, Delivery, Complaints, AI Marketplace, Notifications, Admin). Includes request/response structures, error codes, Socket.IO events, ~2,500 lines.
- **`EHB-DATABASE-SCHEMA.md`** (v1.0) — MongoDB collections & Mongoose models for all 12 phases (Users, PSS, CRB, STL, DMO, Products, Orders, Wallets, Complaints, Franchises, Riders, Deliveries, Notifications, Admins, Companies, AuditLog). Full field definitions, indexes, TTL, sharding strategy, data relationships.
- **`EHB-MASTER-SYSTEM-PHASES.md`** (v1.3) — Phase-wise architecture overview + new "Build Phases — Development Timeline" section linking to 12-phase plan

---

## Questions or Contradictions?

If you find:
- A canonical file that contradicts another
- Code that violates a canonical rule
- A missing spec for a major feature

→ **File an issue in `ehb-status.log`** (tracked by `scripts/ehb-status-update.mjs`):

```bash
node scripts/ehb-log-change.mjs "docs(canonical): contradiction in STL.md vs DMO.md §22" "blocker"
```

All blockers appear in `ehb-status.json` top-5 priorities for the week.

---

## New Files Added (2026-04-18 Batch 2)

| File | Ver | Status | Lines | Summary |
|------|-----|--------|-------|---------|
| **Affiliate.md** | 1.0 | Canonical | 260 | Growth engine: 5 commission types, multi-level structure (L1-L5), STL-gated earning, DMO anti-abuse rules, 4 API endpoints, data model, referral flow, 10 open questions. |

## New Files Added (2026-04-18 Batch 1)

| File | Ver | Status | Lines | Summary |
|------|-----|--------|-------|---------|
| **EHB-BUILD-BLUEPRINT.md** | 1.1 | Canonical | 1,650 | 17-phase technical implementation: phases 1-12 (foundation through final launch) + Phase 13-17 (Affiliate system, Blockchain BSC→Polkadot, Multi-industry OLS/WMS/HPS/JPS/AGTS, Payment gateways JazzCash/Easypaisa/Bank/Stripe, Mobile React Native). Execution priority order. |
| **EHB-API-SPEC.md** | 1.1 | Canonical | 1,550 | Complete HTTP API: phases 1-12 + 11 new endpoints (4 Affiliate, 3 Blockchain, 4 Payment). Request/response structures, error codes, Socket.IO events. |
| **EHB-DATABASE-SCHEMA.md** | 1.1 | Canonical | 950 | MongoDB schema for 17 collections: phases 1-14 + Affiliates, BlockchainProofs, Payments. Full field definitions, indexes, TTL, sharding strategy, data relationships. |

---

*EHB Technologies (Pvt.) Ltd. — v1.3 · 2026-04-18*
