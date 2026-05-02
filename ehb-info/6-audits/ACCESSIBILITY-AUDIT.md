# Accessibility Audit — EHB Platform

> **Owner:** Design + Engineering
> **Standard:** WCAG 2.1 AA
> **Cadence:** Every UI release

## Audit Checklist

### Perceivable
- [ ] All images have alt text
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Color contrast ≥ 3:1 for UI components
- [ ] No color-only meaning conveyance
- [ ] Captions on all video
- [ ] Resize to 200% without loss

### Operable
- [ ] Full keyboard navigation
- [ ] Visible focus indicators
- [ ] No keyboard traps
- [ ] Skip-to-content link
- [ ] Touch targets ≥ 44×44px
- [ ] No auto-playing media
- [ ] Adjustable timeouts

### Understandable
- [ ] Page language declared
- [ ] Predictable navigation
- [ ] Form labels + error messages
- [ ] Error prevention on financial actions
- [ ] Consistent UI patterns

### Robust
- [ ] Valid HTML
- [ ] ARIA used correctly (or not at all)
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Works without JavaScript for core flows

## Country-Specific
- [ ] RTL support for AR (UAE, SA, EG, KW, OM, QA)
- [ ] Urdu fonts render correctly
- [ ] Number/currency formats per locale
- [ ] Date formats per locale

## Tools
axe DevTools, Lighthouse, NVDA, VoiceOver, manual keyboard test.

## Linked
- `15-ui-system/UI-RULES.md`
- `5-specs/I18N-LOCALIZATION.md`
