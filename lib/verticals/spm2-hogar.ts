import type { Bloque, Respuestas } from "../types";

const OPCIONES_LIKERT = ["Nunca", "Ocasionalmente", "Frecuentemente", "Siempre"];

export const spm2HomeBloques: Bloque[] = [
  // ── Bloque 0: VISIÓN (h1–h10) ──
  {
    id: 0,
    titulo: "Visión",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a reacciona a lo que ve en su entorno.",
    preguntas: [
      { id: "h1", numero: "1", tipo: "likert", label: "Se fastidia con la luz brillante.", opciones: OPCIONES_LIKERT },
      { id: "h2", numero: "2", tipo: "likert", label: "Tiene problemas para encontrar un objeto en medio de otros.", opciones: OPCIONES_LIKERT },
      { id: "h3", numero: "3", tipo: "likert", label: "Se angustia en lugares donde el ambiente visual es poco común o en habitaciones de colores fuerte o habitaciones con poca luz.", opciones: OPCIONES_LIKERT },
      { id: "h4", numero: "4", tipo: "likert", label: "Tiene dificultad siguiendo a objetos que se mueven con la vista.", opciones: OPCIONES_LIKERT },
      { id: "h5", numero: "5", tipo: "likert", label: "Tiene dificultad para reconocer cómo se parecen o cómo difieren los objetos en base a sus colores, formas, o tamaños.", opciones: OPCIONES_LIKERT },
      { id: "h6", numero: "6", tipo: "likert", label: "Se disgusta con ciertos tipos de iluminación como luces estroboscópicas, luces parpadeantes, o luces fluorescentes.", opciones: OPCIONES_LIKERT },
      { id: "h7", numero: "7", tipo: "likert", label: "Mira a objetos con el rabillo del ojo.", opciones: OPCIONES_LIKERT },
      { id: "h8", numero: "8", tipo: "likert", label: "Se aburre o se distrae en las tiendas por todas las cosas que se ven en las vitrinas.", opciones: OPCIONES_LIKERT },
      { id: "h9", numero: "9", tipo: "likert", label: "Se distrae con objetos o gente que están visibles.", opciones: OPCIONES_LIKERT },
      { id: "h10", numero: "10", tipo: "likert", label: "Busca áreas que estén oscuras.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 1: OÍDO (h11–h20) ──
  {
    id: 1,
    titulo: "Oído",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a reacciona a los sonidos.",
    preguntas: [
      { id: "h11", numero: "11", tipo: "likert", label: "Se fastidia con los sonidos caseros comunes como el de una aspiradora.", opciones: OPCIONES_LIKERT },
      { id: "h12", numero: "12", tipo: "likert", label: "Responde a los ruidos fuertes escapándose, llorando, o poniéndose las manos sobre los oídos.", opciones: OPCIONES_LIKERT },
      { id: "h13", numero: "13", tipo: "likert", label: "No nota los sonidos que otros notan.", opciones: OPCIONES_LIKERT },
      { id: "h14", numero: "14", tipo: "likert", label: "Parece estar intensamente interesado/a en sonidos que otros no notan.", opciones: OPCIONES_LIKERT },
      { id: "h15", numero: "15", tipo: "likert", label: "Se asusta con sonidos que a los demás no les molestan.", opciones: OPCIONES_LIKERT },
      { id: "h16", numero: "16", tipo: "likert", label: "Se distrae o se fastidia con ruidos en el ambiente que otros ignoran como una máquina de cortar el césped o el ruido del aire acondicionado.", opciones: OPCIONES_LIKERT },
      { id: "h17", numero: "17", tipo: "likert", label: "Gusta hacer ciertos sonidos repetitivamente como tararear o jalar la cadena de la taza del baño.", opciones: OPCIONES_LIKERT },
      { id: "h18", numero: "18", tipo: "likert", label: "Se angustia cuando hay sonidos agudos como silbatos o aparatos para hacer bulla en las fiestas.", opciones: OPCIONES_LIKERT },
      { id: "h19", numero: "19", tipo: "likert", label: "Se sobresalta fácilmente cuando hay ruidos fuertes o inesperados.", opciones: OPCIONES_LIKERT },
      { id: "h20", numero: "20", tipo: "likert", label: "Evita los lugares donde hay música o ruido fuerte.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 2: TACTO (h21–h30) ──
  {
    id: 2,
    titulo: "Tacto",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a reacciona al contacto físico y las texturas.",
    preguntas: [
      { id: "h21", numero: "21", tipo: "likert", label: "Se aparta cuando lo/la tocan levemente o inesperadamente.", opciones: OPCIONES_LIKERT },
      { id: "h22", numero: "22", tipo: "likert", label: "Se angustia con la sensación de la ropa nueva.", opciones: OPCIONES_LIKERT },
      { id: "h23", numero: "23", tipo: "likert", label: "Se angustia cuando le cortan las uñas de las manos o de los pies.", opciones: OPCIONES_LIKERT },
      { id: "h24", numero: "24", tipo: "likert", label: "Se fastidia cuando alguien le toca la cara.", opciones: OPCIONES_LIKERT },
      { id: "h25", numero: "25", tipo: "likert", label: "Evita tocar o jugar con cosas que ensucien como la pintura o la goma de pegar.", opciones: OPCIONES_LIKERT },
      { id: "h26", numero: "26", tipo: "likert", label: "Tiene una gran capacidad para tolerar el dolor y heridas pequeñas, demuestra nada o poca molestia.", opciones: OPCIONES_LIKERT },
      { id: "h27", numero: "27", tipo: "likert", label: "No le gusta cepillarse los dientes.", opciones: OPCIONES_LIKERT },
      { id: "h28", numero: "28", tipo: "likert", label: "Tiene dificultad para encontrar cosas en un bolsillo, una bolsa, o una mochila sin mirar.", opciones: OPCIONES_LIKERT },
      { id: "h29", numero: "29", tipo: "likert", label: "No se limpia la saliva o la comida de la cara.", opciones: OPCIONES_LIKERT },
      { id: "h30", numero: "30", tipo: "likert", label: "Se queja de que las comidas están \"demasiado calientes\" o \"demasiado frías.\"", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 3: GUSTO Y OLFATO (h31–h40) ──
  {
    id: 3,
    titulo: "Gusto y olfato",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a reacciona a sabores y olores.",
    preguntas: [
      { id: "h31", numero: "31", tipo: "likert", label: "Hace arcadas o vomita a causa de ciertos olores.", opciones: OPCIONES_LIKERT },
      { id: "h32", numero: "32", tipo: "likert", label: "Se fastidia con olores que no les molestan a los demás.", opciones: OPCIONES_LIKERT },
      { id: "h33", numero: "33", tipo: "likert", label: "No nota los olores fuertes o raros.", opciones: OPCIONES_LIKERT },
      { id: "h34", numero: "34", tipo: "likert", label: "Huele los objetos nuevos o las cosas nuevas antes de usarlos.", opciones: OPCIONES_LIKERT },
      { id: "h35", numero: "35", tipo: "likert", label: "Nota fragancias u olores que otros no notan.", opciones: OPCIONES_LIKERT },
      { id: "h36", numero: "36", tipo: "likert", label: "Se fastidia con el sabor de ciertas comidas.", opciones: OPCIONES_LIKERT },
      { id: "h37", numero: "37", tipo: "likert", label: "Insiste en comer solo ciertas comidas o ciertas marcas de alimentos.", opciones: OPCIONES_LIKERT },
      { id: "h38", numero: "38", tipo: "likert", label: "Evita probar comidas nuevas.", opciones: OPCIONES_LIKERT },
      { id: "h39", numero: "39", tipo: "likert", label: "Evita baños públicos debido a los olores.", opciones: OPCIONES_LIKERT },
      { id: "h40", numero: "40", tipo: "likert", label: "No distingue sabores ni expresa preferencias entre ellos.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 4: CONCIENCIA DEL CUERPO (h41–h50) ──
  {
    id: 4,
    titulo: "Conciencia del cuerpo",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a percibe su propio cuerpo y regula la fuerza de sus movimientos.",
    preguntas: [
      { id: "h41", numero: "41", tipo: "likert", label: "Busca actividades que consistan en empujar, jalar, o arrastrar.", opciones: OPCIONES_LIKERT },
      { id: "h42", numero: "42", tipo: "likert", label: "Agarra objetos, como un lápiz o una cuchara, de una manera demasiado suelta o demasiado fuerte para poder usarlos fácilmente.", opciones: OPCIONES_LIKERT },
      { id: "h43", numero: "43", tipo: "likert", label: "Usa demasiada fuerza para ciertas cosas, por ejemplo tira las puertas o presiona el teclado muy fuerte.", opciones: OPCIONES_LIKERT },
      { id: "h44", numero: "44", tipo: "likert", label: "Salta mucho.", opciones: OPCIONES_LIKERT },
      { id: "h45", numero: "45", tipo: "likert", label: "Juega con sus compañeros/as de una manera demasiado brusca.", opciones: OPCIONES_LIKERT },
      { id: "h46", numero: "46", tipo: "likert", label: "Rompe las cosas al presionarlas, jalarlas, o empujarlas demasiado fuerte.", opciones: OPCIONES_LIKERT },
      { id: "h47", numero: "47", tipo: "likert", label: "Pone demasiada comida en su boca.", opciones: OPCIONES_LIKERT },
      { id: "h48", numero: "48", tipo: "likert", label: "Se golpea la cabeza a propósito contra algún objeto o contra la gente.", opciones: OPCIONES_LIKERT },
      { id: "h49", numero: "49", tipo: "likert", label: "Derrama o vuelca las cosas.", opciones: OPCIONES_LIKERT },
      { id: "h50", numero: "50", tipo: "likert", label: "Tira la pelota con mucha o con muy poca fuerza.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 5: EQUILIBRIO Y MOVIMIENTO (h51–h60) ──
  {
    id: 5,
    titulo: "Equilibrio y movimiento",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a reacciona al movimiento y mantiene el equilibrio.",
    preguntas: [
      { id: "h51", numero: "51", tipo: "likert", label: "Le tiene miedo a ciertos movimientos como el de columpiarse o deslizarse en el tobogán.", opciones: OPCIONES_LIKERT },
      { id: "h52", numero: "52", tipo: "likert", label: "No mantiene bien el equilibrio.", opciones: OPCIONES_LIKERT },
      { id: "h53", numero: "53", tipo: "likert", label: "Evita caminar sobre superficies desiguales que requieran equilibrio como la tierra o el pasto.", opciones: OPCIONES_LIKERT },
      { id: "h54", numero: "54", tipo: "likert", label: "Se cae de la silla cuando cambia de posición.", opciones: OPCIONES_LIKERT },
      { id: "h55", numero: "55", tipo: "likert", label: "No le gusta echar su cabeza hacia atrás como cuando mira algo que este encima de él/ella o cuando se amarra el cabello.", opciones: OPCIONES_LIKERT },
      { id: "h56", numero: "56", tipo: "likert", label: "Muestra poca coordinación en el uso de los dos lados de su cuerpo como hay que hacer para saltar y caer sobre los dos pies al mismo tiempo o para sacar algo de un envase con una cuchara.", opciones: OPCIONES_LIKERT },
      { id: "h57", numero: "57", tipo: "likert", label: "Se apoya sobre las paredes, los muebles, o la gente para sostenerse o estar parado/a.", opciones: OPCIONES_LIKERT },
      { id: "h58", numero: "58", tipo: "likert", label: "Se mece, se balancea, o se retuerce al estar sentado/a.", opciones: OPCIONES_LIKERT },
      { id: "h59", numero: "59", tipo: "likert", label: "Busca oportunidades para estar de cabeza.", opciones: OPCIONES_LIKERT },
      { id: "h60", numero: "60", tipo: "likert", label: "Tiene dificultad en mirar algo mientras su cabeza está en movimiento como al correr para agarrar una pelota.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 6: PLANIFICACIÓN E IDEAS (h61–h70) ──
  {
    id: 6,
    titulo: "Planificación e ideas",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a planifica y ejecuta acciones y actividades.",
    preguntas: [
      { id: "h61", numero: "61", tipo: "likert", label: "Tiene dificultad para planear cómo cargar varias cosas al mismo tiempo.", opciones: OPCIONES_LIKERT },
      { id: "h62", numero: "62", tipo: "likert", label: "Tiene dificultad para guardar sus pertenencias en sus lugares correctos.", opciones: OPCIONES_LIKERT },
      { id: "h63", numero: "63", tipo: "likert", label: "No desempeña la secuencia lógica de acciones necesarias en su rutina diaria como al vestirse o poner la mesa.", opciones: OPCIONES_LIKERT },
      { id: "h64", numero: "64", tipo: "likert", label: "No termina las tareas que requieren varios pasos.", opciones: OPCIONES_LIKERT },
      { id: "h65", numero: "65", tipo: "likert", label: "Tiene dificultad imitando movimientos, sonidos, o expresiones correctamente.", opciones: OPCIONES_LIKERT },
      { id: "h66", numero: "66", tipo: "likert", label: "Tiene dificultad para copiar un modelo al construir con bloques o con Legos.", opciones: OPCIONES_LIKERT },
      { id: "h67", numero: "67", tipo: "likert", label: "Tiene dificultad con tareas que requieren coordinación de las dos manos como para abrir un envase.", opciones: OPCIONES_LIKERT },
      { id: "h68", numero: "68", tipo: "likert", label: "Necesita más práctica que los demás para adquirir una habilidad nueva.", opciones: OPCIONES_LIKERT },
      { id: "h69", numero: "69", tipo: "likert", label: "Toma demasiado tiempo para completar tareas rutinarias.", opciones: OPCIONES_LIKERT },
      { id: "h70", numero: "70", tipo: "likert", label: "Tiene dificultad para generar ideas de qué construir como cuando juega con bloques o con materiales de artesanía.", opciones: OPCIONES_LIKERT },
    ],
  },

  // ── Bloque 7: PARTICIPACIÓN SOCIAL (h71–h80) ──
  {
    id: 7,
    titulo: "Participación social",
    subtitulo: "Este niño o esta niña...",
    intro: "Las siguientes preguntas son sobre cómo su hijo/a interactúa con otras personas.",
    preguntas: [
      { id: "h71", numero: "71", tipo: "likert", label: "Colabora con sus amigos sin mucha discusión cuando juega con ellos.", opciones: OPCIONES_LIKERT },
      { id: "h72", numero: "72", tipo: "likert", label: "Interactúa de manera apropiada con padres y otros adultos.", opciones: OPCIONES_LIKERT },
      { id: "h73", numero: "73", tipo: "likert", label: "Comparte las cosas cuando se lo piden.", opciones: OPCIONES_LIKERT },
      { id: "h74", numero: "74", tipo: "likert", label: "Conversa con otros sin pararse o sentarse demasiado cerca de ellos.", opciones: OPCIONES_LIKERT },
      { id: "h75", numero: "75", tipo: "likert", label: "Mantiene contacto visual apropiado al conversar.", opciones: OPCIONES_LIKERT },
      { id: "h76", numero: "76", tipo: "likert", label: "Se une al juego con otros sin alterar lo que está transcurriendo.", opciones: OPCIONES_LIKERT },
      { id: "h77", numero: "77", tipo: "likert", label: "Interactúa y participa de manera apropiada en la conversación durante las comidas.", opciones: OPCIONES_LIKERT },
      { id: "h78", numero: "78", tipo: "likert", label: "Participa de manera apropiada en reuniones y salidas con la familia.", opciones: OPCIONES_LIKERT },
      { id: "h79", numero: "79", tipo: "likert", label: "Es flexible cuando su rutina cambia.", opciones: OPCIONES_LIKERT },
      { id: "h80", numero: "80", tipo: "likert", label: "Coopera con miembros de la familia mientras hacen recados.", opciones: OPCIONES_LIKERT },
    ],
  },
];

/**
 * Valida que los 80 ítems (h1–h80) estén respondidos antes de enviar.
 */
export function spm2HomeValidarAlEnviar(respuestas: Respuestas): string | null {
  const faltantes: string[] = [];
  for (let i = 1; i <= 80; i++) {
    const id = `h${i}`;
    if (respuestas[id] === undefined || respuestas[id] === "") {
      faltantes.push(String(i));
    }
  }
  if (faltantes.length > 0) {
    return `Faltan ítems por responder: ${faltantes.join(", ")}. Todos los ítems son obligatorios.`;
  }
  return null;
}
