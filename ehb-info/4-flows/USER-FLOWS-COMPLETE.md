# EHB COMPLETE USER FLOWS — DMO + Franchise + GoSellr Integration

**Company:** EHB Technologies (Pvt.) Ltd.  
**Document Version:** 1.0  
**Created:** 2026-04-14  
**Based on:** EHB-MASTER-INFO.md v4.0 (§84-§90, §33, §38, §39, §42, §48, §90)  
**Architecture:** 3-Dimensional Trust System (PSS L1-L10 + CRB L1-L10 + DMO L1-L10 → HYBRID → EHB-STL)

---

## TABLE OF CONTENTS

1. [System Architecture Overview](#1-architecture)
2. [Buyer Complete Flow (GoSellr + DMO + Franchise)](#2-buyer)
3. [Seller Complete Flow (GoSellr + DMO + Franchise + CRB)](#3-seller)
4. [Rider Complete Flow (GoSellr + DMO + Franchise)](#4-rider)
5. [Inspector Complete Flow (CRB + DMO + Franchise)](#5-inspector)
6. [Franchise Owner Complete Flow (DMO + GoSellr + Territory)](#6-franchise)
7. [Employer/Job Poster Flow (JPS + DMO)](#7-employer)
8. [Job Seeker Flow (JPS + DMO)](#8-jobseeker)
9. [Admin/DMO Operator Flow](#9-admin)
10. [Cross-System Data Flows](#10-data-flows)
11. [Trust Level Impact at Every Step](#11-trust-impact)
12. [Error Flows & Edge Cases](#12-errors)

---

## 1. System Architecture Overview

### 1.1 The Three Pillars of Every User Flow

Every single user action on the EHB platform touches THREE systems simultaneously:

```
┌──────────────────────────────────────────────────────────────┐
│                      USER ACTION                              │
│              (browse, buy, sell, deliver, inspect)             │
└──────────────────────┬───────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────────┐
         │             │                 │
    ┌────▼────┐  ┌─────▼─────┐  ┌───────▼───────┐
    │ GoSellr │  │    DMO    │  │   Franchise   │
    │(Market) │  │(Governance│  │  (Territory)  │
    │         │  │ + Rules)  │  │               │
    └────┬────┘  └─────┬─────┘  └───────┬───────┘
         │             │                 │
         └─────────────┼─────────────────┘
                       │
              ┌────────▼────────┐
              │   TRUST ENGINE  │
              │  PSS + CRB + DMO│
              │  → HYBRID → STL │
              └─────────────────┘
```

### 1.2 Who Does What?

| System | Role in User Flow | When Active |
|--------|------------------|-------------|
| **GoSellr** | Marketplace — products, orders, delivery, payments | Every buy/sell transaction |
| **DMO** | Governance — monitors every action, applies rules, decisions | ALWAYS watching |
| **Franchise** | Territory — local management, local support, revenue split | Every transaction in a territory |
| **PSS** | Identity verification — who is this person? | Registration, upgrades, sensitive actions |
| **CRB** | Physical verification — is this real? | Seller/inspector onboarding, re-checks |
| **STL** | Trust score — how trusted is this entity? | Every feature gate, every listing, every payment |
| **Wallet** | Financial — escrow, lock, payments | Every monetary transaction |

### 1.3 DMO's 7 Engines in User Flows

DMO runs 7 engines simultaneously on every user action:

```
1. Decision Engine     — approve/reject actions based on rules
2. Risk Engine         — real-time fraud detection
3. Trust Engine        — update DMO-Level (L1-L10) behavioral scoring
4. Compliance Engine   — policy adherence checking
5. Finance Engine      — revenue split, fee calculation
6. Operations Engine   — SLA monitoring, escalation
7. Analytics Engine    — pattern detection, reporting
```

### 1.4 Franchise Territory Model

```
Country Franchise (Pakistan)
  └── Corporate Franchise (Lahore Region)
       └── Master Franchise (Gulberg Area)
            └── Sub Franchise (Gulberg Block A)
                 └── All users/sellers/riders in this zone
```

Every transaction goes through the franchise hierarchy for monitoring + revenue split.

---

## 2. Buyer Complete Flow (GoSellr + DMO + Franchise)

### Step-by-Step with System Integration

#### STEP 1: Landing Page → Browse
```
USER ACTION:     Opens EHB app / GoSellr website
GoSellr:         Shows landing page → categories, featured products, search
DMO:             Logs anonymous visit → Analytics Engine records traffic
Franchise:       Not active (no user identified yet)
Trust:           Not active (no login)
```

#### STEP 2: Registration (JPS Entry)
```
USER ACTION:     Clicks "Register" → enters name, phone, email
GoSellr:         N/A (JPS handles registration)
JPS:             Creates profile → assigns role = "buyer"
PSS:             Auto-assigns PSS-L1 (email verified) → upgrades to PSS-L2 (phone OTP)
DMO:             Decision Engine: Auto-approve new user
                 Trust Engine: DMO-L1 (New) assigned
                 Analytics Engine: New user event logged
Franchise:       Auto-detects location → assigns nearest Sub Franchise territory
Trust:           EHB-STL = L1 (PSS-L2, CRB-L1, DMO-L1 → HYBRID = L1)
Affiliate:       Auto-generates referral link
```

#### STEP 3: Home Dashboard
```
USER ACTION:     Lands on personalized home dashboard
GoSellr:         AI recommendations (based on location + category), trending products
                 Nearby verified sellers (sorted by STL level)
DMO:             Trust Engine: Activity tracking begins
                 Risk Engine: Device fingerprint captured
Franchise:       Territory-based content → only shows sellers in this franchise zone
Trust:           Products displayed with trust badges (STL level visible)
```

#### STEP 4: Product Browsing
```
USER ACTION:     Browses product listings, filters, searches
GoSellr:         Product cards: Image, Name, Price, Rating⭐, Seller STL Badge🏅, Delivery time
                 Search powered by AI → keyword match + category filter + STL ranking
DMO:             Analytics Engine: Search patterns recorded
                 Risk Engine: Monitors for bot-like browsing patterns
Franchise:       Products from franchise territory appear first
Trust:           Product STL displayed = MIN(product_stl, seller_stl, company_stl, owner_stl)
                 High STL products → premium positioning
                 Low STL products → warning badge
```

#### STEP 5: Product Detail Page
```
USER ACTION:     Clicks on a product
GoSellr:         Full detail: Images (gallery), description, specs
                 Seller info: Name, STL badge, join date, total sales
                 Reviews: Star ratings + text + verified purchase badge
                 Return policy: Based on seller's STL level
                 Delivery time: Estimated from rider zone
DMO:             Analytics Engine: Product view count +1
                 Trust Engine: Cross-references seller history
Franchise:       Shows franchise territory badge
                 Franchise-guaranteed delivery time SLA
Trust:           Seller's 3D trust breakdown visible (PSS✓ CRB✓ DMO✓)
                 CRB badge = "Inspected by EHB" if CRB-L3+
```

#### STEP 6: Add to Cart
```
USER ACTION:     Adds product(s) to cart
GoSellr:         Cart page: Products list, quantities, subtotal, delivery fee
                 Min order check: Must meet industry minimum (e.g., 200 PKR for food)
DMO:             Risk Engine: Cart value check → unusual amounts flagged
                 Compliance Engine: COD eligibility check (based on buyer STL)
Franchise:       Delivery fee calculated based on franchise zone distances
Trust:           COD allowed only if buyer STL ≥ L3
                 High-value orders (>5,000 PKR) require STL ≥ L4
```

#### STEP 7: Order Placement
```
USER ACTION:     Selects address → chooses payment → confirms order
GoSellr:         Order created → status = "pending"
                 Payment methods: Wallet (instant), COD (if eligible), Bank transfer
Wallet:          If Wallet payment → amount deducted, held in ESCROW
                 If COD → no wallet deduction, COD fee applied
DMO:             Decision Engine: Order approval (auto for normal, manual for flagged)
                 Finance Engine: 2% service charge calculated
                 Risk Engine: Payment fraud check
                 Operations Engine: SLA timer starts (seller must accept within 30 min)
Franchise:       Order appears in franchise dashboard → "New Orders" tab
                 Revenue split calculated: 50% Franchise, 30% Seller, 15% EHB, 3% Rider, 2% Affiliate
Trust:           Seller notified only if their STL allows receiving orders from this buyer's STL level
```

#### STEP 8: Seller Accepts & Prepares
```
USER ACTION:     Waits for seller to accept
GoSellr:         Seller gets notification → 30 min to accept
                 If no response → auto-cancel OR franchise reassigns
                 Seller accepts → status = "preparing"
DMO:             Operations Engine: SLA monitoring (seller response time tracked)
                 Trust Engine: Seller responsiveness score updated
Franchise:       Franchise manager sees "In Preparation" in dashboard
                 If seller slow → franchise can intervene
Trust:           Seller's DMO-Level affected by response time
```

#### STEP 9: Rider Assignment & Pickup
```
USER ACTION:     Waits for delivery
GoSellr:         Smart routing assigns nearest available rider
                 Rider gets 60 seconds to accept
                 If declined → next rider in queue
                 Rider arrives at seller → takes photo + enters pickup code
DMO:             Operations Engine: Rider assignment SLA (must assign within 10 min)
                 Risk Engine: Rider identity verified via device binding
                 Trust Engine: Rider performance tracking active
Franchise:       Rider belongs to franchise zone
                 Franchise manager sees "Out for Delivery" in dashboard
Trust:           Rider's STL displayed to buyer (rider PSS verified badge)
```

#### STEP 10: Delivery
```
USER ACTION:     Receives delivery at door
GoSellr:         Rider arrives → buyer enters OTP OR rider takes photo proof
                 If COD → buyer pays cash to rider
                 Order status = "delivered"
DMO:             Decision Engine: Delivery confirmed
                 Finance Engine: Escrow release timer starts
                   - Soft release: 24 hours (buyer can file complaint)
                   - Full release: 7 days (money moves to seller wallet)
                 Trust Engine: Successful delivery → positive behavioral score
Franchise:       Franchise dashboard → "Delivered" count +1
                 Revenue split queued for payout
Trust:           Buyer DMO-Level ↑ (consistent purchasing = good behavior)
                 Seller DMO-Level ↑ (successful order fulfillment)
                 Rider DMO-Level ↑ (on-time delivery)
```

#### STEP 11: Review & Rating
```
USER ACTION:     Rates product + writes review
GoSellr:         Star rating (1-5) + text feedback
                 Review tagged as "verified purchase"
DMO:             Trust Engine: Review quality scored (length, detail, photos)
                 Risk Engine: Fake review detection (patterns, timing)
                 Analytics Engine: Product rating recalculated
Franchise:       Review visible in franchise quality dashboard
Trust:           Seller's product STL affected by rating
                 Buyer's BSTL (Buyer Trust Score) affected by review quality
```

#### STEP 12: Complaint (If Needed)
```
USER ACTION:     Files complaint (9 categories: not received, damaged, wrong item, etc.)
GoSellr:         Complaint form → upload evidence (photos/videos)
DMO:             Decision Engine: AI auto-review (auto-resolve simple cases)
                 Operations Engine: Seller has 12 hours to respond
                 Compliance Engine: Checks complaint against policies
                 If not auto-resolved → escalate to franchise
Franchise:       Franchise manager reviews complaint (24-48 hour SLA)
                 Can approve refund, reject, or escalate to DMO Central
Wallet:          If refund approved → escrow released back to buyer
Trust:           Valid complaint → seller STL drops
                 Fake complaint → buyer BSTL drops + penalty
                 BSTL weight matters: High BSTL = stronger complaint, Low BSTL = needs more proof
```

#### STEP 13: Loyalty & Affiliate Earnings
```
USER ACTION:     Earns cashback + affiliate income from referrals
GoSellr:         Cashback on orders (1-3% based on loyalty tier)
Affiliate:       Earns 5% of first transaction of each referred user
                 Ongoing 1% of referral's orders
                 Level income: L1=2%, L2=1%, L3=0.5%, L4-L10=0.1% each
DMO:             Finance Engine: Affiliate payouts calculated
                 Compliance Engine: Anti-fraud check on referrals
Trust:           Higher STL = deeper affiliate earning levels unlocked
                 STL L1-L2: 1-2 levels deep
                 STL L3-L5: up to 5 levels
                 STL L6+: full 10 levels
```

---

## 3. Seller Complete Flow (GoSellr + DMO + Franchise + CRB)

### STEP 1: Registration (JPS → Seller Role)
```
USER ACTION:     Registers as seller (selects seller role in JPS)
JPS:             Profile created → role = "seller"
PSS:             Must verify: Email → Phone → CNIC → Face Match (minimum PSS-L4 for selling)
DMO:             Decision Engine: Seller application created (pending PSS verification)
                 Trust Engine: DMO-L1 (New seller)
Franchise:       Territory auto-assigned based on business address
Trust:           Cannot sell yet → needs PSS-L4 minimum
```

### STEP 2: PSS Verification Journey
```
USER ACTION:     Completes verification steps one by one
PSS:             L1 → Email verified
                 L2 → Phone OTP verified
                 L3 → CNIC uploaded + OCR scanned + NADRA check
                 L4 → Face match (selfie vs CNIC photo)
                 Each step = PSS level up
DMO:             Decision Engine: Auto-approves each verification step
                 Trust Engine: PSS-Level updates in real-time → recalculates EHB-STL
GoSellr:         Seller profile shows verification progress bar
Trust:           At PSS-L4 → seller can start listing products (basic)
                 At PSS-L5 → address verified → wallet deposit enabled
                 At PSS-L6 → full selling privileges
```

### STEP 3: CRB Inspection (Physical Verification)
```
USER ACTION:     Requests first CRB inspection (or auto-triggered at certain STL levels)
CRB:             Inspector assigned from franchise zone (anti-corruption rotation)
                 Inspector visits seller → checklist: location, stock, hygiene, documents
                 Inspector submits report (Pass/Conditional/Fail)
                 L3 = 1 inspection passed (minimum for STL-L4+)
DMO:             Decision Engine: Reviews inspection report
                 If Pass → CRB-L3 assigned
                 If Conditional → seller must fix issues → re-inspection in 7 days
                 If Fail → seller blocked → must re-apply after 30 days
Franchise:       Franchise manager assigns inspector
                 Inspection appears in franchise "CRB Management" tab
Trust:           CRB-L3 → seller can reach EHB-STL L4
                 Without CRB → seller stuck at STL-L3 (HYBRID formula threshold blocks)
```

### STEP 4: Product Listing
```
USER ACTION:     Adds products (name, category, price, images, description)
GoSellr:         Product created → auto-calculates product STL
                 Product STL = MIN(product_quality, seller_stl)
                 Product visible in marketplace
DMO:             Compliance Engine: Product content check (no prohibited items)
                 Risk Engine: Price anomaly detection (too low = suspicious)
                 Analytics Engine: Category tracking
Franchise:       Product appears in franchise territory marketplace
Trust:           Product badge shows combined trust level
                 High STL seller → products get premium positioning in search
```

### STEP 5: Receive & Process Orders
```
USER ACTION:     Gets order notification → accepts within 30 minutes
GoSellr:         Order details: buyer info, product, quantity, delivery address
                 Seller prepares order → marks "ready for pickup"
DMO:             Operations Engine: SLA tracking (must accept within 30 min)
                 Risk Engine: Unusual order patterns flagged
                 Trust Engine: Response time affects DMO-Level
Franchise:       Order appears in franchise "Active Orders" tab
                 Franchise can intervene if seller unresponsive
Trust:           Fast acceptance → DMO-Level positive signal
                 Slow/no response → DMO-Level negative signal → affects EHB-STL
```

### STEP 6: Delivery Assignment
```
USER ACTION:     Waits for rider pickup (or self-delivers if wallet allows 2× lock)
GoSellr:         Rider auto-assigned from nearest pool
                 OR seller self-delivers (requires 2× wallet lock as insurance)
DMO:             Operations Engine: Rider assignment SLA monitoring
                 Finance Engine: Delivery fee calculated
Franchise:       Franchise manages local rider pool
                 If no rider available → franchise escalation
Trust:           Self-delivery sellers need higher trust (wallet lock = skin in game)
```

### STEP 7: Payment Release
```
USER ACTION:     Delivery confirmed → money held in escrow
GoSellr:         Escrow phases:
                   Phase 1 (0-24h): Soft hold — buyer can complain
                   Phase 2 (24h-7d): If no complaint → money moves to seller wallet
                   If complaint → escrow frozen until resolution
DMO:             Finance Engine: Revenue split calculation
                   50% → Franchise
                   30% → Seller (net after EHB fee)
                   15% → EHB Central
                   3% → Rider
                   2% → Affiliate (if referral)
                 Compliance Engine: Tax reporting data captured
Franchise:       Revenue tracked in franchise "Finance" tab
Trust:           Successful order completion → DMO-Level ↑ → EHB-STL ↑ over time
```

### STEP 8: Growth & STL Progression
```
USER ACTION:     Continues selling → builds reputation → STL grows
GoSellr:         More products → more visibility → more orders
                 Premium seller features unlock at higher STL
PSS:             Can upgrade: PSS-L5 (address), L6 (liveness), L7 (device bind)
CRB:             Schedule re-inspection → CRB-L4 (2 passes), L5 (fully verified)
DMO:             Trust Engine: Continuous behavioral scoring
                 Time on platform → activity → compliance → all feed DMO-Level
Wallet:          Lock more EHBGC → wallet multiplier → STL boost (+5% to +20%)
Trust:           EHB-STL progression example:
                   Month 1: PSS-L4, CRB-L3, DMO-L2 → STL = L3
                   Month 3: PSS-L5, CRB-L4, DMO-L4 → STL = L4
                   Month 6: PSS-L6, CRB-L5, DMO-L5 → STL = L5
                   Year 1:  PSS-L7, CRB-L7, DMO-L6 → STL = L6-L7
```

---

## 4. Rider Complete Flow (GoSellr + DMO + Franchise)

### STEP 1: Signup & Verification
```
USER ACTION:     Registers as rider
JPS:             Role = "rider"
PSS:             Email → Phone → CNIC → Face Match → Liveness (minimum PSS-L6 for riding)
DMO:             Trust Engine: DMO-L1 assigned
                 Decision Engine: Rider application pending
Franchise:       Zone assigned based on rider's address
Trust:           Rider formula: EHB-STL = f(PSS-Level, DMO-Level, RPS)
                 No CRB standard (vehicle check only)
```

### STEP 2: Accept Orders
```
USER ACTION:     Gets order ping → 60 seconds to accept
GoSellr:         Order details: pickup location, delivery address, estimated distance
                 If accept → navigate to seller
                 If decline → next rider in queue (max 3 declines/day)
DMO:             Operations Engine: Acceptance rate tracked (affects RPS)
                 Trust Engine: Responsiveness signal
Franchise:       Rider appears as "On Duty" in franchise rider management
Trust:           High acceptance rate → better RPS → higher STL
```

### STEP 3: Pickup & Deliver
```
USER ACTION:     Goes to seller → picks up → delivers to buyer
GoSellr:         At seller: Photo of package + enter pickup code
                 At buyer: OTP confirmation OR photo proof of delivery
                 If COD: Collect cash from buyer
DMO:             Operations Engine: GPS tracking throughout
                 Risk Engine: Route deviation alerts
                 Trust Engine: On-time delivery scored
Franchise:       Live tracking visible in franchise dashboard
                 Late delivery → franchise notification
Trust:           On-time delivery → RPS ↑ → DMO-Level ↑ → STL ↑
                 Late delivery → RPS ↓ → DMO-Level ↓
```

### STEP 4: Earnings
```
USER ACTION:     Completes delivery → earns
GoSellr:         Base fee (100-300 PKR per order)
                 + Distance bonus
                 + Peak hours bonus (1.5× during rush)
                 + COD handling fee (2% of order value)
DMO:             Finance Engine: Payment calculated → T+1 payout to rider wallet
                 Analytics Engine: Rider performance metrics
Franchise:       Rider earnings tracked in franchise "Rider Management" tab
Trust:           Higher STL riders → priority order assignment → more earnings
                 RPS scoring: Delivery time, acceptance rate, customer ratings, COD compliance
```

### STEP 5: COD Cash Handling
```
USER ACTION:     If COD collected → must deposit within 24 hours
Wallet:          Cash deposit at designated points OR wallet transfer
DMO:             Compliance Engine: COD deposit SLA (24h strict)
                 Risk Engine: Missing cash flagged after 24h
                 Decision Engine: Late deposit → warning → penalty → suspension
Franchise:       Franchise tracks COD collection vs deposit
Trust:           COD compliance directly affects DMO-Level
                 3 late deposits → account suspension
```

---

## 5. Inspector Complete Flow (CRB + DMO + Franchise)

### STEP 1: Hiring & Training
```
USER ACTION:     Applies for inspector role via JPS
JPS:             Inspector role → screening interview
PSS:             Must reach PSS-L8 minimum (video verified)
CRB:             Inspector themselves must be CRB certified
DMO:             Decision Engine: Manual review of application
Training:        3-5 day hybrid training → 7 modules → assessment ≥70% to pass
Franchise:       Inspector assigned to franchise territory
Wallet:          Must lock 1K-5K EHBGC as bond (returned on clean exit)
Trust:           Inspector formula: EHB-STL = f(PSS-Level, CRB-Level, DMO-Level, IPS)
```

### STEP 2: Assignment & Rotation
```
USER ACTION:     Gets inspection assignments
CRB:             Anti-corruption rotation: Different inspector each time
                 Category matching: Food inspector → food sellers
                 Zone-based: Only within franchise territory
DMO:             Operations Engine: Assignment scheduling
                 Compliance Engine: Rotation enforcement (no inspector visits same seller 2× in row)
Franchise:       Franchise manages inspector pool and schedules
Trust:           Rotation prevents bribery → maintains CRB integrity
```

### STEP 3: Conduct Inspection
```
USER ACTION:     Visits seller location → completes checklist
CRB:             GPS + Photos + Video capture (mandatory evidence)
                 Category-specific checklist:
                   Food: Hygiene, storage, expiry dates, licenses
                   Electronics: Authenticity, safety marks, warranty
                   Medical: License verification, drug storage, records
                 Duration: 10-30 minutes on-site
DMO:             Operations Engine: SLA tracking (daily 5-15 inspections target)
                 Risk Engine: Evidence quality check (blurry photos rejected)
Franchise:       Franchise manager monitors inspection progress
Trust:           Thorough inspection → IPS ↑
                 Careless inspection → IPS ↓
```

### STEP 4: Submit Report
```
USER ACTION:     Submits inspection report in-app
CRB:             Report: Pass / Conditional / Fail
                 Photos + GPS + timestamps = tamper-proof evidence
                 If Pass → seller CRB level upgrades
                 If Conditional → seller gets issue list → 7 days to fix → re-inspection
                 If Fail → seller blocked → 30-day cooldown
DMO:             Decision Engine: Auto-review + human review of report
                 Trust Engine: Inspector quality score updated
                 Analytics Engine: Inspection metrics
Franchise:       Report appears in franchise "CRB Reports" dashboard
Trust:           Clean report → seller CRB-Level ↑ → seller STL ↑
                 Failed report → seller CRB-Level ↓ → seller STL ↓ (HYBRID cap kicks in)
```

### STEP 5: Earnings
```
USER ACTION:     Gets paid per inspection
CRB:             300-800 PKR per inspection (based on category + distance)
                 T+1 payout to wallet
DMO:             Finance Engine: Payment processed
                 Analytics Engine: Inspector earnings tracked
Franchise:       Franchise covers inspector cost from territory revenue
Trust:           IPS (Inspector Performance Score) 0-100:
                   Report quality, on-time completion, evidence quality, re-inspection rate
```

---

## 6. Franchise Owner Complete Flow (DMO + GoSellr + Territory)

### STEP 1: Purchase & Activation
```
USER ACTION:     Buys franchise (Sub/Master/Corporate/Country)
PSS:             Minimum PSS-L8 (Sub), PSS-L9 (Master/Corporate), PSS-L10 (Country)
CRB:             Full CRB verification + legal document check
Wallet:          EHBGC Lock:
                   Sub Franchise: 50,000 EHBGC
                   Master Franchise: 200,000 EHBGC
                   Corporate Franchise: 500,000 EHBGC
                   Country Franchise: 1,000,000 EHBGC
DMO:             Decision Engine: Franchise approval (manual for L8+)
                 All 7 engines activated for franchise oversight
                 DMO-L8 minimum required
Franchise:       Territory boundaries defined
                 Team assignment begins
Trust:           Franchise STL = f(PSS, CRB, DMO, Wallet-Lock, Performance)
                 ALL dimensions + massive wallet lock + territory performance
```

### STEP 2: Setup & Territory Configuration
```
USER ACTION:     Sets up franchise dashboard
GoSellr:         Territory marketplace configuration
                 Local product categories enabled
                 Delivery zone boundaries set
DMO:             Operations Engine: Territory activation checklist
                 Compliance Engine: Policy acknowledgment required
Franchise:       Dashboard 7 Tabs:
                   1. Orders — all orders in territory
                   2. Sellers — registered sellers + STL tracking
                   3. Riders — rider pool + performance
                   4. Complaints — dispute management
                   5. Finance — revenue, splits, payouts
                   6. CRB — inspection scheduling
                   7. Reports — analytics + KPIs
Trust:           Franchise health score starts at 100%
```

### STEP 3: Daily Operations
```
USER ACTION:     Daily login → manage territory
GoSellr:         Monitor: New orders, pending orders, delayed orders
                 Check: Seller complaints, buyer complaints
                 Track: Rider performance, delivery SLAs
DMO:             Operations Engine: Daily alerts (late orders, complaints, SLA breaches)
                 Decision Engine: Franchise approves/rejects escalated complaints
                 Risk Engine: Fraud alerts within territory
                 Trust Engine: Territory health score calculated
                 Finance Engine: Daily revenue tracking
Franchise:       Dashboard shows: Today's revenue, active sellers, active riders
                 Health indicators: Green/Yellow/Red
Trust:           Good management → franchise health ↑ → franchise STL ↑
                 Poor management → health ↓ → STL ↓ → territory can be revoked
```

### STEP 4: Complaint Handling
```
USER ACTION:     Handles escalated complaints from buyers/sellers
GoSellr:         Complaint details: Category, evidence, buyer/seller info
DMO:             Decision Engine: AI pre-analysis with confidence score
                 Options: Full Refund, Partial Refund, Replacement, Reject, Warning
                 SLA: Must resolve within 24-48 hours
                 If franchise can't resolve → escalates to DMO Central
Franchise:       Franchise is the FIRST human layer in complaint resolution
                 (After AI auto-review, before DMO Central)
Wallet:          Refund from escrow → buyer wallet
                 If escrow empty → seller wallet deducted
Trust:           Resolution quality affects franchise health score
                 Buyer BSTL + Seller STL both impacted by outcome
```

### STEP 5: Seller & Rider Management
```
USER ACTION:     Manages sellers and riders in territory
GoSellr:         Onboard new sellers → guide through PSS/CRB
                 Monitor seller performance → push for STL upgrades
                 Manage rider pool → hire/train/assign
DMO:             Decision Engine: Franchise approves new seller applications
                 Operations Engine: Seller/rider SLA monitoring
                 Analytics Engine: Territory performance reports
CRB:             Franchise schedules inspections for sellers
                 Manages inspector assignments within territory
Franchise:       Seller dashboard: Total sellers, STL distribution, top/bottom performers
                 Rider dashboard: Active riders, zones, performance scores
Trust:           Territory seller health = AVERAGE(all seller STLs)
                 Must maintain minimum average to keep franchise active
```

### STEP 6: Revenue & Earnings
```
USER ACTION:     Earns revenue from territory transactions
GoSellr:         Every order in territory → franchise gets 50% of service fee
DMO:             Finance Engine: Revenue split calculation
                   Total service charge: 2% of order value
                   Split: 50% franchise, 30% seller commission, 15% EHB, 3% rider, 2% affiliate
                 Compliance Engine: Tax reporting
Wallet:          Revenue deposited weekly to franchise wallet
                 Franchise withdrawal limits: 500K/day, unlimited/month
Franchise:       Finance tab: Daily/weekly/monthly revenue breakdown
                 Performance bonuses for exceeding targets
Trust:           High-performing franchise → auto expansion (new zones)
                 Low-performing → territory shrinks → possible revocation
```

---

## 7. Employer/Job Poster Flow (JPS + DMO)

### STEP 1: Company Registration
```
USER ACTION:     Registers as employer
JPS:             Company profile created → industry selected
PSS:             Company verification: Business registration + tax ID
DMO:             Decision Engine: Company verification review
Trust:           Company STL calculated (affects all job listings)
```

### STEP 2: Post Job
```
USER ACTION:     Creates job listing
JPS:             Title, description, requirements, salary range
                 STL minimum requirement: "Only L3+ applicants can apply"
DMO:             Compliance Engine: Job listing content check
                 Analytics Engine: Job market tracking
Franchise:       Job appears in franchise territory
Trust:           Higher company STL → job listing gets priority in search
```

### STEP 3: Review Applications & Hire
```
USER ACTION:     Reviews AI-matched applications
JPS:             AI match score (based on skills, experience, STL)
                 Shortlist → interview → offer
DMO:             Decision Engine: Contract validation
                 Operations Engine: Hiring SLA tracking
Trust:           Applicant's STL visible to employer
                 CRB-verified certifications highlighted
```

### STEP 4: Payment
```
USER ACTION:     Pays employee through EHB
Wallet:          Contract-based payment → 6-month cycles → wallet-based
DMO:             Finance Engine: Payment processing
                 Compliance Engine: Labor law compliance
Trust:           On-time payment → employer DMO-Level ↑
```

---

## 8. Job Seeker Flow (JPS + DMO)

### STEP 1: Profile Creation
```
USER ACTION:     Creates professional profile
JPS:             Skills, education, experience, portfolio, certifications
PSS:             Identity verified (minimum PSS-L3 for applying)
CRB:             Certifications verified if professional (doctor/lawyer/engineer)
DMO:             Trust Engine: Profile quality score
Trust:           Higher STL → prioritized in employer search results
```

### STEP 2: Apply & Interview
```
USER ACTION:     Applies to jobs → AI recommendations → interviews
JPS:             AI matching: Skills vs requirements + STL compatibility
                 Application tracking: Applied → Shortlisted → Interview → Offer → Hired
DMO:             Analytics Engine: Job market matching data
Trust:           STL badge visible on application → employer trusts higher STL candidates
```

---

## 9. Admin/DMO Operator Flow

### STEP 1: Access Requirements
```
Internal hire → PSS-L8 minimum
Must pass DMO training
DMO-L8+ required to operate DMO systems
Role: Monitors all operations across ALL franchise territories
```

### STEP 2: Daily Dashboard
```
System-wide view: All users, all orders, all complaints
Real-time alerts: SLA breaches, fraud flags, high-risk transactions
Manual override power: Can adjust ANY user's STL (L8+ authority only)
Policy management: Create/update platform rules
Kill switch: Emergency shutdown for regions/sellers/features
```

---

## 10. Cross-System Data Flows

### 10.1 Order Data Flow
```
Buyer places order (GoSellr)
  → DMO Decision Engine validates (DMO)
  → Franchise zone matched (Franchise)
  → Seller notified (GoSellr)
  → DMO Operations SLA starts (DMO)
  → Rider assigned (GoSellr + Franchise)
  → GPS tracking (DMO)
  → Delivery confirmed (GoSellr)
  → Escrow timer starts (Wallet + DMO Finance)
  → Revenue split calculated (DMO Finance + Franchise)
  → STL updated for all parties (Trust Engine)
```

### 10.2 Trust Update Flow
```
Any user action occurs
  → PSS checks identity validity (PSS)
  → CRB checks physical verification status (CRB)
  → DMO scores behavioral impact (DMO Trust Engine)
  → HYBRID formula recalculates:
      Threshold check → Weighted (40/35/25) → Cap by lowest+1 → Wallet multiplier
  → New EHB-STL level published
  → Feature gates re-evaluated (GoSellr)
  → Franchise health score updated (Franchise)
  → History event logged (STL Events)
```

### 10.3 Complaint Escalation Flow
```
Buyer files complaint (GoSellr)
  → AI auto-review (DMO Decision Engine)
  → If auto-resolved → done (80% of cases)
  → If not → Seller response window (12h)
  → If still unresolved → Franchise review (24-48h)
  → If still unresolved → DMO Central review (48h)
  → If still unresolved → Senior DMO review (72h max)
  → Decision: Refund/Replace/Reject
  → Escrow/Wallet adjustment (Wallet)
  → STL impact applied (Trust Engine)
  → Buyer BSTL updated
  → Seller STL updated
```

---

## 11. Trust Level Impact at Every Step

### 11.1 What Each STL Level Unlocks

| EHB-STL | As Buyer | As Seller | As Rider | As Franchise |
|---------|----------|-----------|----------|--------------|
| L1 | Browse only | Cannot sell | Cannot ride | Cannot apply |
| L2 | Buy (limited) | Cannot sell | Cannot ride | Cannot apply |
| L3 | Full buying, COD | Basic selling | Cannot ride | Cannot apply |
| L4 | Higher limits | Full selling | Basic riding | Cannot apply |
| L5 | Premium features | Extended categories | Full riding | Cannot apply |
| L6 | VIP support | Premium badge | Priority orders | Sub franchise eligible |
| L7 | Unlimited | Elite seller | Zone leader | Sub franchise |
| L8 | Supreme buyer | Enterprise seller | Senior rider | Master franchise eligible |
| L9 | Platform benefits | API access | Fleet manager | Corporate franchise eligible |
| L10 | Co-founder perks | White-label rights | Regional head | Country franchise eligible |

### 11.2 How Trust Affects Transactions

```
BUYER STL L1-L2:  Can only buy from L5+ sellers (safety buffer)
BUYER STL L3-L5:  Can buy from any seller
BUYER STL L6+:    Priority queue, faster delivery, lower fees

SELLER STL L3:    Max 50 products, limited categories
SELLER STL L5:    Max 500 products, most categories
SELLER STL L7+:   Unlimited products, all categories, premium positioning

PRODUCT DISPLAY:   Always shows MIN(product, seller, company, owner) STL
                   Low STL = warning badge visible to buyers
                   High STL = premium badge + search boost
```

---

## 12. Error Flows & Edge Cases

### 12.1 Payment Failure
```
Wallet insufficient → prompt top-up or switch to COD
COD not eligible (low STL) → must use wallet
Payment gateway error → retry 3 times → escalate to support
```

### 12.2 Rider No-Show
```
Rider doesn't arrive within SLA → auto-reassign
No riders available → franchise notification → manual solution
3 failed deliveries in zone → franchise escalation to DMO
```

### 12.3 Seller Disappears
```
Seller doesn't respond to order (30 min) → auto-cancel → refund buyer
Seller account inactive (90 days) → STL decay → eventual suspension
Seller fraud detected → immediate freeze → DMO investigation
```

### 12.4 Franchise Territory Conflict
```
Order on zone boundary → assigned to nearest franchise
Seller serves multiple zones → primary franchise gets credit
Cross-franchise delivery → revenue split between 2 franchises
```

### 12.5 Trust System Conflicts
```
PSS verified but CRB failed → STL capped by CRB (HYBRID cap rule)
High DMO but PSS expired → threshold block → must renew PSS
Wallet lock expired → multiplier removed → STL may drop
```

---

## Summary: The EHB Triple-Layer Integration

```
Every user action = GoSellr (marketplace) + DMO (governance) + Franchise (territory)
Every trust check = PSS (identity) + CRB (physical) + DMO (behavioral) → HYBRID → STL
Every payment    = Wallet (escrow) + DMO Finance (split) + Franchise (revenue)
Every complaint  = AI (auto) + Franchise (local) + DMO (central) + STL (impact)

This is what makes EHB the WORLD'S FIRST truly integrated trust-based marketplace.
No other platform combines identity verification + physical inspection + behavioral scoring
into a single unified trust level that gates every single feature on the platform.
```

---

*EHB Technologies (Pvt.) Ltd. — User Flows v1.0 · 2026-04-14 · Based on Master Info v4.0*
