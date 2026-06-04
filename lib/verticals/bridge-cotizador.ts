import type { Bloque, Respuestas } from "../types";

/**
 * Encuesta · Brechas de información para cotizador
 *
 * Destinatario: el informático original del cotizador legado de Quintero
 * Impresores SpA. Persona mayor — tratar de usted en todo el cuestionario.
 *
 * Origen del contenido:
 *   /Users/inicio/Claude/Projects/operaria/bridge-cotizador/documento/correo-informatico-cotizador.md
 *
 * Reglas:
 *  - Tono "usted", español chileno neutro.
 *  - Sin intro larga: la portada solo trae el título y una línea.
 *  - El informe final llega solo a Francisco (no a Cinthia esta vez).
 */

export const bridgeCotizadorBloques: Bloque[] = [
  // ────────────────────────────────────────────────────────────
  // Bloque 0 — Datos de quien responde (mínimo posible)
  // ────────────────────────────────────────────────────────────
  {
    id: 0,
    titulo: "Sus datos",
    subtitulo: "Solo para acompañar su respuesta.",
    preguntas: [
      { id: "info_nombre", tipo: "texto", label: "Su nombre", placeholder: "Ej: Juan Pérez" },
      { id: "info_email",  tipo: "texto", label: "Su correo", placeholder: "ejemplo@correo.cl" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // A. Modelo de clicks HP20000
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    titulo: "A. Modelo de clicks HP20000",
    subtitulo: "Es el bloque más crítico — define el costo de impresión en tiradas grandes.",
    preguntas: [
      {
        id: "A1_costo_click_unidad",
        numero: "A1",
        tipo: "radio",
        label: "El costo por click, ¿es 0,054 USD por click directo o 0,054 USD por cada 1.000 clicks?",
        hint: "La celda del Excel dice «0.054 US$ 1000» y la unidad real no nos queda clara.",
        opciones: [
          "0,054 USD por click directo",
          "0,054 USD por cada 1.000 clicks",
          "Otro (descríbalo abajo)",
        ],
      },
      {
        id: "A1_costo_click_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo aquí",
        placeholder: "Ej: la tarifa cambia según volumen contratado…",
        mostrarSi: { id: "A1_costo_click_unidad", igual: "Otro (descríbalo abajo)" },
      },
      {
        id: "A2_tabla_color",
        numero: "A2",
        tipo: "tabla",
        label: "Tabla CostoClicColor por número de colores",
        hint: "¿La función CostoClicColor() es un lookup por nº de colores? Si sí, complete los valores USD/click (o lo que corresponda).",
        columnas: [
          { key: "colores", label: "Nº de colores", tipo: "texto", width: "40%" },
          { key: "valor",   label: "Valor (USD)",  tipo: "texto", placeholder: "0,054", width: "60%" },
        ],
        filaInicial: { colores: "", valor: "" },
      },
      {
        id: "A3_tabla_blanco",
        numero: "A3",
        tipo: "tabla",
        label: "Tabla CostoClicBlanco por % de cobertura",
        hint: "USD por click (o equivalente) según la cobertura de blanco.",
        columnas: [
          { key: "cobertura", label: "% Cobertura blanco", tipo: "texto", width: "40%" },
          { key: "valor",     label: "Valor (USD)",         tipo: "texto", placeholder: "0,06", width: "60%" },
        ],
        filaInicial: { cobertura: "", valor: "" },
      },
      {
        id: "A4_factor_114",
        numero: "A4",
        tipo: "textarea",
        label: "Factor 1,14 para 3 colores: ¿se aplica solo al costo CMYK o también al setup? ¿Cuál es la razón física?",
        placeholder: "Cuéntenos en sus palabras…",
      },
      {
        id: "A5_clicks_formula",
        numero: "A5",
        tipo: "radio",
        label: "¿Cómo se cuentan los clicks?",
        hint: "Esta diferencia nos genera un factor 4× en el resultado, por eso el dato exacto es crítico.",
        opciones: [
          "frames × nº_colores (un click por color por frame)",
          "frames × CMYK total (un click por frame, independiente de colores)",
          "Otro (descríbalo abajo)",
        ],
      },
      {
        id: "A5_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo",
        placeholder: "…",
        mostrarSi: { id: "A5_clicks_formula", igual: "Otro (descríbalo abajo)" },
      },
      {
        id: "A6_minimo_clicks",
        numero: "A6",
        tipo: "radio",
        label: "¿Existe un mínimo de clicks facturable por trabajo?",
        opciones: ["Sí", "No"],
      },
      {
        id: "A6_minimo_clicks_detalle",
        tipo: "texto",
        label: "Si respondió «Sí»: ¿cuál es el mínimo y cómo se aplica?",
        placeholder: "Ej: 2.000 clicks por trabajo, aunque la tirada sea menor.",
        mostrarSi: { id: "A6_minimo_clicks", igual: "Sí" },
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // B. Geometría y paso
  // ────────────────────────────────────────────────────────────
  {
    id: 2,
    titulo: "B. Geometría y paso",
    preguntas: [
      {
        id: "B1_paso",
        numero: "B1",
        tipo: "textarea",
        label: "Flex_Paso (paso de taca): ¿cómo se calcula?",
        hint: "Aclárenos: ¿es solo el alto del producto, o alto + sellos sup/inf, o alto desplegado completo? Y para Doypack con fuelle, ¿es 2×alto + fuelle, o 2×alto + fuelle + sellos? Para Pouche y Film, ¿la fórmula cambia?",
        placeholder: "Ej: Doypack → 2×alto + fuelle + 30mm sellos…",
      },
      {
        id: "B2_ancho_producto",
        numero: "B2",
        tipo: "radio",
        label: "En Flex_Bandas = floor(ancho_bobina / ancho_producto), ¿el «ancho_producto» incluye el +30 mm de sangrado?",
        opciones: [
          "Sí, incluye los +30 mm",
          "No, es solo el ancho del producto",
          "Otro (descríbalo abajo)",
        ],
      },
      {
        id: "B2_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo",
        mostrarSi: { id: "B2_ancho_producto", igual: "Otro (descríbalo abajo)" },
      },
      {
        id: "B3_prensa_ajuste",
        numero: "B3",
        tipo: "textarea",
        label: "Flex_PrensaAjuste = PrensaAju(1): ¿devuelve 220 m fijos para HP20000, o varía por algo?",
        placeholder: "Si varía, díganos según qué (sustrato, colores, etc.).",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // C. Cambios y velocidades
  // ────────────────────────────────────────────────────────────
  {
    id: 3,
    titulo: "C. Cambios y velocidades",
    preguntas: [
      {
        id: "C1_cambios",
        numero: "C1",
        tipo: "radio",
        label: "Flex_Cambios × 10 m: los 10 m extra son por…",
        opciones: [
          "(a) cada cambio de color entre trabajos consecutivos",
          "(b) cada color total del trabajo actual",
          "(c) cada cambio de sustrato",
          "Otro (descríbalo abajo)",
        ],
      },
      {
        id: "C1_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo",
        mostrarSi: { id: "C1_cambios", igual: "Otro (descríbalo abajo)" },
      },
      {
        id: "C2_velocidad_hp",
        numero: "C2",
        tipo: "textarea",
        label: "¿Cuál es la velocidad real de la HP20000?",
        hint: "El código dice 750 (¿m/h?), el V6 trae una tabla por colores × paño (15–32 m/min). ¿Cuál manda hoy? Si tiene una tabla actualizada, pégala aquí o avísenos.",
      },
      {
        id: "C3_lam_ajuste",
        numero: "C3",
        tipo: "textarea",
        label: "Flex_LaminadoraOlimpyaAjuste: ¿cuántos metros añade por pasada de laminación?",
        hint: "Y, ¿por qué se suma dos veces para trilam (una para bi, otra para tri)?",
        placeholder: "Ej: 100 m por pasada porque…",
      },
      {
        id: "C4_velocidad_unidad",
        numero: "C4",
        tipo: "radio",
        label: "En el cálculo de horas HP20000 (ID_Proceso = 1), ¿PrensaVelocidad es m/min o m/h?",
        opciones: ["m/min", "m/h"],
      },
      {
        id: "C4_velocidad_tipo",
        tipo: "radio",
        label: "¿Y es velocidad efectiva (con paros) o teórica?",
        opciones: ["Efectiva (con paros)", "Teórica"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // D. Cierre comercial
  // ────────────────────────────────────────────────────────────
  {
    id: 4,
    titulo: "D. Cierre comercial",
    preguntas: [
      {
        id: "D1_va",
        numero: "D1",
        tipo: "radio",
        label: "En la hoja Calculo_Costo del V6 hay dos valores agregados (Valor Agregado = 0,5 y VA = 0,6). ¿Son siempre 50 % y 60 %?",
        opciones: [
          "Sí, siempre 50 % × 60 %",
          "Varía según producto, cliente o línea (descríbalo abajo)",
        ],
      },
      {
        id: "D1_detalle",
        tipo: "textarea",
        label: "Si varía, ¿según qué y cuáles son los valores típicos?",
        placeholder: "Ej: para clientes top el VA2 es 40 %…",
        mostrarSi: { id: "D1_va", igual: "Varía según producto, cliente o línea (descríbalo abajo)" },
      },
      {
        id: "D2_costo_sugerido",
        numero: "D2",
        tipo: "textarea",
        label: "«Costo/kg Sugerido = Costo × 0,5»: ¿qué significa?",
        placeholder: "¿Es un descuento, un piso, una referencia interna? ¿Para qué se usa?",
      },
      {
        id: "D3_comision_base",
        numero: "D3",
        tipo: "radio",
        label: "Comisión 5 %: ¿se calcula sobre venta neta o sobre margen?",
        opciones: ["Sobre venta neta", "Sobre margen"],
      },
      {
        id: "D3_comision_vendedor",
        tipo: "radio",
        label: "¿Se le paga al vendedor que abrió el cliente o al que cerró la cotización?",
        opciones: [
          "Al que abrió el cliente",
          "Al que cerró la cotización",
          "Otro (descríbalo abajo)",
        ],
      },
      {
        id: "D3_comision_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo",
        mostrarSi: { id: "D3_comision_vendedor", igual: "Otro (descríbalo abajo)" },
      },
      {
        id: "D4_dolar_congela",
        numero: "D4",
        tipo: "radio",
        label: "Tasa USD (Flex_Dolar): ¿se congela al emitir la cotización?",
        opciones: ["Sí, se congela", "No, se recalcula al facturar"],
      },
      {
        id: "D4_dolar_fuente",
        tipo: "texto",
        label: "¿De qué fuente se toma la tasa?",
        placeholder: "BCCh observado, dólar acuerdo, tasa interna, etc.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // E. Insumos físicos
  // ────────────────────────────────────────────────────────────
  {
    id: 5,
    titulo: "E. Insumos físicos",
    preguntas: [
      {
        id: "E1_peso_zipper",
        numero: "E1",
        tipo: "texto",
        label: "sw_PesoZipper: gramos por centímetro de ancho de bolsa",
        placeholder: "Ej: 0,42 g/cm",
        hint: "En el código aparece como constante. Si tiene un valor distinto para zipper PE-102 vs PE-104, anótelos abajo.",
      },
      {
        id: "E2_peso_valvula",
        numero: "E2",
        tipo: "texto",
        label: "sw_PesoValvula: gramos por válvula desgasificadora",
        placeholder: "Ej: 1,2 g",
      },
      {
        id: "E3_precio_zipper",
        numero: "E3",
        tipo: "radio",
        label: "Precio zipper — en la planilla aparece $42.750/kg. ¿Cómo se cobra realmente?",
        opciones: ["Por kilo ($/kg)", "Por unidad ($/u)", "Por metro lineal ($/m)", "Otro (descríbalo abajo)"],
      },
      {
        id: "E3_otro",
        tipo: "texto",
        label: "Si marcó «Otro», descríbalo",
        mostrarSi: { id: "E3_precio_zipper", igual: "Otro (descríbalo abajo)" },
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // F. Casuística
  // ────────────────────────────────────────────────────────────
  {
    id: 6,
    titulo: "F. Casuística",
    preguntas: [
      {
        id: "F1_minimo_trabajo",
        numero: "F1",
        tipo: "textarea",
        label: "¿Hay mínimo de unidades o de kilos por trabajo que se cobre aunque la tirada sea menor?",
        placeholder: "Ej: 50 kg mínimo para cualquier trabajo de Film.",
      },
      {
        id: "F2_precio_por_cliente",
        numero: "F2",
        tipo: "textarea",
        label: "¿Hay precios por cliente (descuento a clientes top, recargo a one-shot, etc.)?",
        placeholder: "Describa el esquema si existe.",
      },
      {
        id: "F3_margen_por_familia",
        numero: "F3",
        tipo: "textarea",
        label: "¿La política de margen varía por familia (Doypack vs Film vs Pouche) o por canal (retail vs industrial)?",
        placeholder: "Si varía, ¿cuáles son los rangos típicos por familia/canal?",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // G. Caso de control
  // ────────────────────────────────────────────────────────────
  {
    id: 7,
    titulo: "G. Caso de control",
    subtitulo: "La prueba ácida — si reproducimos este caso al peso, el resto se calibra solo.",
    preguntas: [
      {
        id: "G1_kg_imp",
        numero: "G1",
        tipo: "texto",
        label: "Kg de impresión (capa Bopp Natural)",
        placeholder: "kg",
        hint: "Para el caso: 67.050 unidades · Bopp Natural Trilamina · Área 0,6656 m² · paso 150 mm · ancho 265 mm.",
      },
      {
        id: "G1_kg_bi",
        tipo: "texto",
        label: "Kg de la capa bilámina",
        placeholder: "kg",
      },
      {
        id: "G1_kg_tri",
        tipo: "texto",
        label: "Kg de la capa trilámina",
        placeholder: "kg",
      },
      {
        id: "G1_kg_adhesivo",
        tipo: "texto",
        label: "Kg de adhesivo total",
        placeholder: "kg",
      },
      {
        id: "G1_costo_mp",
        tipo: "texto",
        label: "Costo materia prima total (CLP)",
        placeholder: "$",
      },
      {
        id: "G1_costo_impresion",
        tipo: "texto",
        label: "Costo impresión (clicks + tinta + máquina)",
        placeholder: "$",
      },
      {
        id: "G1_costo_procesos",
        tipo: "texto",
        label: "Costo procesos secundarios (laminado + corte/pouchera)",
        placeholder: "$",
      },
      {
        id: "G1_costo_directo",
        tipo: "texto",
        label: "Costo directo total",
        placeholder: "$",
      },
      {
        id: "G1_va1",
        tipo: "texto",
        label: "VA1 aplicado (CLP)",
        placeholder: "$",
      },
      {
        id: "G1_va2",
        tipo: "texto",
        label: "VA2 aplicado (CLP)",
        placeholder: "$",
      },
      {
        id: "G1_comision",
        tipo: "texto",
        label: "Comisión (CLP)",
        placeholder: "$",
      },
      {
        id: "G1_venta_neta",
        tipo: "texto",
        label: "Venta neta total (CLP)",
        placeholder: "$ — debería dar cerca de $5.230.305",
      },
      {
        id: "G1_observaciones",
        tipo: "textarea",
        label: "Observaciones del caso",
        placeholder: "Cualquier detalle del cálculo que valga la pena anotar.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque final — extras opcionales
  // ────────────────────────────────────────────────────────────
  {
    id: 8,
    titulo: "Para terminar",
    subtitulo: "Si tiene material adicional, nos sirve mucho.",
    preguntas: [
      {
        id: "extra_codigo",
        tipo: "textarea",
        label: "¿Tiene una versión más reciente del código fuente del cotizador?",
        placeholder: "Si sí, ¿dónde podemos descargarla o cómo nos la puede compartir?",
      },
      {
        id: "extra_tabla_procesos",
        tipo: "textarea",
        label: "¿Puede pasarnos la tabla FLEX_Procesos completa?",
        hint: "ID, Nombre, Ajuste, Velocidad, Merma, VHC, Tipo, Unidad, Moneda — los 29 procesos.",
      },
      {
        id: "extra_otro",
        tipo: "textarea",
        label: "Cualquier otra cosa que crea que debamos saber",
        placeholder: "Lo que nos quiera dejar dicho.",
      },
    ],
  },
];

/**
 * Validador antes de enviar. Aceptamos que el cuestionario sea parcial
 * (el destinatario puede no tener todas las respuestas a mano), por lo que
 * solo exigimos los datos mínimos: nombre y correo de quien responde.
 */
export function bridgeCotizadorValidarAlEnviar(respuestas: Respuestas): string | null {
  if (!respuestas.info_nombre || String(respuestas.info_nombre).trim().length < 2) {
    return "Por favor indique su nombre antes de enviar.";
  }
  if (!respuestas.info_email || !String(respuestas.info_email).includes("@")) {
    return "Por favor indique un correo válido antes de enviar.";
  }
  return null;
}
