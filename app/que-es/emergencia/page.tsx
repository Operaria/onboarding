import { RECURSOS_CHILE } from "@/lib/alerta-suicidio";

export const metadata = {
  title: "Si necesitas ayuda ahora — Operaria Health",
  description: "Números de emergencia en Chile para crisis emocional, ideación suicida o riesgo vital. Salud Responde, *4141, SAMU.",
};

export default function EmergenciaPage() {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      <header
        className="relative overflow-hidden px-7 pt-14 pb-12 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full border border-teal-light/15" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-6">
            Operaria Health · Si necesitas ayuda ahora
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] text-[clamp(36px,6vw,60px)]">
            No estás <em className="italic text-teal-light">solo o sola.</em>
          </h1>
          <p className="font-sans text-offwhite/80 text-[18px] leading-relaxed mt-5 max-w-xl">
            Si estás en crisis o tienes pensamientos de hacerte daño, llama a uno
            de estos números. Son <strong>gratuitos y atienden 24/7</strong>.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-12 pb-24">
        <div className="space-y-4 mb-12">
          {RECURSOS_CHILE.map((r) => (
            <a
              key={r.numero}
              href={r.href}
              className="block bg-white border-2 border-border hover:border-petrol rounded-2xl px-6 py-5 transition"
            >
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="font-sans font-semibold text-navy text-[19px]">{r.nombre}</span>
                <span className="font-mono text-petrol text-[24px] font-bold tracking-wider">{r.numero}</span>
              </div>
              <p className="font-sans text-body text-[15px] mt-2 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="font-display italic text-petrol text-[clamp(26px,4.5vw,36px)] leading-tight mb-5">
            Si la situación es de urgencia
          </h2>
          <p className="font-sans text-body text-[17px] leading-relaxed mb-4">
            Si sientes que puedes hacerte daño <strong>ahora mismo</strong>, llama al{" "}
            <a href="tel:131" className="text-petrol font-semibold underline underline-offset-4">131 (SAMU)</a>{" "}
            o ve a la urgencia más cercana, acompañado o acompañada si puedes.
          </p>
          <p className="font-sans text-body text-[17px] leading-relaxed">
            También puedes llamar a alguien de confianza para que esté contigo
            mientras llega ayuda. No tienes que explicar nada todavía — solo
            decir <em>«necesito que vengas».</em>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display italic text-petrol text-[clamp(26px,4.5vw,36px)] leading-tight mb-5">
            Lo que hicimos con tu respuesta
          </h2>
          <p className="font-sans text-body text-[17px] leading-relaxed mb-4">
            Marcaste un ítem que indica ideación de autoagresión. Eso es importante
            y queremos que sepas dos cosas:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block w-2 h-2 rounded-full bg-petrol flex-shrink-0" />
              <span className="font-sans text-body text-[17px] leading-relaxed">
                Tu respuesta queda registrada en el informe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block w-2 h-2 rounded-full bg-petrol flex-shrink-0" />
              <span className="font-sans text-body text-[17px] leading-relaxed">
                Si hay un tratante en la distribución, recibirá una alerta destacada
                junto al informe para que pueda contactarte.
              </span>
            </li>
          </ul>
        </section>

        <div className="border-t border-border pt-8">
          <p className="font-mono text-muted text-[11px] uppercase tracking-[2px]">
            Diseñado por Operaria · operaria.cl
          </p>
        </div>
      </div>
    </main>
  );
}
