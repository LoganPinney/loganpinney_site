# loganpinney.com — Cyberpunk Redesign

Matrix-green, terminal-inspired redesign with centralized config.

## What's in this zip

```
src/
├── config/
│   └── site.config.ts          ← change everything here
├── app/
│   ├── globals.css             ← theme CSS vars + utility classes
│   ├── layout.tsx              ← root layout with ThemeProvider
│   ├── page.tsx                ← homepage
│   ├── not-found.tsx           ← terminal-style 404
│   ├── work/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── legal/
│       ├── terms/page.tsx
│       └── privacy/page.tsx
└── components/
    ├── ThemeProvider.tsx       ← injects config into CSS vars
    ├── CornerLogo.tsx
    ├── Footer.tsx
    └── Terminal.tsx
```

## Install

From inside `loganpinney_site/` (the unzip command below overwrites existing
files with the new versions — that's what you want):

```bash
unzip -o ~/Downloads/redesign.zip
npm run build
git add -A
git commit -m "feat: cyberpunk redesign with centralized site config"
git push
```

Vercel will auto-deploy from `main`.

## The config file

Everything visual and content-related is in `src/config/site.config.ts`.

### Change the accent color
```ts
theme: {
  accent: '#00FF00',          // ← change this
  accentDim: '#00CC00',       // slightly darker variant
  accentGlow: 'rgba(0, 255, 0, 0.35)',  // glow color
}
```

If you swap `accent`, also update `accentDim` (~70–80% brightness) and
`accentGlow` (accent at ~30–40% opacity). For example, for cyan:
```ts
accent: '#00FFFF',
accentDim: '#00CCCC',
accentGlow: 'rgba(0, 255, 255, 0.35)',
```

### Toggle effects on/off
```ts
effects: {
  scanlines: true,       // CRT horizontal lines overlay
  glowText: true,        // text-shadow glow on accent text
  glowButtons: true,     // button hover glow
  blinkingCursor: true,  // blinking _ after your name
  cardHoverGlow: true,   // cards glow on hover
}
```

Flip any of these to `false` to disable that effect site-wide.

### Update content
- `identity` — name, title, bio, email, LinkedIn
- `selectedWork` — the 4 homepage cards
- `stack` — tech tags on homepage
- `terminal` — animated terminal lines on homepage hero
- `nav` — footer nav links
- `status` — the "available for select contracts" banner

No need to touch any other file.

## Before you deploy

Replace the Formspree ID in `src/app/contact/page.tsx`:
```ts
const FORMSPREE_ID = 'xpzgkdqb'  // ← replace with your form ID
```
