import type { Metadata } from "next";
import HomeClient from "./(home)/HomeClient";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { getPersonSchema } from "@/lib/seo/schema/person";
import { getWebsiteSchema } from "@/lib/seo/schema/website";
import { getProfileSchema } from "@/lib/seo/schema/profile";
import { getCreativeWorkSchema } from "@/lib/seo/schema/creativeWork";
import { getProfessionalServiceSchema } from "@/lib/seo/schema/professionalService";
import { getServiceSchema } from "@/lib/seo/schema/service";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("app.home");

    return {
        title: t("seo.title"),
        description: t("seo.description")
    };
}

export default async function Home({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations();

    const personSchema = getPersonSchema({ t, locale });
    const websiteSchema = getWebsiteSchema({ t });
    const profileSchema = getProfileSchema({ t, locale });
    const creativeWorkSchema = getCreativeWorkSchema({ t, locale });
    const professionalServiceSchema = getProfessionalServiceSchema({ t, locale });
    const serviceSchema = getServiceSchema({ t, locale });

    return (
        <>
            <JsonLd data={personSchema} />
            <JsonLd data={websiteSchema} />
            <JsonLd data={profileSchema} />
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={professionalServiceSchema} />
            <JsonLd data={serviceSchema} />
            <HomeClient />
        </>
    );
}