# Blockchain — EHB Trust & Transparency Layer

**Status:** Canonical spec (v1.0) · Merged from `uploads/ehb_blockchain.md` (Batch-2, 2026-04-11)
**Related:** `Wallet.md §7` · `STL.md §9` · `DMO.md §22.13`

---

## 1. Purpose

The Blockchain layer is EHB's **trust + transparency ledger**. It stores immutable records of anything that must survive tampering: transactions, coin locks, STL changes, verification proofs, and franchise validations. Where the core platform (Mongo + Redis) is fast, blockchain is *final*.

## 2. Three-phase roadmap

| Phase | Chain                                  | Why                                              |
|-------|-----------------------------------------|---------------------------------------------------|
| 1     | **Binance Smart Chain (BSC)**           | Fastest + cheapest to ship. EHBGC as BEP-20.     |
| 2     | **Mosaic Blockchain** (EHB's own)       | Permissioned or hybrid, custom gas economics.    |
| 3     | **Polkadot Parachain**                  | Full decentralisation + cross-chain bridges.     |

> ⚠️ **Legacy contradiction** — early legacy docs listed Polkadot as Phase-1 primary. Batch-2 re-sequences it to Phase-3 after the Mosaic chain is battle-tested. Adopted here. Flagged in `DMO.md §24 row 7`.

## 3. What lives on chain

- **Transactions** — every wallet mutation (deposit, withdrawal, transfer, stake)
- **Coin locks** — lock/unlock events as auditable proofs
- **STL changes** — every STL delta anchored as a hash
- **Verification proofs** (optional) — CRB certificate hashes (not the documents themselves)
- **Franchise validations** — franchise approvals/denials hashed for dispute resolution

## 4. Data flow

```
User Action
    ↓
DMO Validation (PSS + Up-Guard + business rules)
    ↓
Wallet / STL / CRB state update (Mongo)
    ↓
Blockchain Record (batched, async, hashed)
```

The platform is **never blocked** on chain confirmation. Mongo is authoritative for live reads; chain is authoritative for disputes and audits.

## 5. Security model

- **Smart contracts** for EHBGC, staking, and marketplace escrow
- **Cryptographic validation** — every on-chain event is signed by the platform authority key
- **Fraud detection integration** — DMO Up-Guard can halt on-chain writes for a user under investigation
- **Merkle batching** — STL and verification events are batched hourly as Merkle roots to keep gas costs down (suggestion from my §23 analysis — proposed, awaiting user sign-off)

## 6. Benefits

- Tamper-proof history for disputes and regulators
- Transparency that can be independently verified
- Decentralised trust — users don't have to take EHB's word for anything
- Regulator-friendly audit trail

## 7. Open questions for next batch

1. **Which events go on-chain per phase?** (Phase-1 BSC gas costs make it expensive to write everything)
2. **Bridge strategy** — BSC → Mosaic migration plan?
3. **Custody** — does EHB hold the master key or is it a multi-sig?
4. **Dispute resolution** — when there's a Mongo ↔ chain mismatch, which one wins?

## Changelog

| Date       | Ver | Change |
|------------|-----|--------|
| 2026-04-11 | 1.0 | Created from Batch-2 `uploads/ehb_blockchain.md`; BSC→Mosaic→Polkadot phasing confirmed |
