import CuidatePlaceholder from "@/components/CuidatePlaceholder";

export const metadata = {
  title: "Toma agua · Cuídate · Operaria",
  description: "Por qué la hidratación importa, y cuánta agua es suficiente.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <CuidatePlaceholder
      titulo="Toma agua"
      intro="Mucha. No olvides."
    />
  );
}
