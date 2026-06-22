import type { Bloque, Pregunta, MostrarSi, Respuestas } from "../types";

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
 *  - COLORES (reunión 16 jun): no se piden. La impresión es digital, siempre 4 colores
 *    (CMYK) + blanco. El cliente no elige tintas; el motor asume el estándar.
 *  - MULTIPRODUCTO (reunión 16 jun): el cliente puede cotizar varios envases en una
 *    misma solicitud (tipo carrito). Cada producto adicional reabre el MISMO formulario
 *    completo (medidas, estructura, capas, accesorios), no una tabla reducida —
 *    así un producto extra queda tan especificado como el primero. Todo sube junto.
 *  - Nombre + RUT: sobre todo para clientes nuevos.
 *
 * Tono: español de Chile, cercano y profesional (tú). Sin emojis.
 */

const OPCIONES_TIPO = [
  "Doypack",
  "Pouche",
  "Film",
];

// ── Catálogos espejo del cotizador (cotizador-sjp.vercel.app) ──
// Mismos sustratos, estructuras y accesorios que usa Cinthia para cotizar,
// para que el dato del cliente entre estructurado y sin vacíos.

// 29 sustratos en el mismo orden del cotizador (SUSTRATOS de index.html).
const OPCIONES_MATERIAL = [
  "Bopp Matte 17", "Bopp Metaliz. 15", "Bopp Metaliz. 17", "Bopp Metaliz. 20",
  "Bopp Perlesc. 20", "Pet Metaliz. 12", "Pet Matte 12", "Pet Brill. 12",
  "Pe Transp. 30", "Pe Transp. 40", "Pe Bco 40", "Pe Transp. 60", "Pe Bco 60",
  "Pe Transp. 80", "Pe Bco 80", "Pe Transp. 100", "Pe Bco 100", "Pe Bco 160",
  "Bopp Brill. 20", "Bopp Matte 20", "Bopp Perlesc. 25", "Bopp Cpp SL 30",
  "Bopp Metaliz. 25", "Bopp Cpp SL 40", "Bopp Cpp SL 80", "NK Transp. 23",
  "NK Metaliz. 23", "Biopbs Transp. 51", "Pe Bco 140",
];

// Estructura define cuántas capas de material lleva la bolsa.
const OPCIONES_ESTRUCTURA = ["Monolámina", "Bilámina", "Trilámina"];

// Procesos / accesorios (checkboxes del cotizador). El zipper vive acá.
// "Perforación sombrero" agregada en reunión 16 jun (junto a la circular).
const OPCIONES_ACCESORIOS = [
  "Perforación circular",
  "Perforación sombrero",
  "Válvula desgasificadora",
  "Válvula corner",
  "Válvula frontal",
  "Zipper / cierre resellable",
];

// Cuántos productos puede cotizar el cliente en una misma solicitud.
// Si necesita más, lo conversa con SJP (caso poco común).
const MAX_PRODUCTOS = 5;

/**
 * Combina el "candado" del producto n (visible solo si se pidió agregar el
 * producto anterior) con las condiciones propias de la pregunta. El producto 1
 * no tiene candado: siempre se muestra.
 */
function gate(n: number, extra?: MostrarSi | MostrarSi[]): MostrarSi | MostrarSi[] | undefined {
  const base: MostrarSi[] = n > 1 ? [{ id: `add_${n - 1}`, igual: true }] : [];
  const ex = extra ? (Array.isArray(extra) ? extra : [extra]) : [];
  const all = [...base, ...ex];
  if (all.length === 0) return undefined;
  if (all.length === 1) return all[0];
  return all;
}

/**
 * Todos los campos de UN envase, con ids prefijados `prodN_` para que cada
 * producto guarde su propia respuesta. Es el mismo formulario del producto 1,
 * repetido — la pieza que pidió Cinthia para el "carrito".
 */
