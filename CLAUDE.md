# CLAUDE.md — AI Context for Anjani Gupta Portfolio

This file gives Claude Code full context on the project goals, decisions made, and conventions to follow in future sessions.

---

## Project Overview

Static single-page portfolio for **Anjani Gupta**, a growth & marketing leader. The site was built by Claude Code from a 46-slide Google Slides deck (exported as PPTX). All content, copy, layout decisions, and media assets originate from that deck.

**Source file (local):** `~/Desktop/Anjani Gupta - Growth Portfolio '26.pdf` — use this as the canonical visual reference for any layout or content questions.

**Original PPTX (ZIP):** Was available at build time; media files extracted to `assets/media/` as `image1.png` through `image129.gif` (122 files total).

---

## Core Constraints

- **Single HTML file.** Do not split into multiple pages or introduce a build system. `index.html` is the entire site.
- **No frameworks.** Plain HTML, CSS, JS only — no React, Tailwind, bundlers, or npm.
- **Hosted on Namecheap** as static files. No server-side logic.
- **Copy is verbatim from the source deck** unless Anjani explicitly rewrites it. Do not paraphrase, summarize, or "improve" text without being asked.
- **Never auto-commit.** Always ask before committing to git.

---

## Content Source Map

Each section of the site maps to specific slides:

| Site Section | Source Slides |
|---|---|
| Hero bio | Slide 2 (3 paragraphs, verbatim) |
| Professional experiences (About tab 1) | Slide 4 (timeline) |
| Tools & Skills (About tab 2) | Slide 5 |
| What I'm Looking For (About tab 3) | Slide 3 |
| Business Impact — Somnee | Slides 8–9 |
| Business Impact — Google | Slides 8–9 |
| Top Career Projects | Slides 11–14 |
| Somnee portfolio | Slides 15–32 |
| Google portfolio | Slides 33–46 |

---

## Device Frame System

GIFs in portfolio cards are overlaid inside device frame PNGs. The technique:
- Outer `.device-frame-wrap` is `position: relative`
- `.df-frame` (the frame PNG) is `display: block; width: 100%; height: auto` — sets container height
- `.df-gif` is `position: absolute` with percentage-based coordinates — sits inside the frame's screen cutout

### Frame PNG files
| File | Device | Dimensions |
|---|---|---|
| `assets/media/image30.png` | Laptop | 2048×1207 |
| `assets/media/image34.png` | Tablet (portrait) | 900×1152 |
| `assets/media/image97.png` | Mobile/phone | 1290×2048 |

### Screen area CSS (pixel-analyzed from actual PNGs — do not change without re-measuring)
```css
.df-laptop .df-gif { left: 8.40%; top: 7.54%; width: 83.20%; height: 79.70%; }
.df-tablet .df-gif { left: 11.89%; top: 10.07%; width: 77.11%; height: 80.21%; }
.df-mobile .df-gif { left: 9.46%; top: 2.15%; width: 66.82%; height: 91.11%; }
```
These values were derived by scanning the actual PNG pixel data (finding where alpha=0 transitions to opaque bezel), NOT from the PPTX XML. The PPTX EMU coordinates were inaccurate due to Google Slides → PPTX conversion artifacts.

### Frame assignments
- **Tablet:** `image33.gif` (Welcome email)
- **Mobile:** `image128.gif` (ISBW Mobile Figma)
- **Laptop:** All other GIFs (affiliate guide, Gen2 features, Somnee strategy deck, all Google deck GIFs)

---

## Card Layout Convention

All `.portfolio-card` elements use:
```css
display: flex;
flex-direction: column;
```
With `.card-body { order: -1; }` so text (tag + title + description) always appears **above** the media visually, even though `card-media` comes first in HTML.

---

## CSS Architecture

Single stylesheet: `assets/css/style.css`

Key CSS classes and where they're used:

