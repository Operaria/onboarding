export const metadata = {
  title: "Qué es el MDQ — Cuestionario del Ánimo",
  description: "En simple: qué mide el MDQ, por qué se usa como tamizaje del trastorno bipolar, y qué significa un resultado positivo o negativo. Operaria Health · Hands-SM.",
  openGraph: {
    title: "Qué es el MDQ — Operaria Health",
    description: "Tamizaje autoaplicado de trastorno bipolar. Qué es, cómo funciona y qué hacer con el resultado.",
    images: ["/icon-512.png"],
  },
};

export default function QueEsMdq() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-16 w-[340px] h-[340px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · MDQ
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cuestionario <em className="italic text-teal-light">del ánimo.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Antes de responder, te contamos en simple de qué se trata el MDQ —
            sin tecnicismos. No es un test que te etiquete, es una orientación para
            decidir si vale la pena consultar con un especialista.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el MDQ?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El MDQ (<em>Mood Disorder Questionnaire</em>) es un cuestionario corto
            que sirve para <strong>tamizar</strong> trastorno bipolar — es decir,
            detectar si hay señales que sugieran consultar con un psiquiatra.
            Fue desarrollado por el Dr. Robert Hirschfeld en el año 2000 y se
            usa en todo el mundo.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            La versión en español que usamos acá es la difundida por la
            Sociedad Chilena de Trastorno Bipolar (SOCHITAB).
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Son 15 preguntas. Las primeras 13 son sobre síntomas de
            <strong> manía o hipomanía</strong>: períodos en los que una persona
            se sintió mucho más activa, eufórica, irritable o impulsiva que de
            costumbre — y eso le trajo problemas.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Las dos preguntas finales son sobre si esos síntomas ocurrieron
            <strong> juntos en un mismo período</strong> y cuántas dificultades te causaron.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Cómo responder?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Responde pensando en tu vida en general, no en cómo estás hoy.
            La pregunta es <em>«¿alguna vez te ha pasado esto?»</em> — un período
            atrás, semanas o meses. No tiene que ser ahora.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            No hay respuestas buenas ni malas. Sé honesto contigo mismo:
            mientras más fiel sea tu respuesta, más útil es el resultado.
          </p>
        </Seccion>

        <Seccion num="04" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con dos resultados posibles:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block w-3 h-3 rounded-full bg-[#C0392B] flex-shrink-0" />
              <span className="text-[17px] text-body leading-relaxed">
                <strong>Tamizaje positivo</strong> — hay señales compatibles con
                episodios de manía/hipomanía. <strong>No es un diagnóstico</strong>: significa
                que vale la pena agendar una evaluación con un psiquiatra para revisarlo.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block w-3 h-3 rounded-full bg-[#27AE60] flex-shrink-0" />
              <span className="text-[17px] text-body leading-relaxed">
                <strong>Tamizaje negativo</strong> — en este momento no se cumplen
                los criterios del MDQ. Tampoco descarta nada: si hay algo que te
                preocupa, consulta igual con un especialista.
              </span>
            </li>
          </ul>
        </Seccion>

        <Seccion num="05" titulo="Lo importante">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El MDQ no diagnostica. Solo orienta. El diagnóstico de trastorno
            bipolar requiere una entrevista clínica completa con un médico
            psiquiatra. Si el resultado sale positivo —o si algo del cuestionario
            te llamó la atención— el siguiente paso es agendar una consulta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Cuidarse a tiempo cambia el curso de las cosas.
          </p>
        </Seccion>

        <div className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-muted text-[11px] uppercase tracking-[2px]">
            Diseñado por Operaria · operaria.cl
          </p>
        </div>
      </div>
    </main>
  );
}

function Seccion({ num, titulo, children }: { num: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <p className="font-mono text-teal text-[11px] uppercase tracking-[3px] mb-3">{num}</p>
      <h2 className="font-display italic text-petrol text-[clamp(28px,5vw,40px)] leading-tight mb-6">
        {titulo}
      </h2>
      {children}
    </section>
  );
}
