# API Changelog — EHB Platform

> All breaking + non-breaking API changes, semver-versioned.
> Format: `vMAJOR.MINOR.PATCH` — date — author

## v1.0.0 — 2026-04-30 — Initial baseline
- Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`
- Users: `GET /users/me`, `PATCH /users/me`
- STL: `GET /stl/:userId`, `POST /stl/recompute`
- Orders: `POST /orders`, `GET /orders/:id`, `PATCH /orders/:id/state`
- Wallet: `GET /wallet/balance`, `POST /wallet/lock`
- Locks: `POST /locks`, `DELETE /locks/:id`
- Complaints: `POST /complaints`, `GET /complaints/:id`
- Reviews: `POST /reviews`
- Franchise: `POST /franchise/apply`, `GET /franchise/:id`
- AI Marketplace: `GET /ai/services`, `POST /ai/services`

## Changelog Conventions

### Version bumps
- **MAJOR** — breaking change (deprecated route, changed response shape)
- **MINOR** — new endpoint, new field, backward-compatible
- **PATCH** — bug fix, performance, no contract change

### Each entry includes
- Endpoint affected
- Type: ADDED / CHANGED / DEPRECATED / REMOVED / FIXED
- Migration notes (if breaking)
- Deprecation timeline (if removing)

## Deprecation Policy
- Mark `Sunset` HTTP header on deprecated routes
- 90-day deprecation window minimum
- Public changelog announcement
- Email partners using deprecated routes

## Versioning Strategy
- URL versioning: `/v1/`, `/v2/` (currently /v1)
- Old version maintained for 12 months after new MAJOR
- Auto-rewrite for backward-compat where possible

## Linked
- `EHB-API-SPEC.md`
- `WEBHOOK-SPEC.md`
- `ERROR-CODES-CATALOG.md`
