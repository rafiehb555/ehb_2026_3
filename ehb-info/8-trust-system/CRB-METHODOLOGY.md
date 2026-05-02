# CRB Methodology — Credit Rating Bureau

> **Owner:** CRB Team
> **Cap:** L9 (highest CRB attainable)

## Purpose
Independent professional/credit verification adding the C-axis to the STL formula.

## CRB Levels (1-9)

| Level | Name | Verification Depth |
|-------|------|---------------------|
| 1 | Self-declared | User claims |
| 2 | Document upload | ID + 1 reference |
| 3 | Phone verified | Live call check |
| 4 | Reference verified | 2 references contacted |
| 5 | Background check | Criminal + financial |
| 6 | Industry licensed | Pro license confirmed |
| 7 | Continuous track record | 12+ months clean |
| 8 | Multi-industry verified | 2+ industries L7 each |
| 9 | Council-vetted | Top tier |

## Score Calculation (within CRB)
```
crb_score = base_level + bonuses - penalties
where:
  bonuses += 0.5 if certification renewed in last 12m
  bonuses += 0.5 if industry-specific exam passed
  penalties += 1.0 per upheld complaint in last 12m
  penalties += 0.5 per late professional renewal
```

## Verification Process
1. Document submission (KYC + professional)
2. Reference contact (CRB officer call)
3. Industry-specific check (e.g., medical board for HCS)
4. Score assigned
5. Anchored to chain
6. Review every 12 months

## Industry Modifiers
Some industries require minimum CRB:
- HCS, OLS, FIN, INS → CRB L4+ minimum
- Education (EDS) → CRB L3+
- General goods (GSM) → CRB L1 OK

## CRB → STL Contribution
```
CRB_points = (CRB_level / 10) × 40    // 0-40 of 120
```

## Penalty Recovery
- Each clean 90-day window: +0.5 toward recovery
- Cannot exceed pre-penalty level without re-verification

## Linked
- `../1-master/EHB-MASTER-PLAN.md` § STL
- `../3-departments/CRB.md`
- `PSS-METHODOLOGY.md`
- `REPUTATION-RECOVERY.md`