| Class | Purpose |
|---|---|
| `.portfolio-card` | Card container — flex column, text-first via order |
| `.card-media` | Media area (GIF, image gallery, A/B grid) |
| `.card-body` | Text area — order: -1 puts it visually first |
| `.device-frame-wrap` | Wrapper for device frame overlay |
| `.df-frame` | The frame PNG image |
| `.df-gif` | The GIF absolutely positioned inside the frame |
| `.gif-labeled-wrap` | Wraps a device frame + doc label in Google multi-GIF grids |
| `.gif-row.cols-2 / .cols-3` | Grid layout for multi-GIF cards |
| `.ab-grid / .ab-cell` | A/B test comparison layout |
| `.email-portrait-wrap` | Side-by-side layout: tablet-framed GIF left + static screenshots right |
| `.gif-constrained-wrap` | Centers/constrains single tall GIF (affiliate card) |
| `.smb-metric-row` | Metric row in Business Impact (tag + number + description) |
| `.pf-row` | Structured field row in Top Career Projects cards |
| `.pf-check-row` | Checkmark result row in Projects results box |
| `.tab-btn / .tab-panel` | About section tab system |
| `.filter-btn` | Portfolio filter buttons (data-group + data-category) |
| `.lightbox` | Full-screen image lightbox |

### CSS variables
```css
--lime: #D9FEA9       /* Verified from PDF pixel data */
--blue: #519BF7       /* Use this for all blue accents — NOT #2563eb or other blues */
--blue-dark: #1a73e8  /* Google link blue — use for hyperlinks and secondary blue */
--dark: #111111
--gray: #5f6368       /* Google's exact body text gray — verified from PDF */
--gray-mid: #999999   /* Subtitle / label gray — verified from PDF */
--gray-light: #f8f9fa /* Google's exact light background — verified from PDF */
--white: #ffffff
--border: #e5e7eb
```

### Font
`Helvetica Neue` — system font, no Google Fonts import needed.
Anjani tested Plus Jakarta Sans and Inter, and chose Helvetica Neue as the final preference.
Font stack: `'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif`
Do NOT add Google Fonts imports or switch fonts without asking.

### Colors on lime (#D9FEA9) backgrounds
Use `var(--dark)` (#111111) for text on lime sections (hero, contact/footer).
Do NOT use green variants like `#4a7a2a` or `#2a4a15` — they were derived from the PPTX conversion and do not match the PDF.
Hero accent (`em` tag in hero name) uses `var(--blue)` per PDF.

---

## Business Impact Section

### Somnee layout
Vertical stacked `.smb-metric-row` rows, each with:
- `.smb-chip.chip-blue` tag
- `.smb-stat-number` (fixed width: 84px for alignment)
- `.smb-stat-inline-desc` description

### Google layout
Three sub-team sections (FEMA, ISBW, Nest/Hardware), each with their own `.smb-section` containing vertical metric rows using `.chip-lime` (yellow-green) tags.

---

## Top Career Projects Section

Four full-width cards (`.projects-grid { grid-template-columns: 1fr }`), each using `.pf-row` structured field rows:

| Icon | Label |
|---|---|
| ⏱ | Duration |
| 📌 | Context / Objective |
| 👤 | My Role |
| ⚡ | Challenge |
| ⚙️ | Execution |
| 📈 | Results |

Results use `.pf-row-results` (grey background box) with `.pf-check-row` checkmark rows and `<strong>` for bold metrics.

---

## About Section Tabs

Tab order (left to right):
1. Professional experiences (data-tab="tab-experience")
2. Tools & Skills (data-tab="tab-skills")
3. What I'm Looking For (data-tab="tab-looking")

Timeline entries in "Professional experiences" use:
- `.timeline-desc strong { color: var(--blue) }` for bold blue sub-headers
- Role title inline with company name (comma-separated, no separate tag)

---

## Known Issues / Gotchas

- **PPTX EMU coordinates are unreliable** for device frame positioning. Always re-derive from pixel analysis of the actual PNG if frame positions need to change (see script in conversation history that scans alpha channel from image center outward).
- **`image30.png` laptop frame uses a transparent screen cutout** (not white fill). Same for tablet and mobile frames. Do not use white-pixel detection to find screen bounds — use alpha-channel scan from center.
- **Google Slides → PPTX export shifts object positions.** If working from the PPTX ZIP directly, distrust all EMU coordinates for overlay/frame objects.
- **All email CTAs use `hello@anjanigupta.com`** — not the old gmail address.

---

## Workflow Preferences

- Make edits with the `Edit` tool (not bash sed/awk)
- For bulk HTML transformations across many repeated patterns, Python scripts via Bash are acceptable
- For pixel analysis of PNG files: use PIL (`from PIL import Image`) — install with `python3 -m pip install Pillow` if needed
- For PDF reading: use PyMuPDF (`import fitz`) — install with `python3 -m pip install pymupdf` if needed
- Always read a section of the file before editing it
- Do not add comments, docstrings, or unnecessary refactoring unless asked
