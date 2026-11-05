# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the owner or manager of a small or medium business in Venezuela or elsewhere in Latin America that is growing and has no in-house technical team. They arrive with a concrete need already named in their own words: a mobile app, a website, a CRM, or a custom system for a process that is unique to them. They often come from the studio's social media, so the site must speak the same language as those channels. Their job is to decide whether this studio is trustworthy and capable enough to build it, and then to start the conversation.

Secondary (repository evidence, not confirmed as a priority): companies with an existing platform that need integrations (payments, ERP), AI automation, or hands-on technical consulting. The services content states that most studio work is on existing platforms rather than greenfield builds.

## Product Purpose

The marketing and contact website of Wedevs, a two-founder software studio based in Venezuela. It explains what the studio builds, shows that it has done it before, explains how it works, and turns a visitor into a conversation through the contact form or WhatsApp. Success is a sent contact form or a WhatsApp message from a qualified business owner; secondary signals are brand searches and clicks on service pages.

## Positioning

Confirmed priority order of the claims the studio leads with:

1. Senior-level engineering from Venezuela (UTC-4, same working hours as the Americas) at a cost a growing SMB can actually afford.
2. The studio stays after launch: support, improvements, and one team that keeps knowing the system over time.
3. The client talks directly to the two co-founders who design and build the product. No intermediaries, no handoffs between contractors, visible progress every week.

Payments, ERP and AI automation are specialties inside "custom systems", not the headline claim.

## Operating Context

- Bilingual site: English under `/en/` (default and `x-default`), Spanish under `/es/`. Every page exists in both languages with bidirectional hreflang.
- Static site on Netlify. The root `/` redirects to `/en/`. Trailing slashes are canonical.
- Contact happens through the form on `/contact/` (Netlify function at `/api/contact`, Cloudflare Turnstile anti-bot, delivery by Resend) or through the business WhatsApp link. Stated reply time: within one business day. Stated availability: UTC-4, currently accepting new projects.
- The contact form asks for project type (mobile app, website, CRM, custom system, other) and an optional budget range (under $2,000; $2,000–$5,000; $5,000–$15,000; $15,000+; not sure yet).
- Three ways of working are offered without prices: fixed-scope project, in stages, monthly support.
- Measurement: Google Tag via `googletagmanager.com/gtag/js` (ID configured by environment variable), privacy policy at `/privacy/`.
- Machine readers: `public/robots.txt` with an explicit AI-crawler policy and `public/llms.txt` describing every page in both languages.

## Capabilities and Constraints

- Stack: Astro 7 (static output), Tailwind CSS 4, GSAP for motion, TypeScript, Prettier. Package manager lockfile is `bun.lock`.
- Content lives in Astro content collections under `src/content/`: `services` (four entries, both languages in one file), `projects` (schema ready, no entries), `blog` (one file per language, no entries), `testimonials` (no entries). Copy for layouts and fixed pages lives in `src/lib/i18n/en.json` and `es.json`; routes and canonical helpers in `src/lib/i18n/routes.ts`.
- Open Graph images are generated at build time by the `src/pages/og/` routes (`src/lib/og/`): a text card over the PixelGrid mosaic for static pages, services and anything without artwork; case studies and articles use `public/images/<collection>/<slug>/og.<ext>` when present (cropped to 1200x630 by the author, tinted toward the right edge, logo bottom right). `scripts/generate-og.mjs` only produces the icons.
- The four services: Full-stack development, Fintech & ERP integrations, AI agents & automation, Technical consulting. The home page presents them in customer language as mobile apps, websites, CRMs and custom systems.
- Terminology: projects are labelled "Own product" / "Producto propio" or "Client" / "Cliente". Work done as an employee is never shown as studio work. The founder CV route was removed and redirects to the home page.
- Explicitly undecided product facts: the brand email (the schema markup uses `info@we-devs.com`, `llms.txt` and `package.json` still carry a personal Gmail address); Instagram and TikTok handles; whether a scheduling tool (for example Cal.com) will replace message-only contact; final budget ranges; prices for the three ways of working.
- Known naming inconsistency to resolve: the About pages say "WedevsVnzla" while every other surface, the logo and the schema markup say "Wedevs". The About title also says "its founder" (singular) although the studio has two co-founders.

## Brand Commitments

- Name: Wedevs. Logo and favicons in `public/icons/`.
- Voice (from the brand manual, confirmed in the handoff document): clear, precise and close. Always "we"; never a personal portfolio voice. Spanish uses neutral Latin American "tú". The site follows the same message as the studio's social channels.
- Founders: Williams Velazquez (co-founder, mobile development and product design) and Eliezer Meza (co-founder, full-stack software engineer, fintech and ERP). Both appear by name on the About page with LinkedIn profiles; no GitHub links anywhere on the site.
- Nothing invented: no metrics, clients, testimonials or prices that do not exist. Missing facts are recorded as open, never filled in.
- Handoff reference: `docs/handoff/wedevs.page — Decisiones de copy y estructura.md` fixes the home page order (Hero, Services, Projects, How we work, Contact) and the home copy in both languages.

## Evidence on Hand

- Case studies with publishable results exist (the handoff names Kairos CMS and Maximiza), with client permission and a concrete outcome each. They are not yet in the repository: `src/content/projects/` is empty and the live Projects page shows "0 case studies". Authoring guide: `docs/content/adding-projects.md`.
- Real photographs of both founders exist and may be used on About and as blog author images. They are not yet in the repository; the site currently ships no photographs at all.
- Absent, do not fabricate: client testimonials (collection exists but is empty), client logos, press mentions, aggregate metrics beyond the case studies, blog articles (the live Blog page says "More articles coming soon"), confirmed Instagram or TikTok accounts.
- Business WhatsApp number is live on the contact page.

## Product Principles

1. Lead with affordability of senior work, then with staying after launch, then with direct access to the builders. Specialties support the claim; they do not replace it.
2. Services before proof, proof before process: the visitor first understands what the studio does, then sees it has been done, then how it works, then how to reach them.
3. Speak the customer's language. Name outcomes and the things a business owner already calls by name (app, website, CRM, system), not the stack.
4. Nothing on the site is invented. An empty collection stays empty, or is removed from navigation, until real content exists.
5. Both languages are first-class. Every page, meta tag, schema node and machine-readable file ships in English and Spanish together.
