import type { Metadata } from "next";
import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Brechas de información para cotizador",
};

export default async function BridgeCotizadorPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  return <Cuestionario cliente={cliente} negocio="—" verticalId="bridge-cotizador" />;
}
