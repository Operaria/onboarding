import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";
import { webBloques, webValidarAlEnviar } from "./web";
import { cindyBloques, cindyValidarAlEnviar } from "./cindy";
import { bridgeCotizadorBloques, bridgeCotizadorValidarAlEnviar } from "./bridge-cotizador";

export interface Vertical {
  id: string;
  nombreEncuesta: string;
  bloques: Bloque[];
  dolorIds?: string[];
  validarAlEnviar?: (respuestas: Respuestas) => string | null;
  marca?: string;
  tagline?: string;
  subtitulo?: string;
  cierre?: string;
  tema?: "flow" | "paraguas" | "health";
  audio?: boolean;
  metaClienteLabel?: string;
  metaNegocioLabel?: string;
  ocultarNegocio?: boolean;
  bloqueEyebrow?: string;
  paleta?: "self";
  periodo?: string;
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
    paleta: "self",
  },
  "bridge-cotizador": {
    id: "bridge-cotizador",
    nombreEncuesta: "Brechas de información para cotizador",
    bloques: bridgeCotizadorBloques,
    validarAlEnviar: bridgeCotizadorValidarAlEnviar,
    marca: "",
    tagline: "Bridge · SJP",
    subtitulo: "Si alguna pregunta no aplica, déjela en blanco. Cualquier dato, aunque sea parcial, nos sirve.",
    cierre: "Muchas gracias por su tiempo.",
    tema: "paraguas",
    metaClienteLabel: "Responde",
    ocultarNegocio: true,
    bloqueEyebrow: "Bloque",
  },
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
