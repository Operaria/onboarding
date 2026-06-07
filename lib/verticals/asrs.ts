import type { Bloque, Respuestas } from "../types";
import { ASRS_ITEM_IDS, ASRS_OPCIONES } from "../asrs";

const LIKERT = [...ASRS_OPCIONES];

const partA = [
  "Tener dificultad para terminar los detalles finales de un proyecto, una vez que las partes desafiantes ya están hechas.",
  "Tener dificultad para poner las cosas en orden cuando hay que realizar una tarea que requiere organización.",
  "Tener problemas para recordar citas u obligaciones.",
  "Cuando hay una tarea que requiere mucho pensamiento, evitar o demorar el inicio.",
  "Mover o retorcer las manos o los pies cuando tiene que permanecer sentado/a durante mucho tiempo.",
  "Sentirse excesivamente activo/a y obligado/a a hacer cosas, como si lo impulsara un motor.",
];

const partB = [
  "Cometer errores por descuido cuando tiene que trabajar en un proyecto aburrido o difícil.",
  "Dificultad para mantener la atención cuando está haciendo un trabajo aburrido o repetitivo.",
  "Dificultad para concentrarse en lo que la gente le dice, incluso cuando le hablan directamente.",
  "Extraviar cosas o tener dificultad para encontrarlas en el hogar o el trabajo.",
  "Distraerse por la actividad o el ruido a su alrededor.",
  "Levantarse del asiento en reuniones u otras situaciones en las que debería permanecer sentado/a.",
  "Sentirse inquieto/a o agitado/a.",
  "Dificultad para tranquilizarse y relajarse cuando tiene tiempo libre para usted.",
  "Hablar demasiado cuando está en situaciones sociales.",
  "Cuando está en una conversación, terminar las frases de las personas con las que está hablando, antes de que ellas puedan terminar.",
  "Dificultad para esperar el turno en situaciones en que se requiere.",
  "Interrumpir a otros cuando están ocupados.",
];

function preguntasDesde(items: string[], startNumber: number) {
  return items.map((label, i) => ({
    id: ASRS_ITEM_IDS[startNumber - 1 + i],
    numero: String(startNumber + i),
    tipo: "radio" as const,
    label: `¿Con qué frecuencia le pasa esto?\n${label}`,
    opciones: LIKERT,
  }));
}

export const asrsBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Parte A · Tamizaje",
    subtitulo: "Las primeras seis preguntas son las que más diferencian el TDAH adulto del resto. Responde pensando en cómo te has sentido durante los últimos 6 meses.",
    intro: "Marca la frecuencia con la que cada situación te ocurre. No hay respuestas correctas o incorrectas.",
    preguntas: preguntasDesde(partA, 1),
  },
  {
    id: 1,
    titulo: "Parte B · Perfil",
    subtitulo: "Doce preguntas adicionales que ayudan a entender mejor el perfil de síntomas.",
    preguntas: preguntasDesde(partB, 7),
  },
];

export function asrsValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of ASRS_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !(ASRS_OPCIONES as readonly string[]).includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están los 18 ítems contestados.";
    }
  }
  return null;
}
