# Cookie Policy — EHB Platform

> **Scope:** ehb.com + all sub-domains
> **Authority:** Privacy Officer

## What We Use Cookies For

| Category | Required? | Examples |
|----------|-----------|----------|
| Strictly necessary | Yes | Session, CSRF, auth tokens |
| Functional | Opt-in | Language pref, theme, sidebar state |
| Analytics | Opt-in | Visit count, page paths (anonymised) |
| Marketing | Opt-in | Conversion tracking, retargeting |

## Defaults
- EU/UK users: opt-in for non-essential
- Other regions: opt-out where local law allows
- All users: granular control via `/cookie-settings`

## Cookie Names (Required)
- `ehb.session` — auth session, HttpOnly, Secure, SameSite=Lax
- `ehb.csrf` — CSRF token, HttpOnly
- `ehb.locale` — language, no PII

## Third-Party Cookies
Listed transparently in `/cookie-settings`. Includes:
- Stripe (payment iframe)
- JazzCash (PK payment)
- OpenAI (AI consent)
- Cloudflare (security)

## Retention
- Session cookies: deleted on browser close
- Persistent cookies: max 12 months
- Analytics: 26 months (GA4 default)

## User Rights
- Reject non-essential at any time
- Export their cookie consent log
- Delete consent record + browser cookies

## Linked
- `PRIVACY.md`
- `TERMS.md`
