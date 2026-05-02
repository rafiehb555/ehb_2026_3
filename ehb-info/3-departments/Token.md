# Token — EHB Dual Token System

**Status:** Canonical spec (v1.0) · 2026-04-19 — LOCKED
**Related:** `Wallet.md` · `Commission.md` · `Franchise.md` · `STL.md` · `Blockchain.md`

---

## 1. Purpose

EHB operates a **dual token economy** with two distinct coins serving different roles in the ecosystem. This separation ensures a stable transactional backbone while creating investment/growth opportunities.

**STATUS: LOCKED — Do not modify without founder (Rafi) explicit approval.**

---

## 2. Two Tokens (LOCKED)

### 2.1 EHBGC — Stable Coin (System Backbone)

| Property | Value |
|---|---|
| **Full Name** | EHB Global Coin |
| **Type** | Stable Coin |
| **Value** | 1 EHBGC = 1 USD (FIXED) |
| **Blockchain** | BEP-20 (Phase 2) |
| **Control** | Company controlled (mint/burn system) |
| **Risk** | Low — price fixed |
| **Scope** | Internal + external usable |

**Use Cases:**
- Product buying (marketplace payments)
- Service payments
- Franchise purchase (EHBGC hold requirement)
- STL coin lock requirement
- Salary / earnings payouts
- Affiliate payouts
- DMO fee payments
- Wallet balance
- Escrow system

**Control Mechanisms:**
- Company-controlled mint/burn
- Fully backed reserves (1:1 USD)
- No volatility by design
- Blockchain proof (BEP-20 in Phase 2)

### 2.2 EHBGX — Growth Token (Unstable Coin)

| Property | Value |
|---|---|
| **Full Name** | EHB Growth Exchange Token |
| **Type** | Growth / Unstable Coin |
| **Value** | Market-based (UP/DOWN) |
| **Blockchain** | BEP-20 (Phase 2) |
| **Control** | Limited supply, controlled release |
| **Risk** | Medium-High — price fluctuates |
| **Scope** | Rewards, bonuses, investment |

**Price Behavior:**
- Demand ↑ → Price ↑
- Supply ↑ → Price ↓

**Use Cases:**
- Affiliate bonuses
- Promotional rewards
- STL achievement rewards
- Special campaign incentives
- Early adopter benefits
- Investment growth opportunity

**Security Controls:**
- Limited total supply
- Controlled release schedule
- Anti-dump rules (selling restrictions)
- Lock period requirements

---

## 3. Conversion System

### 3.1 Conversion Rules

| Direction | Allowed | Fee | Conditions |
|---|---|---|---|
| EHBGX → EHBGC | Yes | 5% | Dump control, lock period possible |
| EHBGC → EHBGX | Optional/Limited | 2% | Admin-controlled availability |

### 3.2 Conversion Controls

- **Fee:** Percentage-based (admin configurable)
- **Lock period:** Possible hold before conversion completes
- **Rate:** Market-based for EHBGX, fixed for EHBGC
- **Limits:** Daily/weekly conversion caps (anti-dump protection)

---

## 4. Earning Model Integration

### 4.1 Which Token for What

| Earning Type | Token | Rationale |
|---|---|---|
| Order earnings (seller) | EHBGC | Stable income |
| Franchise commission | EHBGC | Reliable business income |
| Platform fees | EHBGC | Operational revenue |
| Affiliate bonus | EHBGX | Incentive + growth |
| STL achievement reward | EHBGX | Reward for trust growth |
| Promotional campaigns | EHBGX | Marketing incentive |
| Franchise bonus | Mixed | Base in EHBGC, bonus in EHBGX |
| Referral bonus | EHBGX | Growth incentive |

### 4.2 Flow Example

```
User completes order → Earns EHBGC (stable income)
     ↓
System detects high performance → Bonus in EHBGX (growth reward)
     ↓
User holds EHBGX (value may increase)
     ↓
User converts EHBGX → EHBGC when needed (with rules)
```

---

## 5. Franchise Token Requirements (Dual Pricing — LOCKED)

### 5.1 Sub Franchise — USD Entry + EHBGC Hold

| Level | USD Price (Entry) | EHBGC Hold (Required) |
|---|---|---|
| L1 | $5,000 | 5,000 EHBGC |
| L2 | $8,000 | 8,000 EHBGC |
| L3 | $12,000 | 12,000 EHBGC |
| L4 | $16,000 | 16,000 EHBGC |
| L5 | $20,000 | 20,000 EHBGC |
| L6 | $25,000 | 25,000 EHBGC |
| L7 | $30,000 | 30,000 EHBGC |
| L8 | $35,000 | 35,000 EHBGC |
| L9 | $40,000 | 40,000 EHBGC |
| L10 | $50,000 | 50,000+ EHBGC |

**Logic:** USD = entry fee (one-time). EHBGC = system power + eligibility (locked, ongoing).

### 5.2 Online Franchise — USD Entry + Small EHBGC Hold

| Tier | USD Price | EHBGC Hold (Minimum) |
|---|---|---|
| OF1 (Digital Starter) | $100 | 500 EHBGC |
| OF2 (Digital Growth) | $250 | 1,000 EHBGC |
| OF3 (Digital Professional) | $750 | 2,000 EHBGC |
| OF4 (Digital Elite) | $1,500 | 3,000 EHBGC |

**Logic:** Low USD entry + EHBGC hold = loyalty + earning unlock.

### 5.3 Higher Level Franchises

| Level | USD Price Range | EHBGC Hold |
|---|---|---|
| Master Franchise | $10,000 – $50,000 | Equal to USD (1:1) |
| Corporate Franchise | $50,000 – $150,000 | Equal to USD (1:1) |
| Country Franchise | $100,000 – $500,000+ | Equal to USD (1:1) |

