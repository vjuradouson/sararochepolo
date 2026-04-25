import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import BrandingProjectLaEsquinitaDePapelContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.branding.projects.la_esquinita_de_papel.seo.title");
    const description = t("app.projects.branding.projects.la_esquinita_de_papel.seo.description")
    const ogImage = `${BASE_URL}/media/project/branding-la-esquinita/horizontal-logo.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL, locale)}`,
                images: [{ url: ogImage, width: 1200, height: 388 }],
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

export default async function BrandingProjectLaEsquinitaDePapelPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL, locale)}`;
    const brandingUrl = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING, locale)}`;
    const ogImage = `${BASE_URL}/media/project/branding-la-esquinita/horizontal-logo.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.branding.projects.la_esquinita_de_papel.seo.title"),
        description: t("app.projects.branding.projects.la_esquinita_de_papel.seo.description"),
        url,
        image: ogImage,
        genre: "Branding",
        about: ["Branding", "Visual Identity", "Logo Design", "Bookstore"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.home.projects.branding.title"), url: brandingUrl },
        { name: t("app.projects.branding.projects.la_esquinita_de_papel.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <BrandingProjectLaEsquinitaDePapelContent />
        </>
    );
}
