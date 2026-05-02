# Release Notes — EHB Platform

> Public-facing version log. For API contracts see `ehb-info/5-specs/API-CHANGELOG.md`.

## v0.1.0 — 2026-04-30 — Foundation Release (internal)

### Added
- Core engine: STL formula + adapters (wallet, blockchain, KYC pattern)
- 9 Mongoose models for persistence
- Auth: JWT access + refresh + recent-auth + API keys
- Event queue with retry + dead-letter
- FLOW-SCHEMA-V2 (executable workflow schema)
- 200+ documentation files in `ehb-info/`
- Industry sub-specs for all 38 industries
- 5-tier franchise hierarchy (Country → Master → Corp → Sub → Micro)

### Tooling
- 58 STL gold-master regression tests
- 8 revenue flow tests
- Duplication scanner script
- Health check stub

### Known Issues
- Wallet provider integrations (Stripe, JazzCash) — pending Phase 1 production
- Polkadot real anchor — pending Phase 1
- Country configs only PK fully populated; remaining 16 in progress

---

## Format

For each release, use sections:
- **Added** — new features
- **Changed** — modified behavior
- **Deprecated** — flagged for removal
- **Removed** — actually deleted
- **Fixed** — bug fixes
- **Security** — security-relevant changes
- **Known Issues** — open items

## Cadence
- Patch (`0.0.x`) — as needed
- Minor (`0.x.0`) — every 2 weeks
- Major (`x.0.0`) — quarterly

## Distribution
- Internal: Slack release channel
- External: changelog page on ehb.com + RSS feed
- Partners: email digest weekly

## Linked
- `ehb-info/5-specs/API-CHANGELOG.md`
- `ehb-info/12-operations/DEPLOYMENT.md`
