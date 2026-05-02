# UI/UX Auto-Save Protocol — MANDATORY Change Management

> **Status:** LOCKED v1.0 · 2026-05-02
> **Owner:** Founder (Muhammad Rafi)
> **Enforcement:** Claude / AI agents MUST follow this on every UI/UX task
> **Linked from:** `CLAUDE.md` §Hard Rules

---

## 🚨 The Rule

**Every time UI/UX is changed, the canonical files MUST be updated in the same task.** No code change without doc change. No design tweak without spec update.

This applies to:
- Home page sections (add/remove/reorder)
- Card patterns (any visual change)
- Color tokens (theme.ts modifications)
- Component anatomy (props, layout, behavior)
- New page creation
- Any change to `apps/web/components/` or `apps/web/app/`
- Any change to `apps/web/lib/dmo/theme.ts`
- Any change to `apps/web/lib/data/home-sections.ts` and siblings

---

## 📂 Canonical Save Locations (single source of truth)

All UI/UX state lives in `ehb-info/15-ui-system/`:

| File | Owns |
|------|------|
| `HOME-PAGE-DESIGN.md` | Home page LOCKED spec — sections, theme, tokens |
| `STL-LADDER-COMPONENT.md` | 10-level ladder spec |
| `COMPANIES-BY-STL.md` | Country × STL company data |
| `SECTION-CATALOG.md` | Every home page row's data structure |
| `UIUX-DESIGN-SYSTEM.md` | Global colors, typography, spacing |
| `COMPONENT-LIBRARY.md` | Reusable components catalog |
| `PAGE-DATA-MAP.md` | Page-by-page data spec |
| `PAGES-LIST.md` | All 80+ pages |
| `UI-RULES.md` | Hard UI rules |
| `ACTION-MAP.md` | CTAs and navigation |
| `FEATURE-FLAGS.md` | Feature toggle flags |
| `STATE.md` | UI state machine |
| `PAGE-TOOLS-MAP.md` | Tools per page |
| `PAGE-SETTINGS.md` | Settings per page |
| `AI-MARKETPLACE-UIUX.md` | AI Marketplace spec |
| `UIUX-AUTO-SAVE-PROTOCOL.md` | THIS FILE |

> **DO NOT** create UI specs anywhere else (no scattered docs). If a spec doesn't fit an existing file, create a new file in **this folder** and add it to the table above.

---

## ✅ The Auto-Save Checklist (run on every UI/UX change)

When doing ANY UI/UX work, Claude MUST:

### 1. Before changing code
- [ ] Read relevant canonical files (`HOME-PAGE-DESIGN.md`, etc.)
- [ ] Check if change is allowed (some specs are LOCKED)
- [ ] If LOCKED, get founder approval first

### 2. While changing code
- [ ] Mirror every code change in the canonical file in the SAME task
- [ ] Use grep to find every consumer of changed token/component
- [ ] Update `theme.ts` AND its doc together
- [ ] Update component AND its spec together

### 3. After changing code
- [ ] Run `pnpm --filter web build` to verify
- [ ] Update `HOME-PAGE-DESIGN.md` acceptance checklist
- [ ] Add an entry to the changelog (bottom of this file)
- [ ] Commit message: `feat(ui): <change> + canonical doc update`

### 4. Auto-verify hook (optional but recommended)
- [ ] `scripts/verify-uiux-canonical.mjs` — checks code matches doc
- [ ] CI runs on every PR touching `apps/web/**`

---

## 🔁 Change Categories

### Category A: LOCKED (founder approval required)
- Home page section count or order
- STL ladder formula display
- Theme switcher behavior
- iOS Classic / Diamond color tokens (already 58 tests in stlService)
- Plastic coating tokens
- 10-level gradient palette

### Category B: SEMI-LOCKED (canonical update mandatory)
- Card anatomy (within existing pattern)
- New section addition (with doc + data file)
- Component prop additions
- Copy/text changes

### Category C: FREE (still document)
- Internal padding/spacing tweaks
- Bug fixes
- A11y improvements

> Even Category C requires a one-line entry in this file's changelog.

---

## 📝 Change Log (append latest at top)

| Date | Change | Files updated | Author |
|------|--------|---------------|--------|
| 2026-05-02 | Add 5 remaining sections: Trust deals, Nearby pros, JPS jobs, EHB Tube, New sellers | `home-sections.ts` (+5 interfaces & data sets), `extra-rows.tsx` (new file with 5 components), `home/index.ts` (exports), `app/page.tsx` (5 sections wired in correct positions) | Claude (Cowork) |
| 2026-05-02 | Lock home page premium dark + MS Store layout (20 sections) | `HOME-PAGE-DESIGN.md`, `STL-LADDER-COMPONENT.md`, `COMPANIES-BY-STL.md`, `SECTION-CATALOG.md`, `UIUX-AUTO-SAVE-PROTOCOL.md`, `theme.ts`, `apps/web/app/page.tsx`, `apps/web/components/home/*` | Claude (Cowork) |
| 2026-04-30 | AI Marketplace UI/UX spec | `AI-MARKETPLACE-UIUX.md`, `AI-MARKETPLACE-FLOW.md` | Claude |
| 2026-04-21 | Created 15-ui-system folder | 8 initial files | Claude |

---

## 🛡 Enforcement (Claude system prompt)

Add the following to `CLAUDE.md` Hard Rules `Do` section:

```
- On ANY UI/UX change (code in apps/web/**, theme.ts, components/, lib/data/),
  ALWAYS update the relevant canonical file in ehb-info/15-ui-system/ in the
  SAME task. See UIUX-AUTO-SAVE-PROTOCOL.md.
```

And to the `Don't` section:

```
- Never change UI/UX code without updating its canonical spec file.
- Never duplicate UI specs outside ehb-info/15-ui-system/.
- Never change LOCKED tokens without founder approval.
```

---

## 🤖 For AI Agents

When user says: "add a new section to home page" / "change card color" / "redesign X":

1. **Read** `HOME-PAGE-DESIGN.md` first
2. **Plan** which canonical files will need updating
3. **Update** spec files first (so they describe the desired state)
4. **Implement** code to match spec
5. **Verify** code === spec
6. **Append** changelog entry above

If you skip these steps, the EHB project loses its single source of truth and future agents will produce drift. **This is the most important rule of the UI/UX layer.**

---

## Linked
- `CLAUDE.md` (root) — agent rules including this protocol
- `HOME-PAGE-DESIGN.md` — locked home page
- `UIUX-DESIGN-SYSTEM.md` — global tokens
- `_settings/SOURCE-OF-TRUTH.md` — overall ownership
- `0-index/AGENT-CONTEXT-BUNDLE.md` — auto-load index
