"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

type BrandingProject = {
    key: string;
    href: string;
    image: string;
    imageAltKey: string;
    titleKey: string;
    sectorKey: string;
    year: string;
};

const projects: BrandingProject[] = [
    {
        key: "la_esquinita_de_papel",
        href: ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL,
        image: "/media/project/branding-la-esquinita/masonry/1-library-entry.png",
        imageAltKey: "branding.projects.la_esquinita_de_papel.content.image_alt.library_entry",
        titleKey: "branding.projects.la_esquinita_de_papel.content.about.heading",
        sectorKey: "branding.content.projects.la_esquinita_de_papel.sector",
        year: "2024",
    },
    {
        key: "don_tostado",
        href: ROUTES.PROJECTS_BRANDING_DON_TOSTADO,
        image: "/media/project/branding-don-tostado/coffee-shop.png",
        imageAltKey: "branding.projects.don_tostado.content.image_alt.coffee_shop",
        titleKey: "branding.projects.don_tostado.content.about.heading",
        sectorKey: "branding.content.projects.don_tostado.sector",
        year: "2023",
    }
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const headerReveal = {
    variants: fadeInUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: "easeOut" as const },
};

type ProjectCardProps = {
    project: BrandingProject;
    index: number;
    staggered: boolean;
};

function ProjectCard({ project, index, staggered }: ProjectCardProps) {
    const t = useTranslations("app.projects");

    return (
        <motion.li
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: (index % 2) * 0.12 }}
            className={staggered && index % 2 === 1 ? "md:mt-24 lg:mt-32" : ""}
        >
            <Link href={project.href} className="group block" aria-label={t(project.titleKey)}>
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    <Image
                        src={project.image}
                        alt={t(project.imageAltKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={75}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">
                            {t(project.sectorKey)} · {project.year}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                            {t(project.titleKey)}
                        </h3>
                    </div>
                    <ArrowUpRight
                        className="mt-2 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
                        size={28}
                        strokeWidth={1.25}
                    />
                </div>
            </Link>
        </motion.li>
    );
}

export default function BrandingContent() {
    const t = useTranslations("app.projects");
    const staggered = projects.length <= 4;

    return (
        <div className="text-lg md:text-xl xl:text-2xl">
            <section className="w-full md:pt-16 mt-20 md:mt-10">
                <motion.div {...headerReveal} className="container-xl mx-auto pb-10">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("branding.content.eyebrow")}
                    </p>
                    <h1 className="-ml-1 mb-10 text-4xl md:text-5xl font-light tracking-tight">
                        {t("branding.content.title")}
                    </h1>
                </motion.div>
            </section>

            <section className="container-xl mx-auto pb-24 md:pb-32">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.key}
                            project={project}
                            index={index}
                            staggered={staggered}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}
