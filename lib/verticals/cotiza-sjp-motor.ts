/**
 * Auto-cotización de la encuesta cotiza-sjp.
 *
 * Los campos de la encuesta ya vienen estructurados (medidas, estructura, kg,
 * unidades…), así que NO se necesita extracción con IA: se mapean directo al
 * contrato del motor oficial (vera-cotiza, cotizador.operaria.cl/api/cotizar) y
 * se inyecta el resultado en el mismo correo que ya manda el submit.
 *
 * Motor validado: Film (✅). Doypack/Pouche siguen en proceso → sus montos se
 * marcan como preliminares. El correo va a revisión interna, no al cliente.
 */
import type { Respuestas, RespuestaValor } from "../types";
import type { CotizacionPdfData } from "@/components/PDFCotizacion";

const COTIZADOR_URL =
  process.env.COTIZADOR_URL || "https://cotizador.operaria.cl/api/cotizar";

const MAX_PRODUCTOS = 5;
const ESTRUCTURA_ID: Record<string, string> = {
  "Monolámina": "1",
  "Bilámina": "2",
  "Trilámina": "3",
};

type Tramo = {
  cantidad: number;
  unidad: "kg" | "u";
  unitario_neto: number;
  unitario_iva: number;
  total_neto: number;
  total_iva: number;
  bajo_minimo: boolean;
  // Film: el motor devuelve los dos lados de la conversión + precio/kilo.
  precio_kilo?: number;
  kilos?: number;
  unidades_aprox?: number;
  error?: string;
};

export type CotizacionProducto = {
  etiqueta: string;
  tipo: string;
  descripcion: string; // línea "Doypack de N diseño(s)… Medidas… Estructura…"
  preliminar: boolean; // true para doypack/pouche (motor en proceso)
  tramos: Tramo[];
};

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

/** Extrae números de un campo libre: "5.000 y 10.000" → [5000, 10000]. */
function parseCantidades(v: RespuestaValor | undefined): number[] {
  if (v === undefined || v === null) return [];
  return String(v)
    .split(/[^0-9.]+/)
    .map((x) => x.replace(/\./g, ""))
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);
}

function tieneAccesorio(v: RespuestaValor | undefined, sub: string): boolean {
  if (Array.isArray(v)) return (v as string[]).some((x) => String(x).includes(sub));
  if (v && typeof v === "object" && "seleccion" in v)
    return (v.seleccion as string[]).some((x) => String(x).includes(sub));
  return false;
}

const num = (v: RespuestaValor | undefined): string => {
  const n = Number(v);
  return Number.isFinite(n) ? String(n) : "0";
};

/** Construye una o más queries al motor para el producto n (varias si hay
 *  múltiples cantidades). Devuelve null si el producto no está definido. */
function queriesProducto(r: Respuestas, n: number): { tipo: string; preliminar: boolean; queries: { cantidad: number; unidad: "kg" | "u"; qs: string }[] } | null {
  const P = `prod${n}_`;
  const tipoRaw = String(r[`${P}tipo`] || "");
  if (!tipoRaw) return null;

  if (tipoRaw === "Film") {
    const estructura = ESTRUCTURA_ID[String(r[`${P}estructura`] || "Bilámina")] || "2";
    const base: Record<string, string> = {
      tipo: "film",
      alto: num(r[`${P}film_alto`]), // alto = paso de taca
      paso: num(r[`${P}film_largo`]), // paso = largo (ancho)
      colores: "4",
      n_disenos: num(r[`${P}disenos`]) || "1",
      estructura,
      modo: "real",
    };
    if (r[`${P}mat_imp`]) base.material_imp = String(r[`${P}mat_imp`]);
    if (r[`${P}mat_med`]) base.material_med = String(r[`${P}mat_med`]);
    if (r[`${P}mat_sello`]) base.material_sello = String(r[`${P}mat_sello`]);
    // El cliente indicó la cantidad en kilos o en unidades.
    if (String(r[`${P}film_modo_cant`] || "Kilos") === "Unidades") {
      const u = Number(r[`${P}film_unidades`]) || 0;
      if (!u) return { tipo: "Film", preliminar: false, queries: [] };
      const q = new URLSearchParams({ ...base, unidades: String(u) });
      return { tipo: "Film", preliminar: false, queries: [{ cantidad: u, unidad: "u", qs: q.toString() }] };
    }
    const kg = Number(r[`${P}kilos`]) || 0;
    if (!kg) return { tipo: "Film", preliminar: false, queries: [] };
    const q = new URLSearchParams({ ...base, kg: String(kg) });
    return { tipo: "Film", preliminar: false, queries: [{ cantidad: kg, unidad: "kg", qs: q.toString() }] };
  }

  // Doypack / Pouche (motor en proceso → preliminar)
  const estructura = ESTRUCTURA_ID[String(r[`${P}estructura`] || "Bilámina")] || "2";
  const cantidades = parseCantidades(r[`${P}envases`]);
  const accesorios = r[`${P}accesorios`];
  const base: Record<string, string> = {
    tipo: tipoRaw.toLowerCase(),
    alto: num(r[`${P}alto`]),
    ancho: num(r[`${P}ancho`]),
    colores: "4",
    n_disenos: num(r[`${P}disenos`]) || "1",
    estructura,
  };
  if (r[`${P}fuelle`]) base.fuelle = num(r[`${P}fuelle`]);
  if (r[`${P}mat_imp`]) base.material_imp = String(r[`${P}mat_imp`]);
  if (r[`${P}mat_med`]) base.material_med = String(r[`${P}mat_med`]);
  if (r[`${P}mat_sello`]) base.material_sello = String(r[`${P}mat_sello`]);
  if (tieneAccesorio(accesorios, "Zipper")) base.zipper = "1";
  if (tieneAccesorio(accesorios, "Válvula corner")) base.valvula_corner = "1";
  if (tieneAccesorio(accesorios, "Válvula frontal")) base.valvula_frontal = "1";
  // "Válvula desgasificadora" (no corner/frontal) -> válvula clásica por metro.
  if (tieneAccesorio(accesorios, "Válvula desgasificadora")) base.valvula = "1";
  if (tieneAccesorio(accesorios, "Perforación")) base.perforacion = "1";

  const queries = (cantidades.length ? cantidades : [0]).map((cantidad) => {
    const q = new URLSearchParams({ ...base, unidades: String(cantidad) });
    return { cantidad, unidad: "u" as const, qs: q.toString() };
  });
  return { tipo: tipoRaw, preliminar: true, queries };
}

