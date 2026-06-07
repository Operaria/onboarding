import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AuditResult } from "@/lib/audit";
import { AUDIT_ITEM_IDS, auditZonaLabel, auditZonaInterpretacion } from "@/lib/audit";
import { auditBloques } from "@/lib/verticals/audit";

const C = {
  petrol: "#1B4D4A",
  teal: "#4A9B93",
  navy: "#0F1E3A",
  body: "#3D4450",
  muted: "#9E9C96",
  border: "#D6D2CB",
  offwhite: "#F2F0EB",
  green: "#27AE60",
  yellow: "#E8A838",
  orange: "#D97706",
  red: "#C0392B",
};

function zonaColor(z: AuditResult["zona"]): string {
  if (z === "I") return C.green;
  if (z === "II") return C.yellow;
  if (z === "III") return C.orange;
  return C.red;
}

const s = StyleSheet.create({
  page: { paddingTop: 90, paddingBottom: 60, paddingHorizontal: 50, fontSize: 10, color: C.body, fontFamily: "Helvetica" },
  header: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: C.petrol, padding: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: 700 },
  headerSub: { color: C.teal, fontSize: 9, marginTop: 3, letterSpacing: 2 },
  headerBrand: { color: C.teal, fontSize: 8, letterSpacing: 3 },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 22, marginBottom: 14, paddingBottom: 10, borderBottom: `1pt solid ${C.border}` },
  metaLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  metaValue: { color: C.navy, fontSize: 10, marginTop: 2, fontWeight: 600 },
  scoreBox: { padding: 18, borderRadius: 4, marginBottom: 14 },
  scoreLabel: { color: "#fff", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.85 },
  scoreNum: { color: "#fff", fontSize: 36, fontWeight: 700, marginTop: 4, fontFamily: "Courier" },
  scoreBanda: { color: "#fff", fontSize: 14, fontWeight: 700, marginTop: 4 },
  subscoreRow: { flexDirection: "row", marginBottom: 14, gap: 10 },
  subscoreBox: { flex: 1, padding: 12, borderRadius: 4, border: `1pt solid ${C.border}`, backgroundColor: "#fff" },
  subscoreLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  subscoreNum: { color: C.navy, fontSize: 18, fontFamily: "Courier", marginTop: 3, fontWeight: 700 },
  subscoreHint: { color: C.body, fontSize: 8, marginTop: 4, lineHeight: 1.4 },
  sectionTitle: { color: C.petrol, fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5pt solid ${C.teal}` },
  interpretacionBox: { padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}`, marginBottom: 6 },
  interpretacionText: { color: C.body, fontSize: 10, lineHeight: 1.55 },
  bloqueLabel: { color: C.teal, fontSize: 8, textTransform: "uppercase", letterSpacing: 1, marginTop: 10, marginBottom: 4 },
  itemRow: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 6, borderBottom: `0.4pt solid ${C.border}` },
  itemRowAlt: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 6, borderBottom: `0.4pt solid ${C.border}`, backgroundColor: C.offwhite },
  itemNumero: { width: 22, fontSize: 9, color: C.muted, fontFamily: "Courier" },
  itemTexto: { flex: 1, fontSize: 9, color: C.body, lineHeight: 1.5 },
  itemValor: { width: 26, fontSize: 9, color: C.navy, fontFamily: "Courier", textAlign: "right", fontWeight: 700 },
  disclaimer: { marginTop: 18, padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}` },
  disclaimerText: { color: C.body, fontSize: 9, lineHeight: 1.55, marginBottom: 6 },
  disclaimerTextMuted: { color: C.muted, fontSize: 8, lineHeight: 1.5, marginTop: 6 },
  footer: { position: "absolute", bottom: 24, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between" },
  footerText: { color: C.muted, fontSize: 7 },
});

const TODOS_ITEMS = auditBloques.flatMap((b) => b.preguntas.map((p, i) => ({ p, bloque: b.titulo, idxBloque: i })));

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: AuditResult;
}

export function PDFAuditReport({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const color = zonaColor(result.zona);
  const zonaLabel = auditZonaLabel(result.zona);
  const auditCFlag = result.auditCScore >= 4
    ? "Consumo de riesgo (≥ 4)"
    : "Bajo riesgo";

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados AUDIT — Consumo de Alcohol</Text>
            <Text style={s.headerSub}>ALCOHOL USE DISORDERS IDENTIFICATION TEST · OMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>AUDIT (OMS, Babor 2001)</Text></View>
        </View>

        <View style={[s.scoreBox, { backgroundColor: color }]}>
          <Text style={s.scoreLabel}>Puntaje total · zona OMS</Text>
          <Text style={s.scoreNum}>{result.totalScore} / 40</Text>
          <Text style={s.scoreBanda}>{zonaLabel}</Text>
        </View>

        <View style={s.subscoreRow}>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>AUDIT-C (ítems 1–3)</Text>
            <Text style={s.subscoreNum}>{result.auditCScore} / 12</Text>
            <Text style={s.subscoreHint}>{auditCFlag}. Subscore breve para detección rápida en consulta.</Text>
          </View>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>Dependencia (ítems 4–6)</Text>
            <Text style={s.subscoreNum}>
              {(result.itemScores["audit_q4"] ?? 0) + (result.itemScores["audit_q5"] ?? 0) + (result.itemScores["audit_q6"] ?? 0)} / 12
            </Text>
            <Text style={s.subscoreHint}>Pérdida de control, fallar obligaciones, beber matinal.</Text>
          </View>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>Consecuencias (ítems 7–10)</Text>
            <Text style={s.subscoreNum}>
              {(result.itemScores["audit_q7"] ?? 0) + (result.itemScores["audit_q8"] ?? 0) + (result.itemScores["audit_q9"] ?? 0) + (result.itemScores["audit_q10"] ?? 0)} / 16
            </Text>
            <Text style={s.subscoreHint}>Culpa, blackout, lesiones, preocupación de terceros.</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Interpretación clínica</Text>
        <View style={s.interpretacionBox} wrap={false}>
          <Text style={s.interpretacionText}>{auditZonaInterpretacion(result.zona)}</Text>
        </View>

        <Text style={s.sectionTitle}>Respuestas por ítem</Text>
        <View>
          {TODOS_ITEMS.map((row, i) => {
            const id = AUDIT_ITEM_IDS[i];
            const score = result.itemScores[id] ?? 0;
            return (
              <View key={id} style={i % 2 === 0 ? s.itemRow : s.itemRowAlt} wrap={false}>
                <Text style={s.itemNumero}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.itemTexto}>{row.p.label}</Text>
                <Text style={s.itemValor}>{score}</Text>
              </View>
            );
          })}
        </View>

        <View style={s.disclaimer} wrap={false}>
          <Text style={[s.disclaimerText, { fontWeight: 700, color: C.petrol }]}>
            Importante: esto es un tamizaje, NO un diagnóstico.
          </Text>
          <Text style={s.disclaimerText}>
            El AUDIT orienta sobre patrones de consumo problemático pero no
            reemplaza la entrevista clínica. La Zona II y superiores ameritan
            intervención breve y evaluación por profesional de la salud.
          </Text>
          <Text style={s.disclaimerTextMuted}>
            AUDIT — Alcohol Use Disorders Identification Test (Babor, Higgins-Biddle,
            Saunders, Monteiro · OMS, 2001). Adaptación chilena: MINSAL (Alvarado, Garmendia).
          </Text>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Hands-SM · Operaria Health · Diseñado por Operaria · operaria.cl</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
