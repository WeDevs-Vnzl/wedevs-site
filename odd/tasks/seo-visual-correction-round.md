# SEO audit fixes + Impeccable visual polish (correction round)

Objective: apply the 2026-11-05 SEO audit corrections and a refinement-only visual pass on the approved design system. Branch `fix/seo-visual-round` off `main` (19b10e9). Delivery strategy: ask-on-risk. Runner: `bun run build`, `bunx astro check`, Lighthouse (local Brave), `impeccable detect --json src`.

## Specs

- S1. Hero LCP: the home and subpage hero intros must not wait indefinitely for `document.fonts.ready` (race with a 350 ms timeout) and must skip the entrance when they would start after ~1200 ms on first load, showing content immediately. The approved animation is unchanged on fast loads. Motion bundle fetch starts from `<head>`.
- S2. Analytics: the external `gtag/js` script loads only after `load` + idle or on first interaction; the inline `window.gtag` stub keeps working for the contact form.
- S3. Entity consistency: "WedevsVnzla" → "Wedevs" everywhere in `en.json`/`es.json`; About `seoTitle` plural ("About the studio and its founders | Wedevs", "Sobre el estudio y sus fundadores | Wedevs"); `public/llms.txt` and `package.json` use `info@we-devs.com`; `brand.ts` fallback is `info@we-devs.com` and `brandMailHref` is a `mailto:`; Organization JSON-LD gains `sameAs`, `contactPoint`, `address` (country VE); ProfessionalService gains `url`, `logo`, `telephone`, `address`.
- S4. Indexing hygiene: `/index.html` → `/en/` 301 in `_redirects`; HSTS header `max-age=31536000; includeSubDomains` in `netlify.toml`; sitemap `lastmod` only for blog posts (optional).
- S5. Language toggle accessible name contains the visible text ("ES · Cambiar a Español") in HeroSection, SiteHeader and LangSwitch.
- S6. Theming: logo slash, default links, list markers and the focus ring use the system violet (`violet` on paper, `violet-soft` on night); focus ring offset follows the surface. Legacy utilities (`pill-btn-*`, `card`, `chip`) untouched.
- S7. Type ramp: add `caption` (13px), `micro` (11px), `lead` (clamp(17px,1.5vw,19px)) steps and `ink-prose` (#2a2c33) to `@theme`, DESIGN.md and the sidecar; replace literal `text-[13px]`, `text-[11px]`, `text-[clamp(17px,1.5vw,19px)]`, `text-[17px]`, `text-[19px]` and `text-[#2a2c33]` with the tokens. No visible change.
- S8. Lightbox `<img>` has no empty `src`; it is hidden until the script sets `src`/`alt`.
- Out of scope (user decision 2026-11-05): Blog and Projects pages stay as they are. No new copy, photos or testimonials.

## Tasks

- [x] T1 (S1) inline — 4389f70 perf(motion): font race, intro budget, module script in head; follow-up (same spec) lazy bundle import after first paint, inline 1.2 s hero deadline, below-the-fold ScrollTriggers one task later.
- [x] T2 (S2) inline — 45b82fe perf(analytics): defer gtag
- [x] T3 (S3) inline — 5b29d4d fix(seo): brand entity consistency + JSON-LD
- [x] T4 (S4) inline — 92d7d96 fix(seo): index.html redirect, HSTS. Sitemap `lastmod` skipped: per-post dates are not reachable from `astro.config.mjs` without re-parsing frontmatter; not worth the risk of a wrong `lastmod`.
- [x] T5 (S5) inline — 26a8a79 fix(a11y): language toggle label in name
- [x] T6 (S6) inline — 48e8873 style(theme) (shared commit with T7; both live in `global.css`)
- [x] T7 (S7) inline — 48e8873 style(theme): caption/micro/lead/ink-prose/night-copy/night-meta tokens and 13 call-site files; DESIGN.md + sidecar; ae914cf docs(design) adds PRODUCT.md/DESIGN.md/sidecar
- [x] T8 (S8) inline — 4e163cb fix(ui): lightbox image created on open (no `<img>` without `src` in markup)
- [x] T9 verify — see Log L6

Route: all inline (small understood changes; no writer trigger). Risk: T3 touches public JSON-LD (item 3) → schema fields verified in dist (L6); Rich Results Test pending on the deploy preview. T1/T2 motion/analytics: no automated test; lab Lighthouse + manual check pending on deploy.

## Log

- L1 (2026-11-05, user): "Prepara una ronda de correccion completa, de correcciones de la auditoria SEO y una auditoria visual y de estilo de impeccable (en lo visual, el objetivo no es modificar drasticamente, sino optimizar y prefeccionar lo que ya esta aprobado)"
- L2 (2026-11-05, user): visual audit evidence limited to "evidencia de codigo y lighthouse" (no browser inspection).
- L3 (2026-11-05, user): Blog y Proyectos: "Dejarlas como están".
- L4 Plan approved: /home/emz/.claude/plans/prepara-una-ronda-de-imperative-naur.md
- L5 Analysis: Lighthouse main-thread cost is dominated by Style & Layout (~2.2–2.8 s throttled) from the SVG mosaics (PixelGrid cells, the 576-cell curtain) plus GSAP evaluation; the hero was hidden until that work finished. Fixes target the hero's dependency on JS first.
- L6 Verification (local `astro preview`, Lighthouse 12 mobile, Brave headless, 3 runs after the final change; the pre-change baseline is the live site):
  - LCP 4.6 s → 2.4–3.1 s (render delay 3968 ms → ~2000–2600 ms). Target "< 1.5 s render delay" not met in the lab; CPU-bound by the SVG mosaics and GSAP.
  - TBT 580 ms (live) → 830–1020 ms (local preview). Not comparable environments (no Netlify edge/compression locally) and noisy; the longest task fell 946 → ~550 ms. Target "< 300 ms" not met.
  - CLS 0, a11y 100, `label-content-name-mismatch` gone, SEO 100, best practices 100.
  - `bun run build` OK (24 pages). `bunx astro check`: 4 errors, all pre-existing on main (3× og/*.png.ts Buffer, 1× SiteHeader `hidden` on svg). `impeccable detect --json src`: 34 → 0 findings (3 narrow ignore-values recorded in `.impeccable/config.json`: 34px/21px editorial prose scale, 32px decorative arrow).
  - dist checks: 0 "WedevsVnzla"; About titles plural; Organization `sameAs`/`contactPoint`/`address` and ProfessionalService `telephone`/`url`/`logo` present; `mailto:info@we-devs.com` with the address visible; toggle `aria-label="ES · Cambiar a Español"`; head scripts ClientRouter 16 KB + MotionScript 2 KB, GSAP chunk 136 KB lazy; `[data-hero-late]` CSS present.
  - Pending on the Netlify deploy preview: `/index.html` → 301, HSTS `includeSubDomains`, Rich Results Test on `/en/` and `/en/about/`, live Lighthouse, and a manual check that the hero intro still plays on a fast load and the page shows without intro under Slow 4G.
- L7 Next step (not in this round): the remaining LCP/TBT cost is the SVG mosaics (PixelGrid + curtain, ~1700 nodes). Options: render the curtain cells lazily when a navigation starts, cap PixelGrid cells, or move the mosaic to a CSS/`<pattern>` texture. Also `www` chain (Netlify dashboard), service copy, founder photos, case studies.
