# Step 6 — First Revenue Plan

> **Goal:** PKR 500K (~$1.8K) total revenue in Month 1 post-launch
> **Path:** Focus on 3 industries (GSM + HPS + OLS) — already coded

## Revenue Streams Active in Month 1

### 1. Transaction Fee — 5% on all platform orders
- Auto-extracted via 70/10/10/10 split (the EHB share)
- Already wired in `commissionService.js`
- Target: PKR 200K from 100 orders × PKR 4K avg

### 2. STL Boost — Paid temporary upgrade
- L4 boost (30 days): $50 = PKR 14K
- L5 boost (30 days): $150 = PKR 42K
- Already coded in `monetizationService.js`
- Target: PKR 100K from 20 boost purchases

### 3. AI Marketplace Calls — Pay-per-use
- Free: 3 calls/day
- Paid: $0.20/call after free quota
- Target: PKR 30K from 100 power users

### 4. Sponsored Listings (Top of search)
- $10 CPM on top placement
- Target: PKR 50K from 5 sponsors

### 5. Withdrawal Fee — 1% on payouts
- Auto-deducted on every withdrawal
- Target: PKR 50K from sellers cashing out

**Month 1 revenue target: ~PKR 430K (~$1.6K)**

## Revenue Tracker Dashboard

Already scaffolded in `infra/monitoring/grafana/payments.json`. Track:
- Daily GMV (gross merchandise value)
- Daily EHB revenue (5% take-rate)
- Per-industry breakdown
- Top sellers / buyers
- Refund rate

## Top 3 Industries to Push (Month 1)

### **GSM (GoSellr) — Marketplace**
- Easiest activation (any buyer/seller can start)
- High order volume
- Low STL requirement (L1)
- Marketing: "Verified marketplace — 70% to seller, escrow protected"

### **HPS (Skills/Education)**
- Course sales = high margin
- Low fulfilment cost (digital)
- Marketing: "Earn certifications that count — STL-tied"

### **OLS (Legal Services)**
- High AOV (avg order value $50-500)
- Limited supply (lawyers) → high fees
- Marketing: "Verified lawyers, escrow-protected consultations"

## First-Sale Incentives

| Audience | Incentive |
|----------|-----------|
| First 100 sellers | 0% transaction fee for 30 days |
| First 100 buyers | $5 platform credit |
| Refer a seller → bring buyer | $10 each |
| First sale milestone | STL +0.5 boost |

## Revenue Recognition

- Transaction fee: at order settlement (post-cooling)
- STL boost: at purchase (no refund unless system fault)
- Sponsored listings: weekly invoice (NET-7)
- Withdrawal fee: at withdrawal request

## Tax Handling (PK)

- GST 13-17% per province (depends)
- Sales tax registration when revenue > PKR 10M annual
- Withholding tax 1-2% on services (varies)
- Use a CA from Day 1 — costs PKR 15-25K/month, saves headaches

## Founder's Revenue Anti-patterns to Avoid

- ❌ Don't give free service forever
- ❌ Don't compete on price-only with cash-rich incumbents
- ❌ Don't ignore unit economics (revenue minus all costs)
- ❌ Don't take payments to founder's personal bank — use company account

## Linked
- `services/api/src/services/monetizationService.js`
- `services/api/src/services/commissionService.js`
- `infra/monitoring/grafana/payments.json`
- `01-LEGAL-ENTITY-PK.md`
- `02-PAYMENT-PARTNERS.md`
