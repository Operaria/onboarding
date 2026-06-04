# Bridge cotizador · Brechas de información

**Vertical id:** `bridge-cotizador`
**Tema:** paraguas
**Ruta:** `app/(encuestas)/bridge-cotizador/[cliente]/page.tsx`
**Destinatario único del informe:** Francisco (`franciscomunoz@operaria.cl`)
**Sin copia a Cinthia** — consulta técnica reservada al equipo.

## Formato del link

```
https://onboarding.operaria.cl/bridge-cotizador/<slug-del-informatico>
```

El `<slug-del-informatico>` puede ser su nombre en minúsculas con guiones (ej. `juan-perez`). El sistema lo convierte automáticamente a "Juan Pérez" en la portada.

## Estado

- Creada localmente · pendiente revisión Francisco · NO desplegada a producción aún.
- Para desplegar: `git push origin main` desde `Operaria/onboarding` (afecta sitio en vivo).

## Notas

- El bloque G (caso de control) trae 13 campos numéricos individuales — más fácil de llenar que un solo textarea.
- La validación al enviar es laxa: solo exige nombre y correo. El resto puede ir en blanco.
- Cierre: "Muchas gracias por su tiempo."
