# EHB · EHBGC Tokenomics

> **Status:** Canonical v1.0 · 2026-04-30
> **Source:** `3-departments/Token.md` + locked decisions

## What is EHBGC?

> **EHB Global Coin (EHBGC)** — utility token for the EHB platform · powers locks, escrow, yield, governance.

## Token type

- **Utility token** (not a security — by design)
- Powers platform mechanics (lock, escrow, yield, governance)
- No promise of yield to non-stakers
- USD-pegged display (volatile actual value, but lock requirements adjust)

## Supply mechanics

| Mechanism | Effect |
|---|---|
| Initial mint | TBD (founder to decide) |
| Sales (private + public) | Capital raise · adoption |
| Lock for STL | Removes from circulation (deflationary) |
| Burn for STL boost | Permanent deflation (per Q11) |
| Yield distribution | Inflationary (capped 6% APY per Q13) |
| Treasury reserves | Operational + buyback fund |

## Supply formula

```
Effective Supply = Total Minted - Burned - Locked
Circulating Supply = Effective Supply - Treasury Reserves
```

## Why volume → value (deflation)

As platform grows:
- More entities = more locks = less circulating
- Burn-for-STL events = permanent reduction
- Treasury buybacks (during dips)
- Yield cap 6% prevents runaway inflation

Net effect: long-term deflationary if platform succeeds.

## Token utility (where you NEED EHBGC)

1. **Lock** — required to operate as Service/Seller/Rider/Inspector/Franchise
2. **Escrow** — buyers can pay in EHBGC for orders
3. **Yield** — locked tokens earn 4-6% APY
4. **Governance** — locked stakers get DAO vote weight (Phase-3+)
5. **Premium services** — AI Marketplace pay-per-session
6. **Burn boost** — permanent +1 STL per burn event
7. **Cross-platform value** — receive payments globally
8. **Refill payments** — CRB refill cycle fee

## Distribution (proposed Phase-1)

| Bucket | % | Vesting |
|---|:---:|---|
| Founders + early team | 15% | 4-yr vest, 1-yr cliff |
| Investors (private) | 20% | 2-yr vest |
| Public sale | 15% | Immediate |
| Treasury (operations) | 25% | Locked, governance-released |
| Ecosystem rewards | 15% | Released over 5 yrs (yield, refer, AI marketplace) |
| Team future hires | 5% | 4-yr vest |
| Partner / industry incentives | 5% | Earned via partnership KPIs |

## Volatility handling (per Q3)

- USD-equivalent display everywhere
- Lock count fixed in EHBGC at moment of lock
- BUT new locks adjust automatically based on USD-peg (per Q5 USD-pegged auto-adjust)
- This protects platform: if EHBGC drops 50%, new sellers lock more EHBGC, not less protection

## Burn-vs-Lock toggle (per Q11)

| Action | Effect | Reversible? |
|---|---|---|
| Lock | Hold for commitment, earn yield, recover on close | Yes |
| Burn | Permanent destruction, +1 STL boost | NO |

User chooses at lock time. Burn typically chosen by L8+ users wanting permanent prestige.

## Yield (per Q13)

- Source: hybrid (platform fees + treasury + minor inflation)
- Rate: 4–6% APY variable (admin-tunable)
- Cap: hard 6% max
- Higher STL = higher yield (loyalty incentive)

## Governance (Phase-3+)

- Locked tokens = vote weight
- Proposals: industry multiplier changes, DMO mode adjustments, fee tweaks
- Snapshot voting · weighted by lock × duration

## Cross-references

- Token deep: `3-departments/Token.md`
- Wallet: `3-departments/Wallet.md`
- Lock: `LOCK-LOGIC.md`
- Slashing: `SLASHING-RULES.md`
- Yield: `REWARD-YIELD.md`
- Treasury: `TREASURY-SYSTEM.md`

## Open questions

- Initial token mint amount (founder + tokenomics consultant)
- Token standard (ERC-20 wrapper · Polkadot native · multi-chain)
- IDO/IEO listing strategy
- Liquidity pool seeding

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial tokenomics from locked decisions |
