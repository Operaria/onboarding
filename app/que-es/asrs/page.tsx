export const metadata = {
  title: "Qué es el ASRS-v1.1 — Tamizaje de TDAH adulto",
  description: "Cuestionario breve para detectar TDAH del adulto. Operaria Health · Hands-SM.",
};

export default function QueEsAsrs() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · ASRS-v1.1
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cómo funciona <em className="italic text-teal-light">tu atención.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Dieciocho preguntas sobre concentración, organización, impulsividad
            y movimiento, durante los últimos seis meses. Te toma unos 5 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el ASRS-v1.1?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El ASRS-v1.1 (<em>Adult ADHD Self-Report Scale</em>) es el
            cuestionario que la <strong>Organización Mundial de la Salud</strong>
            desarrolló junto con Ronald Kessler en 2005 para tamizar TDAH
            (Trastorno por Déficit Atencional e Hiperactividad) en adultos.
            Se usa en clínica, investigación y orientación general en todo el mundo.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            La validación en habla hispana es de Pedrero-Pérez y colaboradores
            (2012). Es la herramienta más rápida y robusta que existe para
            saber si vale la pena profundizar la evaluación.
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Está dividido en dos partes. La <strong>Parte A son seis preguntas
            críticas</strong>: las que más diferencian el TDAH adulto del resto.
            Hablan de cerrar proyectos, de organizar, de recordar citas, de
            postergar tareas que requieren pensar, y de inquietud física.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            La <strong>Parte B son doce preguntas complementarias</strong> que
            ayudan a entender el perfil: si predomina la inatención, la
            hiperactividad/impulsividad, o ambas. Responde pensando en los
            <strong> últimos seis meses</strong>.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con el resultado del
            tamizaje (positivo o negativo según los ítems críticos de la
            Parte A), los subscores de inatención e
            hiperactividad/impulsividad, y el desglose ítem por ítem
            marcando cuáles cayeron en zona crítica.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El ASRS-v1.1 no diagnostica. Si tu tamizaje sale positivo, lo
            recomendable es agendar una evaluación clínica formal con un
            profesional con experiencia en TDAH adulto (psiquiatra o
            neurólogo). Un buen diagnóstico cambia mucho la vida cotidiana.
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
