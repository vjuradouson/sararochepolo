"use client";

import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import ZoomableImage from "@/components/ui/ZoomableImage";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const revealProps = {
    variants: fadeInUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: "easeOut" as const },
};

const IMG_BASE = "/media/projects/figma";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

type FigmaProject = {
    key: string;
    src: string;
    width: number;
    height: number;
    priority?: boolean;
    /** Limita el ancho máximo del <Image> en px (útil para mockups verticales que no deben ocupar todo el container). */
    maxWidthPx?: number;
};

const projects: FigmaProject[] = [
    {
        key: "starbucks",
        src: `${IMG_BASE}/starbucks.png`,
        width: 1920,
        height: 908,
        priority: true,
    },
    {
        key: "aloha",
        src: `${IMG_BASE}/aloha.png`,
        width: 1920,
        height: 1044,
    },
    {
        key: "zgz_rutas",
        src: `${IMG_BASE}/zgz-rutas.png`,
        width: 1920,
        height: 534,
    },
    {
        key: "zgz_rutas_2",
        src: `${IMG_BASE}/zgz-rutas-2.png`,
        width: 982,
        height: 1050,
        maxWidthPx: 700,
    },
    {
        key: "jason_freeny",
        src: `${IMG_BASE}/jason-freeny.png`,
        width: 1920,
        height: 927,
    }
];

type T = ReturnType<typeof useTranslations>;

function ProjectSection({ project, t }: { project: FigmaProject; t: T }) {
    const base = `projects.${project.key}`;
    return (
        <section className="container-xl pb-16 md:pb-24">
            <motion.div {...revealProps} className="mx-auto">
                <motion.h2
                    {...revealProps}
                    className="mb-6 md:mb-8 text-neutral-700"
                >
                    {t(`${base}.section_title`)}
                </motion.h2>
                <motion.p
                    {...revealProps}
                    className="mb-10 md:mb-12 leading-relaxed"
                >
                    {t.rich(`${base}.description`, { highlight })}
                </motion.p>
                <ZoomableImage
                    src={project.src}
                    alt={t(`${base}.image_alt`)}
                    width={project.width}
                    height={project.height}
                    sizes={project.maxWidthPx ? `(max-width: 768px) 90vw, ${project.maxWidthPx}px` : "(max-width: 768px) 100vw, 80vw"}
                    priority={project.priority}
                    maxWidthPx={project.maxWidthPx}
                    zoomAriaLabel={t("zoom_aria")}
                />
            </motion.div>
        </section>
    );
}

export default function UxUiDesignContent() {
    const t = useTranslations("app.projects.figma.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl">
            <section className="container-xl md:pt-16 mt-20 md:mt-10 mb-16 md:mb-20">
                <div className="max-w-full">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("eyebrow")}
                    </p>
                    <h1 className="mb-10 text-4xl md:text-5xl font-light tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="leading-relaxed">
                        {t.rich("intro", { highlight })}
                    </p>
                </div>
            </section>

            {projects.map((project) => (
                <ProjectSection key={project.key} project={project} t={t} />
            ))}
        </div>
    );
}
