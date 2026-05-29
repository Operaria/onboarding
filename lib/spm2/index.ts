import type { Respuestas } from "../types";
import type { FormType, AreaScore, Spm2Result } from "./types";
import { AREAS, SENSORY_AREA_IDS } from "./areas";
import { rawToTScore, sensoryTotalToTScore } from "./t-score-tables";
import { classify } from "./classification";
import { getInterpretation } from "./interpretation";

export type { FormType, AreaId, Classification, AreaDefinition, AreaScore, TotalScore, Spm2Result } from "./types";
export { AREAS, SENSORY_AREA_IDS } from "./areas";
export { classify, classificationLabelEs } from "./classification";
export { rawToTScore, sensoryTotalToTScore } from "./t-score-tables";
export { getInterpretation } from "./interpretation";

// ─── Mapeo de respuestas Likert ──────────────────────────────────────────────

const LIKERT_MAP: Record<string, number> = {
  Nunca: 1,
  Ocasionalmente: 2,
  Frecuentemente: 3,
  Siempre: 4,
};

/**
 * Convierte el texto de respuesta Likert a valor numérico.
 * Retorna 0 si la respuesta no es reconocida (ítem omitido).
 */
function likertToNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return LIKERT_MAP[value] ?? 0;
  return 0;
}

// ─── Función principal de cálculo ────────────────────────────────────────────

/**
 * Calcula los puntajes SPM-2 a partir de las respuestas del formulario.
 *
 * @param respuestas - Objeto con las respuestas (keys del tipo `${prefix}${itemNumber}`)
 * @param formType - "hogar" o "escolar"
 * @param prefix - Prefijo de las claves de respuesta ("h" para hogar, "e" para escolar)
 * @returns Resultado completo con puntajes por área y total sensorial
 */
export function calculateSpm2Scores(
  respuestas: Respuestas,
  formType: FormType,
  prefix: string,
): Spm2Result {
  const areaScores: AreaScore[] = [];

  for (const area of AREAS) {
    // Sumar los ítems del área
    let rawScore = 0;
    let itemCount = 0;

    for (let i = area.itemStart; i <= area.itemEnd; i++) {
      const key = `${prefix}${i}`;
      let val = likertToNumber(respuestas[key]);
      if (val > 0) {
        // SPM-2: los ítems de Participación Social (71–80) están redactados en
        // positivo y se puntúan invertidos (Nunca=4 … Siempre=1), según la
        // Scoring Worksheet oficial del formulario Niño/a 5–12 (Hogar y Escolar).
        if (area.id === "SOC") val = 5 - val;
        rawScore += val;
        itemCount++;
      }
    }

    // Si faltan ítems, prorratear el raw score al total de 10 ítems
    if (itemCount > 0 && itemCount < 10) {
      rawScore = Math.round((rawScore / itemCount) * 10);
    }

    // Clamp al rango válido
    rawScore = Math.max(10, Math.min(40, rawScore));

    const tScore = rawToTScore(rawScore, area.id, formType);
    const classification = classify(tScore);
    const interpretationEs = getInterpretation(area.id, classification, tScore, rawScore);

    areaScores.push({
      area,
      rawScore,
      tScore,
      classification,
      interpretationEs,
    });
  }

  // Calcular Total Sensorial (suma de las 6 áreas sensoriales)
  const sensoryRaw = areaScores
    .filter((s) => (SENSORY_AREA_IDS as readonly string[]).includes(s.area.id))
    .reduce((sum, s) => sum + s.rawScore, 0);

  const sensoryT = sensoryTotalToTScore(sensoryRaw, formType);
  const sensoryClassification = classify(sensoryT);

  return {
    formType,
    areaScores,
    sensoryTotal: {
      rawScore: sensoryRaw,
      tScore: sensoryT,
      classification: sensoryClassification,
    },
    respondentType: formType === "hogar" ? "Padre/madre/cuidador" : "Profesor/educador",
  };
}
