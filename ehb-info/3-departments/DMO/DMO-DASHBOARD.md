# DMO · Single Dashboard Engine (architecture lock)

> **Status:** Canonical v1.0 · 2026-04-30
> **Locked rule:** ONE dashboard engine. ONE control panel. Role-based access.

---

## 1. Master rule

> **DMO = Central Control Panel · provides all dashboards via role-based access**

```
❌ Multiple dashboards mat banao
❌ Har folder me admin panel mat banao
✅ One dashboard engine (DMO)
✅ Role-based access (RBAC)
```

If a developer or AI proposes a "separate admin panel for industry X" or "custom dashboard for franchise Y" — **reject**. Use this single engine with proper RBAC.

---

## 2. What DMO Dashboard provides

```
DMO Provides:
- Role-based dashboards
- Live monitoring
- Approval workflows
- Override authority
- Reports
- Audit trails
```

Per `4-flows/USER-ROLES-PERMISSIONS.md` matrix, every role gets the appropriate slice of the dashboard.

---

## 3. Dashboard views per role (same engine, different views)

| Role | Dashboard scope |
|---|---|
| **Micro Franchise** | My tasks · earnings · ratings · STL |
| **Sub Franchise** | Local ops + micro control + territory KPIs |
| **Corporate** | Company ops + staff management + compliance |
| **Master** | Region analytics + sub control + corporate oversight |
| **Country** | Full country control + master oversight |
| **EHB HQ** (founder + DMO Council) | Global control · 100% override authority |

Plus all individual user roles (Buyer / Seller / Service Provider / Rider / Inspector / Employer / Job Seeker) get their respective panels.

See `5-specs/DASHBOARD-SCREENS.md` for per-role widget breakdown.

---

## 4. Control Hierarchy

```
EHB HQ (100% control · override anyone)
   ↓
Country Franchise (national scope)
   ↓
Master Franchise (regional)
   ↓
Corporate (company)
   ↓
Sub (local)
   ↓
Micro (individual)
```

**Each tier sees only their slice + tiers below.** Country sees Masters + Corps + Subs + Micros in their country. Master sees Corps + Subs + Micros in their region. Etc.

EHB HQ sees **everything everywhere** — and can override any tier.

---

## 5. Tech architecture

### Single dashboard engine

```
apps/web/components/dashboard/
   ├─ DashboardShell.tsx        ← layout wrapper
   ├─ widgets/                   ← reusable widgets
   ├─ role-specific/             ← role config
   └─ permissions.ts             ← RBAC enforcement
```

### One API, role-filtered responses

```
GET /api/dashboard/me
   → returns dashboard config for current user's role
   → backend filters data by role + scope
```

### Per-role routes

```
/dashboard               → universal entry, redirects per role
/franchise/dashboard     → franchise-specific view
/dmo/dashboard          → DMO admin view
/dmo/up-guard           → fraud monitor (DMO only)
/dmo/approvals          → approvals queue (DMO only)
```

All these routes use the **same components** with different prop configurations.

---

## 6. Data isolation

Per role, data filtered automatically:

| Role | Sees |
|---|---|
| Sub L5 in Karachi | Only Karachi Saddar zone data |
| Master Karachi | All Karachi sub-zones + their subs |
| Country PK | All Pakistan |
| EHB HQ | All countries |

Backend enforces. No client-side filtering of sensitive data.

---

## 7. Override flow

Higher tiers can override lower:

```
EHB HQ override → bypass any rule
   ↓ logged + audited
Country override → within country
   ↓ logged
Master override → within region
   ↓ logged
Corporate override → within company
   ↓ logged
Sub override → within zone
   ↓ logged
Micro: no override authority
```

Every override logged, signed by overrider, Polkadot anchored.

---

## 8. Report generation

Single reporting engine:

```
GET /api/reports?type=X&scope=Y&from=Z&to=W
```

Available report types:
- Activity reports
- Revenue reports
- KPI reports
- Compliance reports
- Audit reports
- STL distribution
- Industry health
- Per-tier (franchise) reports
- Custom (saved templates)

Filtered by user's permission level.

---

## 9. Why one dashboard not many?

| Multiple dashboards | Single dashboard engine |
|---|---|
| Duplicate code | DRY (don't repeat yourself) |
| Inconsistent UX | Consistent across roles |
| Multiple security holes | Single RBAC enforcement |
| Bug fixes needed everywhere | Fix once, propagates |
| Hard to add new roles | Add role config, done |
| Confusing for users with multiple roles | Same UI, more widgets visible |

---

## 10. Cross-references

- DMO main spec: `3-departments/DMO.md`
- Dashboard screens detail: `5-specs/DASHBOARD-SCREENS.md`
- Roles + permissions: `4-flows/USER-ROLES-PERMISSIONS.md`
- Admin auto-collector: `4-flows/ADMIN-PANEL-DATA.md`
- Franchise tier dashboards: `11-franchise/FRANCHISE-DASHBOARD.md`
- Core Engine architecture: `_settings/EHB-CORE-ENGINE.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Single-dashboard rule locked + role hierarchy |
