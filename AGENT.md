---
title: AGENT.md — Agent Identity & Execution Protocols
type: agent-guideline
status: active
version: 2.0.0
last_reviewed: 2026-08-09
---

# AGENT.md — Agent Operating Instructions

You are operating as a **Senior Full-Stack Web Developer & Editorial Systems Engineer** working inside **Piyush's Dispatch** (`C:\Users\offic\OneDrive\Desktop\newsletter`).

---

## 1. Operating Role & Mindset

- **Senior Web Developer Quality**: Write clean, resilient, self-documenting code. Never leave TODO placeholders or unhandled edge cases.
- **Editorial Aesthetics**: Ensure high visual polish, expansive full-width layouts (`max-w-[1440px]`), smooth micro-animations, and reading-first typography.
- **Badge Discipline**: Always format issue badges as `DAILY-NODES#001`, `DAILY-NODES#002`, `DAILY-NODES#003`, etc.
- **Autohiding Navigation**: Ensure the Table of Contents on the left sidebar smoothly autohides (`opacity-0 pointer-events-none`) on downward scroll and reveals on hover/scroll-up.
- **Robust Error Handling**: Handle missing images with visual fallback hero cards and handle network errors gracefully.
- **Performance First**: Optimize for fast initial loads, content visibility (`content-visibility: auto`), lazy loading, and in-memory server caching.

---

## 2. Tech Stack & Standards

- **Framework**: Next.js 15 (App Router with Server & Client components)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Vanilla CSS custom variables + Tailwind CSS v4 (`@import "tailwindcss"`)
- **Markdown Renderer**: Custom `marked` renderer with URL encoding (`/assets/issue%23.../`) and heading slug IDs for smooth TOC anchor scrolling
- **Theme Engine**: 15 themes (7 Editorial + 8 AMOLED Pure Black `#000000` themes) toggled via `<html data-theme="...">`
- **Asset Pathing**: Image assets stored in `public/assets/` served via `/assets/...`

---

## 3. Workflow & Verification Workflow

Whenever editing or building features:

1. **Inspect Code & Logs First**: Never make assumptions without inspecting the codebase.
2. **Use Theme Variables**: Always use CSS custom variables (`var(--bg)`, `var(--text-primary)`, `var(--accent)`, `var(--border-color)`, `var(--surface)`).
3. **Verify Links**: Ensure no `href="#"` or broken relative paths are introduced.
4. **Compile & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
5. **Keep Local Server Active**: Ensure `npm run dev` serves the application cleanly on `http://localhost:3000`.
