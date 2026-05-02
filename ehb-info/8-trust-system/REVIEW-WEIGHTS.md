# Review Weights — EHB Trust System

> **Owner:** STL Team
> **Purpose:** Make reviews tamper-resistant. High-STL reviewers count more.

## Weighted Average Formula
```
weighted_review = Σ(rating_i × reviewer_weight_i) / Σ(reviewer_weight_i)
```

## Reviewer Weight by STL

| Reviewer STL | Weight |
|--------------|--------|
| L1 (FREE) | 0.5 |
| L2 (BASIC) | 0.7 |
| L3 (NORMAL) | 1.0 |
| L4 (HIGH) | 1.5 |
| L5 (VIP) | 2.0 |
| L6 (PREMIUM) | 2.5 |
| L7 (ELITE) | 3.0 |
| L8 (MASTER) | 4.0 |
| L9 (LEGEND) | 5.0 |
| L10 (SUPREME) | 6.0 |

## Multi-Dimensional Ratings
Reviewers rate on 5 dimensions:
- Quality (1-5)
- Communication (1-5)
- Speed (1-5)
- Value (1-5)
- Trust (1-5)

Each dimension weighted-averaged separately. Overall = simple average of 5.

## Anti-Gaming
- One review per (buyer, order) pair — enforced
- Self-reviews disallowed
- Reviewer must be at L2+ to count (L1 voice rate-limited)
- Reciprocal review patterns flagged (you-rate-me-I-rate-you)
- Burst reviews from same IP flagged
- Recent buyer requirement (< 30 days from order)

## Decay
- Reviews > 12 months old: weight × 0.7
- Reviews > 24 months old: weight × 0.4
- Reviews > 36 months old: weight × 0.2

## Verified Purchase Premium
- Review tied to a settled order: weight × 1.2
- Review without purchase: weight × 0.5

## Public Display
- Show overall weighted score
- Show review count
- Show distribution (5★ / 4★ / 3★ / 2★ / 1★)
- Highlight 3 most-helpful (community-voted)

## Linked
- `RATING.md`
- `../5-economy/SLASHING-RULES.md`
- `../1-master/EHB-MASTER-PLAN.md` § STL
