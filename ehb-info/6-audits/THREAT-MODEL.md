# Threat Model — EHB Platform

> **Framework:** STRIDE
> **Owner:** Security Team
> **Cadence:** Annually + on architectural change

## Assets to Protect
1. User identities + KYC data
2. Money in escrow + locks
3. STL scores (the trust economy)
4. Polkadot anchor keys
5. JWT signing keys
6. AI prompts + model access
7. Source code + secrets
8. Customer PII

## Threat Categories

### Spoofing
- Account takeover via credential stuffing
- Phishing for OTP / password
- API key leakage
- Identity impersonation in KYC

**Mitigations:** rate limit, 2FA, password breach checks, anomaly detection, KYC liveness.

### Tampering
- Man-in-the-middle on API
- DB tampering
- Anchor manipulation
- STL formula tampering

**Mitigations:** TLS 1.3, integrity checks, immutable audit trail, signed builds, code review.

### Repudiation
- User denies action they took
- Officer denies decision they made

**Mitigations:** every action logged with actor, timestamp, IP, signed audit anchor.

### Information Disclosure
- PII leak via logs
- KYC docs leaked
- DB dump exposure
- AI prompt leaking other users' data

**Mitigations:** PII masking, encryption at rest, access logging, AI privacy guardrails.

### Denial of Service
- API overload
- DB connection exhaustion
- Wallet provider DoS
- AI rate limit exhaustion

**Mitigations:** rate limit, autoscale, circuit breaker, fallback paths.

### Elevation of Privilege
- STL spoofing in JWT
- Role injection
- DMO impersonation
- Master key extraction

**Mitigations:** JWT signed + verified, RBAC enforced server-side, key custody (HSM).

## Critical Paths (Risk-Ranked)

| Path | Risk | Mitigation |
|------|------|------------|
| Order escrow lock/release | HIGH | Adapter + idempotency + audit |
| Slashing | HIGH | DMO approval + cap + audit |
| KYC document upload | HIGH | Encrypted at rest + access log |
| Polkadot anchor sign | HIGH | HSM + sharded keys |
| Franchise capital lock | MEDIUM | Multi-step approval |
| Public listing | MEDIUM | Quality check + DMO review |
| Review submission | MEDIUM | Anti-gaming + weight |

## Adversaries Modeled
- Opportunistic attacker (credential stuffing)
- Targeted attacker (specific high-value seller)
- Malicious insider (officer abuse)
- State actor (rare, but considered for some markets)
- Rogue franchise (collusion, gaming)

## Action Items
- [ ] HSM for Polkadot key (in progress)
- [ ] Pen test before each country launch
- [ ] Bug bounty program
- [ ] Annual third-party audit

## Linked
- `SECURITY-AUDIT.md`
- `../12-operations/INCIDENT-RESPONSE.md`
- `../9-legal/PRIVACY.md`
