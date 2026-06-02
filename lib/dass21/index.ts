// DASS-21 — Depression Anxiety Stress Scales (Lovibond & Lovibond 1995).
// 21 ítems Likert 0–3, organizados en 3 subescalas de 7 ítems cada una.
// Versión en español validada (Antúnez & Vinet 2012 en Chile, entre otras).
//
// Scoring por subescala: suma de los 7 ítems multiplicada por 2 (DASS-21 es
// "media versión" del DASS-42; al multiplicar por 2 se compara con los
// baremos originales DASS-42).
//
// Bandas (sobre el puntaje multiplicado por 2):
//   Depresión: 0–9 Normal · 10–13 Leve · 14–20 Moderada · 21–27 Severa · 28+ Ext. severa
//   Ansiedad:  0–7 Normal · 8–9 Leve  · 10–14 Moderada · 15–19 Severa · 20+ Ext. severa
//   Estrés:    0–14 Normal · 15–18 Leve · 19–25 Moderada · 26–33 Severa · 34+ Ext. severa
//
// Asignación de ítems a subescala (numeración DASS-21):
//   Depresión: ítems 3, 5, 10, 13, 16, 17, 21
//   Ansiedad:  ítems 2, 4, 7, 9, 15, 19, 20
//   Estrés:    ítems 1, 6, 8, 11, 12, 14, 18
//
// DASS-21 NO incluye ítem de autoagresión.

import type { Respuestas } from "../types";

export const DASS21_OPCIONES = [
  "No me ha ocurrido",
  "Me ha ocurrido un poco, o durante parte del tiempo",
  "Me ha ocurrido bastante, o durante una buena parte del tiempo",
  "Me ha ocurrido mucho, o la mayor parte del tiempo",
] as const;

export const DASS21_ITEM_IDS = Array.from({ length: 21 }, (_, i) => `dass21_q${i + 1}`) as readonly string[];

export const DASS21_DEPRESION_NUM = [3, 5, 10, 13, 16, 17, 21] as const;
export const DASS21_ANSIEDAD_NUM = [2, 4, 7, 9, 15, 19, 20] as const;
export const DASS21_ESTRES_NUM = [1, 6, 8, 11, 12, 14, 18] as const;

export type Dass21Subescala = "depresion" | "ansiedad" | "estres";
export type Dass21Banda = "normal" | "leve" | "moderada" | "severa" | "ext_severa";

export interface Dass21SubescalaResult {
  subescala: Dass21Subescala;
  rawSum: number;       // suma cruda 0–21
  score: number;        // rawSum × 2 — el puntaje que se compara con bandas DASS-42
  banda: Dass21Banda;
}

export interface Dass21Result {
  depresion: Dass21SubescalaResult;
  ansiedad: Dass21SubescalaResult;
  estres: Dass21SubescalaResult;
  itemScores: Record<string, number>;
}

function valorLikert(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (DASS21_OPCIONES as readonly string[]).indexOf(v);
  return idx === -1 ? null : idx;
}

function sumar(respuestas: Respuestas, nums: readonly number[]): number {
  let s = 0;
  for (const n of nums) {
    const v = valorLikert(respuestas[`dass21_q${n}`]);
    if (v !== null) s += v;
  }
  return s;
}

function bandaDepresion(s: number): Dass21Banda {
  if (s <= 9) return "normal";
  if (s <= 13) return "leve";
  if (s <= 20) return "moderada";
  if (s <= 27) return "severa";
  return "ext_severa";
}

function bandaAnsiedad(s: number): Dass21Banda {
  if (s <= 7) return "normal";
  if (s <= 9) return "leve";
  if (s <= 14) return "moderada";
  if (s <= 19) return "severa";
  return "ext_severa";
}

function bandaEstres(s: number): Dass21Banda {
  if (s <= 14) return "normal";
  if (s <= 18) return "leve";
  if (s <= 25) return "moderada";
  if (s <= 33) return "severa";
  return "ext_severa";
}

export function calculateDass21Score(respuestas: Respuestas): Dass21Result {
  const itemScores: Record<string, number> = {};
  for (const id of DASS21_ITEM_IDS) {
    const v = valorLikert(respuestas[id]);
    if (v !== null) itemScores[id] = v;
  }
  const depRaw = sumar(respuestas, DASS21_DEPRESION_NUM);
  const ansRaw = sumar(respuestas, DASS21_ANSIEDAD_NUM);
  const estRaw = sumar(respuestas, DASS21_ESTRES_NUM);
  const dep = depRaw * 2;
  const ans = ansRaw * 2;
  const est = estRaw * 2;
  return {
    depresion: { subescala: "depresion", rawSum: depRaw, score: dep, banda: bandaDepresion(dep) },
    ansiedad: { subescala: "ansiedad", rawSum: ansRaw, score: ans, banda: bandaAnsiedad(ans) },
    estres: { subescala: "estres", rawSum: estRaw, score: est, banda: bandaEstres(est) },
    itemScores,
  };
}

export function dass21BandaLabel(b: Dass21Banda): string {
  switch (b) {
    case "normal": return "Normal";
    case "leve": return "Leve";
    case "moderada": return "Moderada";
    case "severa": return "Severa";
    case "ext_severa": return "Extremadamente severa";
  }
}

export function dass21SubescalaLabel(s: Dass21Subescala): string {
  switch (s) {
    case "depresion": return "Depresión";
    case "ansiedad": return "Ansiedad";
    case "estres": return "Estrés";
  }
}

export function dass21Interpretacion(s: Dass21Subescala, b: Dass21Banda): string {
  const dimension =
    s === "depresion" ? "depresivos" :
    s === "ansiedad" ? "ansiosos" :
    "de estrés";
  switch (b) {
    case "normal":
      return `Síntomas ${dimension} dentro del rango normal.`;
    case "leve":
      return `Síntomas ${dimension} en rango leve. Considere observación, psicoeducación y técnicas de autocuidado.`;
    case "moderada":
      return `Síntomas ${dimension} en rango moderado. Se sugiere evaluación clínica formal.`;
    case "severa":
      return `Síntomas ${dimension} en rango severo. Se recomienda tratamiento activo y evaluación por especialista.`;
    case "ext_severa":
      return `Síntomas ${dimension} extremadamente severos. Evaluación urgente y tratamiento prioritario.`;
  }
}
