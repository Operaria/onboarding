import type { Bloque, Respuestas } from "../types";

// Opciones de tareas a delegar (alimentan el brief de Cindy)
const TAREAS = [
  "Filtrar y ordenar correos",
  "Ordenar y archivar PDFs y documentos",
  "Preparar propuestas y cotizaciones a clientes",
  "Seguimiento a clientes",
  "Recordatorios y agenda",
  "Priorizar el día",
  "Armar resúmenes y reportes",
  "Buscar información",
  "Otro",
];

// Herramientas (alimentan el "qué ir a buscar": accesos e integraciones)
const HERRAMIENTAS = [
  "Google Calendar",
  "Gmail",
  "Google Drive",
  "Telegram",
  "WhatsApp",
  "Notion",
  "Excel / Google Sheets",
  "Otra",
];

export const cindyBloques: Bloque[] = [
  {
    id: 1,
    titulo: "Tú y tu semana",
    subtitulo: "Para empezar, cuéntame de ti con tus palabras. No hay respuestas correctas.",
    preguntas: [
      {
        id: "rol",
        numero: "1.1",
        tipo: "textarea",
        label: "¿A qué te dedicas? Cuéntame de tu trabajo.",
        placeholder: "Tu rol como lo dirías tú, sin formalismos.",
      },
      {
        id: "semana",
        numero: "1.2",
        tipo: "textarea",
        label: "¿Cómo es una semana típica tuya?",
        hint: "¿Qué se repite? ¿Dónde se te va la energía?",
      },
      {
        id: "email",
        numero: "1.3",
        tipo: "texto",
        label: "Tu correo principal de trabajo",
        hint: "Lo usamos para conectar a Cindy con tus herramientas.",
        placeholder: "tucorreo@ejemplo.com",
      },
    ],
  },
  {
    id: 2,
    titulo: "Lo que te encantaría soltar",
    subtitulo: "Cindy nace para devolverte tiempo. ¿Qué le pasamos primero?",
    preguntas: [
      {
        id: "soltar_tareas",
        numero: "2.1",
        tipo: "checkboxes",
        label: "¿Qué te encantaría que Cindy tomara por ti?",
        opciones: TAREAS,
      },
      {
        id: "soltar_detalle",
        numero: "2.2",
        tipo: "textarea",
        label: "Si tuvieras que elegir 3 tareas concretas para darle de inmediato, ¿cuáles serían?",
        placeholder: "1. … 2. … 3. …",
      },
      {
        id: "dolor",
        numero: "2.3",
        tipo: "textarea",
        label: "¿Qué es lo que más te quita tiempo o energía hoy?",
        hint: "Eso que ojalá no tuvieras que hacer tú.",
      },
    ],
  },
  {
    id: 3,
    titulo: "Cómo trabajas hoy",
    subtitulo: "Esto nos dice qué accesos hay que conseguir para armarla de verdad.",
    preguntas: [
      {
        id: "herramientas",
        numero: "3.1",
        tipo: "checkboxes",
        label: "¿Qué herramientas usas hoy?",
        opciones: HERRAMIENTAS,
      },
      {
        id: "canal_preferido",
        numero: "3.2",
        tipo: "radio",
        label: "¿Por dónde te gusta que te hablen?",
        opciones: ["WhatsApp", "Telegram", "Correo", "Llamada", "Otro"],
      },
    ],
  },
  {
    id: 4,
    titulo: "El estilo de Cindy",
    subtitulo: "Para que suene a tu equipo, no a un robot.",
    preguntas: [
      {
        id: "trato",
        numero: "4.1",
        tipo: "radio",
        label: "¿Cómo te gusta que te traten?",
        opciones: ["Cercana y cálida", "Cercana pero directa", "Más formal"],
      },
      {
        id: "voz_detalle",
        numero: "4.2",
        tipo: "textarea",
        label: "¿Cómo hablas tú?",
        hint: "Una frase o muletilla tuya típica, para que Cindy suene como tú.",
      },
      {
        id: "equipo_trato",
        numero: "4.3",
        tipo: "textarea",
        label: "¿Cómo quieres que trate a tus clientes y a las personas con las que trabajas?",
        placeholder: "Opcional.",
      },
    ],
  },
  {
    id: 5,
    titulo: "Hasta dónde llega Cindy",
    subtitulo: "Sus permisos y sus límites — dónde decide sola y dónde te pregunta.",
    preguntas: [
      {
        id: "autonomia",
        numero: "5.1",
        tipo: "textarea",
        label: "¿Qué puede hacer sola, sin preguntarte?",
      },
      {
        id: "consulta_siempre",
        numero: "5.2",
        tipo: "textarea",
        label: "¿Qué debe consultarte SIEMPRE antes de hacer?",
      },
      {
        id: "nunca",
        numero: "5.3",
        tipo: "textarea",
        label: "¿Qué NO debe hacer jamás?",
      },
    ],
  },
  {
    id: 6,
    titulo: "Materiales que ayudan",
    subtitulo: "Cosas que Cindy debería conocer. Las recolectamos después; aquí solo dinos cuáles.",
    preguntas: [
      {
        id: "materiales",
        numero: "6.1",
        tipo: "textarea",
        label: "¿Tienes correos, plantillas, documentos o contactos clave que Cindy debería conocer?",
        placeholder: "Ej: mi plantilla de correo de bienvenida, la lista de proveedores, el documento X…",
      },
    ],
  },
  {
    id: 7,
    titulo: "Su alma, y tu éxito",
    subtitulo: "Lo último, lo más bonito.",
    preguntas: [
      {
        id: "temperatura",
        numero: "7.1",
        tipo: "textarea",
        label: "¿Qué personalidad o temperatura te gustaría que tuviera Cindy?",
        hint: "Para que se sienta tuya, no un robot.",
      },
      {
        id: "exito",
        numero: "7.2",
        tipo: "textarea",
        label: "En tu primer mes con Cindy, ¿qué te encantaría poder decir?",
      },
    ],
  },
];

export function cindyValidarAlEnviar(respuestas: Respuestas): string | null {
  const rol = (respuestas.rol as string | undefined)?.trim() ?? "";
  if (!rol) {
    return "Cuéntanos al menos de qué te encargas (Bloque 1) para enviar.";
  }
  const email = (respuestas.email as string | undefined)?.trim() ?? "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "El correo no parece válido. Revísalo o déjalo vacío.";
  }
  return null;
}
