# EHB · Penalty System

> **Status:** Canonical v1.0 · 2026-04-30
> **Built on:** Slashing + DMO escalation ladder

## Penalty types

| Type | Mechanism | Reversible? |
|---|---|---|
| **Warning** | Notification + DMO record | Yes (decays in 30d) |
| **STL drop** | -0.5 to -5 STL points | Recoverable via streak/vouching |
| **Slashing** | EHBGC lock burned | NO (irreversible) |
| **24h block** | Account paused 24 hours | Yes (auto-restore) |
| **7d suspend** | Suspended 7 days | Yes (manual review) |
| **30d suspend** | Suspended 30 days | Yes (DMO Council review) |
| **Permanent ban** | Account terminated | Founder + Council approval |
| **Cap reduction** | Max STL lowered (e.g., L7 → L5 cap) | Reversible after 6 months clean |
| **Industry ban** | Banned from specific industry (e.g., medical) | Per-industry council review |

## Penalty ladder (per offense level)

```
1st offense → Warning
2nd offense → 24h block + STL -1
3rd offense → 7d suspend + slash 5%
4th offense → 30d suspend + slash 25%
5th offense → Permanent ban + slash 100%
```

This ladder applies to repeat offenses within a 90-day window.

## Per-trigger penalty matrix

| Trigger | Severity | Penalty |
|---|---|---|
| Late delivery (1-3) | Low | Warning + STL -0.5 each |
| Late delivery (4+) | Med | 5% slash + STL -1 |
| Refill miss × 1 | Low | Warning |
| Refill miss × 2 | Med | 10% slash + STL -1 |
| Complaint upheld (T1-T2) | Low-Med | STL -0.5 to -1 |
| Complaint upheld (T3-T4) | Med | 5-10% slash + STL -1 |
| Complaint upheld (T5) | High | 25% slash + STL -2 |
| Complaint upheld (T6 fraud) | Critical | 100% slash + ban |
| Doc forgery (PSS/CRB) | Critical | 75% slash + permanent ban |
| Premature unlock | Med | 15% slash + STL -2 |
| Buyer harassment | High | STL -2 + 7d suspend |

## Cap reduction (alternative to slashing)

For low-severity but persistent issues:

```
Soft cap reduction: 
   "You can no longer reach L8 for 6 months due to pattern X"
   ↓
After 6 months clean: cap restored
```

Used for cases where slashing is too harsh but message needs to land.

## Industry ban

For industry-specific violations:

```
Healthcare: practiced beyond license
   ↓
Banned from WMS for 12 months
   ↓
Other industries unaffected
```

This protects specialized industries without total platform exit.

## Cross-entity cascade

When entity owner gets penalized, cascade rules per `SLASHING-RULES.md §Cross-entity slash cascade`.

## Penalty record retention

- 30-day window: active for ladder counting
- 90-day window: counts for STL recovery checks
- 365-day window: visible on user profile (transparency)
- Permanent: blockchain audit trail

## Recovery from penalty

| Penalty | Recovery path |
|---|---|
| Warning | Auto-decays 30d |
| STL drop | Streak bonus + re-verify |
| Slash | Permanent loss · plus STL recovery |
| Block (24h) | Auto-restore |
| Suspend (7-30d) | Manual review · evidence required |
| Cap reduction | Time-based (6 months) |
| Ban | Founder + Council appeal |

## Cross-references

- Slashing: `5-economy/SLASHING-RULES.md`
- Dispute: `4-flows/DISPUTE-FLOW.md`
- DMO escalation: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial penalty system with ladder + matrix |
