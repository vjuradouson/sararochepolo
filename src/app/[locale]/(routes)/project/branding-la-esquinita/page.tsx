import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import BrandingProjectLaEsquinitaContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.project.branding_la_esquinita.seo.title");
    const description = t("app.project.branding_la_esquinita.seo.description")

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECT_ADOBE_PROJECT_NEO
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECT_ADOBE_PROJECT_NEO, locale)}`,
            }
        }
    )
}

export default async function BrandingProjectLaEsquinitaPage() {
    return <BrandingProjectLaEsquinitaContent />;
}