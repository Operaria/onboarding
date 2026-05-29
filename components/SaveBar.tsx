"use client";

interface Props {
  status: { tone: "muted" | "teal" | "warm"; text: string };
  enviando: boolean;
  onEnviar: () => void;
  tema?: "flow" | "paraguas" | "health";
  enviarLabel?: string;
}

export default function SaveBar({ status, enviando, onEnviar, tema, enviarLabel }: Props) {
  const isHealth = tema === "health";
  const toneClass =
    status.tone === "teal" ? "text-teal-light" : status.tone === "warm" ? "text-warm" : "text-offwhite/60";
  const barBg = isHealth ? "bg-petrol" : "bg-navy";
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${barBg} px-6 py-3.5 flex items-center justify-between z-[999] shadow-[0_-2px_12px_rgba(0,0,0,.2)] flex-wrap gap-3`}>
      <span className={`font-mono ${isHealth ? "text-[13px]" : "text-[12px]"} ${isHealth ? toneClass : status.tone === "teal" ? "text-teal" : status.tone === "warm" ? "text-warm" : "text-muted"}`}>
        {status.text}
      </span>
      <div className="flex gap-3">
        <button
          onClick={onEnviar}
          disabled={enviando}
          className={`bg-teal text-offwhite rounded-md font-sans font-semibold disabled:opacity-60 transition ${
            isHealth ? "px-7 py-3 text-[16px] hover:bg-teal-light hover:text-petrol" : "px-5 py-2.5 text-[14px] hover:opacity-90"
          }`}
        >
          {enviando ? "Enviando..." : (enviarLabel ?? "Enviar encuesta")}
        </button>
      </div>
    </div>
  );
}
