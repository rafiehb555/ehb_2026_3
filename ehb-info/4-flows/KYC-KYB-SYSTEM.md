# EHB · KYC + KYB System

> **Status:** Canonical v1.0 · 2026-04-30
> **Source:** Built on `3-departments/PSS.md` v2.0 + Wallet adapter pattern

## 1. KYC vs KYB

- **KYC** (Know Your Customer) — for individuals
- **KYB** (Know Your Business) — for companies, franchises, production cos

Both feed into EHB's PSS system. Same canonical adapter pattern, different document sets.

## 2. KYC flow (individuals)

### Step-by-step

1. **Email + phone OTP** → L1 FREE achieved
2. **Document upload** (CNIC / passport / national ID)
   - OCR by AI Document Verifier
   - Cross-check with NADRA-PK / Jumio-global / Onfido-global (per region)
3. **Selfie + liveness check**
   - AI Liveness Anti-Deepfake confirms human
   - Optional: voice biometric for L8+ tiers
4. **AML sanctions scan**
   - OFAC, UN, EU, country-local lists
5. **Manual review** (PSS officer)
   - For edge cases or high-risk regions
6. **PSS level assigned** (L1-L10)

### Documents required by region

| Region | Primary doc | Alternate | Fallback |
|---|---|---|---|
| Pakistan | CNIC | Passport | B-form (minor) |
| Saudi/UAE | Iqama | Emirates ID | Passport |
| EU | National ID | Passport | Driver's license |
| US | SSN + state ID | Passport | Driver's license |
| Other | Passport | National ID | Local ID + utility bill |

## 3. KYB flow (businesses)

### Step-by-step

1. **Company registration** (legal entity)
2. **Business documents:**
   - Registration certificate (SECP-PK / Companies House-UK / equivalent)
   - Tax ID (FBR-PK / EIN-US / VAT-EU)
   - Bank statement (last 3 months)
   - Authorized signatories list
3. **UBO disclosure** (Ultimate Beneficial Owner)
   - 25%+ stake holders identified
   - Each UBO completes KYC individually
4. **Office address verification**
   - Utility bill OR lease OR govt registration
   - For L7+ tiers: physical inspection by Inspector role
5. **AML check** on company + UBOs
6. **Industry-specific certifications**
   - Healthcare: medical license · Legal: bar registration · Construction: contractor license
7. **Company STL level assigned**

## 4. Adapter pattern (vendor-agnostic)

Code path: `services/api/src/adapters/kyc/`

| Vendor | Use case | Coverage |
|---|---|---|
| NADRA-PK | Pakistan CNIC verification | PK only |
| Jumio | Global KYC | 200+ countries |
| Onfido | Global KYC + liveness | 195 countries |
| ComplyAdvantage | AML sanctions | Global |
| Trulioo | KYB | 175+ countries |
| Sumsub | KYC + KYB hybrid | Global |

EHB never locks into one vendor — adapter contract ensures swap-ready.

## 5. PSS level → verification depth mapping

See `3-departments/PSS.md §3` for full ladder. Summary:

- L1 (FREE) — email only
- L2 (BASIC) — phone OTP
- L3 (NORMAL) — KYC standard
- L4 (STANDARD) — KYC + AML clean
- L5 (ADVANCED) — KYC + AML + selfie liveness
- L6 (HIGH) — KYC + biometric (face+voice)
- L7 (PRO) — KYC + on-site verification (Franchise / Inspector)
- L8 (VIP) — KYC + financial verification + reference checks
- L9 (ELITE) — Full audit + court records check
- L10 (SUPREME) — Manual founder approval + full background

## 6. Re-verification cadence

| Trigger | Action |
|---|---|
| Annual | Routine PSS re-check (1 year from last) |
| Document expiry | Auto-prompt to renew (30 days before) |
| Suspicious activity | Forced re-verification |
| STL upgrade attempt | Verification at target level |
| Country change | Re-check with new region's vendor |

## 7. Privacy + data handling

- Documents encrypted at rest (AES-256)
- Region-scoped storage (PK data stays in PK)
- GDPR right-to-erasure honored (with audit log)
- 7-year retention per AML laws
- Access logged + reviewed weekly

## 8. AI in KYC/KYB

Per `3-departments/AI.md`:
- **AI Document Verifier** — OCR + fake detection + metadata tampering check
- **AI Liveness Anti-Deepfake** — selfie video deepfake detection
- **AI Voice Biometric** — extra layer for L6+
- **AI Risk Scorer** — combines KYC signals into risk score for DMO review

## 9. Open questions

- Vendor contracts per region (founder to negotiate)
- L10 SUPREME approval workflow detail
- KYB UBO refresh cadence
- Cross-jurisdiction conflict resolution

## Cross-references

- PSS spec: `3-departments/PSS.md`
- AI Document Verifier: `3-departments/AI.md`
- Compliance matrix: `5-specs/COMPLIANCE-MATRIX.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial KYC + KYB system spec |
