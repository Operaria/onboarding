import type { Bloque, Respuestas } from "../types";
import {
  PHQ9_ITEM_IDS,
  PHQ9_FUNCIONAL_ID,
  PHQ9_OPCIONES,
  PHQ9_OPCIONES_FUNCIONAL,
} from "../phq9";

const LIKERT = [...PHQ9_OPCIONES];
const FUNCIONAL = [...PHQ9_OPCIONES_FUNCIONAL];

const items = [
  "Poco interés o placer en hacer las cosas.",
  "Sentirse desanimado/a, deprimido/a o sin esperanza.",
  "Problemas para dormir o mantenerse dormido/a, o dormir demasiado.",
  "Sentirse cansado/a o con poca energía.",
  "Poco apetito o comer en exceso.",
  "Sentirse mal con uno/a mismo/a, o sentir que es un fracaso o que se ha defraudado a sí mismo/a o a su familia.",
  "Dificultad para concentrarse en cosas, como leer el diario o ver televisión.",
  "Moverse o hablar tan lentamente que otras personas lo habrían notado. O al contrario, estar tan inquieto/a o intranquilo/a que se mueve mucho más de lo habitual.",
  "Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna forma.",
];

export const phq9Bloques: Bloque[] = [
  {
    id: 0,
    titulo: "Las últimas dos semanas",
    subtitulo: "Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
    intro: "Responda pensando en cómo se ha sentido en las últimas dos semanas, no en cómo está hoy.",
    preguntas: items.map((label, i) => ({
      id: PHQ9_ITEM_IDS[i],
      numero: String(i + 1),
      tipo: "radio" as const,
      label,
      opciones: LIKERT,
    })),
  },
  {
    id: 1,
    titulo: "Impacto en su vida",
    subtitulo: "Una última pregunta sobre lo anterior.",
    preguntas: [
      {
        id: PHQ9_FUNCIONAL_ID,
        numero: "10",
        tipo: "radio" as const,
        label:
          "Si marcó cualquier problema, ¿qué tanto le han dificultado estos problemas hacer su trabajo, ocuparse de su casa o relacionarse con otras personas?",
        opciones: FUNCIONAL,
      },
    ],
  },
];

export function phq9ValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of PHQ9_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !(PHQ9_OPCIONES as readonly string[]).includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están las 9 contestadas.";
    }
  }
  return null;
}
