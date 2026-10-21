---
# Sample placeholder post — demonstrates the article prose styling. Replace with real writing.
lang: en
title: "What I learned building Kairos CMS's multi-tenant architecture"
excerpt: "Notes on isolating tenants behind per-project API keys without reaching for a heavier multi-tenancy framework."
date: 2026-06-02
tags: ["Architecture", "Node.js", "PostgreSQL"]
---

Kairos CMS needed to isolate eight client projects behind a single backend,
each with its own collections and API keys, without paying for eight
separate deployments. This post covers the parts of that design that turned
out to matter most.

## Start with the isolation boundary, not the schema

The instinct is to model projects and collections first and worry about
isolation later. That order bit us early: retrofitting a `project_id` filter
onto every query after the fact is how you get one leaked row in production.

> Isolation is not a `WHERE` clause you add later. It's the first constraint
> the schema has to satisfy.

Every table that holds tenant data carries a `project_id` foreign key from
its first migration, and every query path — no exceptions — goes through a
single data-access layer that injects that filter. No controller talks to
the database directly.

## Schemas as JSONB, not DDL migrations

Collection schemas are user-editable at runtime, which rules out relational
tables for field definitions. We persist them as `JSONB`:

```ts
type CollectionSchema = {
  fields: Array<{
    name: string;
    type: "text" | "number" | "boolean" | "date" | "media" | "relation";
    required: boolean;
  }>;
};
```

Records that predate a schema change are never mutated or dropped — they're
flagged `out_of_format` and surfaced to the editor, who decides what to do
with them. That single decision removed the need for a migration runner
entirely.

## The kill switch had to be boring

The endpoint kill switch reads `is_active` from the database on every
request — deliberately uncached. It would have been faster to cache it and
invalidate on write, but "faster" wasn't the requirement; "verifiably takes
effect everywhere in under two seconds" was. When the two goals conflict,
the boring implementation that's easy to reason about wins.

![Kairos CMS admin panel](/projects/kairos/kairos-1.webp)
<span class="caption">The collection field builder — every field type maps directly to the JSONB schema above.</span>

None of this is exotic. It's mostly about picking the constraint that
actually matters (isolation, editability, verifiability) and refusing to
trade it away for convenience.
