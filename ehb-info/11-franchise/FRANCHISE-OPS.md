# EHB · Franchise Operations (day-to-day)

> **Status:** Canonical v1.0 · 2026-04-30
> **Note:** Operational rules — not admin panel (per architecture rule, dashboard = DMO single source).

## Daily operations

| Activity | Frequency | Owner |
|---|---|---|
| User verifications | As-requested | Franchise + Inspector |
| CRB exam scheduling | Weekly batch | Franchise |
| Order monitoring | Real-time | DMO + Franchise |
| Complaint resolution | Within SLA | Franchise → Master if needed |
| Inspector deployment | Daily | Franchise |
| Refill audits | Quarterly | Franchise + DMO |
| Local marketing | Continuous | Franchise |
| Compliance check | Monthly | Franchise + Country |
| Weekly report to EHB | Weekly | All tiers |

## SLAs (per-tier)

| Action | Sub | Master | Country |
|---|---|---|---|
| User verification | <72h | Quality check on Sub | — |
| Complaint first-response | <24h | <12h escalations | <2h crisis |
| Inspector dispatch | <48h | Cross-Sub coord | Country mandate |
| Refill submission | Quarterly | Audit subs | Audit masters |
| Report to EHB | Weekly | Monthly | Quarterly |

## Penalty thresholds (operations)

| Violation | Action |
|---|---|
| SLA missed × 1 | Warning |
| SLA missed × 3 | -1 STL |
| SLA missed × 5+ | 5% slash + DMO review |
| Customer complaint upheld | -1 STL per |
| Inspector misconduct | -3 STL + slash |
| Compliance breach | Country review + possible termination |

## Refill cycle (operational)

Quarterly refill = mandatory submission of:
- Activity report (orders, KPIs)
- Quality audit (sample reviews)
- Compliance status (per country)
- Inspector performance
- Financial reconciliation

Missed refill = penalty per `FRANCHISE-PENALTY.md`.

## Inspector management

Franchise hires + trains inspectors:
- 2 minimum at Sub L4+
- 5 minimum at Master
- Inspector salary $300-1000/month (per country)
- Performance reviews monthly
- Misconduct = inspector banned + franchise STL drop

## Conflict resolution

| Conflict | Resolved by |
|---|---|
| User dispute | Sub franchise (T1-T3) |
| Sub vs Sub conflict | Master arbitrates |
| Sub vs Master | Country arbitrates |
| Master vs Master | Country |
| Country vs Country | EHB HQ + Founder |

## Cross-references

- Master model: `EHB-FRANCHISE-MODEL.md`
- Penalty: `FRANCHISE-PENALTY.md`
- Verification: `FRANCHISE-VERIFICATION.md`
- DMO Dashboard: `3-departments/DMO/DMO-DASHBOARD.md` (single dashboard source)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial operations rules |
