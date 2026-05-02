# EHB · Escalation Paths

> **Status:** Canonical v1.0 · 2026-04-30

## Universal escalation ladder

```
Level 1: User self-service (FAQ, AI bot)
   ↓ (5 min unresolved)
Level 2: Tier-1 support (chat agent)
   ↓ (2h unresolved or specific scenarios)
Level 3: Tier-2 specialist (DMO Staff)
   ↓ (24h or per-policy escalation)
Level 4: DMO Senior
   ↓ (72h or critical issue)
Level 5: DMO Council
   ↓ (extreme cases)
Level 6: Founder
```

## Auto-escalation triggers

| Trigger | Auto-escalate to |
|---|---|
| Fraud detected | Level 4 (DMO Senior) immediately |
| Slash > 50% disputed | Level 5 (DMO Council) |
| Permanent ban request | Level 6 (Founder) approval |
| Cross-border legal issue | Level 5 + Legal team |
| Critical bug affecting many users | Level 6 (Founder) + Tech lead |
| Security breach | Level 6 + Security team + Legal |
| Press / PR sensitive | Level 6 + PR team |

## Industry-specific escalation

- WMS: Medical specialist on call (independent doctor) for high-stakes disputes
- OLS: Legal advisor
- FIN: Compliance officer + regulator liaison
- High-value orders ($10K+): Auto-escalate to Senior DMO

## Escalation SLAs

| Level | Response SLA | Resolution SLA |
|---|---|---|
| 1 | Instant | <5 min |
| 2 | <5 min | <2h |
| 3 | <2h | <24h |
| 4 | <24h | <3 days |
| 5 | <3 days | <7 days |
| 6 | <7 days | Best-effort |

## Anti-escalation (de-escalation)

To prevent every issue going up:
- AI handles common patterns (target 70%+ deflection)
- Tier-1 empowered to refund up to $100
- DMO Staff empowered to suspend up to 7d
- Issues that resolve at Tier-1 get bonus to support agent (good metric)

## Cross-references

- Support: `SUPPORT-SYSTEM.md`
- Dispute: `4-flows/DISPUTE-FLOW.md`
- DMO: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial escalation paths |
