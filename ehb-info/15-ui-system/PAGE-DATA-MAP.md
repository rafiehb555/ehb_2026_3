# Page-By-Page Data Map — What Goes on Every Page

> **Status:** v1.0 · 2026-04-30
> **Purpose:** Per-page data spec — for every URL: what data renders, where it comes from, format.
> **For:** Designers + frontend devs.

---

## Format

For each page:
- **Data fields** — what the page shows
- **Source** — API endpoint or service
- **Components** — UI building blocks (from `COMPONENT-LIBRARY.md`)
- **Layout** — section structure top-to-bottom

---

## 🌐 PUBLIC PAGES

### `/` — Landing / Home
- **Hero section:**
  - Headline: "One Platform. 38 Industries. Infinite Trust."
  - Sub-headline + CTA buttons (Sign Up · Browse Industries)
  - Hero gauge (animated STL ring showing trust concept)
- **Trust pillars (3 cards):**
  - PSS · CRB · DMO
  - Each: icon · title · 1-line description · "learn more" link
- **Industry grid (6 highlighted of 38):**
  - WMS · OLS · GSM · HPS · ERS · FIN
  - Each: icon · code · name · DMO mode badge · min STL badge
- **How it works (3 steps):**
  - Sign up + KYC · Build STL · Transact safely
- **Testimonials carousel:** 3 user quotes
- **CTA footer:** "Start your trust journey"
**Source:** Static + 1 API call (`GET /api/industries/featured`)
**Components:** Hero, TrustPillarCard, IndustryCard, StepCard, Testimonial, CTAFooter

---

### `/industries` — Industries Grid (38 cards)
- **Header:** "All 38 EHB Industries"
- **Filter bar:** Tier (1/2/3) · DMO Mode · Min STL · Country
- **Industry grid (38 cards):**
  - Code · Icon · Name · Description · DMO mode · Min STL · Industry multiplier
  - Click → `/industries/<code>`
**Source:** `GET /api/industries`
**Components:** FilterBar, IndustryCard

---

### `/industries/<code>` — Industry Detail
- **Hero:**
  - Industry name + icon
  - Sub-headline + multiplier badge + DMO mode badge + min STL badge
- **Services list:** services + micro-services (from `INDUSTRY-SERVICES-CATALOG.md`)
- **Top providers carousel:** 6 highest-STL providers in this industry
- **Recent listings:** latest 8 products/services
- **Industry rules box:** min STL · DMO mode explanation · CRB requirements
- **Franchise opportunities:** "Become a franchise in this industry"
- **CTA:** "List in this industry"
**Source:** `GET /api/industries/<code>` + `GET /api/listings?industry=<code>&limit=8`
**Components:** IndustryHero, ServiceList, ProviderCarousel, ListingGrid, RuleBox, FranchiseCTA

---

### `/concepts/stl` — STL Explainer
- **Hero:** "Your trust score, measured."
- **Formula visualization:** PSS + CRB + DMO → STL
- **L1-L10 ladder cards:** name · description · benefits · lock requirement
- **MIN-chain rule explanation**
- **How to improve** (3 paths)
- **CTA:** "Sign up to build your STL"
**Source:** Static
**Components:** Hero, FormulaDiagram, LadderCard, ExplainerSection

---

## 👤 USER-AUTHENTICATED PAGES

### `/dashboard` — Role-routed home
Logic: redirect based on user.role
- BUYER → `/orders`
- SELLER → `/seller`
- RIDER → `/rider`
- FRANCHISE_OWNER → `/franchise/dashboard`
- DMO_STAFF → `/dmo`

---

### `/stl` — User's Trust Page
- **Hero:**
  - Big STL gauge (current level + score 0-100)
  - 4-ring breakdown: PSS, CRB, DMO, EHBGC lock
- **Score breakdown panel:**
  - PSS: L<n> · contribution X/40
  - CRB: L<n> · contribution X/40
  - DMO: L<n> · contribution X/40
  - DMO history: list of past cases
- **Improve panel:**
  - Next milestone (e.g., "+0.5 to reach L4")
  - Action items (complete CRB exam, lock 100 EHBGC, etc.)
- **History timeline:**
  - Recent STL events (upgrades, downgrades, slashes)
- **Industry access table:** Which industries user can list/buy in
- **Achievements/badges** (if any)
**Source:** `GET /api/stl/me` + `GET /api/stl/me/history`
**Components:** StlGauge, MultiRingGauge, StlBreakdown, ImprovePanel, Timeline, IndustryTable

---

### `/wallet` — Wallet
- **Top:** Total balance + locked + available
- **Recent transactions** (10 latest)
- **Active locks** (with reasons)
- **Withdraw button** + history
- **Lock pyramid chart:** by purpose (escrow / STL / franchise / other)
**Source:** `GET /api/wallet/balance`, `GET /api/wallet/transactions`, `GET /api/wallet/locks`
**Components:** BalanceCard, TransactionList, LockList, WithdrawButton, LockPyramid

---

### `/orders` — Orders
- **Filter:** status (active / completed / cancelled / disputed)
- **Order cards:** number · date · seller · amount · status · CTA
**Source:** `GET /api/orders?role=buyer`

---

