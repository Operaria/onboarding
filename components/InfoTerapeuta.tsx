const PASOS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Creas la evaluación", d: "En el lanzador eliges Hogar o Escolar e ingresas al niño o niña (solo nombre), a quien responde (nombre y correo) y tu correo." },
  { n: "02", t: "Se envía el link", d: "El link de la encuesta sale por correo a quien responde, y queda listo para reenviar por WhatsApp." },
  { n: "03", t: "Responden", d: "La familia o el profesor responde 80 ítems: letra grande, audio por pregunta en español y guardado automático." },
  { n: "04", t: "Se calcula solo", d: "Al enviar, el sistema convierte las respuestas en puntaje por área, Total Sensorial y clasificación." },
  { n: "05", t: "Recibes el informe", d: "El PDF clínico llega directo a tu correo, con la tabla de puntajes y la interpretación por área." },
  { n: "06", t: "Validas tú", d: "Revisas, ajustas con tu criterio y aplicas las indicaciones. El sistema prepara; el juicio clínico es tuyo." },
];

export default function InfoTerapeuta() {
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
            Operaria Health · OperaHands · Para el terapeuta
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,72px)]">
            Cómo funciona <em className="italic text-teal-light">Hands-TO.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Tú entras al final del flujo: cuando abres el archivo, el puntaje ya está calculado. Aquí, en simple, cómo
            opera y qué tienes que tener en cuenta.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
        {/* El flujo */}
        <Seccion num="01" titulo="El flujo, paso a paso">
          <div className="mt-2 flex flex-col">
            {PASOS.map((p) => (
              <div key={p.n} className="flex gap-4 py-4 border-b border-border">
                <span className="font-mono text-teal text-[13px] pt-1 shrink-0">{p.n}</span>
                <div>
                  <p className="font-sans font-semibold text-[18px] text-navy leading-tight">{p.t}</p>
                  <p className="text-[16px] text-body leading-relaxed mt-1">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Seccion>

        {/* Qué mide */}
        <Seccion num="02" titulo="Qué mide el SPM-2">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Cada formulario tiene 80 ítems en 8 áreas. Las primeras seis conforman el Total Sensorial; las dos últimas
            describen praxis y participación.
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-x-8">
            {[
              "Visión", "Oído", "Tacto", "Gusto y olfato", "Conciencia del cuerpo",
              "Equilibrio y movimiento", "Planificación e ideas", "Participación social",
            ].map((a, i) => (
              <div key={a} className="flex gap-3 py-2.5 border-b border-border">
                <span className="font-mono text-teal text-[12px] pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-sans text-[16px] text-navy">{a}</span>
              </div>
            ))}
          </div>
        </Seccion>

        {/* Cómo se calcula */}
        <Seccion num="03" titulo="Cómo se calcula">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            Cada ítem se responde en una escala de frecuencia (Nunca = 1, Ocasionalmente = 2, Frecuentemente = 3,
            Siempre = 4). Se suma el puntaje bruto por área, se convierte a T-score y se clasifica en tres tramos:
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <Tramo color="#27AE60" t="Típico" d="Procesamiento dentro de lo esperado." />
            <Tramo color="#E8A838" t="Algunos problemas" d="Señales a observar y acompañar." />
            <Tramo color="#C0392B" t="Disfunción definitiva" d="Hallazgo relevante que orienta la intervención." />
          </div>
        </Seccion>

        {/* Importante / límites */}
        <Seccion num="04" titulo="Importante — lo que debes tener en cuenta">
          <ul className="flex flex-col gap-4">
            <Limite titulo="Las tablas T-score son aproximadas">
              Deben verificarse contra el manual oficial SPM-2 antes de emitir un diagnóstico. El informe es una
              herramienta de apoyo, no un diagnóstico en sí mismo.
            </Limite>
            <Limite titulo="Aún no hay diferenciación por edad">
              El puntaje usa una tabla por formulario (rango 5–12), igual para todas las edades dentro de ese rango.
              La norma por edad específica está en desarrollo y requiere las tablas oficiales del manual.
            </Limite>
            <Limite titulo="El juicio clínico es tuyo">
              El sistema captura, puntúa y redacta un borrador. La lectura clínica, los ajustes y las indicaciones
              las decides tú.
            </Limite>
          </ul>
        </Seccion>

        {/* Datos */}
        <Seccion num="05" titulo="Datos y privacidad">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            El niño o niña se registra solo con su nombre (sin correo). El informe llega únicamente al correo del
            terapeuta que creó la evaluación.
          </p>
        </Seccion>

        <div className="mt-14 border-t border-b border-teal py-9">
          <p className="font-display italic text-petrol text-[22px] leading-snug">
            Hands-TO te devuelve el tiempo de transcribir y puntuar, para que vuelvas a lo que importa: aplicar las
            indicaciones clínicas.
          </p>
        </div>

        <p className="mt-12 font-mono text-muted text-[11px] uppercase tracking-[0.18em]">
          Diseñado por Operaria · Operaria Health · OperaHands
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

function Tramo({ color, t, d }: { color: string; t: string; d: string }) {
  return (
    <div className="flex items-start gap-3 bg-white border border-border rounded-lg px-4 py-3">
      <span className="shrink-0 mt-1.5 w-3 h-3 rounded-full" style={{ background: color }} aria-hidden />
      <div>
        <span className="font-sans font-semibold text-[16px] text-navy">{t}</span>
        <span className="text-[15px] text-body"> — {d}</span>
      </div>
    </div>
  );
}

function Limite({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <li className="bg-white border-l-[3px] border-teal rounded-r px-5 py-4">
      <p className="font-sans font-semibold text-[17px] text-navy">{titulo}</p>
      <p className="text-[15px] text-body leading-relaxed mt-1">{children}</p>
    </li>
  );
}
