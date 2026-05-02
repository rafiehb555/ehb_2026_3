# EHB · Page Settings (auto-generated from flows)

> **Status:** Canonical v1.0 · 2026-04-30
> **Auto-generation rule:** Flow file → Auto-generates page settings

## Settings format

Each page has a TypeScript-like settings object:

```typescript
interface PageSettings {
  showSTL: boolean;
  showSellerSTL: boolean;
  showCompanySTL: boolean;
  showOwnerSTL: boolean;
  enableAI: boolean;
  enableEscrow: boolean;
  enableReviews: boolean;
  // ... more
}
```

These are **runtime configurable** — admin can toggle without code change.

## Per-page settings (proposed defaults)

### Product Page

```yaml
page: ProductPage
url: /gosellr/<id>
settings:
  showSTL: true
  showSellerSTL: true
  showCompanySTL: true
  showOwnerSTL: true
  showProductSTL: true
  showMINChain: true
  showTrustBadge: true
  enableAIRecommendation: true
  enableTrustQA: true
  enableEscrow: true
  enableReviews: true
  enableReviewerWeight: true
  enableLockBadge: true
  enableAIConfidence: true
  enableRefillTimer: true
  showIndustryVerifications: true
  enableComplaintFile: true
  showSimilarProducts: true
```

### Service Page

```yaml
page: ServicePage
url: /industries/<code>/listing/<id>
settings:
  inheritsFrom: ProductPage
  enableBooking: true
  showAvailabilityCalendar: true
  showProviderProfile: true
  showCertifications: true
  showInspectorBadge: true
  showIndustrySpecificFields: true
```

### Wallet Page

```yaml
page: WalletPage
url: /wallet
settings:
  showBalance: true
  showLocked: true
  showLockedPerEntity: true
  showYieldEarnings: true
  enableLockManager: true
  enableBurnForSTLBoost: true
  enableTopUp: true
  enableWithdraw: true
  showTransactionHistory: true
  enableCurrencyConverter: true
  showMultiCurrencyWallets: true
```

### STL Dashboard

```yaml
page: STLDashboard
url: /stl
settings:
  showCircularGauge: true
  showJourneyStepper: true
  showPSSCRBDMOCards: true
  showFormulaExplainer: true
  showAIMarketplaceGrid: true
  showIndustrySTLGrid: true
  showScoreBreakdown: true
  showUpDownRules: true
  showAIRecommendations: true
  showRecentActivity: true
  showFooterCTAs: true
```

### AI Marketplace

```yaml
page: AIMarketplace
url: /ai-marketplace
settings:
  showUserSTLPill: true
  showTierFilter: true
  showHowToUse: true
  showPerTierServiceGrid: true
  showSTLLadderPerService: true
  showEarningsPerService: true
  showCTAStrip: true
  enableTierFiltering: true
```

### DMO Dashboard

```yaml
page: DMODashboard
url: /dmo/dashboard
roleGate: DMO_Staff_OR_Higher
settings:
  showPeriodSelector: true
  showCriticalAlerts: true
  show8KPICards: true
  showLiveActivityFeed: true
  showPriorityQueues: true
  showMyTasks: true
  showTrustDistribution: true
  showIndustryHealth: true
  showRevenueSplit: true
  showTopFranchises: true
  showGeoZones: true
  showTopSellers: true
  showFlaggedUsers: true
  showSystemHealth: true
  showQuickActions: true
```

## Auto-generation from flows

```
ORDER-FLOW.md →
   ├─ Order Page settings (show all states, escrow, dispute button)
   ├─ Payment Page settings (show methods, currency, retry)
   └─ Escrow settings (cooling timer, release controls)

PAYMENT-FLOW.md →
   ├─ Payment Page settings
   └─ Wallet settings (charge, refund, history)

DISPUTE-FLOW.md →
   ├─ Dispute filing page settings
   ├─ Dispute timeline settings
   └─ AI mediator settings
```

## Override hierarchy

```
Page default settings
   ↓ overridden by
Industry-specific overrides (per industry config)
   ↓ overridden by
Region-specific overrides (per country)
   ↓ overridden by
A/B test variants
   ↓ overridden by
Admin runtime override (DMO Settings)
```

## Implementation

```
ehb-info/15-ui-system/PAGE-SETTINGS.md (canonical)
   ↓ generates
apps/web/lib/page-settings.ts (TypeScript constants)
   ↓ used by
Page components (read settings from context)
```

When PAGE-SETTINGS.md changes, regenerate `page-settings.ts` automatically.

## Cross-references

- Tools per page: `PAGE-TOOLS-MAP.md`
- Components: `COMPONENT-LIBRARY.md`
- Feature flags: `FEATURE-FLAGS.md`
- Action map: `ACTION-MAP.md`
- Flow files: `4-flows/`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial page settings + auto-gen rule |
