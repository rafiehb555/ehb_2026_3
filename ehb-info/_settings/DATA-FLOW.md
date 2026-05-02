# EHB · Data Flow Map (the GOLD file for developers)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Show how data + events flow through the entire EHB system end-to-end.

---

## 🔥 Master flow (every transaction)

```
USER ACTION
   ↓
UI Layer (15-ui-system/)
   ↓
Action Map → API Endpoint
   ↓
API receives → Validate (auth + permissions)
   ↓
Flow Engine (4-flows/)
   ↓
Trust Core check (PSS+CRB+DMO+STL via 3-departments/)
   ↓
Wallet Core (lock/escrow check)
   ↓
Industry-specific rules (3-departments/industries/<CODE>.md)
   ↓
AI Core (recommendation / fraud / matching)
   ↓
Persistence (DB)
   ↓
Blockchain anchor (audit)
   ↓
Notification (Socket.IO real-time)
   ↓
Response to UI
   ↓
STL update (event-driven)
   ↓
Dashboard refresh
```

---

## 📊 Per-action data flow examples

### 1. User places order

```
[User clicks "Buy Now"]
   ↓
UI sends POST /api/orders/create
   ↓
API: validates user STL ≥ industry-min
   ↓
Flow Engine: triggers ORDER-FLOW.md state DRAFT → SUBMITTED
   ↓
Wallet: holds buyer payment in escrow (100% per ESCROW-FLOW.md)
   ↓
DB: insert order row · status PAYMENT_HELD
   ↓
Blockchain: hash order · queue for daily anchor
   ↓
Seller notified via Socket.IO
   ↓
Order in seller queue
```

### 2. Seller delivers, order completes

```
[Seller marks fulfilled · or auto-after-N-days]
   ↓
API: POST /api/orders/<id>/fulfill
   ↓
Flow Engine: ORDER-FLOW state IN_PROGRESS → FULFILLED
   ↓
Buyer notified · review window opens
   ↓
[7 days pass · no dispute]
   ↓
Auto-trigger: ORDER-FLOW state FULFILLED → SETTLED
   ↓
Wallet: split escrow per 70/10/10/10
   ↓ (Seller / Rider / Franchise / EHB)
Trust Core: STL update event
   ↓ (seller +0.1 to +0.2 per 5-star)
DB: transaction rows inserted
Blockchain: settlement anchored
Buyer + Seller dashboards update real-time
```

### 3. STL update propagation

```
[Event: 5-star review on ORD-1042]
   ↓
DMO event bus: order.reviewed { sellerId, rating, reviewerSTL }
   ↓
STL Service: recompute(sellerId)
   ↓
PSS_pts + CRB_pts + DMO_pts (DMO_pts increased due to review)
   ↓
Apply industry boost
   ↓
MIN-chain check (Owner → Company → Seller → Product)
   ↓
New STL = MIN(score/1.2, lowest+1)
   ↓
DB: update users.stl
Polkadot: anchor STL Δ
   ↓
Socket.IO emit: stl.update { userId, oldSTL, newSTL, reason }
   ↓
User dashboard updates instantly
   ↓
DMO dashboard live feed appends
   ↓
If STL crossed level boundary: trigger badges + notifications
```

### 4. Fraud detection flow

```
[AI Anomaly Detector flags suspicious pattern]
   ↓
DMO Up-Guard event: fraud.suspected { userId, pattern, confidence }
   ↓
DMO Senior reviews
   ↓
If confirmed:
   ↓
SLASHING-RULES applied (100% for T6, etc.)
   ↓
Wallet: burn locked EHBGC
DB: update user status · suspended/banned
Blockchain: slash event anchored
   ↓
Cascade: Owner's other entities affected (per cross-entity rules)
   ↓
Notifications: user notified · 7-day appeal window
   ↓
Public audit log entry (regulator-friendly)
```

### 5. Lock + Yield streaming

```
[Daily cron at 00:00 UTC]
   ↓
For each active lock:
   ↓
Calculate daily yield = locked × (rate/365)
   ↓
Wallet: credit yield to user
   ↓
DB: yield transaction row
Blockchain: monthly batched anchor
   ↓
User dashboard: yield ticker updates
Treasury: deduct yield total · update reserves
```

### 6. Franchise refill cycle

