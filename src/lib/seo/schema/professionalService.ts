import { BASE_URL } from '@/lib/config';
import { getPersonSchema } from './person';

type ProfessionalServiceSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getProfessionalServiceSchema({ t, locale }: ProfessionalServiceSchemaParams) {
    const person = getPersonSchema({ t, locale });

    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#professional-service`,
        name: person.name,
        url: BASE_URL,
        image: `${BASE_URL}/media/about/profile.png`,
        inLanguage: locale,
        address: {
            "@type": "PostalAddress",
            addressLocality: t("app.portfolio.seo.schema.professional_service.address.addressLocality"),
            addressRegion: t("app.portfolio.seo.schema.professional_service.address.addressRegion"),
            addressCountry: t("app.portfolio.seo.schema.professional_service.address.addressCountry")
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 41.6474,
            longitude: 0.8861
        },
        areaServed: {
            "@type": "Place",
            name: "Zaragoza"
        },
        sameAs: person.sameAs,
        jobTitle: person.jobTitle,
        founder: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`
        }
    };
}