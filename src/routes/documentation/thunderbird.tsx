import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import logo from "@/assets/simplon-off-logo.png";
import thunder1 from "@/assets/thunderai-1.jpg";
import thunder2 from "@/assets/thunderai-2.png";
import thunder3 from "@/assets/thunderai-3.png";
import thunder4 from "@/assets/thunderai-4.png";
import thunder5 from "@/assets/thunderai-5.png";

export const Route = createFileRoute("/documentation/thunderbird")({
  head: () => ({
    meta: [
      { title: "Thunderbird — Simplon Off" },
      {
        name: "description",
        content:
          "Connect Thunderbird email client to local AI for email summarization and composition.",
      },
      { property: "og:title", content: "Thunderbird — Simplon Off" },
      {
        property: "og:description",
        content: "Local AI integration for Thunderbird email client",
      },
    ],
  }),
  component: ThunderbirdPage,
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

function ThunderbirdPage() {
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
            <div className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">No. 04.01</div>
            <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">Thunderbird</h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-xs tracking-wide text-primary">Email · Local</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Thunderbird with{" "}
              <span className="text-primary">local AI.</span>
            </h1>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-7 md:text-lg">
                Summarize lengthy email threads and compose responses without sending your
                conversations to external servers. Your emails stay private, processed entirely on
                your device.
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
              <FeatureCard title="Summarize threads">
                Quickly condense long email threads into digestible bullet points. Focus on what
                matters without reading every message.
              </FeatureCard>
              <FeatureCard title="Compose assistance">
                Draft responses using your writing style. The model suggests completions that
                match your tone and intent.
              </FeatureCard>
              <FeatureCard title="Smart categorization">
                Automatically sort incoming mail by priority or topic based on content analysis.
              </FeatureCard>
              <FeatureCard title="Privacy first">
                Everything processes locally. No email content leaves your computer, even when
                offline.
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
                  <h4 className="font-semibold text-foreground">Install llamafile</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Download a llamafile with an appropriate model size (e.g., Llama-3-8B or Phi-3
                    for good balance of speed and quality).
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">02</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Run the AI server</h4>
                  <CodeBlock code="./llama-server -c 8192 -a tinyllama" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start the server on default port 8080 with context window for full email threads.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">03</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Configure Thunderbird</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add an extension - we tested <a href="https://micz.it/thunderbird-addon-thunderai/" target="_blank">TigerAI</a>
                    <img src={thunder1} alt="" className="h-6 w-6" />
                  </p>
                  <p>
                    Configure it to use the "OpenAI compatible" local model, set the
                    API endpoint to point to localhost:8080.
                    <img src={thunder2} alt="" className="h-6 w-6" />
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-12 gap-6">
                <div className="col-span-12 font-mono text-xs text-foreground md:col-span-2">04</div>
                <div className="col-span-12 md:col-span-10">
                  <h4 className="font-semibold text-foreground">Test integration</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select an email thread and click the AI helper icon to summarize, or start a reply
                    and use suggestions as you type.
                    <img src={thunder3} alt="" className="h-6 w-6" />
                    <img src={thunder4} alt="" className="h-6 w-6" />
                    <img src={thunder5} alt="" className="h-6 w-6" />
                  </p>
                </div>
              </li>
            </ol>
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
