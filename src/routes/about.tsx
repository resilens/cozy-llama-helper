import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Simplon Off" },
      {
        name: "description",
        content: "A small project about small AI, made at a GreenTech Hackathon.",
      },
      { property: "og:title", content: "About — Simplon Off" },
      {
        property: "og:description",
        content: "A small project about small AI, made at a GreenTech Hackathon.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 00</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">About</h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Hello — a quick note.</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Made at a <span className="text-primary">Climate Action Hackathon.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                <b>Simplon Off</b> was built in a day during a{" "}
                <a
                  href="https://climateaction.dribdat.cc/event/3"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Climate Action Hackathon
                </a>{" "}
                by{" "}
                <span className="text-foreground">Fabio</span>,{" "}
                <span className="text-foreground">Oleg</span>,{" "}
                <span className="text-foreground">David</span> and{" "}
                <span className="text-foreground">Stephan</span>. It's a small experiment
                in using small, local AI models — the kind that run on the laptop you already
                own, without a data centre humming somewhere on your behalf.
              </p>
              <div className="col-span-12 md:col-span-5">
                <div className="border-t border-foreground/20 pt-4 font-mono text-xs tracking-wide text-muted-foreground">
                  <div className="text-foreground">Team</div>
                  <ul className="mt-2 space-y-1">
                    <li>Fabio</li>
                    <li>Oleg</li>
                    <li>David</li>
                    <li>Stephan</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-xs tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-foreground/20 pt-6">
          <div className="grid grid-cols-12 gap-6 font-mono text-xs tracking-wide text-muted-foreground">
            <div className="col-span-12 flex items-center gap-3 md:col-span-3">
              <img src={logo} alt="" className="h-6 w-6" />
              <span className="text-foreground">Simplon Off</span>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Edition</div>
              <div className="mt-1">GreenTech · Hackathon</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Team</div>
              <div className="mt-1">Fabio · Oleg · David · Stephan</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Tracking</div>
              <div className="mt-1">None, never</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
