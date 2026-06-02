export const metadata = {
  title: "Qué es el PHQ-9 — Tamizaje de Depresión",
  description: "Cuestionario breve para detectar síntomas de depresión. Operaria Health · Hands-SM.",
};

export default function QueEsPhq9() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · PHQ-9
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cómo te has <em className="italic text-teal-light">sentido</em> estas semanas.
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Un cuestionario breve para mirar con honestidad cómo ha estado tu ánimo
            en las últimas dos semanas. 9 preguntas, unos 3 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el PHQ-9?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El PHQ-9 (<em>Patient Health Questionnaire</em>) es uno de los cuestionarios
            más usados en el mundo para <strong>tamizar depresión</strong>. No diagnostica
            — orienta sobre la presencia y severidad de síntomas depresivos.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            En Chile fue validado por Baader y colaboradores en 2012, y se usa en
            atención primaria, salud mental y consulta privada.
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Las preguntas son sobre cosas concretas: dormir, comer, energía, ánimo,
            concentración, sentirte mal contigo, moverte lento o muy inquieto. Para
            cada una marcas con qué frecuencia te ha pasado en <strong>las últimas
            dos semanas</strong>: para nada, varios días, más de la mitad de los días,
            o casi todos los días.
          </p>
        </Seccion>

        <Seccion num="03" titulo="Un ítem importante">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El ítem 9 pregunta por pensamientos de que estarías mejor muerto o de
            hacerte daño. Es una pregunta directa porque es importante saberlo.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Si marcas algo distinto a «para nada», te vamos a mostrar números de
            ayuda gratuita (Salud Responde, *4141) <strong>antes</strong> de seguir.
            Si tienes un tratante, también le llegará una alerta en el informe.
            No es para asustarte: es para que no estés solo o sola con eso.
          </p>
        </Seccion>

        <Seccion num="04" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con tu puntaje (de 0 a 27) y la
            banda de severidad correspondiente: mínima, leve, moderada,
            moderadamente severa o severa. Cada banda viene con una orientación
            clínica concreta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El PHQ-9 no diagnostica. Si tu puntaje sale en rango moderado o más
            alto, el siguiente paso es agendar una consulta con un médico o
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
