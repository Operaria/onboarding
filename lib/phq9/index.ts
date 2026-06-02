// PHQ-9 — Patient Health Questionnaire (Kroenke, Spitzer & Williams, 2001).
// Tamizaje de depresión basado en los 9 criterios DSM. 9 ítems Likert 0–3.
// Versión en español validada en Chile (Baader et al. 2012).
//
// Scoring: suma 0–27.
// Bandas:
//   0–4   Mínima
//   5–9   Leve
//   10–14 Moderada
//   15–19 Moderadamente severa
//   20–27 Severa
// Punto de corte clínico: ≥ 10 sugiere evaluación.
// Ítem 9 (ideación de autoagresión): cualquier respuesta distinta de "Para nada"
// gatilla protocolo de alerta — ver `lib/alerta-suicidio/`.
//
// Pregunta funcional (q10): no suma al score, se reporta aparte.

import type { Respuestas } from "../types";

export const PHQ9_OPCIONES = [
  "Para nada",
  "Varios días",
  "Más de la mitad de los días",
  "Casi todos los días",
] as const;

export const PHQ9_OPCIONES_FUNCIONAL = [
  "No ha sido difícil",
  "Algo difícil",
  "Muy difícil",
  "Extremadamente difícil",
] as const;

export const PHQ9_ITEM_IDS = [
  "phq9_q1", "phq9_q2", "phq9_q3", "phq9_q4", "phq9_q5",
  "phq9_q6", "phq9_q7", "phq9_q8", "phq9_q9",
] as const;

export const PHQ9_FUNCIONAL_ID = "phq9_q10";

export type Phq9Banda = "minima" | "leve" | "moderada" | "moderadamente_severa" | "severa";

export interface Phq9Result {
  totalScore: number;
  itemScores: Record<string, number>;
  banda: Phq9Banda;
  ideacionSuicida: boolean;
  ideacionSuicidaRespuesta: string | null;
  funcionalidad: string | null;
}

function valorLikert(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (PHQ9_OPCIONES as readonly string[]).indexOf(v);
  return idx === -1 ? null : idx;
}

function bandaPorScore(s: number): Phq9Banda {
  if (s <= 4) return "minima";
  if (s <= 9) return "leve";
  if (s <= 14) return "moderada";
  if (s <= 19) return "moderadamente_severa";
  return "severa";
}

export function calculatePhq9Score(respuestas: Respuestas): Phq9Result {
  const itemScores: Record<string, number> = {};
  let total = 0;
  for (const id of PHQ9_ITEM_IDS) {
    const n = valorLikert(respuestas[id]);
    if (n !== null) {
      itemScores[id] = n;
      total += n;
    }
  }
  const ideaResp = respuestas["phq9_q9"];
  const ideacionSuicidaRespuesta = typeof ideaResp === "string" ? ideaResp : null;
  const ideacionSuicida = !!ideacionSuicidaRespuesta && ideacionSuicidaRespuesta !== "Para nada";

  const funcRaw = respuestas[PHQ9_FUNCIONAL_ID];
  const funcionalidad = typeof funcRaw === "string" ? funcRaw : null;

  return {
    totalScore: total,
    itemScores,
    banda: bandaPorScore(total),
    ideacionSuicida,
    ideacionSuicidaRespuesta,
    funcionalidad,
  };
}

export function phq9BandaLabel(b: Phq9Banda): string {
  switch (b) {
    case "minima": return "Mínima";
    case "leve": return "Leve";
    case "moderada": return "Moderada";
    case "moderadamente_severa": return "Moderadamente severa";
    case "severa": return "Severa";
  }
}

export function phq9BandaInterpretacion(b: Phq9Banda): string {
  switch (b) {
    case "minima":
      return "Síntomas depresivos mínimos. No se sugiere intervención específica más allá de seguimiento si el contexto lo amerita.";
    case "leve":
      return "Síntomas depresivos leves. Considere observación clínica, psicoeducación y seguimiento.";
    case "moderada":
      return "Depresión moderada. Se sugiere evaluación clínica formal y considerar inicio de tratamiento (psicoterapia y/o farmacoterapia).";
    case "moderadamente_severa":
      return "Depresión moderadamente severa. Se recomienda tratamiento activo, evaluación por especialista y monitoreo cercano.";
    case "severa":
      return "Depresión severa. Se recomienda evaluación inmediata por psiquiatra, tratamiento intensivo y vigilancia del riesgo de autoagresión.";
  }
}
