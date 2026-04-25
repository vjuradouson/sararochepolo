import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sara Roche Polo — Diseñadora de Producto (UX/UI)",
    short_name: "Sara Roche",
    description:
      "Portfolio de Sara Roche Polo, Diseñadora de Producto (UX/UI) en Zaragoza.",
    lang: "es",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f4",
    theme_color: "#f4f4f4",
    icons: [
      {
        src: "/media/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/media/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
