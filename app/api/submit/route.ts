import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDiagnostico } from "@/components/PDFDiagnostico";
import { PDFSpm2Report } from "@/components/PDFSpm2Report";
import { formatDate } from "@/lib/utils";
import { getVertical } from "@/lib/verticals";
import { entradaLabels, OPT_NO_TENGO_GOOGLE } from "@/lib/verticals/barber";
import { calculateSpm2Scores, classificationLabelEs } from "@/lib/spm2";
import type { FormType } from "@/lib/spm2";
import type { SubmitPayload, RespuestaValor } from "@/lib/types";
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

function htmlBody(p: SubmitPayload, nombreEncuesta: string): string {
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
    resumen = `
      <p><strong style="color:#0F1E3A;">Nombre / cargo:</strong><br>${fmt(r.p1)}</p>
      <p><strong style="color:#0F1E3A;">Rubro:</strong><br>${fmt(r.p2)}</p>
      <p><strong style="color:#0F1E3A;">Dolor principal:</strong><br>${fmt(r.p6)}</p>
      <p><strong style="color:#0F1E3A;">Nivel de impacto (1-10):</strong> ${fmt(r.p20)}</p>
      <p><strong style="color:#0F1E3A;">Mejor forma de contacto:</strong><br>${fmt(r.p21)}</p>`;
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
    const isSpm2 = vertical.id === "spm2-hogar" || vertical.id === "spm2-escolar";

    let pdfBuffer: Buffer;
    let subject: string;
    let html: string;

    if (isSpm2) {
      // ── SPM-2: scoring + reporte clínico ──
      const formType: FormType = vertical.id === "spm2-hogar" ? "hogar" : "escolar";
      const prefix = formType === "hogar" ? "h" : "e";
      const result = calculateSpm2Scores(payload.respuestas, formType, prefix);

      const element = React.createElement(PDFSpm2Report, {
        nombre: payload.nombreFormateado,
        estudiante: payload.negocio || "—",
        fecha,
        result,
        edad: payload.edad,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);

      const formLabel = formType === "hogar" ? "HOGAR" : "ESCOLAR";
      subject = `SPM-2 ${formLabel} — ${payload.negocio || payload.nombreFormateado}`;
      html = spm2HtmlBody(payload, result, formLabel);
    } else {
      // ── Flujo original (diagnóstico/onboarding) ──
      const element = React.createElement(PDFDiagnostico, {
        nombre: payload.nombreFormateado,
        fecha,
        bloques: vertical.bloques,
        respuestas: payload.respuestas,
        titulo: vertical.nombreEncuesta,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);

      subject =
        vertical.id === "web"
          ? `web-${payload.cliente}-${payload.negocio ?? "sin-negocio"}`
          : vertical.id === "cindy"
          ? `Onboarding Cindy — ${payload.nombreFormateado}`
          : `Onboarding ${vertical.id} — ${payload.nombreFormateado}`;
      html = htmlBody(payload, vertical.nombreEncuesta);
    }

    const apiKey = process.env.RESEND_API_KEY;
    // SPM-2: el informe va al correo del TO ingresado en el lanzador (fallback al correo fijo).
    const isValidEmail = (e?: string) => !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const to = isSpm2 && isValidEmail(payload.toEmail) ? payload.toEmail! : process.env.DESTINATION_EMAIL;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    if (!apiKey || !to) {
      return NextResponse.json({ success: false, error: "Faltan variables de entorno" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const filename = isSpm2
      ? `SPM2-${vertical.id === "spm2-hogar" ? "Hogar" : "Escolar"}-${payload.negocio || payload.cliente}.pdf`
      : `Levantamiento-${payload.negocio || payload.cliente}.pdf`;
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      attachments: [
        {
          filename,
          content: pdfBuffer,
        },
      ],
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

// ─── Email HTML para resultados SPM-2 ───────────────────────────────────────

import type { Spm2Result } from "@/lib/spm2";

function spm2HtmlBody(p: SubmitPayload, result: Spm2Result, formLabel: string): string {
  const areasHtml = result.areaScores.map((s) => {
    const color = s.classification === "typical" ? "#4A9B93"
      : s.classification === "some_problems" ? "#E8A838"
      : "#C0392B";
    return `<tr>
      <td style="padding:6px 12px;border-bottom:1px solid #D6D2CB;font-size:13px;">${s.area.nameEs}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #D6D2CB;font-family:monospace;font-size:13px;text-align:center;">${s.rawScore}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #D6D2CB;font-family:monospace;font-size:13px;text-align:center;">${s.tScore}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #D6D2CB;font-size:12px;color:${color};font-weight:600;">${classificationLabelEs(s.classification)}</td>
    </tr>`;
  }).join("");

  const totalColor = result.sensoryTotal.classification === "typical" ? "#4A9B93"
    : result.sensoryTotal.classification === "some_problems" ? "#E8A838"
    : "#C0392B";

  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F2F0EB; color: #3D4450;">
    <div style="background: #1B4D4A; color: #fff; padding: 24px; border-radius: 8px 8px 0 0;">
      <div style="color: #4A9B93; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">SPM-2 · ${formLabel}</div>
      <h1 style="margin: 8px 0 0; font-size: 20px;">Resultados Procesamiento Sensorial</h1>
      <p style="margin: 6px 0 0; color: #4A9B93; font-size: 14px;">Estudiante: ${p.negocio || p.nombreFormateado}</p>
      <p style="margin: 4px 0 0; color: rgba(242,240,235,.6); font-size: 13px;">Respondió: ${p.nombreFormateado} (${result.respondentType})</p>
    </div>
    <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr style="background:#0F1E3A;color:#fff;">
            <th style="padding:8px 12px;text-align:left;font-size:12px;">Área</th>
            <th style="padding:8px 12px;text-align:center;font-size:12px;">PB</th>
            <th style="padding:8px 12px;text-align:center;font-size:12px;">T-Score</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;">Clasificación</th>
          </tr>
        </thead>
        <tbody>${areasHtml}</tbody>
        <tfoot>
          <tr style="background:#F2F0EB;font-weight:700;">
            <td style="padding:8px 12px;font-size:13px;">TOTAL SENSORIAL</td>
            <td style="padding:8px 12px;font-family:monospace;text-align:center;font-size:13px;">${result.sensoryTotal.rawScore}</td>
            <td style="padding:8px 12px;font-family:monospace;text-align:center;font-size:13px;">${result.sensoryTotal.tScore}</td>
            <td style="padding:8px 12px;font-size:12px;color:${totalColor};font-weight:700;">${classificationLabelEs(result.sensoryTotal.classification)}</td>
          </tr>
        </tfoot>
      </table>
      <hr style="border: none; border-top: 1px solid #D6D2CB; margin: 16px 0;">
      <p style="color: #9E9C96; font-size: 12px;">Reporte PDF completo adjunto con interpretación clínica por área.</p>
    </div>
  </div>`;
}
