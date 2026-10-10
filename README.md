# Pravaah AI — product website

Single-page product site for **Pravaah AI**, an AI engineering agent for CAD & CAE by ENT — Enginuvity Nexus Technologies.
The ENT corporate site is linked from the page rather than recreated here.

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Lucide · native HTML5 video.

## Page sections

In order (`src/App.tsx`): Hero (`#top`) · CAD + CAE (`#cad-cae`) · Not a chatbot (`#agent`) · Agent Demo video playlist (`#demo`) ·
How It Works (`#how-it-works`) · Domains (`#domains`) · Message (`#why`) · Contact (`#contact`) · Footer. The navbar links to
`#cad-cae`, `#demo`, `#how-it-works` and `#domains`. Copy lives in the components and `src/data/site.ts`.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 8; developed on Node 24).
- npm (lockfile: `package-lock.json`).

## Getting started

```bash
git clone https://github.com/prasanarath/PravaahAI_Web.git
cd PravaahAI_Web
npm ci            # install exactly what package-lock.json specifies
npm run dev       # development server
npm run build     # type-check (tsc -b) and production build to dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html`, `src/main.tsx`, `src/App.tsx` | Entry point and section order |
| `src/components/` | One component per section (`Hero`, `CadCae`, `AgentDemo`, …); `ui/` holds shared primitives |
| `src/components/LoopVideo.tsx` | Muted looping video that plays only near the viewport |
| `src/data/site.ts` | Navigation, contact details, social links |
| `src/lib/` | `useTimeline` (scripted demos), `flow.ts` (streamline motif) |
| `src/styles/globals.css` | Tailwind import, design tokens, global element styles |
| `src/assets/` | Bundled images, logos and video poster frames (`*-poster.webp`) |
| `public/videos/`, `public/captions/` | Demo videos and the caption file (see below) |
| `scripts/prepare-brand-assets.py` | Optional: regenerates logo/favicon files (needs Python + Pillow, NumPy, SciPy) |

## Video and caption assets

All media is local; nothing depends on external storage.

| File | Used by | Size |
| --- | --- | --- |
| `public/videos/pravaah-real-demo.mp4` | Hero (`Hero.tsx`) | 53.5 MB |
| `public/videos/example3.mp4` | CAD + CAE, light-UI clip (`CadCae.tsx`) | 2.1 MB |
| `public/videos/simulation.mp4` | CAD + CAE, simulation clip (`CadCae.tsx`) | 45.6 MB |
| `public/videos/Pravaah_AI_CompleteDemo.mp4` | Agent Demo playlist, item 1 (compressed copy of the 394 MB original) | 34.9 MB |
| `public/videos/example2.mp4` | Agent Demo playlist, item 2 (re-encoded from 131 MB) | 15.9 MB |
| `public/videos/Part2.mp4` | Agent Demo playlist, item 3 (re-encoded from 148 MB) | 15.4 MB |
| `public/captions/Pravaah_AI_Corrected_Captions.vtt` | Captions for the Complete Demo **only** | **missing — see note** |

**Note:** the original caption file was only on the previous Blob store (now blocked) and no local copy was found. The code already points to the path above; add the `.vtt` there and captions work with no code change. Until then the Complete Demo plays without captions.

Large originals are kept outside the repo. Re-encoded files use H.264 + AAC, CRF 22, `-movflags +faststart`, with resolution,
frame rate and duration unchanged.

**Agent Demo playlist** (`src/components/AgentDemo.tsx`): `VIDEO_FILES` sets the order, `VIDEO_URLS` maps each entry to a file,
and `CAPTIONS` maps a video *URL* to a `.vtt`. Previous/next buttons and end-of-video auto-advance cycle through the list.
Entries without a URL (`example6.mp4`) are skipped. Captions render as a native `<track>` on the Complete Demo only.

**Adding or replacing a video:** put the `.mp4` in `public/videos/` (keep each file under GitHub's 100 MB limit — re-encode with
`ffmpeg -i in.mp4 -c:v libx264 -crf 22 -c:a aac -movflags +faststart out.mp4`), then reference it as
`` `${import.meta.env.BASE_URL}videos/<name>.mp4` `` in the component. Do not reintroduce remote storage URLs.

