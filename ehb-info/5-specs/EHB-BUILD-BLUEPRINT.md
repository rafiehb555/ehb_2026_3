# EHB Build Blueprint — 12-Phase Development Plan

**Status:** v1.0 · 2026-04-18  
**Related:** PSS.md v3.0, DMO.md v1.4, STL.md v1.1, JPS.md v1.1, CRB.md v1.0  
**Scope:** Complete 12-phase technical implementation roadmap for EHB global super-app platform

---

## Phase 1 — Foundation Setup

**Objective:** Establish core infrastructure and project structure

**Deliverables:**
- Replit Node.js project: `ehb-main-system`
- Folder structure: `/src/modules/{auth,pss,crb,stl,dmo,products,orders,wallet,complaints,franchise}`, `/config`, `/utils`, `/database`, `/docs`
- Express server on port 3000
- MongoDB Atlas connection configured
- GitHub integration for auto-sync enabled
- AI memory system (Markdown files): `EHB-MASTER-INFO.md`, `DMO.md`, `PSS.md`, `STL.md`, `JPS.md`, `CRB.md`
- Environment setup: `.env` with PORT, MONGO_URI, JWT_SECRET

**Module Dependencies:** None (foundation layer)

---

## Phase 2 — User Authentication + PSS System

**Objective:** Core identity verification and user registration

**Deliverables:**
- User model: `name`, `email`, `phone`, `password`, `roles[]`, `pss_level`, `dmo_level`, `ehb_stl`, `created_at`, `updated_at`
- PSS model: `user_id`, `level`, `documents{cnic,face,address}`, `status`, `verified_at`, `expiry_date`
- Register API: `POST /auth/register` (input: email, phone, password)
- Login API: `POST /auth/login` (JWT token generation)
- PSS submission API: `POST /pss/submit` (upload verification documents)
- PSS verification logic: auto-level upgrade when documents verified
- JWT middleware for all protected routes

**Module Dependencies:** Foundation (Phase 1)

---

## Phase 3 — CRB (Central Record Blockchain) + STL Engine

**Objective:** Quality assurance, certifications, and composite trust scoring

**Deliverables:**
- CRB model: `entity_id`, `type`, `level`, `inspections[]`, `certificates[]`, `status`, `refill_due`, `on_chain_hash` (Polkadot)
- STL model: `entity_id`, `pss_score`, `crb_score`, `dmo_score`, `final_stl`, `last_updated`, `history[]`
- CRB APIs:
  - `POST /crb/apply` (apply for inspection)
  - `POST /crb/inspect` (inspector submits report)
  - `GET /crb/status/:entity_id` (check CRB status)
- STL calculation engine: `score = (pss × 0.4) + (crb × 0.3) + (dmo × 0.3)`, `final = MIN(score, lowest_component + 1)` (0–100 scale, MIN-chain rule)
- STL API: `POST /stl/calculate` (trigger calculation, auto-update on CRB/complaint/activity changes)
- On-chain hash function: CRB certificates hashed to Polkadot blockchain
- Auto-recalc triggers: order complete, complaint filed, refill submitted, nightly decay

**Module Dependencies:** PSS (Phase 2)

---

## Phase 4 — DMO Engine (Governance, Decision, Risk, Finance, Operations, Analytics, AI)

**Objective:** Automated system brain with 7 core engines

**Deliverables:**

**DMO Core Models:**
- DMO model: `user_id`, `level` (1–10), `subscription{status,expiry,fee_tier}`, `scores{behavior,activity,risk}`, `actions_log[]`, `approvals_queue[]`
- DMO level calc: `(behavior × 0.5) + (activity × 0.3) - (risk × 0.2)`, mapped to L1–L10
- SaaS subscription fees: L1–L2 FREE, L3–L4 PKR 500, L5–L6 PKR 1000, L7–L8 PKR 3000, L9–L10 PKR 5000 (auto-deduct from earnings)

**7 Core Engines:**

1. **Decision Engine**
   - Function: `canPerformAction({pss, crb, stl, action_type}) → true|false`
   - Rules: Check PSS min, CRB min, STL min for each action
   - Gates: product add (PSS L2+), order create (PSS L1+), franchise purchase (PSS L5+)
   - Output: approval or rejection with reason

2. **Risk Engine**
   - Function: `detectRisk(activity) → {level: high|medium|low, reason, action}`
   - Fraud detection: multiple accounts (same IP/phone), fake orders, abnormal activity
   - Risk scoring: 0–100 per activity
   - Output: flag suspicious users, auto-freeze if high risk

3. **Trust Engine**
   - Maintains STL: `(pss × 0.4) + (crb × 0.3) + (dmo × 0.3)`
   - Listens to PSS updates, CRB inspections, DMO behavior
   - Penalties: 3 complaints in 3 weeks = -2 STL, fraud = instant L0 (FREE)
   - Output: updated STL score, reason, history

4. **Finance Engine**
   - Wallet integration: lock, release, refund amounts
   - Escrow system: hold buyer funds on order create
   - Commission split: 2% total → 50% company, 30% sub-franchise, 15% master, 3% corporate, 2% country
   - DMO subscription auto-deduct from earnings (7-day warning if insufficient, 15-day grace, then downgrade)
   - Output: transaction records, payout calculations

5. **Operations Engine**
   - Order flow: assign rider → track → deliver → complete → review
   - Franchise control: delay alerts, seller non-response intervention
   - Delivery assignment: auto-assign available rider with highest STL
   - Self-delivery rule: seller wallet ≥ 2× product value unlocks self-delivery
   - Output: order status, rider tracking, delivery proof

6. **Analytics Engine**
   - Growth metrics: orders/day, revenue, seller count
   - Risk alerts: fraud detected, repeated complaints, STL drop
   - Suggestions: "improve PSS to L5+", "reduce complaints", "increase sales"
   - Dashboard: trending products, top sellers, system health
   - Output: daily reports, trend analysis

7. **AI Engine**
   - Auto-recommendations: products for users, jobs for job seekers
   - Auto-decisions: approve refund if complaint valid + fraud detected
   - Smart alerts: fraud risk, delay alerts, low STL warnings
   - Natural language: understand complaints, auto-categorize
   - Output: recommendations, alerts, decisions with confidence scores

**DMO APIs:**
- `GET /dmo/:user_id` (fetch DMO status, level, scores)
- `POST /dmo/update` (update behavior/activity/risk scores)
- `POST /dmo/check-action` (check if action allowed for user)
- `POST /dmo/apply-subscription` (enable SaaS billing)

**Module Dependencies:** STL (Phase 3)

---

## Phase 5 — GoSellr (E-Commerce: Products, Listings, Catalog)

**Objective:** Full e-commerce product management and marketplace

**Deliverables:**

**Product Model:**
- `name`, `price`, `category`, `seller_id`, `company_id`, `stl_level`, `rating` (0–5), `stock`, `delivery_time_hours`, `status` (active/inactive/suspended)
- Images/gallery, description, specifications, reviews[], complaints[]

