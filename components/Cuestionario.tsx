"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadRespuestas, saveRespuestas, clearRespuestas } from "@/lib/storage";
import type { Respuestas, RespuestaValor } from "@/lib/types";
import { getVertical } from "@/lib/verticals";
import { slugToName, formatDate } from "@/lib/utils";
import Portada from "./Portada";
import Bloque from "./Bloque";
import SaveBar from "./SaveBar";

interface Props { cliente: string; negocio: string; verticalId: string; toName?: string; toEmail?: string }

type Status = { tone: "muted" | "teal" | "warm"; text: string };

const DEFAULT_STATUS: Status = {
  tone: "muted",
  text: "Completa a tu ritmo. Cuando termines, haz clic en Enviar.",
};

export default function Cuestionario({ cliente, negocio, verticalId, toName, toEmail }: Props) {
  const router = useRouter();
  const vertical = useMemo(() => getVertical(verticalId), [verticalId]);
  const nombre = useMemo(() => slugToName(cliente), [cliente]);
  const storageSlug = `${vertical.id}-${cliente}`;
  const [fecha, setFecha] = useState("");
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);
  const [enviando, setEnviando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [warningMensaje, setWarningMensaje] = useState<string | null>(null);

  const contenidoRef = useRef<HTMLDivElement>(null);
  const bloqueDolorRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setFecha(formatDate(new Date()));
    const data = loadRespuestas(storageSlug);
    const baseRespuestas: Respuestas = data?.respuestas ?? {};
    // Inyectar defaults (ej: hora_cierre_nocturno = "21:00") si no están seteados
    const conDefaults: Respuestas = { ...baseRespuestas };
    for (const b of vertical.bloques) {
      for (const p of b.preguntas) {
        if (p.defaultValor && conDefaults[p.id] === undefined) {
          conDefaults[p.id] = p.defaultValor;
        }
      }
    }
    setRespuestas(conDefaults);
    if (data) setSavedAt(data.savedAt);
  }, [storageSlug, vertical]);

  useEffect(() => {
    if (!dirty) return;
    setStatus({ tone: "warm", text: "Tienes cambios sin guardar" });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setStatus({ tone: "muted", text: "Guardando..." });
      const ts = saveRespuestas(storageSlug, respuestas);
      setSavedAt(ts);
      setDirty(false);
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [respuestas, dirty, storageSlug]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (Object.keys(respuestas).length > 0) {
        const ts = saveRespuestas(storageSlug, respuestas);
        setSavedAt(ts);
      }
    }, 10000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [storageSlug, respuestas]);

  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (savedAt && !dirty && !enviando) {
      const update = () => {
        const segs = Math.max(0, Math.floor((Date.now() - savedAt) / 1000));
        setStatus({ tone: "teal", text: `Guardado hace ${segs}s` });
      };
      update();
      tickRef.current = setInterval(update, 1000);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [savedAt, dirty, enviando]);

  const handleChange = (id: string, v: RespuestaValor) => {
    setRespuestas((prev) => ({ ...prev, [id]: v }));
    setDirty(true);
  };

  const comenzar = () => {
    contenidoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const dolorIds = vertical.dolorIds ?? [];
  const bloqueDolorVacio = () => {
    if (dolorIds.length === 0) return false;
    return dolorIds.every((id) => {
      const v = respuestas[id];
      if (v === undefined || v === null) return true;
      if (typeof v === "string") return v.trim() === "";
      if (typeof v === "number") return false;
      if (Array.isArray(v)) return v.length === 0;
      if (typeof v === "object" && "seleccion" in v) return v.seleccion.length === 0;
      return true;
    });
  };

  const submit = async () => {
    setEnviando(true);
    setStatus({ tone: "muted", text: "Enviando tus respuestas..." });
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente,
          nombreFormateado: nombre,
          negocio,
          vertical: vertical.id,
          respuestas,
          timestamp: new Date().toISOString(),
          toName,
          toEmail,
        }),
      });
      if (!res.ok) throw new Error("Error servidor");
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Error");
      clearRespuestas(storageSlug);
      router.push(`/gracias?cliente=${encodeURIComponent(cliente)}&v=${vertical.id}`);
    } catch {
      setStatus({ tone: "warm", text: "Error al enviar. Por favor intenta de nuevo." });
      setEnviando(false);
    }
  };

  const onEnviar = () => {
    if (vertical.validarAlEnviar) {
      const msg = vertical.validarAlEnviar(respuestas);
      if (msg) {
        setWarningMensaje(msg);
        return;
      }
    }
    if (bloqueDolorVacio()) {
      setShowModal(true);
      return;
    }
    submit();
  };

  // Identify el "dolor block" id para poder scrollear desde el modal
  const dolorBloqueId = vertical.bloques.find((b) => b.preguntas.some((p) => dolorIds.includes(p.id)))?.id;

  const temaClass =
    vertical.tema === "paraguas" ? "theme-paraguas" : vertical.tema === "health" ? "theme-health" : undefined;

  const infoHref =
    vertical.id === "spm2-hogar" ? "/que-es/papas" : vertical.id === "spm2-escolar" ? "/que-es/profes" : undefined;

  return (
    <div className={temaClass}>
      <Portada
        nombre={nombre}
        negocio={negocio}
        fecha={fecha}
        onComenzar={comenzar}
        titulo={vertical.nombreEncuesta}
        marca={vertical.marca}
        tagline={vertical.tagline}
        subtitulo={vertical.subtitulo}
        tema={vertical.tema}
        infoHref={infoHref}
      />

      <div ref={contenidoRef} id="contenido" className="bg-offwhite">
        <div className="max-w-[820px] mx-auto px-5 py-10 pb-32 sm:px-10 sm:py-16">
          {vertical.bloques.map((b) => (
            <Bloque
              key={b.id}
              bloque={b}
              respuestas={respuestas}
              onChange={handleChange}
              innerRef={b.id === dolorBloqueId ? bloqueDolorRef : undefined}
              tema={vertical.tema}
              audio={vertical.audio}
            />
          ))}

          <div className="mt-20 mb-8 py-10 border-t border-b border-teal text-center">
            <p className={`italic font-sans ${vertical.tema === "health" ? "text-petrol text-[22px] leading-relaxed" : "text-navy text-[20px]"}`}>
              {vertical.cierre ?? "¡Listos para devolverte tu tiempo!"}
            </p>
          </div>
        </div>
      </div>

      <SaveBar status={status} enviando={enviando} onEnviar={onEnviar} tema={vertical.tema} />

      {warningMensaje && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-6">
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-xl">
            <h3 className="font-sans font-bold text-navy text-[20px] mb-3">
              Falta un dato
            </h3>
            <p className="text-body text-[14px] mb-6">{warningMensaje}</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setWarningMensaje(null)}
                className="bg-teal text-white rounded-md px-4 py-2 font-sans font-semibold text-[14px]"
              >
                Volver a revisar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-6">
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-xl">
            <h3 className="font-sans font-bold text-navy text-[20px] mb-3">
              ¿Seguro quieres enviar sin responder el bloque de dolores?
            </h3>
            <p className="text-body text-[14px] mb-6">
              Es el bloque más importante para diseñar tu propuesta. Puedes seguir completándolo o enviar igual.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  bloqueDolorRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-[1.5px] border-teal text-teal rounded-md px-4 py-2 font-sans font-semibold text-[14px]"
              >
                Volver al bloque
              </button>
              <button
                onClick={() => { setShowModal(false); submit(); }}
                className="bg-teal text-white rounded-md px-4 py-2 font-sans font-semibold text-[14px]"
              >
                Enviar igual
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
