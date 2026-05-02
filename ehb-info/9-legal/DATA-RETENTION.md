# Data Retention Policy — EHB Platform

> **Owner:** DPO + Engineering
> **Standard:** GDPR + per-country law

## Retention Schedule

| Data Class | Active Retention | Post-Closure | Legal Basis |
|------------|------------------|--------------|-------------|
| Account profile | While active | 90 days | Contract |
| Authentication logs | 90 days | — | Security |
| KYC documents | While active | 5 years | AML obligation |
| Order history | 7 years | — | Tax + dispute |
| Payment transactions | 7 years | — | Financial regs |
| Chat / support | 2 years | — | Service quality |
| Email comms | 3 years | — | Marketing law |
| Cookie consent log | 12 months | — | Privacy law |
| Reviews | While account active | Anonymised + retained | Public record |
| STL events | 7 years | Anonymised | Trust integrity |
| Audit chain anchors | Forever | Forever | Immutable log |
| Backups | 30 days rolling | — | DR |
| Application logs | 90 days | — | Ops |

## Deletion Requests

### User-initiated (DSAR)
- Request via account settings or `dpo@ehb.com`
- Acknowledged within 72h
- Completed within 30 days (90 days if complex)
- Confirmation email + log entry

### What can be deleted
- Profile info (name, photo, bio)
- Listings + content
- Direct messages
- Marketing preferences

### What is retained (with legal basis)
- Transactions (tax + AML)
- KYC (AML)
- STL audit log (anonymised — pseudo ID kept)
- Chain anchors (immutable)
- Disputed accounts (until resolution)

## Anonymisation Strategy
- Replace user_id with random pseudo-id
- Strip name, email, phone, IP
- Aggregate analytics
- Maintain referential integrity for transaction reports

## Backup Policy
- Daily incremental, 7-day retention
- Weekly full, 4-week retention
- Monthly full, 12-month retention (encrypted offsite)
- Yearly archive, 7-year retention (legal hold)

## Legal Hold
- Override deletion if litigation, regulator request, or tax audit
- Documented in legal-hold register
- Released only with Counsel sign-off

## Linked
- `PRIVACY.md`
- `AML-POLICY.md`
- `12-operations/BACKUP-DR.md`
