# EHB Departments Map

**Status:** Reference guide (v1.0) · 2026-04-15  
**Purpose:** Master directory of all 13 EHB departments, their roles, dependencies, and DMO integration points

---

## The 13 Departments

### 1. PSS — Personal Security System

| Attribute | Value |
|-----------|-------|
| **Code** | PSS |
| **Purpose** | Real-time identity + behavioral verification (KYC, liveness, AML, transaction monitoring) |
| **Owner** | Security & Compliance team |
| **DMO Interaction** | PSS queue operator panel (`/dmo/pss/queue`), fraud review (`/dmo/pss/fraud`), risk scoring (`/dmo/pss/risk`) |
| **Data In** | User identity documents, liveness video, transaction patterns, device fingerprints |
| **Data Out** | PSS score (0–100) → STL input, risk flags, KYC status (verified/pending/rejected) |
| **Dependencies** | Polkadot (on-chain KYC anchors), NADRA (Pakistan ID cross-check), OFAC/UN sanctions lists |
| **STL Contribution** | 0–40 points (max source cap L5 ADVANCED) |
| **Key APIs** | `POST /pss/submit`, `GET /pss/status/:id`, `POST /pss/verify-identity` |
| **Master Spec** | `ehb-info/departments/PSS.md` v2.0 (27 features, 6 roles) |

---

### 2. CRB — Central Record Blockchain

| Attribute | Value |
|-----------|-------|
| **Code** | CRB |
| **Purpose** | Verify professional credentials (exams, licenses, certifications) + audit refill adherence |
| **Owner** | Governance & Compliance team |
| **DMO Interaction** | CRB review panel (`/dmo/pss/crb`), case override (`/dmo/pss/crb/[id]`), on-chain hash push |
| **Data In** | Exam results, license scans, renewal documents, activity logs |
| **Data Out** | CRB verification status, refill cadence compliance, on-chain certificate hash (Polkadot) |
| **Dependencies** | Professional boards (bar associations, medical councils), Polkadot for certificate hashing |
| **STL Contribution** | Varies by exam pass/refill adherence (source cap L9 ELITE) |
| **Key APIs** | `POST /crb/submit-exam`, `GET /crb/refill-status/:userId`, `POST /crb/push-on-chain` |
| **Master Spec** | `ehb-info/departments/CRB.md` v1.0 |

---

### 3. STL — Service Trust Level

| Attribute | Value |
|-----------|-------|
| **Code** | STL |
| **Purpose** | Core ranking algorithm: composite 0–100 score → 10-level ladder (L1 FREE → L10 SUPREME) |
| **Owner** | Product & Engineering team |
| **DMO Interaction** | STL dashboard (`/dmo/stl`), manual adjustments panel (L10 only) |
| **Data In** | PSS score, CRB status, DMO activity, wallet lock state, complaint count |
| **Data Out** | STL level (L1–L10), STL score (0–100), effect flags (visibility, fees, earnings cap) |
| **Dependencies** | All other departments (MIN-chain rule) |
| **Composition** | `STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)` + weighted inputs |
| **Protected** | 58 gold-master regression tests — immutable without test suite regeneration |
| **Key APIs** | `GET /stl/score/:entityId`, `POST /stl/validate-product`, `GET /stl/effects/:level` |
| **Master Spec** | `ehb-info/departments/STL.md` v1.0 (10 levels, MIN-chain, upgrade conditions) |

---

### 4. DMO — Decentralized Management Office

