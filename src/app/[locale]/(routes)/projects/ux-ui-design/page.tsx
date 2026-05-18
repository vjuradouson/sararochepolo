import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import UxUiDesignContent from "./_components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.figma.seo.title");
    const description = t("app.projects.figma.seo.description")
    const ogImage = `${BASE_URL}/media/projects/figma/starbucks.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_UX_UI_DESIGN
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_UX_UI_DESIGN, locale)}`,
                images: [{ url: ogImage, width: 1920, height: 908 }],
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

export default async function FigmaPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_UX_UI_DESIGN, locale)}`;
    const ogImage = `${BASE_URL}/media/projects/figma/starbucks.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.figma.seo.title"),
        description: t("app.projects.figma.seo.description"),
        url,
        image: ogImage,
        genre: "UX/UI Design",
        about: ["Figma", "UX/UI Design", "Prototyping", "Interaction Design"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.projects.figma.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <UxUiDesignContent />
        </>
    );
}
