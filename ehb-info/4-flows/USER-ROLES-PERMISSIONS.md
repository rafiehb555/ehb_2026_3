# EHB · User Roles & Permissions Matrix (RBAC)

> **Status:** Canonical v1.0 · 2026-04-30
> **Source:** Built on `EHB-USER-TYPES.md` (10 user types)

## Role hierarchy

```
SUPER ADMIN (Founder)
    ↓
DMO COUNCIL (Senior Admin)
    ↓
DMO STAFF · INSPECTOR · CRB OFFICER · PSS OFFICER
    ↓
FRANCHISEE (Sub/Master/Country)
    ↓
SELLER · SERVICE PROVIDER · RIDER · EMPLOYER · PRODUCTION CO
    ↓
BUYER · JOB SEEKER
    ↓
GUEST (L0)
```

## Permission matrix

| Action | Super Admin | DMO Council | DMO Staff | CRB/PSS Officer | Inspector | Franchisee | Seller / Provider | Rider | Buyer | Job Seeker | Guest |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Browse marketplace | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Place order | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| List product/service | ✅ | ✅ | – | – | – | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Approve KYC | ✅ | ✅ | ✅ | ✅ (PSS) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Grade CRB exam | ✅ | ✅ | – | ✅ (CRB) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Suspend user | ✅ | ✅ | ✅ (24h max) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Permanent ban | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manual STL adjust | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Mint/burn EHBGC | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Lock release approve | ✅ | ✅ (above $10K) | ✅ (under $10K) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Slash entity | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Add new industry | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Change industry multiplier | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Approve franchise app | ✅ | ✅ | – | – | – | ✅ (Master) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Field inspection | – | – | – | – | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vouch a user (+1 STL) | ✅ | ✅ | – | – | – | ✅ (Sub L5+) | ❌ | ❌ | ❌ | ❌ | ❌ |
| File complaint | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Triage complaint | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Access AI Marketplace | ✅ (any) | ✅ | ✅ | ✅ | ✅ | ✅ (L7+) | ✅ (L3+) | ✅ (L3+) | ✅ (L3+) | ✅ (L3+) | ❌ |

## STL gating rules

Some actions also require minimum STL beyond role:

| Action | Min STL |
|---|---|
| Place high-value order ($1K+) | L3 |
| List in Healthcare/Legal | L5 |
| List in Construction | L4 |
| Become Inspector | L5 |
| Apply Sub L1 franchise | L4 |
| Apply Master franchise | L8 |
| Diagnosis AI access | L7 |
| Fraud Detection AI access | L9 |

## Role transitions

| From | To | Requirements |
|---|---|---|
| Buyer | Seller | PSS L3+ · CRB L1+ · 100 EHBGC lock |
| Buyer | Service Provider | PSS L4+ · CRB L4+ · 200 EHBGC lock · industry exam |
| Job Seeker | Service Provider | PSS L4+ · CRB matched cert |
| Seller | Franchisee | STL L7+ · 30 days clean · $5K capital |
| Rider | Inspector | STL L5+ · CRB Inspector exam · 1 year clean |

## Audit requirement

Every privileged action (suspend, slash, manual adjust, mint, ban) must:
- Be logged with named officer ID + timestamp
- Be Polkadot-anchored (immutable)
- Be reviewable in audit panel
- Auto-trigger weekly QA review

## Cross-references

- User types: `EHB-USER-TYPES.md` (10 types detail)
- Admin panels: `ADMIN-PANEL-DATA.md`
- DMO governance: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial RBAC matrix from 10 user types |
