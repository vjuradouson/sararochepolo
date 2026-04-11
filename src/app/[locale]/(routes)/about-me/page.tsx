import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutContent from "./components/AboutMeContent";
import JsonLd from "@/components/seo/JsonLd";
import { getAboutPersonSchema } from "@/lib/seo/schema/about/person";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    const title = t("app.about_me.seo.title");
    const description = t("app.about_me.seo.description")

    return withAlternates(
        {
            locale,
            route: ROUTES.ABOUT
        },
        {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.ABOUT, locale)}`,
            }
        }
    )
}

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    const personSchema = getAboutPersonSchema({ t, locale });

    return (
        <>
            <JsonLd data={personSchema} />
            <AboutContent
                data={{
                    h1: t("app.about_me.h1"),
                    header: {
                        greeting: t("app.about_me.header.greeting"),
                        presentation: t("app.about_me.header.presentation"),
                    },
                    owner: t("app.portfolio.owner"),
                    image: {
                        title: t("app.about_me.image_title"),
                        alt: t("app.about_me.image_alt"),
                    },
                    skills: {
                        title: t("app.about_me.content.skills.title")
                    },
                    paragraphs: [
                        t("app.about_me.content.paragraphs.p1"),
                        t("app.about_me.content.paragraphs.p2"),
                        t("app.about_me.content.paragraphs.p3"),
                        t("app.about_me.content.paragraphs.p4")
                    ],
                    formation: {
                        title: t("app.about_me.content.formation.title")
                    },
                    info: {
                        location: "string",
                        languages: "string"
                    }
                }}
            />
        </>

    );
}