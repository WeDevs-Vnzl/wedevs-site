# Content guides

How to add content to the site without touching components. Every content type
is a Markdown file under `src/content/`, validated at build time by the schemas
in `src/content.config.ts`. If a field is wrong, `pnpm build` fails and names it.

| I want to… | Guide | Files go in |
|------------|-------|-------------|
| Publish a blog article | [adding-articles.md](./adding-articles.md) | `src/content/blog/{en,es}/` |
| Add a case study | [adding-projects.md](./adding-projects.md) | `src/content/projects/` |
| Add a client quote | [adding-testimonials.md](./adding-testimonials.md) | `src/content/testimonials/` |
| Link an article to a project | [relating-articles-and-projects.md](./relating-articles-and-projects.md) | article frontmatter |

## Rules that apply to everything

- **Bilingual.** Every piece of content ships in English and Spanish. Articles
  use one file per language; projects and testimonials hold both languages in
  one file.
- **The filename is the id.** It becomes the URL slug and the value other
  entries use to reference it. Use lowercase kebab-case (`my-project.md`) and
  do not rename it after publishing.
- **Images live in `/public`.** Reference them with an absolute path starting
  at `/` (for example `/projects/my-project/cover.webp`). Prefer `.webp`.
- **SEO overrides are optional.** `seoTitle` (≤60 chars) and `seoDescription`
  (140–160 chars) replace the title and summary in search snippets.

## Verify

```bash
pnpm build
```

The build must end with `Complete!` and no `[ERROR]` lines. Then check the new
page under `/en/…` and `/es/…` with `pnpm dev`.
