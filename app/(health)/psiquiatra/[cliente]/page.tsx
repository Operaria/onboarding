import Cuestionario from "@/components/Cuestionario";

export default async function PsiquiatraPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  return <Cuestionario cliente={cliente} negocio="" verticalId="psiquiatra" />;
}
