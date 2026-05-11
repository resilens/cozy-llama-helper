# LLMs by Use Case

This guide ranks the available `llamafile v0.10.x` models against the user needs described in `design.md`: privacy, sustainability, ease of use, and everyday usefulness.

## How this ranking works

The project in `design.md` focuses on three concrete use cases:

1. audio transcription
2. grammar help
3. diagram generation

It also describes four personas:

- **Petra**: low technical interest, needs simplicity
- **Kai**: outcome-driven, wants practical value fast
- **Daniel**: wants things to just work
- **Delia**: impatient, sensitive to speed and engagement

Because the listed llamafiles are mostly general-purpose LLMs, this ranking favors:

- smaller and faster models for accessibility and sustainability
- stronger mid-size instruct models for reliable everyday help
- larger models only when quality clearly matters more than local efficiency
- models that match the user’s machine, not just the use case

## Machine capability matters first

For mainstream users, the most responsible recommendation is to choose a model based on both **use case** and **device capability**.

Users should not need to interpret quantization names, VRAM, or benchmark charts. Instead, the product should translate hardware into a few simple tiers.

### Suggested device tiers

#### `Basic`
**Typical machine:** older laptop, entry-level desktop, around 8 GB RAM, no strong GPU

- Prioritize fast startup, responsiveness, and low memory use
- Avoid large models and multimodal models
- Best fit for Petra and Delia

**Recommended models:**
1. `Bonsai-1.7B.llamafile`
2. `Bonsai-4B.llamafile`

#### `Balanced`
**Typical machine:** mainstream recent laptop or desktop, around 16 GB RAM, modest GPU or Apple Silicon

- Good target tier for most everyday users
- Can handle stronger general-purpose models while staying local-first
- Best fit for Daniel

**Recommended models:**
1. `Bonsai-4B.llamafile`
2. `Qwen3.5-4B-Q5_K_S.llamafile`
3. `Ministral-3-3B-Instruct-2512-Q4_K_M.llamafile`

#### `Power`
**Typical machine:** stronger laptop or desktop, 32 GB RAM or solid GPU support

- Good for users who want better quality and can accept heavier downloads
- Best fit for Kai or advanced Daniel-like users

**Recommended models:**
1. `Qwen3.5-4B-Q5_K_S.llamafile`
2. `Apertus-8B-Instruct-2509.llamafile`
3. `Qwen3.5-9B-Q5_K_S.llamafile`

#### `Advanced`
**Typical machine:** high-memory workstation or high-end GPU setup

- Suitable for users who explicitly want larger models
- Least aligned with the mainstream accessibility goal, but useful as an optional path

**Recommended models:**
1. `Qwen3.5-9B-Q5_K_S.llamafile`
2. `Apertus-8B-Instruct-2509.llamafile`
3. `gemma-4-E4B-it-Q5_K_M.llamafile`

## Best overall picks for this project

### 1. `Bonsai-1.7B.llamafile`
**Best for:** Petra, Delia, first-time local AI users, `Basic` devices

- Smallest download in the list
- Fastest to start and cheapest to run locally
- Best fit for demonstrating that AI can run privately on-device
- Good for lightweight grammar help and simple structured text tasks
- Most aligned with the sustainability and accessibility goals in `design.md`

**Trade-off:** weaker reasoning and lower output quality than larger models.

### 2. `Bonsai-4B.llamafile`
**Best for:** Petra, Daniel, general everyday assistance, `Basic` to `Balanced` devices

- Better balance of quality and speed than the 1.7B model
- Still compact enough to feel approachable for non-expert users
- Strong candidate for a default “responsible AI” starter model
- Likely good enough for grammar fixes, rewriting, and simple diagram prompts

**Trade-off:** still limited for complex formatting or long multi-step tasks.

### 3. `Qwen3.5-4B-Q5_K_S.llamafile`
**Best for:** Daniel, Kai, users wanting better output without jumping too large, `Balanced` to `Power` devices

- Stronger language quality than tiny models
- Good middle ground for grammar, summarization, and structured outputs
- More likely to follow instructions cleanly for diagram descriptions or Mermaid-style prompts
- Still relatively sustainable compared with 9B+ options

**Trade-off:** larger download and slower response than Bonsai models.

### 4. `Apertus-8B-Instruct-2509.llamafile`
**Best for:** Kai, Daniel, “I want useful results now” users, `Power` to `Advanced` devices

- Strong general instruct model for everyday productivity tasks
- Good candidate when users care more about answer quality than minimal footprint
- Suitable for grammar improvement, drafting, and more reliable structured generation
- A good “upgrade” recommendation after users outgrow smaller models

**Trade-off:** meaningfully heavier to download and run.

