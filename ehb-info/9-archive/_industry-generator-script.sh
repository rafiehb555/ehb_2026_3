#!/bin/bash
# Generate industry file with template
# Args: code name tier dmo_mode min_stl multiplier description country master corporate sub micro
gen_industry() {
local code="$1" name="$2" tier="$3" mode="$4" stl="$5" mult="$6" desc="$7"
local country="$8" master="$9" corp="${10}" sub="${11}" micro="${12}"
cat > "${code}.md" << INDUSTRY_EOF
# Industry: ${code} — ${name}

> **Status:** Canonical v1.0 · 2026-04-30
> **Tier:** ${tier} · **DMO Mode:** ${mode} · **Min STL to list:** ${stl} · **Industry Multiplier:** ${mult}×

## 1. Description

${desc}

## 2. Franchise hierarchy (5-tier)

| Tier | Role |
|---|---|
| Country | ${country} |
| Master | ${master} |
| Corporate | ${corp} |
| Sub | ${sub} |
| Micro | ${micro} |

## 3. CRB checklist (industry-specific)

- ID + KYC (universal)
- Industry-specific license / certification
- Practical exam (where applicable)
- Multimedia proof (photo/video)
- ${mode} mode = ${mode} approval depth

## 4. AI prompts (domain)

AI advisors for this industry need:
- Domain vocabulary
- Common transaction patterns
- Industry-specific fraud signals
- Compliance prompts
- Pricing intelligence

## 5. UI fields (industry-specific)

Standard fields PLUS:
- Industry-specific listing fields
- Required certifications display
- Industry-specific filters in search

## 6. Compliance (per country)

Country-specific rules apply. See \`9-legal/KYC-LAWS.md\` + \`9-legal/FINANCIAL-COMPLIANCE.md\`.

## 7. Listing rules

- Min STL to list: ${stl}
- EHBGC lock: per industry multiplier ${mult}×
- DMO mode: ${mode}
- Per industry: see \`4-flows/INDUSTRY-RULES.md\`

## 8. Earnings model

- Order commission split (70/10/10/10) per universal rule
- Per-tier franchise share per \`11-franchise/FRANCHISE-EARNINGS.md\`
- Industry-specific verification fees + premiums

## 9. Common complaints + handling

Per universal dispute flow (\`4-flows/DISPUTE-FLOW.md\`).
Industry-specific severity + handling per local custom.

## 10. Cross-references

- Industries master: \`3-departments/Industries.md\`
- Industry mapping: \`4-flows/INDUSTRY-MAPPING.md\`
- Industry rules: \`4-flows/INDUSTRY-RULES.md\`
- Industry × Franchise map: \`11-franchise/EHB-INDUSTRY-FRANCHISE-MAP.md\`
- Core Engine: \`_settings/EHB-CORE-ENGINE.md\`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial industry sub-spec |
INDUSTRY_EOF
}

# === TIER 1 — 16 Phase-1 + Phase-2 core industries ===
gen_industry "GSM" "GoSellr (E-commerce)" "Tier 1" "FAST" "L1" "1.3" "Main e-commerce + services marketplace · backbone of EHB" "EHB Commerce Head" "City Warehousing + Distribution" "Big sellers / brands" "Shops / resellers" "Dropshippers / affiliate sellers"
gen_industry "WMS" "World Medical Services" "Tier 1" "CRITICAL" "L4" "2.0" "Healthcare + telemedicine + AI Diagnosis (HIPAA-aligned, life-impact regulated)" "National healthcare network" "City hospitals group" "Hospitals / labs" "Clinics / pharmacies" "Nurses / home service providers"
gen_industry "HPS" "Human Performance Solution" "Tier 1" "BALANCED" "L1" "1.2" "Courses, certifications, fitness training, skill tracking · learning + wellness" "National wellness authority" "Regional fitness network" "Gyms / institutes" "Trainers / coaches" "Freelance trainers"
gen_industry "OBS" "Online Book Store" "Tier 1" "BALANCED" "L1" "1.0" "Books + digital learning content + publisher network" "Content distribution" "Regional book hubs" "Publishers" "Book sellers" "Digital resellers"
gen_industry "OLS" "Online Law Services" "Tier 1" "CRITICAL" "L3" "2.0" "Legal consultation, case handling, contracts, AI Lawyer · jurisdiction-aware" "Legal network" "Regional law groups" "Law firms" "Individual lawyers" "Legal assistants"
gen_industry "LDS" "Logistics & Delivery Services" "Tier 1" "BALANCED" "L1" "1.0" "Delivery + rider management · last-mile + warehousing" "Logistics control" "Regional hubs" "Delivery companies" "Riders network" "Delivery riders"
gen_industry "AGTS" "Advanced Global Travel Services" "Tier 1" "BALANCED" "L1" "1.0" "Tickets, hotels, travel packages, visas · cross-border bookings" "Travel authority" "Regional operators" "Travel agencies" "Agents" "Ticket resellers"
gen_industry "HMS" "Human Machinery Solutions" "Tier 1" "BALANCED" "L2" "1.5" "Machinery services, repair, maintenance · industrial equipment" "Industrial network" "Regional suppliers" "Factories" "Workshops" "Technicians"
gen_industry "ITS" "Industrial Technology Services" "Tier 1" "BALANCED" "L2" "1.3" "Industrial solutions, automation, IoT · enterprise tech" "Tech control" "Regional IT hubs" "Software companies" "Dev teams" "Freelancers"
gen_industry "SOT" "Services of Technology" "Tier 1" "BALANCED" "L1" "1.3" "Web + app dev, AI services, consulting · tech freelance" "Tech services authority" "Regional service hubs" "IT firms" "Technicians" "Repair freelancers"
gen_industry "ERS" "EHB Real Estate Services" "Tier 1" "STRICT" "L2" "1.5" "Property buy/sell, rental, valuation · property network" "Property network" "City real estate heads" "Builders" "Agents" "Brokers"
gen_industry "EFS" "EHB Financial Services" "Tier 1" "CRITICAL" "L3" "2.0" "Payments, financial tools, investments · regulated finance" "Financial system control" "Regional finance hubs" "Banks / firms" "Agents" "Freelance advisors"
gen_industry "EPS" "EHB Professional Services" "Tier 1" "BALANCED" "L1" "1.0" "Freelancers, consultants, contractors · professional gig economy" "Professional network" "Regional experts" "Firms" "Consultants" "Freelancers"
gen_industry "EAS" "EHB Agriculture Services" "Tier 1" "BALANCED" "L1" "1.0" "Farming solutions, equipment, supplies · agri-tech" "Agri network" "Regional farms" "Companies" "Farmers" "Workers"
gen_industry "ELS" "EHB Local Services" "Tier 1" "FAST" "L1" "1.0" "Local services marketplace, handymen, tutors · neighborhood services" "Local services control" "City network" "Service companies" "Shops" "Workers"
gen_industry "EHB_TUBE" "EHB Media Platform" "Tier 1" "BALANCED" "L1" "1.0" "Verified video sharing, content creators · EHB's YouTube alternative" "Content control" "Regional creators network" "Studios" "Channels" "Creators"

# === TIER 2 — 16 expansion ===
gen_industry "RES" "Real Estate Services (Expanded)" "Tier 2" "STRICT" "L2" "1.5" "Construction, property development, leasing · large-scale real estate" "National property authority" "Regional developers" "Construction firms" "Junior agents" "Field workers"
gen_industry "FBS" "Food & Beverage Services" "Tier 2" "FAST" "L1" "1.0" "Restaurants, catering, food delivery · F&B marketplace" "F&B authority" "City F&B network" "Restaurant chains" "Restaurants" "Riders / cooks"
gen_industry "ATS" "Automotive & Transportation Services" "Tier 2" "BALANCED" "L2" "1.2" "Car rentals, repairs, maintenance, sales" "Auto network" "Regional dealerships" "Auto firms" "Workshops" "Mechanics"
gen_industry "CNS" "Construction & Engineering Services" "Tier 2" "STRICT" "L2" "1.5" "Builders, contractors, project management · regulated trade" "Construction authority" "Regional contractors" "Construction firms" "Sub-contractors" "Skilled tradespeople"
gen_industry "BCS" "Beauty & Cosmetics Services" "Tier 2" "FAST" "L1" "1.0" "Salons, spas, beauty products" "Beauty authority" "City beauty network" "Salon chains" "Salons" "Makeup artists"
gen_industry "FWS" "Fashion & Wardrobe Services" "Tier 2" "BALANCED" "L1" "1.0" "Clothing, tailors, fashion design" "Fashion authority" "Regional fashion network" "Brands" "Shops" "Designers"
gen_industry "MAS" "Manufacturing & Assembly Services" "Tier 2" "BALANCED" "L2" "1.2" "Contract manufacturing, parts, assembly · B2B production" "Manufacturing authority" "Regional factories" "Manufacturers" "Workshops" "Skilled workers"
gen_industry "GES" "Gaming & Entertainment Services" "Tier 2" "BALANCED" "L1" "1.0" "Gaming platforms, tournaments, events" "Gaming authority" "Regional esports network" "Studios" "Tournament organizers" "Streamers"
gen_industry "EHB_MUSIC" "Music & Audio Services" "Tier 2" "BALANCED" "L1" "1.0" "Musicians, producers, audio engineering" "Music authority" "Regional studios" "Labels / production cos" "Studios" "Independent musicians"
gen_industry "PTS" "Pets & Animal Services" "Tier 2" "BALANCED" "L2" "1.1" "Veterinary, grooming, pet supplies" "Pet care authority" "City vet network" "Vet hospitals" "Vet clinics" "Pet handlers"
gen_industry "WES" "Wedding & Events Services" "Tier 2" "BALANCED" "L1" "1.0" "Wedding planning, catering, venues" "Events authority" "Regional event network" "Event companies" "Planners" "Event helpers"
gen_industry "FIN" "Finance & Investment Services" "Tier 2" "CRITICAL" "L4" "2.0" "Banking, loans, investment advisory · highly regulated" "Financial authority" "Regional finance hubs" "Banks" "Advisory firms" "Financial planners"
gen_industry "TCS" "Telecom & Communication Services" "Tier 2" "BALANCED" "L2" "1.2" "Telecom, ISP, communication solutions" "Telecom authority" "Regional telco network" "ISPs / Telcos" "Resellers" "Field technicians"
gen_industry "MFS" "Manufacturing & Food Safety" "Tier 2" "STRICT" "L3" "1.5" "Food safety, QA, compliance, certification" "Food safety authority" "Regional auditor network" "Audit firms" "Local auditors" "Quality auditors"
gen_industry "EDS" "Education & Development Services" "Tier 2" "BALANCED" "L1" "1.2" "Skills training, vocational, tutoring" "Education authority" "Regional ed-tech" "Institutes" "Coaching centers" "Tutors"
gen_industry "GSS" "Green & Sustainable Services" "Tier 2" "BALANCED" "L1" "1.1" "Renewable energy, sustainability consulting" "Green authority" "Regional sustainability hubs" "Green firms" "Local installers" "Green-tech installers"

# === TIER 3 — 6 advanced ===
gen_industry "INS" "Insurance Services" "Tier 3" "CRITICAL" "L3" "2.0" "Insurance products, claims, underwriting · regulated" "Insurance authority" "Regional insurance network" "Insurance companies" "Brokerages" "Agents"
gen_industry "LSM" "Logistics & Supply Chain Management" "Tier 3" "STRICT" "L2" "1.5" "Supply chain, warehousing, distribution · enterprise logistics" "Supply chain authority" "Regional logistics" "3PLs" "Local fleet operators" "Independent fleet operators"
gen_industry "HCS" "Health & Compliance Services" "Tier 3" "STRICT" "L3" "1.5" "Regulatory compliance, auditing, certification · health-focused" "Compliance authority" "Regional auditors" "Audit firms" "Local auditors" "Auditors"
gen_industry "SCS" "Security & Cyber Services" "Tier 3" "CRITICAL" "L3" "1.5" "Cybersecurity, physical security, consulting" "Security authority" "Regional security hubs" "Security firms" "Local security cos" "Analysts"
gen_industry "RRS" "Research & R&D Services" "Tier 3" "BALANCED" "L2" "1.2" "Research, data analysis, innovation labs" "Research authority" "Regional research hubs" "Research firms" "Independent labs" "Researchers"
gen_industry "CMS" "Consulting & Management Services" "Tier 3" "BALANCED" "L1" "1.0" "Business consulting, strategy, management" "Consulting authority" "Regional consulting" "Consulting firms" "Independent consultants" "Advisors"

echo "✓ All 38 industry files generated"
ls -1 *.md | wc -l
