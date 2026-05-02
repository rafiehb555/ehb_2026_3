# EHB Full-Plan Workflow

> **Purpose:** Master workflow ka document — kaise founder text-only input se
> 100% complete EHB plan banta hai. 7 layers, 40+ canonical files, ~25-30 sessions.
>
> **Locked:** 2026-04-30 · v1.0 · Founder Muhammad Rafi

---

## 1. Master question (founder's exact ask)

> "Sirf text bhej sakta hoon. AI auto UI/UX → mapping → development files banaye.
> 1% bhi missing na ho. Koi b chez aysi na ho jise AI agent ya developer samajh na sake."

## 2. Master answer

**100% mumkin hai.** Founder text bhejta hai → Claude:
- Existing canonical files read karta hai (auto via DOMAIN-MAP.md + REGISTRY.json)
- Targeted A/B/C questions puchta hai
- Founder pick karta hai
- Claude generate karta hai: **spec file + visual mockup + code-ready details**
- Auto cross-references update + version bump + status pulse

Founder ko sirf 4 cheezen karni hain:
1. Topic batao ("today let's do X")
2. Pick option (A/B/C)
3. Custom rule likhen jab needed
4. Approve karen ya tweak

Baaki sab Claude karta hai.

---

## 3. The 7-Layer plan blueprint

### Layer 1 — Vision & Strategy (the WHY)

| File | Status | Purpose |
|---|---|---|
| `1-master/EHB-MASTER-INFO.md` | ✓ done | The bible — vision + departments + industries |
| `1-master/EHB-MASTER-PLAN.md` | ✓ done | Consolidated master plan |
| `1-master/EHB-PROJECT-WITH-CLAUDE-PLAYBOOK.md` | ✓ done | 12 founder rules |
| `1-master/BUSINESS-MODEL.md` | ❌ TODO | Revenue, costs, unit economics |
| `1-master/SUCCESS-METRICS.md` | ❌ TODO | KPIs, north star metric |
| `1-master/RISK-REGISTER.md` | ❌ TODO | Top 20 risks + mitigations |
| `1-master/COMPETITORS-ANALYSIS.md` | ❌ TODO | Competitor landscape, differentiation |
| `2-phases/EHB-PHASE-1-DMO-FRANCHISE-AI.md` | ✓ done | Phase 1 plan |
| `2-phases/EHB-PHASE-2-PLAN.md` | ✓ done | Phase 2 plan |

**Sessions to complete:** 5 · **Time:** ~3 hours

### Layer 2 — Users & Personas (the WHO)

| File | Status | Purpose |
|---|---|---|
| `4-flows/EHB-USER-TYPES.md` | ✓ done | 10 user types canonical |
| `4-flows/USER-PERSONAS.md` | ❌ TODO | Deep persona per type (pain, goals, behavior) |
| `4-flows/USER-STORIES.md` | ❌ TODO | "As a [user], I want [goal], so that [benefit]" |
| `4-flows/USER-JOURNEY-MAPS.md` | ❌ TODO | End-to-end visual journey per persona |
| `4-flows/USE-CASES.md` | ❌ TODO | Specific scenarios per feature |
| `4-flows/EDGE-CASES.md` | ❌ TODO | Error paths, fraud, unhappy flows |

**Sessions to complete:** 5 · **Time:** ~5 hours

### Layer 3 — Information & Data (the WHAT)

| File | Status | Purpose |
|---|---|---|
| `5-specs/GLOSSARY.md` | ❌ TODO | Every EHB term defined |
| `5-specs/INFORMATION-ARCHITECTURE.md` | ❌ TODO | Entity relationship diagram |
| `5-specs/DATA-DICTIONARY.md` | ❌ TODO | Every field, type, validation, source |
| `5-specs/BUSINESS-RULES-CATALOG.md` | ❌ TODO | All formulas (STL, slashing %, splits) |
| `5-specs/STATE-MACHINES.md` | ❌ TODO | Order, User, Lock, Complaint lifecycles |
| `5-specs/PERMISSION-MATRIX.md` | ❌ TODO | RBAC — who can do what |

