const PASOS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Abres la evaluación", d: "Desde el lanzador ingresas a la persona evaluada y tu correo, y abres el formulario en el dispositivo." },
  { n: "02", t: "La aplicas", d: "Observas a la persona y puntúas cada actividad de 1 (más apoyo) a 7 (más autonomía), durante la sesión." },
  { n: "03", t: "Ves el resultado al instante", d: "Al terminar se calculan el total y los subtotales motor y cognitivo, en pantalla, sin esperar correos." },
  { n: "04", t: "Interpretas tú", d: "El resultado es un apoyo. La lectura clínica y las decisiones las pones tú." },
];

export default function InfoFim() {
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
          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(40px,7vw,68px)]">
            Cómo funciona la evaluación de <em className="italic text-teal-light">independencia funcional.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-6 max-w-xl">
            Es una evaluación que aplicas tú, en la sesión, y te devuelve el resultado al instante. Aquí, en simple,
            cómo opera y qué tener en cuenta.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-16 pb-24">
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

        <Seccion num="02" titulo="Qué mide">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed mb-4">
            La independencia en las actividades de la vida diaria, en dos dominios: uno <strong className="text-petrol">motor</strong> (autocuidado,
            transferencias, desplazamiento) y uno <strong className="text-petrol">cognitivo</strong> (comunicación, interacción, resolución de
            problemas, memoria). En la escala, mientras más alto el puntaje, más autonomía.
          </p>
        </Seccion>

        <Seccion num="03" titulo="¿Para qué sirve?">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            Para establecer una línea base, medir el cambio antes y después de la intervención, y comunicar el
            progreso de forma objetiva — al equipo, a la familia y a quien financia la terapia.
          </p>
        </Seccion>

        <Seccion num="04" titulo="Importante — lo que debes tener en cuenta">
          <ul className="flex flex-col gap-4">
            <Limite titulo="Chasis de prueba">
              Por ahora los ítems y la escala son genéricos, para pilotear el flujo. Bajo licencia se reemplazan por
              el contenido oficial del instrumento (UDSMR).
            </Limite>
            <Limite titulo="Es un apoyo, no un diagnóstico">
              El resultado orienta; no constituye un diagnóstico por sí solo ni reemplaza tu evaluación clínica.
            </Limite>
            <Limite titulo="El juicio clínico es tuyo">
              El sistema captura, suma y muestra el resultado. La interpretación y las decisiones las decides tú.
            </Limite>
          </ul>
        </Seccion>

        <Seccion num="05" titulo="Datos y privacidad">
          <p className="text-[17px] sm:text-[18px] text-body leading-relaxed">
            La persona evaluada se registra solo con su nombre y edad. Tú aplicas la evaluación y el resultado queda
            contigo, en tu dispositivo.
          </p>
        </Seccion>

        <div className="mt-14 border-t border-b border-teal py-9">
          <p className="font-display italic text-petrol text-[22px] leading-snug">
            Menos tiempo sumando y transcribiendo, más tiempo atendiendo.
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

function Limite({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <li className="bg-white border-l-[3px] border-teal rounded-r px-5 py-4">
      <p className="font-sans font-semibold text-[17px] text-navy">{titulo}</p>
      <p className="text-[15px] text-body leading-relaxed mt-1">{children}</p>
    </li>
  );
}
