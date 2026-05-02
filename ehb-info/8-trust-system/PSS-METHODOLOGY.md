# PSS Methodology — Personal Security Score

> **Owner:** PSS Team
> **Cap:** L5 (highest PSS attainable)
> **Purpose:** Identity + device + behavior verification.

## PSS Levels (0-5)

| Level | Name | Requirements |
|-------|------|--------------|
| 0 | Anonymous | No verification |
| 1 | Email | Verified email |
| 2 | Phone | Verified phone (SMS / call) |
| 3 | KYC Lite | Government ID + selfie |
| 4 | KYC Full | KYC Lite + address + bio match |
| 5 | KYC+ | All of L4 + biometric continuous |

## Score Computation
```
pss_score = base_level + activity_bonus - risk_penalty
where:
  activity_bonus = +1 if 30 days no-fraud-signal
  activity_bonus = +1 if 2FA enabled
  risk_penalty = -1 per compromise event
  risk_penalty = -2 per identity dispute upheld
```

## Verification Channels
- ID upload → OCR + tamper detection
- Selfie liveness → 3D depth + motion
- Address proof → utility bill OCR + cross-check
- Phone → silent / OTP verification
- Email → magic link
- Device fingerprint → continuous

## Country-Specific Partners
- PK: NADRA Verisys
- AE: EIDA + UAE Pass
- SA: Absher
- TR: E-Devlet
- MY: MyKad
- US: Plaid + Persona
- EU: Onfido / Veriff

## Per-Industry Min PSS
- Healthcare (WMS): L3+
- Legal (OLS): L3+
- Finance (FIN): L4+
- General goods (GSM): L1+

## PSS → STL Contribution
```
PSS_points = (PSS_level / 10) × 40    // 0-40 of 120 (uses level 0-5 mapped to 0-10)
```

Note: PSS caps at 5, but L1-L5 maps onto a 0-10 scale (×2) for STL math contribution.

## Re-verification Cadence
- L3+: every 24 months
- L4+: every 12 months
- L5: every 6 months
- On suspicion: any time

## Linked
- `../3-departments/PSS.md`
- `CRB-METHODOLOGY.md`
- `../9-legal/KYC-LAWS.md`
