import { BASE_URL } from '@/lib/config';
import { getPersonSchema } from './person';

type ProfileSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getProfileSchema({ t, locale }: ProfileSchemaParams) {
    const person = getPersonSchema({ t, locale });

    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/#profile`,
        "isPartOf": {
            "@id": `${BASE_URL}#website`
        },
        name: t("app.portfolio.seo.schema.profile.name"),
        url: `${BASE_URL}/${locale}`,
        inLanguage: locale,
        mainEntity: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: person.name,
            url: person.url
        },
        about: {
            "@type": "Person",
            name: person.name,
            url: person.url
        }
    };
}