# EHB Affiliate Program v3.3 — Developer Handoff

> **Read this first.** Then drill into `ehb-info/departments/Affiliate.md` for the full canonical spec.
> **Project:** EHB Technologies (Pvt.) Ltd. · **Founder:** Rafi · **Locked:** 2026-04-26
> **Status:** MVP backend + frontend built · smoke test ready · Pakistan-first soft launch target

---

## 1-Page Executive Summary

EHB is a 38-industry super-app with a built-in **affiliate program** (Track A product sales + Track B franchise sales). v3.3 is **production-ready** with 4 layers:

| Layer | What it does |
|---|---|
| **Cascade** | Track A (3-level: 10%/5%/2%) for products · Track B (10-level rank-gated) for franchise sales |
| **Ranks** | R1 Starter → R10 Global Leader, auto-promotes based on directs/team/STL/active legs/industries |
| **Bonuses** | 11-bonus catalog (3 in MVP: First Sale $5, STL Purchase 3%/2%/1%, Fast Sale 4 sales/wk → free pkg) |
| **Wallet** | Dual-wallet (Main EHB ↔ Affiliate) · 80% USDT + 20% EHBGC default · capping engine prevents treasury drain |

**Legal positioning (CRITICAL):** EHB is **NOT MLM**. It's an **Affiliate + Marketplace + Service Platform**. Income comes only from real product/service sales — never joining fees, recruitment alone, or self-purchase loops. 30-day full refund window.

**Launch strategy:** Pakistan-first soft launch (existing EHB Tech entity, no new license). Other countries phased as licenses complete (parallel track, not blocking MVP).

---

## File Index — Read in This Order

### 📘 Spec (canonical — give to dev)

1. **`ehb-info/departments/Affiliate.md`** — THE spec
   - §1-§11: Original baseline (referrer setup, attribution, anti-fraud)
   - **§12 v3.2 (production)**: dual-track cascade, R1-R10 ranks, 11-bonus catalog, 5 franchise levels, 7-step activation, dynamic pricing, MVP scope, backend migration plan
   - **§13 v3.3 (architecture)**: compliance rules, capping system, 100-year sustainability, billion-traffic stack, microservices, dual-wallet, USDT/bank rails, KYC tiers, hot/cold custody, DAM page UX, locked decisions
   - §12-LEGACY: v3.1 preserved for audit trail
   - Changelog: full version history

2. **`EHB-MASTER-PLAN.md`** §18 — executive summary

3. **`AFFILIATE-V3.2-MVP-RUNBOOK.md`** — launch-day playbook

### 💻 Code (in monorepo)

```
services/api/                     ← Express + Mongoose backend
├── src/
│   ├── models/
│   │   ├── Affiliate.js          ← v3.2 with rank R1-R10, fastSaleTracker, firstSaleClaimedAt
│   │   ├── AffiliateCommission.js  ← 13 commission types (5 v3.2-MVP + 7 Phase 2 + 3 legacy)
│   │   ├── AffiliateWallet.js    ← v3.3 dual-wallet (USDT + EHBGC), pendingHold, payoutMix
│   │   └── Wallet.js             ← Main wallet (EHBGC + USD) — UNTOUCHED for backward compat
│   ├── services/
│   │   ├── affiliateService.js     ← Track A cascade, 3 bonuses, refund clawback (535 lines)
│   │   ├── affiliateWalletService.js ← credit/transfer/clawback (280 lines)
│   │   ├── cappingService.js     ← per-rank daily/monthly/per-tx caps (215 lines)
│   │   ├── rankEngineService.js  ← R1→R10 auto-promotion + bonus credit (240 lines)
│   │   └── walletService.js      ← Main wallet ops (lockEhbgc, transferEhbgc, etc.) — pre-existing
│   └── routes/
│       ├── affiliate.js          ← /api/affiliate/* (joins, breakdowns, ranks, caps)
│       └── affiliateWallet.js    ← /api/wallet/affiliate/* (balance, transfer, transactions)

apps/web/                         ← Next.js 14 frontend
├── app/
│   ├── affiliate/page.tsx        ← Full v3.2-MVP UI (rank progress, caps, breakdown)
│   ├── wallet/page.tsx           ← v3.3 dual-wallet view + transfer UI
│   ├── stl/page.tsx              ← STL dashboard with embedded AffiliateCard widget
│   └── page.tsx                  ← Homepage with promo AffiliateCard
└── components/ui/
    ├── affiliate-card.tsx        ← Reusable promo/live card (375 lines)
    └── public-nav.tsx            ← Has Affiliate + Wallet menu items

scripts/
├── smoke-test-affiliate.js       ← 20-step automated test
└── start-all.ps1                 ← Windows multi-terminal launcher

backup/affiliate-v1.0-2026-04-26/  ← Original v1.0 files preserved
```

