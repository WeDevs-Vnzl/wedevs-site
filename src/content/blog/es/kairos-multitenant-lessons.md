---
# Post de muestra — demuestra el tratamiento de prosa del artículo. Reemplazar con contenido real.
lang: es
title: "Lo que aprendí construyendo la arquitectura multi-tenant de Kairos CMS"
excerpt: "Notas sobre aislar tenants detrás de API keys por proyecto sin recurrir a un framework de multi-tenancy más pesado."
seoTitle: "Lecciones de la arquitectura multi-tenant de Kairos CMS"
seoDescription: "Cómo aislamos tenants en Kairos CMS con API keys por proyecto sin recurrir a un framework de multi-tenancy más pesado, y los compromisos que implicó."
date: 2026-06-02
tags: ["Arquitectura", "Node.js", "PostgreSQL"]
---

Kairos CMS necesitaba aislar ocho proyectos de clientes detrás de un mismo
backend, cada uno con sus propias colecciones y API keys, sin pagar el costo
de ocho despliegues separados. Este post cubre las partes de ese diseño que
terminaron importando más.

## Empezar por el límite de aislamiento, no por el esquema

El instinto es modelar primero proyectos y colecciones y preocuparse del
aislamiento después. Ese orden nos costó caro temprano: agregar un filtro
`project_id` a cada query después del hecho es la forma más segura de que
se filtre una fila en producción.

> El aislamiento no es un `WHERE` que agregas después. Es la primera
> restricción que el esquema tiene que cumplir.

Toda tabla que guarda datos de un tenant lleva una foreign key `project_id`
desde su primera migración, y todo camino de query, sin excepciones, pasa
por una única capa de acceso a datos que inyecta ese filtro. Ningún
controlador habla directo con la base de datos.

## Esquemas como JSONB, no migraciones DDL

Los esquemas de colección son editables en tiempo real por el usuario, lo
que descarta tablas relacionales para las definiciones de campo. Los
persistimos como `JSONB`:

```ts
type CollectionSchema = {
  fields: Array<{
    name: string;
    type: "text" | "number" | "boolean" | "date" | "media" | "relation";
    required: boolean;
  }>;
};
```

Los registros anteriores a un cambio de esquema nunca se mutan ni se
eliminan: se marcan `out_of_format` y se muestran al editor, quien decide
qué hacer con ellos. Esa única decisión eliminó por completo la necesidad
de un runner de migraciones.

## El kill switch tenía que ser aburrido

El kill switch de endpoints lee `is_active` desde la base de datos en cada
request, deliberadamente sin caché. Habría sido más rápido cachearlo e
invalidar en cada escritura, pero el requisito no era "más rápido", era
"surte efecto en todos lados en menos de dos segundos, de forma verificable".
Cuando ambos objetivos chocan, gana la implementación aburrida que es fácil
de razonar.

<img src="/projects/kairos/kairos-1.webp" alt="Panel de administración de Kairos CMS" width="1876" height="980" loading="lazy" decoding="async" />
<span class="caption">El constructor visual de campos — cada tipo de campo mapea directo al esquema JSONB de arriba.</span>

Nada de esto es exótico. Se trata sobre todo de elegir la restricción que
realmente importa (aislamiento, editabilidad, verificabilidad) y negarse a
cambiarla por conveniencia.
