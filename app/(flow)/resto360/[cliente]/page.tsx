import type { Metadata } from "next";
import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tu restorán, tu anfitrión · Restó 360",
};

export default async function Resto360Page({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : "—";
  return <Cuestionario cliente={cliente} negocio={negocio} verticalId="resto360" />;
}