### 5. `Qwen3.5-9B-Q5_K_S.llamafile`
**Best for:** Kai, advanced local users, higher-quality text generation, `Advanced` devices

- Stronger text quality for demanding writing or structured generation
- Good when the user accepts a larger local footprint for better outputs
- Could work well for polished grammar support and more complex diagram instructions

**Trade-off:** less accessible for mainstream users and weaker on sustainability goals.

## Ranked by use case

## 1) Grammar help

Grammar help is the best fit for this model list because it mainly needs good instruction following, rewriting, and tone control.

### Recommended ranking by model quality

1. `Qwen3.5-4B-Q5_K_S.llamafile`
2. `Apertus-8B-Instruct-2509.llamafile`
3. `Qwen3.5-9B-Q5_K_S.llamafile`
4. `Bonsai-4B.llamafile`
5. `Bonsai-1.7B.llamafile`
6. `gemma-4-E2B-it-Q5_K_M.llamafile`
7. `gemma-4-E4B-it-Q5_K_M.llamafile`
8. `Ministral-3-3B-Instruct-2512-Q4_K_M.llamafile`

### Recommended ranking by machine tier

- `Basic`: `Bonsai-1.7B.llamafile`, `Bonsai-4B.llamafile`
- `Balanced`: `Bonsai-4B.llamafile`, `Qwen3.5-4B-Q5_K_S.llamafile`
- `Power`: `Qwen3.5-4B-Q5_K_S.llamafile`, `Apertus-8B-Instruct-2509.llamafile`
- `Advanced`: `Apertus-8B-Instruct-2509.llamafile`, `Qwen3.5-9B-Q5_K_S.llamafile`

### Why

- **Best default:** `Qwen3.5-4B-Q5_K_S.llamafile` gives the best likely balance of quality, speed, and local accessibility.
- **Best quality upgrade:** `Apertus-8B-Instruct-2509.llamafile` or `Qwen3.5-9B-Q5_K_S.llamafile` if the device can handle them.
- **Best sustainability-first option:** `Bonsai-4B.llamafile`.
- **Best ultra-light demo:** `Bonsai-1.7B.llamafile`.
- **Best mainstream recommendation flow:** start with machine tier, then choose the highest-ranked grammar model within that tier.

### Persona fit

- **Petra:** `Bonsai-1.7B.llamafile`, `Bonsai-4B.llamafile`
- **Kai:** `Apertus-8B-Instruct-2509.llamafile`, `Qwen3.5-9B-Q5_K_S.llamafile`
- **Daniel:** `Qwen3.5-4B-Q5_K_S.llamafile`, `Bonsai-4B.llamafile`
- **Delia:** `Bonsai-1.7B.llamafile`, `Bonsai-4B.llamafile`

## 2) Diagram generation

For diagram generation, these models are best used to create **diagram code or text descriptions** such as Mermaid, flowcharts, sequence diagrams, or bullet-to-diagram transformations.

### Recommended ranking by model quality

1. `Qwen3.5-4B-Q5_K_S.llamafile`
2. `Apertus-8B-Instruct-2509.llamafile`
3. `Qwen3.5-9B-Q5_K_S.llamafile`
4. `gemma-4-E2B-it-Q5_K_M.llamafile`
5. `Bonsai-4B.llamafile`
6. `Ministral-3-3B-Instruct-2512-Q4_K_M.llamafile`
7. `Bonsai-1.7B.llamafile`

### Recommended ranking by machine tier

- `Basic`: `Bonsai-4B.llamafile`, `Bonsai-1.7B.llamafile`
- `Balanced`: `Qwen3.5-4B-Q5_K_S.llamafile`, `Bonsai-4B.llamafile`
- `Power`: `Qwen3.5-4B-Q5_K_S.llamafile`, `Apertus-8B-Instruct-2509.llamafile`
- `Advanced`: `Apertus-8B-Instruct-2509.llamafile`, `Qwen3.5-9B-Q5_K_S.llamafile`

### Why

- Diagram generation needs structured output and instruction following more than raw creativity.
- `Qwen3.5-4B-Q5_K_S.llamafile` looks like the best balance for generating Mermaid or other diagram-friendly text.
- `Apertus-8B-Instruct-2509.llamafile` is a strong higher-quality option for more complex diagrams.
- Smaller Bonsai models are good for simple flows but may break syntax more often.
- On weaker machines, responsiveness matters more than perfect syntax, so `Bonsai-4B.llamafile` is a safer default than a larger model.

### Persona fit

- **Petra:** `Bonsai-4B.llamafile` for simple flowcharts
- **Kai:** `Apertus-8B-Instruct-2509.llamafile` for higher-quality outputs
- **Daniel:** `Qwen3.5-4B-Q5_K_S.llamafile` as a practical default
- **Delia:** `Bonsai-1.7B.llamafile` or `Bonsai-4B.llamafile` for fast response

