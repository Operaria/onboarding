import type { AreaDefinition } from "./types";

export const AREAS: AreaDefinition[] = [
  { id: "VIS", name: "Vision",               nameEs: "Visión",                  itemStart: 1,  itemEnd: 10 },
  { id: "HEA", name: "Hearing",              nameEs: "Audición",                itemStart: 11, itemEnd: 20 },
  { id: "TOU", name: "Touch",                nameEs: "Tacto",                   itemStart: 21, itemEnd: 30 },
  { id: "TAS", name: "Taste & Smell",        nameEs: "Gusto y olfato",          itemStart: 31, itemEnd: 40 },
  { id: "BOD", name: "Body Awareness",       nameEs: "Conciencia corporal",     itemStart: 41, itemEnd: 50 },
  { id: "BAL", name: "Balance & Movement",   nameEs: "Equilibrio y movimiento", itemStart: 51, itemEnd: 60 },
  { id: "PLN", name: "Planning & Ideas",     nameEs: "Planificación e ideas",   itemStart: 61, itemEnd: 70 },
  { id: "SOC", name: "Social Participation", nameEs: "Participación social",    itemStart: 71, itemEnd: 80 },
];

/** Las primeras 6 áreas conforman el Total Sensorial (ST). */
export const SENSORY_AREA_IDS = ["VIS", "HEA", "TOU", "TAS", "BOD", "BAL"] as const;
