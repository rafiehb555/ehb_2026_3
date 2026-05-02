# JPS — Job Profile & Skill System

**Status:** Canonical spec (v1.0) · 2026-04-18
**Related:** PSS.md v3.0 (identity), CRB.md (exams/certifications), STL.md v1.1 (trust scoring), DMO.md v1.3 (governance)

---

## 1. Purpose

JPS is the complete career + jobs + skills ecosystem within EHB. It covers job posting, skill verification, AI matching, exams, contracts, salary, and inspector management. JPS is NOT just a job board — it is a trust-verified career platform where STL determines job access and salary tiers.

## 2. JPS Dashboard Sections

| Section | Purpose |
|---------|---------|
| Profile STL (Personal Trust) | User's personal STL level display + progress |
| Skills & Certifications | CRB-linked skill verification + exam results |
| Job Applications | Apply, track, manage applications |
| Active Jobs | Currently active job assignments |
| Earnings / Salary | Salary tracking, payment history |
| Contracts | Active/expired/renewed contracts |
| Exam System | MCQ, practical, video tests (CRB approved) |
| Inspector Management | Field inspectors for CRB, job verification, work audits |

## 3. Complete Job Flow

```
User Register → PSS Complete → JPS Profile Create → Skill Add → Exam (CRB) → Apply Job → AI Matching → Interview/Selection → Contract Start → Work Tracking → Salary Release
```

Each step is event-driven. User cannot skip steps (PSS gate enforced).

## 4. Job Designations (STL + CRB based)

| Designation | Requirements |
|-------------|-------------|
| Junior | PSS L3+, basic skills, entry exam |
| Intermediate | PSS L4+, 6+ months experience, intermediate exam |
| Senior | PSS L5+, 1+ year, advanced exam + CRB certification |
| Expert | PSS L7+, 2+ years, expert exam + CRB physical verification |

Designations are EARNED through STL + CRB, not self-assigned.

## 5. Exam System

| Type | Format | Verified By |
|------|--------|-------------|
| MCQ | Multiple choice (timed, AI-proctored) | AI auto-grade |
| Practical | Task-based assessment | CRB inspector review |
| Video Test | Live video demonstration of skill | CRB approve |

Exam results feed CRB level. Pass = CRB level up. Fail = retry after 30 days.

## 6. Contract System

| Field | Rule |
|-------|------|
| Start Date | Set at hiring |
| End Date | Fixed-term (3/6/12 months) or open-ended |
| Auto Expiry | Contract expires if not renewed 7 days before end |
| Renewal | Both parties must agree; new contract created |
| Termination | Early exit = penalty (STL impact + contract breach fee) |

## 7. Inspector Management

Inspectors are CRB-linked field agents who:
- Perform physical job site verification
- Audit work quality
- Report to DMO via inspection reports (GPS + photos)
- Required PSS: L4+ (per PSS.md v3.0)

## 8. User Types in JPS

| Type | Role | PSS Min |
|------|------|---------|
| Employer | Posts jobs, hires, manages contracts | L2 (L3 recommended) |
| Job Seeker | Creates profile, applies, takes exams | L1 (L3 recommended for visibility) |
| Inspector | Verifies job sites, audits work | L4 |
| Freelancer | Takes short-term tasks | L3 |

## 9. STL Impact on JPS

| Rule | Effect |
|------|--------|
| Low personal STL → fewer jobs visible | System filters high-tier jobs from low-STL users |
| High STL → higher salary tier access | L7+ = premium job access |
| Company STL → hiring quality | High STL company attracts better candidates |
| STL in job ranking | Higher STL job seekers shown first to employers |

## 10. Salary & Payment Model (LOCKED)

**Salary Types:**
| Type | Model | Example |
|------|-------|---------|
| Full-time | Monthly fixed salary | Rs. 50,000/month |
| Freelance | Per-task payment | Rs. 500–5,000/task |
| Commission | Percentage-based (optional roles) | 5–15% of deal |

**Payment Flow:**
1. Salary calculated → sent to EHB Wallet
2. User choice: hold in wallet / bank transfer / reinvest
3. All payments tracked in wallet history

**Key rule:** All salary goes through EHB Wallet first (control + escrow + audit trail).

## 11. Inspector Earning Model (LOCKED)

**Hybrid model:**
| Component | Amount |
|-----------|--------|
| Base salary | ~20,000 PKR/month |
| Per inspection | 300–800 PKR/inspection |
| STL bonus | High STL = higher per-inspection rate |

## 12. FREE User Access in JPS (LOCKED)

| Action | L0–L2 Users |
|--------|-------------|
| Browse jobs | ✅ Allowed |
| Apply | ✅ Limited (3/week max) |
| Priority ranking | ❌ No |
| Badge | ⚠️ "Unverified" warning shown to employers |

## 13. AI Job Matching Priority (LOCKED)

Matching order (highest priority first):
1. **STL** (Trust level) — EHB is trust-first
2. **Skills** (matched to job requirements)
3. **CRB Certification** (exam/verification level)
4. **Experience** (years + completed contracts)
5. **Location** (proximity to job)

## 14. Contract Violation Rules (LOCKED)

Progressive penalty system:
| Strike | Penalty |
|--------|---------|
| 1st violation | Warning + log entry |
| 2nd violation | Salary cut (pending salary deducted) |
| 3rd violation | STL drop (-2 levels) + contract cancelled |

All violations logged in audit trail. Employer notified at each step.

## 15. STL Impact on Jobs (LOCKED)

| Rule | Effect |
|------|--------|
| All jobs visible to all | ✅ Browse unrestricted |
| High STL = higher ranking | L7+ shown first to employers |
| Premium jobs gated | Some jobs require minimum STL (employer sets) |
| Company STL badge | Visible on job posts, filter: "L5+ companies only" |

## 16. Employment Types (LOCKED)

Both allowed:
- **Full-time:** Monthly contracts (3/6/12 months), fixed salary
- **Freelance:** Per-task gigs, flexible, per-task payment

## 17. Geographic Strategy (LOCKED)

| Phase | Region |
|-------|--------|
| Phase 1 | Pakistan (local market) |
| Phase 2 | Global expansion |

## 18. AI Interview System (LOCKED)

**Mode:** Optional (employer's choice)
- **AI Screening:** AI conducts initial video interview (scripted questions, response analysis)
- **Direct Interview:** Employer interviews directly
- **Hybrid:** AI screens first, pass candidates go to employer

Employer configures preference per job posting.

## Changelog

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-18 | 1.0 | Created from founder deep definition. 8 dashboard sections, complete job flow, 4 designations, exam system, contract rules, inspector management, STL impact rules. 9 open questions logged. |
| 2026-04-18 | 1.1 | All 11 open questions LOCKED. Added: salary model (full-time + freelance + commission), wallet-first payment, inspector hybrid earning, FREE user limits (3 apply/week), AI matching priority (STL→Skills→CRB→Experience→Location), contract violation progressive penalty, STL job impact, dual employment types, Pakistan-first strategy, optional AI interview. |
