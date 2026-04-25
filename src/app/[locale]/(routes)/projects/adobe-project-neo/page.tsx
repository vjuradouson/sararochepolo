import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import AdobeProjectNeoContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.adobe_project_neo.seo.title");
    const description = t("app.projects.adobe_project_neo.seo.description")
    const ogImage = `${BASE_URL}/media/project/adobe-project-neo/9-keyboard-final.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_ADOBE_PROJECT_NEO
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_ADOBE_PROJECT_NEO, locale)}`,
                images: [{ url: ogImage, width: 1078, height: 1080 }],
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

export default async function AdobeProjectNeoPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_ADOBE_PROJECT_NEO, locale)}`;
    const ogImage = `${BASE_URL}/media/project/adobe-project-neo/9-keyboard-final.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.adobe_project_neo.seo.title"),
        description: t("app.projects.adobe_project_neo.seo.description"),
        url,
        image: ogImage,
        genre: "3D Design",
        about: ["3D Design", "Adobe Project Neo", "Product Visualization"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.home.projects.adobe_project_neo.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <AdobeProjectNeoContent />
        </>
    );
}
