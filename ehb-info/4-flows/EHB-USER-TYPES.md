# EHB 10 User Types — Full Reference

> **Purpose:** Complete catalog of all 10 user types in EHB — 9 public user roles
> + 1 internal admin role. Each type has its own STL source matrix, minimum
> gates, typical realistic STL, benefits, rules, and primary flows.
>
> **Source:** ehb-info/departments/PSS.md v2.0 + DMO.md v1.4 + Franchise.md v2.0
> **Last Updated:** 2026-04-24 · **Version:** 1.0

---

## AT-A-GLANCE MATRIX

| # | Type | Icon | Pillar | Min PSS | Min STL | Typical STL | Primary sources |
|---|------|------|--------|---------|---------|-------------|-----------------|
| 1 | Buyer | 🛒 | Business | L1 | L1 | L4 | PSS · DMO |
| 2 | Seller | 🏪 | Business | L3 | L4 | L6 | PSS · CRB · DMO |
| 3 | Service Provider | 🛠️ | Any | L4 | L5 | L7 | CRB · PSS · DMO |
| 4 | Rider | 🛵 | Business | L3 | L3 | L5 | PSS · CRB · DMO |
| 5 | Inspector | 🔎 | Any | L4 | L5 | L7 | CRB · PSS · DMO |
| 6 | Franchisee | 🌐 | Business | L5 | L6 | L8 | Franchise · PSS · DMO |
| 7 | Employer | 🧑‍💼 | Business | L2 | L3 | L6 | PSS · DMO |
| 8 | Job Seeker | 📄 | Education | L1 | L1 | L5 | CRB · PSS · DMO |
| 9 | Production Co. | 🏭 | Business | L8 | L8 | L8 | PSS · CRB · DMO |
| 10 | Admin (DMO) | 🏛️ | Internal | L8 | L8 | L9 | PSS · DMO |

---

## 1. 🛒 BUYER

**Tagline:** Purchase with escrow protection

**Role:** Everyday shopper on GoSellr. Anyone who browses, adds to cart, checks out.

**Requirements:**
- Minimum PSS: L1 (email verified)
- Minimum CRB: not required
- Minimum STL: L1 FREE (but L2+ to transact)

**STL source caps:**
- PSS alone: L5
- CRB alone: — (not applicable)
- DMO alone: L10
- Franchise alone: — (not applicable)

**Typical realistic STL:** L4 STANDARD

**What they can do at each STL tier:**
- **L2+** Place orders with escrow protection
- **L3+** File complaints (max 3/month)
- **L4+** Post verified reviews with STL-tier badge
- **L5+** Access premium sellers + priority customer support
- **L6+** Exclusive drops + higher refund SLA
- **L7+** Ambassador status — earn from referrals

**Rules:**
- PSS L1+ mandatory to purchase
- CRB not required (no listings)
- 3+ complaints in 3 weeks = STL −2
- Rating < 3 from sellers blocks promotion to next level
- Can file complaints but penalties apply for false reports

**Earnings structure:**
- Not earning directly (unless also Affiliate)
- Review rewards: +3 DMO points per 5-star order
- Ambassador tier (L7+) unlocks affiliate referral % increase

**Primary pages:**
- `/gosellr` — browse marketplace
- `/cart` → `/checkout`
- `/orders` — track orders
- `/complaints/file` — dispute resolution

**Downgrade triggers:**
- 30-day inactivity (→ −1 level per month)
- 3+ upheld complaints in 3 weeks (→ STL −2)
- Fraud flag (→ L1 FREE freeze)

---

## 2. 🏪 SELLER

**Tagline:** List products, earn 70% commission

**Role:** GoSellr merchant. Lists products, fulfills orders, earns per sale.

**Requirements:**
- Minimum PSS: L3 (identity verified)
- Minimum CRB: L0 basic goods; L4+ for regulated categories (medical, legal, food)
- Minimum STL: L4 STANDARD (hard gate to list products)

**STL source caps:**
- PSS alone: L5
- CRB alone: L9
- DMO alone: L10
- Franchise alone: L8 (if they also own a franchise)

**Typical realistic STL:** L6 HIGH

**What they can do at each STL tier:**
- **L4+** List up to 10 products
- **L5+** Unlimited basic listings + access to AI Business Advisor
- **L6+** 50+ listings, multi-service, mentor junior sellers
- **L7+** 100+ listings, reduced 1.25% fee (vs 2%), franchise eligible
- **L8+** 200+ listings, team accounts, 1% fee
- **L9+** 500+ listings, zero fees on select categories

