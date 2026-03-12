# Krystal Ann Photography — Full Site Revamp Plan
*Synthesized from SEO, UI/UX, Copywriting, and Frontend audits*

---

## The Big Picture

The current site has solid bones (semantic HTML, good structure, warm brand) but looks like every other photography site. Three core problems:

1. **The hero buries the photography** — 87% cream overlay means visitors can barely see the photos on a *photography* website
2. **Copy is generic** — "Book a Session" everywhere, "Contact for pricing" kills conversions
3. **Visually safe-beige** — nothing catches the eye or signals "premium"

The revamp makes it feel modern, editorial, and distinctly Krystal Ann.

---

## Phase 1 — Visual Foundation (Biggest Bang)
*These changes transform the feel of the site immediately*

### 1A. Typography System
Replace the triple-font stack with a more editorial two-family system:
- **Playfair Display** (900 weight, tight tracking) for all display headlines — heavier and more striking than Cormorant Garamond
- **Pinyon Script** for accent labels — more refined than Great Vibes
- **DM Sans** for body copy — warmer and more modern than Lato

```css
font-family: 'Playfair Display', Georgia, serif;     /* display */
font-family: 'Pinyon Script', cursive;                /* script accent */
font-family: 'DM Sans', system-ui, sans-serif;        /* body */
```

H1 scale: `clamp(3rem, 6vw, 5.5rem)` at weight 900 with `letter-spacing: -0.02em` — the editorial look.

### 1B. Color Token Refresh
Keep warm/earthy soul, sharpen every token:

```css
--cream:        #F9F4EE;  /* slightly cooler, less yellow */
--cream-mid:    #EFE5D8;  /* replaces cream-dark */
--terra:        #C4714D;  /* current terracotta, +saturation */
--terra-dark:   #A05535;  /* hover states */
--terra-muted:  #D4967A;  /* tags, borders */
--copper:       #B87A50;  /* gradient accents */
--dust:         #8C7060;  /* body text warm gray */
--pine:         #4A5E52;  /* sparse complement — success states */
--ink:          #221A15;  /* replaces charcoal — deeper, warmer */
--ink-mid:      #3A2F28;  /* footer backgrounds */
```

Add a full spacing scale (`--space-1` through `--space-16`) and semantic color aliases.

### 1C. Hero — Complete Rebuild ⭐ *Highest single impact change*
The hero must show the photography. Current 87% cream wash goes away.

**New layout: Split composition**
- Left 48%: Dark `--ink` panel with diagonal clip-path cut → text on dark background in `--cream`
- Right 52%: Full-bleed photograph at 100% opacity — no overlay
- Diagonal divider: `clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%)` on the text panel

On mobile: full-bleed photo, dark gradient overlay on bottom 60%, text anchored at bottom.

**New hero headline options (pick one):**
- **Option A** *(recommended)*: "They grow so fast it's almost unfair. / *Let's make sure you don't just remember this — you can see it.*"
- **Option B**: "The chaos, the belly laughs, the kid who won't look at the camera. / *I live for all of it.*"
- **Option C**: "Omaha's your home. These are your people. / *Let's make photos that feel like it.*"

**New tagline** *(replace "Real moments. Real families.")*:
- **Option A** *(recommended)*: "Forget the pose. Just be yourselves."
- **Option B**: "They grow fast. Let's not miss it."
- **Option C**: "This moment, exactly as it is."

---

## Phase 2 — Homepage Sections
*Section-by-section modernization*

### 2A. Social Proof Marquee Strip (replaces intro strip)
Infinite-scroll ticker strip replacing "Omaha, Nebraska / Natural Light / Families":
```
[★★★★★ "Cried when I opened the gallery." — Angie]  |  [5+ Years]  |  [★★★★★ "Made me feel completely at ease." — Lana]  |  [100% Natural Light]  |  [★★★★★ "We'll book every year." — Ami]
```
CSS `animation: marquee 40s linear infinite` — pauses on hover. A major 2025 design pattern.

