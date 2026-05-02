# EHB · Franchise Penalty System

> **Status:** Canonical v1.0 · 2026-04-30

## Penalty triggers (per franchise)

| Trigger | Severity | Penalty |
|---|---|---|
| Refill missed × 1 | Low | Warning |
| Refill missed × 2 | Medium | -1 STL + 5% slash |
| Refill missed × 3+ | High | -3 STL + 25% slash + DMO review |
| Quarterly KPI miss | Medium | -1 STL + warning |
| Inspector caught faking report | Critical | -5 STL + inspector banned + investigation |
| Vouched user fraud | High | -3 STL + cascade slash |
| Territory abandoned | Critical | Termination + capital lock review |
| Compliance violation (country law) | Critical | Per local law + EHB sanctions |
| Customer harassment by franchise | High | -2 STL + suspend |
| Sub-franchise mismanagement (for Master) | High | -2 STL + remediation plan |
| Capital withdrawal premature | Medium | 15% slash + STL drop |
| False claims about franchise (e.g., bigger territory) | High | -3 STL + ban |
| Multiple complaints unresolved | Medium | 10% slash per complaint |

## Penalty escalation ladder (for franchises)

```
1st warning → Mandatory training refresh
2nd warning → STL drop -1 + DMO close watch
3rd warning → 30-day probation + 25% slash
4th warning → 7-day suspension of operations
5th + Critical → Termination + capital decision
```

## Termination process

If franchise is to be terminated:

1. **30-day notice** issued
2. **Wind-down period** (existing operations finish)
3. **Capital review:**
   - If voluntary exit: 70% capital returned (after 30-day cooling)
   - If for-cause: capital subject to slashing (up to 100%)
4. **Territory** reverts to available
5. **Users in territory** transferred to neighboring franchise OR direct EHB
6. **Inspectors** can apply to other franchises

## Cascade penalties

If franchise commits fraud:

```
Master franchise: vouched fraudulent Sub
   → Master STL -3 + 25% slash
Country franchise: failed to oversee Master
   → Country STL -2 + 15% slash
EHB Council: failed to detect
   → Internal review · process improvement
```

## Recovery paths

| Penalty | Recovery |
|---|---|
| Warning | Auto-decay 90 days |
| STL drop | 90-day clean = +1 |
| Slash (5-25%) | Can buy back via burn (see `5-economy/SLASHING-RULES.md`) |
| Suspension | Manual review · evidence required · re-train |
| Probation | 6-month clean record |
| Termination | Permanent (rare exception via Founder appeal) |

## Inspector accountability

Franchise's inspectors are franchise's responsibility:

- Inspector misconduct → Franchise STL drops (because hired/trained by franchise)
- Inspector fired → Franchise must hire replacement within 14 days
- Repeat inspector failures → Franchise loses inspection authority

## Customer-side complaints against franchise

Buyers/sellers can file complaint against franchise itself (not just users):

- Routed to Master tier first
- Escalates to Country if Master conflicted
- Final to DMO Council
- Outcomes: warn, slash, restrict authority, terminate

## Cross-references

- Slashing master: `5-economy/SLASHING-RULES.md`
- Penalty system master: `8-trust-system/PENALTY-SYSTEM.md`
- Dispute: `4-flows/DISPUTE-FLOW.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial franchise penalty system |
