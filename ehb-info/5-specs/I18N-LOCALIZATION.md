# Internationalization & Localization — EHB Platform

> **Owner:** UI + Country leads
> **Scope:** 17 countries, 8+ languages.

## Languages by Phase

### Phase 1
- English (en) — universal default
- Urdu (ur) — Pakistan
- Arabic (ar) — UAE, SA
- Turkish (tr) — Turkey
- Malay (ms) — Malaysia

### Phase 2
- Indonesian (id) — Indonesia
- + Arabic for QA, KW, OM, EG

### Phase 3
- French (fr) — France, Canada, partial
- German (de) — Germany
- Simplified Chinese (zh-CN) — China
- Hindi (hi) — India

## Architecture

### Storage
- Translation strings in `apps/web/locales/<lang>.json`
- Server-side strings in `services/api/locales/<lang>.json`
- Email templates in `<lang>/<template>.html`
- AI prompt overrides per language in `services/ai/prompts/<lang>/`

### Selection Logic
1. URL pattern `/<lang>/...` (highest priority)
2. User profile language preference
3. `Accept-Language` header
4. Country-default language
5. English fallback

### RTL Languages
- Arabic, Urdu (some) → RTL layout
- CSS uses logical properties (`margin-inline-start` not `margin-left`)
- All directional icons mirrored

## Content Types

### UI Strings
- `t('common.welcome')` → translated string
- ICU format for plurals + interpolation
- Pluralization rules per language
- Gender support where languages require

### Currency
- Per-country default + per-user override
- Format with locale-aware separators
- Conversion via daily FX rate
- Display with code if ambiguous (USD, AED, ...)

### Date / Time
- ISO 8601 wire format
- Locale-aware display
- Timezone: user's preference, server stores UTC

### Numbers
- 1,234.56 (en) → 1.234,56 (de) → ١٬٢٣٤٫٥٦ (ar)
- Percentages, units localized

## Translation Workflow
1. Source (English) added to `en.json`
2. Marked `pending` in tracking sheet
3. Sent to translator (pro or AI-assisted with review)
4. QA by native speaker
5. Merged to `<lang>.json`
6. Auto-deploy on next release

## QA Checklist
- [ ] Strings don't overflow (UI)
- [ ] RTL pages mirror correctly
- [ ] Date formats correct
- [ ] Currency formats correct
- [ ] Plurals work
- [ ] AI prompts produce localized output
- [ ] Email templates render correctly
- [ ] SMS character count under limit

## Missing Translation Fallback
- Show English with a small `[en]` badge
- Log key + language to retranslation queue

## Linked
- `../9-legal/COUNTRY-SPECIFIC-LAWS.md`
- `../14-growth/CONTENT-STRATEGY.md`
- `../15-ui-system/UI-RULES.md`
