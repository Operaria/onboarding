"use client";

import type { FimResult } from "@/lib/fim";

interface Props {
  result: FimResult;
  nombre: string; // terapeuta que aplica
  negocio: string; // persona evaluada
  fecha: string;
  edad?: string;
}

function pct(valor: number, min: number, max: number) {
  return Math.max(0, Math.min(100, Math.round(((valor - min) / (max - min)) * 100)));
}

function Barra({ label, valor, min, max }: { label: string; valor: number; min: number; max: number }) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <span className="font-sans font-semibold text-[17px] text-navy">{label}</span>
        <span className="font-mono text-petrol text-[20px]">
          {valor}
          <span className="text-muted text-[13px]"> / {max}</span>
        </span>
      </div>
      <div className="h-3 rounded-full bg-navy/[0.08] overflow-hidden">
        <div className="h-full rounded-full bg-petrol" style={{ width: `${pct(valor, min, max)}%` }} />
      </div>
      <div className="flex justify-between mt-1.5 font-mono text-[10px] text-muted uppercase tracking-wider">
        <span>{min} · más apoyo</span>
        <span>{max} · más autonomía</span>
      </div>
    </div>
  );
}

export default function FimResultado({ result, nombre, negocio, fecha, edad }: Props) {
  return (
    <main className="theme-health min-h-screen bg-offwhite">
      {/* Hero petrol con el total */}
      <header
        className="relative overflow-hidden px-7 pt-14 pb-16 sm:px-[9%] text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-offwhite/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-16 w-[340px] h-[340px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-2xl">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-7">
            Operaria Health · FIM · Resultado
          </p>

          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10">
            <Meta label="Persona evaluada" value={negocio} />
            {edad ? <Meta label="Edad" value={`${edad} años`} /> : null}
            <Meta label="Aplicó" value={nombre} />
            <Meta label="Fecha" value={fecha} />
          </div>

          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.18em] mb-2">
            Independencia funcional · total
          </p>
          <div className="font-display font-light leading-none text-offwhite text-[clamp(72px,16vw,140px)]">
            {result.total}
            <span className="text-teal-light text-[clamp(28px,5vw,44px)]"> / 126</span>
          </div>
          <div className="mt-6 max-w-md h-2.5 rounded-full bg-offwhite/15 overflow-hidden">
            <div className="h-full rounded-full bg-teal-light" style={{ width: `${pct(result.total, 18, 126)}%` }} />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-14 pb-24">
        <p className="font-mono text-teal text-[12px] uppercase tracking-[3px] mb-6">Subtotales</p>
        <div className="flex flex-col gap-9">
          <Barra label="Dominio motor" valor={result.motor} min={13} max={91} />
          <Barra label="Dominio cognitivo" valor={result.cognitivo} min={5} max={35} />
        </div>

        <p className="font-display italic text-petrol text-[20px] leading-snug mt-12 border-t border-b border-teal py-7">
          Mayor puntaje, mayor independencia. El o la terapeuta interpreta el resultado con su juicio clínico.
        </p>

        <p className="text-[13px] text-muted mt-6">
          Chasis de prueba: ítems genéricos y escala 1–7 sin los descriptores oficiales. Bajo licencia se
          reemplazan por el contenido oficial de la FIM (UDSMR).
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/hands-to"
            className="bg-teal text-offwhite font-sans font-semibold text-[16px] px-8 py-3.5 rounded-full hover:bg-petrol transition"
          >
            Nueva evaluación
          </a>
          <button
            onClick={() => window.print()}
            className="border-[1.5px] border-teal text-petrol font-sans font-semibold text-[15px] px-7 py-3 rounded-full hover:bg-teal/[0.08] transition"
          >
            Imprimir / Guardar PDF
          </button>
        </div>

        <p className="mt-12 font-mono text-muted text-[11px] uppercase tracking-[0.18em]">
          Diseñado por Operaria · Operaria Health · OperaHands
        </p>
      </div>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="font-mono text-teal-light text-[11px] uppercase tracking-[2px]">{label}</span>
      <span className="font-mono text-offwhite text-[14px]">{value}</span>
    </div>
  );
}
