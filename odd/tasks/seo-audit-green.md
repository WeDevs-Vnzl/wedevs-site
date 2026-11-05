# SEOmator audit (2026-11-05, 89/100) → all checks green

Objective: clear every FAIL and WARN of the SEOmator report on https://we-devs.com/en/ that the code or the Netlify config can fix, without inventing facts. Branch `fix/seo-audit-green` off `main` (744ed16). Delivery strategy: ask-on-risk. Runner: `bun run build`, `bunx astro check`, `bunx prettier --check`, scratchpad `measure.py` on `dist/en/index.html`, headless Firefox screenshots.

## Specs

- S1. Performance: DOM under 1500 elements and HTML under 100KB on the home (audit: "DOM has 2463 elements", "HTML is 272KB", "0 CSS files, 57KB inline CSS"). The curtain and PixelGrid cells are built client-side by the motion bundle with the same seeded lottery, so the rendered pattern is identical; the stylesheet ships as an external file; the inline hero-deadline script is minified; `www.googletagmanager.com` gets a preconnect when analytics is on. The first image (featured project cover) is not lazy, carries `fetchpriority="high"`, is preloaded and has a `srcset` from resized variants (`/images/projects/<slug>/cover-<w>.webp` endpoint); its `<figure>` gets a `<figcaption>`.
- S2. Security headers in `netlify.toml` for `/*`: Content-Security-Policy (self + GA/GTM + Cloudflare Turnstile + inline scripts/styles the templates need), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS `max-age=63072000; includeSubDomains; preload`.
- S3. Crawling and AI: robots.txt keeps no `Disallow` group (audit read Bytespider/CCBot blocks as "6 AI crawler(s) blocked"); the head references `/llms.txt`; the robots meta drops `max-snippet:-1`/`max-video-preview:-1` (audit: "Page blocks search snippets via nosnippet or max-snippet:0"); the `<noscript>` leaves `<head>`.
- S4. Accessibility: a visually hidden "Skip to content" link is the first link of every page.
- S5. E-E-A-T, social and content, both languages: a founders byline on the home (names, roles, LinkedIn, link to About) inside "How we work"; footer adds Terms, Editorial policy, a disclaimer line ("Wedevs builds software. We do not provide financial, legal or tax advice."), WhatsApp, and a visible `<time>` "Last updated" (build date) plus `dateModified` in the WebSite JSON-LD; new `/terms/` page (terms of use + editorial policy section); the H1 keeps a space before the emphasised phrase (audit read "softwareyour"); the home reaches 300+ words with links under 20% of the text.
- Reported, not fixed: URL slug "en" (locale prefix design), HTTP/3 alt-svc (Netlify), trust badges/reviews (no real material), text compression (false negative: live responses are brotli), Lighthouse performance is re-measured by the user after deploy.

## Tasks

- [x] T1 (S1) inline — client-built curtain and PixelGrid cells (commit: perf(motion))
- [x] T2 (S1) inline — external CSS, minified inline scripts, preconnect, cover variants + preload + figcaption (commit: perf(assets))
- [x] T3 (S2) inline — Netlify security headers + robots.txt (commit: chore(netlify)); Risk: item 2 (CSP is a security guard; verified by rendering the build behind the same headers, not by a console read)
- [x] T4 (S3, S4) inline — llms.txt link, robots meta, noscript, skip link (commit: feat(seo))
- [x] T5 (S5) inline — founders byline, footer legal row, terms page, H1 space, services rows link only their title (commit: feat(seo))
- [x] T6 verify — `bun run build` ok (28 pages + 5 cover variants); `astro check` 1 pre-existing error (SiteHeader svg `hidden`); prettier clean on tracked files; measure.py on dist/en/index.html: html_bytes=41339 elements=326 words=464 text_ratio=7.1% link_density=19.6%; Firefox headless screenshots of hero, services, projects, how/byline, CTA, footer, terms behind the Netlify headers served locally (scratchpad/shots/audit-*.png)

## Log

- L1 (2026-11-05, user): "toma esta auditoria SEO del sitio desplegado y prepara las correcciones, el objetivo es que la pagina este 100% verde en todas las metricas (SEO, GEO, busqueda agentica, todo) @../SEO-AUDIT-we-devs.com.pdf"
- L2 Baseline from the live HTML (scratchpad measure.py): html_bytes=273499 elements=2518 words=355 text_ratio=0.8% link_density=34.9% inline_css=58670 svg=183957. The inline SVG cells (curtain 24x24 `<g>`+rects, PixelGrid rects) are 184KB of the page; the audit's robots reading comes from a parser that groups every `User-agent` line up to the first `Disallow`.
- L3 Engram mirror pending: the auto-mode classifier rejects `mem_save`/`mem_session_summary` in this session.
- L4 Result vs audit: DOM 2518→326, HTML 273KB→41KB, inline CSS 59KB→1KB (noscript), inline SVG 184KB→5KB, link density 34.9%→19.6%, words 355→464 (own count). Text-to-HTML lands at 7.1% against the 10% the audit asks for: the remaining weight is Tailwind class attributes (16KB of 41KB) and the head (8KB); reaching 10% needs either ~200 more words on the home or a utility-class refactor. Left for the user's decision.
- L5 Not fixable here: "en" slug (locale-prefix routing), HTTP/3 alt-svc (Netlify), trust badges/reviews (no real material), "no compression" (live responses are brotli; checker artifact). Open follow-ups for the user: review the terms/editorial copy, submit the apex to hstspreload.org, re-run the audit after deploy.
