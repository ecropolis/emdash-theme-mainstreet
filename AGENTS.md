This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npx emdash dev        # Start dev server (runs migrations, seeds, generates types)
npx emdash types      # Regenerate TypeScript types from schema
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, menus)                      |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, header CTA, footer, theme switcher)         |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall.

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.

## This Theme: Mainstreet

A service-business theme (salons, spas, studios, clinics, trades) by Ecropolis. The organizing idea: services are structured content with pricing and duration, and every page funnels toward a booking CTA. Demo content is a fictional Portland wellness studio, "Juniper & Sage".

## Pages

| Page           | Path               | What it shows                                                             |
| -------------- | ------------------ | ------------------------------------------------------------------------- |
| Home           | `/`                | Service blocks in any order, authored on the `home` page entry            |
| Services       | `/services`        | Archive of the `services` collection (code-rendered grid)                 |
| Service detail | `/services/{slug}` | Summary, price/duration chips, rich description, image + booking sidebar  |
| About          | `/about`           | Blocks + prose, includes the team block (`#team` anchor)                  |
| Contact        | `/contact`         | Hero + hours & contact block (`#visit` anchor) + FAQ                      |
| Any page       | `/{slug}`          | Catch-all over the `pages` collection                                     |

## Schema

- `pages`: `title`, `content` (Portable Text containing service blocks).
- `services`: `title`, `summary` (text, card copy), `content` (Portable Text), `image`, `price_from` (string, e.g. "from $95"), `duration` (string, e.g. "60 min"), `featured` (boolean, shows the Popular badge), `sort_order` (integer).
- `team`: `title` (person's name), `role`, `bio` (text), `photo`, `sort_order`.
- No taxonomies.
- Four menus: `primary`, `cta` (first item renders as the header booking button), `footer_services`, `footer_studio`.

## Service blocks

A local plugin at `src/plugins/service-blocks/` registers eight Portable Text block types. They render via `src/components/blocks/*` (dispatched from `ServiceBlocks.astro`).

| Block                  | Fields                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `service.hero`         | `headline`, `subheadline`, `badge`, primary/secondary CTA label+URL pairs, `imageUrl`, `imageAlt`, `centered` |
| `service.services`     | `headline`, `subheadline`, `limit`, `featuredOnly`, `ctaLabel`/`ctaUrl` -- **renders the `services` collection**, carries no items itself |
| `service.steps`        | `headline`, `subheadline`, repeater of `{ title, description }` (auto-numbered)                  |
| `service.testimonials` | `headline`, repeater of `{ quote, author, detail }`                                              |
| `service.team`         | `headline`, `subheadline` -- **renders the `team` collection**                                   |
| `service.hours`        | `headline`, repeater of `{ label, value }`, `phone`, `email`, `address` (multiline), `note`      |
| `service.faq`          | `headline`, repeater of `{ question, answer }`                                                   |
| `service.cta`          | `headline`, `subheadline`, `ctaLabel`, `ctaUrl`                                                  |

Constraints worth remembering (Block Kit):

- No nested object element: CTA `{ label, url }` pairs are flattened to sibling fields. The renderers read the flat keys.
- Repeater sub-fields are scalar only.
- No media picker in the plugin-block modal yet, so the hero image is a URL string entered by hand. Service and team images are proper image fields on their collections, picked in the entry editor.
- The services and team blocks query their collections at render time (`sort_order` ascending, published only). To reorder cards, edit `sort_order` on the entries.
- Icons come from a deliberately small Phosphor set declared in `astro.config.mjs`: `arrow-left, calendar-check, clock, envelope, map-pin, phone, star`. Add to that list before using a new icon.

## Visual character

Typography is **Plus Jakarta Sans** on `--font-body`, display weight 700 (calmer than the SaaS templates' 800). Brand colors are sage-teal with a warm amber accent, set in `src/styles/theme.css`:

- `--color-brand: light-dark(#0f766e, #2dd4bf)` with `-strong` / `-soft` shades
- `--color-accent: #d97706`

Gradients follow the brand/accent pair automatically (see `tokens.css`). Cards are surface-on-bg with 1px borders; the Popular badge and price text carry the brand color.

## Compass Forms

The theme bundles `@ecropolis/emdash-plugin-compass-forms` (registered as `compassForms()` in astro.config.mjs): a `compass.form` Portable Text block editors insert from the slash menu. Submissions are stored in plugin storage, listed under **Admin → Form Submissions**, optionally emailed (`Plugins → Compass Forms → Settings`), with honeypot + min-fill-time spam checks. The block renders the Compass `cfh-` markup contract; the theme's token-mapped styles for it live in `src/styles/forms.css`. A Compass client key on a block switches it to the hosted forms.compass.st embed. The seeded contact page carries one form block (`formKey: contact`).

## Compass Mail

The theme also bundles `@ecropolis/emdash-plugin-compass-mail` (`compassMail()` in astro.config.mjs) — a standard-format email transport registering the exclusive `email:deliver` hook, sending via SendGrid or Resend with a bring-your-own API key. Configure under **Plugins → Compass Mail → Settings** (provider, API key, verified from-address), then select it under **Settings → Email**. Until it's configured and selected, `ctx.email.send()` has no production provider and form notification emails are skipped (submissions are still stored).

## Compass Customizer

The theme ships a second local plugin, `src/plugins/compass-customizer/`, giving no-code design control from **Admin → Design**: palette presets, brand/accent colors, typeface, corner roundness, headline weight, gradients on/off, custom CSS. It stores settings in plugin KV and injects an `html:root` token-override `<style>` into public pages via the trusted-only `page:fragments` hook — changes apply on next page load, no rebuild. See `src/plugins/compass-customizer/README.md` for architecture and EmDash gotchas, and `docs/TOKEN-CONTRACT.md` for the token contract it writes against.

Override precedence is deterministic: `tokens.css` (`@layer base`) < `theme.css` (unlayered `:root`) < customizer (`html:root`). Never add higher-specificity token declarations in the theme, or the customizer breaks.

## Customisation (in code)

Design tokens live in `src/styles/tokens.css` with their default values; override them in `src/styles/theme.css` (unlayered, always wins over tokens.css). Don't edit `tokens.css` or `Base.astro` for visual changes. Code-level overrides define the theme's shipped identity; site owners restyle per-site with the customizer instead.

To re-brand for a real business, the highest-leverage moves are:

1. Site title and tagline (admin Settings) -- the wordmark and footer follow.
2. `--color-brand-*` / `--color-accent-*` in `theme.css`.
3. Replace the demo services, team, and page copy in the admin.
4. Swap the Unsplash demo photos for real ones.
5. Point the `cta` menu item (and CTA blocks) at the business's booking URL.

## What not to do

- Don't hard-code services into page copy. The `services` collection is the source of truth; the grid, archive, and detail pages all read from it.
- Don't write generic wellness copy ("Relax. Renew. Restore."). The demo copy is specific on purpose -- concrete details are the theme's voice.
- Don't add a second hero mid-page. One hero, then sections.
- Don't put prices only in prose. `price_from` and `duration` are fields so cards, chips, and future integrations can read them.
- Don't use `getStaticPaths()` on content routes -- everything renders server-side.
