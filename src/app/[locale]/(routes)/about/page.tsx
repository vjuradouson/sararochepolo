import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutContent from "./components/AboutContent";
import JsonLd from "@/components/seo/JsonLd";
import { getAboutPersonSchema } from "@/lib/seo/schema/about/person";
import { BASE_URL } from '@/lib/config';
import { getPath } from "@/i18n/getPath";
import { ROUTES } from "@/constants/routes";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations();

    return {
        title: t("app.about.seo.title"),
        description: t("app.about.seo.description"),
        openGraph: {
            title: t("app.about.seo.title"),
            description: t("app.about.seo.description"),
            url: `${BASE_URL}/${locale}${getPath(ROUTES.ABOUT, locale)}`,
        }
    };
}

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    const personSchema = getAboutPersonSchema({ t, locale });

    return (
        <>
            <JsonLd data={personSchema} />
            <AboutContent
                data={{
                    header: t("app.about.header"),
                    title: t("app.about.h1"),
                    owner: t("app.portfolio.owner"),

                    paragraphs: [
                        `Soy Product Designer especializada en UX/UI con más de 3 años de experiencia transformando necesidades complejas en soluciones digitales claras, funcionales y visualmente coherentes.`,
                        `Actualmente trabajo en Grupo Piquer, donde diseño experiencias digitales en entornos educativos, mejorando la usabilidad, la estructura de la información y la consistencia visual de la plataforma.`,
                        `Mi perfil combina diseño de producto y comunicación visual, lo que me permite trabajar tanto en interfaces digitales como en piezas físicas, asegurando una experiencia de marca consistente en todos los puntos de contacto.`,
                        `Formación en Estudios Ingleses (C2) y educación, lo que me aporta una fuerte capacidad de comunicación, pensamiento estructurado y atención al detalle.`,
                        `Actualmente disponible para colaboraciones, proyectos freelance y oportunidades en producto digital.`,
                    ],

                    labels: {
                        skills: "Habilidades",
                        info: "Información",
                        location: "Ubicación",
                        languages: "Idiomas",
                    },

                    info: {
                        location: "Zaragoza, España",
                        languages: "Español nativo · Inglés C2",
                    },
                }}
            />
        </>

    );
}