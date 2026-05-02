# Webhook Specification — EHB Platform

> Outbound webhooks let partners listen to platform events.

## Subscription
Partners register webhook URLs in their developer dashboard. Each URL is associated with a partner ID + event filter list.

## Event Format
```json
{
  "id": "evt_<uuid>",
  "type": "order.settled",
  "version": "1.0",
  "created": 1714464000,
  "data": { ... },
  "signature": "sha256=<hmac>"
}
```

## Signing
HMAC-SHA256 over body, key = partner secret. Include in `X-EHB-Signature` header.
```
X-EHB-Signature: sha256=<base64>
X-EHB-Event-Id: evt_<uuid>
X-EHB-Event-Type: order.settled
X-EHB-Timestamp: 1714464000
```

Reject events older than 5 minutes (replay protection).

## Event Catalog

### User
- `user.created`
- `user.kyc_completed`
- `user.suspended`
- `user.deleted`

### STL
- `stl.upgraded`
- `stl.downgraded`
- `stl.slashed`

### Order
- `order.created`
- `order.payment_held`
- `order.accepted`
- `order.fulfilled`
- `order.reviewed`
- `order.settled`
- `order.cancelled`
- `order.refunded`

### Wallet
- `wallet.lock_created`
- `wallet.lock_released`
- `wallet.transaction_completed`

### Complaint
- `complaint.filed`
- `complaint.resolved`

### Franchise
- `franchise.application_approved`
- `franchise.tier_promoted`

## Delivery Guarantees
- At-least-once delivery
- Retry: 1, 5, 30, 120, 600 seconds
- After 5 failed attempts → dead-lettered, partner notified
- Partner endpoint should be idempotent (use `id`)

## Endpoint Requirements
- HTTPS only
- 200 OK = success (any 2xx accepted)
- 5xx → retry
- 4xx → no retry, partner notified
- < 5s response time

## Testing
- Send test events via `POST /webhooks/test` (sandbox)
- Monitor delivery in dashboard

## Linked
- `EHB-API-SPEC.md`
- `API-CHANGELOG.md`
