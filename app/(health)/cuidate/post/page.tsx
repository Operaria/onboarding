import CuidatePlaceholder from "@/components/CuidatePlaceholder";

export const metadata = {
  title: "Cómo enfrentar el post · Cuídate · Operaria",
  description: "El bajón después de la sesión también se cuida.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <CuidatePlaceholder
      titulo="Cómo enfrentar el post"
      intro="El bajón también se cuida."
    />
  );
}
