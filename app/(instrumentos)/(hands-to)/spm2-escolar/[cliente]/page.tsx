import type { Metadata } from "next";
import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SPM-2 · Formulario Escolar",
  description: "Evaluación del procesamiento sensorial para responder en el aula. Operaria Health · OperaHands.",
  openGraph: {
    title: "SPM-2 · Formulario Escolar — Operaria Health",
    description: "Una breve evaluación del procesamiento sensorial en el aula. Puedes escuchar cada pregunta en voz alta.",
    images: ["/icon-512.png"],
  },
};

export default async function Spm2EscolarPage({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string; estudiante?: string; ton?: string; toe?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : sp.estudiante ? slugToName(sp.estudiante) : "—";
  return (
    <Cuestionario
      cliente={cliente}
      negocio={negocio}
      verticalId="spm2-escolar"
      toName={sp.ton}
      toEmail={sp.toe}
    />
  );
}
