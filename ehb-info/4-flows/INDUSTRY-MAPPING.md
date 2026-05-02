# EHB · Industry Mapping

> **Status:** Canonical v1.0 · 2026-04-30
> **Source:** `3-departments/Industries.md` v2.0 (38 industries) + departments map

## Industry → Department mapping

Each industry maps to a primary department + secondary supports:

| Code | Industry | Primary Dept | Secondary | DMO Mode | Min STL |
|---|---|---|---|---|---|
| GSM | GoSellr (E-commerce) | Wallet + Franchise | PSS, CRB, DMO | FAST | L1 |
| WMS | World Medical | PSS + CRB | DMO, AI (Diagnosis) | CRITICAL | L4 |
| HPS | Human Performance | CRB + Franchise | PSS, AI (Tutor) | BALANCED | L1 |
| OBS | Online Book Store | Franchise + Affiliate | PSS, CRB | BALANCED | L1 |
| OLS | Online Law Services | PSS + CRB | DMO, AI (Lawyer) | CRITICAL | L3 |
| LDS | Logistics & Delivery | Wallet + Franchise | PSS, Rider | BALANCED | L1 |
| AGTS | Travel Services | Franchise + DMO | Wallet, Affiliate | BALANCED | L1 |
| HMS | Human Machinery | Franchise + DMO | Inspector, CRB | BALANCED | L2 |
| ITS | Industrial Tech | Franchise + CRB | DMO, AI | BALANCED | L2 |
| SOT | Services of Tech | Franchise + CRB | AI, Affiliate | BALANCED | L1 |
| ERS | Real Estate | Franchise + Inspector | DMO, Wallet | STRICT | L2 |
| EFS | Financial Services | Wallet + DMO | PSS, Compliance | CRITICAL | L3 |
| EPS | Professional Services | CRB + Franchise | DMO, AI | BALANCED | L1 |
| EAS | Agriculture | Franchise + Inspector | DMO | BALANCED | L1 |
| ELS | Local Services | Franchise + DMO | Affiliate | FAST | L1 |
| EHB_TUBE | Media Platform | Affiliate + DMO | AI (moderation) | BALANCED | L1 |
| RES | Construction | Franchise + Inspector | CRB, DMO | STRICT | L2 |
| FBS | Food & Beverage | Franchise + DMO | Inspector, Rider | FAST | L1 |
| ATS | Automotive | Franchise + CRB | Inspector | BALANCED | L2 |
| CNS | Construction & Engg | Franchise + Inspector | CRB | STRICT | L2 |
| BCS | Beauty & Cosmetics | Franchise + DMO | CRB | FAST | L1 |
| FWS | Fashion | Franchise + Affiliate | CRB | BALANCED | L1 |
| MAS | Manufacturing | Franchise + Inspector | CRB | BALANCED | L2 |
| GES | Gaming | Affiliate + DMO | AI | BALANCED | L1 |
| EHB_MUSIC | Music | Affiliate + DMO | CRB | BALANCED | L1 |
| PTS | Pets | Franchise + CRB | Inspector | BALANCED | L2 |
| WES | Weddings | Franchise + DMO | Affiliate | BALANCED | L1 |
| FIN | Finance & Investment | Wallet + DMO | Compliance, PSS | CRITICAL | L4 |
| TCS | Telecom | Franchise + CRB | DMO | BALANCED | L2 |
| MFS | Food Safety | Inspector + CRB | DMO | STRICT | L3 |
| EDS | Education | Franchise + Affiliate | CRB, AI | BALANCED | L1 |
| GSS | Green & Sustainable | Franchise + Inspector | CRB | BALANCED | L1 |
| INS | Insurance | Wallet + Compliance | DMO, Actuary | CRITICAL | L3 |
| LSM | Supply Chain | Franchise + Inspector | DMO | STRICT | L2 |
| HCS | Health Compliance | Inspector + CRB | DMO | STRICT | L3 |
| SCS | Security & Cyber | Franchise + CRB | DMO, AI | CRITICAL | L3 |
| RRS | Research & R&D | CRB + Affiliate | AI | BALANCED | L2 |
| CMS | Consulting | Franchise + CRB | Affiliate | BALANCED | L1 |

## Industry → AI Marketplace mapping

| Industry | AI Module | Min STL for AI |
|---|---|---|
| GSM | Recommend Engine, Business Advisor | L3 / L5 |
| WMS | Diagnosis AI | L7 |
| HPS, EDS | AI Tutor | L3 |
| OLS | Lawyer AI | L5 |
| Multiple | Resume Helper (JPS) | L3 |
| DMO | Fraud Detection | L9 |

## Industry → Compliance bucket

| Bucket | Industries | Audit cadence |
|---|---|---|
| Premium Secure | WMS, OLS, FIN, INS, SCS | 3-12 months |
| High Secure | RES, CNS, MFS, HCS, EFS, LSM | 6 months |
| Medium Secure | ATS, ITS, MAS, TCS, ERS, PTS | 6 months |
| Basic Secure | GSM, FBS, BCS, FWS, ELS, etc. | 12 months |

## Industry → STL Multiplier (lock formula)

Per `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.2`:

```
Final Lock = Base STL Lock × Industry Multiplier
```

See `INDUSTRY-STL-MULTIPLIER.md` for the multiplier table.

## Cross-references

- Industries canonical: `3-departments/Industries.md`
- Industry STL multipliers: `INDUSTRY-STL-MULTIPLIER.md`
- Department specs: `EHB-DEPARTMENTS-MAP.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | All 38 industries mapped to depts + DMO modes + AI + compliance |
