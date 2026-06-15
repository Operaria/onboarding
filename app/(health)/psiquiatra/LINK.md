# Link · OperaHands Psiquiatras (piloto)

Encuesta de inscripción al piloto cerrado del asistente de informes para psiquiatras.

## Formato del link

```
https://onboarding.operaria.cl/psiquiatra/<slug>
```

- `<slug>` puede ser cualquier identificador para distinguir la fuente (ej: `inicio`, `linkedin`, `red-medica`, o el nombre del psiquiatra si lo conocemos). Solo se usa internamente.
- No requiere parámetro `?negocio=` — la vertical lo tiene oculto.

## Ejemplos

- Para difusión general: `https://onboarding.operaria.cl/psiquiatra/inicio`
- Para un canal específico: `https://onboarding.operaria.cl/psiquiatra/red-clinica-las-condes`
- Para un psiquiatra conocido: `https://onboarding.operaria.cl/psiquiatra/dra-perez`

## Qué pasa al enviar

- Llega un PDF con todas las respuestas al correo configurado en `DESTINATION_EMAIL` (vía Resend).
- Pantalla de gracias en tema health: "Te escribimos en los próximos días para coordinar el inicio del piloto."

## Diseñado por Operaria.
