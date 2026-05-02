# EHB Info · Domain Map

> **Purpose:** Topic → file lookup. AI / human jab kisi topic pe kaam karna chahe,
> seedha is map se canonical file dhund le. Folder mein search nahi karna parta.
>
> **Locked:** 2026-04-30 · v1.0

---

## Quick lookup

| Question / Topic | Canonical file |
|---|---|
| **STL formula change?** | `3-departments/STL.md` |
| **STL ladder (L1-L10)?** | `3-departments/STL.md §2` |
| **STL composite scoring?** | `3-departments/STL.md §3` + `1-master/EHB-MASTER-INFO.md §4.3` |
| **EHBGC lock placement rule?** | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §10–§16` |
| **EHBGC lock per-level minimum?** | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.1` |
| **Industry multipliers?** | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.2` |
| **Slashing schedule?** | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §10.6` + `§16.1 #4` |
| **Premature unlock rule?** | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1 #9` |
| **All 38 industries list?** | `3-departments/Industries.md` (canonical v2.0) |
| **PSS verification levels?** | `3-departments/PSS.md` |
| **CRB exam + refill cadence?** | `3-departments/CRB.md` |
| **DMO modes (FAST/BALANCED/STRICT/CRITICAL)?** | `3-departments/Industries.md §5` + `3-departments/DMO.md` |
| **Franchise tiers (Sub L1–L10)?** | `3-departments/Franchise.md` |
| **Wallet types + EHBGC?** | `3-departments/Wallet.md` + `3-departments/Token.md` |
| **AI Marketplace modules?** | `3-departments/AI.md` |
| **Affiliate commission split?** | `3-departments/Affiliate.md` + `3-departments/Commission.md` |
| **GoSellr orders + complaints?** | `3-departments/GoSellr.md` |
| **Polkadot anchoring?** | `3-departments/Blockchain.md` |
| **Job board + JPS rules?** | `3-departments/JPS.md` |
| **10 user types + STL source matrix?** | `4-flows/EHB-USER-TYPES.md` |
| **End-to-end user journey?** | `4-flows/USER-FLOWS-COMPLETE.md` |
| **Department interconnect map?** | `4-flows/EHB-DEPARTMENTS-MAP.md` |
| **API endpoints?** | `5-specs/EHB-API-SPEC.md` |
| **Database schema?** | `5-specs/EHB-DATABASE-SCHEMA.md` |
| **Phase-1 plan (current)?** | `2-phases/EHB-PHASE-1-DMO-FRANCHISE-AI.md` |
| **Phase-2 plan (next)?** | `2-phases/EHB-PHASE-2-PLAN.md` |
| **Master vision / mission?** | `1-master/EHB-MASTER-INFO.md` |
| **Founder Communication Rules?** | `0-index/CLAUDE-FOUNDER-COMMUNICATION-RULES.md` |
| **12 Master Rules for AI projects?** | `1-master/EHB-PROJECT-WITH-CLAUDE-PLAYBOOK.md` |
| **Cowork instructions?** | `1-master/EHB-COWORK-INSTRUCTIONS.md` |

---

## Topic → multiple files

Some topics span multiple files. Read all when working on the topic:

### "STL system" (full picture)

1. `3-departments/STL.md` — canonical formula + ladder
2. `1-master/EHB-MASTER-INFO.md §4.3` — master vision
3. `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md` — locked decisions + open items
4. `4-flows/EHB-USER-TYPES.md` — STL source matrix per user type

### "AI Marketplace" (full picture)

1. `3-departments/AI.md` — module spec
2. `1-master/EHB-MASTER-INFO.md §4.7` — vision
3. `apps/web/app/ai-marketplace/page.tsx` — UI
4. `services/ai/` — backend

### "Industries" (full picture)

1. `3-departments/Industries.md` — canonical 38 (v2.0)
2. `4-flows/EHB-DEPARTMENTS-MAP.md` — department mapping
3. `1-master/EHB-MASTER-INFO.md §5` — master view
4. `9-archive/EHB-INDUSTRIES-MAP-v1-DEPRECATED.md` — DO NOT USE (old 16-list)

### "Lock economics" (full picture)

1. `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §14–§16` — 10 locked rules
2. `3-departments/Wallet.md` — wallet integration
3. `3-departments/Token.md` — EHBGC spec
4. `3-departments/Finance.md` — financial flow

---

## When updating a topic

If you change canonical file, also update:

| Updated topic | Also propagate to |
|---|---|
| STL formula | code: `services/api/src/services/stlService.js` + tests |
| STL ladder | code: `apps/web/lib/stl/levels.ts` + UI components |
| Industries list | code: `apps/web/lib/industries.ts` (if exists) + ai-marketplace pages |
| User types | code: `apps/web/lib/user-types.ts` (if exists) + dashboards |
| Franchise tiers | code: `services/api/src/services/franchiseService.js` |
| EHBGC lock matrix | code: wallet service + STL pages + AI marketplace cards |

See `_settings/UPDATE-RULES.md` for full propagation rules.
