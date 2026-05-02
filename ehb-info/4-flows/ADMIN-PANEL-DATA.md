# EHB · Admin Panel Data (auto-collector)

> **Purpose:** Jab b koi feature, industry, ya rule plan ho — uska **admin-side hissa**
> automatically yahan collect hota jayega. Founder ko bar bar yaad nahi rakhna parta.
>
> **Status:** Living document — auto-updated every session
> **Owner:** Claude (auto-fills) + Founder (approves)
> **Locked:** 2026-04-30 · v1.0

---

## 1. Why this file exists

Founder ki request:

> "Admin file b ban jaye jis mein kabhi sab kaamon ke during auto admin side ka data upload hota jaye"

Logic: Har feature ke 2 sides hain — **user side** (koi seller / buyer / rider use karta hai) aur **admin side** (DMO / inspector / founder dekhta + control karta hai). Admin side ka data alag-alag files mein scattered ho jata hai. Ye file central jagah hai.

Workflow: Kabhi bhi koi naya canonical file banaya jaye, AI ko **automatically check karna hoga** — "iss feature ka admin part kya hai?" — aur is file mein add karna hoga.

---

## 2. Admin panels (existing in EHB)

| Panel | Owner | Purpose | Spec file |
|---|---|---|---|
| 🏛 DMO Dashboard | DMO operators (Admin role) | Governance brain — KPIs, queues, alerts, user/seller actions | `2-phases/EHB-DMO-DASHBOARD-PLAN.md` + `apps/web/app/dmo/page.tsx` |
| 🛡 PSS Officer Console | PSS officers | KYC review queue, doc verification | `apps/web/app/dmo/pss/page.tsx` |
| 📜 CRB Officer Console | CRB officers | Exam grading, certificate signing, refill audits | `apps/web/app/dmo/crb/page.tsx` |
| ⚠ Up-Guard Monitor | Senior DMO + AI | Continuous fraud watch, T6 cluster detect | `apps/web/app/dmo/up-guard/page.tsx` |
| 🌐 Franchise Control | Country/Master franchise + DMO | Approve / monitor / sanction franchises | `apps/web/app/dmo/franchise/page.tsx` |
| 💰 Wallet Control | Treasury team | EHBGC mint/burn, lock/unlock approvals, slashing execution | `apps/web/app/dmo/wallet-control/page.tsx` |
| 🤖 AI Ops Panel | AI team | Module performance, confidence trends, retraining queue | `apps/web/app/dmo/ai-assistant/page.tsx` |
| 📊 Analytics Hub | Founder + DMO | Cross-system analytics, trends, forecasts | `apps/web/app/dmo/analytics/page.tsx` |
| ⛓ Blockchain Control | Tech team | Anchor batches, audit log, on-chain ops | `apps/web/app/dmo/blockchain/page.tsx` |
| 🚩 Flagged Users Review | DMO | Suspended / under-review queue, appeal mechanism | `apps/web/app/dmo/flagged/page.tsx` |
| 📣 Complaint Triage | DMO | AI-triaged complaints, manual escalation | `apps/web/app/dmo/complaints/page.tsx` |
| ⚙ Platform Settings | Founder | Global rules, industry boost, lock thresholds | `apps/web/app/dmo/settings/page.tsx` |

---

## 3. Per-feature admin-side template

Jab b koi naya feature plan ho, ye 6 questions answer karne hain (auto-collected here):

### Template

**Feature name:** ___
**User side:** Kya user dekhta + karta hai?
**Admin side checklist:**

1. **Visibility** — admin ko kya dikhna chahiye? (counts, status, alerts, history)
2. **Actions** — admin kya kar sakta hai? (approve, reject, edit, suspend, override, retry)
3. **Permissions** — kis role ko allow? (DMO L1 / L2 / Senior / Founder only)
4. **Audit trail** — har admin action log + Polkadot anchor?
5. **SLAs** — admin ka response time guarantee? (24h / 48h / 7d)
6. **Escalation** — agar admin act na kare, kahan jaye? (auto-escalate after N hours)

---

## 4. Admin-data per existing topic (auto-collected so far)

### 4.1 STL — Service Trust Level

