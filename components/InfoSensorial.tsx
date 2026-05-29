type Publico = "papas" | "profes";

interface Copy {
  eyebrow: string;
  tituloLead: string;
  tituloEm: string;
  bajada: string;
  porque: string;
  paraQue: string;
  comoIntro: string;
  cierre: string;
  sujeto: string; // "tu hijo o hija" / "el o la estudiante"
}

const COPY: Record<Publico, Copy> = {
  papas: {
    eyebrow: "Operaria Health · OperaHands · Para la familia",
    tituloLead: "Cómo tu hijo o hija",
    tituloEm: "siente el mundo.",
    bajada:
      "Antes de empezar, te contamos en simple de qué se trata — sin tecnicismos. No necesitas saber nada de terapia: nadie conoce a tu hijo o hija como tú, y por eso tu mirada es la más valiosa aquí.",
    porque:
      "Tú lo ves cada día: cómo reacciona a los ruidos, a la ropa, a la comida, al movimiento. Esa mirada del día a día es justo lo que el o la terapeuta necesita y no alcanza a ver en una sola sesión.",
    paraQue:
      "Con lo que nos cuentes, el o la terapeuta entiende cómo tu hijo o hija vive el mundo y le arma un apoyo a su medida: qué actividades ayudan, qué ajustar en casa, en qué poner atención. No es una nota ni una etiqueta — es una manera de acompañarlo mejor.",
    comoIntro:
      "Responde pensando en cómo es normalmente, no en un día puntual. Aquí no hay respuestas buenas ni malas, y nadie te está evaluando a ti: solo queremos conocer mejor a tu hijo o hija.",
    cierre:
      "Gracias por estos minutos. Lo que sabes de tu hijo o hija vale muchísimo, y aquí ayuda de verdad a cuidarlo mejor.",
    sujeto: "tu hijo o hija",
  },
  profes: {
    eyebrow: "Operaria Health · OperaHands · Para el aula",
    tituloLead: "Cómo el o la estudiante",
    tituloEm: "vive el aula.",
    bajada:
      "Antes de responder la encuesta, te contamos en simple de qué se trata. Tu observación en la sala es una pieza clave que el o la terapeuta no alcanza a ver en una evaluación puntual.",
    porque:
      "En la sala lo ves con otros, en tareas, en los cambios de actividad, con ruido y movimiento alrededor. Esa información cotidiana es la que mejor describe cómo responde el o la estudiante.",
    paraQue:
      "Con tus respuestas, el o la terapeuta ocupacional entiende cómo el o la estudiante procesa lo que pasa a su alrededor y propone apoyos concretos para el aula: ajustes de ambiente, de materiales, de rutina. No es una calificación.",
    comoIntro:
      "Responde pensando en cómo es habitualmente en clases, no en un día puntual. No hay respuestas correctas ni incorrectas.",
    cierre:
      "Gracias por tu tiempo. Tu mirada de aula hace que el apoyo llegue mejor y más rápido.",
    sujeto: "el o la estudiante",
  },
};

const SENTIDOS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Visión", d: "Lo que ve y cómo organiza lo que mira." },
  { n: "02", t: "Oído", d: "Cómo reacciona a los sonidos y al ruido." },
  { n: "03", t: "Tacto", d: "El contacto, las texturas, la ropa." },
  { n: "04", t: "Gusto y olfato", d: "Sabores y olores: qué tolera, qué evita." },
  { n: "05", t: "Conciencia del cuerpo", d: "Cuánta fuerza usa, cómo siente su cuerpo." },
  { n: "06", t: "Equilibrio y movimiento", d: "Moverse, columpiarse, mantener el equilibrio." },
  { n: "07", t: "Planificación e ideas", d: "Organizar y completar lo que se propone hacer." },
  { n: "08", t: "Participación social", d: "Compartir, esperar turnos, jugar con otros." },
];

export default function InfoSensorial({ publico }: { publico: Publico }) {
  const c = COPY[publico];

  return (
    <main className="theme-health min-h-screen bg-offwhite">
      {/* Cabecera petrol */}
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-16 w-[340px] h-[340px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">{c.eyebrow}</p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            {c.tituloLead} <em className="italic text-teal-light">{c.tituloEm}</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">{c.bajada}</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        {/* Qué es */}
        <Seccion num="01" titulo="¿Qué es el procesamiento sensorial?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Todo el día recibimos información del mundo por los sentidos. No solo ver, oír, tocar, oler y saborear:
            también sentir el movimiento, el equilibrio y el propio cuerpo. El cerebro junta todo eso y decide
            cómo responder, casi sin que nos demos cuenta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            En algunos niños y niñas ese proceso funciona distinto: hay sonidos que les molestan mucho, texturas
            que no soportan, o necesitan moverse todo el rato. No es un capricho, ni mala conducta, ni culpa de
            nadie: es la forma en que su cuerpo recibe y ordena lo que pasa alrededor. Entenderlo es el primer
            paso para acompañarlo mejor.
          </p>
        </Seccion>

        {/* Las 8 áreas */}
        <Seccion num="02" titulo="Las 8 áreas que miramos">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-2">La encuesta recorre ocho áreas, con preguntas cortas en cada una:</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-x-8">
            {SENTIDOS.map((s) => (
              <div key={s.n} className="flex gap-3 py-3 border-b border-border">
                <span className="font-mono text-teal text-[12px] pt-1">{s.n}</span>
                <div>
                  <p className="font-sans font-semibold text-[17px] text-navy leading-tight">{s.t}</p>
                  <p className="text-[15px] text-body leading-snug mt-0.5">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Seccion>

        {/* Por qué */}
        <Seccion num="03" titulo="¿Por qué te pedimos responder?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">{c.porque}</p>
        </Seccion>

        {/* Para qué sirve */}
        <Seccion num="04" titulo="¿Para qué sirve?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">{c.paraQue}</p>
        </Seccion>

        {/* Cómo responder */}
        <Seccion num="05" titulo="¿Cómo respondo?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">{c.comoIntro}</p>
          <ul className="mt-4 flex flex-col gap-3">
            <Tip>Toma unos 10 a 15 minutos. Puedes parar y seguir después; se guarda solo.</Tip>
            <Tip>Si una pregunta cuesta leerla, toca el botón de altavoz y la escuchas en voz alta.</Tip>
            <Tip>Si dudas entre dos opciones, elige la que más se acerque a lo habitual.</Tip>
            <Tip>Responde todas: cada una ayuda a completar la mirada.</Tip>
          </ul>
        </Seccion>

        <div className="mt-14 border-t border-b border-teal py-9">
          <p className="font-display italic text-petrol text-[22px] leading-snug">{c.cierre}</p>
        </div>

        <p className="mt-12 font-mono text-muted text-[11px] uppercase tracking-[0.18em]">
          Diseñado por Operaria · Operaria Health · OperaHands
        </p>
        <p className="mt-3 text-[14px] text-muted">
          Cierra esta página y vuelve a la encuesta cuando estés listo/a.
        </p>
      </div>
    </main>
  );
}

function Seccion({ num, titulo, children }: { num: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 first:mt-0">
      <p className="font-mono text-teal text-[12px] uppercase tracking-[3px] mb-3">{num}</p>
      <h2 className="font-sans font-semibold text-[26px] sm:text-[30px] text-petrol leading-tight border-b-2 border-teal pb-3 mb-6">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[16px] text-body leading-relaxed">
      <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-teal" aria-hidden />
      <span>{children}</span>
    </li>
  );
}
