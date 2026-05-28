import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface EnviarLinkPayload {
  formType: "hogar" | "escolar";
  childName: string;
  respondentName: string;
  respondentEmail: string;
  toName: string;
  link: string;
  infoLink?: string;
}

const isValidEmail = (e?: string) => !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function emailBody(p: EnviarLinkPayload): string {
  const formLabel = p.formType === "hogar" ? "del Hogar" : "Escolar";
  const infoRow = p.infoLink
    ? `<p style="margin:18px 0 0;font-size:14px;line-height:1.6;">
         ¿Quieres saber de qué se trata antes de empezar?
         <a href="${p.infoLink}" style="color:#1B4D4A;font-weight:600;">Léelo aquí en 2 minutos →</a>
       </p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Plus Jakarta Sans',sans-serif;max-width:560px;margin:0 auto;background:#F2F0EB;color:#2F3A44;border-radius:10px;overflow:hidden;">
    <div style="background:linear-gradient(165deg,#1B4D4A 0%,#2A6B66 100%);color:#F2F0EB;padding:28px 26px;">
      <div style="color:#7BC4BC;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:monospace;">Operaria Health · OperaHands</div>
      <h1 style="margin:10px 0 0;font-size:24px;font-weight:600;">Evaluación SPM-2 ${formLabel}</h1>
    </div>
    <div style="padding:26px;">
      <p style="font-size:16px;line-height:1.7;margin:0 0 14px;">Hola ${p.respondentName},</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 14px;">
        ${p.toName} (terapeuta ocupacional) te invita a responder una breve evaluación sobre
        <strong>${p.childName}</strong>. Son preguntas cortas y sencillas — no hay respuestas buenas ni malas.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 22px;color:#4A5568;">
        Puedes responder con calma, a tu ritmo. Si prefieres escuchar las preguntas en voz alta,
        toca el botón de altavoz que aparece junto a cada una.
      </p>
      <a href="${p.link}" style="display:inline-block;background:#4A9B93;color:#F2F0EB;text-decoration:none;font-weight:600;font-size:16px;padding:14px 32px;border-radius:30px;">
        Abrir la encuesta
      </a>
      <p style="margin:18px 0 0;font-size:12px;color:#8A96A3;word-break:break-all;">
        O copia este enlace: <a href="${p.link}" style="color:#2A6B66;">${p.link}</a>
      </p>
      ${infoRow}
      <hr style="border:none;border-top:1px solid #D6D2CB;margin:24px 0 14px;">
      <p style="font-size:11px;color:#8A96A3;font-family:monospace;letter-spacing:.04em;">Diseñado por Operaria · operaria.cl</p>
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const p = (await req.json()) as EnviarLinkPayload;

    if (!p.link || !p.childName || !p.respondentName) {
      return NextResponse.json({ success: false, error: "Faltan datos para enviar el link." }, { status: 400 });
    }
    if (!isValidEmail(p.respondentEmail)) {
      return NextResponse.json({ success: false, error: "El correo de quien responde no es válido." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Falta configurar el correo (RESEND_API_KEY)." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const formLabel = p.formType === "hogar" ? "del Hogar" : "Escolar";
    const { error } = await resend.emails.send({
      from,
      to: p.respondentEmail,
      subject: `Evaluación de ${p.childName} — SPM-2 ${formLabel}`,
      html: emailBody(p),
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message ?? "Error al enviar el correo." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
