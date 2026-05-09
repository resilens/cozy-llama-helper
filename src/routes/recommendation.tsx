import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { StepProgress } from "@/components/StepProgress";
import { MobileNotice } from "@/components/MobileBlock";
import { useAppState } from "@/lib/app-state";
import { resolveTier } from "@/lib/tiers";
import { recommend, type Scored } from "@/lib/recommender";
import { energyLevel, type ModelMeta } from "@/lib/models";

export const Route = createFileRoute("/recommendation")({
  head: () => ({
    meta: [
      { title: "Your model recommendation — LocalAI Match" },
      { name: "description", content: "A local AI model picked to fit your device, tasks and the planet." },
      { property: "og:title", content: "Your model recommendation — LocalAI Match" },
      { property: "og:description", content: "Your matched local AI model and two alternatives." },
    ],
  }),
  component: RecommendationPage,
});

function EnergyBadge({ m }: { m: ModelMeta }) {
  const lvl = energyLevel(m);
  const color = lvl === "Low" ? "bg-eco/15 text-eco" : lvl === "Medium" ? "bg-accent text-accent-foreground" : "bg-destructive/10 text-destructive";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>Energy: {lvl}</span>;
}

function ModelCard({ scored, kind, onPick }: { scored: Scored; kind: "primary" | "alt"; onPick: () => void }) {
  const m = scored.model;
  const [showWhy, setShowWhy] = useState(false);
  return (
    <div className={`rounded-2xl border bg-card p-5 ${kind === "primary" ? "border-primary shadow-sm" : "border-border"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {kind === "primary" && (
            <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              Best for your device
            </span>
          )}
          <h3 className="mt-2 text-lg font-semibold text-foreground">{m.friendlyName}</h3>
          <p className="text-xs text-muted-foreground">{m.filename}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">{m.sizeGB} GB</div>
          <div className="mt-1"><EnergyBadge m={m} /></div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{m.energyNote}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">License: {m.license}</span>
        <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">Sweet spot: {m.sweetSpot}</span>
        {m.multimodal && <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">Multimodal</span>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => setShowWhy((v) => !v)} className="text-sm font-medium text-primary hover:underline">
          {showWhy ? "Hide" : "Why this model?"}
        </button>
        <button
          onClick={onPick}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            kind === "primary"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-secondary"
          }`}
        >
          {kind === "primary" ? "Set this up →" : "Choose this"}
        </button>
      </div>
      {showWhy && (
        <div className="mt-4 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
          <ul className="space-y-1">
            <li>• Match for your tasks: {(scored.breakdown.fit * 100).toFixed(0)}%</li>
            <li>• Fit for your device tier: {(Math.max(0, scored.breakdown.tierFit) * 100).toFixed(0)}%</li>
            <li>• Sustainability bonus: {(scored.breakdown.sustainability * 100).toFixed(0)}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function RecommendationPage() {
  const navigate = useNavigate();
  const { state, update, hydrated } = useAppState();

  const tier = useMemo(() => (state.device ? resolveTier(state.device) : "Basic"), [state.device]);

  const result = useMemo(() => {
    if (!hydrated) return null;
    return recommend({
      useCaseIds: state.useCaseIds,
      freeText: state.freeText,
      priority: state.priority,
      tier,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, state.useCaseIds.join(","), state.freeText, state.priority, tier]);

  // Redirect if user navigated here without picking anything
  useEffect(() => {
    if (hydrated && state.useCaseIds.length === 0 && !state.freeText.trim()) {
      navigate({ to: "/use-case" });
    }
  }, [hydrated, state, navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <MobileNotice />
        <StepProgress current={3} />
        <main className="mx-auto max-w-4xl px-4 py-12 text-center text-muted-foreground">
          Calculating…
        </main>
      </div>
    );
  }

  const pick = (id: string) => {
    update({} as never); // touch to ensure hydration
    sessionStorage.setItem("lf-chosen-model", id);
    navigate({ to: "/setup" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <MobileNotice />
      <StepProgress current={3} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Your match</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Picked for your <strong>{tier}</strong> device, your selected tasks, and the smallest model that
          still does the job well.
        </p>

        {result.specialNotes.length > 0 && (
          <div className="mt-6 space-y-2">
            {result.specialNotes.map((n, i) => (
              <div key={i} className="rounded-xl border border-accent bg-accent/40 p-4 text-sm text-accent-foreground">
                <strong>Heads up:</strong> {n}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <ModelCard scored={result.primary} kind="primary" onPick={() => pick(result.primary.model.id)} />
        </div>

        {result.alternatives.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Alternatives</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {result.alternatives.map((a) => (
                <ModelCard key={a.model.id} scored={a} kind="alt" onPick={() => pick(a.model.id)} />
              ))}
            </div>
          </section>
        )}

        <details className="mt-10 rounded-2xl border border-border bg-card p-5">
          <summary className="cursor-pointer text-sm font-medium text-foreground">
            Why smaller is often enough
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">
            Bigger models aren't automatically better. Smaller models start faster, use less energy, and
            keep your data on your device. For everyday tasks like grammar, summarizing, or
            brainstorming, a 1–4 GB model is usually indistinguishable from a giant one — and far kinder
            to your battery and the planet.
          </p>
        </details>

        <div className="mt-10 flex items-center justify-between">
          <Link to="/device" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        </div>
      </main>
    </div>
  );
}
