import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Spm2Result } from "@/lib/spm2";
import { classificationLabelEs } from "@/lib/spm2";

const C = {
  petrol: "#1B4D4A",
  teal: "#4A9B93",
  navy: "#0F1E3A",
  body: "#3D4450",
  muted: "#9E9C96",
  border: "#D6D2CB",
  offwhite: "#F2F0EB",
  green: "#27AE60",
  orange: "#E8A838",
  red: "#C0392B",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 90,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontSize: 10,
    color: C.body,
    fontFamily: "Helvetica",
  },
  // ── Header ──
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: C.petrol,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {},
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: 700 },
  headerSub: { color: C.teal, fontSize: 9, marginTop: 3, letterSpacing: 2 },
  headerBrand: { color: C.teal, fontSize: 8, letterSpacing: 3 },
  // ── Meta ──
  meta: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: `1pt solid ${C.border}`,
  },
  metaLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  metaValue: { color: C.navy, fontSize: 10, marginTop: 2, fontWeight: 600 },
  // ── Section title ──
  sectionTitle: {
    color: C.petrol,
    fontSize: 13,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: `1.5pt solid ${C.teal}`,
  },
  // ── Table ──
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.navy,
    padding: 0,
  },
  tableHeaderCell: {
    color: "#fff",
    fontSize: 8,
    fontWeight: 700,
    padding: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: `0.5pt solid ${C.border}`,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottom: `0.5pt solid ${C.border}`,
    backgroundColor: C.offwhite,
  },
  tableCell: {
    fontSize: 9,
    padding: 6,
    color: C.body,
  },
  tableCellMono: {
    fontSize: 9,
    padding: 6,
    color: C.navy,
    fontFamily: "Courier",
    fontWeight: 700,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: C.petrol,
    padding: 0,
  },
  totalCell: {
    fontSize: 9,
    padding: 8,
    color: "#fff",
    fontWeight: 700,
  },
  totalCellMono: {
    fontSize: 10,
    padding: 8,
    color: C.teal,
    fontFamily: "Courier",
    fontWeight: 700,
  },
  // ── Area detail ──
  areaBlock: {
    marginTop: 12,
    marginBottom: 4,
  },
  areaName: {
    color: C.navy,
    fontSize: 11,
    fontWeight: 700,
  },
  areaScore: {
    color: C.teal,
    fontSize: 9,
    fontFamily: "Courier",
    marginTop: 2,
  },
  areaInterpretation: {
    color: C.body,
    fontSize: 10,
    marginTop: 4,
    lineHeight: 1.6,
  },
  classificationBadge: {
    fontSize: 8,
    fontWeight: 700,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    marginLeft: 8,
  },
  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 24,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { color: C.muted, fontSize: 7 },
  // ── Disclaimer ──
  disclaimer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: C.offwhite,
    borderRadius: 4,
    borderLeft: `3pt solid ${C.teal}`,
  },
  disclaimerText: {
    color: C.muted,
    fontSize: 8,
    lineHeight: 1.5,
  },
});

function classColor(classification: string): string {
  if (classification === "typical") return C.green;
  if (classification === "some_problems") return C.orange;
  return C.red;
}

interface Props {
  nombre: string;
  estudiante: string;
  fecha: string;
  result: Spm2Result;
  edad?: string;
}

