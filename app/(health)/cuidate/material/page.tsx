import CuidatePlaceholder from "@/components/CuidatePlaceholder";

export const metadata = {
  title: "No compartas material · Cuídate · Operaria",
  description: "Por qué compartir agua o filtro transmite igual que la jeringa.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <CuidatePlaceholder
      titulo="No compartas material"
      intro="Jeringa, agua, filtro — nada."
    />
  );
}