| Attribute | Value |
|-----------|-------|
| **Code** | DMO |
| **Purpose** | 7-role governance structure for policy, approvals, escalations, fraud investigation |
| **Owner** | Executive & Legal team |
| **DMO Interaction** | Self-governing (all panels report to DMO) — 8-step user flow, L8 approval gates |
| **Org Chart** | Founder → Regional Manager → Franchise Manager → Case Operator, Reviewer, Investigator, Admin |
| **Data In** | Escalations, manual case reviews, policy decisions, complaint investigations |
| **Data Out** | Policy rules, approval decisions, L10 founder-only approvals, incident reports |
| **Jurisdiction** | All 16 industries, all 4 franchise tiers |
| **Key Decision Gates** | L8 VIP approval, L9 ELITE invitation, L10 SUPREME manual sign-off |
| **Key APIs** | `GET /dmo/queue`, `POST /dmo/route-case`, `POST /dmo/approve-l10`, `POST /dmo/policy-update` |
| **Master Spec** | `ehb-info/departments/DMO.md` v1.2 (7 roles, 8-step flow, policy engine §3.2) |

---

### 5. Wallet — EHB Coin & Escrow

| Attribute | Value |
|-----------|-------|
| **Code** | Wallet |
| **Purpose** | EHBGC (EHB coin) minting, transfers, escrow (buyer protection), lockup for STL requirements |
| **Owner** | Finance & Blockchain team |
| **DMO Interaction** | Wallet panel (`/dmo/wallet`), large transfer approvals (>10K EHBGC) |
| **Data In** | User earnings, buyer deposits, seller payouts, coin lock requests |
| **Data Out** | Wallet balance, locked coin state, escrow status, payout records |
| **Dependencies** | Blockchain (Polkadot), STL (minimum lock per level) |
| **Lock Tiers** | L1=0, L2=1K, L3=5K, L4=10K, L5=25K, L6=50K, L7=75K, L8=100K, L9=150K, L10=250K EHBGC |
| **Key APIs** | `POST /wallet/transfer`, `POST /wallet/escrow-lock`, `GET /wallet/balance/:userId`, `POST /wallet/payout` |
| **Master Spec** | `ehb-info/departments/Wallet.md` (lock tiers, escrow mechanics) |

---

### 6. Franchise — Multi-Tier Hierarchy

| Attribute | Value |
|-----------|-------|
| **Code** | Franchise |
| **Purpose** | 4-tier geographic hierarchy (Online → City → State → Country) for revenue splits & governance |
| **Owner** | Business Development team |
| **DMO Interaction** | Franchise approval panel (`/dmo/franchise`), tier upgrade review, KYB verification |
| **Tiers** | Online (1 user), City (~500K pop), State (~10M pop), Country (national) |
| **Revenue Split** | 40% EHB platform, 25% Country franchisor, 20% State franchisor, 15% City operator |
| **Qualifications** | KYB check, CRB verification, minimum STL (L6+), capital lock |
| **Data In** | Business registration, director info, operational reports, complaint escalations |
| **Data Out** | Franchise tier, revenue reports, sub-franchise approvals, STL enforcement |
| **Dependencies** | PSS (identity), CRB (business verification), Wallet (revenue splits), STL (minimum L6) |
| **Source Cap** | L8 VIP (higher tiers require DMO override) |
| **Key APIs** | `POST /franchise/apply`, `GET /franchise/revenue/:franchiseId`, `POST /franchise/tier-upgrade` |
| **Master Spec** | `ehb-info/departments/Franchise.md` v1.0 (4-tier model, hierarchy) |

---

### 7. JPS — Job Profile & Skill System

| Attribute | Value |
|-----------|-------|
| **Code** | JPS |
| **Purpose** | AI-powered skill matching + job profile verification for recruitment & freelance platforms |
| **Owner** | AI & Product team |
| **DMO Interaction** | JPS review panel (`/dmo/jps`), skill audits, job seeker verification |
| **Data In** | Resume, portfolio, work history, certifications, skill assessments |
| **Data Out** | Skill profile, match score, job recommendations, employer match |
| **Dependencies** | PSS (identity verification), CRB (skill certification), AI engine (matching algorithm) |
| **STL Impact** | Job seeker STL influences employer visibility, commission rates |
| **Key APIs** | `POST /jps/submit-profile`, `POST /jps/assess-skill`, `GET /jps/matches/:userId` |
| **Master Spec** | `ehb-info/departments/JPS.md` (skill taxonomy, matching rules) |

