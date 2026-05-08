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
        <div className="col-span-3 hidden text-xs tracking-wide text-muted-foreground md:block">
          Private · Local · Sustainable
        </div>
        <a
          href="https://github.com/Mozilla-Ocho/llamafile"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 justify-self-end text-xs tracking-wide text-foreground underline-offset-4 hover:underline md:col-span-3"
        >
          About llamafile →
        </a>
      </div>
    </header>
  );
}