export function PDFSpm2Report({ nombre, estudiante, fecha, result, edad }: Props) {
  const formLabel = result.formType === "hogar" ? "HOGAR" : "ESCOLAR";
  const totalClassLabel = classificationLabelEs(result.sensoryTotal.classification);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header} fixed>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>
              Resultados SPM-2 — {formLabel}
            </Text>
            <Text style={s.headerSub}>
              SENSORY PROCESSING MEASURE · SEGUNDA EDICIÓN
            </Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        {/* Meta */}
        <View style={s.meta}>
          <View>
            <Text style={s.metaLabel}>Estudiante</Text>
            <Text style={s.metaValue}>{estudiante}</Text>
          </View>
          {edad ? (
            <View>
              <Text style={s.metaLabel}>Edad</Text>
              <Text style={s.metaValue}>{edad} años</Text>
            </View>
          ) : null}
          <View>
            <Text style={s.metaLabel}>Respondió</Text>
            <Text style={s.metaValue}>{nombre}</Text>
          </View>
          <View>
            <Text style={s.metaLabel}>Rol</Text>
            <Text style={s.metaValue}>{result.respondentType}</Text>
          </View>
          <View>
            <Text style={s.metaLabel}>Fecha</Text>
            <Text style={s.metaValue}>{fecha}</Text>
          </View>
        </View>

        {/* ── Tabla resumen ── */}
        <Text style={s.sectionTitle}>Resumen de puntajes</Text>

        <View>
          {/* Header */}
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderCell, { flex: 3 }]}>Área</Text>
            <Text style={[s.tableHeaderCell, { flex: 1, textAlign: "center" }]}>PB</Text>
            <Text style={[s.tableHeaderCell, { flex: 1, textAlign: "center" }]}>T-Score</Text>
            <Text style={[s.tableHeaderCell, { flex: 3 }]}>Clasificación</Text>
          </View>

          {/* Rows */}
          {result.areaScores.map((score, i) => (
            <View key={score.area.id} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <Text style={[s.tableCell, { flex: 3, fontWeight: 600 }]}>{score.area.nameEs}</Text>
              <Text style={[s.tableCellMono, { flex: 1, textAlign: "center" }]}>{score.rawScore}</Text>
              <Text style={[s.tableCellMono, { flex: 1, textAlign: "center" }]}>{score.tScore}</Text>
              <Text style={[s.tableCell, { flex: 3, color: classColor(score.classification), fontWeight: 600 }]}>
                {classificationLabelEs(score.classification)}
              </Text>
            </View>
          ))}

          {/* Total */}
          <View style={s.totalRow}>
            <Text style={[s.totalCell, { flex: 3 }]}>TOTAL SENSORIAL</Text>
            <Text style={[s.totalCellMono, { flex: 1, textAlign: "center" }]}>{result.sensoryTotal.rawScore}</Text>
            <Text style={[s.totalCellMono, { flex: 1, textAlign: "center" }]}>{result.sensoryTotal.tScore}</Text>
            <Text style={[s.totalCell, { flex: 3, color: C.teal }]}>{totalClassLabel}</Text>
          </View>
        </View>

        {/* ── Componente Sensorial: Interpretación por área ── */}
        <Text style={s.sectionTitle}>Componente Sensorial — Interpretación clínica</Text>

        <Text style={{ color: C.body, fontSize: 9, marginBottom: 8, lineHeight: 1.5 }}>
          Se aplica evaluación estandarizada Sensory Processing Measure SPM-2{" "}
          {formLabel}, obteniendo los siguientes resultados:
        </Text>

        {result.areaScores.map((score, idx) => (
          <View key={score.area.id} style={s.areaBlock} wrap={false}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={s.areaName}>
                {String(idx + 1).padStart(2, "0")} · {score.area.nameEs}
              </Text>
            </View>
            <Text style={s.areaScore}>
              Puntaje bruto: {score.rawScore} · T-Score: {score.tScore}
            </Text>
            <Text style={s.areaInterpretation}>
              {score.interpretationEs}
            </Text>
          </View>
        ))}

        {/* ── Total sensorial ── */}
        <View style={{ marginTop: 16, padding: 12, backgroundColor: C.petrol, borderRadius: 4 }} wrap={false}>
          <Text style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>
            Puntaje total de la pauta procesamiento sensorial {formLabel}:
          </Text>
          <Text style={{ color: C.teal, fontSize: 10, marginTop: 4, fontFamily: "Courier" }}>
            Obtiene {result.sensoryTotal.rawScore} puntos, T-Score: {result.sensoryTotal.tScore}
          </Text>
          <Text style={{ color: "#fff", fontSize: 10, marginTop: 4, fontWeight: 600 }}>
            Clasificación: {totalClassLabel} del Procesamiento Sensorial
          </Text>
        </View>

        {/* ── Disclaimer ── */}
        <View style={s.disclaimer} wrap={false}>
          <Text style={s.disclaimerText}>
            NOTA: Las tablas T-score utilizadas son aproximadas y deben ser verificadas
            contra el manual oficial SPM-2 antes de emitir un diagnóstico clínico definitivo.
            Este reporte es una herramienta de apoyo para el/la terapeuta ocupacional y no
            reemplaza el juicio clínico profesional.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>OperaHands · Operaria Health · Diseñado por Operaria · operaria.cl</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
