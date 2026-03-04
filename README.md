# Anjani Gupta — Growth Portfolio

A static personal portfolio website for Anjani Gupta, a growth & marketing leader with 7+ years of experience at Google and Somnee. The site showcases campaigns, strategy work, experiments, and design assets in an interactive, visually rich format.

**Live hosting:** Namecheap (static file hosting)

---

## Site Structure

The entire site is a single-page application (`index.html`) with smooth-scroll navigation between sections.

### Sections (in order)

| Section ID | Nav Label | Description |
|---|---|---|
| `#hero` | — | Full-screen intro with name, title, 3-paragraph bio, and two CTAs (Email + LinkedIn) |
| `#about` | About | Tabbed section: Professional Experiences timeline, Tools & Skills, What I'm Looking For |
| `#impact` | Impact | Business impact metrics for Somnee (vertical metric rows) and Google (3 sub-team sections) |
| `#projects` | Projects | Top 4 career projects in full-width cards with structured field rows (duration, context, role, challenge, execution, results) |
| `#somnee` | Somnee | Filterable portfolio grid: Email, Messaging & Positioning, Social & Ads, Strategy, Personal Writing |
| `#google` | Google | Filterable portfolio grid: Campaign, Strategy, Research, Targeted Promos, Reporting, Web Testing |
| `#contact` | Get in touch | Footer with email CTA and LinkedIn link |

---

## File Structure

```
anjani-portfolio/
├── index.html              # Full site — single HTML file
├── preview.html            # Scratch/preview file (not production)
├── README.md               # This file
├── CLAUDE.md               # AI assistant instructions and context
└── assets/
    ├── css/
    │   └── style.css       # All styles (single stylesheet)
    ├── js/
    │   └── main.js         # All interactivity (mobile nav, tabs, filters, lightbox, scroll highlight)
    └── media/              # 122 image/GIF/PNG files extracted from source PPTX
        ├── image30.png     # Device frame: laptop (2048×1207)
        ├── image34.png     # Device frame: tablet portrait (900×1152)
        ├── image97.png     # Device frame: mobile/phone (1290×2048)
        ├── image33.gif     # Somnee: Welcome email GIF
        ├── image37.gif     # Somnee: Affiliate guide GIF
        ├── image31.gif     # Somnee: Gen2 feature-benefits GIF
        ├── image81.gif     # Somnee: 2025 growth strategy deck GIF
        └── image*.png/gif  # All other portfolio assets
```

---

## Key Design Decisions

### Source of truth
All content originates from a 46-slide Google Slides deck (exported as PPTX). Text, GIFs, images, and layout decisions all trace back to that deck.

### Device frames
Portfolio GIFs are displayed inside device frame overlays (laptop, tablet, or phone) sourced directly from the PPTX. The GIF is absolutely positioned over a transparent-screen frame PNG using CSS percentage coordinates derived by pixel-scanning the actual PNG files.

Frame assignments:
- **Tablet** (`image34.png`): Welcome email GIF (`image33.gif`)
- **Mobile** (`image97.png`): ISBW Mobile Figma GIF (`image128.gif`)
- **Laptop** (`image30.png`): All other GIFs (affiliate guide, strategy decks, Google campaign/research/strategy/reporting assets)

### Card layout
All portfolio cards use `display: flex; flex-direction: column` with `order: -1` on `.card-body`, so the tag/title/description always renders above the media — regardless of HTML source order.

### Color palette
| Variable | Value | Usage |
|---|---|---|
| `--lime` | `#D9FEA9` | Hero background, contact footer background |
| `--blue` | `#519BF7` | Links, accents, tags, timeline subheaders |
| `--dark` | `#111111` | Body text, headings |
| `--gray` | `#6b7280` | Secondary text |
| `--border` | `#e5e7eb` | Card borders, dividers |

### Typography
Inter (Google Fonts), weights 300–800. No other typefaces used.

---

## JavaScript Behaviors

- **Mobile nav:** Hamburger toggles `.nav-links.open`; auto-closes on link click
- **About tabs:** `.tab-btn[data-tab]` shows matching `.tab-panel[id]`
- **Portfolio filters:** `.filter-btn[data-group][data-category]` shows/hides `.portfolio-card[data-group][data-category]`
- **Lightbox:** Click any `.img-gallery img` or `.ab-cell img` to open full-screen; close via button, backdrop click, or Escape key
- **Active nav highlight:** IntersectionObserver watches all `section[id]` and `footer[id]`; highlights the matching nav link

---

## Contact

- **Email:** hello@anjanigupta.com
- **LinkedIn:** linkedin.com/in/anjanigupta
