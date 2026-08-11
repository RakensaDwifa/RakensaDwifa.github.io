# Personal Portfolio Website

Portfolio website of **Rakensa Dwifa Noverdiastra** — Engineering Physics student at Telkom University Bandung & self-taught web developer.

🌐 Live: https://rakensadwifa.github.io/

## Tech Stack

- HTML5 (semantic markup)
- Tailwind CSS v4 (via `@tailwindcss/cli`)
- Vanilla JavaScript (no framework)
- AOS (Animate On Scroll) — self-hosted
- Google Fonts (Inter)
- Contact form backed by Google Apps Script (Google Sheets)
- Hosted on GitHub Pages

## Project Structure

```
├── index.html          # Single-page site (hero, about, timeline, portfolio, skills, contact)
├── src/
│   ├── input.css       # Tailwind source (custom styles + @apply)
│   └── output.css      # Compiled CSS (committed for GitHub Pages)
├── dist/
│   ├── css/aos.css     # Self-hosted AOS styles
│   └── js/             # script.js (site logic) + aos.js (library)
├── img/                # Optimized images (WebP)
├── cv/                 # CV PDF (Rakensa-Dwifa-CV.pdf)
├── robots.txt
└── sitemap.xml
```

## Development

Requires Node.js (v18+).

```bash
npm install
# watch mode (dev)
npm run dev
# one-off build (minified)
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --minify
```

Commit `src/output.css` along with your changes — GitHub Pages serves the static files directly.

## Contact Form

The form posts to a Google Apps Script Web App (`dist/js/script.js` → `scriptURL`), which stores submissions in a Google Sheet. Includes honeypot anti-spam and client-side validation.

## Analytics (GA4)

GA4 snippet is in `index.html` with a placeholder Measurement ID (`G-XXXXXXXXXX`). Replace it with your own ID from [Google Analytics](https://analytics.google.com/).

## TODO

- [ ] Replace `cv/Rakensa-Dwifa-CV.pdf` with the actual CV file
- [ ] Fill in real years in the Education & Experience timeline (`[2024]` placeholders)
- [ ] Add more portfolio projects (with live links + repo links)
- [ ] Set GA4 Measurement ID

---

Made with ❤️ by Rakensa Dwifa.
