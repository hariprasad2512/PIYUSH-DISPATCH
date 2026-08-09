---
title: GEMINI.md — Piyush's Dispatch Governance & Operating Guide
type: governance-rule
status: active
version: 2.0.0
last_reviewed: 2026-08-09
approved_by: publication-owner
change_reason: "Synchronized authority, badge schema (DAILY-NODES#001), 15-theme system (8 AMOLED #000000 themes), autohide left TOC, and 27-page static build architecture."
deprecation_date: null
---

# GEMINI.md — Piyush's Dispatch Operating Guide

This is the canonical governance operating guide for AI agents and developer automations working inside **Piyush's Dispatch** (`C:\Users\offic\OneDrive\Desktop\newsletter`).

The publication is a **premium independent newsletter & permanent long-form technical archive** built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, marked MDX rendering, 15 themes (including 8 AMOLED Pure Black themes), and left-sidebar autohiding navigation.

---

## 1. Core Objectives & Non-Negotiable Invariants

1. **Reading-First Architecture**: Every feature, layout change, or typography rule must prioritize high-legibility long-form reading.
2. **Zero Data Loss**: Never delete, overwrite, or corrupt authentic issue content (`content/issues/*.mdx`) or user assets without explicit backup and user consent.
3. **Badge Naming Standard**: Issue numbers across all cards, headers, navigation, and badges MUST use the canonical format: `DAILY-NODES#001`, `DAILY-NODES#002`, `DAILY-NODES#003`, etc.
4. **Link & Asset Integrity**: Every link (internal navigation, source references, TOC anchors) and image asset path (`/assets/...`) must resolve cleanly. Never introduce dummy `#` links.
5. **Theme Discipline**: All UI components must use CSS custom properties (`var(--bg)`, `var(--text-primary)`, `var(--accent)`, `var(--border-color)`, `var(--surface)`) to guarantee compatibility across all 15 themes (7 Editorial + 8 AMOLED Pure Black `#000000` themes).
6. **Autohiding Left TOC**: The Table of Contents sidebar lives on the **left side** of the article layout and must fully disappear (`opacity-0 pointer-events-none -translate-x-8`) on downward scroll, with smooth hover/scroll-up reveal.
7. **Compilation Verification**: Never declare a task resolved without running `npx tsc --noEmit` and verifying `npm run build` static generation.

---

## 2. Platform Architecture & Directory Map

```text
C:\Users\offic\OneDrive\Desktop\newsletter\
├── content\issues\       # Authentic MDX newsletter issue content (DAILY-NODES #1 to #6)
├── public\
│   └── assets\           # Image assets for issues (/assets/issue%23.../)
├── src\
│   ├── app\              # Next.js 15 App Router pages & layouts
│   │   ├── globals.css   # 15-theme CSS variables & typography
│   │   ├── page.tsx      # Streamlined Homepage (Hero, Today's Issue, Archive, Subscribe)
│   │   ├── issues\       # Issue reader (`[slug]/page.tsx`) & archive routes
│   │   ├── topics\       # Topic directory routes
│   │   ├── search\       # Search route with useDeferredValue
│   │   ├── subscribe\    # Subscription route
│   │   └── about\        # About author page
│   ├── components\       # Modular UI components (Header, Footer, ArticleTOC, MDXContent, etc.)
│   ├── lib\              # Core content loader (10s in-memory cache), marked renderer, utilities
│   └── types\            # TypeScript definitions (Issue, Topic, Source, Heading)
├── scripts\              # Node maintenance, link audit, and renumbering utility scripts
├── GEMINI.md             # Governance Operating Contract (this file)
└── AGENT.md              # Agent Operating Instructions
```

---

## 3. MDX Content Contract

Every newsletter issue inside `content/issues/` must adhere to Frontmatter Schema v1:

```yaml
---
issueNumber: 6
date: "2026-08-09"
title: "Graph Engineering — Beyond Single AI Loops"
subtitle: "Why the best AI systems don't rely on a single agent running in circles."
excerpt: "A deep dive into connected node/edge workflows."
heroImage: "/assets/issue%236/9.jpg"
topics:
  - AI
  - Agentic AI
  - Graph Engineering
tags:
  - ai
  - agentic-ai
sources:
  - title: "Graph AI Research"
    publisher: "Google Research"
    date: "2026-08-09"
    url: "https://ai.google/research"
relatedIssues: []
published: true
---
```

---

## 4. Theme System Contract (15 Themes)

The theme switcher manages 15 distinct themes via `data-theme` attribute on `<html>`:

- **8 AMOLED Pure Black (`#000000`) Themes**:
  1. 📜⬛ `amoled-paper` (Warm Amber Parchment Text + Pure Black)
  2. ⬛ `amoled-obsidian` (Crisp White Text + Sky Blue Accent)
  3. 🍵⬛ `amoled-matcha` (Mint Sage Text + Emerald Accent)
  4. 🌆⬛ `amoled-cyber` (Rose Pink Text + Hot Pink Accent)
  5. ☕⬛ `amoled-espresso` (Latte Cream Text + Caramel Accent)
  6. 🍷⬛ `amoled-crimson` (Rose Silver Text + Crimson Accent)
  7. 🌲⬛ `amoled-forest` (Pale Sage Text + Gold Amber Accent)
  8. 🌊⬛ `amoled-nordic` (Ice Blue Text + Polar Accent)

- **7 Editorial Themes**:
  `light`, `dark`, `midnight`, `forest`, `nordic`, `espresso`, `crimson`

All component styling must rely on Tailwind CSS v4 variables or `var(--...)` tokens.

---

## 5. Maintenance & Verification Checklist

Before completing any task:
1. Run `npx tsc --noEmit` ➔ 0 errors required.
2. Run `node scripts/audit-links.js` ➔ 0 broken/dummy links required.
3. Run `npm run build` ➔ 27 static pages prerendered successfully in ~2 seconds.
4. Ensure dev server runs on `http://localhost:3000`.
