# Industry Metrics — EHB Platform

> **Owner:** Data Team + Industry Leads
> **Per-industry view across 38 industries.**

## Standard Metrics (per industry)
- Active sellers / providers
- Orders / day
- GMV (gross merchandise value)
- Average order value (AOV)
- Refund rate
- Dispute rate
- Average STL of sellers
- Industry health score (composite 0–100)

## Industry Health Score Formula
```
Health = (
  0.30 × FulfillmentRate        # delivered / submitted
  + 0.20 × (1 - DisputeRate)
  + 0.20 × (1 - RefundRate)
  + 0.15 × AverageSellerSTL/10
  + 0.15 × ReviewAverage/5
) × 100
```

## Tier-1 Industries (16 core)
WMS · OLS · GSM · ITS · HCS · EDS · FIN · INS · RES · CNS · MFS · AGTS · LSM · TCS · PTS · LDS

## Tier-2 Industries (16 expansion)
EAS · EFS · ELS · EPS · ERS · FBS · FWS · GES · GSS · HMS · HPS · BCS · CMS · MAS · OBS · RRS

## Tier-3 Industries (6 advanced)
ATS · EHB_TUBE · EHB_MUSIC · SCS · SOT · WES

## Cross-Industry Patterns
- Buyer multi-industry usage (same buyer in N industries)
- Seller industry concentration (focused vs diversified)
- Cross-sell graph (if you bought X, you also buy Y)

## Multipliers Validation
- Verify that high-multiplier industries (WMS, FIN at 2.0×) actually have higher trust requirements satisfied
- Track abuse of multiplier (low STL trying to game high multiplier)

## Top / Bottom
- Top 5 industries by GMV
- Bottom 5 industries — needs investment / removal?
- Fastest-growing (week-over-week)
- Highest dispute rate (intervention needed)

## Linked
- `../3-departments/industries/`
- `../5-specs/FLOW-SCHEMA-V2.json` § industry_multipliers
- `../4-flows/INDUSTRY-RULES.md`
