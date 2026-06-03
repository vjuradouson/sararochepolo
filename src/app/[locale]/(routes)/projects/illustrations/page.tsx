import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import IllustrationsContent from "./_components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.illustrations.seo.title");
    const description = t("app.projects.illustrations.seo.description")
    const ogImage = `${BASE_URL}/media/projects/illustrations/imploded/into-the-woods-final.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_ILLUSTRATIONS
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_ILLUSTRATIONS, locale)}`,
                images: [{ url: ogImage, width: 471, height: 640 }],
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [ogImage],
            }
        }
    )
}

export default async function IllustrationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_ILLUSTRATIONS, locale)}`;
    const ogImage = `${BASE_URL}/media/projects/illustrations/imploded/into-the-woods-final.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.illustrations.seo.title"),
        description: t("app.projects.illustrations.seo.description"),
        url,
        image: ogImage,
        genre: "Illustrations",
        about: ["Illustrations", "Procreate", "Character Design", "Traditional Drawing"],
    });

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <IllustrationsContent />
        </>
    );
}
