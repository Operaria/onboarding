"use client";

import type { Bloque as B, Respuestas, RespuestaValor } from "@/lib/types";
import { debeMostrar } from "@/lib/condicional";
import Pregunta from "./Pregunta";

interface Props {
  bloque: B;
  respuestas: Respuestas;
  onChange: (id: string, v: RespuestaValor) => void;
  innerRef?: React.Ref<HTMLDivElement>;
  tema?: "flow" | "paraguas" | "health";
  audio?: boolean;
}

export default function Bloque({ bloque, respuestas, onChange, innerRef, tema, audio }: Props) {
  const isHealth = tema === "health";

  if (isHealth) {
    return (
      <section ref={innerRef} className="mt-20">
        <p className="font-mono text-teal text-[12px] uppercase tracking-[3px] mb-3">
          Área {String(bloque.id + 1).padStart(2, "0")}
        </p>
        <h1 className="font-sans font-semibold text-[30px] sm:text-[34px] text-petrol leading-tight border-b-2 border-teal pb-3">
          {bloque.titulo}
        </h1>
        {bloque.intro && (
          <p className="font-display italic font-normal text-[22px] sm:text-[24px] leading-snug text-navy/70 mt-7 max-w-2xl">
            {bloque.intro}
          </p>
        )}
        {bloque.subtitulo && (
          <p className="font-mono text-petrol text-[12px] uppercase tracking-[2px] mt-8 mb-1">
            {bloque.subtitulo}
          </p>
        )}
        {bloque.preguntas.map((p) =>
          debeMostrar(p.mostrarSi, respuestas) ? (
            <Pregunta
              key={p.id}
              pregunta={p}
              valor={respuestas[p.id]}
              respuestas={respuestas}
              onChange={(v) => onChange(p.id, v)}
              tema={tema}
              audio={audio}
            />
          ) : null
        )}
      </section>
    );
  }

  return (
    <section ref={innerRef} className="mt-14">
      <h1 className="font-sans font-bold text-[26px] text-navy mt-14 mb-5 border-b-2 border-teal pb-2">
        {bloque.titulo}
      </h1>
      <h2 className="font-sans font-semibold text-[18px] text-petrol mt-7 mb-2.5">
        {bloque.subtitulo}
      </h2>
      {bloque.intro && (
        <div className="bg-white border-l-[3px] border-teal p-6 my-10 text-[15px]">
          <strong className="text-navy">{bloque.intro}</strong>
        </div>
      )}
      {bloque.preguntas.map((p) =>
        debeMostrar(p.mostrarSi, respuestas) ? (
          <Pregunta
            key={p.id}
            pregunta={p}
            valor={respuestas[p.id]}
            respuestas={respuestas}
            onChange={(v) => onChange(p.id, v)}
            tema={tema}
            audio={audio}
          />
        ) : null
      )}
    </section>
  );
}
