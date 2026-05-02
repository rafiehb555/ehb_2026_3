# EHB Master System — Phase-Wise Structure

**Status:** v1.1 · 2026-04-18  
**Related:** PSS.md v3.0, STL.md v1.1, CRB.md v1.0, JPS.md v1.0, DMO.md v1.4, Wallet.md, Finance.md  
**Scope:** Complete EHB platform architecture organized by implementation phase

---

## Phase 1 — Core Trust Foundation (PSS + CRB + STL)

### PSS (Personal Security System)

**Purpose:** Identity verification backbone of the platform

- **10 levels:** L0 Free → L10 Full Verified
- **Key rules:** 
  - One PSS per user = all public roles
  - PSS is mandatory for all users
  - Low PSS blocks platform growth
- **Downgrade triggers:**
  - Document expiry
  - 3+ complaints within 3 weeks
  - Fraud detection
  - Extended inactivity (>60 days)

### CRB (Central Record Blockchain)

**Purpose:** Quality assurance + physical verification layer

- **10 levels:** L1 Basic docs → L10 Certified
- **Flow:** Apply → Inspector audit → Report → DMO review → STL update
- **Refill cycle:** 6-month renewal mandatory per level

### STL Engine (Composite Score)

**Formula:**
```
PSS_points = (PSS_level / 10) × 40        // 0–40 points
CRB_points = (CRB_level / 10) × 40        // 0–40 points  
DMO_points = (DMO_level / 10) × 40        // 0–40 points

Score = PSS_points + CRB_points + DMO_points  // 0–120 total

Final_STL = MIN(Score / 1.2, lowest_component + 1)  // 0–100, MIN-chain
```

**Entity types:** Personal, Product, Service, Franchise, Production Company  
**Named labels only on EHB-STL:** FREE→SUPREME (L1–L10)

---

## Phase 1.5 — JPS (Job Profile & Skill System)

**Purpose:** Trust-verified career platform with AI job matching, skill verification, and contract management

### Dashboard Sections

| Section | Purpose |
|---------|---------|
| Profile STL | User's personal STL level display + progress |
| Skills & Certifications | CRB-linked skill verification + exam results |
| Job Applications | Apply, track, manage applications |
| Active Jobs | Currently active job assignments |
| Earnings / Salary | Salary tracking, payment history |
| Contracts | Active/expired/renewed contracts |
| Exam System | MCQ, practical, video tests (CRB approved) |
| Inspector Management | Field inspectors for CRB, job verification, work audits |

### Complete Job Flow

```
User Register → PSS Complete → JPS Profile Create → Skill Add → Exam (CRB) → Apply Job → AI Matching → Interview/Selection → Contract Start → Work Tracking → Salary Release
```

### Job Designations (STL + CRB based)

| Designation | Requirements |
|---|---|
| Junior | PSS L3+, basic skills, entry exam |
| Intermediate | PSS L4+, 6+ months experience, intermediate exam |
| Senior | PSS L5+, 1+ year, advanced exam + CRB certification |
| Expert | PSS L7+, 2+ years, expert exam + CRB physical verification |

### Exam System

| Type | Format | Verified By |
|---|---|---|
| MCQ | Multiple choice (timed, AI-proctored) | AI auto-grade |
| Practical | Task-based assessment | CRB inspector review |
| Video Test | Live video demonstration of skill | CRB approve |

### Contract System

| Field | Rule |
|---|---|
| Start Date | Set at hiring |
| End Date | Fixed-term (3/6/12 months) or open-ended |
| Auto Expiry | Contract expires if not renewed 7 days before end |
| Renewal | Both parties must agree; new contract created |
| Termination | Early exit = penalty (STL impact + contract breach fee) |

### User Types in JPS

| Type | Role | PSS Min |
|---|---|---|
| Employer | Posts jobs, hires, manages contracts | L2 (L3 recommended) |
| Job Seeker | Creates profile, applies, takes exams | L1 (L3 recommended for visibility) |
| Inspector | Verifies job sites, audits work | L4 |
| Freelancer | Takes short-term tasks | L3 |

### STL Impact on JPS

- **Low personal STL** → fewer jobs visible (system filters high-tier jobs from low-STL users)
- **High STL** → higher salary tier access (L7+ = premium job access)
- **Company STL** → hiring quality (high STL company attracts better candidates)
- **STL in job ranking** → higher STL job seekers shown first to employers

### Salary & Payment (LOCKED)

**Types:** Full-time monthly + Freelance per-task + Commission (optional)  
**Flow:** All salary → EHB Wallet first → user choice (hold/transfer/reinvest)  
**Inspector:** ~20K PKR base + 300–800 per inspection + STL bonus

### FREE User Access (LOCKED)

- Browse jobs ✅ | Apply (3/week max) ✅ | Priority ranking ❌ | "Unverified" badge warning

### AI Matching Priority (LOCKED)

