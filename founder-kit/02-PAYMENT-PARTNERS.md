# Step 2 — Payment Partners Application Kit

> **Timeline:** 2-4 weeks (parallel with Step 1)
> **Priority:** P0 — without payment, no revenue

## A. JazzCash Merchant Application

### Pre-requisites
- SECP Certificate of Incorporation (Step 1)
- NTN
- Bank account
- 2 directors' CNIC

### Apply
- URL: https://www.jazzcash.com.pk/business/merchant
- Sandbox first → live after KYB approved
- Approval time: 1-2 weeks

### Integration test (use stub credentials in code)
```bash
# In .env
JAZZCASH_MERCHANT_ID=MC_TEST_xxx
JAZZCASH_PASSWORD=xxx
JAZZCASH_INTEGRITY_SALT=xxx
JAZZCASH_LIVE_MODE=false   # sandbox first
```

Code already wired — see `services/api/src/adapters/wallet/jazzCashAdapter.js`.

### Fees (Phase 1, negotiable)
- Merchant Mobile Account: 1.5–2.5%
- Card payments: 2–3%
- Bank transfer: PKR 25–50 flat
- Settlement: T+1

---

## B. Stripe Application (international)

### Pre-requisites
- SECP Certificate (or US/UK entity if available)
- Founder's verified ID
- Business website (can be MVP)
- Bank account (international preferred — Payoneer, Wise, or US bank if you have)

### Apply
- URL: https://dashboard.stripe.com/register
- Pakistan accounts via **Stripe Atlas** (US LLC) — if you can incorporate US entity
- Or use a payment processor partner in PK that fronts Stripe

### Integration test
```bash
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_LIVE_MODE=false
```

Code already wired — `services/api/src/adapters/wallet/stripeAdapter.js`.

### Fees
- 2.9% + $0.30 per transaction (US/EU cards)
- 3.4% + $0.30 (international)

---

## C. Backup / Local Alternatives

| Provider | Country | Status |
|----------|---------|--------|
| **EasyPaisa** | PK | Apply for merchant account (similar to JazzCash) |
| **HBL Konnect** | PK | Bank-backed digital wallet |
| **Telr** | UAE+SA | When expanding to ME |
| **Iyzico** | TR | Turkey expansion |
| **FPX** | MY | Malaysia expansion |

Add adapters using same interface (`WalletAdapter`).

---

## D. Webhook Endpoints (already built)

```
POST https://api.ehb.com/api/webhooks/stripe
POST https://api.ehb.com/api/webhooks/jazzcash
```

Both have signature verification + idempotency cache.

---

## E. Compliance Checklist

- [ ] AML/CTF policy in place (`ehb-info/9-legal/AML-POLICY.md`)
- [ ] KYC integrated (NADRA Verisys for PK)
- [ ] Sanctions screening (OFAC / UN / EU lists)
- [ ] PCI DSS — handled by Stripe/JazzCash (we never store card data)
- [ ] Data Processing Agreements signed

---

## Linked
- `01-LEGAL-ENTITY-PK.md`
- `03-CLOUD-DEPLOY.md`
- `ehb-info/9-legal/AML-POLICY.md`
