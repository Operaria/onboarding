// Detección de ideación suicida / autoagresiva en instrumentos de tamizaje.
// Genera una alerta común que el front-end muestra al paciente, el back-end
// destaca en el correo del tratante, y el PDF muestra al inicio.
//
// Hoy: PHQ-9 ítem 9. A futuro: C-SSRS (Columbia), ítem 9 del BDI, etc.

import type { Respuestas } from "../types";

export type AlertaNivel = "ideacion" | "riesgo" | "urgencia";

export interface AlertaSuicidio {
  nivel: AlertaNivel;
  fuente: string;       // texto humano de la fuente, ej "PHQ-9 ítem 9"
  detalle: string;      // qué respondió el paciente, sin parafrasear
}

/** Detecta alerta en el ítem 9 del PHQ-9 ("Pensamientos de que estaría
 *  mejor muerto o de hacerse daño de alguna forma"). Cualquier respuesta
 *  distinta de "Para nada" gatilla la alerta. */
export function detectarAlertaPhq9(respuestas: Respuestas): AlertaSuicidio | null {
  const v = respuestas["phq9_q9"];
  if (typeof v !== "string" || v.trim() === "" || v === "Para nada") return null;
  return {
    nivel: v === "Casi todos los días" ? "riesgo" : "ideacion",
    fuente: "PHQ-9 — ítem 9 (ideación de autoagresión)",
    detalle: v,
  };
}

/** Punto de entrada genérico — un día se le suman C-SSRS, BDI ítem 9, etc. */
export function detectarAlertaSuicidio(
  respuestas: Respuestas,
  verticalId: string,
): AlertaSuicidio | null {
  if (verticalId === "phq9") return detectarAlertaPhq9(respuestas);
  return null;
}

/** Recursos de emergencia en Chile. Centralizado acá para una sola fuente
 *  de verdad — si MINSAL cambia un número, se cambia acá y se propaga. */
export const RECURSOS_CHILE = [
  {
    nombre: "Salud Responde",
    numero: "600 360 7777",
    desc: "Atención psicológica 24/7, MINSAL.",
    href: "tel:6003607777",
  },
  {
    nombre: "Línea Prevención del Suicidio",
    numero: "*4141",
    desc: "Llamada gratuita, 24/7. Contención inmediata.",
    href: "tel:*4141",
  },
  {
    nombre: "SAMU — Emergencia médica",
    numero: "131",
    desc: "Si hay riesgo vital inmediato.",
    href: "tel:131",
  },
] as const;
