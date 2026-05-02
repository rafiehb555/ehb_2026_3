# EHB · Verification System

> **Status:** Canonical v1.0 · 2026-04-30
> **Built on:** PSS + CRB + DMO trinity

## What gets verified?

EHB verifies **5 entity types**, each with its own verification path:

1. **Personal** (User) — PSS identity
2. **Service** (provider) — PSS + CRB (skill)
3. **Product** (item) — Manufacturer + Seller chain + reviews
4. **Franchise** (territory) — Master + Country + DMO
5. **Production Company** (manufacturer) — KYB + Industry cert

## Verification stages (per entity)

### Personal
- L1: email + phone OTP
- L3: KYC document (CNIC/passport)
- L5: + selfie liveness
- L7: + on-site verification (Inspector / Franchise)
- L10: + manual founder approval

### Service
- L1: Personal L1 + service profile
- L4: + CRB exam pass (industry-specific)
- L6: + multimedia proof (video/photos)
- L8: + Franchise endorsement OR Inspector visit
- L10: + audited track record

### Product
- Inherits from Seller's STL (MIN-chain)
- Plus product-specific: image authenticity (AI), description quality, reviews
- Genuine-origin badge if direct manufacturer

### Franchise
- KYB on the franchise entity
- Territory contract signed
- Capital escrowed ($5K-$50K)
- Master/Country tier vouch (for Sub L1-L10)

### Production Company
- KYB (registration, tax, UBO)
- Industry certifications (per industry rules)
- Factory inspection (for L7+)
- Anti-counterfeit cert (electronics, pharma)

## Cross-references

- PSS: `3-departments/PSS.md`
- CRB: `3-departments/CRB.md`
- KYC/KYB: `4-flows/KYC-KYB-SYSTEM.md`
- Inspector role: `EHB-USER-TYPES.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial verification overview · 5 entity types |