### 2B. Gallery Preview — Bento Grid
Replace the current asymmetric 3-row grid with a 5-cell **bento grid**:
```
[  Large Family Photo  ] [ Sports ] [ Couples ]
[        2fr           ] [  1fr  ] [   1fr   ]  → 320px row
[         "           ] [Children] [  More  ]
                                                 → 240px row
```
Total height ~572px. All images at 100% opacity. Overlay appears on hover from bottom with category label + arrow. "See Full Portfolio" becomes a typographic text link (not a button) — more editorial.

### 2C. Services — Horizontal Scroll Cards
Replace 2×2 grid with 4 tall cards (`280px × 420px`) in a horizontal scroll track. Each card: session photo at full bleed, dark gradient from bottom, text at bottom. On desktop all 4 show; on mobile/tablet they scroll horizontally with `scroll-snap`.

**Renamed packages:**
- Family → **The Family Session**
- Sports → **The Athlete Session**
- Couples & Engagement → **The Love Session**
- Children & Milestones → **The Little Moments Session**
- *(New)* Mini Sessions → **The Mini — Seasonal Portraits**

### 2D. Process Section — Dark Background
Move to `--ink` background for strong contrast rhythm. Add micro-icons above step numbers. Connect steps with animated dashed SVG line (`stroke-dashoffset` scroll animation).

### 2E. Testimonials — Upgraded
- Add ★★★★★ star ratings (in `--terra`) above each quote
- Pull-quote editing: lead with the most specific emotional sentence
- Section label: "What happened when they opened their galleries"
- Add subtle radial gradient vignette behind center quote

### 2F. Instagram Feed Strip (New — Add This)
6-cell 1:1 grid of portfolio photos between testimonials and CTA banner. On hover: Instagram logo reveals. Links to `@krystalannphoto`. Critical trust signal — clients always check Instagram before booking.

### 2G. CTA Banner
- Headline: "This season won't come back."
- Button: "Let's Do This Before They Grow Up" (replaces "Book Your Session")
- Add diagonal clip-path top edge to break the flat horizontal line

---

## Phase 3 — Inner Page Overhauls

### 3A. Portfolio Page
- **Page hero**: Full-bleed photo at 50vh height with bottom gradient + text overlay — no more text-only cream hero
- **Filter bar**: Tab-underline style (not pill buttons) — terracotta 3px underline on active
- **Masonry fix**: Replace CSS `columns` with CSS Grid + JS row-span calculation — allows filter animations to work cleanly
- **Lightbox upgrade**: Add prev/next buttons, keyboard arrow navigation, image counter (`3 / 12`), caption label
- **Image lazy load fade-in**: Each masonry item fades + scales in as it loads
- Remove the duplicate CTA banner section (obvious copy-paste artifact)

### 3B. Services Page
**Pricing tier structure** (even without publishing exact prices):
```
[  Mini Session  ]   [  Full Session  ]   [  Extended Session  ]
  30 minutes          60–90 minutes          2+ hours
  15+ images          30+ images             60+ images
  1 location          up to 2 locations      up to 3 locations
  Contact for rate    Contact for rate       Contact for rate
```
Middle card elevated: `--ink` header band, "Most Popular" label, larger box-shadow.

**FAQ → Accordion**: Replace divider blocks with animated `<details>`-style accordion. JS toggles `aria-expanded` + `max-height` transition. One open at a time.

**Service section images**: Add `box-shadow`, warm tint overlay `::after`, subtle scale on hover.

**Service descriptions** — "This session is for you if..." bullets per package (drives self-identification and conversion):
> *Family:* Your kids are "not good at photos" / You want photos that look like your family / You keep putting it off because life is busy

**New page hero**: Full-bleed photo hero at 50vh (same treatment as portfolio).

### 3C. About Page
**Story structure** — break bio into 3 chapters with ghost number typography:
- Chapter 01 — The Beginning (the softball sideline spark)
- Chapter 02 — The Practice (picking up the camera)
- Chapter 03 — The Work Today (what Krystal brings)

Each chapter has a ghost number (Playfair 96px, 10% opacity, `position: absolute` top-right) and an italic pull-quote sentence.

**New philosophy statement block** (full-width, `--ink` background):
> "I don't take photos for Instagram.
> I take photos for the wall in your hallway that your grandkids will look at someday."
> — *Krystal Ann*

