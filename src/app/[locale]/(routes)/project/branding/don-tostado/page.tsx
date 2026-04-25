import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import BrandingProjectDonTostadoContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.project.branding_don_tostado.seo.title");
    const description = t("app.project.branding_don_tostado.seo.description")

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECT_BRANDING_DON_TOSTADO
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECT_BRANDING_DON_TOSTADO, locale)}`,
            }
        }
    )
}

export default async function BrandingProjectLaEsquinitaPage() {
    return <BrandingProjectDonTostadoContent />;
}