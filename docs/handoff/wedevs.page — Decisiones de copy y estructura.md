# wedevs.page — Decisiones de copy y estructura

Oct 20, 2026 · @Williams

## Resumen

wedevs.page se construye como la web de un estudio de software, no como un portafolio personal. Este documento cierra las 10 decisiones abiertas del traspaso, fija el orden del home y propone su copy en español e inglés, listo para cuando exista el código.

Criterios que guían todas las decisiones:

- **Mismo mensaje que en redes.** Servicios con el lenguaje del cliente: apps móviles, páginas web, CRMs y sistemas a medida. Integraciones fintech/ERP e IA quedan como especialidades dentro de «sistemas a medida».
- **Manual de marca.** Claros, precisos y cercanos; siempre «nosotros»; tuteo en español neutro.
- **Servicios antes que pruebas.** El visitante primero entiende qué hacemos y luego ve proyectos.
- **Nada inventado.** Sin métricas ni clientes que no existan: lo que falta queda como pregunta abierta al final.

## Las 10 decisiones

Ocho puntos quedan decididos; los puntos 5 y 7 dependen de datos del equipo (ver la última sección).

| # | Problema | Decisión |
| --- | --- | --- |
| 1 | No hay página de proyectos | Crear `/proyectos` con todas las fichas. «Ver todos los proyectos» y el botón de la 404 apuntan ahí. Mientras haya solo 2 proyectos, se puede ocultar el botón «Ver todos». |
| 2 | «Agendar llamada» abre Gmail | El botón dice «Hablemos» / «Let's talk» y lleva a `/contacto`. Si más adelante usan una agenda (por ejemplo Cal.com), se vuelve «Agendar llamada». |
| 3 | El home se lee como portafolio | Nuevo orden: Hero → Servicios → Proyectos → Cómo trabajamos → Contacto. El blog sale del home y queda solo en el menú. |
| 4 | Etiquetas «Empleado» y «Freelance» | Dos etiquetas de estudio: «Producto propio» / «Own product» y «Cliente» / «Client». Trabajos hechos como empleado no se muestran como del estudio. |
| 5 | Contactos personales del fundador | Usar canales de la marca: correo del dominio (propuesta: hola@wedevs.page), Instagram y TikTok de la empresa, WhatsApp de negocio. LinkedIn y GitHub personales solo en la ficha de autor del blog. |
| 6 | Hero y stack demasiado técnicos | Hero orientado a resultados (copy abajo). El stack pasa a una fila de chips dentro de «Cómo trabajamos», con una sola frase. |
| 7 | Precios y modalidades sin validar | Mantener 3 modalidades, pero sin cifras hasta validarlas: Proyecto cerrado, Por etapas, Acompañamiento mensual. Los rangos de presupuesto del formulario se definen con el equipo. |
| 8 | SEO solo en inglés | Título, descripción, JSON-LD, imagen OG y `llms.txt` en ambos idiomas; cada página `/es/` usa su versión en español. |
| 9 | Encabezados sin numerar | Usar el estilo del manual en todas las secciones: mono, mayúsculas, numerado (`01 · SERVICIOS`). |
| 10 | Ruta `/cv` eliminada | Redirección 301 de `/en/cv` y `/es/cv` al inicio, configurada en el hosting. |

## Orden del home

El home pasa de 7 secciones a 5, en el orden en que un cliente decide: qué hacen, si lo han hecho antes, cómo trabajan y cómo los contacto.

1. **Hero** — qué hacemos y para quién, con un botón a contacto.
2. **01 · Servicios** — los 4 servicios con una línea cada uno; enlace a `/servicios`.
3. **02 · Proyectos** — las fichas de Kairos CMS y Maximiza, cada una con su resultado en una línea.
4. **03 · Cómo trabajamos** — los 5 principios y, al final, la fila de chips del stack.
5. **04 · Contacto** — invitación, tiempo de respuesta y botón.

Salen del home: la sección de artículos (queda en `/blog`) y el párrafo largo del stack.

## Copy del home

Cada fila es una clave de `es.json` / `en.json`; los textos entre corchetes los completa el equipo.

### Hero

