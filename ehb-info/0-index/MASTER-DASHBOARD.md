# EHB · Master Dashboard (single founder view)

> **Purpose:** Founder ke liye 1-page snapshot — kahan kya hua, kya pending, kya canonical hai.
> Yeh file har major change ke baad auto-update hoti hai. Aap ko kabhi kahin search nahi karna.
>
> **Last updated:** 2026-04-30
> **Auto-maintained by:** Claude

---

## 🎯 Vision (locked)

> **"One Platform. 38+ Industries. 700+ Services. Infinite Trust." — Globally from day 1**

| Item | Status |
|---|---|
| Industries | 38 canonical (open-ended, can grow) |
| Services | 700+ planned (open-ended) |
| Geographic strategy | Global from day 1 (not PK-first) |
| Revenue streams | All 10 streams active |
| Risk posture | All 5 major risk categories acknowledged |

Source: `1-master/BUSINESS-MODEL.md`

---

## 📊 Plan layer status

| Layer | Files done | Files missing | Sessions to complete |
|---|:---:|:---:|:---:|
| 1. Vision & Strategy | 5/9 | 4 | 5 |
| 2. Users & Personas | 1/6 | 5 | 5 |
| 3. Information & Data | 0/6 | 6 | 6 |
| 4. Features & Workflows | 19/24 | 5 | 4 + 38 industries |
| 5. Design & UX | 0/7 | 7 | 7 |
| 6. Technical Architecture | 3/8 | 5 | 5 |
| 7. Operations & Delivery | 9/12 | 3 | 8 |

**Plan completion:** ~37% · **Total sessions to 100%:** ~30

Detail: `1-master/EHB-FULL-PLAN-WORKFLOW.md`

---

## 🟢 Recently locked (this week)

| Date | What | File |
|---|---|---|
| 2026-04-30 | Vision answers (global, all revenues, all risks) | `1-master/BUSINESS-MODEL.md` |
| 2026-04-30 | Success KPIs (5-year horizon) | `1-master/SUCCESS-METRICS.md` |
| 2026-04-30 | 20-risk register | `1-master/RISK-REGISTER.md` |
| 2026-04-30 | Admin panel data auto-collector | `4-flows/ADMIN-PANEL-DATA.md` |
| 2026-04-30 | ehb-info reorganization (10 numbered folders) | `ehb-info/README.md` |
| 2026-04-30 | Auto-discovery (REGISTRY.json + DOMAIN-MAP) | `ehb-info/_settings/` |
| 2026-04-25 | EHBGC lock economics (10 rules locked) | `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16` |
| 2026-04-25 | STL level badge system (10 distinct badges) | `6-audits/...md §12` |
| 2026-04-25 | 38 industries canonical confirmed | `3-departments/Industries.md` v2.0 |

---

## 🟡 Active (in progress)

- Layer 1 vision finalization (3 of 5 questions covered, 2 deeper Qs may follow)
- Lock economics: 3 detail proposals awaiting confirmation (coin table, multipliers, thresholds)
- Insurance.md spec needs separate batch
- 50+ sub-questions from lock batch (yield source, slashing stacking, etc.)

---

## 🔴 Critical missing files (priority)

These should be next to lock to avoid drift:

| Missing file | Why critical | Estimated session |
|---|---|:---:|
| `4-flows/USER-STORIES.md` | "As a..." stories per 10 user types | Session 4-5 |
| `4-flows/USER-JOURNEY-MAPS.md` | End-to-end visual per persona | Session 6 |
| `5-specs/GLOSSARY.md` | Every EHB term defined (STL, CRB, DMO, T6, etc.) | Session 9 |
| `5-specs/DATA-DICTIONARY.md` | Every DB field defined | Session 11 |
| `5-specs/STATE-MACHINES.md` | Order/User/Lock lifecycle | Session 12 |
| `5-specs/BRAND-GUIDELINES.md` | Colors, typography, voice | Session 15 |
| `8-prototypes/wireframes/*` | Per-screen low-fi (40+ screens) | Sessions 16-21 |
| `5-specs/SECURITY-THREAT-MODEL.md` | Attack surfaces | Session 27 |
| `5-specs/COMPLIANCE-MATRIX.md` | Per-country legal | Session 28 |
| `2-phases/SPRINT-BACKLOG.md` | Sprint-by-sprint feature list | Session 29 |

---

## 📂 Quick navigation (canonical files)

### For founders
- `1-master/EHB-MASTER-INFO.md` — vision + departments + industries (the bible)
- `1-master/EHB-MASTER-PLAN.md` — consolidated master plan
- `1-master/EHB-PROJECT-WITH-CLAUDE-PLAYBOOK.md` — 12 founder rules
- `1-master/EHB-FULL-PLAN-WORKFLOW.md` — how we build to 100%
- `0-index/CLAUDE-FOUNDER-COMMUNICATION-RULES.md` — response template
- `0-index/MASTER-DASHBOARD.md` — this file

### For engineering / AI
- `_settings/REGISTRY.json` — machine-readable index
- `_settings/DOMAIN-MAP.md` — topic → file lookup
- `_settings/UPDATE-RULES.md` — propagation rules
- `3-departments/*.md` — 17 dept specs
- `5-specs/EHB-API-SPEC.md` + `EHB-DATABASE-SCHEMA.md` + `EHB-BUILD-BLUEPRINT.md`

### For decision tracking
- `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md` — STL + Lock decisions log

### For admin scope
- `4-flows/ADMIN-PANEL-DATA.md` — admin-side auto-collector

---

## 🚦 Health flags

| System | Status | Notes |
|---|:---:|---|
| Canonical files organized | 🟢 GREEN | 63 files in 10 folders |
| Auto-discovery (registry) | 🟢 GREEN | REGISTRY.json + DOMAIN-MAP up |
| STL formula tests | 🟢 GREEN | 58/58 passing |
| MIN-chain coverage | 🟢 GREEN | 4-layer locked |
| Lock economics | 🟢 GREEN | 10 rules locked + 3 details proposed |
| Vision lock | 🟢 GREEN | Layer 1 complete (this session) |
| Layer 2 (users) | 🟡 YELLOW | 5 files missing |
| Layer 3 (data) | 🔴 RED | 6 files missing — critical |
| Layer 5 (design) | 🔴 RED | 7 files missing |
| Code-spec drift | 🟡 YELLOW | Some legacy STL L0-L8 vs new L1-L10 |

---

## ⚙ Auto-update rules

This file regenerates after every:
- New canonical file created
- Major decision locked
- Phase milestone hit
- Founder vision change

If you ever feel lost in EHB, **start here** — this single page tells you everything.

---

## Changelog

| Date | Update |
|---|---|
| 2026-04-30 | Initial dashboard created · Vision Layer 1 locked · Plan-completion at 37% |
