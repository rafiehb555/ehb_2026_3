# DMO 12 Founder Questions — Proposed Answers

> **Status:** PROPOSED v1 · 2026-04-30 · Awaiting founder confirmation
> **Lock authority:** Founder + DMO Council
> Once locked, these go into `FLOW-SCHEMA-V2.json dmo_governance` constants.

---

## Q1. DMO officer salary or commission model?

**Proposed:** Hybrid — base salary + performance bonus.

| Component | Detail |
|-----------|--------|
| Base salary | Country-tier scaled (e.g., PK $800/mo, AE $2,500/mo, US $4,500/mo) |
| Performance bonus | 0–25% of base, tied to: cases closed, accuracy (overturn rate), SLA |
| Slashing fee share | 5% of platform-collected slashing fees → DMO bonus pool |
| Equity | 0.005% per officer per year (top performers) |

Funded by: EHB Treasury (37% of verification fees + 5% of slashings).

---

## Q2. Complaint resolution SLA?

**Proposed:** Tiered by severity.

| Severity | Acknowledge | First review | Final resolution |
|----------|------------|--------------|------------------|
| T1 (info) | 24h | 7d | 30d |
| T2 (low) | 12h | 3d | 14d |
| T3 (medium) | 4h | 24h | 7d |
| T4 (high) | 1h | 4h | 48h |
| T5 (critical) | 15 min | 1h | 24h |
| T6+ (fraud) | Immediate | Immediate | 12h |

Breach SLA → automatic escalation to DMO Senior.

---

## Q3. Fraud penalty %?

**Proposed:** Tiered + capped (matches existing slashing rules).

| Type | Penalty | Cap per window |
|------|--------:|:--------------:|
| Identity fraud (T6) | 100% slash + ban | n/a |
| Order fraud (T5) | 50% slash | 50%/30d |
| Refund abuse (T4) | 25% slash | 50%/30d |
| Late delivery (T3) | 5% slash | 50%/30d |
| Refill miss (T2) | 10% slash | 50%/30d |

Already in `FLOW-SCHEMA-V2.json constants.slashing`.

---

## Q4. Appeal system?

**Proposed:** YES, 3-tier appeal.

```
Decision by DMO Officer
    ↓ user appeals (within 7 days)
Reviewed by DMO Senior (within 14 days)
    ↓ user appeals further (within 7 days)
DMO Council vote (within 30 days)
    ↓
FINAL — binding
```

Appeal fee: $5 (refunded if appeal upheld).
Frivolous appeals (3rd rejected within 6 months) → STL slash.

---

## Q5. Verifier reward system?

**Proposed:** Already locked in CRB §9.4 (verification fee split: verifier 45%).

Plus performance bonus:
- Clean record (no overturned verifications) → +10% rate
- High-volume (top 10%) → +bonus per quarter
- Multi-industry verifications → +5% per industry beyond 1st

---

## Q6. Conflict of interest rule?

**Proposed:** Strict.

| Relationship to applicant | Action |
|---------------------------|--------|
| Family (1st-degree) | Mandatory recusal |
| Family (2nd-degree) | Disclosure + DMO assigns alternate |
| Same business interest | Mandatory recusal |
| Past dispute (closed > 12mo) | Discretionary recusal |
| Friendship/social | Disclosure required |

Violation = DMO officer immediate suspension + STL slash + role termination.

---

## Q7. Cross-country dispute handling?

**Proposed:** Buyer's country jurisdiction primary; both countries' DMO consulted.

```
Buyer in PK · Seller in AE
        ↓
Primary jurisdiction: PK DMO (buyer protection rules)
Consulted: AE DMO (seller's local laws)
Final ruling: Joint decision; if disagree → DMO Council (global) tiebreaker
```

Currency conversion for refunds: at order date FX + 0.5% buffer.

---

## Q8. High STL users priority?

**Proposed:** YES, but with cap to prevent abuse.

| User STL | Priority |
|----------|----------|
| L1-L4 | Normal queue |
| L5-L7 | +1 priority tier |
| L8-L10 | +2 priority tiers (still subject to SLA) |

Cap: high-STL users cannot bypass critical-severity rules. SLA stays the same; only queue ordering changes.

---

## Q9. Manual override allowed?

**Proposed:** YES, with strict logging + 3-tier approval.

| Override level | Approver | Logged |
|----------------|----------|--------|
| Score override (single user) | DMO Manager | YES |
| Bulk override (industry-wide) | DMO Director | YES + Council notice |
| Formula override (STL formula) | Founder + Council vote | YES + chain anchor |

Every override = audit trail entry + 24h notification to all affected.

---

## Q10. Franchise vs DMO final authority?

**Proposed:** DMO supreme on platform rules; franchise supreme on local execution.

```
Platform rules (STL formula, fees, slashing) → DMO final
Local operations (territory, hours, language) → Franchise final
Conflict → DMO Council tiebreaker
```

Franchise can NEVER:
- Override slash decisions
- Modify STL formula
- Bypass KYC requirements
- Change revenue split

Franchise CAN:
- Set local hours, languages, marketing
- Hire local staff
- Adjust local promotions (within EHB caps)

---

## Q11. Anonymous complaint allowed?

**Proposed:** YES, with whistleblower protection.

| Type | Identity |
|------|----------|
| Anonymous tip | Allowed; for investigation only, not legal action |
| Verified complaint | Identity tied; can lead to formal action |
| Whistleblower (employee) | Identity protected; reward if substantiated |

Anonymous tips below evidence threshold → archived. Above threshold → DMO opens internal investigation.

---

## Q12. Auto-ban threshold?

**Proposed:** Multi-factor, not single-trigger.

| Trigger | Action |
|---------|--------|
| 3 fraud strikes (T6) within 12 months | Auto-ban |
| 5 upheld complaints (any tier) within 6 months | Auto-suspend (30 days) → manual review for ban |
| Single $100K+ fraud | Auto-freeze + DMO immediate review |
| 10+ upheld complaints lifetime | Permanent ban |
| Sanctions list match (OFAC, UN, EU) | Auto-block |

Auto-ban appealable once. Manual review for reinstatement after 12 months.

---

## Lock Status

Once founder confirms each answer:
1. Update this file with `LOCKED [date]`
2. Add `dmo_governance` block to `FLOW-SCHEMA-V2.json`
3. Wire constants into `dmoControl.js`
4. Update `DMO.md` § governance
5. Build founder-approval form for any future changes

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-04-30 | 1.0 | Initial proposed answers — awaiting founder confirmation |
