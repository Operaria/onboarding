import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Pcl5Result } from "@/lib/pcl5";
import { PCL5_ITEM_IDS, pcl5SeveridadLabel, pcl5SeveridadInterpretacion } from "@/lib/pcl5";
import { pcl5Bloques, PCL5_EVENTO_ID } from "@/lib/verticals/pcl5";
import type { Respuestas } from "@/lib/types";

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

function severidadColor(s: Pcl5Result["severidad"]): string {
  if (s === "minimo") return C.green;
  if (s === "leve") return C.yellow;
  if (s === "moderado") return C.orange;
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
  flagsBox: { padding: 12, marginBottom: 14, borderRadius: 4, border: `1pt solid ${C.border}`, backgroundColor: "#fff" },
  flagRow: { flexDirection: "row", alignItems: "center", paddingVertical: 3 },
  flagLabel: { fontSize: 10, color: C.body, flex: 1 },
  flagValue: { fontSize: 10, fontWeight: 700, fontFamily: "Courier" },
  clusterRow: { flexDirection: "row", paddingVertical: 6, borderBottom: `0.4pt solid ${C.border}` },
  clusterId: { width: 22, fontSize: 9, color: C.muted, fontFamily: "Courier", fontWeight: 700 },
  clusterName: { flex: 1, fontSize: 10, color: C.body },
  clusterScore: { width: 60, fontSize: 10, color: C.navy, fontFamily: "Courier", textAlign: "right", fontWeight: 700 },
  clusterEnd: { width: 50, fontSize: 9, color: C.muted, fontFamily: "Courier", textAlign: "right" },
  sectionTitle: { color: C.petrol, fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5pt solid ${C.teal}` },
  interpretacionBox: { padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}`, marginBottom: 6 },
  interpretacionText: { color: C.body, fontSize: 10, lineHeight: 1.55 },
  eventoBox: { padding: 12, backgroundColor: "#fff", border: `1pt solid ${C.border}`, borderRadius: 4, marginBottom: 6 },
  eventoLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  eventoText: { color: C.body, fontSize: 10, lineHeight: 1.55, marginTop: 4, fontStyle: "italic" },
  bloqueLabel: { color: C.teal, fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 10, marginBottom: 4, fontWeight: 700 },
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

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: Pcl5Result;
  respuestas: Respuestas;
}

// Mapeo plano de los 20 ítems con su bloque (B/C/D/E) para el listado del PDF.
type RowItem = { id: string; label: string; numero: string; cluster: "B" | "C" | "D" | "E" };
const ROWS: RowItem[] = (() => {
  const clusterFromNumero = (n: number): "B" | "C" | "D" | "E" => {
    if (n <= 5) return "B";
    if (n <= 7) return "C";
    if (n <= 14) return "D";
    return "E";
  };
  const arr: RowItem[] = [];
  for (const bloque of pcl5Bloques) {
    for (const p of bloque.preguntas) {
      if (p.id === PCL5_EVENTO_ID) continue;
      const n = parseInt(p.numero ?? "0", 10);
      arr.push({ id: p.id, label: p.label, numero: p.numero ?? String(n), cluster: clusterFromNumero(n) });
    }
  }
  return arr;
})();

export function PDFPcl5Report({ pacienteName, edad, fecha, tratanteName, result, respuestas }: Props) {
  const color = severidadColor(result.severidad);
  const severidadLabel = pcl5SeveridadLabel(result.severidad);
  const eventoRaw = respuestas[PCL5_EVENTO_ID];
  const evento = typeof eventoRaw === "string" ? eventoRaw.trim() : "";

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados PCL-5 — Tamizaje de TEPT</Text>
            <Text style={s.headerSub}>PTSD CHECKLIST FOR DSM-5 · 20 ÍTEMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>PCL-5 (Weathers, NCPTSD 2013)</Text></View>
        </View>

        <View style={[s.scoreBox, { backgroundColor: color }]}>
          <Text style={s.scoreLabel}>Puntaje total · severidad</Text>
          <Text style={s.scoreNum}>{result.totalScore} / 80</Text>
          <Text style={s.scoreBanda}>{severidadLabel}</Text>
        </View>

        <View style={s.flagsBox}>
          <View style={s.flagRow}>
            <Text style={s.flagLabel}>Corte clínico de tamizaje (≥ 33)</Text>
            <Text style={[s.flagValue, { color: result.cortePositivo ? C.red : C.green }]}>
              {result.cortePositivo ? "POSITIVO" : "Negativo"}
            </Text>
          </View>
          <View style={s.flagRow}>
            <Text style={s.flagLabel}>Regla de tamizaje DSM-5 por clusters (B+C+D+E)</Text>
            <Text style={[s.flagValue, { color: result.diagnosticoProvisorio ? C.red : C.green }]}>
              {result.diagnosticoProvisorio ? "CUMPLE" : "No cumple"}
            </Text>
          </View>
        </View>

        {evento ? (
          <View style={s.eventoBox} wrap={false}>
            <Text style={s.eventoLabel}>Experiencia descrita por el paciente</Text>
            <Text style={s.eventoText}>{evento}</Text>
          </View>
        ) : null}

        <Text style={s.sectionTitle}>Interpretación clínica</Text>
        <View style={s.interpretacionBox} wrap={false}>
          <Text style={s.interpretacionText}>{pcl5SeveridadInterpretacion(result)}</Text>
        </View>

        <Text style={s.sectionTitle}>Subscores por cluster DSM-5</Text>
        <View>
          {result.clusters.map((cl) => (
            <View key={cl.cluster} style={s.clusterRow} wrap={false}>
              <Text style={s.clusterId}>{cl.cluster}</Text>
              <Text style={s.clusterName}>{cl.nombre}</Text>
              <Text style={s.clusterScore}>{cl.raw} / {cl.max}</Text>
              <Text style={s.clusterEnd}>{cl.itemsEndorsed} ítems ≥2</Text>
            </View>
          ))}
        </View>

        <Text style={s.sectionTitle}>Respuestas por ítem</Text>
        <View>
          {ROWS.map((row, i) => {
            const score = result.itemScores[row.id] ?? 0;
            return (
              <View key={row.id} style={i % 2 === 0 ? s.itemRow : s.itemRowAlt} wrap={false}>
                <Text style={s.itemNumero}>{row.cluster}{row.numero}</Text>
                <Text style={s.itemTexto}>{row.label}</Text>
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
            El PCL-5 orienta sobre la presencia y severidad de síntomas postraumáticos
            pero no reemplaza la entrevista clínica estructurada (CAPS-5). Un puntaje
            total ≥ 33 y/o cumplir la regla de clusters B+C+D+E justifica evaluación
            por profesional con formación en trauma.
          </Text>
          <Text style={s.disclaimerTextMuted}>
            PCL-5 — PTSD Checklist for DSM-5 (Weathers, Litz, Keane, Palmieri, Marx, Schnurr ·
            National Center for PTSD, 2013). Validación en español: Vitriol et al. 2017.
            Suma {PCL5_ITEM_IDS.length}/{PCL5_ITEM_IDS.length} ítems contestados.
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
