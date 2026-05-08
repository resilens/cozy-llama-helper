import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { StepProgress } from "@/components/StepProgress";
import { USE_CASES, USE_CASE_GROUPS, PRIORITIES } from "@/lib/use-cases";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/use-case")({
  head: () => ({
    meta: [
      { title: "What do you want to do? — LocalAI Match" },
      { name: "description", content: "Pick the tasks you'd like a local AI to help with." },
      { property: "og:title", content: "Pick your tasks — LocalAI Match" },
      { property: "og:description", content: "Tell us what you want to do, and we'll match a model." },
    ],
  }),
  component: UseCasePage,
});

function UseCasePage() {
  const navigate = useNavigate();
  const { state, update, hydrated } = useAppState();

  const toggle = (id: string) => {
    const set = new Set(state.useCaseIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ useCaseIds: [...set] });
  };

  const canContinue = hydrated && (state.useCaseIds.length > 0 || state.freeText.trim().length > 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={1} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">What would you like help with?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick anything that sounds useful. You can choose more than one.
        </p>

        <div className="mt-8 space-y-8">
          {USE_CASE_GROUPS.map((group) => (
            <section key={group}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {USE_CASES.filter((u) => u.group === group).map((u) => {
                  const selected = state.useCaseIds.includes(u.id);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => toggle(u.id)}
                      aria-pressed={selected}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="text-xl">{u.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{u.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Something else?</h2>
            <textarea
              value={state.freeText}
              onChange={(e) => update({ freeText: e.target.value })}
              placeholder="Describe in your own words what you'd like to do…"
              rows={3}
              className="mt-3 w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              What matters most to you?
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {PRIORITIES.map((p) => {
                const active = state.priority === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update({ priority: p.id })}
                    aria-pressed={active}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{p.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </Link>
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => navigate({ to: "/device" })}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check my device →
          </button>
        </div>
      </main>
    </div>
  );
}
