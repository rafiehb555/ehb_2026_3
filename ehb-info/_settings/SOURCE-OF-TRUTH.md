# EHB · SOURCE OF TRUTH (single canonical per topic)

> **Status:** Canonical v1.0 · 2026-04-30 · MUST READ FIRST
> **Purpose:** Eliminate duplication. ONE file owns each topic. Other files only reference.

---

## 🔥 THE MASTER RULE

> **Same logic NEVER lives in 2 files.**
> One file = OWNER. All others = REFERENCE only.

If a topic appears in 2 places with different details → that's a bug. Fix immediately.

---

## 📋 Topic ownership table (immutable assignments)

### Trust System

| Topic | OWNER (only place to define) | References allowed in |
|---|---|---|
| STL formula | `3-departments/STL.md` | Anywhere via reference |
| STL ladder (L1-L10) | `3-departments/STL.md §2` | Reference only |
| MIN-chain rule | `3-departments/STL.md §4` | Reference only |
| Source caps (PSS=L5, CRB=L9, DMO=L10) | `3-departments/STL.md §3` | Reference only |
| 5 entity types | `3-departments/STL.md §11` | Reference only |
| PSS verification levels | `3-departments/PSS.md` | Reference only |
| CRB exam + refill | `3-departments/CRB.md` | Reference only |
| DMO governance + modes | `3-departments/DMO.md` | Reference only |
| Industry boost multipliers | `4-flows/INDUSTRY-STL-MULTIPLIER.md` | Reference only |
| Buyer Trust Score | `4-flows/REPUTATION-SYSTEM.md` | Reference only |
| Reviewer weight | `8-trust-system/RATING.md` | Reference only |

### Economy

| Topic | OWNER | References |
|---|---|---|
| EHBGC mechanics | `5-economy/TOKENOMICS.md` | Reference only |
| Lock formula (base × multiplier) | `5-economy/LOCK-LOGIC.md` | Reference only |
| Slashing schedule | `5-economy/SLASHING-RULES.md` | Reference only |
| Yield rules (4-6% APY) | `5-economy/REWARD-YIELD.md` | Reference only |
| Treasury composition | `5-economy/TREASURY-SYSTEM.md` | Reference only |
| Lock matrix per entity | `5-economy/LOCK-LOGIC.md §Per-entity` | Reference only |

### Industries

| Topic | OWNER | References |
|---|---|---|
| 38 industries canonical list | `3-departments/Industries.md` | Reference only |
| Per-industry detail | `3-departments/industries/<CODE>.md` | Reference only |
| Industry mapping | `4-flows/INDUSTRY-MAPPING.md` | Reference only |
| Industry rules (min STL, lock) | `4-flows/INDUSTRY-RULES.md` | Reference only |
| Industry × franchise tier | `11-franchise/EHB-INDUSTRY-FRANCHISE-MAP.md` | Reference only |

### Franchise

| Topic | OWNER | References |
|---|---|---|
| 5-tier hierarchy | `11-franchise/EHB-FRANCHISE-MODEL.md` | Reference only |
| Country list (17) | `11-franchise/COUNTRY-FRANCHISE-LIST.md` | Reference only |
| Per-tier requirements | `11-franchise/FRANCHISE-REQUIREMENTS.md` | Reference only |
| Earnings + revenue split | `11-franchise/FRANCHISE-EARNINGS.md` | Reference only |
| Micro tier (growth engine) | `11-franchise/MICRO-FRANCHISE.md` | Reference only |

### Flows

| Topic | OWNER | References |
|---|---|---|
| Order lifecycle | `4-flows/ORDER-FLOW.md` | Reference only |
| Payment flow | `4-flows/PAYMENT-FLOW.md` | Reference only |
| Escrow flow | `4-flows/ESCROW-FLOW.md` | Reference only |
| Dispute flow | `4-flows/DISPUTE-FLOW.md` | Reference only |
| Refund flow | `4-flows/REFUND-FLOW.md` | Reference only |
| Universal industry flow | `4-flows/INDUSTRY-FLOWS.md` | Reference only |
| User journeys | `4-flows/USER-FLOWS-COMPLETE.md` | Reference only |
| User types (10) | `4-flows/EHB-USER-TYPES.md` | Reference only |
| Roles + permissions | `4-flows/USER-ROLES-PERMISSIONS.md` | Reference only |
| KYC + KYB system | `4-flows/KYC-KYB-SYSTEM.md` | Reference only |
| Reputation system | `4-flows/REPUTATION-SYSTEM.md` | Reference only |
| Admin panel data | `4-flows/ADMIN-PANEL-DATA.md` | Reference only |

### UI System

