# EHB · AI Fraud Detection

> **Status:** Canonical v1.0 · 2026-04-30
> **Min STL to access (consumer): L9 ELITE**

## Purpose

Detect fraud across all EHB systems:
- Transaction anomalies
- Seller risk patterns
- Buyer abuse patterns
- Document forgery
- Identity theft
- Up-Guard cluster detection

## Detection layers

### Layer 1: Real-time pattern matching
- Velocity checks (sudden spike in orders)
- Geo-anomaly (login from new country)
- Device fingerprint changes
- Multi-account detection

### Layer 2: ML risk scoring
- Trained on labeled fraud examples
- Ensemble: Random Forest + Gradient Boosting + Neural Net
- Score 0-100 per transaction / user

### Layer 3: Cluster detection (Up-Guard)
- Graph-based: find rings of related fraudulent accounts
- Behavioral clustering: similar fraud patterns across users
- T6 cluster = highest priority alert

### Layer 4: LLM-based investigation
- AI reads suspicious pattern + user history
- Suggests specific fraud type
- Prepares case file for DMO

## Outputs

- Risk score per transaction (real-time)
- Daily/weekly fraud reports for DMO
- Up-Guard alerts (live monitor)
- Slash recommendations (DMO confirms)

## False positive management

- Confidence threshold ≥85% for auto-action
- DMO review for 70-85%
- Below 70%: flag for manual investigation
- User notified + appeal window

## Phase-1 vs Phase-3 scope

Phase-1: Rule-based + simple ML (heuristics + scoring)
Phase-2: ML expansion + cluster detection
Phase-3: LLM-investigator + cross-platform signals

## Cross-references

- AI dept: `3-departments/AI.md`
- DMO: `3-departments/DMO.md`
- Slashing: `5-economy/SLASHING-RULES.md`
- Reputation: `4-flows/REPUTATION-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial fraud detection spec |
