# Prompt for a Future Web App

Create a local-first web application in JavaScript for non-technical users to discover and choose suitable local LLMs based on their device capabilities and intended use case.

## Product Goal

Build a friendly, privacy-first AI model recommender that helps everyday users understand which local AI model they can run on their own device. The app should make local LLMs feel simple, useful, and responsible, with a focus on privacy, sustainability, accessibility, and ethical use.

## Target Personas

- Petra: non-technical, low interest in AI, needs simplicity
- Kai: outcome-driven, wants practical results fast
- Daniel: wants things to just work with minimal setup friction
- Delia: impatient, gamer, sensitive to speed and engagement

## Target Use Cases

- grammar help
- diagram generation
- audio transcription

## Important Product Guidance

- Audio transcription should be presented as a special case: explain that general LLMs are not ideal for speech-to-text and that transcription usually works best as a separate local pipeline step, followed by an LLM for cleanup or summarization.
- Do not overwhelm users with technical model names at first.
- Translate system capabilities into simple user-facing categories like `Basic`, `Balanced`, `Power`, and `Advanced`.
- Use plain language like “fastest on your laptop”, “best balance”, or “higher quality but heavier”.

## Technical Requirements

- Use JavaScript with Vite
- Build a clean frontend with modern component structure
- If styling becomes complex, use Tailwind CSS
- Do not build a backend unless absolutely necessary
- Keep the app frontend-first and runnable locally
- Use mock data for model metadata and device recommendations
- Structure the code cleanly so real system detection or local inference integration can be added later

## App Requirements

### 1. Landing Page
- Explain the value of local AI in simple language
- Highlight privacy, sustainability, offline usage, and control
- Include a prominent `Check my device` CTA

### 2. Device Capability Flow
- Simulate or detect:
  - OS
  - RAM
  - CPU class
  - GPU availability
  - available disk space
- If browser-based hardware detection is limited, clearly separate:
  - what can be detected automatically
  - what the user may need to confirm manually
- Convert technical specs into simple tiers:
  - `Basic`
  - `Balanced`
  - `Power`
  - `Advanced`
- Show a short explanation for the assigned tier

### 3. User Preference Flow
- Ask the user:
  - What do you want to do?
    - grammar help
    - diagram generation
    - audio transcription
  - What matters most?
    - fastest responses
    - balanced quality and speed
    - best quality
    - lowest energy use
    - strongest privacy
- Use these answers with the device tier to recommend models

### 4. Model Recommendation UI
- Present 1 primary recommendation and 2 alternatives
- Each recommendation should include:
  - friendly name
  - original model filename
  - best use case
  - expected speed
  - expected quality
  - resource level
  - privacy note
  - sustainability note
- Use badges like:
  - `Best for your device`
  - `Fastest`
  - `Best quality`
  - `Energy-saving`
- Add a short `Why this model?` explanation in plain language

### 5. Models to Include in the Mock Dataset
Use these example models and treat them as local llamafile options:
- `Bonsai-1.7B.llamafile`
- `Bonsai-4B.llamafile`
- `Qwen3.5-4B-Q5_K_S.llamafile`
- `Apertus-8B-Instruct-2509.llamafile`
- `Qwen3.5-9B-Q5_K_S.llamafile`
- `llava-v1.6-mistral-7b-Q4_K_M.llamafile`
- `llava-v1.6-mistral-7b-Q8_0.llamafile`

Use this recommendation logic:
- Prefer smaller models for accessibility and sustainability
- Recommend `Bonsai-1.7B.llamafile` for very low-spec or speed-first devices
- Recommend `Bonsai-4B.llamafile` as a strong default for mainstream users
- Recommend `Qwen3.5-4B-Q5_K_S.llamafile` as the best balanced upgrade
- Recommend `Apertus-8B-Instruct-2509.llamafile` for quality-first users with stronger machines
- Recommend `Qwen3.5-9B-Q5_K_S.llamafile` only for stronger devices
- Treat `llava` models as special multimodal options, not default recommendations
- For audio transcription, explain that these are not ideal standalone speech-to-text models

### 6. Responsible AI Education
- Add a section that explains:
  - why smaller local models can be enough for many tasks
  - why local-first AI improves privacy
  - why model size affects energy use and responsiveness
- Make this educational content short, visual, and friendly

### 7. UX Requirements
- Keep the interface friendly for non-technical users
- Avoid jargon on first view
- Hide advanced technical details behind expandable panels
- Use a lightweight, welcoming design
- Make the experience feel fast and interactive
- Include small helper texts and tooltips

### 8. Output Screens
Include:
- onboarding / landing page
- device check flow
- use-case selection screen
- recommendation results screen
- compare models screen
- why this recommendation explanation panel

### 9. Code Quality Requirements
- Use modular components
- Keep recommendation logic separate from UI
- Put model metadata in a dedicated JS file
- Put tiering logic in a separate utility
- Use clean naming and readable code
- Add comments only where they clarify non-obvious logic
- Make the project easy to extend

### 10. Deliverables
Generate:
- project structure
- Vite-based app code
- sample model metadata
- recommendation logic
- responsive UI
- brief README with how to run locally

## Tone

The tone of the application should be:
- friendly
- clear
- trustworthy
- non-technical
- privacy-first
- sustainability-aware

## Design Inspiration

Think of a hybrid between a device compatibility checker, a model recommender, and a responsible AI onboarding experience.
