# Coherence Visual — Digital Marketing Agency Website

A full-stack marketing website cloned 1:1 from the layout, spacing, typography scale, header behavior, card treatments, client grid, testimonial slider, and footer of [WeBeeSocial](https://webeesocial.com/), refactored with the visual identity, color palette, and content from `Coherence visual.pdf` and local campaign creatives from `/photo`.

---

## Key Highlights & Differences from Reference

1. **Background & Hero Images**:
   - Replaced all reference backgrounds, parallax banners, and section images with optimized local WebP assets converted from the 47 PNGs in `/photo`.
   - **Zero** external image URLs from `webeesocial.com`.
2. **Navigation & Content**:
   - Navigation: **Home**, **About Us**, **Our Services**, **Our Work**, **Get In Touch**, **Work With Us**.
   - **Blog is completely excluded** from navigation, routes, cards, API, and footer.
   - All page text, headings, statistics, workflows, and leadership profiles are strictly populated from `Coherence visual.pdf`.
3. **Color Palette & Visual Identity**:
   - Extracted directly from the PDF:
     - `--bg-alt`: `#17153B` (Deep Navy / Indigo)
     - `--accent`: `#C72C81` (Vivid Magenta / Berry Pink)
     - `--accent-2`: `#801C76` (Deep Purple)
     - `--gradient-primary`: `linear-gradient(135deg, #17153B 0%, #3B185F 45%, #801C76 75%, #C72C81 100%)`
   - Typography: Google Fonts `Montserrat` (headings, navigation, buttons) and `Inter` (body) adhering to WCAG AA contrast.

---

## Tech Stack

- **Frontend**:
  - React 18 + Vite (ES modules, fast HMR)
  - React Router DOM v6
  - Swiper for testimonial slider
  - Lucide React & custom SVG icons
  - Vanilla CSS with CSS custom properties (`:root`)
- **Backend**:
  - Node.js + Express
  - Helmet for security headers
  - CORS with configurable origin
  - Compression for Gzip response speed
  - Express Rate Limit for DDoS and spam protection
  - File-based JSON data store (`server/data/content.json` and `server/data/leads.json`)

---

## Project Structure

```
marketing-coherence/
├── client/                     # Vite React Frontend
│   ├── index.html              # HTML entry with Montserrat & Inter fonts
│   ├── vite.config.js          # Vite config with /api proxy to port 5000
│   ├── package.json
│   └── src/
│       ├── assets/
│       │   └── photo/          # Optimized WebP images & thumbnails (47 creatives)
│       ├── components/
│       │   ├── Header.jsx      # Sticky/transparent header, nav & search cover
│       │   ├── Footer.jsx      # 4-column footer matching WeBeeSocial
│       │   ├── SideMenu.jsx    # Right-sliding drawer with motto & address
│       │   ├── Logo.jsx        # SVG Coherence Visual logo from PDF
│       │   ├── ClientGrid.jsx  # Client logos with "Load More" toggle
│       │   ├── TestimonialSlider.jsx # Swiper quote carousel
│       │   ├── NewsCards.jsx   # 3-column agency update cards
│       │   ├── ProcedureSteps.jsx # 5-step process from PDF Page 7
│       │   ├── ThinkProcess.jsx   # Wave workflow from PDF Page 4
│       │   ├── TeamSection.jsx    # Leadership cards from PDF Pages 9 & 10
│       │   ├── ParallaxCta.jsx    # Fixed-attachment CTA banners
│       │   └── SkeletonLoader.jsx # Async loading states
│       ├── pages/
│       │   ├── Home.jsx        # Homepage with all clone sections
│       │   ├── AboutUs.jsx     # Agency story, creator pillars & team
│       │   ├── OurServices.jsx # 5 capabilities & engagement terms
│       │   ├── OurWork.jsx     # Category-filtered portfolio grid & modal
│       │   ├── GetInTouch.jsx  # Interactive contact form & SLAs
│       │   ├── WorkWithUs.jsx  # Culture perks & open positions
│       │   └── NotFound.jsx    # 404 handler
│       ├── services/
│       │   └── api.js          # Client fetch helpers
│       ├── styles/
│       │   └── index.css       # Complete design system & tokens
│       ├── App.jsx             # Route definitions & scroll restoration
│       └── main.jsx
├── server/                     # Express API Server
│   ├── server.js               # Express application & endpoints
│   ├── package.json
│   └── data/
│       ├── content.json        # All page copy strictly from PDF
│       └── leads.json          # Form submission storage
├── photo/                      # Original raw PNG assets
├── Coherence visual.pdf        # Visual identity & content source
├── CONTENT_GAPS.md             # Gap analysis & section mapping
├── .env.example                # Environment variables template
├── optimize-images.cjs         # Batch WebP optimization utility
└── package.json                # Root concurrently runner
```

---

## Setup & Running Instructions

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### 2. Run Locally in Development Mode
To start both the Express backend (port `5000`) and the Vite React frontend (port `3000`) simultaneously:
```bash
npm run dev
```

Open your browser at:
**[http://localhost:3000](http://localhost:3000)**

### 3. Run Components Separately (Optional)
- Backend only: `npm run server`
- Frontend only: `npm run client`

### 4. Build for Production
```bash
npm run build
```
Production assets will be emitted to `client/dist`.

---

## API Endpoints

- `GET /api/nav` — Returns navigation items (Home, About Us, Our Services, Our Work, Get In Touch, Work With Us). Blog is excluded.
- `GET /api/brand` — Returns brand meta, address, contact details, and social links.
- `GET /api/content/:page` — Returns structured data for the requested page (`home`, `about-us`, `our-services`, `our-work`, `get-in-touch`, `work-with-us`). Returns 404 for `blog`.
- `POST /api/contact` — Submits a client inquiry. Validates `name`, `email`, `phone`, `service`, and `message`, rate-limits requests, and appends the lead to `server/data/leads.json`.
- `GET /api/health` — API health check.

---

## Assumptions Made

1. **Client Identity**: The agency brand is **Coherence Visual** as established in `Coherence visual.pdf`.
2. **Contact Coordinates**: The PDF references New Delhi as its primary operational base; addresses and contact points were configured to the Delhi media corridor (Dwarka / South Delhi) with contact inquiries routed to `server/data/leads.json`.
3. **Blog Removal**: All elements relating to "Blog" in the reference site (nav item, mobile link, footer link, "Checkout Our Blog" button, blog categories) were cleanly removed and replaced with agency milestone announcements and service capabilities.
4. **Work Categories**: The 47 PNG images in `/photo` represent Coherence Visual's actual portfolio across Hospitality (Hotel Journee, Hotel Nest), Real Estate (Avenue Real Estate), Nightlife & Events (My Bar Headquarters, Copacabana, Bolly Punjabi), and Dining (D Milano, Indiano).
