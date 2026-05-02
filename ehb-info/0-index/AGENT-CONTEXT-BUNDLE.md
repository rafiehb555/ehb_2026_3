# 🤖 AGENT CONTEXT BUNDLE — Auto-Load Index

> **Purpose:** Yeh file Claude/AI auto-load karta hai HAR task ke shuru mein.
> Yahan se main pata lagata hou ke kaunsi file padhni hai kis task ke liye.
> **Aap ko yeh file kabhi padhne ki zaroorat nahi** — sirf Claude ke liye hai.
>
> **Last updated:** 2026-04-30
> **Maintained by:** Claude (auto-update on structural changes)

---

## ⚡ QUICK CONTEXT (always-in-mind)

### Project
- **Name:** EHB Technologies (Pvt.) Ltd. — Global Super-App
- **Founder:** Muhammad Rafi
- **Tagline:** One Platform · 38 Industries · 700+ Services · Infinite Trust
- **Phase:** 1 (DMO + Franchise + AI Marketplace)
- **Strategy:** Global from day 1, NOT Pakistan-first

### Hard Numbers
- 17 internal departments
- **37 industries** (15 Tier-1 + 16 Tier-2 + 6 Tier-3) — SOT merged into ITS on 2026-04-30
- 17 countries (5 Phase 1 + 6 Phase 2 + 6 Phase 3)
- 5-tier franchise (Country → Master → Corporate → Sub → Micro)
- EHB STL ladder L1-L10
- Revenue split 70/10/10/10
- Franchise split 40/15/25/15/5
- 230+ documentation files

### Naming (locked 2026-04-30)
- **PSS** = Personal Security Score (was: Proof & Security System)
- **CRB** = Certification, Refill & Background (was: Central Record Blockchain)
- **STL** = EHB STL = EHB System Trust Level
- **DMO** = Digital Management Office (was: Decentralized)
- **JPS** = Jobs Platform & Skills (was: Job Profile & Skill)
- **EHB Dev AI** = AI department official name
- **Seller** = user-type that operates on top of GoSellr (GSM)
- **HMS** = Hotel Management Services (machinery moved into ITS)
- **ITS** = Information Technology Services (absorbed ex-SOT)

### Founder Communication Style
- Roman Urdu + English bilingual
- Short answers preferred
- No long essays unless asked
- Visual diagrams help
- Source: `0-index/CLAUDE-FOUNDER-COMMUNICATION-RULES.md`

---

## 📂 TIER-1 FILES (read EVERY major task)

| # | File | Why |
|---|------|-----|
| 1 | `CLAUDE.md` (root) | Hard rules + STL formula + commit format |
| 2 | `ehb-info/_settings/REGISTRY.json` | Topic → file lookup |
| 3 | `ehb-info/_settings/SOURCE-OF-TRUTH.md` | Who owns which topic |
| 3a | `ehb-info/0-index/DEPARTMENT-AUDIT-2026.md` ⭐ | Department status (88% complete) |
| 4 | `ehb-info/_settings/EHB-CORE-ENGINE.md` | Single AI/Wallet/Chain pattern |
| 5 | `ehb-info/0-index/MASTER-DASHBOARD.md` | Current state snapshot |
| 6 | `ehb-info/5-specs/FLOW-SCHEMA-V2.json` | All technical constants |

---

## 🎯 TIER-2 FILES (read by topic)

### Trust System (STL/PSS/CRB/DMO)
- `ehb-info/3-departments/STL.md` — STL formula + ladder
- `ehb-info/3-departments/PSS.md` — Identity verification
- `ehb-info/3-departments/CRB.md` — Skill verification
- `ehb-info/3-departments/DMO.md` — Governance (1969 lines, deep)
- `ehb-info/8-trust-system/PSS-METHODOLOGY.md`
- `ehb-info/8-trust-system/CRB-METHODOLOGY.md`
- `ehb-info/8-trust-system/REVIEW-WEIGHTS.md`

### Industries
- `ehb-info/3-departments/Industries.md` — 38 industries master
- `ehb-info/3-departments/INDUSTRY-SERVICES-CATALOG.md` ⭐ — All 38 × services × micro-services
- `ehb-info/3-departments/industries/<CODE>.md` — Per-industry spec
- `ehb-info/4-flows/INDUSTRY-RULES.md`
- `ehb-info/4-flows/INDUSTRY-STL-MULTIPLIER.md`
- `ehb-info/4-flows/PRODUCT-VERIFICATION-FLOW.md` — Multi-industry verification

### Franchise (5-tier)
- `ehb-info/11-franchise/EHB-FRANCHISE-MODEL.md`
- `ehb-info/11-franchise/COUNTRY-FRANCHISE-LIST.md`
- `ehb-info/11-franchise/EHB-INDUSTRY-FRANCHISE-MAP.md`
- `ehb-info/11-franchise/FRANCHISE-REVENUE-FLOW.md`
- `ehb-info/11-franchise/MICRO-FRANCHISE.md`

### Money
- `ehb-info/3-departments/Wallet.md`
- `ehb-info/3-departments/Token.md`
- `ehb-info/3-departments/Commission.md`
- `ehb-info/5-economy/TOKENOMICS.md`
- `ehb-info/5-economy/LOCK-LOGIC.md`
- `ehb-info/5-economy/SLASHING-RULES.md`

