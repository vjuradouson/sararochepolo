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

const IMG_BASE = "/media/projects/social-media";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

type VerticalProject = {
    key: "la_esquinita_de_papel" | "don_tostado";
    src: string;
    width: number;
    height: number;
};

const verticalProjects: VerticalProject[] = [
    {
        key: "la_esquinita_de_papel",
        src: `${IMG_BASE}/la-esquinita-de-papel.png`,
        width: 440,
        height: 684,
    },
    {
        key: "don_tostado",
        src: `${IMG_BASE}/don-tostado.png`,
        width: 440,
        height: 684,
    },
];

type T = ReturnType<typeof useTranslations>;

function VerticalProjectCard({ project, t }: { project: VerticalProject; t: T }) {
    const base = `projects.${project.key}`;
    return (
        <motion.div {...revealProps} className="flex flex-col">
            <Image
                src={project.src}
                alt={t(`${base}.image_alt`)}
                width={project.width}
                height={project.height}
                sizes="(max-width: 768px) 70vw, 480px"
                quality={90}
                className="block mx-auto w-full max-w-[480px] h-auto"
            />
        </motion.div>
    );
}

export default function SocialMediaContent() {
    const t = useTranslations("app.projects.social_media.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl">
            {/* ─── HERO ────────────────────────────────────────────── */}
            <section className="container-xl md:pt-4 mb-16 md:mb-20">
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

            {/* ─── FEATURED: Patitas con historia (full-bleed) ─────── */}
            <section className="relative w-full mb-12 md:mb-16 overflow-hidden bg-[#9DC7C8]">
                <Image
                    src={`${IMG_BASE}/dogs-background.png`}
                    alt=""
                    aria-hidden
                    fill
                    sizes="100vw"
                    quality={90}
                    priority
                    fetchPriority="high"
                    className="object-cover object-center"
                />
                <div className="relative flex flex-col md:flex-row md:items-center md:aspect-[1440/713]">
                    <div className="md:basis-[40%] text-white text-center md:text-left px-6 md:pl-[7%] pt-12 md:pt-0">
                        <p className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold leading-[1.05]">
                            Old Paws,<br />Big Stories
                        </p>
                        <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-xl lg:text-2xl font-light">
                            Senior dog shelter
                        </p>
                    </div>
                    <div className="md:flex-1 md:flex md:items-center md:justify-end md:pr-[4%] pt-8 pb-12 md:pt-0 md:pb-0">
                        <Image
                            src={`${IMG_BASE}/social-media.png`}
                            alt={t("projects.patitas_con_historia.image_alt")}
                            width={926}
                            height={542}
                            sizes="(max-width: 768px) 100vw, 55vw"
                            quality={90}
                            className="w-full h-auto pl-3 pr-3"
                        />
                    </div>
                </div>
            </section>


            {/* ─── Vertical mockups (la-esquinita + don-tostado) ────── */}
            <section className="container-xl pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 max-w-5xl mx-auto">
                    {verticalProjects.map((project) => (
                        <VerticalProjectCard key={project.key} project={project} t={t} />
                    ))}
                </div>
            </section>
        </div>
    );
}
