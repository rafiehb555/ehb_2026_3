# EHB · Franchise Dashboard (admin panel spec)

> **Status:** Canonical v1.0 · 2026-04-30

## Overview

Each franchise has a dedicated dashboard at `/franchise/dashboard`. Tier-specific views.

## Sub-franchise dashboard sections

### 1. Territory snapshot (top hero)
- Territory ID + map
- Active users in territory · Active sellers
- Today's volume · Monthly volume
- Net revenue · Net margin
- Franchise STL with badge

### 2. KPI cards (sparklines)
- New users onboarded (this week)
- Pending verifications (queue depth)
- Open complaints (count + SLA status)
- Refill audit progress
- Inspector activity

### 3. Inspection queue
- Pending PSS L7+ verifications
- Pending CRB exams (industry-specific)
- Multimedia validations to review
- Industry inspections scheduled
- Reschedule / assign inspector

### 4. User management
- New users in territory (last 30 days)
- Top sellers / providers
- Flagged users (DMO escalations)
- STL distribution pyramid

### 5. Earnings
- Today's order commissions
- Verification fees collected
- Penalty share earned
- Yield on locked capital
- Pending settlements

### 6. Refill cycle
- Current cycle status
- Next refill due (countdown)
- Quarterly performance metrics
- Compliance score
- Files to upload

### 7. Complaints + disputes
- Open complaints (T1-T8)
- Resolution time
- Buyer-side complaints against franchise
- Escalations to Master

### 8. Vouching
- Users vouched (active + co-risk)
- Pending vouching requests
- Vouching success rate
- Co-risk events history

### 9. Inspector management
- Inspectors hired (active count)
- Performance per inspector
- Schedule + assignments
- Salary distribution

### 10. Communications
- Messages from EHB HQ
- Communication with Master tier
- Sub-franchise (if Master) communication

## Master-tier additional sections

- Sub-franchises in metro (overview + KPIs)
- Sub-franchise applications pending
- Quality audits scheduled
- Cross-Sub conflicts to mediate
- Metro-level compliance status

## Country-tier additional sections

- All Master franchises in country
- Government liaison status
- Compliance with country laws
- Country-level revenue + margins
- New territory openings
- Founder communication channel

## Common widgets

- Notifications panel (real-time)
- Quick actions (raise issue, request expansion, escalate)
- Calendar (refills, inspections, training)
- Help / support

## Mobile responsive

Full dashboard works on:
- 380px mobile (bottom nav)
- 768px tablet (collapsible sidebar)
- 1440px desktop (full sidebar + multi-column)

## Permissions

Per `4-flows/USER-ROLES-PERMISSIONS.md`:

- View own franchise dashboard
- Edit territory operations
- View (read-only) sub-franchises (if Master)
- Export reports
- Cannot edit other franchises

## Audit + transparency

- Every action logged
- Polkadot anchor for major events
- Transparency dashboard for buyers (what does this franchise do?)
- Public review system for franchise itself

## Cross-references

- Admin panel data: `4-flows/ADMIN-PANEL-DATA.md`
- Roles: `FRANCHISE-ROLES.md`
- Earnings: `FRANCHISE-EARNINGS.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial dashboard spec |
