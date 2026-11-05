---
name: Wedevs
description: Paper surfaces, night bands and one electric violet; a software studio drawn like a blueprint with a single lamp lit.
colors:
  paper: "#fafaf7"
  paper-2: "#f4f2ee"
  paper-3: "#ecebe5"
  mist: "#eef0f5"
  white: "#ffffff"
  night: "#111216"
  night-2: "#22242b"
  graphite: "#40424b"
  slate: "#55575f"
  fog: "#b4b7c2"
  night-copy: "#c5c8d2"
  night-meta: "#9a9da8"
  violet: "#4f55e8"
  violet-soft: "#8f94ff"
  ink-prose: "#2a2c33"
  line-night: "rgba(17, 18, 22, 0.12)"
  line-night-strong: "rgba(17, 18, 22, 0.2)"
  line-paper: "rgba(255, 255, 255, 0.3)"
  legacy-ink: "#f6f5f2"
  legacy-muted: "#a9aab0"
  legacy-accent: "#6b80ff"
  legacy-surface: "#15161a"
  legacy-line: "rgba(246, 245, 242, 0.08)"
  error: "#b91c1c"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(44px, 8vw, 120px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.055em"
  display-light:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(42px, 6vw, 88px)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(26px, 3.2vw, 40px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 19px)"
    fontWeight: 400
    lineHeight: 1.7
  support:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "6px"
  card: "20px"
  pill: "9999px"
spacing:
  page-x: "clamp(20px, 4vw, 56px)"
  band-y: "clamp(56px, 8vw, 104px)"
  hero-top: "clamp(56px, 8vw, 120px)"
  hero-bottom: "clamp(40px, 5vw, 72px)"
  card-pad: "clamp(24px, 3vw, 40px)"
  stack: "20px"
  grid-x: "64px"
  grid-y: "32px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "16px 26px"
  button-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-night-hover:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-on-violet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "18px 30px"
  button-on-violet-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.violet}"
    rounded: "{rounded.pill}"
    padding: "18px 30px"
  button-outline:
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-outline-on-night:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.night}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px 12px 44px"
  chip-index:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  card-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  panel-paper:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "clamp(20px, 3vw, 32px)"
  eyebrow:
    textColor: "{colors.violet-soft}"
    typography: "{typography.label}"
---

# Design System: Wedevs

## Overview

**Creative North Star: "The Blueprint with One Lamp Lit"**

The site is drawn like an engineer's blueprint. Most of the sheet is cool, slightly warm paper where people read and decide; the important moments are framed in deep night bands that carry the title, the proof and the footer. Across both, a faint mosaic of pixel cells and hairline rules gives the sheet its grid. There is exactly one light source: an electric violet that marks where to act, what to emphasise and what is live. Everything else stays in ink, graphite and fog.

Density is generous and typographic. Headlines are set huge, extremely tight and either feather-light or extra-bold, so hierarchy comes from weight and scale rather than from boxes or shadows. Supporting copy is small and calm. Labels are monospaced, uppercase and widely tracked, numbered like sections of a specification ("01 · SERVICES"). Motion is part of the material: text rises out of a mask, the logo draws itself, pixel cells flicker in, and anything interactive glides on one signature ease.

The system is flat. No drop shadows, no gradients on surfaces, no glassy blur as decoration. Depth is a change of sheet (paper to night) or a hairline, never a lift. The retiring dark-only palette (ink on near-black with a periwinkle accent) still exists in a few components; it is documented as legacy so new work does not extend it.

**Key Characteristics:**
- Two sheets, paper and night, alternating in full-bleed bands.
- One accent, violet, used for action, emphasis and the live state; a softer violet only on night.
- Manrope at extreme weights (300 and 800) with negative tracking; JetBrains Mono for all labels and metadata.
- Pill geometry for every control; 20px corners for cards; 6px for fields.
- Flat surfaces, hairline borders at 12 to 20 percent ink, no shadows except one popover.
- Deterministic pixel-grid mosaics as texture, never imagery.
- GSAP motion on a single signature ease, respecting reduced motion.

