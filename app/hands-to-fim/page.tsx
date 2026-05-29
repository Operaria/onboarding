import type { Metadata } from "next";
import HandsToLauncher from "@/components/HandsToLauncher";

export const metadata: Metadata = {
  title: "Hands-TO · FIM — Independencia funcional",
  description: "Aplica la evaluación de independencia funcional y obtén el resultado al instante. OperaHands · Operaria Health.",
  openGraph: {
    title: "Hands-TO · FIM — Operaria Health",
    description: "Evaluación de independencia funcional aplicada por el terapeuta, con resultado inmediato.",
    images: ["/icon-512.png"],
  },
};

export default function HandsToFimPage() {
  return <HandsToLauncher modo="fim" />;
}
