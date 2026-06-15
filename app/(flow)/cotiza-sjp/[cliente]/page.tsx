import type { Metadata } from "next";
import Cuestionario from "@/components/Cuestionario";

export const metadata: Metadata = {
  title: "Solicita tu cotización · San Jorge Packaging",
};

export default async function CotizaSjpPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  return <Cuestionario cliente={cliente} negocio="—" verticalId="cotiza-sjp" />;
}
