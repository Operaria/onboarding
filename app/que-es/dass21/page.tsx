export const metadata = {
  title: "Qué es el DASS-21 — Depresión, Ansiedad y Estrés",
  description: "Cuestionario que mide tres dimensiones del malestar emocional en una sola pasada. Operaria Health · Hands-SM.",
};

export default function QueEsDass21() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · DASS-21
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Tres dimensiones <em className="italic text-teal-light">a la vez.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Un solo cuestionario que mira por separado tres formas distintas del
            malestar: depresión, ansiedad y estrés. 21 preguntas, unos 5 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el DASS-21?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El DASS-21 (<em>Depression Anxiety Stress Scales</em>) es un
            cuestionario que mide tres dimensiones del malestar emocional
            durante <strong>la última semana</strong>. Fue desarrollado por
            Lovibond & Lovibond en 1995, y se usa ampliamente en clínica e
            investigación en español.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            En Chile la versión en español fue validada por Antúnez & Vinet (2012).
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            21 frases sobre cómo te has sentido la última semana. Para cada una
            marcas si <em>no te ha ocurrido</em>, <em>un poco</em>, <em>bastante</em>{" "}
            o <em>mucho</em>. Las preguntas están mezcladas: no las verás agrupadas
            por dimensión, eso lo hace el sistema al puntuar.
          </p>
          <ul className="space-y-2 mb-2">
            <li className="flex items-baseline gap-3 text-[16px] text-body">
              <span className="font-mono text-teal text-[11px] uppercase tracking-[2px]">D</span>
              <span><strong>Depresión</strong> — ánimo bajo, falta de interés, sentirse sin valor.</span>
            </li>
            <li className="flex items-baseline gap-3 text-[16px] text-body">
              <span className="font-mono text-teal text-[11px] uppercase tracking-[2px]">A</span>
              <span><strong>Ansiedad</strong> — sensaciones físicas de miedo, taquicardia, temblor.</span>
            </li>
            <li className="flex items-baseline gap-3 text-[16px] text-body">
              <span className="font-mono text-teal text-[11px] uppercase tracking-[2px]">S</span>
              <span><strong>Estrés</strong> — tensión, irritabilidad, dificultad para relajarse.</span>
            </li>
          </ul>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con tres puntajes separados, cada
            uno con su banda: normal, leve, moderada, severa o extremadamente
            severa. Es posible que una dimensión salga normal y otra alta — eso
            es justamente lo útil del DASS-21.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El DASS-21 no diagnostica. Si una o más dimensiones salen en rango
            moderado o más alto, el siguiente paso es consultar con un médico o
            profesional de salud mental.
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
