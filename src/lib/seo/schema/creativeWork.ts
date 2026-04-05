import { BASE_URL } from '@/lib/config';
import { getPersonSchema } from './person';

type CreativeWorkSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getCreativeWorkSchema({ t, locale }: CreativeWorkSchemaParams) {
    const person = getPersonSchema({ t, locale });

    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${BASE_URL}/#portfolio`,
        name: t("app.portfolio.seo.schema.creative_work.name"),
        url: BASE_URL,
        inLanguage: locale,
        genre: "UX/UI Portfolio",
        creator: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: person.name,
            url: person.url
        },
        image: {
            "@type": "ImageObject",
            url: `${BASE_URL}/media/about/profile.png`
        },
        about: [
            "UX Design",
            "UI Design",
            "Product Design"
        ]
    };
}