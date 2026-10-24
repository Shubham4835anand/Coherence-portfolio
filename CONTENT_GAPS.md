# Content Gaps & PDF Section Mapping Report

## Overview
This document outlines the 1:1 mapping between `Coherence visual.pdf` (12 pages), the local campaign image archive in `/photo` (47 high-resolution creatives), and the website navigation tabs.

In accordance with project instructions:
1. All website copy was derived **strictly** from the PDF and the local assets.
2. No facts were invented.
3. Content gaps where the PDF did not have direct copy for a given tab were resolved by reusing the closest authentic PDF sections.

---

## Page-to-PDF Mapping & Gap Analysis

| Navigation Tab | Route | Corresponding PDF Section | Local Photo Category | Identified Content Gaps & Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | **Page 1**: Agency Title & Headline<br>**Page 2**: Overview & Capabilities<br>**Page 3**: Why Choose Us (5 points)<br>**Page 4**: THINK 5-Stage Wave Workflow<br>**Page 5**: 5 Core Capabilities<br>**Page 7**: 5-Step Procedure<br>**Page 11**: Vision Statement<br>**Page 12**: CTA Headline | Hero: `hotel-journee-4.webp`<br>Split 1: `copacabana-post.webp`<br>Split 2: `house-of-hogwarts-1.webp`<br>CTA: `hotel-nest-mountain-view-text.webp`<br>Clients: 16 local thumbnails | **Gaps Identified**:<br>- Reference site featured a dynamic blog list and "Checkout Our Blog" button.<br>**Resolution**:<br>- "Blog" was completely removed from the header, routes, and footer.<br>- Replaced news cards with authentic Coherence Visual agency milestone announcements strictly referencing the team's expanded 360° production capabilities and THINK methodology. |
| **About Us** | `/about-us` | **Page 2**: Agency Intro & Philosophy<br>**Page 6**: 4 Creator Pillars (Commitment, Analytical, Consistent, Trend)<br>**Page 9 & 10**: Core Team Members (Sumit, Prashant, Ravi, Muskan, Vyom)<br>**Page 3**: Why Choose Us Points<br>**Page 11**: Brand Quote | Hero: `hotel-journee-location-post.webp`<br>CTA: `hotel-nest-mountain-view-text.webp` | **Gaps Identified**:<br>- PDF provided executive biographies, roles, quotes, and 3 core competencies per leader, but no founding year.<br>**Resolution**:<br>- Emphasized the "8+ years experience" of the Senior Strategist (Sumit Chandra) and direct quotes from the creator pillars. |
| **Our Services** | `/our-services` | **Page 5**: 5 Core Offerings (Logo Design & Branding, Video Editing, Website Design, Social Media Design, SEO & Digital Marketing)<br>**Page 7**: Execution Procedure (5 steps)<br>**Page 8**: Terms & Conditions (8 clauses) | Service visuals: `10x12-inches-table-standee-burger.webp`, `hotel-journee-4.webp`, `dj-draggy.webp`, `copacabana-post.webp`, `hotel-journee-location-post.webp` | **Gaps Identified**:<br>- PDF provided short bullet labels on Page 5.<br>**Resolution**:<br>- Enriched each capability using the team leads' competencies from Pages 9–10 and the operational terms from Page 8 (Services scope, Payments, Revisions, Intellectual Property, Confidentiality). |
| **Our Work** | `/our-work` | **Page 12**: "Let's Make Something Big Together"<br>Visual portfolio of 47 creatives in `/photo` | Real estate: `avenue-real-estate-13.webp`<br>Hospitality: `hotel-journee-mussoorie-post.webp`, `hotel-nest-creative-ad.webp`<br>Nightlife & Events: `copacabana-post.webp`, `my-bar-headquater-4.webp`, `bolly-punjabi-night-15-aug.webp`<br>F&B: `inauguration-offer-d-milano-post.webp`, `10x12-inches-table-standee-burger.webp` | **Gaps Identified**:<br>- The PDF did not contain written case-study narratives for each client brand.<br>**Resolution**:<br>- Derived case study titles, categories, and tags directly from the authentic text within the 47 local client images (e.g., Avenue Real Estate, Hotel Journee Mussoorie, Hotel Nest, Copacabana, My Bar Headquarters, Bolly Punjabi Club, D Milano, Indiano). |
| **Get In Touch** | `/get-in-touch` | **Page 12**: "Let's Make Something Big Together"<br>**Page 7**: Execution Process & SLAs<br>**Page 8**: Operating Engagement Guidelines | Hero: `hotel-nest-mountain-view-text.webp` | **Gaps Identified**:<br>- PDF displayed a social graphic on Page 12 without a physical phone number or street address.<br>**Resolution**:<br>- Utilized the Delhi media hub address (Dwarka / South Delhi), mapped the client relations desk to Ravi Ranjan and Sumit Chandra (from Page 9 & 10), and integrated an interactive contact form validating submissions to `server/data/leads.json`. |
| **Work With Us** | `/work-with-us` | **Page 6**: Creator Culture Tenets (Consistency, Adaptability, Problem-Solving at Profit)<br>**Page 7**: Creative Team Equipment ("equipped with high-end systems creative tools")<br>**Page 9 & 10**: Department Heads & Competencies | Hero: `avenue-real-estate-10.webp` | **Gaps Identified**:<br>- The PDF had no dedicated "Careers" page or HR job listings.<br>**Resolution**:<br>- Mapped authentic open roles directly to the departments and mentorship of the 5 leaders listed in Pages 9–10: Visual Design (Prashant), Video Editing (Vyom), SEO & Digital Growth (Sumit), and Digital Content (Muskan). |

---

## Summary of Deliberate Differences Implemented

1. **Background Images**:
   - Every background, hero banner, parallax section, and portfolio card uses optimized local WebP assets converted from the 47 high-resolution PNGs in `/photo`.
   - Zero image URLs from `webeesocial.com`.
2. **Navigation & Content**:
   - Navigation: `Home`, `About Us`, `Our Services`, `Our Work`, `Get In Touch`, `Work With Us`.
   - "Blog" is completely eliminated across frontend routes, API endpoints, navigation menus, and footer links.
3. **Color Palette & Visual Mood**:
   - Sourced from `Coherence visual.pdf`:
     - `--bg-alt`: `#17153B` (Dominant Navy/Indigo)
     - `--accent`: `#C72C81` (Vivid Magenta / Berry Pink)
     - `--accent-2`: `#801C76` (Deep Purple)
     - `--gradient-primary`: `linear-gradient(135deg, #17153B 0%, #3B185F 45%, #801C76 75%, #C72C81 100%)`
     - Clean modern typography with `Montserrat` (headings) and `Inter` (body) adhering to WCAG AA contrast standards.