| Topic | OWNER | References |
|---|---|---|
| Pages catalog | `15-ui-system/PAGES-LIST.md` | Reference only |
| Per-page tools | `15-ui-system/PAGE-TOOLS-MAP.md` | Reference only |
| Page settings | `15-ui-system/PAGE-SETTINGS.md` | Reference only |
| Feature flags | `15-ui-system/FEATURE-FLAGS.md` | Reference only |
| Components | `15-ui-system/COMPONENT-LIBRARY.md` | Reference only |
| UI consistency rules | `15-ui-system/UI-RULES.md` | Reference only |
| Action map (UI→API→Flow) | `15-ui-system/ACTION-MAP.md` | Reference only |
| State management | `15-ui-system/STATE.md` | Reference only |

### Architecture

| Topic | OWNER | References |
|---|---|---|
| Core Engine (5 modules) | `_settings/EHB-CORE-ENGINE.md` | Reference only |
| Anti-duplication rules | `_settings/EHB-CORE-ENGINE.md §7` | Reference only |
| Topic ownership (this file) | `_settings/SOURCE-OF-TRUTH.md` | Reference only |
| Auto-distribution rules | `_settings/AUTO-DISTRIBUTION-RULES.md` | Reference only |
| Data flow | `_settings/DATA-FLOW.md` | Reference only |
| Rules vs Config | `_settings/RULES-VS-CONFIG.md` | Reference only |

### Master / Vision

| Topic | OWNER | References |
|---|---|---|
| Vision (1-line) | `1-master/VISION.md` | Reference only |
| Mission | `1-master/MISSION.md` | Reference only |
| Value proposition | `1-master/VALUE-PROPOSITION.md` | Reference only |
| Business model | `1-master/BUSINESS-MODEL.md` | Reference only |
| Success metrics + KPIs | `1-master/SUCCESS-METRICS.md` | Reference only |
| Risk register | `1-master/RISK-REGISTER.md` | Reference only |
| Master plan | `1-master/EHB-MASTER-PLAN.md` | Reference only |
| Master info (the bible) | `1-master/EHB-MASTER-INFO.md` | All sections OWNER for own topics |

### Legal

| Topic | OWNER | References |
|---|---|---|
| Terms | `9-legal/TERMS.md` | Reference only |
| Privacy | `9-legal/PRIVACY.md` | Reference only |
| KYC laws | `9-legal/KYC-LAWS.md` | Reference only |
| Financial compliance | `9-legal/FINANCIAL-COMPLIANCE.md` | Reference only |

---

## 🔍 How to use this file

### Before writing ANY canonical content:

1. **Search this table** for the topic
2. **If owner exists** → reference it, don't rewrite
3. **If owner doesn't exist** → check related files first
4. **If genuinely new** → add row to this table FIRST, then write owner file

### Reference syntax (use everywhere)

```markdown
See: `3-departments/STL.md §3` for the formula.
```

NOT:
```markdown
The STL formula is: PSS_pts + CRB_pts + DMO_pts ...  ❌ duplicate
```

---

## 🚨 Duplication audit (current state)

These topics are CURRENTLY in multiple files (need consolidation):

| Topic | Owner (correct) | Duplicates to clean up |
|---|---|---|
| STL formula | `3-departments/STL.md §3` | Currently summarized in: MASTER-INFO §4.3, MASTER-DEVELOPMENT-PLAN, audit file §16. **Action:** Keep summaries → reference owner |
| Industry list | `3-departments/Industries.md` | Mentioned in: USER-TYPES, INDUSTRY-MAPPING, MASTER-INFO §5. **Action:** OK as references, verify match |
| Lock formula | `5-economy/LOCK-LOGIC.md` | Also in: STL-AUDIT §16, MASTER-INFO. **Action:** Audit file → reference economy file |
| Franchise tiers | `11-franchise/EHB-FRANCHISE-MODEL.md` | Mentioned in: USER-TYPES (Franchisee), 3-departments/Franchise.md, EARNINGS. **Action:** Old dept file → reference 11-franchise/ |
| 5 entity types | `3-departments/STL.md §11` | Also in: VERIFICATION.md, audit file. **Action:** Reference STL.md |

These will be cleaned up in next batch (incremental audits).

---

## 🤖 Claude AI rule (MUST follow)

When asked to define / update content:

```
1. Search SOURCE-OF-TRUTH.md for topic owner
2. If owner exists:
   a. Update OWNER file
   b. In other files: only reference (don't duplicate logic)
3. If owner doesn't exist:
   a. Add row to SOURCE-OF-TRUTH.md (this file)
   b. Create owner file
   c. References in related files
4. Never write same logic in 2 files
5. If user gives logic, ASK where it should live (or check this file)
```

---

## Cross-references

- Core Engine: `EHB-CORE-ENGINE.md`
- Auto-distribution: `AUTO-DISTRIBUTION-RULES.md`
- Data flow: `DATA-FLOW.md`
- Rules vs Config: `RULES-VS-CONFIG.md`
- Registry: `REGISTRY.json`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial source-of-truth ownership locked + duplication audit |
