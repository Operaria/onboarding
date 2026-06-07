"use client";

import { useState } from "react";
import { nameToSlug } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";
type InstrumentoId = "dass21" | "phq9" | "gad7" | "mdq" | "audit" | "isi" | "pcl5" | "asrs";

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

interface InstrumentoOption {
  id: InstrumentoId;
  titulo: string;
  sub: string;
  duracion: string;
  ruta: string;
  info: string;
  itemsLabel: string;
  apiName: InstrumentoId;
}

const INSTRUMENTOS: InstrumentoOption[] = [
  {
    id: "dass21",
    titulo: "DASS-21",
    sub: "Depresión, ansiedad y estrés en un solo cuestionario",
    duracion: "~5 min",
    itemsLabel: "21 ítems",
    ruta: "dass21",
    info: "/que-es/dass21",
    apiName: "dass21",
  },
  {
    id: "phq9",
    titulo: "PHQ-9",
    sub: "Tamizaje de depresión (DSM)",
    duracion: "~3 min",
    itemsLabel: "9 ítems",
    ruta: "phq9",
    info: "/que-es/phq9",
    apiName: "phq9",
  },
  {
    id: "gad7",
    titulo: "GAD-7",
    sub: "Tamizaje de ansiedad generalizada",
    duracion: "~2 min",
    itemsLabel: "7 ítems",
    ruta: "gad7",
    info: "/que-es/gad7",
    apiName: "gad7",
  },
  {
    id: "mdq",
    titulo: "MDQ",
    sub: "Tamizaje de trastorno bipolar (SOCHITAB)",
    duracion: "~5 min",
    itemsLabel: "15 ítems",
    ruta: "mdq",
    info: "/que-es/mdq",
    apiName: "mdq",
  },
  {
    id: "audit",
    titulo: "AUDIT",
    sub: "Consumo de alcohol (OMS)",
    duracion: "~3 min",
    itemsLabel: "10 ítems",
    ruta: "audit",
    info: "/que-es/audit",
    apiName: "audit",
  },
  {
    id: "isi",
    titulo: "ISI",
    sub: "Severidad del insomnio",
    duracion: "~2 min",
    itemsLabel: "7 ítems",
    ruta: "isi",
    info: "/que-es/isi",
    apiName: "isi",
  },
  {
    id: "pcl5",
    titulo: "PCL-5",
    sub: "Tamizaje de TEPT (DSM-5)",
    duracion: "~6 min",
    itemsLabel: "20 ítems",
    ruta: "pcl5",
    info: "/que-es/pcl5",
    apiName: "pcl5",
  },
  {
    id: "asrs",
    titulo: "ASRS-v1.1",
    sub: "Tamizaje de TDAH adulto (OMS)",
    duracion: "~5 min",
    itemsLabel: "18 ítems",
    ruta: "asrs",
    info: "/que-es/asrs",
    apiName: "asrs",
  },
];

