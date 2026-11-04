# Adding a project (case study)

A project is **one Markdown file with both languages in its frontmatter**. The
file has no body: every section of the case-study page comes from a field.

## Quick path

1. Pick an id, for example `acme-payments`. It becomes `/en/projects/acme-payments/`.
2. Put screenshots in `public/projects/acme-payments/` (`.webp`, 4:3 works best).
3. Create `src/content/projects/acme-payments.md` from the template below.
4. Set `order` to place it in the list (lower comes first).
5. Optional: link articles to it ([how](./relating-articles-and-projects.md)).
6. Run `pnpm build`.

## Template

```yaml
---
# ─── Metadata ────────────────────────────────────────────────────────────────
order: 3                       # position in lists, ascending
type: client                   # "client" or "own"
stack: [Nuxt 4, TypeScript, PostgreSQL]

coverImage: "/projects/acme-payments/cover.webp"   # optional; else gallery[0]
gallery:                                           # optional
  - "/projects/acme-payments/acme-1.webp"
  - "/projects/acme-payments/acme-2.webp"

preview_url: https://acme.example.com/             # optional "View demo" link

# ─── English ─────────────────────────────────────────────────────────────────
en:
  title: "Acme Payments"
  client: "Acme Inc."
  period: "Jan 2026 – Present"
  role: "Full-Stack Developer"
  resultHeadline: "One sentence with the main measurable outcome."

  seoTitle: "Acme Payments: case study"                # optional, ≤60 chars
  seoDescription: "140 to 160 characters for search."  # optional

  summary: "Two or three sentences for the project card."   # optional
  highlights:                                               # optional
    - "Short bullet shown on the card"

  context: >-                  # optional; Markdown allowed (**bold**, *italic*)
    The situation before the project.
  conditions: >-               # optional
    Constraints: team, budget, hard technical limits.
  solution: >-                 # optional
    What was built and the key decisions.

  tools:                       # optional
    - name: "Nuxt 4"
      reason: "Why it was chosen over the alternatives."
  features:                    # optional
    - name: "Feature name"
      reason: "What it does and why it matters."
  results:                     # optional
    - name: "Result"
      reason: "Evidence or metric."

# ─── Español ─────────────────────────────────────────────────────────────────
es:
  title: "Acme Payments"
  client: "Acme Inc."
  period: "Ene 2026 – Presente"
  role: "Desarrollador Full-Stack"
  resultHeadline: "Una oración con el resultado medible principal."
  # …same optional fields as `en`, translated
---
```

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `order` | yes | Sort order on the projects list and "Next case" navigation. |
| `type` | yes | `client` or `own`. |
| `stack` | yes | Shown as chips. Quote names with special characters: `"PostgreSQL (Neon)"`. |
| `en` / `es` | yes | Both blocks need `title`, `client`, `period`, `role`, `resultHeadline`. |
| `coverImage`, `gallery` | no | Paths under `/public`. Gallery images open in a lightbox. |
| `preview_url` | no | External demo link. |
| `summary`, `highlights` | no | Card view. |
| `context`, `conditions`, `solution` | no | Prose sections; omitted sections are not rendered. |
| `tools`, `features`, `results` | no | Lists of `{ name, reason }`. |

## Good to know

- Projects do **not** list their articles. Articles point to projects, and the
  project page collects them automatically. See
  [relating-articles-and-projects.md](./relating-articles-and-projects.md).
- Services reference projects too, through `relatedProjectIds` in
  `src/content/services/*.md` (shown as "Where have we done this?").
- Renaming the file breaks every `relatedProjects` and `relatedProjectIds` that
  uses the old id. The build fails on article references, so it will tell you.

## Checklist

- [ ] Filename is the final id, lowercase kebab-case.
- [ ] Both `en` and `es` blocks have the five required fields.
- [ ] Every image path exists under `public/`.
- [ ] `pnpm build` passes.
