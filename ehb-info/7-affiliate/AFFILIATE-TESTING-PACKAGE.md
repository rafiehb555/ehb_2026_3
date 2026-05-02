# EHB Affiliate Program — Testing Package

> **Version:** v3.11
> **Status:** Production-ready · QA testing phase
> **Date:** 2026-04-27
> **Owner:** Muhammad Rafi (founder/CEO) · EHB Technologies (Pvt.) Ltd.

---

## 📦 What's in this package

This testing package contains everything a QA tester / developer needs to validate the EHB Affiliate Program end-to-end:

- **16 frontend pages** (Next.js 14 App Router)
- **14 reusable components**
- **15 backend services** (Node 20 + Express + Mongoose)
- **12 Mongoose models**
- **6 API route groups**
- **8 email notification templates**
- **i18n dictionary** (English + Roman Urdu)
- **3 mobile-optimized views**
- **1 PDF report layout** (Commission Statement)
- **Smoke test script** (32+ steps)

---

## 🚀 Quick Start — Run locally in 5 minutes

### Prerequisites
- **Node.js 20+** ([download](https://nodejs.org))
- **MongoDB 7** ([install guide](https://www.mongodb.com/docs/manual/installation/))
- **pnpm 8+** (`npm install -g pnpm`)

### Setup

```powershell
# 1. Install dependencies
cd D:\ehb_2026_3
pnpm install

# 2. Start MongoDB (if not already running)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# 3. Seed demo data (creates affiliates, products, commissions)
pnpm seed

# 4. Run STL gold-master tests (must show 58/58 passing)
pnpm test:stl

# 5. Start all 3 services (web + api + ai)
.\scripts\start-all.ps1
# OR run individually:
#   pnpm --filter @ehb/web dev          (port 3000)
#   pnpm --filter @ehb/api dev          (port 5000)

# 6. Open browser
# http://localhost:3000/affiliate
```

### Smoke test (automated end-to-end validation)

```powershell
node scripts/smoke-test-affiliate.js
```

Expected output: **32/32 steps passed**.

---

## 🧪 Test URLs — visit each and verify

### Public-facing pages (no login required)

| URL | Expected behavior |
|---|---|
| `/affiliate` | Welcome tab loads with 14 sections — animated counters tick up (12,847 affiliates · $47 median · etc.), Live activity ticker auto-updates every 4s, FAQ accordion expands/collapses |
| `/affiliate/marketplace` | DAM with 9 demo products fallback when DB empty, industry rate chips, Promote buttons copy referral link to clipboard |
| `/affiliate/how-it-works` | Standalone walkthrough — 6-step flow, 3 earnings scenarios with math, 10-item collapsible FAQ, compliance card |
| `/affiliate/rank-detail` | Silver Executive style rank page — R1-R10 ladder, 3 recommended actions with progress bars, 10 industry verticals (locked/unlocked) |
| `/affiliate/help` | Legal docs library — sidebar nav with 5 docs (T&Cs, Privacy, KYC, Income Disclosure, Cookie), full content viewer with Print/Download buttons |
| `/wallet` | Dual-wallet view (Main + Affiliate) — Transfer button works, transactions list visible |
| `/kyc` | KYC submission flow — 4 tier ladder visible |
| `/reports/commission-statement` | Print-ready A4 statement — Click "Print / Save as PDF" button |

### Authenticated affiliate pages (require login)

Login as `user001@demo.ehb` / password: `demo1234`

| URL | Expected behavior |
|---|---|
| `/affiliate` Dashboard tab | Shows referral code, KPIs, Network Tree, Activity Feed, Quick Actions, Sharing Tools, Achievements badges, Promo Materials |
| `/affiliate` Wallet tab | Withdrawal panel with 3 rails (USDT TRC20 / JazzCash / HBL), transactions history, custody safety card |
| `/affiliate` Bonuses tab | R1-R10 rank ladder, Track B 10-level cascade, all 11 bonuses in 4 tiers |
| `/affiliate` Compliance tab | KYC tier ladder, IDS earnings distribution, NOT-MLM legal posture, 5-country jurisdictional plan |

### Admin / DMO pages (require DMO_MANAGER role)

Login as `dmo.manager@ehb.com` / password: `ehbDmo2026`

| URL | Expected behavior |
|---|---|
| `/dmo/affiliate-admin` | 6-tab ops cockpit (Overview · DMO Queue · Withdrawals · Country Flags · Exports · 80/20 Report) |
| `/dmo/price-lock` | 12-step admin — current step highlighted, 8-tier price table cross-country, Recent Activity logs |
| `/dmo/campaigns` | Campaign Management — KPI strip, hero campaign cards, 6-row table with status filters |
| `/dmo/product-moderation` | Product submission queue — split layout, Risk Score 0-100, Seller Profile, Sale Series |

### Mobile-optimized pages (test in DevTools 390px viewport)

| URL | Expected behavior |
|---|---|
| `/m/affiliate` | iOS-style mobile dashboard — Earnings Cap banner, KPIs, daily-cap progress, 7-day chart, Quick Promote, Recent Activity, bottom tab nav |
| `/m/affiliate/marketplace` | Mobile marketplace — search, category chips, Featured horizontal scroll, 9-product grid, pagination |
| `/m/affiliate/dmo` | Mobile DMO review — risk score cards, expanded detail with risk signals, Reverse/Soft Block/Hard Block buttons |

### Seller pages

| URL | Expected behavior |
|---|---|
| `/seller/analytics` | Seller analytics — Total Sales / Conv / CVR KPIs, Clicks vs Conversions dual-line SVG chart, Top Products table, Recent Payouts |

---

## ✅ QA Checklist

### Critical functional tests

- [ ] **Sign up flow:** New user can register at `/register` → auto-creates Affiliate record → unique referral code generated
- [ ] **Join program:** User clicks "Join Affiliate Program — Free" on `/affiliate` Welcome tab → Affiliate record created with referral code visible on Dashboard
- [ ] **Referral link click:** Visiting `?ref=USER-CODE` attributes the visitor to that user's network
- [ ] **Track A direct sale:** When a referred user makes a purchase, direct affiliate gets 10% commission credit (visible in Activity Feed + Wallet)
- [ ] **Track A L2 cascade:** When a referred user's referral makes a purchase, L1 affiliate gets 1.5% commission
- [ ] **First Sale Bonus:** First-ever sale by a referral triggers $5 bonus to upline
- [ ] **STL Bonus:** Referred user upgrading STL triggers 3%/2% bonus to upline
- [ ] **Fast Sale Bonus:** 4 same-package sales/week awards 1 free package (cap 2/week)
- [ ] **Withdrawal request:** User can submit withdrawal via /wallet → Admin sees in `/dmo/affiliate-admin` Withdrawals tab → Approve/Reject works
- [ ] **KYC submission:** User uploads ID at `/kyc` → DMO can approve/reject in admin panel
- [ ] **Commission reversal:** Refunded order auto-reverses corresponding commission within 30-day window
- [ ] **Velocity cap:** 50+ signups from same IP in 24h triggers compliance lock
- [ ] **Self-purchase block:** Affiliate buying via own referral link doesn't pay commission

### Visual / UX tests

- [ ] All 16 pages load without console errors
- [ ] Animated counters tick up on Welcome tab when scrolled into view
- [ ] Live activity ticker auto-updates every 4 seconds
- [ ] FAQ accordion expand/collapse works on Welcome tab + How-it-works page
- [ ] Promote button copies referral link to clipboard
- [ ] Sharing Tools open WhatsApp/Twitter/etc. with pre-filled message
- [ ] Promo Materials SVG banners download correctly
- [ ] PDF Commission Statement prints cleanly via browser print → Save as PDF
- [ ] Mobile pages render correctly at 390px viewport in DevTools
- [ ] Dark theme is consistent across all pages
- [ ] Hover effects on cards (lift + glow)
- [ ] Empty states show friendly icons + CTAs (not blank "No data")

### Compliance tests (legal critical)

- [ ] IDS endpoint `/api/compliance/ids` returns 12,847 demo affiliates · $47 median · etc. when DB has no real data
- [ ] Forbidden phrases ("Get paid to recruit", "Investment ROI", etc.) trigger warnings in Sharing Tools
- [ ] 80/20 income rule warning appears when R3+ user earns <80% from external customers
- [ ] OFAC screening blocks sanctioned countries during signup
- [ ] FATF Travel Rule applies to crypto withdrawals ≥$1,000

---

## 🐛 Known limitations (Phase 2 backlog)

These are NOT bugs — they're explicitly deferred to Phase 2:

| Item | Reason | Phase 2 ETA |
|---|---|---|
| Real Jumio/Onfido/NADRA KYC vendor | Stub adapter for MVP | Q3 2026 |
| Real JazzCash/HBL payment driver | Stub adapter for MVP | Q3 2026 |
| Polkadot blockchain anchor | Stub for MVP, in-DB tracking | Q3 2026 |
| WebSocket live updates | Polling-based for now, Socket.IO ready | Phase 2 |
| Multi-region active-active | Single-region (Singapore) at launch | Q4 2026 |
| UAE / India / UK / USA expansion | PK pilot first | 2026-2027 |

---

## 📂 File inventory (~8,275 lines)

```
apps/web/
├── app/
│   ├── affiliate/
│   │   ├── page.tsx                    1820 lines · 6-tab hub
│   │   ├── marketplace/page.tsx        DAM with industry rates
│   │   ├── how-it-works/page.tsx       Detailed walkthrough
│   │   ├── rank-detail/page.tsx        Rank ladder + verticals
│   │   └── help/page.tsx               Legal docs library
│   ├── dmo/
│   │   ├── affiliate-admin/page.tsx    6-tab ops cockpit
│   │   ├── price-lock/page.tsx         12-step admin
│   │   ├── campaigns/page.tsx          Campaign manager
│   │   └── product-moderation/page.tsx Product queue
│   ├── m/affiliate/                    3 mobile pages
│   ├── reports/commission-statement/   PDF-ready
│   ├── seller/analytics/page.tsx       Seller dashboard
│   ├── wallet/page.tsx                 Dual-wallet
│   └── kyc/page.tsx                    KYC submission
│
├── components/affiliate/                14 reusable components
│   ├── achievements.tsx                 28-badge gallery
│   ├── activation-journey.tsx           7-step stepper
│   ├── activity-feed.tsx                Commission stream
│   ├── animated-counter.tsx             Count-up on scroll
│   ├── compliance-notice.tsx            Banner
│   ├── earnings-calculator.tsx          Live projection
│   ├── earnings-chart.tsx               Mon-Sun area chart
│   ├── landing-sections.tsx             10 hero sections
│   ├── mobile-bottom-nav.tsx            iOS-style nav
│   ├── network-tree.tsx                 3-level tree
│   ├── promo-materials.tsx              SVG banners
│   ├── promote-modal.tsx                QR + share
│   ├── quick-actions.tsx                Next-steps panel
│   └── sharing-tools.tsx                6-channel share
│
└── lib/affiliate-i18n.ts               EN + Roman Urdu

services/api/src/
├── services/                            15 backend services
│   ├── affiliateService.js              Core (685L)
│   ├── trackBService.js                 Franchise cascade
│   ├── bonusService.js                  All 11 bonuses
│   ├── cappingService.js                Per-rank caps
│   ├── rankEngineService.js             R1-R10 promotion
│   ├── complianceService.js             OFAC + IDS
│   ├── kycService.js                    KYC tiers 0-4
│   ├── affiliateWalletService.js        Dual wallet
│   ├── withdrawalService.js             Multi-sig
│   ├── auditExportService.js            CSV exports
│   ├── fraudSignalsService.js           DMO queue
│   ├── countryFeatureFlags.js           Per-country gating
│   ├── affiliateConfigService.js        Admin config
│   ├── industryRateService.js           Per-category rates
│   └── emailTemplates.js                8 HTML templates
│
├── models/                              12 Mongoose models
│   ├── Affiliate.js                     Core model
│   ├── AffiliateCommission.js           13 commission types
│   ├── AffiliateWallet.js               80/20 USDT/EHBGC
│   ├── AffiliateConfig.js               Admin tunable
│   ├── RebatePool.js                    Overflow tracking
│   ├── KycDocument.js                   T0-T4 ladder
│   ├── FraudSignal.js                   Signals
│   ├── DmoReviewQueue.js                Flagged cases
│   ├── WithdrawalRequest.js             Admin queue
│   ├── Earning.js                       Per ER diagram
│   ├── Referral.js                      Separate entity
│   └── FranchiseRecord.js               State machine
│
├── routes/                              7 route files
│   ├── affiliate.js                     Public + auth endpoints
│   ├── affiliateWallet.js               /api/wallet/affiliate/*
│   ├── compliance.js                    OFAC + IDS endpoints
│   ├── kyc.js                           Tier submissions
│   ├── adminAffiliateConfig.js          DB-backed config
│   └── adminAffiliateOps.js             DMO queue + exports
│
└── adapters/                            Production-swappable
    ├── bank/                             JazzCash + HBL stubs
    ├── usdt/                             Tron TRC20 stub
    └── kyc/                              NADRA + Jumio stubs

ehb-info/departments/Affiliate.md       Canonical spec v3.11 (2330+ lines)
EHB-MASTER-PLAN.md                       Executive summary v1.8
ehb-status.json                          Live tracker
scripts/
├── smoke-test-affiliate.js              32-step automated test
└── migrate-affiliate-grandfathering.js  v1→v3.2 migration

AFFILIATE-PHASE-8-DEPLOYMENT-RUNBOOK.md  Pakistan pilot
AFFILIATE-DEVELOPER-HANDOFF.md           Dev bundle
AFFILIATE-V3.2-MVP-RUNBOOK.md            Launch playbook
AFFILIATE-PHASE-2-BACKLOG.md             15 deferred items
```

---

## 🎯 Demo accounts

| Email | Password | Role |
|---|---|---|
| `dmo.manager@ehb.com` | `ehbDmo2026` | DMO_MANAGER (admin) |
| `user001@demo.ehb` | `demo1234` | regular user / affiliate |

After running `pnpm seed`, more demo accounts are created with realistic rank distributions.

---

## 📞 Bug reporting

Report any issues to:

- **Email:** dev@ehb.com
- **Format:** Page URL · Steps to reproduce · Expected vs Actual · Browser/version · Console errors (if any)
- **Priority levels:**
  - **P0 Critical** — page won't load · payment broken · security issue
  - **P1 High** — feature broken but workaround exists
  - **P2 Medium** — visual/UX issue, doesn't break functionality
  - **P3 Low** — copy/typo/minor polish

---

## ⚖️ Legal / Compliance reminders

- **EHB is NOT MLM.** Income comes only from real product sales.
- **80/20 rule:** R3+ affiliates must earn ≥80% from external customers (anti-pyramid).
- **30-day cooling-off:** Refunds auto-reverse commissions.
- **OFAC + FATF:** Sanctions screening + Travel Rule for crypto ≥$1,000.
- **Pakistan SECP-aligned:** PK pilot live; UAE/IN/UK/US Phase 2.
- **IDS:** Public Income Disclosure Statement at `/api/compliance/ids`.

---

*EHB Technologies (Pvt.) Ltd. · Affiliate Testing Package v3.11 · 2026-04-27*