export default function HandsSmLauncher() {
  const [instrumento, setInstrumento] = useState<InstrumentoId>("dass21");
  const inst = INSTRUMENTOS.find((i) => i.id === instrumento)!;

  // Paciente
  const [pacienteName, setPacienteName] = useState("");
  const [pacienteEdad, setPacienteEdad] = useState("");
  const [pacienteEmail, setPacienteEmail] = useState("");
  // Tratante
  const [tratanteName, setTratanteName] = useState("");
  const [tratanteEmail, setTratanteEmail] = useState("");
  // Distribución
  const [linkPaciente, setLinkPaciente] = useState(false);
  const [linkTratante, setLinkTratante] = useState(false);
  const [informePaciente, setInformePaciente] = useState(false);
  const [informeTratante, setInformeTratante] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [waMsg, setWaMsg] = useState("");
  const [confirmEmails, setConfirmEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState<"" | "link" | "wa">("");

  const onPacienteEmailChange = (v: string) => {
    setPacienteEmail(v);
    if (v.trim() && !linkPaciente && !linkTratante) setLinkPaciente(true);
    if (v.trim() && !informePaciente && !informeTratante) setInformePaciente(true);
  };
  const onTratanteEmailChange = (v: string) => {
    setTratanteEmail(v);
    if (v.trim() && !informeTratante && !informePaciente) setInformeTratante(true);
  };

  const informeDest = (informePaciente ? "p" : "") + (informeTratante ? "t" : "");

  const buildLink = () => {
    const origin = window.location.origin;
    const params = new URLSearchParams({ negocio: nameToSlug(pacienteName) });
    if (pacienteEdad.trim()) params.set("edad", pacienteEdad.trim());
    if (pacienteEmail.trim()) params.set("pe", pacienteEmail.trim());
    if (tratanteName.trim()) params.set("tn", tratanteName.trim());
    if (tratanteEmail.trim()) params.set("te", tratanteEmail.trim());
    if (informeDest) params.set("dest", informeDest);
    return `${origin}/${inst.ruta}/${nameToSlug(pacienteName)}?${params.toString()}`;
  };

  const submit = async () => {
    setError("");
    if (!pacienteName.trim()) {
      setError("Ingresa el nombre del paciente.");
      return;
    }
    if (!pacienteEmail.trim() && !tratanteEmail.trim()) {
      setError("Ingresa al menos un correo (paciente o tratante).");
      return;
    }
    if (pacienteEmail.trim() && !emailOk(pacienteEmail)) {
      setError("El correo del paciente no es válido.");
      return;
    }
    if (tratanteEmail.trim() && !emailOk(tratanteEmail)) {
      setError("El correo del tratante no es válido.");
      return;
    }
    if (!linkPaciente && !linkTratante) {
      setError("Elige a quién enviarle el link de la encuesta.");
      return;
    }
    if (!informePaciente && !informeTratante) {
      setError("Elige a quién enviarle el informe.");
      return;
    }
    if (linkPaciente && !emailOk(pacienteEmail)) { setError("Para enviar el link al paciente, completa su correo."); return; }
    if (linkTratante && !emailOk(tratanteEmail)) { setError("Para enviar el link al tratante, completa su correo."); return; }
    if (informePaciente && !emailOk(pacienteEmail)) { setError("Para enviar el informe al paciente, completa su correo."); return; }
    if (informeTratante && !emailOk(tratanteEmail)) { setError("Para enviar el informe al tratante, completa su correo."); return; }

    const url = buildLink();

    const recipients: { email: string; name: string; role: "paciente" | "tratante" }[] = [];
    if (linkPaciente) {
      recipients.push({ email: pacienteEmail.trim(), name: pacienteName.trim(), role: "paciente" });
    }
    if (linkTratante) {
      recipients.push({ email: tratanteEmail.trim(), name: tratanteName.trim() || "Tratante", role: "tratante" });
    }

    const mensaje =
      tratanteName.trim()
        ? `Hola ${pacienteName.trim()}, ${tratanteName.trim()} te invita a responder un breve cuestionario (${inst.titulo}). ${inst.itemsLabel}, ${inst.duracion}. Aquí está el link: ${url}`
        : `Hola ${pacienteName.trim()}, aquí está tu cuestionario ${inst.titulo}. ${inst.itemsLabel}, ${inst.duracion}: ${url}`;

    setLink(url);
    setWaMsg(mensaje);
    setStatus("sending");

    try {
      const res = await fetch("/api/enviar-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrumento: inst.apiName,
          instrumentoTitulo: inst.titulo,
          instrumentoSub: inst.sub,
          itemsLabel: inst.itemsLabel,
          duracion: inst.duracion,
          pacienteName: pacienteName.trim(),
          tratanteName: tratanteName.trim() || undefined,
          link: url,
          infoLink: `${window.location.origin}${inst.info}`,
          recipients,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "No se pudo enviar el correo.");
      setConfirmEmails(recipients.map((r) => r.email));
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
    } catch { /* noop */ }
  };

  const reset = () => {
    setPacienteName(""); setPacienteEdad(""); setPacienteEmail("");
    setTratanteName(""); setTratanteEmail("");
    setLinkPaciente(false); setLinkTratante(false);
    setInformePaciente(false); setInformeTratante(false);
    setStatus("idle"); setError(""); setLink(""); setWaMsg("");
    setConfirmEmails([]); setCopied("");
  };

  return (
    <main className="theme-health min-h-screen bg-offwhite flex flex-col">
      <header
        className="relative overflow-hidden px-6 pt-12 pb-10 sm:px-10 text-offwhite"
        style={{ background: "linear-gradient(165deg, #1B4D4A 0%, #2A6B66 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-28 -right-20 w-[340px] h-[340px] rounded-full border border-teal-light/20" />
        <div className="relative z-[2] max-w-xl mx-auto w-full">
          <p className="font-mono text-teal-light text-[11px] uppercase tracking-[0.2em] mb-4">
            Operaria Health · Hands-SM
          </p>
          <h1 className="font-display font-light text-offwhite leading-[1.05] text-[clamp(34px,7vw,52px)]">
            Nueva <em className="italic text-teal-light">evaluación</em>
          </h1>
          <p className="font-sans text-offwhite/75 text-[16px] mt-3 max-w-md leading-relaxed">
            Elige el instrumento, ingresa los datos y decide a quién va el link y a quién va el informe.
          </p>
        </div>
      </header>

      <div className="max-w-xl mx-auto w-full px-6 sm:px-10 py-10 pb-24">
        {status === "sent" ? (
          <SentCard
            instrumento={inst.titulo}
            emails={confirmEmails}
            link={link}
            waMsg={waMsg}
            informeDest={informeDest}
            tratanteEmail={tratanteEmail.trim()}
            pacienteEmail={pacienteEmail.trim()}
            copied={copied}
            onCopyLink={() => copy(link, "link")}
            onCopyWa={() => copy(waMsg, "wa")}
            onReset={reset}
          />
        ) : (
          <>
            <Label>Instrumento</Label>
            <div className="space-y-2.5 mb-2">
              {INSTRUMENTOS.map((i) => {
                const active = instrumento === i.id;
                return (
                  <div key={i.id}>
                    <InstrumentoCard
                      inst={i}
                      active={active}
                      onClick={() => setInstrumento(i.id)}
                    />
                    {active && (
                      <a
                        href={i.info}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 ml-1 font-sans font-semibold text-teal text-[13px] underline underline-offset-4 decoration-teal/40 hover:text-petrol transition"
                      >
                        ¿Qué es {i.titulo}? →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-border my-8" />

            <Label>Paciente</Label>
            <Input value={pacienteName} onChange={setPacienteName} placeholder="Nombre del paciente" autoCapitalize="words" />
            <Input
              value={pacienteEdad}
              onChange={(v) => setPacienteEdad(v.replace(/[^0-9]/g, "").slice(0, 3))}
              placeholder="Edad en años (opcional)"
              type="number"
              className="mt-3"
            />
            <Input value={pacienteEmail} onChange={onPacienteEmailChange} placeholder="Correo del paciente (opcional)" type="email" className="mt-3" />

            <div className="h-px bg-border my-8" />

            <Label>
              Tratante <span className="text-muted normal-case tracking-normal font-sans font-normal text-[12px]">(opcional)</span>
            </Label>
            <Input value={tratanteName} onChange={setTratanteName} placeholder="Nombre del tratante" autoCapitalize="words" />
            <Input value={tratanteEmail} onChange={onTratanteEmailChange} placeholder="Correo del tratante" type="email" className="mt-3" />
            <p className="text-[13px] text-muted mt-2">
              Si es una autoevaluación sin tratante, deja esta sección en blanco.
            </p>

            <div className="h-px bg-border my-8" />

            <Label>Distribución</Label>

            <div className="mb-5">
              <p className="font-sans text-body text-[14px] font-semibold mb-2">¿A quién le mandamos el link de la encuesta?</p>
              <CheckRow checked={linkPaciente} onChange={setLinkPaciente} label="Al paciente" disabled={!pacienteEmail.trim()} hint={!pacienteEmail.trim() ? "Falta el correo del paciente" : undefined} />
              <CheckRow checked={linkTratante} onChange={setLinkTratante} label="Al tratante" disabled={!tratanteEmail.trim()} hint={!tratanteEmail.trim() ? "Falta el correo del tratante" : undefined} />
            </div>

            <div>
              <p className="font-sans text-body text-[14px] font-semibold mb-2">¿A quién le llega el informe (PDF)?</p>
              <CheckRow checked={informePaciente} onChange={setInformePaciente} label="Al paciente" disabled={!pacienteEmail.trim()} hint={!pacienteEmail.trim() ? "Falta el correo del paciente" : undefined} />
              <CheckRow checked={informeTratante} onChange={setInformeTratante} label="Al tratante" disabled={!tratanteEmail.trim()} hint={!tratanteEmail.trim() ? "Falta el correo del tratante" : undefined} />
            </div>

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
              Mandamos el link por correo a quien marcaste. También podrás copiarlo para WhatsApp.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function InstrumentoCard({
  inst, active, onClick,
}: {
  inst: InstrumentoOption; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full flex items-start gap-4 text-left px-5 py-4 rounded-xl border-2 transition ${
        active ? "border-petrol bg-teal/[0.10]" : "border-border bg-white hover:border-teal/50"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className={`font-sans font-semibold text-[18px] ${active ? "text-petrol" : "text-navy"}`}>
            {inst.titulo}
          </span>
          <span className="font-mono text-muted text-[11px] uppercase tracking-[2px]">{inst.itemsLabel} · {inst.duracion}</span>
        </div>
        <span className="block text-[14px] text-body mt-1 leading-snug">{inst.sub}</span>
      </div>
      <span
        className={`mt-1 inline-block w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          active ? "border-petrol bg-petrol" : "border-border"
        }`}
        aria-hidden
      />
    </button>
  );
}

function SentCard({
  instrumento, emails, link, waMsg, informeDest, pacienteEmail, tratanteEmail, copied, onCopyLink, onCopyWa, onReset,
}: {
  instrumento: string; emails: string[]; link: string; waMsg: string;
  informeDest: string; pacienteEmail: string; tratanteEmail: string;
  copied: "" | "link" | "wa";
  onCopyLink: () => void; onCopyWa: () => void; onReset: () => void;
}) {
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;
  const informeA: string[] = [];
  if (informeDest.includes("p") && pacienteEmail) informeA.push(pacienteEmail);
  if (informeDest.includes("t") && tratanteEmail) informeA.push(tratanteEmail);

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-full bg-teal text-offwhite flex items-center justify-center text-[20px]">✓</span>
        <h2 className="font-display italic text-petrol text-[30px] leading-none">¡Enviado!</h2>
      </div>
      <p className="text-[16px] text-body leading-relaxed mt-3">
        Mandamos el link del <strong className="text-petrol">{instrumento}</strong> a{" "}
        {emails.map((e, i) => (
          <span key={e}>
            <strong className="text-navy">{e}</strong>
            {i < emails.length - 1 ? (i === emails.length - 2 ? " y " : ", ") : ""}
          </span>
        ))}
        . También puedes compartirlo por WhatsApp:
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a href={waHref} target="_blank" rel="noreferrer" className="w-full text-center bg-teal text-offwhite font-sans font-semibold text-[16px] px-6 py-3.5 rounded-full hover:bg-petrol transition">
          Abrir WhatsApp con el mensaje
        </a>
        <button onClick={onCopyWa} className="w-full border-[1.5px] border-teal text-petrol font-sans font-semibold text-[15px] px-6 py-3 rounded-full hover:bg-teal/[0.08] transition">
          {copied === "wa" ? "Mensaje copiado ✓" : "Copiar mensaje de WhatsApp"}
        </button>
        <button onClick={onCopyLink} className="w-full border-[1.5px] border-border text-body font-sans font-medium text-[15px] px-6 py-3 rounded-full hover:border-teal transition">
          {copied === "link" ? "Link copiado ✓" : "Copiar solo el link"}
        </button>
      </div>

      <p className="mt-5 text-[12px] text-muted font-mono break-all bg-white border border-border rounded-lg px-4 py-3">
        {link}
      </p>

      {informeA.length > 0 && (
        <p className="mt-4 text-[13px] text-muted">
          Cuando el paciente termine, el informe llegará a{" "}
          {informeA.map((e, i) => (
            <span key={e}>
              <strong className="text-petrol">{e}</strong>
              {i < informeA.length - 1 ? (i === informeA.length - 2 ? " y " : ", ") : ""}
            </span>
          ))}
          .
        </p>
      )}

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

function CheckRow({
  checked, onChange, label, disabled, hint,
}: {
  checked: boolean; onChange: (v: boolean) => void;
  label: string; disabled?: boolean; hint?: string;
}) {
  return (
    <label className={`flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-lg cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-teal/[0.06]"}`}>
      <input
        type="checkbox"
        checked={checked && !disabled}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className="mt-1 w-[18px] h-[18px] accent-teal"
      />
      <span className="flex-1">
        <span className="font-sans text-body text-[15px]">{label}</span>
        {hint && <span className="block font-sans text-muted text-[12px] mt-0.5">{hint}</span>}
      </span>
    </label>
  );
}