**Rules:**
- PSS L3+ to list, L4+ for service listings
- CRB required for regulated categories (medical, legal, food, pharmacy)
- Low on-time delivery (<80%) blocks promotion
- Fraud flag = immediate L1 FREE freeze
- Listing cap increases with STL

**Earnings structure:**
- **70% of order value** lands in wallet on confirmed delivery
- Auto-deducted: 2% platform fee (split 40/25/20/15)
- Bonus: streak (30-day no-complaints) = +5 DMO
- Penalty: late delivery = −3, complaint = −5, fraud = −20

**Primary pages:**
- `/gosellr/sell` — dashboard (earnings, orders, listings)
- `/gosellr/sell/new` — list new product
- `/orders` — incoming orders + mark ready
- `/dmo/stl` — track own STL trajectory

**Downgrade triggers:**
- 3 upheld complaints in 3 weeks → STL −2
- Fraud category complaint → immediate L1 freeze
- Missed CRB refill (if applicable) → upgrade blocked
- Rating < 3.5 → blocks promotion

---

## 3. 🛠️ SERVICE PROVIDER

**Tagline:** Deliver services (OLS, WMS, HPS, etc.)

**Role:** Lawyer, doctor, teacher, consultant, developer — anyone selling their
expertise/time rather than physical goods.

**Requirements:**
- Minimum PSS: L4 (identity + address verified)
- Minimum CRB: L5 (professional certification mandatory)
- Minimum STL: L5 ADVANCED

**STL source caps:**
- PSS alone: L5
- CRB alone: L9 (most relevant — proves skill)
- DMO alone: L10
- Franchise alone: L8

**Typical realistic STL:** L7 PRO

**What they can do at each STL tier:**
- **L5+** Full service listing + access to AI Lawyer/Diagnosis/Tutor
- **L6+** Featured in search + reduced case/session fees
- **L7+** Priority client matching + AI consult credits
- **L8+** Expert tier — premium rate card unlocked
- **L9+** Thought-leader status, speaking engagements, industry governance

**Rules:**
- CRB professional exam required (bar association, medical council, teaching license, stack cert)
- 6-month CRB refill mandatory — missed = demotion watch
- Malpractice complaint at T5+ = STL −2 + platform review
- Sector regulator flag (bar/medical board) = platform suspension
- Must maintain practice insurance (stub for Phase 1, enforced Phase 3)

**Earnings structure:**
- Hourly / per-session / per-project fees (provider sets)
- Platform 2% cut → split
- L7+ gets 1.25% fee tier, L9+ gets 0% on select categories
- AI consultations: earn from AI Lawyer/Diagnosis usage on their panel

**Primary pages:**
- `/industries/wms` (medical), `/industries/ols` (legal), `/industries/hps` (education)
- `/crb/exams` — take/renew certifications
- `/dmo/stl` — track composite STL
- Service dashboard (per industry)

**Downgrade triggers:**
- CRB refill missed
- Patient/client T5+ complaint upheld
- Regulator sanction (external)
- Malpractice insurance lapsed

---

## 4. 🛵 RIDER

**Tagline:** Last-mile delivery — earn 10% per order

**Role:** Motorbike / car / van delivery partner for GoSellr orders.

**Requirements:**
- Minimum PSS: L3 (identity + address)
- Minimum CRB: L2 (vehicle inspection + safety cert)
- Minimum STL: L3 NORMAL

**STL source caps:**
- PSS alone: L5
- CRB alone: L8
- DMO alone: L10
- Franchise alone: — (not applicable)

**Typical realistic STL:** L5 ADVANCED

**What they can do at each STL tier:**
- **L3+** Eligible for delivery assignments
- **L4+** Priority in same-zone queue
- **L5+** Bonus $2/delivery for consistency (≥ 4.5 rating)
- **L6+** Senior rider — mentor new riders, earn referral bonus
- **L7+** Team lead eligibility (5+ rider team under them)
- **L8+** Regional rider supervisor role + governance voice

**Rules:**
- PSS L3+ + vehicle CRB verification (photo, plate, license)
- Rating < 4.0 blocks promotion
- Late deliveries > 15% per month = warning
- No-show 3× per month = suspension
- Must accept ≥ 80% of assigned orders (can set "online/offline" toggle)

