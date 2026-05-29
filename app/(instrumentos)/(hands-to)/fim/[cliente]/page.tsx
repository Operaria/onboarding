import type { Metadata } from "next";
import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FIM · Medida de Independencia Funcional",
  description: "Escala de independencia funcional aplicada por el terapeuta. Operaria Health · OperaHands.",
};

export default async function FimPage({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string; ton?: string; toe?: string; edad?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : "—";
  return (
    <Cuestionario
      cliente={cliente}
      negocio={negocio}
      verticalId="fim"
      toName={sp.ton}
      toEmail={sp.toe}
      edad={sp.edad}
    />
  );
}
