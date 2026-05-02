# EHB · Dispute Flow

> **Status:** Canonical v1.0 · 2026-04-30

## Flow overview

```
COMPLAINT FILED
   ↓
AI PRE-MEDIATOR (suggest settlement)
   ↓
   ├─ Both parties accept → RESOLVED (no DMO needed)
   └─ Disagreement
      ↓
AI TRIAGE (high-priority routing)
   ↓
DMO INVESTIGATOR (gather evidence)
   ↓
DMO DECISION (warn / suspend / slash / refund / no-action)
   ↓
APPEAL WINDOW (7 days)
   ↓
   ├─ Appeal accepted → SECOND REVIEW (DMO Council)
   └─ No appeal → FINAL
      ↓
EXECUTE (slash · refund · ban · etc.)
   ↓
ANCHOR ON-CHAIN
```

## Complaint types

| Type | Severity | Default route |
|---|---|---|
| T1: Late delivery | Low | AI auto-resolve · 5% slash if upheld |
| T2: Quality below described | Med | DMO investigator |
| T3: Wrong item delivered | Med | Refund + 5% slash |
| T4: Damaged in transit | Med | Rider review · partial refund |
| T5: Service not performed | High | Full refund + 25% slash |
| T6: Fraud / counterfeit | Critical | 100% slash + ban |
| T7: Harassment / abuse | Critical | Investigation + ban |
| T8: Privacy / data leak | Critical | Legal review |

## SLAs

| Step | Time |
|---|---|
| Acknowledge complaint | <1h (auto by AI) |
| AI pre-mediator | <24h |
| DMO triage | <48h |
| DMO investigation | 3-7 days |
| Decision | <7 days from filing |
| Appeal window | 7 days after decision |
| Execution | <24h after final |

## Severity escalation ladder

Per repeat offenses:

```
Warning  → 24h block  → 7d suspend  → permanent ban
```

Each step requires upgraded approval:
- Warning: AI auto
- 24h block: DMO Staff
- 7d suspend: DMO Senior
- Permanent ban: DMO Council + Founder approval

## Slashing rules (per locked decision Q4)

| Trigger | Slash % |
|---|---|
| T6 fraud confirmed | 100% lock + ban |
| T5 unresolved >30 days | 25% lock |
| T1 late delivery × 3 | 5% lock |
| Refill miss × 2 | 10% lock |

Slash cap: max 50% per window (per Q4).

## Roles

| Role | Permission |
|---|---|
| Buyer | File complaint · respond to seller's defense |
| Seller | Defend · provide evidence · counter-claim if BTS abuse |
| AI Mediator | Suggest settlement · auto-resolve simple cases |
| DMO Investigator | Gather evidence · interview parties · recommend |
| DMO Senior | Approve final decision (T1-T4) |
| DMO Council | Approve T5+ + appeals |

## Buyer Trust Score impact

If buyer files **false complaint** (proven by DMO):

- BTS: -3 to -5
- 30-day cooldown on filing new complaints
- Repeat false-complainer: complaint filing locked for 90d
- Multiple false: account suspended

## Evidence types accepted

- Photos / videos with timestamp + EXIF
- Chat logs (system-recorded)
- Order tracking data
- Third-party verification (e.g., delivery photo)
- AI-detected anomalies (sudden review patterns)

## On-chain anchor

Every dispute resolution gets:
- Hashed summary on Polkadot
- Public audit URL
- Regulator-friendly format
- Immutable audit trail

## Open questions

- Cross-border dispute jurisdiction
- Class-action support (multiple buyers, same seller)
- Insurance claim integration with dispute outcome
- Anonymous whistleblower path

## Cross-references

- Order flow: `ORDER-FLOW.md`
- DMO governance: `3-departments/DMO.md`
- Slashing rules: `5-economy/SLASHING-RULES.md`
- Reputation: `REPUTATION-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial dispute flow with T1-T8 + escalation ladder |
