import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { MdqResult } from "@/lib/mdq";
import { MDQ_ITEM_IDS } from "@/lib/mdq";
import { mdqBloques } from "@/lib/verticals/mdq";

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
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: 700 },
  headerSub: { color: C.teal, fontSize: 9, marginTop: 3, letterSpacing: 2 },
  headerBrand: { color: C.teal, fontSize: 8, letterSpacing: 3 },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: `1pt solid ${C.border}`,
  },
  metaLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  metaValue: { color: C.navy, fontSize: 10, marginTop: 2, fontWeight: 600 },
  sectionTitle: {
    color: C.petrol,
    fontSize: 13,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: `1.5pt solid ${C.teal}`,
  },
  resultadoBox: {
    padding: 18,
    borderRadius: 4,
    marginBottom: 14,
  },
  resultadoTitulo: { color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 0.5 },
  resultadoSub: { color: "#fff", fontSize: 10, marginTop: 4, opacity: 0.9 },
  criterioRow: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottom: `0.5pt solid ${C.border}`,
    alignItems: "center",
  },
  criterioBullet: {
    width: 14, height: 14,
    borderRadius: 7,
    marginRight: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 9,
    fontWeight: 700,
    paddingTop: 1,
  },
  criterioLabel: { flex: 1, fontSize: 10, color: C.body },
  criterioValor: { fontSize: 10, color: C.navy, fontWeight: 700 },
  itemRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottom: `0.4pt solid ${C.border}`,
  },
  itemRowAlt: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottom: `0.4pt solid ${C.border}`,
    backgroundColor: C.offwhite,
  },
  itemNumero: { width: 22, fontSize: 9, color: C.muted, fontFamily: "Courier" },
  itemTexto: { flex: 1, fontSize: 9, color: C.body, lineHeight: 1.5 },
  itemValor: { width: 28, fontSize: 9, fontWeight: 700, textAlign: "right" },
  disclaimer: {
    marginTop: 18,
    padding: 12,
    backgroundColor: C.offwhite,
    borderRadius: 4,
    borderLeft: `3pt solid ${C.teal}`,
  },
  disclaimerText: {
    color: C.body,
    fontSize: 9,
    lineHeight: 1.55,
    marginBottom: 6,
  },
  disclaimerTextMuted: {
    color: C.muted,
    fontSize: 8,
    lineHeight: 1.5,
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { color: C.muted, fontSize: 7 },
});

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: MdqResult;
}

// Etiquetas de cada ítem MDQ (los toma desde el vertical para mantener single-source-of-truth).
const SINTOMAS = mdqBloques[0].preguntas;

