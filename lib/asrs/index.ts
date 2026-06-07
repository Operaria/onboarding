// ASRS-v1.1 — Adult ADHD Self-Report Scale (Kessler et al. · OMS, 2005).
// Tamizaje de TDAH en adultos. 18 ítems Likert 0–4 (Nunca / Rara vez /
// Algunas veces / A menudo / Muy a menudo). Validación en español de habla
// hispana: Pedrero-Pérez et al. 2012.
//
// Estructura:
//   Parte A (ítems 1–6):   Tamizaje primario. Cada ítem tiene "zona sombreada"
//                          propia: para los ítems 1, 2, 3 la zona sombreada
//                          empieza en "Algunas veces" (≥ 2). Para los ítems
//                          4, 5, 6 empieza en "A menudo" (≥ 3).
//                          ≥ 4 ítems en zona sombreada → tamizaje positivo.
//   Parte B (ítems 7–18):  12 preguntas adicionales que afinan el perfil
//                          (inatención vs hiperactividad/impulsividad).
//
// Subescalas DSM-5/Kessler:
//   Inatención:                 ítems 1, 2, 3, 4, 7, 8, 9, 10, 11  (9 ítems, 0–36)
//   Hiperactividad/impulsividad: ítems 5, 6, 12, 13, 14, 15, 16, 17, 18 (9 ítems, 0–36)
//
// El total bruto (0–72) se reporta solo como referencia clínica;
// la decisión de tamizaje vive en Parte A.

import type { Respuestas } from "../types";

export const ASRS_OPCIONES = [
  "Nunca",
  "Rara vez",
  "Algunas veces",
  "A menudo",
  "Muy a menudo",
] as const;

export const ASRS_ITEM_IDS = Array.from({ length: 18 }, (_, i) => `asrs_q${i + 1}`) as readonly string[];

// Umbrales "zona sombreada" Part A (índices 1-based, valor mínimo para contar).
const PART_A_UMBRALES: Record<number, number> = {
  1: 2, 2: 2, 3: 2,
  4: 3, 5: 3, 6: 3,
};

// Indexes 1-based de cada subescala.
export const ASRS_INATENCION_ITEMS = [1, 2, 3, 4, 7, 8, 9, 10, 11];
export const ASRS_HIPERACT_ITEMS = [5, 6, 12, 13, 14, 15, 16, 17, 18];

export interface AsrsResult {
  itemScores: Record<string, number>;
  partAEndorsed: number;      // ítems en zona sombreada (Part A)
  partAPositive: boolean;     // ≥ 4 endorsed
  partAEndorsedDetail: Record<string, boolean>;
  inatencionScore: number;    // 0–36
  hiperactividadScore: number; // 0–36
  totalScore: number;         // 0–72 (suma todos)
}

function valorLikert(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (ASRS_OPCIONES as readonly string[]).indexOf(v);
  return idx === -1 ? null : idx;
}

export function calculateAsrsScore(respuestas: Respuestas): AsrsResult {
  const itemScores: Record<string, number> = {};
  for (const id of ASRS_ITEM_IDS) {
    const v = valorLikert(respuestas[id]);
    if (v !== null) itemScores[id] = v;
  }

  // Part A
  let partAEndorsed = 0;
  const partAEndorsedDetail: Record<string, boolean> = {};
  for (const n of [1, 2, 3, 4, 5, 6]) {
    const id = `asrs_q${n}`;
    const v = itemScores[id] ?? 0;
    const endorsed = v >= PART_A_UMBRALES[n];
    partAEndorsedDetail[id] = endorsed;
    if (endorsed) partAEndorsed += 1;
  }

  let inatencion = 0;
  for (const n of ASRS_INATENCION_ITEMS) inatencion += itemScores[`asrs_q${n}`] ?? 0;

  let hiperactividad = 0;
  for (const n of ASRS_HIPERACT_ITEMS) hiperactividad += itemScores[`asrs_q${n}`] ?? 0;

  let total = 0;
  for (const id of ASRS_ITEM_IDS) total += itemScores[id] ?? 0;

  return {
    itemScores,
    partAEndorsed,
    partAPositive: partAEndorsed >= 4,
    partAEndorsedDetail,
    inatencionScore: inatencion,
    hiperactividadScore: hiperactividad,
    totalScore: total,
  };
}

export function asrsTamizajeLabel(positive: boolean): string {
  return positive ? "Tamizaje positivo" : "Tamizaje negativo";
}

export function asrsInterpretacion(r: AsrsResult): string {
  const baseTamizaje = r.partAPositive
    ? `Tamizaje positivo (${r.partAEndorsed}/6 ítems de la Parte A en zona crítica). Los síntomas son altamente sugerentes de TDAH del adulto y ameritan evaluación clínica formal por especialista (psiquiatra o neurólogo con experiencia en TDAH).`
    : `Tamizaje negativo (${r.partAEndorsed}/6 ítems de la Parte A en zona crítica). Los síntomas reportados no alcanzan el umbral de tamizaje. Si la persona o su entorno tienen dudas funcionales claras, una evaluación clínica complementaria sigue siendo razonable.`;

  const perfilLine = (() => {
    const inat = r.inatencionScore;
    const hip = r.hiperactividadScore;
    if (inat === 0 && hip === 0) return "";
    const dominio = inat > hip + 4
      ? "Predomina el perfil de inatención."
      : hip > inat + 4
      ? "Predomina el perfil de hiperactividad/impulsividad."
      : "Perfil combinado: inatención e hiperactividad/impulsividad de magnitud similar.";
    return ` ${dominio}`;
  })();

  return baseTamizaje + perfilLine;
}
