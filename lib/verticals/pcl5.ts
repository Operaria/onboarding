import type { Bloque, Respuestas } from "../types";
import { PCL5_ITEM_IDS, PCL5_OPCIONES } from "../pcl5";

const LIKERT = [...PCL5_OPCIONES];

export const PCL5_EVENTO_ID = "pcl5_evento";

const itemsB = [
  "Recuerdos repetidos, perturbadores e involuntarios de la experiencia estresante.",
  "Sueños repetidos y perturbadores de la experiencia estresante.",
  "Sentirse o actuar de repente como si la experiencia estresante estuviera ocurriendo nuevamente (como si la estuviera reviviendo).",
  "Sentirse muy molesto/a cuando algo le recordó la experiencia estresante.",
  "Tener reacciones físicas fuertes cuando algo le recordó la experiencia estresante (por ejemplo, latido del corazón acelerado, dificultad para respirar, sudoración).",
];

const itemsC = [
  "Evitar recuerdos, pensamientos o sentimientos relacionados con la experiencia estresante.",
  "Evitar recordatorios externos de la experiencia estresante (por ejemplo, personas, lugares, conversaciones, actividades, objetos o situaciones).",
];

const itemsD = [
  "Dificultad para recordar partes importantes de la experiencia estresante.",
  "Tener creencias negativas fuertes sobre uno mismo, sobre otras personas o sobre el mundo (por ejemplo, “soy malo/a”, “hay algo muy malo en mí”, “no se puede confiar en nadie”, “el mundo es muy peligroso”).",
  "Culparse a sí mismo/a o culpar a alguien más por la experiencia estresante o por lo que sucedió después.",
  "Tener sentimientos negativos fuertes como miedo, horror, rabia, culpa o vergüenza.",
  "Pérdida del interés por actividades que antes disfrutaba.",
  "Sentirse distante o alejado/a de otras personas.",
  "Dificultad para experimentar sentimientos positivos (por ejemplo, ser incapaz de sentir alegría o tener sentimientos cariñosos hacia personas cercanas).",
];

const itemsE = [
  "Comportarse de manera irritable, con explosiones de rabia o actuar agresivamente.",
  "Tomar demasiados riesgos o hacer cosas que podrían causarle daño.",
  "Estar “super alerta”, vigilante o en guardia.",
  "Sentirse sobresaltado/a fácilmente.",
  "Tener dificultad para concentrarse.",
  "Tener dificultad para conciliar el sueño o permanecer dormido/a.",
];

function preguntasDesde(items: string[], startNumber: number) {
  return items.map((label, i) => ({
    id: PCL5_ITEM_IDS[startNumber - 1 + i],
    numero: String(startNumber + i),
    tipo: "radio" as const,
    label,
    opciones: LIKERT,
  }));
}

export const pcl5Bloques: Bloque[] = [
  {
    id: 0,
    titulo: "La experiencia estresante",
    subtitulo: "Antes de responder, identifica en tu mente la experiencia estresante o traumática a la que te refieres. Las preguntas siguientes apuntan a tu reacción durante el último mes.",
    intro: "Si quieres, escríbela brevemente para que el tratante tenga contexto. No es obligatorio.",
    preguntas: [
      {
        id: PCL5_EVENTO_ID,
        numero: "0",
        tipo: "textarea",
        label: "Describe en pocas líneas la experiencia que estás considerando al responder.",
        placeholder: "Opcional. Lo que escribas aquí solo lo verá tu tratante.",
        hint: "Si prefieres no describirla, déjala en blanco.",
      },
    ],
  },
  {
    id: 1,
    titulo: "Reexperimentación",
    subtitulo: "En el último mes, ¿cuánto te ha afectado cada uno de estos problemas?",
    preguntas: preguntasDesde(itemsB, 1),
  },
  {
    id: 2,
    titulo: "Evitación",
    subtitulo: "Continúa pensando en el último mes.",
    preguntas: preguntasDesde(itemsC, 6),
  },
  {
    id: 3,
    titulo: "Cogniciones y ánimo",
    subtitulo: "Pensamientos, sentimientos y conexión con los demás durante el último mes.",
    preguntas: preguntasDesde(itemsD, 8),
  },
  {
    id: 4,
    titulo: "Alerta y reactividad",
    subtitulo: "Conducta, reacciones físicas y sueño durante el último mes.",
    preguntas: preguntasDesde(itemsE, 15),
  },
];

export function pcl5ValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of PCL5_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !(PCL5_OPCIONES as readonly string[]).includes(v)) {
      return "Faltan preguntas por responder. El tamizaje solo es válido si están los 20 ítems contestados.";
    }
  }
  return null;
}
