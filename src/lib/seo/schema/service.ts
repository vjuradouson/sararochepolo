import { BASE_URL } from '@/lib/config';
import { getPersonSchema } from './person';

type ServiceSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getServiceSchema({ t, locale }: ServiceSchemaParams) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BASE_URL}/#service-ux-design`,
        name: t("app.portfolio.seo.schema.service.name"),
        url: BASE_URL,
        inLanguage: locale,

        areaServed: {
            "@type": "AdministrativeArea",
            name: "Worldwide"
        },

        provider: {
            "@type": "ProfessionalService",
            "@id": `${BASE_URL}/#professional-service`
        }
    };
}