## Colors

A near-monochrome sheet of warm paper and cool night, lit by a single electric violet.

### Primary
- **Electric Violet** (`{colors.violet}`): the one lamp. Fills the primary pill button, the contact band, form labels and the active or hovered navigation link. It also colours the extra-bold emphasis inside the home headline. On night surfaces it steps up to **Soft Violet** (`{colors.violet-soft}`) for eyebrows, the slash in the footer wordmark and hover states, where the full violet would sink.

### Neutral
- **Paper** (`{colors.paper}`): the default page background and the text colour on night. Slightly warm, never pure white.
- **Paper 2** and **Paper 3** (`{colors.paper-2}`, `{colors.paper-3}`): the next two sheets down, used for inset panels, index chips and quoted blocks on paper. **Mist** (`{colors.mist}`) is a cool variant used sparingly.
- **White** (`{colors.white}`): reserved for form fields, the popover list, the button on violet and text on the violet band.
- **Night** (`{colors.night}`): the dark sheet. Hero column, page heroes, footer, dark cards and the primary text colour on paper. **Night 2** (`{colors.night-2}`) is its one lighter step for small tags on night.
- **Graphite** (`{colors.graphite}`) and **Slate** (`{colors.slate}`): body and supporting text on paper, from lead paragraphs down to FAQ answers and field icons.
- **Ink Prose** (`{colors.ink-prose}`): long-form reading text on paper (case studies, articles, policy sections); one step lighter than Night so paragraphs sit under the headings.
- **Fog** (`{colors.fog}`): metadata and the mono eyebrow on night.
- **Night Copy** and **Night Meta** (`{colors.night-copy}`, `{colors.night-meta}`): support paragraphs and footer fine print on night.
- **Hairlines**: `{colors.line-night}` for dividers and card borders on paper, `{colors.line-night-strong}` for outlined pills and field borders, `{colors.line-paper}` for outlined pills on night and violet.
- **Error** (`{colors.error}`): inline form validation text only.

### Legacy (retiring)
- **Legacy Ink, Muted, Accent, Surface, Line** (`{colors.legacy-ink}`, `{colors.legacy-muted}`, `{colors.legacy-accent}`, `{colors.legacy-surface}`, `{colors.legacy-line}`): the original dark-only palette. Still present in the logo slash, the numbered section label, the dark CTA block, the project card and the 404 page. Do not introduce them on new surfaces; migrate toward Night, Fog and Violet when touching those components.

### Named Rules
**The One Lamp Rule.** Violet is the only chromatic colour on any screen. It marks the action, the emphasis or the live state, and nothing else. If two things on one viewport are violet, one of them is wrong.

**The Two Sheets Rule.** A surface is either paper or night. Depth is a change of sheet, not a tint, a gradient or a shadow.

## Typography

**Display Font:** Manrope (with system-ui, sans-serif)
**Body Font:** Manrope
**Label/Mono Font:** JetBrains Mono (with monospace)

**Character:** Manrope at its extremes gives the site its voice: 300 for the quiet half of a headline, 800 for the half that matters, both tracked hard negative and set at viewport-scaled sizes. JetBrains Mono carries every label, number and piece of metadata, widely tracked and uppercase, like annotations on a drawing. The root size is 17px, so the small text reads larger than its rem suggests.