---

### 8. AI — Recommendation & Decision Engine

| Attribute | Value |
|-----------|-------|
| **Code** | AI |
| **Purpose** | OpenAI-powered recommendations (product, lawyer, doctor, job), fraud detection, STL scoring |
| **Owner** | AI & Machine Learning team |
| **DMO Interaction** | AI audit panel (`/dmo/ai/audit`), rule review, model retraining approval |
| **Services** | Recommendation, fraud detection, lawyer matching, tutor assignment, diagnosis helper |
| **Data In** | User behavior, transaction history, search queries, compliance rules |
| **Data Out** | Rankings, fraud flags, match recommendations, confidence scores |
| **Dependencies** | OpenAI API (GPT-4), STL (ranking weights), PSS (compliance data) |
| **Deployment** | `services/ai/` (Node + Express, port 8080) |
| **Key APIs** | `POST /ai/recommend`, `POST /ai/fraud-check`, `POST /ai/match-lawyer` |
| **Master Spec** | `ehb-info/departments/AI.md` (model specs, prompt engineering) |

---

### 9. Blockchain — On-Chain Proofs & Hashing

| Attribute | Value |
|-----------|-------|
| **Code** | Blockchain |
| **Purpose** | Polkadot parachain integration for immutable certificate hashing, STL audit trail, escrow anchors |
| **Owner** | Blockchain & Infrastructure team |
| **DMO Interaction** | Blockchain audit panel (`/dmo/blockchain`), hash verification, dispute resolution |
| **Network** | Polkadot (testnet during Phase-1, mainnet for Phase-3+) |
| **Data Anchored** | CRB certificate hashes, PSS KYC proofs, Wallet escrow transactions, STL deltas |
| **Dependencies** | Polkadot RPC, certificate hasher, audit event emitter |
| **Key APIs** | `POST /blockchain/hash-certificate`, `GET /blockchain/verify/:hash`, `POST /blockchain/audit-trail` |
| **Master Spec** | `ehb-info/departments/Blockchain.md` (parachain config, hash format) |

---

### 10. Affiliate — Multi-Level Referral System

| Attribute | Value |
|-----------|-------|
| **Code** | Affiliate |
| **Purpose** | Track referral chains (buyer → seller → franchise), commission distribution, tier bonuses |
| **Owner** | Growth & Revenue team |
| **DMO Interaction** | Affiliate audit panel (`/dmo/affiliate`), commission dispute review, fraud detection |
| **Tiers** | L1 Referrer, L2 Promoter, L3 Ambassador, L4 Master |
| **Commission** | 5–15% based on referral tier + STL level of referrer |
| **Data In** | Referral codes, signup source, transaction records, dispute reports |
| **Data Out** | Commission accruals, payout records, fraud flags, tier eligibility |
| **Dependencies** | Wallet (commission payouts), STL (eligibility tiers), Franchise (network structure) |
| **Key APIs** | `POST /affiliate/create-code`, `POST /affiliate/track-signup`, `GET /affiliate/commission/:userId` |
| **Master Spec** | `ehb-info/departments/Affiliate.md` (tier structure, commission formula) |

---

### 11. Finance — Revenue Splits, Payouts & Accounting

| Attribute | Value |
|-----------|-------|
| **Code** | Finance |
| **Purpose** | Manage 40/25/20/15 split (EHB/Country/State/City), payouts, tax reporting, audit trail |
| **Owner** | Finance & Accounting team |
| **DMO Interaction** | Finance audit panel (`/dmo/finance`), large payout approvals, tax compliance |
| **Split Formula** | 40% EHB platform, 25% Country franchisor, 20% State franchisor, 15% City operator |
| **Data In** | Transaction volumes, fee calculations, payout requests, regulatory filings |
| **Data Out** | Revenue reports, payout records, tax forms (1099, FBR), settlement statements |
| **Dependencies** | Wallet (funds), Franchise (split targets), STL (fee tier modifiers) |
| **Audit** | Weekly reconciliation, monthly settlement, quarterly tax filing |
| **Key APIs** | `POST /finance/calculate-split`, `GET /finance/revenue-report/:period`, `POST /finance/tax-file` |
| **Master Spec** | `ehb-info/departments/Finance.md` (split logic, tax compliance) |