**Sessions to complete:** 6 · **Time:** ~6 hours

### Layer 4 — Features & Workflows (the WHAT to build)

| File | Status | Purpose |
|---|---|---|
| `3-departments/*.md` (17 files) | ✓ done | Per-department canonical specs |
| `3-departments/Industries.md` (38 industries) | ✓ done | Canonical industries |
| `4-flows/FEATURE-CATALOG.md` | ❌ TODO | Every feature with priority (MoSCoW) |
| `4-flows/WORKFLOW-DIAGRAMS.md` | ❌ TODO | Process flows |
| `4-flows/INTEGRATION-MAP.md` | ❌ TODO | Department interconnections |
| `4-flows/ADMIN-DASHBOARD-SPECS.md` | ⚠ partial | DMO dashboards detail |
| `4-flows/INDUSTRY-DETAIL-SPECS/` (folder) | ⚠ partial | Per-industry deep-dive (38 files) |

**Sessions to complete:** 4 base + 38 per-industry · **Time:** ~6 hours base + 19 hours industries

### Layer 5 — Design & UX (the LOOK)

| File | Status | Purpose |
|---|---|---|
| `5-specs/BRAND-GUIDELINES.md` | ❌ TODO | Colors, typography, voice, tone |
| `5-specs/DESIGN-SYSTEM.md` | ⚠ scattered | Tokens, components, patterns |
| `8-prototypes/wireframes/` | ❌ TODO | Per-screen low-fi mockups |
| `8-prototypes/mockups/` | ⚠ 8 done | High-fi mockups |
| `5-specs/INTERACTION-SPECS.md` | ❌ TODO | Animations, transitions, micro-UX |
| `5-specs/ACCESSIBILITY.md` | ❌ TODO | WCAG, keyboard nav, screen readers |
| `5-specs/LOCALIZATION-PLAN.md` | ❌ TODO | Urdu/English/Sindhi/Pashto strategy |

**Sessions to complete:** 7 · **Time:** ~7 hours

### Layer 6 — Technical Architecture (the HOW)

| File | Status | Purpose |
|---|---|---|
| `5-specs/EHB-API-SPEC.md` | ✓ done | All API endpoints |
| `5-specs/EHB-DATABASE-SCHEMA.md` | ✓ done | DB schema |
| `5-specs/EHB-BUILD-BLUEPRINT.md` | ✓ done | Build approach |
| `5-specs/SYSTEM-ARCHITECTURE.md` | ❌ TODO | Service boundaries diagram |
| `5-specs/ADAPTER-SPECS.md` | ⚠ partial | KYC, payment, blockchain adapters |
| `5-specs/SECURITY-THREAT-MODEL.md` | ❌ TODO | Attack surfaces, mitigations |
| `5-specs/OBSERVABILITY-PLAN.md` | ❌ TODO | Logs, metrics, alerts, tracing |
| `5-specs/DEPLOYMENT-TOPOLOGY.md` | ❌ TODO | Production infra map |

**Sessions to complete:** 5 · **Time:** ~5 hours

### Layer 7 — Operations & Delivery (the WHEN/WHO)

| File | Status | Purpose |
|---|---|---|
| `7-affiliate/*` (7 files) | ✓ done | Affiliate runbooks template |
| `2-phases/SPRINT-BACKLOG.md` | ❌ TODO | Sprint-by-sprint feature list |
| `2-phases/BUILD-ORDER.md` | ❌ TODO | Dependency order |
| `5-specs/TEST-PLAN.md` | ❌ TODO | Unit + integration + e2e |
| `5-specs/QA-CHECKLIST.md` | ❌ TODO | Per-feature QA steps |
| `5-specs/COMPLIANCE-MATRIX.md` | ❌ TODO | GDPR, AML, KYC by country |
| `2-phases/LAUNCH-RUNBOOK.md` | ❌ TODO | Go-live steps |
| `2-phases/SUPPORT-PLAYBOOK.md` | ❌ TODO | Common issues + fixes |
| `2-phases/DR-PLAN.md` | ❌ TODO | Disaster recovery |
| `1-master/COST-ESTIMATES.md` | ❌ TODO | Build + operate costs |
| `0-index/CHANGELOG.md` | ❌ TODO | Major decisions log |
| `RUN-LOCAL.md` (root) | ✓ done | Dev run instructions |

