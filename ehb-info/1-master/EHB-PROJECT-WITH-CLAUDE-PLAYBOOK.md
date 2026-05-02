# EHB · Project-with-Claude Playbook

> **Audience:** Muhammad Rafi (Founder, non-technical) — first time planning
> a major project with AI.
>
> **Purpose:** Major rules to follow start-to-end when building a big project
> like EHB with Claude. If you follow these 12 rules, you stay in control even
> without being technical.
>
> **Locked:** 2026-04-25 · v1.0

---

## The 12 master rules

### Rule 1 — One-line vision rule

Every project must have a 1-line mission you can say in 10 seconds.

> **EHB:** "One platform unifying 38 industries with AI + blockchain trust backbone."

If Claude (or anyone) ever drifts from this, you remind them.

### Rule 2 — Source-of-truth folder rule

ALL official information lives in ONE folder — `ehb-info/`.

- Spec files
- Decisions log
- User flows
- Audit notes
- Communication rules

If it's not in the folder, it's not official. Chat is conversation, files are truth.

### Rule 3 — Phase rule

Bara project ek hi baar mein nahi banta. Phases mein toro:

- **Phase 0:** Vision + canonical info
- **Phase 1:** First 6 industries + core systems (DMO, PSS, CRB, STL, Wallet, AI)
- **Phase 2:** Next 11 industries
- **Phase 3:** Remaining 21 industries + global rollout

Har phase ka apna goal + apna deadline + apni "done" definition.

### Rule 4 — Visual-first rule

Pehle picture, phir text. Agar AI sirf paragraphs bhej raha hai bina diagram ke,
bolen "ek visual bhi do".

For every:
- New feature → flow diagram
- New screen → card mockup
- New decision → options matrix
- New rule → before-after comparison

### Rule 5 — Decision log rule

**Decisions chat mein nahi hote — files mein hote hain.**

Jab bhi koi rule, formula, ya design decision lock karen:
- AI ko bolen "ye decision is file mein save karo with date"
- Date + version bump
- Old version backup

This way you can always trace who decided what and when.

### Rule 6 — Bilingual-on-confusion rule

Agar koi technical term confuse kare, AI ko bolen "isse Roman-Urdu mein samjhao".

You're not weak for asking. Asking creates the simple language version that
non-technical team members will need later anyway.

### Rule 7 — Status pulse rule

`ehb-status.json` is the live heartbeat:

- This week's top 5 priorities
- What's blocked and why
- Phase progress %
- Last update date

Read it at the start of every work session. Update at the end.

### Rule 8 — No-code-without-preview rule

NEVER let AI write code for a UI without showing you a mockup first.

Sequence:
1. AI shows visual mockup (SVG / image)
2. You approve / change
3. THEN code is written
4. Code result is verified by another mockup or screenshot

### Rule 9 — Test-by-explain-back rule

Time to time, ask AI: "ye plan apne words mein wapas batao."

If AI's explanation matches what you understood → you're aligned.
If not → there's drift. Fix before continuing.

### Rule 10 — Two-file output rule

After every major task, AI should produce 2 files:

- **What changed** — plain Roman-Urdu summary of what got done
- **Visual** — diagram or mockup showing it

Code without these = not done.

### Rule 11 — Rollback-ready rule

Before any big change:
- AI creates a backup folder: `backup/<change-name>-YYYY-MM-DD/`
- If something breaks, "rollback" command restores

You should never feel stuck because something broke.

### Rule 12 — Question-as-answer rule

Agar AI confused hai (e.g., "PSS lock ya entity lock?"), AI ko **decision nahi
leni**. AI ko options dene chahiyen — A / B / C — phir aap pick karen.

If AI ever just decides on its own when there's ambiguity, push back.

---

## How a typical work session should flow

```text
1. Open ehb-status.json → check priorities for today
2. Tell Claude what you want to work on
3. Claude shows a plan with options (A/B/C)
4. You pick option
5. Claude does the work
6. Claude shows visual mockup
7. You approve / change
8. Claude saves files (with paths)
9. Claude updates ehb-status.json
10. Claude shows summary: kya hua, kya pending, agla kya
```

---

## When things go wrong (recovery)

| Problem | What to do |
|---|---|
| AI is giving too much technical detail | "isse Roman-Urdu + visual mein samjhao" |
| AI changed something you didn't agree to | "wahi cheez wapas karo, woh decision pehle confirm karo" |
| You forget what was decided | Open `ehb-info/EHB-STL-AUDIT-AND-IMPROVEMENTS.md` (or relevant file) + check changelog |
| AI uses a term you don't know | "ye term kya hai? simple words mein" |
| Long response is overwhelming | "summary do, details file mein save karo" |
| Conflicting rules / contradictions | "is conflict ko surface karo, options dikhao" |

---

## What success looks like (per phase)

By end of Phase 1, you should have:

- ✅ All canonical info in `ehb-info/` folder
- ✅ 6 industries live with end-to-end flows
- ✅ Working PSS, CRB, DMO, STL, Wallet, AI
- ✅ Founder can demo the app to a non-technical investor in 10 min
- ✅ Founder understands every screen without help

If you can't demo confidently → Phase 1 not done.

---

## Founder's daily checklist (5 min)

- [ ] Read `ehb-status.json` priorities
- [ ] Pick 1 thing to work on today
- [ ] Tell Claude — "yeh karna hai, options do"
- [ ] Pick option
- [ ] Approve mockup
- [ ] At end of session: ask Claude for summary file

That's it. The rest Claude handles.

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-25 | 1.0 | Initial 12-rule playbook authored at founder request |
