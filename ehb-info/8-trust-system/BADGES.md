# EHB · Badges System

> **Status:** Canonical v1.0 · 2026-04-30

## Badge categories

| Category | Purpose | Visible |
|---|---|---|
| **STL tier** | Visual STL level (L1-L10) | Always |
| **Verification** | PSS, CRB, KYB status | Always |
| **Industry** | Industry-specific certs | Industry pages |
| **Achievement** | Streaks, milestones | Profile |
| **Special** | Founder, ambassador, beta | Special |
| **Trust** | Premium-trusted, verified-genuine | Product cards |

## STL tier badges (from `STL-AUDIT-AND-IMPROVEMENTS.md §12`)

10 distinct visual badges per level — see `EHB-STL-AUDIT-AND-IMPROVEMENTS.md §12.1` for full design system.

| Level | Symbol | Tier color |
|---|---|---|
| L1 FREE | 🌱 sapling | Gray |
| L2 BASIC | 🥉 coin | Bronze |
| L3 NORMAL | 🛡 shield | Bronze-amber |
| L4 STANDARD | ⭐ star | Amber |
| L5 ADVANCED | 🥈 hexagon | Silver |
| L6 HIGH | 🛡⭐ shield+star | Silver-bright |
| L7 PRO | 🥇 medal+ribbon | Gold |
| L8 VIP | 👑 crown | Gold-bright |
| L9 ELITE | 💎 diamond | Purple |
| L10 SUPREME | 🏆 trophy+aura | Purple-teal |

## Verification badges

| Badge | Meaning |
|---|---|
| 🆔 PSS Verified L# | Identity verified at L# |
| 📜 CRB Certified <industry> | Industry skill certified |
| 🏢 KYB Verified | Business verified |
| ⛓ On-chain Anchored | Polkadot signature |
| 👁 Inspector Visited | Physical verification done |

## Industry badges

| Badge | Industry |
|---|---|
| 🩺 Medical Licensed (WMS) | Healthcare verified |
| ⚖️ Bar Registered (OLS) | Legal practice cert |
| ⚡ Electrical Certified (Electrical) | Safety + skill |
| 🏗 Construction Bonded (RES/CNS) | Insurance + license |
| 🍽 Food Safety Certified (FBS/MFS) | HACCP cert |
| 🛡 Security Cleared (SCS) | Background check passed |

## Achievement badges

| Badge | Trigger |
|---|---|
| 🔥 90-day Streak | 90 days clean record + 5-star avg |
| 💯 100 Orders | 100 successful orders |
| 🌟 Top Rated | Top 5% in category |
| 🎯 First in Industry | First seller in new industry |
| 🚀 Fast Climber | L1 → L5 in 30 days |
| 🤝 100 Referrals | 100 affiliate signups |
| 💼 Power Seller | $100K+ revenue (annual) |

## Special badges

| Badge | Meaning |
|---|---|
| 🏛 Founder | EHB founder identifier |
| 🎓 Beta User | Phase-1 early adopter |
| 🌐 Global Ambassador | Country/region ambassador |
| 🧪 Insider | Pre-launch tester |

## Trust badges (product/service cards)

| Badge | When shown |
|---|---|
| 🛡 Premium-Trusted | L7+ product STL · multi-verification |
| ✅ Verified Genuine | Direct manufacturer · L8+ chain |
| 🏛 Franchise Endorsed | Sub L5+ vouches the seller |
| 🌍 Multi-Industry Verified | 2+ industry certifications |
| 💎 EHB Elite | L9-L10 entity |
| 🔒 Skin-in-Game | Seller has 1000+ EHBGC locked |

## Badge display rules

- STL tier badge: ALWAYS visible (every product card, profile)
- Verification: shown on profile + product cards
- Achievement: shown on profile only
- Industry: shown on industry-specific pages + product cards in that industry
- Trust: shown on product/service cards prominently

## Earning + losing badges

- Most badges auto-earned on threshold met
- Streak badges reset on penalty
- Achievement badges permanent (don't decay)
- Verification badges revoked on slashing/ban

## Cross-references

- STL badges design: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §12`
- Verification: `VERIFICATION.md`
- Reputation: `4-flows/REPUTATION-SYSTEM.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial badge system with 6 categories |