**Earnings structure:**
- **10% of order value** per completed delivery
- Tips from buyer (100% to rider)
- Streak bonus: +5 DMO for 30 on-time deliveries
- Daily cap scales with STL (L5: $50/day, L7: $200/day, L10: unlimited)

**Assignment algorithm:**
Score = rating × 2 + STL × 1.5 − activeOrders × 0.5 + (sameZone ? 5 : 0)
Highest score wins the next order in zone.

**Primary pages:**
- `/rider` — apply + availability toggle + earnings
- Mobile-friendly delivery tracking (Phase 3: native app)
- `/dmo/stl` — performance metrics

**Downgrade triggers:**
- Rating drops below 4.0
- 3+ no-shows per month
- Vehicle inspection expired
- Complaint about reckless/unsafe driving

---

## 5. 🔎 INSPECTOR

**Tagline:** CRB physical audits + site verification

**Role:** Field auditor for CRB. Visits premises, verifies claims, submits
on-chain reports. Trust-sensitive role — cannot delegate.

**Requirements:**
- Minimum PSS: L4 (background check + address)
- Minimum CRB: L5 (inspector exam passed)
- Minimum STL: L5 ADVANCED

**STL source caps:**
- PSS alone: L5
- CRB alone: L9
- DMO alone: L10
- Franchise alone: — (not applicable)

**Typical realistic STL:** L7 PRO

**What they can do at each STL tier:**
- **L5+** Eligible for field inspection assignments
- **L6+** Base 20,000 PKR/month + 300–800 PKR per inspection + STL bonus
- **L7+** Premium audit tier (larger premises, higher-value CRB)
- **L8+** Regional inspector supervisor
- **L9+** Appeal arbitration panel member (can overturn decisions)

**Rules:**
- PSS L4+ mandatory (criminal background check)
- CRB inspector exam required (annual refresh)
- False report = L1 FREE freeze + legal action
- Bribery flag = permanent ban (no appeal)
- Cannot inspect own family/business connections
- Random audit: 10% of reports re-checked by senior inspector

**Earnings structure:**
- Base monthly salary (seniority × STL)
- Per-inspection fee (300–800 PKR depending on type)
- Travel expenses reimbursed
- No earnings cap — but rate controlled by assignment quota

**Primary pages:**
- `/dmo/crb` (inspector assignments queue)
- Field inspection form (GPS-tagged photo + checklist)
- `/dmo/stl` — audit quality metrics

**Downgrade triggers:**
- False report detected in random audit
- Bribery allegation upheld
- Professional misconduct (external board)
- PSS verification lapsed

---

## 6. 🌐 FRANCHISEE

**Tagline:** Own a territory or online franchise

**Role:** Territorial operator in EHB's franchise network. Manages a zone,
onboards sellers + riders, earns from their activity via revenue split.

**Requirements:**
- Minimum PSS: L5 (full identity + business registration)
- Minimum CRB: L0 (not strictly required)
- Minimum STL: L6 HIGH (for physical Sub L1–L3); L7 PRO+ for higher tiers

**STL source caps:**
- PSS alone: L5
- CRB alone: L9
- DMO alone: L10
- **Franchise alone: L8 VIP** ← unique source boost for this type

**Typical realistic STL:** L8 VIP

**Franchise sub-types:**
- **Physical Sub L1–L10**: $5K–$50K, territory-based, cap 25/Master
- **Online OF1–OF4**: $100–$1,500, no territory, unlimited
- **Master Franchise**: $10K–$50K, city-level, cap 25/Corporate
- **Corporate Franchise**: $50K–$150K, region-level
- **Country Franchise**: $100K–$500K+, national rights

**What they can do at each STL tier:**
- **L6+** Sub franchise L1–L3 eligible ($5K–$12K tiers)
- **L7+** Sub L4–L10 + Master Franchise application
- **L8+** Corporate Franchise + regional policy authority
- **L9+** Country Franchise (entire country rights)
- **L10+** Founder-level policy voice, regional override

**Rules:**
- PSS L5+ to activate (after payment)
- EHBGC lock required = USD paid (1:1 ratio)
- KPI red zone = termination warning
- Sub cap: 25 subs per Master, 25 masters per Corporate, 25 corporates per Country
- 3 warnings → franchise terminated → 80% refund, 20% penalty
- Annual renewal at 80% of current level price

**Earnings structure:**
- **2% platform cut per order** in zone, split 40/25/20/15
  - Franchisee's cut depends on tier (Sub 25%, Master 20%, Corporate 15%, Country 10%+)
