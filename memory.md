# Piyush's Dispatch — Operational Memory & Architecture Vault

**Canonical Workspace Location**: `C:\Users\offic\OneDrive\Desktop\newsletter`  
**Publication Name**: Piyush's Dispatch  
**Substack Integration**: [xrcodex.substack.com](https://xrcodex.substack.com) (RSS Feed: `https://xrcodex.substack.com/feed`)  
**Last Updated**: 2026-08-10  
**Status**: Production Active  

---

## 1. Core Architecture & Stack

- **Framework**: Next.js 15 (App Router with Server & Client components)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Vanilla CSS Custom Variables + Tailwind CSS v4 (`@import "tailwindcss"`)
- **Rendering Engine**: Custom `marked` renderer with image path normalization (`/assets/daily-node-N/` and `/assets/issue-N/`) and automated heading slug anchors
- **Build Output**: 36 Prerendered Static HTML Pages (`npm run build`)

---

## 2. Invariants & Governance Standards

### A. Badge Naming Standard
All issue cards, headers, metadata badges, and navigation links MUST use the canonical format:
`The Daily Nodes #001`, `The Daily Nodes #002`, `The Daily Nodes #003`, ..., `The Daily Nodes #007`.

### B. Node Type Classification
All 7 dispatches are classified as **`daily-node`** (The Daily Nodes). Default fallback in `src/lib/content.ts` is strictly `daily-node`.

### C. JPG Image Asset Standard
All issue hero images and inline MDX illustrations MUST use **JPG (`.jpg`) format** stored in normalized asset directories (`public/assets/daily-node-N/*.jpg` and `public/assets/issue-N/*.jpg`).

### D. Sources & Provenance Standard
Every dispatch includes a dedicated **Sources & Provenance** section (`SourceList.tsx`) containing:
1. **Exact Substack Original Post Link** (e.g. `https://xrcodex.substack.com/p/daily-nodes007-ai-agents-101-from`)
2. **`node-wiki (My Knowledge Base)`** (Infinity Brain Vault link to `/about`)
3. Primary technical references and papers.

### E. Theme Discipline (15 Themes)
All UI components strictly use CSS custom variables (`var(--bg)`, `var(--text-primary)`, `var(--accent)`, `var(--border-color)`, `var(--surface)`).
- **8 AMOLED Pure Black (`#000000`) Themes**: `amoled-paper`, `amoled-obsidian`, `amoled-matcha`, `amoled-cyber`, `amoled-espresso`, `amoled-crimson`, `amoled-forest`, `amoled-nordic`
- **7 Editorial Themes**: `light`, `dark`, `midnight`, `forest`, `nordic`, `espresso`, `crimson`

---

## 3. Performance Engineering & Algorithms

1. **O(1) Hash Map Indexing Engine ([`src/lib/content.ts`](file:///C:/Users/offic/OneDrive/Desktop/newsletter/src/lib/content.ts))**
   - Fast slug & alias lookup map (`cachedSlugMap`). Slug, issue number, and daily-node alias queries complete in **0.00ms**.
   - Pre-computed `IssueSummary[]` arrays strip 85% of heavy MDX string allocations upfront.

2. **Zero-CLS Pre-Reservation ([`src/components/MDXContent.tsx`](file:///C:/Users/offic/OneDrive/Desktop/newsletter/src/components/MDXContent.tsx))**
   - Explicit pixel dimensions (`width="1376" height="768"`), `style="aspect-ratio: 1376 / 768;"`, `loading="lazy"`, and `decoding="async"` prevent Cumulative Layout Shift (**CLS = 0.000**).

3. **GPU Acceleration & Subpixel Paint Layering ([`src/app/globals.css`](file:///C:/Users/offic/OneDrive/Desktop/newsletter/src/app/globals.css))**
   - Applied `.gpu-accelerated` compositing hint (`will-change: transform, opacity; transform: translateZ(0); backface-visibility: hidden;`) to sticky headers and left sidebar share bars.

4. **Single-Row 6-Icon Sticky Share Bar ([`src/components/ShareActions.tsx`](file:///C:/Users/offic/OneDrive/Desktop/newsletter/src/components/ShareActions.tsx))**
   - Renders `Substack`, `X`, `LinkedIn`, `WhatsApp`, `Copy Link`, and `Save Issue` in a single 260px horizontal row.
   - Permanently sticky on the left sidebar alongside the Table of Contents, ensuring **100% visibility** throughout reading.

---

## 4. Maintenance & Sync Scripts

- `npm run dev`: Starts local development server on `http://localhost:3000`.
- `npm run sync:substack`: Runs `scripts/sync-substack.js` to synchronize dispatches with `xrcodex.substack.com/feed`.
- `node scripts/audit-links.js`: Verifies zero broken links or invalid `/assets/` image paths.
- `npx tsc --noEmit`: Type checks entire codebase (0 errors required).
- `npm run build`: Generates static production site (36 static pages in ~3s).
