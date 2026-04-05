import { BASE_URL, LOCALES } from '@/lib/config';

type WebsiteSchemaParams = {
    t: (key: string) => string;
};

export function getWebsiteSchema({ t }: WebsiteSchemaParams) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: t("app.portfolio.seo.schema.website.name"),
        inLanguage: LOCALES,
        publisher: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`
        },
        sameAs: [
            t('app.contact.contact_link.linkedin.href')
        ]
    };
}