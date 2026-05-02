# EHB PHASE 2 — GOSELLR + COMPLAINTS + RIDERS + REAL-TIME

> Builds on Phase 1 (DMO shell + Franchise + AI Services Marketplace).
> **Target:** 10 weeks to a full e-commerce + ops-enabled platform.
>
> **Last Updated:** 2026-04-21 · **Version:** 1.0

---

## 1. MISSION

Turn Phase 1's skeleton into a **working marketplace** where real orders flow
end-to-end: buyer places an order → escrow locks funds → rider assigned →
delivered → rated → commission settled across 40/25/20/15 franchise tiers →
complaints flow to DMO with progressive penalty ladder → all live-streamed to
operators via Socket.IO.

## 2. SIX PILLARS

### A. GoSellr E-commerce Core (Wave 5)
- Product listings with STL-gated visibility
- Seller storefronts + ratings
- Buyer cart + checkout with escrow
- Order lifecycle: pending → paid → ready → assigned → delivered → settled
- Review system with STL-tier segmentation
- Ranking engine: STL × rating × complaints × delivery speed × freshness

### B. Complaints + Penalty Ladder (Wave 7)
- Complaint filing by any party in an order
- SLA timer per tier (24h → 48h → 72h escalation)
- Progressive penalty: 1st complaint = warning, 2nd = fine, 3rd within 3 weeks = STL −2, fraud = L1 FREE
- Appeal flow routed to DMO_MANAGER

### C. Rider + Delivery (Wave 8)
- Rider onboarding with CRB verification
- Assignment algorithm: STL × rating × distance × active orders
- Real-time delivery tracking (pickup → in-transit → delivered)
- SLA timers + rider incentives
- Self-delivery vs franchise-rider vs 3rd-party (stub)

### D. Commission Settlement (Wave 8 cont.)
- Real 40/25/20/15 split triggered on order completion
- Earnings ledger per franchise tier (Sub/Master/Corporate)
- Payout scheduling (weekly batch)
- Rider earnings (10% of order value)

### E. Real-Time Notifications (Wave 10)
- Socket.IO server on API service
- Namespaces: `/dmo`, `/orders`, `/delivery`
- Events: `franchise:new-application`, `order:placed`, `order:paid`,
  `order:ready`, `rider:assigned`, `order:delivered`, `complaint:filed`,
  `stl:drop-alert`, `ai:flag`
- Persistent `Notification` collection for offline catch-up

### F. CRB Exams + Certification (Wave 3 revisit)
- Exam creation (MCQ / Practical / Video)
- AI-proctored MCQ runner
- Pass/fail → CRB level update + blockchain hash anchor
- 6-month refill reminder system

---

## 3. NEW MONGODB COLLECTIONS

| Collection | Purpose |
|-----------|---------|
| `products` | Product catalog (seller, price, STL visibility gate) |
| `orders` | Order lifecycle + escrow state |
| `reviews` | Buyer → product/seller reviews with STL-tier flag |
| `riders` | Rider profiles, zones, active status, earnings |
| `deliveries` | Per-order delivery tracking, events, GPS snapshots |
| `complaints` | Filed complaints + SLA + resolution |
| `penalties` | Applied penalties per user (ladder tracking) |
| `notifications` | Persistent notification queue |
| `crbexams` | Exam definitions |
| `crbattempts` | User exam attempts + results |

## 4. NEW API ROUTES

### GoSellr
- `GET /api/gosellr/products` — paginated, filtered, STL-gated
- `GET /api/gosellr/products/:id` — detail + MIN-chain STL
- `POST /api/gosellr/products` — seller creates listing (STL L4+ gate)
- `PUT /api/gosellr/products/:id` — update
- `GET /api/gosellr/sellers/:id` — storefront + stats

### Orders
- `POST /api/orders` — create cart → order, locks escrow
- `GET /api/orders/my` — buyer history
- `GET /api/orders/:id` — detail with MIN-chain verification
- `POST /api/orders/:id/mark-ready` — seller marks ready
- `POST /api/orders/:id/confirm-delivery` — buyer confirms → triggers commission
- `POST /api/orders/:id/cancel` — with refund logic

### Reviews
- `POST /api/reviews` — after delivery
- `GET /api/reviews/product/:id` — with tier segmentation
- `GET /api/reviews/seller/:id`

