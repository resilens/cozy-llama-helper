## Plan: C + D — bottom-of-page mention + header link

Two small, focused changes. No new components, no card duplication.

### 1. SiteHeader — add Workflows link (D)

In `src/components/SiteHeader.tsx`, replace the static "Private · Local · Sustainable" tagline (which is just decoration) with two TanStack `Link`s, kept in the same `md:col-span-2` slot but widened slightly to fit:

```tsx
<nav className="hidden items-center gap-4 text-xs tracking-wide md:col-span-2 md:flex">
  <Link
    to="/documentation"
    className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
    activeProps={{ className: "text-foreground" }}
  >
    Workflows
  </Link>
  <Link
    to="/about"
    className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
    activeProps={{ className: "text-foreground" }}
  >
    About
  </Link>
</nav>
```

Notes:
- Desktop only (`hidden md:flex`) — matches the current behaviour of the tagline. Mobile keeps the tight 2-element layout we just fixed.
- "About" is added too because right now `/about` is only reachable from the footer; once we put a header nav there, it would feel odd to list Workflows alone.
- The "Private · Local · Sustainable" tagline goes away. It's pleasant but redundant with the rest of the page copy, and we need the slot. If you want to keep it, I can move it under the logo on `/` only — let me know.

### 2. Landing page — bottom-of-page workflows mention (C, relocated to the bottom)

In `src/routes/index.tsx`, leave sections 01–04 untouched and add a new **No. 05 "Local thinking"** section between the current No. 04 ("Coming soon" / offline guide) and the footer. It mirrors the editorial tone of No. 03 / No. 04 — short, single link, no cards:

```tsx
{/* Rule */}
<div className="mt-16 h-px w-full bg-foreground/20" />

{/* Local thinking */}
<section className="mt-12 grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-2">
    <div className="font-mono text-xs tracking-wide text-muted-foreground">No. 05</div>
    <h2 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
      Local thinking
    </h2>
  </div>
  <div className="col-span-12 md:col-span-10">
    <p className="text-base leading-relaxed text-foreground md:text-lg">
      Once your model is running, it can plug into the apps you already use —
      Thunderbird, LibreOffice, Inkscape. Private, offline, instant; no cloud
      round-trip, no telemetry, no waiting.
    </p>
    <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground">
      <Link to="/documentation" className="text-foreground underline-offset-4 hover:text-primary hover:underline">
        See the workflows →
      </Link>
    </p>
  </div>
</section>
```

Sits right above the footer, next to the "Learn more" / About link in the footer column — exactly where you wanted it, conceptually adjacent to /about.

### Numbering after the change

Final landing-page order:
- No. 01 — Hero
- No. 02 — What we believe
- No. 03 — Why small
- No. 04 — Coming soon (offline guide)
- No. 05 — Local thinking (new, links to /documentation)
- Footer

### Files touched

- `src/components/SiteHeader.tsx` — swap tagline for Workflows + About nav links.
- `src/routes/index.tsx` — append No. 05 "Local thinking" section before the footer.

### Out of scope

- No changes to `/setup` (the workflow cards stay there as the action step).
- No changes to `/documentation` itself.
- No new shared component — the cards live only on `/setup`.