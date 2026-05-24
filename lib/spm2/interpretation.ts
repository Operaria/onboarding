import type { AreaId, Classification } from "./types";
import { classificationLabelEs } from "./classification";

// ─── Textos interpretativos por área y clasificación ─────────────────────────

const INTERPRETATIONS: Record<AreaId, Record<Classification, string>> = {
  VIS: {
    typical:
      "El procesamiento visual se encuentra dentro de los rangos esperados para su edad. No se observan dificultades significativas en el registro o la discriminación visual.",
    some_problems:
      "Presenta algunas dificultades en el procesamiento visual. Se observa reactividad visual moderada que puede interferir con actividades que requieren atención visual sostenida.",
    definite_dysfunction:
      "Presenta disfunción definitiva en el procesamiento visual. Se observa bajo registro visual / alta reactividad visual (hiperrespuesta). Puede mostrar dificultad para filtrar estímulos visuales irrelevantes o para mantener la atención visual en tareas estructuradas.",
  },
  HEA: {
    typical:
      "El procesamiento auditivo se encuentra dentro de los rangos esperados. No se observan dificultades significativas en la respuesta a estímulos auditivos.",
    some_problems:
      "Presenta algunas dificultades en el procesamiento auditivo. Se observa reactividad moderada auditiva. Puede mostrar respuestas inconsistentes ante estímulos sonoros del entorno.",
    definite_dysfunction:
      "Presenta disfunción definitiva en el procesamiento auditivo. Se observa hipersensibilidad / bajo registro auditivo. Puede reaccionar de forma exagerada a sonidos cotidianos o, por el contrario, no responder ante estímulos auditivos relevantes.",
  },
  TOU: {
    typical:
      "El procesamiento táctil se encuentra dentro de los rangos esperados. No se observan dificultades significativas en la respuesta al tacto.",
    some_problems:
      "Presenta algunas dificultades en el procesamiento táctil. Se observa reactividad moderada al tacto que puede manifestarse como incomodidad con ciertas texturas o contacto inesperado.",
    definite_dysfunction:
      "Presenta disfunción definitiva en el procesamiento táctil. Se observa defensividad táctil / bajo registro táctil. Puede evitar activamente el contacto físico, ciertas texturas o presentar reacciones intensas al tacto inesperado.",
  },
  TAS: {
    typical:
      "El procesamiento gustativo y olfativo se encuentra dentro de los rangos esperados. No se observan dificultades significativas en la respuesta a sabores y olores.",
    some_problems:
      "Presenta algunas dificultades en el procesamiento gustativo y olfativo. Puede mostrar selectividad alimentaria moderada o sensibilidad a ciertos olores del entorno.",
    definite_dysfunction:
      "Presenta disfunción definitiva en el procesamiento gustativo y olfativo. Se observa hipersensibilidad oral / selectividad alimentaria significativa. Puede rechazar consistentemente ciertos alimentos por textura, sabor u olor, o mostrar reacciones intensas ante olores cotidianos.",
  },
  BOD: {
    typical:
      "La conciencia corporal se encuentra dentro de los rangos esperados. No se observan dificultades significativas en la propiocepción.",
    some_problems:
      "Presenta algunas dificultades en conciencia corporal. Se observa regulación propioceptiva moderadamente afectada. Puede mostrar dificultad para graduar la fuerza o para percibir la posición del cuerpo en el espacio.",
    definite_dysfunction:
      "Presenta disfunción definitiva en conciencia corporal. Se observa patrón buscador (dificultad en discriminación de fuerza) / bajo registro propioceptivo. Puede chocar con objetos, aplicar fuerza excesiva o insuficiente, y buscar activamente input propioceptivo intenso.",
  },
  BAL: {
    typical:
      "El equilibrio y movimiento se encuentran dentro de los rangos esperados. No se observan dificultades significativas en el procesamiento vestibular.",
    some_problems:
      "Presenta algunas dificultades en equilibrio y movimiento. Se observa regulación vestibular moderadamente afectada. Puede mostrar inseguridad gravitacional leve o búsqueda moderada de movimiento.",
    definite_dysfunction:
      "Presenta disfunción definitiva en equilibrio y movimiento. Se observa problemas en discriminación/regulación vestibular (hiporreactivo). Puede presentar inseguridad gravitacional, baja tolerancia al movimiento o, por el contrario, búsqueda excesiva de estimulación vestibular.",
  },
  PLN: {
    typical:
      "La planificación e ideación se encuentran dentro de los rangos esperados. No se observan dificultades significativas en las praxias.",
    some_problems:
      "Presenta algunas dificultades en planificación e ideas. Se observa leve dificultad en la secuenciación de acciones motoras o en la generación de ideas para el juego y las actividades.",
    definite_dysfunction:
      "Presenta disfunción definitiva en planificación e ideas. Se observa dispraxia / dificultad en la ideación (desafíos en las praxias visoconstructivas, ideatoria e ideomotora). Puede tener problemas para planificar y ejecutar secuencias motoras nuevas, organizar materiales y generar ideas para resolver problemas motores.",
  },
  SOC: {
    typical:
      "La participación social se encuentra dentro de los rangos esperados. No se observan dificultades significativas en la interacción con pares.",
    some_problems:
      "Presenta algunas dificultades en la participación social. Puede mostrar limitaciones en la reciprocidad social, la interpretación de claves sociales o la regulación emocional en contextos grupales.",
    definite_dysfunction:
      "Presenta disfunción definitiva en la participación social. Se observa impacto significativo del procesamiento sensorial en la participación social. Presenta dificultades para interactuar con pares, interpretar claves sociales y regular su comportamiento en contextos sociales.",
  },
};

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Genera el texto de interpretación clínica en español para un área y clasificación.
 * Incluye el T-score y puntaje bruto como referencia cuantitativa.
 */
export function getInterpretation(
  area: AreaId,
  classification: Classification,
  tScore: number,
  rawScore: number,
): string {
  const baseText = INTERPRETATIONS[area][classification];
  const label = classificationLabelEs(classification);
  return `${baseText} (PB=${rawScore}, T=${tScore} — ${label})`;
}
