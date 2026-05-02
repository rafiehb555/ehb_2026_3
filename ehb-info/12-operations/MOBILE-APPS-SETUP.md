# EHB Mobile Apps Setup — iOS + Android

> **Status:** Setup playbook · 2026-04-30
> **Strategy:** React Native (Expo) — single codebase, both platforms
> **Timeline:** 6-8 weeks for v1
> **Goal:** Beta on TestFlight + Play Internal in 4 weeks; public launch in 8 weeks

---

## Why React Native (Expo)

| Factor | RN + Expo | Native iOS+Android | Flutter |
|--------|:---------:|:------------------:|:-------:|
| Code reuse | 95% | 0% | 95% |
| Time to v1 | 6-8 weeks | 16-20 weeks | 8-10 weeks |
| Web dev → mobile | ✅ JS skills transfer | ❌ Swift+Kotlin learn | ❌ Dart learn |
| Web ↔ mobile share | ✅ | ❌ | ⚠️ partial |
| Performance | Good (95%) | Best | Good |
| OTA updates | ✅ Expo updates | ❌ | ⚠️ |

**Decision:** RN + Expo. Lower team cost, faster shipping, code shared with `apps/web`.

---

## Repo Structure

```
ehb_2026_3/
├── apps/
│   ├── web/         # existing Next.js
│   └── mobile/      # NEW — Expo React Native
│       ├── app/      # Expo Router (file-based routing)
│       ├── components/
│       ├── lib/
│       │   ├── api.ts       # API client (shared concepts)
│       │   ├── stl.ts       # STL helpers (shared with web)
│       │   └── industries.ts # Industries metadata (shared)
│       └── package.json
└── packages/
    └── shared/      # NEW — shared TS types + utils
```

---

## Initial Setup (one-time)

```bash
cd apps
pnpm create expo-app mobile -- --template tabs
cd mobile

# Add deps
pnpm add @react-navigation/native zustand
pnpm add react-native-svg react-native-reanimated
pnpm add expo-secure-store expo-router

# Auth + storage
pnpm add @react-native-async-storage/async-storage

# UI primitives
pnpm add nativewind  # Tailwind on RN
pnpm add lucide-react-native
```

---

## v1 Scope (6-8 weeks)

### Must-have (MVP)
- Sign up + sign in
- STL view (`/stl` mobile)
- Browse industries (`/industries`)
- Browse + buy GoSellr
- Order tracking
- Wallet view + withdraw
- Notifications (push)

### Phase 2 (post-launch)
- Seller dashboard
- Live chat
- AI marketplace
- Franchise management

---

## Code-Sharing Strategy

### Shared (web + mobile)
- API types (TypeScript)
- STL formula constants
- Industry metadata
- Validation rules
- i18n strings

### Platform-specific
- UI components (web Tailwind vs RN native)
- Navigation
- Storage (localStorage vs SecureStore)
- Push notifications (web push vs APNS/FCM)

---

## Push Notifications

```bash
pnpm add expo-notifications
```

Backend integration:
- Send push token from app → store in user.devices
- Server: BullMQ `notification.send` queue
- Provider: Expo Push (free, works for both APNS + FCM)

---

## Auth Strategy

- JWT in `expo-secure-store` (not AsyncStorage — secure)
- Refresh token rotation
- Biometric unlock (Face ID / Touch ID)
- Device fingerprint sent on every request

---

## API Client

```typescript
// apps/mobile/lib/api.ts
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.ehb.com';

export async function api(path: string, options: RequestInit = {}) {
  const token = await SecureStore.getItemAsync('jwt');
  const r = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}
```

---

## Build + Submit

### iOS (TestFlight)
```bash
eas build --platform ios --profile preview
eas submit --platform ios --latest
```
Requires: Apple Developer ($99/yr) + App Store Connect access.

### Android (Play Internal)
```bash
eas build --platform android --profile preview
eas submit --platform android --latest
```
Requires: Google Play Developer ($25 one-time).

### Phase 2 — production
```bash
eas build --platform all --profile production
eas submit --platform all --latest
```

---

## App Store Listing Prep

Per `ehb-info/14-growth/ASO.md`:
- App name: "EHB — Trusted Marketplace"
- Subtitle: "Verified pros, secure payments, STL trust score"
- Icon (1024x1024 master)
- Screenshots (6 each platform, 6.7" + 6.5" + 5.5")
- 30-second video preview
- Description (long + short)
- Keywords (100-char)

---

## Analytics + Crash

```bash
pnpm add expo-analytics-segment
pnpm add @sentry/react-native
```

- Sentry for crashes (free tier)
- Mixpanel or Segment for events
- DAU/MAU/funnels

---

## Cost Estimate (Phase 1)

| Item | Cost |
|------|-----:|
| Apple Developer | $99/yr |
| Google Play Developer | $25 once |
| EAS Build (Expo) | Free → $99/mo at scale |
| Push (Expo) | Free |
| Sentry | Free tier OK |
| **Total Phase 1** | **~$200 first year** |

---

## Team Needed

- **1 RN developer** (or upskill 1 web dev — most code patterns transfer)
- **1 designer** for app-specific layouts (shared brand)
- **1 QA** (manual on real devices)

---

## Hiring Plan

Add to `founder-kit/04-TEAM-HIRING.md`:
- **Mobile Developer** — RN/Expo + TypeScript — 250K-400K PKR/mo
- Hire week 6 (after web platform stable)

---

## Linked
- `apps/mobile/` (to be created)
- `ehb-info/14-growth/ASO.md` — App Store Optimization
- `ehb-info/15-ui-system/UIUX-DESIGN-SYSTEM.md` — design tokens (shared)
- `founder-kit/04-TEAM-HIRING.md` — mobile dev hire
