// Lightweight client-only state shared across steps. Persisted in sessionStorage
// so a refresh during the flow doesn't lose progress.
import { useEffect, useState } from "react";
import type { Priority } from "./use-cases";
import type { DeviceSpecs } from "./tiers";

export interface AppState {
  useCaseIds: string[];
  freeText: string;
  priority: Priority;
  device?: DeviceSpecs & { gpuRenderer?: string };
}

const KEY = "lf-app-state-v1";

const defaultState: AppState = {
  useCaseIds: [],
  freeText: "",
  priority: "balanced",
};

function read(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  const update = (patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        sessionStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return { state, update, hydrated };
}
