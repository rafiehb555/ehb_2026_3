# EHB · Action Map (UI → API → Flow)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Map every button click / form submit to backend API + flow + result.

## Format

```
UI Action → API Endpoint → Flow Triggered → Result
```

## Examples per page

### Product Page actions

| Button / Action | API Endpoint | Flow | Result |
|---|---|---|---|
| Add to Cart | POST `/api/cart/add` | None (synchronous) | Cart updated |
| Buy Now | POST `/api/orders/create` | ORDER-FLOW | Order page · payment |
| Wishlist toggle | POST `/api/wishlist/toggle` | None | Heart icon update |
| File complaint | POST `/api/complaints/file` | DISPUTE-FLOW | Dispute opened |
| Submit review | POST `/api/reviews/submit` | Reputation update | Review on card |
| AI Trust Q&A | POST `/api/ai/trust-qa` | AI Core | Answer in modal |
| Report listing | POST `/api/reports/listing` | DMO triage | Report logged |

### Cart / Checkout actions

| Action | API | Flow | Result |
|---|---|---|---|
| Update quantity | PATCH `/api/cart/<id>` | None | Cart total updates |
| Remove item | DELETE `/api/cart/<id>` | None | Item removed |
| Apply coupon | POST `/api/coupons/apply` | None | Discount shown |
| Pay (Stripe) | POST `/api/orders/<id>/pay` | PAYMENT-FLOW + ESCROW-FLOW | Payment held |
| Pay (EHBGC) | POST `/api/orders/<id>/pay-crypto` | PAYMENT-FLOW + Blockchain | Crypto escrow |
| Pay later | POST `/api/orders/<id>/buy-now-pay-later` | PAYMENT-FLOW (deferred) | Hold + reminder |

### STL Dashboard actions

| Action | API | Flow | Result |
|---|---|---|---|
| Take CRB exam | Redirect `/crb/exams` | CRB exam flow | Navigate |
| Lock EHBGC | POST `/api/wallet/lock` | LOCK-LOGIC | Lock active · STL boost |
| Burn for STL boost | POST `/api/wallet/burn` | Permanent | +1 STL |
| View blocking layer | GET `/api/stl/blocking-layer` | None | Modal with explanation |
| Recompute STL | POST `/api/stl/recompute` | Trust Core | Updated score |

### Wallet actions

| Action | API | Flow | Result |
|---|---|---|---|
| Top up | POST `/api/wallet/topup` | PAYMENT-FLOW | Balance + |
| Withdraw | POST `/api/wallet/withdraw` | Withdrawal flow | Pending verification |
| Convert currency | POST `/api/wallet/convert` | Forex adapter | Currency swapped |
| Unlock EHBGC | POST `/api/wallet/unlock` | LOCK-LOGIC | 15-day grace begins |
| View yield history | GET `/api/wallet/yield` | None | History panel |

### Franchise actions

| Action | API | Flow | Result |
|---|---|---|---|
| Apply franchise | POST `/api/franchise/apply` | Onboarding flow | Application queued |
| Vouch user | POST `/api/franchise/vouch` | STL boost | User STL +1 |
| Schedule inspection | POST `/api/franchise/schedule-inspection` | Inspection flow | Calendar entry |
| Promote user | POST `/api/franchise/promote` | Promotion flow | User tier change |
| Submit refill | POST `/api/franchise/refill` | Refill audit | Quarter complete |

### DMO actions

| Action | API | Flow | Result |
|---|---|---|---|
| Approve user | POST `/api/dmo/approve` | DMO approval | User cleared |
| Suspend user | POST `/api/dmo/suspend` | Penalty flow | User suspended |
| Slash entity | POST `/api/dmo/slash` | SLASHING-RULES | EHBGC burned |
| Override decision | POST `/api/dmo/override` | Audit logged | Decision changed |
| Resolve complaint | POST `/api/complaints/<id>/resolve` | DISPUTE-FLOW | Resolution + audit |

## Standard response format

All API actions return:

```json
{
  "success": true,
  "data": {...},
  "errors": [],
  "warnings": [],
  "audit_id": "polkadot:0x...",
  "next_actions": ["action1", "action2"]
}
```

## Error handling

```
API error → Toast notification → Action available (retry / contact support)
```

Specific errors:
- `401`: Re-auth required
- `403`: Permission denied (with required role/STL)
- `404`: Resource not found
- `422`: Validation error (specific fields)
- `429`: Rate limit (with retry-after)
- `500`: Server error (logged + reported to user simply)

## Rate limits per action type

| Action | Limit |
|---|---|
| Login attempts | 5/min |
| API queries | 100/min |
| File complaints | 5/day |
| Lock/unlock | 10/day |
| Submit reviews | 20/day |
| Custom (high-stakes) | per-action defined |

## Cross-references

- API spec: `5-specs/EHB-API-SPEC.md`
- Page tools: `PAGE-TOOLS-MAP.md`
- Flow files: `4-flows/`
- Rate limits detail: `5-specs/RATE-LIMITS.md` (TODO)

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial action map |