**Seller Requirements:**
- PSS L2+ to list products
- STL L1+ (starting point, can improve with activity)
- DMO approval required for high-value products (>10K PKR)

**Product APIs:**
- `POST /products/add` (create listing, DMO gate)
- `GET /products` (list with filters: category, price, STL level)
- `GET /products/:id` (detailed view with seller STL, reviews, complaints)
- `PUT /products/:id` (update product)
- `DELETE /products/:id` (delist)

**Product STL Assignment:**
- Initial: seller STL
- Updates: MIN(seller_stl, company_stl, product_rating)
- Affected by: seller complaints, company downgrade, low ratings

**Ranking Engine Integration:**
- Sort: STL (highest first) → rating → complaints (lowest) → order count → delivery speed → location
- Visibility: STL ≥ L7 top ranking, FREE users in separate section

**Module Dependencies:** DMO (Phase 4)

---

## Phase 6 — Wallet + Payment System + Earnings Engine

**Objective:** User money management, escrow, and commission distribution

**Deliverables:**

**Wallet Model:**
- `user_id`, `balance`, `locked`, `earning`, `transactions[]` (id, type, amount, date, status)
- Types: deposit, withdrawal, order_lock, order_release, refund, commission_in, commission_out, dmo_fee

**Wallet Services:**

1. **Lock Amount**
   - Triggered: order creation (lock buyer funds)
   - Logic: `locked += order_amount`
   - Duration: until delivery confirmed

2. **Release Amount**
   - Triggered: delivery confirmed + review period passed
   - Logic: `locked -= order_amount`, `seller_balance += net_commission`
   - Commission calc: `seller_amount = order_amount × 0.98` (2% EHB fee)

3. **Refund Amount**
   - Triggered: order cancellation or valid complaint
   - Logic: `locked -= order_amount`, `buyer_balance += order_amount`, `seller_balance -= (order_amount - commission)`

**Commission System (2% total):**
- Company: 50% of EHB fee (0.01%)
- Sub-Franchise: 30% (0.006%)
- Master Franchise: 15% (0.003%)
- Corporate: 3% (0.0006%)
- Country: 2% (0.0004%)
- Total to EHB: 0.02 per order

**Wallet APIs:**
- `GET /wallet/:user_id` (balance, locked, earning, transaction history)
- `POST /wallet/deposit` (add funds, payment gateway)
- `POST /wallet/withdraw` (request withdrawal, bank transfer)
- `POST /wallet/lock` (internal: lock for order)
- `POST /wallet/release` (internal: release on delivery)

**DMO Subscription Integration:**
- Auto-deduct monthly fee from earnings
- 7-day low-balance warning
- 15-day grace period
- On unpaid: DMO level downgrade, continue until paid

**Module Dependencies:** GoSellr (Phase 5), DMO (Phase 4)

---

## Phase 7 — Complaint + Penalty System

**Objective:** User protection, fraud detection, and progressive penalties

**Deliverables:**

**Complaint Model:**
- `order_id`, `buyer_id`, `seller_id`, `type` (fraud/delay/damage/quality/other), `description`, `evidence[]` (images/docs), `status` (open/investigating/resolved/rejected), `decision`, `priority` (low/medium/high), `created_at`, `resolved_at`

**AI Review Engine:**
- **Fraud complaint** → auto-refund + flag seller + HIGH priority
- **Delay complaint** (>2h past delivery time) → partial refund (50%) + MEDIUM priority
- **Quality complaint** → escalate to franchise for in-person inspection
- **Damage complaint** → evidence review → refund or reject based on proof
- **Other** → manual DMO review required

**Penalty Rules:**
- 1st complaint: warning + review
- 2nd complaint: -0.5 STL
- 3rd complaint within 3 weeks: -2 STL
- Fraud confirmed: instant L0 (FREE)
- Inactivity (>60 days): -1 STL per month

**Penalty Service Functions:**
- `applyPenalty(user_id, type) → stl_change`
- `downgradeSTL(user_id, amount)`
- `flagUser(user_id, reason)`

**Complaint APIs:**
- `POST /complaints/create` (file complaint, attach evidence)
- `GET /complaints` (list for user)
- `GET /complaints/:id` (detail view)
- `POST /complaints/:id/resolve` (DMO finalize)
- `POST /complaints/:id/appeal` (user appeal decision)

**Integration with Finance Engine:**
- Valid complaint → auto-refund from escrow
- Fraud complaint → seller frozen, funds held
- Resolved complaint → seller pays EHB fee (0.5% of order), buyer full refund

**Module Dependencies:** GoSellr (Phase 5), Wallet (Phase 6), DMO (Phase 4)

---

## Phase 8 — Franchise + Rider + Delivery System

**Objective:** Multi-tier franchise model and last-mile delivery network

**Deliverables:**

**Franchise Model:**
- `user_id`, `type` (online/city/state/country), `area`, `stl_level`, `performance{orders,complaints,rating}`, `status` (active/inactive/suspended)
- Purchase price: Online 5K EHBGC, City 20K EHBGC, State 50K EHBGC, Country 100K+ EHBGC
- Activation: PSS L5 required
- Failure rule: 3 warnings → terminated → 80% refund, 20% penalty

**Rider Model:**
- `user_id`, `stl_level`, `vehicle_type` (bike/car/van), `availability` (online/offline), `earnings`, `rating`, `active_deliveries`
- Requirements: PSS L3+, valid vehicle docs, CRB approval

**Delivery Model:**
- `order_id`, `rider_id`, `franchise_id`, `status` (pending/picked/in_transit/delivered), `pickup_time`, `delivery_time`, `location{lat,lng,address}`, `proof` (photo/signature)

**Delivery Flow:**
1. Order ready (seller confirms)
2. DMO checks: seller allowed, rider available
3. Auto-assign: find highest STL available rider in area
4. Pickup: rider collects, timestamp + photo
5. In-transit: real-time tracking via socket.io
6. Delivery: photo proof + signature capture
7. Complete: wallet release, review period starts

**Self-Delivery Option:**
- Rule: seller wallet ≥ 2× product value
- No rider assignment, seller marks pickup/delivery
- Time limit: 4 hours from order

**Franchise Control:**
- Receive order notifications
- Monitor seller response time (alert if >30 min)
- Intervene if seller non-responsive (cancel order, refund, penalize seller)
- View area performance metrics
- Manage rider assignments

**Rider Earnings:**
- Base: ~150 PKR per order (configurable per franchise)
- Bonus: +10 PKR if delivered early
- Penalty: -20 PKR if late (>4h from pickup)
- Monthly: hours × PKR 150 = earnings

**Delivery APIs:**
- `POST /delivery/assign` (auto-assign rider)
- `POST /delivery/pickup` (rider confirms pickup)
- `POST /delivery/update-location` (real-time tracking)
- `POST /delivery/deliver` (proof upload + completion)
- `GET /delivery/:order_id` (tracking)

**Module Dependencies:** GoSellr (Phase 5), Complaint (Phase 7)

---

## Phase 9 — AI Marketplace + Search + Recommendations

**Objective:** Intelligent product discovery and personalized recommendations

