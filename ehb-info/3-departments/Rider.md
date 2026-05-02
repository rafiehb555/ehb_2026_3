# Rider — EHB DMO Delivery System

**Status:** Canonical spec (v1.0) · 2026-04-19
**Related:** `DMO.md` · `GoSellr.md` · `STL.md` · `Commission.md`

---

## 1. Purpose

The Rider system manages all delivery agents in the EHB ecosystem. Riders are the physical execution layer of DMO (Delivery Management Operations), handling last-mile delivery for GoSellr marketplace orders.

---

## 2. Rider Dashboard (9 Sections)

### 2.1 Dashboard (Overview)
- Today's earnings
- Active delivery (if any)
- Available delivery requests nearby
- STL level + score
- Performance summary (today/week)
- Quick accept button

### 2.2 Delivery Requests
- Available orders in rider's area
- Order details preview (pickup, dropoff, distance, estimated pay)
- Accept/decline buttons
- Priority sorting by STL (higher STL = better orders first)
- Batch delivery option (multiple nearby orders)

### 2.3 Active Delivery
- Current delivery map (live GPS)
- Pickup point details (seller info, package size)
- Dropoff point details (buyer info, address)
- Navigation integration (Google Maps/Waze)
- Status update buttons (picked up → in transit → delivered)
- Photo proof of delivery
- Customer contact (masked phone number)

### 2.4 Earnings
- Today's earnings breakdown
- Weekly/monthly summary
- Per-delivery earning detail
- Bonus earnings (peak hours, long distance)
- Penalty deductions
- Withdrawal to wallet

### 2.5 Issues & Disputes
- Report delivery issue (wrong address, customer unavailable)
- Dispute resolution (order damaged, customer claim)
- Accident/emergency reporting
- Order cancellation handling
- Support chat

### 2.6 STL (Service Trust Level)
- Current STL level + score
- STL factors breakdown
- Delivery success rate
- On-time percentage
- Customer rating average
- Upgrade path requirements

### 2.7 Location & Availability
- Set availability hours
- Define delivery zone (map-based)
- Vehicle type selection (bike/car/van)
- Real-time GPS status
- Break/offline toggle

### 2.8 Notifications
- New delivery request alerts
- Earnings notifications
- STL change alerts
- System announcements
- Safety alerts (weather, traffic)

### 2.9 Settings
- Profile management
- Vehicle details
- Payment preferences
- Notification preferences
- Emergency contacts
- Account security

---

## 3. Rider Verification Flow

```
1. User applies as rider → JPS Rider Profile
2. PSS Level 2 verification (ID + background check)
3. Basic Training (app usage + delivery protocol + safety)
4. DMO Assignment (area + vehicle verified)
5. STL Level = BASIC → Start deliveries
6. Performance tracking → STL changes dynamically
```

---

## 4. Rider STL Controls

| STL Level | Order Priority | Delivery Zone | Earning Multiplier | Batch Limit |
|---|---|---|---|---|
| FREE (L1) | Last | Small (3km) | 1.0x | 1 |
| BASIC (L2) | Normal | Medium (5km) | 1.0x | 2 |
| NORMAL (L3) | Good | Standard (8km) | 1.1x | 3 |
| STANDARD (L4) | High | Extended (12km) | 1.15x | 4 |
| ADVANCED (L5)+ | Priority | Full city | 1.2x+ | 5+ |

---

## 5. Rider Earning Model

- **Per-delivery fee:** Base rate + distance rate + time rate
- **Peak hour bonus:** 1.5x–2x during high demand
- **Batch bonus:** Extra for multiple deliveries in one trip
- **Rating bonus:** High customer rating = bonus per delivery
- **STL bonus:** Higher STL = higher earning multiplier
- **Penalties:** Late delivery (-10%), complaint (-20%), fraud (freeze)

---

## 6. Admin Control Panel (Rider Management)

### 6.1 Rider List
- All riders (searchable, filterable)
- Status: online/offline/suspended/banned
- STL level filter
- Area/franchise filter
- Vehicle type filter

### 6.2 Rider Detail View
- Full profile + verification status
- Delivery history + performance stats
- STL breakdown
- Complaint history
- Earning history
- Live GPS location (if online)

### 6.3 Performance Monitoring
- Delivery success rate
- Average delivery time
- Customer rating distribution
- SLA compliance
- Revenue generated

### 6.4 Fraud Detection
- Fake delivery detection (GPS spoofing)
- Collusion detection (rider + seller gaming)
- Time manipulation
- Route deviation alerts

---

## 7. Rider Trusty Wallet (COD System — CONFIRMED)

**Rule:** Rider's wallet balance determines how many orders they can accept.

- **Minimum balance** = 2× average order value (recommended: PKR 5,000–20,000)
- Rider's balance is LOCKED when accepting a COD order (equal to order value)
- After successful delivery → funds UNLOCK and become available for next order
- **Low balance = no COD orders** (system blocks acceptance)
- **High STL rider = lower balance requirement** (trust discount)

**Flow:**
```
Rider has 10,000 PKR balance
  → Accepts order worth 5,000 PKR → 5,000 locked
  → Remaining available: 5,000 PKR (can take 1 more order)
  → Delivery completed → 5,000 unlocked + commission added
  → Balance restored for next order
```

---

## 8. Rider Assignment Algorithm (CONFIRMED)

**Priority order (STL-weighted + smart routing):**
1. **Nearby rider** — closest to pickup point
2. **High STL** — trusted riders get priority
3. **Available** — currently not on delivery
4. **Round-robin** — fallback if all equal

**Logic:** Smart + fair + efficient. No pure round-robin (penalizes good riders).

---

## 9. Open Questions

1. **Rider vehicle verification** — how is vehicle ownership/condition verified?
2. **Minimum rides per day** — any minimum delivery requirement to stay active?
3. **Multi-platform** — can riders work for other delivery platforms simultaneously?

---

## 10. Rider Insurance System (CONFIRMED)

### 10.1 Coverage

| Type | Description |
|---|---|
| Accident cover | Medical expenses during delivery |
| Delivery loss cover | Package lost/damaged during transit |
| Health emergency | Emergency medical support |

### 10.2 Fund Model

- **Per delivery deduction:** 5-10 PKR per delivery → Insurance pool
- **Pool managed by:** EHB HQ (centralized insurance fund)
- **Claims processed by:** DMO + Insurance partner

### 10.3 STL-based Coverage Tiers

| Rider STL | Coverage Level | Max Claim |
|---|---|---|
| L1-L3 (Low) | Basic | Limited |
| L4-L6 (Medium) | Standard | Medium |
| L7+ (High) | Premium | Full coverage |

**Rule:** High STL = better coverage. Incentivizes good performance.

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-19 | 1.2 | Rider insurance system confirmed (per-delivery deduction, STL-based tiers). |
| 2026-04-19 | 1.1 | Rider Trusty Wallet COD system confirmed (balance-lock model). Assignment algorithm confirmed (STL-weighted + proximity). |
| 2026-04-19 | 1.0 | Created from user's spec dump. 9-section dashboard, verification flow, STL controls, earning model, admin controls, fraud detection. |

---

*EHB Technologies (Pvt.) Ltd. · Rider Department v1.0 · 2026-04-19*
