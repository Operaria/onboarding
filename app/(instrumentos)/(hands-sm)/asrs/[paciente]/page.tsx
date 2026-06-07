import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export default async function AsrsPage({
  params,
  searchParams,
}: {
  params: Promise<{ paciente: string }>;
  searchParams: Promise<{
    negocio?: string; edad?: string;
    pe?: string; tn?: string; te?: string; dest?: string;
  }>;
}) {
  const { paciente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : slugToName(paciente);
  return (
    <Cuestionario
      cliente={paciente}
      negocio={negocio}
      verticalId="asrs"
      edad={sp.edad}
      pacienteEmail={sp.pe}
      tratanteName={sp.tn}
      tratanteEmail={sp.te}
      informeDest={sp.dest}
    />
  );
}
