# EHB · AI Smart Matching

> **Status:** Canonical v1.0 · 2026-04-30

## Purpose

Match the right entity to the right opportunity:
- Buyer ↔ Seller (orders)
- Job seeker ↔ Employer (JPS)
- Service requester ↔ provider
- Inspector ↔ inspection job
- Rider ↔ delivery
- Franchise applicant ↔ territory

## Matching dimensions

| Dimension | Weight |
|---|---|
| STL compatibility (don't waste high-STL on low) | 25% |
| Industry/category match | 20% |
| Geographic proximity | 15% |
| Past behavior compatibility | 10% |
| Price / budget alignment | 10% |
| Availability / timing | 10% |
| Language match | 5% |
| Special tags (vegan, halal, eco) | 5% |

## Match score formula

```
match_score = Σ (weight_i × similarity_i)
```

Threshold for recommendation: 70%+
Threshold for auto-assignment (rider, inspector): 85%+

## Two-sided matching

For job/service marketplaces:
- Show user top-N matches sorted by score
- User picks (preference learned)
- Other side notified to confirm

## Smart auto-assignment (rider/inspector)

For high-volume operational matching:
- AI auto-picks best available rider
- Fallback if first declines
- Surge pricing if no match (encourage higher-STL riders)

## Diversity injection

Prevent rich-get-richer:
- Mix top matches with mid-STL options
- Allow new sellers to compete
- Avoid concentrated wealth in top 1% sellers

## Cross-industry matching

User in WMS who also has CRB cert in OLS:
- Suggest cross-industry opportunities
- Diversify earnings
- Reduce industry-specific risk

## Cross-references

- AI dept: `3-departments/AI.md`
- JPS: `3-departments/JPS.md`
- Recommendation: `RECOMMENDATION-ENGINE.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial smart matching spec |
