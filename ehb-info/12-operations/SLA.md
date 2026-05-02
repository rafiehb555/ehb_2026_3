# EHB · Service Level Agreements

> **Status:** Canonical v1.0 · 2026-04-30

## Platform SLAs (commitment to users)

### Availability
- API uptime: 99.9% (≤ 8.76 hours downtime/year)
- Web app uptime: 99.95%
- Critical services (payment, KYC): 99.99%

### Response time
- API p50: <100ms
- API p99: <500ms
- Page load (LCP): <2.5s
- Search results: <300ms

## Business SLAs

| Action | SLA | Penalty if missed |
|---|---|---|
| KYC review | <24h | Free upgrade priority |
| CRB exam grading | <72h | Refund 50% exam fee |
| Order acceptance (seller) | <24h or auto-decline | -1 STL |
| Refund processing | <48h | Bonus + STL recovery |
| Complaint acknowledgment | <1h (auto) | — |
| Complaint resolution (T1-T3) | <72h | DMO escalation |
| Complaint resolution (T4-T5) | <7 days | Council review |
| Complaint resolution (T6) | <14 days | Council mandatory |
| Slash appeal | <7 days from filing | Council vote |
| Lock release | 30-day cooling end | $50 compensation if delayed |

## Per-DMO-mode SLAs

| Mode | Approval time |
|---|---|
| FAST | <2 hours |
| BALANCED | 1-3 days |
| STRICT | 3-7 days |
| CRITICAL | 7-14 days |

## Per-tier user SLAs

| User STL | Support response | Special perks |
|---|---|---|
| L9-L10 | <30 min | Dedicated CSM |
| L7-L8 | <2h | Priority queue |
| L4-L6 | <5h | Standard |
| L1-L3 | AI-first | Self-service |

## Franchise SLAs (to EHB)

| Franchise commitment | SLA |
|---|---|
| Inspection scheduling | <72h from request |
| Refill submission | Quarterly |
| Complaint first-response | <24h |
| Sub-franchise audit (Master) | Quarterly |
| Country-level reporting | Monthly |

## SLA breach consequences

- Public SLA dashboard (transparency)
- Automatic compensation triggers (where applicable)
- DMO review for systemic breaches
- Public refund / credit if EHB fails major SLA

## Monitoring

- Real-time dashboards for ops team
- Alerts on threshold breaches
- Weekly SLA report
- Monthly trend analysis

## Cross-references

- Support: `SUPPORT.md`
- Escalation: `ESCALATION.md`
- DMO: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial SLA spec |
