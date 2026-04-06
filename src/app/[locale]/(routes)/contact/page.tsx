import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactContent from "./ContactContent";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    return {
        title: t("app.contact.seo.title"),
        description: t("app.contact.seo.description"),
        openGraph: {
            title: t("app.contact.seo.title"),
            description: t("app.contact.seo.description"),
            url: `${BASE_URL}/${locale}${getPath(ROUTES.CONTACT, locale)}`,
        }
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const contactLinks = [
        {
            label: t("app.contact.contact_link.linkedin.label"),
            value: t("app.contact.contact_link.linkedin.value"),
            href: t("app.contact.contact_link.linkedin.href"),
        },
        {
            label: t("app.contact.contact_link.location.label"),
            value: t("app.contact.contact_link.location.value"),
            href: null,
        },
    ];

    return (
        <ContactContent
            data={{
                header: t("app.contact.h1"),
                title: t("app.contact.header"),
                description: t("app.contact.description"),
                formTitle: t("app.contact.form.title"),
                contactLinks,
            }}
        />
    );
}