---

### 12. Legal — Compliance, Contracts & Dispute Resolution

| Attribute | Value |
|-----------|-------|
| **Code** | Legal |
| **Purpose** | Manage contracts, terms enforcement, dispute resolution, regulatory compliance |
| **Owner** | Legal & Risk team |
| **DMO Interaction** | Legal panel (`/dmo/legal`), dispute arbitration, policy updates, risk escalations |
| **Services** | Contract templates, signature verification, dispute SLA tracking, policy amendments |
| **Data In** | Signed contracts, dispute complaints, regulatory changes, incident reports |
| **Data Out** | Contract status, dispute decisions, policy versions, compliance certifications |
| **Dependencies** | PSS (identity verification), Blockchain (contract anchoring), DMO (policy enforcement) |
| **Key APIs** | `POST /legal/draft-contract`, `POST /legal/file-dispute`, `GET /legal/policy/:version` |
| **Master Spec** | `ehb-info/departments/Legal.md` (contract framework, dispute SLA) |

---

### 13. GoSellr — E-Commerce Platform

| Attribute | Value |
|-----------|-------|
| **Code** | GoSellr (or GSM) |
| **Purpose** | Main e-commerce marketplace — product listings, seller storefronts, buyer orders, ratings |
| **Owner** | E-Commerce & Product team |
| **DMO Interaction** | GoSellr moderation panel (`/dmo/gosellr`), seller suspensions, product takes-downs |
| **Data In** | Product listings, seller profiles, buyer orders, ratings & reviews |
| **Data Out** | Marketplace rankings, seller search visibility, earnings reports |
| **Dependencies** | STL (seller visibility & fees), Wallet (escrow), Affiliate (referrals), Franchise (regional tiers) |
| **Key API Routes** | `POST /gosellr/create-product`, `POST /gosellr/place-order`, `POST /gosellr/rate`, `GET /gosellr/search` |
| **Master Spec** | `ehb-info/departments/Industries.md` (GSM industry section) |

---

## Dependency Graph

```
                        STL (core ranking)
                             |
               ______________|______________
              |              |              |
            PSS            CRB           Wallet
           /   \            |              |
      (verify)  (risk)   (certify)    (lock requirement)
         |        |          |              |
        DMO <-----+----------+-----------+---------+
         |        |          |              |       |
    (route)      |          |           Finance   Affiliate
         |        |          |              |       |
    Franchise----+----------+              |       |
         |        |          |              |       |
    GoSellr------+----------+              |       |
         |        |          |              |       |
       JPS------+----------+              |       |
         |        |          |              |       |
       AI-------+----------+              |       |
         |        |          |              |       |
     Blockchain--+----------+              |       |
         |        |          |              |       |
      Legal------+----------+--------------+-------+
```

**Key rules:**
1. **STL is the master** — all departments feed into or consume STL
2. **DMO routes escalations** — from all departments
3. **Blockchain anchors proofs** — CRB certs, PSS KYC, Wallet escrows
4. **Wallet distributes earnings** — via Finance splits to Franchise tiers

---

## How to Add a New Department

1. Create canonical spec in `ehb-info/departments/[DEPT].md`
2. Update this map with a new row in the table above
3. Define data in/out flows
4. Map DMO interaction points
5. Add API routes in `services/api/pss-backend/src/routes/[DEPT]Routes.js`
6. Add UI panels in `apps/web/app/dmo/[dept]/`
7. Run `node scripts/ehb-canonical-sync.mjs`

---

*EHB Technologies (Pvt.) Ltd. — v1.0 · 2026-04-15*
