# EHB Industries Map

**Status:** Reference guide (v1.0) · 2026-04-15  
**Canonical source:** `ehb-info/departments/Industries.md`

---

## Overview

EHB operates **16 industries** across 10 Main + 6 Support categories. This map shows:
- **Code** — short identifier (used in APIs, enums)
- **Full name** — marketing display name
- **Parent department** — which system governs it (STL, PSS, CRB, DMO)
- **Primary STL impact** — how STL directly affects the business logic
- **Phase** — launch status (Phase-1, Phase-2, Phase-3, or Live)
- **Global mapping** — how it aligns with standard industry classifications

---

## Main Industries (10)

| Code | Full Name | Parent Dept | STL Impact | Phase | Global Classification |
|------|-----------|-------------|-----------|-------|----------------------|
| GSM | GoSellr (E-commerce) | Wallet + Franchise | Seller visibility, fee tiers, daily earnings cap | Phase-1 | E-commerce, Retail |
| WMS | Wellness & Medical Services | PSS + CRB | Doctor/seller certification, patient trust, reputation | Phase-1 | Healthcare, Medicine |
| HPS | Human Professional Services | CRB + Franchise | Consultant STL ladder, qualification badges, referral | Phase-1 | Professional Services, Consulting |
| OBS | Online Business School | Franchise + Affiliate | Instructor ranking, course visibility, commission split | Phase-1 | Education, EdTech |
| OLS | Online Legal Services | PSS + CRB | Lawyer certification (bar exam), client confidentiality, contract notarization | Phase-1 | Legal Services, Law |
| AGTS | Agro-Tech Services | Franchise + DMO | Farmer/supplier reputation, soil test audits, bulk order trust | Phase-2 | Agriculture, AgroTech |
| HMS | Hospitality & Meetings | Wallet + Franchise | Host/guest trust, booking cancellation penalties, STL-locked escrow | Phase-2 | Hospitality, Travel, Events |
| ITS | Information Technology Services | Franchise + CRB | Developer/vendor reputation, portfolio verification, code audit trust | Phase-2 | Technology, IT Services |
| SOT | Sports & Outdoor Tourism | Franchise + Wallet | Guide/operator STL, safety certifications, equipment insurance | Phase-2 | Travel, Sports, Tourism |
| EHB Tube | EHB Video Platform | Affiliate + DMO | Creator STL, content moderation, ad revenue splits by level | Phase-3 | Media, Entertainment, Social |

---

## Support Industries (6)

| Code | Full Name | Parent Dept | STL Impact | Phase | Global Classification |
|------|-----------|-------------|-----------|-------|----------------------|
| LDS | Logistics & Delivery Services | Wallet + Franchise | Rider reputation, on-time delivery STL boost, insurance tiers | Phase-1 | Logistics, Supply Chain |
| ERS | Employment & Recruitment Services | Franchise + CRB | Recruiter/candidate STL, job seeker certifications | Phase-2 | Human Resources, Recruiting |
| EFS | Event & Festival Services | Franchise + Wallet | Organizer STL, vendor trust, ticket integrity | Phase-2 | Events, Entertainment |
| EPS | Energy & Power Services | DMO + Franchise | Utility provider STL, regulatory compliance, customer trust | Phase-3 | Energy, Utilities |
| EAS | Environment & Agriculture Support | Franchise + PSS | Land inspector STL, crop audit certifications | Phase-3 | Agriculture, Environment |
| ELS | Environmental & Legal Support | Franchise + CRB | Compliance officer STL, contract auditor reputation | Phase-3 | Legal, Regulatory |

---

## Global Vertical Mapping

EHB's 16 industries map to **~32 standard global industry classifications**. This table helps external APIs, analytics partners, and regulators understand how EHB's portfolio aligns with global standards:

| Standard Classification | EHB Industries | Notes |
|------------------------|-----------------|-------|
| **E-commerce & Retail** | GSM | Direct mapping — GoSellr is omni-channel |
| **Finance & Banking** | — | Planned Phase-3 (not yet live) |
| **Real Estate** | — | Planned Phase-2 (not yet live) |
| **Manufacturing** | — | Planned Phase-3 (not yet live) |
| **Energy & Utilities** | EPS | Phase-3 |
| **Telecommunications** | — | Planned Phase-3 (not yet live) |
| **Government & Public Admin** | — | Planned Phase-2 (not yet live) |
| **Non-Profit & NGOs** | — | Planned Phase-3 (not yet live) |
| **Sports & Recreation** | SOT | Phase-2 |
| **Music & Arts** | — | Planned Phase-3 (not yet live) |
| **Gaming & Esports** | — | Planned Phase-3 (not yet live) |
| **Food & Beverage** | — | Planned Phase-2 (not yet live) |
| **Pet Services** | — | Planned Phase-3 (not yet live) |
| **Weddings & Events** | EFS, HMS | Phase-2 |
| **Beauty & Personal Care** | — | Planned Phase-2 (not yet live) |
| **Fitness & Wellness** | WMS | Phase-1 |
| **Logistics & Supply Chain** | LDS | Phase-1 |
| **Construction** | — | Planned Phase-2 (not yet live) |
| **Consulting & Professional Services** | HPS, ITS, OLS | Phase-1/2 |
| **Automotive** | — | Planned Phase-2 (not yet live) |
| **Hospitality & Travel** | HMS, SOT | Phase-2 |
| **Entertainment & Media** | EHB Tube, EFS | Phase-2/3 |
| **Education & Training** | OBS | Phase-1 |
| **Healthcare & Medicine** | WMS | Phase-1 |
| **Legal Services** | OLS, ELS | Phase-1/3 |
| **Human Resources & Recruiting** | ERS | Phase-2 |
| **Technology & Software** | ITS | Phase-2 |
| **Agriculture & AgroTech** | AGTS, EAS | Phase-2/3 |
| **Environmental Services** | EAS, EPS | Phase-3 |
| **Jobs & Employment** | ERS | Phase-2 |
| **Travel & Tourism** | HMS, SOT | Phase-2 |
| **Other** | — | Reserved for future expansions |