## 3) Audio transcription

This is the weakest fit in the provided list.

These llamafiles are mostly text or multimodal chat models, not dedicated speech-to-text models. If the product truly needs transcription, the responsible recommendation is to use a local speech model separately and optionally pass the transcript into one of these LLMs for cleanup, summarization, or grammar correction.

### Best available ranking from this list

1. `llava-v1.6-mistral-7b-Q8_0.llamafile`
2. `llava-v1.6-mistral-7b-Q4_K_M.llamafile`
3. `Qwen3.5-4B-Q5_K_S.llamafile`
4. `Apertus-8B-Instruct-2509.llamafile`
5. `Bonsai-4B.llamafile`

### Recommended ranking by machine tier

- `Basic`: avoid direct transcription with these models; use a separate speech tool and optionally `Bonsai-4B.llamafile` for cleanup
- `Balanced`: use a separate speech tool, then `Bonsai-4B.llamafile` or `Qwen3.5-4B-Q5_K_S.llamafile` for cleanup
- `Power`: use a separate speech tool, then `Qwen3.5-4B-Q5_K_S.llamafile` or `Apertus-8B-Instruct-2509.llamafile`
- `Advanced`: only consider `llava` variants if there is a specific multimodal need; otherwise keep speech recognition separate

### Why

- The `llava` models are multimodal and are the closest match when non-text input matters, but they are still not purpose-built speech recognition models.
- For a practical workflow, use a speech recognizer first, then use `Qwen3.5-4B-Q5_K_S.llamafile` or `Bonsai-4B.llamafile` for punctuation, cleanup, translation, or summarization.
- If sustainability and simplicity matter, avoid large multimodal models unless there is a clear need.
- For inexperienced users, audio transcription should be offered as a guided workflow, not as a raw model choice.

### Persona fit

- **Petra:** avoid this use case unless hidden behind a very simple workflow
- **Kai:** use a separate speech tool plus `Qwen3.5-4B-Q5_K_S.llamafile`
- **Daniel:** use a turnkey pipeline, not a raw model choice
- **Delia:** only viable if response is fast and the UX feels immediate

## Best model per persona

### Petra
1. `Bonsai-1.7B.llamafile`
2. `Bonsai-4B.llamafile`
3. `Qwen3.5-4B-Q5_K_S.llamafile`

**Reason:** Petra needs simplicity, small downloads, and a low-friction first success. In practice, she should mostly be guided to `Basic` or `Balanced` device recommendations.

### Kai
1. `Apertus-8B-Instruct-2509.llamafile`
2. `Qwen3.5-9B-Q5_K_S.llamafile`
3. `Qwen3.5-4B-Q5_K_S.llamafile`

**Reason:** Kai cares most about useful output and may accept a larger model when it clearly performs better, especially on `Power` or `Advanced` machines.

### Daniel
1. `Qwen3.5-4B-Q5_K_S.llamafile`
2. `Bonsai-4B.llamafile`
3. `Apertus-8B-Instruct-2509.llamafile`

**Reason:** Daniel wants dependable results with minimal setup pain. The best fit is usually the strongest model that still feels smooth on a `Balanced` machine.

### Delia
1. `Bonsai-1.7B.llamafile`
2. `Bonsai-4B.llamafile`
3. `Qwen3.5-4B-Q5_K_S.llamafile`

**Reason:** Delia is impatient, so fast startup and responsiveness matter more than maximum model quality. That makes `Basic` and `Balanced` recommendations especially important.

## Suggested defaults for the prototype

If this hackathon project needs a small set of recommended models, these are the best candidates:

- **Starter model for `Basic` devices:** `Bonsai-1.7B.llamafile`
- **Best default model for `Balanced` devices:** `Bonsai-4B.llamafile`
- **Best balanced upgrade for `Balanced` to `Power` devices:** `Qwen3.5-4B-Q5_K_S.llamafile`
- **Best quality-first upgrade for `Power` to `Advanced` devices:** `Apertus-8B-Instruct-2509.llamafile`

## Recommendation summary

For the goals in `design.md`, the most responsible path is not to promote the biggest model. Instead:

- determine the user’s machine tier first
- start `Basic` users on `Bonsai-1.7B.llamafile` or `Bonsai-4B.llamafile`
- recommend `Qwen3.5-4B-Q5_K_S.llamafile` as the best balance of quality and local usability for `Balanced` and `Power` devices
- offer `Apertus-8B-Instruct-2509.llamafile` as a higher-quality option for stronger machines
- treat audio transcription as a separate pipeline step rather than a core strength of these llamafiles
