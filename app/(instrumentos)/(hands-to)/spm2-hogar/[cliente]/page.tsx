import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export default async function Spm2HogarPage({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string; estudiante?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : sp.estudiante ? slugToName(sp.estudiante) : "—";
  return <Cuestionario cliente={cliente} negocio={negocio} verticalId="spm2-hogar" />;
}