| Clave | Español | English |
| --- | --- | --- |
| heroEyebrow | `// ESTUDIO DE SOFTWARE · VENEZUELA` | `// SOFTWARE STUDIO · VENEZUELA` |
| heroNameBold + heroNameLight | Construimos el software **que tu negocio necesita.** | We build the software **your business needs.** |
| heroPara1 | Apps móviles, páginas web, CRMs y sistemas a la medida. Hechos en Venezuela, para el mundo. | Mobile apps, websites, CRMs and custom systems. Made in Venezuela, for the world. |
| heroPara2 | Menos trabajo manual, más ventas y clientes mejor atendidos. | Less manual work, more sales, better-served customers. |
| heroCta | Hablemos | Let's talk |

### 01 · Servicios

| Clave | Español | English |
| --- | --- | --- |
| servicesTeaserTitle | Una idea. Cuatro formas de hacerla realidad. | One idea. Four ways to make it real. |
| servicesTeaserSupport | Elige por dónde empezar; nosotros nos encargamos del resto. | Pick where to start; we take care of the rest. |
| Apps móviles | iOS y Android, listas para tus clientes. | iOS and Android, ready for your customers. |
| Páginas web | Rápidas, elegantes y pensadas para vender. | Fast, elegant and built to sell. |
| CRMs | Tus clientes y ventas, en un solo lugar. | Your customers and sales, in one place. |
| Sistemas a medida | Si tu proceso es único, tu software también. Incluye integraciones con pagos y ERPs, y automatización con IA. | If your process is unique, your software should be too. Includes payment and ERP integrations, and AI automation. |
| servicesTeaserCta | Ver todos los servicios | See all services |

### 02 · Proyectos

| Clave | Español | English |
| --- | --- | --- |
| workTitle | Lo que ya construimos | What we've built |
| workSupport | Productos reales, en uso hoy. | Real products, in use today. |
| Kairos CMS · resultHeadline | \[Resultado en una línea\] | \[One-line result\] |
| Maximiza · resultHeadline | \[Resultado en una línea\] | \[One-line result\] |
| viewProject | Ver proyecto | View project |

### 03 · Cómo trabajamos

| Clave | Español | English |
| --- | --- | --- |
| howTitle | Así trabajamos | How we work |
| howItems\[0\] | **Primero entendemos.** Antes de escribir código, conocemos tu negocio y tu problema. | **We understand first.** Before writing code, we learn your business and your problem. |
| howItems\[1\] | **Avances cada semana.** Ves el progreso real, no solo informes. | **Progress every week.** You see real progress, not just reports. |
| howItems\[2\] | **Un solo equipo.** Hablas directamente con quienes construyen. | **One team.** You talk directly to the people building it. |
| howItems\[3\] | **Hecho para durar.** Código ordenado que puede crecer contigo. | **Built to last.** Clean code that grows with you. |
| howItems\[4\] | **Contigo después del lanzamiento.** Soporte y mejoras cuando las necesites. | **With you after launch.** Support and improvements when you need them. |
| stackDesc | Usamos herramientas modernas y probadas, elegidas para cada proyecto. | We use modern, proven tools, chosen for each project. |

### 04 · Contacto

| Clave | Español | English |
| --- | --- | --- |
| contact.title | ¿Tienes una idea? Hablemos. | Got an idea? Let's talk. |
| contact.desc | Cuéntanos qué necesitas y te respondemos en \[tiempo de respuesta\] con una propuesta clara. | Tell us what you need and we'll reply within \[response time\] with a clear proposal. |
| contact.cta | Escríbenos | Write to us |

### SEO del home

| Campo | Español | English |
| --- | --- | --- |
| title | WedevsVnzla · Apps, webs y software a la medida | WedevsVnzla · Apps, websites and custom software |
| description | Estudio de software venezolano. Creamos apps móviles, páginas web, CRMs y sistemas a la medida para negocios que quieren crecer. | Venezuelan software studio. We build mobile apps, websites, CRMs and custom systems for growing businesses. |

## Pendientes del equipo

Con estas respuestas se completa el copy del home y del resto de páginas.

- [ ] Resultado en una línea de Kairos CMS y de Maximiza, y si cada uno es producto propio o de un cliente.
- [ ] Correo de la marca (¿hola@wedevs.page?), número de WhatsApp de negocio y usuarios de Instagram y TikTok.
- [ ] Tiempo de respuesta que pueden prometer en contacto (por ejemplo, 24 o 48 horas).
- [ ] Modalidades de trabajo reales y rangos de presupuesto para el formulario.
- [ ] Si usarán una agenda para llamadas o solo contacto por mensaje.
