# Seller — EHB Marketplace Seller System

**Status:** Canonical spec (v1.0) · 2026-04-19
**Related:** `Commission.md` · `GoSellr.md` · `STL.md` · `DMO.md` · `CRB.md`

---

## 1. Purpose

The Seller system manages all product/service providers on the EHB GoSellr marketplace. It handles seller onboarding, product management, order processing, earnings tracking, and STL-based trust integration.

---

## 2. Seller Dashboard (10 Sections)

### 2.1 Dashboard (Overview)
- Total revenue (today/week/month/all-time)
- Active orders count
- STL level + score
- Pending verifications
- Recent notifications
- Quick action buttons

### 2.2 Products
- Product listing (grid/list view)
- Add new product (form + image upload)
- Edit/delete products
- Stock management
- Category assignment
- Product STL badge display
- Bulk product operations

### 2.3 Orders
- Active orders (pending/processing/shipped)
- Order history (completed/cancelled/refunded)
- Order detail view (buyer info, delivery status)
- Accept/reject incoming orders
- Order timeline tracking

### 2.4 Delivery Handoff
- Pending handoffs to DMO riders
- Packaging confirmation
- Rider assignment tracking
- Handoff QR code generation
- Delivery status updates

### 2.5 Earnings
- Total earnings breakdown (product sales, commissions, bonuses)
- 2% service charge deduction visibility
- Pending earnings (in escrow)
- Available balance
- Withdrawal history
- Earning trends chart

### 2.6 Complaints
- Active complaints against seller
- Complaint history + resolution
- STL impact per complaint
- Response submission
- Escalation tracking

### 2.7 STL (Service Trust Level)
- Current STL level + score
- STL breakdown (PSS, CRB, DMO components)
- STL history graph
- Upgrade requirements
- Downgrade warnings
- Competitor STL comparison (anonymous)

### 2.8 Analytics
- Sales analytics (daily/weekly/monthly)
- Top products by revenue
- Customer demographics
- Return/refund rates
- Seasonal trends
- Performance benchmarks

### 2.9 Notifications
- Order notifications
- STL change alerts
- Complaint alerts
- System announcements
- Payment notifications
- CRB renewal reminders

### 2.10 Settings
- Profile management
- Store settings (name, logo, description)
- Payment preferences
- Notification preferences
- Delivery preferences
- Account security (2FA, password)

---

## 3. Seller Verification Flow

```
1. Seller applies → JPS Profile created
2. PSS Level 2 verification (ID + docs + face match)
3. Sub Franchise reviews application
4. CRB Product Check (if physical products)
5. Master Franchise approval
6. CRB Certificate issued → Blockchain record
7. STL Level = Normal → Seller LIVE
8. Verified badge displayed
```

---

## 4. Seller STL Controls

| STL Level | Product Limit | Daily Order Cap | Visibility | Commission Rate |
|---|---|---|---|---|
| FREE (L1) | 5 products | 10 orders | Low | Standard |
| BASIC (L2) | 20 products | 50 orders | Medium | Standard |
| NORMAL (L3) | 50 products | 100 orders | Good | Standard |
| STANDARD (L4) | 100 products | 250 orders | High | Reduced |
| ADVANCED (L5) | 250 products | 500 orders | High | Reduced |
| HIGH (L6) | 500 products | 1,000 orders | Featured | Low |
| PRO (L7) | 1,000 products | 2,500 orders | Featured | Low |
| VIP (L8) | Unlimited | 5,000 orders | Top Priority | Minimum |
| ELITE (L9) | Unlimited | Unlimited | Top Priority | Minimum |
| SUPREME (L10) | Unlimited | Unlimited | Exclusive | Minimum |

---

## 5. Seller Profit Model

- Seller sets own prices (with own margin built in)
- EHB deducts 2% service charge per order
- Seller keeps: Order Amount − 2% fee
- Affiliate commission (if applicable) comes from seller's margin
- STL bonus can increase seller visibility (no cost)

---

## 6. Admin Control Panel (Seller Management)

### 6.1 Seller List
- All sellers (searchable, filterable)
- Status filter (active/pending/suspended/banned)
- STL level filter
- Location/franchise filter

### 6.2 Seller Detail View
- Full profile + verification status
- Order history + revenue
- STL breakdown
- Complaint history
- CRB certificates
- Action buttons: suspend, warn, ban, verify

### 6.3 Fraud Detection
- Fake product detection (AI-powered)
- Price manipulation detection
- Review manipulation (fake reviews)
- Self-order detection
- Unusual pattern alerts

### 6.4 STL Management
- Override seller STL (with reason, audit logged)
- Freeze STL (pending investigation)
- Bulk STL recalculation
- STL appeal handling

---

## 7. Open Questions

1. ~~**Self-delivery rule**~~ — **RESOLVED:** Seller Choice — seller can deliver themselves OR use DMO riders
2. **Product categories** — full list of categories with commission rates?
3. **Buyer order limits** — any cap on how many orders a buyer can place per day?
4. **Review system** — how many days after delivery can buyer leave a review?
5. **COD rules** — is Cash on Delivery supported? If yes, how does the 2% fee get collected?

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-19 | 1.0 | Created from user's spec dump. 10-section dashboard, verification flow, STL controls, profit model, admin controls, fraud detection. |

---

*EHB Technologies (Pvt.) Ltd. · Seller Department v1.0 · 2026-04-19*
