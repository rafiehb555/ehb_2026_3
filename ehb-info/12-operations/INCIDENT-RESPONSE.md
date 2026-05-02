# Incident Response — EHB Platform

> **Owner:** Engineering Lead + DMO Council (for trust incidents)

## Phases
1. **Detect** — alert fires or report received
2. **Triage** — severity assigned (SEV-1 to SEV-4)
3. **Mitigate** — restore service (priority over root cause)
4. **Communicate** — status page + customers + stakeholders
5. **Resolve** — service fully restored
6. **Post-mortem** — within 5 business days
7. **Follow-up** — action items tracked to closure

## Roles
- **Incident Commander (IC):** owns the incident end-to-end
- **Comms Lead:** updates status page + stakeholders
- **Scribe:** logs every action with timestamp
- **Engineers:** execute mitigations

## Communication Cadence

| Severity | Internal | External |
|----------|----------|----------|
| SEV-1 | Every 15 min | Status page + email/SMS to affected users |
| SEV-2 | Every 30 min | Status page |
| SEV-3 | Every 2 hours | Status page (silent) |
| SEV-4 | At resolution | None |

## War Room
- Open Slack `#incident-<date>-<short>` channel
- Voice bridge: Zoom / Google Meet
- Shared incident doc with timeline

## Trust Incidents (DMO involvement)
- Mass slashing event
- STL formula bug suspicion
- Franchise revenue dispute
- Polkadot anchor mismatch
- Privilege escalation suspected

DMO Council notified within 30 minutes of detection.

## Post-Mortem Template
- Summary
- Timeline (with timestamps)
- Root cause
- Contributing factors
- What went well
- What didn't
- Action items (owner + due date)
- Follow-up audit needed?

## Blameless
EHB practices blameless post-mortems. Focus on systems and process, not individuals.

## Linked
- `ONCALL.md`
- `RUNBOOKS.md`
- `../6-audits/SECURITY-AUDIT.md`