1. STL | 2. Skills | 3. CRB Certification | 4. Experience | 5. Location

### Contract Violations (LOCKED)

Progressive: 1st = warning | 2nd = salary cut | 3rd = STL drop (-2) + cancel

### Employment Types (LOCKED)

Full-time (monthly) ✅ | Freelance (per-task) ✅

### Geographic Strategy (LOCKED)

Phase 1: Pakistan | Phase 2: Global

### AI Interview (LOCKED)

Optional, employer configurable: AI screening | Direct | Hybrid

---

## Phase 2 — DMO (System Brain)

**Role:** Governance center + AI automation + business operations

### SaaS Billing Model

DMO operates as a paid SaaS platform with auto-deducted monthly fees:

| EHB-STL Level | Monthly Fee (PKR) |
|---|---|
| L1–L2 | FREE |
| L3–L4 | 500 |
| L5–L6 | 1,000 |
| L7–L8 | 3,000 |
| L9–L10 | 5,000 |

**Billing flow:** Auto-deduct from earnings → 7-day warning if insufficient → 15-day grace period → DMO level decrease if unpaid → continued downgrades on non-payment.

**Key rule:** DMO subscription = STL maintenance + tools access. No payment = no growth.

### 10 Level Ladder (Behavior 50% + Activity 30% + Risk Intelligence 20%)

| Level | Name | Tier |
|---|---|---|
| L1 | Basic User | Limited tools, learning |
| L2 | Active | Basic functions, learning phase |
| L3 | Verified | Basic automation, limited analytics |
| L4 | Stable | Standard tools, moderate automation |
| L5 | Professional | Full operations tools, complaint handling |
| L6 | Strong Operator | Advanced reports, team management |
| L7 | Business Owner | AI automation, franchise interaction, full analytics |
| L8 | High Performer | Multi-system control, high automation |
| L9 | Authority | Priority decisions, advanced AI tools |
| L10 | Elite | Full control, system-level power |

### 8 Module Categories

1. Core Control (PSS, CRB, STL, Verification)
2. Management (Operations, Applications, Approvals)
3. Finance (Wallet, Earnings, Refill)
4. Risk & Control (Complaints, Up-Guard, Fraud)
5. Business Control (Franchise, Conversion)
6. AI System (Intelligence, Activity, Tasks, Assistant)
7. Data System (Analytics, Notifications, Settings, Monitoring)
8. Advanced (Blockchain Control)

**Admin Role:** Internal EHB staff (L8+ PSS + 2FA mandatory), NOT a public user type

---

## Phase 3 — GoSellr System (E-Commerce Core)

### User Types

- Buyer
- Seller
- Service Provider
- Rider
- Company
- Production Company

### STL Entity Integration

All entities feed into single FINAL STL formula:
```
FINAL EHB-STL = MIN(
  productSTL,
  sellerSTL,
  companySTL,
  ownerSTL
)
```

**Anti-fraud rule:** If any layer is FREE → entire product shows FREE

---

## Phase 4 — UI/UX (Product Card System)

### Product Card (List View)

Show: Image, Name, Price, ⭐Rating, 🏅Badge, 🔰STL Level, ⏱Delivery time

Example: ⭐ 4.7 | 🏅 Trusted | STL L7 | 2h delivery

### Product Detail Page

- Images + full description
- Seller info + STL breakdown
- CRB verification status
- Industry tags + verified franchise
- Reviews (segmented by rater STL tier)
- Complaint history
- Delivery options

---

## Phase 5 — Ranking Engine

**Sort order:**
1. STL Level (highest first)
2. Rating (highest first)
3. Complaints (lowest first)
4. Order count (highest first)
5. Delivery speed (fastest first)
6. Response time (fastest first)
7. Location (nearest first)
8. Listing freshness (newest first)

**Visibility rules:**
- Top ranking = STL ≥ L7
- FREE users = separate "Unverified Zone" section
- Promoted products require STL L5+ minimum

---

## Phase 6 — Franchise System

**Purchase:** No STL required  
**Activation:** PSS L5 required  
**Failure:** 3 warnings → franchise terminated → 80% refund, 20% penalty  

**4 Tiers:**
| Online | 5K EHBGC |
| City | 20K EHBGC |
| State | 50K EHBGC |
| Country | 100K+ EHBGC |

---

## Phase 7 — Economy System (Token Lock)

**Locked EHBGC per level:**

| L0 | 0 | L1 | 0 | L2 | 20 | L3 | 40 |
| L4 | 100 | L5 | 200 | L6 | 400 | L7 | 800 |
| L8 | 2000 | L9 | 4000 | L10 | 10000+ |

**Unlock mechanism:**
- Request unlock → 15-day grace period
- STL downgrade by 2 levels
- No refund of platform benefits

---

## Phase 8 — Complaint & Penalty

- **3+ complaints + 3 weeks** → -2 STL levels
- **Fraud detected** → L0 (FREE)
- **Inactivity (>60 days)** → -1 level per month
- **Missed refill** → upgrade blocked

