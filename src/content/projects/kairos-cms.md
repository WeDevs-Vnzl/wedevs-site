---
# ─── Metadata ────────────────────────────────────────────────────────────────
order: 1
type: client
stack:
  [
    Nuxt 4,
    Tailwind CSS v4,
    Pinia,
    Nuxt UI v4,
    Node.js,
    Express 5,
    TypeScript,
    Drizzle ORM,
    "PostgreSQL (Neon)",
    Cloudinary,
    Zod,
    JWT,
  ]

gallery:
  - "/projects/kairos/kairos-1.webp"
  - "/projects/kairos/kairos-2.webp"
  - "/projects/kairos/kairos-3.webp"
  - "/projects/kairos/kairos-4.webp"
  - "/projects/kairos/kairos-5.webp"

preview_url: https://kairos-fe-staging.netlify.app/

# ─── English ─────────────────────────────────────────────────────────────────
en:
  title: "Kairos CMS"
  seoTitle: "Kairos CMS: multi-tenant headless CMS case study"
  seoDescription: "Case study: Kairos CMS, a centralized headless CMS that replaces 8 separate Heroku and Strapi instances, aiming to cut infrastructure costs by 40%."
  client: "Novanet Studio"
  period: "May 2026 – Present"
  role: "Sole Full-Stack Developer & Architect (Freelance)"
  resultHeadline: "Designing and building, as sole developer, a centralized headless CMS that replaces 8 separate Heroku and Strapi instances, targeting at least a 40% cut in monthly infrastructure cost."

  summary: "A headless CMS that centralizes content management for every Novanet Studio web project. Each project gets an instantly available content API behind its own API key, replacing a fragmented setup of one Heroku and Strapi instance per client."

  highlights:
    - "Multi-project architecture: projects hold collections and sub-collections nested to any depth, each isolated behind its own API key"
    - "Endpoint kill switch designed to take effect in under 2 seconds, checked against the database on every request"
    - "Visual field builder with 6 field types and global backups targeting under 3 minutes, with no DDL migrations or downtime"

  context: >-
    This project is part of an **ongoing freelance engagement with Novanet
    Studio** (since November 2024). Novanet Studio runs **a dedicated Heroku
    and Strapi instance for every web project**, which fragments maintenance and
    adds infrastructure cost with each new client. Kairos CMS replaces that
    model with **a single centralized instance**: once content is published, it
    becomes instantly available behind its own URL and API key, with no extra
    technical work. The pilot covers the studio's **8 active client projects**,
    and the roadmap opens the platform to external clients in V2.

  conditions: >-
    The entire project, from *requirements and architecture to backend, frontend,
    QA and deployment*, is delivered by **a single developer** with no dedicated
    DevOps support. The hard constraints: **PaaS native with no Docker** at any
    phase, **no Redis** (Neon's serverless Postgres absorbs all read load by
    design), all media handled by Cloudinary so that **the backend never receives
    or stores a binary**, and collection schemas that stay **editable at any time
    without DDL migrations**. Older records remain accessible and are simply
    flagged as *out of format*. Clerk Auth and granular roles are deliberately
    deferred to V2.

  solution: >-
    A strict **4-layer architecture** keeps the core decoupled: Nuxt 4 for
    presentation, Express 5 for application logic, Drizzle ORM for data access
    and PostgreSQL 16 on Neon for persistence. Content is modeled as projects
    that hold collections, each bound to a **unique, irrevocable API key**, with
    sub-collections nested to any depth. Schemas persist as **JSONB instead of
    relational tables**, so the visual field builder can evolve them with **zero
    DDL migrations** while older records are preserved and flagged as *out of
    format*. The **endpoint kill switch** reads each collection's state from the
    database on every request, deliberately uncached, so a change takes effect in
    **under 2 seconds on every dyno**. Media travels **straight from the frontend
    to Cloudinary**, keeping the backend stateless. **Global backups run in a
    worker thread** that never blocks the event loop, and MVP auth is a
    self-hosted **JWT and bcrypt** session that defers Clerk's roles model to V2.

  tools:
    - name: "Nuxt 4 + Tailwind CSS v4 + Pinia + Nuxt UI v4"
      reason: "Full-stack Vue 3 framework with a 110+ component UI library. *Frictionless setup* compared to PrimeVue (heavier) or shadcn-vue (requires copying components in)."
    - name: "Node.js 20 LTS + Express 5 + TypeScript"
      reason: "Express 5's native async/await sends rejected promises straight to the error middleware. Chosen over Fastify (*no clear win here*) and NestJS (*unnecessary DI overhead*)."
    - name: "Drizzle ORM"
      reason: "TypeScript-first with **native JSONB support** and no external binary, avoiding Prisma's 150 to 300 ms Rust engine cold start on Heroku."
    - name: "PostgreSQL 16 on Neon (serverless)"
      reason: "**Serverless Postgres** with usage-based cost. Chosen over AWS RDS (fixed instances) and Supabase (abstraction layers this project doesn't need)."
    - name: "JWT (jsonwebtoken + bcrypt)"
      reason: "Self-hosted 8-hour session, *1 to 2 weeks faster to ship* than Clerk Auth for a pilot with 1 to 3 internal users."
    - name: "Netlify + Heroku"
      reason: "Zero-config CI/CD that reuses the studio's existing accounts and infrastructure, within the required us-east-1/Atlanta region."

  features:
    - name: "Multi-project hierarchical architecture"
      reason: "Projects hold collections, each behind a **unique, irrevocable API key**, with sub-collections nested to any depth and full data isolation between projects."
    - name: "Visual field builder"
      reason: "Six field types editable at any time with *zero DDL migrations*. Records that no longer match the schema are flagged automatically, never altered or deleted."
    - name: "One-click endpoint kill switch"
      reason: "Returns 403/404 in **under 2 seconds** and logs every change in the audit trail."
    - name: "Direct-to-Cloudinary media uploads"
      reason: "Client-side validation of size, dimensions and aspect ratio. *No binary ever touches the server.*"
    - name: "Non-blocking global backups"
      reason: "A worker thread exports every project and collection without interrupting active API traffic."
    - name: "Markdown editor with live preview"
      reason: "Side-by-side editing built for non-technical editors, backed by an internal audit log of administrative actions."

  results:
    - name: "In active development"
      reason: "Requirements and architecture work began in May 2026. Production results are not yet available."
    - name: "Concrete launch targets"
      reason: "At least a **40% cut in monthly infrastructure cost** by month 3, kill switch effect in under 2 seconds, and a full centralized backup in under 3 minutes."
    - name: "Pilot across 8 client projects"
      reason: "Consolidates 8 separate Heroku and Strapi instances into a single CMS instance."

