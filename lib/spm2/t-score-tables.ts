// NOTA: Tablas T-score aproximadas. Verificar contra manual SPM-2 antes de uso clínico.

import type { AreaId, FormType } from "./types";

// ─── Tablas por área: raw score → T-score ────────────────────────────────────

type TScoreTable = Record<number, number>;

const HOME_AREA_TABLES: Record<AreaId, TScoreTable> = {
  VIS: { 10: 40, 11: 42, 12: 46, 13: 48, 14: 50, 15: 54, 16: 57, 17: 59, 18: 62, 19: 64, 20: 66, 21: 68, 22: 69, 23: 71, 24: 73, 25: 74, 26: 76, 27: 77, 28: 79, 29: 80, 30: 80 },
  HEA: { 10: 40, 11: 42, 12: 46, 13: 48, 14: 51, 15: 53, 16: 57, 17: 59, 18: 62, 19: 64, 20: 66, 21: 68, 22: 70, 23: 72, 24: 73, 25: 75, 26: 76, 27: 78, 28: 79, 29: 80, 30: 80 },
  TOU: { 10: 40, 11: 42, 12: 46, 13: 48, 14: 50, 15: 54, 16: 57, 17: 60, 18: 62, 19: 65, 20: 67, 21: 69, 22: 71, 23: 73, 24: 74, 25: 76, 26: 77, 27: 78, 28: 79, 29: 80, 30: 80 },
  TAS: { 10: 40, 11: 43, 12: 48, 13: 51, 14: 54, 15: 57, 16: 60, 17: 62, 18: 65, 19: 67, 20: 69, 21: 71, 22: 73, 23: 74, 24: 76, 25: 77, 26: 78, 27: 79, 28: 80, 29: 80, 30: 80 },
  BOD: { 10: 40, 11: 42, 12: 45, 13: 48, 14: 50, 15: 53, 16: 55, 17: 58, 18: 60, 19: 63, 20: 65, 21: 67, 22: 69, 23: 71, 24: 73, 25: 74, 26: 76, 27: 77, 28: 79, 29: 80, 30: 80 },
  BAL: { 10: 40, 11: 42, 12: 46, 13: 49, 14: 51, 15: 54, 16: 57, 17: 60, 18: 62, 19: 65, 20: 67, 21: 69, 22: 71, 23: 73, 24: 75, 25: 76, 26: 78, 27: 79, 28: 80, 29: 80, 30: 80 },
  PLN: { 10: 40, 11: 42, 12: 44, 13: 47, 14: 50, 15: 52, 16: 55, 17: 57, 18: 60, 19: 62, 20: 64, 21: 66, 22: 68, 23: 70, 24: 72, 25: 73, 26: 75, 27: 76, 28: 78, 29: 79, 30: 80 },
  SOC: { 10: 40, 11: 42, 12: 45, 13: 47, 14: 50, 15: 52, 16: 55, 17: 57, 18: 59, 19: 62, 20: 64, 21: 66, 22: 68, 23: 70, 24: 72, 25: 74, 26: 75, 27: 77, 28: 78, 29: 80, 30: 80 },
};

const SCHOOL_AREA_TABLES: Record<AreaId, TScoreTable> = {
  VIS: { 10: 40, 11: 43, 12: 46, 13: 49, 14: 52, 15: 54, 16: 58, 17: 60, 18: 63, 19: 66, 20: 68, 21: 70, 22: 72, 23: 74, 24: 76, 25: 77, 26: 79, 27: 80 },
  HEA: { 10: 40, 11: 43, 12: 47, 13: 49, 14: 52, 15: 55, 16: 58, 17: 61, 18: 63, 19: 66, 20: 68, 21: 71, 22: 73, 23: 75, 24: 77, 25: 78, 26: 80 },
  TOU: { 10: 40, 11: 43, 12: 46, 13: 49, 14: 52, 15: 55, 16: 58, 17: 61, 18: 64, 19: 66, 20: 69, 21: 71, 22: 73, 23: 75, 24: 77, 25: 79, 26: 80 },
  TAS: { 10: 40, 11: 44, 12: 48, 13: 52, 14: 55, 15: 58, 16: 62, 17: 65, 18: 68, 19: 71, 20: 74, 21: 76, 22: 78, 23: 80 },
  BOD: { 10: 40, 11: 42, 12: 45, 13: 48, 14: 51, 15: 53, 16: 56, 17: 59, 18: 61, 19: 64, 20: 66, 21: 69, 22: 71, 23: 73, 24: 76, 25: 78, 26: 80 },
  BAL: { 10: 40, 11: 43, 12: 46, 13: 49, 14: 52, 15: 55, 16: 58, 17: 61, 18: 64, 19: 66, 20: 69, 21: 71, 22: 73, 23: 75, 24: 77, 25: 79, 26: 80 },
  PLN: { 10: 40, 11: 42, 12: 44, 13: 47, 14: 49, 15: 52, 16: 54, 17: 57, 18: 59, 19: 61, 20: 64, 21: 66, 22: 68, 23: 70, 24: 73, 25: 75, 26: 77, 27: 78, 28: 80 },
  SOC: { 10: 40, 11: 42, 12: 46, 13: 49, 14: 52, 15: 54, 16: 58, 17: 60, 18: 63, 19: 66, 20: 68, 21: 71, 22: 73, 23: 76, 24: 78, 25: 80 },
};

