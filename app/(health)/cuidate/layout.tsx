import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cuídate · slamm — Operaria",
  description:
    "Reducción de daños para personas que se inyectan en contexto chemsex. Anónimo, gratis, sin registro.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Cuídate · slamm — Operaria",
    description:
      "Reducción de daños asociados al uso de drogas inyectables en contexto chemsex. Anónimo, gratis.",
    images: ["/cuidate-hero.png"],
  },
};

export default function CuidateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
