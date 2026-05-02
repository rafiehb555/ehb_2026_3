# AI Safety — EHB Platform

> **Owner:** AI Team + DMO Council

## Principles
1. **AI assists, humans decide** on consequential matters (slashing, account closure, payouts).
2. **Transparency** — users know they're talking to AI; output sources cited where applicable.
3. **Privacy first** — PII not sent to external models without consent.
4. **No discrimination** — outputs audited for bias.
5. **Auditable** — every AI decision logged.

## Guardrails

### Input
- Strip PII before sending to external model (where possible)
- Validate input schema
- Prompt injection defense (sanitise user-controlled fields)
- Rate limit per user

### Output
- Content filter (no harmful, illegal, hateful)
- Format validation (JSON schema for structured outputs)
- Hallucination check for factual queries
- Confidence threshold — below it, escalate to human

### Critical Actions
AI may suggest but cannot directly execute:
- Slashing > 25%
- Account suspension > 7 days
- Payout > $1000
- Permanent ban
- Industry-license revocation

## Bias Auditing
- Quarterly fairness audit per cohort
- Check for disparate STL outcomes by protected attribute
- Adversarial testing on edge cases

## Privacy
- Sensitive industries (FIN, HCS, OLS) → use on-prem or BAA-covered API
- KYC documents — never to external API
- Voice / video — explicit user consent + retention rules

## Human Oversight
- Sample 1% of AI decisions reviewed by human weekly
- 100% of AI-recommended slashings reviewed by DMO
- Disputed AI outputs trigger model review

## Incident Response
- AI causes harm → file under SEV-2 incident
- Roll back model version
- Founder briefed within 24h
- Public statement if external impact

## Linked
- `AI-PROMPTS.md`
- `AI-MODELS.md`
- `../9-legal/PRIVACY.md`
- `../12-operations/INCIDENT-RESPONSE.md`
