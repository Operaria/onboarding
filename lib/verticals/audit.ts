import type { Bloque, Respuestas } from "../types";
import {
  AUDIT_ITEM_IDS,
  AUDIT_Q1_OPCIONES,
  AUDIT_Q2_OPCIONES,
  AUDIT_FRECUENCIA_OPCIONES,
  AUDIT_LESION_OPCIONES,
} from "../audit";

const Q1 = [...AUDIT_Q1_OPCIONES];
const Q2 = [...AUDIT_Q2_OPCIONES];
const FREC = [...AUDIT_FRECUENCIA_OPCIONES];
const LESION = [...AUDIT_LESION_OPCIONES];

// "Trago estándar" en Chile ≈ 14 g de alcohol puro. Para que el paciente tenga
// referencia concreta, lo explicamos en la intro del bloque consumo.
const TRAGO_HINT =
  "Un “trago estándar” equivale aproximadamente a una cerveza chica (350 ml), una copa de vino (150 ml) o un trago corto de destilado (45 ml).";

export const auditBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Consumo",
    subtitulo: "Sus hábitos de consumo de alcohol en el último año.",
    intro: TRAGO_HINT,
    preguntas: [
      {
        id: AUDIT_ITEM_IDS[0],
        numero: "1",
        tipo: "radio",
        label: "¿Con qué frecuencia consume alguna bebida alcohólica?",
        opciones: Q1,
      },
      {
        id: AUDIT_ITEM_IDS[1],
        numero: "2",
        tipo: "radio",
        label: "¿Cuántos tragos suele tomar en un día típico que bebe?",
        opciones: Q2,
        hint: TRAGO_HINT,
      },
      {
        id: AUDIT_ITEM_IDS[2],
        numero: "3",
        tipo: "radio",
        label: "¿Con qué frecuencia toma 6 o más tragos en una misma ocasión?",
        opciones: FREC,
      },
    ],
  },
  {
    id: 1,
    titulo: "Dependencia",
    subtitulo: "Señales de pérdida de control o dependencia.",
    preguntas: [
      {
        id: AUDIT_ITEM_IDS[3],
        numero: "4",
        tipo: "radio",
        label: "Durante el último año, ¿con qué frecuencia se dio cuenta de que no podía parar de beber una vez que había empezado?",
        opciones: FREC,
      },
      {
        id: AUDIT_ITEM_IDS[4],
        numero: "5",
        tipo: "radio",
        label: "Durante el último año, ¿con qué frecuencia no pudo hacer lo que se esperaba de usted por haber bebido?",
        opciones: FREC,
      },
      {
        id: AUDIT_ITEM_IDS[5],
        numero: "6",
        tipo: "radio",
        label: "Durante el último año, ¿con qué frecuencia necesitó beber en ayunas, en la mañana, para recuperarse después de haber bebido mucho el día anterior?",
        opciones: FREC,
      },
    ],
  },
  {
    id: 2,
    titulo: "Consecuencias",
    subtitulo: "Daño y consecuencias derivadas del consumo.",
    preguntas: [
      {
        id: AUDIT_ITEM_IDS[6],
        numero: "7",
        tipo: "radio",
        label: "Durante el último año, ¿con qué frecuencia tuvo remordimientos o sentimientos de culpa después de haber bebido?",
        opciones: FREC,
      },
      {
        id: AUDIT_ITEM_IDS[7],
        numero: "8",
        tipo: "radio",
        label: "Durante el último año, ¿con qué frecuencia no pudo recordar lo que pasó la noche anterior por haber bebido?",
        opciones: FREC,
      },
      {
        id: AUDIT_ITEM_IDS[8],
        numero: "9",
        tipo: "radio",
        label: "¿Usted o alguien resultó herido como consecuencia de su consumo de alcohol?",
        opciones: LESION,
      },
      {
        id: AUDIT_ITEM_IDS[9],
        numero: "10",
        tipo: "radio",
        label: "¿Algún familiar, amigo, médico o profesional de la salud se ha preocupado por su forma de beber o le ha sugerido que beba menos?",
        opciones: LESION,
      },
    ],
  },
];

export function auditValidarAlEnviar(respuestas: Respuestas): string | null {
  const todasOpciones: Record<string, readonly string[]> = {
    audit_q1: AUDIT_Q1_OPCIONES,
    audit_q2: AUDIT_Q2_OPCIONES,
    audit_q3: AUDIT_FRECUENCIA_OPCIONES,
    audit_q4: AUDIT_FRECUENCIA_OPCIONES,
    audit_q5: AUDIT_FRECUENCIA_OPCIONES,
    audit_q6: AUDIT_FRECUENCIA_OPCIONES,
    audit_q7: AUDIT_FRECUENCIA_OPCIONES,
    audit_q8: AUDIT_FRECUENCIA_OPCIONES,
    audit_q9: AUDIT_LESION_OPCIONES,
    audit_q10: AUDIT_LESION_OPCIONES,
  };
  for (const id of AUDIT_ITEM_IDS) {
    const v = respuestas[id];
    const opciones = todasOpciones[id];
    if (typeof v !== "string" || !opciones.includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están las 10 contestadas.";
    }
  }
  return null;
}
