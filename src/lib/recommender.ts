import { MODELS, type ModelMeta, type Capability, type Tier } from "./models";
import { TIER_RANK } from "./tiers";
import { USE_CASES, freeTextWeights, type Priority } from "./use-cases";

export interface RecommendInput {
  useCaseIds: string[];
  freeText?: string;
  priority: Priority;
  tier: Tier;
}

export interface Scored {
  model: ModelMeta;
  score: number;
  breakdown: { fit: number; tierFit: number; sustainability: number; priority: number };
}

export interface Recommendation {
  primary: Scored;
  alternatives: Scored[];
  needsMultimodal: boolean;
  specialNotes: string[];
}

function aggregateWeights(input: RecommendInput): Partial<Record<Capability, number>> {
  const totals: Partial<Record<Capability, number>> = {};
  const add = (c: Capability, n: number) => (totals[c] = (totals[c] ?? 0) + n);
  for (const id of input.useCaseIds) {
    const u = USE_CASES.find((x) => x.id === id);
    if (!u) continue;
    for (const [cap, w] of Object.entries(u.weights)) {
      add(cap as Capability, w as number);
    }
  }
  if (input.freeText && input.freeText.trim()) {
    for (const [cap, w] of Object.entries(freeTextWeights(input.freeText))) {
      add(cap as Capability, w as number);
    }
  }
  // Normalize so total = 1
  const sum = Object.values(totals).reduce((a, b) => a + (b ?? 0), 0) || 1;
  const out: Partial<Record<Capability, number>> = {};
  for (const [k, v] of Object.entries(totals)) out[k as Capability] = (v ?? 0) / sum;
  return out;
}

function tierFit(model: ModelMeta, tier: Tier): number {
  const min = TIER_RANK[model.minTier];
  const sweet = TIER_RANK[model.sweetSpot];
  const have = TIER_RANK[tier];
  if (have < min) return -1; // can't run comfortably
  // closer to sweet spot = better; equal = 1, ±1 = 0.7
  const diff = Math.abs(have - sweet);
  return [1, 0.8, 0.5, 0.3][diff] ?? 0.2;
}

// Sustainability: smaller is better. 0..1 scale, ~1 for tiny models.
function sustainabilityScore(m: ModelMeta): number {
  return Math.max(0, 1 - Math.log2(m.sizeGB + 1) / 4);
}

function priorityAdjustment(m: ModelMeta, p: Priority): number {
  switch (p) {
    case "fastest":
      return sustainabilityScore(m) * 0.6;
    case "energy":
      return sustainabilityScore(m) * 0.9;
    case "privacy":
      return sustainabilityScore(m) * 0.4; // smaller = easier to keep offline
    case "quality":
      return -sustainabilityScore(m) * 0.4 + (m.sizeGB > 4 ? 0.3 : 0);
    case "balanced":
    default:
      return 0;
  }
}

export function recommend(input: RecommendInput): Recommendation {
  const weights = aggregateWeights(input);
  const needsMultimodal = input.useCaseIds.some((id) => {
    const u = USE_CASES.find((x) => x.id === id);
    return !!u?.needsMultimodal;
  });
  const specialNotes: string[] = [];
  for (const id of input.useCaseIds) {
    const u = USE_CASES.find((x) => x.id === id);
    if (u?.specialNote) specialNotes.push(u.specialNote);
  }

  const candidates = MODELS.filter((m) => (needsMultimodal ? m.multimodal : !m.multimodal));
  // If user picked nothing implying multimodal but multimodal sneaks in, still allow non-multimodal in alternatives.
  const pool = candidates.length ? candidates : MODELS;

  const scored: Scored[] = pool.map((m) => {
    const fit =
      Object.entries(weights).reduce(
        (acc, [cap, w]) => acc + (m.capabilities[cap as Capability] / 5) * (w as number),
        0,
      ) || 0.5;
    const tf = tierFit(m, input.tier);
    const sus = sustainabilityScore(m);
    const prio = priorityAdjustment(m, input.priority);
    const score =
      fit * 1.0 +
      Math.max(tf, 0) * 0.8 +
      sus * 0.6 +
      prio +
      (tf < 0 ? -2 : 0); // heavy penalty if device can't run it
    return { model: m, score, breakdown: { fit, tierFit: tf, sustainability: sus, priority: prio } };
  });

  scored.sort((a, b) => b.score - a.score);
  const [primary, ...rest] = scored;
  return {
    primary,
    alternatives: rest.slice(0, 2),
    needsMultimodal,
    specialNotes,
  };
}
