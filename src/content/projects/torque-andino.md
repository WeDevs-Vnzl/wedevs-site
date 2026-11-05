---
# ─── Metadata ────────────────────────────────────────────────────────────────
order: 1
type: own
stack: [Next.js, TailwindCSS, PostgreSQL]

gallery:
  - "/images/projects/torque-andino/project_torque-andino_001.webp"
  - "/images/projects/torque-andino/project_torque-andino_002.webp"
  - "/images/projects/torque-andino/project_torque-andino_003.webp"
  - "/images/projects/torque-andino/project_torque-andino_004.webp"
  - "/images/projects/torque-andino/project_torque-andino_005.webp"

# ─── English ─────────────────────────────────────────────────────────────────
en:
  title: "Torque Andino"
  seoTitle: "Torque Andino: WhatsApp auto parts catalog case study"
  seoDescription: "Case study: Torque Andino, a demo auto parts catalog with cart, WhatsApp checkout and admin dashboard, built on the WeDevs multi-tenant catalog platform."
  client: "WeDevs (portfolio demo)"
  period: "October 2026"
  role: "Design, development and deployment (WeDevs)"
  resultHeadline: "A complete auto parts storefront with cart, WhatsApp checkout and admin dashboard, shipped as its own client site on the WeDevs catalog platform."

  summary: "A fictitious auto parts store for cars and pickup trucks, built to show the WeDevs catalog platform end to end. Customers browse the catalog, build an order and close it on WhatsApp; the store manages products and orders from its own dashboard."

  highlights:
    - "Catalog with cart, and orders closed on WhatsApp with a unique order code"
    - "Admin dashboard for products, orders, users and settings under /d"
    - "Demo catalog of 9 categories and 37 products, loaded by a repeatable seed script"

  context: >-
    Torque Andino is a **fictitious** auto parts store for cars and pickup
    trucks: brakes, engine, suspension, electrical, lighting, wheels and 4x4
    accessories. It is not a real company and uses no real parts brand. It
    exists to show what a client gets from the **WeDevs catalog platform**: a
    web catalog where customers build an order and send it over **WhatsApp**,
    which is how many small stores in Venezuela already sell.

  conditions: >-
    Each client gets **its own repository, Netlify site and domain**, but the
    application itself lives in a **versioned platform** published as
    `@wedevs-vnzl/catalog-*` packages, pinned to **exact versions**. The client
    repository may only touch its own parts: **theme tokens, copy, data and
    images**. Every tenant shares one Postgres database, isolated by
    `tenant_id` and **row-level security**, and each site connects with its own
    **DML-only role**. Route stubs are generated from the platform and checked
    in CI, so they are never edited by hand.

  solution: >-
    The storefront and dashboard come from the pinned platform packages; the
    client layer adds a brand of its own. The concept is **mechanical strength
    with Andean character**: graphite and metal on warm ivory with a **copper
    accent**, and a hex-nut logo with two mountain peaks inside. All colors are
    set as tokens in `theme.css` and **checked for WCAG AA contrast**. All
    customer-facing copy, delivery options and the WhatsApp message template
    live in one content file. A **seed script** loads the demo catalog through
    the platform's own services: it **uploads every image to Cloudinary before
    writing the first row**, so a broken URL leaves the database untouched, and
    deterministic public ids make re-runs overwrite instead of duplicate. CI
    runs typecheck, lint, the stub check, a **Playwright smoke test and
    Lighthouse** against a throwaway database.

  tools:
    - name: "Next.js 16 + React 19"
      reason: "Storefront with **ISR**: the home page is cached for an hour and prerendered at build time, so the catalog loads fast without hitting the database on every visit."
    - name: "Prisma 7 + PostgreSQL"
      reason: "Shared database with **row-level security per tenant**. The client refuses a role that is a superuser, bypasses RLS or owns the tables."
    - name: "Cloudinary"
      reason: "Product images live in a folder per tenant, *so the site never stores a binary*."
    - name: "Cloudflare Turnstile"
      reason: "Bot protection on the platform forms, without a classic captcha."
    - name: "Playwright + Lighthouse CI"
      reason: "The platform's shared smoke test and a Lighthouse run gate every change before it reaches the site."
    - name: "Netlify"
      reason: "One site per client, with its own environment and its own database credential."

  features:
    - name: "Catalog and cart"
      reason: "Category filters, product cards with stock state and a cart limited to **20 lines per order**."
    - name: "WhatsApp checkout"
      reason: "The order is sent through `wa.me` with a **unique code** and the vehicle's make, model and year, so the store confirms price and stock in the same chat."
    - name: "Delivery options"
      reason: "In-store pickup, city delivery and nationwide shipping, all defined in the client's content file."
    - name: "Admin dashboard"
      reason: "Products, orders, users and settings under `/d`, from the same platform every client uses."
    - name: "Brand system"
      reason: "Copper, graphite and ivory tokens with **WCAG AA contrast verified** on every combination the platform renders."

  results:
    - name: "Complete client site on the platform"
      reason: "Storefront, cart, WhatsApp checkout and dashboard running as an independent client repository, with no changes to the shared platform."
    - name: "Realistic demo catalog"
      reason: "**9 categories and 37 products** with credited stock photos, loaded in one command and safe to re-run."
    - name: "Portfolio piece, not a production store"
      reason: "Products, prices and compatibility are for demonstration only. There are no sales metrics to report."

