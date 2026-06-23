import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Cotización branded San Jorge Packaging (espejo de vera-cotiza/cotizacion.html).
// Doypack/Pouche: Cantidad · Precio unitario · Total.
// Film: Kilos · Unidades aprox · Precio kilo · Precio unitario · Total.

const C = {
  verde: "#6E9F43",
  verdeOsc: "#5A8636",
  chip: "#E4EFD3",
  tinta: "#3D4450",
  navy: "#1E2D3D",
  gris: "#9E9C96",
  linea: "#D6D2CB",
  suave: "#F2F0EB",
};

export type TramoPdf = {
  unidad: "kg" | "u";
  cantidad: number;
  unitario_neto: number;
  total_neto: number;
  bajo_minimo?: boolean;
  precio_kilo?: number;
  kilos?: number;
  unidades_aprox?: number;
  error?: string;
};
export type ProductoPdf = {
  descripcion: string;
  tipo: string; // "Film" | "Doypack" | "Pouche"
  tramos: TramoPdf[];
};
export type CotizacionPdfData = {
  num: string;
  fecha: string;
  cliente: string;
  productos: ProductoPdf[];
};

const clp = (n: number) => "$ " + Math.round(n || 0).toLocaleString("es-CL");
const u = (n: number) => Math.round(n || 0).toLocaleString("es-CL");

const s = StyleSheet.create({
  page: { fontSize: 10, color: C.tinta, fontFamily: "Helvetica", paddingBottom: 56 },
  hd: { backgroundColor: C.verde, color: "#fff", paddingTop: 24, paddingBottom: 16, paddingHorizontal: 40 },
  hdRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  hdTitle: { fontSize: 34, color: "#fff" },
  hdMarca: { fontSize: 18, color: "#fff" },
  hdMarcaDd: { color: "#CFE3B4" },
  hr: { borderBottomWidth: 1, borderBottomColor: "#8FB86A", marginTop: 14, marginBottom: 12 },
  meta: { flexDirection: "row", gap: 40 },
  metaLab: { fontSize: 8, letterSpacing: 2, color: "#E7F0DA", textTransform: "uppercase", marginBottom: 4 },
  metaVal: { fontSize: 12, color: "#fff" },
  body: { paddingHorizontal: 40, paddingTop: 18 },
  h2: { color: C.navy, fontSize: 15, fontWeight: 700, marginTop: 14, marginBottom: 5 },
  h2g: { color: C.verde },
  desc: { fontSize: 11, lineHeight: 1.5, color: C.tinta },
  thead: { flexDirection: "row", backgroundColor: C.verde },
  th: { color: "#fff", fontSize: 8.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: 8 },
  tr: { flexDirection: "row", borderBottom: `0.5pt solid ${C.linea}` },
  td: { fontSize: 11, padding: 9, color: C.tinta },
  totalRow: { flexDirection: "row", marginTop: 10 },
  totalLbl: { fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, color: C.verdeOsc, flex: 1 },
  totalAmt: { fontSize: 16, fontWeight: 700, color: C.verdeOsc, textAlign: "right" },
  nota: { fontSize: 9, color: C.gris, fontStyle: "italic", textAlign: "right", marginTop: 8 },
  cg: { backgroundColor: C.suave, borderLeft: `3pt solid ${C.verde}`, borderRadius: 5, padding: 14, marginTop: 16 },
  cgT: { color: C.verdeOsc, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 },
  cgLi: { flexDirection: "row", paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: C.linea, borderBottomStyle: "dashed" },
  cgK: { color: C.verdeOsc, fontSize: 8.5, letterSpacing: 0.5, textTransform: "uppercase", width: 150 },
  cgV: { fontSize: 10, color: C.tinta, flex: 1 },
  cierre: { fontSize: 11, color: C.gris, fontStyle: "italic", marginTop: 14, marginBottom: 6 },
  firma: { textAlign: "center", marginTop: 20 },
  firmaN: { fontWeight: 700, fontSize: 13, color: C.navy },
  firmaX: { fontSize: 8.5, letterSpacing: 1, color: C.gris, textTransform: "uppercase", marginTop: 4, lineHeight: 1.7 },
  ft: { position: "absolute", bottom: 30, left: 40, right: 40, borderTop: `0.5pt solid ${C.linea}`, paddingTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  ftSj: { fontSize: 9, letterSpacing: 1, fontWeight: 700, color: C.tinta, textTransform: "uppercase" },
  ftOp: { fontSize: 7, letterSpacing: 0.5, color: "#BBB9B3", textTransform: "uppercase" },
  ftUrl: { color: "#A9C48E", textTransform: "none" },
});

function chipify(desc: string) {
  // Resalta tipo, medidas y estructura con "chips" verdes.
  const re = /(Doypack|Pouche|Film|\d[\d ]*×[\d ]*\d+(?:\s*\+\s*\d+)?\s*mm|Monol[aá]mina|Bil[aá]mina|Tril[aá]mina)/g;
  const parts: { t: string; chip: boolean }[] = [];
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(desc)) !== null) {
    if (m.index > last) parts.push({ t: desc.slice(last, m.index), chip: false });
    parts.push({ t: m[0], chip: true });
    last = m.index + m[0].length;
  }
  if (last < desc.length) parts.push({ t: desc.slice(last), chip: false });
  return parts;
}

