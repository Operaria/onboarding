import type { Bloque, Respuestas, CardOption } from "../types";

/**
 * Encuesta de onboarding · Restó 360
 *
 * Instrumento de levantamiento que viaja con el dossier. El prospecto la
 * responde desde su teléfono; al enviarla genera un PDF que llega al vendedor.
 * Ese PDF es el insumo doble:
 *   1. Configuración del agente (voz, carta, horarios, roles, pagos).
 *   2. Propuesta de cierre personalizada (impacto proyectado a partir del
 *      dolor declarado).
 *
 * Línea Flow (pyme · navy + teal + Syne). Instrumento nuevo, no plantilla
 * reciclada. Español de Chile, tono cercano y directo, sin tecnicismos.
 * Diseñada por Vera.
 */

// ────────────────────────────────────────────────────────────
// Tarjetas (cards): el campo "setup" se usa como subtítulo y "mrr"
// como segunda línea de apoyo. El componente Cards los muestra como
// líneas mono de acento bajo el título — aquí los usamos como caption
// descriptivo, no como precio (no son tiers comerciales con valor).
// ────────────────────────────────────────────────────────────

const cardsTomaPedido: CardOption[] = [
  {
    value: "Mesero con libreta",
    titulo: "Mesero con libreta",
    setup: "Papel y lápiz, a la antigua",
    mrr: "",
  },
  {
    value: "Menú QR (PDF)",
    titulo: "Menú QR (PDF)",
    setup: "Escanean y miran la carta",
    mrr: "",
  },
  {
    value: "App o tablet",
    titulo: "App o tablet",
    setup: "Comanda digital en sala",
    mrr: "",
  },
  {
    value: "Mixto",
    titulo: "Mixto",
    setup: "Un poco de cada uno",
    mrr: "",
  },
];

const cardsTono: CardOption[] = [
  {
    value: "Cálido y cercano",
    titulo: "Cálido y cercano",
    setup: "Como recibir a un amigo",
    mrr: "",
  },
  {
    value: "Sobrio y elegante",
    titulo: "Sobrio y elegante",
    setup: "Cuidado y con oficio",
    mrr: "",
  },
  {
    value: "Relajado y juguetón",
    titulo: "Relajado y juguetón",
    setup: "Suelto, con buen humor",
    mrr: "",
  },
];

const cardsEntrada: CardOption[] = [
  {
    value: "Carta Viva",
    titulo: "Carta Viva",
    badge: "El primer encendido",
    setup: "Tu carta que conversa",
    mrr: "Recomienda, explica y atiende dudas",
    descripcion:
      "Tu anfitrión muestra la carta, recomienda platos y responde preguntas de tus clientes.",
  },
  {
    value: "Servicio Completo",
    titulo: "Servicio Completo",
    badge: "+ RESERVAS + CIERRE",
    setup: "Suma operación",
    mrr: "Reservas, cuenta y cierre nocturno",
    descripcion:
      "Todo lo de Carta Viva, más reservas, apoyo con la cuenta y el cierre de caja cada noche.",
  },
  {
    value: "Restó 360",
    titulo: "Restó 360",
    badge: "EL RESTORÁN COMPLETO",
    setup: "Informativo, no compromete",
    mrr: "La operación entera de tu casa",
    descripcion:
      "El paquete completo. Lo dejamos acá para que lo conozcas. Marcarlo no te compromete a nada.",
    destacado: true,
  },
];