**Deliverables:**

**Search Engine:**
- Text match: product name, description, category keywords
- STL ranking: sort by STL (highest first)
- Rating ranking: (STL + rating) descending
- Location-based: distance calculation, show nearby sellers first
- Filters: category, price range, STL level, delivery time, rating range

**Recommendation Engine:**
- Algorithm: filter products with STL ≥ 5, top 10 by (rating + STL)
- User history: track viewed/purchased items, show similar products
- Trending: today's top 5 products (by order count)
- Personalized: learn from search + purchase history, AI suggestions

**Search Ranking Formula:**
```
score = (stl_level × 0.4) + (rating × 0.3) + (order_count × 0.2) - (complaints × 0.1)
rank by: score DESC, distance ASC
```

**AI APIs:**
- `GET /ai/search?q=<query>&category=&price_min=&price_max=` (ranked results)
- `GET /ai/recommend/:user_id` (personalized recommendations)
- `GET /ai/trending` (today's trending products)
- `GET /ai/nearby?lat=&lng=&radius_km=` (location-based)

**Marketplace Dashboard:**
- Featured products (manual curated, STL L7+ only)
- Recommended for you (AI personalized)
- Trending now (real-time top sellers)
- Nearby sellers (location-aware)
- By category (organized tabs)

**Module Dependencies:** GoSellr (Phase 5), STL (Phase 3), DMO (Phase 4)

---

## Phase 10 — Notifications + Real-Time Tracking + Socket.IO

**Objective:** Live updates and user engagement

**Deliverables:**

**Notification Model:**
- `user_id`, `title`, `message`, `type` (order/complaint/payout/alert/promo), `read` (boolean), `action_url`, `created_at`, `expires_at`

**Notification Types & Triggers:**
- **Order placed** → sent to buyer + seller
- **Shipped** → sent to buyer
- **Delivered** → sent to both parties
- **Complaint filed** → sent to seller + franchise
- **Payment released** → sent to seller
- **STL changed** → sent to affected user
- **DMO fee due** → sent to user
- **Fraud detected** → sent to user + franchise + admin
- **Promotion** → sent to targeted users
- **Refund processed** → sent to buyer

**Socket.IO Real-Time Features:**
- User joins room: `socket.on('user_login', {user_id})`
- Server emits events: `socket.emit('order_update', {status, rider_location})`
- Delivery tracking: real-time rider location (GPS coordinates)
- Chat: between buyer and seller during order
- Notifications: push as they occur (no refresh needed)

**Notification APIs:**
- `POST /notifications/send` (internal: create notification)
- `GET /notifications/:user_id` (fetch unread)
- `PUT /notifications/:id/read` (mark as read)
- `DELETE /notifications/:id` (dismiss)
- Socket handlers: on message, on location, on status change

**Live Delivery Tracking:**
- Rider connects: `socket.emit('delivery_start', {order_id, rider_location})`
- Updates every 10 seconds: GPS lat/lng/accuracy
- Buyer sees real-time map with rider position
- ETA auto-calculated (distance ÷ avg speed)
- On delivery: final photo proof

**Module Dependencies:** Orders (Phase 5, 6), Delivery (Phase 8)

---

## Phase 11 — Admin Panel (Company Control & Oversight)

**Objective:** Internal EHB system administration

**Deliverables:**

**Admin Model:**
- `user_id`, `role` (super/admin/operator/finance/support), `permissions[]`, `status` (active/inactive), `created_by`, `created_at`
- **Requirements:** PSS L8+ AND 2FA mandatory AND EHB employee verification

**Admin Roles & Permissions:**

1. **Super Admin** — all permissions, founder only
2. **Admin** — user + finance + franchise management
3. **Operator** — order + complaint management
4. **Finance** — payment + earnings + fee management
5. **Support** — complaint resolution + user support

**Admin Features:**

**User Management:**
- Ban/unban users (block from platform)
- Change roles (seller → inspector, etc.)
- Override STL (manual level change)
- View user history (orders, complaints, activity)
- Freeze wallet (suspected fraud)
- Reset PSS/CRB verification

**Finance Control:**
- View all transactions (orders, refunds, payouts)
- Manage charges (fees, penalties)
- Approve payouts (>100K PKR)
- Freeze/release funds
- View commission splits
- Generate revenue reports

**Franchise Control:**
- Approve franchise applications
- Remove franchises
- Assign franchises to regions
- Monitor franchise performance
- View rider management
- Set area boundaries

**Complaint Control:**
- Override AI decisions (change refund amount)
- Force refund (emergency cases)
- Escalate to legal
- View complaint analytics
- Bulk operations (resolve similar complaints)

**STL Control:**
- Manual STL adjustment (up/down)
- Reset STL (on appeal)
- Lock STL (prevent changes)
- View STL history
- Recalculate all STLs (if formula updated)

**System Control:**
- Post announcements (all users or specific group)
- Update business rules (fees, timeouts, penalties)
- Enable/disable features (A/B testing)
- View system health (uptime, error rates)
- Database backups (trigger, restore)

**Fraud Dashboard:**
- High-risk users (auto-detected by Risk Engine)
- Suspicious patterns (multiple accounts, refund abuse)
- Block/allow list management
- IP reputation tracking
- Device fingerprint matching

**Admin APIs:**
- `POST /admin/create` (super admin only)
- `GET /admin` (list admins, super only)
- `PUT /admin/:id` (update permissions)
- `POST /admin/user-action` (ban/unban/override)
- `GET /admin/finance/transactions` (all payments)
- `POST /admin/finance/approve-payout`
- `GET /admin/analytics` (system metrics)
- `POST /admin/system/announcement` (broadcast)

**Admin Activity Logging:**
- Every action logged: who, what, when, IP address
- Audit trail: immutable change history
- Reports: daily admin activity summary

**Module Dependencies:** All phases (1–10)

---

## Phase 12 — Final Integration + Testing + Launch

**Objective:** Connect all systems, validate, deploy, and go live

**Deliverables:**

**System Integration:**
- Module interconnection: PSS → CRB → STL → DMO → GoSellr → Orders → Delivery → Complaints
- Data flow testing: order end-to-end from creation to delivery
- API integration tests: all endpoints linked, no dead paths
- Database transactions: ACID compliance for critical flows (wallet lock/release, order states)

**Testing Strategy:**

1. **Unit Tests**
   - STL calculation: 58 gold-master regression tests (`npm run test:stl`)
   - Wallet operations: lock/release/refund scenarios
   - Commission calculation: splits across tiers
   - Penalty rules: 3-complaint downgrade, fraud instant L0

2. **Integration Tests**
   - Order flow: PSS L2+ → add product → DMO gate → order create → wallet lock → rider assign → delivery → review → STL update
   - Complaint flow: file → AI review → decision → refund/reject → wallet adjustment
   - DMO subscription: auto-deduct, grace period, downgrade on non-payment
   - Franchise management: purchase → PSS L5 activation → performance tracking

3. **Performance Tests**
   - Search: <500ms for 10K products
   - STL calculation: <1s per user
   - Real-time tracking: <2s socket update latency
   - Database: concurrent 100+ orders/minute

4. **Security Tests**
   - JWT validation: all protected endpoints
   - SQL injection: parameterized queries, no string concat
   - Fraud detection: multiple accounts from same IP/phone
   - Wallet protection: no race conditions in lock/release

**Environment Configuration:**

**Development (.env.local):**
```
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ehb-dev
JWT_SECRET=dev-secret-key-change-in-prod
NODE_ENV=development
POLKADOT_RPC=wss://rpc.polkadot.io
SOCKET_PORT=3001
```

**Production (.env.prod / Vault):**
```
PORT=3000
MONGO_URI=production-vault-secret
JWT_SECRET=vault-secret-rotate-quarterly
NODE_ENV=production
POLKADOT_RPC=wss://rpc.polkadot.io (prod endpoint)
SOCKET_PORT=3001
```

**Deployment Targets:**
- **Dev:** Replit (auto-deploy on git push)
- **Staging:** DigitalOcean App Platform (weekly releases)
- **Production:** AWS EC2 (t3.large, multi-region, load balancer)

**Pre-Launch Checklist:**

Phase 1: Code Quality
- [ ] All unit tests passing (100% STL tests + 90% overall)
- [ ] Zero critical security findings
- [ ] Code review: 2 approvals per module
- [ ] Performance benchmarks: <1s for core flows

Phase 2: Infrastructure
- [ ] MongoDB backups automated (daily)
- [ ] Redis caching deployed (search, STL cache)
- [ ] CDN setup (images, static assets)
- [ ] Monitoring + alerting (uptime, error logs, slow queries)
- [ ] Log aggregation (ELK or Splunk)
- [ ] Rate limiting deployed (API, socket.io)

Phase 3: Security Hardening
- [ ] 2FA enabled for admins
- [ ] API keys rotated
- [ ] SSL certificates valid
- [ ] DDoS protection (Cloudflare)
- [ ] IP whitelist for admin panel
- [ ] Payment gateway PCI compliance verified

Phase 4: Soft Launch
- **Duration:** 4–8 weeks
- **Geography:** Islamabad (test city)
- **Initial users:** 20–50 sellers, 100–200 buyers
- **Metrics tracked:** daily orders, errors, complaints, revenue
- **Support:** 24/7 helpdesk (email + phone)

Phase 5: Monitoring & Iteration
- Daily standup: orders, errors, top complaints
- Weekly report: metrics, learnings, fixes
- Feedback loop: user complaints → quick fixes
- Performance tuning: slow queries, optimize DB indexes
- User onboarding: improve signup flow based on drop-off data

Phase 6: Official Launch
- **Expand to:** 5 cities (Islamabad, Karachi, Lahore, Rawalpindi, Multan)
- **Recruit franchises:** 10–20 city franchises
- **Marketing:** social media, influencer partnerships, referral program
- **Target:** 1K+ sellers, 10K+ buyers in month 1
- **Revenue goal:** PKR 5–10 lac/month

**Post-Launch (Months 2–6)**
- Add more cities (target 20 cities by month 6)
- Open master franchises (Punjab, Sindh, KPK, Balochistan)
- Introduce new industries (Legal, Medical, Education, Travel)
- Optimize AI recommendations (collect more user data)
- Scale infrastructure (upgrade servers, multi-region setup)

**Module Dependencies:** All (1–11)

---

## DMO Dashboard Specification

**Purpose:** Central control center for user operations and system governance

### Top Navigation Bar (Always Visible)

- **Profile Menu:** User name, profile picture, dropdown (Edit Profile, Change Password, Logout)
- **EHB STL Level:** Display current level + percentage (e.g., "L5 PROFESSIONAL · 72%")
- **DMO Level:** Display current DMO level + subscription status
- **PSS Level:** Identity verification status
- **CRB Level:** Certification status
- **Wallet Balance:** Available + Locked (e.g., "PKR 45,250 | Locked: 5,000")
- **Notifications Bell:** Unread count, dropdown list of recent (5) notifications
- **Settings Icon:** System preferences, theme toggle

### Main Overview Section (5 Cards - Responsive Grid)

**Card 1: STL Status**
- Title: "Your EHB STL"
- Display: Current level (L5), name (PROFESSIONAL), percentage (72%)
- Breakdown: PSS 40% | CRB 35% | DMO 40%
- Visual: Circular progress chart
- Actions: "View Details" (drill-in), "Improve STL" (suggestions)
- Growth: "↑ +5% this month"

**Card 2: Earnings Summary**
- Title: "Earnings"
- Display: Today (PKR 2,500), This Week (12,300), This Month (45,600)
- Visual: Line chart (7 days or 30 days toggle)
- Actions: "Withdraw", "Reinvest"
- Commission breakdown: "2% EHB fee"

**Card 3: Orders & Activity**
- Title: "Orders"
- Display: Total 156, Active 3, Completed 153
- Visual: Progress bar (3/156)
- Actions: "View All", "New Order"
- Next delivery: "Order #12345 arriving in 2h"

**Card 4: Complaints & Risk**
- Title: "Complaints & Risk"
- Display: Pending 1, Resolved 8, Risk Level (LOW)
- Visual: Status badge (green/yellow/red)
- Actions: "View Complaint", "Contact Support"
- Alert: "Good standing — no penalties"

**Card 5: DMO & Subscription**
- Title: "DMO Status"
- Display: Current level (L5), Subscription (Active), Fee (PKR 1,000), Expiry (2026-05-18)
- Visual: Next payment countdown
- Actions: "Upgrade", "View Billing"
- Status: "7 days remaining — auto-renew enabled"

### Left Sidebar Navigation (22 Modules in 8 Groups)

**Group 1: Core Trust (4 modules)**
1. EHB STL Management
2. PSS Monitoring
3. CRB Monitoring
4. DMO STL Control

**Group 2: Business Operations (3 modules)**
5. Products/Services
6. Orders
7. Customers

**Group 3: Finance (3 modules)**
8. Wallet
9. Earnings Engine
10. Refill/Topup

**Group 4: Risk & Protection (3 modules)**
11. Complaints
12. Up-Guard (Security)
13. Fraud Alerts

**Group 5: System Control (4 modules)**
14. Franchise Management
15. Applications
16. Approvals Panel
17. Rules & Policy

**Group 6: AI & Automation (3 modules)**
18. AI Assistant
19. Task System
20. Intelligence/Insights

**Group 7: Data & Monitoring (2 modules)**
21. Analytics Dashboard
22. Notifications & Alerts

**Group 8: Advanced (1 module)**
23. Blockchain Control

### Detailed Page Specifications

#### 1. EHB STL Management Page

**Header:** "Your EHB STL Level — Professional (L5)"

**Sections:**

a) **STL Breakdown Card**
   - Final STL: 72/100 (L5)
   - PSS Component: 40/100 (40% weight)
   - CRB Component: 35/100 (30% weight)
   - DMO Component: 40/100 (30% weight)
   - Visual: Pie chart showing contribution of each

