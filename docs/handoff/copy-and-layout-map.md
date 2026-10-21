# WedevsVnzla site — copy & layout map (handoff)

Purpose: give a copy/IA agent everything needed to **rewrite copy and rebalance section distribution** on wedevs.page without re-exploring the repo. This document describes _what each copy is for_, not its current wording — read the source files for the actual text.

Stack: Astro 7 + Tailwind 4, bilingual (`/en/`, `/es/`), dark-only theme. Root `/` redirects to `/en/`.

---

## 1. Brand context (source: brand manual v1, "Manual de marca WedevsVnzla")

| Item         | Value                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------- |
| Name         | **WedevsVnzla** (wordmark: `wedevs` + `vnzla`; domain-style variant `wedevs.vnzla`)         |
| What it is   | Software studio from Venezuela — no longer a personal portfolio                             |
| Tagline (ES) | Software a la medida — apps, webs, CRMs y sistemas — con precisión técnica y trato cercano. |
| Logo         | Monogram **w/** (proposal A): Papel "w" + Cobalto slash. "The slash joins design and code." |
| Domain       | https://wedevs.page                                                                         |

**Voice — three rules**

1. **Claros (Clear).** Talk about outcomes, not technicalities. "More sales", not "serverless architecture".
2. **Precisos (Precise).** Few, well-chosen words. One idea per piece.
3. **Cercanos (Close).** Use informal "tú" in Spanish; proudly Venezuelan, without losing elegance.

Speak as **"we" (nosotros)** everywhere. The founder (Eliezer Meza) appears only as the blog author.

**Color — 80/15/5 rule**: 80% Papel/Tinta, 15% Grafito/Niebla, 5% Cobalto only for what matters.

| Token   | Light   | Dark (site uses this) |
| ------- | ------- | --------------------- |
| Tinta   | #0E0F12 | background            |
| Papel   | #F6F5F2 | main text             |
| Cobalto | #2F4BFF | #6B80FF (accent)      |
| Grafito | #5A5C63 | #A9AAB0 (muted)       |
| Niebla  | #D9D8D3 | secondary text        |

**Type**: Manrope (titles and text), JetBrains Mono (details: labels, numbers, dates, code nods like `// comment`). Manual eyebrow style: mono, uppercase, letter-spacing 0.08em, numbered (`01 · LOGO`).

---

## 2. Where copy lives

| Source                                                                        | Contains                                                             |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `src/lib/i18n/en.json`, `es.json`                                             | All UI/section copy, keyed by section (`nav`, `home`, `services`, …) |
| `src/content/services/*.md` (4 files)                                         | Per-service copy, EN + ES in frontmatter                             |
| `src/content/projects/*.md` (2 files)                                         | Case studies, EN + ES in frontmatter                                 |
| `src/content/blog/{en,es}/*.md` (2 per lang)                                  | Long-form articles (body + title/excerpt/tags)                       |
| `src/pages/**`, `src/layouts/BaseLayout.astro`                                | SEO `title`/`description`, JSON-LD (hardcoded, EN only)              |
| `public/llms.txt`, `public/icons/site.webmanifest`, `scripts/generate-og.mjs` | Machine-facing name/summary, OG image text                           |

Content schemas: `src/content.config.ts`.

---

## 3. Sitemap

```mermaid
flowchart TD
    root["/ (redirect → /en/)"] --> home

    subgraph lang["/{en|es}/ — every page exists in both languages"]
        home["Home /"]
        services["Services /services"]
        serviceDetail["Service detail /services/:slug<br/>full-stack-development · fintech-erp-integrations<br/>ai-agents-automation · technical-consulting"]
        projectDetail["Project detail /projects/:slug<br/>kairos-cms · maximiza"]
        blog["Blog /blog"]
        post["Post /blog/:slug<br/>kairos-multitenant-lessons · schema-as-jsonb"]
        contact["Contact /contact"]
    end

    notfound["404"]

    home -->|Projects section| projectDetail
    home -->|"View all projects" → #projects (no index page)| home
    home -->|Services teaser| serviceDetail
    home -->|Services teaser CTA| services
    home -->|Writings| post
    home -->|Writings CTA| blog
    services --> serviceDetail
    serviceDetail -->|Related work| projectDetail
    blog --> post
    post -->|Related posts| post

    header(("Header + Mobile menu")) -.-> home & services & blog & contact
    footer(("Footer")) -.-> home & services & blog
    notfound --> home & services & blog
```

Global, on every page: **Header** (logo, "Let's talk" pill → contact, social links, mobile menu with language switch) and **Footer**.

---

## 4. Segments and copy, page by page

Notation: `key` = i18n key under `en.json`/`es.json`; `field` = content-collection frontmatter field.

### Global — Header / Mobile menu / Footer

| Segment     | Copy                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| Header      | `nav.talk` — primary nav CTA pill to contact. `nav.menuOpenLabel`, `nav.navLabel` — a11y labels.                       |
| Mobile menu | `nav.home/projects/services/blog/contact` — nav link labels. `nav.menuCloseLabel` — a11y.                              |
| Lang switch | `nav.langSwitch` — short code of the other language; `nav.langSwitchLabel` — its a11y label.                           |
| Footer      | `footer.reach` — one-line nudge toward email under the logo. `footer.copyright` — legal line. Nav links reuse `nav.*`. |
| Socials     | Hardcoded labels LinkedIn / GitHub / Email (personal founder accounts) in Header, MobileMenu, Footer, Contact.         |

### Home `/` — `src/pages/[lang]/index.astro` (segments in render order)

| #   | Segment (component)                               | Copy and its purpose                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero (`HeroSection`)                              | `home.heroEyebrow` — mono label naming what we are. `home.heroNameBold` + `heroNameLight` — giant two-weight display title (currently the wordmark split). `home.heroPara1` — value proposition + current flagship project (supports markdown link). `home.heroPara2` — capabilities/stack credibility line. `home.heroCta` — primary CTA (currently opens a Gmail compose window, not a scheduler). |
| 2   | Projects (`ProjectsSection`), side by side with 3 | `home.workTitle` + `home.workSupport` — section title and subtitle. Each card uses project `title`, `client`, `resultHeadline` (outcome hook), `stack`, `type` badge, and `home.viewProject`. `home.viewAllProjects` — CTA.                                                                                                                                                                          |
| 3   | Writings (`WritingsSection`)                      | `home.writingsTitle` + `home.writingsSupport` — title/subtitle. Lists post `title` + `date`. `home.readBlog` — CTA to blog.                                                                                                                                                                                                                                                                          |
| 4   | Services teaser (`ServicesTeaserSection`)         | `home.servicesTeaserTitle` + `servicesTeaserSupport` — title/subtitle. First 3 services' `title` + `desc`. `home.servicesTeaserCta` — CTA to /services.                                                                                                                                                                                                                                              |
| 5   | How we work (`HowSection`)                        | `home.howTitle` — section title. `home.howItems[5]` — each has `title` (principle name) + `desc` (paragraph explaining the principle).                                                                                                                                                                                                                                                               |
| 6   | Stack (`StackSection`)                            | `home.stackTitle` — title. `home.stackDesc` — long paragraph on stack philosophy. Chips list technologies (hardcoded in component).                                                                                                                                                                                                                                                                  |
| 7   | Contact (`ContactSection` → `CtaBlock`)           | `contact.title` — heading. `contact.desc` — invitation + response time + engagement types. `contact.cta` — button.                                                                                                                                                                                                                                                                                   |
| —   | SEO                                               | Page `title`, `description`, `ProfessionalService` JSON-LD (`name`, `description`, `knowsAbout`) — hardcoded in the page, EN only.                                                                                                                                                                                                                                                                   |

### Services `/services` — `src/pages/[lang]/services.astro`

| #   | Segment         | Copy and its purpose                                                                                                                                          |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Page header     | `services.eyebrow` — label. `services.titleBold` + `titleLight` — two-weight title. `services.support` — positioning subtitle.                                |
| 2   | Service list    | All 4 services: `title`, `desc`, `deliverables` (bullets) from `src/content/services/*.md`.                                                                   |
| 3   | Process         | `services.processTitle` + `services.process[4]` — each step `title` + one-line `desc`.                                                                        |
| 4   | Ways of working | `services.modalitiesTitle`, `services.featuredLabel` (badge on the featured option) + `services.modalities[3]` — each `title`, `desc`, `features[3]` bullets. |
| 5   | FAQ             | `services.faqTitle` + `services.faq[4]` — `q`/`a` pairs (generic, studio-level).                                                                              |
| 6   | CTA block       | `contact.title` (heading), `services.ctaSupport` (one-line nudge), `contact.cta` (button).                                                                    |
| —   | SEO             | Title = `services.eyebrow` + brand; description = `services.support`.                                                                                         |

### Service detail `/services/:slug` — `src/pages/[lang]/services/[slug].astro`

| #   | Segment      | Copy and its purpose                                                                                       |
| --- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| 1   | Breadcrumb   | `project.breadcrumbHome`, `services.detail.breadcrumbServices`.                                            |
| 2   | Hero         | `title` (service name) + `problem` (the pain this service solves, as the lead).                            |
| 3   | Description  | `desc` — what we do about it. `stack` chips under `services.detail.stackLabel`.                            |
| 4   | Deliverables | `services.detail.deliverablesLabel` + `deliverables[]` bullets.                                            |
| 5   | Related work | `services.detail.relatedLabel` + project cards for `relatedProjectIds` (only if set).                      |
| 6   | FAQ          | `services.detail.faqLabel` + per-service `faq[]` `q`/`a`.                                                  |
| 7   | CTA block    | `contact.title`, `services.ctaSupport`, `services.detail.ctaLabel`; `services.detail.backLabel` back link. |
| —   | SEO          | Title = service `title` + brand; `Service` JSON-LD with the studio as provider.                            |

### Project detail `/projects/:slug` — `src/layouts/ProjectLayout.astro`

| #   | Segment            | Copy and its purpose                                                                                                                                                                                                                                                            |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Breadcrumb         | `project.breadcrumbHome`, `project.breadcrumbProjects`.                                                                                                                                                                                                                         |
| 2   | Hero               | `title`, `resultHeadline` (outcome in one line), meta rows with `project.roleLabel/clientLabel/periodLabel/stackLabel` → `role`, `client`, `period`, `stack`. Type badge `project.typeOwn/typeThirdParty/typeFreelance`. Links `project.viewDemo` / `viewRepo` when URLs exist. |
| 3   | Sticky section nav | Labels from `project.section*` — only sections with content appear.                                                                                                                                                                                                             |
| 4   | Context            | `project.sectionContext` + `context` — the client's situation.                                                                                                                                                                                                                  |
| 5   | Conditions         | `project.sectionConditions` + `conditions` — constraints we had to respect.                                                                                                                                                                                                     |
| 6   | Solution           | `project.sectionSolution` + `solution` — what we built and why.                                                                                                                                                                                                                 |
| 7   | Tools              | `project.sectionTools` + `tools[]` (`name` + `reason`); `project.alternativesDiscarded` label.                                                                                                                                                                                  |
| 8   | Key features       | `project.sectionFeatures` + `features[]` (`name` + `reason`).                                                                                                                                                                                                                   |
| 9   | Results            | `project.sectionResults` + `results[]` (`name` = metric, `reason` = explanation).                                                                                                                                                                                               |
| 10  | Gallery            | `project.sectionGallery` + images; lightbox a11y labels `project.lightbox*`.                                                                                                                                                                                                    |
| —   | Fallback           | If no extended sections: `summary` + `highlights[]`.                                                                                                                                                                                                                            |
| 11  | Prev / next        | `project.prevProject` / `nextProject`, `project.back`.                                                                                                                                                                                                                          |

### Blog index `/blog` — `src/pages/[lang]/blog/index.astro`

| #   | Segment     | Copy and its purpose                                                                           |
| --- | ----------- | ---------------------------------------------------------------------------------------------- |
| 1   | Page header | `blog.eyebrow`, `blog.titleBold` + `titleLight`, `blog.support` — positioning of the blog.     |
| 2   | Featured    | `blog.featuredLabel` badge + newest post `title`, `excerpt`, `tags`, date, `blog.readingTime`. |
| 3   | Post list   | Remaining posts, same fields; `blog.readMore`.                                                 |

### Blog post `/blog/:slug` — `src/layouts/BlogLayout.astro`

| #   | Segment     | Copy and its purpose                                                                           |
| --- | ----------- | ---------------------------------------------------------------------------------------------- |
| 1   | Header      | Breadcrumb, `title`, `blog.publishedLabel`/`updatedLabel` + dates, `blog.readingTime`, `tags`. |
| 2   | Body        | Markdown article body (founder-written, first person is acceptable here).                      |
| 3   | Author card | Hardcoded founder name + `blog.authorBioText` (founder bio tying them to the studio).          |
| 4   | Related     | `blog.relatedHeading` + related posts; `blog.backToBlog`.                                      |

### Contact `/contact` — `src/pages/[lang]/contact.astro`

| #   | Segment     | Copy and its purpose                                                                                                                                                                                                                           |
| --- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Page header | `contactPage.eyebrow`, `contactPage.titleBold` + `titleLight`, `contactPage.support` (response promise).                                                                                                                                       |
| 2   | Form        | Field labels `contactPage.form*Label`; `formProjectTypeOptions[6]` (what the visitor needs); `formBudgetOptions[5]` (budget bands); `formSubmit`/`formSubmitting`; feedback `formSuccess`, `formError`, `formRequiredError`, `formEmailError`. |
| 3   | Side column | `contactPage.channelsLabel` + email/LinkedIn/GitHub links; `contactPage.availabilityLabel` + `availabilityText` (timezone + capacity).                                                                                                         |

### 404 — `src/pages/404.astro`

`notFound.eyebrow`, `title`, `support` (explain the broken link), `ctaHome` / `ctaProjects` buttons, and `linkProjects/linkServices/linkBlog` quick links.

### Machine-facing copy

- `public/llms.txt` — brand summary + page index for LLM crawlers (EN only).
- `public/icons/site.webmanifest` — app `name` / `short_name`.
- `scripts/generate-og.mjs` — default OG image: brand name + tagline. `src/lib/utils/ogImage.ts` — per-page OG (title + subtitle).

---

## 5. Known issues to resolve (copy and distribution)

Observed during the rebrand; these are **open decisions**, not changes already made.

1. **No projects index page.** `home.viewAllProjects` and the 404 `ctaProjects` both point to `/#projects`, i.e. back to the home section.
2. **Hero CTA mismatch.** `home.heroCta` says "Schedule a call", but the link opens a Gmail compose window — there is no scheduler.
3. **Home order reads like a portfolio.** Order is Hero → Projects + Writings → Services → How → Stack → Contact. For a studio, services/value usually come before proof, and Writings competes with Projects in the same row.
4. **Project type badges** (`project.typeThirdParty` = "Employee", `typeFreelance`) describe an individual's employment relationship, not studio work.
5. **Personal contact channels.** Email, LinkedIn and GitHub are the founder's personal accounts across Header, MobileMenu, Footer, Contact and JSON-LD.
6. **Hero voice vs. manual.** The hero paragraphs are stack-heavy; the manual's "Claros" rule asks for outcomes over technicalities. Same for `home.stackDesc` (long, technical).
7. **Ways-of-working pricing language** ("Fixed price or milestone billing", "Monthly retainer") and budget bands need validation for the studio's real offer.
8. **SEO copy is EN-only** (home `title`/`description`, JSON-LD, `llms.txt`) even on `/es/` pages.
9. **Manual eyebrow style unused.** The manual numbers eyebrows (`01 · …`); the site's eyebrows are unnumbered.
10. **Removed `/cv` route.** It no longer exists; external links to `/en/cv` or `/es/cv` should get a 301 to `/` at the host.

## 6. Constraints for the next agent

- Keep EN and ES in sync: every i18n key and every content `en`/`es` block must change together.
- Spanish copy: neutral Spanish with "tú" (per the manual), not voseo.
- Respect array lengths the UI assumes, or check the component: `howItems` (5), `process` (4), `modalities` (3, one `featured`), `services.faq` (4).
- Verify with `bun run build`; OG/icons regenerate from `scripts/generate-og.mjs` during the build.
