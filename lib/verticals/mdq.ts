import type { Bloque, Respuestas } from "../types";
import {
  MDQ_ITEM_IDS,
  MDQ_COOCURRENCIA_ID,
  MDQ_PROBLEMA_ID,
  MDQ_OPCIONES_SI_NO,
  MDQ_OPCIONES_PROBLEMA,
} from "../mdq";

const SI_NO = [...MDQ_OPCIONES_SI_NO];
const PROBLEMA = [...MDQ_OPCIONES_PROBLEMA];

const sintomas: { numero: string; label: string }[] = [
  {
    numero: "1",
    label:
      "…se sentía tan bien o con el ánimo tan elevado, tan «hiperactivo», que algunos pensaron que usted no era la misma persona de siempre; o estuvo tan animado o «hiperactivo» que se metió en problemas o en dificultades?",
  },
  {
    numero: "2",
    label:
      "…estaba tan irritable que le gritaba a la gente, o iniciaba peleas o discusiones?",
  },
  {
    numero: "3",
    label: "…se sentía mucho más seguro de sí mismo que otras veces?",
  },
  {
    numero: "4",
    label:
      "…dormía mucho menos que de costumbre, y notaba que no tenía mucha falta de sueño?",
  },
  {
    numero: "5",
    label: "…hablaba mucho más, o mucho más rápido que de costumbre?",
  },
  {
    numero: "6",
    label:
      "…le pasaban las ideas muy rápidamente por la cabeza, o no podía pensar lentamente?",
  },
  {
    numero: "7",
    label:
      "…se distraía muy fácilmente con las cosas que sucedían a su alrededor, al punto de que necesitaba hacer esfuerzos para concentrarse o continuar lo que estaba haciendo?",
  },
  {
    numero: "8",
    label: "…tenía más energía que de costumbre?",
  },
  {
    numero: "9",
    label: "…estaba mucho más activo o hacía muchas más cosas que de costumbre?",
  },
  {
    numero: "10",
    label:
      "…era socialmente mucho más activo y comunicativo, al punto de que —por ejemplo— telefoneaba a amistades en medio de la noche?",
  },
  {
    numero: "11",
    label: "…se interesaba en el sexo más que de costumbre?",
  },
  {
    numero: "12",
    label:
      "…hacía cosas que no eran comunes en usted, o que la gente podía haber considerado excesivas, tontas o arriesgadas?",
  },
  {
    numero: "13",
    label: "…el gastar dinero le causó problemas a usted o a su familia?",
  },
];

export const mdqBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Síntomas",
    subtitulo: "¿Le sucedió alguna vez que por un cierto período…?",
    intro:
      "Piense en su vida en general. Para cada situación, marque «Sí» si alguna vez le ha sucedido, o «No» si no.",
    preguntas: sintomas.map((it, i) => ({
      id: MDQ_ITEM_IDS[i],
      numero: it.numero,
      tipo: "radio" as const,
      label: it.label,
      opciones: SI_NO,
    })),
  },
  {
    id: 1,
    titulo: "Ocurrencia y consecuencias",
    subtitulo: "Dos preguntas finales sobre lo anterior.",
    preguntas: [
      {
        id: MDQ_COOCURRENCIA_ID,
        numero: "14",
        tipo: "radio" as const,
        label:
          "Si marcó «Sí» en al menos dos de las preguntas anteriores, ¿ocurrieron varias de esas situaciones juntas en un mismo período de tiempo?",
        opciones: SI_NO,
      },
      {
        id: MDQ_PROBLEMA_ID,
        numero: "15",
        tipo: "radio" as const,
        label:
          "¿Cuántas dificultades le causaron cualquiera de las situaciones mencionadas (por ejemplo, no poder trabajar, problemas familiares, enfrascarse en discusiones o peleas)?",
        hint: "Marque solo una.",
        opciones: PROBLEMA,
      },
    ],
  },
];

export function mdqValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of MDQ_ITEM_IDS) {
    const v = respuestas[id];
    if (v !== "Sí" && v !== "No") {
      return "Falta responder algunas de las preguntas de síntomas. El tamizaje solo es válido si están las 13 contestadas.";
    }
  }
  const cooc = respuestas[MDQ_COOCURRENCIA_ID];
  if (cooc !== "Sí" && cooc !== "No") {
    return "Falta la pregunta sobre si varias situaciones ocurrieron en un mismo período.";
  }
  const prob = respuestas[MDQ_PROBLEMA_ID];
  if (typeof prob !== "string" || !(MDQ_OPCIONES_PROBLEMA as readonly string[]).includes(prob)) {
    return "Falta indicar cuántas dificultades le causaron las situaciones mencionadas.";
  }
  return null;
}
