# EHB Affiliate v3.2-MVP — Launch-Day Runbook

> **For:** Rafi (Founder/CEO) — Pakistan-first soft launch
> **Spec:** `ehb-info/departments/Affiliate.md` §12 (v3.2)
> **Backend:** ✓ built · **Frontend:** ✓ built · **Smoke test:** ✓ ready
> **Date:** 2026-04-26

This is the exact step-by-step runbook to validate Affiliate v3.2-MVP end-to-end on your local machine before soft-launching in Pakistan.

---

## ✅ Pre-flight Checklist

- [ ] MongoDB running on `localhost:27017`
- [ ] Node.js 20+ installed
- [ ] pnpm installed (`npm install -g pnpm` if missing)
- [ ] You're in `D:\ehb_2026_3` (project root)

---

## STEP 1 — Install dependencies + seed data

```powershell
cd D:\ehb_2026_3
pnpm install
pnpm seed
```

**Expected:** seed completes with messages like `[SEED] Inserted 15 affiliates · 40 commissions · 19+ products · 12 orders ...`

**STL gold-master test (sanity):**

```powershell
pnpm test:stl
```

**Expected:** `Tests: 58 passed, 58 total ✓`

---

## STEP 2 — Start the stack

Open **3 terminals** (or use `.\scripts\start-all.ps1`):

**Terminal 1 — API (Express + Mongoose):**
```powershell
cd services\api
pnpm dev
```
Expected: `🚀 API running on http://localhost:5000`

**Terminal 2 — AI service:**
```powershell
cd services\ai
pnpm dev
```
Expected: `🤖 AI on http://localhost:8080`

**Terminal 3 — Web (Next.js):**
```powershell
cd apps\web
pnpm dev
```
Expected: `▲ Next.js ... Local: http://localhost:3000`

---

## STEP 3 — Run the automated smoke test

In a **4th terminal**:

```powershell
cd D:\ehb_2026_3
node scripts\smoke-test-affiliate.js
```

**Expected output (9 steps, all ✓):**
```
═══════════════════════════════════════════════════
  EHB Affiliate v3.2-MVP — End-to-End Smoke Test
═══════════════════════════════════════════════════
✓ Step 1: API health — affiliate/info returns v3.2-MVP spec
✓ Step 2a: sponsor registered (id ...)
✓ Step 2b: referral registered (id ...)
✓ Step 3a: sponsor joined (refCode ...)
✓ Step 3b: referral joined (linked to sponsor via ...)
✓ Step 4: sponsor.directReferrals = 1 (expected ≥ 1)
ℹ️  Step 5: order simulation requires real product + cart + checkout
✓ Step 6: earnings/breakdown returned all expected keys
✓ Step 7: referral-link generated → http://localhost:3000/register?ref=...
✓ Step 8: tree L1 = 1 member(s); MVP capped at depth 2
✓ Step 9: networkPoolPercent = 5
✓ Step 9: levelRates[1] = 0.03 (L1 = 3%)
✓ Step 9: levelRates[2] = 0.015 (L2 = 1.5%)
✓ Step 9: bonuses.firstSaleUsd = 5
...
🎉 All tests passed! Backend v3.2-MVP is healthy.
```

If any step fails, check the API terminal logs for the error.

---

## STEP 4 — Browser-based UX walkthrough

Open `http://localhost:3000` in your browser.

### 4a. Homepage — promo card

- See the **AffiliateCard** as a hero promo right below the main hero
- Should show: "Earn from your network — share & earn", 10%/5%/3 teaser, "Sign up & join" button
- **PASS criteria:** card visible · CTA goes to `/affiliate`

### 4b. Sign in or register

- `/login` with `dmo.manager@ehb.com` / `ehbDmo2026` (seeded admin) **or** create a new user via `/register`

### 4c. STL dashboard widget

- Navigate to `/stl`
- The **AffiliateCard widget** appears between the STL gauge and the User Journey section
- For not-yet-joined users: shows promo
- For joined users: shows live earnings + share button

### 4d. Main Affiliate page

- Navigate to `/affiliate`
- For not-joined users: see "Join free" form with optional sponsor code
- Click **"Join Affiliate Program — Free"**
- See: referral code, share link with copy, R1 Starter rank chip, KPIs (all 0 initially), 5-column earnings breakdown (Direct / L2 / First Sale / STL / Fast Sale), 2-level network tree, recent commissions (empty), Track A 2-layer explainer, 3 MVP bonus cards, R1–R10 rank ladder (R1 ✓, others 🔒), legal note

**PASS criteria:** Page loads without errors · all sections render · referral code is unique alphanumeric

---

## STEP 5 — Real commission distribution test (manual)

This validates the **end-to-end money flow**. The smoke test stops short here because it needs a real product order.