### Hierarchy
- **Display** (800, `clamp(44px, 8vw, 120px)`, 0.92, -0.055em): page hero titles on night and the contact band headline on violet. Balanced wrapping (`text-wrap: balance`).
- **Display Light** (300 with an 800 emphasis span, `clamp(42px, 6vw, 88px)`, 1.1, -0.05em): the home hero only. The emphasis span is violet, with cloned decoration so highlighted words wrap cleanly.
- **Headline** (700, `clamp(26px, 3.2vw, 40px)`, 1.15, -0.02em): section titles on paper. Smaller clamps (`clamp(22px, 2.4vw, 30px)` to `clamp(24px, 2.8vw, 32px)`) appear for sub-sections; keep them in this family.
- **Title** (600, 1.125rem, 1.3, -0.015em): FAQ questions, card titles, list headings.
- **Lead** (400, `clamp(17px, 1.5vw, 19px)`, 1.7): the opening paragraph of a reading page or section (project, service, about, privacy), max-width 760px, in Ink Prose.
- **Support** (400, 1.125rem, 1.55): the short paragraph beside a hero title, max-width 460 to 480px, in Graphite on paper or Night Copy on night.
- **Body** (400, 15px, 1.6): all running copy, FAQ answers (max 68ch), form fields.
- **Caption** (400, 13px, 1.5): card metadata, result lines, footer navigation, index chips.
- **Micro** (JetBrains Mono 500, 11px, 1.4, 0.02em): stack tags and the smallest mono labels, usually uppercase and tracked wider by the component.
- **Label** (JetBrains Mono 500, 0.75rem, 0.12em tracking, uppercase): eyebrows, form labels, footer menu heading. The numbered section label uses 0.08em tracking.
- **Mono** (JetBrains Mono 400, 0.75rem, 0.02em): metadata, copyright, language toggle, stack tags.

### Named Rules
**The Two Weights Rule.** A headline uses at most two weights, far apart (300 and 800, or 400 and 700). Never 500 next to 600.

**The Annotation Rule.** Anything that labels, numbers or dates content is monospaced, uppercase and tracked. Body text is never monospaced; labels are never Manrope.

## Layout

Pages are full-bleed bands stacked vertically, each with a horizontal padding of `{spacing.page-x}` and vertical padding around `{spacing.band-y}`. Heroes pad `{spacing.hero-top}` above and `{spacing.hero-bottom}` below and sit on night. Reading content is centred in a 60rem column (`max-w-base`) with 24px side padding; long-form prose narrows further to 720 to 880px.

Two-column bands use asymmetric grids: the home hero splits 5fr/7fr (night column left, paper column right) and fills the viewport height on large screens; page heroes split 7fr/5fr with the title left and the lead right, aligned to the bottom. The services and process sections on inner pages use a 150px label column beside a fluid content column. Gaps are `{spacing.grid-x}` horizontally and `{spacing.grid-y}` vertically; element stacks use `{spacing.stack}`.

Responsive behaviour relies on the default breakpoints (640px, 768px, 1024px). Below 768px grids collapse to one column, the desktop navigation hides behind a round menu button, and the home hero stacks night over paper. Type and padding scale continuously with `clamp()` rather than jumping at breakpoints. The header is sticky on inner pages, hides after 1.2s of idle scrolling and returns when the pointer nears the top; on the home page the navigation lives inside the hero instead.

## Elevation & Depth

The system is flat. Surfaces never lift; depth is conveyed by switching sheets (paper to night to violet) and by hairlines at 12 to 20 percent ink. Texture comes from the pixel-grid atmosphere (`PixelGrid`): a hairline grid at 12 percent of the cell colour aligned to an inline SVG of square cells with scattered low opacities (2 to 12 percent), under a film-grain overlay at 28 percent. Heroes and large night bands add `glow`: one violet lamp on the bottom edge whose body sinks toward night and whose upper edge is displaced by fractal noise so it reads as cloud, never as a hard gradient; it is the one sanctioned gradient on a surface, breathes slowly, and stays still under reduced motion. Small cards get the grid and grain only. The retiring glow orb (a blurred radial of 6 percent paper) survives on the legacy dark CTA.

### Shadow Vocabulary
- **Popover** (`box-shadow: 0 12px 32px -12px rgba(17, 18, 22, 0.25)`): the custom select's open list only. It is the single shadow in the system.

### Named Rules
**The No-Lift Rule.** Cards, buttons and bands cast no shadow at rest or on hover. Hover changes colour, border or position by one pixel, never elevation. Only a floating menu may cast the popover shadow.

## Shapes