---

## Industry STL Dependency Matrix

Which departments directly impact STL calculations for each industry?

```
GSM (E-commerce)
  └─ Primary: Wallet (fee tiers), Franchise (seller hierarchy)
  └─ Secondary: PSS (buyer trust, seller identity)
  └─ Impact: Daily earnings cap, search ranking, fee tier

WMS (Medical)
  └─ Primary: PSS (doctor/patient verification), CRB (credentials)
  └─ Secondary: Franchise (clinic networks)
  └─ Impact: Doctor STL → search ranking, appointment availability

HPS (Professional Services)
  └─ Primary: CRB (certifications, exams), Franchise (consultant networks)
  └─ Secondary: PSS (background checks)
  └─ Impact: Consultant STL → visibility, hourly rate, referral bonus

OBS (Education)
  └─ Primary: Franchise (school/instructor hierarchy), Affiliate (referral)
  └─ Secondary: CRB (instructor qualifications)
  └─ Impact: Instructor STL → course visibility, student cap, revenue share

OLS (Legal)
  └─ Primary: PSS (lawyer identity), CRB (bar membership, case wins)
  └─ Secondary: Franchise (law firm networks)
  └─ Impact: Lawyer STL → client acquisition, fee tier, contract notarization

AGTS (Agro-Tech)
  └─ Primary: Franchise (farmer/supplier networks), DMO (audit trust)
  └─ Secondary: CRB (soil test audits)
  └─ Impact: Farmer/supplier STL → bulk order eligibility, insurance tiers

HMS (Hospitality)
  └─ Primary: Wallet (escrow, STL-locked coins), Franchise (host networks)
  └─ Secondary: PSS (guest/host identity)
  └─ Impact: Host STL → booking visibility, cancellation penalties, insurance

ITS (Technology)
  └─ Primary: Franchise (vendor networks), CRB (portfolio audits)
  └─ Secondary: PSS (developer identity)
  └─ Impact: Developer STL → project visibility, code audit trust, commission

SOT (Sports & Tourism)
  └─ Primary: Franchise (guide/operator networks), Wallet (insurance tiers)
  └─ Secondary: CRB (safety certifications)
  └─ Impact: Guide STL → booking visibility, group size cap, insurance

EHB Tube (Video)
  └─ Primary: Affiliate (creator networks), DMO (content moderation)
  └─ Secondary: PSS (creator identity verification)
  └─ Impact: Creator STL → channel visibility, ad revenue %, demonetization risk
```

---

## Phase Launch Timeline

- **Phase-1 (Live):** GSM, WMS, HPS, OBS, OLS, LDS
- **Phase-2 (In dev):** AGTS, HMS, ITS, SOT, ERS, EFS
- **Phase-3 (Planned):** EHB Tube, EPS, EAS, ELS

Each phase involves:
1. Canonical spec in `ehb-info/departments/Industries.md`
2. STL ladder verification (source caps applied)
3. PSS/CRB role definitions
4. Franchise tier structure
5. API routes in `services/api/pss-backend/src/routes/`
6. UI pages in `apps/web/app/[industry]/`

---

## How to Add a New Industry

1. **Read** `EHB-FOLDER-FLOW-MASTER.md` (folder flow contract)
2. **Run** `scripts/add-industry.mjs [CODE] [Full Name]`
3. **Create** canonical spec in `ehb-info/departments/[INDUSTRY].md`
4. **Update** `Industries.md` with new entry (10 Main or 6 Support)
5. **Run** `node scripts/ehb-canonical-sync.mjs`
6. **Add API routes** following pattern in `services/api/pss-backend/src/routes/`
7. **Add UI** page following pattern in `apps/web/app/[industry]/page.tsx`

---

*EHB Technologies (Pvt.) Ltd. — v1.0 · 2026-04-15*
