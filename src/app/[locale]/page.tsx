import type { Metadata } from "next";
import HomeClient from "./(home)/HomeClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("app.seo");

    return {
        title: t("home.title"),
        description: t("home.description"),
    };
}

export default function Home() {
    return <HomeClient />;
}