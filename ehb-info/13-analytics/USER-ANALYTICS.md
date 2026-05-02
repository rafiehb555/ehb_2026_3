# EHB · User Analytics

> **Status:** Canonical v1.0 · 2026-04-30

## Tracked dimensions

### Acquisition
- Signups per day / week / month
- Signup source (organic, referral, ad, franchise)
- Country / region of signup
- Device type (web, mobile, app)

### Activation
- Time to first transaction
- KYC completion rate
- PSS L1 → L3 conversion rate
- First-week retention

### Engagement
- Daily active users (DAU)
- Weekly active users (WAU)
- Session duration
- Pages per session
- Industry usage breakdown
- AI Marketplace usage

### Retention
- D1, D7, D30 retention
- Cohort retention curves
- Churn rate per role
- Reactivation rate

### Revenue
- Average order value (AOV)
- Lifetime value (LTV)
- Customer acquisition cost (CAC)
- LTV:CAC ratio

### STL distribution
- Histogram (L1-L10)
- STL upgrade velocity
- Average time per level
- Per-industry STL averages

### Geographic
- Active countries
- Top regions per country
- Cross-border activity

## KPIs by role

| Role | Key metrics |
|---|---|
| Buyer | Order frequency · cart abandonment · review rate |
| Seller | Listings · GMV · review score · STL trajectory |
| Service Provider | Sessions · earnings · client repeat rate |
| Rider | Deliveries · earnings · BTS rating |
| Inspector | Inspections done · accuracy · earnings |
| Franchisee | Territory KPIs (full per `FRANCHISE-DASHBOARD.md`) |

## Privacy

- Personal data anonymized for analytics
- GDPR / CCPA compliant
- User can opt out
- Aggregated only — no individual identification

## Tools

- Internal: PostgreSQL + ClickHouse + Grafana
- Mixpanel / Amplitude (consent)
- Custom EHB analytics dashboard

## Reporting

- Daily: ops team
- Weekly: founder + leadership
- Monthly: investors
- Quarterly: public summary

## Cross-references

- Revenue analytics: `REVENUE-ANALYTICS.md`
- Fraud analytics: `FRAUD-ANALYTICS.md`
- Privacy: `9-legal/PRIVACY.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial user analytics framework |
