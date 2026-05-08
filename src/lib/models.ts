// Llamafile model metadata. All capability scores are 1-5 (5 = best).
// Energy score: lower = more sustainable.
export type Capability =
  | "writing"
  | "structured"
  | "code"
  | "multimodal"
  | "reasoning"
  | "creative";

export type Tier = "Basic" | "Balanced" | "Power" | "Advanced";

export interface ModelMeta {
  id: string;
  filename: string;
  friendlyName: string;
  sizeGB: number;
  url: string;
  license: string;
  multimodal?: boolean;
  capabilities: Record<Capability, number>;
  // Lowest tier this model runs comfortably on.
  minTier: Tier;
  // Tier where this model shines.
  sweetSpot: Tier;
  energyNote: string;
}

export const MODELS: ModelMeta[] = [
  {
    id: "bonsai-1.7b",
    filename: "Bonsai-1.7B.llamafile",
    friendlyName: "Bonsai Mini",
    sizeGB: 0.29,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Bonsai-1.7B.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 2, structured: 2, code: 1, multimodal: 1, reasoning: 2, creative: 2 },
    minTier: "Basic",
    sweetSpot: "Basic",
    energyNote: "≈ a few minutes of HD video per long chat",
  },
  {
    id: "bonsai-4b",
    filename: "Bonsai-4B.llamafile",
    friendlyName: "Bonsai Everyday",
    sizeGB: 0.62,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Bonsai-4B.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 3, structured: 3, code: 2, multimodal: 1, reasoning: 3, creative: 3 },
    minTier: "Basic",
    sweetSpot: "Balanced",
    energyNote: "≈ ~10 min of HD video per long chat",
  },
  {
    id: "qwen35-4b",
    filename: "Qwen3.5-4B-Q5_K_S.llamafile",
    friendlyName: "Qwen Balanced",
    sizeGB: 4.1,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Qwen3.5-4B-Q5_K_S.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 4, structured: 5, code: 4, multimodal: 1, reasoning: 4, creative: 4 },
    minTier: "Balanced",
    sweetSpot: "Power",
    energyNote: "≈ ~25 min of HD video per long chat",
  },
  {
    id: "ministral-3b",
    filename: "Ministral-3-3B-Instruct-2512-Q4_K_M.llamafile",
    friendlyName: "Ministral Compact",
    sizeGB: 3.4,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Ministral-3-3B-Instruct-2512-Q4_K_M.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 3, structured: 3, code: 3, multimodal: 1, reasoning: 3, creative: 3 },
    minTier: "Balanced",
    sweetSpot: "Balanced",
    energyNote: "≈ ~20 min of HD video per long chat",
  },
  {
    id: "apertus-8b",
    filename: "Apertus-8B-Instruct-2509.llamafile",
    friendlyName: "Apertus Pro",
    sizeGB: 5.9,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Apertus-8B-Instruct-2509.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 5, structured: 4, code: 4, multimodal: 1, reasoning: 5, creative: 5 },
    minTier: "Power",
    sweetSpot: "Power",
    energyNote: "≈ ~45 min of HD video per long chat",
  },
  {
    id: "qwen35-9b",
    filename: "Qwen3.5-9B-Q5_K_S.llamafile",
    friendlyName: "Qwen Pro",
    sizeGB: 7.4,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/Qwen3.5-9B-Q5_K_S.llamafile",
    license: "Apache 2.0",
    capabilities: { writing: 5, structured: 5, code: 5, multimodal: 1, reasoning: 5, creative: 5 },
    minTier: "Power",
    sweetSpot: "Advanced",
    energyNote: "≈ an hour of HD video per long chat",
  },
  {
    id: "llava-7b-q4",
    filename: "llava-v1.6-mistral-7b-Q4_K_M.llamafile",
    friendlyName: "LLaVA Vision",
    sizeGB: 5.3,
    url: "https://huggingface.co/mozilla-ai/llamafile_0.10/resolve/main/llava-v1.6-mistral-7b-Q4_K_M.llamafile",
    license: "Apache 2.0",
    multimodal: true,
    capabilities: { writing: 3, structured: 3, code: 2, multimodal: 5, reasoning: 3, creative: 3 },
    minTier: "Balanced",
    sweetSpot: "Power",
    energyNote: "≈ ~35 min of HD video per long chat",
  },
];

export function modelById(id: string) {
  return MODELS.find((m) => m.id === id);
}

export function energyLevel(m: ModelMeta): "Low" | "Medium" | "High" {
  if (m.sizeGB < 1.5) return "Low";
  if (m.sizeGB < 5) return "Medium";
  return "High";
}
