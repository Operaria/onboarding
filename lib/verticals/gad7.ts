import type { Bloque, Respuestas } from "../types";
import {
  GAD7_ITEM_IDS,
  GAD7_FUNCIONAL_ID,
  GAD7_OPCIONES,
  GAD7_OPCIONES_FUNCIONAL,
} from "../gad7";

const LIKERT = [...GAD7_OPCIONES];
const FUNCIONAL = [...GAD7_OPCIONES_FUNCIONAL];

const items = [
  "Sentirse nervioso/a, ansioso/a o con los nervios de punta.",
  "No poder dejar de preocuparse o controlar la preocupación.",
  "Preocuparse demasiado por diversas cosas.",
  "Dificultad para relajarse.",
  "Estar tan inquieto/a que es difícil quedarse quieto/a.",
  "Irritarse o enojarse con facilidad.",
  "Sentir miedo, como si algo terrible fuera a pasar.",
];

export const gad7Bloques: Bloque[] = [
  {
    id: 0,
    titulo: "Las últimas dos semanas",
    subtitulo: "Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
    intro: "Responda pensando en cómo se ha sentido en las últimas dos semanas.",
    preguntas: items.map((label, i) => ({
      id: GAD7_ITEM_IDS[i],
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
        id: GAD7_FUNCIONAL_ID,
        numero: "8",
        tipo: "radio" as const,
        label:
          "Si marcó cualquier problema, ¿qué tanto le han dificultado hacer su trabajo, ocuparse de su casa o relacionarse con otras personas?",
        opciones: FUNCIONAL,
      },
    ],
  },
];

export function gad7ValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of GAD7_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !(GAD7_OPCIONES as readonly string[]).includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están las 7 contestadas.";
    }
  }
  return null;
}
