import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hands-SM · Nueva evaluación",
  description: "Cuestionarios de tamizaje en salud mental. Envía el instrumento y recibe el informe listo. Hands-SM · Operaria Health.",
  openGraph: {
    title: "Hands-SM — Operaria Health",
    description: "Cuestionarios de tamizaje en salud mental: envía la encuesta y recibe el informe en el correo que elijas.",
    images: ["/icon-512.png"],
  },
};

export default function HandsSmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
