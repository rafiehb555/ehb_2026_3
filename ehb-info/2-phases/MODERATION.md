# EHB · Moderation System

> **Status:** Canonical v1.0 · 2026-04-30

## Moderation scope

- User-generated content (listings, reviews, messages, profiles)
- Product images (AI authenticity check)
- Service descriptions
- Job postings
- Forum / community (if added)

## 3-tier moderation

```
AI auto-screen → Flagged content → Human review → Decision
```

### Tier 1: AI auto-screen

- Profanity / abuse detection
- Spam / link patterns
- AI-generated content detection
- Stock-image identification
- Scam patterns (price too low, contact info hidden)
- Auto-decision: pass / flag / block

### Tier 2: Human moderator (DMO Staff)

- Reviews AI flags
- Context-aware (industry-specific norms)
- Issues warnings, removes content, suspends user
- Logs decisions for audit

### Tier 3: DMO Council

- Borderline cases (free speech vs harm)
- Industry-specific edge cases
- Appeal reviews

## Industry-specific moderation

| Industry | Special rules |
|---|---|
| WMS (Healthcare) | Medical claims must be evidence-based · disclaimers mandatory |
| OLS (Legal) | Legal advice disclaimers · jurisdictional accuracy |
| FIN | Investment claims regulated · no guarantees of returns |
| EDS (Education) | Course content quality check |
| EHB_TUBE (Media) | Community guidelines · age-appropriate |

## Content removal triggers

- Auto-block: explicit content, illegal activity, fraud signals
- Manual review: gray-area cases
- User appeal: 7-day window
- Council review: final decision

## Moderation analytics

- Removal volume by category
- False-positive rate (overturned)
- Repeat offender tracking
- AI accuracy score

## Cross-references

- AI moderation: `3-departments/AI.md`
- Penalty: `8-trust-system/PENALTY-SYSTEM.md`
- Escalation: `ESCALATION.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial moderation system |
