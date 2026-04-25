import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import BrandingProjectDonTostadoContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.branding.projects.don_tostado.seo.title");
    const description = t("app.projects.branding.projects.don_tostado.seo.description")
    const ogImage = `${BASE_URL}/media/project/branding-don-tostado/coffee-shop.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_BRANDING_DON_TOSTADO
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING_DON_TOSTADO, locale)}`,
                images: [{ url: ogImage, width: 1920, height: 1080 }],
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

export default async function BrandingProjectDonTostadoPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING_DON_TOSTADO, locale)}`;
    const brandingUrl = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING, locale)}`;
    const ogImage = `${BASE_URL}/media/project/branding-don-tostado/coffee-shop.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.branding.projects.don_tostado.seo.title"),
        description: t("app.projects.branding.projects.don_tostado.seo.description"),
        url,
        image: ogImage,
        genre: "Branding",
        about: ["Branding", "Visual Identity", "Logo Design", "Specialty Coffee"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.home.projects.branding.title"), url: brandingUrl },
        { name: t("app.projects.branding.projects.don_tostado.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <BrandingProjectDonTostadoContent />
        </>
    );
}
