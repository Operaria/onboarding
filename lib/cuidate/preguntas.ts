// Cuídate · slamm — autodiagnóstico anónimo, 100% cliente.
// Las respuestas viven solo en el state del componente, no se envían a ningún lado.

export type OpcionId = string;

export interface Opcion {
  v: OpcionId;
  t: string;
}

export interface Pregunta {
  id: string;
  txt: string;
  sub?: string;
  opts: Opcion[];
}

export type Respuestas = Partial<Record<string, OpcionId>>;

export interface Consejo {
  clase: "peso" | "calm" | "";
  tag: string;
  txt: string;
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: "tiempo",
    txt: "¿Hace cuánto que te inyectas?",
    sub: "No importa la respuesta. Solo nos ayuda a darte mejor consejo.",
    opts: [
      { v: "primera", t: "Es la primera vez (o estoy por probar)" },
      { v: "menos6", t: "Menos de 6 meses" },
      { v: "6a24", t: "Entre 6 meses y 2 años" },
      { v: "mas24", t: "Más de 2 años" },
    ],
  },
  {
    id: "compartir",
    txt: "¿Compartes jeringas, agua o filtros con otros?",
    sub: "Compartir cualquier material (no solo la jeringa) transmite VIH y hepatitis C.",
    opts: [
      { v: "si", t: "Sí, regularmente" },
      { v: "aveces", t: "A veces" },
      { v: "nunca", t: "Nunca" },
    ],
  },
  {
    id: "sobredosis",
    txt: "¿Has tenido alguna sobredosis — tuya o de alguien con quien estabas?",
    opts: [
      { v: "mia", t: "Sí, mía" },
      { v: "otro", t: "Sí, de alguien con quien estaba" },
      { v: "ambas", t: "Las dos cosas" },
      { v: "no", t: "No" },
    ],
  },
  {
    id: "examenes",
    txt: "¿Sabes hoy tu estado de VIH y de hepatitis C?",
    sub: "Saberlo te protege a ti y a las personas con quienes compartes vida.",
    opts: [
      { v: "losdos", t: "Sí, los dos, recientes" },
      { v: "unoonly", t: "Solo uno de los dos" },
      { v: "viejos", t: "Me los hice, pero hace tiempo" },
      { v: "nunca", t: "No me los he hecho nunca" },
    ],
  },
  {
    id: "prep",
    txt: "¿Estás tomando PrEP o algún tratamiento para VIH?",
    opts: [
      { v: "prep", t: "Sí, PrEP" },
      { v: "tratvih", t: "Sí, tratamiento VIH" },
      { v: "no", t: "No" },
      { v: "nose", t: "No sé qué es eso" },
    ],
  },
  {
    id: "red",
    txt: "¿Hay alguien que sepa cómo encontrarte si algo sale mal?",
    sub: "Un amigo, una pareja, una ONG, un médico. Cualquier persona vale.",
    opts: [
      { v: "si", t: "Sí, alguien sabe" },
      { v: "tal", t: "Más o menos" },
      { v: "no", t: "No, estoy solo en esto" },
    ],
  },
  {
    id: "intencion",
    txt: "¿Qué quieres hacer hoy con esto?",
    sub: "No hay respuesta correcta. La que sea, te respeta.",
    opts: [
      { v: "cuidar", t: "Cuidar lo que estoy haciendo" },
      { v: "reducir", t: "Reducir cuánto lo hago" },
      { v: "dejar", t: "Dejarlo" },
      { v: "nose", t: "No estoy seguro todavía" },
    ],
  },
];

// Reglas que mapean respuestas a consejos personalizados.
// La lógica espeja la del HTML autocontenido — cualquier cambio aquí debe espejarse allí.
export function consejosDe(r: Respuestas): Consejo[] {
  const c: Consejo[] = [];

  if (r.sobredosis && r.sobredosis !== "no") {
    c.push({
      clase: "peso",
      tag: "Lo más importante",
      txt: "Has estado cerca de una sobredosis. Pide naloxona (Narcan) y aprende a usarla — sirve para revertir una sobredosis por opiáceos. Algunas ONG la entregan gratis.",
    });
  }

  if (r.compartir === "si" || r.compartir === "aveces") {
    c.push({
      clase: "",
      tag: "Cuidado urgente",
      txt: "No compartas jeringas, agua, filtros ni cucharas. Compartir el agua o el filtro transmite igual que la jeringa. Usa material nuevo cada vez — algunas ONG y servicios de salud lo entregan gratis y sin preguntas.",
    });
  } else if (r.compartir === "nunca") {
    c.push({
      clase: "calm",
      tag: "Sigue así",
      txt: "No compartir material es lo más protector que estás haciendo. Mantén ese hábito incluso en sesiones largas o cuando estés muy entrado en la noche.",
    });
  }

  if (r.examenes === "nunca" || r.examenes === "viejos") {
    c.push({
      clase: "",
      tag: "Conoce tu estado",
      txt: "Hacerte el test de VIH y hepatitis C es gratis, rápido y anónimo en cualquier CESFAM. Saber tu estado te abre opciones de tratamiento y te protege. Si sale algo, hoy existe tratamiento eficaz para los dos.",
    });
  } else if (r.examenes === "unoonly") {
    c.push({
      clase: "calm",
      tag: "Completa el cuadro",
      txt: "Tienes uno de los dos resultados. Cierra el otro pronto — VIH y hepatitis C son distintos, y los dos importan.",
    });
  }

  if (r.prep === "no" || r.prep === "nose") {
    c.push({
      clase: "",
      tag: "Pregunta por PrEP",
      txt: "La PrEP es una pastilla diaria que reduce muchísimo el riesgo de contraer VIH. En Chile la entrega gratis el sistema público para personas en riesgo. Pregunta en tu CESFAM o en una ONG de VIH.",
    });
  }

  if (r.red === "no") {
    c.push({
      clase: "peso",
      tag: "No quedes solo",
      txt: "Tener a alguien que sepa cómo encontrarte salva vidas. Aunque sea una sola persona — un amigo, una ONG, un médico de confianza. No tiene que saber todo, solo cómo llegar a ti si algo pasa.",
    });
  }

  if (r.intencion === "dejar" || r.intencion === "reducir") {
    c.push({
      clase: "calm",
      tag: "Hay ayuda real",
      txt: "Si quieres reducir o dejar, hay programas en Chile con experiencia en chemsex específicamente — no te van a tratar como un caso más. Pídenos contacto y te derivamos.",
    });
  }

  if (r.tiempo === "primera") {
    c.unshift({
      clase: "peso",
      tag: "Antes de empezar",
      txt: "Si todavía no te has inyectado, esta es la mejor oportunidad para informarte bien. Inyectarse es lo más riesgoso del consumo — hay otras formas (esnifado, oral) que reducen mucho ese riesgo. Lo decides tú, pero conviene saberlo.",
    });
  }

  if (c.length === 0) {
    c.push({
      clase: "calm",
      tag: "Cuidado básico",
      txt: "Sigue cuidándote como lo haces. Y si las condiciones cambian — empiezas a compartir, no duermes, te aíslas — vuelve acá y revisa de nuevo.",
    });
  }

  return c.slice(0, 4);
}
