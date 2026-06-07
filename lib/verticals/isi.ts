import type { Bloque, Respuestas } from "../types";
import {
  ISI_ITEM_IDS,
  ISI_SEVERIDAD_OPCIONES,
  ISI_SATISFACCION_OPCIONES,
  ISI_INTERFERENCIA_OPCIONES,
} from "../isi";

const SEVERIDAD = [...ISI_SEVERIDAD_OPCIONES];
const SATISFACCION = [...ISI_SATISFACCION_OPCIONES];
const INTERFERENCIA = [...ISI_INTERFERENCIA_OPCIONES];

export const isiBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Tus dificultades para dormir",
    subtitulo: "Pensando en las últimas dos semanas, indica la severidad de cada problema.",
    intro: "Si no has tenido el problema, marca «Ninguno».",
    preguntas: [
      {
        id: ISI_ITEM_IDS[0],
        numero: "1",
        tipo: "radio",
        label: "Dificultad para quedarse dormido/a.",
        opciones: SEVERIDAD,
      },
      {
        id: ISI_ITEM_IDS[1],
        numero: "2",
        tipo: "radio",
        label: "Dificultad para mantener el sueño (despertarse y no poder volver a dormir).",
        opciones: SEVERIDAD,
      },
      {
        id: ISI_ITEM_IDS[2],
        numero: "3",
        tipo: "radio",
        label: "Despertar demasiado temprano y no poder volver a dormirse.",
        opciones: SEVERIDAD,
      },
    ],
  },
  {
    id: 1,
    titulo: "Cómo te sientes con tu sueño",
    subtitulo: "Cómo evalúas tu sueño actual y qué tanto te afecta.",
    preguntas: [
      {
        id: ISI_ITEM_IDS[3],
        numero: "4",
        tipo: "radio",
        label: "¿Qué tan satisfecho/a estás con tu sueño actual?",
        opciones: SATISFACCION,
      },
      {
        id: ISI_ITEM_IDS[4],
        numero: "5",
        tipo: "radio",
        label: "¿Qué tanto interfieren los problemas de sueño con tu funcionamiento diario (cansancio, ánimo, concentración, trabajo, vida personal)?",
        opciones: INTERFERENCIA,
      },
      {
        id: ISI_ITEM_IDS[5],
        numero: "6",
        tipo: "radio",
        label: "¿Qué tan notorio crees que es para los demás tu problema de sueño en términos de afectar tu calidad de vida?",
        opciones: INTERFERENCIA,
      },
      {
        id: ISI_ITEM_IDS[6],
        numero: "7",
        tipo: "radio",
        label: "¿Qué tan preocupado/a o angustiado/a estás por tu problema actual de sueño?",
        opciones: INTERFERENCIA,
      },
    ],
  },
];

export function isiValidarAlEnviar(respuestas: Respuestas): string | null {
  const opcionesPorId: Record<string, readonly string[]> = {
    isi_q1: ISI_SEVERIDAD_OPCIONES,
    isi_q2: ISI_SEVERIDAD_OPCIONES,
    isi_q3: ISI_SEVERIDAD_OPCIONES,
    isi_q4: ISI_SATISFACCION_OPCIONES,
    isi_q5: ISI_INTERFERENCIA_OPCIONES,
    isi_q6: ISI_INTERFERENCIA_OPCIONES,
    isi_q7: ISI_INTERFERENCIA_OPCIONES,
  };
  for (const id of ISI_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !opcionesPorId[id].includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están las 7 contestadas.";
    }
  }
  return null;
}
