import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDiagnostico } from "@/components/PDFDiagnostico";
import { PDFSpm2Report } from "@/components/PDFSpm2Report";
import { PDFMdqReport } from "@/components/PDFMdqReport";
import { PDFPhq9Report } from "@/components/PDFPhq9Report";
import { PDFGad7Report } from "@/components/PDFGad7Report";
import { PDFDass21Report } from "@/components/PDFDass21Report";
import { PDFAuditReport } from "@/components/PDFAuditReport";
import { PDFIsiReport } from "@/components/PDFIsiReport";
import { PDFPcl5Report } from "@/components/PDFPcl5Report";
import { PDFAsrsReport } from "@/components/PDFAsrsReport";
import { formatDate } from "@/lib/utils";
import { getVertical } from "@/lib/verticals";
import { entradaLabels, OPT_NO_TENGO_GOOGLE } from "@/lib/verticals/barber";
import { calculateSpm2Scores, classificationLabelEs } from "@/lib/spm2";
import type { FormType } from "@/lib/spm2";
import { calculateMdqScore, clasificacionLabelEs as mdqClasifLabelEs } from "@/lib/mdq";
import type { MdqResult } from "@/lib/mdq";
import { calculatePhq9Score, phq9BandaLabel } from "@/lib/phq9";
import type { Phq9Result } from "@/lib/phq9";
import { calculateGad7Score, gad7BandaLabel } from "@/lib/gad7";
import type { Gad7Result } from "@/lib/gad7";
import { calculateDass21Score, dass21BandaLabel, dass21SubescalaLabel } from "@/lib/dass21";
import type { Dass21Result } from "@/lib/dass21";
import { calculateAuditScore, auditZonaLabel } from "@/lib/audit";
import type { AuditResult } from "@/lib/audit";
import { calculateIsiScore, isiBandaLabel } from "@/lib/isi";
import type { IsiResult } from "@/lib/isi";
import { calculatePcl5Score, pcl5SeveridadLabel } from "@/lib/pcl5";
import type { Pcl5Result } from "@/lib/pcl5";
import { calculateAsrsScore, asrsTamizajeLabel } from "@/lib/asrs";
import type { AsrsResult } from "@/lib/asrs";
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
    const isMdq = vertical.id === "mdq";
    const isPhq9 = vertical.id === "phq9";
    const isGad7 = vertical.id === "gad7";
    const isDass21 = vertical.id === "dass21";
    const isAudit = vertical.id === "audit";
    const isIsi = vertical.id === "isi";
    const isPcl5 = vertical.id === "pcl5";
    const isAsrs = vertical.id === "asrs";
    const isHandsSm = isMdq || isPhq9 || isGad7 || isDass21 || isAudit || isIsi || isPcl5 || isAsrs;

    let pdfBuffer: Buffer;
    let subject: string;
    let html: string;
    let mdqResultForEmail: MdqResult | null = null;
    let phq9ResultForEmail: Phq9Result | null = null;

    if (isPhq9) {
      // ── PHQ-9: scoring 0–27 + alerta ítem 9 ──
      const result = calculatePhq9Score(payload.respuestas);
      phq9ResultForEmail = result;
      const element = React.createElement(PDFPhq9Report, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      const alertaTag = result.ideacionSuicida ? " · ALERTA ítem 9" : "";
      subject = `PHQ-9 ${result.totalScore}/27 (${phq9BandaLabel(result.banda)}) — ${payload.nombreFormateado}${alertaTag}`;
      html = phq9HtmlBody(payload, result);
    } else if (isGad7) {
      const result = calculateGad7Score(payload.respuestas);
      const element = React.createElement(PDFGad7Report, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      subject = `GAD-7 ${result.totalScore}/21 (${gad7BandaLabel(result.banda)}) — ${payload.nombreFormateado}`;
      html = gad7HtmlBody(payload, result);
    } else if (isDass21) {
      const result = calculateDass21Score(payload.respuestas);
      const element = React.createElement(PDFDass21Report, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      subject = `DASS-21 D:${result.depresion.score} A:${result.ansiedad.score} S:${result.estres.score} — ${payload.nombreFormateado}`;
      html = dass21HtmlBody(payload, result);
    } else if (isAudit) {
      const result = calculateAuditScore(payload.respuestas);
      const element = React.createElement(PDFAuditReport, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      subject = `AUDIT ${result.totalScore}/40 (${auditZonaLabel(result.zona)}) — ${payload.nombreFormateado}`;
      html = auditHtmlBody(payload, result);
    } else if (isIsi) {
      const result = calculateIsiScore(payload.respuestas);
      const element = React.createElement(PDFIsiReport, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      subject = `ISI ${result.totalScore}/28 (${isiBandaLabel(result.banda)}) — ${payload.nombreFormateado}`;
      html = isiHtmlBody(payload, result);
    } else if (isPcl5) {
      const result = calculatePcl5Score(payload.respuestas);
      const element = React.createElement(PDFPcl5Report, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
        respuestas: payload.respuestas,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      const positivoTag = result.cortePositivo ? " · ≥33" : "";
      const dxTag = result.diagnosticoProvisorio ? " · DSM-5 cumple" : "";
      subject = `PCL-5 ${result.totalScore}/80 (${pcl5SeveridadLabel(result.severidad)}) — ${payload.nombreFormateado}${positivoTag}${dxTag}`;
      html = pcl5HtmlBody(payload, result);
    } else if (isAsrs) {
      const result = calculateAsrsScore(payload.respuestas);
      const element = React.createElement(PDFAsrsReport, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);
      subject = `ASRS-v1.1 ${asrsTamizajeLabel(result.partAPositive)} (Part A ${result.partAEndorsed}/6) — ${payload.nombreFormateado}`;
      html = asrsHtmlBody(payload, result);
    } else if (isMdq) {
      // ── MDQ: tamizaje binario + informe SOCHITAB ──
      const result = calculateMdqScore(payload.respuestas);
      mdqResultForEmail = result;

      const element = React.createElement(PDFMdqReport, {
        pacienteName: payload.nombreFormateado,
        edad: payload.edad,
        fecha,
        tratanteName: payload.tratanteName,
        result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(element as any);

      const tag = result.clasificacion === "positivo" ? "POSITIVO" : "NEGATIVO";
      subject = `MDQ ${tag} — ${payload.nombreFormateado}`;
      html = mdqHtmlBody(payload, result);
    } else if (isSpm2) {
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
    const isValidEmail = (e?: string) => !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const fallback = process.env.DESTINATION_EMAIL;

    // ── Destinatarios ──
    // Hands-SM (MDQ/PHQ-9/GAD-7/DASS-21): paciente y/o tratante según informeDest ("p","t","pt").
    // SPM-2 (Hands-TO): el correo del TO.
    // Resto: DESTINATION_EMAIL.
    let recipients: string[] = [];
    if (isHandsSm) {
      const dest = (payload.informeDest ?? "").toLowerCase();
      if (dest.includes("p") && isValidEmail(payload.pacienteEmail)) recipients.push(payload.pacienteEmail!);
      if (dest.includes("t") && isValidEmail(payload.tratanteEmail)) recipients.push(payload.tratanteEmail!);
      if (recipients.length === 0 && fallback) recipients.push(fallback);
    } else if (isSpm2) {
      recipients = [isValidEmail(payload.toEmail) ? payload.toEmail! : (fallback ?? "")];
    } else {
      recipients = [fallback ?? ""];
    }
    recipients = recipients.filter(Boolean);

    if (!apiKey || recipients.length === 0) {
      return NextResponse.json({ success: false, error: "Faltan variables de entorno o destinatarios" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const filename = isMdq
      ? `MDQ-${(mdqResultForEmail?.clasificacion ?? "tamizaje").toUpperCase()}-${payload.cliente}.pdf`
      : isPhq9
      ? `PHQ9-${payload.cliente}.pdf`
      : isGad7
      ? `GAD7-${payload.cliente}.pdf`
      : isDass21
      ? `DASS21-${payload.cliente}.pdf`
      : isAudit
      ? `AUDIT-${payload.cliente}.pdf`
      : isIsi
      ? `ISI-${payload.cliente}.pdf`
      : isPcl5
      ? `PCL5-${payload.cliente}.pdf`
      : isAsrs
      ? `ASRS-${payload.cliente}.pdf`
      : isSpm2
      ? `SPM2-${vertical.id === "spm2-hogar" ? "Hogar" : "Escolar"}-${payload.negocio || payload.cliente}.pdf`
      : `Levantamiento-${payload.negocio || payload.cliente}.pdf`;

    // Envío secuencial por destinatario (Resend permite "to: string[]" pero los pone
    // a todos en CC; aquí queremos envíos independientes — clínico y paciente no
    // tienen por qué ver el correo del otro).
    for (const to of recipients) {
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
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// ─── Email HTML para resultados MDQ ─────────────────────────────────────────

function mdqHtmlBody(p: SubmitPayload, result: MdqResult): string {
  const positivo = result.clasificacion === "positivo";
  const color = positivo ? "#C0392B" : "#27AE60";
  const label = mdqClasifLabelEs(result.clasificacion);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">MDQ · Cuestionario del Ánimo</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:18px;font-weight:700;letter-spacing:.4px;">${label.toUpperCase()}</div>
        <div style="font-size:12px;margin-top:4px;opacity:.9;">
          ${positivo
            ? "Cumple los tres criterios del MDQ. Se sugiere evaluación por psiquiatra."
            : "No cumple los tres criterios del MDQ en este momento."}
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;">≥ 7 síntomas en «Sí»</td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-weight:600;color:${result.cumpleSintomas ? "#27AE60" : "#9E9C96"};">${result.sintomasSi} / ${result.totalItems}</td></tr>
        <tr><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;">Co-ocurrencia en un mismo período</td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-weight:600;color:${result.cumpleCoocurrencia ? "#27AE60" : "#9E9C96"};">${result.coocurrencia ?? "—"}</td></tr>
        <tr><td style="padding:6px 0;">Nivel de problema (≥ moderado)</td><td style="padding:6px 0;text-align:right;font-weight:600;color:${result.cumpleProblema ? "#27AE60" : "#9E9C96"};">${result.nivelProblema ?? "—"}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El detalle completo (respuestas ítem por ítem + disclaimer SOCHITAB) está en el PDF adjunto.</p>
    </div>
  </div>`;
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

// ─── PHQ-9 ──────────────────────────────────────────────────────────────────

function bandaColorPhq9(b: Phq9Result["banda"]): string {
  if (b === "minima") return "#27AE60";
  if (b === "leve") return "#E8A838";
  if (b === "moderada") return "#D97706";
  if (b === "moderadamente_severa") return "#C0392B";
  return "#9B1C0F";
}

function phq9HtmlBody(p: SubmitPayload, result: Phq9Result): string {
  const color = bandaColorPhq9(result.banda);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  const alertaBlock = result.ideacionSuicida
    ? `<div style="background:#9B1C0F;color:#fff;padding:14px 16px;border-radius:6px;margin-bottom:14px;border-left:4px solid #fff;">
         <div style="font-size:13px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">ALERTA — Ítem 9 positivo</div>
         <div style="font-size:13px;margin-top:6px;line-height:1.55;">
           El paciente respondió «${result.ideacionSuicidaRespuesta}» a la pregunta sobre ideación de autoagresión.
           Se mostraron en pantalla los recursos de emergencia (Salud Responde 600 360 7777, *4141).
           Se sugiere contacto clínico oportuno.
         </div>
       </div>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">PHQ-9 · Depresión</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      ${alertaBlock}
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Puntaje · severidad</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.totalScore} / 27</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${phq9BandaLabel(result.banda)}</div>
      </div>
      ${result.funcionalidad ? `<p style="color:#3D4450;font-size:13px;">Impacto funcional (ítem 10): <strong>${result.funcionalidad}</strong></p>` : ""}
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, la interpretación clínica y el disclaimer.</p>
    </div>
  </div>`;
}

// ─── GAD-7 ──────────────────────────────────────────────────────────────────

function bandaColorGad7(b: Gad7Result["banda"]): string {
  if (b === "minima") return "#27AE60";
  if (b === "leve") return "#E8A838";
  if (b === "moderada") return "#D97706";
  return "#C0392B";
}

function gad7HtmlBody(p: SubmitPayload, result: Gad7Result): string {
  const color = bandaColorGad7(result.banda);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">GAD-7 · Ansiedad</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Puntaje · severidad</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.totalScore} / 21</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${gad7BandaLabel(result.banda)}</div>
      </div>
      ${result.funcionalidad ? `<p style="color:#3D4450;font-size:13px;">Impacto funcional (ítem 8): <strong>${result.funcionalidad}</strong></p>` : ""}
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, la interpretación clínica y el disclaimer.</p>
    </div>
  </div>`;
}

// ─── AUDIT ──────────────────────────────────────────────────────────────────

function zonaColorAudit(z: AuditResult["zona"]): string {
  if (z === "I") return "#27AE60";
  if (z === "II") return "#E8A838";
  if (z === "III") return "#D97706";
  return "#C0392B";
}

function auditHtmlBody(p: SubmitPayload, result: AuditResult): string {
  const color = zonaColorAudit(result.zona);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">AUDIT · Alcohol (OMS)</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Puntaje · zona OMS</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.totalScore} / 40</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${auditZonaLabel(result.zona)}</div>
      </div>
      <p style="color:#3D4450;font-size:13px;">AUDIT-C (ítems 1–3): <strong>${result.auditCScore} / 12</strong> ${result.auditCScore >= 4 ? "· consumo de riesgo (≥4)" : "· bajo riesgo"}</p>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, los subscores por bloque (consumo, dependencia, consecuencias), la interpretación clínica y el disclaimer.</p>
    </div>
  </div>`;
}

// ─── ISI ────────────────────────────────────────────────────────────────────

function bandaColorIsi(b: IsiResult["banda"]): string {
  if (b === "sin_insomnio") return "#27AE60";
  if (b === "subumbral") return "#E8A838";
  if (b === "moderado") return "#D97706";
  return "#C0392B";
}

function isiHtmlBody(p: SubmitPayload, result: IsiResult): string {
  const color = bandaColorIsi(result.banda);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">ISI · Insomnio</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Puntaje · severidad</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.totalScore} / 28</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${isiBandaLabel(result.banda)}</div>
      </div>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, la interpretación clínica y el disclaimer.</p>
    </div>
  </div>`;
}

// ─── PCL-5 ──────────────────────────────────────────────────────────────────

function severidadColorPcl5(s: Pcl5Result["severidad"]): string {
  if (s === "minimo") return "#27AE60";
  if (s === "leve") return "#E8A838";
  if (s === "moderado") return "#D97706";
  return "#C0392B";
}

function pcl5HtmlBody(p: SubmitPayload, result: Pcl5Result): string {
  const color = severidadColorPcl5(result.severidad);
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  const flagsBlock = (result.cortePositivo || result.diagnosticoProvisorio)
    ? `<div style="background:#9B1C0F;color:#fff;padding:14px 16px;border-radius:6px;margin-bottom:14px;border-left:4px solid #fff;">
         <div style="font-size:13px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">Tamizaje positivo</div>
         <div style="font-size:13px;margin-top:6px;line-height:1.55;">
           ${result.cortePositivo ? "Puntaje total ≥ 33 (corte clínico)." : ""}
           ${result.diagnosticoProvisorio ? " Cumple la regla DSM-5 por clusters B+C+D+E." : ""}
           Se sugiere derivación a profesional con formación en trauma.
         </div>
       </div>`
    : "";
  const clustersRow = result.clusters.map((cl) =>
    `<tr><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;font-size:12px;">
       <strong>${cl.cluster}</strong> · ${cl.nombre}
     </td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-size:12px;font-family:monospace;">
       ${cl.raw} / ${cl.max}
     </td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-size:11px;color:#9E9C96;">
       ${cl.itemsEndorsed} ítems ≥2
     </td></tr>`
  ).join("");
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">PCL-5 · TEPT (DSM-5)</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      ${flagsBlock}
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Puntaje · severidad</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.totalScore} / 80</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${pcl5SeveridadLabel(result.severidad)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">${clustersRow}</table>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, los subscores por cluster DSM-5, la regla de tamizaje y el disclaimer. La descripción del evento (si la paciente la escribió) aparece destacada.</p>
    </div>
  </div>`;
}

// ─── ASRS-v1.1 ──────────────────────────────────────────────────────────────

function asrsHtmlBody(p: SubmitPayload, result: AsrsResult): string {
  const color = result.partAPositive ? "#C0392B" : "#27AE60";
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">ASRS-v1.1 · TDAH adulto</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <div style="background:${color};color:#fff;padding:16px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Parte A · zona crítica</div>
        <div style="font-size:30px;font-weight:700;font-family:monospace;margin-top:4px;">${result.partAEndorsed} / 6</div>
        <div style="font-size:14px;font-weight:700;margin-top:2px;">${asrsTamizajeLabel(result.partAPositive)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;">Inatención (ítems 1, 2, 3, 4, 7–11)</td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-family:monospace;font-weight:600;">${result.inatencionScore} / 36</td></tr>
        <tr><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;">Hiperactividad / impulsividad (ítems 5, 6, 12–18)</td><td style="padding:6px 0;border-bottom:1px solid #D6D2CB;text-align:right;font-family:monospace;font-weight:600;">${result.hiperactividadScore} / 36</td></tr>
        <tr><td style="padding:6px 0;">Total bruto (referencial)</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-weight:600;">${result.totalScore} / 72</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene el desglose ítem por ítem, marca cuáles cayeron en zona crítica de la Parte A, los subscores por subescala y el disclaimer.</p>
    </div>
  </div>`;
}

// ─── DASS-21 ────────────────────────────────────────────────────────────────

function bandaColorDass21(b: Dass21Result["depresion"]["banda"]): string {
  if (b === "normal") return "#27AE60";
  if (b === "leve") return "#E8A838";
  if (b === "moderada") return "#D97706";
  if (b === "severa") return "#C0392B";
  return "#9B1C0F";
}

function dass21HtmlBody(p: SubmitPayload, result: Dass21Result): string {
  const tratanteLine = p.tratanteName
    ? `<p style="margin:6px 0 0;color:rgba(242,240,235,.7);font-size:13px;">Tratante: ${p.tratanteName}</p>`
    : "";
  const card = (sub: Dass21Result["depresion"]) => {
    const color = bandaColorDass21(sub.banda);
    return `<div style="background:${color};color:#fff;padding:14px;border-radius:6px;flex:1;">
      <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">${dass21SubescalaLabel(sub.subescala)}</div>
      <div style="font-size:26px;font-weight:700;font-family:monospace;margin-top:4px;">${sub.score}</div>
      <div style="font-size:11px;font-weight:700;margin-top:2px;">${dass21BandaLabel(sub.banda)}</div>
    </div>`;
  };
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#F2F0EB;color:#3D4450;">
    <div style="background:#1B4D4A;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
      <div style="color:#4A9B93;font-size:11px;letter-spacing:3px;text-transform:uppercase;">DASS-21 · Depresión, Ansiedad, Estrés</div>
      <h1 style="margin:8px 0 0;font-size:20px;">Resultado de tamizaje</h1>
      <p style="margin:6px 0 0;color:#4A9B93;font-size:14px;">Paciente: ${p.nombreFormateado}</p>
      ${tratanteLine}
    </div>
    <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
      <table style="width:100%;border-collapse:separate;border-spacing:6px;margin-bottom:14px;"><tr>
        <td>${card(result.depresion)}</td>
        <td>${card(result.ansiedad)}</td>
        <td>${card(result.estres)}</td>
      </tr></table>
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:16px 0;">
      <p style="color:#9E9C96;font-size:12px;">El PDF adjunto contiene la interpretación clínica por subescala y el disclaimer.</p>
    </div>
  </div>`;
}
