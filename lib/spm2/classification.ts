import type { Classification } from "./types";

/**
 * Clasifica un T-score según los puntos de corte del SPM-2.
 * - T >= 70: Disfunción definitiva
 * - T >= 60: Algunas dificultades
 * - T < 60: Funcionamiento típico
 */
export function classify(tScore: number): Classification {
  if (tScore >= 70) return "definite_dysfunction";
  if (tScore >= 60) return "some_problems";
  return "typical";
}

export function classificationLabelEs(c: Classification): string {
  switch (c) {
    case "typical": return "Funcionamiento típico";
    case "some_problems": return "Algunas dificultades";
    case "definite_dysfunction": return "Disfunción definitiva";
  }
}
