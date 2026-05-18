import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import PrintDesignContent from "./_components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.print_design.seo.title");
    const description = t("app.projects.print_design.seo.description")
    const ogImage = `${BASE_URL}/media/projects/editorial/triptych.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_EDITORIAL
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_EDITORIAL, locale)}`,
                images: [{ url: ogImage, width: 2119, height: 1720 }],
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

export default async function PrintDesignPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_EDITORIAL, locale)}`;
    const ogImage = `${BASE_URL}/media/projects/editorial/triptych.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.print_design.seo.title"),
        description: t("app.projects.print_design.seo.description"),
        url,
        image: ogImage,
        genre: "Editorial Design",
        about: ["Print Design", "Editorial Design", "Flyers", "Roll-ups", "Trifolds", "Visual Communication"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.projects.print_design.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <PrintDesignContent />
        </>
    );
}