1. **Create user A (sponsor)**: `/register` with email `a@test.com`
2. Open `/affiliate` → click "Join free" → copy referral code (e.g., `smoke-A1B2`)
3. **Logout** and create **user B (buyer)**: `/register?ref=smoke-A1B2` (use sponsor's code in URL)
4. As B: navigate `/gosellr` → pick a product → add to cart → checkout
5. Complete payment (escrow lock with simulated EHBGC funds)
6. As B: `/orders/[id]` → click **"Confirm delivery"** (this triggers commission distribution)
7. **Verify commission flow:**
   - Logout, login as A
   - Go to `/affiliate`
   - Lifetime $ should now be > 0 (specifically, 3% of product price + $5 First Sale Bonus)
   - "Recent commissions" section shows 2 entries: `direct` + `first_sale`
8. **API verification:**
   ```powershell
   # Login first to get token, then:
   curl -H "Authorization: Bearer <A_TOKEN>" http://localhost:5000/api/affiliate/earnings/breakdown
   ```
   Expected: `{ direct: 3.00, level2: 0, firstSale: 5, stlBonus: 0, fastSaleFreePackages: 0, total: 8.00, ... }` (assuming $100 product)

---

## STEP 6 — Pre-launch verification checklist

Before inviting first 100 real Pakistan users, confirm:

- [ ] Smoke test passes 100% (Step 3)
- [ ] Browser walkthrough shows no console errors (Step 4)
- [ ] Real-order commission flow works (Step 5)
- [ ] STL gold-master 58/58 (Step 1 sanity)
- [ ] No commits to `services/api/src/services/stlService.js` (protected file)
- [ ] `.env` files present + secrets not in git (`git status` clean)
- [ ] Cloudflare CDN configured for `ehb.com` (production)
- [ ] JazzCash + HBL sandbox API keys obtained (for Phase 2 wallet integration)
- [ ] NADRA KYC sandbox account active

---

## STEP 7 — Soft launch (Pakistan invite-only)

Once Steps 1–6 pass:

1. **Pick 10–20 trusted users** from your immediate network (founder team, family, close colleagues)
2. **Generate invite codes** by having them register normally and use their referral chain to invite others
3. **Monitor `/dmo/notifications`** in real-time to see signups + first sales
4. **Daily standup** with team for first 14 days — track:
   - Signup conversion (visit → register)
   - Activation conversion (register → first sale)
   - Commission accuracy (no double-count, no missed payouts)
   - Refund rate (should be < 5% in healthy MVP)

5. **Iterate fast** on UX feedback before opening to wider Pakistan public.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Smoke test "API not reachable" | API not running | Run `cd services\api && pnpm dev` |
| `/api/affiliate/info` returns v1.0 description | Old build cached | Restart API; hard-refresh browser |
| Affiliate page shows "STL too low" | New user has STL L0 | Have user complete PSS verification at `/pss` |
| Referral chain not linking | Sponsor code wrong | Copy exactly — case-sensitive |
| Commission not crediting after order | Order not confirmed | Click "Confirm delivery" on order page |
| 58 STL tests fail | `stlService.js` was modified | Revert: `git checkout services/api/src/services/stlService.js` |

---

## Files modified in v3.2-MVP build

**Backend:**
- `services/api/src/models/Affiliate.js` — v3.2 fields
- `services/api/src/models/AffiliateCommission.js` — v3.2 commission types
- `services/api/src/services/affiliateService.js` — Track A + 3 bonuses
- `services/api/src/routes/affiliate.js` — v3.2 endpoints
- `services/api/src/services/orderService.js` — comment update only

**Frontend:**
- `apps/web/components/ui/affiliate-card.tsx` — NEW reusable card
- `apps/web/app/page.tsx` — homepage promo
- `apps/web/app/stl/page.tsx` — dashboard widget
- `apps/web/app/affiliate/page.tsx` — v3.2 rewrite

**Backup:** `backup/affiliate-v1.0-2026-04-26/` — original v1.0 files preserved

**Spec / docs:**
- `ehb-info/departments/Affiliate.md` — v3.3 (canonical)
- `EHB-MASTER-PLAN.md` — v1.4
- `ehb-status.json` — v3.3 locked rules + launch strategy
- `scripts/smoke-test-affiliate.js` — automated test (this run target)
- `AFFILIATE-V3.2-MVP-RUNBOOK.md` — this file

---

## What's next after MVP soft launch validates

Per `ehb-info/departments/Affiliate.md` §13.6.10 — Phase 2:

1. Wallet Service (Main + Affiliate dual-wallet)
2. USDT TRC20 deposit + withdrawal integration
3. NADRA KYC adapter (Tier 0–2 in MVP, 3+ in Phase 3)
4. JazzCash + HBL bank rails (Pakistan)
5. Capping engine (per-rank daily/monthly limits)
6. Velocity caps middleware (50 signups/IP/24h)
7. Refund clawback flow (90-day window)

Then Phase 3 (Q4 2026): multi-country (UAE/IN/UK/USA) + ERC20/BEP20 + Hot/Cold wallet split + multi-sig.

---

*EHB Technologies (Pvt.) Ltd. · Affiliate v3.2-MVP Runbook · 2026-04-26*