export const resto360Bloques: Bloque[] = [
  // ────────────────────────────────────────────────────────────
  // Bloque 1 · Tu restorán
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    titulo: "Tu restorán",
    subtitulo: "Lo básico de tu casa, para que tu anfitrión sepa a quién representa.",
    preguntas: [
      {
        id: "nombre",
        tipo: "texto",
        label: "¿Cómo se llama tu restorán?",
        placeholder: "Ej: Sumaq",
      },
      {
        id: "cocina",
        tipo: "texto",
        label: "¿Qué tipo de cocina hacen?",
        placeholder: "Ej: peruana, de mar, de barrio…",
      },
      {
        id: "comuna",
        tipo: "texto",
        label: "¿En qué comuna están?",
        placeholder: "Ej: Providencia",
      },
      {
        id: "antiguedad",
        tipo: "radio",
        label: "¿Cuánto llevan funcionando?",
        opciones: ["Menos de 1 año", "1 a 3 años", "3 a 10 años", "Más de 10 años"],
      },
      {
        id: "mesas",
        tipo: "slider",
        label: "¿Cuántas mesas tienen?",
        min: 2,
        max: 60,
        labelMin: "2 mesas",
        labelMax: "60+ mesas",
      },
      {
        id: "ticket",
        tipo: "radio",
        label: "Ticket promedio por persona",
        opciones: [
          "Bajo $10.000",
          "$10.000 a $20.000",
          "$20.000 a $35.000",
          "Sobre $35.000",
        ],
      },
      {
        id: "redes",
        tipo: "texto",
        label: "Instagram o web, si tienen",
        hint: "Opcional. Nos sirve para conocer tu estilo.",
        placeholder: "Ej: @sumaq.cl",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 2 · Cómo atienden hoy
  // ────────────────────────────────────────────────────────────
  {
    id: 2,
    titulo: "Cómo atienden hoy",
    subtitulo: "Cómo se mueve tu restorán en un día normal.",
    preguntas: [
      {
        id: "toma_pedido",
        tipo: "cards",
        label: "¿Cómo toman el pedido hoy?",
        cards: cardsTomaPedido,
      },
      {
        id: "reservas",
        tipo: "radio",
        label: "¿Reciben reservas? ¿Cómo?",
        opciones: ["No reciben", "Por teléfono", "Por WhatsApp o DM", "Plataforma de reservas"],
      },
      {
        id: "horario_almuerzo_desde",
        tipo: "time",
        label: "Horario de almuerzo · desde",
        hint: "Opcional. Déjalo en blanco si no aplica.",
      },
      {
        id: "horario_almuerzo_hasta",
        tipo: "time",
        label: "Horario de almuerzo · hasta",
        hint: "Opcional.",
      },
      {
        id: "horario_cena_desde",
        tipo: "time",
        label: "Horario de cena · desde",
        hint: "Opcional. Déjalo en blanco si no aplica.",
      },
      {
        id: "horario_cena_hasta",
        tipo: "time",
        label: "Horario de cena · hasta",
        hint: "Opcional.",
      },
      {
        id: "sala",
        tipo: "slider",
        label: "¿Cuántas personas atienden en sala en un turno?",
        min: 1,
        max: 20,
        labelMin: "1 persona",
        labelMax: "20+ personas",
      },
      {
        id: "demora_cuenta",
        tipo: "radio",
        label: "Cuando piden la cuenta, ¿cuánto suele tardar en llegar?",
        opciones: ["Menos de 5 min", "5 a 15 min", "Más de 15 min", "Depende"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 3 · Tu carta
  // ────────────────────────────────────────────────────────────
  {
    id: 3,
    titulo: "Tu carta",
    subtitulo: "Lo que tu anfitrión va a recomendar y explicar.",
    preguntas: [
      {
        id: "n_platos",
        tipo: "radio",
        label: "¿Cuántos platos tiene tu carta?",
        opciones: ["Menos de 15", "15 a 30", "30 a 50", "Más de 50"],
      },
      {
        id: "carta_digital",
        tipo: "boolean",
        label: "¿La tienes en digital (PDF, web)?",
        placeholder: "Sí, la tengo en digital",
      },
      {
        id: "cambia_carta",
        tipo: "radio",
        label: "¿Cada cuánto cambias la carta o los precios?",
        opciones: ["Casi nunca", "Algunas veces al año", "Cada mes", "Cada semana"],
      },
      {
        id: "restricciones",
        tipo: "checkboxes",
        label: "¿Qué opciones manejas para restricciones?",
        opciones: [
          "Vegetariano",
          "Vegano",
          "Sin gluten",
          "Sin lactosa",
          "Sin mariscos",
          "Opciones para niños",
          "Ninguna por ahora",
        ],
      },
      {
        id: "historia_platos",
        tipo: "boolean",
        label: "¿Te gustaría que tu anfitrión cuente la historia de los platos (de dónde vienen)?",
        placeholder: "Sí, me gustaría",
      },
      {
        id: "carta_actual",
        tipo: "textarea",
        label: "Pega tu carta acá o déjanos un link",
        hint: "Si prefieres, la subes después por WhatsApp.",
        placeholder: "Pega los platos y precios, o deja el link a tu carta…",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 4 · Lo que te quita tiempo
  // ────────────────────────────────────────────────────────────
  {
    id: 4,
    titulo: "Lo que te quita tiempo",
    subtitulo: "Acá está el corazón: lo que te gustaría dejar de hacer a mano.",
    preguntas: [
      {
        id: "consume_tiempo",
        tipo: "checkboxes",
        label: "¿Qué te consume más tiempo hoy?",
        opciones: [
          "Responder mensajes",
          "Tomar pedidos",
          "Explicar la carta",
          "Cobrar o la cuenta",
          "Cuadrar la caja",
          "Coordinar reservas",
        ],
      },
      {
        id: "friccion_cliente",
        tipo: "textarea",
        label: "¿Qué es lo que más se les complica a tus clientes?",
        placeholder: "Cuéntanos con tus palabras…",
      },
      {
        id: "cierre_hoy",
        tipo: "radio",
        label: "El cierre de caja, ¿cómo lo haces hoy?",
        opciones: ["A mano / cuaderno", "Excel", "Sistema POS", "No alcanzo a hacerlo bien"],
      },
      {
        id: "cierre_tiempo",
        tipo: "radio",
        label: "¿Cuánto te toma cerrar la caja cada noche?",
        opciones: ["Menos de 15 min", "15 a 30 min", "30 a 60 min", "Más de una hora"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 5 · Pagos y herramientas
  // ────────────────────────────────────────────────────────────
  {
    id: 5,
    titulo: "Pagos y herramientas",
    subtitulo: "Con qué cobras hoy, para que tu anfitrión converse con lo que ya tienes.",
    preguntas: [
      {
        id: "pasarela",
        tipo: "checkboxes",
        label: "¿Con qué cobras hoy?",
        opciones: [
          "Transbank",
          "Mercado Pago",
          "Getnet",
          "Flow",
          "Khipu",
          "Transferencia",
          "Efectivo",
          "Otro",
        ],
      },
      {
        id: "whatsapp_business",
        tipo: "radio",
        label: "¿Tienes WhatsApp Business?",
        opciones: [
          "Sí, verificado",
          "Sí, la app normal",
          "No, uso WhatsApp personal",
          "No sé",
        ],
      },
      {
        id: "boleta_sii",
        tipo: "boolean",
        label: "¿Emites boleta electrónica (SII)?",
        placeholder: "Sí, emito boleta electrónica",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 6 · La voz de tu casa
  // ────────────────────────────────────────────────────────────
  {
    id: 6,
    titulo: "La voz de tu casa",
    subtitulo: "Cómo quieres que suene tu anfitrión cuando atiende a tus clientes.",
    preguntas: [
      {
        id: "tono",
        tipo: "cards",
        label: "¿Cómo quieres que hable tu anfitrión?",
        cards: cardsTono,
      },
      {
        id: "tuteo",
        tipo: "radio",
        label: "¿De tú o de usted?",
        opciones: ["De tú", "De usted", "Como venga el cliente"],
      },
      {
        id: "palabras_si",
        tipo: "texto",
        label: "¿Alguna palabra o expresión que sí usan en tu casa?",
        hint: "Opcional.",
        placeholder: "Ej: «pa' la mesa», «de la casa»…",
      },
      {
        id: "palabras_no",
        tipo: "texto",
        label: "¿Alguna que prefieras evitar?",
        hint: "Opcional.",
        placeholder: "Ej: nada de «cariño», «mi amor»…",
      },
      {
        id: "nombre_anfitrion",
        tipo: "texto",
        label: "¿Quieres ponerle nombre a tu anfitrión?",
        hint: "Opcional. Si no, lo dejamos como la voz de la casa.",
        placeholder: "Ej: Rosa, Tomás…",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 7 · Tu equipo
  // ────────────────────────────────────────────────────────────
  {
    id: 7,
    titulo: "Tu equipo",
    subtitulo: "Quién manda y quién recibe qué. Con esto armamos los roles.",
    preguntas: [
      {
        id: "admin_carta",
        tipo: "texto",
        label: "¿Quién va a manejar la carta por WhatsApp? (nombre y rol)",
        placeholder: "Ej: Carla, jefa de sala",
      },
      {
        id: "fono_dueno",
        tipo: "tel",
        label: "Número del dueño/a (el que manda)",
        placeholder: "+56 9 ...",
      },
      {
        id: "fonos_staff",
        tipo: "textarea",
        label: "Números del equipo que atiende",
        hint: "Opcional. Uno por línea.",
        placeholder: "+56 9 ...\n+56 9 ...",
      },
      {
        id: "recibe_cierre",
        tipo: "texto",
        label: "¿Quién recibe el cierre cada noche?",
        placeholder: "Ej: el dueño, la administradora…",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Bloque 8 · Por dónde partir
  // ────────────────────────────────────────────────────────────
  {
    id: 8,
    titulo: "Por dónde partir",
    subtitulo: "No te compromete a nada. Solo nos ayuda a armarte la propuesta.",
    preguntas: [
      {
        id: "entrada",
        tipo: "cards",
        label: "¿Cuál entrada te hace más sentido para empezar?",
        cards: cardsEntrada,
        helper: "Puedes partir con una entrada y subir cuando quieras.",
      },
      {
        id: "comentario",
        tipo: "textarea",
        label: "¿Algo más que quieras contarnos de tu restorán?",
        hint: "Opcional.",
        placeholder: "Lo que quieras agregar…",
      },
    ],
  },
];

/**
 * Validación al enviar. Mínimos para configurar el agente y armar la propuesta:
 * nombre del restorán, número del dueño y al menos un medio de pago.
 */
export function resto360ValidarAlEnviar(respuestas: Respuestas): string | null {
  if (!respuestas.nombre || String(respuestas.nombre).trim().length < 2) {
    return "Cuéntanos cómo se llama tu restorán (Bloque 1).";
  }
  if (!respuestas.fono_dueno || String(respuestas.fono_dueno).trim().length < 6) {
    return "Déjanos el número del dueño/a (Bloque 7).";
  }
  const pagos = (respuestas.pasarela as { seleccion?: string[] } | undefined)?.seleccion ?? [];
  if (pagos.length === 0) {
    return "Marca al menos un medio de pago con el que cobras hoy (Bloque 5).";
  }
  return null;
}
