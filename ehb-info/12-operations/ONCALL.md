# On-Call — EHB Platform

> **Owner:** Engineering Lead
> **Tooling:** PagerDuty (or equivalent)

## Rotation
- Primary on-call: 1 week shift
- Secondary on-call: 1 week shift, escalation backup
- Hand-off: Monday 09:00 local
- Compensation: per-hour stipend + comp time

## Severity Levels

| Severity | Definition | Response | Escalation |
|----------|------------|----------|------------|
| SEV-1 | Customer-facing total outage | 5 min | Page primary + secondary + Eng Lead |
| SEV-2 | Major feature broken | 15 min | Page primary |
| SEV-3 | Degraded but workable | 1 hour | Slack + ticket |
| SEV-4 | Cosmetic / non-urgent | Next business day | Ticket |

## Pageable Alerts
- API 5xx rate > 1% for 5 min
- Health check fail (3 consecutive)
- Database connection pool exhausted
- Payment provider down
- Auth service down
- Disk > 90% full
- Anchor failure rate > 5%

## Non-Pageable (Slack only)
- API p95 latency degraded
- Disk > 75%
- SSL cert expiring < 30 days
- Backup job failed
- Test suite red on main

## Runbook Access
Every alert links to a runbook in `RUNBOOKS.md`. If no runbook exists, on-call writes one as part of incident closure.

## Hand-Off Checklist
- [ ] Open incidents documented
- [ ] Active alerts acknowledged
- [ ] Recent changes flagged
- [ ] Known risks listed

## Linked
- `INCIDENT-RESPONSE.md`
- `RUNBOOKS.md`
- `MONITORING.md`
