# EHB · Universal Industry Flow Template

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Every industry follows the same 9-step pipeline. Industry-specific only differs in CRB checklist + DMO mode + AI prompts.

## The universal flow

```
1. User Registration
   ↓
2. PSS Verification (identity)
   ↓
3. Industry Choice (e.g., Healthcare, Legal)
   ↓
4. CRB Industry-Specific Exam + docs
   ↓
5. Profile Creation (with industry-specific fields)
   ↓
6. DMO Approval (mode: FAST/BALANCED/STRICT/CRITICAL)
   ↓
7. STL Assignment (composite: PSS+CRB+DMO + industry boost)
   ↓
8. Service / Product Listing
   ↓
9. Orders + Earnings + Reviews + Blockchain Anchor
```

## Per-step detail

### Step 1: Registration
- Email + phone OTP → L1 FREE
- Wallet auto-created (multi-currency)

### Step 2: PSS
- Country-specific docs (CNIC/passport/etc.)
- Selfie + liveness
- AML scan
- See `KYC-KYB-SYSTEM.md`

### Step 3: Industry choice
- 38 industries available (`3-departments/Industries.md`)
- User picks primary + can have secondary later
- Min STL gates apply (e.g., Healthcare requires L4+)

### Step 4: CRB
- Industry-specific exam (theory + practical)
- Multimedia proof (photos / video / certificates)
- For premium tiers: physical inspection

### Step 5: Profile
- Industry-specific fields (e.g., medical specialty for WMS, bar number for OLS)
- Service categories within industry
- Pricing tiers
- Availability

### Step 6: DMO Approval
- Per industry's DMO mode:
  - **FAST** (auto-approve if score >70+75 in PSS+DMO): GSM, FBS, LDS, BCS, ELS, PTS
  - **BALANCED** (manager reviews, AI suggests): HPS, OBS, EPS, ITS, SOT, etc. (most)
  - **STRICT** (senior + inspector): WMS, OLS, RES, CNS, MFS, LSM, HCS
  - **CRITICAL** (director + legal + compliance): FIN, INS, SCS, EFS

### Step 7: STL Assignment
- Composite formula from `STL.md §3`
- Industry boost applied (`INDUSTRY-STL-MULTIPLIER.md`)
- MIN-chain validation across 4 entity layers

### Step 8: Listing
- Product/service published
- Min STL gate enforced (industry-specific)
- EHBGC lock applied to seller entity

### Step 9: Order lifecycle
- See `ORDER-FLOW.md`
- Includes payment → escrow → delivery → review → settlement → audit anchor

## Industry-specific variations

While the 9 steps are universal, each industry differs in:

1. **CRB checklist** — what docs / exams are required
2. **DMO mode** — speed vs scrutiny
3. **AI prompts** — domain-specific knowledge for AI advisors
4. **UI/UX** — industry-specific listing fields, dashboards
5. **Compliance** — country-by-country regulatory requirements
6. **Industry boost** — STL multiplier (1.0× to 2.0×)
7. **Price ranges** — typical service costs
8. **Refill cadence** — varies per CRB tier (3mo for Healthcare, 12mo for Legal)

## Per-industry deep specs

Folder: `3-departments/industries/<CODE>.md` (TODO — to be created)

Each industry sub-spec template:
1. Industry context (market, players, regulation)
2. CRB exam structure
3. DMO mode + approval criteria
4. AI prompt scaffold
5. UI/UX requirements per screen
6. Compliance per country
7. Listing rules (min STL, locked fields)
8. Earnings model
9. Common complaints + handling
10. Open questions

## Cross-references

- All industries: `3-departments/Industries.md`
- Industry mapping: `INDUSTRY-MAPPING.md`
- Industry STL multipliers: `INDUSTRY-STL-MULTIPLIER.md`
- Industry rules: `INDUSTRY-RULES.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Universal 9-step industry flow template |
