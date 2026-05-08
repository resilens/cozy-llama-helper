import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocalAI Match — Find a private, local AI model for your device" },
      {
        name: "description",
        content:
          "A friendly guide to picking a local llamafile that fits your device and tasks. Private, offline, sustainable.",
      },
      { property: "og:title", content: "LocalAI Match" },
      {
        property: "og:description",
        content: "Find a private, local AI model that fits your device and your tasks.",
      },
    ],
  }),
  component: Landing,
});

function Pillar({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <section className="text-center">
          <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            No accounts. No cloud. No tracking.
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            An AI you can <span className="text-primary">put in the trash</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            No subscription. No data center burning megawatts on your behalf. Just a single file on your
            laptop — drag it to the bin the day you're done. We'll help you pick the smallest model that
            still nails your tasks.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/use-case"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Get started →
            </Link>
            <span className="text-xs text-muted-foreground">Takes about 2 minutes.</span>
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Pillar emoji="🔒" title="Private by design" body="Your conversations never leave your computer." />
          <Pillar emoji="🌱" title="Sustainable" body="Smaller models use less energy. We help you pick one that's just right." />
          <Pillar emoji="✈️" title="Works offline" body="Once installed, it runs on a plane, on the train, anywhere." />
          <Pillar emoji="🧰" title="Yours to control" body="Open-source models you own, no monthly fees." />
        </section>

        <section className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground">Why smaller is often enough</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The biggest cloud AI models use a huge amount of energy and need to send your data to a
            company's servers. For most everyday tasks — writing emails, summarizing text, brainstorming —
            a small model running on your laptop is fast, private, and uses a fraction of the resources.
            We default to the smallest model that still does your job well.
          </p>
        </section>
      </main>
    </div>
  );
}
