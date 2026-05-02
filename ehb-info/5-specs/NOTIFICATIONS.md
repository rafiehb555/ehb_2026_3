# EHB · Notifications System

> **Status:** Canonical v1.0 · 2026-04-30

## Channels

| Channel | Use |
|---|---|
| In-app | Real-time (Socket.IO) |
| Email | Important / asynchronous |
| SMS | Critical (phone OTP, urgent) |
| Push | Mobile app (Phase-2) |
| WhatsApp | Optional, regional preference |

## Notification categories

### Order
- Order placed / accepted / shipped / delivered
- Review reminder
- Refund processed

### Trust / STL
- STL upgraded / downgraded
- Refill due (7d, 3d, today)
- Verification expiring
- Slash event (with reason)

### Wallet
- Lock applied / released
- Yield distributed (daily)
- EHBGC received / sent
- Suspicious transaction

### Disputes
- Complaint filed against you
- DMO decision
- Appeal window opened

### Marketing (opt-in)
- New industry launched in your region
- AI Marketplace new module
- Franchise opportunities

### Admin
- DMO action required
- Slash event (audit copy)
- Fraud alert (Up-Guard)

## Priority levels

| Level | Channels | Sound |
|---|---|---|
| Critical (fraud, slash) | All channels | Loud |
| Urgent (dispute, refill expiring) | In-app + email + SMS | Standard |
| Standard (order updates) | In-app + email | None |
| Info (yield, marketing) | In-app | None |

## User preferences

- Per-category opt-in/out
- Per-channel preferences
- Quiet hours (timezone-aware)
- Frequency cap (max N/day for marketing)

## Backend infrastructure

- Socket.IO for real-time
- Email: SendGrid / Postmark
- SMS: Twilio + regional providers
- Push: Firebase (Phase-2)
- WhatsApp Business API

## Anti-spam

- Rate limit per user per category
- Aggregate digest option (daily summary)
- Easy unsubscribe (1-click)

## Cross-references

- Socket.IO: `services/api/src/services/notificationService.js`
- DMO alerts: `3-departments/DMO.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial notifications spec |