- Daily commission caps per tier (Sub L1 $200/day → L10 unlimited)
- Online OF1–OF4 direct commission 3–6%
- Onboarding bonus: +50 EHBGC per verified new seller/rider

**Serial format:** `EHB-[CountryCode]-R[Round]-P[Phase]-L[Level]-[NNN]`  
Example: `EHB-PK-R1-P1-L3-045`

**Primary pages:**
- `/franchise` — tier selection
- `/franchise/apply` — 4-step application
- `/franchise/my` — franchisee dashboard
- `/franchise/calculator` — ROI projection
- `/franchise/case-studies` — success stories

**Downgrade triggers:**
- KPI red zone (< 60% of expected volume for 2 months)
- Sub-franchise revolt (majority of subs complain)
- Compliance violation (regulator)
- Failed annual renewal payment (15-day grace then terminate)

---

## 7. 🧑‍💼 EMPLOYER

**Tagline:** Hire through JPS — post jobs, manage contracts

**Role:** Companies and SMEs posting jobs. Higher STL attracts better candidates.

**Requirements:**
- Minimum PSS: L2 (email + phone)
- Minimum CRB: L0 (not required; optional KYB for premium tiers)
- Minimum STL: L3 NORMAL

**STL source caps:**
- PSS alone: L5
- CRB alone: L9 (if they take business KYB exams)
- DMO alone: L10
- Franchise alone: L8 (if company owns franchise)

**Typical realistic STL:** L6 HIGH

**What they can do at each STL tier:**
- **L3+** Post basic jobs (max 3 active)
- **L4+** Unlimited job posts + candidate messaging
- **L5+** AI Resume Builder credits for candidates
- **L6+** Promoted listings + priority shortlisting + AI matching
- **L7+** Bulk hiring discounts (10+ positions)
- **L8+** Employer of the Year eligibility + featured company page

**Rules:**
- PSS L2+ for basic posting, L3+ recommended
- Salary delay > 30 days = STL −1 + warning
- Contract violation = STL −2 + platform review
- Fake job posting = L1 FREE freeze + legal action
- Must honor contract terms (early termination = penalty)

**Earnings structure:**
- Not earning directly — pays platform for premium services
- Bulk hiring discount at L7+ (10% off platform fees)
- Referral credits for candidates they bring

**Primary pages:**
- `/jobs/post` — post new job
- `/jobs/mine` — manage postings
- Applications review dashboard

**Downgrade triggers:**
- Salary delay > 30 days
- Contract violation complaint upheld
- Fake job posting detected
- Interview no-show pattern (≥ 3 candidates ghosted)

---

## 8. 📄 JOB SEEKER

**Tagline:** Apply through JPS — AI resume, skill verification

**Role:** Candidates on JPS. CRB exams validate skills, PSS validates identity,
DMO tracks interview attendance + contract honor.

**Requirements:**
- Minimum PSS: L1 (email)
- Minimum CRB: L0 (optional but boosts visibility)
- Minimum STL: L1 FREE (but L3+ for priority shortlisting)

**STL source caps:**
- PSS alone: L5
- CRB alone: L9 (skill certifications)
- DMO alone: L10
- Franchise alone: — (not applicable)

**Typical realistic STL:** L5 ADVANCED

**What they can do at each STL tier:**
- **L1+** Browse jobs, limited apply (3 per week)
- **L3+** AI Resume Builder free access (3 generations/day)
- **L5+** Priority shortlisting + verified badge on profile
- **L6+** Auto-match for suitable jobs (push notifications)
- **L7+** Premium job access (L7+ salary tier, $3,000+ roles)
- **L8+** Invitation-only executive roles

**Rules:**
- PSS L1 can browse, L3+ for priority in search
- CRB exam pass = shown first to employers in that skill
- No-show interview 3× = STL −1
- Early contract termination penalty: STL −2 + contract breach fee
- Multiple simultaneous job offers allowed, but declining > 5 = watch

**Earnings structure:**
- Salary / fee / hourly per contract
- Wallet-first policy — salary lands in EHB wallet, then withdraw
- Freelancer per-task commission (platform takes 2%)
- Bonuses from employer for 5-star performance

**Primary pages:**
- `/jobs` — browse
- `/jobs/[id]` — apply with STL match indicator
- `/ai-marketplace/resume` — generate tailored CV
- `/profile/jps` — career profile
- `/crb/exams` — skill certifications

