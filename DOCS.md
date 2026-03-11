# Ericky Dias — Portfolio Documentation

## Overview

Personal portfolio website for **Ericky Dias**, a Full Stack Developer. Built with Next.js 15 and React 18, featuring a modern design system with automatic dark/light theme support, scroll-triggered animations, glassmorphism UI, and interactive tech marquee.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | App Router, SSR, file-based routing |
| React 18 | Component architecture, hooks |
| CSS Custom Properties | Theme system (dark/light) |
| Google Fonts | Open Sans + Caveat |
| Vercel | Deployment platform |

## Project Structure

```
dev-erickydias/
├── public/
│   ├── image/           # SVG icons, profile images
│   ├── erickynew.jpg    # Profile photo
│   ├── Resume_Ericky_Dias_EN_2026.pdf
│   └── favicon.ico
├── cv/                  # CV files (EN, PT, ES)
├── src/
│   ├── app/
│   │   ├── layout.js    # Root layout, fonts, metadata
│   │   └── page.js      # Home page (client component)
│   ├── blocks/
│   │   ├── globals.css   # Design system, theme variables, animations
│   │   ├── nav__menu.css # Fixed nav, hamburger, mobile popup
│   │   ├── header.css    # Hero section, ambient glow
│   │   ├── hero.css      # Tech marquee with hover effects
│   │   ├── about.css     # Profile section, skill tags
│   │   ├── project.css   # Glassmorphism cards, modal
│   │   └── footer.css    # Social links footer
│   ├── components/
│   │   ├── NavMenu.jsx   # Fixed navigation with mobile menu
│   │   ├── Header.jsx    # Hero with social buttons
│   │   ├── Hero.jsx      # Infinite tech logo marquee
│   │   ├── About.jsx     # Bio, skills, CV download
│   │   ├── Projects.jsx  # Project card grid
│   │   ├── ProjectModal.jsx # Project detail modal
│   │   └── Footer.jsx    # Footer with socials
│   ├── hooks/
│   │   ├── useScrollReveal.js  # IntersectionObserver scroll animations
│   │   └── useNavScroll.js     # Nav shrink on scroll
│   ├── data/
│   │   └── projects.js   # Project entries
│   └── utils/
│       └── cvDownLoade.js # CV download handler
├── README.md             # Animated GitHub profile README
├── DOCS.md               # This file
└── package.json
```

## Design System

### Theme Variables

The design uses CSS custom properties with automatic dark/light switching via `prefers-color-scheme`:

- **Dark (default):** `--bg-primary: #0a0a0a`, dark cards, light text
- **Light:** `--bg-primary: #fafafa`, white cards, dark text
- **Accent:** `--accent: #0666c5` (consistent across both themes)

### Animation System

- **Scroll Reveal:** Classes `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` trigger on scroll via IntersectionObserver
- **Stagger Children:** `.stagger-children` adds cascading delays to child `.reveal` elements
- **CSS Keyframes:** `fadeInUp`, `fadeInDown`, `popIn`, `float`, `pulse`, `shimmer`, `bounceIn`, `gradientShift`, `tiltHover`, `marquee`

### Component Features

- **Nav:** Fixed with backdrop blur, shrinks on scroll, animated hamburger → X transition
- **Header:** Ambient radial glow, glass social buttons, responsive hero image
- **Tech Marquee:** Infinite scroll, pause on hover, labels appear on hover, grayscale → color transition
- **About:** Gradient border animation on image hover, skill tag pills with hover effects
- **Projects:** Glassmorphism cards with gradient border reveal, shimmer effect, numbered badges
- **Modal:** Pop-in animation, accent glow shadow, ESC/overlay close
- **Footer:** Social link icons with lift animation

### Responsive Breakpoints

- **Mobile:** < 768px (single column, hamburger nav)
- **Tablet:** ≥ 768px (two-column grid, desktop nav)
- **Desktop:** ≥ 1200px (three-column grid, wider spacing)

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Production build
npm start       # Production server
```

## CV Files

| File | Language |
|---|---|
| `cv/Resume_Ericky_Dias_EN_2026.pdf` | English |
| `cv/Resume_Ericky_Dias_PT_2026.pdf` | Portuguese |
| `cv/Resume_Ericky_Dias_ES_2026.pdf` | Spanish |

## Projects

1. **Heavens Hair** — Beauty salon landing page (Next.js)
2. **ConnectEco** — Sustainability platform (React + Next.js)
3. **CraftFood** — Food industry app (Next.js)
4. **Horse Hotel AMS** — Management system (TypeScript + Vite)
5. **SonsOfNode** — AI education platform (Python + Jupyter)
6. **CodeLab Challenge** — Technical challenge (Next.js)

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

---

*Built with care by Ericky Dias — 2026*
