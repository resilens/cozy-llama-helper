import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo.png";

export const Route = createFileRoute("/documentation/libreoffice")({
  head: () => ({
    meta: [
      { title: "LibreOffice — Simplon Off" },
      {
        name: "description",
        content:
          "Connect LibreOffice to local AI for document assistance, typing help, and summarization.",
      },
      { property: "og:title", content: "LibreOffice — Simplon Off" },
      {
        property: "og:description",
        content: "Local AI integration for LibreOffice Writer",
      },
    ],
  }),
  component: LibreOfficePage,
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

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-foreground/20 bg-foreground/5 p-4 font-mono text-xs leading-relaxed text-foreground">
      {code}
    </pre>
  );
}

function LibreOfficePage() {
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
            <div className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">No. 04.02</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">LibreOffice</h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Documents · Writing</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              LibreOffice with{" "}
              <span className="text-primary">local AI.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                Get intelligent assistance while writing documents. Receive real-time suggestions,
                summaries of your drafts, and smart completions — all processed locally without
                cloud dependencies.
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
              <FeatureCard title="Smart completion">
                Type naturally and receive context-aware suggestions that continue your thoughts.
                The model understands your document structure and style.
              </FeatureCard>
              <FeatureCard title="Summarize documents">
                Generate concise summaries of lengthy reports or extract key points from technical
                documentation instantly.
              </FeatureCard>
              <FeatureCard title="Rewrite & improve">
                Select text to rephrase, correct grammar issues, or adjust the tone of your writing.
              </FeatureCard>
              <FeatureCard title="Outline generation">
                Create structured outlines before you write. Transform bullet points into organized sections.
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
            <ol className="space-y-6">
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">01</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Install LibreOffice extension</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use extensions like &quot;Chat Assistant&quot; or configure custom macro endpoint to
                    call your local AI server at http://localhost:8080
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">02</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Use keyboard shortcuts</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Configure shortcuts for quick actions: Ctrl+Alt+S to summarize selected text,
                    Ctrl+Alt+C for completion suggestions, Ctrl+Alt=R to rewrite.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <div className="mt-16 h-px w-full border-dotted bg-foreground/10" />

        <section className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-wide text-muted-foreground">Tips</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-mono text-xs text-foreground">•</span>
                <p className="text-sm text-muted-foreground">
                  For longer documents, process section by section rather than the entire file at once.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-foreground">•</span>
                <p className="text-sm text-muted-foreground">
                  Keep the AI server running in a terminal window for seamless access.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-foreground">•</span>
                <p className="text-sm text-muted-foreground">
                  Larger models produce better results but take more time — find the balance for your workflow.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-foreground">•</span>
                <p className="text-sm text-muted-foreground">
                  Always review AI-generated content before finalizing your documents.
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
