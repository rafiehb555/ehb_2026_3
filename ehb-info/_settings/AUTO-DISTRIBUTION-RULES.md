# EHB · Auto-Distribution Rules

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** When new content arrives, where does it go? Eliminate guesswork, prevent misfiled content.

---

## 🎯 Master rule

> **Founder gives content → AI auto-routes to correct folder. NEVER asks "where to put this".**

If the routing is unclear → check `SOURCE-OF-TRUTH.md` first, then ask founder ONE question to clarify.

---

## 📋 Content type → folder mapping

### Core categories

| Content type | Goes to | Owner file pattern |
|---|---|---|
| Vision / Mission / Strategy | `1-master/` | VISION.md, MISSION.md, etc. |
| Phase plans | `2-phases/` | PHASE-X-PLAN.md |
| Department spec (one of 17) | `3-departments/` | `<DeptName>.md` |
| Per-industry detail | `3-departments/industries/` | `<CODE>.md` |
| User flow / journey | `4-flows/` | `<FLOW-NAME>.md` |
| User types / personas | `4-flows/` | EHB-USER-TYPES.md, USER-PERSONAS.md |
| Permissions / roles | `4-flows/` | USER-ROLES-PERMISSIONS.md |
| Tokenomics / lock / yield | `5-economy/` | TOKENOMICS.md, LOCK-LOGIC.md |
| API spec / DB schema / tech | `5-specs/` | EHB-API-SPEC.md, DATABASE-SCHEMA.md |
| Audit / decisions log | `6-audits/` | EHB-X-AUDIT.md |
| Affiliate runbooks | `7-affiliate/` | AFFILIATE-X.md |
| HTML mockups | `8-prototypes/` | <name>.html |
| Verification / rating / badges | `8-trust-system/` | VERIFICATION.md, BADGES.md |
| Deprecated files | `9-archive/` | (move with -DEPRECATED suffix) |
| Legal / compliance | `9-legal/` | TERMS.md, PRIVACY.md |
| AI engines / models | `10-ai-system/` | RECOMMENDATION-ENGINE.md, etc. |
| Franchise system | `11-franchise/` | FRANCHISE-X.md |
| Operations (ops layer) | `12-operations/` | SUPPORT.md, SLA.md |
| Analytics | `13-analytics/` | USER-ANALYTICS.md, etc. |
| Marketing / SEO / partnerships | `14-growth/` | MARKETING.md, SEO.md |
| UI / pages / settings | `15-ui-system/` | PAGES-LIST.md, etc. |
| Architecture / control | `_settings/` | EHB-CORE-ENGINE.md, etc. |
| Index / nav / dashboards | `0-index/` | MASTER-DASHBOARD.md, etc. |

### Specific content patterns

| Content keyword | Routes to |
|---|---|
| "STL formula" / "PSS-CRB-DMO" | `3-departments/STL.md` (don't create new) |
| "lock" / "EHBGC lock" / "slashing" | `5-economy/` |
| "industry X" with code (GSM/WMS/...) | `3-departments/industries/<CODE>.md` |
| "flow" / "process" / "lifecycle" | `4-flows/<NAME>-FLOW.md` |
| "page" / "screen" / "dashboard" | `15-ui-system/` |
| "franchise" / "Sub L1-L10" / "Master" / "Country" | `11-franchise/` |
| "AI" / "fraud detection" / "recommendation" | `10-ai-system/` OR `3-departments/AI.md` |
| "country list" / "compliance per country" | `11-franchise/COUNTRY-FRANCHISE-LIST.md` + `9-legal/` |
| "user persona" | `4-flows/USER-PERSONAS.md` |
| "edge case" / "error path" | `4-flows/EDGE-CASES.md` |
| "glossary" / "term definition" | `5-specs/GLOSSARY.md` |
| "test plan" / "QA" | `5-specs/TEST-PLAN.md` |

---

## 🔍 Routing decision tree

```
Question: Where does this content go?

1. Does it fit an existing topic in SOURCE-OF-TRUTH.md?
   YES → Route to that owner
   NO → continue

2. Is it a single-industry detail?
   YES → 3-departments/industries/<CODE>.md
   NO → continue

3. Is it a flow / process?
   YES → 4-flows/
   NO → continue

4. Is it a UI / page / component?
   YES → 15-ui-system/
   NO → continue

5. Is it economic / token / lock / yield?
   YES → 5-economy/
   NO → continue

6. Is it franchise-related?
   YES → 11-franchise/
   NO → continue

7. Is it about a specific dept (PSS/CRB/STL/DMO etc.)?
   YES → 3-departments/<Dept>.md
   NO → continue

8. Is it operational (support/escalation)?
   YES → 12-operations/
   NO → continue

9. Is it analytics?
   YES → 13-analytics/
   NO → continue

10. Is it growth/marketing?
    YES → 14-growth/
    NO → continue

11. Is it legal/compliance?
    YES → 9-legal/
    NO → continue

12. Is it a top-level vision/strategy thing?
    YES → 1-master/
    NO → continue

13. Is it auto-discovery / control architecture?
    YES → _settings/
    NO → ASK FOUNDER for guidance
```

---

## 🚫 Anti-patterns (DO NOT DO)

```
❌ Same content in multiple files
❌ Copy-paste flow from one industry to another
❌ Industry-specific dashboard (use DMO single dashboard)
❌ Creating new folder without explicit founder approval
❌ Putting strategic content in technical folders
❌ Putting technical content in master/ folder
❌ Creating a duplicate "MASTER-X.md" when one exists
```

---

## ✅ When in doubt

1. Check `SOURCE-OF-TRUTH.md` for topic owner
2. Check `REGISTRY.json` for similar entries
3. Search recent files in candidate folder
4. ASK FOUNDER (one targeted question) — don't guess

---

## 🤖 Claude AI behavior (MUST)

When founder gives content:

```
1. Identify topic
2. Look up routing in this file + SOURCE-OF-TRUTH
3. If unique owner: update that file
4. If new topic: add to SOURCE-OF-TRUTH first, then create
5. Never duplicate
6. Reference owner from related files
7. Update REGISTRY.json on new files
8. Update MASTER-DASHBOARD on major change
```

---

## Cross-references

- SOURCE-OF-TRUTH: `SOURCE-OF-TRUTH.md`
- Core Engine: `EHB-CORE-ENGINE.md`
- Registry: `REGISTRY.json`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial auto-distribution rules + decision tree |
