import type { Capability } from "./models";

export type Priority = "fastest" | "balanced" | "quality" | "energy" | "privacy";

export interface UseCase {
  id: string;
  label: string;
  emoji: string;
  group: string;
  weights: Partial<Record<Capability, number>>;
  needsMultimodal?: boolean;
  specialNote?: string;
}

export const USE_CASES: UseCase[] = [
  // Writing & language
  { id: "grammar", label: "Grammar & spell-check", emoji: "✍️", group: "Writing & language", weights: { writing: 3, structured: 1 } },
  { id: "rewrite", label: "Rewriting / tone change", emoji: "🔁", group: "Writing & language", weights: { writing: 3, creative: 2 } },
  { id: "summarize", label: "Summarize long text", emoji: "📄", group: "Writing & language", weights: { writing: 2, reasoning: 3 } },
  { id: "translate", label: "Translate languages", emoji: "🌍", group: "Writing & language", weights: { writing: 3 } },
  { id: "email", label: "Draft emails & messages", emoji: "✉️", group: "Writing & language", weights: { writing: 3, creative: 1 } },

  // Thinking & learning
  { id: "brainstorm", label: "Brainstorm ideas", emoji: "💡", group: "Thinking & learning", weights: { creative: 3, reasoning: 2 } },
  { id: "eli5", label: 'Explain simply ("ELI5")', emoji: "🧒", group: "Thinking & learning", weights: { reasoning: 3, writing: 2 } },
  { id: "study", label: "Study & flashcards", emoji: "📚", group: "Thinking & learning", weights: { reasoning: 3, structured: 2 } },
  { id: "reading", label: "Reading-comprehension helper", emoji: "📖", group: "Thinking & learning", weights: { reasoning: 2, writing: 2 } },

  // Structured output
  { id: "diagram", label: "Diagram generation (Mermaid)", emoji: "📊", group: "Structured output", weights: { structured: 4, reasoning: 2 } },
  { id: "outline", label: "Outline docs or slides", emoji: "🗂️", group: "Structured output", weights: { structured: 3, writing: 2 } },
  { id: "extract", label: "Extract structured data", emoji: "🧾", group: "Structured output", weights: { structured: 4, reasoning: 2 } },
  { id: "format", label: "Format / clean notes", emoji: "🧹", group: "Structured output", weights: { structured: 3, writing: 1 } },

  // Code & tech
  { id: "code-explain", label: "Explain code", emoji: "🔍", group: "Code & tech", weights: { code: 3, reasoning: 2 } },
  { id: "code-snippet", label: "Small code snippets & shell", emoji: "💻", group: "Code & tech", weights: { code: 4 } },
  { id: "regex", label: "Regex helper", emoji: "🔣", group: "Code & tech", weights: { code: 3, structured: 2 } },

  // Audio & multimodal
  {
    id: "transcript-cleanup",
    label: "Clean up audio transcripts",
    emoji: "🎙️",
    group: "Audio & multimodal",
    weights: { writing: 2, structured: 2 },
    specialNote:
      "These LLMs aren't speech-to-text. Use a separate local tool (e.g. whisper.cpp) to transcribe, then this model cleans up punctuation and summarizes.",
  },
  {
    id: "image-describe",
    label: "Describe an image",
    emoji: "🖼️",
    group: "Audio & multimodal",
    weights: { multimodal: 4 },
    needsMultimodal: true,
  },

  // Daily life & fun
  { id: "recipes", label: "Recipe ideas from ingredients", emoji: "🥗", group: "Daily life & fun", weights: { creative: 3, writing: 1 } },
  { id: "travel", label: "Travel & itinerary ideas", emoji: "🗺️", group: "Daily life & fun", weights: { creative: 3, writing: 2 } },
  { id: "story", label: "Roleplay / story writing", emoji: "📝", group: "Daily life & fun", weights: { creative: 4, writing: 3 } },
  { id: "gaming", label: "Gaming companion", emoji: "🎮", group: "Daily life & fun", weights: { creative: 2, reasoning: 2 } },
  { id: "journal", label: "Journaling prompts", emoji: "📔", group: "Daily life & fun", weights: { creative: 2, writing: 2 } },
];

export const USE_CASE_GROUPS = Array.from(new Set(USE_CASES.map((u) => u.group)));

export function useCaseById(id: string) {
  return USE_CASES.find((u) => u.id === id);
}

// Map a free-text "something else" to capability weights via simple keyword heuristics.
export function freeTextWeights(text: string): Partial<Record<Capability, number>> {
  const t = text.toLowerCase();
  const w: Partial<Record<Capability, number>> = {};
  const add = (c: Capability, n: number) => (w[c] = (w[c] ?? 0) + n);
  if (/code|program|script|bug|regex|sql/.test(t)) add("code", 3);
  if (/image|photo|picture|visual/.test(t)) add("multimodal", 4);
  if (/diagram|chart|table|json|structur|outline|format/.test(t)) add("structured", 3);
  if (/write|rewrite|email|grammar|translat|summar/.test(t)) add("writing", 3);
  if (/story|creative|roleplay|brainstorm|idea|poem|fun/.test(t)) add("creative", 3);
  if (/explain|reason|analy|study|learn|why|how/.test(t)) add("reasoning", 3);
  if (Object.keys(w).length === 0) {
    add("writing", 2);
    add("reasoning", 2);
  }
  return w;
}

export const PRIORITIES: { id: Priority; label: string; description: string; emoji: string }[] = [
  { id: "fastest", label: "Fastest responses", description: "Snappy replies, even on older laptops.", emoji: "⚡" },
  { id: "balanced", label: "Balanced", description: "A good mix of speed and quality.", emoji: "⚖️" },
  { id: "quality", label: "Best quality", description: "Best answers, even if slower.", emoji: "🏆" },
  { id: "energy", label: "Lowest energy use", description: "Smallest footprint on your device.", emoji: "🌱" },
  { id: "privacy", label: "Strongest privacy", description: "Smallest model that still works well — easy to keep fully offline.", emoji: "🔒" },
];