b) **STL Trend Graph**
   - X-axis: Last 12 months
   - Y-axis: STL level (0–100)
   - Line chart with points
   - Hover: show exact date + level

c) **Issues Blocking Growth**
   - "PSS expiry in 30 days — renew to maintain L5"
   - "1 complaint pending — resolve to prevent downgrade"
   - Action buttons: "Renew PSS", "Resolve Complaint"

d) **Next Milestone**
   - "Reach L6 (STRONG OPERATOR) by completing CRB"
   - Progress: 72 → 78 needed
   - Steps: "Pass CRB inspection (+6 points)"
   - Button: "Apply for CRB"

e) **STL History Table**
   - Date, Level, Change, Reason
   - 10 most recent records
   - Expandable: click row to see full details

f) **Upgrade Request**
   - Button: "Request Manual Review (DMO)"
   - Text: "If you believe your STL should be higher, request a DMO review (free, 5-day turnaround)"

g) **Refill Calendar**
   - Shows upcoming PSS/CRB expiry dates
   - Reminder emails: 14 days before, 7 days, 1 day

---

#### 2. PSS Monitoring Page

**Header:** "Personal Security System (PSS) — Level 5"

**Sections:**

a) **Current PSS Status Card**
   - Level: 5 (ADVANCED)
   - Percentage: 40/50 documents verified
   - Status: Active, expires 2026-09-18
   - Display: green checkmark, "All documents verified"

