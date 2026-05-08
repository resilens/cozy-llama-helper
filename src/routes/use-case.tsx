import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { StepProgress } from "@/components/StepProgress";
import { USE_CASES, USE_CASE_GROUPS, PRIORITIES } from "@/lib/use-cases";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/use-case")({
  head: () => ({
    meta: [
      { title: "What for? — Simplon Off" },
      { name: "description", content: "Pick what you'd like a local AI to help with." },
      { property: "og:title", content: "What for? — Simplon Off" },
      { property: "og:description", content: "Tell us what you want to do, and we'll match a model." },
    ],
  }),
  component: UseCasePage,
});

// Friendly bundles — each maps to a handful of underlying use cases so the
// user doesn't have to scan a long checklist on first contact.
const BUNDLES: { id: string; label: string; description: string; emoji: string; ids: string[] }[] = [
  {
    id: "writing",
    label: "Writing help",
    emoji: "✍️",
    description: "Emails, grammar, rewrites, translations, summaries.",
    ids: ["grammar", "rewrite", "summarize", "translate", "email"],
  },
  {
    id: "thinking",
    label: "Learning & thinking",
    emoji: "💡",
    description: "Explain things simply, brainstorm, study, take notes.",
    ids: ["brainstorm", "eli5", "study", "reading"],
  },
  {
    id: "code",
    label: "Coding helper",
    emoji: "💻",
    description: "Explain code, write small snippets, regex, shell.",
    ids: ["code-explain", "code-snippet", "regex"],
  },
  {
    id: "creative",
    label: "Creative & fun",
    emoji: "🎨",
    description: "Stories, recipes, travel ideas, journaling, gaming.",
    ids: ["story", "recipes", "travel", "journal", "gaming"],
  },
];

function UseCasePage() {
  const navigate = useNavigate();
  const { state, update, hydrated } = useAppState();
  const [showAll, setShowAll] = useState(false);

  const ids = new Set(state.useCaseIds);

  const toggle = (id: string) => {
    const set = new Set(state.useCaseIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ useCaseIds: [...set] });
  };

  const toggleBundle = (bundleIds: string[]) => {
    const set = new Set(state.useCaseIds);
    const allOn = bundleIds.every((i) => set.has(i));
    if (allOn) bundleIds.forEach((i) => set.delete(i));
    else bundleIds.forEach((i) => set.add(i));
    update({ useCaseIds: [...set] });
  };

  const canContinue = hydrated && (state.useCaseIds.length > 0 || state.freeText.trim().length > 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={1} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="font-mono text-xs tracking-wide text-primary">Step 01 — What for?</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          What would you like help with?
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Pick one or two that sound useful. Don't overthink it — you can change your mind later.
        </p>

        {/* Friendly bundles */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {BUNDLES.map((b) => {
            const active = b.ids.every((i) => ids.has(i));
            const partial = !active && b.ids.some((i) => ids.has(i));
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => toggleBundle(b.ids)}
                aria-pressed={active}
                className={`flex items-start gap-3 border p-4 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : partial
                      ? "border-primary/50 bg-primary/[0.02]"
                      : "border-foreground/20 bg-card hover:border-foreground/50"
                }`}
              >
                <span className="text-2xl" aria-hidden>{b.emoji}</span>
                <span className="min-w-0">
                  <span className="block text-base font-semibold text-foreground">{b.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{b.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Free text — primary input, not buried */}
        <div className="mt-8">
          <label htmlFor="freetext" className="text-sm font-medium text-foreground">
            Or tell us in your own words
          </label>
          <textarea
            id="freetext"
            value={state.freeText}
            onChange={(e) => update({ freeText: e.target.value })}
            placeholder="e.g. help me write nicer emails to my landlord…"
            rows={2}
            className="mt-2 w-full border border-foreground/20 bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Browse-all disclosure — hidden by default */}
        <details
          className="mt-6 border-t border-foreground/15 pt-4"
          open={showAll}
          onToggle={(e) => setShowAll((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer list-none text-sm text-muted-foreground hover:text-foreground">
            <span className="underline underline-offset-4">Browse the full list</span>
            <span className="ml-2 font-mono text-xs">({USE_CASES.length} tasks)</span>
          </summary>
          <div className="mt-5 space-y-6">
            {USE_CASE_GROUPS.map((group) => (
              <section key={group}>
                <h2 className="font-mono text-xs tracking-wide text-muted-foreground">
                  {group}
                </h2>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {USE_CASES.filter((u) => u.group === group).map((u) => {
                    const selected = ids.has(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => toggle(u.id)}
                        aria-pressed={selected}
                        className={`flex items-center gap-2 border p-2.5 text-left text-sm transition-colors ${
                          selected
                            ? "border-primary bg-primary/5"
                            : "border-foreground/15 bg-card hover:border-foreground/40"
                        }`}
                      >
                        <span aria-hidden>{u.emoji}</span>
                        <span className="text-foreground">{u.label}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </details>

        {/* Priority — collapsed into a simple pill row, balanced as default */}
        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground">
            What matters most?
            <span className="ml-2 font-normal text-muted-foreground">(optional)</span>
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRIORITIES.map((p) => {
              const active = state.priority === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update({ priority: p.id })}
                  aria-pressed={active}
                  title={p.description}
                  className={`inline-flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-foreground/20 bg-card text-muted-foreground hover:text-foreground hover:border-foreground/50"
                  }`}
                >
                  <span aria-hidden>{p.emoji}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-12 flex items-center justify-between border-t border-foreground/15 pt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </Link>
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => navigate({ to: "/device" })}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check my device <span aria-hidden>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
