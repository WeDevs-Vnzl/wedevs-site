# Relating articles and projects

The link is declared **once, on the article**, and works in both directions:

| Where | What appears |
|-------|--------------|
| Article page | A "Case study" card for each related project, above "Related posts". |
| Project page | An "Articles about this project" section with every article that cites it, newest first, in the page language. |

There is no field on the project side. That is deliberate: one source of truth
means the two sides can never disagree.

## Article → project

Add the project id (its filename in `src/content/projects/`, without `.md`) to
the article frontmatter **in both language files**:

```yaml
# src/content/blog/en/my-article.md
# src/content/blog/es/my-article.md
relatedProjects: ["my-project"]
```

An article can cite several projects:

```yaml
relatedProjects: ["my-project", "another-project"]
```

## Project → article (the reverse)

Nothing to edit. Once an article lists a project in `relatedProjects`, the
project page shows it on the next build.

So, to "add an article to a project", open the **article** and add the
project id to its `relatedProjects`.

## Rules

- **Same list in both languages.** The English project page only reads the
  `en` file and the Spanish page only reads the `es` file. If you add the id to
  only one, the link exists in only that language.
- **Ids must exist.** A typo fails the build with:
  `Blog post "en/<slug>" lists relatedProjects "<id>", which is not a file in src/content/projects.`
- **Renaming a project** means updating every article that cites it. Search
  with `rg 'relatedProjects' src/content/blog`.

## Checklist

- [ ] The id matches a filename in `src/content/projects/`.
- [ ] `relatedProjects` is identical in the `en` and `es` article files.
- [ ] `pnpm build` passes.
- [ ] The card shows on `/en/blog/<slug>/` and `/es/blog/<slug>/`.
- [ ] The article shows on `/en/projects/<id>/` and `/es/projects/<id>/`.
