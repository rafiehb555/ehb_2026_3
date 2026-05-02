# AI Models — EHB Platform

> **Owner:** AI Team
> **Strategy:** Best model per task, not one-model-fits-all.

## Model Tiers

### Tier 1 — Fast & Cheap (matchers, classifiers)
- **Claude Haiku** / **GPT-3.5-turbo**
- ~$0.001 / 1k tokens
- Use: industry matching, intent classification, simple Q&A

### Tier 2 — Balanced (explainers, drafters)
- **Claude Sonnet** / **GPT-4o-mini**
- ~$0.003 / 1k tokens
- Use: STL explainer, support replies, listing quality check

### Tier 3 — Heavy (synthesis, reasoning)
- **Claude Opus** / **GPT-4o**
- ~$0.015 / 1k tokens
- Use: dispute summarisation, fraud reasoning, founder briefs

### Tier 4 — Embeddings
- **OpenAI text-embedding-3** / **Voyage**
- For similarity search, RAG, recommendations

### Tier 5 — Specialized
- **Whisper** — voice/audio transcription
- **CLIP / vision models** — listing image quality, OCR
- **Custom fine-tuned** — STL-specific tasks (future)

## Model Selection Decision Tree
```
Is task a classification / match? → Tier 1
Is task a draft / explanation? → Tier 2
Is task multi-step reasoning? → Tier 3
Is task similarity / search? → Tier 4
Is task multi-modal? → Tier 5
```

## Provider Strategy
- Primary: OpenAI / Anthropic (most reliable)
- Backup: Cross-provider fallback on outage
- Open-source on-prem (Llama 3) for sensitive data (KYC, dispute evidence)

## Versioning
- Model versions pinned per prompt
- Upgrade path: A/B test before promotion
- Rollback always possible

## Latency Budget
- Tier 1: 500ms p95
- Tier 2: 1.5s p95
- Tier 3: 4s p95 (async preferred)
- Tier 4: 200ms p95

## Linked
- `AI-PROMPTS.md`
- `AI-COSTS.md`
- `AI-CAPABILITIES.md`
