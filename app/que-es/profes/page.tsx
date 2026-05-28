import InfoSensorial from "@/components/InfoSensorial";

export const metadata = {
  title: "Qué es el procesamiento sensorial — Para el aula",
  description: "En simple: qué es el procesamiento sensorial, por qué responder la encuesta y para qué sirve. Operaria Health · OperaHands.",
  openGraph: {
    title: "Cómo el o la estudiante vive el aula — Operaria Health",
    description: "En simple, para profesores: qué es el procesamiento sensorial y para qué sirve la encuesta.",
    images: ["/icon-512.png"],
  },
};

export default function QueEsProfes() {
  return <InfoSensorial publico="profes" />;
}
