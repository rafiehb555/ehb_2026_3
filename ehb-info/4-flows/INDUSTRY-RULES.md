# EHB · Industry Rules Catalog

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Per-industry rules that gate listings, transactions, and behaviors.

## Universal rules (apply to all industries)

| # | Rule | Enforcement |
|---|---|---|
| 1 | Min STL to list = industry-specific | UI gate · API check |
| 2 | EHBGC lock required for sellers | Wallet adapter |
| 3 | DMO mode determines approval speed | DMO routing |
| 4 | Industry boost applies to lock | Lock formula |
| 5 | Refill cadence per CRB level | Refill tracker |
| 6 | Cross-industry STL portability | STL composite |
| 7 | Country-specific compliance | Compliance matrix |
| 8 | Annual re-verification | PSS scheduler |

## Per-industry minimums

| Industry | Min STL to list | Min EHBGC lock | Industry mult | Refill cadence | Audit |
|---|:---:|---:|:---:|:---:|---|
| GSM | L1 | 20 (× 1.3 = 26) | 1.3× | 6 mo | 12 mo |
| WMS | L4 | 100 (× 2.0 = 200) | 2.0× | 3 mo | 3 mo |
| HPS | L1 | 20 (× 1.2 = 24) | 1.2× | 6 mo | 12 mo |
| OBS | L1 | 20 (× 1.0 = 20) | 1.0× | 6 mo | 12 mo |
| OLS | L3 | 40 (× 2.0 = 80) | 2.0× | 12 mo | 12 mo |
| LDS | L1 | 50 (Rider tier × 1.0) | 1.0× | 6 mo | 12 mo |
| AGTS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| HMS | L2 | 40 × 1.5 = 60 | 1.5× | 6 mo | 6 mo |
| ITS | L2 | 40 × 1.3 = 52 | 1.3× | 6 mo | 6 mo |
| SOT | L1 | 20 × 1.3 = 26 | 1.3× | 6 mo | 6 mo |
| ERS | L2 | 40 × 1.5 = 60 | 1.5× | 6 mo | 6 mo |
| EFS | L3 | 40 × 2.0 = 80 | 2.0× | 6 mo | 3 mo |
| EPS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| EAS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| ELS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| EHB_TUBE | L1 | 20 × 1.0 | 1.0× | 12 mo | 12 mo |
| RES | L2 | 40 × 1.5 = 60 | 1.5× | 6 mo | 6 mo |
| FBS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| ATS | L2 | 40 × 1.2 = 48 | 1.2× | 6 mo | 6 mo |
| CNS | L2 | 40 × 1.5 = 60 | 1.5× | 6 mo | 6 mo |
| BCS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| FWS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| MAS | L2 | 40 × 1.2 = 48 | 1.2× | 6 mo | 6 mo |
| GES | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| EHB_MUSIC | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| PTS | L2 | 40 × 1.1 = 44 | 1.1× | 6 mo | 6 mo |
| WES | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |
| FIN | L4 | 100 × 2.0 = 200 | 2.0× | 6 mo | 3 mo |
| TCS | L2 | 40 × 1.2 = 48 | 1.2× | 6 mo | 6 mo |
| MFS | L3 | 40 × 1.5 = 60 | 1.5× | 6 mo | 3 mo |
| EDS | L1 | 20 × 1.2 = 24 | 1.2× | 6 mo | 12 mo |
| GSS | L1 | 20 × 1.1 = 22 | 1.1× | 6 mo | 12 mo |
| INS | L3 | 40 × 2.0 = 80 | 2.0× | 6 mo | 3 mo |
| LSM | L2 | 40 × 1.5 = 60 | 1.5× | 6 mo | 6 mo |
| HCS | L3 | 40 × 1.5 = 60 | 1.5× | 6 mo | 3 mo |
| SCS | L3 | 40 × 1.5 = 60 | 1.5× | 6 mo | 3 mo |
| RRS | L2 | 40 × 1.2 = 48 | 1.2× | 6 mo | 6 mo |
| CMS | L1 | 20 × 1.0 | 1.0× | 6 mo | 12 mo |

## High-risk industry special rules

### Healthcare (WMS) + Health Compliance (HCS)

- Mandatory Diagnosis AI confidence ≥90% for medical advisories
- Doctor-reviewed flag mandatory on AI advice
- HIPAA-aligned data handling
- License verification per country
- Re-verification every 3 months

### Legal (OLS) + Legal Support (ELS)

- Bar number verification per jurisdiction
- Confidentiality clause: client data encrypted
- Legal liability disclaimer mandatory
- 12-month re-verification

### Financial (FIN, EFS, INS)

- KYB mandatory for company entities
- AML compliance per country
- Capital reserves minimum (per local regulation)
- 3-month audit cadence
- Critical-mode DMO approval (7-14 days)

### Construction & Engineering (RES, CNS)

- Contractor license per region
- Safety training cert
- Liability insurance proof
- On-site Inspector verification at L4+

## Open questions per industry

Founder needs to confirm specific:
- Pricing range per industry (typical service cost)
- Local language support priority per region
- Which industries to launch first per country
- Insurance partner per country

## Cross-references

- Industries: `3-departments/Industries.md`
- Mapping: `INDUSTRY-MAPPING.md`
- Multipliers: `INDUSTRY-STL-MULTIPLIER.md`
- Compliance: `5-specs/COMPLIANCE-MATRIX.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | All 38 industries with min STL + lock + multiplier + refill + audit |