---

## API Contract Reference

### Affiliate Core

```
GET    /api/affiliate/info                       Public — v3.2-MVP rates + bonus config
POST   /api/affiliate/join                       Auth — { referredByCode? } → AffiliateData
GET    /api/affiliate/me                         Auth — current affiliate record
GET    /api/affiliate/tree?depth=2               Auth — network tree (MVP cap = 2)
GET    /api/affiliate/commissions?type=&limit=   Auth — commission ledger
GET    /api/affiliate/earnings/breakdown         Auth — { direct, level2, firstSale, stlBonus, fastSaleFreePackages, total }
GET    /api/affiliate/referral-link?productId=   Auth — DAM-ready referral link
POST   /api/affiliate/stl-upgrade-bonus          Admin — internal STL upgrade trigger
POST   /api/affiliate/reverse-order              Admin — refund clawback hook
```

### Capping (v3.3 §13.2)

```
GET    /api/affiliate/caps                       Auth — current daily/monthly usage + remaining
GET    /api/affiliate/caps/ladder                Public — full rank-cap table
```

### Rank Engine (v3.2 §12.5)

```
GET    /api/affiliate/rank/progress              Auth — current rank + 5-metric progress
POST   /api/affiliate/rank/evaluate              Auth — manual promote-if-eligible trigger
GET    /api/affiliate/rank/ladder                Public — full R1-R10 + bonuses table
```

### Affiliate Wallet (v3.3 §13.6)

```
GET    /api/wallet/affiliate/info                Public — wallet config (rates, fees)
POST   /api/wallet/affiliate/ensure              Auth — idempotent create
GET    /api/wallet/affiliate/balance             Auth — full balance snapshot
POST   /api/wallet/affiliate/transfer-to-main    Auth — { amountUsd } → moves to Main
GET    /api/wallet/affiliate/transactions        Auth — wallet-related transaction history
```

### Main Wallet (pre-existing — UNTOUCHED)

```
GET    /api/wallet/balance                       Auth — Main wallet (ehbgcBalance, ehbgcLocked, usdBalance)
... existing lock/unlock/transfer endpoints
```

---

## Database Schema Reference

### Affiliate (Mongoose)

```javascript
{
  userId: ObjectId,
  referralCode: String,
  referredBy: ObjectId | null,
  upstream: [ObjectId],            // chain (MVP uses [0]=L1, [1]=L2)
  rank: 'R1'..'R10',               // v3.2 rank ladder (default 'R1')
  tier: 'L1_REFERRER'..'L5_ELITE', // legacy v1.0 (kept for backward compat)
  stats: {
    directReferrals, networkSize,
    lifetimeEarningsUsd, thisMonthEarningsUsd, pendingEarningsUsd,
    directEarnedUsd, level2EarnedUsd,         // v3.2 per-source
    firstSaleBonusEarnedUsd, stlBonusEarnedUsd,
    fastSaleBonusFreePackages,
    activeLegsCount, industriesActiveCount, saleVolumeUsd  // Phase 2
  },
  firstSaleClaimedAt: Date | null,  // one-time per user
  fastSaleTracker: { weekKey, sameProductSales: Map, freePackagesAwardedThisWeek },
  productAffiliateEnabled: Boolean,
  eligible: Boolean,
  activatedAt: Date,
}
```

### AffiliateCommission

