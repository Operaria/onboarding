// MDQ — Mood Disorder Questionnaire (Hirschfeld et al., 2000).
// Versión validada en español difundida por SOCHITAB (Sociedad Chilena de
// Trastorno Bipolar). Tamizaje autoaplicado de manía/hipomanía.
//
// Scoring oficial — tamizaje POSITIVO si se cumplen los TRES criterios:
//   1) ≥7 ítems "Sí" entre los 13 síntomas (pregunta 1)
//   2) "Sí" en co-ocurrencia (pregunta 2)
//   3) "Problema moderado" o "Problema serio" en disfunción (pregunta 3)
// Si falta cualquiera, el tamizaje es NEGATIVO.
//
// Importante: el MDQ es tamizaje, NO diagnóstico. Un positivo sugiere
// derivación a psiquiatra; un negativo no descarta trastorno del ánimo.

import type { Respuestas } from "../types";

export const MDQ_ITEM_IDS = [
  "mdq_s1", "mdq_s2", "mdq_s3", "mdq_s4", "mdq_s5", "mdq_s6", "mdq_s7",
  "mdq_s8", "mdq_s9", "mdq_s10", "mdq_s11", "mdq_s12", "mdq_s13",
] as const;

export const MDQ_COOCURRENCIA_ID = "mdq_cooc";
export const MDQ_PROBLEMA_ID = "mdq_problema";

export const MDQ_OPCIONES_SI_NO = ["Sí", "No"] as const;
export const MDQ_OPCIONES_PROBLEMA = [
  "Ningún problema",
  "Problema menor",
  "Problema moderado",
  "Problema serio",
] as const;

export type MdqClasificacion = "positivo" | "negativo";

export interface MdqResult {
  sintomasSi: number;
  totalItems: number;
  itemsResponseSi: string[]; // ids de ítems contestados "Sí"
  coocurrencia: "Sí" | "No" | null;
  nivelProblema: typeof MDQ_OPCIONES_PROBLEMA[number] | null;
  cumpleSintomas: boolean;     // ≥7 "Sí"
  cumpleCoocurrencia: boolean; // "Sí"
  cumpleProblema: boolean;     // moderado o serio
  clasificacion: MdqClasificacion;
}

function readSiNo(r: Respuestas, id: string): "Sí" | "No" | null {
  const v = r[id];
  if (v === "Sí") return "Sí";
  if (v === "No") return "No";
  return null;
}

export function calculateMdqScore(respuestas: Respuestas): MdqResult {
  const itemsResponseSi: string[] = [];
  for (const id of MDQ_ITEM_IDS) {
    if (readSiNo(respuestas, id) === "Sí") itemsResponseSi.push(id);
  }
  const sintomasSi = itemsResponseSi.length;

  const coocurrencia = readSiNo(respuestas, MDQ_COOCURRENCIA_ID);

  const problemaRaw = respuestas[MDQ_PROBLEMA_ID];
  const nivelProblema =
    typeof problemaRaw === "string" &&
    (MDQ_OPCIONES_PROBLEMA as readonly string[]).includes(problemaRaw)
      ? (problemaRaw as typeof MDQ_OPCIONES_PROBLEMA[number])
      : null;

  const cumpleSintomas = sintomasSi >= 7;
  const cumpleCoocurrencia = coocurrencia === "Sí";
  const cumpleProblema =
    nivelProblema === "Problema moderado" || nivelProblema === "Problema serio";

  const clasificacion: MdqClasificacion =
    cumpleSintomas && cumpleCoocurrencia && cumpleProblema ? "positivo" : "negativo";

  return {
    sintomasSi,
    totalItems: MDQ_ITEM_IDS.length,
    itemsResponseSi,
    coocurrencia,
    nivelProblema,
    cumpleSintomas,
    cumpleCoocurrencia,
    cumpleProblema,
    clasificacion,
  };
}

export function clasificacionLabelEs(c: MdqClasificacion): string {
  return c === "positivo" ? "Tamizaje positivo" : "Tamizaje negativo";
}
