import { Link } from "@tanstack/react-router";
import logo from "@/assets/simplon-off-logo.png";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/15 bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-6 py-4">
        <Link to="/" className="col-span-6 flex items-center gap-3">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            Simplon Off
          </span>
        </Link>
        <div className="col-span-2 hidden text-xs tracking-wide text-muted-foreground md:block">
          Private · Local · Sustainable
        </div>
        <div className="col-span-7 flex items-center justify-end gap-3 md:col-span-4">
          <a
            href="/documentation"
            className="hidden text-xs tracking-wide text-foreground underline-offset-4 hover:underline sm:inline"
          >
            Workflows →
          </a>
          <a
            href="https://www.mozilla.ai/open-tools/llamafile"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs tracking-wide text-foreground underline-offset-4 hover:underline sm:inline"
          >
            About llamafile →
          </a>
          <a
            href="https://github.com/resilens/cozy-llama-helper"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="inline-flex items-center gap-1.5 rounded-md border border-foreground/20 bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
