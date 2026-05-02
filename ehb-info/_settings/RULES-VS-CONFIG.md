# EHB · Rules vs Config (separation principle)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Separate immutable principles (RULES) from admin-tunable values (CONFIG).

---

## 🎯 The principle

> **RULES = how the system works (architectural principle, requires founder + dev change)**
> **CONFIG = numbers / values (admin can tune via dashboard)**

If admin needs to change → it's CONFIG.
If founder/dev needs to change → it's RULE.

---

## 📋 Examples (concrete)

### Trust System

| RULE (immutable) | CONFIG (admin-tunable) |
|---|---|
| STL formula structure (PSS+CRB+DMO sum, MIN-chain) | Specific values within (industry multipliers can shift) |
| MIN-chain across 4 layers | What counts as a "layer" |
| Source caps exist | Specific caps (PSS=L5 etc.) |
| 10 levels (L1-L10) | Score band per level |
| Refill required for sellers | Cadence per level (could shift) |
| Slashing for fraud | Specific slash % |

### Lock System

| RULE | CONFIG |
|---|---|
| Lock = entity-level not identity | Specific minimums per tier |
| Industry multiplier exists | Specific multiplier values |
| Unlock has grace period | 15 days (could shift) |
| Slashing exists | Specific schedule (100/25/10/5%) |
| Lock yields some APY | Rate (4-6%) |
| 50% slash cap | Could be 60% (config change) |

### Escrow

| RULE | CONFIG |
|---|---|
| Escrow exists | Specific % (currently 100%) |
| Cooling period exists | Specific days (7-30) |
| Auto-release rule | Threshold for auto |
| Per-mode timing | Mode-specific values |

### Industries

| RULE | CONFIG |
|---|---|
| 38 industries grouped 3-tier | Which industry in which tier |
| Each industry has DMO mode | Specific mode (FAST/BALANCED/STRICT/CRITICAL) |
| Each has CRB checklist | Specific checklist items |
| Each has min-STL gate | Specific gate level |
| Each has industry multiplier | Specific value (1.0× to 2.0×) |
| Compliance varies per country | Specific compliance per country×industry |

### Franchise

| RULE | CONFIG |
|---|---|
| 5-tier hierarchy | Specific names of tiers |
| Country exclusivity | Max co-partners (currently 2) |
| Capital required | Specific amounts per tier |
| Self-growth ladder | Specific promotion thresholds |
| Refill cadence per tier | Specific refill count |

### AI Marketplace

| RULE | CONFIG |
|---|---|
| AI is advisor, not authority | Per-module confidence thresholds |
| STL gates exist | Min STL per module |
| Confidence score required | Threshold for auto-action vs human |

---

## 🔧 How CONFIG is changed

### Admin dashboard

```
DMO Settings (`/dmo/settings`)
   ↓
View current config
   ↓
Edit value
   ↓
Optional: schedule (effective date)
   ↓
Submit (logged + audited)
   ↓
Polkadot anchored
   ↓
Live config update (no code deploy)
```

### Permissions for config changes

| Config category | Required role |
|---|---|
| Industry multipliers | DMO Council |
| Slashing % | DMO Council |
| Yield rate | Founder |
| Min STL gates | DMO Senior |
| Cooling periods | DMO Senior |
| Industry DMO mode | DMO Council |
| Phase rollout flags | Founder |
| EHBGC mint amount | Founder + Board (Phase-3) |

### Audit trail

Every CONFIG change:
- Old value · New value
- Who changed
- When
- Reason
- Effective date
- Polkadot anchor
- Public visible (transparency)

---

## 🔒 How RULES are changed

Rules are immutable in normal operation. To change a RULE:

1. **Founder approves** (always)
2. **58 STL gold-master tests must still pass** (for STL changes)
3. **Migration plan documented**
4. **Backup before deploy**
5. **Phased rollout** (canary deploy)
6. **Rollback ready**

---

## 📁 Where each lives

### RULES → canonical .md files (this is `ehb-info/`)

```
3-departments/STL.md   ← STL formula structure (RULE)
3-departments/Industries.md   ← industry tier structure (RULE)
5-economy/LOCK-LOGIC.md   ← lock principle (RULE)
... etc.
```

### CONFIG → values within those same files OR separate config

```
4-flows/INDUSTRY-STL-MULTIPLIER.md   ← multiplier values (CONFIG)
4-flows/INDUSTRY-RULES.md   ← per-industry numbers (CONFIG)
5-economy/SLASHING-RULES.md   ← slash % (CONFIG)
5-economy/REWARD-YIELD.md   ← yield rate (CONFIG)
15-ui-system/FEATURE-FLAGS.md   ← feature toggles (CONFIG)
```

When admin changes CONFIG → file gets updated → app re-reads → live update.

### Implementation pattern

```typescript
// services/api/src/config/configService.js
const config = readFromCanonicalFiles({
  refreshInterval: 60_000  // re-read every minute
});

// usage
const slashRate = config.slashing.refillMiss;  // 0.10 (10%)
const minSTL_Healthcare = config.industries.WMS.minSTL;  // 4
```

---

## 🚨 Anti-patterns (don't do)

```
❌ Hardcoding magic numbers in code (move to CONFIG)
❌ Putting business RULES in CONFIG (they should be in canonical files)
❌ Letting admin change architectural rules (only founder)
❌ Mixing rule and config in same paragraph (separate clearly)
```

---

## 🤖 Claude AI behavior

When founder gives a value:

```
1. Determine: RULE or CONFIG?
2. If RULE:
   - Update canonical file
   - Bump version
   - Add changelog
   - Note migration plan if structural
3. If CONFIG:
   - Update canonical file with value
   - Note that admin can adjust
   - Reference in `15-ui-system/FEATURE-FLAGS.md` if a flag
```

---

## Cross-references

- Core Engine: `EHB-CORE-ENGINE.md`
- Source of Truth: `SOURCE-OF-TRUTH.md`
- Feature flags: `15-ui-system/FEATURE-FLAGS.md`
- DMO Settings: `3-departments/DMO/DMO-DASHBOARD.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial RULES vs CONFIG separation |
