import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { StepProgress } from "@/components/StepProgress";
import { useAppState } from "@/lib/app-state";
import { detectDevice } from "@/lib/device";
import { resolveTier, TIER_DESCRIPTIONS, type DeviceSpecs } from "@/lib/tiers";

export const Route = createFileRoute("/device")({
  head: () => ({
    meta: [
      { title: "Check your device — LocalAI Match" },
      { name: "description", content: "We'll auto-detect what we can and let you confirm the rest." },
      { property: "og:title", content: "Check your device — LocalAI Match" },
      { property: "og:description", content: "Confirm your device to get a fitting local AI model." },
    ],
  }),
  component: DevicePage,
});

function DevicePage() {
  const navigate = useNavigate();
  const { state, update, hydrated } = useAppState();
  const [detected, setDetected] = useState<ReturnType<typeof detectDevice> | null>(null);
  const [specs, setSpecs] = useState<DeviceSpecs>({
    os: "Unknown",
    cores: 4,
    ramGB: 8,
    hasGPU: false,
    diskFreeGB: 50,
  });

  useEffect(() => {
    const d = detectDevice();
    setDetected(d);
    setSpecs((prev) => ({
      ...prev,
      os: d.os ?? prev.os,
      cores: d.cores ?? prev.cores,
      ramGB: state.device?.ramGB ?? d.ramGB ?? prev.ramGB,
      hasGPU: state.device?.hasGPU ?? d.hasGPU ?? prev.hasGPU,
      diskFreeGB: state.device?.diskFreeGB ?? prev.diskFreeGB,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const tier = resolveTier(specs);

  const onContinue = () => {
    update({ device: { ...specs, gpuRenderer: detected?.gpuRenderer } });
    navigate({ to: "/recommendation" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={2} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Let's check your device</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browsers only share rough info. We've made our best guesses — please confirm or adjust.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Auto-detected</div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Operating system</dt><dd className="font-medium">{specs.os}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">CPU cores</dt><dd className="font-medium">{specs.cores}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Detected GPU</dt><dd className="font-medium truncate max-w-[200px]" title={detected?.gpuRenderer}>{detected?.gpuRenderer ?? "Unknown"}</dd></div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Please confirm</div>
            <div className="mt-3 space-y-4 text-sm">
              <label className="block">
                <span className="text-muted-foreground">RAM (GB)</span>
                <input
                  type="number"
                  min={2}
                  max={256}
                  value={specs.ramGB}
                  onChange={(e) => setSpecs({ ...specs, ramGB: Number(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="mt-1 block text-xs text-muted-foreground">Most laptops have 8 or 16 GB. Check your system info if unsure.</span>
              </label>
              <label className="block">
                <span className="text-muted-foreground">Free disk space (GB)</span>
                <input
                  type="number"
                  min={1}
                  max={4000}
                  value={specs.diskFreeGB}
                  onChange={(e) => setSpecs({ ...specs, diskFreeGB: Number(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={specs.hasGPU}
                  onChange={(e) => setSpecs({ ...specs, hasGPU: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>I have a dedicated GPU (or Apple Silicon).</span>
              </label>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Your tier
            </span>
            <span className="text-2xl font-semibold text-foreground">{tier}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{TIER_DESCRIPTIONS[tier]}</p>
        </section>

        <div className="mt-10 flex items-center justify-between">
          <Link to="/use-case" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            See my recommendation →
          </button>
        </div>
      </main>
    </div>
  );
}