### User Flows
- `ehb-info/4-flows/USER-FLOWS-COMPLETE.md` — 9 role flows narrative
- `ehb-info/4-flows/USER-STORIES.md` ⭐ — 60 formal user stories with acceptance criteria
- `ehb-info/4-flows/EHB-USER-TYPES.md`
- `ehb-info/4-flows/ORDER-FLOW.md`
- `ehb-info/4-flows/DISPUTE-FLOW.md`
- `ehb-info/4-flows/ESCROW-FLOW.md`
- `ehb-info/4-flows/REFUND-FLOW.md`
- `ehb-info/4-flows/INDUSTRY-DEPARTMENT-MATRIX.md` ⭐ — 38 × 17 grid (how each industry uses each dept)

### JPS / Affiliate
- `ehb-info/3-departments/JPS.md`
- `ehb-info/3-departments/Affiliate.md`
- `ehb-info/7-affiliate/AFFILIATE-CANONICAL-CHECKLIST.md`
- `ehb-info/14-growth/REFERRAL-PROGRAM.md`

### UI System
- `ehb-info/15-ui-system/PAGES-LIST.md` — 80+ pages
- `ehb-info/15-ui-system/PAGE-DATA-MAP.md` ⭐ — page-by-page data spec
- `ehb-info/15-ui-system/UIUX-DESIGN-SYSTEM.md` ⭐ — colors, typography, components
- `ehb-info/15-ui-system/UI-RULES.md`
- `ehb-info/15-ui-system/COMPONENT-LIBRARY.md`

### Phases
- `ehb-info/2-phases/EHB-PHASE-1-DMO-FRANCHISE-AI.md`
- `ehb-info/2-phases/EHB-PHASE-2-PLAN.md`

---

## 🗺 TASK → FILES LOOKUP (auto-resolve)

| If user asks about... | Read these files first |
|-----------------------|-------------------------|
| **STL formula / level** | STL.md + FLOW-SCHEMA-V2.json + stlService.js |
| **DMO architecture** | DMO.md + DMO/DMO-DASHBOARD.md + DMO-ROLE-VIEW.md |
| **PSS verification** | PSS.md + EHB-PSS-MASTER-PLAN.md + KYC-LAWS.md |
| **CRB exams** | CRB.md + CRB-METHODOLOGY.md |
| **Franchise** | All 18 files in `11-franchise/` |
| **Specific industry services** | `3-departments/INDUSTRY-SERVICES-CATALOG.md` (all 38) + `industries/<CODE>.md` |
| **Product verification** | `4-flows/PRODUCT-VERIFICATION-FLOW.md` + `CRB.md §11` |
| **CRB physical verification** | `CRB.md §9` + `FRANCHISE-VERIFICATION.md` |
| **Refilling system** | `CRB.md §10` + `FLOW-SCHEMA-V2.json refilling_system` |
| **Order/payment** | ORDER-FLOW.md + PAYMENT-FLOW.md + ESCROW-FLOW.md |
| **Refund/dispute** | REFUND-FLOW.md + DISPUTE-FLOW.md + DMO.md |
| **Slashing** | SLASHING-RULES.md + DMO.md + STL.md |
| **JPS jobs** | JPS.md + USER-FLOWS-COMPLETE.md |
| **Affiliate** | Affiliate.md + AFFILIATE-CANONICAL-CHECKLIST.md |
| **Country launch** | COUNTRY-FRANCHISE-LIST.md + COUNTRY-SPECIFIC-LAWS.md |
| **UI page** | PAGES-LIST.md + UI-RULES.md + relevant component |
| **API spec** | EHB-API-SPEC.md + ERROR-CODES-CATALOG.md |
| **AI prompts** | AI-PROMPTS.md + AI-PROMPT-TEMPLATES.md |
| **AI Core entry** | `services/api/src/routes/ai.route.js` (POST /api/ai/route — intent detect) |
| **Security** | SECURITY-AUDIT.md + THREAT-MODEL.md |
| **Compliance** | COMPLIANCE-AUDIT.md + AML-POLICY.md |

---

## 🔧 PROTOCOL — Auto-Plan Steps

**Har major task pe Claude yeh steps follow karega:**

```
Step 1: Yeh file (AGENT-CONTEXT-BUNDLE.md) padho — instant context.
Step 2: User ka sawal samjho — kya area hai?
Step 3: Task → Files Lookup table dekho — relevant files identify.
Step 4: Top 3-5 most-relevant files PURI padho.
Step 5: FLOW-SCHEMA-V2.json check for any constants.
Step 6: Cross-reference with REGISTRY.json + SOURCE-OF-TRUTH.md.
Step 7: Plan banao + answer do (founder communication style).
Step 8: Source cite karo (file path + line if specific claim).
```

---

## ⚠️ HARD RULES (NEVER violate)

1. STL formula change = re-run 58 gold-master tests.
2. Industry add = config only (FLOW-SCHEMA-V2.json), NOT new code.
3. Country add = config + KYC partner, NOT new service.
4. Adapter pattern: never call Stripe/Polkadot directly.
5. No `localStorage` in React artifacts.
6. Every claim → cite source if specific.
7. Auto-rename: SQL → STL, EDR → CRB.
8. Lowercase filenames for components.

---

## 📊 LIVE STATUS POINTERS

- Current week priorities: `ehb-status.json` (workspace root)
- Known blockers: `MASTER-DASHBOARD.md`
- Pending tasks: TaskList tool
- Recent decisions: Last 10 turns of conversation

---

## 🔄 SELF-UPDATE TRIGGERS

Update yeh file when:
- New folder added to `ehb-info/`
- New tier-1 canonical file created
- Major architectural decision changes
- New department or industry added
- Phase transition (Phase 1 → 2 → 3)

---

*Generated 2026-04-30 · Auto-loaded by Claude on every task*