// ─── Tablas Total Sensorial (ST): raw score → T-score ────────────────────────

interface StBreakpoint {
  raw: number;
  t: number;
}

const HOME_ST_BREAKPOINTS: StBreakpoint[] = [
  { raw: 60, t: 40 }, { raw: 65, t: 42 }, { raw: 70, t: 44 }, { raw: 75, t: 46 },
  { raw: 80, t: 48 }, { raw: 85, t: 50 }, { raw: 90, t: 52 }, { raw: 93, t: 54 },
  { raw: 96, t: 56 }, { raw: 99, t: 58 }, { raw: 102, t: 60 }, { raw: 105, t: 62 },
  { raw: 108, t: 64 }, { raw: 111, t: 66 }, { raw: 114, t: 68 }, { raw: 117, t: 70 },
  { raw: 120, t: 72 }, { raw: 123, t: 73 }, { raw: 126, t: 75 }, { raw: 130, t: 77 },
  { raw: 135, t: 78 }, { raw: 140, t: 79 }, { raw: 145, t: 80 },
];

const SCHOOL_ST_BREAKPOINTS: StBreakpoint[] = [
  { raw: 60, t: 40 }, { raw: 65, t: 42 }, { raw: 70, t: 44 }, { raw: 75, t: 46 },
  { raw: 80, t: 48 }, { raw: 85, t: 50 }, { raw: 88, t: 52 }, { raw: 91, t: 54 },
  { raw: 94, t: 56 }, { raw: 97, t: 58 }, { raw: 100, t: 60 }, { raw: 103, t: 62 },
  { raw: 106, t: 64 }, { raw: 109, t: 66 }, { raw: 112, t: 68 }, { raw: 115, t: 70 },
  { raw: 118, t: 72 }, { raw: 121, t: 74 }, { raw: 124, t: 76 }, { raw: 128, t: 78 },
  { raw: 132, t: 80 },
];

// ─── Funciones de lookup ─────────────────────────────────────────────────────

/**
 * Busca el T-score para un raw score en una tabla discreta.
 * Si el raw score excede el máximo de la tabla, retorna 80 (techo).
 * Si está entre dos puntos, interpola linealmente.
 */
function lookupFromTable(table: TScoreTable, rawScore: number): number {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  const minKey = keys[0];
  const maxKey = keys[keys.length - 1];

  if (rawScore <= minKey) return table[minKey];
  if (rawScore >= maxKey) return 80;
  if (table[rawScore] !== undefined) return table[rawScore];

  // Interpolación lineal entre los dos breakpoints más cercanos
  let lower = minKey;
  let upper = maxKey;
  for (const k of keys) {
    if (k <= rawScore) lower = k;
    if (k >= rawScore) { upper = k; break; }
  }
  const ratio = (rawScore - lower) / (upper - lower);
  return Math.round(table[lower] + ratio * (table[upper] - table[lower]));
}

/**
 * Busca el T-score del Total Sensorial usando interpolación entre breakpoints.
 */
function lookupFromBreakpoints(breakpoints: StBreakpoint[], rawScore: number): number {
  if (rawScore <= breakpoints[0].raw) return breakpoints[0].t;
  const last = breakpoints[breakpoints.length - 1];
  if (rawScore >= last.raw) return 80;

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const lo = breakpoints[i];
    const hi = breakpoints[i + 1];
    if (rawScore >= lo.raw && rawScore <= hi.raw) {
      const ratio = (rawScore - lo.raw) / (hi.raw - lo.raw);
      return Math.round(lo.t + ratio * (hi.t - lo.t));
    }
  }
  return 80;
}

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Convierte un raw score de área a T-score según forma y área.
 */
export function rawToTScore(rawScore: number, area: AreaId, formType: FormType): number {
  const tables = formType === "hogar" ? HOME_AREA_TABLES : SCHOOL_AREA_TABLES;
  return lookupFromTable(tables[area], rawScore);
}

/**
 * Convierte el raw score del Total Sensorial a T-score.
 */
export function sensoryTotalToTScore(rawScore: number, formType: FormType): number {
  const breakpoints = formType === "hogar" ? HOME_ST_BREAKPOINTS : SCHOOL_ST_BREAKPOINTS;
  return lookupFromBreakpoints(breakpoints, rawScore);
}
