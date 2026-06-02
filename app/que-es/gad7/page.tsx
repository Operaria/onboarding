export const metadata = {
  title: "Qué es el GAD-7 — Tamizaje de Ansiedad",
  description: "Cuestionario breve para detectar síntomas de ansiedad generalizada. Operaria Health · Hands-SM.",
};

export default function QueEsGad7() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · GAD-7
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Lo que te ha tenido <em className="italic text-teal-light">preocupado.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Un cuestionario breve sobre nerviosismo, preocupación e inquietud
            durante las últimas dos semanas. 7 preguntas, unos 2 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el GAD-7?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El GAD-7 (<em>Generalized Anxiety Disorder 7-item scale</em>) es un
            cuestionario para <strong>tamizar ansiedad</strong>. Es breve, fácil
            de responder y se usa en consulta primaria y salud mental en todo el mundo.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            La versión en español fue validada por García-Campayo y colaboradores en 2010.
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Pregunta por cosas concretas: nervios, preocupación que no se detiene,
            dificultad para relajarse, irritabilidad, miedo a que algo malo pase.
            Para cada una marcas con qué frecuencia te ha pasado en <strong>las
            últimas dos semanas</strong>.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con tu puntaje (0 a 21) y la
            banda de severidad: mínima, leve, moderada o severa. Cada una viene
            con una orientación clínica concreta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El GAD-7 no diagnostica. Si tu puntaje sale en rango moderado o más
            alto, el siguiente paso es consultar con un médico o profesional de
            salud mental.
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
