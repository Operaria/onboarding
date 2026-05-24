import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";
import { webBloques, webValidarAlEnviar } from "./web";
import { spm2HomeBloques, spm2HomeValidarAlEnviar } from "./spm2-hogar";
import { spm2EscolarBloques, spm2EscolarValidarAlEnviar } from "./spm2-escolar";

export interface Vertical {
  id: string;
  nombreEncuesta: string;
  bloques: Bloque[];
  dolorIds?: string[];
  validarAlEnviar?: (respuestas: Respuestas) => string | null;
  /** Sub-marca debajo de "Operaria". Ej: "Flow", "Studio". Default "Flow". */
  marca?: string;
  /** Eyebrow superior. Ej: "Manos a la ópera", "¡A brillar!". */
  tagline?: string;
  /** Bajada bajo el título de la encuesta. */
  subtitulo?: string;
  /** Frase de cierre al final del cuestionario. */
  cierre?: string;
  /** Tema visual. "flow" = wordmark Syne + teal; "paraguas" = Cormorant + sage. */
  tema?: "flow" | "paraguas";
}

export const verticals: Record<string, Vertical> = {
  generico: {
    id: "generico",
    nombreEncuesta: "Encuesta de Levantamiento",
    bloques: genericoBloques,
    dolorIds: BLOQUE_DOLOR_IDS,
  },
  barber: {
    id: "barber",
    nombreEncuesta: "Levantamiento — BarberIA360°",
    bloques: barberBloques,
    validarAlEnviar: barberValidarAlEnviar,
  },
  web: {
    id: "web",
    nombreEncuesta: "",
    bloques: webBloques,
    validarAlEnviar: webValidarAlEnviar,
    marca: "Studio",
    tagline: "¡Encendamos tu página web!",
    subtitulo: "",
    cierre: "Listos para hacer brillar tu proyecto.",
    tema: "paraguas",
  },
  "spm2-hogar": {
    id: "spm2-hogar",
    nombreEncuesta: "SPM-2 Formulario del Hogar (5–12 años)",
    bloques: spm2HomeBloques,
    validarAlEnviar: spm2HomeValidarAlEnviar,
    marca: "Health",
    tagline: "Sensory Processing Measure",
    subtitulo: "Evaluación del procesamiento sensorial — Formulario completado por padre, madre o cuidador/a",
    cierre: "Gracias por completar esta evaluación. Sus respuestas serán analizadas por el/la terapeuta ocupacional.",
    tema: "paraguas",
  },
  "spm2-escolar": {
    id: "spm2-escolar",
    nombreEncuesta: "SPM-2 Formulario Escolar (5–12 años)",
    bloques: spm2EscolarBloques,
    validarAlEnviar: spm2EscolarValidarAlEnviar,
    marca: "Health",
    tagline: "Sensory Processing Measure",
    subtitulo: "Evaluación del procesamiento sensorial — Formulario completado por profesor/a o educador/a",
    cierre: "Gracias por completar esta evaluación. Sus respuestas serán analizadas por el/la terapeuta ocupacional.",
    tema: "paraguas",
  },
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
