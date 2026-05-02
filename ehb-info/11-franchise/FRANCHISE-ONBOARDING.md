# EHB · Franchise Onboarding Flow

> **Status:** Canonical v1.0 · 2026-04-30

## Overview

```
Application → Screening → Interview → Background Check → Approval → Capital Lock → Training → Activation
```

## Step 1 — Application

- Online form on `/franchise/apply`
- Fields: territory wanted, tier, capital available, business background, references
- Industry specialization (optional)
- ID verification (PSS L5+ required)

## Step 2 — Screening (auto + DMO)

- AI auto-screens for red flags (existing fraud, low STL)
- Territory availability check (no exclusivity conflicts)
- Capital availability check (bank statement / proof of funds)
- Background score from public records
- Result: PASS to interview · FAIL with reason · NEEDS-INFO

## Step 3 — Interview

- Conducted by Master Franchise (for Sub) or Country (for Master/Corporate)
- Founder interview required for Country tier
- Topics: experience, vision, ground network, conflict resolution
- Outcome: APPROVED / REJECTED / DEFERRED

## Step 4 — Background check

- KYC + KYB (full)
- Police clearance (per country requirement)
- Financial history check
- Reference calls (3 minimum)
- Existing business audit (if applicable)

## Step 5 — Approval

- Contract signed (digital + on-chain anchor)
- Territory exclusivity confirmed
- Tier locked (Sub L1-L10 etc.)
- Capital escrow scheduled

## Step 6 — Capital lock

- Per `FRANCHISE-REQUIREMENTS.md` ladder
- Sub L1 = $5K · Sub L10 = $50K · Master $100K-500K · Country $5M-50M
- Locked in EHB Treasury for term length
- Recoverable on graceful exit (per terms)

## Step 7 — Training

- 2-week mandatory training
- Topics: EHB systems, DMO operations, CRB inspection, complaint handling, compliance per region
- Final exam (must pass 80%+)
- Optional advanced modules

## Step 8 — Activation

- Login credentials issued
- Territory dashboard activated
- First inspection assignment
- Refill schedule starts
- Public listing: "Authorized Franchise" badge

## Onboarding timeline

| Tier | Total time |
|---|---|
| Sub L1-L3 | 3-4 weeks |
| Sub L4-L8 | 4-6 weeks |
| Sub L9-L10 | 6-8 weeks |
| Master | 8-12 weeks |
| Country | 3-6 months (with legal + diligence) |

## Rejection reasons

- Existing fraud history
- Insufficient capital
- Territory not available (held by existing franchise)
- Industry conflict (e.g., trying to apply for healthcare without medical background)
- Failed background check
- Failed training exam after 3 attempts

## Cross-references

- Requirements: `FRANCHISE-REQUIREMENTS.md`
- Verification: `FRANCHISE-VERIFICATION.md`
- Roles: `FRANCHISE-ROLES.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial onboarding flow |
