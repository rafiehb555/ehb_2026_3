# Disaster Recovery — EHB Platform

> **Owner:** SRE + Founder
> **Combined with:** `BACKUP-DR.md` (this doc covers full disaster scenarios beyond backup)

## Disaster Scenarios

### S1 — Region Failure
- Primary region down
- Failover to secondary region
- DNS swing < 60s TTL
- RTO: 4 hours
- RPO: 1 hour

### S2 — Database Catastrophic Loss
- Primary DB unrecoverable
- Restore from snapshot + oplog
- RTO: 8 hours
- RPO: < 1 hour (oplog gap)

### S3 — Polkadot Anchor Failure
- Polkadot network down or compromised
- Local audit log continues
- Re-anchor when available
- No user impact (anchor is async)

### S4 — Auth Service Compromise
- Suspected JWT key compromise
- Rotate signing key (new tokens only)
- Force re-login
- Audit access logs
- Customer notification per privacy law

### S5 — Major Service Outage (>4h)
- Status page updated
- Customer comms via email + SMS
- Refunds where SLA violated
- Post-mortem within 5 days

### S6 — Country Block / Sanction
- One country blocks EHB
- Geo-fence + freeze new ops
- Existing user data preserved
- Refund + payout open orders
- Legal counsel + Founder decide path

### S7 — Founder / Key Person Unavailable
- Succession plan documented (sealed envelope with Counsel)
- Council can act in interim
- Polkadot keys sharded so no single point

### S8 — Total Data Loss + Backup Loss
- Worst case
- Polkadot anchors provide rebuild seed
- User STL + lock state recoverable from chain
- Order fulfilment state may be lost — communicate honestly

## Drill Schedule
- S1 region failover: quarterly
- S2 DB restore: monthly
- S3 anchor failure: quarterly
- S4 key rotation: annually
- S5 outage simulation: annually
- Tabletop on S6-S8: annually with Council

## Communication Plan
- Internal: Slack #incident + war room
- Customers: status page + email + SMS for affected
- Press: only via Founder / spokesperson
- Regulators: per legal requirement (24-72h on data breach)

## Linked
- `BACKUP-DR.md`
- `INCIDENT-RESPONSE.md`
- `../6-audits/SECURITY-AUDIT.md`
- `../1-master/RISK-REGISTER.md`
