import type { Bloque, Respuestas } from "../types";

const OPCIONES_LIKERT = ["Nunca", "Ocasionalmente", "Frecuentemente", "Siempre"];

export const spm2EscolarBloques: Bloque[] = [
  // ── Bloque 0: VISIÓN (e1–e10) ──
  {
    id: 0,
    titulo: "Visión",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante reacciona a lo que ve en el entorno escolar.",
    preguntas: [
      { id: "e1", numero: "1", tipo: "likert", label: "Se distrae con objetos o gente que están visibles.", opciones: OPCIONES_LIKERT },
      { id: "e2", numero: "2", tipo: "likert", label: "Mira alrededor del salón o a sus compañeros mientras el/la maestro/a está hablando.", opciones: OPCIONES_LIKERT },
      { id: "e3", numero: "3", tipo: "likert", label: "Mira fijamente a la gente o a los objetos.", opciones: OPCIONES_LIKERT },
      { id: "e4", numero: "4", tipo: "likert", label: "Gusta mirar a objetos que giran o que se mueven.", opciones: OPCIONES_LIKERT },
      { id: "e5", numero: "5", tipo: "likert", label: "Pierde su lugar al leer o copiar textos.", opciones: OPCIONES_LIKERT },
      { id: "e6", numero: "6", tipo: "likert", label: "Tiene dificultad para seguir a objetos que se mueven con la vista.", opciones: OPCIONES_LIKERT },
      { id: "e7", numero: "7", tipo: "likert", label: "Tiene problemas para encontrar un objeto en medio de otros.", opciones: OPCIONES_LIKERT },
      { id: "e8", numero: "8", tipo: "likert", label: "Se tropieza con las cosas o con la gente como si no estuvieran ahí.", opciones: OPCIONES_LIKERT },
      { id: "e9", numero: "9", tipo: "likert", label: "Tiene dificultad para reconocer cómo se parecen o cómo difieren los objetos en base a sus colores, formas, o tamaños.", opciones: OPCIONES_LIKERT },
      { id: "e10", numero: "10", tipo: "likert", label: "Mira a objetos con el rabillo del ojo.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 1: OÍDO (e11–e20) ──
  {
    id: 1,
    titulo: "Oído",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante reacciona a los sonidos en el entorno escolar.",
    preguntas: [
      { id: "e11", numero: "11", tipo: "likert", label: "Se angustia cuando hay sonidos fuertes o inesperados, como el de un afilador de lápices o un anuncio por el altoparlante.", opciones: OPCIONES_LIKERT },
      { id: "e12", numero: "12", tipo: "likert", label: "Se angustia cuando los demás aplauden o cantan.", opciones: OPCIONES_LIKERT },
      { id: "e13", numero: "13", tipo: "likert", label: "Tiene dificultad para seguir instrucciones verbales.", opciones: OPCIONES_LIKERT },
      { id: "e14", numero: "14", tipo: "likert", label: "Hace demasiado ruido durante periodos de transición.", opciones: OPCIONES_LIKERT },
      { id: "e15", numero: "15", tipo: "likert", label: "Tararea, canta, o hace ruidos extraños durante la clase.", opciones: OPCIONES_LIKERT },
      { id: "e16", numero: "16", tipo: "likert", label: "Confunde palabras que suenan más o menos igual como cuando y cuánto.", opciones: OPCIONES_LIKERT },
      { id: "e17", numero: "17", tipo: "likert", label: "Se distrae o se fastidia con ruidos en el ambiente que otros ignoran como los de ventiladores o los de relojes haciendo ticac.", opciones: OPCIONES_LIKERT },
      { id: "e18", numero: "18", tipo: "likert", label: "No responde cuando llaman su nombre.", opciones: OPCIONES_LIKERT },
      { id: "e19", numero: "19", tipo: "likert", label: "Tiene problemas para prestar atención cuando hay ruidos en el salón de clase.", opciones: OPCIONES_LIKERT },
      { id: "e20", numero: "20", tipo: "likert", label: "Parece estar intensamente interesado/a en sonidos que otros no notan.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 2: TACTO (e21–e30) ──
  {
    id: 2,
    titulo: "Tacto",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante reacciona al contacto físico y las texturas.",
    preguntas: [
      { id: "e21", numero: "21", tipo: "likert", label: "Se angustia con la sensación de ciertas texturas.", opciones: OPCIONES_LIKERT },
      { id: "e22", numero: "22", tipo: "likert", label: "Cuando otros lo/la tocan por accidente, los ataca o se aparta.", opciones: OPCIONES_LIKERT },
      { id: "e23", numero: "23", tipo: "likert", label: "No reacciona cuando lo/la tocan.", opciones: OPCIONES_LIKERT },
      { id: "e24", numero: "24", tipo: "likert", label: "Da codazos, da un golpecito, o toca a sus compañeros durante la clase o cuando están en fila.", opciones: OPCIONES_LIKERT },
      { id: "e25", numero: "25", tipo: "likert", label: "No se limpia la saliva o la comida de la cara.", opciones: OPCIONES_LIKERT },
      { id: "e26", numero: "26", tipo: "likert", label: "Rehúsa comidas con mezclas de texturas como el yogurt con fruta.", opciones: OPCIONES_LIKERT },
      { id: "e27", numero: "27", tipo: "likert", label: "Tiene dificultad para encontrar cosas en un bolsillo, una bolsa, o una mochila sin mirar.", opciones: OPCIONES_LIKERT },
      { id: "e28", numero: "28", tipo: "likert", label: "Disfruta de sensaciones que a otros les causarían dolor como el tirarse contra las paredes.", opciones: OPCIONES_LIKERT },
      { id: "e29", numero: "29", tipo: "likert", label: "Disfruta metiendo su cuerpo en espacios pequeños.", opciones: OPCIONES_LIKERT },
      { id: "e30", numero: "30", tipo: "likert", label: "Tiene dificultad para manipular objetos pequeños en su mano.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 3: GUSTO Y OLFATO (e31–e40) ──
  {
    id: 3,
    titulo: "Gusto y olfato",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante reacciona a sabores y olores.",
    preguntas: [
      { id: "e31", numero: "31", tipo: "likert", label: "Se angustia con sabores de comidas que a otros niños no les molestan.", opciones: OPCIONES_LIKERT },
      { id: "e32", numero: "32", tipo: "likert", label: "No nota olores fuertes o raros como el olor de la pintura o de los plumones.", opciones: OPCIONES_LIKERT },
      { id: "e33", numero: "33", tipo: "likert", label: "Huele los objetos nuevos o las cosas nuevas antes de usarlos.", opciones: OPCIONES_LIKERT },
      { id: "e34", numero: "34", tipo: "likert", label: "Olfatea o huele a la gente.", opciones: OPCIONES_LIKERT },
      { id: "e35", numero: "35", tipo: "likert", label: "Se angustia debido a aromas del jabón, del perfume o de las lociones para la piel.", opciones: OPCIONES_LIKERT },
      { id: "e36", numero: "36", tipo: "likert", label: "Hace arcadas o vomita a causa de ciertos olores.", opciones: OPCIONES_LIKERT },
      { id: "e37", numero: "37", tipo: "likert", label: "Evita el baño debido a los olores.", opciones: OPCIONES_LIKERT },
      { id: "e38", numero: "38", tipo: "likert", label: "Rehúsa probar comidas o refrigerios nuevos.", opciones: OPCIONES_LIKERT },
      { id: "e39", numero: "39", tipo: "likert", label: "Insiste en comer solo ciertas comidas o ciertas marcas de alimentos.", opciones: OPCIONES_LIKERT },
      { id: "e40", numero: "40", tipo: "likert", label: "Evita las comidas que tengan un sabor o un olor fuerte.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 4: CONCIENCIA DEL CUERPO (e41–e50) ──
  {
    id: 4,
    titulo: "Conciencia del cuerpo",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante percibe su propio cuerpo y regula la fuerza.",
    preguntas: [
      { id: "e41", numero: "41", tipo: "likert", label: "Muerde los juguetes, la ropa, u otros objetos repetidamente.", opciones: OPCIONES_LIKERT },
      { id: "e42", numero: "42", tipo: "likert", label: "Mueve los muebles o la clase de una manera brusca o con mucha fuerza.", opciones: OPCIONES_LIKERT },
      { id: "e43", numero: "43", tipo: "likert", label: "Pisa con fuerza o planta sus pies al caminar o al subir las escaleras.", opciones: OPCIONES_LIKERT },
      { id: "e44", numero: "44", tipo: "likert", label: "Salta de sitios en alto impactando sus pies con mucha fuerza.", opciones: OPCIONES_LIKERT },
      { id: "e45", numero: "45", tipo: "likert", label: "Usa demasiada fuerza para ciertas cosas, por ejemplo tira las puertas o presiona el teclado muy fuerte.", opciones: OPCIONES_LIKERT },
      { id: "e46", numero: "46", tipo: "likert", label: "Juega con sus compañeros/as de una manera demasiado brusca.", opciones: OPCIONES_LIKERT },
      { id: "e47", numero: "47", tipo: "likert", label: "Escribe y colorea con demasiada o muy poca fuerza.", opciones: OPCIONES_LIKERT },
      { id: "e48", numero: "48", tipo: "likert", label: "Derrama o vuelca las cosas.", opciones: OPCIONES_LIKERT },
      { id: "e49", numero: "49", tipo: "likert", label: "Rompe las cosas al presionarlas, jalarlas, o empujarlas demasiado fuerte.", opciones: OPCIONES_LIKERT },
      { id: "e50", numero: "50", tipo: "likert", label: "Pone demasiada comida en su boca.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 5: EQUILIBRIO Y MOVIMIENTO (e51–e60) ──
  {
    id: 5,
    titulo: "Equilibrio y movimiento",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante reacciona al movimiento y mantiene el equilibrio.",
    preguntas: [
      { id: "e51", numero: "51", tipo: "likert", label: "Engancha sus pies por la parte de abajo de la silla cuando está sentado/a.", opciones: OPCIONES_LIKERT },
      { id: "e52", numero: "52", tipo: "likert", label: "Se mece, se balancea, o se retuerce al estar sentado/a.", opciones: OPCIONES_LIKERT },
      { id: "e53", numero: "53", tipo: "likert", label: "Evita caminar sobre superficies desiguales que requieran equilibrio como la tierra o el pasto.", opciones: OPCIONES_LIKERT },
      { id: "e54", numero: "54", tipo: "likert", label: "Tiene que apoyarse en algo cuando se sienta en el suelo.", opciones: OPCIONES_LIKERT },
      { id: "e55", numero: "55", tipo: "likert", label: "Se desploma hacia adelante o se echa hacia atrás, o se sujeta la cabeza con las manos cuando está sentado/a.", opciones: OPCIONES_LIKERT },
      { id: "e56", numero: "56", tipo: "likert", label: "Muestra poca coordinación en el uso de los dos lados de su cuerpo como en actividades que requieren las dos manos, por ejemplo, cortar con tijeras o agarrar una pelota.", opciones: OPCIONES_LIKERT },
      { id: "e57", numero: "57", tipo: "likert", label: "No se sujeta cuando se está cayendo.", opciones: OPCIONES_LIKERT },
      { id: "e58", numero: "58", tipo: "likert", label: "No mantiene bien el equilibrio.", opciones: OPCIONES_LIKERT },
      { id: "e59", numero: "59", tipo: "likert", label: "Se tropieza, se cae, o pierde el equilibrio al correr o hacer deportes.", opciones: OPCIONES_LIKERT },
      { id: "e60", numero: "60", tipo: "likert", label: "Busca oportunidades para estar de cabeza.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 6: PLANIFICACIÓN E IDEAS (e61–e70) ──
  {
    id: 6,
    titulo: "Planificación e ideas",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante planifica y ejecuta actividades.",
    preguntas: [
      { id: "e61", numero: "61", tipo: "likert", label: "No hace las tareas diarias de forma consistente.", opciones: OPCIONES_LIKERT },
      { id: "e62", numero: "62", tipo: "likert", label: "No soluciona los problemas de una manera eficaz.", opciones: OPCIONES_LIKERT },
      { id: "e63", numero: "63", tipo: "likert", label: "No desempeña la secuencia lógica de acciones necesarias en su rutina diaria como al guardar sus artículos escolares.", opciones: OPCIONES_LIKERT },
      { id: "e64", numero: "64", tipo: "likert", label: "No termina las tareas que requieren varios pasos.", opciones: OPCIONES_LIKERT },
      { id: "e65", numero: "65", tipo: "likert", label: "Tiene dificultad imitando movimientos, sonidos, o expresiones correctamente.", opciones: OPCIONES_LIKERT },
      { id: "e66", numero: "66", tipo: "likert", label: "Tiene dificultad copiando un modelo completo correctamente para crear uno idéntico.", opciones: OPCIONES_LIKERT },
      { id: "e67", numero: "67", tipo: "likert", label: "Tiene problemas manteniendo un cuaderno o el espacio donde trabaja organizados.", opciones: OPCIONES_LIKERT },
      { id: "e68", numero: "68", tipo: "likert", label: "Necesita más práctica que los demás para adquirir una habilidad nueva.", opciones: OPCIONES_LIKERT },
      { id: "e69", numero: "69", tipo: "likert", label: "Toma más tiempo que los demás en completar las tareas necesarias.", opciones: OPCIONES_LIKERT },
      { id: "e70", numero: "70", tipo: "likert", label: "Tiene dificultad en generar ideas de qué hacer o qué construir como cuando está jugando con bloques o con materiales para el arte.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 7: PARTICIPACIÓN SOCIAL (e71–e80) ──
  {
    id: 7,
    titulo: "Participación social",
    subtitulo: "Este/esta estudiante...",
    intro: "Las siguientes preguntas son sobre cómo el/la estudiante interactúa con sus pares y adultos.",
    preguntas: [
      { id: "e71", numero: "71", tipo: "likert", label: "Trabaja bien en grupo.", opciones: OPCIONES_LIKERT },
      { id: "e72", numero: "72", tipo: "likert", label: "Demuestra atención hacia otros estudiantes.", opciones: OPCIONES_LIKERT },
      { id: "e73", numero: "73", tipo: "likert", label: "Maneja la frustración sin arrebatos o conducta agresiva.", opciones: OPCIONES_LIKERT },
      { id: "e74", numero: "74", tipo: "likert", label: "Se une a los juegos y actividades de sus compañeros de buena gana.", opciones: OPCIONES_LIKERT },
      { id: "e75", numero: "75", tipo: "likert", label: "Se une al juego con otros sin alterar lo que está transcurriendo.", opciones: OPCIONES_LIKERT },
      { id: "e76", numero: "76", tipo: "likert", label: "Conversa con otros sin pararse o sentarse demasiado cerca de ellos.", opciones: OPCIONES_LIKERT },
      { id: "e77", numero: "77", tipo: "likert", label: "Mantiene contacto visual apropiado al conversar.", opciones: OPCIONES_LIKERT },
      { id: "e78", numero: "78", tipo: "likert", label: "Pasa de una actividad a otra con facilidad.", opciones: OPCIONES_LIKERT },
      { id: "e79", numero: "79", tipo: "likert", label: "Comparte los materiales de la clase cuando se lo piden.", opciones: OPCIONES_LIKERT },
      { id: "e80", numero: "80", tipo: "likert", label: "Demuestra respeto y cortesía hacia los maestros y empleados.", opciones: OPCIONES_LIKERT },
    ],
  },
];

export function spm2EscolarValidarAlEnviar(respuestas: Respuestas): string | null {
  const faltantes: string[] = [];
  for (let i = 1; i <= 80; i++) {
    const key = `e${i}`;
    if (!respuestas[key] || respuestas[key] === "") {
      faltantes.push(String(i));
    }
  }
  if (faltantes.length > 0) {
    return `Faltan por responder los ítems: ${faltantes.join(", ")}. Todos los ítems son obligatorios.`;
  }
  return null;
}
