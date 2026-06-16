import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";
import { webBloques, webValidarAlEnviar } from "./web";
import { cindyBloques, cindyValidarAlEnviar } from "./cindy";
import { bridgeCotizadorBloques, bridgeCotizadorValidarAlEnviar } from "./bridge-cotizador";
import { cotizaSjpBloques, cotizaSjpValidarAlEnviar } from "./cotiza-sjp";
import { psiquiatraBloques, psiquiatraValidarAlEnviar } from "./psiquiatra";
import { resto360Bloques, resto360ValidarAlEnviar } from "./resto360";

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
  /** Correo destino de los envíos de esta encuesta. Si se omite, usa DESTINATION_EMAIL (global). */
  destino?: string;
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
  "cotiza-sjp": {
    id: "cotiza-sjp",
    nombreEncuesta: "Solicita tu cotización",
    bloques: cotizaSjpBloques,
    validarAlEnviar: cotizaSjpValidarAlEnviar,
    marca: "San Jorge Packaging",
    // Destino definitivo. Requiere que Up verifique el dominio operaria.cl en
    // Resend + setee FROM_EMAIL del dominio verificado (ver SOLICITUD-UP-resend.md).
    destino: "sjpcotizaciones@gmail.com",
    tagline: "Cotiza tu envase",
    subtitulo: "Cuéntanos qué necesitas y te preparamos una cotización a tu medida.",
    cierre: "Gracias. Recibimos tu solicitud y te enviaremos la cotización al correo indicado.",
    tema: "health",
    metaClienteLabel: "Cliente",
    ocultarNegocio: true,
    bloqueEyebrow: "Paso",
  },
  psiquiatra: {
    id: "psiquiatra",
    nombreEncuesta: "Súmate al piloto",
    bloques: psiquiatraBloques,
    validarAlEnviar: psiquiatraValidarAlEnviar,
    marca: "OperaHands",
    tagline: "Psiquiatras",
    subtitulo: "Estamos abriendo un piloto cerrado para probar el asistente que escribe los informes contigo. Si te interesa entrar, cuéntanos un poco de ti.",
    cierre: "Gracias. Te escribimos en los próximos días para coordinar el inicio del piloto.",
    tema: "health",
    metaClienteLabel: "Tu nombre",
    ocultarNegocio: true,
    bloqueEyebrow: "Bloque",
  },
  resto360: {
    id: "resto360",
    nombreEncuesta: "Tu restorán, tu anfitrión",
    bloques: resto360Bloques,
    validarAlEnviar: resto360ValidarAlEnviar,
    marca: "Flow",
    tagline: "Cuéntanos cómo funciona tu restorán y armamos tu anfitrión a tu medida.",
    subtitulo:
      "Diez minutos. Sin tecnicismos. Lo que nos cuentes acá es lo que tu anfitrión va a saber de tu casa.",
    cierre:
      "Listo. Con esto armamos tu anfitrión y te llega una propuesta hecha a la medida de tu restorán. Gracias por abrirnos la puerta.",
    tema: "flow",
    metaClienteLabel: "Restorán",
    ocultarNegocio: true,
    bloqueEyebrow: "Bloque",
  },
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
