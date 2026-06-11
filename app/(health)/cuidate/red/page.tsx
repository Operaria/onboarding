import CuidatePlaceholder from "@/components/CuidatePlaceholder";

export const metadata = {
  title: "Cuéntale a alguien · Cuídate · Operaria",
  description: "Tener a una persona que sepa cómo encontrarte salva vidas.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <CuidatePlaceholder
      titulo="Cuéntale a alguien"
      intro="Aunque sea una sola persona."
    />
  );
}
