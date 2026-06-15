# Restó 360 · Encuesta de onboarding

**Vertical id:** `resto360`
**Tema:** flow (navy / teal · Syne · operativo)
**Ruta:** `app/(flow)/resto360/[cliente]/page.tsx`
**Marca:** Flow · pie "Diseñado por Operaria"

## Formato del link

```
https://onboarding.operaria.cl/resto360/<slug-prospecto>
```

- `<slug-prospecto>`: el nombre del restorán en minúsculas y con guiones.
  Ej: `sumaq` → se muestra como "Sumaq". `el-fogon` → "El Fogon".
  Separa por guiones, sin espacios ni tildes en la URL.

**Ejemplos:**
- `onboarding.operaria.cl/resto360/sumaq`
- `onboarding.operaria.cl/resto360/el-fogon`

El slug es la identidad del restorán que ve el prospecto en la portada
(etiqueta "Restorán"). El nombre real, igual, se vuelve a pedir dentro del
formulario (Bloque 1 · `nombre`), que es el dato que viaja al PDF.

> Opcional: el negocio también acepta `?negocio=<slug>` por si quieres
> separar persona de restorán, pero para Restó 360 no hace falta — el slug de
> ruta basta.

## Para qué sirve el PDF que llega

Al enviar, el vendedor recibe un PDF por correo (Resend). Ese PDF es insumo doble:

1. **Configuración del agente:** `nombre`, `cocina`, `horario_*` → identidad y
   horario · `tono`, `tuteo`, `palabras_si/no`, `nombre_anfitrion` → la voz ·
   `restricciones`, `historia_platos`, `carta_actual` → carta y estilo de
   recomendación · `pasarela`, `boleta_sii`, `whatsapp_business` →
   integraciones · `fono_dueno`, `fonos_staff`, `recibe_cierre`, `admin_carta`
   → jerarquía de roles.
2. **Propuesta de cierre (impacto proyectado):** `consume_tiempo` +
   `cierre_tiempo` + `demora_cuenta` → tiempo devuelto al equipo · `entrada` →
   plan sugerido y pricing · `mesas` + `ticket` → tamaño y proyección de
   ingreso recuperado.

## Validación al enviar

Mínimos exigidos: nombre del restorán (Bloque 1) + número del dueño/a
(Bloque 7) + al menos un medio de pago (Bloque 5). El resto se conversa.

## Estado

- Creada localmente · verificada (`tsc` + `build` en verde) · **NO desplegada.**
- Deploy: `git push origin main` en `Operaria/onboarding` (afecta el sitio en
  vivo onboarding.operaria.cl). No pushear sin el OK de Francisco.

*Diseñado por Operaria*
