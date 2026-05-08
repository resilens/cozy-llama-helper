import { Link } from "@tanstack/react-router";

const STEPS = [
  { path: "/", label: "Start" },
  { path: "/use-case", label: "What for?" },
  { path: "/device", label: "Your device" },
  { path: "/recommendation", label: "Pick a model" },
  { path: "/setup", label: "Set up" },
] as const;

export function StepProgress({ current }: { current: number }) {
  return (
    <nav aria-label="Progress" className="mx-auto w-full max-w-4xl px-4 pt-6">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s.path} className="flex flex-1 items-center gap-2">
              <Link
                to={s.path}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {i + 1}
              </Link>
              <span
                className={`hidden text-sm md:inline ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
