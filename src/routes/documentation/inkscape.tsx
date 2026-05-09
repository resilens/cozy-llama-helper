import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo-64.webp";

export const Route = createFileRoute("/documentation/inkscape")({
  head: () => ({
    meta: [
      { title: "Inkscape — Simplon Off" },
      {
        name: "description",
        content:
          "Connect Inkscape to local AI for image generation and automated descriptions.",
      },
      { property: "og:title", content: "Inkscape — Simplon Off" },
      {
        property: "og:description",
        content: "Local AI integration for Inkscape graphics",
      },
    ],
  }),
  component: InkscapePage,
});

function FeatureCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-foreground/20 bg-background p-6">
      <h4 className="font-semibold tracking-tight text-foreground">{title}</h4>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function InkscapePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <Link
              to="/documentation"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary"
            >
              ← Docs
            </Link>
            <div className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">No. 04.03</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">Inkscape</h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Design · Generate</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Inkscape with{" "}
              <span className="text-primary">local AI.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                Generate visual elements and auto-generate SVG code using local neural networks.
                Create illustrations, icons, and graphics directly from text prompts without cloud
                dependency or subscription fees.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 h-px w-full bg-foreground/20" />

        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">Capability</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FeatureCard title="Text-to-image generation">
                Describe what you want and generate base images that can be converted to SVG. Works
                well for simple graphics, icons, and illustration elements.
              </FeatureCard>
              <FeatureCard title="Image description">
                Upload an existing graphic and receive detailed written descriptions, helpful for
                accessibility and cataloging your work.
              </FeatureCard>
              <FeatureCard title="SVG code assistance">
                Get suggestions for SVG path modifications, element transformations, and style
                improvements based on your design intent.
              </FeatureCard>
              <FeatureCard title="Style transfer">
                Apply aesthetic styles from reference images to your own work while maintaining
                editable vector structure.
              </FeatureCard>
            </div>
          </div>
        </section>

        <div className="mt-16 h-px w-full border-dotted bg-foreground/10" />

        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">Setup</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="mb-6 rounded-md border border-foreground/20 bg-foreground/5 p-4 text-sm text-muted-foreground">
              These steps assume you've already picked a model and started llamafile by following the{" "}
              <Link to="/use-case" className="text-foreground underline-offset-4 hover:text-primary hover:underline">
                guided setup
              </Link>{" "}
              in this web app.
            </p>
            <ol className="space-y-6">
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">01</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Set up Python backend</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Create a helper script to call the llama-server API and convert generated images
                    to SVG for Inkscape import: (Coming soon!)
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">02</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Import to Inkscape</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use File → Import to bring generated graphics into your project. For SVG output,
                    render the image and trace it: Path → Trace Bitmap.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <div className="mt-16 h-px w-full border-dotted bg-foreground/10" />

        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">Workflow</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-mono text-xs text-primary">→</span>
                <p className="text-sm text-foreground">
                  <strong>Prompt:</strong> &quot;a minimalist icon of a coffee cup with steam lines&quot;
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-primary">→</span>
                <p className="text-sm text-foreground">
                  <strong>Generate:</strong> AI creates raster approximation at 512x512
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-primary">→</span>
                <p className="text-sm text-foreground">
                  <strong>Vectorize:</strong> Inkscape traces to clean SVG paths
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-primary">→</span>
                <p className="text-sm text-foreground">
                  <strong>Edit:</strong> Customize colors, paths, and refine details
                </p>
              </li>
            </ul>
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
