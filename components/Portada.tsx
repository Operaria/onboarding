"use client";

interface Props {
  nombre: string;
  negocio: string;
  fecha: string;
  onComenzar: () => void;
  titulo?: string;
  marca?: string;
  tagline?: string;
  subtitulo?: string;
  tema?: "flow" | "paraguas" | "health";
  infoHref?: string;
}

export default function Portada({
  nombre,
  negocio,
  fecha,
  onComenzar,
  titulo,
  marca = "Flow",
  tagline = "Manos a la ópera",
  subtitulo = "Con esta información, armamos tu operación.",
  tema = "flow",
  infoHref,
}: Props) {
  const isParaguas = tema === "paraguas";
  const isHealth = tema === "health";

  // ── Operaria Health — portada editorial (línea OperaHands) ──
  if (isHealth) {
    // "SPM-2 · Formulario del Hogar" → nombre del formulario en dos líneas Cormorant
    const partes = (titulo ?? "").split("·").map((s) => s.trim());
    const formName = partes.length > 1 ? partes.slice(1).join(" · ") : partes[0] ?? "";
    const [primera, ...resto] = formName.split(" ");

    return (
      <section
        className="relative min-h-screen flex flex-col justify-center px-7 py-20 sm:px-[9%] overflow-hidden text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-44 -right-28 w-[600px] h-[600px] rounded-full border border-offwhite/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-44 right-20 w-[380px] h-[380px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-3xl w-full">
          <div className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-9 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Operaria Health</span>
            <span className="text-offwhite/25">·</span>
            <span>OperaHands</span>
            <span className="text-offwhite/25">·</span>
            <span>{marca === "Health" ? "SPM-2" : marca}</span>
          </div>

          <h1 className="font-display font-light text-offwhite leading-[1.05] tracking-[-0.5px] text-[clamp(46px,7.5vw,88px)]">
            {primera}
            {resto.length > 0 && (
              <>
                <br />
                <em className="italic text-teal-light">{resto.join(" ")}</em>
              </>
            )}
          </h1>

          {subtitulo ? (
            <p className="font-sans font-semibold text-teal-light text-[clamp(18px,2.2vw,26px)] leading-snug tracking-[-0.3px] mt-5 max-w-2xl">
              {subtitulo}
            </p>
          ) : null}

          <p className="font-mono text-offwhite/70 text-[13px] leading-[1.9] tracking-[0.04em] max-w-xl border-l-2 border-teal-light pl-5 mt-9">
            80 preguntas en 8 áreas. Responde con calma, a tu ritmo. Para escuchar una pregunta en voz alta, toca el botón de altavoz que está a su lado.
          </p>

          {infoHref && (
            <a
              href={infoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-7 font-sans font-semibold text-teal-light text-[15px] underline underline-offset-4 decoration-teal-light/40 hover:text-offwhite transition"
            >
              ¿Qué es esto y para qué sirve? →
            </a>
          )}

          <div className="mt-12 flex flex-wrap gap-x-14 gap-y-5">
            <MetaPairHealth label="Estudiante" value={negocio} />
            <MetaPairHealth label="Responde" value={nombre} />
            <MetaPairHealth label="Fecha" value={fecha} />
          </div>

          <button
            onClick={onComenzar}
            className="mt-12 self-start bg-teal text-offwhite font-sans font-semibold text-[17px] px-12 py-4 rounded-full hover:bg-teal-light hover:text-petrol transition tracking-wide"
          >
            Comenzar
          </button>
        </div>
      </section>
    );
  }

  // ── Flow / Paraguas (encuestas comerciales) ──
  return (
    <section className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16 sm:px-10">
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        {!isParaguas && (
          <p className="font-mono text-teal text-[13px] uppercase tracking-[4px] mb-6">
            {tagline}
          </p>
        )}

        {isParaguas ? (
          <h1
            className="font-display text-offwhite text-[56px] sm:text-[88px] leading-none"
            style={{ letterSpacing: "0.08em" }}
          >
            OPERARIA<span className="text-teal">.</span>
          </h1>
        ) : (
          <h1 className="font-sans font-extrabold text-offwhite text-[48px] sm:text-[72px] leading-none tracking-[-1px]">
            Operaria <span className="text-teal">{marca}.</span>
          </h1>
        )}

        {isParaguas && (
          <p className="font-mono text-teal text-[11px] uppercase tracking-[3px] mt-3">
            {marca}
          </p>
        )}

        <hr className="border-0 border-t-[1.5px] border-teal w-[120px] my-10" />

        {isParaguas && tagline ? (
          <p className="font-mono text-teal text-[13px] uppercase tracking-[4px]">
            {tagline}
          </p>
        ) : null}

        {titulo ? (
          <h2
            className={
              isParaguas
                ? "font-display italic text-white text-[28px] sm:text-[40px] leading-tight mt-6"
                : "font-sans font-bold text-white text-[28px] sm:text-[38px] leading-tight"
            }
          >
            {titulo}
          </h2>
        ) : null}
        {subtitulo ? (
          <p className="text-teal text-[16px] mt-4 max-w-xl">{subtitulo}</p>
        ) : null}

        <div className="border-t border-petrol mt-12 pt-6 w-full flex flex-wrap justify-center gap-x-12 gap-y-4">
          <MetaPair label="Cliente" value={nombre} />
          <MetaPair label="Negocio" value={negocio} />
          <MetaPair label="Fecha" value={fecha} />
        </div>

        <button
          onClick={onComenzar}
          className="mt-14 bg-teal text-white font-sans font-semibold text-[14px] px-8 py-3 rounded-full hover:opacity-90 transition tracking-wide"
        >
          Comenzar
        </button>
      </div>
    </section>
  );
}

function MetaPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-muted text-[11px] uppercase tracking-[2px]">{label}</span>
      <span className="font-mono text-white text-[12px]">{value}</span>
    </div>
  );
}

function MetaPairHealth({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="font-mono text-teal-light text-[11px] uppercase tracking-[2px]">{label}</span>
      <span className="font-mono text-offwhite text-[14px]">{value}</span>
    </div>
  );
}
