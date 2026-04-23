/**
 * site.config.ts
 * ──────────────────────────────────────────────────────────────
 * ONE PLACE TO TWEAK THE SITE.
 *
 * Change a color, toggle effects, update social links — all here.
 * Values are consumed by CSS variables in globals.css and by
 * components that need them directly.
 * ──────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // ─── Identity ──────────────────────────────────────────────
  identity: {
    name: 'Logan Pinney',
    title: 'Data Systems Architect',
    currentLine: 'currently: part-time contract with Riot Games',
    tagline:
    'Most operational mess is not a tooling problem. It is a structure problem. Bad schemas, weak handoffs, manual workarounds, unclear ownership, and fragile integrations pile up until the system becomes a liability. I fix that by designing the architecture underneath the workflow: data model, validation, orchestration, permissions, and failure handling.',
    location: 'Calgary, Alberta · remote-first',
    email: 'info@loganpinney.com',
    linkedin: 'https://www.linkedin.com/in/logan-pinney-6954a4195/',
  },

  // ─── Theme ─────────────────────────────────────────────────
  // Swap the accent once here — it flows everywhere.
  theme: {
    // Primary accent — used for links, buttons, labels, highlights
    accent: '#00FF00',
    // Dimmed variant for hover/dim states (usually ~70-80% of accent)
    accentDim: '#00CC00',
    // Glow shadow color (usually accent at ~30-40% opacity)
    accentGlow: 'rgba(0, 255, 0, 0.35)',

    // Success color (used for "available" status)
    success: '#00FF00',

    // Backgrounds
    bg: '#0a0a0a',
    bgCard: '#0e0e0e',

    // Borders
    border: '#1a1a1a',
    borderHover: '#2a2a2a',

    // Text
    text: '#e8e8e8',
    textDim: '#888888',
    textFaint: '#555555',
  },

  // ─── Visual effects ───────────────────────────────────────
  effects: {
    scanlines: true,        // CRT-style horizontal scanlines overlay
    glowText: true,         // text-shadow glow on accent text
    glowButtons: true,      // hover glow on primary buttons
    blinkingCursor: true,   // blinking _ after your name
    cardHoverGlow: true,    // cards get a glow halo on hover
  },

  // ─── Navigation ────────────────────────────────────────────
  nav: [
    { label: 'work', href: '/work' },
    { label: 'about', href: '/about' },
    { label: 'contact', href: '/contact' },
  ],

  // ─── Selected work (homepage cards) ────────────────────────
  selectedWork: [
    {
      tag: 'contract',
      title: 'Data Systems & Automation',
      body: 'Architecting automation and integration systems across Airtable, Workato, and Google Workspace — immigration compliance, RFP pipelines, staffing data, and budget coordination. Currently extending this work into a part-time contract with Riot Games.',
      period: '2024 — present',
    },
    {
      tag: 'epic games · coursera',
      title: 'Unreal Engine Fundamentals',
      body: "Designed and built the flagship Coursera course on real-time 3D development — part of Epic Games' certification program.",
      period: '2022 — 2024',
    },
    {
      tag: 'cg spectrum',
      title: 'Authorized Instructor',
      body: 'Mentored thousands of students through industry-ready Unreal Engine training programs. Built curriculum, delivered live cohorts.',
      period: '2021 — 2024',
    },
    {
      tag: 'kitbash3d',
      title: 'Ambassador & QA',
      body: 'QA on 40+ production-ready asset kits used in world-building for games, film, and virtual production.',
      period: '2022 — 2024',
    },
  ],

  // ─── Stack (homepage tags) ─────────────────────────────────
  stack: {
    platforms: ['Airtable', 'Workato', 'Google Workspace', 'BigQuery'],
    languages: ['Python', 'JavaScript / TypeScript', 'SQL', 'Google Apps Script'],
    integrations: ['REST APIs', 'Webhooks', 'OAuth flows', 'ETL orchestration'],
    focus: [
      'workflow automation',
      'systems integration',
      'data governance',
      'reliability & observability',
    ],
  },

  // ─── Terminal (hero animated block) ────────────────────────
  terminal: [
    { cmd: 'whoami', out: 'data-systems-architect @ contract' },
    { cmd: 'cat focus.txt', out: 'workflow automation · integrations · governance' },
    { cmd: 'echo $status', out: 'open to select contract work' },
  ],

  // ─── Status banner ─────────────────────────────────────────
  status: {
    label: 'available for select contracts',
    color: 'accent', // 'accent' | 'success' | 'text'
  },
} as const

export type SiteConfig = typeof siteConfig
