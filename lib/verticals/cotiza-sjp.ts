import type { Bloque, Respuestas } from "../types";

/**
 * Formulario · Cotización San Jorge Packaging (clientes finales)
 *
 * Campos definidos por Cinthia (SJP) — verdad de terreno, 13 jun 2026.
 * "El cliente no elige los procesos." Solo entrega lo que define una cotización:
 *
 *   Doypack: ancho, alto, fuelle, n° diseños, cantidad de envases, zipper, materialidad
 *   Pouche : ancho, alto, n° diseños, cantidad de envases, zipper, materialidad
 *   Film   : largo (ancho), alto = paso de taca, n° diseños, cantidad de KILOS, materialidad
 *
 * Notas de diseño (Cinthia manda sobre supuestos previos):
 *  - La MATERIALIDAD la entrega el cliente (no se deduce del uso).
 *  - El FILM se pide en KILOS (unidad natural de la bobina).
 *  - FILM = SOLO dos medidas: largo (ancho) × alto. En film "el alto es el paso de
 *    taca" (reunión 15 jun: "el film solo es largo o ancho por alto, no hay más" /
 *    "se elimina paso de taca"). No se pide una tercera medida.
 *  - MÍNIMOS por n° de diseños (reunión 15 jun): Film → 1 diseño = 10 kg, multidiseño
 *    = 5 kg por diseño (12 diseños ⇒ 60 kg). Pouch/Doypack → 1 diseño = 1.000 u,
 *    multidiseño = 300 u por tipo. El formulario los informa y valida el de film.
 *  - No se piden colores (Cinthia pide "cantidad de diseños"); el motor asume su
 *    estándar y SJP ajusta colores al definir el arte.
 *  - Nombre + RUT: sobre todo para clientes nuevos.
 *
 * Tono: español de Chile, cercano y profesional (tú). Sin emojis.
 */

const OPCIONES_TIPO = [
  "Doypack",
  "Pouche",
  "Film",
];

