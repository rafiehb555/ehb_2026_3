# Security Audit — EHB Platform

> **Owner:** Security Team / DMO Council
> **Cadence:** Quarterly + on every major release
> **Status:** Template (first audit pending)

## Scope
Authentication, authorization, data-at-rest, data-in-transit, dependencies, secrets, audit trail, blockchain anchor integrity.

## Audit Checklist

### Authentication
- [ ] JWT secret rotation policy (90 days)
- [ ] Refresh token revocation working
- [ ] Password hashing (PBKDF2, 100k iterations) verified
- [ ] Recent-auth gate (1h) on sensitive ops enforced
- [ ] API key scopes correctly restricted
- [ ] No plaintext credentials in logs

### Authorization
- [ ] STL gate middleware on all gated routes
- [ ] Role hierarchy correctly enforced
- [ ] Industry-specific min-STL respected
- [ ] DMO/PSS/CRB routes restricted to officers
- [ ] No client-side-only auth checks

### Data
- [ ] MongoDB at-rest encryption enabled
- [ ] TLS 1.3 enforced on all endpoints
- [ ] PII masked in logs
- [ ] Backup encryption verified
- [ ] Old data retention policy applied (see DATA-RETENTION.md)

### Dependencies
- [ ] `npm audit` 0 high/critical vulns
- [ ] Snyk/Dependabot enabled
- [ ] No deprecated packages in production
- [ ] Vendor security reviews (Stripe, JazzCash, OpenAI)

### Secrets
- [ ] No `.env` committed
- [ ] AWS Secrets Manager / Vault configured
- [ ] CI/CD secrets rotated quarterly
- [ ] No hardcoded keys in source

### Audit Trail
- [ ] Every order anchored to Polkadot
- [ ] STL events logged + anchored
- [ ] Slashing events immutable
- [ ] Admin actions logged with actor + reason

### Blockchain Integrity
- [ ] Hash verification on read
- [ ] Tamper detection alerts wired
- [ ] Block number monotonic
- [ ] Adapter swap doesn't break audit history

## Threat Categories Tested
- Account takeover (credential stuffing, session hijack)
- Privilege escalation (STL spoofing, role injection)
- Data exfiltration (SQL injection, NoSQL injection)
- Money tampering (escrow bypass, slash bypass)
- Trust gaming (review fraud, fake STL)

## Findings Severity
- **P0** — actively exploitable, fix in 24h
- **P1** — exploitable with effort, fix in 7d
- **P2** — theoretical, fix in 30d
- **P3** — hardening, fix in 90d

## Sign-off
Security Lead · DMO Council · Founder

## Linked
- `THREAT-MODEL.md`
- `9-legal/AML-POLICY.md`
- `12-operations/INCIDENT-RESPONSE.md`
