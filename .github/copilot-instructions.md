# Copilot instructions — Minimal Tailwind UI Blocks

## Quick summary
- Static site (no build system): HTML fragments in `/blocks/` are fetched at runtime and injected into placeholders in `index.html` and pages via `js/loadComponents.js`.
- Data lives in `/data/blocks.json` (gallery, store, and product pages read this file). Images and downloadable zips are in `/assets/`.
- Scripts use MutationObservers to initialize features after block injection (`js/slider.js`, `js/gallery.js`, `js/nav.js`).

## Where to start (big picture)
- `index.html` hosts top-level placeholder divs (e.g., `<div id="nav"></div>`) and loads `js/loadComponents.js` which fetches `/blocks/<name>.html` and injects them.
- Each block fragment in `/blocks/` presumes specific IDs/elements (e.g., `nav.html` provides `#burgerBtn` and `#mobileMenu` expected by `js/nav.js`).
- Dynamic UI/data comes from `data/blocks.json` (e.g., `js/gallery.js`, `pages/product-page.html` + `js/product-page.js`).

## Conventions & important patterns
- Block injection: to add a new "home" block, add a placeholder `<div id="your-block"></div>` in `index.html`, add `/blocks/your-block.html`, and add `"your-block"` to the `components` array in `js/loadComponents.js`.
- MutationObserver init pattern: scripts wait for the block to exist (query for elements, then disconnect observer and init). Follow that pattern when adding JS that attaches to a block.
- Navigation and subpages: use `data-link` attributes in nav links. `js/nav.js` rewrites links on subpages (adjusting `../` prefixes) — **do not** change link construction without checking `nav.js`.
- Paths are served as absolute URLs (many `fetch` calls use leading `/`). The site must be served from the repo root (see local server section) — opening `file://` will break fetches.
- Product pages: `pages/product-page.html` expects a query parameter `?id=<index>` where `id` is an array index into `data/blocks.json` (not the block `id` string). Be careful: inserting/removing items in `blocks.json` changes indexes.

## Common tasks & where to edit (examples)
- Add a new gallery/store item:
  1. Add object in `data/blocks.json` (see the existing objects for fields like `id`, `title`, `image`, `files`, `demo`).
  2. Upload image to `assets/img/` and demo to `/demos/` if needed.
  3. Gallery and store pages read `blocks.json` automatically; `js/gallery.js` paginates with `slice(0, 3)` by default.

- Add a new homepage block (site layout change):
  - Add placeholder to `index.html`, add `/blocks/<name>.html`, append to `components` array in `js/loadComponents.js`, and ensure any required scripts initialize via MutationObserver.

- Fixing broken in-page links on subpages: look at `js/nav.js` which manipulates `data-link` and logo links depending on `window.location.pathname`.

## Debugging tips specific to this project
- If a block doesn't appear: check the Network tab for `/blocks/<name>.html` fetch errors and verify server root.
- If event handlers don't attach: ensure your init code follows the MutationObserver pattern (scripts run before a block is injected). Search for other observers as examples (`sliderObserver`, `galleryObserver`).
- Console logs are used liberally (look for `console.error` calls in `loadComponents.js` and others).

## Dev / run instructions
- Serve the repo root (because code uses absolute paths):
  - Python: `python -m http.server 8000` then open `http://localhost:8000`
  - Node (if available): `npx serve . -l 5000` or `npx http-server -p 5000`
  - VS Code Live Server extension also works (serve from workspace root).

## Integration & external dependencies
- Tailwind is used via CDN (no Tailwind build pipeline) — changes to Tailwind utilities are made inline in templates.
- Fonts & images are loaded from external CDNs or local `/assets/`.

## Notes for code-modifying agents
- Preserve the MutationObserver init pattern when adding JS. Prefer adding a new observer -> init sequence rather than assuming blocks are present on initial load.
- When changing any path or switching to relative imports, update `js/nav.js` fixes for subpages and verify both `index.html` and `pages/*` still load correctly.
- Avoid changing how product pages resolve `id` without a migration plan: it's currently an index into `blocks.json` (not the `id` field).

---
If you'd like, I can tighten or expand the instructions (add PR checklist items, example change PR templates, or propose a small migration to use stable `id` strings for product pages). Any sections you'd like clarified or expanded? ✅