b) **Document Verification Status**
   - Identity: CNIC ✅ (expires 2028-01-15)
   - Face: Biometric ✅ (verified 2026-01-18, valid 2 years)
   - Address: Gas/Utility Bill ✅ (expires 2026-08-18)
   - Financial: Bank Statement ✅ (1 of 3 months latest)
   - Behavioral: Action history ✅ (no fraud flags)
   
   Each with: Upload date, expiry, "Re-verify" button

c) **Upload Documents Modal**
   - Drag-drop zone for files (PDF, JPG, PNG)
   - File size limit: 10 MB
   - Document type dropdown
   - Submit button
   - Status: "Processing... check back in 1 hour"

d) **Re-Verification Flow**
   - "Your CNIC expires in 30 days"
   - Button: "Re-upload CNIC"
   - Instructions: "Clear photo, valid from/to dates visible"

e) **Document History**
   - Table: Document Type, Upload Date, Status, Expiry, Action
   - Sortable, filterable

f) **Fix Issues Section**
   - Alert: "⚠ Selfie needs better lighting (rejected 2026-04-10)"
   - Guidance: "Take photo in natural light, face center, no sunglasses"
   - Button: "Re-take Photo"

---

#### 3. CRB Monitoring Page

**Header:** "Central Record Blockchain (CRB) — Level 5"

**Sections:**

a) **CRB Status Card**
   - Level: 5 (PROFESSIONAL)
   - Status: Verified, expires 2026-10-18
   - On-chain hash: `0x7f3d4e...` (link to Polkadot explorer)
   - Display: green badge, "All certifications valid"

b) **Certifications List**
   - Certification 1: "E-Commerce Expert" · Issued 2025-12-01 · Expires 2026-12-01
   - Certification 2: "Basic Fraud Prevention" · Issued 2026-01-15 · Expires 2027-01-15
   - Each with: View Certificate PDF, Share, Print

c) **Inspection Reports**
   - Table: Inspection Date, Inspector, Type, Result, PDF
   - Most recent: "2026-03-15 · Physical Verification · APPROVED"
   - All status: "No issues found"

d) **Request New Inspection**
   - Button: "Apply for CRB Inspection"
   - Modal: Select inspection type (Physical/Skills/Background)
   - Estimated cost: PKR 2,500
   - Lead time: 5–7 business days
   - Submit

e) **Refill Schedule**
   - "Next refill due: 2026-10-18 (6 months)"
   - Button: "Schedule Refill Now"
   - Reminder: "You will receive reminders 30, 14, and 1 day before"

f) **On-Chain Verification**
   - Link to Polkadot blockchain
   - Hash verification interface
   - QR code for others to verify (public-facing)

---

#### 4. DMO STL Control Page

**Header:** "DMO (Governance) — Level 5, PKR 1,000/month"

**Sections:**

a) **DMO Level & Subscription**
   - Current level: L5 (PROFESSIONAL)
   - Monthly fee: PKR 1,000
   - Billing cycle: 2026-04-15 to 2026-05-15
   - Next deduction: 2026-05-15 (8 days)
   - Status: "Active" (green badge)
   - Button: "Upgrade to L6 (PKR 1,500)"

b) **Behavior & Activity Scores**
   - Behavior Score: 78/100 (responsive, honest, no fraud flags)
     - Metric 1: Response time to messages (95%)
     - Metric 2: Honesty rating (100% — no fraud)
     - Metric 3: Rule compliance (90% — 1 warning)
   
   - Activity Score: 65/100 (moderate platform usage)
     - Orders/month: 12 (average is 15)
     - Profile completeness: 100%
     - Engagement: 7 logins/week (good)
   
   - Risk Score: 12/100 (LOW, excellent)
     - Fraud indicators: 0
     - Complaint rate: 0.5% (very low)
     - Chargeback rate: 0%

c) **Improvement Suggestions**
   - "Increase order frequency to reach L6" (activity focus)
   - "Maintain 100% response rate" (behavior focus)
   - "Complete one CRB certification" (STL boost)
   - Buttons: "View CRB Options", "Join Training"

d) **AI Recommendations**
   - "Based on your profile, you qualify for Premium Seller badge" → Apply
   - "Try this new product category" (trending, matches your skills)
   - "Franchise opportunity in Karachi" (based on STL + location)

e) **Billing & Payment History**
   - Table: Date, Description (DMO Subscription L5), Amount (PKR 1,000), Status (Paid/Pending)
   - Most recent: 2026-04-15 · PAID · PKR 1,000
   - Download invoice button
   - Set autopay: enabled (toggle)

f) **Grace Period & Warnings**
   - None currently (payment current)
   - If late: "⚠ Payment due in 3 days · 15-day grace period active"
   - Button: "Pay Now"

---

#### 5. Wallet Page

**Header:** "Your Wallet — PKR 45,250 Available | PKR 5,000 Locked"

**Sections:**

a) **Balance Summary (3 Cards)**
   - Available: PKR 45,250 (can withdraw/use)
   - Locked: PKR 5,000 (in active orders, released on delivery)
   - Earning: PKR 12,350 (pending payouts this month)

b) **Quick Actions (Buttons)**
   - Deposit Funds (bank transfer, card)
   - Withdraw Funds (to bank account)
   - Lock Amount (for orders)
   - View Locked Details (list orders with locked funds)

