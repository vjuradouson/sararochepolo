import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactContent from "./ContactContent";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("app.contact");

    return {
        title: t("seo.title"),
        description: t("seo.description"),
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
                header: t("app.contact.header"),
                title: t("app.contact.h1"),
                description: t("app.contact.description"),
                formTitle: t("app.contact.form.title"),
                contactLinks,
            }}
        />
    );
}