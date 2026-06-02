import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectCreativeWorkSchema } from "@/lib/seo/schema/projectCreativeWork";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import UxUiDesignPetBuddyContent from "./_components/Content";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.projects.ux_ui_design.projects.pet_buddy.seo.title");
    const description = t("app.projects.ux_ui_design.projects.pet_buddy.seo.description")
    const ogImage = `${BASE_URL}/media/projects/ux-ui-design/pet-buddy/buster-muse-screen.png`;

    return withAlternates(
        {
            locale,
            route: ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY, locale)}`,
                images: [{ url: ogImage, width: 423, height: 770 }],
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

export default async function UxUiDesignPetBuddyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const url = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY, locale)}`;
    const uxUiUrl = `${BASE_URL}/${locale}${getPath(ROUTES.PROJECTS_UX_UI_DESIGN, locale)}`;
    const ogImage = `${BASE_URL}/media/projects/ux-ui-design/pet-buddy/buster-muse-screen.png`;

    const creativeWorkSchema = getProjectCreativeWorkSchema({
        t,
        locale,
        name: t("app.projects.ux_ui_design.projects.pet_buddy.seo.title"),
        description: t("app.projects.ux_ui_design.projects.pet_buddy.seo.description"),
        url,
        image: ogImage,
        genre: "UX/UI Design",
        about: ["Figma", "UX/UI Design", "Mobile App Design", "Interaction Design"],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: t("app.breadcrumb.home"), url: `${BASE_URL}/${locale}` },
        { name: t("app.projects.ux_ui_design.content.title"), url: uxUiUrl },
        { name: t("app.projects.ux_ui_design.projects.pet_buddy.content.title"), url },
    ]);

    return (
        <>
            <JsonLd data={creativeWorkSchema} />
            <JsonLd data={breadcrumbSchema} />
            <UxUiDesignPetBuddyContent />
        </>
    );
}
