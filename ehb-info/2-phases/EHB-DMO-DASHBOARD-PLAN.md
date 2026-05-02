# EHB DMO Dashboard — Rebuild Plan

**Version:** 2.0 · **Date:** 2026-04-24  
**Goal:** Replace the basic 4-KPI dashboard with a comprehensive operator
command center that surfaces platform health, queues, alerts, and performance
at-a-glance.

---

## Target User

**Primary:** DMO_MANAGER · DMO_DIRECTOR · SUPER_ADMIN (internal EHB staff)  
**Secondary:** DMO_ANALYST (read-only), DMO_SUPPORT (T1–T3 complaint work)

Each role will see the same layout but with different action capabilities
(RBAC enforced at API level).

---

## 11-Section Layout (top → bottom)

### 1. Header Strip
- Title "DMO Dashboard · Governance Brain"
- Period selector: Today · 7d · 30d · MTD · YTD
- Last updated timestamp + refresh button
- LIVE pulse chip (Socket.IO connection status)

### 2. Critical Alerts Ribbon (conditional)
Only shown if ≥ 1 high-severity alert exists:
- T6 fraud complaints (2h SLA countdown)
- STL drops > 3 levels detected
- High-risk AML signals (> 0.8 score)
- CRB certificates expiring within 7 days
- Franchise KPI red zone (< 60% of target)
- System health warning (API/AI/DB down)

### 3. Primary KPIs (8 cards)
Each card: label + big number + sparkline + delta vs prev period.

1. Active users (total logged in this period)
2. New signups (with +% delta)
3. Orders placed + completed
4. Platform revenue USD
5. Pending franchise apps (with most-urgent SLA)
6. Open complaints (with T5+ count)
7. AI invocations today
8. Blockchain anchors created

### 4. Main Operational Row (3 columns, stack on mobile)

**Left (largest) — Live Activity Feed**
- Real-time Socket.IO stream
- Color-coded events (orders = teal, franchise = purple, complaints = red, etc.)
- Filter chips per module
- Click event → drill into detail page

**Center — Priority Queues**
- Franchise apps queue (with SLA countdown)
- Complaints by tier (T1–T6)
- CRB audits pending
- Refill expirations
- Each with "Open queue →" link

**Right — Your Tasks**
- Tasks assigned to current DMO user
- Sorted by SLA urgency
- Action buttons per task

### 5. Trust Distribution
- STL histogram (L1–L10 user count bars)
- Per-industry STL heatmap (6 industries × 10 levels)
- MIN-chain violations counter (products showing lower than expected)

### 6. Revenue & Commission Insights
- Platform revenue trend (4-week sparkline)
- 70/10/10/10 split visualization
- Top 5 franchises by commission earned
- Top 5 sellers by volume
- Rider total earnings

### 7. Geographic Distribution
- Top zones table (Islamabad, Lahore, Karachi, etc.)
- Orders + active users per zone
- Growth delta
- "View map" link (Phase 3)

### 8. Top Performers
- Top sellers (by orders × rating × STL)
- Top riders (by completed deliveries + rating)
- Top franchisees (by network earnings)
- Click row → open user's STL detail

### 9. Flagged for Review
- Users with pending fraud flags
- Sellers with complaint spike
- Franchisees in KPI red zone
- Each with "Resolve →" button (DMO action)

### 10. AI System Status
- AI service uptime + latency
- Invocations today per service
- Flagged responses needing review
- "Open AI ops →" link

### 11. System Health + Quick Actions
- Service status: API · AI · Mongo · Polkadot · Socket.IO
- Connection counts
- Quick actions row: Approve queue · Resolve complaints · Run MIN-chain · Export report

---

## Data Sources (API endpoints)

Already built:
- `GET /api/dmo/kpis` — KPI numbers (needs expansion for sparklines)
- `GET /api/dmo/applications/queue` — franchise apps
- `GET /api/dmo/stl-leaderboard` — top users
- `GET /api/dmo/activity` — audit log
- `GET /api/complaints/pending` — complaints queue
- `GET /api/riders/online` — online riders
- `GET /api/blockchain/proofs` — anchors
- Socket.IO `/dmo` namespace — live events

New endpoints needed (Phase 2.5):
- `GET /api/dmo/critical-alerts` — aggregated high-severity items
- `GET /api/dmo/revenue-trend?days=30` — daily revenue for sparkline
- `GET /api/dmo/geographic` — per-zone aggregations
- `GET /api/dmo/top-performers?type=seller|rider|franchise`
- `GET /api/dmo/system-health` — service uptime checks

For this rebuild, frontend will use demo data with API calls where available
(graceful fallback to seed data).

---

## Responsive Breakdown

- **Mobile (<640px):** Everything stacks 1-col. KPIs 2-col grid. Activity feed at top.
- **Tablet (640-1024):** KPIs 4-col. Main row stacks.
- **Desktop (>1024):** Full 3-column main row. All sections side-by-side.

---

## Role-Aware Features (Phase 3)

Later enhancement — show/hide sections based on `user.role`:
- `SUPER_ADMIN`: everything + policy override tools
- `DMO_DIRECTOR`: everything except policy override
- `DMO_MANAGER`: queues for their module (PSS/CRB/STL/Wallet/Complaint/Franchise)
- `DMO_ANALYST`: read-only, no action buttons
- `DMO_SUPPORT`: T1–T3 complaints only
- `DMO_INSPECTOR`: CRB audit queue only

For this rebuild, treat user as DMO_MANAGER (full view).

---

## Visual Design

- Dark theme base (`#04060e` bg) with purple/teal accents
- Plastic card coating on every panel
- Color semantics:
  - Purple `#7B6EF6` → neutral/info
  - Teal `#2BBFA0` → success/ok
  - Amber `#F0A030` → warning
  - Red `#F05858` → critical/danger
  - Pink `#ec4899` → secondary
- Progress bars with gradient fills
- Sparklines: 7-day trend inside KPI card
- Icon-led section headers

---

## Acceptance Criteria

- [ ] 11 sections rendered, all responsive
- [ ] KPIs show delta vs previous period
- [ ] Live activity feed placeholder ready for Socket.IO wire
- [ ] Priority queues link to respective DMO modules
- [ ] System health shows real service status (stub for now)
- [ ] Mobile layout scrollable, no horizontal overflow
- [ ] All 58 STL tests still pass
- [ ] File size under 800 lines

---

*EHB DMO Dashboard Rebuild Plan v2.0 — 2026-04-24*
