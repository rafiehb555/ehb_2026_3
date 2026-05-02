# DMO · Role-Based View Matrix

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Concrete RBAC — who sees what + can do what in DMO dashboard.

---

## Master rule

> **Single dashboard engine · role determines slice of data + actions visible.**

---

## Role × View matrix

| Role | Data scope | Actions allowed | Override authority |
|---|---|---|:---:|
| **Public (L0)** | Marketing pages only | Browse, search | None |
| **User (L1+)** | Own data only | Own profile, orders, wallet, STL | None |
| **Buyer (L2+)** | Own + own purchases | Place orders, file complaints, review | None |
| **Seller (L4+)** | Own + own listings + own buyers' interactions | Manage listings, accept/decline orders, respond to reviews | None over self |
| **Service Provider (L5+)** | Own + own services + bookings | Booking management, CRB exam access | None over self |
| **Rider (L3+)** | Own + assigned deliveries | Accept/decline jobs, status updates | None |
| **Inspector (L5+)** | Own + assigned inspections + reports | Submit inspection reports, schedule | None over reports |
| **Employer (L3+)** | Own + posted jobs + applicants | Post jobs, hire/reject | None over hires |
| **Job Seeker (L1+)** | Own + applications | Apply for jobs, manage applications | None |
| **Production Co (L8+)** | Own + linked products + linked sellers | Product distribution, anti-counterfeit | Limited (over own products) |
| **Micro Franchise** | Own tasks · earnings · ratings · STL | Task acceptance, earnings tracking | None |
| **Sub Franchise (L1-L10)** | Local territory + their micros | Approve users · manage subs · vouching · refill audit | Within zone |
| **Corporate Franchise** | Company scope + sub-franchises under | Quality audits · sub coordination | Multi-corp matters |
| **Master Franchise** | Full metro + masters under + corporates | Region management · sub approvals · cross-sub conflicts | Within metro |
| **Country Franchise** | Full country + all masters · corps · subs · micros in country | Country-level compliance · gov liaison · all approvals | Country-wide |
| **DMO Staff (L4+)** | All users (read) + queues | First-line approvals (24h max suspend) | Limited |
| **PSS Officer** | KYC queue + own decisions | Approve/Reject KYC · request more docs | KYC only |
| **CRB Officer** | Exam queue + certificates | Grade exams · sign certs | CRB only |
| **DMO Senior** | All + advanced queues | 7-day suspend · slash <$10K · approve subs L4+ | Most decisions |
| **DMO Council** | Everything except founder-only | Permanent ban · slash >$10K · industry mode change | All except mint |
| **EHB HQ (Founder)** | EVERYTHING globally | Anything · override anyone · mint EHBGC · founder-only changes | 100% |

---

## Per-section visibility matrix (DMO Dashboard)

| Section | User | Sub | Master | Country | DMO Staff | DMO Senior | DMO Council | Founder |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Personal stats | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| KPIs (own scope) | own | zone | metro | country | platform | platform | platform | global |
| Live activity feed | own | zone | metro | country | platform | platform | platform | global |
| Critical alerts | own | zone | metro | country | platform | platform | platform | global |
| Approvals queue | — | own subs/users | own subs | all in country | DMO scope | escalations | all | all |
| Up-Guard fraud | — | flagged in zone | flagged in metro | flagged in country | yes | yes | yes | yes |
| Slashing events | own only | own zone | own metro | country | yes | yes | yes | yes |
| User suspension | — | warn | 24h | yes | 24h | 7d | permanent | permanent |
| Manual STL adjust | — | — | — | — | — | — | rare | yes |
| Industry mode change | — | — | — | — | — | — | yes | yes |
| EHBGC mint | — | — | — | — | — | — | — | yes |
| Permanent ban | — | — | — | — | — | — | yes | yes |
| Founder-only settings | — | — | — | — | — | — | — | yes |

---

## Action authority ladder

When user action triggers approval need:

```
1. AI auto-approves (low risk · STL ≥ threshold · clean record)
   ↓ if escalates
2. Sub Franchise reviews (within zone)
   ↓ if escalates
3. Master Franchise (within metro)
   ↓ if escalates
4. Country Franchise (within country)
   ↓ if escalates
5. DMO Staff (cross-country)
   ↓ if escalates
6. DMO Senior (high-value · slash · suspend 7d)
   ↓ if escalates
7. DMO Council (permanent ban · industry change · large slash)
   ↓ if escalates
8. Founder (mint · founder-only)
```

---

## Override hierarchy (cascade allowed)

Higher tier can override lower:

```
Founder → can override anyone
DMO Council → can override DMO Senior · Country · Master · Sub
DMO Senior → can override DMO Staff · Country · Master · Sub
Country → can override Master · Sub · Micro in own country
Master → can override Sub · Micro in own metro
Sub → can override Micro in own zone
Micro → no override (executes only)
```

Every override:
- Logged with reason
- Signed by overrider ID
- Polkadot anchored
- Reviewed by next-tier-up weekly

---

## Implementation pattern

```typescript
// services/api/src/middleware/role-view.js
function getDashboardScope(user) {
  const role = user.role;
  const scope = {
    user: { dataFilter: { userId: user.id } },
    sub: { dataFilter: { zoneId: user.franchiseZoneId } },
    master: { dataFilter: { metroId: user.franchiseMetroId } },
    country: { dataFilter: { countryCode: user.countryCode } },
    dmo_staff: { dataFilter: {} /* all */, suspendMaxDays: 1 },
    dmo_senior: { dataFilter: {}, suspendMaxDays: 7, slashMaxUsd: 10000 },
    dmo_council: { dataFilter: {}, banPermanent: true, mintEHBGC: false },
    founder: { dataFilter: {}, all: true }
  }[role];

  return scope;
}

// usage in API
app.get('/api/dmo/users', auth, (req, res) => {
  const scope = getDashboardScope(req.user);
  const filter = scope.dataFilter;
  const users = await User.find(filter);
  res.json(users);
});
```

---

## Cross-references

- DMO Dashboard architecture: `DMO-DASHBOARD.md`
- Roles + permissions: `4-flows/USER-ROLES-PERMISSIONS.md`
- Admin panel data: `4-flows/ADMIN-PANEL-DATA.md`
- Franchise tiers: `11-franchise/EHB-FRANCHISE-MODEL.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial role-view RBAC matrix · concrete TypeScript pattern |
