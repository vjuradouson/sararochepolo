"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

type UxUiProject = {
    key: string;
    href?: string;
    image: string;
    imageAltKey: string;
    titleKey: string;
    sectorKey: string;
    number: string;
};

const projects: UxUiProject[] = [
    {
        key: "pet-buddy",
        href: ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY,
        image: "/media/projects/ux-ui-design/pet-buddy/buster-muse-screen.png",
        imageAltKey: "ux_ui_design.projects.pet_buddy.content.image_alt.buster_muse",
        titleKey: "ux_ui_design.projects.pet_buddy.content.title",
        sectorKey: "ux_ui_design.content.projects.pet_buddy.sector",
        number: "01",
    }
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

type ProjectCardProps = {
    project: UxUiProject;
    index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
    const t = useTranslations("app.projects");
    const title = t(project.titleKey);

    const card = (
        <div className="group relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
            <Image
                src={project.image}
                alt={t(project.imageAltKey)}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={75}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-20 px-4 pb-4 md:pt-24 md:px-6 md:pb-6">
                <span className="text-white text-3xl font-semibold tracking-tight [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.9),_0_0_2px_rgb(0_0_0_/_0.8)]">
                    {title}
                </span>
            </div>
        </div>
    );

    return (
        <motion.li
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
            className="flex flex-col"
        >
            <p className="text-4xl font-medium text-neutral-400 leading-none">
                {project.number}
            </p>
            <p className="mt-3 mb-5 text-2xl text-neutral-600">
                {t(project.sectorKey)}
            </p>
            {project.href ? (
                <Link href={project.href} aria-label={title}>
                    {card}
                </Link>
            ) : (
                card
            )}
        </motion.li>
    );
}

export default function UxUiDesignContent() {
    const t = useTranslations("app.projects");

    return (
        <div className="text-xl xl:text-2xl">
            <section className="w-full md:pt-16 mt-20 md:mt-10">
                <div className="container-xl mx-auto pb-10">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("ux_ui_design.content.eyebrow")}
                    </p>
                    <h1 className="-ml-1 mb-3 text-4xl md:text-5xl font-light tracking-tight">
                        {t("ux_ui_design.content.title")}
                    </h1>
                </div>
            </section>

            <section className="container-xl md:pr-16 md:pl-16 mx-auto pb-24 md:pb-32">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-12">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.key}
                            project={project}
                            index={index}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}
