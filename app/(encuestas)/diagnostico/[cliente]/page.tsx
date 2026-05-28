import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export default async function DiagnosticoPage({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : "—";
  return <Cuestionario cliente={cliente} negocio={negocio} verticalId="generico" />;
}
