import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDiagnostico } from "@/components/PDFDiagnostico";
import { formatDate } from "@/lib/utils";
import { getVertical } from "@/lib/verticals";
import { entradaLabels, OPT_NO_TENGO_GOOGLE } from "@/lib/verticals/barber";
import { cotizarSjp, cotizacionHtml } from "@/lib/verticals/cotiza-sjp-motor";
import type { SubmitPayload, RespuestaValor, Bloque } from "@/lib/types";
import React from "react";

export const runtime = "nodejs";

function fmt(v: RespuestaValor | undefined): string {
  if (v === undefined || v === null || v === "") return "—";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "—";
    if (typeof v[0] === "string") return (v as string[]).join(", ");
    return `${v.length} elementos`;
  }
  if (typeof v === "object" && "seleccion" in v) {
    const parts = [...v.seleccion];
    if (v.otro) parts.push(`Otros: ${v.otro}`);
    return parts.join(", ");
  }
  return "—";
}

function htmlBody(p: SubmitPayload, nombreEncuesta: string, bloques: Bloque[]): string {
  const r = p.respuestas;
  const entradaEnum = (r.entrada_deseada as string | undefined) ?? "";
  const entradaLabel = entradaEnum ? (entradaLabels[entradaEnum] ?? entradaEnum) : "—";
  const requiereCreacionGoogle = r.tecnico_google_account === OPT_NO_TENGO_GOOGLE;
  let resumen: string;
  if (p.vertical === "barber") {
    resumen = `
      <p><strong style="color:#0F1E3A;">Contacto:</strong><br>${fmt(r.id_nombre)} — ${fmt(r.id_telefono)}</p>
      <p><strong style="color:#0F1E3A;">Entrada elegida:</strong> ${entradaLabel}</p>
      <p><strong style="color:#0F1E3A;">Dolor principal:</strong><br>${fmt(r.contexto_principal_dolor)}</p>
      <p><strong style="color:#0F1E3A;">Volumen diario:</strong> ${fmt(r.contexto_volumen_diario)}</p>
      <p><strong style="color:#0F1E3A;">Delegaría primero:</strong><br>${fmt(r.contexto_delegar)}</p>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:14px 0;">
      <p style="color:#1B4D4A;font-size:13px;"><strong>Setup checklist:</strong></p>
      <ul style="color:#3D4450;font-size:13px;line-height:1.6;">
        <li>WhatsApp Business: ${fmt(r.tiene_whatsapp_business)}</li>
        <li>Número WhatsApp deseado: ${fmt(r.numero_whatsapp_dedicado)}</li>
        <li>Google account: ${fmt(r.tecnico_google_account)}${requiereCreacionGoogle ? " <strong style='color:#E8A838;'>· requiere_creacion_google: TRUE</strong>" : ""}</li>
        ${entradaEnum === "barber360" ? `<li>MercadoPago: ${fmt(r.tiene_mercadopago)}</li><li>Google Business Profile: ${fmt(r.tiene_google_business_profile)}</li>` : ""}
        <li>Instagram Business: ${fmt(r.tiene_instagram_business)}</li>
        <li>Email contador: ${fmt(r.email_contador) || "—"}</li>
        <li>Hora cierre nocturno: ${fmt(r.hora_cierre_nocturno)}</li>
      </ul>`;
  } else if (p.vertical === "cindy") {
    resumen = `
      <p><strong style="color:#0F1E3A;">Para:</strong> ${p.nombreFormateado}</p>
      <p><strong style="color:#0F1E3A;">Rol:</strong><br>${fmt(r.rol)}</p>
      <p><strong style="color:#0F1E3A;">Le encantaría soltar:</strong><br>${fmt(r.soltar_tareas)}</p>
      <p><strong style="color:#0F1E3A;">Primeras 3 tareas:</strong><br>${fmt(r.soltar_detalle)}</p>
      <p><strong style="color:#0F1E3A;">Estilo / trato:</strong> ${fmt(r.trato)}</p>
      <p><strong style="color:#0F1E3A;">Nunca debe:</strong><br>${fmt(r.nunca)}</p>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:14px 0;">
      <p style="color:#1B4D4A;font-size:13px;"><strong>🧭 Qué ir a buscar:</strong></p>
      <ul style="color:#3D4450;font-size:13px;line-height:1.6;">
        <li><strong>Accesos / integraciones:</strong> ${fmt(r.herramientas)}</li>
        <li><strong>Canal preferido:</strong> ${fmt(r.canal_preferido)}</li>
        <li><strong>Correo a conectar:</strong> ${fmt(r.email)}</li>
        <li><strong>Materiales a recolectar:</strong> ${fmt(r.materiales)}</li>
      </ul>`;
  } else {
    // genérico (incluye cotiza-sjp): recorre TODAS las respuestas reales del formulario
    const filas: string[] = [];
    for (const b of bloques) {
      for (const q of b.preguntas) {
        const val = fmt(r[q.id]);
        if (val !== "—") {
          filas.push(`<p style="margin:8px 0;"><strong style="color:#0F1E3A;">${q.label ?? q.id}</strong><br>${val}</p>`);
        }
      }
    }
    resumen = filas.length ? filas.join("") : `<p style="color:#9E9C96;">(sin respuestas registradas)</p>`;
  }

  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #F2F0EB; color: #3D4450;">
    <div style="background: #0F1E3A; color: #fff; padding: 24px; border-radius: 8px 8px 0 0;">
      <div style="color: #4A9B93; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">${nombreEncuesta}</div>
      <h1 style="margin: 8px 0 0; font-size: 22px;">Diagnóstico completado</h1>
      <p style="margin: 6px 0 0; color: #4A9B93; font-size: 14px;">${p.nombreFormateado}</p>
    </div>
    <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
      ${resumen}
      <hr style="border: none; border-top: 1px solid #D6D2CB; margin: 16px 0;">
      <p style="color: #9E9C96; font-size: 12px;">PDF completo adjunto.</p>
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as SubmitPayload;
    if (!payload.cliente || !payload.respuestas) {
      return NextResponse.json({ success: false, error: "Payload inválido" }, { status: 400 });
    }

    const vertical = getVertical(payload.vertical ?? "generico");
    const fecha = formatDate(new Date(payload.timestamp || Date.now()));

    const element = React.createElement(PDFDiagnostico, {
      nombre: payload.nombreFormateado,
      fecha,
      bloques: vertical.bloques,
      respuestas: payload.respuestas,
      titulo: vertical.nombreEncuesta,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer: Buffer = await renderToBuffer(element as any);

    const subject =
      vertical.id === "web"
        ? `web-${payload.cliente}-${payload.negocio ?? "sin-negocio"}`
        : vertical.id === "cindy"
        ? `Onboarding Cindy — ${payload.nombreFormateado}`
        : `Onboarding ${vertical.id} — ${payload.nombreFormateado}`;
    let html = htmlBody(payload, vertical.nombreEncuesta, vertical.bloques);

    // Auto-cotización: la encuesta cotiza-sjp ya trae los datos estructurados,
    // así que corremos el motor oficial y sumamos el resultado al MISMO correo
    // (va a revisión interna, no directo al cliente). Si el motor falla, el
    // correo igual sale con las respuestas — no bloqueamos el submit.
    if (vertical.id === "cotiza-sjp") {
      try {
        const cotizacion = await cotizarSjp(payload.respuestas);
        html += cotizacionHtml(cotizacion);
      } catch (e) {
        console.error("auto-cotización cotiza-sjp falló:", e);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const fallback = process.env.DESTINATION_EMAIL ?? "";
    // Cada encuesta puede tener su propio correo destino; si no, cae al global.
    const to = vertical.destino ?? fallback;
    if (!apiKey || !to) {
      return NextResponse.json({ success: false, error: "Faltan variables de entorno" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const filename = `Levantamiento-${payload.negocio || payload.cliente}.pdf`;
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      attachments: [{ filename, content: pdfBuffer }],
    });
    if (error) {
      return NextResponse.json({ success: false, error: error.message ?? "Error Resend" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
