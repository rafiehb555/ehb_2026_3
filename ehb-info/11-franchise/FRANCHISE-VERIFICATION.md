# EHB · Franchise Verification Role

> **Status:** Canonical v1.0 · 2026-04-30

## What franchise verifies

Franchise = boots-on-the-ground verification arm of EHB. Without franchise, CRB stops at "digital documents" — with franchise, CRB extends to physical reality.

## Verification activities

### 1. Physical user verification (PSS L7+)

For users seeking PSS L7+ (where digital alone insufficient):

- On-site visit to user's location
- ID + face match in person
- Address verification
- Signed paperwork
- Photo + video documentation
- Upload to EHB system

### 2. CRB on-site exam

For industries requiring physical exam:

- Schedule with user
- Conduct exam at franchise location OR field site
- Practical demonstration (e.g., plumber repairs sample, electrician wires demo)
- Multimedia capture (video proof)
- Score submission

### 3. Multimedia validation

When users submit photos/videos as proof:

- Inspector visits site
- Confirms photos match reality
- Cross-checks metadata (timestamps, location)
- Signs off on authenticity

### 4. Business verification (KYB)

For Production Companies + sellers seeking high tiers:

- Office / factory inspection
- Employee count verified
- Operations witnessed
- Compliance documents checked
- Anti-counterfeit cert review

### 5. Industry-specific inspections

Per industry rules:

- **Healthcare (WMS):** Clinic / hospital inspection · license verification
- **Legal (OLS):** Bar registration · office check
- **Construction (RES/CNS):** Site inspection · safety audit
- **Food (FBS/MFS):** Kitchen inspection · HACCP compliance
- **Electrical/Solar:** Workshop · safety equipment

## Inspection workflow

```
Request received (DMO triggers OR user requests upgrade)
   ↓
Franchise dispatches Inspector
   ↓
Site visit (1-3 hours per inspection)
   ↓
Photo / video / audio capture
   ↓
Report uploaded to DMO panel
   ↓
DMO reviews (or auto-approves if Inspector STL ≥ L7)
   ↓
User notified · STL updated
```

## Inspector requirements (franchise hires)

- PSS L5+ (verified)
- CRB Inspector certification (industry-specific)
- Background check passed
- Trained by franchise (40-hour course)
- 1-year minimum tenure
- Salary: $300-$1000/month depending on country

## Inspection fees

| Inspection type | Fee | Paid by |
|---|---|---|
| User PSS upgrade L7 | $20-50 | User |
| User PSS upgrade L10 | $100-200 | User |
| Business KYB inspection | $200-500 | Business |
| Industry-specific (Healthcare) | $300-800 | Business |
| Multimedia validation | $30-100 | User |
| Re-inspection (annual) | 50% of original | User |

Franchise keeps 60% of fee · Master 25% · Corporate/Country 15%.

## Quality control

- Inspector reports randomly audited (10% sample)
- AI cross-validates photos / docs
- DMO escalates discrepancies
- Franchise STL drops if inspector misconduct
- Inspector can be banned platform-wide for fraud

## Cross-references

- CRB department: `3-departments/CRB.md`
- KYC system: `4-flows/KYC-KYB-SYSTEM.md`
- Roles: `FRANCHISE-ROLES.md`

## 🔒 LOCKED RULES (founder 2026-04-30)

### Verifier Cascade (priority order)
1. Sub Franchise L8/L9/L10 in user's area
2. Sub Franchise (L8+) in nearest CRB-tree city
3. Master Franchise (same area or nearest)
4. Country Franchise auto-routes to nearest available

### Trusty Wallet Lock for Verifiers
```
Required Lock = 400 EHBGC × daily request capacity
```
Examples: 10 req/day = 4,000 EHBGC · 50 req/day = 20,000 EHBGC

### Practical Work Duration (user spends in franchise)
| STL Level | Days |
|:--------:|:----:|
| L1-L4 | 3 / 5 / 7 / 10 |
| L5-L7 | 20 / 30 / 45 |
| L8-L10 | 60 / 75 / 90 |

### Verification Fee
- Base: $10 (per L1)
- Higher STL = higher fee (admin-configurable per level)

### Fee Distribution
| Recipient | % |
|-----------|:-:|
| Verifier Franchise | 45 |
| Master Franchise | 5 |
| Corporate Franchise | 2 |
| Country Franchise | 1 |
| Referral | 5 |
| DMO | 5 |
| EHB Company | 37 |

### Industry-Provider-Franchise Pairing
Every industry's service providers MUST work with franchises in that industry. Franchise is the verification host + ongoing oversight body.

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.1 | LOCKED: cascade, trusty wallet, days ladder, fee split (founder) |
| 2026-04-30 | 1.0 | Initial franchise verification role |
