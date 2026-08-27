# Mainstreet — an EmDash theme for service businesses

A theme for salons, spas, studios, clinics, trades, and anyone whose website exists to answer three questions: *what do you do, what does it cost, and how do I book?* Built with [EmDash](https://github.com/emdash-cms/emdash) and deployed on Cloudflare Workers with D1 and R2.

**Live demo:** [mainstreet.superherotech.ai](https://mainstreet.superherotech.ai)

**Create a site from this theme:**

```bash
npm create astro@latest -- --template github:ecropolis/emdash-theme-mainstreet
```

Services are real content entries with pricing, duration, and images — not hand-edited page copy. Pages are assembled from purpose-built blocks: hero, services grid, how-it-works steps, testimonials, team, hours & contact, FAQ, and a booking CTA banner.

## What's included

- **Services collection** — name, summary, rich description, image, price, duration, featured flag, sort order. Rendered as a grid block, an archive at `/services`, and detail pages at `/services/{slug}`.
- **Team collection** — name, role, bio, photo. Rendered by the team block.
- **Eight content blocks** editors can compose in any order on any page.
- **Compass Customizer** — no-code design controls in **Admin → Design**: palette presets, brand colors, typeface, corner roundness, gradients, custom CSS. Changes apply live, no rebuild. Built on the theme's [token contract](docs/TOKEN-CONTRACT.md).
- **Menu-driven booking CTA** in the header — editors change the label and URL from the admin (`cta` menu), no code.
- Dark/light mode, SEO metadata, and demo content for a fictional wellness studio so the theme looks real out of the box.

## Pages

| Page | Route | Source |
|---|---|---|
| Home | `/` | `pages` entry `home`, composed of blocks |
| Services | `/services` | archive of the `services` collection |
| Service detail | `/services/{slug}` | one `services` entry, with booking sidebar |
| About | `/about` | `pages` entry, blocks + prose |
| Contact | `/contact` | `pages` entry with hours & contact block |
| Any page | `/{slug}` | catch-all over the `pages` collection |
| 404 | fallback | — |

## Local development

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:4321/_emdash/admin` and complete the setup wizard — it applies `seed/seed.json` (schema, menus, and demo content) automatically.

## Deploying

```bash
pnpm deploy
```

Requires a Cloudflare account with D1 and R2. Edit `wrangler.jsonc` to set your worker, database, and bucket names.

## Rebranding checklist

1. Site title and tagline — admin → Settings.
2. Colors — `src/styles/theme.css` (`--color-brand-*`, `--color-accent-*`; gradients follow automatically).
3. Font — `astro.config.mjs` (`fonts:` entry; Plus Jakarta Sans by default).
4. Replace the demo services, team, and page copy in the admin — or edit `seed/seed.json` before first run.
5. Swap the demo imagery (Unsplash) for the business's own photos.

## Booking

The theme ships with booking CTAs pointing at `/contact`. If you use an external scheduler, point the `cta` menu item and the CTA blocks at your booking URL instead.

## License

MIT © Ecropolis