**Downgrade triggers:**
- 3+ interview no-shows
- Contract breach (early termination without cause)
- Employer complaint upheld (harassment, misconduct)
- Fake credentials detected

---

## 9. 🏭 PRODUCTION COMPANY

**Tagline:** Manufacture / wholesale at scale

**Role:** Bulk supplier / manufacturer. Different from individual seller because
MIN-chain applies across multiple entities (company + factory + owner + product).

**Requirements:**
- Minimum PSS: L8 (full KYB — directors, address, NTN, SECP)
- Minimum CRB: L7 (factory inspection + quality cert)
- Minimum STL: L8 VIP

**STL source caps:**
- PSS alone: L5 (owner)
- CRB alone: L9 (factory + product certs)
- DMO alone: L10
- Franchise alone: L8

**Typical realistic STL:** L8 VIP

**What they can do at each STL tier:**
- **L8+** Bulk supplier listing (AGTS, MFS, FBS industries)
- **L9+** Featured in B2B wholesale marketplace
- **L10+** Preferred manufacturer (platform-wide recommendation)

**Rules:**
- KYB verification mandatory (PSS L8+ for owner + NTN + SECP)
- Factory inspection by CRB inspector (annual)
- Product recall = STL −3 + platform review
- Quality failure rate > 2% = suspension pending inspection
- Must maintain compliance certs (ISO, FDA, sector-specific)
- Export linkage requires country-specific customs verification

**Earnings structure:**
- Wholesale orders (high volume, lower margin)
- Platform fee reduced to 1.5% at L9+ (vs standard 2%)
- Export-linked orders: additional 0.5% incentive
- Quality bonus: 30-day zero-complaint streak = +10 DMO

**Primary pages:**
- `/industries/agts`, `/industries/mfs`, `/industries/fbs` (B2B wholesale)
- Factory dashboard
- CRB inspection report viewer
- Export linkage panel

**Downgrade triggers:**
- Product recall
- Quality failure > 2%
- Regulatory violation (FBR, FDA, sector)
- Worker-rights complaint (labor authorities)
- Director KYB expired

---

## 10. 🏛️ ADMIN (DMO — INTERNAL)

**Tagline:** Internal EHB governance staff — NOT a public user type

**Role:** DMO employees who operate the platform's governance layer.

**Requirements:**
- Minimum PSS: L8 + mandatory 2FA
- Minimum CRB: L0 (not required)
- Minimum STL: L8 VIP

**STL source caps:**
- PSS alone: L5
- CRB alone: L9
- DMO alone: L10
- Franchise alone: L8

**Typical realistic STL:** L9 ELITE

**Sub-roles (7 internal ranks):**

| Code | Role | Function |
|------|------|----------|
| `SUPER_ADMIN` | EHB Board | Full platform access, final policy |
| `DMO_DIRECTOR` | DMO Director | Heads DMO, reports to board |
| `DMO_MANAGER` | DMO Manager | Per-module ownership (PSS, CRB, STL, Wallet, Complaint, Franchise, JPS) |
| `DMO_ANALYST` | DMO Analyst | Data monitoring + reports |
| `DMO_SUPPORT` | DMO Support | Complaint handling tier 1–3 |
| `DMO_INSPECTOR` | DMO Inspector | CRB / PSS audit oversight |
| `AI_SYSTEM` | Automated agent | Auto-scoring, routing (no human) |

**What they can do:**
- Full DMO dashboard access (19 modules)
- Approve/reject franchise applications
- Resolve complaints (T5+ only for DMO_MANAGER, T6 fraud for DMO_DIRECTOR)
- Manual STL adjustments (L10 override only for SUPER_ADMIN)
- Policy override within jurisdiction
- Approve large transfers (> 10K EHBGC)
- Run MIN-chain validation + audit log
- Feature flag control
- User ban/freeze authority

**Rules:**
- PSS L8+ + 2FA mandatory (no exception)
- Background check required
- All actions logged to immutable audit trail (ActivityLog model)
- Cannot hold customer-facing user role simultaneously (no double-identity)
- Board review every 6 months
- Cannot approve own-submitted requests (conflict of interest)
- Bribery flag = permanent ban + legal action

**Earnings structure:**
- Salary (not STL-tied — internal HR)
- No earning from platform transactions
- Performance bonuses based on SLA adherence + user feedback
- AI_SYSTEM has no salary (automated)

**Primary pages:**
- `/dmo/*` (all 19 modules)
- Audit log, feature flags, phase admin
- Cannot access public user features (separated session)

