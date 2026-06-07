export const metadata = {
  title: "Qué es el PCL-5 — Tamizaje de TEPT",
  description: "Cuestionario breve para detectar síntomas de Trastorno de Estrés Postraumático según DSM-5. Operaria Health · Hands-SM.",
};

export default function QueEsPcl5() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · PCL-5
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Lo que <em className="italic text-teal-light">no termina de pasar.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Veinte preguntas sobre cómo te ha afectado, durante el último mes,
            una experiencia estresante o traumática. Te toma unos 6 minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el PCL-5?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El PCL-5 (<em>PTSD Checklist for DSM-5</em>) es el cuestionario
            estándar para tamizar síntomas de <strong>Trastorno de Estrés
            Postraumático (TEPT)</strong> según los criterios del DSM-5. Lo
            elaboró el National Center for PTSD del Departamento de Asuntos
            de Veteranos de Estados Unidos en 2013.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            En español se ha usado en investigación y clínica en varios países
            de habla hispana, con validación local en Chile (Vitriol y
            colaboradores, 2017).
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Antes de empezar, identificas en tu mente una experiencia
            estresante o traumática. Después respondes 20 preguntas sobre
            qué tanto te ha afectado <strong>en el último mes</strong>: si
            vuelven recuerdos involuntarios, si tienes que evitar lugares o
            personas que te la recuerden, cómo está tu estado de ánimo y tu
            mirada del mundo, y si andas más alerta o irritable.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Si te incomoda describir la experiencia en palabras, hay un campo
            opcional para hacerlo. Si prefieres no escribirla, déjalo en
            blanco — el cuestionario funciona igual.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Al final se genera un informe en PDF con tu puntaje total (0 a 80),
            los subscores por área (reexperimentación, evitación, cogniciones
            y ánimo, alerta y reactividad), y dos indicadores: si superas el
            corte clínico (≥ 33) y si cumples la regla DSM-5 para sospecha de
            TEPT.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El PCL-5 no diagnostica. Si tu resultado sale positivo, lo
            recomendable es conversarlo con un profesional con formación en
            trauma. Existen tratamientos psicológicos basados en evidencia
            (EMDR, terapia cognitivo-conductual centrada en el trauma,
            exposición prolongada) que funcionan muy bien.
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