# ─── Español ─────────────────────────────────────────────────────────────────
es:
  title: "Kairos CMS"
  seoTitle: "Kairos CMS: caso de estudio de un CMS multi-tenant"
  seoDescription: "Caso de estudio: Kairos CMS, un headless CMS centralizado que reemplaza 8 instancias de Heroku y Strapi con la meta de reducir 40% el costo mensual."
  client: "Novanet Studio"
  period: "Mayo 2026 – Presente"
  role: "Arquitecto y Desarrollador Full-Stack único (Freelance)"
  resultHeadline: "Diseño y desarrollo, como único desarrollador, de un headless CMS centralizado que reemplaza 8 instancias individuales de Heroku y Strapi, con la meta de reducir al menos 40% el costo mensual de infraestructura."

  summary: "Un headless CMS que centraliza la gestión de contenido de todos los proyectos web de Novanet Studio. Cada proyecto recibe una API de contenido disponible de inmediato detrás de su propia API key, reemplazando el esquema fragmentado de una instancia de Heroku y Strapi por cliente."

  highlights:
    - "Arquitectura multiproyecto: los proyectos contienen colecciones y sub-colecciones anidadas a cualquier profundidad, cada una aislada detrás de su propia API key"
    - "Kill switch de endpoints diseñado para surtir efecto en menos de 2 segundos, verificado contra la base de datos en cada request"
    - "Constructor visual de campos con 6 tipos y backups globales con meta de menos de 3 minutos, sin migraciones DDL ni caídas de servicio"

  context: >-
    Este proyecto forma parte de una **colaboración freelance continua con
    Novanet Studio** (desde noviembre de 2024). Novanet Studio opera **una
    instancia dedicada de Heroku y Strapi por cada proyecto web**, lo que
    fragmenta el mantenimiento y suma costos de infraestructura con cada nuevo
    cliente. Kairos CMS reemplaza ese modelo con **una sola instancia
    centralizada**: una vez publicado el contenido, queda disponible de inmediato
    detrás de su propia URL y API key, sin trabajo técnico adicional. El piloto
    cubre los **8 proyectos activos del estudio** y el roadmap abre la plataforma
    a clientes externos en V2.

  conditions: >-
    El proyecto completo, desde *los requerimientos y la arquitectura hasta el
    backend, el frontend, el QA y el despliegue*, lo entrega **un único
    desarrollador** sin soporte dedicado de DevOps. Las restricciones duras:
    **PaaS nativo sin Docker** en ninguna fase, **sin Redis** (Neon, PostgreSQL
    serverless, asume toda la carga de lecturas por diseño), todo el media pasa
    por Cloudinary de modo que **el backend nunca recibe ni almacena un
    binario**, y esquemas de colección **editables en cualquier momento sin
    migraciones DDL**. Los registros antiguos permanecen accesibles y solo se
    marcan como *fuera de formato*. Clerk Auth y los roles granulares quedan
    aplazados deliberadamente a V2.

  solution: >-
    Una **arquitectura estricta de 4 capas** mantiene el núcleo desacoplado:
    Nuxt 4 para la presentación, Express 5 para la lógica de aplicación, Drizzle
    ORM para el acceso a datos y PostgreSQL 16 en Neon para la persistencia. El
    contenido se modela como proyectos que contienen colecciones, cada una ligada
    a una **API key única e irrevocable**, con sub-colecciones anidadas a
    cualquier profundidad. Los esquemas se persisten como **JSONB en lugar de
    tablas relacionales**, así el constructor visual de campos puede
    evolucionarlos con **cero migraciones DDL** mientras los registros antiguos
    se conservan marcados como *fuera de formato*. El **kill switch de
    endpoints** lee el estado de cada colección desde la base de datos en cada
    request, deliberadamente sin caché, para que un cambio surta efecto en
    **menos de 2 segundos en todos los dynos**. El media viaja **directo del
    frontend a Cloudinary**, manteniendo el backend stateless. Los **backups
    globales corren en un worker thread** que nunca bloquea el event loop, y la
    autenticación del MVP es una sesión propia con **JWT y bcrypt** que aplaza el
    modelo de roles de Clerk a V2.

  tools:
    - name: "Nuxt 4 + Tailwind CSS v4 + Pinia + Nuxt UI v4"
      reason: "Framework full-stack de Vue 3 con una librería UI de 110+ componentes. *Integración sin fricción* frente a PrimeVue (más pesado) o shadcn-vue (requiere copiar componentes)."
    - name: "Node.js 20 LTS + Express 5 + TypeScript"
      reason: "El async/await nativo de Express 5 envía las promesas rechazadas directo al middleware de errores. Elegido sobre Fastify (*sin beneficio claro aquí*) y NestJS (*overhead de DI innecesario*)."
    - name: "Drizzle ORM"
      reason: "TypeScript-first con **soporte nativo de JSONB** y sin binario externo, evitando el cold start de 150 a 300 ms del motor en Rust de Prisma en Heroku."
    - name: "PostgreSQL 16 en Neon (serverless)"
      reason: "**PostgreSQL serverless** con costo proporcional al uso. Elegido sobre AWS RDS (instancias fijas) y Supabase (capas de abstracción que este proyecto no necesita)."
    - name: "JWT (jsonwebtoken + bcrypt)"
      reason: "Sesión propia de 8 horas, *de 1 a 2 semanas más rápida de implementar* que Clerk Auth para un piloto de 1 a 3 usuarios internos."
    - name: "Netlify + Heroku"
      reason: "CI/CD sin configuración que reutiliza las cuentas e infraestructura existentes del estudio, dentro de la región us-east-1/Atlanta requerida."

  features:
    - name: "Arquitectura jerárquica multiproyecto"
      reason: "Los proyectos contienen colecciones, cada una detrás de una **API key única e irrevocable**, con sub-colecciones anidadas a cualquier profundidad y aislamiento total de datos entre proyectos."
    - name: "Constructor visual de campos"
      reason: "Seis tipos de campo editables en cualquier momento con *cero migraciones DDL*. Los registros que ya no coinciden con el esquema se marcan automáticamente, nunca se alteran ni se eliminan."
    - name: "Kill switch de endpoints de un clic"
      reason: "Responde 403/404 en **menos de 2 segundos** y deja registro de cada cambio en el log de auditoría."
    - name: "Carga de media directa a Cloudinary"
      reason: "Validación client-side de peso, dimensiones y proporciones. *Ningún binario toca jamás el servidor.*"
    - name: "Backups globales no bloqueantes"
      reason: "Un worker thread exporta todos los proyectos y colecciones sin interrumpir el tráfico API activo."
    - name: "Editor Markdown con previsualización en vivo"
      reason: "Edición lado a lado pensada para editores sin perfil técnico, respaldada por un log de auditoría interno de las acciones administrativas."

  results:
    - name: "En desarrollo activo"
      reason: "El levantamiento de requerimientos y la arquitectura comenzaron en mayo de 2026. Aún no hay resultados de producción."
    - name: "Metas concretas de lanzamiento"
      reason: "Reducir al menos **40% el costo mensual de infraestructura** para el mes 3, kill switch con efecto en menos de 2 segundos y un backup centralizado completo en menos de 3 minutos."
    - name: "Piloto sobre 8 proyectos de clientes"
      reason: "Consolida 8 instancias separadas de Heroku y Strapi en una sola instancia de CMS."
---
