import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Dass21Result, Dass21Banda, Dass21SubescalaResult } from "@/lib/dass21";
import {
  dass21BandaLabel,
  dass21SubescalaLabel,
  dass21Interpretacion,
} from "@/lib/dass21";

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
  redDeep: "#9B1C0F",
};

function bandaColor(b: Dass21Banda): string {
  if (b === "normal") return C.green;
  if (b === "leve") return C.yellow;
  if (b === "moderada") return C.orange;
  if (b === "severa") return C.red;
  return C.redDeep;
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
  // Tres cards de subescala
  cards: { flexDirection: "row", gap: 8, marginBottom: 14 },
  card: { flex: 1, padding: 12, borderRadius: 4 },
  cardLabel: { color: "#fff", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.85 },
  cardScore: { color: "#fff", fontSize: 28, fontWeight: 700, marginTop: 4, fontFamily: "Courier" },
  cardBanda: { color: "#fff", fontSize: 10, fontWeight: 700, marginTop: 2 },
  sectionTitle: { color: C.petrol, fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5pt solid ${C.teal}` },
  subTitle: { color: C.navy, fontSize: 11, fontWeight: 700, marginTop: 10, marginBottom: 4 },
  subDetalle: { color: C.muted, fontSize: 9, marginBottom: 4, fontFamily: "Courier" },
  interpretacionBox: { padding: 10, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}`, marginBottom: 6 },
  interpretacionText: { color: C.body, fontSize: 9.5, lineHeight: 1.55 },
  disclaimer: { marginTop: 18, padding: 12, backgroundColor: C.offwhite, borderRadius: 4, borderLeft: `3pt solid ${C.teal}` },
  disclaimerText: { color: C.body, fontSize: 9, lineHeight: 1.55, marginBottom: 6 },
  disclaimerTextMuted: { color: C.muted, fontSize: 8, lineHeight: 1.5, marginTop: 6 },
  footer: { position: "absolute", bottom: 24, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between" },
  footerText: { color: C.muted, fontSize: 7 },
});

function maxBanda(...bandas: Dass21Banda[]): Dass21Banda {
  const orden: Dass21Banda[] = ["normal", "leve", "moderada", "severa", "ext_severa"];
  let best: Dass21Banda = "normal";
  for (const b of bandas) {
    if (orden.indexOf(b) > orden.indexOf(best)) best = b;
  }
  return best;
}

interface Props {
  pacienteName: string;
  edad?: string;
  fecha: string;
  tratanteName?: string;
  result: Dass21Result;
}

function SubescalaBlock({ sub }: { sub: Dass21SubescalaResult }) {
  return (
    <View wrap={false} style={{ marginBottom: 6 }}>
      <Text style={s.subTitle}>{dass21SubescalaLabel(sub.subescala)} — {dass21BandaLabel(sub.banda)}</Text>
      <Text style={s.subDetalle}>
        Suma cruda: {sub.rawSum}/21 · Puntaje DASS-42: {sub.score}
      </Text>
      <View style={s.interpretacionBox}>
        <Text style={s.interpretacionText}>{dass21Interpretacion(sub.subescala, sub.banda)}</Text>
      </View>
    </View>
  );
}

export function PDFDass21Report({ pacienteName, edad, fecha, tratanteName, result }: Props) {
  const peor = maxBanda(result.depresion.banda, result.ansiedad.banda, result.estres.banda);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <View>
            <Text style={s.headerTitle}>Resultados DASS-21</Text>
            <Text style={s.headerSub}>DEPRESIÓN · ANSIEDAD · ESTRÉS — 21 ÍTEMS</Text>
          </View>
          <Text style={s.headerBrand}>OPERARIA HEALTH</Text>
        </View>

        <View style={s.meta}>
          <View><Text style={s.metaLabel}>Paciente</Text><Text style={s.metaValue}>{pacienteName}</Text></View>
          {edad ? <View><Text style={s.metaLabel}>Edad</Text><Text style={s.metaValue}>{edad} años</Text></View> : null}
          {tratanteName ? <View><Text style={s.metaLabel}>Tratante</Text><Text style={s.metaValue}>{tratanteName}</Text></View> : null}
          <View><Text style={s.metaLabel}>Fecha</Text><Text style={s.metaValue}>{fecha}</Text></View>
          <View><Text style={s.metaLabel}>Instrumento</Text><Text style={s.metaValue}>DASS-21 (Lovibond 1995)</Text></View>
        </View>

        <View style={s.cards}>
          {[result.depresion, result.ansiedad, result.estres].map((sub) => (
            <View key={sub.subescala} style={[s.card, { backgroundColor: bandaColor(sub.banda) }]}>
              <Text style={s.cardLabel}>{dass21SubescalaLabel(sub.subescala)}</Text>
              <Text style={s.cardScore}>{sub.score}</Text>
              <Text style={s.cardBanda}>{dass21BandaLabel(sub.banda)}</Text>
            </View>
          ))}
        </View>

        <Text style={s.sectionTitle}>Interpretación por dimensión</Text>
        <SubescalaBlock sub={result.depresion} />
        <SubescalaBlock sub={result.ansiedad} />
        <SubescalaBlock sub={result.estres} />

        <View style={s.disclaimer} wrap={false}>
          <Text style={[s.disclaimerText, { fontWeight: 700, color: C.petrol }]}>
            Importante: esto es un tamizaje, NO un diagnóstico.
          </Text>
          <Text style={s.disclaimerText}>
            El DASS-21 mide la intensidad de tres dimensiones del malestar
            emocional durante la última semana. Resultados en rango moderado o
            superior {peor !== "normal" ? `(como en este caso, con dimensión más alta en rango ${dass21BandaLabel(peor).toLowerCase()})` : ""}
            {" "}sugieren evaluación por profesional de salud mental.
          </Text>
          <Text style={s.disclaimerTextMuted}>
            DASS-21 — Depression Anxiety Stress Scales (Lovibond & Lovibond, 1995).
            Versión en español validada en Chile (Antúnez & Vinet 2012).
            Los puntajes se reportan multiplicados por 2 para compararlos con los baremos DASS-42.
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
