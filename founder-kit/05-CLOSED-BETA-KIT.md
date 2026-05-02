# Step 5 — Closed Beta Program (50 Users)

> **Timeline:** 2 weeks recruitment + 4 weeks running
> **Goal:** Validate flow, find bugs, gather first testimonials

## Beta User Mix (Target: 50)

| Category | Count | Why |
|----------|------:|-----|
| Sellers (general goods) | 15 | Test GSM core flow |
| Service providers (HPS, OLS, ELS) | 10 | Test service marketplace |
| Buyers (active shoppers) | 15 | Test buyer flow + payments |
| Students (HPS / OBS) | 5 | Test course/exam flow |
| DMO testers (friends/family with judgment) | 5 | Test complaint flow |

## Recruitment Channels

| Channel | Approach |
|---------|----------|
| Personal network | Founder's network — 30% of cohort |
| WhatsApp groups | 5-10 relevant groups |
| Twitter / LinkedIn | Founder posts beta call |
| University connections | LUMS / FAST / IBA students |
| Local business owners | Karachi/Lahore SME network |

## Recruitment Message (paste-ready)

```
Bismillah — EHB ka first beta launch ho raha hai.

Hum bana rahe hain Pakistan ka pehla trust-verified multi-industry
super-app. 38 industries. STL trust score. Polkadot-anchored audit.

Aap kya pao gay (beta tester):
- Free access to all features
- 1000 EHBGC bonus (worth ~$50)
- L4 STL boost (free for 90 days)
- Founder-only Slack access
- Early discount when public launch

Expected commitment:
- 30 min onboarding call
- Use platform 3-5 times in 4 weeks
- 15 min feedback survey at end

Interested? Reply with your name + city + role (buyer/seller/etc.).
Limited to 50 spots.
```

## Beta User Onboarding Flow

### Day 1
- Welcome email with login credentials
- Onboarding call (15 min, founder or DMO officer)
- Slack invite + WhatsApp group

### Days 2-7
- Self-paced exploration
- Daily nudge email: "Try X today"

### Days 8-21
- Real transactions (if comfortable)
- Beta-specific incentive credits ($5 free for first 5 transactions)

### Days 22-28
- Feedback survey (Google Forms)
- 1-on-1 call with 10 most active users
- Bug bounty: $20 for any P0 bug, $5 for P1

## Beta Feedback Survey (template)

1. **First impression** — 1 to 10
2. **Easiest part** — open
3. **Hardest part** — open
4. **Top 3 things you LOVED**
5. **Top 3 things you HATED**
6. **Would you recommend to a friend?** (NPS 0-10)
7. **What would make you a paying customer?**
8. **Any bugs?** — open + screenshot upload
9. **What feature would you build next?**

## Success Criteria (decide go/no-go for public launch)

| Metric | Target |
|--------|-------:|
| NPS (Net Promoter Score) | ≥ 30 |
| Activation rate (signup → first txn) | ≥ 30% |
| Retention (week 2) | ≥ 50% |
| Critical bugs found | < 5 |
| User testimonials collected | ≥ 10 |

If targets met → public launch.
If not → second beta cohort with fixes.

## Beta Phase Tools (already built or scaffolded)

| Tool | Built? |
|------|:------:|
| User signup | ✅ (auth.js) |
| Onboarding flow | ✅ (apps/web/app/onboarding) |
| Order flow | ✅ (orderService) |
| Payment (sandbox) | ✅ (stripe + jazzcash adapters) |
| STL display | ✅ (/stl page) |
| Feedback form | 🟡 (use Google Forms initially) |
| Bug tracker | 🟡 (use GitHub Issues) |
| In-app chat | 🟡 (use WhatsApp or Slack initially) |

## After Beta — Public Launch Trigger

When 4 of 5 success criteria green for 2 consecutive weeks → schedule public launch (Step 7).

## Linked
- `04-TEAM-HIRING.md` (DMO officer leads beta ops)
- `06-FIRST-REVENUE.md`
- `ehb-info/2-phases/EHB-LAUNCH-PLAYBOOK.md`
