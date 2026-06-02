import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";

export default async function MdqPage({
  params,
  searchParams,
}: {
  params: Promise<{ paciente: string }>;
  searchParams: Promise<{
    negocio?: string;
    edad?: string;
    pe?: string;   // paciente email
    tn?: string;   // tratante name
    te?: string;   // tratante email
    dest?: string; // informeDest "p" | "t" | "pt"
  }>;
}) {
  const { paciente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : slugToName(paciente);
  return (
    <Cuestionario
      cliente={paciente}
      negocio={negocio}
      verticalId="mdq"
      edad={sp.edad}
      pacienteEmail={sp.pe}
      tratanteName={sp.tn}
      tratanteEmail={sp.te}
      informeDest={sp.dest}
    />
  );
}
