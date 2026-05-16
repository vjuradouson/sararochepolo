import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";

type FaqSchemaParams = {
    t: (key: string) => string;
    locale: string;
};

export const FAQ_INDICES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function getAboutFaqSchema({ t, locale }: FaqSchemaParams) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: `${BASE_URL}/${locale}${getPath(ROUTES.ABOUT, locale)}`,
        inLanguage: locale,
        mainEntity: FAQ_INDICES.map((i) => ({
            "@type": "Question",
            name: t(`app.about_me.faq.${i}.q`),
            acceptedAnswer: {
                "@type": "Answer",
                text: t(`app.about_me.faq.${i}.a`)
            }
        }))
    };
}
