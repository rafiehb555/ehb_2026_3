# AI Prompts — EHB Platform

> **Owner:** AI Team
> **Storage:** Versioned in `services/ai/prompts/` + this catalog.

## Prompt Categories

### 1. STL Explainer
- Input: user's STL breakdown
- Output: friendly explanation + improvement steps

### 2. Industry Matcher
- Input: user query + intent
- Output: top 3 industries + reasoning

### 3. Service Matcher
- Input: buyer need
- Output: 5 best service-providers ranked by STL × match × price

### 4. Dispute Summariser
- Input: complaint thread + evidence
- Output: structured summary for DMO officer

### 5. Review Synthesizer
- Input: 1000s of reviews
- Output: themes + sentiment + standout quotes

### 6. Fraud Pattern Detector
- Input: account behavior log
- Output: risk score + suspicious patterns

### 7. Listing Quality Checker
- Input: product listing
- Output: quality score + suggestions

### 8. Customer Support
- Input: user question + context
- Output: answer + escalation flag if needed

### 9. Onboarding Coach
- Input: user step in onboarding
- Output: tailored guidance

### 10. Founder Daily Brief Generator
- Input: ehb-status.json + day's metrics
- Output: 5-line summary + top 3 priorities

## Prompt Versioning
- Stored as `prompt_name@version`
- A/B tested before promotion
- Rollback always possible
- Audit log per change

## Industry Customization
Each prompt accepts `{industry: "WMS"}` config. Industry-specific terminology, regulations, examples plug in via config — single prompt, 38 outputs.

## Country Customization
- Language: en, ur, ar, tr, ms, id, fr, de, etc.
- Cultural norms (politeness, formality)
- Local examples + currency

## Cost Optimization
- Choose model by task complexity (Haiku for matchers, Sonnet for explainers, Opus for dispute summary)
- Cache common outputs
- Truncate long contexts
- Use embeddings for similarity, not full LLM

## Linked
- `AI-MODELS.md`
- `AI-PROMPT-TEMPLATES.md`
- `AI-COSTS.md`
- `AI-SAFETY.md`
