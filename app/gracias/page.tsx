import { getVertical } from "@/lib/verticals";

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const vertical = getVertical(v ?? "generico");
  const tema = vertical.tema ?? "flow";
  const cierre = vertical.cierre?.trim();

  // Cindy mantiene su mensaje propio (familia, paleta cálida self).
  if (vertical.id === "cindy") {
    return (
      <main className="theme-health theme-self min-h-screen bg-[var(--color-petrol)] flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
          Operaria · Familia
        </p>
        <h1 className="font-display italic text-offwhite text-[clamp(40px,7vw,64px)] leading-none">
          Gracias.
        </h1>
        <p className="text-offwhite/85 text-[17px] mt-7 max-w-xl leading-relaxed">
          {cierre ?? "Con esto armamos a Cindy a tu medida. Bienvenida — qué lindo tenerte."}
        </p>
        <p className="font-mono text-teal-light/60 text-[11px] mt-16 uppercase tracking-[0.18em]">
          Hecho con cariño por la Familia Operaria
        </p>
      </main>
    );
  }

  if (tema === "health") {
    return (
      <main
        className="theme-health relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-44 -right-28 w-[600px] h-[600px] rounded-full border border-offwhite/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-44 right-20 w-[380px] h-[380px] rounded-full border border-teal-light/20" />
        <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7 relative z-[2]">
          Operaria Health
        </p>
        <h1 className="font-display font-light italic text-offwhite text-[clamp(48px,8vw,76px)] leading-none relative z-[2]">
          Gracias.
        </h1>
        <p className="text-offwhite/85 text-[18px] mt-7 max-w-xl leading-relaxed relative z-[2]">
          {cierre ?? "Recibimos las respuestas."}
        </p>
        <p className="font-mono text-teal-light/60 text-[11px] mt-16 uppercase tracking-[0.18em] relative z-[2]">
          Inteligencia · Operación · Salud
        </p>
      </main>
    );
  }

  if (tema === "paraguas") {
    return (
      <main className="theme-paraguas min-h-screen bg-offwhite flex flex-col items-center justify-center px-6 py-16 text-center text-body">
        <p className="font-mono text-[var(--color-teal)] text-[11px] uppercase tracking-[0.2em] mb-7">
          {vertical.marca ? `Operaria · ${vertical.marca}` : "Operaria"}
        </p>
        <h1 className="font-display italic text-[var(--color-navy)] text-[clamp(44px,7vw,68px)] leading-none">
          Gracias.
        </h1>
        <p className="text-body/85 text-[18px] mt-7 max-w-xl leading-relaxed">
          {cierre ?? "Recibimos tus respuestas."}
        </p>
        <p className="font-mono text-muted text-[11px] mt-16 uppercase tracking-[0.18em]">
          Diseñado por Operaria
        </p>
      </main>
    );
  }

  // Flow / fallback
  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-sans font-bold text-offwhite text-[36px] sm:text-[48px] leading-tight">
        ¡Listo!
      </h1>
      <p className="text-teal text-[16px] mt-6 max-w-xl">
        {cierre ?? "¡Con esto nos ponemos manos a la ópera para encender tu operación!"}
      </p>
      <p className="font-mono text-muted text-[12px] mt-16 uppercase tracking-[3px]">
        Operaria Flow · Manos a la ópera
      </p>
    </main>
  );
}