### Riders & Delivery
- `POST /api/riders/apply` — apply to become rider
- `GET /api/riders/me` — rider dashboard
- `POST /api/riders/:id/availability` — toggle online
- `POST /api/delivery/:orderId/assign` — auto-assign rider
- `POST /api/delivery/:id/event` — status update (picked-up, in-transit, delivered)
- `GET /api/delivery/:id` — tracking

### Complaints & Penalties
- `POST /api/complaints` — file with tier auto-classification
- `GET /api/complaints/my` — user's complaints
- `GET /api/complaints/:id`
- `POST /api/complaints/:id/resolve` — DMO action
- `POST /api/complaints/:id/appeal`
- `GET /api/penalties/my` — user's penalty history

### CRB
- `GET /api/crb/exams` — available exams for user's current level
- `POST /api/crb/exams/:id/start` — begin attempt
- `POST /api/crb/attempts/:id/submit` — submit answers → auto-grade → level update
- `GET /api/crb/certificates/my`

### Notifications
- `GET /api/notifications/my` — paginated
- `POST /api/notifications/:id/read`
- `POST /api/notifications/read-all`

---

## 5. NEW NEXT.JS ROUTES

| Route | Purpose |
|-------|---------|
| `/gosellr` | Marketplace with filters + STL badges on cards |
| `/gosellr/[productId]` | Product detail + seller info + MIN-chain + reviews |
| `/gosellr/seller/[id]` | Seller storefront + products + review aggregate |
| `/cart` | Cart (in-memory state via React Context) |
| `/checkout` | Single-step checkout + escrow confirm |
| `/orders` | Buyer order history |
| `/orders/[id]` | Order detail + live delivery tracking |
| `/rider` | Rider signup/dashboard toggle |
| `/complaints/file` | Complaint form per order |
| `/complaints/my` | User's filed complaints |
| `/crb/exams` | Available exams |
| `/crb/exams/[id]` | Exam runner (MCQ) |

### DMO workspace updates
- `/dmo/complaints` now wired to real queue (replaces stub)
- `/dmo/riders` — new — rider approvals + live map
- `/dmo/orders` — new — flagged orders, refund queue
- `/dmo/notifications` wired to real Notification collection
- Header notification badge with unread count (Socket.IO driven)

---

## 6. 10-WEEK TIMELINE

| Week | Focus |
|------|-------|
| 13 | Product model, /api/gosellr/products, /gosellr marketplace page |
| 14 | Order model with escrow, /api/orders, checkout flow, cart context |
| 15 | Review model, rating aggregation, seller storefront page |
| 16 | Ranking engine (STL × rating × complaints), /gosellr filters + sort |
| 17 | Rider + Delivery models, assignment algorithm, /rider dashboard |
| 18 | Delivery tracking UI, SLA timers, commission settlement on confirm |
| 19 | Complaint filing, penalty ladder, /complaints/* pages |
| 20 | DMO /dmo/complaints + /dmo/riders + /dmo/orders wired |
| 21 | Socket.IO server, namespaces, real-time notification bell |
| 22 | CRB exams, MCQ runner, level update, 6-month refill, final polish |

---

## 7. ACCEPTANCE CRITERIA

- Buyer can browse `/gosellr` → add to cart → checkout → pay (stub) → see order in `/orders/[id]`
- Seller (STL L4+) can list a product, receive an order, mark ready
- Rider (PSS L3+) gets auto-assigned → updates status through delivery → buyer confirms
- Commission settles: 70% seller, 10% rider, 10% franchise network (split 40/25/20/15), 10% EHB
- Buyer files a complaint → routes to DMO queue → resolved → penalty auto-applied to offender
- 3 complaints in 3 weeks triggers STL −2 automatically
- Rider completing 10 deliveries with 4.5+ rating gets STL boost
- DMO dashboard live-updates via Socket.IO (no refresh needed)
- CRB exam pass auto-updates CRB level + anchors hash
- 58 STL tests still pass
- All routes gracefully degrade when Mongo disconnected

---

## 8. BUILDS ON PHASE 1

| Phase 1 capability | Phase 2 extension |
|---------------------|--------------------|
| STL formula + MIN-chain | Used in product validation + commission gate |
| Franchise + serial | Commission settlement writes to Transaction with franchise splits |
| Wallet + lock/unlock | Escrow lock on order creation, release on delivery confirm |
| PSS | Rider PSS gate (L3+), seller PSS gate (L4+) |
| Audit log | All order/complaint/penalty events logged |
| Blockchain anchor | Order completion + CRB cert hashed |

---

*EHB Technologies (Pvt.) Ltd. — Phase 2 Plan v1.0 — 2026-04-21*