## Integration guidance

This repo has been made portable; it has **not** been integrated into or tested inside any other application.
Things to review against the host app:

- **Entry point:** `index.html` → `src/main.tsx` → `<App />`. It mounts to `#root`. To embed, render `<App />` (or individual sections) from the host.
- **Routing:** none. It is a single page using in-page anchors (listed above) and no router. Anchor ids such as `#top`, `#demo`, `#contact` could collide with ids in a host page.
- **Base path:** assets use `import.meta.env.BASE_URL`, so a subpath deployment works by setting Vite's `base`. Favicon/OG links in `index.html` are root-absolute (`/favicon-32.png`, `/og-image.png`) and need adjusting for a subpath.
- **Styling:** Tailwind v4 via `@tailwindcss/vite`. `src/styles/globals.css` sets global `html`/`body` styles, CSS-variable tokens on `:root`, and fluid type tokens — these can clash with a host app's global styles or Tailwind config. The site is light-only (`data-theme="light"` on `<html>`, set in `index.html`).
- **Dependencies:** `react`, `react-dom`, `framer-motion`, `lucide-react`, `@fontsource-variable/instrument-sans`, `@fontsource/ibm-plex-mono` (self-hosted fonts).
- **Media:** videos and captions are served from `public/`, so the host must serve `videos/` and `captions/` at `BASE_URL`. Captions use `crossOrigin="anonymous"`; if videos/captions are ever served from another origin, that origin must send CORS headers.

## Deployment

`npm run build` emits a static site in `dist/` (including `public/` contents), deployable to any static host with no server code
and no environment variables. Set Vite's `base` in `vite.config.ts` if it is not served from `/`. The site is currently also hosted on
Vercel, but nothing in the code requires Vercel.

## Design system

- Tokens (color, surface, text, line, accent, warm accent, status, diagram) are CSS variables in
  `src/styles/globals.css`, defined separately for light (`:root`) and dark (`[data-theme='dark']`).
  They are mapped to Tailwind utilities such as `bg-surface`, `text-fg-2` and `border-line`.
- Width system: `.container-wide` holds content up to 1664px and is used for most sections. `.container-page`
  holds up to 1440px. Gutters scale with the viewport, and at 2560px content stays centred at its cap.
  `.section-y` and `.mt-block` set fluid vertical rhythm.
- Type scale: all sizes are fluid `clamp()` tokens (`text-display`, `text-h2`, `text-h3`, `text-h4`, `text-lead`,
  `text-body`, `text-body-sm`, `text-caption`, `text-nav`, `.label`). At 1920px and above they reach their caps:
  hero 88px, section headings 64px, lead 26px, body 19px, labels 13px.
- Scripted demos (hero console, agent demo, workflow highlight, action log) run on `src/lib/useTimeline.ts`
  only while on screen. Videos (`LoopVideo`) load and play only near the viewport.
- The site is light-only (`data-theme="light"` on `<html>`); there is no theme toggle.
- Fonts are Instrument Sans (text) and IBM Plex Mono (technical labels only), self-hosted via Fontsource.
- The flow motif (streamlines with travelling tracer particles) comes from `src/lib/flow.ts` and
  `src/components/ui/Tracer.tsx`. The Current Focus streamlines are computed from the stream function
  for ideal flow past a cylinder.
- Motion respects `prefers-reduced-motion`. Tracers and rail pulses stop, and content is fully visible
  without animation.

## Brand assets

`scripts/prepare-brand-assets.py` builds the web logo files from the source logos in the project root:

- It extracts the Pravaah "P" mark from `Pravaaha_log.png` and removes its white background so the mark
  works on dark surfaces.
- It trims `ent-logo.png`.
- It generates the favicons and `public/og-image.png`.

Re-run it with `npm run assets:brand` (requires Python with Pillow, NumPy and SciPy) if the source logos
change.