Every control is a pill (`{rounded.pill}`): primary buttons, outlined buttons, language toggle, menu button, index chips and tags. Containers are soft: dark cards and the sticky contact panel use `{rounded.card}`; inset paper panels, form fields and the select popover use `{rounded.md}`; tiny stack tags use `{rounded.sm}`. The violet emphasis inside the home headline is a 2rem-radius highlight with `box-decoration-break: clone`.

Borders are hairlines, one pixel, at 12 percent for dividers, 20 percent for outlined pills and fields, up to 50 percent on hover. Bands have no border radius and run edge to edge; the only clipped geometry is the home hero's night column, which wipes in with `clip-path` and the pixel grid cropped with `preserveAspectRatio: slice`. A zig-zag SVG divider exists for legacy dark transitions and is not used on paper.

## Components

### Buttons
- **Shape:** pill (`{rounded.pill}`), bold Manrope, no underline, arrow glyph "↗" or "→" as a trailing character when the action leaves the page or scrolls.
- **Primary** (`button-primary`): Electric Violet fill, white text, 16px 26px padding. Hover drops to 90 percent opacity. Carries `data-magnetic` so it drifts toward the pointer (GSAP quickTo, 0.4s, power3).
- **Night** (`button-night`): Night fill, Paper text, 10px 16px, in the sticky header and mobile menu. Hover fills Violet.
- **On violet** (`button-on-violet`): white fill, Night text, 18px 30px, in the contact band. Hover turns the text Violet.
- **Outline** (`button-outline`): transparent, one-pixel border at 20 percent Night, Night text; on night or violet the border is `{colors.line-paper}` and the text Paper. Hover raises the border to 50 or 100 percent. Used for the language toggle and secondary actions.
- **Ghost text link**: Night text, no border, same padding as a pill; hover turns Violet. Used as the secondary hero action.
- **Legacy pills** (`pill-btn-primary`, `pill-btn-secondary` utilities): periwinkle accent on near-black, 28px 14px padding, one-pixel rise on hover. Retiring; do not add new instances.

### Chips
- **Index chip** (`chip-index`): Paper 3 fill, Night text, 13px, pill. Lists sections or tags on paper.
- **Stack tag**: Night 2 fill, 11px mono, light grey text, `{rounded.sm}`. Tech names on dark project heroes.
- **Legacy chip** (`chip` utility): outlined in legacy line, muted text, pill, border turns accent on hover. Used by the project card type label.

### Cards / Containers
- **Dark card** (`card-night`): Night fill, Paper text, `{rounded.card}`, padding `{spacing.card-pad}`, minimum height 200 to 220px, content justified between top and bottom, optional pixel grid behind. Used for related projects, blog teasers and the sticky contact details panel.
- **Paper panel** (`panel-paper`): Paper 3 fill, `{rounded.md}`, padding `clamp(20px, 3vw, 32px)`, max 820px. Quoted or highlighted prose inside articles.
- **Legacy card** (`card` utility): legacy surface fill, legacy line border, 16px radius, hover lightens both. Project list cards and the dark CTA block.
- **Shadow strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** white fill, one-pixel border at 20 percent Night, `{rounded.md}`, 15px Manrope, 12px vertical padding, 44px left padding to clear a 18px Lucide icon in Slate. Placeholder in Slate at 70 percent.
- **Label:** Violet mono label above the field, 0.1em tracking, uppercase.
- **Hover / Focus:** border and icon turn Violet. Fields opt out of the global focus outline; the global outline elsewhere is 2px in `--focus-ring` with a 2px transparent offset.
- **Error:** a small red (`{colors.error}`) line beneath the field, `role="alert"`, hidden when empty.
- **Select:** a button styled as a field with a rotating chevron; the list is a white popover with the popover shadow, 6px padding, options at 15px with a 10 percent Violet active row, Violet text and check mark when selected.

