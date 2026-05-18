"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

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

const IMG_BASE = "/media/projects/editorial";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

type PrintProject = {
    key: "triptych" | "flyers" | "rollups";
    src: string;
    width: number;
    height: number;
    priority?: boolean;
};

const projects: PrintProject[] = [
    {
        key: "triptych",
        src: `${IMG_BASE}/triptych.png`,
        width: 2119,
        height: 1720,
        priority: true,
    },
    {
        key: "flyers",
        src: `${IMG_BASE}/flyers.png`,
        width: 2874,
        height: 2304,
    },
    {
        key: "rollups",
        src: `${IMG_BASE}/rollups.png`,
        width: 3630,
        height: 2088,
    },
];

type T = ReturnType<typeof useTranslations>;

function ProjectSection({ project, t }: { project: PrintProject; t: T }) {
    const base = `projects.${project.key}`;
    return (
        <section className="container-xl pb-16 md:pb-24">
            <motion.div
                {...revealProps}
                className="flex flex-col-reverse md:flex-row items-center gap-y-8 md:gap-x-12 lg:gap-x-16"
            >
                <div className="w-full md:w-3/5">
                    <Image
                        src={project.src}
                        alt={t(`${base}.image_alt`)}
                        width={project.width}
                        height={project.height}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        quality={90}
                        priority={project.priority}
                        fetchPriority={project.priority ? "high" : "auto"}
                        className="w-full h-auto drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                    />
                </div>
                <p className="w-full md:w-2/5 leading-relaxed">
                    {t.rich(`${base}.description`, { highlight })}
                </p>
            </motion.div>
        </section>
    );
}

export default function PrintDesignContent() {
    const t = useTranslations("app.projects.print_design.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl">
            {/* ─── HEADER ────────────────────────────────────────────── */}
            <section className="container-xl md:pt-16 mt-20 md:mt-10 mb-12 md:mb-16">
                <div className="max-w-full">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("eyebrow")}
                    </p>
                    <h1 className="mb-10 text-4xl md:text-5xl font-light tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="leading-relaxed mb-10 md:mb-12">
                        {t.rich("intro", { highlight })}
                    </p>
                    <p className="leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {projects.map((project) => (
                <ProjectSection key={project.key} project={project} t={t} />
            ))}
        </div>
    );
}
