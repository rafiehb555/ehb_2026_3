# EHB · Component Library

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Every reusable UI block · single source of truth · prevents UI fragmentation.

## Master rule

> **Build once, use everywhere.** Same component for same purpose across all 222+ pages.

## Component categories

### 1. Layout
- `DashboardShell` — top nav + sidebar + content
- `PageWrapper` — public page layout
- `MobileNavBottom` — bottom nav on mobile
- `Sidebar` — collapsible desktop sidebar
- `Container` — content max-width container

### 2. Cards
- **PlasticCard** — universal card with 3D plastic styling (every page)
- ProductCard — product listing card with full STL display
- ServiceCard — service listing card
- IndustryCard — industry-specific featured card
- AffiliateCard — affiliate display
- KPICard — metric card with sparkline
- TaskCard — todo/task display
- AlertCard — critical alert banner

### 3. STL & Trust
- **StlBadge** — level badge (L1-L10) with tier color
- **CircularGauge** — STL hero gauge
- **MultiRingGauge** — concentric rings (entity STLs)
- **StlJourney** — 6-step journey stepper
- TrustBadge — Premium/Verified Genuine/etc.
- LockBadge — EHBGC lock display
- BTSBadge — Buyer Trust Score
- ReviewerWeightChip — review weight indicator

### 4. Forms
- Input — text input
- Textarea — multi-line text
- Select — dropdown
- Checkbox — toggle
- Radio — single choice
- DatePicker — date selection
- TimePicker — time selection
- FileUpload — file/image upload
- FieldWithHint — input + helper text
- Button3D — primary CTA button (3D effect)
- Chip — small inline tag

### 5. Data display
- **Sparkline** — inline trend SVG
- ProgressBar — linear progress
- ScoreRing — small score visualization
- SplitBar — multi-segment bar
- HealthBox — status indicator (green/amber/red)
- StatTable — tabular data
- Timeline — event timeline
- Pagination — page navigation

### 6. Trust & Verification
- VerificationBadge — PSS/CRB/KYB indicator
- IndustryVerificationCard — per-industry cert
- AIConfidenceChip — AI confidence %
- RefillTimer — countdown to next refill
- StlSourceMatrix — PSS/CRB/DMO source breakdown

### 7. Wallet & Money
- WalletWidget — balance display
- LockManager — lock/unlock controls
- TransactionRow — single transaction
- CurrencyDisplay — multi-currency price
- YieldStream — daily yield ticker

### 8. Navigation
- TopNav — main top navigation
- Breadcrumb — page hierarchy
- Tabs — tabbed sections
- Pagination
- BackButton

### 9. Feedback
- Toast — temporary notification
- Modal — overlay dialog
- Drawer — side panel
- Tooltip — hover hint
- Popover — click hint
- Spinner — loading indicator
- Skeleton — loading placeholder
- EmptyState — no-data display

### 10. Industry-specific (per industry)
- IndustryHero — industry pillar page hero
- IndustryFilter — industry-specific search
- IndustryFields — industry-specific form fields

## Existing components (in apps/web/components/)

```
ui/
├── plastic-card.tsx ✓
├── circular-gauge.tsx ✓
├── multi-ring-gauge.tsx ✓
├── sparkline.tsx ✓
├── stl-badge.tsx ✓
├── stl-journey.tsx ✓
├── chip.tsx ✓
├── button-3d.tsx ✓
├── field-with-hint.tsx ✓
├── kpi-card.tsx ✓
├── public-nav.tsx ✓
├── public-footer.tsx ✓
└── ... 40+ more
```

## Components to build (priority)

| Component | Priority | For pages |
|---|:---:|---|
| TrustBadge | High | Product/Service cards |
| LockBadge | High | Product cards · Wallet |
| AIConfidenceChip | High | Product cards · AI marketplace |
| RefillTimer | Medium | Seller dashboards |
| BTSBadge | Medium | Buyer profiles |
| YieldStream | Medium | Wallet |
| IndustryVerificationCard | High | Product/Service cards |
| Modal/Drawer | High | Multiple pages |

## Design tokens (per `5-specs/EHB-BUILD-BLUEPRINT.md`)

- Colors: `#7B6EF6` (purple) · `#2BBFA0` (teal) · `#F0A030` (amber) · `#0C0E1A` (bg)
- Typography: DM Sans (primary)
- Border radius: 12 (cards) · 8 (inputs) · 5-6 (chips)
- Shadows: glass effect · plastic 3D coating
- Themes: iOS Classic · Diamond Dual · Dark Glass (legacy)

## Component naming convention

- PascalCase for component files
- `lowercase-with-dashes.tsx` for filenames
- Props with `Props` suffix
- Default export the component

## Cross-references

- Pages: `PAGES-LIST.md`
- Page tools: `PAGE-TOOLS-MAP.md`
- UI rules: `UI-RULES.md`
- Brand: `5-specs/BRAND-GUIDELINES.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial component library catalog |
