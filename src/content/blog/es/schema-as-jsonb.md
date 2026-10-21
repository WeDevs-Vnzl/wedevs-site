---
# Post de muestra — demuestra el tratamiento de prosa del artículo. Reemplazar con contenido real.
lang: es
title: "Por qué guardamos los esquemas como JSONB en vez de migraciones"
excerpt: "El balance entre rigor relacional y un constructor visual de campos que tiene que publicar cambios en segundos, no en ciclos de deploy."
seoTitle: "Esquemas en JSONB en vez de migraciones"
seoDescription: "El balance entre rigor relacional y un constructor visual de campos que publica cambios de esquema en segundos, no en ciclos de deploy, sobre Postgres."
date: 2026-05-18
tags: ["PostgreSQL", "Drizzle", "Backend"]
---

Un constructor visual de campos que permite a un editor sin perfil técnico
agregar un campo y verlo en vivo en menos de tres minutos descarta una
herramienta común del backend: las migraciones DDL.

## La restricción que definió la decisión

Cada acción de "agregar un campo" en la interfaz tendría que convertirse en
una migración, revisada y desplegada como código. Eso funciona bien para un
puñado de cambios de esquema al año. No funciona cuando los editores esperan
que los cambios se comporten como actualizaciones de contenido.

## Qué te da JSONB

Guardar los esquemas de colección como columnas `JSONB` significa que un
cambio de esquema es un `UPDATE`, no un deploy:

```sql
UPDATE collections
SET schema = $1
WHERE id = $2;
```

Los registros que ya existen en la colección no se tocan. En cada lectura,
cada registro se valida contra el esquema _actual_; lo que no coincide se
marca `out_of_format` en vez de forzarse o eliminarse en silencio.

## Qué te cuesta

Renuncias al chequeo de tipos propio de la base de datos y a la integridad
referencial para esos datos. La validación se mueve por completo a la capa
de aplicación, y ahí sí hay que tomársela en serio: es el único lugar donde
ser perezoso con la validación de entrada no es una opción, porque la base
de datos ya no va a atrapar lo que tú no atrapes.

Para Kairos CMS, ese trade-off valió la pena: los cambios de esquema tenían
que sentirse como ediciones de contenido, no como despliegues, y la capa de
validación era trabajo que había que hacer de todas formas.