export function PDFMdqReport({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const positivo = result.clasificacion === "positivo";
  const resColor = positivo ? C.red : C.green;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados MDQ — Cuestionario del Ánimo</Text>
            <Text style={s.headerSub}>MOOD DISORDER QUESTIONNAIRE · TAMIZAJE</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        {/* Meta */}
        <View style={s.meta}>
          <View>
            <Text style={s.metaLabel}>Paciente</Text>
            <Text style={s.metaValue}>{pacienteName}</Text>
          </View>
          {edad ? (
            <View>
              <Text style={s.metaLabel}>Edad</Text>
              <Text style={s.metaValue}>{edad} años</Text>
            </View>
          ) : null}
          {tratanteName ? (
            <View>
              <Text style={s.metaLabel}>Tratante</Text>
              <Text style={s.metaValue}>{tratanteName}</Text>
            </View>
          ) : null}
          <View>
            <Text style={s.metaLabel}>Fecha</Text>
            <Text style={s.metaValue}>{fecha}</Text>
          </View>
          <View>
            <Text style={s.metaLabel}>Instrumento</Text>
            <Text style={s.metaValue}>MDQ (Hirschfeld)</Text>
          </View>
        </View>

        {/* Resultado principal */}
        <View style={[s.resultadoBox, { backgroundColor: resColor }]}>
          <Text style={s.resultadoTitulo}>
            {positivo ? "Tamizaje POSITIVO" : "Tamizaje NEGATIVO"}
          </Text>
          <Text style={s.resultadoSub}>
            {positivo
              ? "El paciente cumple los tres criterios del MDQ. Se sugiere evaluación por psiquiatra."
              : "El paciente no cumple los tres criterios del MDQ en este momento."}
          </Text>
        </View>

        {/* Criterios */}
        <Text style={s.sectionTitle}>Criterios del MDQ</Text>

        <View style={s.criterioRow}>
          <Text style={[s.criterioBullet, { backgroundColor: result.cumpleSintomas ? C.green : C.muted }]}>
            {result.cumpleSintomas ? "✓" : "×"}
          </Text>
          <Text style={s.criterioLabel}>
            ≥ 7 síntomas en «Sí» (manía/hipomanía)
          </Text>
          <Text style={s.criterioValor}>
            {result.sintomasSi} / {result.totalItems}
          </Text>
        </View>

        <View style={s.criterioRow}>
          <Text style={[s.criterioBullet, { backgroundColor: result.cumpleCoocurrencia ? C.green : C.muted }]}>
            {result.cumpleCoocurrencia ? "✓" : "×"}
          </Text>
          <Text style={s.criterioLabel}>
            Co-ocurrencia: varios síntomas en un mismo período
          </Text>
          <Text style={s.criterioValor}>
            {result.coocurrencia ?? "—"}
          </Text>
        </View>

        <View style={s.criterioRow}>
          <Text style={[s.criterioBullet, { backgroundColor: result.cumpleProblema ? C.green : C.muted }]}>
            {result.cumpleProblema ? "✓" : "×"}
          </Text>
          <Text style={s.criterioLabel}>
            Nivel de problema: moderado o serio
          </Text>
          <Text style={s.criterioValor}>
            {result.nivelProblema ?? "—"}
          </Text>
        </View>

        {/* Detalle ítem por ítem */}
        <Text style={s.sectionTitle}>Respuestas por ítem</Text>

        <View style={{ marginBottom: 4 }}>
          {SINTOMAS.map((p, i) => {
            const id = MDQ_ITEM_IDS[i];
            const respuesta = result.itemsResponseSi.includes(id) ? "Sí" : "No";
            const color = respuesta === "Sí" ? C.red : C.muted;
            return (
              <View key={id} style={i % 2 === 0 ? s.itemRow : s.itemRowAlt} wrap={false}>
                <Text style={s.itemNumero}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.itemTexto}>{p.label.replace(/^…/, "")}</Text>
                <Text style={[s.itemValor, { color }]}>{respuesta}</Text>
              </View>
            );
          })}
        </View>

        {/* Disclaimer */}
        <View style={s.disclaimer} wrap={false}>
          <Text style={[s.disclaimerText, { fontWeight: 700, color: C.petrol }]}>
            Importante: esto es un tamizaje, NO un diagnóstico.
          </Text>
          <Text style={s.disclaimerText}>
            {positivo
              ? "Un tamizaje positivo indica que existen elementos compatibles con episodios de manía o hipomanía y sugiere derivación a un médico psiquiatra para evaluación clínica formal. El diagnóstico de trastorno bipolar requiere entrevista clínica completa."
              : "Un tamizaje negativo no descarta un trastorno del ánimo. Si existen síntomas que generan malestar o disfunción, se recomienda consulta con un especialista en salud mental."}
          </Text>
          <Text style={s.disclaimerTextMuted}>
            MDQ — Mood Disorder Questionnaire (Hirschfeld et al., 2000). Versión en español difundida por la
            Sociedad Chilena de Trastorno Bipolar (SOCHITAB). Reproducido con permiso del Dr. Robert Hirschfeld.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Hands-SM · Operaria Health · Diseñado por Operaria · operaria.cl</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
