import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AsrsResult } from "@/lib/asrs";
import {
  ASRS_ITEM_IDS,
  ASRS_INATENCION_ITEMS,
  ASRS_HIPERACT_ITEMS,
  asrsTamizajeLabel,
  asrsInterpretacion,
} from "@/lib/asrs";
import { asrsBloques } from "@/lib/verticals/asrs";

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
  scoreNum: { color: "#fff", fontSize: 32, fontWeight: 700, marginTop: 4, fontFamily: "Courier" },
  scoreBanda: { color: "#fff", fontSize: 14, fontWeight: 700, marginTop: 4 },
  subscoreRow: { flexDirection: "row", marginBottom: 14, gap: 10 },
  subscoreBox: { flex: 1, padding: 12, borderRadius: 4, border: `1pt solid ${C.border}`, backgroundColor: "#fff" },
  subscoreLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  subscoreNum: { color: C.navy, fontSize: 20, fontFamily: "Courier", marginTop: 3, fontWeight: 700 },
  subscoreHint: { color: C.body, fontSize: 8, marginTop: 4, lineHeight: 1.4 },
  sectionTitle: { color: C.petrol, fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5pt solid ${C.teal}` },
  interpretacionBox: { padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}`, marginBottom: 6 },
  interpretacionText: { color: C.body, fontSize: 10, lineHeight: 1.55 },
  bloqueLabel: { color: C.teal, fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 10, marginBottom: 4, fontWeight: 700 },
  itemRow: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 6, borderBottom: `0.4pt solid ${C.border}`, alignItems: "center" },
  itemRowEndorsed: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 6, borderBottom: `0.4pt solid ${C.border}`, backgroundColor: "#FCE8E0", alignItems: "center" },
  itemNumero: { width: 30, fontSize: 9, color: C.muted, fontFamily: "Courier" },
  itemTexto: { flex: 1, fontSize: 9, color: C.body, lineHeight: 1.5 },
  itemTagSub: { width: 28, fontSize: 7, color: C.muted, textAlign: "center", fontFamily: "Courier" },
  itemValor: { width: 26, fontSize: 9, color: C.navy, fontFamily: "Courier", textAlign: "right", fontWeight: 700 },
  disclaimer: { marginTop: 18, padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}` },
  disclaimerText: { color: C.body, fontSize: 9, lineHeight: 1.55, marginBottom: 6 },
  disclaimerTextMuted: { color: C.muted, fontSize: 8, lineHeight: 1.5, marginTop: 6 },
  footer: { position: "absolute", bottom: 24, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between" },
  footerText: { color: C.muted, fontSize: 7 },
});

// Filas planas con info de subescala.
type Row = { id: string; label: string; numero: number; sub: "I" | "H"; partA: boolean };
const ROWS: Row[] = (() => {
  const inatSet = new Set(ASRS_INATENCION_ITEMS);
  const arr: Row[] = [];
  for (const bloque of asrsBloques) {
    for (const p of bloque.preguntas) {
      const numero = parseInt(p.numero ?? "0", 10);
      arr.push({
        id: p.id,
        // El label en la vertical incluye un prefijo "¿Con qué frecuencia...?\n" que aquí no queremos.
        label: p.label.replace(/^.+\n/, ""),
        numero,
        sub: inatSet.has(numero) ? "I" : "H",
        partA: numero <= 6,
      });
    }
  }
  return arr;
})();

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: AsrsResult;
}

export function PDFAsrsReport({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const color = result.partAPositive ? C.red : C.green;
  const tamizajeLabel = asrsTamizajeLabel(result.partAPositive);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados ASRS-v1.1 — Tamizaje TDAH adulto</Text>
            <Text style={s.headerSub}>ADULT ADHD SELF-REPORT SCALE · OMS · 18 ÍTEMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>ASRS-v1.1 (Kessler · OMS 2005)</Text></View>
        </View>

        <View style={[s.scoreBox, { backgroundColor: color }]}>
          <Text style={s.scoreLabel}>Parte A · zona crítica</Text>
          <Text style={s.scoreNum}>{result.partAEndorsed} / 6</Text>
          <Text style={s.scoreBanda}>{tamizajeLabel}</Text>
        </View>

        <View style={s.subscoreRow}>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>Inatención</Text>
            <Text style={s.subscoreNum}>{result.inatencionScore} / 36</Text>
            <Text style={s.subscoreHint}>Ítems 1, 2, 3, 4, 7, 8, 9, 10, 11.</Text>
          </View>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>Hiperactividad / impulsividad</Text>
            <Text style={s.subscoreNum}>{result.hiperactividadScore} / 36</Text>
            <Text style={s.subscoreHint}>Ítems 5, 6, 12, 13, 14, 15, 16, 17, 18.</Text>
          </View>
          <View style={s.subscoreBox}>
            <Text style={s.subscoreLabel}>Total bruto</Text>
            <Text style={s.subscoreNum}>{result.totalScore} / 72</Text>
            <Text style={s.subscoreHint}>Suma de los 18 ítems. Referencial.</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Interpretación clínica</Text>
        <View style={s.interpretacionBox} wrap={false}>
          <Text style={s.interpretacionText}>{asrsInterpretacion(result)}</Text>
        </View>

        <Text style={s.sectionTitle}>Respuestas por ítem</Text>
        <Text style={s.bloqueLabel}>Parte A · Tamizaje (zona crítica en color)</Text>
        <View>
          {ROWS.filter((r) => r.partA).map((row, i) => {
            const score = result.itemScores[row.id] ?? 0;
            const endorsed = result.partAEndorsedDetail[row.id];
            return (
              <View key={row.id} style={endorsed ? s.itemRowEndorsed : s.itemRow} wrap={false}>
                <Text style={s.itemNumero}>A{String(row.numero).padStart(2, "0")}</Text>
                <Text style={s.itemTexto}>{row.label}</Text>
                <Text style={s.itemTagSub}>{row.sub}</Text>
                <Text style={s.itemValor}>{score}</Text>
              </View>
            );
          })}
        </View>

        <Text style={s.bloqueLabel}>Parte B · Perfil</Text>
        <View>
          {ROWS.filter((r) => !r.partA).map((row, i) => {
            const score = result.itemScores[row.id] ?? 0;
            return (
              <View key={row.id} style={i % 2 === 0 ? s.itemRow : { ...s.itemRow, backgroundColor: C.offwhite }} wrap={false}>
                <Text style={s.itemNumero}>B{String(row.numero).padStart(2, "0")}</Text>
                <Text style={s.itemTexto}>{row.label}</Text>
                <Text style={s.itemTagSub}>{row.sub}</Text>
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
            El ASRS-v1.1 orienta sobre la probabilidad de TDAH del adulto pero
            no reemplaza la evaluación clínica estructurada. La columna “sub”
            indica la subescala asignada: I = inatención, H =
            hiperactividad/impulsividad. Las filas destacadas son los ítems
            de la Parte A que cayeron en zona crítica.
          </Text>
          <Text style={s.disclaimerTextMuted}>
            ASRS-v1.1 — Adult ADHD Self-Report Scale (Kessler et al. · OMS, 2005).
            Validación en español: Pedrero-Pérez et al. 2012. Suma {ASRS_ITEM_IDS.length}/{ASRS_ITEM_IDS.length} ítems contestados.
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
