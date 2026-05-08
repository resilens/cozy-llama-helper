import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocalAI Match — A private, local AI for your device" },
      {
        name: "description",
        content:
          "Pick the smallest local llamafile that still nails your tasks. Private, offline, low-energy.",
      },
      { property: "og:title", content: "LocalAI Match" },
      {
        property: "og:description",
        content: "A private, local AI model that fits your device and your tasks.",
      },
    ],
  }),
  component: Landing,
});

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border-t-2 border-foreground pt-4">
      <div className="font-mono text-xs text-muted-foreground">{num}</div>
      <h3 className="mt-2 text-lg font-bold uppercase tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Manifesto / hero */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              No. 01
            </div>
            <div className="mt-2 h-2 w-12 bg-primary" aria-hidden />
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              A manifesto for small models
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              An AI you can
              <br />
              <span className="text-primary">put in the trash.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                No subscription. No data centre burning megawatts on your behalf. Just one file on
                your laptop — drag it to the bin the day you are done. We help you pick the
                smallest model that still nails your tasks.
              </p>
              <div className="col-span-12 md:col-span-5">
                <Link
                  to="/use-case"
                  className="inline-flex w-full items-center justify-between border-2 border-foreground bg-foreground px-6 py-4 text-base font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:border-primary"
                >
                  <span>Begin</span>
                  <span aria-hidden>→</span>
                </Link>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  ~ 2 minutes / 5 steps
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule */}
        <div className="mt-16 h-0.5 w-full bg-foreground" />

        {/* Four principles */}
        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              No. 02
            </div>
            <h2 className="mt-2 text-sm font-bold uppercase tracking-tight text-foreground">
              Principles
            </h2>
          </div>
          <div className="col-span-12 grid gap-6 md:col-span-10 md:grid-cols-4">
            <Pillar
              num="01"
              title="Private"
              body="Your conversations never leave your computer."
            />
            <Pillar
              num="02"
              title="Sustainable"
              body="Smaller models use less energy. We pick one that is just right."
            />
            <Pillar
              num="03"
              title="Offline"
              body="Once installed, it runs on a plane, a train, anywhere."
            />
            <Pillar
              num="04"
              title="Owned"
              body="Open-source models you keep. No monthly fees."
            />
          </div>
        </section>

        {/* Rule */}
        <div className="mt-16 h-0.5 w-full bg-foreground" />

        {/* Argument */}
        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              No. 03
            </div>
            <h2 className="mt-2 text-sm font-bold uppercase tracking-tight text-foreground">
              Why small
            </h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
              The largest cloud models burn vast amounts of energy and ship your data to a company's
              servers. For most everyday tasks — writing, summarising, brainstorming — a small
              model on your laptop is faster, more private, and uses a fraction of the resources.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Default: the smallest model that still does the job.
            </p>
          </div>
        </section>

        {/* Colophon */}
        <footer className="mt-24 border-t-2 border-foreground pt-6">
          <div className="grid grid-cols-12 gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Edition</div>
              <div className="mt-1">Climate Week / Hackathon</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Year</div>
              <div className="mt-1">MMXXVI</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Runtime</div>
              <div className="mt-1">llamafile / local</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-foreground">Tracking</div>
              <div className="mt-1">None</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
