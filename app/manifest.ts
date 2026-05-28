import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Operaria Health · OperaHands",
    short_name: "OperaHands",
    description:
      "Evaluaciones de terapia ocupacional. Envía la encuesta, recibe el informe listo.",
    start_url: "/hands-to",
    display: "standalone",
    background_color: "#1B4D4A",
    theme_color: "#1B4D4A",
    lang: "es-CL",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
