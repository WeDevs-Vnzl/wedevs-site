# Adding a testimonial

A testimonial is **one Markdown file with both languages in its frontmatter**.
Each file renders as one quote card in the proof section of the home page,
next to the latest blog article. With no files, no card is shown.

## Quick path

1. Get written approval from the client to publish the quote and their name.
2. Optional: add a square photo at `public/testimonials/<id>.webp` (at least 88×88 px).
3. Create `src/content/testimonials/<id>.md` from the template below, for
   example `novanet-studio.md`.
4. Set `order` (lower comes first).
5. Run `pnpm build` and check the home page in both languages.

## Template

```yaml
---
order: 1
name: "Jane Doe"                 # same in both languages
company: "Novanet Studio"        # same in both languages
avatar: "/testimonials/novanet-studio.webp"   # optional

en:
  quote: "The quote in English, without surrounding quotation marks."
  role: "CTO"
es:
  quote: "La cita en español, sin comillas alrededor."
  role: "CTO"
---
```

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `order` | yes | Card order, ascending. |
| `name`, `company` | yes | Shown as `Name · Role · Company`. |
| `avatar` | no | Path under `/public`. Without it, a striped placeholder is shown. |
| `en.quote`, `es.quote` | yes | The page adds the curly quotes; do not include them. |
| `en.role`, `es.role` | yes | Job title, translated if it differs. |

## Good to know

- The card heading ("What clients say" / "Lo que dicen los clientes") comes from
  `home.testimonial.title` in `src/lib/i18n/{en,es}.json`.
- Every testimonial file is shown. To hide one temporarily, move it out of
  `src/content/testimonials/`.
- With the folder empty, the build logs
  `No files found matching "**/*.md" in directory "src/content/testimonials"`.
  That warning is expected and harmless.
- Keep quotes short: one to three sentences read best in the card.

## Checklist

- [ ] The client approved the published wording.
- [ ] Both `en` and `es` have `quote` and `role`.
- [ ] `avatar` (if used) exists under `public/`.
- [ ] `pnpm build` passes.
