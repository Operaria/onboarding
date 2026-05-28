"use client";

import { useState } from "react";
import { nameToSlug } from "@/lib/utils";

type FormType = "hogar" | "escolar";
type Status = "idle" | "sending" | "sent" | "error";

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

export default function HandsToLauncher() {
  const [formType, setFormType] = useState<FormType>("hogar");
  const [childName, setChildName] = useState("");
  const [respName, setRespName] = useState("");
  const [respEmail, setRespEmail] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [waMsg, setWaMsg] = useState("");
  const [copied, setCopied] = useState<"" | "link" | "wa">("");

  const respLabel = formType === "hogar" ? "Papá, mamá o cuidador/a" : "Profesor/a o educador/a";

  const buildLink = () => {
    const origin = window.location.origin;
    const path = formType === "hogar" ? "spm2-hogar" : "spm2-escolar";
    const params = new URLSearchParams({
      negocio: nameToSlug(childName),
      ton: toName.trim(),
      toe: toEmail.trim(),
    });
    return `${origin}/${path}/${nameToSlug(respName)}?${params.toString()}`;
  };

  const submit = async () => {
    setError("");
    if (!childName.trim() || !respName.trim() || !toName.trim()) {
      setError("Completa los nombres del niño/a, de quien responde y del terapeuta.");
      return;
    }
    if (!emailOk(respEmail)) {
      setError("El correo de quien responde no es válido.");
      return;
    }
    if (!emailOk(toEmail)) {
      setError("Tu correo (terapeuta) no es válido.");
      return;
    }

    const url = buildLink();
    const origin = window.location.origin;
    const infoLink = `${origin}/que-es/${formType === "hogar" ? "papas" : "profes"}`;
    const mensaje = `Hola ${respName.trim()}, soy ${toName.trim()} (terapeuta ocupacional). Te invito a responder una breve evaluación sobre ${childName.trim()}. Son preguntas cortas y no hay respuestas buenas ni malas — incluso puedes escuchar cada pregunta. Aquí está: ${url}`;
    setLink(url);
    setWaMsg(mensaje);
    setStatus("sending");

    try {
      const res = await fetch("/api/enviar-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          childName: childName.trim(),
          respondentName: respName.trim(),
          respondentEmail: respEmail.trim(),
          toName: toName.trim(),
          link: url,
          infoLink,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "No se pudo enviar el correo.");
      setStatus("sent");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar.");
      setStatus("error");
    }
  };

  const copy = async (text: string, which: "link" | "wa") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      /* noop */
    }
  };

  const reset = () => {
    setChildName(""); setRespName(""); setRespEmail(""); setToName(""); setToEmail("");
    setStatus("idle"); setError(""); setLink(""); setWaMsg(""); setCopied("");
  };

  return (
    <main className="theme-health min-h-screen bg-offwhite flex flex-col">
      {/* Cabecera petrol */}
      <header
        className="relative overflow-hidden px-6 pt-12 pb-10 sm:px-10 text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-28 -right-20 w-[340px] h-[340px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-xl mx-auto w-full">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-4">
            Operaria Health · OperaHands · Hands-TO
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] text-[clamp(34px,7vw,52px)]">
            Nueva <em className="italic text-teal-light">evaluación</em>
          </h1>
          <p className="font-sans text-offwhite/75 text-[16px] mt-3 max-w-md leading-relaxed">
            Ingresa los datos y enviamos el link de la encuesta. El informe llega solo a tu correo.
          </p>
        </div>
      </header>

      <div className="max-w-xl mx-auto w-full px-6 sm:px-10 py-10 pb-24">
        {status === "sent" ? (
          <SentCard
            email={respEmail.trim()}
            link={link}
            waMsg={waMsg}
            copied={copied}
            onCopyLink={() => copy(link, "link")}
            onCopyWa={() => copy(waMsg, "wa")}
            onReset={reset}
          />
        ) : (
          <>
            {/* Tipo de formulario */}
            <Label>Formulario</Label>
            <div className="grid grid-cols-2 gap-3 mb-1">
              <TypeButton active={formType === "hogar"} onClick={() => setFormType("hogar")} titulo="Hogar" sub="Responde la familia" />
              <TypeButton active={formType === "escolar"} onClick={() => setFormType("escolar")} titulo="Escolar" sub="Responde el/la profe" />
            </div>

            <div className="h-px bg-border my-8" />

            <Label>Niño o niña evaluado/a</Label>
            <Input value={childName} onChange={setChildName} placeholder="Nombre del niño o niña" autoCapitalize="words" />

            <div className="h-px bg-border my-8" />

            <Label>{respLabel} — quien responde</Label>
            <Input value={respName} onChange={setRespName} placeholder="Nombre" autoCapitalize="words" />
            <Input value={respEmail} onChange={setRespEmail} placeholder="Correo electrónico" type="email" className="mt-3" />

            <div className="h-px bg-border my-8" />

            <Label>Terapeuta ocupacional (tú)</Label>
            <Input value={toName} onChange={setToName} placeholder="Tu nombre" autoCapitalize="words" />
            <Input value={toEmail} onChange={setToEmail} placeholder="Tu correo (recibe el informe)" type="email" className="mt-3" />

            {error && (
              <p className="mt-6 text-[15px] text-[#C0392B] bg-[#C0392B]/[0.07] border-l-[3px] border-[#C0392B] px-4 py-3 rounded-r">
                {error}
              </p>
            )}

            <button
              onClick={submit}
              disabled={status === "sending"}
              className="mt-8 w-full bg-teal text-offwhite font-sans font-semibold text-[17px] px-8 py-4 rounded-full hover:bg-petrol transition disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar invitación"}
            </button>
            <p className="mt-4 text-[13px] text-muted text-center">
              Enviaremos el link por correo a quien responde. También podrás copiarlo para WhatsApp.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function SentCard({
  email, link, waMsg, copied, onCopyLink, onCopyWa, onReset,
}: {
  email: string; link: string; waMsg: string; copied: "" | "link" | "wa";
  onCopyLink: () => void; onCopyWa: () => void; onReset: () => void;
}) {
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-full bg-teal text-offwhite flex items-center justify-center text-[20px]">✓</span>
        <h2 className="font-display italic text-petrol text-[30px] leading-none">¡Enviado!</h2>
      </div>
      <p className="text-[16px] text-body leading-relaxed mt-3">
        Mandamos el link de la encuesta por correo a <strong className="text-navy">{email}</strong>.
        También puedes compartirlo por WhatsApp:
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center bg-teal text-offwhite font-sans font-semibold text-[16px] px-6 py-3.5 rounded-full hover:bg-petrol transition"
        >
          Abrir WhatsApp con el mensaje
        </a>
        <button
          onClick={onCopyWa}
          className="w-full border-[1.5px] border-teal text-petrol font-sans font-semibold text-[15px] px-6 py-3 rounded-full hover:bg-teal/[0.08] transition"
        >
          {copied === "wa" ? "Mensaje copiado ✓" : "Copiar mensaje de WhatsApp"}
        </button>
        <button
          onClick={onCopyLink}
          className="w-full border-[1.5px] border-border text-body font-sans font-medium text-[15px] px-6 py-3 rounded-full hover:border-teal transition"
        >
          {copied === "link" ? "Link copiado ✓" : "Copiar solo el link"}
        </button>
      </div>

      <p className="mt-5 text-[12px] text-muted font-mono break-all bg-white border border-border rounded-lg px-4 py-3">
        {link}
      </p>

      <button onClick={onReset} className="mt-8 text-teal font-sans font-semibold text-[15px] underline underline-offset-4">
        + Nueva evaluación
      </button>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-petrol text-[12px] uppercase tracking-[2px] mb-3">{children}</p>;
}

function Input({
  value, onChange, placeholder, type = "text", autoCapitalize, className = "",
}: {
  value: string; onChange: (v: string) => void; placeholder: string;
  type?: string; autoCapitalize?: string; className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      autoComplete={type === "email" ? "email" : "off"}
      className={`w-full font-sans text-[17px] text-body bg-white border border-border rounded-xl px-4 py-3.5 outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15 transition ${className}`}
    />
  );
}

function TypeButton({
  active, onClick, titulo, sub,
}: {
  active: boolean; onClick: () => void; titulo: string; sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-start text-left px-5 py-4 rounded-xl border-2 transition ${
        active ? "border-petrol bg-teal/[0.12]" : "border-border bg-white hover:border-teal/50"
      }`}
    >
      <span className={`font-sans font-semibold text-[18px] ${active ? "text-petrol" : "text-navy"}`}>{titulo}</span>
      <span className="text-[13px] text-muted mt-0.5">{sub}</span>
    </button>
  );
}