c) **Transaction History**
   - Table: Date, Type, Description, Amount (+/-), Balance, Status
   - Filters: Type (all, deposit, withdrawal, order_lock, refund), Date range
   - 50 rows, paginated
   
   Example rows:
   - 2026-04-18 | Order Lock | Order #12345 locked for delivery | -2,500 | 47,750 | Pending
   - 2026-04-17 | Order Release | Order #12344 delivered & released | +2,450 | 50,250 | Completed
   - 2026-04-16 | Withdrawal | Transfer to Bank ending in 4521 | -10,000 | 47,800 | Completed
   - 2026-04-15 | Deposit | Bank transfer from account | +5,000 | 57,800 | Completed
   - 2026-04-10 | Refund | Order #12340 cancelled | +1,200 | 52,800 | Completed

d) **Deposit Form**
   - Amount: text input (PKR)
   - Payment method: dropdown (Bank Transfer, Card, JazzCash)
   - Bank account: auto-populated (user's saved account)
   - Submit button
   - Instruction text: "You will receive account details to transfer to"

e) **Withdraw Form**
   - Amount: text input (available balance max)
   - Bank account: dropdown (saved accounts) or add new
   - Add new account: modal with IBAN, account number, name
   - Processing fee: "PKR 50 + 0.5%"
   - Estimated arrival: "2–3 business days"
   - Submit button

f) **Locked Funds Detail**
   - List of active orders with locked funds
   - Table: Order ID, Amount Locked, Rider, Estimated Delivery, Action (View)
   - Example: Order #12345 · PKR 2,500 · Rider: Ali Ahmed · Delivering now · View

g) **Earning Breakdown (This Month)**
   - Commission earned: PKR 8,500
   - Refunds/penalties: -PKR 1,250
   - DMO subscription fee: -PKR 1,000
   - Net earning: PKR 6,250
   - Projected month-end (if constant): PKR 18,750

---

#### 6. Complaints Page

**Header:** "Complaints — 1 Pending, 8 Resolved"

**Sections:**

a) **Complaint Filters & Tabs**
   - Tabs: All, Pending, In Review, Resolved, Rejected
   - Filters: Date range, Type (fraud/delay/damage/quality/other), Status
   - Search: complaint ID or order reference

b) **Active Complaints Section (1 Pending)**
   - Card: Order #12345 · Buyer complaint · Filed 2 hours ago · Status: "AI Reviewing"
   - Issue: "Delivery delayed 3+ hours past promised time"
   - Evidence: 1 image attached
   - Actions: "Respond", "View Details"
   - Predicted outcome (AI): "Likely partial refund (50%)"

c) **Complaint Detail Modal (on click)**
   - Order info: Product, buyer, amount, time ordered
   - Complaint detail: Issue type, description, evidence (images)
   - Timeline: filed at, AI review started, expected decision date
   - Your response: text field, attach files
   - Button: "Submit Response"
   - AI decision (if ready): "Approved refund PKR 1,250" (green badge)

d) **Resolved Complaints (8 Total)**
   - Table: Date, Order, Type, Issue, Outcome, Resolution Date
   - Example rows:
     - 2026-04-10 | #12340 | Delay | 2h late delivery | Partial refund PKR 1,000 | Resolved
     - 2026-04-02 | #12325 | Damage | Item arrived broken | Full refund PKR 5,000 | Resolved
     - 2026-03-28 | #12310 | Quality | Not as described | Refund + relist | Resolved

e) **Stats Summary**
   - Complaint rate: 0.5% (1 per 200 orders) — "Excellent"
   - Average resolution: 24 hours
   - Refund rate: 60% (approved refunds / total complaints)
   - Good standing: ✅ "No penalties"

f) **Support Contact**
   - Button: "Contact Support Agent"
   - Helpdesk hours: Mon–Fri 9am–6pm, Sat 10am–2pm
   - Email: support@ehb.io
   - Phone: 0300-1234567

---

#### 7. AI Assistant Page

**Header:** "AI Assistant — Smart Recommendations & Support"

**Sections:**

a) **Chat Interface**
   - Chat history (scrollable)
   - Input box: "Ask me anything..."
   - Suggestions: "How do I improve STL?", "What should I sell?", "How do I prevent fraud?"
   - Send button (text or voice)

b) **AI Suggestions Board**
   - "Based on your profile:"
   - Suggestion 1: "You're ready for Master Franchise (PKR 50K) — expand to State level"
   - Suggestion 2: "Try these trending product categories: Smartphones, Home Decor, Clothing"
   - Suggestion 3: "Increase response time to improve your rating (currently 2h avg)"
   - Each with "Learn More" or "Take Action" button

c) **Task System**
   - Recommended tasks to earn STL + rewards:
   - Task 1: "Complete CRB certification" → +6 STL points, PKR 500 bonus
   - Task 2: "Resolve all pending complaints" → +3 STL points
   - Task 3: "Get 50 5-star reviews" → +4 STL points, Featured badge
   - Each with progress bar + "Start" button

d) **Intelligence/Insights**
   - "You're in top 15% of sellers by STL in Islamabad"
   - "Peak ordering hours: 6–8 PM, consider higher stock"
   - "Competitors in your category: 12 — you rank #3 by STL"

---

#### 8. Analytics Dashboard Page

**Header:** "Analytics — Your Performance Metrics"

**Sections:**

a) **KPI Cards (4-up)**
   - Total Orders: 156 | +12% from last month
   - Revenue: PKR 156,000 | +15% from last month
   - Avg Rating: 4.7/5 | ↑ +0.2 this month
   - Response Time: 45 min | ↓ -10 min (improvement)

b) **Orders Trend (Line Chart)**
   - X: Last 30 days (daily)
   - Y: Order count (0–10)
   - Hover: exact date + count
   - Toggle: 7-day, 30-day, 90-day views

c) **Revenue Breakdown (Pie Chart)**
   - By category: Electronics 45%, Fashion 30%, Home 25%
   - By product: Top 5 products + "Others"
   - Click to drill-down

d) **Customer Satisfaction (Gauge)**
   - Rating: 4.7/5 (excellent, green)
   - Repeat customer %: 35% (good)
   - Complaint %: 0.5% (excellent)

e) **Top Performing Products (Table)**
   - Rank, Product name, Orders, Revenue, Rating, Action (View)
   - Row 1: USB-C Cable · 23 orders · PKR 5,750 · 4.9/5 · View

f) **Geographic Performance (Map)**
   - Heatmap of Islamabad showing orders by area
   - Color intensity = order concentration
   - Click area to see breakdown

---

#### 9. Franchise Management Page (if user is franchisee)

**Header:** "Franchise Management — City Franchise (Islamabad)"

**Sections:**

a) **Franchise Overview Card**
   - Type: City Franchise
   - Area: Islamabad
   - STL Level: L6 (STRONG OPERATOR)
   - Performance: 450 orders/month, 4.6/5 rating, 2 complaints
   - Status: Active (green)
   - Action: "View Details"

b) **Sellers Under Franchise**
   - List/table of all sellers in area: 12 active sellers
   - Columns: Name, Business, STL, Orders, Rating, Status
   - Actions: View, Contact, Audit (for CRB inspectors)
   - Add seller: "Invite new seller"

c) **Rider Management (if applicable)**
   - List of riders: 5 active
   - Columns: Name, Vehicle, Availability, Earnings, Rating
   - Actions: View, Assign to area, Pause
   - Performance chart: orders/rider

