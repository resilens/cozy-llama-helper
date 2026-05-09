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

// Friendly capability labels for surfaces that show capabilities to users.
export const CAPABILITY_LABELS: Record<Capability, string> = {
  writing: "Writing",
  structured: "Structured output",
  code: "Code",
  multimodal: "Image understanding",
  reasoning: "Reasoning",
  creative: "Creative",
};

// Keyword sets per capability. Matched as whole words (\b…\b).
const KEYWORDS: { capability: Capability; weight: number; terms: string[] }[] = [
  {
    capability: "writing",
    weight: 3,
    terms: [
      "write", "writing", "rewrite", "edit", "editing", "proofread", "grammar",
      "spelling", "spell", "tone", "email", "emails", "message", "messages",
      "letter", "reply", "replies", "draft", "drafting", "translate", "translation",
      "summarize", "summarise", "summary", "summaries", "paraphrase",
      "blog", "post", "caption",
    ],
  },
  {
    capability: "code",
    weight: 3,
    terms: [
      "code", "coding", "program", "programming", "script", "scripts", "scripting",
      "bug", "bugs", "debug", "debugging", "refactor", "regex", "sql", "query",
      "queries", "terminal", "shell", "bash", "function", "functions", "api",
      "html", "css", "javascript", "typescript", "python", "rust", "java", "go",
    ],
  },
  {
    capability: "structured",
    weight: 3,
    terms: [
      "diagram", "mermaid", "chart", "charts", "table", "tables", "json", "yaml",
      "csv", "xml", "schema", "structure", "structured", "outline", "format",
      "list", "lists", "bullet", "bullets", "organize", "organise", "categorize",
      "categorise", "classify", "extract", "parse",
    ],
  },
  {
    capability: "multimodal",
    weight: 4,
    terms: [
      "image", "images", "photo", "photos", "picture", "pictures", "visual",
      "visuals", "screenshot", "screenshots", "drawing", "sketch", "ocr",
      "alt-text", "alt",
    ],
  },
  {
    capability: "creative",
    weight: 3,
    terms: [
      "story", "stories", "novel", "fiction", "poem", "poetry", "lyrics", "song",
      "songs", "roleplay", "character", "characters", "brainstorm", "idea",
      "ideas", "creative", "fun", "joke", "jokes", "recipe", "recipes",
      "cooking", "travel", "itinerary", "gift", "gifts", "name", "names",
      "slogan", "headline",
    ],
  },
  {
    capability: "reasoning",
    weight: 3,
    terms: [
      "explain", "why", "how", "reason", "reasoning", "analyze", "analyse",
      "analysis", "compare", "evaluate", "decide", "study", "learn", "teach",
      "tutor", "eli5", "math", "logic", "puzzle", "plan", "strategy", "research",
      "understand",
    ],
  },
];

export interface FreeTextMatch {
  weights: Partial<Record<Capability, number>>;
  matched: { capability: Capability; terms: string[] }[];
  fallback: boolean;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Map free-text "something else" to capability weights via whole-word keyword matching.
export function freeTextWeights(text: string): FreeTextMatch {
  const weights: Partial<Record<Capability, number>> = {};
  const matched: { capability: Capability; terms: string[] }[] = [];
  const lower = text.toLowerCase();

  for (const group of KEYWORDS) {
    const hits: string[] = [];
    for (const term of group.terms) {
      const re = new RegExp(`\\b${escapeRegex(term)}\\b`, "i");
      if (re.test(lower)) hits.push(term);
    }
    if (hits.length > 0) {
      weights[group.capability] = (weights[group.capability] ?? 0) + group.weight;
      matched.push({ capability: group.capability, terms: hits });
    }
  }

  if (matched.length === 0 && text.trim().length > 0) {
    weights.writing = 2;
    weights.reasoning = 2;
    return { weights, matched: [], fallback: true };
  }

  return { weights, matched, fallback: false };
}

export const PRIORITIES: { id: Priority; label: string; description: string; emoji: string }[] = [
  { id: "fastest", label: "Fastest responses", description: "Snappy replies, even on older laptops.", emoji: "⚡" },
  { id: "balanced", label: "Balanced", description: "A good mix of speed and quality.", emoji: "⚖️" },
  { id: "quality", label: "Best quality", description: "Best answers, even if slower.", emoji: "🏆" },
  { id: "energy", label: "Lowest energy use", description: "Smallest footprint on your device.", emoji: "🌱" },
  { id: "privacy", label: "Strongest privacy", description: "Smallest model that still works well — easy to keep fully offline.", emoji: "🔒" },
];
