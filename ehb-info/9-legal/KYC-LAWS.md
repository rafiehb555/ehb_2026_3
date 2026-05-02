# EHB · KYC Laws by Region

> **Status:** Canonical v1.0 · 2026-04-30 · Reference only · legal review required

## Region-by-region KYC requirements

| Region | Primary Law | Authority | EHB Approach |
|---|---|---|---|
| Pakistan | SECP rules + SBP AML | SECP, SBP, FBR | NADRA biometric + AML scan |
| Saudi Arabia | SAMA AML/CFT | SAMA, NCA | Iqama / National ID + biometric |
| UAE | UAE Central Bank AML | CBUAE, SCA | Emirates ID + biometric |
| EU | AMLD5/6 + GDPR | EBA, national regulators | Strict KYC + right-to-erasure exception |
| US | BSA + FinCEN | FinCEN, OFAC | SSN/passport + sanctions scan |
| UK | MLR 2017 + FCA | FCA, HMRC | Passport / national ID |
| India | PMLA + SEBI | RBI, SEBI | Aadhaar + PAN |
| Singapore | MAS Notice 626 | MAS | Identity verification + screening |

## Standard KYC requirements (most jurisdictions)

1. Identity verification (gov ID)
2. Address verification (utility bill, bank statement)
3. Source of funds (for high-value users)
4. PEP (Politically Exposed Person) screening
5. Sanctions list screening (OFAC, UN, EU)
6. Adverse media screening
7. Biometric (where regulated, e.g. PK)

## Tiered KYC (per AML risk)

| Risk tier | Requirements |
|---|---|
| Low | Email + phone OTP |
| Medium | + Government ID |
| High | + Selfie liveness + address proof |
| Very high | + Source of funds + reference checks |

EHB's PSS L1-L10 ladder maps to these tiers.

## Cross-border data transfer

- EU → non-EU: Standard Contractual Clauses (SCCs) required
- PK data: prefer in-country processing
- Saudi/UAE: data residency rules apply
- Always log transfers + purpose

## Re-verification cadence

| Country | Frequency |
|---|---|
| PK | Annual + on suspicious activity |
| SA, UAE | Annual |
| EU | Triggered (3-yearly + on event) |
| US | Triggered |

## Sanctions screening cadence

- Real-time on signup
- Daily batch on existing users (against updated lists)
- Manual review on hits

## Industry-specific KYC

- Healthcare: + medical license verification
- Legal: + bar registration verification
- Finance: + extended source of funds
- Construction: + contractor license

## Cross-references

- KYC system: `4-flows/KYC-KYB-SYSTEM.md`
- Compliance matrix: `5-specs/COMPLIANCE-MATRIX.md` (TODO)
- Privacy: `PRIVACY.md`

## Open questions

- Vendor contracts per country (legal team to negotiate)
- Travel rule compliance (FATF)
- Crypto-specific KYC rules (rapidly evolving)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial KYC laws reference |
