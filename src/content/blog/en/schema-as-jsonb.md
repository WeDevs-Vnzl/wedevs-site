---
# Sample placeholder post — demonstrates the article prose styling. Replace with real writing.
lang: en
title: "Why we store schemas as JSONB instead of migrations"
excerpt: "The tradeoff between relational rigor and a visual field builder that has to ship changes in seconds, not deploy cycles."
seoTitle: "Storing schemas as JSONB instead of migrations"
seoDescription: "The tradeoff between relational rigor and a visual field builder that has to ship schema changes in seconds, not deploy cycles, in a Postgres CMS."
date: 2026-05-18
tags: ["PostgreSQL", "Drizzle", "Backend"]
---

A visual field builder that lets a non-technical editor add a field and see
it live in under three minutes rules out a common tool in the backend
toolbox: DDL migrations.

## The constraint that shaped the decision

Every "add a field" action in the UI would otherwise need to become a
migration, reviewed and deployed like code. That's fine for a handful of
schema changes a year. It's not fine when editors expect changes to behave
like content updates.

## What JSONB buys you

Storing collection schemas as `JSONB` columns means a schema change is a
`UPDATE` statement, not a deploy:

```sql
UPDATE collections
SET schema = $1
WHERE id = $2;
```

Records already in the collection aren't touched. On read, each record is
checked against the _current_ schema; anything that doesn't match is
flagged `out_of_format` instead of silently coerced or dropped.

## What it costs you

You give up the database's own type checking and foreign-key integrity for
that data. Validation moves entirely into the application layer, and it has
to be taken seriously there — this is the one place where being lazy about
input validation is not an option, since the database will no longer catch
what you don't.

For Kairos CMS, that trade was worth it: schema changes needed to feel like
content edits, not deployments, and the validation layer was work we had to
do regardless.
