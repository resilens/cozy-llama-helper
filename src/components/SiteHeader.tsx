import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b-2 border-foreground bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-6 py-4">
        <Link to="/" className="col-span-6 flex items-baseline gap-3">
          <span className="h-3 w-3 bg-primary" aria-hidden />
          <span className="text-base font-bold uppercase tracking-tight text-foreground">
            LocalAI / Match
          </span>
        </Link>
        <div className="col-span-3 hidden text-xs uppercase tracking-widest text-muted-foreground md:block">
          Private — Local — Sustainable
        </div>
        <a
          href="https://github.com/Mozilla-Ocho/llamafile"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 justify-self-end text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline md:col-span-3"
        >
          About llamafile →
        </a>
      </div>
    </header>
  );
}
