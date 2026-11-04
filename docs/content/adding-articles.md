# Adding a blog article

An article is **two Markdown files with the same filename**, one per language.
The filename becomes the slug in both languages, so the translations are linked
automatically (`/en/blog/<slug>/` ↔ `/es/blog/<slug>/`).

## Quick path

1. Pick a slug, for example `jsonb-schema-migrations`.
2. Create `src/content/blog/en/jsonb-schema-migrations.md` from the template below.
3. Create `src/content/blog/es/jsonb-schema-migrations.md` with the translation.
4. Optional: add a cover image under `public/blog/<slug>/`.
5. Optional: link it to a case study with `relatedProjects`
   ([how](./relating-articles-and-projects.md)).
6. Run `pnpm build`.

## Template

```markdown
---
lang: en                      # "en" or "es"; must match the folder
title: "Article title as it appears on the page"
excerpt: "One or two sentences shown on cards and the blog index."
seoTitle: "Search title, 60 chars max"                    # optional
seoDescription: "Search snippet, 140 to 160 characters."   # optional
date: 2026-10-21              # publish date, YYYY-MM-DD
updatedDate: 2026-11-02       # optional, last meaningful edit
tags: ["Architecture", "PostgreSQL"]
coverImage: "/blog/jsonb-schema-migrations/cover.webp"     # optional, 21:9
relatedProjects: ["my-project"]                            # optional
---

Opening paragraph: the problem and why it matters.

## First section

Body in regular Markdown: `##` headings, lists, `> quotes`, fenced code blocks.
```

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `lang` | yes | Must match the folder (`en/` or `es/`). |
| `title` | yes | Page `<h1>` and card title. |
| `excerpt` | yes | Card text and fallback meta description. |
| `date` | yes | Sorts the blog index; the newest post is featured on the home page. |
| `tags` | yes | Free text. Each tag becomes a filter on the blog index. Use the same spelling across posts; translate them in the `es` file. |
| `updatedDate` | no | Shown as "Updated" and used as `dateModified` in structured data. |
| `coverImage` | no | Rendered at 21:9 under the hero. |
| `relatedProjects` | no | Project ids. Shows a case-study card on the article and lists the article on the project page. |
| `seoTitle`, `seoDescription` | no | Search snippet overrides. |

## Good to know

- Reading time is computed from the body (200 words per minute).
- "Related posts" at the end of an article are the two newest posts in the same
  language. They are not chosen by hand.
- The OG image is generated from the title; no file is needed.
- Use `##` and `###` inside the body. The page already renders the `<h1>`.

## Checklist

- [ ] Both files exist with the **same filename**.
- [ ] `lang` matches the folder in each file.
- [ ] `relatedProjects` (if used) is identical in both files.
- [ ] `pnpm build` passes.
