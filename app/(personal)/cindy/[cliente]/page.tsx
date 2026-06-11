import Cuestionario from "@/components/Cuestionario";

export default async function CindyPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  return <Cuestionario cliente={cliente} negocio="" verticalId="cindy" />;
}
