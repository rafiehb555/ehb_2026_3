# EHB · AI Recommendation Engine

> **Status:** Canonical v1.0 · 2026-04-30

## Purpose

Personalized recommendations across EHB:
- Products (e-commerce / GSM)
- Services (per industry)
- Sellers / providers
- Industries to enter (for users wanting to expand)
- Franchise opportunities
- Job matches (JPS)

## Inputs

- User's PSS + STL profile
- Past order/review history
- Browsing / search behavior
- Industry of interest
- Budget / location
- Buyer Trust Score

## Algorithm tiers

| Tier | Method | Use case |
|---|---|---|
| 1 | Collaborative filtering | "Users like you also bought" |
| 2 | Content-based | Match user prefs to listings |
| 3 | Trust-weighted | Filter by min STL of seller |
| 4 | Industry-aware | Respect industry STL gates |
| 5 | LLM-based | Conversational discovery (Phase-2+) |

## STL-aware filtering

Recommendations always respect:
- User's STL gates (e.g., L3+ for high-value)
- Seller's STL minimum (don't recommend L1 sellers to L8 buyer)
- Industry minimum STL
- Buyer's BTS (low-BTS buyers see lower-trust recs first)

## Privacy

- Personal data NOT used for model training (without consent)
- Anonymized aggregated data only
- User can opt out of recommendations

## Confidence score

Every recommendation includes:
- Match score (0-100%)
- Reason ("matches your past purchases", "high STL seller", "trending in your industry")
- AI confidence

## Cross-references

- AI dept: `3-departments/AI.md`
- STL: `3-departments/STL.md`
- Reputation: `4-flows/REPUTATION-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial recommendation engine spec |
