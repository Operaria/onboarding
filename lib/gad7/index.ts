// GAD-7 — Generalized Anxiety Disorder 7-item scale (Spitzer 2006).
// Tamizaje de ansiedad generalizada. 7 ítems Likert 0–3.
// Versión en español validada (García-Campayo et al. 2010).
//
// Scoring: suma 0–21.
// Bandas:
//   0–4   Mínima
//   5–9   Leve
//   10–14 Moderada
//   15–21 Severa
// Punto de corte clínico: ≥ 10 sugiere evaluación.
//
// Pregunta funcional (q8): no suma al score, se reporta aparte.

import type { Respuestas } from "../types";

export const GAD7_OPCIONES = [
  "Para nada",
  "Varios días",
  "Más de la mitad de los días",
  "Casi todos los días",
] as const;

export const GAD7_OPCIONES_FUNCIONAL = [
  "No ha sido difícil",
  "Algo difícil",
  "Muy difícil",
  "Extremadamente difícil",
] as const;

export const GAD7_ITEM_IDS = [
  "gad7_q1", "gad7_q2", "gad7_q3", "gad7_q4", "gad7_q5", "gad7_q6", "gad7_q7",
] as const;

export const GAD7_FUNCIONAL_ID = "gad7_q8";

export type Gad7Banda = "minima" | "leve" | "moderada" | "severa";

export interface Gad7Result {
  totalScore: number;
  itemScores: Record<string, number>;
  banda: Gad7Banda;
  funcionalidad: string | null;
}

function valorLikert(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (GAD7_OPCIONES as readonly string[]).indexOf(v);
  return idx === -1 ? null : idx;
}

function bandaPorScore(s: number): Gad7Banda {
  if (s <= 4) return "minima";
  if (s <= 9) return "leve";
  if (s <= 14) return "moderada";
  return "severa";
}

export function calculateGad7Score(respuestas: Respuestas): Gad7Result {
  const itemScores: Record<string, number> = {};
  let total = 0;
  for (const id of GAD7_ITEM_IDS) {
    const n = valorLikert(respuestas[id]);
    if (n !== null) {
      itemScores[id] = n;
      total += n;
    }
  }
  const funcRaw = respuestas[GAD7_FUNCIONAL_ID];
  const funcionalidad = typeof funcRaw === "string" ? funcRaw : null;
  return {
    totalScore: total,
    itemScores,
    banda: bandaPorScore(total),
    funcionalidad,
  };
}

export function gad7BandaLabel(b: Gad7Banda): string {
  switch (b) {
    case "minima": return "Mínima";
    case "leve": return "Leve";
    case "moderada": return "Moderada";
    case "severa": return "Severa";
  }
}

export function gad7BandaInterpretacion(b: Gad7Banda): string {
  switch (b) {
    case "minima":
      return "Síntomas ansiosos mínimos. No se sugiere intervención específica.";
    case "leve":
      return "Ansiedad leve. Considere psicoeducación y técnicas de manejo del estrés. Reevaluar si los síntomas persisten.";
    case "moderada":
      return "Ansiedad moderada. Se sugiere evaluación clínica y considerar inicio de tratamiento (psicoterapia y/o farmacoterapia).";
    case "severa":
      return "Ansiedad severa. Se recomienda evaluación por especialista y tratamiento activo.";
  }
}
