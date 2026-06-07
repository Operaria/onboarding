export const metadata = {
  title: "Qué es el ISI — Severidad del Insomnio",
  description: "Cuestionario breve para medir la severidad de tus dificultades para dormir. Operaria Health · Hands-SM.",
};

export default function QueEsIsi() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-16 pb-14 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · Hands-SM · ISI
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cómo está <em className="italic text-teal-light">tu sueño.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Siete preguntas sobre tus dificultades para dormir en las últimas
            dos semanas, qué tanto te afectan y cuánto te preocupan.
            Te toma menos de dos minutos.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        <Seccion num="01" titulo="¿Qué es el ISI?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            El ISI (<em>Insomnia Severity Index</em>) es el cuestionario más
            usado en el mundo para medir la severidad del insomnio. Lo crearon
            Bastien, Vallières y Morin en 2001 y se usa tanto en atención
            primaria como en clínicas del sueño.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            La versión en español fue validada por Fernández-Mendoza y
            colaboradores en 2012. Es uno de los instrumentos más sensibles
            al cambio: se usa también para medir si un tratamiento está
            funcionando.
          </p>
        </Seccion>

        <Seccion num="02" titulo="¿Qué pregunta?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Las primeras tres preguntas miden los tres problemas clásicos del
            insomnio: <strong>cuesta quedarse dormido/a</strong>,
            <strong> cuesta mantener el sueño</strong>, y
            <strong> despertar muy temprano</strong> sin poder volver a dormir.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Las cuatro restantes miden qué tan <strong>satisfecho/a estás con
            tu sueño actual</strong>, cuánto te afecta en lo cotidiano, qué
            tan notorio crees que es para los demás, y cuánto te preocupa.
            Todo pensando en las últimas dos semanas.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Qué pasa con el resultado?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Se genera un informe en PDF con tu puntaje (0 a 28) y la banda
            de severidad: sin insomnio significativo, sub-umbral, moderado
            o severo. Cada banda viene con una sugerencia clínica concreta.
          </p>
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El ISI no diagnostica. Si tu puntaje sale en rango moderado o
            severo, lo recomendable es consultar con un profesional de la
            salud: el tratamiento estándar (terapia cognitivo-conductual
            para el insomnio o TCC-I) funciona muy bien y no necesariamente
            implica medicamentos.
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
