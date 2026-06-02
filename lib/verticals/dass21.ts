import type { Bloque, Respuestas } from "../types";
import { DASS21_ITEM_IDS, DASS21_OPCIONES } from "../dass21";

const LIKERT = [...DASS21_OPCIONES];

const items = [
  "Me costó mucho relajarme.",
  "Me di cuenta de que tenía la boca seca.",
  "No pude sentir ningún sentimiento positivo.",
  "Se me hizo difícil respirar.",
  "Se me hizo difícil tomar la iniciativa para hacer cosas.",
  "Reaccioné exageradamente en ciertas situaciones.",
  "Sentí que mis manos temblaban.",
  "Sentí que tenía muchos nervios.",
  "Estaba preocupado/a por situaciones en las que podía tener pánico o en las que podía hacer el ridículo.",
  "Sentí que no tenía nada por lo que vivir.",
  "Noté que me agitaba.",
  "Se me hizo difícil relajarme.",
  "Me sentí triste y deprimido/a.",
  "No toleré nada que no me permitiera continuar con lo que estaba haciendo.",
  "Sentí que estaba al borde del pánico.",
  "No me pude entusiasmar por nada.",
  "Sentí que valía muy poco como persona.",
  "Sentí que estaba muy irritable.",
  "Sentí los latidos de mi corazón a pesar de no haber hecho ningún esfuerzo físico.",
  "Tuve miedo sin razón.",
  "Sentí que la vida no tenía ningún sentido.",
];

// Repartimos los 21 ítems en 3 bloques de 7 — la encuesta queda más legible
// y permite descansos visuales sin alterar el orden DASS-21 estándar.
function bloque(id: number, titulo: string, inicio: number, fin: number, intro?: string): Bloque {
  return {
    id,
    titulo,
    subtitulo: id === 0 ? "Marque cuánto le ha aplicado cada frase durante la última semana." : undefined,
    intro,
    preguntas: items.slice(inicio, fin).map((label, i) => ({
      id: DASS21_ITEM_IDS[inicio + i],
      numero: String(inicio + i + 1),
      tipo: "radio" as const,
      label,
      opciones: LIKERT,
    })),
  };
}

export const dass21Bloques: Bloque[] = [
  bloque(
    0,
    "Primera parte",
    0,
    7,
    "Por favor, lea cada frase y marque la opción que indique cuánto le ha aplicado durante la última semana. No hay respuestas correctas o incorrectas. No dedique demasiado tiempo a ninguna.",
  ),
  bloque(1, "Segunda parte", 7, 14),
  bloque(2, "Tercera parte", 14, 21),
];

export function dass21ValidarAlEnviar(respuestas: Respuestas): string | null {
  for (const id of DASS21_ITEM_IDS) {
    const v = respuestas[id];
    if (typeof v !== "string" || !(DASS21_OPCIONES as readonly string[]).includes(v)) {
      return "Faltan preguntas por responder. El DASS-21 solo es válido si están las 21 contestadas.";
    }
  }
  return null;
}