/** Línea descriptiva del producto n, espejo de la del cotizador. */
function descProducto(r: Respuestas, n: number): string {
  const P = `prod${n}_`;
  const tipo = String(r[`${P}tipo`] || "");
  const dis = num(r[`${P}disenos`]) || "1";
  const estr = String(r[`${P}estructura`] || "");
  const mats = [r[`${P}mat_imp`], r[`${P}mat_med`], r[`${P}mat_sello`]]
    .filter(Boolean).map(String).join(" + ");
  const cola = estr ? ` Estructura ${estr}${mats ? `: ${mats}` : ""}.` : "";
  if (tipo === "Film") {
    const med = `${num(r[`${P}film_largo`])} × ${num(r[`${P}film_alto`])} mm`;
    return `Film de ${dis} diseño(s) a 4 colores. Medidas: ${med}.${cola}`;
  }
  const fuelle = r[`${P}fuelle`] ? ` + ${num(r[`${P}fuelle`])}` : "";
  const med = `${num(r[`${P}ancho`])} × ${num(r[`${P}alto`])}${fuelle} mm`;
  return `${tipo || "Envase"} de ${dis} diseño(s) a 4 colores. Medidas: ${med}.${cola}`;
}

async function pedirMotor(qs: string): Promise<Record<string, unknown> | null> {
  try {
    const resp = await fetch(`${COTIZADOR_URL}?${qs}`, {
      headers: { accept: "application/json" },
    });
    return (await resp.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Cotiza todos los productos activos de la encuesta contra el motor oficial. */
export async function cotizarSjp(r: Respuestas): Promise<CotizacionProducto[]> {
  const out: CotizacionProducto[] = [];
  for (let n = 1; n <= MAX_PRODUCTOS; n++) {
    const activo = n === 1 || r[`add_${n - 1}`] === true;
    if (!activo) break;
    const plan = queriesProducto(r, n);
    if (!plan) continue;

    const etiqueta =
      String(r[`prod${n}_producto`] || "") ||
      `Producto ${n} (${plan.tipo})`;
    const tramos: Tramo[] = [];
    for (const { cantidad, unidad, qs } of plan.queries) {
      const d = await pedirMotor(qs);
      if (!d || d.ok !== true) {
        tramos.push({
          cantidad, unidad,
          unitario_neto: 0, unitario_iva: 0, total_neto: 0, total_iva: 0,
          bajo_minimo: false,
          error: (d && (d.error as string)) || "el motor no respondió",
        });
        continue;
      }
      tramos.push({
        cantidad: Number(d.cantidad_pedida ?? cantidad),
        unidad: (d.unidad_pedido as "kg" | "u") || unidad,
        unitario_neto: Number(d.precio_unitario) || 0,
        unitario_iva: Number(d.precio_unitario_iva) || 0,
        total_neto: Number(d.venta_neto) || 0,
        total_iva: Number(d.venta_iva) || 0,
        bajo_minimo: Boolean(d.bajo_minimo),
        precio_kilo: d.precio_kilo != null ? Number(d.precio_kilo) : undefined,
        kilos: d.kilos != null ? Number(d.kilos) : undefined,
        unidades_aprox: d.unidades != null ? Number(d.unidades) : undefined,
      });
    }
    out.push({ etiqueta, tipo: plan.tipo, descripcion: descProducto(r, n), preliminar: plan.preliminar, tramos });
  }
  return out;
}

/** Convierte el resultado de cotizarSjp en los datos del PDF branded.
 *  Incluye todos los productos, incluso los que tienen errores (se renderizan como "sin precio").
 */
export function cotizacionPdfData(
  num_: string, fecha: string, cliente: string, productos: CotizacionProducto[],
): CotizacionPdfData {
  return {
    num: num_, fecha, cliente,
    productos: productos.map((p) => ({
      descripcion: p.descripcion,
      tipo: p.tipo,
      tramos: p.tramos.map((t) => ({
        unidad: t.unidad, cantidad: t.cantidad,
        unitario_neto: t.unitario_neto, total_neto: t.total_neto,
        bajo_minimo: t.bajo_minimo,
        precio_kilo: t.precio_kilo, kilos: t.kilos, unidades_aprox: t.unidades_aprox,
        error: t.error, // incluir error para renderizar en PDF si existe
      })),
    })),
  };
}

/** Bloque HTML con la cotización, para sumar al correo del submit. */
export function cotizacionHtml(productos: CotizacionProducto[]): string {
  if (!productos.length) return "";
  const hayPreliminar = productos.some((p) => p.preliminar);

  const filas = productos
    .map((p) => {
      const tramos = p.tramos
        .map((t) => {
          if (t.error) {
            return `<tr><td colspan="3" style="padding:6px 8px;color:#B23A48;font-size:13px;">
              ${t.cantidad ? `${t.cantidad.toLocaleString("es-CL")} ${t.unidad} — ` : ""}sin precio: ${t.error}</td></tr>`;
          }
          // Film: se cobra por kilo. Mostramos los dos lados (kilos ↔ unidades
          // aprox), el precio/kilo y el precio/unidad.
          if (p.tipo === "Film" && t.precio_kilo != null) {
            const kilos = t.kilos != null
              ? (Math.round(t.kilos * 10) / 10).toLocaleString("es-CL")
              : (t.unidad === "kg" ? t.cantidad.toLocaleString("es-CL") : "—");
            const uaprox = t.unidades_aprox != null
              ? Math.round(t.unidades_aprox).toLocaleString("es-CL")
              : "—";
            return `<tr>
              <td style="padding:6px 8px;font-size:13px;">${kilos} kg ≈ ${uaprox} u${t.bajo_minimo ? " <span style='color:#E8A838;'>(bajo mínimo)</span>" : ""}</td>
              <td style="padding:6px 8px;font-size:13px;text-align:right;">${clp(t.precio_kilo)} <span style="color:#9E9C96;">/kg</span> · ${clp(t.unitario_neto)} <span style="color:#9E9C96;">c/u</span></td>
              <td style="padding:6px 8px;font-size:13px;text-align:right;font-weight:600;">${clp(t.total_neto)} <span style="color:#9E9C96;font-weight:400;">+IVA ${clp(t.total_iva)}</span></td>
            </tr>`;
          }
          return `<tr>
            <td style="padding:6px 8px;font-size:13px;">${t.cantidad.toLocaleString("es-CL")} ${t.unidad}${t.bajo_minimo ? " <span style='color:#E8A838;'>(bajo mínimo)</span>" : ""}</td>
            <td style="padding:6px 8px;font-size:13px;text-align:right;">${clp(t.unitario_neto)} <span style="color:#9E9C96;">c/u</span></td>
            <td style="padding:6px 8px;font-size:13px;text-align:right;font-weight:600;">${clp(t.total_neto)} <span style="color:#9E9C96;font-weight:400;">+IVA ${clp(t.total_iva)}</span></td>
          </tr>`;
        })
        .join("");
      const tramosCount = p.tramos.length;
      const nota = tramosCount > 1 ? `<p style="margin:10px 0 0;color:#9E9C96;font-size:11px;font-style:italic;">Cada fila es una opción de precio según cantidad.</p>` : "";
      return `
        <p style="margin:14px 0 4px;font-weight:600;color:#0F1E3A;">${p.etiqueta} · ${p.tipo}${p.preliminar ? " <span style='color:#E8A838;font-weight:400;font-size:12px;'>(preliminar)</span>" : ""}</p>
        <table style="width:100%;border-collapse:collapse;background:#FAF9F6;border-radius:6px;overflow:hidden;">
          ${tramos}
        </table>${nota}`;
    })
    .join("");

  return `
    <hr style="border:none;border-top:1px solid #D6D2CB;margin:18px 0;">
    <div style="background:#1B4D4A;color:#fff;padding:10px 14px;border-radius:6px 6px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;">
      Cotización automática · motor oficial
    </div>
    <div style="background:#fff;padding:14px;border:1px solid #E5E2DC;border-top:none;border-radius:0 0 6px 6px;">
      ${filas}
      ${hayPreliminar ? `<p style="margin:14px 0 0;color:#9E9C96;font-size:12px;">Los montos marcados "preliminar" (Doypack/Pouche) salen de un motor aún en validación: confírmalos antes de enviarlos al cliente. Film es valor en firme.</p>` : ""}
    </div>`;
}
