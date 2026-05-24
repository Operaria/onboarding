"use client";

import type { Pregunta as P, Respuestas, RespuestaValor, TablaFila, ColumnaTabla } from "@/lib/types";

interface Props {
  pregunta: P;
  valor: RespuestaValor | undefined;
  respuestas?: Respuestas;
  onChange: (v: RespuestaValor) => void;
}

const inputBase =
  "w-full font-sans text-[15px] text-body bg-white border border-border rounded px-3 py-2.5 transition-all outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15";

export default function Pregunta({ pregunta, valor, respuestas, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="block font-sans font-semibold text-[15px] text-navy mb-2">
        {pregunta.numero && (
          <span className="font-mono text-teal text-[12px] font-medium mr-1.5">{pregunta.numero}</span>
        )}
        {pregunta.label}
      </label>
      {pregunta.hint && (
        <p className="text-[13px] text-muted -mt-1.5 mb-3">{pregunta.hint}</p>
      )}
      {renderInput(pregunta, valor, onChange, respuestas)}
    </div>
  );
}

function renderInput(
  pregunta: P,
  valor: RespuestaValor | undefined,
  onChange: (v: RespuestaValor) => void,
  respuestas?: Respuestas,
) {
  if (pregunta.tipo === "boolean") {
    const checked = valor === true;
    return (
      <label className="inline-flex items-center gap-2 text-[14px] text-body cursor-pointer px-3 py-2 border border-border rounded bg-white">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{pregunta.placeholder ?? "Sí"}</span>
      </label>
    );
  }
  if (pregunta.tipo === "radio" && pregunta.opcionesDe && respuestas) {
    const fuente = respuestas[pregunta.opcionesDe];
    let opcionesDinamicas: string[] = [];
    if (Array.isArray(fuente) && typeof fuente[0] === "string") {
      opcionesDinamicas = fuente as string[];
    } else if (fuente && typeof fuente === "object" && "seleccion" in (fuente as object)) {
      opcionesDinamicas = (fuente as { seleccion: string[] }).seleccion;
    }
    const current = (valor as string) ?? "";
    if (opcionesDinamicas.length === 0) {
      return <p className="text-[13px] text-muted italic">Marca al menos una opción arriba para poder priorizar.</p>;
    }
    return (
      <div className="flex flex-col gap-2 mt-1">
        {opcionesDinamicas.map((op) => (
          <label
            key={op}
            className="inline-flex items-center gap-1.5 text-[14px] text-body cursor-pointer px-3 py-1.5 border border-border rounded bg-white"
          >
            <input
              type="radio"
              checked={current === op}
              onChange={() => onChange(op)}
            />
            {op}
          </label>
        ))}
      </div>
    );
  }

  if (pregunta.tipo === "texto" || pregunta.tipo === "tel") {
    return (
      <input
        type={pregunta.tipo === "tel" ? "tel" : "text"}
        className={inputBase}
        placeholder={pregunta.placeholder}
        maxLength={pregunta.maxLength}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "number") {
    return (
      <input
        type="number"
        className={inputBase}
        placeholder={pregunta.placeholder}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "textarea") {
    return (
      <textarea
        className={`${inputBase} resize-y min-h-[72px]`}
        placeholder={pregunta.placeholder}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "radio") {
    const current = (valor as string) ?? "";
    return (
      <div className="flex flex-wrap gap-x-4 gap-y-2.5 mt-1">
        {pregunta.opciones?.map((op) => (
          <label
            key={op}
            className="inline-flex items-center gap-1.5 text-[14px] text-body cursor-pointer px-3 py-1.5 border border-border rounded bg-white"
          >
            <input
              type="radio"
              checked={current === op}
              onChange={() => onChange(op)}
            />
            {op}
          </label>
        ))}
      </div>
    );
  }
  if (pregunta.tipo === "select") {
    return (
      <select
        className={inputBase}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">—</option>
        {pregunta.opciones?.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    );
  }
  if (pregunta.tipo === "checkboxes") {
    const v = (valor as { seleccion: string[]; otro?: string }) ?? { seleccion: [], otro: "" };
    const seleccion = v.seleccion ?? [];
    const toggle = (op: string) => {
      const nuevo = seleccion.includes(op) ? seleccion.filter((s) => s !== op) : [...seleccion, op];
      onChange({ seleccion: nuevo, otro: v.otro ?? "" });
    };
    const tieneOtros = seleccion.includes("Otros") || seleccion.includes("Otro");
    return (
      <div>
        <div className="flex flex-wrap gap-x-4 gap-y-2.5 mt-1">
          {pregunta.opciones?.map((op) => (
            <label
              key={op}
              className="inline-flex items-center gap-1.5 text-[14px] text-body cursor-pointer px-3 py-1.5 border border-border rounded bg-white"
            >
              <input
                type="checkbox"
                checked={seleccion.includes(op)}
                onChange={() => toggle(op)}
              />
              {op}
            </label>
          ))}
        </div>
        {tieneOtros && (
          <input
            type="text"
            placeholder="Especifica..."
            className={`${inputBase} mt-3`}
            value={v.otro ?? ""}
            onChange={(e) => onChange({ seleccion, otro: e.target.value })}
          />
        )}
      </div>
    );
  }
  if (pregunta.tipo === "slider") {
    const min = pregunta.min ?? 1;
    const max = pregunta.max ?? 10;
    const val = (typeof valor === "number" ? valor : Math.round((min + max) / 2));
    return (
      <div>
        <div className="text-center mb-2">
          <span className="font-mono text-teal text-[28px] font-medium">{val}</span>
          <span className="font-mono text-muted text-[14px]"> / {max}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-1 font-mono text-[11px] text-muted uppercase tracking-wider">
          <span>{pregunta.labelMin}</span>
          <span>{pregunta.labelMax}</span>
        </div>
      </div>
    );
  }
  if (pregunta.tipo === "tabla") {
    return <Tabla pregunta={pregunta} valor={valor as TablaFila[] | undefined} onChange={onChange} />;
  }
  if (pregunta.tipo === "time") {
    return (
      <input
        type="time"
        className={inputBase}
        value={(valor as string) ?? pregunta.defaultValor ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "likert") {
    const current = (valor as string) ?? "";
    const opciones = pregunta.opciones ?? ["Nunca", "Ocasionalmente", "Frecuentemente", "Siempre"];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        {opciones.map((op, i) => {
          const isSelected = current === op;
          return (
            <button
              key={op}
              type="button"
              onClick={() => onChange(op)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all text-center min-h-[64px] cursor-pointer ${
                isSelected
                  ? "border-teal bg-teal/[0.10] text-navy font-semibold shadow-sm"
                  : "border-border bg-white text-body hover:border-teal/40 hover:bg-teal/[0.04]"
              }`}
            >
              <span className="text-[14px] leading-tight">{op}</span>
              <span className={`text-[11px] mt-0.5 font-mono ${isSelected ? "text-teal" : "text-muted"}`}>
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
  if (pregunta.tipo === "cards") {
    return <Cards pregunta={pregunta} valor={valor as string | undefined} onChange={onChange} />;
  }
  return null;
}

function Cards({
  pregunta,
  valor,
  onChange,
}: {
  pregunta: P;
  valor: string | undefined;
  onChange: (v: RespuestaValor) => void;
}) {
  const cards = pregunta.cards ?? [];
  const selected = valor ?? "";
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {cards.map((card) => {
          const isSelected = selected === card.value;
          if (card.destacado) {
            return (
              <button
                key={card.value}
                type="button"
                onClick={() => onChange(card.value)}
                aria-pressed={isSelected}
                className={`text-left p-5 rounded-lg border-2 transition-all bg-gradient-to-br from-navy to-petrol text-white ${
                  isSelected
                    ? "border-teal shadow-xl ring-2 ring-teal"
                    : "border-transparent hover:border-teal/40"
                }`}
              >
                {card.badge && (
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-teal block mb-2">
                    {card.badge}
                  </span>
                )}
                <h3 className="font-sans font-bold text-white text-[20px]">{card.titulo}</h3>
                <div className="mt-3 space-y-1">
                  <div className="font-mono text-[12px] text-teal">{card.setup}</div>
                  <div className="font-mono text-[12px] text-teal">{card.mrr}</div>
                </div>
                {card.descripcion && (
                  <p className="text-[13px] text-offwhite/90 mt-3 leading-relaxed">{card.descripcion}</p>
                )}
              </button>
            );
          }
          return (
            <button
              key={card.value}
              type="button"
              onClick={() => onChange(card.value)}
              aria-pressed={isSelected}
              className={`text-left p-5 rounded-lg border-2 transition-all bg-white ${
                isSelected
                  ? "border-teal shadow-lg ring-2 ring-teal/40"
                  : "border-border hover:border-teal/60"
              }`}
            >
              {card.badge && (
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-teal block mb-2">
                  {card.badge}
                </span>
              )}
              <h3 className="font-sans font-bold text-navy text-[20px]">{card.titulo}</h3>
              <div className="mt-3 space-y-1">
                <div className="font-mono text-[12px] text-petrol">{card.setup}</div>
                <div className="font-mono text-[12px] text-petrol">{card.mrr}</div>
              </div>
              {card.descripcion && (
                <p className="text-[13px] text-body mt-3 leading-relaxed">{card.descripcion}</p>
              )}
            </button>
          );
        })}
      </div>
      {pregunta.helper && (
        <p className="text-[13px] text-muted mt-4 italic">{pregunta.helper}</p>
      )}
    </div>
  );
}

function Tabla({
  pregunta,
  valor,
  onChange,
}: {
  pregunta: P;
  valor: TablaFila[] | undefined;
  onChange: (v: RespuestaValor) => void;
}) {
  const columnas = pregunta.columnas ?? [];
  const filaInicial = pregunta.filaInicial ?? Object.fromEntries(columnas.map((c) => [c.key, ""]));
  const filas: TablaFila[] = valor && valor.length > 0 ? valor : [filaInicial];

  const updateFila = (i: number, key: string, val: string) => {
    const nuevas = filas.map((f, idx) => (idx === i ? { ...f, [key]: val } : f));
    onChange(nuevas);
  };
  const agregar = () => onChange([...filas, { ...filaInicial }]);
  const quitar = (i: number) => {
    if (filas.length <= 1) return;
    onChange(filas.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-[14px]">
          <thead>
            <tr>
              {columnas.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width }}
                  className="bg-navy text-white font-sans font-semibold text-[12px] text-left px-3 py-2.5"
                >
                  {c.label}
                </th>
              ))}
              <th className="bg-navy w-10" />
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[#FAFAF8]" : "bg-offwhite"}>
                {columnas.map((c) => (
                  <td key={c.key} className="border-b border-border p-1.5">
                    <CeldaTabla columna={c} valor={fila[c.key] ?? ""} onChange={(v) => updateFila(i, c.key, v)} />
                  </td>
                ))}
                <td className="border-b border-border text-center">
                  <button
                    type="button"
                    onClick={() => quitar(i)}
                    className="text-muted hover:text-red-500 px-2 text-[16px]"
                    aria-label="Quitar fila"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={agregar}
        className="mt-2 bg-transparent text-teal border-[1.5px] border-dashed border-teal px-4 py-2 rounded font-sans font-semibold text-[13px] hover:bg-teal/[0.08]"
      >
        + Agregar fila
      </button>
    </div>
  );
}

function CeldaTabla({
  columna,
  valor,
  onChange,
}: {
  columna: ColumnaTabla;
  valor: string;
  onChange: (v: string) => void;
}) {
  const cls = "w-full border-none bg-transparent px-2 py-1.5 text-[13px] outline-none focus:bg-teal/[0.06]";
  if (columna.tipo === "select") {
    return (
      <select className={cls} value={valor} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {columna.opciones?.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={columna.tipo === "number" ? "number" : "text"}
      className={cls}
      placeholder={columna.placeholder}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
