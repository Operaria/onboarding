import type { Bloque, Respuestas } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// CHASIS DE PRUEBA — escala de independencia funcional (estilo FIM).
// Los ítems aquí son CATEGORÍAS GENÉRICAS de AVD/cognición (universales, estilo
// Barthel), usadas SOLO como marcador de posición para pilotear el flujo y la UX.
// El contenido oficial de la FIM (redacción de ítems y descriptores de los 7
// niveles) es material licenciado de UDSMR y se reemplaza aquí cuando Operaria
// tenga la licencia de distribución. NO reproducir el instrumento protegido.
// Estructura de referencia: 13 ítems motores + 5 cognitivos (total 18).
// ─────────────────────────────────────────────────────────────────────────────

const MIN = "1 · más apoyo";
const MAX = "7 · más autonomía";

const esc = (id: string, numero: string, label: string) =>
  ({ id, numero, tipo: "escala7" as const, label, labelMin: MIN, labelMax: MAX });

export const fimBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Dominio motor",
    subtitulo: "El o la terapeuta puntúa cada actividad de 1 a 7.",
    intro:
      "Chasis de prueba. Estas actividades son marcadores genéricos para pilotear el flujo; bajo licencia se reemplazan por los ítems y descriptores oficiales de la FIM.",
    preguntas: [
      esc("f1", "1", "Alimentación"),
      esc("f2", "2", "Aseo personal"),
      esc("f3", "3", "Baño o ducha"),
      esc("f4", "4", "Vestido — parte superior"),
      esc("f5", "5", "Vestido — parte inferior"),
      esc("f6", "6", "Uso del inodoro"),
      esc("f7", "7", "Control de vejiga"),
      esc("f8", "8", "Control intestinal"),
      esc("f9", "9", "Transferencia cama–silla"),
      esc("f10", "10", "Transferencia al inodoro"),
      esc("f11", "11", "Transferencia a ducha o tina"),
      esc("f12", "12", "Desplazamiento (marcha o silla de ruedas)"),
      esc("f13", "13", "Escaleras"),
    ],
  },
  {
    id: 1,
    titulo: "Dominio cognitivo",
    subtitulo: "El o la terapeuta puntúa cada ítem de 1 a 7.",
    preguntas: [
      esc("f14", "14", "Comprensión"),
      esc("f15", "15", "Expresión"),
      esc("f16", "16", "Interacción social"),
      esc("f17", "17", "Resolución de problemas"),
      esc("f18", "18", "Memoria"),
    ],
  },
];

/** Valida que los 18 ítems (f1–f18) tengan puntaje 1–7 antes de enviar. */
export function fimValidarAlEnviar(respuestas: Respuestas): string | null {
  const faltan: string[] = [];
  for (let i = 1; i <= 18; i++) {
    const v = respuestas[`f${i}`];
    if (typeof v !== "number" || v < 1 || v > 7) faltan.push(String(i));
  }
  if (faltan.length > 0) {
    return `Faltan ítems por puntuar: ${faltan.join(", ")}. Cada ítem va de 1 a 7.`;
  }
  return null;
}
