import type { Metadata } from "next";
import HomeClient from "./(home)/HomeClient";

export const metadata: Metadata = {
    title: "Sara Roche · Diseño Visual & Dirección de Arte",
    description: "Portfolio de Sara Roche, especializada en identidad visual y branding premium.",
};

export default function Home() {
    return <HomeClient />
}