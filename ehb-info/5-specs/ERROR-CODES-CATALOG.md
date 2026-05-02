# Error Codes Catalog — EHB Platform

> **Format:** `EHB-<DOMAIN>-<NUMBER>` — message — HTTP status
> All API errors return JSON `{ "error_code": "...", "message": "...", "detail": {...} }`.

## Auth (1xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-AUTH-1001 | Email already registered | 409 |
| EHB-AUTH-1002 | Invalid credentials | 401 |
| EHB-AUTH-1003 | Token expired | 401 |
| EHB-AUTH-1004 | Token invalid | 401 |
| EHB-AUTH-1005 | Refresh token cannot be used for access | 401 |
| EHB-AUTH-1006 | Re-authentication required | 401 |
| EHB-AUTH-1007 | API key invalid | 401 |
| EHB-AUTH-1008 | API key scope insufficient | 403 |
| EHB-AUTH-1009 | Account suspended | 403 |
| EHB-AUTH-1010 | Account banned | 403 |

## STL (2xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-STL-2001 | Insufficient STL level | 403 |
| EHB-STL-2002 | STL formula version mismatch | 500 |
| EHB-STL-2003 | STL recompute in progress | 423 |

## Wallet (3xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-WALLET-3001 | Insufficient balance | 402 |
| EHB-WALLET-3002 | Lock not found | 404 |
| EHB-WALLET-3003 | Lock already released | 409 |
| EHB-WALLET-3004 | Wallet provider unavailable | 503 |
| EHB-WALLET-3005 | Currency not supported in country | 400 |

## Order (4xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-ORDER-4001 | Invalid state transition | 409 |
| EHB-ORDER-4002 | SLA exceeded | 410 |
| EHB-ORDER-4003 | Buyer below industry min STL | 403 |
| EHB-ORDER-4004 | Seller below industry min STL | 403 |
| EHB-ORDER-4005 | Order not in cooling-off | 409 |

## Complaint (5xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-COMPLAINT-5001 | Complaint type unknown | 400 |
| EHB-COMPLAINT-5002 | Already filed for this order | 409 |
| EHB-COMPLAINT-5003 | Insufficient evidence | 422 |

## Franchise (6xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-FRANCHISE-6001 | Country tier already taken | 409 |
| EHB-FRANCHISE-6002 | Capital lock insufficient | 402 |
| EHB-FRANCHISE-6003 | Application under review | 423 |

## Validation (9xxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-VALID-9001 | Field required | 400 |
| EHB-VALID-9002 | Field too long | 400 |
| EHB-VALID-9003 | Invalid format | 400 |
| EHB-VALID-9004 | Industry code unknown | 400 |
| EHB-VALID-9005 | Country code unknown | 400 |

## System (9xxxx)

| Code | Message | HTTP |
|------|---------|------|
| EHB-SYS-90001 | Internal error | 500 |
| EHB-SYS-90002 | Service unavailable | 503 |
| EHB-SYS-90003 | Rate limited | 429 |
| EHB-SYS-90004 | Maintenance | 503 |

## Adding New Codes
1. Pick next number in domain
2. Add entry here
3. Add to `services/api/src/errors.js` constants
4. Add unit test
5. Update `EHB-API-SPEC.md` if user-facing

## Linked
- `EHB-API-SPEC.md`
- `API-CHANGELOG.md`
