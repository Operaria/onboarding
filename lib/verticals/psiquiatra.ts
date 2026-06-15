import type { Bloque, Respuestas } from "../types";

// Plantillas chilenas que el asistente va a precargar.
const PLANTILLAS = [
  "COMPIN psiquiátrico (discapacidad de origen mental)",
  "Licencia médica electrónica (FU-22) por trastorno mental",
  "Informe para SENADIS",
  "Certificado psiquiátrico simple (isapre / empleador / familia)",
  "Derivación a programa GES de salud mental",
  "Peritaje psiquiátrico para tribunales",
  "Evaluación de capacidad (interdicción)",
  "Alta médica psiquiátrica",
  "Contrarreferencia a APS",
];

const SUBESPECIALIDADES = [
  "Psiquiatría adulto",
  "Psiquiatría infantojuvenil",
  "Psiquiatría forense",
  "Psicogeriatría",
  "Adicciones",
];

const LUGARES = [
  "Hospital público",
  "Clínica privada",
  "Consulta particular",
  "Mutual / Achs / IST",
  "COMPIN / SENADIS",
  "APS / Cesfam",
  "Otro",
];

export const psiquiatraBloques: Bloque[] = [
  {
    id: 1,
    titulo: "Quién eres",
    subtitulo: "Lo básico para escribirte y armarte el acceso al piloto.",
    preguntas: [
      {
        id: "nombre_completo",
        numero: "1.1",
        tipo: "texto",
        label: "Tu nombre completo",
        placeholder: "Ej: Dra. Catalina Pérez Soto",
      },
      {
        id: "email",
        numero: "1.2",
        tipo: "texto",
        label: "Correo profesional",
        placeholder: "tucorreo@ejemplo.com",
      },
      {
        id: "telefono",
        numero: "1.3",
        tipo: "tel",
        label: "Teléfono o WhatsApp",
        hint: "Por si necesitamos coordinar algo en el piloto.",
        placeholder: "+56 9 ...",
      },
      {
        id: "rut",
        numero: "1.4",
        tipo: "texto",
        label: "RUT",
        placeholder: "12.345.678-9",
      },
      {
        id: "registro_sis",
        numero: "1.5",
        tipo: "texto",
        label: "Registro SIS (Superintendencia)",
        hint: "Aparece en tus firmas y en las licencias electrónicas.",
        placeholder: "Ej: 25876",
      },
    ],
  },
  {
    id: 2,
    titulo: "Tu práctica",
    subtitulo: "Para entender el volumen y el tipo de papeleo que enfrentas.",
    preguntas: [
      {
        id: "subespecialidad",
        numero: "2.1",
        tipo: "radio",
        label: "Subespecialidad principal",
        opciones: SUBESPECIALIDADES,
      },
      {
        id: "anos_ejercicio",
        numero: "2.2",
        tipo: "number",
        label: "Años de ejercicio como psiquiatra",
        placeholder: "Ej: 12",
        min: 0,
        max: 60,
      },
      {
        id: "lugares",
        numero: "2.3",
        tipo: "checkboxes",
        label: "¿Dónde atiendes hoy?",
        opciones: LUGARES,
      },
      {
        id: "informes_semana",
        numero: "2.4",
        tipo: "slider",
        label: "¿Cuántos informes haces a la semana, en promedio?",
        min: 1,
        max: 50,
        labelMin: "1",
        labelMax: "50+",
      },
    ],
  },
  {
    id: 3,
    titulo: "Tus plantillas",
    subtitulo: "Marca las que más escribes. Empezamos por esas.",
    preguntas: [
      {
        id: "plantillas",
        numero: "3.1",
        tipo: "checkboxes",
        label: "¿Qué tipo de informes escribes con más frecuencia?",
        opciones: PLANTILLAS,
      },
      {
        id: "plantilla_extra",
        numero: "3.2",
        tipo: "textarea",
        label: "¿Hay otro tipo de informe que escribes seguido y no aparece arriba?",
        placeholder: "Opcional. Nómbralo si te acuerdas.",
      },
    ],
  },
  {
    id: 4,
    titulo: "Cómo trabajas hoy",
    subtitulo: "Para entender dónde el papeleo te quita más tiempo.",
    preguntas: [
      {
        id: "dicta_audio",
        numero: "4.1",
        tipo: "radio",
        label: "¿Sueles dictar tus informes en audio?",
        opciones: ["Siempre", "A veces", "Nunca"],
      },
      {
        id: "secretaria_revisa",
        numero: "4.2",
        tipo: "boolean",
        label: "¿Trabajas con secretaria o asistente que revisa los informes antes de firmar?",
      },
      {
        id: "frustracion",
        numero: "4.3",
        tipo: "textarea",
        label: "¿Cuál es tu mayor frustración con el papeleo hoy?",
        hint: "Lo que ojalá no tuvieras que hacer tú.",
      },
    ],
  },
  {
    id: 5,
    titulo: "Tu voz al escribir",
    subtitulo: "Para que el asistente suene a ti y no a un robot. La carga completa de tus informes ejemplo la harás dentro de la app cuando entres al piloto. Por ahora, lo esencial.",
    preguntas: [
      {
        id: "firma",
        numero: "5.1",
        tipo: "textarea",
        label: "¿Cómo te identificas al firmar un informe?",
        placeholder: "Ej: Dra. Catalina Pérez Soto · Psiquiatra · Reg. SIS 25876",
      },
      {
        id: "cierre_habitual",
        numero: "5.2",
        tipo: "textarea",
        label: "¿Hay alguna fórmula de cierre que uses siempre?",
        placeholder: "Opcional. Ej: \"Quedo atenta a cualquier requerimiento adicional.\"",
      },
      {
        id: "muletilla_clinica",
        numero: "5.3",
        tipo: "textarea",
        label: "¿Hay alguna fórmula que repitas en COMPIN o licencias?",
        placeholder: "Opcional. Una frase tuya que sea reconocible.",
      },
    ],
  },
  {
    id: 6,
    titulo: "El piloto",
    subtitulo: "Lo último, para coordinarnos bien.",
    preguntas: [
      {
        id: "quiere_entrar",
        numero: "6.1",
        tipo: "boolean",
        label: "¿Quieres entrar al piloto cerrado, gratis, dando feedback durante el proceso?",
      },
      {
        id: "canal_contacto",
        numero: "6.2",
        tipo: "radio",
        label: "¿Por dónde nos coordinamos durante el piloto?",
        opciones: ["WhatsApp", "Telegram", "Correo"],
      },
      {
        id: "consentimiento",
        numero: "6.3",
        tipo: "boolean",
        label: "He leído y acepto que el procesamiento de los datos clínicos sea efímero, sin almacenamiento en servidores de Operaria, ejecutado en infraestructura Google Cloud con data residency. Mantengo siempre el rol de responsable del tratamiento bajo Ley 19.628 y 21.719.",
        helper: "Obligatorio para entrar al piloto.",
      },
    ],
  },
];

export function psiquiatraValidarAlEnviar(respuestas: Respuestas): string | null {
  const nombre = (respuestas.nombre_completo as string | undefined)?.trim() ?? "";
  if (!nombre) {
    return "Necesitamos tu nombre completo (Bloque 1) para escribirte.";
  }
  const email = (respuestas.email as string | undefined)?.trim() ?? "";
  if (!email) {
    return "Necesitamos tu correo profesional (Bloque 1) para coordinar el piloto.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "El correo no parece válido. Revísalo.";
  }
  const consent = respuestas.consentimiento;
  if (consent !== true) {
    return "Para entrar al piloto necesitamos tu consentimiento explícito (Bloque 6).";
  }
  return null;
}
