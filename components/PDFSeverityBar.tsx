import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Franja de semaforización clínica para los informes Hands-SM.
// Pegada al scoreBox principal (sin separación), colores al 100% sin atenuar.
// Una sola línea por segmento: "label · rango" (ej: "II · 8-15"). El segmento
// activo se destaca con peso fuerte + franja blanca delgada al pie. Ver
// conversación con Francisco (jun 2026) en
// proyecto-web/reflexion-vera-francisco.md.

const s = StyleSheet.create({
  bar: { flexDirection: "row", borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: "hidden", marginBottom: 14 },
  segment: { flex: 1, height: 14, alignItems: "center", justifyContent: "center" },
  label: { color: "#fff", fontSize: 7, fontWeight: 500, letterSpacing: 0.4, textAlign: "center", opacity: 0.72 },
  labelActive: { color: "#fff", fontSize: 7, fontWeight: 700, letterSpacing: 0.4, textAlign: "center", opacity: 1 },
});

export interface SeverityLevel {
  /** Etiqueta corta (ej: "Leve", "II", "Moderada"). */
  label: string;
  /** Rango numérico (ej: "0–7", "≥33", "8–14"). */
  rango: string;
  /** Color sólido del segmento. Sin atenuación. */
  color: string;
}

interface Props {
  niveles: SeverityLevel[];
  activeIndex: number;
}

export function PDFSeverityBar({ niveles, activeIndex }: Props) {
  return (
    <View style={s.bar}>
      {niveles.map((n, i) => {
        const activo = i === activeIndex;
        return (
          <View key={i} style={[s.segment, { backgroundColor: n.color }]}>
            <Text style={activo ? s.labelActive : s.label}>{n.label} · {n.rango}</Text>
          </View>
        );
      })}
    </View>
  );
}
