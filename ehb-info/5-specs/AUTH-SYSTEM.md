# EHB · Auth System

> **Status:** Canonical v1.0 · 2026-04-30

## Auth tiers

| Tier | Method | Use case |
|---|---|---|
| Public | None | Browse, search (L0) |
| Email + OTP | Standard | L1 user actions |
| Phone + OTP | + email | L2-L3 transactions |
| Hardware key | FIDO2 | L7+ DMO actions |
| Multi-sig | 2-3 keys | Treasury operations |
| Biometric | Face/voice | L8+ critical actions |

## Auth flow

```
Login → Identity check (email/phone) → 2FA → STL gate → action
```

## Session management

- JWT-based · 24h default · refresh on activity
- DMO actions: re-auth required every 1h
- Critical actions (slash, mint): re-auth + biometric

## OAuth integrations

- Google (consumer flow)
- Apple (iOS native)
- LinkedIn (professional / JPS)
- WhatsApp Business (PK / regional)

## API auth

- API keys for partners (per integration)
- Rate-limited (see `RATE-LIMITS.md` TODO)
- Scoped permissions

## Cross-references

- PSS: `3-departments/PSS.md`
- API: `5-specs/EHB-API-SPEC.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial auth tiers |