function camposProducto(n: number): Pregunta[] {
  const P = `prod${n}_`;
  const et = n === 1 ? "" : `Producto ${n} — `;
  return [
    {
      id: `${P}producto`,
      tipo: "texto",
      label: `${et}¿Qué vas a envasar?`,
      hint: "El producto que irá dentro del envase. Nos ayuda a recomendar la materialidad correcta.",
      placeholder: "Ej: chupetes, snacks, café molido",
      mostrarSi: gate(n),
    },
    {
      id: `${P}tipo`,
      tipo: "radio",
      label: `${et}¿Qué tipo de envase necesitas?`,
      opciones: OPCIONES_TIPO,
      mostrarSi: gate(n),
    },

    // — Doypack / Pouche: ancho × alto —
    {
      id: `${P}ancho`,
      tipo: "number",
      label: "Ancho (mm)",
      placeholder: "Ej: 130",
      mostrarSi: gate(n, { id: `${P}tipo`, distintoDe: "Film" }),
    },
    {
      id: `${P}alto`,
      tipo: "number",
      label: "Alto (mm)",
      placeholder: "Ej: 220",
      mostrarSi: gate(n, { id: `${P}tipo`, distintoDe: "Film" }),
    },
    {
      id: `${P}fuelle`,
      tipo: "number",
      label: "Fuelle (mm)",
      hint: "El fondo que permite que la bolsa se pare.",
      placeholder: "Ej: 40",
      mostrarSi: gate(n, { id: `${P}tipo`, igual: "Doypack" }),
    },

    // — Film: SOLO dos medidas (largo × alto, donde alto = paso de taca) —
    {
      id: `${P}film_largo`,
      tipo: "number",
      label: "Largo (ancho) — mm",
      placeholder: "Ej: 208",
      mostrarSi: gate(n, { id: `${P}tipo`, igual: "Film" }),
    },
    {
      id: `${P}film_alto`,
      tipo: "number",
      label: "Paso de taca (alto) — mm",
      hint: "En el film, el alto es el paso de taca: el largo de cada repetición del diseño en la bobina. Son la misma medida.",
      placeholder: "Ej: 130",
      mostrarSi: gate(n, { id: `${P}tipo`, igual: "Film" }),
    },

    // — Común a todos —
    {
      id: `${P}disenos`,
      tipo: "number",
      label: "Cantidad de diseños",
      hint: "Cuántas artes distintas (ej: 3 sabores = 3 diseños). Define el mínimo a producir: en film, 1 diseño = 10 kg y desde 2 diseños son 5 kg por diseño; en bolsas, 1 diseño = 1.000 unidades y desde 2 son 300 por diseño.",
      placeholder: "Ej: 1",
      mostrarSi: gate(n),
    },

    // — Cantidad: envases (no Film) o kilos (Film) —
    {
      id: `${P}envases`,
      tipo: "texto",
      label: "Cantidad de envases",
      hint: "Mínimo 1.000 unidades (o 300 por diseño si tienes más de uno). Puedes indicar más de una cantidad (separadas por coma) para comparar precio por volumen.",
      placeholder: "Ej: 5.000 y 10.000",
      mostrarSi: gate(n, { id: `${P}tipo`, distintoDe: "Film" }),
    },
    // Film: el cliente elige indicar la cantidad en kilos (natural de la bobina)
    // o en unidades (envases). El motor convierte con el peso por unidad y la
    // cotización informa los dos + precio/kilo y precio/unitario.
    {
      id: `${P}film_modo_cant`,
      tipo: "radio",
      label: "¿Cómo prefieres indicar la cantidad?",
      hint: "En film cobramos por kilo, pero si te acomoda pensar en envases puedes indicar unidades y te mostramos ambos.",
      opciones: ["Kilos", "Unidades"],
      mostrarSi: gate(n, { id: `${P}tipo`, igual: "Film" }),
    },
    {
      id: `${P}kilos`,
      tipo: "number",
      label: "Cantidad de kilos",
      hint: "Mínimo 10 kg con un diseño; 5 kg por diseño si tienes más de uno.",
      placeholder: "Ej: 60",
      mostrarSi: gate(n, [
        { id: `${P}tipo`, igual: "Film" },
        { id: `${P}film_modo_cant`, igual: "Kilos" },
      ]),
    },
    {
      id: `${P}film_unidades`,
      tipo: "number",
      label: "Cantidad de unidades (envases)",
      hint: "Las convertimos a kilos con el peso de cada envase para cotizar.",
      placeholder: "Ej: 12.000",
      mostrarSi: gate(n, [
        { id: `${P}tipo`, igual: "Film" },
        { id: `${P}film_modo_cant`, igual: "Unidades" },
      ]),
    },

    // ── Materialidad estructurada (espejo del cotizador) · solo bolsas ──
    // La estructura define cuántas capas se piden: Mono = solo impresión;
    // Bi = impresión + sellado; Tri = impresión + intermedio + sellado.
    {
      id: `${P}estructura`,
      tipo: "radio",
      label: "Estructura del material",
      hint: "Cuántas capas lleva la lámina. Si no la conoces, déjala en Bilámina o descríbenos tu producto y la definimos contigo. La impresión es digital: siempre 4 colores (CMYK) más blanco, no necesitas elegir tintas.",
      opciones: OPCIONES_ESTRUCTURA,
      mostrarSi: gate(n),
    },
    {
      id: `${P}mat_imp`,
      tipo: "select",
      label: "Material de impresión (capa 1)",
      opciones: OPCIONES_MATERIAL,
      mostrarSi: gate(n),
    },
    {
      id: `${P}mat_med`,
      tipo: "select",
      label: "Material intermedio (capa 2)",
      opciones: OPCIONES_MATERIAL,
      mostrarSi: gate(n, { id: `${P}estructura`, igual: "Trilámina" }),
    },
    {
      id: `${P}mat_sello`,
      tipo: "select",
      label: "Material de sellado (última capa)",
      opciones: OPCIONES_MATERIAL,
      mostrarSi: gate(n, { id: `${P}estructura`, distintoDe: "Monolámina" }),
    },

    // — Procesos / accesorios (checkboxes del cotizador) · solo bolsas —
    {
      id: `${P}accesorios`,
      tipo: "checkboxes",
      label: "Procesos / accesorios",
      hint: "Marca los que apliquen. El zipper (cierre resellable) va acá.",
      opciones: OPCIONES_ACCESORIOS,
      mostrarSi: gate(n, { id: `${P}tipo`, distintoDe: "Film" }),
    },

  ];
}

