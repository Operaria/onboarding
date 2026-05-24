export type FormType = "hogar" | "escolar";

export type AreaId = "VIS" | "HEA" | "TOU" | "TAS" | "BOD" | "BAL" | "PLN" | "SOC";

export type Classification = "typical" | "some_problems" | "definite_dysfunction";

export interface AreaDefinition {
  id: AreaId;
  name: string;
  nameEs: string;
  itemStart: number;
  itemEnd: number;
}

export interface AreaScore {
  area: AreaDefinition;
  rawScore: number;
  tScore: number;
  classification: Classification;
  interpretationEs: string;
}

export interface TotalScore {
  rawScore: number;
  tScore: number;
  classification: Classification;
}

export interface Spm2Result {
  formType: FormType;
  areaScores: AreaScore[];
  sensoryTotal: TotalScore;
  respondentType: string;
}
