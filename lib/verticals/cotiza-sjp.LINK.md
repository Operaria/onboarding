# Cotiza SJP · Formulario de cotización para clientes finales

**Vertical id:** `cotiza-sjp`
**Tema:** health (petrol / teal · clínico-editorial)
**Ruta:** `app/(flow)/cotiza-sjp/[cliente]/page.tsx`
**Marca:** San Jorge Packaging · pie "Diseñado por Operaria"
**Destino de los envíos:** `sjpcotizaciones@gmail.com` (fijo en el registro, campo `destino`).

## Formato del link (lo que manda Gaby)

```
https://onboarding.operaria.cl/cotiza-sjp/<cliente>
```

- El segmento final es el **slug del cliente** y personaliza el saludo.
- **Regla para Gaby:** toma el nombre del cliente → minúsculas → espacios por
  guiones → pégalo después de `/cotiza-sjp/`. Sin `?negocio` (no se usa).
  - Cliente "Linar SPA" → `/cotiza-sjp/linar-spa` → saluda "Linar Spa".
  - Genérico → `/cotiza-sjp/nuevo` → saluda "Nuevo".
- `/cotiza-sjp` a secas (sin slug) da 404 por diseño: el link SIEMPRE lleva slug.

## Qué captura (verdad de terreno de Cinthia, 13–15 jun 2026)

- **Cabecera (1 vez):** razón social, RUT, contacto, correo, teléfono (opcional).
- **Producto:** tipo (Doypack · Pouche · Film).
  - **Doypack/Pouche:** ancho × alto (mm), fuelle (solo Doypack), zipper.
  - **Film:** SOLO dos medidas — Largo (ancho) y Paso de taca (alto); no hay
    tercera medida (en film el alto ES el paso de taca).
  - **Común:** n° de diseños, cantidad (envases si bolsa; KILOS si film),
    materialidad (la entrega el cliente).
- **Productos adicionales:** tabla repetible (una fila por envase).

## Reglas de negocio embebidas

- **Mínimos por n° de diseños** (informados y, en film, validados al enviar):
  - Film: 1 diseño = 10 kg; multidiseño = 5 kg por diseño (12 diseños ⇒ 60 kg).
  - Pouch/Doypack: 1 diseño = 1.000 u; multidiseño = 300 u por diseño.
- El **film se pide en kilos** (unidad natural de la bobina).
- No se piden colores (Cinthia pide "cantidad de diseños"); SJP fija su estándar
  (4 colores, 100% blanco, bilámina) al definir el arte.

## Entrega y deploy

- **Llega a:** `sjpcotizaciones@gmail.com` (campo `destino` de la encuesta;
  el global `DESTINATION_EMAIL` queda solo de respaldo para otras encuestas).
- **Deploy:** `git push origin main` en `Operaria/onboarding` → producción
  (onboarding.operaria.cl). Afecta el sitio en vivo: confirmar con Francisco.

## Estado

- En vivo, ajustes de Cinthia aplicados (reunión 15 jun). Ruteo de correo por
  encuesta agregado 16 jun.

*Diseñado por Operaria*
