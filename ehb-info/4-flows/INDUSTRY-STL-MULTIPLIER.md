# EHB · Industry STL Multiplier Catalog

> **Status:** Canonical v1.0 · 2026-04-30
> **Locked from:** `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.2` (founder confirmed)

## Formula

```
Final Lock = Base STL Lock × Industry Multiplier
```

Example: Service Provider L7 in Healthcare

```
Base L7 lock = 800 EHBGC (per STL ladder)
Industry mult = 2.0 (Healthcare)
Final = 800 × 2.0 = 1,600 EHBGC
```

## All 38 industries — multiplier table

| Multiplier | Industries |
|:---:|---|
| **2.0×** (highest risk / regulated) | WMS · OLS · FIN · INS |
| **1.5×** (high risk / safety-critical) | RES · CNS · ERS · MFS · LSM · HCS · SCS |
| **1.3×** (medium-high risk) | GSM · ITS · SOT |
| **1.2×** (medium risk) | HPS · EDS · ATS · MAS · TCS · RRS |
| **1.1×** (low-medium) | PTS · GSS |
| **1.0×** (base / no boost) | OBS · LDS · AGTS · EPS · EAS · ELS · EHB_TUBE · FBS · BCS · FWS · GES · EHB_MUSIC · WES · CMS |

## Why these multipliers?

| Reason | Industries |
|---|---|
| Life-impact (medical errors → death) | WMS = 2.0 |
| Legal liability (bad legal advice → lawsuits) | OLS = 2.0 |
| Financial fraud (capital loss) | FIN, INS = 2.0 |
| Safety risk (electrical, structural) | RES, CNS = 1.5 |
| Property values | ERS = 1.5 |
| Food safety / supply chain risk | MFS, LSM = 1.5 |
| Compliance / cyber risk | HCS, SCS = 1.5 |
| Volume risk + repeat exposure | GSM = 1.3 |
| Tech / IP risk | ITS, SOT = 1.3 |
| Skill-based service risk | HPS, EDS, ATS, etc. = 1.2 |
| Pet care / sustainability moderate | PTS, GSS = 1.1 |
| Standard commerce | base 1.0 |

## Adjustability

Per locked decision: **admin can adjust live**.

Founder / DMO Council can change a multiplier with:
- Reason logged
- Effective-date stamp
- Grandfathered-in current locks (no retroactive penalty)
- Audit anchor on Polkadot

## Phase rollout strategy

Phase-1 active multipliers: 1.0× to 2.0× (full range, but only 6 industries live)
Phase-2: same range, more industries activate
Phase-3: introduce dynamic multipliers (AI-recommended adjustments based on observed risk)

## Cross-references

- Industries: `3-departments/Industries.md`
- Industry rules: `INDUSTRY-RULES.md`
- Lock formula: `5-economy/LOCK-LOGIC.md` (TODO)
- Locked decisions: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.2`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | All 38 industries with multipliers locked |
