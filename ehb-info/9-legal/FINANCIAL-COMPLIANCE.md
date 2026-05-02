# EHB · Financial Compliance

> **Status:** Canonical v1.0 · 2026-04-30 · Reference · legal review required

## Frameworks EHB must comply with

| Framework | Region | What it covers |
|---|---|---|
| AML/CTF | Global | Anti-money laundering, counter-terrorism financing |
| FATF Travel Rule | Global | Crypto transfers > $1000 require originator/beneficiary info |
| PCI-DSS | Global | Payment card data handling |
| GDPR | EU | Data protection (also see PRIVACY.md) |
| MiCA | EU | Crypto asset regulation (2024+) |
| BSA | US | Bank Secrecy Act, FinCEN reporting |
| MLR 2017 | UK | Money Laundering Regulations |
| SECP rules | Pakistan | Securities + companies |
| SBP AML | Pakistan | State Bank AML guidelines |
| SAMA AML | Saudi | Saudi monetary authority |
| CBUAE | UAE | Central bank AML |

## Token classification (utility, not security)

EHB position: EHBGC is a utility token (Howey Test analysis):
- Investment of money: Yes (sold)
- Common enterprise: Limited (utility-driven)
- Expectation of profit: From use of platform, not from EHB efforts (per yield)
- From efforts of others: User locks for own use

Conclusion: closer to utility (like ETH, BNB) than security.

**Risk:** classification can change country-to-country. Legal monitoring required.

## Reporting obligations

### Pakistan (SECP/SBP)
- STR (Suspicious Transaction Report): within 7 days of suspicion
- CTR (Currency Transaction Report): > PKR 1M cash transactions
- Quarterly compliance report

### US (FinCEN)
- SAR (Suspicious Activity Report): within 30 days
- CTR: cash transactions > $10K
- 314(a) requests

### EU
- STR per AMLD6
- Whistleblower mechanism
- DPO contact for GDPR

### UAE/SA
- STR to FIU
- Sanctions screening daily
- Monthly compliance attestation

## AML risk-based approach

```
On-board → Risk score → Periodic review
   ↓
Low risk: light monitoring
Med risk: enhanced due diligence
High risk: continuous monitoring + senior approval
```

## Sanctioned lists

EHB screens against (real-time):
- OFAC SDN list (US)
- UN Security Council list
- EU consolidated list
- UK HMT list
- Country-local lists

## PEP screening

Politically Exposed Persons (current/former public officials):
- Enhanced due diligence
- Source of wealth verification
- Senior management approval
- Annual review

## Tax

- EHB issues tax-relevant documents per jurisdiction
- 1099-equivalent (US)
- Withholding statements (PK)
- VAT/GST handled per country

## Audit + recordkeeping

- 7-year retention (most AML laws)
- Auditable trail (Polkadot anchored)
- Annual external audit
- Internal monthly review

## Insurance + bonds

- E&O insurance for platform liability
- Crime insurance for fraud losses
- Custody insurance for held funds (Phase-2+)
- Payment processor bonds

## Cross-references

- Privacy: `PRIVACY.md`
- KYC laws: `KYC-LAWS.md`
- Tokenomics: `5-economy/TOKENOMICS.md`
- Treasury: `5-economy/TREASURY-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial financial compliance framework |
