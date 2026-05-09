## Problem

Bare `<a href="...">` tags in body copy (e.g. the *Llamafiles* link on the home page, the *TigerAI* link in the Thunderbird doc) inherit `text-foreground` (ink black) with no underline, so they look identical to surrounding text until hovered.

Meanwhile, the navigational `<Link>` components throughout the app (back buttons, header links, "Start over", muted footer links) are *intentionally* low-key — they all carry explicit className styling. We don't want to touch those.

## Fix

Add a single global rule in `src/styles.css` that targets only unstyled anchors:

```css
@layer base {
  a:not([class]) {
    color: var(--primary);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
  a:not([class]):hover {
    text-decoration-thickness: 2px;
  }
}
```

`a:not([class])` matches `<a href="…">Llamafiles</a>` but skips every TanStack `<Link>` and every `<a className="…">`, so existing intentional styling stays untouched.

## Files

- `src/styles.css` — append the `@layer base` block above.

## Out of scope

- No changes to `<Link>` components or any anchor that already has a className.
- No new design tokens.