| Aspect | Details |
|---|---|
| Visibility | All STL deltas live · MIN-chain blocking layer · per-user audit trail |
| Actions | Manual STL adjust (founder only) · audit recompute trigger · gold-master test review |
| Permissions | DMO Senior+ for adjusts · founder for formula changes |
| Audit | Every Δ logged + on-chain anchor |
| Panel | DMO Dashboard + STL Leaderboard |

### 4.2 PSS — Identity verification

| Aspect | Details |
|---|---|
| Visibility | KYC queue · doc OCR results · liveness scores · AML matches |
| Actions | Approve / Reject / Request more docs · Edit submitted data (with audit) |
| Permissions | PSS Officer L1+ for review · DMO Senior for L5+ edge cases |
| Audit | Every approve/reject signed by named officer + weekly QA |
| Panel | PSS Officer Console |

### 4.3 CRB — Skill verification

| Aspect | Details |
|---|---|
| Visibility | Exam queue · multimedia proofs · refill cycle status · expiring certs |
| Actions | Grade exam · Approve cert · Force re-test · Edit submission |
| Permissions | CRB Officer for grading · DMO for high-tier (L7+) approval |
| Audit | Every grade + comment logged · disputes auto-escalate |
| Panel | CRB Officer Console |

### 4.4 DMO — Behavior monitoring

| Aspect | Details |
|---|---|
| Visibility | Live activity feed · complaint queue · flagged users · Up-Guard alerts |
| Actions | Suspend / Warn / Clear · escalate to senior · re-categorize complaint |
| Permissions | DMO L1 for routine · Senior for suspends · Founder for permanent bans |
| Audit | Every action signed + reason mandatory |
| Panel | DMO Dashboard (main) |

### 4.5 EHBGC Lock & Slashing (NEW from Batch-5 decisions)

| Aspect | Details |
|---|---|
| Visibility | Total locked $ · slash events per week · pool health · yield distribution |
| Actions | Manual slash · Manual unlock approval · Pool config edit · Insurance approve |
| Permissions | Treasury team for locks · DMO Senior for slashing · Founder for major policy |
| Audit | Slash events on-chain · appeals tracked |
| Panel | Wallet Control |

### 4.6 Industries (38) — Per-industry admin

| Aspect | Details |
|---|---|
| Visibility | Per-industry health · DMO mode per industry (FAST/BALANCED/STRICT/CRITICAL) · industry-boost config |
| Actions | Add/remove industry · adjust multiplier · change DMO mode · enable/disable in region |
| Permissions | Founder for add/remove · DMO Senior for mode change · Treasury for multiplier |
| Audit | Industry list versioned (v2.0) · changelog mandatory |
| Panel | Platform Settings → Industries |

### 4.7 Franchise — Sub L1-L10 + Master + Country

| Aspect | Details |
|---|---|
| Visibility | Application queue · health per franchise · refill status · revenue contribution |
| Actions | Approve / Reject / Suspend · re-tier · vouching transfer |
| Permissions | DMO + Master franchise for approvals · Country tier for cross-region |
| Audit | Application contracts on-chain |
| Panel | Franchise Control |

### 4.8 AI Marketplace — 6+ modules

| Aspect | Details |
|---|---|
| Visibility | Per-module session counts · confidence score trends · revenue per module |
| Actions | Disable/Enable module · adjust min STL · review flagged advisories |
| Permissions | AI team for tuning · DMO for moderation · Founder for module disable |
| Audit | Every advisory logged with confidence + outcome |
| Panel | AI Ops Panel |

---

## 5. Auto-fill rule (mandatory)

When AI generates ANY new spec file, AI must:

1. Check if feature has admin-side
2. If yes — append a row to §4 of this file with the 6-question template filled
3. Cross-link new admin panel page (if needed) in `4-flows/ADMIN-PANEL-DATA.md`
4. If new panel needed — also create stub in `apps/web/app/dmo/<panel-name>/`

This file becomes the **single dashboard** for "what does the admin see/do across the entire platform".

---

## 6. Open questions per panel

Per existing panel, founder needs to confirm:

| Panel | Pending question |
|---|---|
| DMO Dashboard | Sprint backlog of widgets to add |
| Up-Guard | Exact escalation thresholds |
| Wallet Control | Manual override approval count threshold |
| AI Ops | Retraining cadence policy |
| Analytics Hub | Custom report builder vs fixed reports |
| Platform Settings | Founder-only vs delegated keys for major policy |

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial admin auto-collector created — 12 existing panels mapped + 8 features auto-filled |
