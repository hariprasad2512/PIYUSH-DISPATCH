---
title: GEMINI.md — Piyush's Dispatch Governance & Operating Guide
type: governance-rule
status: active
version: 2.1.0
last_reviewed: 2026-08-10
approved_by: publication-owner
change_reason: "Synchronized authority, badge schema (DAILY-NODES#001 to DAILY-NODES#007), JPG asset standard (.jpg), 15-theme system, autohide left TOC, and 29-page static build architecture."
deprecation_date: null
---

# GEMINI.md — Piyush's Dispatch Operating Guide

This is the canonical governance operating guide for AI agents and developer automations working inside **Piyush's Dispatch** (`C:\Users\offic\OneDrive\Desktop\newsletter`).

The publication is a **premium independent newsletter & permanent long-form technical archive** built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, marked MDX rendering, 15 themes (including 8 AMOLED Pure Black themes), and left-sidebar autohiding navigation.

---

## 1. Core Objectives & Non-Negotiable Invariants

1. **Reading-First Architecture**: Every feature, layout change, or typography rule must prioritize high-legibility long-form reading.
2. **Zero Data Loss**: Never delete, overwrite, or corrupt authentic issue content (`content/issues/*.mdx`) or user assets without explicit backup and user consent.
3. **Badge Naming Standard**: Issue numbers across all cards, headers, navigation, and badges MUST use the canonical format: `The Daily Nodes #001`, `The Daily Nodes #002`, `The Daily Nodes #003`, ..., `The Daily Nodes #007`.
4. **JPG Image Asset Standard**: All issue hero and inline illustration assets must strictly use **JPG (`.jpg`) format** stored in normalized directories (`public/assets/daily-node-N/` and `public/assets/issue-N/`).
5. **Link & Asset Integrity**: Every link (internal navigation, source references, TOC anchors) and image asset path (`/assets/...`) must resolve cleanly. Never introduce dummy `#` links.
6. **Theme Discipline**: All UI components must use CSS custom properties (`var(--bg)`, `var(--text-primary)`, `var(--accent)`, `var(--border-color)`, `var(--surface)`) to guarantee compatibility across all 15 themes (7 Editorial + 8 AMOLED Pure Black `#000000` themes).
7. **Autohiding Left TOC**: The Table of Contents sidebar lives on the **left side** of the article layout and must fully disappear (`opacity-0 pointer-events-none -translate-x-8`) on downward scroll, with smooth hover/scroll-up reveal.
8. **Compilation Verification**: Never declare a task resolved without running `npx tsc --noEmit` and verifying `npm run build` static generation.

---

## 2. Platform Architecture & Directory Map

```text
C:\Users\offic\OneDrive\Desktop\newsletter\
├── content\issues\       # Authentic MDX newsletter issue content (DAILY-NODES #001 to #007)
├── public\
│   └── assets\           # JPG image assets for issues (/assets/daily-node-7/*.jpg, /assets/issue-7/*.jpg)
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
├── scripts\              # Node maintenance, link audit, asset deployment, and renumbering utility scripts
├── GEMINI.md             # Governance Operating Contract (this file)
└── AGENT.md              # Agent Operating Instructions
```

---

## 3. MDX Content Contract

Every newsletter issue inside `content/issues/` must adhere to Frontmatter Schema v1:

```yaml
---
issueNumber: 7
date: "2026-08-10"
title: "AI Agents 101 — From Answering Questions to Taking Action"
subtitle: "Why the future of AI isn't just about better answers—it's about systems that can reason, choose tools, and execute workflows."
excerpt: "An introduction to agentic AI: how AI agents reason, use tools, iterate in loops, and move from answering questions to pursuing goals."
heroImage: "/assets/daily-node-7/1.jpg"
topics:
  - AI
  - Agentic AI
  - AI Agents
tags:
  - ai
  - agentic-ai
  - ai-agents
sources:
  - title: "Piyush's Dispatch Original"
    publisher: "Piyush's Dispatch"
    date: "2026-08-10"
    url: "https://dispatch.piyush.dev"
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
3. Run `npm run build` ➔ 29 static pages prerendered successfully in ~2 seconds.
4. Ensure dev server runs on `http://localhost:3000`.
