## Goal

A friendly, multi-step web app that helps non-technical users pick the right local **llamafile** model for their device and use case, then guides them through download + running it locally to get a ChatGPT-like experience in llamafile's own browser UI.

Sustainability is a hidden first-class ranking criterion: smaller, lighter models are preferred whenever they're "good enough" for the use case + device tier — even when the user didn't explicitly ask for it.

## Visual direction

Clean SaaS / Cloud White palette: near-white background `#fafbfc`, soft surfaces `#e8ecf1`, slate `#94a3b8`, primary blue `#3b82f6`. Generous whitespace, rounded cards, subtle shadows, friendly micro-copy. Single typography pair (Inter or similar). Tokens added to `src/styles.css`.

## User flow (5 steps)

```text
1. Landing
     ↓ "Check my device"
2. Use case selection  (multi-select grid + "Something else" free-text)
     ↓
3. Device check        (auto-detect + manual confirm)
     ↓
4. Recommendation      (1 primary + 2 alternatives, badges, "Why?")
     ↓
5. Setup instructions  (download link + OS-specific run commands + open localhost:8080)
```

A persistent top progress indicator shows the 5 steps. Each step is its own route.

## Use cases (extensible catalog)

Defined in `src/lib/use-cases.ts` as a typed list — easy to add more later. Each entry has `id`, `label`, `icon`, `personaHints`, `capabilityWeights` (which model capability scores it boosts), and an optional `specialNote` (e.g. transcription's "use a separate STT tool first" banner).

Initial catalog (multi-select; users may pick several):

**Writing & language**
- Grammar & spell-check
- Rewriting / tone change (formal ↔ casual)
- Summarizing long text or articles
- Translating between languages
- Drafting emails & messages

**Thinking & learning**
- Brainstorming ideas
- Explaining a concept simply ("ELI5")
- Studying & flashcard-style Q&A
- Reading-comprehension helper for kids/teens

**Structured output**
- Diagram generation (Mermaid / flowcharts)
- Outlining documents or slides
- Extracting structured data from messy text (lists, tables)
- Formatting / cleaning notes

**Code & tech**
- Code explanation
- Small code snippets & shell commands
- Regex helper

**Audio & multimodal** (with caveats)
- Audio transcription cleanup (LLMs aren't STT — banner explains)
- Image description / "what's in this picture?" (multimodal only — surfaces llava)

**Daily life & fun**
- Recipe ideas from ingredients
- Travel & itinerary suggestions
- Roleplay / story writing
- Gaming companion (lore lookup, build advice — speaks to Delia)
- Journaling prompts

**"Something else" free-text** — captured, mapped to the closest weighted profile by keyword (writing-ish vs structured-ish vs code-ish vs multimodal). No backend; pure client heuristic.

Then the user picks **what matters most**: fastest responses / balanced / best quality / lowest energy / strongest privacy.

## Routes

- `/` — Landing: explains local AI (privacy / sustainability / offline / control), CTA "Check my device".
- `/use-case` — Multi-select grid of cases above + free-text + "What matters most?".
- `/device` — Auto-detected (UA OS, `navigator.hardwareConcurrency`, `navigator.deviceMemory`, WebGL `UNMASKED_RENDERER_WEBGL`); user confirms/overrides RAM, free disk, GPU presence. Resolves a tier: `Basic` / `Balanced` / `Power` / `Advanced`.
- `/recommendation` — Primary + 2 alternatives + Compare panel + "Why this model?" + sustainability note.
- `/setup` — Download button (real HuggingFace `.llamafile` URL), OS-tabbed run instructions (chmod + run on macOS/Linux, rename `.exe` on Windows), "Open chat at http://localhost:8080" CTA. No in-app chat.

Every route gets distinct `head()` meta.

## Recommendation logic (sustainability-weighted)

Pure function `recommend({ useCases[], priority, tier }) → { primary, alternatives[2] }` in `src/lib/recommender.ts`, fed by:

- `src/lib/models.ts` — model metadata (filename, friendly name, size GB, download URL, license, capability scores 1–5 per capability tag like `writing`, `structured`, `code`, `multimodal`, `reasoning`, energy score).
- `src/lib/use-cases.ts` — case → capability weights.
- `src/lib/tiers.ts` — device → tier resolver.

When multiple use cases are selected, weights are summed then normalized. Score per candidate = `useCaseFit * 1.0 + tierFit * 0.8 + sustainabilityBonus * 0.6 + priorityAdjustment`. Sustainability bonus inversely proportional to size. Audio-cleanup adds a banner. Image-description forces `llava` into the candidate set; otherwise multimodal stays out.

Default starter mapping (matches `llms-by-use-case.md`): Basic → Bonsai-1.7B; Balanced → Bonsai-4B (sustainability-first) or Qwen3.5-4B; Power → Qwen3.5-4B → Apertus-8B; Advanced → Apertus-8B → Qwen3.5-9B (only when "best quality" priority).

## Sustainability surfacing

- Each model card: download size, "energy" badge (Low / Medium / High), plain-language note ("≈ streaming HD video for ~20 min per long chat").
- Recommendation explanation always names the smaller alternative the user *could* have used and why we still picked the chosen one.
- Educational micro-section on landing + collapsible "Why smaller is often enough" panel on `/recommendation`.

## State management

URL search params for use cases + priority; small Zustand store (or context) for transient device-detection results. No backend, no Lovable Cloud — fully local-first, mock metadata. README explains how to extend.

## Technical notes

- TanStack Start file-based routes under `src/routes/`. No server functions, no Cloud.
- Components: `StepProgress`, `UseCaseGrid` + `UseCaseCard`, `DeviceCard`, `TierBadge`, `ModelCard`, `WhyPanel`, `SetupInstructions` (OS tabs).
- Device detection in `src/lib/device.ts`, SSR-guarded, runs in `useEffect`.
- Run snippets per OS as constants; `<pre>` blocks with copy-to-clipboard.
- Replace placeholder index. Distinct `head()` per route.
- Accessibility: keyboard navigation, landmarks, alt text.

## Out of scope

- No in-app chat UI (per user choice — instructions only).
- No real benchmarking or in-browser model download.
- No auth / persistence / database.
