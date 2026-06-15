# Cotiza SJP · Formulario de cotización para clientes finales

**Vertical id:** `cotiza-sjp`
**Tema:** flow (navy / teal · operativo)
**Ruta:** `app/(flow)/cotiza-sjp/[cliente]/page.tsx`
**Marca:** San Jorge Packaging · pie "Diseñado por Operaria"

## Formato del link

```
https://onboarding.operaria.cl/cotiza-sjp/nuevo
```

El segmento final (`nuevo`) es solo un slug de ruta; los datos reales del
cliente se capturan dentro del formulario (bloque "Tus datos"). Cinthia puede
usar un slug personalizado por cliente si quiere (`/cotiza-sjp/wild-foods`),
pero no es necesario.

## Qué captura (calza con cotizador_core.calcular)

- **Cabecera (1 vez):** razón social, RUT, contacto, correo, teléfono (opcional).
- **Producto 1 (guiado):** tipo de envase · uso · ancho×alto mm · fuelle (solo
  Doypack) · impresión + colores · zipper (no Film) · válvula (solo Doypack) ·
  cantidad (unidades; Film en unidades o metros).
- **Productos adicionales:** tabla repetible (una fila por envase).

## Decisiones de diseño (acordadas con Cinthia + Eco)

- **No se pide el material:** se pregunta el USO y SJP deduce la estructura.
- **Nunca se piden kilos:** el motor los calcula. El film se cobra por kilo pero
  el cliente da unidades o metros.
- **Validación mínima al enviar:** razón social + RUT + correo + tipo + medidas
  + cantidad del primer producto. El resto se conversa.

## Pendientes antes de producción

1. **Tabla uso → estructura estándar:** confirmar con Cinthia qué material
   asigna SJP a cada uso (café, snack seco, líquidos, congelados…). Hoy el
   formulario captura el uso; el material lo completa el equipo al cotizar.
2. **Destino del informe:** definir a qué correo llega la ficha. Sugerencia:
   `sjpcotizaciones@gmail.com` (el buzón que el pipeline ya lee) o el de Cinthia.
   Se configura en env de Vercel (`DESTINATION_EMAIL`) — tarea de Up.
3. **Film unidades vs metros:** confirmar con Cinthia el caso típico.

## Estado

- Creada localmente · pendiente revisión Francisco/Cinthia · NO desplegada.
- Deploy: `git push origin main` en `Operaria/onboarding` (afecta sitio en vivo).

*Diseñado por Operaria*
