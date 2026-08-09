<div align="center">

# Yamini Patray — Portfolio

**Global Talent Acquisition Specialist · New Delhi, India**
An award-style, fully static portfolio — editorial design, cinematic motion, zero dependencies.

[Live Site](https://yamini.github.io/) · [LinkedIn](https://www.linkedin.com/in/yamini-patray/) · [Email](mailto:iamyaminipatray@gmail.com)

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_(Vanilla)-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-Fraunces_·_Space_Grotesk-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)

![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-E0532B?style=for-the-badge)
![No Build Step](https://img.shields.io/badge/Build_Step-None-E0532B?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile--first-E0532B?style=for-the-badge)
![Reduced Motion](https://img.shields.io/badge/a11y-Prefers--Reduced--Motion-E0532B?style=for-the-badge)

</div>

---

## Overview

A single-page portfolio presenting **7+ years of talent acquisition experience** across RPO,
consulting and global enterprise environments — spanning APAC, EMEA and India. Designed as an
editorial, Awwwards-inspired experience: dark/light rhythm, serif display typography and
physics-feeling motion, all hand-rolled with no frameworks.

## Features

**Design**
- Editorial type system — Fraunces (variable serif) + Space Grotesk
- Warm ink / cream palette with vermilion accent, film-grain texture overlay
- Tilted vermilion marquee + dual counter-scrolling outline-text domain strips
- Custom "YP" monogram with orbiting accent, SVG favicon

**Motion & UX**
- Live talent-network constellation canvas in the hero (pointer-reactive)
- Character-stagger hero title, masked line-reveal section headings
- Custom cubic-eased anchor scrolling, scroll progress bar, hero parallax exit
- Scroll-velocity-reactive marquees, scroll-triggered staggered reveals
- Animated stat counters, accordion career timeline with auto-scroll
- Custom cursor with contextual states, magnetic buttons, shrinking blur header
- Full-screen mobile menu with staggered link entrance

**Engineering**
- Pure HTML/CSS/JS — no frameworks, no bundler, no dependencies
- Mobile-first responsive (fluid `clamp()` typography, touch-safe targets, `100svh` hero)
- `prefers-reduced-motion` respected across every animation
- SEO: meta/OG tags + JSON-LD `Person` schema, semantic landmarks, skip link
- Canvas pauses off-screen and on hidden tabs; rAF-throttled scroll handlers

## Tech Stack

| Layer     | Technology |
| --------- | ---------- |
| Markup    | Semantic HTML5, JSON-LD structured data |
| Styling   | Modern CSS — custom properties, grid, `clamp()`, container-relative units |
| Scripting | Vanilla ES2020+ JavaScript (IIFE, IntersectionObserver, rAF, Canvas 2D) |
| Type      | Fraunces & Space Grotesk via Google Fonts |
| Hosting   | GitHub Pages (static, no Jekyll processing needed) |

## Project Structure

```
yamini.github.io/
├── index.html          # Single-page site — all sections, SEO + JSON-LD
├── styles.css          # Design system, layout, animations, responsive rules
├── script.js           # Interactions: reveals, canvas, marquees, cursor, scrolling
├── favicon.svg         # YP monogram favicon
├── Yamini_profile.pdf  # Source resume (content reference)
└── README.md
```

## Run Locally

No build step required — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

Any static server works equally well:

```bash
npx serve .
```

## Deployment

The repository root is deployment-ready for **GitHub Pages**:

1. Push to the `main` branch of `yamini.github.io`
2. Pages serves `index.html` automatically at `https://yamini.github.io/`

## Browser Support

Latest Chrome, Edge, Firefox and Safari (iOS + macOS). Graceful degradation for
reduced-motion preferences, coarse pointers (no custom cursor/magnetic effects)
and older browsers (static marquees, instant reveals).

---

<div align="center">
<sub>© Yamini Patray · Crafted with care in New Delhi</sub>
</div>
