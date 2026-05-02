# EHB · Escalation Master

> **Status:** Canonical v1.0 · 2026-04-30
> **Note:** Detailed paths in `2-phases/ESCALATION.md`. This is operations-level summary.

## Escalation triggers

Auto-escalate if:
- Issue not resolved at Tier-1 within 2h
- User-initiated (user asks for supervisor)
- High-value (order ≥ $1K)
- High-STL user (L7+)
- Sensitive industry (Healthcare/Legal/Finance)
- Fraud signal detected
- Cross-border legal issue
- Press / PR risk

## Escalation paths

```
Tier-1 (chat agent) → Tier-2 (specialist) → Tier-3 (DMO Staff) → Tier-4 (DMO Senior) → Tier-5 (DMO Council) → Tier-6 (Founder)
```

## Per-issue routing

| Issue | Escalates to |
|---|---|
| Order dispute | DMO Staff (Tier-3) |
| Refund denied | DMO Senior (Tier-4) |
| Slash dispute | DMO Council (Tier-5) |
| Permanent ban appeal | Founder (Tier-6) |
| Country-level compliance | Country franchise + Legal |
| Government inquiry | Country + Founder |
| Press / PR | PR team + Founder |

## Cross-references

- Detailed: `2-phases/ESCALATION.md`
- Support: `SUPPORT.md`
- SLA: `SLA.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Operations-level escalation summary |
