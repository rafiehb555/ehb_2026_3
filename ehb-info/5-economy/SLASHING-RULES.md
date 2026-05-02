# EHB · Slashing Rules

> **Status:** Canonical v1.0 · 2026-04-30
> **Locked decision:** Q4 in `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1`

## Slashing schedule

| Trigger | Slash % | + STL effect |
|---|---:|---|
| **Confirmed fraud (T6)** | 100% lock | Permanent ban + ban from all entities owned |
| **Unresolved complaint > 30 days** | 25% | -2 STL |
| **Refill miss × 2** | 10% | -1 STL |
| **Late delivery × 3 in window** | 5% | -0.5 STL |
| **Premature unlock (after grace)** | 15% | -2 STL |
| **CRB cert forged** | 50% + ban from industry | -3 STL |
| **PSS doc forged** | 75% + permanent ban | -5 STL |
| **DMO action ignored** | 5% per ignored action | -0.5 each |
| **Buyer harassment** | 10% | -1 STL |
| **Insurance fraud claim** | 50% + insurance ban | -2 STL |

## Slash cap (per Q4)

> **Maximum 50% per window**

Multiple offenses in same period combine, but total slash ≤ 50%.

Exception: confirmed T6 fraud → 100% (no cap, ban with it).

## Slash window

- Rolling 30-day window
- Counts complaints + refill misses + late deliveries
- After 30 days: cleared if no new offense

## Stacking rules (per Q4 sub-question)

```
Total slash this window = sum of all slash %
   ↓
If sum > 50%: cap at 50%
If T6 fraud confirmed: 100% (overrides cap, ban added)
```

## Examples

### Example 1: Multiple offenses

```
Refill miss × 2 (10%) + Late delivery × 3 (5%) + Complaint unresolved (25%)
= 40% total
= within cap → 40% slashed
```

### Example 2: Cap exceeded

```
Refill miss × 4 (20%) + Late delivery × 6 (10%) + Complaint × 2 (50%)
= 80% sum
→ Capped at 50%
```

### Example 3: Fraud override

```
Existing slashes 30% + T6 fraud confirmed
→ 100% (fraud overrides everything)
→ Ban + Owner cascade (all owned entities slashed)
```

## Cross-entity slash cascade

Per MIN-chain rule:

```
Owner slashed for fraud
   ↓
All companies he owns: slash 25% (cascade)
   ↓
All sellers under those companies: slash 25%
   ↓
All products: STL capped to slashed seller's level
```

Cascade stops at 25% per layer (not full 100%) — protects innocent staff/products.

## Time decay on slash debt

After 90 days clean:
- Slash debt fades 50%
- After 180 days: 75%
- After 365 days: 100% cleared

This rewards recovery. (Note: cleared from "active slashing record" but historical entry remains in audit.)

## Recovery paths

After slash:
1. Wait time decay (90+ days)
2. Re-verify (PSS + CRB)
3. Witness vouching (3 L7+ users)
4. Franchise vouching
5. Burn EHBGC for STL boost (re-earns lost levels faster)

## Appeal mechanism

Each slash:
- 7-day appeal window
- Submit evidence to DMO Council
- Independent review (different officer than original)
- If overturned: refund + STL restored + apology compensation

## Edge cases

### Multi-entity user with partial fault

```
User has Service + Shop + Rider entities
Service has unresolved complaint
   ↓
Only Service entity slashed 25%
Shop + Rider untouched (per Q6 — only faulty entity)
```

### Pool with one bad apple (per Q7)

```
Pool of 3 sellers in same shop
Seller A commits fraud
   ↓
Only Seller A's contribution to pool slashed 100%
Pool itself unaffected
Other 2 sellers continue
```

## Slash event = on-chain anchor

Every slash:
- Hashed + posted to Polkadot
- Public audit URL
- Regulator-friendly format
- Cannot be retroactively hidden

## Cross-references

- Lock: `LOCK-LOGIC.md`
- Dispute: `4-flows/DISPUTE-FLOW.md`
- Reputation: `4-flows/REPUTATION-SYSTEM.md`
- Penalty system (broader): `8-trust-system/PENALTY-SYSTEM.md`
- Locked decisions: `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.1 #4`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial slashing rules from locked Q4 + cascade + decay |
