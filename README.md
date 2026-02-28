# Krystal Ann Photography — Website

Complete small-business website for Krystal Ann Photography, Omaha, NE.

---

## File Structure

```
krystal-ann-photography/
├── index.html          ← Home page
├── about.html          ← About page
├── services.html       ← Services page
├── portfolio.html      ← Portfolio / Gallery
├── contact.html        ← Contact & Booking form
├── css/
│   └── style.css       ← All styles (single file)
├── js/
│   └── main.js         ← Nav, animations, filter, form
└── images/             ← Drop your photos here
```

---

## How to Open Locally (Mac Terminal)

```bash
# Navigate into the project folder
cd ~/CLAUDE/krystal-ann-photography

# Open in your default browser
open index.html

# OR start a local server (Python, no install needed)
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

---

## Replacing Placeholder Photos

All `<img>` tags currently use Unsplash URLs for placeholder images.
To replace them:

1. Add your photos to the `images/` folder.
2. Find the `<img>` tag you want to update.
3. Change `src="https://images.unsplash.com/..."` to `src="images/your-photo.jpg"`.

### Recommended photo sizes
| Use | Size |
|-----|------|
| Hero (index.html) | 1600×900px or larger |
| About portrait | 800×1000px |
| Gallery items | 600×800px or 600×600px |
| Service detail images | 700×500px |

---

## Connecting the Contact Form

The form currently simulates submission (shows success after 1.2s).
To make it functional, use one of these options:

### Option A — Formspree (free, no backend needed)
1. Create an account at https://formspree.io
2. Create a form and copy your form ID (looks like `xyzabc12`)
3. In `contact.html`, change the `<form>` tag:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `e.preventDefault()` in `js/main.js` (or adjust the submit handler)

### Option B — Netlify Forms (if deploying to Netlify)
1. Add `data-netlify="true"` and `name="contact"` to the form tag
2. Netlify auto-detects and handles submissions

---

## Deploying to the Web

### Netlify (simplest — free tier available)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# From inside the project folder:
netlify deploy --dir . --prod
```

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Deploy from branch (main, root)
3. Your site will be live at `https://yourusername.github.io/krystal-ann-photography`

### Any Web Host (GoDaddy, Bluehost, etc.)
Upload all files via FTP/cPanel File Manager into the `public_html` folder.

---

## Customizations Checklist

- [ ] Replace all placeholder `<img>` tags with real photos
- [ ] Update email in `contact.html` (`hello@krystalannphotography.com`)
- [ ] Update Instagram handle (`@krystalannphoto`) in footer and contact page
- [ ] Add real Facebook/Instagram `href` links to social buttons
- [ ] Connect contact form to Formspree or backend
- [ ] Update copyright year in all footers
- [ ] Add Google Analytics or similar if desired
- [ ] Add Google Maps embed to contact page service area section
- [ ] Register and connect a real domain name

---

## Brand Reference

| Token | Value | Use |
|-------|-------|-----|
| Cream | `#FAF6F1` | Background |
| Cream Dark | `#F0E8DE` | Alt sections |
| Terracotta | `#C97B5A` | Primary accent, CTAs |
| Blush | `#E8C4B0` | Highlights |
| Sage | `#8A9E8C` | Success states |
| Charcoal | `#3D3530` | Headings, dark sections |
| Display font | Cormorant Garamond | Headings |
| Body font | Lato | All body text |
# krystal-ann-photography
