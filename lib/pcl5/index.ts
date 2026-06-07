// PCL-5 — PTSD Checklist for DSM-5 (Weathers, Litz, Keane et al. · NCPTSD, 2013).
// Tamizaje de Trastorno de Estrés Postraumático según criterios DSM-5.
// 20 ítems Likert 0–4 (Nada / Un poco / Moderadamente / Bastante / Extremadamente).
// Marco temporal: el último mes, en relación a un evento traumático.
//
// Scoring:
//   Total: suma 0–80.
//   Punto de corte clínico (Bovin et al. 2016, validación VA): ≥ 33 sugiere PTSD probable.
//   Subscores por cluster DSM-5:
//     B Intrusión:                 ítems 1–5    (max 20)
//     C Evitación:                 ítems 6–7    (max 8)
//     D Cogniciones / ánimo:       ítems 8–14   (max 28)
//     E Alerta / reactividad:      ítems 15–20  (max 24)
//
//   Diagnóstico provisorio DSM-5 (regla de items "endorsed" = ≥ 2 "Moderadamente"):
//     ≥1 ítem ≥2 en B  +  ≥1 ítem ≥2 en C  +  ≥2 ítems ≥2 en D  +  ≥2 ítems ≥2 en E
//
// Validación en español/Chile: Vitriol et al. 2017.

import type { Respuestas } from "../types";

export const PCL5_OPCIONES = [
  "Nada",
  "Un poco",
  "Moderadamente",
  "Bastante",
  "Extremadamente",
] as const;

export const PCL5_ITEM_IDS = Array.from({ length: 20 }, (_, i) => `pcl5_q${i + 1}`) as readonly string[];

// Índices 1-based de cada cluster DSM-5.
export const PCL5_CLUSTER_B = [1, 2, 3, 4, 5];
export const PCL5_CLUSTER_C = [6, 7];
export const PCL5_CLUSTER_D = [8, 9, 10, 11, 12, 13, 14];
export const PCL5_CLUSTER_E = [15, 16, 17, 18, 19, 20];

export type Pcl5Severidad = "minimo" | "leve" | "moderado" | "severo";

export interface Pcl5ClusterScore {
  cluster: "B" | "C" | "D" | "E";
  nombre: string;
  raw: number;
  max: number;
  itemsEndorsed: number;
}

export interface Pcl5Result {
  totalScore: number;
  cortePositivo: boolean;       // total ≥ 33
  diagnosticoProvisorio: boolean; // cumple regla DSM-5 de cluster
  severidad: Pcl5Severidad;
  itemScores: Record<string, number>;
  clusters: Pcl5ClusterScore[];
}

function valorLikert(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const idx = (PCL5_OPCIONES as readonly string[]).indexOf(v);
  return idx === -1 ? null : idx;
}

function severidadPorScore(s: number): Pcl5Severidad {
  if (s < 21) return "minimo";
  if (s < 33) return "leve";
  if (s < 50) return "moderado";
  return "severo";
}

function sumCluster(indices: number[], scores: Record<string, number>): { raw: number; itemsEndorsed: number } {
  let raw = 0;
  let itemsEndorsed = 0;
  for (const i of indices) {
    const v = scores[`pcl5_q${i}`] ?? 0;
    raw += v;
    if (v >= 2) itemsEndorsed += 1;
  }
  return { raw, itemsEndorsed };
}

export function calculatePcl5Score(respuestas: Respuestas): Pcl5Result {
  const itemScores: Record<string, number> = {};
  for (const id of PCL5_ITEM_IDS) {
    const v = valorLikert(respuestas[id]);
    if (v !== null) itemScores[id] = v;
  }
  let total = 0;
  for (const id of PCL5_ITEM_IDS) total += itemScores[id] ?? 0;

  const B = sumCluster(PCL5_CLUSTER_B, itemScores);
  const C = sumCluster(PCL5_CLUSTER_C, itemScores);
  const D = sumCluster(PCL5_CLUSTER_D, itemScores);
  const E = sumCluster(PCL5_CLUSTER_E, itemScores);

  const diagnosticoProvisorio =
    B.itemsEndorsed >= 1 && C.itemsEndorsed >= 1 && D.itemsEndorsed >= 2 && E.itemsEndorsed >= 2;

  const clusters: Pcl5ClusterScore[] = [
    { cluster: "B", nombre: "Reexperimentación / intrusión", raw: B.raw, max: 20, itemsEndorsed: B.itemsEndorsed },
    { cluster: "C", nombre: "Evitación", raw: C.raw, max: 8, itemsEndorsed: C.itemsEndorsed },
    { cluster: "D", nombre: "Alteraciones cognitivas y del ánimo", raw: D.raw, max: 28, itemsEndorsed: D.itemsEndorsed },
    { cluster: "E", nombre: "Alteraciones de alerta y reactividad", raw: E.raw, max: 24, itemsEndorsed: E.itemsEndorsed },
  ];

  return {
    totalScore: total,
    cortePositivo: total >= 33,
    diagnosticoProvisorio,
    severidad: severidadPorScore(total),
    itemScores,
    clusters,
  };
}

export function pcl5SeveridadLabel(s: Pcl5Severidad): string {
  switch (s) {
    case "minimo": return "Síntomas mínimos";
    case "leve": return "Síntomas leves";
    case "moderado": return "Síntomas moderados";
    case "severo": return "Síntomas severos";
  }
}

export function pcl5SeveridadInterpretacion(r: Pcl5Result): string {
  const base = (() => {
    switch (r.severidad) {
      case "minimo":
        return "Síntomas postraumáticos mínimos. No se sugiere intervención específica más allá de seguimiento si el contexto lo amerita.";
      case "leve":
        return "Síntomas leves bajo el corte clínico de tamizaje (33). Considere psicoeducación y seguimiento clínico.";
      case "moderado":
        return "Síntomas moderados, por encima del corte clínico de tamizaje (≥33). Se sugiere evaluación clínica estructurada (entrevista CAPS-5 u homóloga) y considerar intervención psicológica basada en evidencia.";
      case "severo":
        return "Síntomas severos. Se recomienda evaluación por profesional con formación en trauma, tratamiento estructurado (terapias focalizadas en trauma como EMDR, TCC-T o exposición prolongada) y monitoreo del riesgo asociado.";
    }
  })();
  const dxLine = r.diagnosticoProvisorio
    ? " Cumple la regla de tamizaje DSM-5 por clusters (B/C/D/E), lo que apoya la sospecha de TEPT."
    : "";
  return base + dxLine;
}
