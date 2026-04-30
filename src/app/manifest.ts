import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sara Roche Polo — Diseñadora de Producto (UX/UI)",
    short_name: "Sara Roche",
    description:
      "Portfolio de Sara Roche Polo, Diseñadora de Producto (UX/UI) en Zaragoza.",
    lang: "es",
    start_url: "/",
    display: "browser",
    background_color: "#f4f4f4",
    theme_color: "#f4f4f4",
    icons: [
      // Standard icons — used by browsers, PWA install dialogs, generic launchers
      {
        src: "/media/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/media/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Maskable variants — design fits inside the inner 80% safe-zone so Android
      // adaptive launchers can crop/mask without clipping the "S" or the orange dot.
      {
        src: "/media/favicons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/media/favicons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