export const cotizaSjpBloques: Bloque[] = [
  // ────────────────────────────────────────────────────────────
  // Bloque 0 — Tus datos (cabecera, una sola vez)
  // ────────────────────────────────────────────────────────────
  {
    id: 0,
    titulo: "Tus datos",
    subtitulo: "Para preparar y enviarte la cotización.",
    preguntas: [
      { id: "cli_razon", tipo: "texto", label: "Nombre o razón social de tu empresa", placeholder: "Ej: Alimentos Wild Foods SpA" },
      { id: "cli_rut", tipo: "texto", label: "RUT", hint: "Si eres cliente nuevo, lo necesitamos para emitir la cotización.", placeholder: "Ej: 76.123.456-7" },
      { id: "cli_contacto", tipo: "texto", label: "Tu nombre", placeholder: "Ej: Ana Soto" },
      { id: "cli_email", tipo: "texto", label: "Correo para enviarte la cotización", placeholder: "ejemplo@correo.cl" },
      { id: "cli_tel", tipo: "tel", label: "Teléfono (opcional)", placeholder: "+56 9 ..." },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 1 — Tu producto (campos según tipo, definidos por Cinthia)
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    titulo: "Tu envase",
    subtitulo: "Cuéntanos qué necesitas. Si algún dato no lo tienes a mano, déjalo en blanco y lo conversamos.",
    preguntas: [
      {
        id: "p1_tipo",
        tipo: "radio",
        label: "¿Qué tipo de envase necesitas?",
        opciones: OPCIONES_TIPO,
      },

      // — Doypack / Pouche: ancho × alto —
      {
        id: "p1_ancho",
        tipo: "number",
        label: "Ancho (mm)",
        placeholder: "Ej: 130",
        mostrarSi: { id: "p1_tipo", distintoDe: "Film" },
      },
      {
        id: "p1_alto",
        tipo: "number",
        label: "Alto (mm)",
        placeholder: "Ej: 220",
        mostrarSi: { id: "p1_tipo", distintoDe: "Film" },
      },
      {
        id: "p1_fuelle",
        tipo: "number",
        label: "Fuelle (mm)",
        hint: "El fondo que permite que la bolsa se pare.",
        placeholder: "Ej: 40",
        mostrarSi: { id: "p1_tipo", igual: "Doypack" },
      },

      // — Film: SOLO dos medidas (largo × alto, donde alto = paso de taca) —
      {
        id: "p1_film_largo",
        tipo: "number",
        label: "Largo (ancho) — mm",
        placeholder: "Ej: 208",
        mostrarSi: { id: "p1_tipo", igual: "Film" },
      },
      {
        id: "p1_film_alto",
        tipo: "number",
        label: "Paso de taca (alto) — mm",
        hint: "En el film, el alto es el paso de taca: el largo de cada repetición del diseño en la bobina. Son la misma medida.",
        placeholder: "Ej: 130",
        mostrarSi: { id: "p1_tipo", igual: "Film" },
      },

      // — Común a todos —
      {
        id: "p1_disenos",
        tipo: "number",
        label: "Cantidad de diseños",
        hint: "Cuántas artes distintas (ej: 3 sabores = 3 diseños). Define el mínimo a producir: en film, 1 diseño = 10 kg y desde 2 diseños son 5 kg por diseño; en bolsas, 1 diseño = 1.000 unidades y desde 2 son 300 por diseño.",
        placeholder: "Ej: 1",
      },

      // — Cantidad: envases (no Film) o kilos (Film) —
      {
        id: "p1_envases",
        tipo: "texto",
        label: "Cantidad de envases",
        hint: "Mínimo 1.000 unidades (o 300 por diseño si tienes más de uno). Puedes indicar más de una cantidad (separadas por coma) para comparar precio por volumen.",
        placeholder: "Ej: 5.000 y 10.000",
        mostrarSi: { id: "p1_tipo", distintoDe: "Film" },
      },
      {
        id: "p1_kilos",
        tipo: "number",
        label: "Cantidad de kilos",
        hint: "Mínimo 10 kg con un diseño; 5 kg por diseño si tienes más de uno.",
        placeholder: "Ej: 60",
        mostrarSi: { id: "p1_tipo", igual: "Film" },
      },

      // — Zipper: solo bolsas —
      {
        id: "p1_zipper",
        tipo: "boolean",
        label: "¿Lleva zipper (cierre resellable)?",
        mostrarSi: { id: "p1_tipo", distintoDe: "Film" },
      },

      // — Materialidad: la entrega el cliente —
      {
        id: "p1_material",
        tipo: "texto",
        label: "Materialidad",
        hint: "Ej: BOPP mate + PET metalizado. Si no la conoces, descríbenos tu producto y la definimos contigo.",
        placeholder: "Ej: BOPP mate 20 + PET met 12",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 2 — ¿Más de un producto?
  // ────────────────────────────────────────────────────────────
  {
    id: 2,
    titulo: "¿Necesitas cotizar más productos?",
    subtitulo: "Si es solo uno, puedes enviar directamente.",
    preguntas: [
      {
        id: "mas_productos",
        tipo: "boolean",
        label: "Quiero cotizar más de un producto",
      },
      {
        id: "productos_extra",
        tipo: "tabla",
        label: "Productos adicionales",
        hint: "Una fila por envase. En Film, usa la columna cantidad para los kilos. Deja en blanco lo que no aplique.",
        mostrarSi: { id: "mas_productos", igual: true },
        columnas: [
          { key: "tipo", label: "Tipo", tipo: "select", opciones: OPCIONES_TIPO, width: "16%" },
          { key: "ancho", label: "Ancho/Largo mm", tipo: "number", placeholder: "130", width: "13%" },
          { key: "alto", label: "Alto mm", tipo: "number", placeholder: "220", width: "11%" },
          { key: "fuelle", label: "Fuelle/Paso mm", tipo: "number", placeholder: "40", width: "12%" },
          { key: "disenos", label: "Diseños", tipo: "number", placeholder: "1", width: "9%" },
          { key: "cantidad", label: "Envases o kilos", tipo: "texto", placeholder: "5.000", width: "15%" },
          { key: "material", label: "Materialidad", tipo: "texto", placeholder: "BOPP mate + PET", width: "24%" },
        ],
        filaInicial: { tipo: "", ancho: "", alto: "", fuelle: "", disenos: "", cantidad: "", material: "" },
      },
    ],
  },
];

/**
 * Validación al enviar. Exige identidad del cliente + tipo + medidas + cantidad
 * del primer producto (según sea bolsa o film). El resto se conversa.
 */
export function cotizaSjpValidarAlEnviar(respuestas: Respuestas): string | null {
  if (!respuestas.cli_razon || String(respuestas.cli_razon).trim().length < 2) {
    return "Indícanos el nombre o la razón social de tu empresa.";
  }
  if (!respuestas.cli_email || !String(respuestas.cli_email).includes("@")) {
    return "Indícanos un correo válido para enviarte la cotización.";
  }
  if (!respuestas.p1_tipo) {
    return "Selecciona qué tipo de envase necesitas.";
  }
  const esFilm = respuestas.p1_tipo === "Film";
  if (esFilm) {
    if (!respuestas.p1_film_largo || !respuestas.p1_film_alto) {
      return "Indícanos el largo y el alto (paso de taca) del film en milímetros.";
    }
    if (!respuestas.p1_kilos) {
      return "Indícanos la cantidad de kilos.";
    }
    const disenos = Number(respuestas.p1_disenos) || 1;
    const minKg = disenos >= 2 ? 5 * disenos : 10;
    if (Number(respuestas.p1_kilos) < minKg) {
      return `El mínimo para ${disenos} diseño${disenos >= 2 ? "s" : ""} es ${minKg} kg. Ajusta la cantidad de kilos.`;
    }
  } else {
    if (!respuestas.p1_ancho || !respuestas.p1_alto) {
      return "Indícanos el ancho y el alto de tu envase en milímetros.";
    }
    if (!respuestas.p1_envases || String(respuestas.p1_envases).trim().length < 1) {
      return "Indícanos la cantidad de envases.";
    }
  }
  return null;
}
