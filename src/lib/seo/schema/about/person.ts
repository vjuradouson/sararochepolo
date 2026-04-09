import { BASE_URL } from '@/lib/config';
import { getPersonSchema } from '../person';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";

type AboutSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export function getAboutPersonSchema({ t, locale }: AboutSchemaParams) {
    const person = getPersonSchema({ t, locale });

    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: t("app.about_me.h1"),
        url: `${BASE_URL}/${locale}${getPath(ROUTES.ABOUT, locale)}`,
        inLanguage: locale,
        about: {
            "@type": "Person",
            name: person.name,
            url: person.url
        }
    };
}