**Fun facts sidebar**: Replace emoji with SVG line icons matching the site icon set. Card gets a `--terra` accent bar via `::before`.

**New revised H1**: "The nervous kids. The chaotic dog. The grandma who 'hates photos.' / *I've got this.*"

**Add internal links**: About page currently has no link to Services — add "See All Sessions" CTA alongside "Let's Work Together."

### 3D. Contact Page
**Anxiety-reducing copy above the form:**
> "No pressure, no sales call. Just tell me what you're thinking — even if it's vague — and I'll take it from there. I respond within 24 hours, usually faster."

**Session type** → visual pill toggles (replace `<select>` dropdown):
Family · Sports · Couples · Children · Not Sure Yet — clickable pills, `--terra` fill when selected.

**Form UX**: Floating labels, real-time validation (green `--pine` border on valid, `--terra` on error), textarea character counter.

**Trust signals**:
- Add 2 testimonials directly above the form (highest-conversion placement)
- "Response within 24 hours" green badge with pulsing dot
- Animated success state with brief celebration animation on submit

**Map**: Embed actual Google Maps iframe with `filter: saturate(0.8) sepia(0.15)` — warm toned to match brand.

---

## Phase 4 — SEO & Technical

### 4A. Meta Tags — All Pages
| Page | New Title |
|---|---|
| Home | `Omaha Family Photographer \| Krystal Ann Photography` |
| About | `About Krystal Ann \| Omaha Portrait Photographer · Natural Light` |
| Services | `Photography Session Packages \| Omaha, NE \| Krystal Ann Photography` |
| Portfolio | `Portfolio \| Omaha Family & Portrait Photography \| Krystal Ann` |
| Contact | `Book a Photography Session in Omaha, NE \| Krystal Ann Photography` |

Add `<link rel="canonical">` to all pages. Add `og:image`, `og:url`, `og:description` to all pages (currently missing on 4 of 5).

### 4B. Heading Structure Fix
**Services page** — single highest-impact SEO change: promote all four service H3s to H2s:
`Omaha Family Photography` / `Omaha Sports Photography` / `Omaha Couples & Engagement Photography` / `Omaha Children & Milestone Photography`

**About page H1**: "Omaha Portrait Photographer — Krystal Ann" (replace "A photographer who gets it.")
**Portfolio page H1**: "Omaha Photography Portfolio — Real Families, Real Moments"
**Contact page H1**: "Book Your Omaha Photography Session"

### 4C. Image Overhaul
- Rename all files: `family 1.JPG` → `omaha-family-photographer-outdoor-session.jpg` (remove spaces, lowercase, descriptive)
- Convert all to WebP (keep JPEG fallback)
- Add `<picture>` + `srcset` with 400w/800w/1400w variants
- Add `width`/`height` attributes to all `<img>` tags (prevents CLS)
- Add `fetchpriority="high"` to hero image
- Rewrite all alt text to be descriptive and location-specific

### 4D. Schema Markup
- Add `sameAs` (Instagram, Facebook), `founder`, `knowsAbout` to LocalBusiness schema
- Add FAQPage schema to services.html (5 Q&As already on the page, just not in schema)
- Add Person schema to about.html
- Add ImageObject schema to portfolio page
- Add `aggregateRating` once Google reviews are collected

### 4E. New Pages to Build
Priority order:
1. `/omaha-family-photographer.html` — highest-volume local search term
2. `/mini-sessions-omaha.html` — seasonal, high-converting, books out fast
3. `/best-places-for-family-photos-in-omaha.html` — informational, high traffic, earns links
4. `/faq.html` — extract/expand from services page FAQ
5. `/papillion-family-photographer.html` — suburb SEO
6. `/thank-you.html` — post-form redirect for conversion tracking

