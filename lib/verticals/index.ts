import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";
import { webBloques, webValidarAlEnviar } from "./web";
import { spm2HomeBloques, spm2HomeValidarAlEnviar } from "./spm2-hogar";
import { spm2EscolarBloques, spm2EscolarValidarAlEnviar } from "./spm2-escolar";
import { fimBloques, fimValidarAlEnviar } from "./fim";
import { cindyBloques, cindyValidarAlEnviar } from "./cindy";

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
  /** Tema visual. "flow" = Syne + teal; "paraguas" = Cormorant + sage; "health" = Plus Jakarta Sans + petrol. */
  tema?: "flow" | "paraguas" | "health";
  /** Activa el botón de audio (lectura en voz alta) en cada pregunta. */
  audio?: boolean;
  /** Etiqueta de la meta-portada para el nombre. Default "Cliente". */
  metaClienteLabel?: string;
  /** Etiqueta de la meta-portada para el negocio. Default "Negocio". */
  metaNegocioLabel?: string;
  /** Oculta el campo de negocio en la portada (encuestas no comerciales). */
  ocultarNegocio?: boolean;
  /** Eyebrow de cada bloque en tema health. Default "Área". "" = ocultar. */
  bloqueEyebrow?: string;
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
    nombreEncuesta: "SPM-2 · Formulario del Hogar",
    bloques: spm2HomeBloques,
    validarAlEnviar: spm2HomeValidarAlEnviar,
    marca: "Health",
    tagline: "Sensory Processing Measure · 5 a 12 años",
    subtitulo: "Medición del procesamiento sensorial. Lo responde el padre, la madre o quien cuida al niño o niña.",
    cierre: "Gracias por completar esta evaluación. Sus respuestas serán analizadas por el o la terapeuta ocupacional.",
    tema: "health",
    audio: true,
  },
  "spm2-escolar": {
    id: "spm2-escolar",
    nombreEncuesta: "SPM-2 · Formulario Escolar",
    bloques: spm2EscolarBloques,
    validarAlEnviar: spm2EscolarValidarAlEnviar,
    marca: "Health",
    tagline: "Sensory Processing Measure · 5 a 12 años",
    subtitulo: "Medición del procesamiento sensorial en el aula. Lo responde el profesor, la profesora o educador/a.",
    cierre: "Gracias por completar esta evaluación. Sus respuestas serán analizadas por el o la terapeuta ocupacional.",
    tema: "health",
    audio: true,
  },
  fim: {
    id: "fim",
    nombreEncuesta: "FIM · Medida de Independencia Funcional",
    bloques: fimBloques,
    validarAlEnviar: fimValidarAlEnviar,
    marca: "Health",
    tagline: "Chasis de prueba · pendiente de licencia",
    subtitulo: "La aplica el o la terapeuta observando a la persona. Cada ítem se puntúa de 1 (más apoyo) a 7 (más autonomía).",
    cierre: "Evaluación completada. Se calculan el total y los subtotales motor y cognitivo.",
    tema: "health",
  },
  cindy: {
    id: "cindy",
    nombreEncuesta: "Hagamos a Cindy a tu medida",
    bloques: cindyBloques,
    validarAlEnviar: cindyValidarAlEnviar,
    marca: "Familia",
    tagline: "Bienvenida",
    subtitulo: "Cuéntanos cómo trabajas y armamos tu asistente, hecha para ti.",
    cierre: "Gracias. Con esto armamos a Cindy a tu medida.",
    tema: "health",
    metaClienteLabel: "Para",
    ocultarNegocio: true,
    bloqueEyebrow: "",
  },
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
