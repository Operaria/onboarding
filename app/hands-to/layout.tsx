import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hands-TO · Nueva evaluación",
  description: "Crea una evaluación, envía la encuesta y recibe el informe listo. OperaHands · Operaria Health.",
  openGraph: {
    title: "Hands-TO — OperaHands · Operaria Health",
    description: "Evaluaciones de terapia ocupacional: envía la encuesta y recibe el informe en tu correo.",
    images: ["/icon-512.png"],
  },
};

export default function HandsToLayout({ children }: { children: React.ReactNode }) {
  return children;
}