### 5.4 Benefits of Dual Pricing

- Reduces crypto dependency for new users (USD entry)
- Creates organic token demand (EHBGC hold requirement)
- Long-term lock = ecosystem stability
- Global investor friendly (familiar USD pricing)

---

## 6. STL Token Lock Requirements

STL levels require EHBGC locks (from STL.md, now confirmed in token context):

| STL Level | EHBGC Lock Required |
|---|---|
| L1 FREE | 0 |
| L2 BASIC | 20 EHBGC |
| L3 NORMAL | 40 EHBGC |
| L4 STANDARD | 100 EHBGC |
| L5 ADVANCED | 200 EHBGC |
| L6 HIGH | 400 EHBGC |
| L7 PRO | 800 EHBGC |
| L8 VIP | 2,000 EHBGC |
| L9 ELITE | 4,000 EHBGC |
| L10 SUPREME | 10,000+ EHBGC |

---

## 7. Admin Dashboard (Token Control)

Admin panel sections for token management:

- **Total Supply** — EHBGC and EHBGX total minted
- **Circulation** — Currently in wallets/market
- **Lock Amounts** — Total locked across all users
- **Conversion Rate** — Current EHBGX market price
- **Burn System** — Tokens removed from circulation
- **Mint Controls** — New token creation (EHBGC only, backed)
- **Anti-Dump Monitor** — Large sell orders flagged
- **Reserve Status** — USD reserves backing EHBGC

---

## 8. Staking System (CONFIRMED)

### 8.1 APY Rates

| User Category | Base APY | With Long Lock (+2%) |
|---|---|---|
| Low STL (L1-L3) | 8-10% | 10-12% |
| Medium STL (L4-L6) | 12% | 14% |
| High STL (L7-L10) | 15-18% | 17-20% |

### 8.2 Lock Periods

| Duration | Bonus |
|---|---|
| 1-3 months | No bonus |
| 6 months | +1% APY |
| 12 months | +2% APY |

### 8.3 Anti-Dump Protection

| Rule | Limit |
|---|---|
| Daily sell limit | 5% of total holding |
| Weekly cap | 20% of total holding |
| New user (first 30 days) | Stricter limits (TBD exact) |
| Large sell order | DMO manual check required |
| Suspicious pattern | Auto-delay or block |

## 9. Exchange Listing Roadmap

| Phase | Platform | Control Level |
|---|---|---|
| Phase 1 | Internal exchange only | Full company control |
| Phase 2 | Limited DEX listing | Partial control |
| Phase 3 | Major exchange (Binance, etc.) | Public market |

## 10. Future Features (Phase 3+)

### 10.1 Governance (DAO)
- EHBGX holders can vote on platform decisions
- Voting weight proportional to holdings
- DAO system for community governance

### 10.2 NFT Integration
- Special achievement NFTs minted as rewards
- NFTs tradeable on marketplace
- Unique badges for top performers

---

## 11. Security & Compliance

### 9.1 EHBGC Security
- Fully backed 1:1 by USD reserves
- Regular audits (quarterly)
- Reserve proof published on blockchain
- No volatility risk

### 9.2 EHBGX Security
- Limited total supply (cap TBD)
- Controlled release schedule
- Anti-dump rules (max sell per day/week)
- Whale detection (large holder monitoring)
- Market manipulation prevention

### 9.3 Compliance
- KYC required for token purchases (PSS verification)
- AML screening on all conversions
- Regional regulatory compliance (per country)
- Transaction monitoring (DMO Up-Guard integration)

---

## 10. Resolved Answers

| # | Question | Answer | Date |
|---|---|---|---|
| 1 | EHBGX total supply | 1 Billion tokens (1,000,000,000) | 2026-04-19 |
| 2 | EHBGX launch price | $0.01 per token | 2026-04-19 |
| 3 | EHBGX → EHBGC conversion fee | 5% fee | 2026-04-19 |
| 4 | EHBGC → EHBGX conversion fee | 2% fee | 2026-04-19 |
| 5 | Staking APY | Base 12% yearly. High STL = up to 18%. Low STL = 8-10%. Long lock (6-12 months) = +2% bonus | 2026-04-19 |
| 6 | Anti-dump daily limit | Daily sell limit = 5% of total holding. Weekly cap = 20%. New users (first 30 days) = stricter. Large sell → DMO check. Suspicious → delay/block | 2026-04-19 |
| 7 | Reserve audit | Quarterly (standard) | 2026-04-19 |
| 8 | EHBGX exchange listing | Phase 1: Internal exchange only. Phase 2: Limited external (DEX). Phase 3: Major exchange listing. Early control = price stability, later = public growth | 2026-04-19 |

## 11. All Questions RESOLVED (LOCKED)

**Status: ALL token questions resolved. System ready for development.**

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-19 | 2.0 | ALL questions resolved. Conversion fees locked (5%/2%). Staking APY locked (8-18%). Anti-dump rules locked. Exchange roadmap confirmed (Internal→DEX→Major). |
| 2026-04-19 | 1.1 | EHBGX supply confirmed: 1B tokens at $0.01 launch price |
| 2026-04-19 | 1.0 | Created dual token system: EHBGC (stable, 1:1 USD) + EHBGX (growth, market-based). Franchise dual pricing model (USD entry + EHBGC hold). Conversion rules, earning integration, admin controls, security, future features (staking, DAO, NFT). LOCKED. |

---

*EHB Technologies (Pvt.) Ltd. · Token Department v1.0 · 2026-04-19 · LOCKED*