```
[Quarterly cron: refill due check]
   ↓
For each franchise:
   ↓
If refill not submitted within window:
   ↓
Penalty per FRANCHISE-PENALTY.md:
   1st miss: warning
   2nd miss: -1 STL + 5% slash
   3rd+: -3 STL + 25% slash + DMO review
   ↓
Notifications · franchise dashboard alert
   ↓
If submitted:
   ↓
DMO reviews + approves
   ↓
Cycle reset · streak bonus considered
```

---

## 🗺 System component map

```
┌─────────────────────────────────────────────────────┐
│              UI Layer (apps/web/)                    │
│  Pages · Components · Settings · Action handlers     │
└─────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────┐
│              API Layer (services/api/)               │
│  Routes · Validation · Auth · Rate limit             │
└─────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────┐
│              Flow Engine (universal)                 │
│  Order/Payment/Dispute/Refund/Escrow flows           │
└─────────────────────────────────────────────────────┘
        ↓ ↑          ↓ ↑          ↓ ↑          ↓ ↑
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  TRUST   │  │  WALLET  │  │    AI    │  │BLOCKCHAIN│
│  Core    │  │   Core   │  │   Core   │  │   Core   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────┐
│              Persistence (MongoDB)                   │
│  Users · Orders · Reviews · Locks · Disputes         │
└─────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────┐
│              Event Bus (Socket.IO + Redis)           │
│  stl.update · order.* · dmo.events · etc.            │
└─────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────┐
│              Industry Layer (config-only)            │
│  industries/<CODE> → CRB checklist + AI prompts      │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Event types catalog

| Event | Trigger | Consumers |
|---|---|---|
| `user.signup` | new registration | Wallet (create), STL (init L1) |
| `user.kyc.approved` | PSS verified | STL (recalc), Notifications |
| `order.submitted` | order placed | Wallet (escrow), Seller, DMO |
| `order.fulfilled` | seller marks done | Buyer (review window), STL |
| `order.settled` | payout completed | Wallet (distribute), Treasury |
| `order.disputed` | complaint filed | DMO (triage), AI Mediator |
| `stl.update` | any STL Δ | UI, Blockchain (anchor), Cache |
| `lock.created` | EHBGC locked | Wallet, STL (boost), Yield |
| `lock.unlocked` | premature/grace | Wallet (penalty), STL (downgrade) |
| `slash.executed` | DMO slashes | Wallet, Cascade engine, Audit |
| `refill.submitted` | franchise refill | DMO (review), STL maintain |
| `refill.missed` | window expired | Penalty engine |
| `complaint.filed` | user files | AI Mediator → DMO |
| `fraud.suspected` | AI flag | Up-Guard, DMO Senior |
| `franchise.applied` | new franchise | Onboarding flow |
| `industry.added` | new industry live | Registry, UI updates |

---

## 📦 Data persistence rules

| Entity | Primary store | Cache | Audit anchor |
|---|---|---|---|
| Users | MongoDB | Redis 5min | Polkadot on STL change |
| Orders | MongoDB | Redis 60s | Daily batch on settle |
| Reviews | MongoDB | Redis 60s | Monthly batch |
| Locks | MongoDB + Smart Contract | Redis 30s | On-chain primary |
| Slashing events | MongoDB | (no cache) | On-chain immediate |
| KYC docs | Encrypted MongoDB + S3 | (no cache) | Hash anchored |
| STL deltas | Time-series (MongoDB) | Redis | Per-event hash |
| Franchise contracts | MongoDB + Smart Contract | (no cache) | On-chain primary |

---

## 🔐 Security checkpoints

Every flow has these checkpoints:

1. **Auth check** (JWT valid, user exists)
2. **Permission check** (role allows this action)
3. **STL gate** (user STL meets minimum for action)
4. **Rate limit** (anti-abuse)
5. **AML scan** (financial actions)
6. **AI fraud check** (real-time)
7. **DMO override possible** (admin can stop)

If ANY fails → action blocked, user notified, audit logged.

---

## Cross-references

- Core Engine: `EHB-CORE-ENGINE.md`
- Source of Truth: `SOURCE-OF-TRUTH.md`
- Action Map: `15-ui-system/ACTION-MAP.md`
- All flows: `4-flows/`
- API: `5-specs/EHB-API-SPEC.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial data flow map · 6 flow examples · component diagram · 16 events |