```javascript
{
  earnerUserId, sourceUserId,
  type: 'direct' | 'level' | 'first_sale' | 'stl_purchase' | 'fast_sale' | 'rank_achievement'
       | 'matching' | 'team_performance' | 'retention' | 'monthly_leader' | 'super_franchise' | 'global_pool' | 'franchise_cascade'
       | 'pool' | 'franchise' | 'product',  // legacy
  track: 'A' | 'B' | null,
  level: 1..10,
  orderId, productPriceUsd, orderValueUsd, rateApplied,
  amountUsd: Number,
  sellerProfitPercent, networkPoolPercent, industryCode,
  status: 'pending' | 'paid' | 'reversed',
  paidAt, reversedAt, reversedReason,
}
```

### AffiliateWallet (v3.3 NEW)

```javascript
{
  userId,
  balances: { usdt: Number, ehbgc: Number },     // 80/20 default split
  pendingHold: Number,                           // 30-day hold (Phase 2 enforcement)
  availableUsd: Number,                          // cached aggregate
  stats: {
    lifetimeCreditedUsd, lifetimeWithdrawnUsd,
    thisMonthCreditedUsd, monthAnchor: 'YYYY-MM'
  },
  settings: {
    payoutMix: { usdtPercent: 80, ehbgcPercent: 20 },
    whitelistedAddresses: [{ network, address, label, addedAt, verifiedAt, activeAfter }]
  },
  status: 'active' | 'frozen' | 'under_review',
  frozenReason, frozenAt,
  lastCreditedAt, lastTransferredAt
}
```

---

## Quick Start (Developer)

```powershell
# 1. Clone + install
git clone <repo> ehb_2026_3
cd ehb_2026_3
pnpm install

# 2. Configure
copy .env.example .env  # update MONGO_URL, JWT_SECRET, etc.

# 3. Seed demo data (creates 50 users, 15 affiliates, wallets, commissions)
pnpm seed

# 4. STL gold-master sanity check (must show 58/58 ✓)
pnpm test:stl

# 5. Start the stack (3 terminals or use scripts/start-all.ps1)
cd services/api && pnpm dev    # http://localhost:5000
cd services/ai && pnpm dev     # http://localhost:8080
cd apps/web && pnpm dev        # http://localhost:3000

# 6. Run automated smoke test (20 steps)
node scripts/smoke-test-affiliate.js

# 7. Browser walkthrough — see AFFILIATE-V3.2-MVP-RUNBOOK.md Step 4
```

---

## Critical Hard Rules (Never Break)

From `Affiliate.md` §13.1.1:

```
✓ Income MUST come from real product/service sale
✗ NO "YO BUY" — no forced self-purchase to unlock earning
✗ NO fake/empty/overpriced packages
✗ NO unlimited-depth income (max 10 rank-gated levels)
✗ NO referral-only income (sale-less)
```

**Self-purchase rule (locked):** STL credit YES; downline commission NO; First Sale Bonus only if external customer sale within 30 days.

**STL gold-master file (`services/api/src/services/stlService.js`):** NEVER modify without regenerating all 58 tests. `pnpm test:stl` must always show 58/58.

---

## Key Locked Decisions (v3.3 §13.8)

| # | Decision | Locked Value |
|---|---|---|
| 1 | Commission storage | Hybrid 80% USDT + 20% EHBGC (user can opt 100% EHBGC) |
| 2 | Cooling-off refund | 30 days |
| 3 | PK bank rails | JazzCash + HBL simultaneously |
| 4 | Multi-region rollout | Hybrid (single-region + CDN at launch, then 3-region within 90 days) |
| 5 | Multi-country strategy | **Pakistan-first soft launch** (existing entity, others phased) |
| 6 | Self-purchase rule | STRICT (no commission, no bonus unless external sale 30d) |
| 7 | Affiliate-path scope | OF1–OF4 only auto-unlock |
| 8 | Wallet approach | **Simple centralized at launch**, blockchain Phase 2/3 |
| 9 | Withdrawal limits | R1 $100/day · R5 $500/day · R10 $5,000/day + KYC tier multiplier |
| 10 | Capping | Daily (per-rank) + Monthly 25× + Per-tx $10K + no lifetime cap |
| A (default) | Conversion oracle | Chainlink (activated when blockchain goes live) |