---

## Phase 9 — Responsibility System

EHB Responsibility % by STL level:

| L0 | 0% | L1 | 10% | L2 | 20% | L3 | 40% |
| L4 | 55% | L5 | 70% | L6 | 80% | L7 | 90% |
| L8 | 95% | L9 | 98% | L10 | 100% |

(Higher STL = EHB takes more liability for disputes)

---

## System Flow

```
User Registration
    ↓
PSS Verification (identity)
    ↓
CRB Application (skills/credentials)
    ↓
DMO Processing (automated + manual review)
    ↓
STL Engine (composite score calculation)
    ↓
GoSellr Access (listing/ordering enabled)
    ↓
Ranking + Visibility (based on STL level)
    ↓
Orders + Earnings (activity feeds into next STL recalc)
    ↓
Loop: Activity → STL update → Ranking change
```

**Recalc triggers:**
- Order completed
- Complaint filed
- Refill submitted
- Coin lock change
- Exam result
- Nightly decay/streak bonus

---

## System Completion Status

All core systems fully defined and locked:
- ✅ PSS v3.0 (Identity, 10 levels, 27 features, 9 user types)
- ✅ CRB v1.0 (Quality, 10 levels, exams, inspections)
- ✅ DMO v1.4 (Governance, 10 levels, SaaS billing, 8 module groups)
- ✅ STL v1.1 (Trust scoring, 5 entity types, composite formula)
- ✅ JPS v1.1 (Career system, salary, AI matching, contracts)
- ✅ Franchise (4 tiers, activation rules, failure/refund)
- ✅ Economy (Token lock, responsibility %, ranking engine)
- ✅ Complaints (Progressive penalties, downgrade rules)

---

## Build Phases — Development Timeline (12-Phase Technical Roadmap)

See **`EHB-BUILD-BLUEPRINT.md`** for complete 12-phase technical implementation plan:

| Phase | Name | Objective | Key Modules | Dependencies |
|-------|------|-----------|-------------|--------------|
| 1 | Foundation Setup | Core infrastructure & project structure | Node.js, Express, MongoDB, folder structure | None |
| 2 | User Auth + PSS | Identity verification and registration | User model, PSS verification, JWT | Phase 1 |
| 3 | CRB + STL Engine | Quality assurance and trust scoring | CRB inspections, STL formula (MIN-chain), on-chain hashing | Phase 2 |
| 4 | DMO (7 Engines) | Governance, automation, risk, finance | Decision, Risk, Trust, Finance, Operations, Analytics, AI engines | Phase 3 |
| 5 | GoSellr | E-commerce products and marketplace | Product model, DMO gates, ranking engine | Phase 4 |
| 6 | Wallet + Payments | User money management and commissions | Wallet lock/release, escrow, 2% commission split | Phases 4, 5 |
| 7 | Complaints + Penalties | Dispute resolution and progressive penalties | Complaint filing, AI review, refunds, STL downgrade rules | Phases 5, 6, 4 |
| 8 | Franchise + Delivery | Multi-tier franchises and last-mile logistics | Franchise model, rider assignment, real-time tracking, self-delivery | Phases 5, 7 |
| 9 | AI Marketplace | Search, ranking, and recommendations | AI search engine, trending, personalized suggestions | Phases 5, 4 |
| 10 | Notifications + Real-Time | Live updates and Socket.IO tracking | Notification system, delivery tracking, live events | Phases 5, 8 |
| 11 | Admin Panel | System administration and oversight | Admin roles, user management, finance control, fraud dashboard | All phases |
| 12 | Final Integration + Launch | Testing, deployment, soft launch, official launch | Integration testing, performance optimization, deployment pipeline, monitoring | All phases |

**Timeline:** 16–24 weeks (4–6 months) for soft launch in Islamabad · 6 months to 20+ cities

---

## Changelog

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-18 | 1.0 | Created from founder phase-wise structure document. 9 phases covering PSS→CRB→STL→DMO→GoSellr→Franchise→Token Lock→Complaints→Responsibility. |
| 2026-04-18 | 1.1 | Added Phase 1.5 — JPS (8 dashboard sections, job flow, 4 designations, exam system, contract rules, STL impact). Updated Phase 2 DMO with SaaS billing model (fee table, flow, grace period) and final level names (Basic User→Elite). |
| 2026-04-18 | 1.2 | JPS locked details: salary model (full-time + freelance + commission, wallet-first), FREE user limits, AI matching priority (STL→Skills→CRB→Experience→Location), contract violation progressive penalties, employment types, geographic strategy (Pakistan Phase 1), optional AI interview. System completion status added. |
| 2026-04-18 | 1.3 | Added "Build Phases — Development Timeline" section mapping 12-phase technical roadmap with dependencies and module breakdown. Links to EHB-BUILD-BLUEPRINT.md v1.0. |