# ─── Español ─────────────────────────────────────────────────────────────────
es:
  title: "Torque Andino"
  seoTitle: "Torque Andino: catálogo de repuestos con pedidos por WhatsApp"
  seoDescription: "Caso de estudio: Torque Andino, catálogo demo de repuestos con carrito, pedidos por WhatsApp y panel de gestión, sobre la plataforma de catálogos de WeDevs."
  client: "WeDevs (demo de portafolio)"
  period: "Octubre 2026"
  role: "Diseño, desarrollo y despliegue (WeDevs)"
  resultHeadline: "Una tienda de repuestos completa con carrito, pedidos por WhatsApp y panel de gestión, publicada como sitio de cliente propio sobre la plataforma de catálogos de WeDevs."

  summary: "Una tienda ficticia de repuestos para carros y camionetas, creada para mostrar de punta a punta la plataforma de catálogos de WeDevs. El cliente recorre el catálogo, arma su pedido y lo cierra por WhatsApp; la tienda gestiona productos y pedidos desde su propio panel."

  highlights:
    - "Catálogo con carrito y pedidos que se cierran por WhatsApp con un código único"
    - "Panel de gestión de productos, pedidos, usuarios y ajustes en /d"
    - "Catálogo demo de 9 categorías y 37 productos, cargado con un script de seed repetible"

  context: >-
    Torque Andino es una tienda **ficticia** de repuestos para carros y
    camionetas: frenos, motor, suspensión, eléctrico, iluminación, rines y
    accesorios 4x4. No es una empresa real ni usa marcas de repuestos reales.
    Existe para mostrar lo que recibe un cliente de la **plataforma de catálogos
    de WeDevs**: un catálogo web donde el cliente arma su pedido y lo envía por
    **WhatsApp**, que es como ya venden muchas tiendas pequeñas en Venezuela.

  conditions: >-
    Cada cliente tiene **su propio repositorio, sitio en Netlify y dominio**,
    pero la aplicación vive en una **plataforma versionada** publicada como
    paquetes `@wedevs-vnzl/catalog-*`, fijados a **versiones exactas**. El
    repositorio del cliente solo puede tocar lo suyo: **tokens del tema, textos,
    datos e imágenes**. Todos los tenants comparten una base de datos Postgres,
    aislados por `tenant_id` y **row-level security**, y cada sitio se conecta
    con su propio **rol de solo DML**. Los stubs de rutas se generan desde la
    plataforma y se verifican en CI, así que nunca se editan a mano.

  solution: >-
    La tienda y el panel vienen de los paquetes fijados de la plataforma; la
    capa del cliente le suma una marca propia. El concepto es **fuerza mecánica
    con carácter andino**: grafito y metal sobre marfil cálido con un **acento
    cobre**, y un logo de tuerca hexagonal con dos picos de montaña dentro.
    Todos los colores son tokens en `theme.css` con **contraste WCAG AA
    verificado**. Los textos para el cliente, las opciones de entrega y la
    plantilla del mensaje de WhatsApp viven en un solo archivo de contenido. Un
    **script de seed** carga el catálogo demo con los servicios de la propia
    plataforma: **sube cada imagen a Cloudinary antes de escribir la primera
    fila**, así una URL rota deja la base de datos intacta, y los public ids
    deterministas hacen que repetirlo sobrescriba en lugar de duplicar. El CI
    corre typecheck, lint, la verificación de stubs, un **smoke test con
    Playwright y Lighthouse** sobre una base de datos desechable.

  tools:
    - name: "Next.js 16 + React 19"
      reason: "Tienda con **ISR**: la portada se guarda en caché una hora y se prerenderiza al compilar, así el catálogo carga rápido sin consultar la base de datos en cada visita."
    - name: "Prisma 7 + PostgreSQL"
      reason: "Base de datos compartida con **row-level security por tenant**. El cliente rechaza un rol superusuario, que salte RLS o que sea dueño de las tablas."
    - name: "Cloudinary"
      reason: "Las imágenes de productos viven en una carpeta por tenant, *así el sitio nunca guarda un binario*."
    - name: "Cloudflare Turnstile"
      reason: "Protección contra bots en los formularios de la plataforma, sin un captcha clásico."
    - name: "Playwright + Lighthouse CI"
      reason: "El smoke test compartido de la plataforma y una corrida de Lighthouse validan cada cambio antes de llegar al sitio."
    - name: "Netlify"
      reason: "Un sitio por cliente, con su propio entorno y su propia credencial de base de datos."

  features:
    - name: "Catálogo y carrito"
      reason: "Filtros por categoría, tarjetas de producto con estado de stock y un carrito limitado a **20 líneas por pedido**."
    - name: "Pedido por WhatsApp"
      reason: "El pedido se envía por `wa.me` con un **código único** y la marca, modelo y año del vehículo, para que la tienda confirme precio y disponibilidad en el mismo chat."
    - name: "Opciones de entrega"
      reason: "Retiro en tienda, delivery en la ciudad y envío nacional, definidos en el archivo de contenido del cliente."
    - name: "Panel de gestión"
      reason: "Productos, pedidos, usuarios y ajustes en `/d`, con la misma plataforma que usa cada cliente."
    - name: "Sistema de marca"
      reason: "Tokens cobre, grafito y marfil con **contraste WCAG AA verificado** en cada combinación que dibuja la plataforma."

  results:
    - name: "Sitio de cliente completo sobre la plataforma"
      reason: "Tienda, carrito, pedido por WhatsApp y panel funcionando como un repositorio de cliente independiente, sin cambios en la plataforma compartida."
    - name: "Catálogo demo realista"
      reason: "**9 categorías y 37 productos** con fotos de stock acreditadas, cargados con un solo comando y seguros de repetir."
    - name: "Pieza de portafolio, no una tienda en producción"
      reason: "Los productos, precios y compatibilidades son de demostración. No hay métricas de ventas que reportar."
---
