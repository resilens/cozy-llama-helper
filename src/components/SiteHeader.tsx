import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeLinejoin="round" />
              <path d="M12 22V12M4 7l8 5 8-5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">LocalAI Match</span>
            <span className="text-xs text-muted-foreground">Private. Local. Sustainable.</span>
          </div>
        </Link>
        <a
          href="https://github.com/Mozilla-Ocho/llamafile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          About llamafile
        </a>
      </div>
    </header>
  );
}