### Navigation
- **Inner pages:** sticky Paper header, 18px vertical padding, hairline bottom border. Links at 15px Manrope in Night; hover Violet; the active section is Violet and bold with `aria-current`. Right side holds the mono language pill and the Night "Let's talk ↗" pill. Below 768px the links move into a Paper drawer with hairline-separated 18px rows.
- **Home:** no header; the paper column of the hero carries the same links and the outlined "Let's talk ↗" pill, while the night column carries the logo and language toggle.
- **Footer:** Night band with a giant "W/edevs" wordmark (800, `clamp(40px, 5vw, 64px)`, slash in Soft Violet), a mono menu heading in Soft Violet, 15px Paper links that hover Soft Violet, and a mono fine-print row above a 15 percent white hairline.

### Section label (signature)
A numbered monospaced eyebrow, "01 · SERVICES", uppercase at 0.08em tracking, rendered as a paragraph or an `h2`. It opens every major section and anchors the specification feel.

### Pixel grid (signature)
A deterministic SVG mosaic of 1×1 cells in Soft Violet (or white on violet) at 1.5 to 12 percent opacity, seeded per surface so it never changes between builds. It sits behind heroes, dark cards and the contact band, anchored top, cropped to cover when needed. It is texture, never content.

### Logo
The "w/" monogram: a 6px-stroke polyline "w" in the current ink colour and a slash in Electric Violet on paper or Soft Violet on night (the `slash` prop), optional wordmark. The slash is the one place the brand colour appears inside a glyph; on the home hero it draws itself in with DrawSVG.

### Links and focus (every surface)
Links and list markers take `--link-color` and the focus outline takes `--focus-ring`; both are Electric Violet on paper surfaces, Soft Violet on night, and white on the violet band. Focus is a 2px outline with a 2px transparent offset, so the surface shows through and no offset colour exists.

### Motion (applies to every component)
- One easing everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` as `--ease-signature` in CSS and as GSAP's default ease; default GSAP duration 0.5s.
- Reveals: elements start at `autoAlpha: 0, y: 16px` and settle in with a 0.15s base delay; grouped children stagger by 0.06s.
- Heroes: words or lines rise 105 to 110 percent out of a mask with a 0.05 to 0.08s stagger over 0.8 to 0.9s; the pixel grid flickers in randomly over 0.9s; chrome fades in last.
- Hover transitions on links and buttons: colour, border and background over 150ms.
- Pointer-following "magnetic" pills: GSAP quickTo on x/y, 0.4s, power3.
- Reduced motion: nothing is hidden, nothing animates, the glow stops breathing.

## Do's and Don'ts

### Do:
- **Do** alternate full-bleed Paper and Night bands; put the title, the proof and the footer on Night.
- **Do** reserve Electric Violet for one action or emphasis per viewport, and switch to Soft Violet on Night.
- **Do** set headlines in Manrope at two far-apart weights with negative tracking (-0.05em or tighter at display size).
- **Do** use JetBrains Mono, uppercase, tracked 0.08 to 0.12em, for every label, number and date.
- **Do** make every control a pill and every card a 20px-radius block; fields and panels get 6px.
- **Do** scale type and padding with `clamp()` and keep horizontal page padding at `clamp(20px, 4vw, 56px)`.
- **Do** seed each pixel grid so it renders identically on every build, and keep its cells under 12 percent opacity.
- **Do** start motion targets hidden only under `prefers-reduced-motion: no-preference`, and reveal them with GSAP `autoAlpha` on the signature ease.

### Don't:
- **Don't** add a second accent hue, a gradient fill or a tinted surface; the only colours besides Violet are paper and ink neutrals.
- **Don't** cast shadows on cards, buttons or bands; the select popover is the single exception.
- **Don't** use mid weights (500, 600) in display or headline sizes, or set a headline in JetBrains Mono.
- **Don't** extend the legacy dark palette (periwinkle `#6b80ff`, near-black `#0e0f12`, ink `#f6f5f2`) to new surfaces; migrate it when touched.
- **Don't** use photographs, illustrations or icon decoration as texture; the pixel grid and hairlines are the only ornament.
- **Don't** underline navigation or button text; links in running copy are the only underlined text.
- **Don't** blur or frost surfaces for decoration; `backdrop-blur` is limited to the mobile menu overlay.
