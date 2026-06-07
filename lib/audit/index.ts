// AUDIT — Alcohol Use Disorders Identification Test (Babor, OMS, 2001).
// Tamizaje de consumo problemático de alcohol. 10 ítems.
// Versión validada en Chile (Alvarado/Garmendia, MINSAL).
//
// Estructura del scoring:
//   Ítems 1–8: escala 0–4 (5 opciones por ítem)
//   Ítems 9–10: escala 0/2/4 (3 opciones)
// Total: 0–40.
//
// Zonas OMS (interpretación):
//   I   0–7    Bajo riesgo / abstinencia
//   II  8–15   Consumo de riesgo
//   III 16–19  Consumo perjudicial
//   IV  20–40  Probable dependencia
//
// El AUDIT-C son los primeros 3 ítems (0–12). No se reporta como banda separada
// pero sí se calcula para que el tratante lo vea.

import type { Respuestas } from "../types";

// Opciones por ítem. Cada array es del 0 al máximo.
export const AUDIT_Q1_OPCIONES = [
  "Nunca",
  "Una vez al mes o menos",
  "2 a 4 veces al mes",
  "2 a 3 veces a la semana",
  "4 o más veces a la semana",
] as const;

export const AUDIT_Q2_OPCIONES = [
  "1 o 2",
  "3 o 4",
  "5 o 6",
  "7 a 9",
  "10 o más",
] as const;

// Q3 a Q8 comparten la misma escala de frecuencia.
export const AUDIT_FRECUENCIA_OPCIONES = [
  "Nunca",
  "Menos de una vez al mes",
  "Mensualmente",
  "Semanalmente",
  "Diariamente o casi diariamente",
] as const;

// Q9 y Q10: 3 opciones, valor 0/2/4.
export const AUDIT_LESION_OPCIONES = [
  "No",
  "Sí, pero no en el último año",
  "Sí, en el último año",
] as const;
export const AUDIT_LESION_VALORES = [0, 2, 4] as const;

export const AUDIT_ITEM_IDS = [
  "audit_q1", "audit_q2", "audit_q3", "audit_q4", "audit_q5",
  "audit_q6", "audit_q7", "audit_q8", "audit_q9", "audit_q10",
] as const;

export type AuditZona = "I" | "II" | "III" | "IV";

export interface AuditResult {
  totalScore: number;
  auditCScore: number; // suma de q1+q2+q3 (0–12)
  itemScores: Record<string, number>;
  zona: AuditZona;
}

function valorPorOpciones(v: unknown, opciones: readonly string[]): number | null {
  if (typeof v !== "string") return null;
  const idx = opciones.indexOf(v);
  return idx === -1 ? null : idx;
}

function valorLesion(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (AUDIT_LESION_OPCIONES as readonly string[]).indexOf(v);
  if (idx === -1) return null;
  return AUDIT_LESION_VALORES[idx];
}

function zonaPorScore(s: number): AuditZona {
  if (s <= 7) return "I";
  if (s <= 15) return "II";
  if (s <= 19) return "III";
  return "IV";
}

export function calculateAuditScore(respuestas: Respuestas): AuditResult {
  const itemScores: Record<string, number> = {};

  // Q1
  const q1 = valorPorOpciones(respuestas["audit_q1"], AUDIT_Q1_OPCIONES);
  if (q1 !== null) itemScores["audit_q1"] = q1;
  // Q2
  const q2 = valorPorOpciones(respuestas["audit_q2"], AUDIT_Q2_OPCIONES);
  if (q2 !== null) itemScores["audit_q2"] = q2;
  // Q3-Q8: frecuencia 0–4
  for (let i = 3; i <= 8; i++) {
    const id = `audit_q${i}`;
    const v = valorPorOpciones(respuestas[id], AUDIT_FRECUENCIA_OPCIONES);
    if (v !== null) itemScores[id] = v;
  }
  // Q9-Q10: 0/2/4
  for (const id of ["audit_q9", "audit_q10"] as const) {
    const v = valorLesion(respuestas[id]);
    if (v !== null) itemScores[id] = v;
  }

  let total = 0;
  for (const id of AUDIT_ITEM_IDS) total += itemScores[id] ?? 0;
  const auditC = (itemScores["audit_q1"] ?? 0) + (itemScores["audit_q2"] ?? 0) + (itemScores["audit_q3"] ?? 0);

  return {
    totalScore: total,
    auditCScore: auditC,
    itemScores,
    zona: zonaPorScore(total),
  };
}

export function auditZonaLabel(z: AuditZona): string {
  switch (z) {
    case "I": return "Zona I — Bajo riesgo";
    case "II": return "Zona II — Consumo de riesgo";
    case "III": return "Zona III — Consumo perjudicial";
    case "IV": return "Zona IV — Probable dependencia";
  }
}

export function auditZonaInterpretacion(z: AuditZona): string {
  switch (z) {
    case "I":
      return "Consumo de bajo riesgo o abstinencia. Educación general sobre límites recomendados y reevaluación periódica.";
    case "II":
      return "Consumo de riesgo. Se recomienda intervención breve estructurada (consejería motivacional, autoregistro). Reevaluar en 3–6 meses.";
    case "III":
      return "Consumo perjudicial: hay evidencia de daño físico, mental o social. Intervención breve intensiva más derivación a evaluación clínica para descartar trastorno por uso de alcohol.";
    case "IV":
      return "Probable dependencia del alcohol. Se sugiere evaluación diagnóstica por especialista, considerar tratamiento estructurado y eventual manejo farmacológico de la abstinencia.";
  }
}
