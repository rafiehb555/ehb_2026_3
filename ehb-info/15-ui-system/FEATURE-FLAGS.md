# EHB · Feature Flags (global toggles)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** ON/OFF toggles for entire features. Admin-controllable. No code change required.

## Master flags

```yaml
# Core systems
AI_ENABLED: true
BLOCKCHAIN_ENABLED: true
ESCROW_ENABLED: true
EHBGC_ENABLED: true
REFERRAL_ENABLED: true
INSURANCE_ENABLED: false  # Phase-2

# Trust system
STL_LIVE: true
PSS_LIVE: true
CRB_LIVE: true
DMO_LIVE: true
UP_GUARD_LIVE: true

# Industry flags (per industry on/off per region)
INDUSTRY_GSM: true
INDUSTRY_WMS: true   # PK only Phase-1
INDUSTRY_HPS: true
INDUSTRY_OBS: true
INDUSTRY_OLS: true
INDUSTRY_LDS: true
# ... rest can be toggled per-region

# Franchise tiers
FRANCHISE_MICRO: true
FRANCHISE_SUB: true
FRANCHISE_CORPORATE: true
FRANCHISE_MASTER: true  # Phase-1 limited
FRANCHISE_COUNTRY: false  # Phase-1 (founder-direct only)

# Phase rollout
PHASE_2_INDUSTRIES_TEASER: true
PHASE_2_LAUNCH: false
PHASE_3_PREP: false

# AI modules (per module on/off)
AI_RESUME_HELPER: true
AI_TUTOR: true
AI_BUSINESS_ADVISOR: true
AI_LAWYER: true
AI_DIAGNOSIS: false   # Pending medical board approval
AI_FRAUD_DETECTION: true
AI_RECOMMEND: true
AI_TRANSLATION: true

# Payment methods
PAYMENT_STRIPE: true
PAYMENT_JAZZCASH: true
PAYMENT_EASYPAISA: true
PAYMENT_EHBGC: true
PAYMENT_BANK_TRANSFER: false  # Phase-2

# Communication
EMAIL_NOTIFICATIONS: true
SMS_NOTIFICATIONS: true
PUSH_NOTIFICATIONS: false  # Phase-2 mobile
WHATSAPP_OTP: true

# Localization
LANG_URDU: true
LANG_ENGLISH: true
LANG_ARABIC: false  # Phase-2 (UAE/SA launch)
LANG_HINDI: false   # Phase-3
LANG_FRENCH: false  # Phase-3

# UI modes
DARK_MODE: true
LIGHT_MODE: true
IOS_CLASSIC_THEME: true
DIAMOND_DUAL_THEME: true

# Beta features
BETA_API_PUBLIC: false
BETA_FORUM: false
BETA_LIVE_CHAT: false

# Compliance
GDPR_COMPLIANCE: true
AML_SCAN: true
PCI_DSS_COMPLIANCE: true
HIPAA_COMPLIANCE: false  # WMS US/EU expansion only
```

## Per-region flags

Some flags toggle per country:

```yaml
PK:
  AI_LAWYER: true
  AI_DIAGNOSIS: true (with disclaimer)

US:
  AI_LAWYER: false  # Pending bar approval
  AI_DIAGNOSIS: false  # Pending FDA review

EU:
  GDPR_COMPLIANCE: required
  PERSONAL_DATA_EU_RESIDENCE: required
```

## Per-user flags (A/B testing)

```yaml
users:
  - flag: BETA_LIVE_CHAT
    cohort: 5%   # 5% of users see live chat
    industries: [GSM, WMS]  # only these industries

  - flag: NEW_DASHBOARD_DESIGN
    cohort: 20%
    duration: 30_days
```

## Flag management UI

DMO admin can toggle in `/dmo/settings/flags`:
- Search flags
- Filter by category
- Toggle ON/OFF
- Schedule (auto-enable at date)
- Region scope
- User cohort percentage
- Audit log per change

## Implementation

```typescript
// apps/web/lib/feature-flags.ts
import flags from '../../../ehb-info/15-ui-system/FEATURE-FLAGS.md';

export function isEnabled(flag: string, context?: { region?: string, userId?: string }): boolean {
  // ... evaluation logic
}

// usage
if (isEnabled('AI_DIAGNOSIS', { region: 'PK' })) {
  // show Diagnosis AI
}
```

## Flag governance

- New flag added → must have purpose + sunset date
- Flags become "permanent" after 6 months stable
- Permanent flags removed from this file (become hardcoded defaults)
- Flag changes logged + audited

## Cross-references

- Page settings: `PAGE-SETTINGS.md`
- Industries: `3-departments/Industries.md`
- Compliance: `9-legal/`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial flags catalog · 50+ flags defined |
