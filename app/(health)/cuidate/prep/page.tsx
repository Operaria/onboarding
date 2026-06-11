import CuidatePlaceholder from "@/components/CuidatePlaceholder";

export const metadata = {
  title: "PrEP / TARV · Cuídate · Operaria",
  description:
    "Lo importante es estar sano e intransmisible. PrEP para protegerte, TARV si vives con VIH — una pastilla al día.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <CuidatePlaceholder
      titulo="PrEP / TARV"
      intro="Lo importante es estar sano e intransmisible — 1 pastilla al día."
    />
  );
}
