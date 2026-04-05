import { BASE_URL } from '@/lib/config';

type PersonSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getPersonSchema({ t, locale }: PersonSchemaParams) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: t("app.portfolio.owner"),
        jobTitle: t("app.portfolio.seo.schema.person.job_title"),
        description: t("app.portfolio.description"),
        url: BASE_URL,
        inLanguage: locale,
        image: {
            "@type": "ImageObject",
            url: `${BASE_URL}/media/about/profile.png`
        },
        knowsAbout: [
            "UX Design",
            "UI Design",
            "Product Design",
            "User Research",
            "Design Systems"
        ],
        sameAs: [
            t('app.contact.contact_link.linkedin.href')
        ]
    };
}