import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import SocialMediaContent from "./components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.social_media.seo.title");
    const description = t("app.projects.social_media.seo.description")
    const ogImage = `${BASE_URL}/media/projects/social-media/social-media.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_SOCIAL_MEDIA
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_SOCIAL_MEDIA, locale)}`,
                images: [{ url: ogImage, width: 926, height: 542 }],
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

export default async function SocialMediaPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_SOCIAL_MEDIA, locale)}`;
    const ogImage = `${BASE_URL}/media/projects/social-media/social-media.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.social_media.seo.title"),
        description: t("app.projects.social_media.seo.description"),
        url,
        image: ogImage,
        genre: "Social Media Design",
        about: ["Social Media", "Meta Ads", "Visual Communication", "Advertising Design"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.projects.social_media.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <SocialMediaContent />
        </>
    );
}
