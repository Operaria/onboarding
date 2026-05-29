export type TipoPregunta =
  | "texto"
  | "textarea"
  | "checkboxes"
  | "slider"
  | "tel"
  | "number"
  | "radio"
  | "select"
  | "tabla"
  | "boolean"
  | "time"
  | "cards"
  | "likert"
  | "escala7";

export interface CardOption {
  value: string;            // enum guardado en respuestas
  titulo: string;           // "Solo Agenda"
  badge?: string;           // "El primer encendido" / "+ AUDIOS"
  setup: string;            // "CLP 60.000"
  mrr: string;              // "CLP 45.000/mes"
  descripcion?: string;     // "El paquete completo · 9 bloques activos"
  destacado?: boolean;      // gradiente navy→teal para tier premium
}

export interface MostrarSi {
  id: string;
  // La pregunta se muestra si la respuesta a `id` cumple alguna de estas condiciones
  igual?: string | number | boolean;
  distintoDe?: string | number | boolean;
  incluye?: string; // para checkboxes (struct {seleccion}) o arrays planos
}

export interface ColumnaTabla {
  key: string;
  label: string;
  tipo: "texto" | "number" | "select";
  placeholder?: string;
  opciones?: string[];
  width?: string;
}

export interface Pregunta {
  id: string;
  numero?: string;
  tipo: TipoPregunta;
  label: string;
  hint?: string;
  placeholder?: string;
  opciones?: string[];
  min?: number;
  max?: number;
  labelMin?: string;
  labelMax?: string;
  columnas?: ColumnaTabla[];
  filaInicial?: Record<string, string>;
  mostrarSi?: MostrarSi | MostrarSi[]; // array = AND (todas deben cumplirse)
  opcionesDe?: string; // para radio dinámico: usa la respuesta de otra pregunta como opciones
  maxLength?: number;
  cards?: CardOption[]; // para tipo "cards"
  defaultValor?: string; // para tipo "time" u otros (ej: "21:00")
  helper?: string; // texto debajo del input (más enfático que hint)
}

export interface Bloque {
  id: number;
  titulo: string;
  subtitulo?: string;
  intro?: string;
  preguntas: Pregunta[];
}

export type TablaFila = Record<string, string>;

export type RespuestaValor =
  | string
  | string[]
  | number
  | boolean
  | { seleccion: string[]; otro?: string }
  | TablaFila[];

export type Respuestas = Record<string, RespuestaValor>;

export interface SubmitPayload {
  cliente: string;
  nombreFormateado: string;
  negocio?: string;
  vertical?: string;
  respuestas: Respuestas;
  timestamp: string;
  /** Terapeuta ocupacional que recibe el informe (SPM-2 / Hands-TO). */
  toName?: string;
  toEmail?: string;
  /** Edad del niño/a en años (SPM-2 Niño/a: normado 5–12). */
  edad?: string;
}
