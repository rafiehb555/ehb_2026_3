# EHB · Industry Template

> **Status:** Template · use as basis for every industry sub-spec
> **Locked:** 2026-04-30

## Standard sections (every industry file MUST have)

```
1. Quick facts (code, name, tier, min STL, DMO mode, multiplier)
2. Description (what this industry does on EHB)
3. Franchise hierarchy (5-tier per EHB-INDUSTRY-FRANCHISE-MAP.md)
4. CRB checklist (industry-specific verification)
5. AI prompts (domain knowledge for AI advisors)
6. UI fields (industry-specific data)
7. Compliance (per country)
8. Listing rules + STL gates
9. Earnings model
10. Common complaints + handling
11. Cross-references
12. Changelog
```

## Why every industry needs its own file

- Per-industry detail required for full plan
- Developers + AI need industry-specific config
- Compliance varies per country × industry
- AI prompts must be domain-aware
- Not all rules are universal — some industries have unique needs (e.g., medical license verification, bar registration)

## Connection to Core Engine

Every industry file connects to:
- **AI Core** (`_settings/EHB-CORE-ENGINE.md §A`)
- **Wallet Core** (§C)
- **Trust Core** (§D)
- **Flow Engine** (§E)
- **Blockchain** (§B)

NO duplicate infrastructure. Just industry-specific config.
