## Goal

Make the free-text input feel less mysterious by:
1. Expanding the keyword heuristic so more natural phrasings hit a real capability.
2. Showing the user — live, under the textarea — which capabilities their words triggered.

## Changes

### 1. Expand `freeTextWeights` in `src/lib/use-cases.ts`

Refactor the implementation from inline regexes into a small declarative table so it stays readable as it grows. Add many more synonyms per capability and return the matched terms (for the UI hint) alongside the weights.

New shape:

```ts
export interface FreeTextMatch {
  weights: Partial<Record<Capability, number>>;
  matched: { capability: Capability; terms: string[] }[];
}

export function freeTextWeights(text: string): FreeTextMatch
```

Keep a thin compat wrapper or update the single caller in `src/lib/recommender.ts` to read `.weights`.

Expanded keyword sets (rough draft — final list can grow during implementation):

- **writing**: write, rewrite, edit, proofread, grammar, spelling, tone, email, message, letter, reply, draft, translate, translation, summarize, summary, paraphrase, blog, post, caption
- **code**: code, coding, program, programming, script, bug, debug, refactor, regex, sql, query, terminal, shell, bash, function, api, html, css, javascript, typescript, python, rust, java
- **structured**: diagram, mermaid, chart, table, json, yaml, csv, xml, schema, structure, structured, outline, format, list, bullet, organize, categorize, classify, extract, parse
- **multimodal**: image, photo, picture, visual, screenshot, diagram (image sense), describe (when paired with image), alt text, caption (image), drawing, sketch, ocr
- **creative**: story, novel, fiction, poem, poetry, lyrics, song, roleplay, character, brainstorm, idea, creative, fun, joke, recipe, cooking, travel, itinerary, gift, name, slogan, headline
- **reasoning**: explain, why, how, reason, analyze, analysis, compare, evaluate, decide, study, learn, teach, tutor, eli5, math, logic, puzzle, plan, strategy, research, understand

Matching: word-boundary regex per capability, not substring, so "scripture" doesn't match `script`. Track which terms matched for the UI.

Keep the empty-fallback behaviour (`writing + reasoning`) but mark it as `matched: []` so the UI can show "no specific signal — defaulting to writing & reasoning".

### 2. Show a live hint under the textarea in `src/routes/use-case.tsx`

Below the `<textarea>` (after line 131), add a small hint that updates as the user types. Use existing tokens (`text-muted-foreground`, `text-foreground`, `border-foreground/15`).

- Empty textarea → no hint (nothing to show).
- Text with matches → "We read this as: **writing**, **reasoning** *(from "email", "grammar", "explain")*". Show the human-readable capability names mapped from `Capability` IDs (e.g. `writing` → "Writing", `multimodal` → "Image understanding"). Render capabilities as small pills.
- Text with no keyword hits → muted line: "No strong signal — we'll lean on writing & reasoning by default."

Compute the hint with `useMemo(() => freeTextWeights(state.freeText), [state.freeText])` so it stays cheap.

### 3. Tiny capability label map

Add a `CAPABILITY_LABELS: Record<Capability, string>` next to `freeTextWeights` (or in `src/lib/models.ts` next to the `Capability` type) so both the hint UI and any future surface use the same friendly names.

## Files touched

- `src/lib/use-cases.ts` — expand keywords, return `{ weights, matched }`, add `CAPABILITY_LABELS` (or add it to `models.ts`).
- `src/lib/recommender.ts` — update the one call site to read `.weights`.
- `src/routes/use-case.tsx` — render the live hint below the textarea.

## Out of scope

- No change to the preset use-case buttons or the recommender's scoring logic itself.
- No LLM call — still a local keyword heuristic.
