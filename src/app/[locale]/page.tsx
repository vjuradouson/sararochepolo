import type { Metadata } from "next";
import HomeClient from "./(home)/HomeClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("app.home");

    return {
        title: t("seo.title"),
        description: t("seo.description"),
    };
}

export default function Home() {
    return <HomeClient />;
}