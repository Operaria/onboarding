import type { Respuestas } from "../types";

export interface FimResult {
  motor: number;      // suma ítems f1–f13 (rango 13–91)
  cognitivo: number;  // suma ítems f14–f18 (rango 5–35)
  total: number;      // motor + cognitivo (rango 18–126)
}

function nivel(v: unknown): number {
  return typeof v === "number" && v >= 1 && v <= 7 ? v : 0;
}

/** Suma del chasis tipo FIM: subtotales motor y cognitivo + total. */
export function scoreFim(respuestas: Respuestas): FimResult {
  let motor = 0;
  for (let i = 1; i <= 13; i++) motor += nivel(respuestas[`f${i}`]);
  let cognitivo = 0;
  for (let i = 14; i <= 18; i++) cognitivo += nivel(respuestas[`f${i}`]);
  return { motor, cognitivo, total: motor + cognitivo };
}