function Tabla({ p }: { p: ProductoPdf }) {
  const film = p.tipo.toLowerCase() === "film";
  if (film) {
    return (
      <View>
        <View style={s.thead}>
          <Text style={[s.th, { flex: 1.2 }]}>Kilos</Text>
          <Text style={[s.th, { flex: 1.5, textAlign: "right" }]}>Unidades aprox.</Text>
          <Text style={[s.th, { flex: 1.4, textAlign: "right" }]}>Precio kilo</Text>
          <Text style={[s.th, { flex: 1.5, textAlign: "right" }]}>Precio unitario</Text>
          <Text style={[s.th, { flex: 1.5, textAlign: "right" }]}>Total</Text>
        </View>
        {p.tramos.map((t, i) =>
          t.error ? (
            <View key={i} style={s.tr}>
              <Text style={[s.td, { flex: 5, color: "#C1121F" }]}>{u(t.cantidad)} {t.unidad} — sin precio: {t.error}</Text>
            </View>
          ) : (
            <View key={i} style={s.tr}>
              <Text style={[s.td, { flex: 1.2 }]}>{u(t.kilos ?? t.cantidad)} kg{t.bajo_minimo ? " *" : ""}</Text>
              <Text style={[s.td, { flex: 1.5, textAlign: "right" }]}>{u(t.unidades_aprox ?? 0)} u</Text>
              <Text style={[s.td, { flex: 1.4, textAlign: "right" }]}>{clp(t.precio_kilo ?? 0)}</Text>
              <Text style={[s.td, { flex: 1.5, textAlign: "right" }]}>{clp(t.unitario_neto)}</Text>
              <Text style={[s.td, { flex: 1.5, textAlign: "right" }]}>{clp(t.total_neto)}</Text>
            </View>
          )
        )}
      </View>
    );
  }
  return (
    <View>
      <View style={s.thead}>
        <Text style={[s.th, { flex: 2 }]}>Cantidad</Text>
        <Text style={[s.th, { flex: 1.5, textAlign: "right" }]}>Precio unitario</Text>
        <Text style={[s.th, { flex: 1.5, textAlign: "right" }]}>Total</Text>
      </View>
      {p.tramos.map((t, i) =>
        t.error ? (
          <View key={i} style={s.tr}>
            <Text style={[s.td, { flex: 5, color: "#C1121F" }]}>{u(t.cantidad)} {t.unidad} — sin precio: {t.error}</Text>
          </View>
        ) : (
          <View key={i} style={s.tr}>
            <Text style={[s.td, { flex: 2 }]}>{u(t.cantidad)} unid{t.bajo_minimo ? " *" : ""}</Text>
            <Text style={[s.td, { flex: 1.5, textAlign: "right" }]}>{clp(t.unitario_neto)}</Text>
            <Text style={[s.td, { flex: 1.5, textAlign: "right" }]}>{clp(t.total_neto)}</Text>
          </View>
        )
      )}
    </View>
  );
}

