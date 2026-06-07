export const metadata = {
  title: "Qué es el AUDIT — Consumo de Alcohol",
  description: "Cuestionario breve para detectar consumo problemático de alcohol. Operaria Health · Hands-SM.",
};

export default function QueEsAudit() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · AUDIT
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cómo está tu <em className="italic text-teal-light">relación con el alcohol.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Diez preguntas sobre tu consumo en el último año, las consecuencias
            y la preocupación de quienes te rodean. Te toma unos 3 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el AUDIT?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El AUDIT (<em>Alcohol Use Disorders Identification Test</em>) es el
            instrumento de tamizaje recomendado por la <strong>Organización
            Mundial de la Salud</strong> para detectar consumo problemático de
            alcohol. Se usa en atención primaria, salud mental y consulta
            general en todo el mundo.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            En Chile la adaptación es del MINSAL (trabajo de Alvarado y
            Garmendia). Las preguntas están pensadas para el contexto chileno
            y la noción de “trago estándar” (cerveza chica, copa de vino,
            trago corto).
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Tres cosas: <strong>cuánto y con qué frecuencia bebes</strong>,
            <strong> señales de pérdida de control</strong> (necesidad de seguir
            bebiendo, beber matinal, fallar obligaciones), y <strong>las
            consecuencias</strong> (culpa, no recordar lo del día anterior,
            lesiones, preocupación de tu entorno).
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Responde pensando en cómo ha sido tu consumo durante <strong>el
            último año</strong>. Si no bebes, también responde — el AUDIT está
            diseñado para incluir abstinencia.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con tu puntaje (0 a 40) y la
            zona OMS: bajo riesgo, consumo de riesgo, consumo perjudicial o
            probable dependencia. Cada zona viene con una sugerencia clínica
            concreta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El AUDIT no diagnostica. Si tu puntaje sale en zona II o superior,
            la recomendación es conversar con un profesional de salud — médico
            de cabecera, psicólogo, equipo de salud mental. Una intervención
            breve a tiempo cambia trayectorias.
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