d) **Performance Dashboard**
   - Orders/week: 90 (trending up ↑)
   - Revenue: PKR 180,000/month
   - Complaints: 2 (good)
   - Avg delivery time: 45 min

e) **Seller Support**
   - Notifications of seller issues (non-responsive, low STL)
   - Escalation queue (disputes, fraud alerts)
   - Communication log (emails, chats with sellers)

---

### Detailed API Data Structures

#### Dashboard API Response

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user_123",
      "name": "Ahmad Hassan",
      "email": "ahmad@example.com",
      "phone": "+923001234567",
      "profilePicture": "https://...",
      "roles": ["seller", "franchise"]
    },
    "stl": {
      "current": 72,
      "level": "L5",
      "name": "PROFESSIONAL",
      "percentage": 72,
      "components": {
        "pss": 40,
        "crb": 35,
        "dmo": 40
      },
      "trend": "↑ +5% this month"
    },
    "dmo": {
      "level": 5,
      "name": "PROFESSIONAL",
      "subscription": {
        "status": "active",
        "fee": 1000,
        "currency": "PKR",
        "nextDeduction": "2026-05-15",
        "daysRemaining": 8
      },
      "scores": {
        "behavior": 78,
        "activity": 65,
        "risk": 12
      }
    },
    "pss": {
      "level": 5,
      "status": "verified",
      "expiryDate": "2026-09-18",
      "documents": [
        { "type": "cnic", "status": "verified", "expiryDate": "2028-01-15" },
        { "type": "face", "status": "verified", "expiryDate": "2028-01-18" },
        { "type": "address", "status": "verified", "expiryDate": "2026-08-18" }
      ]
    },
    "crb": {
      "level": 5,
      "status": "verified",
      "expiryDate": "2026-10-18",
      "certifications": [
        { "name": "E-Commerce Expert", "issuedDate": "2025-12-01", "expiryDate": "2026-12-01" }
      ],
      "onChainHash": "0x7f3d4e..."
    },
    "wallet": {
      "available": 45250,
      "locked": 5000,
      "earning": 12350,
      "currency": "PKR"
    },
    "orders": {
      "total": 156,
      "active": 3,
      "completed": 153
    },
    "complaints": {
      "pending": 1,
      "resolved": 8,
      "riskLevel": "LOW"
    },
    "notifications": {
      "unread": 2,
      "recent": [
        { "id": "n1", "title": "Order #12345 delivered", "type": "order", "createdAt": "2026-04-18T14:30:00Z" }
      ]
    }
  }
}
```

#### STL Breakdown API

```json
{
  "status": "success",
  "data": {
    "finalSTL": 72,
    "level": "L5",
    "pssComponent": { "score": 40, "weight": 0.4, "contribution": 16 },
    "crbComponent": { "score": 35, "weight": 0.3, "contribution": 10.5 },
    "dmoComponent": { "score": 40, "weight": 0.3, "contribution": 12 },
    "formula": "(40 × 0.4) + (35 × 0.3) + (40 × 0.3) = 72",
    "history": [
      { "date": "2026-04-18", "stl": 72, "change": "+2", "reason": "Order completed" },
      { "date": "2026-04-15", "stl": 70, "change": "-0", "reason": "Monthly recalc" }
    ],
    "nextMilestone": { "level": "L6", "targetSTL": 78, "stepsRequired": ["+3 for CRB cert", "+2 for 10 orders"] }
  }
}
```

#### Wallet Transactions API

```json
{
  "status": "success",
  "data": {
    "balance": {
      "available": 45250,
      "locked": 5000,
      "earning": 12350
    },
    "transactions": [
      {
        "id": "txn_001",
        "date": "2026-04-18T10:30:00Z",
        "type": "order_lock",
        "description": "Order #12345 locked for delivery",
        "amount": -2500,
        "balanceAfter": 47750,
        "status": "pending",
        "relatedOrder": "12345"
      },
      {
        "id": "txn_002",
        "date": "2026-04-17T16:15:00Z",
        "type": "order_release",
        "description": "Order #12344 delivered",
        "amount": 2450,
        "balanceAfter": 50250,
        "status": "completed",
        "relatedOrder": "12344"
      }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 234 }
  }
}
```

#### Complaint Data API

```json
{
  "status": "success",
  "data": {
    "complaints": [
      {
        "id": "cmp_001",
        "orderId": "12345",
        "buyerId": "buyer_456",
        "sellerId": "seller_789",
        "type": "delay",
        "description": "Delivery delayed 3+ hours",
        "status": "ai_reviewing",
        "priority": "medium",
        "filedAt": "2026-04-18T12:00:00Z",
        "evidence": [
          { "type": "image", "url": "https://..." }
        ],
        "aiPrediction": { "outcome": "partial_refund", "amount": 1250, "confidence": 0.92 },
        "sellerResponse": null,
        "decision": null
      }
    ],
    "stats": {
      "total": 9,
      "complaintRate": "0.5%",
      "avgResolutionHours": 24,
      "refundRate": "60%"
    }
  }
}
```

#### Franchise Data API

```json
{
  "status": "success",
  "data": {
    "franchise": {
      "id": "frc_001",
      "userId": "user_123",
      "type": "city",
      "area": "Islamabad",
      "stlLevel": 6,
      "status": "active",
      "performance": {
        "ordersPerMonth": 450,
        "rating": 4.6,
        "complaints": 2,
        "revenue": 180000
      },
      "sellers": [
        { "id": "sel_001", "name": "Tech Store", "stlLevel": 5, "orders": 45, "rating": 4.8 }
      ],
      "riders": [
        { "id": "rdr_001", "name": "Ali Ahmed", "vehicle": "bike", "availability": true, "earnings": 15000 }
      ]
    }
  }
}
```

---

## Related Documents

- **`EHB-MASTER-SYSTEM-PHASES.md`** — Phase-wise architecture overview (9 phases)
- **`PSS.md`** — Personal Security System detailed spec
- **`CRB.md`** — Central Record Blockchain rules
- **`STL.md`** — Service Trust Level formula + gold-master tests
- **`DMO.md`** — Governance system, 7 engines, SaaS billing
- **`JPS.md`** — Job Profile & Skill career platform
- **`Franchise.md`** — Franchise 4-tier model

---

---

## Phase 13 — Affiliate System (Growth Engine)

**Goal:** User → Refer → Earn → Network grow → System scale

### Core Features
- Unique referral link per user (auto-generated at signup)
- Auto tracking of referral chain
- Multi-level commission distribution

### Commission Types (5 core)
| Type | Description |
|------|-------------|
| Direct Bonus | Immediate reward when referral signs up + first purchase |
| Level Bonus | Multi-level earning from referral network depth |
| Auto Pool Bonus | System-wide pool distributed to top performers |
| Franchise Bonus | Franchise earns from all users in territory |
| Product Commission | % of each sale attributed through referral chain |

### Data Model
```json
{
  "user_id": "string",
  "referral_code": "string",
  "referred_by": "string",
  "referrals": ["user_ids"],
  "level": "number (depth in network)",
  "earnings": {
    "direct": 0,
    "level": 0,
    "pool": 0,
    "total": 0
  }
}
```

### Flow
1. User joins → gets unique referral link
2. Shares link → new user signs up via link
3. System tracks referral chain (parent → child)
4. On qualifying action (purchase/order) → commission auto-distributed
5. Multi-level: Level 1 (direct) earns most, Level 2-5 earn decreasing %

### API Endpoints
- POST /affiliate/register — Generate referral code
- GET /affiliate/network/:user_id — View referral tree
- GET /affiliate/earnings/:user_id — View commission earnings
- POST /affiliate/withdraw — Withdraw affiliate earnings to wallet

---

## Phase 14 — Blockchain Integration (Trust + Transparency)

**Goal:** Immutable proof of trust, certificates, and token transactions

### Strategy
| Phase | Chain | Purpose |
|-------|-------|---------|
| Phase 1 | BSC (BEP-20) | EHBGC token, basic transfers |
| Phase 2 | Polkadot | Cross-chain, parachain for EHB ecosystem |

### What Goes On-Chain
1. **EHBGC Token** — wallet balances, transfers, lock/unlock events
2. **CRB Certificates** — inspection passed → SHA-256 hash → store on-chain → verifiable anytime
3. **STL Proofs** — user STL snapshot at key moments → hash → on-chain proof (tamper-proof trust history)
4. **Audit Trail** — critical system decisions (franchise removal, fraud flag, L0 drop)

### Flow
1. Event occurs (CRB inspection pass, STL change, large transfer)
2. System generates SHA-256 hash of event data
3. Hash stored on BSC/Polkadot smart contract
4. Anyone can verify hash against original data
5. Immutable — cannot be altered after storage

### API Endpoints
- POST /blockchain/hash — Store event hash
- GET /blockchain/verify/:hash — Verify hash on-chain
- GET /blockchain/history/:entity_id — Get on-chain history

---

## Phase 15 — Multi-Industry Expansion

**Goal:** Connect all EHB industries through unified PSS+CRB+DMO+STL framework

### Core Industries (Post-GoSellr)

| Industry | Code | Key Features |
|----------|------|-------------|
| Legal | OLS | Lawyers, legal services, case tracking, document management |
| Medical | WMS | Doctors, hospitals, appointments, prescriptions, telemedicine |
| Education | HPS/OBS | Courses, teachers, exams, certifications, online classes |
| Jobs | JPS | Already defined (v1.1) — salary, contracts, AI matching |
| Travel | AGTS | Hotels, flights, guides, bookings |

### Unified Flow
1. User logs into EHB Dashboard
2. Selects industry (GoSellr / OLS / WMS / HPS / JPS / AGTS)
3. Same PSS + CRB + DMO + STL apply across ALL industries
4. Industry-specific features load (lawyers for OLS, doctors for WMS, etc.)
5. Cross-industry STL: user's trust score carries across all platforms

### Architecture
- Each industry = separate module under /src/modules/{industry}/
- Shared: auth, PSS, CRB, STL, DMO, wallet, complaints
- Industry-specific: listings, bookings, contracts, scheduling

### Priority Order
| Order | Industry | Reason |
|-------|----------|--------|
| 1 | JPS | Already defined, quick to build |
| 2 | OLS | High demand in Pakistan |
| 3 | WMS | Essential service |
| 4 | HPS/OBS | Education market huge |
| 5 | AGTS | Travel last (seasonal) |

---

## Phase 16 — Payment Gateway Integration

**Goal:** Real money in/out of EHB wallet

### Methods
| Gateway | Type | Region | Priority |
|---------|------|--------|----------|
| JazzCash | Mobile wallet | Pakistan | Phase 1 |
| Easypaisa | Mobile wallet | Pakistan | Phase 1 |
| Bank Transfer | Direct bank | Pakistan | Phase 1 |
| Stripe | Card + international | Global | Phase 2 |

### Flow
1. User initiates deposit → selects gateway (JazzCash/Easypaisa/Bank)
2. Redirect to gateway payment page
3. User completes payment
4. Gateway sends webhook to EHB backend
5. Backend verifies webhook signature
6. Wallet balance updated
7. Transaction logged in audit trail

### Security
- Webhook signature verification (HMAC)
- No fake payment acceptance
- Auto reconciliation system (daily match gateway records vs wallet)
- Failed payment retry (3 attempts)

### API Endpoints
- POST /payment/deposit — Initiate deposit
- POST /payment/webhook — Gateway callback
- POST /payment/withdraw — Initiate withdrawal
- GET /payment/status/:id — Check payment status

---

## Phase 17 — Mobile App

**Goal:** Full EHB experience on Android + iOS

### Technology
- **React Native** — 1 codebase → Android + iOS
- Shared API backend (same as web)
- Real-time sync via Socket.IO

### App Features
| Feature | Description |
|---------|-------------|
| All dashboards | DMO, PSS, CRB, STL, Wallet |
| Push notifications | Firebase Cloud Messaging |
| Live tracking | Rider location on map (Google Maps) |
| AI marketplace | Search, filter, recommendations |
| Biometric auth | Fingerprint/Face ID for login + wallet |
| Offline mode | Basic browsing, queued actions sync when online |

### Development Priority
| Screen | Priority |
|--------|----------|
| Auth + PSS | P1 |
| Marketplace (GoSellr) | P1 |
| Wallet | P1 |
| Orders + Tracking | P1 |
| DMO Dashboard | P2 |
| Admin Panel | P3 |

---

## Execution Priority (Founder Strategy)

| Priority | Phase | Reason |
|----------|-------|--------|
| 1st | Phase 16 — Payment Gateway | Real money = real business |
| 2nd | Phase 13 — Affiliate System | Growth engine, user acquisition |
| 3rd | Phase 17 — Mobile App | User experience, market reach |
| 4th | Phase 15 — Multi-Industry | Ecosystem expansion |
| 5th | Phase 14 — Blockchain | Advanced trust layer (can wait) |

---

## Changelog

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-18 | 1.1 | Added Phase 13-17: Affiliate system (5 commission types), Blockchain (BSC→Polkadot), Multi-industry expansion (OLS/WMS/HPS/JPS/AGTS), Payment gateway (JazzCash/Easypaisa/Bank/Stripe), Mobile app (React Native). Added execution priority order. |
| 2026-04-18 | 1.0 | Complete 12-phase technical build blueprint. Covers foundation, auth+PSS, CRB+STL, DMO (7 engines), GoSellr, wallet+payments, complaints+penalties, franchise+delivery, AI marketplace, real-time+notifications, admin panel, final integration+launch. Includes detailed DMO dashboard specification (23 modules, 9 pages), complete API data structures (dashboard, STL, wallet, complaints, franchise), all MongoDB models, system flows, testing strategy, deployment checklist, soft launch plan, 6-month roadmap. |

---

*EHB Technologies (Pvt.) Ltd. · Build Blueprint v1.0 · 2026-04-18*