export function PDFCotizacion({ data }: { data: CotizacionPdfData }) {
  const granTotal = data.productos.reduce(
    (s, p) => s + p.tramos.reduce((a, t) => a + (t.total_neto || 0), 0), 0);
  const hayBajoMin = data.productos.some((p) => p.tramos.some((t) => t.bajo_minimo));
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.hd}>
          <View style={s.hdRow}>
            <Text style={s.hdTitle}>Cotización</Text>
            <Text style={s.hdMarca}>san jorge<Text style={s.hdMarcaDd}>::</Text>packaging</Text>
          </View>
          <View style={s.hr} />
          <View style={s.meta}>
            <View><Text style={s.metaLab}>Cotización N°</Text><Text style={s.metaVal}>{data.num}</Text></View>
            <View><Text style={s.metaLab}>Fecha</Text><Text style={s.metaVal}>{data.fecha}</Text></View>
            <View><Text style={s.metaLab}>Cliente</Text><Text style={s.metaVal}>{data.cliente}</Text></View>
          </View>
        </View>

        <View style={s.body}>
          {data.productos.map((p, i) => (
            <View key={i} wrap={false}>
              <Text style={s.h2}>Producto{data.productos.length > 1 ? ` ${i + 1}` : ""}</Text>
              <Text style={s.desc}>
                {chipify(p.descripcion).map((part, j) =>
                  part.chip
                    ? <Text key={j} style={{ color: C.verdeOsc, fontWeight: 700 }}>{part.t}</Text>
                    : <Text key={j}>{part.t}</Text>
                )}
              </Text>
              <Text style={s.h2}>Cantidad y <Text style={s.h2g}>valor</Text></Text>
              <Tabla p={p} />
            </View>
          ))}

          <View style={s.totalRow}>
            <Text style={s.totalLbl}>Valor total</Text>
            <Text style={s.totalAmt}>{clp(granTotal)}</Text>
          </View>
          <Text style={s.nota}>
            Valores netos. IVA adicional.{hayBajoMin ? "  (*) cantidad bajo el mínimo de producción." : ""}
          </Text>

          <View style={s.cg}>
            <Text style={s.cgT}>Condiciones generales</Text>
            <View style={s.cgLi}><Text style={s.cgK}>Plazo de entrega</Text><Text style={s.cgV}>20 días hábiles una vez aprobado artes y/o V°B° color</Text></View>
            <View style={s.cgLi}><Text style={s.cgK}>Condiciones de pago</Text><Text style={s.cgV}>50% con OC y 50% contra entrega</Text></View>
            <View style={s.cgLi}><Text style={s.cgK}>Variación en la entrega</Text><Text style={s.cgV}>± 10 %</Text></View>
            <View style={[s.cgLi, { borderBottomWidth: 0 }]}><Text style={s.cgK}>Validez de la oferta</Text><Text style={s.cgV}>15 días hábiles desde emisión</Text></View>
          </View>

          <Text style={s.cierre}>Quedamos atentos a sus comentarios para avanzar con el proceso.</Text>

          <View style={s.firma} wrap={false}>
            <Text style={s.firmaN}>Cinthia Herrera N.</Text>
            <Text style={s.firmaX}>KAM Retail{"\n"}cherrera@sjp.cl{"\n"}+569 4207 2996</Text>
          </View>
        </View>

        <View style={s.ft} fixed>
          <Text style={s.ftSj}>San Jorge Packaging · SJP.CL</Text>
          <Text style={s.ftOp}>Diseñado por Operaria  <Text style={s.ftUrl}>operaria.cl</Text></Text>
        </View>
      </Page>
    </Document>
  );
}
