# Exam Library — EHB CRB

Each industry has a JSON file with:
- `theory_mcqs`: array of multiple-choice questions (50 target)
- `practical_tasks`: array of practical assessments (5 target)
- `passing_criteria`: { theory_min_pct, practical_min_pct, overall_min_pct }
- `crb_level_required_per_score`: scoring → CRB level mapping
- `validity_months`: how long the cert lasts (default 12)

## Question Object
```json
{
  "id": "WMS-T-001",
  "stem": "...",
  "options": ["A", "B", "C", "D"],
  "answer_index": 2,
  "category": "anatomy",
  "difficulty": "L4",
  "ref_link": "ehb-info/...md"
}
```

## Practical Task Object
```json
{
  "id": "WMS-P-001",
  "title": "...",
  "scenario": "...",
  "deliverables": ["...", "..."],
  "evaluation_rubric": [{ "criterion": "...", "weight": 30 }],
  "time_limit_hours": 2,
  "min_pass_score": 70
}
```

## Generation
Initial 5-15 questions are hand-curated. AI auto-expands to 50 via OpenAI API:
```bash
node scripts/generate-exam.mjs --industry WMS --count 35
```

## Industries Bootstrapped
- WMS — World Medical Services
- OLS — Online Law Services
- FIN — Finance & Investment
- INS — Insurance Services
- HCS — Health & Compliance

Remaining 33 industries: schedule generation in P3.
