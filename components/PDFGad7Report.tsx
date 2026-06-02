import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Gad7Result } from "@/lib/gad7";
import { GAD7_ITEM_IDS, gad7BandaLabel, gad7BandaInterpretacion } from "@/lib/gad7";
import { gad7Bloques } from "@/lib/verticals/gad7";

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

function bandaColor(b: Gad7Result["banda"]): string {
  if (b === "minima") return C.green;
  if (b === "leve") return C.yellow;
  if (b === "moderada") return C.orange;
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
  funcionalBox: { padding: 12, backgroundColor: "#fff", border: `1pt solid ${C.border}`, borderRadius: 4, marginTop: 10 },
  funcionalLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  funcionalValue: { color: C.navy, fontSize: 11, marginTop: 4, fontWeight: 600 },
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

const ITEMS = gad7Bloques[0].preguntas;

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: Gad7Result;
}

export function PDFGad7Report({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const color = bandaColor(result.banda);
  const bandaLabel = gad7BandaLabel(result.banda);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados GAD-7 — Tamizaje de Ansiedad</Text>
            <Text style={s.headerSub}>GENERALIZED ANXIETY DISORDER · 7 ÍTEMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>GAD-7 (Spitzer 2006)</Text></View>
        </View>

        <View style={[s.scoreBox, { backgroundColor: color }]}>
          <Text style={s.scoreLabel}>Puntaje total · severidad</Text>
          <Text style={s.scoreNum}>{result.totalScore} / 21</Text>
          <Text style={s.scoreBanda}>{bandaLabel}</Text>
        </View>

        <Text style={s.sectionTitle}>Interpretación clínica</Text>
        <View style={s.interpretacionBox} wrap={false}>
          <Text style={s.interpretacionText}>{gad7BandaInterpretacion(result.banda)}</Text>
        </View>

        {result.funcionalidad && (
          <View style={s.funcionalBox} wrap={false}>
            <Text style={s.funcionalLabel}>Impacto funcional (ítem 8)</Text>
            <Text style={s.funcionalValue}>{result.funcionalidad}</Text>
          </View>
        )}

        <Text style={s.sectionTitle}>Respuestas por ítem</Text>
        <View>
          {ITEMS.map((p, i) => {
            const id = GAD7_ITEM_IDS[i];
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
            El GAD-7 orienta sobre la severidad de síntomas ansiosos pero no
            reemplaza la entrevista clínica. Un puntaje ≥ 10 sugiere evaluación
            por médico o profesional de salud mental.
          </Text>
          <Text style={s.disclaimerTextMuted}>
            GAD-7 — Generalized Anxiety Disorder 7-item scale (Spitzer et al. 2006).
            Versión en español validada (García-Campayo et al. 2010).
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
