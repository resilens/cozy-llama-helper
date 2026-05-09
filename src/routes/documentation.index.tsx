import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo-64.webp";

export const Route = createFileRoute("/documentation/")({
  head: () => ({
    meta: [
      { title: "Workflows — Simplon Off" },
      {
        name: "description",
        content:
          "Connect your desktop applications to local AI. Private, offline integration for Thunderbird, LibreOffice, and Inkscape.",
      },
      { property: "og:title", content: "Workflows — Simplon Off" },
      {
        property: "og:description",
        content: "Connecting desktop apps to local AI",
      },
    ],
  }),
  component: DocumentationIndex,
});

function CardLink({ to, title, description }: { to: string; title: string; description: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-2 border border-foreground/20 bg-background p-6 transition-colors hover:border-primary hover:text-primary"
    >
      <div className="font-mono text-xs tracking-wide text-muted-foreground">
        No. 04
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-auto pt-2 font-mono text-xs text-muted-foreground group-hover:text-primary">
        Read guide →
      </span>
    </Link>
  );
}

function DocumentationIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 04</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              Workflows
            </h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Connect — integrate.</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Software that thinks{" "}
              <span className="text-primary">locally.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                Connect your favorite desktop applications to local AI models. All processing stays
                on your device — private, offline-capable, and efficient. Choose an application to
                get started with integration instructions.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 h-px w-full bg-foreground/20" />

        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 grid gap-6 md:col-span-10 md:grid-cols-3">
            <CardLink
              to="/documentation/thunderbird"
              title="Thunderbird"
              description="Integrate local AI for email summarization and composition assistance."
            />
            <CardLink
              to="/documentation/libreoffice"
              title="LibreOffice"
              description="Document typing help, summarization, and smart suggestions."
            />
            <CardLink
              to="/documentation/inkscape"
              title="Inkscape"
              description="Generate images and descriptions using local neural networks."
            />
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
                About
              </Link>
              <div className="mt-1">Fabio · Oleg · David · Stephan</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
