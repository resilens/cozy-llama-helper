## Diagnosis

Two separate issues, one structural bug:

**1. Navigation to `/documentation/<tool>` appears broken**

`src/routes/documentation.tsx` declares route `/documentation`, and there are also child route files in `src/routes/documentation/` (`thunderbird.tsx`, `libreoffice.tsx`, `inkscape.tsx`). In TanStack Router's flat file convention this makes `documentation.tsx` the **parent layout** for those children.

Per the framework rule: *"If a parent route has children, its component MUST render `<Outlet />` or the child route matches but nothing appears on screen."*

The current `DocumentationIndex` component renders no `<Outlet />`, so visiting `/documentation/thunderbird` (or libreoffice/inkscape) matches the parent route, the child route also matches, but the child has nowhere to render — the user keeps seeing the cards index. That looks like "navigation doesn't work."

**2. The landing page has no "No. 04 — Workflows" section**

`src/routes/index.tsx` stops at `No. 03 — Why small`. There is no card linking to `/documentation`. The header has a "Workflows →" link but it's easy to miss.

## Fix

### A. Restructure the documentation parent so children render

Rename `src/routes/documentation.tsx` → `src/routes/documentation.index.tsx`. Under flat routing this turns the file from a parent-layout route into a sibling leaf route that only matches `/documentation` exactly, so `/documentation/thunderbird` etc. resolve directly to their own files with no broken parent in the way. No code changes inside the file are needed.

(Alternative: keep the file as a true layout — make its component a `<><SiteHeader /><Outlet /></>` shell and move the cards/content into a new `documentation.index.tsx`. More work, only worth it if we want a shared layout. Recommend the rename approach.)

While we're here, also swap the raw `<a href="/documentation">` in `src/components/SiteHeader.tsx` and `src/routes/index.tsx` for TanStack `<Link to="/documentation">` so navigation stays client-side.

### B. Add the "No. 04 — Workflows" section to the landing page

In `src/routes/index.tsx`, after the `No. 03 — Why small` section and before the footer, add a new section using the same 12-column grid pattern:

- Left col: `No. 04` label + small heading "Workflows".
- Right col: short paragraph ("Once you have a model running, plug it into the apps you already use…") and three `Link` cards to `/documentation/thunderbird`, `/documentation/libreoffice`, `/documentation/inkscape` mirroring the existing card style on the documentation page.

Use existing design tokens (`text-foreground`, `text-muted-foreground`, `border-foreground/20`, `text-primary`) — no new colors.

## Verification

After the change, refresh `/documentation/thunderbird`, `/documentation/libreoffice`, `/documentation/inkscape` — each should render its own page with screenshots. The landing page should show a fourth section with three workflow cards.
