# EHB · State Management

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Where each piece of data lives + how UI accesses it.

## State layers

### Layer 1: Server state (canonical)
- DB (MongoDB) → all persistent data
- Polkadot → audit/proof
- Treasury vault → EHBGC + locks

### Layer 2: API cache layer
- Redis → frequently accessed data
- 5-60s TTL depending on data type
- Stale-while-revalidate strategy

### Layer 3: Client state
- React Query / SWR → server data caching
- Context API → user session, theme, locale
- React state → component-local UI state
- localStorage → user preferences (NOT secret data)
- sessionStorage → temporary form data

### Layer 4: Real-time state
- Socket.IO → live updates
- WebSocket events → DMO live feed
- Server-sent events → notifications

## Per-page data sources

### STL Dashboard
- User's STL composite → `GET /api/stl/me`
- Recent activity → `GET /api/stl/me/activity` (paginated)
- Industry STL grid → `GET /api/stl/me/industries`
- Recommendations → `GET /api/ai/stl-recommendations`
- Real-time STL deltas → Socket.IO `stl.update` event

### Product Page
- Product data → `GET /api/products/<id>` (cached 60s)
- Seller info → `GET /api/sellers/<id>` (cached 5min)
- MIN-chain layers → `GET /api/products/<id>/trust-chain`
- Reviews → `GET /api/products/<id>/reviews` (paginated)
- AI recommendations → `GET /api/ai/recommendations?productId=<id>`
- Live stock → Socket.IO `product.<id>.stock` event

### Wallet Page
- Balance → `GET /api/wallet/me`
- Locks → `GET /api/wallet/me/locks`
- Transactions → `GET /api/wallet/me/transactions` (paginated)
- Yield stream → Socket.IO `wallet.yield` event

### DMO Dashboard
- KPIs → `GET /api/dmo/kpis` (cached 30s)
- Live activity feed → Socket.IO `dmo.events`
- Queues → `GET /api/dmo/queues`
- Tasks → `GET /api/dmo/me/tasks`

## Cache invalidation rules

| When | Invalidate |
|---|---|
| User STL changes | `/api/stl/me`, related industry caches |
| Order created | Cart, orders list, seller's stats |
| Review submitted | Product reviews, seller stats, reviewer's history |
| Slash event | All caches related to slashed entity |
| Manual admin action | Specific entity caches |
| User logs out | All user-specific cache cleared |

## Optimistic updates

For instant UI feel, optimistically update:
- Cart add/remove
- Wishlist toggle
- Like/unlike review
- Notification dismiss

Then confirm with API. Revert on failure.

## Real-time updates

Subscribe via Socket.IO:

```typescript
// Subscribe to user's STL updates
socket.on('stl.update', (delta) => {
  queryClient.setQueryData(['/api/stl/me'], oldData => ({
    ...oldData,
    score: oldData.score + delta.points,
  }));
});

// Subscribe to DMO events (admin only)
socket.on('dmo.events', (event) => {
  // append to live feed
});
```

## Auth state (per-session)

Stored in:
- HttpOnly cookie (refresh token)
- localStorage (access token · short-lived)
- React Context (user object, role, permissions)
- Per-action: re-auth needed for sensitive ops (DMO override, large transfer)

## Theme state

Stored in:
- localStorage (`theme=dark|iosClassic|diamondDual`)
- Context API (current theme)
- CSS variables (applied to root)

## Locale state

Stored in:
- localStorage (`locale=ur|en|ar|hi`)
- Cookie (server-side rendering)
- Context API (translations)
- URL param (optional override)

## Performance rules

- Server state: cache aggressively
- Client state: minimize (no big objects)
- Don't over-fetch (use field selection)
- Lazy load heavy components
- Suspense boundaries for code splitting

## State debugging

In dev mode:
- React DevTools (component state)
- Redux DevTools (if Redux used)
- Network tab (API responses)
- Socket.IO inspector
- Cache inspector (React Query DevTools)

## Cross-references

- API: `5-specs/EHB-API-SPEC.md`
- Page settings: `PAGE-SETTINGS.md`
- Action map: `ACTION-MAP.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial state management spec |