**Downgrade triggers (termination, not demotion):**
- Bribery, conflict of interest
- Misuse of override authority
- Audit trail tampering
- External legal action

---

## STL SOURCE MATRIX — QUICK REFERENCE

How much STL each type can earn from each source (alone):

```
                   PSS   CRB   DMO  Franchise   Typical
Buyer              L5    —     L10     —          L4
Seller             L5    L9    L10     L8         L6
Service Provider   L5    L9    L10     L8         L7
Rider              L5    L8    L10     —          L5
Inspector          L5    L9    L10     —          L7
Franchisee         L5    L9    L10     L8         L8  ← franchise boost
Employer           L5    L9    L10     L8         L6
Job Seeker         L5    L9    L10     —          L5
Production Co.     L5    L9    L10     L8         L8
Admin (DMO)        L5    L9    L10     L8         L9
```

**Source caps (immutable):**
- PSS alone can only reach **L5 ADVANCED**
- Franchise alone can only reach **L8 VIP**
- CRB alone can only reach **L9 ELITE**
- **L10 SUPREME only via DMO board approval** (founder-only path)

---

## MULTI-ENTITY STL (PER USER)

A single user can have **multiple entity STLs** attached to them:

```
👤 Personal STL     — their composite PSS + CRB + DMO (always active)
🏪 Seller STL       — if they list products
🛠️ Service STL      — if they offer services
📦 Product STL      — per-product (avg across their listings)
🏭 Production Co.   — if they own a factory/wholesale
🏢 Company STL      — if they own a business entity
🌐 Franchise STL    — if they own a franchise territory
```

**MIN-chain rule:** When any product is displayed, the shown STL =
`MIN(productSTL, sellerSTL, companySTL, ownerSTL)`. Weakest link caps the chain.

Example: Ahmed Raza (Seller, Personal L7)
- Personal STL: L7
- Seller STL: L6 (his seller-specific metrics)
- Product STL (avg): L5 (averaged across his 100 listings)
- → Any product he lists displays as **MIN(Product L5, Seller L6, Company L8, Owner L7) = L5**

---

## USER TYPE → PAGES CHEATSHEET

| Type | Key pages | Main dashboard |
|------|-----------|----------------|
| Buyer | `/gosellr` · `/cart` · `/orders` · `/complaints/file` | `/orders` |
| Seller | `/gosellr/sell` · `/gosellr/sell/new` · `/crb/exams` | `/gosellr/sell` |
| Service Provider | `/industries/[wms/ols/hps]` · `/crb/exams` | industry-specific |
| Rider | `/rider` · mobile delivery tracker | `/rider` |
| Inspector | `/dmo/crb` (assignments) | `/dmo/crb` |
| Franchisee | `/franchise/my` · `/franchise/calculator` · `/franchise/case-studies` | `/franchise/my` |
| Employer | `/jobs/post` · `/jobs/mine` | `/jobs/mine` |
| Job Seeker | `/jobs` · `/ai-marketplace/resume` · `/profile/jps` | `/profile/jps` |
| Production Co. | `/industries/agts` · `/industries/mfs` · `/industries/fbs` | B2B wholesale dashboard |
| Admin (DMO) | `/dmo/*` all 19 modules | `/dmo` |

---

## KEY DIFFERENCES — WHY 10 TYPES, NOT ONE "USER"

EHB separates types because each has:
1. **Different STL source matrices** (where trust comes from)
2. **Different minimum gates** (who can even operate as this type)
3. **Different earning rules** (70%/10%/commission/salary)
4. **Different penalty sensitivities** (fraud for seller = instant freeze;
   for buyer = warning)
5. **Different CRB requirements** (doctor needs medical license; buyer needs nothing)
6. **Different primary pages** and flows
7. **Different governance review frequency** (admin every 6 months; buyer only on complaint)

A single "User" model can't capture these distinctions cleanly. That's why
the database has a `role` field AND user-type selectors let operators "view
as" different types to understand their perspective.

---

## IMPLEMENTATION REFERENCE

Code: `apps/web/lib/stl/user-types.ts`  
Backend: `services/api/src/models/User.js` (role enum covers all 10)  
DMO view: `/dmo/stl` with UserTypeSelector component  
User dashboard: `/stl` (auto-adapts to logged-in user's role)

---

*EHB Technologies (Pvt.) Ltd. — User Types Reference v1.0 — 2026-04-24*
