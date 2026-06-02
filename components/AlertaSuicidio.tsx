"use client";

import { RECURSOS_CHILE } from "@/lib/alerta-suicidio";
import type { AlertaSuicidio } from "@/lib/alerta-suicidio";

interface Props {
  alerta: AlertaSuicidio;
  onContinuar: () => void;
}

/** Modal no descartable que aparece cuando el paciente marca el ítem 9 del PHQ-9
 *  (u otros instrumentos en el futuro). El paciente puede continuar enviando
 *  la encuesta —no bloqueamos, porque bloquear deja al tratante sin enterarse—
 *  pero antes ve los recursos de emergencia. */
export default function AlertaSuicidioModal({ alerta, onContinuar }: Props) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-5 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alerta-titulo"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="bg-[#C0392B] text-white px-6 py-5">
          <p className="font-mono text-white/70 text-[11px] uppercase tracking-[2.5px] mb-1">
            Antes de continuar
          </p>
          <h2 id="alerta-titulo" className="font-sans font-semibold text-[22px] leading-tight">
            Veo que respondiste algo importante.
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="font-sans text-body text-[16px] leading-relaxed mb-3">
            No quiero que sigas con esto solo o sola. Lo que estás sintiendo merece
            atención ahora — no en unos días.
          </p>
          <p className="font-sans text-body text-[16px] leading-relaxed mb-5">
            Llama a alguno de estos números <strong>gratis y en cualquier momento</strong>:
          </p>

          <div className="space-y-3 mb-6">
            {RECURSOS_CHILE.map((r) => (
              <a
                key={r.numero}
                href={r.href}
                className="block border-2 border-[#C0392B]/20 hover:border-[#C0392B] rounded-xl px-4 py-3 transition"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-sans font-semibold text-navy text-[17px]">{r.nombre}</span>
                  <span className="font-mono text-[#C0392B] text-[18px] font-bold tracking-wider">{r.numero}</span>
                </div>
                <p className="font-sans text-muted text-[13px] mt-1 leading-snug">{r.desc}</p>
              </a>
            ))}
          </div>

          <p className="font-sans text-body text-[14px] leading-relaxed mb-5 bg-[#F2F0EB] border-l-[3px] border-petrol px-4 py-3 rounded-r">
            Si tu situación es de urgencia o sientes que puedes hacerte daño{" "}
            <strong>ahora mismo</strong>, llama al <strong>131</strong> (SAMU) o ve
            a la urgencia más cercana acompañado o acompañada.
          </p>

          <button
            onClick={onContinuar}
            className="w-full bg-petrol text-offwhite font-sans font-semibold text-[16px] px-6 py-3.5 rounded-full hover:bg-navy transition"
          >
            Seguir con la encuesta
          </button>
          <p className="font-sans text-muted text-[12px] text-center mt-3 leading-relaxed">
            Tu respuesta queda registrada y tu tratante será avisado.
          </p>
        </div>
      </div>
    </div>
  );
}
