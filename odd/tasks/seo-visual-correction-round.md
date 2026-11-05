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

- [ ] T1 (S1) inline — perf(motion): hero intro font race, intro budget, module script in head
- [ ] T2 (S2) inline — perf(analytics): defer gtag
- [ ] T3 (S3) inline — fix(seo): brand entity consistency + JSON-LD
- [ ] T4 (S4) inline — fix(seo): index.html redirect, HSTS, sitemap lastmod
- [ ] T5 (S5) inline — fix(a11y): language toggle label in name
- [ ] T6 (S6) inline — style(theme): violet for logo slash, links, markers, focus ring
- [ ] T7 (S7) inline — style(type): caption/micro/lead/ink-prose tokens and call sites; DESIGN.md + sidecar
- [ ] T8 (S8) inline — fix(ui): lightbox image without empty src
- [ ] T9 verify — build, astro check, Lighthouse mobile, detect, audit crawl on preview

Route: all inline (small understood changes; no writer trigger). Risk: T3 touches public JSON-LD (item 3) → independent verification of schema output at T9. T1/T2 motion/analytics: no automated test; manual verification.

## Log

- L1 (2026-11-05, user): "Prepara una ronda de correccion completa, de correcciones de la auditoria SEO y una auditoria visual y de estilo de impeccable (en lo visual, el objetivo no es modificar drasticamente, sino optimizar y prefeccionar lo que ya esta aprobado)"
- L2 (2026-11-05, user): visual audit evidence limited to "evidencia de codigo y lighthouse" (no browser inspection).
- L3 (2026-11-05, user): Blog y Proyectos: "Dejarlas como están".
- L4 Plan approved: /home/emz/.claude/plans/prepara-una-ronda-de-imperative-naur.md
