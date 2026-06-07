import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { IsiResult } from "@/lib/isi";
import { ISI_ITEM_IDS, isiBandaLabel, isiBandaInterpretacion } from "@/lib/isi";
import { isiBloques } from "@/lib/verticals/isi";

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

function bandaColor(b: IsiResult["banda"]): string {
  if (b === "sin_insomnio") return C.green;
  if (b === "subumbral") return C.yellow;
  if (b === "moderado") return C.orange;
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
  sectionTitle: { color: C.petrol, fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5pt solid ${C.teal}` },
  interpretacionBox: { padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}`, marginBottom: 6 },
  interpretacionText: { color: C.body, fontSize: 10, lineHeight: 1.55 },
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

const ITEMS = isiBloques.flatMap((b) => b.preguntas);

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: IsiResult;
}

export function PDFIsiReport({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const color = bandaColor(result.banda);
  const bandaLabel = isiBandaLabel(result.banda);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados ISI — Severidad del Insomnio</Text>
            <Text style={s.headerSub}>INSOMNIA SEVERITY INDEX · 7 ÍTEMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>ISI (Bastien 2001)</Text></View>
        </View>

        <View style={[s.scoreBox, { backgroundColor: color }]}>
          <Text style={s.scoreLabel}>Puntaje total · severidad</Text>
          <Text style={s.scoreNum}>{result.totalScore} / 28</Text>
          <Text style={s.scoreBanda}>{bandaLabel}</Text>
        </View>

        <Text style={s.sectionTitle}>Interpretación clínica</Text>
        <View style={s.interpretacionBox} wrap={false}>
          <Text style={s.interpretacionText}>{isiBandaInterpretacion(result.banda)}</Text>
        </View>

        <Text style={s.sectionTitle}>Respuestas por ítem</Text>
        <View>
          {ITEMS.map((p, i) => {
            const id = ISI_ITEM_IDS[i];
            const score = result.itemScores[id] ?? 0;
            return (
              <View key={id} style={i % 2 === 0 ? s.itemRow : s.itemRowAlt} wrap={false}>
                <Text style={s.itemNumero}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.itemTexto}>{p.label}</Text>
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
            El ISI orienta sobre la severidad del insomnio pero no reemplaza la
            entrevista clínica. Un puntaje ≥ 15 sugiere evaluación clínica e
            inicio de tratamiento estructurado (TCC-I).
          </Text>
          <Text style={s.disclaimerTextMuted}>
            ISI — Insomnia Severity Index (Bastien, Vallières & Morin, 2001).
            Validación en español: Fernández-Mendoza et al. 2012.
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
