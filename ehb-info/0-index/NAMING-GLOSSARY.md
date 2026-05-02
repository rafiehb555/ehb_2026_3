# EHB Naming Glossary — Canonical Names (LOCKED 2026-04-30)

> **Authority:** Founder
> **Status:** Locked — all docs + code use these names from 2026-04-30 onward
> **Acronyms preserved** to keep code/data compatibility

---

## 🏛 17 Internal Departments

| Acronym | Full Name | Purpose |
|---------|-----------|---------|
| **PSS** | **P**ersonal **S**ecurity **S**core | Identity + KYC verification |
| **CRB** | **C**ertification, **R**efill & **B**ackground | Skill exams + refill cycles + background checks |
| **STL** | **EHB STL** = EHB **S**ystem **T**rust **L**evel | Combined trust score (PSS + CRB + DMO history) |
| **DMO** | **D**igital **M**anagement **O**ffice | Governance + disputes + slashing |
| **EHB Wallet** | EHB Trusty Wallet | Money + escrow + locks |
| **EHBGC** | EHB Global Coin | Native token |
| **Commission** | EHB Commission Engine | Revenue split (70/10/10/10) |
| **Finance** | EHB Financial System | Treasury + tax + FX + reports |
| **EHB Dev AI** | EHB Artificial Intelligence (single brain) | Powers all 38 industries via config |
| **Blockchain** | EHB Blockchain (Polkadot anchor) | Audit trail + immutability |
| **Seller** | EHB Seller System | User-type operating on top of GoSellr/GSM |
| **Rider** | EHB Rider Network | Last-mile delivery (under LDS) |
| **JPS** | **J**obs **P**latform & **S**kills | Jobs + careers + AI matching |
| **Franchise** | EHB Franchise (5-tier) | Country → Master → Corporate → Sub → Micro |
| **Affiliate** | EHB Referral & Growth Engine | Multi-level commission |
| **GoSellr** | EHB Marketplace = **GSM** industry | Flagship vertical |
| **Industries** | EHB Industries Registry (37 verticals) | Master industry registry |

---

## 🌍 37 Industries (after ITS+SOT merge)

### **TIER 1 — Core (15) · Phase 1 launch**

| Code | Full Form |
|------|-----------|
| **GSM** | GoSellr Marketplace |
| **WMS** | Wellness & Medical Services |
| **HPS** | Human Performance Solution |
| **OBS** | Online Book Store |
| **OLS** | Online Legal Services |
| **LDS** | Logistics & Delivery Services |
| **AGTS** | Advanced Global Travel Services |
| **HMS** | **Hotel Management Services** ⭐ (machinery moved to ITS) |
| **ITS** | **Information Technology Services** ⭐ (absorbed ex-SOT: web/mobile/AI dev/cloud/cybersec) |
| **ERS** | EHB Real Estate Services |
| **EFS** | EHB Financial Services |
| **EPS** | EHB Professional Services |
| **EAS** | EHB Agriculture Services |
| **ELS** | EHB Local Services |
| **EHB_TUBE** | EHB Media Platform |

### **TIER 2 — Expansion (16) · Phase 2**
RES · FBS · ATS · CNS · BCS · FWS · MAS · GES · EHB_MUSIC · PTS · WES · FIN · TCS · MFS · EDS · GSS

### **TIER 3 — Emerging (6) · Phase 3**
INS · LSM · HCS · SCS · RRS · CMS

---

## 📋 Renames Applied (2026-04-30)

### Department renames

| Old Name | New Name | Reason |
|----------|----------|--------|
| Decentralized Management Office | **Digital Management Office** | Simpler · public-facing clarity |
| Central Record Blockchain | **Certification, Refill & Background** | Action-clear · matches actual function |
| Proof & Security System | **Personal Security Score** | Parallel to STL (both end "Score") |
| Job Profile & Skill System | **Jobs Platform & Skills** | "Platform" feel · clearer destination |
| AI Department | **EHB Dev AI** | Founder-mandated name |

### Industry changes

| Change | Detail |
|--------|--------|
| **SOT → ITS** | SOT (Services of Technology) merged into ITS. ITS now = "Information Technology Services" covering web/mobile/AI dev/cloud/cybersec + original industrial automation/IoT/robotics |
| **HMS rename** | Was "Human Machinery Solutions" → now "Hotel Management Services". Machinery services moved into ITS umbrella |
| **GSM full form** | "GoSellr Management System" → "GoSellr Marketplace" (cleaner) |
| **WMS full form** | "World Medical Services" → "Wellness & Medical Services" (broader) |
| **OLS full form** | "Online Law Services" → "Online Legal Services" (industry-standard) |

---

## 🛡 Auto-Apply Rules for Agents

When reading old files, agents should auto-apply these renames:
- `Decentralized Management Office` → `Digital Management Office` (DMO)
- `Central Record Blockchain` → `Certification, Refill & Background` (CRB)
- `Proof & Security System` → `Personal Security Score` (PSS)
- `Job Profile & Skill System` → `Jobs Platform & Skills` (JPS)
- `AI Department / AI System` → `EHB Dev AI` (where referring to the EHB department)
- `SOT industry` → redirect to `ITS`
- `Human Machinery Solutions` → `Hotel Management Services` (HMS)

Acronyms stay the same — only full names change.

---

## Linked
- `AGENT-CONTEXT-BUNDLE.md` — auto-load index
- `3-departments/*.md` — department specs
- `_settings/REGISTRY.json` — machine-readable index
- `apps/web/lib/industries.ts` — code source
- `services/api/src/routes/stlCalculator.js` — STL gate map

## Changelog

| Date | Change |
|------|--------|
| 2026-04-30 | LOCKED — all renames applied across docs + code |
