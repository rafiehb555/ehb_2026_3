# Product Verification Flow — Multi-Industry

> **Status:** Canonical v1.0 · 2026-04-30 (founder-locked)
> **Related:** `CRB.md §11` · `FLOW-SCHEMA-V2.json` § product_verification · `FRANCHISE-VERIFICATION.md`

---

## 1. Why This Exists

EHB products gain trust + sales through verification. A single product can be verified by **multiple industries** — each one stacks a permanent rating boost. AI ranks products globally, fuelling competition.

## 2. Verification Cost (Per Industry)

```
TOTAL = Verification Fee  +  Product Buy-Cost
        ↓                        ↓
        $10 base                full product market price
        (5% off ≥ $5K product)   (verifier buys locally to test)
        (10% off ≥ $10K product)

FIRST verification (auto-selected industry) = TOTAL × 2
SUBSEQUENT industries = normal TOTAL
```

## 3. Cross-Industry Rating Boost

| Verifications | Rating Boost |
|:-------------:|:------------:|
| 1 (default) | base |
| 2 industries | +5% |
| 3 industries | +10% |
| 4 industries | +15% |
| ... | ... |
| N industries | +5% × (N − 1) |

- **No cap** on number of industries
- **Permanent** boost — does NOT decay if refilled every 6 months

## 4. Refill Cycle

- Strict **6-month** cycle
- NO fast-track for products (unlike service providers)
- Each industry verification has its own 6-month timer

## 5. Failed / Incomplete Test Flow

```
1. Verifier purchases product from local market
2. Tests product per industry standards
3. Outcome:
   ├── PASS → verification recorded, rating boost applied
   ├── FAIL → reported with reason, applicant can re-apply
   └── CANNOT TEST (e.g., one-time use, needs multiple units)
        ↓
        Verifier PAUSES verification
        Adds remark + new requirement (e.g., "send 3 units")
        Applicant sees requirement
        Applicant fulfils → verification resumes
```

## 6. Privacy Rules

- Verifier's identity + contact info **NEVER** shared with applicant
- All communication routed through anonymized system channel
- Disputes go to DMO (which CAN see verifier identity)

## 7. AI Global Ranking

- AI compares same products across all companies
- Top-ranked list visible publicly (daily refresh)
- Boost: companies compete by adding more industry verifications
- Ranking factors: rating boost % + STL of seller + sales volume + dispute rate

## 8. Industry Selection Logic

- **First industry:** system auto-selects (default verification path) → fee × 2
- **Additional industries:** seller chooses → normal fee
- **Per-industry pricing:** admin can adjust (e.g., food × health combo)

## 9. Example — $1,500 Smart Speaker

| Step | Industry | Fee | Buy-Cost | Total | Effect |
|------|----------|----:|---------:|------:|--------|
| 1st (auto) | ITS | $20 ($10 × 2) | $3,000 ($1,500 × 2) | $3,020 | Base rating |
| 2nd (chosen) | EAS (audio) | $10 | $1,500 | $1,510 | +5% rating |
| 3rd (chosen) | HMS (smart-home) | $10 | $1,500 | $1,510 | +10% rating |
| 4th (chosen) | GSS (energy efficiency) | $10 | $1,500 | $1,510 | +15% rating |
| **Total** | 4 industries | $50 | $7,500 | **$7,550** | **+15% permanent** |

After 6 months → all four refill → boost stays.

## 10. Ledger / Anchor

- Every verification anchored to Polkadot
- Audit trail per product per industry
- Tampering protected via hash chain

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-04-30 | 1.0 | Initial — founder-locked rules |
