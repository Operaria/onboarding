// ISI — Insomnia Severity Index (Bastien, Vallières & Morin, 2001).
// Tamizaje y medición de severidad del insomnio. 7 ítems Likert 0–4 cada uno
// (anclas verbales específicas por ítem; el valor numérico no se muestra al paciente).
// Marco temporal: las últimas 2 semanas.
//
// Scoring: suma 0–28.
// Bandas (Morin 2011):
//   0–7   Sin insomnio clínicamente significativo
//   8–14  Insomnio sub-umbral (síntomas leves)
//   15–21 Insomnio moderado
//   22–28 Insomnio severo
//
// Punto de corte clínico: ≥ 15 sugiere evaluación e intervención.
// Versión en español validada (Fernández-Mendoza et al. 2012).

import type { Respuestas } from "../types";

// Severidad de los 3 problemas (Q1–Q3).
export const ISI_SEVERIDAD_OPCIONES = [
  "Ninguno",
  "Leve",
  "Moderado",
  "Severo",
  "Muy severo",
] as const;

// Satisfacción con el sueño actual (Q4).
export const ISI_SATISFACCION_OPCIONES = [
  "Muy satisfecho/a",
  "Satisfecho/a",
  "Neutro",
  "Insatisfecho/a",
  "Muy insatisfecho/a",
] as const;

// Interferencia con la vida diaria, percepción de los demás, preocupación (Q5–Q7).
export const ISI_INTERFERENCIA_OPCIONES = [
  "Nada",
  "Un poco",
  "Algo",
  "Bastante",
  "Muchísimo",
] as const;

export const ISI_ITEM_IDS = [
  "isi_q1", "isi_q2", "isi_q3", "isi_q4", "isi_q5", "isi_q6", "isi_q7",
] as const;

export type IsiBanda = "sin_insomnio" | "subumbral" | "moderado" | "severo";

export interface IsiResult {
  totalScore: number;
  itemScores: Record<string, number>;
  banda: IsiBanda;
}

function valor(v: unknown, opciones: readonly string[]): number | null {
  if (typeof v !== "string") return null;
  const idx = opciones.indexOf(v);
  return idx === -1 ? null : idx;
}

function bandaPorScore(s: number): IsiBanda {
  if (s <= 7) return "sin_insomnio";
  if (s <= 14) return "subumbral";
  if (s <= 21) return "moderado";
  return "severo";
}

export function calculateIsiScore(respuestas: Respuestas): IsiResult {
  const itemScores: Record<string, number> = {};

  for (let i = 1; i <= 3; i++) {
    const id = `isi_q${i}`;
    const v = valor(respuestas[id], ISI_SEVERIDAD_OPCIONES);
    if (v !== null) itemScores[id] = v;
  }
  const v4 = valor(respuestas["isi_q4"], ISI_SATISFACCION_OPCIONES);
  if (v4 !== null) itemScores["isi_q4"] = v4;
  for (let i = 5; i <= 7; i++) {
    const id = `isi_q${i}`;
    const v = valor(respuestas[id], ISI_INTERFERENCIA_OPCIONES);
    if (v !== null) itemScores[id] = v;
  }

  let total = 0;
  for (const id of ISI_ITEM_IDS) total += itemScores[id] ?? 0;

  return {
    totalScore: total,
    itemScores,
    banda: bandaPorScore(total),
  };
}

export function isiBandaLabel(b: IsiBanda): string {
  switch (b) {
    case "sin_insomnio": return "Sin insomnio significativo";
    case "subumbral": return "Insomnio sub-umbral";
    case "moderado": return "Insomnio moderado";
    case "severo": return "Insomnio severo";
  }
}

export function isiBandaInterpretacion(b: IsiBanda): string {
  switch (b) {
    case "sin_insomnio":
      return "No hay insomnio clínicamente significativo. Se recomienda mantener hábitos de higiene del sueño y consultar si la situación cambia.";
    case "subumbral":
      return "Insomnio sub-umbral (síntomas leves). Considere psicoeducación sobre higiene del sueño, manejo del estrés y reevaluar si persiste tras 2–4 semanas.";
    case "moderado":
      return "Insomnio moderado. Se sugiere evaluación clínica e iniciar tratamiento estructurado (terapia cognitivo-conductual para el insomnio o TCC-I) considerando o no apoyo farmacológico transitorio.";
    case "severo":
      return "Insomnio severo. Se recomienda evaluación por profesional especializado, descartar trastornos del sueño asociados (apnea, síndrome de piernas inquietas) y manejo activo combinado.";
  }
}
