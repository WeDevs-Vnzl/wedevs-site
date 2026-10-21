# Cómo registrar un proyecto nuevo en el portafolio

Un proyecto = **un solo archivo `.md` bilingüe** en `src/content/projects/`.

- El nombre del archivo es el **slug**: `src/content/projects/<slug>.md` → URL `/projects/<slug>`.
  Usa kebab-case, sin espacios (p. ej. `kairos-cms.md`).
- **Todo el contenido va en el frontmatter** (entre los `---`). No hay cuerpo Markdown.
- Debes llenar **ambos** bloques `en:` y `es:`. El HTML estático se renderiza en inglés; el
  script cliente (`src/scripts/i18n-client.ts`) intercambia al español según el idioma del usuario.
- En cualquier string puedes usar **`**negrita**`** e **`*itálica*`** — las renderiza `src/utils/md.ts`.
- Las rutas de `gallery` apuntan a archivos bajo `/public` (p. ej. `/projects/<slug>/img-1.webp`).

Fuente de verdad del schema: `src/content.config.ts`. Ejemplo completo: `src/content/projects/kairos-cms.md`.

---

## Plantilla en blanco (copiar y rellenar)

```markdown
---
# ─── Metadata (compartida entre idiomas) ──────────────────────────────────────
order: 0 # number · OBLIGATORIO · posición de orden (menor = primero)
type: freelance # "own" | "third-party" · OBLIGATORIO
stack: # string[] · OBLIGATORIO · tecnologías; entrecomilla si hay ( )
  [Tech A, Tech B, "PostgreSQL (Neon)"]

gallery: # string[] · OPCIONAL · rutas bajo /public
  - "/projects/<slug>/img-1.webp"
  - "/projects/<slug>/img-2.webp"

preview_url: "" # string · OPCIONAL

# ─── English ──────────────────────────────────────────────────────────────────
en:
  title: "" # OBLIGATORIO
  client: "" # OBLIGATORIO
  period: "" # OBLIGATORIO · p. ej. "May 2026 – Present"
  role: "" # OBLIGATORIO
  resultHeadline: "" # OBLIGATORIO · frase de impacto/resultado principal

  # --- Vista de tarjeta/listado (ProjectCard) ---
  summary: "" # OPCIONAL · resumen corto para la card
  highlights: # OPCIONAL · string[]
    - ""

  # --- Secciones de la página de detalle ---
  context: "" # OPCIONAL
  conditions: "" # OPCIONAL
  solution: "" # OPCIONAL

  tools: # OPCIONAL · { name, reason }[]
    - name: ""
      reason: ""

  features: # OPCIONAL · { name, reason }[]
    - name: ""
      reason: ""

  results: # OPCIONAL · { name, reason }[]
    - name: ""
      reason: ""

# ─── Español (mismos campos que en:) ──────────────────────────────────────────
es:
  title: ""
  client: ""
  period: ""
  role: ""
  resultHeadline: ""

  summary: ""
  highlights:
    - ""

  context: ""
  conditions: ""
  solution: ""

  tools:
    - name: ""
      reason: ""

  features:
    - name: ""
      reason: ""

  results:
    - name: ""
      reason: ""
---
```

---

## Referencia de campos

### Nivel raíz (compartido entre idiomas)

| Campo         | Tipo                       | Obligatorio | Uso                                                     |
| ------------- | -------------------------- | ----------- | ------------------------------------------------------- |
| `order`       | number                     | Sí          | Orden de aparición (menor = primero)                    |
| `type`        | `"own"` \| `"third-party"` | Sí          | Clasificación del proyecto                              |
| `stack`       | string[]                   | Sí          | Tecnologías; entrecomilla los valores con `(` `)` o `,` |
| `gallery`     | string[]                   | No          | Rutas de imágenes bajo `/public`                        |
| `preview_url` | string                     | No          | Enlace a la demo/preview                                |

### Dentro de `en:` y `es:` (idénticos, uno por idioma)

| Campo            | Tipo               | Obligatorio | Uso                                           |
| ---------------- | ------------------ | ----------- | --------------------------------------------- |
| `title`          | string             | Sí          | Título del proyecto                           |
| `client`         | string             | Sí          | Cliente                                       |
| `period`         | string             | Sí          | Periodo (p. ej. "Mayo 2026 – Presente")       |
| `role`           | string             | Sí          | Rol desempeñado                               |
| `resultHeadline` | string             | Sí          | Frase principal de resultado/impacto          |
| `summary`        | string             | No          | Resumen para la card/listado                  |
| `highlights`     | string[]           | No          | Puntos destacados para la card                |
| `context`        | string             | No          | Sección de detalle: contexto                  |
| `conditions`     | string             | No          | Sección de detalle: condiciones/restricciones |
| `solution`       | string             | No          | Sección de detalle: solución                  |
| `tools`          | `{name, reason}[]` | No          | Herramientas y por qué se eligieron           |
| `features`       | `{name, reason}[]` | No          | Funcionalidades clave                         |
| `results`        | `{name, reason}[]` | No          | Resultados/metas                              |

---

## Verificación rápida

Corre `npm run dev` y abre `/projects/<slug>`. Un campo obligatorio faltante o un tipo
incorrecto detiene el build con un error de schema de la colección `projects`.
