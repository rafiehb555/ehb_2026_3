# Top Companies by EHB STL — per Country

> **Status:** LOCKED v1.0 · 2026-05-02
> **Implementation:** `apps/web/lib/data/companies-by-stl.ts`
> **Disclaimer:** Companies listed are **planned partners + projected placements at launch · subject to verification**. NOT yet on-platform; this is target placement at the EHB STL their actual brand strength corresponds to.

---

## 🇵🇰 Pakistan (Phase 1 launch country)

| L# | Company | Sector | Initials | Initials Color (gradient) |
|----|---------|--------|----------|---------------------------|
| L1 | Walk-ins | — | — | — |
| L1 | Browsers | — | — | — |
| L2 | Saddar Mobile Hub | Retail | SM | gray |
| L2 | DHA Tuck Shop | Retail | DT | gray |
| L3 | Imtiaz Super Market | Grocery | IM | green |
| L3 | Daraz Top Sellers | Marketplace | DT | green |
| L3 | Naheed | Grocery | NH | green |
| L4 | Bykea | Mobility | B | `#042C53 → #F0B90B` |
| L4 | Foodpanda Pakistan | Delivery | F | `#A32D2D` |
| L4 | Careem | Mobility | C | `#1D9E75` |
| L5 | JS Bank | Banking | JS | `#534AB7` |
| L5 | Servis Group | Industrial | SG | `#534AB7` |
| L5 | Sapphire | Textiles | SP | `#F0997B` |
| L6 | Lucky Tex | Textiles | LT | `#BA7517` |
| L6 | Bonanza Garments | Apparel | BG | `#BA7517` |
| L6 | Hashoo Hotels | Hospitality | HH | `#BA7517` |
| L7 | TPL Trakker | Tech | TPL | `#E24B4A` |
| L7 | NetSol Technologies | Tech | NS | `#E24B4A` |
| L7 | Systems Limited | Tech | SL | `#E24B4A` |
| L8 | Engro Corporation | Industrial | EN | `#1D9E75` |
| L8 | Lucky Cement | Industrial | LC | `#1D9E75` |
| L8 | Fauji Fertilizer Co | Industrial | FFC | `#1D9E75` |
| L9 | HBL (Habib Bank) | Banking | HBL | `#185FA5` |
| L9 | MCB Bank | Banking | MCB | `#185FA5` |
| L9 | PSO (Pakistan State Oil) | Energy | PSO | `#185FA5` |
| L10 | Telenor Pakistan | Telecom | T | `#042C53 + gold` |
| L10 | Jazz | Telecom | J | `#A32D2D` |
| L10 | SBP Anchor | Regulator | SBP | `#042C53` |

---

## 🇦🇪 UAE (Phase 1)

| L# | Company | Sector |
|----|---------|--------|
| L4 | Careem (UAE HQ) | Mobility |
| L4 | Talabat | Delivery |
| L5 | Emaar | Real estate |
| L6 | Majid Al Futtaim | Retail |
| L7 | Etisalat | Telecom |
| L8 | Emirates NBD | Banking |
| L9 | DP World | Logistics |
| L10 | ADNOC | Energy |

---

## 🇸🇦 Saudi Arabia (Phase 1)

| L# | Company | Sector |
|----|---------|--------|
| L4 | Hungerstation | Delivery |
| L5 | Al Rajhi Bank | Banking |
| L6 | Saudi Telecom (STC) | Telecom |
| L7 | SABIC | Industrial |
| L8 | Saudi Aramco | Energy |
| L9 | Almarai | Food |
| L10 | PIF anchor | Sovereign |

---

## 🇹🇷 Turkey (Phase 1)

| L# | Company | Sector |
|----|---------|--------|
| L4 | Getir | Delivery |
| L5 | Trendyol | Marketplace |
| L6 | Hepsiburada | Marketplace |
| L7 | Türk Telekom | Telecom |
| L8 | Koç Holding | Industrial |
| L9 | Sabancı Holding | Conglomerate |
| L10 | Garanti BBVA | Banking |

---

## 🇲🇾 Malaysia (Phase 1)

| L# | Company | Sector |
|----|---------|--------|
| L4 | foodpanda MY | Delivery |
| L5 | Maybank | Banking |
| L6 | CIMB | Banking |
| L7 | Axiata | Telecom |
| L8 | Petronas | Energy |
| L9 | Sime Darby | Conglomerate |
| L10 | Public Bank | Banking |

---

## Phase 2 + 3 Countries

For **QA, KW, OM, ID, EG, GB, US, CA, DE, FR, CN, IN** — companies populated from country-specific market research files in `ehb-info/12-operations/COUNTRY-CONFIGS/`.

---

## 📦 Data Schema

```ts
interface CompanyByStl {
  countryCode: 'PK' | 'AE' | 'SA' | 'TR' | 'MY' | string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  name: string;
  sector: string;
  initials: string;          // 1-3 chars
  iconGradient: {            // for icon-square background
    from: string;
    to: string;
    text: string;            // contrast color
  };
  verified: boolean;         // false until on-platform
  industryCodes: string[];   // ['WMS', 'GSM', 'OLS'] etc.
}
```

---

## 🔁 Update Rule

When a company onboards on EHB:
1. Set `verified: true` in `companies-by-stl.ts`
2. Their actual `currentStl` (from API) overrides this projected placement
3. Adjust display: show real STL chip + green ✓ badge

---

## Linked
- `HOME-PAGE-DESIGN.md` — Section 4: Top {country} companies
- `STL-LADDER-COMPONENT.md` — Section context
- `apps/web/lib/data/companies-by-stl.ts` — runtime data
- `apps/web/components/home/CompaniesRow.tsx` — UI component
