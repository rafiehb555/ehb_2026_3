# EHB · Rating System

> **Status:** Canonical v1.0 · 2026-04-30

## Rating philosophy

EHB ratings differ from Amazon/Fiverr in 3 ways:

1. **Reviewer's STL weights the rating** (high-trust voice louder)
2. **Multi-aspect rating** (not just 1-5 stars)
3. **Buyer Trust Score** (BTS) prevents abuse

## Multi-aspect rating

When buyer reviews:

| Aspect | Range | Why |
|---|:---:|---|
| Quality | 1-5 | What you got vs described |
| Communication | 1-5 | Seller responsiveness |
| Speed | 1-5 | Delivery / completion time |
| Value | 1-5 | Price-to-quality |
| Trust | 1-5 | Felt safe transacting |

Final rating = average of 5 aspects, weighted by reviewer STL.

## Reviewer weight

```
weight = 3.0 if reviewer.STL ≥ L8
       = 2.0 if reviewer.STL == L7
       = 1.5 if reviewer.STL == L6
       = 1.0 if reviewer.STL ∈ [L4, L5]
       = 0.5 if reviewer.STL == L3
       = 0.3 if reviewer.STL ∈ [L1, L2]
```

## Buyer-side rating (BTS)

Sellers also rate buyers (see `REPUTATION-SYSTEM.md`):

- Order completed without dispute → +0.5 BTS
- 5-star review of legitimate receipt → +0.3
- Honest complaint upheld → +1.0
- False complaint → -3.0

## Display rules

On product/service cards:

```
4.6 trust-weighted (84 reviews, 71 from L5+ buyers)
```

NOT:
```
4.6 (84 reviews)  ← misleading
```

## Review eligibility

User can leave review only if:
- Verified buyer (paid order completed)
- Order in REVIEWED state (not refunded)
- 7-day window after fulfillment

## Anti-bombing protections

1. Reviewer weight prevents low-STL flood
2. AI Anomaly Detector flags spike patterns
3. Locked EHBGC required for high-impact complaints
4. Cross-IP / device fingerprint detection
5. BTS penalty for false complaints

## Review moderation

- AI auto-screens for spam, abuse, links
- DMO escalates flagged reviews
- Seller can respond publicly to any review
- Disputed reviews go to dispute flow

## Rating expiry

- Reviews older than 12 months → display "(historical)" tag
- Recent ratings weighted higher in search algo
- Old high ratings still count, just less prominent

## Cross-references

- Reputation: `4-flows/REPUTATION-SYSTEM.md`
- Dispute: `4-flows/DISPUTE-FLOW.md`
- AI Anomaly: `3-departments/AI.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial rating system with multi-aspect + reviewer weight |
