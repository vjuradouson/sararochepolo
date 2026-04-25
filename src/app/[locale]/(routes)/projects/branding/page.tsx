import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import BrandingContent from "./Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.branding.seo.title");
    const description = t("app.projects.branding.seo.description")

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_BRANDING
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_BRANDING, locale)}`,
            }
        }
    )
}

export default async function BrandingPage() {
    return <BrandingContent />;
}