---

## Phase Roadmap

| Phase | Timeline | Scope |
|---|---|---|
| **MVP (Phase 1)** | Q2 2026 | Pakistan soft launch · Track A · 2-level cascade · 3 bonuses · simple wallet · JazzCash+HBL · NADRA KYC · 100-500 invite-only users |
| **Phase 2** | Q3-Q4 2026 | Validate PMF · Wallet service production · USDT TRC20 · 8 more bonuses · Track B 10-level · Rank engine prod · multi-region prep |
| **Phase 3** | Q1-Q2 2027 | UAE + India + UK go live · ERC20/BEP20 networks · KYC tier 3+ · Hot/Cold custody · multi-sig · capping per-tier KYC multiplier |
| **Phase 4** | 2027+ | USA goes live · Conversion engine USDT↔EHBGC · Polygon/Solana · Open Banking · institutional Tier 4 · DAO governance |

---

## Open Items (Non-Blocking for MVP)

5 minor items deferred (see `Affiliate.md` §12.21 + status JSON):

1. EHBGC OF lock amounts (placeholder for now)
2. Global Pool weighting metric details (R8+ profit share formula)
3. Withdrawal frequency by rank (default: 30-day hold for all)
4. Campaign rules by rank (default: all ranks can run campaigns)
5. Pakistan SECP-licensed counsel review before launch

---

## Architecture at a Glance

```
                        ┌────────────────────────┐
                        │      API GATEWAY       │
                        └─────────┬──────────────┘
                                  │
        ┌───────────┬─────────┬───┼─────┬─────────┬───────────┐
        │           │         │   │     │         │           │
   ┌────▼────┐ ┌───▼────┐ ┌──▼──▼──┐ ┌──▼────┐ ┌─▼─────┐ ┌───▼──────┐
   │  USER   │ │ AFFIL  │ │ COMM-  │ │FRANCH │ │  AI   │ │ANALYTICS │
   │ ENGINE  │ │ ENGINE │ │ ERCE   │ │ ENGINE│ │ ENGINE│ │ ENGINE   │
   └─────────┘ └────────┘ └────────┘ └───────┘ └───────┘ └──────────┘
        │           │         │         │         │           │
        └───────────┴─────────┼─────────┴─────────┴───────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
       ┌────▼────────┐ ┌─────▼──────┐ ┌────────▼─────┐
       │   WALLET    │ │ COMPLIANCE │ │ NOTIFICATION │
       │  SERVICE    │ │  SERVICE   │ │   SERVICE    │
       │  + Capping  │ │ KYC + AML  │ │  + Audit     │
       └─────────────┘ └────────────┘ └──────────────┘
                              │
                ┌─────────────▼──────────────┐
                │   DATA LAYER (sharded)     │
                │ Mongo + Postgres + Redis   │
                └────────────────────────────┘
```

---

## Sources & References

- **Spec:** `ehb-info/departments/Affiliate.md` (v3.3, ~1500 lines)
- **Master plan:** `EHB-MASTER-PLAN.md` (v1.4, §18)
- **Status JSON:** `ehb-status.json` (live launch tracker)
- **Runbook:** `AFFILIATE-V3.2-MVP-RUNBOOK.md`
- **Smoke test:** `scripts/smoke-test-affiliate.js` (20 automated tests)
- **Backup:** `backup/affiliate-v1.0-2026-04-26/` (pre-v3.2 reference)
- **Memory (project context):** `spaces/.../memory/affiliate_v3_locked_rules.md`

---

## What to Send Your Developer

**Minimal package (3 files):**
1. `ehb-info/departments/Affiliate.md` (THE spec)
2. `AFFILIATE-V3.2-MVP-RUNBOOK.md` (how to run)
3. `AFFILIATE-DEVELOPER-HANDOFF.md` (this file)

**Plus repo access:** they need `git clone D:\ehb_2026_3` for code + smoke test.

---

*EHB Technologies (Pvt.) Ltd. · Affiliate Developer Handoff · 2026-04-26 · v3.3 Production*
