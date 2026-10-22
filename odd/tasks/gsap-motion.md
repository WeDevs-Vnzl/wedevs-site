# GSAP motion system
Objective: replace `motion@11` with a GSAP motion system (entrances, exits, emphasis, timelines, page navigation).
Branch: `feat/gsap-motion` · Delivery: single-pr · Checks: `bunx astro check`, `bunx astro build` (no test runner).

## Specs
- S1: "usa las skills de gsap instaladas y genera una propuesta de implementacion de gsap en la pagina. Entradas, salidas, enfasis, timelines, navegacion entre paginas"
- S2: Navigation style chosen: "Híbrido" — keep ClientRouter and `transition:name` morphs; GSAP animates content exit before the swap and entrance after.
- S3: Respect `prefers-reduced-motion` (content visible, no animation).
- Plan: `~/.claude/plans/usa-las-skills-de-glimmering-gem.md` (approved).

## Tasks
- T1 [S1,S3] Core `src/lib/motion/gsap.ts` + reveal migration (parity), drop `motion` — inline — done c2a5489
- T2 [S2] Page navigation exit/enter (`page.ts`) — inline — done 8edc9c6
- T3 [S1] Home hero + PageHero timelines (SplitText) — inline — done 6a5a1d7
- T4 [S1] Emphasis (magnetic CTAs, hero emphasis) + scroll (How progress, PageHero parallax) — inline — done 3db8338

## Log
- L1 (2026-10-21): "usa las skills de gsap instaladas y genera una propuesta de implementacion de gsap en la pagina. Entradas, salidas, enfasis, timelines, navegacion entre paginas"
- L2: User chose "Híbrido (Recommended)" for navigation; plan approved.
- L3: No test runner in repo; verification is type check + build. Browser check only if user authorizes.
- L4: All 4 units built clean (`astro build` OK; `astro check` 4 errors, all pre-existing in SiteHeader.astro and og/*.png.ts). Browser check pending user authorization.
- L5: Deviations from plan: SectionDivider draw and PixelGrid rect fade skipped (rects are visible before JS, would flicker); counters skipped (no numeric stats). Exit skips `main > *` sections that contain `transition:name` elements so morphs keep a visible source.
