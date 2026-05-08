import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { StepProgress } from "@/components/StepProgress";
import { modelById, MODELS, type ModelMeta } from "@/lib/models";

export const Route = createFileRoute("/setup")({
  head: () => ({
    meta: [
      { title: "Set up your local AI — LocalAI Match" },
      { name: "description", content: "Download your model and run it locally — chat in your browser at localhost:8080." },
      { property: "og:title", content: "Set up your local AI — LocalAI Match" },
      { property: "og:description", content: "Step-by-step instructions to run llamafile on your computer." },
    ],
  }),
  component: SetupPage,
});

type OS = "macOS" | "Linux" | "Windows";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-border bg-secondary p-3 text-sm text-secondary-foreground">
        <code>{code}</code>
      </pre>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute right-2 top-2 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground hover:bg-background"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function instructionsFor(os: OS, m: ModelMeta) {
  if (os === "Windows") {
    return [
      { title: "1. Download the model file", body: <p>Click the download button above. The file is ~{m.sizeGB} GB, so it may take a while.</p> },
      {
        title: "2. Rename it to end with .exe",
        body: (
          <>
            <p>Windows needs the file extension. Rename <code className="rounded bg-secondary px-1">{m.filename}</code> to:</p>
            <CodeBlock code={`${m.filename}.exe`} />
          </>
        ),
      },
      { title: "3. Double-click to run", body: <p>Windows may ask to confirm. A terminal window will open and start the local server.</p> },
      {
        title: "4. Open the chat",
        body: (
          <>
            <p>It will open automatically, or visit:</p>
            <CodeBlock code="http://localhost:8080" />
          </>
        ),
      },
    ];
  }
  // macOS / Linux
  return [
    { title: "1. Download the model file", body: <p>Click the download button above. The file is ~{m.sizeGB} GB, so it may take a while.</p> },
    {
      title: "2. Make it executable",
      body: (
        <>
          <p>Open a terminal in the folder you downloaded to, then run:</p>
          <CodeBlock code={`chmod +x ${m.filename}`} />
        </>
      ),
    },
    {
      title: "3. Run it",
      body: (
        <>
          <CodeBlock code={`./${m.filename}`} />
          {os === "macOS" && (
            <p className="mt-2 text-xs text-muted-foreground">
              On first launch, macOS may block the file. Right-click → Open, or run <code>xattr -dr com.apple.quarantine ./{m.filename}</code>.
            </p>
          )}
        </>
      ),
    },
    {
      title: "4. Open the chat",
      body: (
        <>
          <p>It will open automatically, or visit:</p>
          <CodeBlock code="http://localhost:8080" />
        </>
      ),
    },
  ];
}

function SetupPage() {
  const [model, setModel] = useState<ModelMeta | null>(null);
  const [os, setOS] = useState<OS>("macOS");

  useEffect(() => {
    const id = sessionStorage.getItem("lf-chosen-model");
    setModel((id && modelById(id)) || MODELS[1]);
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua)) setOS("Windows");
    else if (/Mac/i.test(ua)) setOS("macOS");
    else if (/Linux/i.test(ua)) setOS("Linux");
  }, []);

  if (!model) return null;

  const steps = instructionsFor(os, model);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={4} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Set up {model.friendlyName}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          One file. No installer. The model includes its own tiny web server — your chat opens in your
          browser at <code className="rounded bg-secondary px-1">localhost:8080</code>.
        </p>

        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Download</p>
              <p className="text-sm font-medium text-foreground">{model.filename}</p>
              <p className="text-xs text-muted-foreground">{model.sizeGB} GB · {model.license}</p>
            </div>
            <a
              href={model.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Download model →
            </a>
          </div>
        </section>

        <div className="mt-8">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            {(["macOS", "Linux", "Windows"] as OS[]).map((o) => (
              <button
                key={o}
                onClick={() => setOS(o)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  os === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <ol className="mt-6 space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                <div className="mt-2 space-y-2 text-sm text-muted-foreground">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>

        <section className="mt-10 rounded-2xl border border-eco/30 bg-eco/10 p-6">
          <h2 className="text-base font-semibold text-foreground">🌱 You're running AI sustainably</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            By choosing a small local model, you're using a fraction of the energy of a cloud chatbot —
            and your data never leaves your computer.
          </p>
        </section>

        <div className="mt-10 flex items-center justify-between">
          <Link to="/recommendation" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Start over</Link>
        </div>
      </main>
    </div>
  );
}