### 4F. Technical Fixes
- **Async font loading**: Switch to `rel="preload"` pattern with `onload` swap (eliminate render-blocking)
- **Drop Lato 300 weight** from font import (unused)
- **Fix `aria-expanded`** bug on mobile nav toggle (currently hardcoded to `false`)
- **Fix `aria-selected`** on portfolio filter buttons (never updated in JS)
- **Add skip link** as first element in `<body>` on all pages
- **Focus ring**: Remove `outline: none` on form inputs; replace with `3px solid var(--terra)` outline
- **Add `prefers-reduced-motion`** block to disable all animations for accessibility
- **GLightbox**: Replace hand-rolled lightbox with GLightbox (13KB, handles keyboard, ARIA, swipe)
- **Scroll progress bar**: 3px terracotta bar at top of viewport, fills on scroll
- **Enable Cloudflare Web Analytics** (free, zero code, privacy-safe)
- **Enable Cloudflare Polish** (auto WebP conversion at CDN level)
- **`/thank-you.html`** + Formspree `_next` redirect (enables conversion tracking)
- Fix low-contrast footer text (opacity too low, fails WCAG AA)
- Remove duplicate CTA banner from portfolio.html
- Remove external Unsplash image from portfolio.html (reliability risk)
- Fix footer service area links (all currently `href="#"`)

### 4G. CTAs — Full Replacement
| Location | Old | New |
|---|---|---|
| Nav (sticky) | Book a Session | Check My Availability |
| Hero primary | Book a Session | Claim Your Spot This Season |
| Hero secondary | View the Portfolio | See What a Session Looks Like |
| Services — each | Learn More | Book a [Family/Athlete/Love/Little Moments] Session |
| Portfolio bottom | Book a Session | I Want Photos Like These |
| CTA banner | Book Your Session | Let's Do This Before They Grow Up |
| Footer | Book a Session | Start Here |
| About bottom | Book a Session | Let's Make Something Together |

### 4H. FAQ — 8 Questions (Expand from Current 5)
Add to services page or homepage section:
1. I'm not photogenic. Is this going to be awkward?
2. My kids won't cooperate. Should I wait until they're older?
3. How much does a session cost? *(add actual pricing)*
4. Where do sessions take place? Do you have location ideas?
5. What should we wear?
6. When is the best time of year to book in Omaha?
7. How far in advance do I need to book?
8. Do you travel outside of Omaha?

---

## Phase 5 — Google Business Profile (Off-Site)
These are parallel actions that reinforce the site changes:
- Claim/verify GBP listing (if not done)
- Add phone number to website (footer + contact page) — currently completely missing
- Embed Google Maps iframe on contact page
- Ask Angie, Lana, and Ami (current testimonials) to post Google reviews
- Add each session type as a GBP Service entry
- Upload 15+ portfolio images to GBP with keyword-rich filenames
- Post "Now booking Spring & Summer 2026 — spots fill fast" as weekly GBP post

---

## Micro-Interactions & Animation Details

- **Reveal animations**: Direction-aware (`reveal-up`, `reveal-left`, `reveal-right`, `reveal-scale`) using `cubic-bezier(0.16, 1, 0.3, 1)` — springy premium feel
- **Nav link underlines**: Expand from center on hover (replaces background-pill hover)
- **CTA button shimmer**: White sweep across button on hover
- **Portfolio items**: Image scale 1.05 + overlay gradient shift on hover; label slides up 8px
- **About image**: Inset vignette appears on hover
- **Gallery masonry**: Each image fades + scales in as lazy-loaded

---

## Execution Order

Run these in priority order (highest impact → refinement):

| Phase | Focus | Why First |
|---|---|---|
| 1 | Visual foundation (fonts, colors, tokens) | Everything else builds on this |
| 2 | Hero rebuild | Single biggest visual impact |
| 3 | Homepage sections (marquee, bento grid, services track) | First impression |
| 4 | Portfolio page (masonry fix, lightbox, photo hero) | Where clients evaluate work |
| 5 | Services page (tiers, FAQ accordion, copy) | Where they decide to inquire |
| 6 | About page (story chapters, philosophy block) | Where they decide to trust |
| 7 | Contact page (form UX, trust signals, toggles) | Where money is made |
| 8 | SEO meta tags + heading structure | Quick wins, high impact |
| 9 | Image rename + WebP + srcset | Performance |
| 10 | Schema markup + new pages | Long-term SEO |
| 11 | Technical fixes (a11y, analytics, Cloudflare) | Polish + compliance |

---

*Ready to execute on approval.*
