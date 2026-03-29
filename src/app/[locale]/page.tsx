import type { Metadata } from "next";
import HomeClient from "./(home)/HomeClient";

export const metadata: Metadata = {
    title: "Sara Roche Polo · Diseño Visual & Dirección de Arte",
    description: "Portfolio de Sara Roche Polo, especializada en identidad visual y branding premium.",
};

export default function Home() {
    return <HomeClient />
}