/**
 * Interruptor "agregar otro producto". Aparece al final de cada producto activo
 * y, al marcarlo, abre el formulario completo del siguiente. El del producto 1
 * siempre está visible; los siguientes solo si el anterior se activó.
 */
function preguntaAgregar(n: number): Pregunta {
  return {
    id: `add_${n}`,
    tipo: "boolean",
    label:
      n === 1
        ? "¿Quieres cotizar otro producto?"
        : "¿Quieres agregar otro producto más?",
    hint: "Se incluye en la misma solicitud. Puede tener otra medida, materialidad o tipo de envase.",
    mostrarSi: n === 1 ? undefined : { id: `add_${n - 1}`, igual: true },
  };
}

// Producto 1 + interruptor + producto 2 + interruptor + ... (hasta MAX_PRODUCTOS).
const preguntasEnvase: Pregunta[] = [];
for (let n = 1; n <= MAX_PRODUCTOS; n++) {
  preguntasEnvase.push(...camposProducto(n));
  if (n < MAX_PRODUCTOS) preguntasEnvase.push(preguntaAgregar(n));
}

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
  // Bloque 1 — Tu envase (uno o varios productos, mismo formulario)
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    titulo: "Tu envase",
    subtitulo: "Cuéntanos qué necesitas. Si algún dato no lo tienes a mano, déjalo en blanco y lo conversamos. Si necesitas cotizar más de un envase, al final puedes agregar otro.",
    preguntas: preguntasEnvase,
  },
];

/**
 * Valida UN producto activo. Exige tipo + medidas + cantidad (y, en bolsas,
 * estructura + material de impresión). El prefijo del mensaje ubica al cliente
 * cuando hay más de un producto.
 */
function validarProducto(r: Respuestas, n: number): string | null {
  const P = `prod${n}_`;
  const et = n === 1 ? "" : `Producto ${n}: `;
  const tipo = r[`${P}tipo`];
  if (!tipo) {
    return `${et}selecciona qué tipo de envase necesitas.`;
  }
  if (tipo === "Film") {
    if (!r[`${P}film_largo`] || !r[`${P}film_alto`]) {
      return `${et}indícanos el largo y el alto (paso de taca) del film en milímetros.`;
    }
    const modoCant = r[`${P}film_modo_cant`] || "Kilos";
    if (modoCant === "Unidades") {
      if (!r[`${P}film_unidades`]) {
        return `${et}indícanos la cantidad de unidades (envases).`;
      }
    } else {
      if (!r[`${P}kilos`]) {
        return `${et}indícanos la cantidad de kilos.`;
      }
      const disenos = Number(r[`${P}disenos`]) || 1;
      const minKg = disenos >= 2 ? 5 * disenos : 10;
      if (Number(r[`${P}kilos`]) < minKg) {
        return `${et}el mínimo para ${disenos} diseño${disenos >= 2 ? "s" : ""} es ${minKg} kg. Ajusta la cantidad de kilos.`;
      }
    }
  } else {
    if (!r[`${P}ancho`] || !r[`${P}alto`]) {
      return `${et}indícanos el ancho y el alto del envase en milímetros.`;
    }
    if (!r[`${P}envases`] || String(r[`${P}envases`]).trim().length < 1) {
      return `${et}indícanos la cantidad de envases.`;
    }
    if (!r[`${P}estructura`]) {
      return `${et}selecciona la estructura del material (Monolámina, Bilámina o Trilámina).`;
    }
    if (!r[`${P}mat_imp`]) {
      return `${et}selecciona el material de impresión.`;
    }
  }
  return null;
}

/**
 * Validación al enviar. Exige identidad del cliente y, por cada producto activo
 * (encadenado por los interruptores "agregar otro"), sus datos mínimos.
 */
export function cotizaSjpValidarAlEnviar(respuestas: Respuestas): string | null {
  if (!respuestas.cli_razon || String(respuestas.cli_razon).trim().length < 2) {
    return "Indícanos el nombre o la razón social de tu empresa.";
  }
  if (!respuestas.cli_email || !String(respuestas.cli_email).includes("@")) {
    return "Indícanos un correo válido para enviarte la cotización.";
  }
  for (let n = 1; n <= MAX_PRODUCTOS; n++) {
    const activo = n === 1 || respuestas[`add_${n - 1}`] === true;
    if (!activo) break; // los productos se activan en cadena; al primer inactivo, paramos.
    const msg = validarProducto(respuestas, n);
    if (msg) return msg;
  }
  return null;
}
