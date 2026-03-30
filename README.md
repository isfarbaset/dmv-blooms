# 🌸 DMV Blooms

**A seasonal field guide to the flowers of DC, Maryland & Virginia.**

Live site: [isfarbaset.github.io/dmv-blooms](https://isfarbaset.github.io/dmv-blooms)

![DMV Blooms](https://img.shields.io/badge/status-live-5F7A5E) ![GitHub Pages](https://img.shields.io/badge/hosted_on-GitHub_Pages-1C1917)

---

## What is this?

I built DMV Blooms to help people figure out what's flowering right now in the DC/Maryland/Virginia area and where to go see it. No apps to install, no accounts to create. Just open the site and go chase some blooms.

### Features

- **This Weekend's Picks** - curated recommendations based on what's peaking right now, with specific locations and tips
- **Blooming Now** - a live status board for 12 flower types across the DMV, auto-detected by date
- **Bloom Calendar** - a full-year timeline showing peak and shoulder bloom windows for every flower
- **Interactive Map** - 20 locations across DC, MD, and VA plotted on a real map (Leaflet + OpenStreetMap), with filters by region and bloom status
- **Share a Bloom** - share any flower's status and best spots via native share (mobile) or clipboard (desktop)

### Flowers tracked

Cherry Blossoms · Magnolias · Tulips · Bluebells · Azaleas · Wisteria · Lilacs · Roses · Hydrangeas · Lavender · Lotus & Water Lilies · Sunflowers

### Locations included

Tidal Basin · National Arboretum · Enid Haupt Garden · Dumbarton Oaks · Kenwood · Brookside Gardens · Burnside Farms · Bull Run Regional Park · Riverbend Park · Franciscan Monastery · Kenilworth Aquatic Gardens · McKee-Beshers WMA · Netherlands Carillon · Georgetown Streets · National Cathedral · U.S. Botanic Garden · Hains Point · Floral Library · Congressional Cemetery · Lady Bird Johnson Park

---

## Tech

Single `index.html` file. No build step, no framework, no dependencies to install.

- **Vanilla HTML/CSS/JS** - zero build tools
- **[Leaflet.js](https://leafletjs.com/)** via CDN - interactive map
- **[OpenStreetMap](https://www.openstreetmap.org/)** tiles - free, no API key
- **Google Fonts** - Newsreader + Outfit
- **GitHub Pages** - static hosting

Total size: ~30KB (before CDN assets).

---

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g., `dmv-blooms`)
2. Push this repo's contents:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dmv-blooms.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** in your repo
4. Under **Source**, select **Deploy from a branch**
5. Choose `main` branch, `/ (root)` folder, and click **Save**
6. Your site will be live at `https://YOUR_USERNAME.github.io/dmv-blooms/` within a minute or two

---

## Customizing

Everything lives in `index.html`. The data is in plain JavaScript arrays at the top of the `<script>` block:

- **`BLOOMS`** - flower definitions (name, emoji, months, peak months, description, locations)
- **`LOCS`** - map locations (name, lat/lng, flowers, description, region)

To add a new flower or location, just add an entry to the relevant array. The calendar, cards, map, and recommendations all update automatically.

### Adjusting bloom status logic

The `status()` function determines what's blooming based on the current month. Cherry blossoms have special-case logic for peak/ending dates. Everything else uses month-based matching. Adjust the `mo` (bloom months) and `pk` (peak months) arrays per flower to fine-tune.

---

## Copyright

DMV Blooms' code is made available to the public for transparency. Anyone may privately use and modify the source code, but cannot republish or redistribute the site, its design, or its content as their own. Don't clone this and put your name on it.

## Contributing

Contributions are wholeheartedly welcome. I hope that in continuously improving this project, the internal reward is shared between contributors. Found a great bloom spot? Know a flower we should add? Open an issue or submit a PR. Note that PRs are up for discussion before merging and are not guaranteed to be incorporated.

---

## License

Copyright © 2026 Isfar Baset. All rights reserved.

---

*Made for the DMV flower-chasing community.*
