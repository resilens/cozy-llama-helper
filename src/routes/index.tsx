import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simplon Off — A friendly, local AI for your laptop" },
      {
        name: "description",
        content:
          "Simplon Off helps you pick the smallest local AI model that still nails your tasks. Private, offline, low-energy.",
      },
      { property: "og:title", content: "Simplon Off" },
      {
        property: "og:description",
        content: "A private, local AI that fits your device and your tasks.",
      },
    ],
  }),
  component: Landing,
});

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border-t border-foreground/20 pt-4">
      <div className="font-mono text-xs text-muted-foreground">{num}</div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 01</div>
            <div className="mt-2 h-1 w-12 bg-primary" aria-hidden />
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Hello — welcome.</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Flip the lights
              <br />
              <span className="text-primary">off on AI.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                This is a friendly guide to <a href="https://www.mozilla.ai/open-tools/llamafile" target="_blank">Llamafiles</a>. 
                Tell us what you'd like to do, and we'll
                suggest the smallest local AI model that still 
                <Link to="/documentation" className="underline-offset-4 hover:underline">does the job</Link> 
                — no subscription, no data centre, no tracking. 
                When you're done, you can simply <b>switch it off</b>.
              </p>
              <div className="col-span-12 md:col-span-5">
                <Link
                  to="/use-case"
                  className="inline-flex w-full items-center justify-between border border-foreground bg-foreground px-6 py-4 text-base font-semibold tracking-wide text-background transition-colors hover:bg-primary hover:border-primary"
                >
                  <span>Let's begin</span>
                  <span aria-hidden>→</span>
                </Link>
                <p className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
                  About 2 minutes · 5 friendly steps
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule */}
        <div className="mt-16 h-px w-full bg-foreground/20" />

        {/* Principles */}
        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 02</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              What we believe
            </h2>
          </div>
          <div className="col-span-12 grid gap-6 md:col-span-10 md:grid-cols-4">
            <Pillar
              num="01"
              title="Private by default"
              body="Your conversations stay on your computer. Always."
            />
            <Pillar
              num="02"
              title="Gentle on the planet"
              body="Smaller models sip energy. We help you pick one that's just right."
            />
            <Pillar
              num="03"
              title="Works offline"
              body="On a plane, on a train, in a cabin — it keeps working."
            />
            <Pillar
              num="04"
              title="Yours to keep"
              body="Open-source models, no monthly fees, no lock-in."
            />
          </div>
        </section>

        {/* Rule */}
        <div className="mt-16 h-px w-full bg-foreground/20" />

        {/* Why small */}
        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 03</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              Why small
            </h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="text-xl leading-relaxed text-foreground md:text-2xl">
              The biggest cloud models burn enormous amounts of energy and send your data to
              someone else's servers. For most everyday tasks — writing, summarising,
              brainstorming — a small model on your laptop is faster, more private, and uses a
              fraction of the resources. That's a quietly radical idea, and we like it.
            </p>
            <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground">
              Our default → the smallest model that still does the job.
            </p>
          </div>
        </section>

        {/* Rule */}
        <div className="mt-16 h-px w-full bg-foreground/20" />

        {/* Workflows */}
        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 04</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              Workflows
            </h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              Once your model is running, plug it into the apps you already use. Private,
              offline, and instant — no cloud round-trip.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  to: "/documentation/thunderbird" as const,
                  title: "Thunderbird",
                  body: "Summarise and draft email without leaving your inbox.",
                },
                {
                  to: "/documentation/libreoffice" as const,
                  title: "LibreOffice",
                  body: "Typing help, summaries, and smart suggestions in Writer.",
                },
                {
                  to: "/documentation/inkscape" as const,
                  title: "Inkscape",
                  body: "Generate images and descriptions inside your canvas.",
                },
              ].map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="group flex flex-col gap-2 border border-foreground/20 bg-background p-6 transition-colors hover:border-primary"
                >
                  <div className="font-mono text-xs tracking-wide text-muted-foreground">
                    No. 04
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <span className="mt-auto pt-2 font-mono text-xs text-muted-foreground group-hover:text-primary">
                    Read guide →
                  </span>
                </Link>
              ))}
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
              <div className="text-foreground">Runtime</div>
              <div className="mt-1">llamafile · local</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Link
                to="/about"
                className="text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                Learn more
              </Link>
              <p>This project is not affiliated with Mozilla.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
