# Backup & Disaster Recovery — EHB Platform

> **Owner:** SRE
> **RPO target:** 1 hour (max data loss)
> **RTO target:** 4 hours (max time to recover)

## Backup Schedule

| Asset | Frequency | Retention | Storage |
|-------|-----------|-----------|---------|
| MongoDB primary | Continuous (oplog) | 7 days | Same region replica |
| MongoDB snapshot | Daily 03:00 UTC | 30 days | Cross-region S3 |
| MongoDB monthly | 1st of month | 12 months | Glacier |
| File uploads (S3) | Versioned + replicated | 12 months | Cross-region |
| Polkadot keys | Encrypted, sharded | Forever | HSM + offline |
| Code repos | Mirrored to 2 hosts | Forever | GitHub + GitLab |
| Configs / secrets | Vault snapshots daily | 90 days | Encrypted offsite |

## Recovery Strategy

### Tier 1 — Single service crash (< 5 min)
- Auto-restart by orchestrator (k8s)
- Health check fails → traffic rerouted to healthy pods
- No backup restoration needed

### Tier 2 — Database failover (< 30 min)
- Primary fails → secondary promoted
- Application reconnects via connection-string update
- Test quarterly

### Tier 3 — Region failure (< 4 hours)
- Failover to disaster recovery region
- DNS swing (< 60s TTL)
- Data lag = oplog replication delay (< 1s typical)
- Test annually

### Tier 4 — Complete data loss (< 24 hours)
- Restore latest snapshot from cross-region S3
- Replay oplog forward
- Reanchor critical state to chain

## Test Cadence
- Backup validation: weekly automated restore to scratch env
- Failover drill: quarterly
- Full DR exercise: annually
- Post-test report to DMO Council

## Polkadot Key Custody
- Generated in HSM
- Sharded with Shamir's secret sharing (3 of 5)
- Shards held by separate officers
- Annual rotation drill

## Linked
- `INCIDENT-RESPONSE.md`
- `MONITORING.md`
- `../9-legal/DATA-RETENTION.md`
