# GSAP motion system
Objective: replace `motion@11` with a GSAP motion system (entrances, exits, emphasis, timelines, page navigation).
Branch: `feat/gsap-motion` · Delivery: single-pr · Checks: `bunx astro check`, `bunx astro build` (no test runner).

## Specs
- S1: "usa las skills de gsap instaladas y genera una propuesta de implementacion de gsap en la pagina. Entradas, salidas, enfasis, timelines, navegacion entre paginas"
- S2: Navigation style chosen: "Híbrido" — keep ClientRouter and `transition:name` morphs; GSAP animates content exit before the swap and entrance after.
- S3: Respect `prefers-reduced-motion` (content visible, no animation).
- S4: "todos los segmenetos deben tener sus animaciones de Gsap (faltan @src/components/sections/ProofSection.astro )"
- S5: "el morpho igual se ha perdido, implementa la animacion de navegacion mas llamativa que ofreciste con GSAP" — the offered "Cortina GSAP" option: "Overlay violeta/night que barre la pantalla en salida, swap oculto, barre en entrada. Más dramático y con marca, pero tapa los morphs de títulos (se pierden)." Supersedes S2.
- Plan: `~/.claude/plans/usa-las-skills-de-glimmering-gem.md` (approved).

## Tasks
- T1 [S1,S3] Core `src/lib/motion/gsap.ts` + reveal migration (parity), drop `motion` — inline — done c2a5489
- T2 [S2] Page navigation exit/enter (`page.ts`) — inline — done 8edc9c6
- T3 [S1] Home hero + PageHero timelines (SplitText) — inline — done 6a5a1d7
- T5 [S4] ProofSection + detail heroes (project/service/post) + detail bodies — inline — done (see L7)
- T6 [S5] GSAP curtain transition, drop transition:name morphs — inline — done (see L7)
- T4 [S1] Emphasis (magnetic CTAs, hero emphasis) + scroll (How progress, PageHero parallax) — inline — done 3db8338

## Log
- L1 (2026-10-21): "usa las skills de gsap instaladas y genera una propuesta de implementacion de gsap en la pagina. Entradas, salidas, enfasis, timelines, navegacion entre paginas"
- L2: User chose "Híbrido (Recommended)" for navigation; plan approved.
- L3: No test runner in repo; verification is type check + build. Browser check only if user authorizes.
- L4: All 4 units built clean (`astro build` OK; `astro check` 4 errors, all pre-existing in SiteHeader.astro and og/*.png.ts). Browser check pending user authorization.
- L5: Deviations from plan: SectionDivider draw and PixelGrid rect fade skipped (rects are visible before JS, would flicker); counters skipped (no numeric stats). Exit skips `main > *` sections that contain `transition:name` elements so morphs keep a visible source.
- L6 (2026-10-21): "error con el h1 del hero" — SplitText masks clipped descenders; fixed with `.split-mask-mask` padding (8f9c5ee).
- L7 (2026-10-21): "-todos los segmenetos deben tener sus animaciones de Gsap (faltan @src/components/sections/ProofSection.astro ) -el morpho igual se ha perdido, implementa la animacion de navegacion mas llamativa que ofreciste con GSAP". Added reveal/hero hooks to ProofSection and the project, service and post detail pages; replaced the content fade-out and transition:name morphs with a persisted 6-column violet/night curtain (`src/lib/motion/curtain.ts`). Build OK, astro check 4 pre-existing errors. Browser check pending.
