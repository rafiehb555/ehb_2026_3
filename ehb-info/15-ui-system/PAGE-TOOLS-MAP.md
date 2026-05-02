# EHB · Page Tools Map

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Per-page list of tools/features. Single source for "what does this page have?"

## Universal tools (every authenticated page)

These appear EVERYWHERE:

- Top nav bar (logo, search, notifications, profile)
- Bottom nav (mobile)
- Sidebar (desktop, collapsible)
- Notifications panel
- Help / AI bot launcher
- Language switcher (UR/EN/AR)
- Currency switcher
- Dark/light mode toggle

## Page-specific tools

### 🛒 Product Page (`/gosellr/<id>`)

- Product image gallery
- Product title + description
- Price + currency display
- Add to Cart button
- Buy Now button
- Wishlist toggle
- Search bar
- Filter system
- **STL Display (product · seller · company · owner)**
- **Trust Badge**
- **Rating system + reviewer STL weight**
- **AI Recommendation widget**
- **Trust Q&A AI**
- **MIN-chain pipeline visual**
- **Refill timer**
- **EHBGC lock badge**
- **AI confidence chip (image authenticity)**
- Similar products
- Seller info card
- Industry verifications (per industry)
- Q&A section
- Reviews section
- Related products
- Share button
- Report listing (link to dispute flow)

### 🛠 Service Page (`/industries/<code>/listing/<id>`)

Same as Product Page PLUS:
- Service availability calendar
- Booking widget
- Provider profile preview
- Industry-specific fields (e.g., medical specialty for WMS)
- Certifications display
- Inspector verification badge

### 📦 Order Detail Page (`/orders/<id>`)

- Order timeline (state machine visual)
- Order details
- Payment status
- Escrow status
- Tracking (if applicable)
- Communication panel (with seller/buyer)
- Review submission (post-fulfillment)
- Refund request button
- Dispute file button
- Receipt PDF download

### 💰 Wallet Page (`/wallet`)

- EHBGC balance
- Locked EHBGC + per-entity breakdown
- Transaction history
- Yield earnings (daily stream)
- Lock manager
- Burn for STL boost
- Top up
- Withdraw
- Currency converter
- Multi-currency wallets

### 📊 STL Dashboard (`/stl`)

- Hero: CircularGauge with score + level
- 6-step Journey stepper (Register → PSS → CRB → DMO → EHBGC → AI Marketplace)
- PSS + CRB + DMO triple card
- Formula explainer
- AI Marketplace access grid
- Industry STL levels
- Score breakdown
- Up/Down rules
- AI recommendations
- Recent activity
- Footer CTAs

### 🤖 AI Marketplace (`/ai-marketplace`)

- Hero: User STL pill
- 4 Tier filter cards (Bronze/Silver/Gold/Diamond)
- How-to-use 4-step guide
- Per-tier service grid (HUGE STL badge per card)
- STL ladder strip per service
- Earnings pill per service
- CTA strip (Boost STL · CRB exam · Lock EHBGC)

### 🌐 Franchise Dashboard (`/franchise/dashboard`)

- Territory snapshot map
- 8 KPI cards
- Inspection queue
- User management (territory)
- Earnings breakdown
- Refill cycle status
- Complaints panel
- Vouching queue
- Inspector management
- Communications

### 🏛 DMO Main Dashboard (`/dmo/dashboard`)

- Period selector
- Critical alerts ribbon
- 8 Primary KPIs with sparklines
- Live activity feed
- Priority queues
- Your tasks
- Trust distribution (STL histogram)
- Industry health
- Revenue split
- Top franchises
- Geographic zones
- Top sellers
- Flagged users
- System health
- Quick actions

### 🌍 Industry Pillar Page (`/industries/<code>`)

- Hero: industry icon + name + tier
- Description
- 5-tier franchise hierarchy display
- Featured listings
- Top sellers in industry
- Industry STL multiplier display
- DMO mode badge
- Min STL gate display
- CRB checklist preview
- Compliance per country
- Get started CTAs

## Tool-to-component mapping

| Tool | Component | File |
|---|---|---|
| STL Display | StlBadge | `apps/web/components/ui/stl-badge.tsx` |
| Circular Gauge | CircularGauge | `apps/web/components/ui/circular-gauge.tsx` |
| Multi-ring Gauge | MultiRingGauge | `apps/web/components/ui/multi-ring-gauge.tsx` |
| Sparkline | Sparkline | `apps/web/components/ui/sparkline.tsx` |
| Trust Badge | TrustBadge | (TODO) |
| Lock Badge | LockBadge | (TODO) |
| AI Confidence Chip | AIChip | (TODO) |
| Refill Timer | RefillTimer | (TODO) |
| Industry Card | IndustryCard | `apps/web/components/industry-card.tsx` |
| Plastic Card (universal) | PlasticCard | `apps/web/components/ui/plastic-card.tsx` |
| Journey Stepper | StlJourney | `apps/web/components/ui/stl-journey.tsx` |

## Cross-references

- Page list: `PAGES-LIST.md`
- Settings: `PAGE-SETTINGS.md`
- Components: `COMPONENT-LIBRARY.md`
- UI rules: `UI-RULES.md`
- Action map: `ACTION-MAP.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial page tools mapping |
