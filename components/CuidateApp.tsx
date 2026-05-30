"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PREGUNTAS, consejosDe, type Respuestas } from "@/lib/cuidate/preguntas";

type Estado = "intro" | "preg" | "resultado";

export default function CuidateApp() {
  const [estado, setEstado] = useState<Estado>("intro");
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [modalEmer, setModalEmer] = useState(false);

  const pregunta = PREGUNTAS[idx];
  const seleccionada = pregunta ? respuestas[pregunta.id] : undefined;
  const consejos = estado === "resultado" ? consejosDe(respuestas) : [];

  function elegir(id: string, v: string) {
    setRespuestas((r) => ({ ...r, [id]: v }));
  }
  function siguiente() {
    if (idx < PREGUNTAS.length - 1) {
      setIdx(idx + 1);
    } else {
      setEstado("resultado");
    }
  }
  function atras() {
    if (idx > 0) setIdx(idx - 1);
  }
  function iniciar() {
    setIdx(0);
    setEstado("preg");
  }
  function reiniciar() {
    setRespuestas({});
    setIdx(0);
    setEstado("intro");
  }

  return (
    <div className="theme-cuidate cuidate-root">
      {estado === "intro" && (
        <div className="hero-bg" aria-hidden>
          <Image
            src="/cuidate-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div className="hero-veil" />
        </div>
      )}

      <div className="cuidate-wrap">
        <header className="cuidate-top">
          <div className="cuidate-brand">Operaria · cuídate</div>
          <div className="cuidate-progress">
            {estado === "preg" && `${idx + 1} de ${PREGUNTAS.length}`}
            {estado === "resultado" && "Resultado"}
          </div>
        </header>

        {estado === "intro" && (
          <>
            <IntroCard onStart={iniciar} onSkip={() => alert(textoSkip)} />
            <TipsHub />
          </>
        )}

        {estado === "preg" && pregunta && (
          <PreguntaCard
            pregunta={pregunta}
            seleccionada={seleccionada}
            onElegir={elegir}
            onSiguiente={siguiente}
            onAtras={atras}
            esUltima={idx === PREGUNTAS.length - 1}
            puedeVolver={idx > 0}
          />
        )}

        {estado === "resultado" && (
          <ResultadoCard
            consejos={consejos}
            onLeerGuia={() => alert(textoSkip)}
            onReiniciar={reiniciar}
          />
        )}

        <footer className="cuidate-foot">
          <a href="/cuidate/datos" className="foot-link">
            Política de uso de datos
          </a>
          <em>Diseñado por Operaria</em>
        </footer>
      </div>

      <button
        type="button"
        className="cuidate-emer"
        aria-label="Tengo una urgencia"
        onClick={() => setModalEmer(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="16.5" x2="12" y2="16.51" />
        </svg>
        Tengo una urgencia
      </button>

      {modalEmer && <EmergencyModal onClose={() => setModalEmer(false)} />}

      <style jsx>{`
        .cuidate-root {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          background:
            radial-gradient(ellipse at 30% 0%, rgba(255, 92, 138, 0.18), transparent 50%),
            radial-gradient(ellipse at 100% 80%, rgba(74, 155, 147, 0.14), transparent 55%),
            radial-gradient(ellipse at 0% 100%, rgba(232, 184, 114, 0.08), transparent 50%),
            linear-gradient(180deg, var(--cuidate-noche-deep) 0%, var(--cuidate-noche) 50%, var(--cuidate-noche-deep) 100%);
          background-attachment: fixed;
          color: var(--cuidate-offwhite);
          font-family: var(--font-jakarta), "Plus Jakarta Sans", system-ui, sans-serif;
          line-height: 1.55;
          padding: 32px 22px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(13, 7, 25, 0.20) 0%,
            rgba(13, 7, 25, 0.55) 60%,
            var(--cuidate-noche-deep) 100%
          );
          pointer-events: none;
        }
        .cuidate-wrap {
          position: relative;
          z-index: 1;
        }
        .cuidate-top {
          position: relative;
          z-index: 1;
        }
        .cuidate-wrap {
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cuidate-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 8px;
          opacity: 0.88;
        }
        .cuidate-brand {
          font-family: var(--font-dm-mono), "DM Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(242, 232, 224, 0.62);
        }
        .cuidate-progress {
          font-family: var(--font-dm-mono), "DM Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: rgba(242, 232, 224, 0.48);
        }
        .cuidate-foot {
          text-align: center;
          font-family: var(--font-dm-mono), "DM Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(242, 232, 224, 0.42);
          margin-top: 20px;
          padding: 18px 0;
        }
        .cuidate-foot em {
          display: block;
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: none;
          color: rgba(232, 184, 114, 0.55);
          margin-top: 8px;
        }
        .foot-link {
          color: rgba(242, 232, 224, 0.62);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          text-decoration-color: rgba(242, 232, 224, 0.25);
          transition: color 0.18s, text-decoration-color 0.18s;
        }
        .foot-link:hover {
          color: var(--cuidate-offwhite);
          text-decoration-color: var(--cuidate-magenta);
        }
        .cuidate-emer {
          position: fixed;
          top: 22px;
          right: 22px;
          bottom: auto;
          left: auto;
          transform: none;
          background: rgba(192, 57, 43, 0.35);
          color: #fff;
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 22px;
          border-radius: 999px;
          border: 1px solid rgba(255, 130, 110, 0.55);
          backdrop-filter: blur(22px) saturate(170%);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          box-shadow:
            0 14px 36px rgba(192, 57, 43, 0.30),
            inset 0 1px 0 rgba(255, 255, 255, 0.30);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          z-index: 10;
          letter-spacing: 0.02em;
          animation: pulseSoft 4s ease-in-out infinite;
        }
        .cuidate-emer:active {
          transform: scale(0.97);
        }
        @keyframes pulseSoft {
          0%, 100% {
            box-shadow:
              0 14px 36px rgba(192, 57, 43, 0.30),
              inset 0 1px 0 rgba(255, 255, 255, 0.30);
          }
          50% {
            box-shadow:
              0 18px 44px rgba(192, 57, 43, 0.50),
              inset 0 1px 0 rgba(255, 255, 255, 0.40);
          }
        }
      `}</style>
    </div>
  );
}

const textoSkip =
  "Pronto: la guía completa con técnica segura, riesgos, derivaciones chilenas. Estamos construyéndola con una ONG amiga.";

/* ─────────────────────────  TIPS HUB  ───────────────────────── */
const TIPS = [
  {
    href: "/cuidate/hidratacion",
    titulo: "Toma agua",
    frase: "Mucha. No olvides.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2.5s-6 7-6 11.5a6 6 0 0 0 12 0c0-4.5-6-11.5-6-11.5z" />
      </svg>
    ),
  },
  {
    href: "/cuidate/prep",
    titulo: "PrEP / TARV",
    frase: "Lo importante es estar sano e intransmisible — 1 pastilla al día.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="9" width="18" height="6" rx="3" />
        <line x1="12" y1="9" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    href: "/cuidate/material",
    titulo: "No compartas",
    frase: "Jeringa, agua, filtro — nada.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
      </svg>
    ),
  },
  {
    href: "/cuidate/red",
    titulo: "Cuéntale a alguien",
    frase: "Aunque sea una sola persona.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/cuidate/post",
    titulo: "Cómo enfrentar el post",
    frase: "El bajón también se cuida.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

function TipsHub() {
  return (
    <section className="tips">
      <div className="tips-head">
        <div className="tips-eyebrow">Cómo bajar el riesgo</div>
        <h3 className="tips-title">Lo que sí podemos decirte.</h3>
      </div>

      <div className="tips-grid">
        {TIPS.map((t) => (
          <Link key={t.href} href={t.href} className="tip">
            <div className="tip-icon">{t.icon}</div>
            <div className="tip-body">
              <h4>{t.titulo}</h4>
              <p>{t.frase}</p>
            </div>
            <svg className="tip-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .tips {
          margin-top: 28px;
          max-width: 520px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .tips-head {
          padding: 0 6px 14px;
          text-align: center;
        }
        .tips-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--cuidate-dorado);
          margin-bottom: 6px;
        }
        .tips-title {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          line-height: 1.2;
          color: var(--cuidate-offwhite);
          margin: 0;
          letter-spacing: 0.005em;
        }
        .tips-grid {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 16px;
        }
        .tip {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-radius: 14px;
          color: var(--cuidate-offwhite);
          text-decoration: none;
          transition:
            background 0.18s,
            border-color 0.18s,
            transform 0.12s;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }
        .tip:hover {
          background: rgba(255, 92, 138, 0.10);
          border-color: rgba(255, 92, 138, 0.32);
        }
        .tip:active {
          transform: scale(0.99);
        }
        .tip-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(232, 184, 114, 0.14);
          border: 1px solid rgba(232, 184, 114, 0.28);
          border-radius: 10px;
          color: var(--cuidate-dorado);
        }
        .tip-body {
          flex: 1;
          min-width: 0;
        }
        .tip-body h4 {
          font-family: var(--font-syne), sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--cuidate-offwhite);
          margin: 0 0 1px;
          letter-spacing: -0.005em;
        }
        .tip-body p {
          font-size: 12.5px;
          color: rgba(242, 232, 224, 0.72);
          margin: 0;
          line-height: 1.35;
        }
        .tip-arrow {
          flex-shrink: 0;
          color: rgba(242, 232, 224, 0.45);
          transition: color 0.18s, transform 0.18s;
        }
        .tip:hover .tip-arrow {
          color: var(--cuidate-magenta);
          transform: translateX(2px);
        }
        @media (max-width: 420px) {
          .tips-title {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────  INTRO  ───────────────────────── */
function IntroCard({ onStart, onSkip }: { onStart: () => void; onSkip: () => void }) {
  return (
    <div className="card intro-card">
      <h1>¿Quieres saber más?</h1>
      <p className="reply">Nosotros te contamos.</p>

      <div className="promise">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <p>No te pediremos ningún dato.</p>
      </div>

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onStart}>
          Quiero responder
        </button>
        <button type="button" className="btn btn-ghost" onClick={onSkip}>
          Prefiero solo mirar
        </button>
      </div>

      <style jsx>{cardStyles}</style>
      <style jsx>{`
        .intro-card {
          padding: 18px 20px 16px;
          margin-top: 68vh;
          max-width: 460px;
          width: calc(100% - 16px);
          margin-left: auto;
          margin-right: auto;
        }
        .intro-card :global(h1) {
          font-size: 30px;
          line-height: 1.08;
          margin-bottom: 4px;
        }
        .intro-card :global(p.reply) {
          font-size: 16px;
          margin-bottom: 12px;
        }
        .intro-card :global(.promise) {
          padding: 10px 12px;
          gap: 8px;
        }
        .intro-card :global(.promise p) {
          font-size: 12.5px;
          line-height: 1.4;
        }
        .intro-card :global(.promise svg) {
          width: 16px;
          height: 16px;
        }
        .intro-card :global(.btn) {
          padding: 11px 16px;
          font-size: 13.5px;
        }
        .intro-card :global(.actions) {
          margin-top: 14px;
          gap: 8px;
        }
        @media (max-width: 420px) {
          .intro-card {
            padding: 16px 18px 14px;
            margin-top: 60vh;
          }
          .intro-card :global(h1) {
            font-size: 26px;
          }
          .intro-card :global(p.reply) {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────  PREGUNTA  ───────────────────────── */
function PreguntaCard({
  pregunta,
  seleccionada,
  onElegir,
  onSiguiente,
  onAtras,
  esUltima,
  puedeVolver,
}: {
  pregunta: (typeof PREGUNTAS)[number];
  seleccionada?: string;
  onElegir: (id: string, v: string) => void;
  onSiguiente: () => void;
  onAtras: () => void;
  esUltima: boolean;
  puedeVolver: boolean;
}) {
  return (
    <div className="card card-padded">
      <div className="eyebrow">{`Pregunta`}</div>
      <h2>{pregunta.txt}</h2>
      {pregunta.sub && <p className="fine">{pregunta.sub}</p>}

      <div className="opts">
        {pregunta.opts.map((o) => (
          <button
            key={o.v}
            type="button"
            className={`opt ${seleccionada === o.v ? "sel" : ""}`}
            onClick={() => onElegir(pregunta.id, o.v)}
          >
            <span className="dot" />
            <span>{o.t}</span>
          </button>
        ))}
      </div>

      <div className="actions">
        {puedeVolver && (
          <button type="button" className="btn btn-ghost" onClick={onAtras}>
            Atrás
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          disabled={!seleccionada}
          onClick={onSiguiente}
        >
          {esUltima ? "Ver mis consejos" : "Siguiente"}
        </button>
      </div>

      <style jsx>{cardStyles}</style>
    </div>
  );
}

/* ─────────────────────────  RESULTADO  ───────────────────────── */
function ResultadoCard({
  consejos,
  onLeerGuia,
  onReiniciar,
}: {
  consejos: ReturnType<typeof consejosDe>;
  onLeerGuia: () => void;
  onReiniciar: () => void;
}) {
  return (
    <div className="card card-padded">
      <div className="eyebrow">Tu consejo, hecho para ti</div>
      <h1>Lo que te haría bien saber ahora.</h1>
      <p>
        Estos consejos vienen de cómo respondiste tú. No son una receta — son
        lo más útil que podemos decirte con lo poco que sabemos.
      </p>

      <div className="recs">
        {consejos.map((c, i) => (
          <div key={i} className={`rec ${c.clase}`}>
            <span className="tag">{c.tag}</span>
            <p>{c.txt}</p>
          </div>
        ))}
      </div>

      <div className="actions vertical">
        <button type="button" className="btn btn-primary" onClick={onLeerGuia}>
          Leer la guía completa
        </button>
        <button type="button" className="btn btn-ghost" onClick={onReiniciar}>
          Volver a hacer las preguntas
        </button>
      </div>

      <p className="fine center mt-md">
        Si volviste, las respuestas ya no están. Es así por diseño.
      </p>

      <style jsx>{cardStyles}</style>
    </div>
  );
}

/* ─────────────────────────  MODAL EMERGENCIA  ───────────────────────── */
function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <h3>
          <span className="dot-rojo" />
          Si hay sobredosis
        </h3>
        <ol>
          <li>
            <strong>No lo dejes solo.</strong> Mantén la calma. Llama ayuda
            mientras lo cuidas.
          </li>
          <li>
            Ponlo de costado (posición de seguridad) para que no se ahogue si
            vomita.
          </li>
          <li>Revisa que respire. Si no respira, RCP.</li>
          <li>Si tienen naloxona (Narcan), aplícala. Si no, llama ya.</li>
          <li>
            Cuenta a quien atiende qué sustancias usó. No te juzga, te ayuda.
          </li>
        </ol>
        <a className="call-link" href="tel:6003607777">
          Salud Responde — 600 360 7777
          <span>24 horas · todo Chile · gratis · confidencial</span>
        </a>
        <button type="button" className="close" onClick={onClose}>
          Volver
        </button>
      </div>

      <style jsx>{`
        .modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(8, 18, 16, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 50;
        }
        .modal {
          background: #160f0e;
          border: 1px solid rgba(192, 57, 43, 0.4);
          border-radius: 22px;
          max-width: 480px;
          width: 100%;
          padding: 28px 24px;
          animation: fadeUp 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .modal h3 {
          font-size: 20px;
          color: #fff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-syne), sans-serif;
        }
        .dot-rojo {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--cuidate-rojo-emer);
          box-shadow: 0 0 12px var(--cuidate-rojo-emer);
        }
        .modal ol {
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: rgba(255, 255, 255, 0.84);
          font-size: 15px;
          margin: 14px 0 18px;
        }
        .call-link {
          display: block;
          text-align: center;
          background: var(--cuidate-rojo-emer);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          padding: 14px;
          border-radius: 14px;
          font-size: 17px;
          letter-spacing: 0.02em;
          margin-top: 8px;
          font-family: var(--font-syne), sans-serif;
        }
        .call-link span {
          display: block;
          font-size: 11px;
          font-weight: 500;
          font-family: var(--font-dm-mono), monospace;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 4px;
          opacity: 0.85;
        }
        .close {
          margin-top: 12px;
          width: 100%;
          background: transparent;
          color: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 12px;
          border-radius: 14px;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────  ESTILOS COMUNES DE CARD  ───────────────────────── */
const cardStyles = `
  .card {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 24px;
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    box-shadow:
      0 16px 56px rgba(13, 7, 25, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.30),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06);
    animation: fadeUp 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
    overflow: hidden;
  }
  .card-padded {
    padding: 32px 26px 30px;
  }
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .eyebrow {
    font-family: var(--font-dm-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cuidate-magenta);
    margin-bottom: 14px;
  }
  h1 {
    font-family: var(--font-cormorant), serif;
    font-style: italic;
    font-weight: 500;
    font-size: 56px;
    line-height: 1.05;
    color: var(--cuidate-offwhite);
    letter-spacing: 0.005em;
    margin-bottom: 10px;
    text-align: center;
  }
  p.subhead {
    font-family: var(--font-syne), sans-serif;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 500;
    color: var(--cuidate-magenta);
    margin-bottom: 14px;
    letter-spacing: 0.005em;
  }
  p.reply {
    font-family: var(--font-cormorant), serif;
    font-style: italic;
    font-weight: 400;
    font-size: 26px;
    line-height: 1.25;
    color: var(--cuidate-magenta);
    text-align: center;
    margin-top: 2px;
    margin-bottom: 18px;
    letter-spacing: 0.01em;
  }
  h2 {
    font-family: var(--font-syne), sans-serif;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 600;
    color: var(--cuidate-offwhite);
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }
  p {
    font-size: 16px;
    color: rgba(242, 232, 224, 0.84);
    margin-bottom: 14px;
  }
  p.lead {
    font-size: 17px;
    color: rgba(242, 232, 224, 0.92);
  }
  p.fine {
    font-size: 13px;
    color: rgba(242, 232, 224, 0.6);
    line-height: 1.5;
  }
  p.center {
    text-align: center;
  }
  p.mt-md {
    margin-top: 18px;
  }
  .promise {
    margin-top: 6px;
    padding: 16px 18px;
    background: rgba(74, 155, 147, 0.1);
    border: 1px solid rgba(74, 155, 147, 0.28);
    border-radius: 14px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .promise :global(svg) {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--cuidate-petrol-light);
  }
  .promise p {
    margin: 0;
    font-size: 14px;
    color: rgba(242, 232, 224, 0.88);
  }
  .opts {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 18px;
  }
  .opt {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--cuidate-offwhite);
    font-family: var(--font-syne), sans-serif;
    font-size: 15.5px;
    font-weight: 500;
    text-align: left;
    padding: 16px 18px;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, transform 0.12s;
    width: 100%;
  }
  .opt:hover {
    background: rgba(255, 92, 138, 0.08);
    border-color: rgba(255, 92, 138, 0.32);
  }
  .opt:active {
    transform: scale(0.985);
  }
  .opt .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(242, 232, 224, 0.38);
    flex-shrink: 0;
    transition: all 0.18s;
  }
  .opt.sel {
    background: rgba(255, 92, 138, 0.14);
    border-color: var(--cuidate-magenta);
  }
  .opt.sel .dot {
    background: var(--cuidate-magenta);
    border-color: var(--cuidate-magenta);
    box-shadow: 0 0 0 4px rgba(255, 92, 138, 0.22);
  }
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .actions.vertical {
    flex-direction: column;
  }
  .btn {
    flex: 1;
    font-family: var(--font-syne), sans-serif;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 20px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: opacity 0.18s, transform 0.12s, background 0.18s;
    letter-spacing: 0.005em;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-primary {
    background: rgba(232, 184, 114, 0.30);
    color: var(--cuidate-offwhite);
    border: 1px solid rgba(232, 184, 114, 0.55);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 8px 24px rgba(232, 184, 114, 0.20);
  }
  .btn-primary:hover {
    background: rgba(232, 184, 114, 0.42);
    border-color: rgba(232, 184, 114, 0.80);
  }
  .btn-primary:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .btn-ghost {
    background: rgba(232, 184, 114, 0.10);
    color: rgba(242, 232, 224, 0.85);
    border: 1px solid rgba(232, 184, 114, 0.28);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10);
  }
  .btn-ghost:hover {
    background: rgba(232, 184, 114, 0.18);
    color: var(--cuidate-offwhite);
    border-color: rgba(232, 184, 114, 0.50);
  }
  .recs {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 18px;
  }
  .rec {
    padding: 16px 18px;
    background: rgba(255, 92, 138, 0.07);
    border-left: 3px solid var(--cuidate-magenta);
    border-radius: 0 14px 14px 0;
  }
  .rec.calm {
    background: rgba(74, 155, 147, 0.1);
    border-left-color: var(--cuidate-petrol-light);
  }
  .rec.peso {
    background: rgba(232, 184, 114, 0.08);
    border-left-color: var(--cuidate-dorado);
  }
  .rec .tag {
    font-family: var(--font-dm-mono), monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cuidate-magenta);
    display: block;
    margin-bottom: 4px;
  }
  .rec.calm .tag {
    color: var(--cuidate-petrol-light);
  }
  .rec.peso .tag {
    color: var(--cuidate-dorado);
  }
  .rec p {
    font-size: 15px;
    margin: 0;
    color: rgba(242, 232, 224, 0.92);
  }
  @media (max-width: 420px) {
    h1 {
      font-size: 44px;
    }
    p.subhead {
      font-size: 16px;
    }
    p.reply {
      font-size: 22px;
    }
    h2 {
      font-size: 19px;
    }
  }
`;
