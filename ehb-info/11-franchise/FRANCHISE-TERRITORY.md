# EHB · Franchise Territory Control

> **Status:** Canonical v1.0 · 2026-04-30

## Territory definition

A **territory** is the exclusive operational area of a franchise. Defined by:

1. **Geographic boundary** (city, district, region, country)
2. **Industry coverage** (all-industry, single-industry, curated)
3. **Tier scope** (Sub vs Master vs Country)

Format: `<Country>-<Region>-<City-Zone>-<Tier>-<Industry>`
Example: `PK-R1-Karachi-Saddar-Sub L5-AllIndustries`

## Territory ID system

```
Country (2 letters · ISO)        PK
Region (R1, R2, R3...)           R1
City                             Karachi
Zone (P1, P2, P3...)             P1
Tier                             Sub L5
Industry (A=All / specific)      A or WMS or OLS

Final: PK-R1-Karachi-P1-SubL5-A
```

## Geographic granularity per tier

| Tier | Typical area |
|---|---|
| Sub L1 | 1-3 sq km · 50K-100K population |
| Sub L5 | 5-10 sq km · 200K-500K population |
| Sub L10 | 20+ sq km · 1M+ population (premium central districts) |
| Master | Full metro / city · 1-5M population |
| Corporate | Major region · 5-25M population |
| Country | Entire country · varies |

## Exclusivity rules

1. **One Sub franchise per zone per industry** — no overlap
2. **Multiple Subs per city** allowed (different zones)
3. **One Master per metro** — exclusive
4. **One Country per country** — exclusive
5. **Industry sub-franchise** can co-exist with all-industry Sub (e.g., dedicated Healthcare Franchise + general Sub in same zone)

## Territory ownership

- Locked at signup
- 5-year term default
- Renewable
- Non-transferable without DMO approval
- Reverts to "available" on franchise termination

## Cross-territory rules

- User in Territory A buying from Seller in Territory B:
  - Buyer's franchise = no commission
  - Seller's franchise = full 40% Sub commission
  - Buyer's franchise can earn via verification fees only

- This prevents franchise wars over individual users.

## Territory map

EHB maintains live territory map:
- Public layer: who's the franchise (transparent)
- Internal layer: KPIs, complaints, stats per territory
- Available territories: highlighted for new applicants

## Territory disputes

| Dispute | Resolution |
|---|---|
| Boundary unclear | Master franchise mediates |
| Industry overlap | Country tier decides |
| Customer poaching | DMO Council reviews patterns |
| Sub vs Sub conflict | Master arbitrates |

## Expansion / contraction

Franchise can request:
- **Territory expansion** (need approval, maybe additional capital)
- **Industry expansion** (add new industries to scope)
- **Tier promotion** (Sub L5 → L7 by performance)
- **Tier upgrade** (Sub → Master if metro slot opens)

Conversely:
- **Territory contraction** (split if too large to manage)
- **Industry restriction** (lose access to industry on poor performance)
- **Tier demotion** (Sub L7 → L5 on performance miss)

## Cross-references

- Types: `FRANCHISE-TYPES.md`
- Penalty: `FRANCHISE-PENALTY.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial territory control spec |
