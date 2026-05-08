import type { Tier } from "./models";

export interface DeviceSpecs {
  os: string;
  cores: number;
  ramGB: number;
  hasGPU: boolean;
  diskFreeGB: number;
}

export function resolveTier(s: DeviceSpecs): Tier {
  if (s.ramGB >= 32 && s.hasGPU) return "Advanced";
  if (s.ramGB >= 24 || (s.ramGB >= 16 && s.hasGPU)) return "Power";
  if (s.ramGB >= 12) return "Balanced";
  return "Basic";
}

export const TIER_RANK: Record<Tier, number> = { Basic: 1, Balanced: 2, Power: 3, Advanced: 4 };

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  Basic: "Older laptop or entry-level desktop. We'll keep things light and fast.",
  Balanced: "A typical recent laptop. Sweet spot for most everyday local AI.",
  Power: "Strong machine with plenty of RAM or a solid GPU. Higher-quality models work well.",
  Advanced: "High-end workstation. You can run almost anything — but smaller may still be smarter.",
};
