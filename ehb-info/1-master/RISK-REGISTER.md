# EHB · Risk Register (locked from founder vision)

> **Source:** Founder confirmed 2026-04-30 — "ya sub" (all major risks acknowledged)
> **Status:** Canonical v1.0
>
> Founder's stance: All 5 major risks (fraud, regulation, capital, competition, tech complexity) are simultaneously material. Mitigation strategy must cover all 5.

---

## 1. Risk matrix (top 20)

### 🔴 Critical (existential — could kill EHB)

| # | Risk | Category | Probability | Impact | Mitigation |
|:---:|---|---|:---:|:---:|---|
| 1 | Mass fraud event (T6 cluster across multiple regions) | Fraud | Med | Catastrophic | DMO Up-Guard live monitoring · Buyer Trust Score · AI Fraud Forecaster · STL slashing |
| 2 | Regulatory ban in major country (PK, SA, US, EU) | Regulation | Med | Catastrophic | Country-aware compliance · DMO STRICT/CRITICAL modes · Legal advisory per region |
| 3 | EHBGC token classified as security (forced delisting) | Regulation | Med | Severe | Utility-token positioning · No yield promise to non-stakers · USD-pegged display |
| 4 | Capital runway exhausted before profitability | Capital | High Y1, Med after | Catastrophic | Multi-stream revenue · Lean burn · Phase-gated spending |
| 5 | Polkadot or chain-of-choice fails / loses adoption | Tech | Low | Severe | Adapter pattern — abstract blockchain · multi-chain ready |

### 🟠 High (severe — major setback)

| # | Risk | Category | Mitigation |
|:---:|---|---|---|
| 6 | KYC adapter (Jumio/Onfido/NADRA) downtime or delisting | Tech | Multiple adapter contracts · graceful degrade |
| 7 | Payment gateway failure in major country | Tech | Multi-gateway adapter · 3+ providers per country |
| 8 | Major competitor copies model with 10× capital | Competition | Network effects (franchise + reviews) · STL moat hard to clone |
| 9 | Sustained negative press from quality failures | Reputation | DMO transparency · public audit trail · responsive complaint handling |
| 10 | Founder/key person risk | Operational | Documentation · canonical files · Claude as co-pilot · succession plan |
| 11 | Cyberattack / data breach | Tech | Bank-level encryption · regular pentests · bug bounty |
| 12 | EHBGC price crash before stabilization | Capital | Lock-yield mechanics · burn for STL boost · USD-pegged minimums |

### 🟡 Medium (manageable — disruptions)

| # | Risk | Category | Mitigation |
|:---:|---|---|---|
| 13 | Inspector / DMO burnout (moderation overload) | Operational | AI-first triage · workload balancing · franchise distributed |
| 14 | Industry expansion outpaces compliance | Regulation | Industries.md gating · DMO STRICT mode for new |
| 15 | Translation quality issues (multilingual) | UX | AI translation + human QA · community feedback loop |
| 16 | False-positive fraud flags hurt good users | UX | Appeal mechanism · multi-tier review · STL recovery path |
| 17 | Seller dependency on single platform | Business | Open data export · low EHBGC unlock penalty for genuine churn |
| 18 | AI Marketplace AI hallucination causes harm | Tech / Legal | "AI advisor, platform confirms" disclaimer · DMO review on flagged |
| 19 | Refill cadence too aggressive — sellers churn | Business | Per-industry calibration · grace periods · STL.md §10 questions resolve |
| 20 | Ecosystem complexity overwhelms users | UX | Founder communication rules · auto-help · STL coach AI |

## 2. Per-category response

### Fraud (top focus area — STL system designed for this)

- DMO Up-Guard continuous monitoring
- AI Fraud Forecaster predictive
- AI Anomaly Detector for spikes
- Buyer Trust Score separate from STL
- T6 cluster detection auto-flag
- 100% slash on confirmed fraud (canonical Q4)
- Multi-layer MIN-chain prevents bypass

### Regulation (global = high regulatory load)

- Country-aware compliance (per Phase-1 launch country)
- KYC adapters multiple providers
- Industry-specific compliance matrix (Healthcare, Legal, Finance highest scrutiny)
- DMO STRICT/CRITICAL modes auto-throttle high-risk
- Legal advisory entity (3rd-party) per country
- Audit trail Polkadot-anchored = regulator-friendly

### Capital

- Lean Phase-1 (6 industries, focused build)
- Multi-stream revenue activated early (commission + franchise + EHBGC + AI marketplace + subscription)
- Franchise capital raises = effective alternative to VC
- Burn rate gates per phase
- Cost-estimates locked per phase

### Competition

- Network effects (franchise on-ground + STL reputation moat)
- Open-ended industries — moving target
- Trust system (STL) is years-deep moat — hard to replicate
- Cross-industry STL portability = lock-in

### Tech complexity

- Adapter pattern everywhere (KYC, payment, blockchain, AI)
- Single canonical truth folder (`ehb-info/`)
- Auto-discovery (`_settings/`)
- Phased build (don't build all 38 at once)
- 58-test gold-master protect critical formulas
- Founder + AI co-pilot = lower coordination cost

## 3. Re-review cadence

- **Weekly:** check top 5 risks against `ehb-status.json`
- **Monthly:** review full register, update probabilities
- **Quarterly:** add new risks, retire mitigated ones
- **Per-phase-launch:** dedicated risk audit

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial 20-risk register from founder "ya sub" answer |
