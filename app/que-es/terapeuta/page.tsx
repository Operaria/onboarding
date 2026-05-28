import InfoTerapeuta from "@/components/InfoTerapeuta";

export const metadata = {
  title: "Cómo funciona Hands-TO — Para el terapeuta",
  description: "Cómo opera Hands-TO: flujo, qué mide el SPM-2, cómo se calcula y qué tener en cuenta. Operaria Health · OperaHands.",
  openGraph: {
    title: "Cómo funciona Hands-TO — Para el terapeuta",
    description: "El flujo de la evaluación, qué mide el SPM-2 y los límites a considerar.",
    images: ["/icon-512.png"],
  },
};

export default function QueEsTerapeuta() {
  return <InfoTerapeuta />;
}
