# EHB Info · Update Propagation Rules

> **Purpose:** Jab kisi canonical file mein change ho, AI / dev ko pata hona chahiye
> kahan kahan related cheezen update karni hain. Otherwise drift create hota hai.
>
> **Locked:** 2026-04-30 · v1.0

---

## Master rule

> Jab `ehb-info/` mein koi canonical change ho:
> 1. Bump file ka version + add changelog entry
> 2. Update `_settings/REGISTRY.json` if structure changed
> 3. Propagate to ALL files listed below
> 4. Run tests if code changed
> 5. Update `ehb-status.json` with what changed

---

## Propagation matrix

### When `3-departments/STL.md` changes

If formula changes → also update:
- `services/api/src/services/stlService.js`
- `services/api/src/services/stlService.test.js`
- `apps/web/lib/stl/levels.ts`
- Run: `npm run test:stl` (58 must pass — gold-master protected)

If ladder names change (FREE/BASIC/etc.) → also update:
- `apps/web/lib/stl/levels.ts`
- `apps/web/components/ui/stl-badge.tsx`
- `apps/web/app/stl/page.tsx`
- `apps/web/app/dmo/stl/page.tsx`

If source caps change (PSS=L5, CRB=L9, DMO=L10) → also update:
- `apps/web/components/ui/stl-journey.tsx`
- `apps/web/app/stl/page.tsx` (JOURNEY_STEPS)
- `4-flows/EHB-USER-TYPES.md` source matrix

---

### When `3-departments/PSS.md` changes

- `services/api/src/services/pssService.js`
- `services/api/src/adapters/pss/`
- `apps/web/app/pss/page.tsx`
- `apps/web/app/dmo/pss/page.tsx`

---

### When `3-departments/CRB.md` changes

- `services/api/src/services/crbService.js`
- `apps/web/app/crb/exams/`
- `apps/web/app/dmo/crb/page.tsx`

If refill cadence changes → also update:
- `services/api/src/services/refillService.js`
- `4-flows/EHB-USER-TYPES.md` (refill rules per type)

---

### When `3-departments/Industries.md` changes

If new industry added → also update:
- `apps/web/lib/industries.ts` (constant array)
- `apps/web/app/industries/page.tsx` (master grid)
- `_settings/REGISTRY.json` (`topics.Industries.topics` array)
- `1-master/EHB-MASTER-INFO.md §5` (industry table)

If multiplier change → also update:
- `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.2`
- `services/api/src/services/lockService.js` (when wired)

---

### When `3-departments/Wallet.md` or `Token.md` changes

If lock thresholds change → also update:
- `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §16.2.3`
- `services/api/src/services/walletService.js`
- `apps/web/app/wallet/page.tsx`

If EHBGC economics change → also update:
- `3-departments/Finance.md`
- `3-departments/Commission.md`
- `1-master/EHB-MASTER-INFO.md §4.6`

---

### When `3-departments/Franchise.md` changes

- `services/api/src/services/franchiseService.js`
- `apps/web/app/franchise/`
- `4-flows/EHB-USER-TYPES.md` (Franchisee section)

---

### When `4-flows/EHB-USER-TYPES.md` changes

- `apps/web/lib/user-types.ts`
- `apps/web/components/ui/user-type-selector.tsx`
- `apps/web/app/stl/page.tsx`
- `apps/web/app/dmo/stl/page.tsx`

---

### When `1-master/EHB-MASTER-INFO.md` changes

This is the bible. Changes here usually require:
- Reading and aligning ALL `3-departments/*.md` files
- Major architectural decisions need founder approval first

---

## Auto-checks (recommended scripts)

These can be added to `scripts/`:

1. **`scripts/info-sync-check.mjs`** — reads all `ehb-info/` files, checks for drift vs code:
   - Does `apps/web/lib/stl/levels.ts` match `3-departments/STL.md` ladder?
   - Does `apps/web/lib/industries.ts` match `3-departments/Industries.md` list?
   - Reports drift in `ehb-status.json`

2. **`scripts/info-version-bump.mjs`** — when MD file changes, auto-bumps version + adds changelog stub

3. **`scripts/registry-rebuild.mjs`** — regenerates `_settings/REGISTRY.json` from current folder structure

---

## Version-bump checklist (for any canonical change)

- [ ] File header version updated (v1.x → v1.x+1)
- [ ] Changelog entry added with date + summary
- [ ] Cross-referenced files in propagation matrix updated
- [ ] Tests run if code involved
- [ ] `ehb-status.json` `lastUpdated` field touched
- [ ] If destructive: backup folder created in `backup/`

---

## Drift-detection examples

If `STL.md` says ladder is L1-L10 but code has L0-L8 — that's drift.
If `Industries.md` lists 38 but UI shows only 6 — that's UI lag (not drift, just incomplete build).
If `EHB-USER-TYPES.md` says Buyer min STL = L1 but auth-context blocks L1 — that's a bug.

When AI detects drift:
1. Don't auto-fix code
2. Surface in 🚨 block of response
3. Propose unified rule
4. Get founder approval
5. Then propagate
