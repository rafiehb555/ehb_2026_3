# Anti-Money Laundering (AML) Policy — EHB Platform

> **Owner:** Compliance Officer + DMO Council
> **Standard:** FATF 40 Recommendations
> **Cadence:** Annual review + on regulatory change

## Risk-Based Approach
EHB classifies users into risk tiers based on:
- Country (FATF grey/black list = High)
- Industry (FIN, INS, RES = High; healthcare, education = Medium)
- Transaction patterns (velocity, geography, structuring)
- STL level (low STL + high $ = elevated)
- KYC depth completed

## Customer Due Diligence (CDD)

| Tier | Threshold | KYC Required |
|------|-----------|--------------|
| Light | < $500 lifetime | Email + phone |
| Standard | $500 – $10K | Government ID + selfie |
| Enhanced (EDD) | > $10K or High-risk | ID + address proof + source of funds |
| Corporate | Any business account | Beneficial ownership disclosure |

## Transaction Monitoring Triggers
- Round-number deposits/withdrawals
- Velocity spike (3× 30-day average)
- Cross-border > $1K with no clear purpose
- Multiple accounts → single beneficiary (smurfing)
- Sudden STL drop + cashout
- Account dormant > 6m → high activity
- Refund-to-original-card divergence

## Sanctions Screening
- Real-time check against:
  - OFAC SDN list
  - UN Consolidated list
  - EU sanctions
  - UK HM Treasury
  - Local national lists
- Re-screen on every payout
- Block + report on hit

## Reporting
- **SAR/STR:** filed to local FIU within statutory window
- **CTR:** for cash equivalent > local threshold
- **Internal log:** every alert + disposition + reviewer

## Record Keeping
- KYC records: 5 years post-relationship-end
- Transaction records: 5 years post-transaction
- SAR records: 5 years
- Encrypted at rest, access-logged

## Training
- All staff: annual AML training
- Compliance team: quarterly
- Senior management: AML governance session

## Escalation
- Tier 1: Automated rule alerts → Compliance Analyst
- Tier 2: Analyst review → Compliance Officer
- Tier 3: Officer → DMO Council + external counsel
- Tier 4: Law enforcement coordination

## Linked
- `KYC-LAWS.md`
- `FINANCIAL-COMPLIANCE.md`
- `6-audits/COMPLIANCE-AUDIT.md`