**Sessions to complete:** 8 (some auto-generate from earlier layers) · **Time:** ~6 hours

---

## 4. The auto-workflow (per session)

### Step 1 — Founder text input

> "Aaj user stories karne hain"
> or
> "Healthcare industry detail batao"
> or
> "Wallet ka complete spec bana lo"

### Step 2 — Claude reads canonical (auto)

- `_settings/REGISTRY.json` — find topic owner
- `_settings/DOMAIN-MAP.md` — find related files
- Read 2-5 relevant existing files to ground

### Step 3 — Claude asks targeted questions (template format)

```
🎯 Headline: aaj kya karenge
📊 Visual: current state diagram
✅ Kya hua: [empty for new topic]
❓ Kya pending: 5 sub-questions for this topic
🚀 Agla kya: A/B/C/D options
```

### Step 4 — Founder picks options + adds custom rules (text)

```
"A, B, custom: rule X = Y"
or
"4 hours of free consultation per Buyer per month"
```

### Step 5 — Claude auto-generates

- Spec file in correct folder
- Visual mockup (SVG)
- Cross-reference update in REGISTRY.json
- Update related files (per UPDATE-RULES.md)
- Version bump on changed files

### Step 6 — Founder approves or tweaks

> "Approved"
> or
> "X ko Y se replace karen"

### Step 7 — Claude finalizes

- Save final version
- Update changelog table
- Update `ehb-status.json`
- Show summary in template format

---

## 5. Recommended completion order

| Phase | Sessions | Layers | Why this order |
|---|---|---|---|
| Foundation | 1-3 | Layer 1 | Vision pakka karein, baaki cheezen us pe build hongi |
| User-first | 4-8 | Layer 2 | Users samajh ke baqi sab decisions easy hote hain |
| Information | 9-14 | Layer 3 | Data model + glossary baqi specs ka foundation |
| Design | 15-21 | Layer 5 | Visual mockups dikha ke approve karwa lein pehle |
| Features detail | 22-26 | Layer 4 | Per-industry deep-dive |
| Tech + Ops | 27-30 | Layer 6 + 7 | Build & launch ready |

**Total:** ~30 sessions · 25-30 hours founder time · 4 weeks @ 1 hr/day OR 8 weeks @ 30 min/day

---

## 6. After plan complete

Once 100% planning is done, build phase has its own sessions:

- ~50 sessions to fully build Phase-1 (6 industries + DMO + AI marketplace)
- Each session: 1 feature OR 1 industry
- Same workflow: founder text → claude generates code + tests
- All grounded on the canonical plan files

---

## 7. The non-negotiable rules

1. **Every file is canonical** — single source of truth, version-controlled
2. **Every change is tracked** — changelog row + status pulse
3. **No surprise files** — REGISTRY.json knows everything
4. **No code without spec** — spec file precedes code
5. **No spec without visual** — visual mockup precedes spec lock
6. **Founder approves all major decisions** — never auto-decide on ambiguity
7. **Bilingual + non-technical** — Roman-Urdu summaries everywhere
8. **Rollback-ready** — backup before destructive change
9. **Cross-references mandatory** — file mentions related files
10. **Open questions surface** — never bury contradictions

---

## 8. Today's recommendation

**Session 1 starts with Layer 1 — Vision lock.**

Founder ko 5 questions answer karne hain (text only):

1. EHB ka real-world goal kya hai? (1 line)
2. 5 saal mein kahan dekhna chahte hain?
3. Pakistan first ya global pehle din se?
4. Free tier vs paid — kahan se revenue?
5. Sab se bara risk kya hai?

**Output:** `1-master/BUSINESS-MODEL.md` + `1-master/SUCCESS-METRICS.md` + `1-master/RISK-REGISTER.md` + visual.

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial workflow doc — 7 layers, ~40 files, 25-30 session estimate, text-only input model |