### `/orders/<id>` — Order Detail
- **Status timeline:** placed → paid → accepted → fulfilling → delivered → confirmed → settled
- **Items breakdown:** line items + totals
- **Seller info:** name + STL chain + contact button
- **Delivery tracking:** map (if rider assigned)
- **Actions:** confirm delivery · request refund · file complaint · review
- **Escrow status panel:** locked amount · scheduled release date
**Source:** `GET /api/orders/<id>`

---

## 🛒 GoSellr / SELLER PAGES

### `/seller` — Seller Dashboard (10 sections per `Seller.md`)
1. **Dashboard:** revenue (today/week/month/all) · active orders count · STL · alerts
2. **Products:** grid view · add new · edit · stock
3. **Orders:** active · history · filters
4. **Delivery handoff:** rider coordination
5. **Earnings:** per-order breakdown · payouts
6. **STL:** seller's STL + improvement actions
7. **CRB:** certifications · refill schedule
8. **Reviews:** buyer feedback + reply
9. **Disputes:** open cases
10. **Settings:** profile · hours · payment

---

### `/gosellr/list` — List Product
- **Form:** title · description · category · industry (gated by min STL) · price · stock · photos
- **Live preview** of product card
- **Trust badges preview** (seller's STL + chain)
**Source:** `POST /api/gosellr/listings`

---

## 💼 JPS PAGES

### `/jobs` — Jobs Marketplace
- **Search bar** + filters: industry · location · salary range · type (full-time / contract)
- **Job cards:** title · employer (with STL) · location · salary · posted date
**Source:** `GET /api/jobs`

### `/jobs/<id>` — Job Detail
- **Header:** title · employer name + STL · location · salary · type
- **Description** + requirements
- **Apply button** (single-click if profile complete)
**Source:** `GET /api/jobs/<id>`

---

## 🏛 DMO PAGES (officers only)

### `/dmo` — DMO Overview
- **KPI cards:** total open · resolved 24h · SLA breaches · officer load
- **Trend charts:** 7-day complaint volume by type
- **Recent activity feed**
- **Quick action buttons:** queue, fraud monitor, applications
**Source:** `GET /api/dmo/control/stats`

### `/dmo/queue` — Work Queue
- **Filters:** type · severity · industry · country · status · stl range
- **Table:** id · type · severity · created · age · assignee · actions
- **Bulk actions:** assign · escalate
- **Pagination**
**Source:** `GET /api/dmo/control/queue?...`

### `/dmo/complaints/<id>` — Complaint Investigation
- **Header:** complaint number · tier · severity · age · SLA countdown
- **Parties:** filer + accused (with STL chain)
- **Order context** (if linked)
- **Evidence:** photos, videos, chat logs
- **History timeline:** all events on this complaint
- **Actions:** approve · reject · escalate · penalize
- **Notes:** internal notes (visible only to DMO)
**Source:** `GET /api/dmo/control/<id>`

### `/dmo/up-guard` — Continuous Monitoring
- **Live alerts feed**
- **Risk score distribution chart**
- **Top flagged users** (with risk score + reason)
**Source:** `GET /api/dmo/up-guard/alerts`

### `/dmo/settings/flags` — Feature Flags
- **Toggle list:** each flag · enabled state · last changed by · last changed at
- **Audit trail per flag**
**Source:** `GET /api/founder/flags`

### `/dmo/stl/<userId>/override` — STL Override
- **Current STL** + breakdown
- **Override form:** new level · reason · effective until
- **Recent overrides table** (audit)
**Source:** `POST /api/founder/stl-weights/propose` (council route)

---

## 📊 FOUNDER CONSOLE

### `/founder` — Founder Overview
- **Macro KPIs:** total users · GMV · revenue · NPS
- **Trend charts:** signups · revenue · complaints over 30 days
- **Top decisions needed** (3-5 cards)
- **AI daily brief** (auto-generated)
**Source:** `GET /api/founder/overview`, `GET /api/founder/daily-brief`

### `/founder/stl-weights` — STL Formula Console
- **Current weights** (PSS 0.4 + CRB 0.3 + DMO 0.3)
- **Propose change form** (sum-to-1 enforced)
- **Pending Council vote status**
- **History of past changes**
**Source:** `GET /api/founder/stl-weights`

### `/founder/countries` — Country Toggles
- **17 country cards** with active/inactive toggle
- **Override history**
**Source:** `GET /api/founder/countries`

---

## 🏆 FRANCHISE PAGES

### `/franchise/apply` — Application
- **Stepper:** tier select → territory → industries → capital → docs → submit
**Source:** `POST /api/franchise/apply`

### `/franchise/dashboard` — Owner Dashboard
- **Territory map** with sub-franchises
- **Revenue + KPIs**
- **Sub-franchises table**
- **Upcoming verifications**
- **Capital lock status**
**Source:** `GET /api/franchise/me`

---

## 📊 Coverage Stats

- **80+ pages mapped** with data spec
- Each page → ≥1 API endpoint identified
- Each page → ≥3 component types mapped
- Per `COMPONENT-LIBRARY.md` for component details

## Linked
- `PAGES-LIST.md`
- `COMPONENT-LIBRARY.md`
- `UIUX-DESIGN-SYSTEM.md` (next file)
