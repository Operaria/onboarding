import InfoSensorial from "@/components/InfoSensorial";

export const metadata = {
  title: "Qué es el procesamiento sensorial — Para la familia",
  description: "En simple: qué es el procesamiento sensorial, por qué responder la encuesta y para qué sirve. Operaria Health · OperaHands.",
  openGraph: {
    title: "Cómo tu hijo o hija siente el mundo — Operaria Health",
    description: "En simple, para la familia: qué es el procesamiento sensorial y para qué sirve la encuesta.",
    images: ["/icon-512.png"],
  },
};

export default function QueEsPapas() {
  return <InfoSensorial publico="papas" />;
}
