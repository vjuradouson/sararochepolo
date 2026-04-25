import { BASE_URL } from '@/lib/config';

type ProjectCreativeWorkSchemaParams = {
    t: (key: string) => string;
    locale: string;
    name: string;
    description: string;
    url: string;
    image: string;
    genre?: string;
    about?: string[];
};

export function getProjectCreativeWorkSchema({
    t,
    locale,
    name,
    description,
    url,
    image,
    genre,
    about,
}: ProjectCreativeWorkSchemaParams) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        url,
        inLanguage: locale,
        genre: genre ?? "Design Project",
        creator: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: t("app.portfolio.owner"),
            url: BASE_URL,
        },
        image: {
            "@type": "ImageObject",
            url: image,
        },
        ...(about && about.length ? { about } : {}),
    };
}
