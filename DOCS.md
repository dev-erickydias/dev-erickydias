# Portfolio Documentation

Complete technical documentation for the Ericky Dias portfolio project.

**Live:** [dev-erickydias.vercel.app](https://dev-erickydias.vercel.app)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Environment Variables](#environment-variables)
6. [Pages & Routing](#pages--routing)
7. [Components](#components)
8. [Hooks](#hooks)
9. [API Integration](#api-integration)
10. [Styling System](#styling-system)
11. [SEO & Metadata](#seo--metadata)
12. [Accessibility](#accessibility)
13. [Performance](#performance)
14. [Security](#security)
15. [Deployment](#deployment)
16. [Scripts](#scripts)
17. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.5.14 | Framework (App Router, SSR, ISR) |
| React | 18 | UI library |
| Supabase | 2.100.0 | Database (contact form submissions) |
| next/font | Built-in | Self-hosted Google Fonts (DM Sans, Playfair Display, JetBrains Mono, Caveat) |
| next/image | Built-in | Automatic image optimization (WebP/AVIF) |
| ESLint | 8 | Code linting |

---

## Architecture

```
Portfolio (Next.js 15 App Router)
|
|-- Server Components (SSR, SEO, metadata)
|   |-- layout.js (root layout, fonts, JSON-LD, OG tags)
|   |-- about/page.js
|   |-- experience/page.js
|   |-- projects/page.js
|   |-- contact/page.js
|   |-- robots.js (auto-generated robots.txt)
|   |-- sitemap.js (auto-generated sitemap.xml)
|
|-- Client Components ("use client")
|   |-- ClientLayout.jsx (scroll reveal, nav scroll hooks)
|   |-- NavMenu.jsx (mobile menu state)
|   |-- Header.jsx (hero section with download CV)
|   |-- About.jsx (profile image + download CV)
|   |-- Contact.jsx (form state + Supabase)
|   |-- Projects.jsx (API fetch + modal state)
|   |-- ProjectModal.jsx (dialog with focus trap)
|
|-- Server Components (no "use client")
|   |-- Hero.jsx (tech marquee)
|   |-- Skills.jsx (progress bars)
|   |-- Experience.jsx (timeline)
|   |-- Footer.jsx (links)
|   |-- ContactExtra.jsx (info cards)
|
|-- API Routes
|   |-- /api/github (GitHub repos proxy with caching)
|
|-- External Services
|   |-- GitHub API (via api-pearl-nine-29.vercel.app)
|   |-- Supabase (contact form storage)
|
|-- Styling
    |-- CSS with BEM naming (src/blocks/*.css)
    |-- CSS custom properties (design tokens)
    |-- Scroll reveal animations (IntersectionObserver)
```

---

## Project Structure

```
src/
|-- app/
|   |-- layout.js              Root layout (fonts, metadata, JSON-LD)
|   |-- page.js                Home page (client: fetches featured projects)
|   |-- about/page.js          About page (server component + metadata)
|   |-- experience/page.js     Experience page (server component + metadata)
|   |-- projects/page.js       Projects page (server component + metadata)
|   |-- contact/page.js        Contact page (server component + metadata)
|   |-- robots.js              Auto-generated robots.txt
|   |-- sitemap.js             Auto-generated sitemap.xml
|   |-- api/
|       |-- github/route.js    GitHub API proxy endpoint
|
|-- components/
|   |-- ClientLayout.jsx       Client wrapper (hooks: scroll reveal, nav scroll)
|   |-- NavMenu.jsx            Responsive navigation with hamburger menu
|   |-- Header.jsx             Hero section with CTA and social links
|   |-- Hero.jsx               Tech stack marquee animation
|   |-- About.jsx              About section with profile photo
|   |-- Skills.jsx             Skills grid with progress bars
|   |-- Experience.jsx         Professional timeline + education + languages
|   |-- Projects.jsx           Project cards grid (fetches from GitHub API)
|   |-- ProjectModal.jsx       Accessible modal dialog for project details
|   |-- Contact.jsx            Contact form (saves to Supabase)
|   |-- ContactExtra.jsx       Additional contact info cards + social links
|   |-- Footer.jsx             Footer with navigation and social links
|
|-- hooks/
|   |-- useScrollReveal.js     IntersectionObserver + MutationObserver for animations
|   |-- useNavScroll.js        Navbar background change on scroll
|
|-- utils/
|   |-- supabase.js            Supabase client initialization
|   |-- cvDownLoade.js         CV PDF download handler
|
|-- blocks/                    CSS stylesheets (BEM naming)
    |-- globals.css            Reset, tokens, animations, utilities
    |-- nav__menu.css          Navigation styles
    |-- header.css             Hero section styles
    |-- hero.css               Marquee styles
    |-- about.css              About section styles
    |-- skills.css             Skills grid styles
    |-- experience.css         Timeline styles
    |-- project.css            Project cards + modal + skeleton styles
    |-- contact.css            Contact form styles
    |-- footer.css             Footer styles
    |-- pages.css              Page header styles

public/
|-- favicon.svg                SVG favicon
|-- favicon.ico                ICO fallback
|-- apple-touch-icon.png       Apple touch icon
|-- site.webmanifest           PWA manifest
|-- erickynew.jpg              Profile photo (About section)
|-- Ericky_Dias_CV_EN_2026.pdf CV download
|-- image/
    |-- header_image.png       Hero photo
    |-- linkedin.svg           Social icon
    |-- github.svg             Social icon
    |-- instagram.svg          Social icon
    |-- htmlimg.svg            Tech marquee icon
    |-- css.svg                Tech marquee icon
    |-- javascript.svg         Tech marquee icon
    |-- nextjs.svg             Tech marquee icon
    |-- react.svg              Tech marquee icon
```

---

## Setup & Installation

**Prerequisites:** Node.js 18.17+, npm

```bash
# 1. Clone
git clone https://github.com/dev-erickydias/dev-erickydias
cd dev-erickydias

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run development server
npm run dev

# Open http://localhost:3000
```

---

## Environment Variables

Create `.env.local` from `.env.example`:

```env
# Supabase (required for contact form)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# GitHub Token (optional - increases rate limit from 60 to 5000 req/h)
# Generate at: https://github.com/settings/tokens (no scope needed for public repos)
GITHUB_TOKEN=your_github_token
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for contact form) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (for contact form) | Supabase anonymous key |
| `GITHUB_TOKEN` | No | GitHub API rate limit increase |

---

## Pages & Routing

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `app/page.js` | Client | Home with featured projects from API |
| `/about` | `app/about/page.js` | Server | About + Skills sections |
| `/experience` | `app/experience/page.js` | Server | Timeline + Education + Languages |
| `/projects` | `app/projects/page.js` | Server | Full project grid from GitHub API |
| `/contact` | `app/contact/page.js` | Server | Contact form + info cards |
| `/api/github` | `app/api/github/route.js` | API | GitHub repos proxy |
| `/robots.txt` | `app/robots.js` | Generated | Search engine rules |
| `/sitemap.xml` | `app/sitemap.js` | Generated | Sitemap for SEO |

---

## Components

### Client Components (interactive)

| Component | State | Purpose |
|-----------|-------|---------|
| `ClientLayout` | hooks only | Wraps app with scroll reveal + nav scroll |
| `NavMenu` | `menuOpen` | Responsive nav with hamburger, keyboard accessible |
| `Header` | none (uses `handleDownload`) | Hero section with CTA buttons and social links |
| `About` | none (uses `handleDownload`) | About section with profile image |
| `Contact` | `status`, `formData` | Contact form that saves to Supabase |
| `Projects` | `projects`, `loading`, `error`, `selectedProject` | Fetches repos from API, renders cards grid |
| `ProjectModal` | `closeRef` | Accessible dialog (`role="dialog"`, `aria-modal`, focus management) |

### Server Components (static)

| Component | Purpose |
|-----------|---------|
| `Hero` | Tech stack marquee with `next/image` |
| `Skills` | Skill categories with progress bars (`role="progressbar"`) |
| `Experience` | Timeline with `<article>` + `<time>` + `<dl>` semantic HTML |
| `Footer` | Navigation + social links with `<nav aria-label>` |
| `ContactExtra` | Info cards + social links |

---

## Hooks

### `useScrollReveal`

Animates elements on scroll using IntersectionObserver. Also watches for dynamically added elements (after API fetch) using MutationObserver.

**Selectors:** `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`

**Behavior:**
- Elements start with `opacity: 0` and a transform
- When visible in viewport (10% threshold), adds `.visible` class
- On page change (pathname), resets and re-observes all elements
- MutationObserver catches elements added after initial render

### `useNavScroll`

Adds `.scrolled` class to `.nav` when `window.scrollY > 50px`. Uses `passive: true` for performance.

---

## API Integration

### GitHub Projects API

**External API:** `https://api-pearl-nine-29.vercel.app/api/github`

**Usage in components:**

```
Projects page:  ?user=dev-erickydias&sort=updated&order=desc&per_page=100
Home page:      ?user=dev-erickydias&sort=updated&order=desc&per_page=3
```

**Sorting:** `sort=updated` ensures the most recently updated project appears first.

**Response structure:**
```json
{
  "user": "dev-erickydias",
  "pagination": { "page": 1, "per_page": 100, "total_items": 11, "has_next": false },
  "stats": { "total_repos": 11, "total_stars": 6, "total_forks": 2, "languages": [...] },
  "projects": [
    {
      "id": 705655489,
      "name": "bikeCraft-Origamid",
      "description": "...",
      "url": "https://github.com/dev-erickydias/...",
      "homepage": "https://....vercel.app",
      "language": "HTML",
      "topics": [],
      "stats": { "stars": 1, "forks": 0 },
      "dates": { "updated_at": "2026-03-22T08:30:17Z" }
    }
  ]
}
```

**Data mapping (Projects.jsx):**

| API Field | Component Field | Notes |
|-----------|----------------|-------|
| `name` | `name` | Formatted: hyphens to spaces, capitalized |
| `description` | `description` | Fallback: "No description available." |
| `language` + `topics` | `technologies` | Combined array |
| `language` | `category` | Fallback: "Other" |
| `stats.stars > 0` | `isFeatured` | Featured badge |
| `homepage` | `deploy` | Live site URL (nullable) |
| `url` | `repository` | GitHub URL |
| `is_archived` | `status` | "archived" or "active" |

### Local GitHub API Route (`/api/github`)

Full-featured proxy to GitHub's API with:

**Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | string | required | GitHub username |
| `language` | string | - | Filter by language |
| `topic` | string | - | Filter by topic |
| `search` | string | - | Search name/description |
| `sort` | string | `updated` | updated, created, pushed, name, stars, forks, size |
| `order` | string | `desc` | desc, asc |
| `page` | number | 1 | Page number |
| `per_page` | number | 10 | Items per page (max 100) |
| `include_forks` | boolean | false | Include forked repos |
| `include_archived` | boolean | false | Include archived repos |
| `stats_only` | boolean | false | Return only aggregate stats |

**Features:** Automatic pagination, ISR (1h revalidation), optional `GITHUB_TOKEN` for higher rate limits.

### Supabase (Contact Form)

**Table:** `contact_submissions`

**Fields:** `first_name`, `last_name`, `email`, `services` (subject), `message`

**Flow:** Form submit -> validate -> insert to Supabase -> show success/error toast (auto-dismiss 5s)

---

## Styling System

### Design System: "Atelier Noir"

Dark theme with warm gold accent. CSS custom properties defined in `globals.css`.

**Key tokens:**

| Token | Value | Purpose |
|-------|-------|---------|
| `--accent` | `#D4A853` | Primary gold accent |
| `--bg-primary` | `#08080A` | Main background |
| `--bg-card` | `#18181C` | Card background |
| `--text-primary` | `#EDE8DD` | Main text (warm cream) |
| `--text-secondary` | `#8C8A8E` | Secondary text |
| `--font-display` | Playfair Display | Headings (serif) |
| `--font-body` | DM Sans | Body text (sans-serif) |
| `--font-mono` | JetBrains Mono | Code, labels, tags |

**Light theme:** Auto-switches via `@media (prefers-color-scheme: light)`.

### BEM Naming

```css
.block { }
.block__element { }
.block--modifier { }
```

### Animations

| Class | Effect | Trigger |
|-------|--------|---------|
| `.reveal` | Fade up (28px) | Scroll into view |
| `.reveal-left` | Slide from left | Scroll into view |
| `.reveal-right` | Slide from right | Scroll into view |
| `.reveal-scale` | Scale from 0.93 | Scroll into view |
| `.stagger-children` | Delays children 0.05s apart | Parent class |

### Responsive Breakpoints

| Device | Breakpoint |
|--------|-----------|
| Mobile | Base (no media query) |
| Tablet | `min-width: 768px` |
| Desktop | `min-width: 1024px` |
| Large | `min-width: 1200px` |
| XL | `min-width: 1440px` |

---

## SEO & Metadata

### Per-page metadata

Each page exports its own `metadata` object with unique `title`, `description`, and `openGraph`.

**Title template:** `%s | Ericky Dias` (e.g., "About | Ericky Dias")

### Global SEO features

| Feature | Implementation |
|---------|---------------|
| Open Graph | title, description, image, url, locale, type |
| Twitter Cards | summary_large_image |
| JSON-LD | Schema.org Person with sameAs, worksFor, knowsAbout |
| Canonical URLs | Per-page `alternates.canonical` |
| robots.txt | Auto-generated, blocks `/api/` |
| sitemap.xml | Auto-generated with all 5 pages |
| Meta robots | `index, follow, max-image-preview:large` |
| Keywords | Targeted developer/portfolio terms |

---

## Accessibility

| Feature | Implementation |
|---------|---------------|
| Skip link | "Skip to main content" visible on focus |
| Semantic HTML | `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<time>`, `<dl>` |
| ARIA labels | All navigation, social links, interactive elements |
| Modal dialog | `role="dialog"`, `aria-modal`, `aria-labelledby`, focus on open |
| Keyboard nav | Project cards: Enter/Space to open. ESC to close modal. Hamburger: proper `<button>` |
| `aria-expanded` | Hamburger menu toggle |
| `aria-current="page"` | Active nav link |
| `aria-hidden="true"` | Decorative SVGs and icons |
| `role="progressbar"` | Skill bars with `aria-valuenow` |
| `role="alert"` | Error messages |
| `prefers-reduced-motion` | Disables all animations and transitions |
| `:focus-visible` | Global gold outline for keyboard users |

---

## Performance

| Optimization | Details |
|-------------|---------|
| `next/font` | Self-hosted fonts (no external Google Fonts request) |
| `next/image` | WebP/AVIF auto-conversion, lazy loading, responsive sizes |
| Server Components | About, Skills, Experience, Footer render on server (zero JS) |
| ISR | GitHub API cached for 1 hour |
| Compression | Enabled in `next.config.mjs` |
| `poweredByHeader: false` | Removes X-Powered-By header |
| Preconnect | API endpoint preconnected in `<head>` |
| Skeleton loading | Shimmer animation while projects load |
| MutationObserver | Reveal animations work for dynamically loaded content |

---

## Security

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| API Cache-Control | `public, s-maxage=3600, stale-while-revalidate=86400` |

- External links use `rel="noopener noreferrer"`
- No secrets in client-side code
- Supabase uses anonymous key (RLS enforced)
- GitHub token server-side only (not exposed to client)
- npm audit: **0 vulnerabilities**

---

## Deployment

### Vercel (recommended)

```
GitHub push to main
       |
  Vercel CI/CD
       |
  npm install -> next build -> Deploy to Edge
```

**Environment variables to set in Vercel dashboard:**

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
GITHUB_TOKEN=...
```

### Manual deployment

```bash
npm run build    # Creates optimized production build
npm start        # Starts production server on port 3000
```

---

## Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint check
```

---

## Troubleshooting

**Projects not showing / invisible cards:**
- The scroll reveal hook requires elements to enter the viewport. If cards load after the initial observer scan, the `MutationObserver` in `useScrollReveal.js` catches them. If still invisible, check that `.reveal.visible` CSS rule sets `opacity: 1`.

**Contact form not submitting:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local`
- Check Supabase dashboard for RLS policies on `contact_submissions` table

**GitHub API rate limited:**
- Set `GITHUB_TOKEN` in `.env.local` to increase from 60 to 5000 requests/hour
- The external API at `api-pearl-nine-29.vercel.app` has its own rate limit of 5000 req/h

**Build errors after dependency changes:**
- Delete `.next` and `node_modules`, then reinstall:
  ```bash
  rm -rf .next node_modules
  npm install
  npm run build
  ```

**Fonts not loading:**
- Fonts are self-hosted via `next/font`. CSS variables `--font-body-nf`, `--font-display-nf`, `--font-mono-nf` must be set on the `<html>` element (handled by `layout.js`).

---

## License

MIT

---

**Built by [Ericky Dias](https://github.com/dev-erickydias)**
