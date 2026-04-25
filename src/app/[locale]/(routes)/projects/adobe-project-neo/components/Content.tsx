"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const revealProps = {
    variants: fadeInUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: "easeOut" as const },
};

const IMG_BASE = "/media/project/adobe-project-neo";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

export default function AdobeProjectNeoContent() {
    const t = useTranslations("app.projects.adobe_project_neo.content");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div key={refreshKey} className="text-lg md:text-xl xl:text-2xl">
            {/* ─── HEADER ─────────────────────────────────────────────── */}
            <section className="container-xl md:pt-16 mt-20 md:mt-10 mb-10">
                <motion.div {...revealProps} className="max-w-full">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("eyebrow")}
                    </p>
                    <h1 className="mb-10 text-4xl md:text-5xl font-light tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="leading-relaxed">
                        {t("intro")}
                    </p>
                </motion.div>
            </section>

            {/* ─── 1. Interfaz + Styles overlay ──────────────────────── */}
            <section className="container-xl pb-8">
                <motion.div
                    {...revealProps}
                    className="relative max-w-5xl mx-auto md:pb-[6%] items-center"
                >
                    <Image
                        src={`${IMG_BASE}/1-white-frame.png`}
                        alt={t("image_alt.interface")}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        quality={75}
                        className="w-full h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
                    />
                    <Image
                        src={`${IMG_BASE}/2-styles.png`}
                        alt={t("image_alt.styles_panel")}
                        width={500}
                        height={600}
                        sizes="(max-width: 768px) 50vw, 22vw"
                        quality={75}
                        className="block mx-auto mt-8 w-1/2 max-w-[280px]
                                   md:absolute md:mt-0 md:mx-0
                                   md:bottom-0 md:right-[6%] md:translate-y-[30%]
                                   md:w-[26%] md:max-w-[320px]
                                   h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                    />
                </motion.div>
                <motion.div
                    {...revealProps}
                    className="relative max-w-5xl mx-auto md:pb-[12%] items-center"
                >
                    <motion.p
                        {...revealProps}
                        className="mt-16 md:mt-0 md:max-w-md lg:max-w-lg xl:max-w-2xl leading-relaxed"
                    >
                        {t.rich("styles.description", { highlight })}
                    </motion.p>
                </motion.div>

            </section>

            {/* ─── 2. Formas simples (img 3) ─────────────────────────── */}
            <section className="container-xl pb-16 md:pb-24">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
                >
                    <div className="flex items-stretch gap-2 md:gap-3 w-full">
                        <div className="relative flex-shrink-0 w-10 md:w-9">
                            <Image
                                src={`${IMG_BASE}/3-1-keyboard-forms.png`}
                                alt={t("image_alt.forms")}
                                fill
                                sizes="(max-width: 768px) 12vw, 5vw"
                                quality={75}
                                className="object-contain object-top rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                            />
                        </div>
                        <Image
                            src={`${IMG_BASE}/3-2-keyboard-forms.png`}
                            alt={t("image_alt.forms")}
                            width={700}
                            height={600}
                            sizes="(max-width: 768px) 75vw, 35vw"
                            quality={75}
                            className="flex-1 w-full h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                        />
                    </div>
                    <p className="max-w-md leading-relaxed">
                        {t.rich("forms.description", { highlight })}
                    </p>
                </motion.div>
            </section>

            {/* ─── 3. Animación wiggle (img 4 + 5 overlay) ───────────── */}
            <section className="container-xl pb-16 md:pb-32">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    <p className="order-2 md:order-1 max-w-md leading-relaxed">
                        {t.rich("animation.description", { highlight })}
                    </p>

                    <div className="order-1 md:order-2 relative md:pb-[15%]">
                        <Image
                            src={`${IMG_BASE}/4-keyboard-prototype.png`}
                            alt={t("image_alt.keyboard_prototype")}
                            width={900}
                            height={700}
                            sizes="(max-width: 768px) 90vw, 45vw"
                            quality={75}
                            className="w-full h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                        />
                        <Image
                            src={`${IMG_BASE}/5-motion.png`}
                            alt={t("image_alt.motion_panel")}
                            width={400}
                            height={600}
                            sizes="(max-width: 768px) 45vw, 18vw"
                            quality={75}
                            className="block mx-auto mt-6 w-1/2 max-w-[240px]
                                       md:absolute md:mt-0 md:mx-0
                                       md:bottom-0 md:left-[-8%] md:translate-y-[25%]
                                       md:w-[45%] md:max-w-[220px]
                                       h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ─── Subtítulo: Animación estilo vectorial ─────────────── */}
            <section className="container-xl pb-8">
                <motion.h2
                    {...revealProps}
                    className="mx-auto max-w-5xl text-neutral-700"
                >
                    {t("animation.section_title")}
                </motion.h2>
            </section>

            {/* ─── 4. Blueprint grande + realista (img 6 / 7 / 8) ────── */}
            <section className="container-xl pb-16 md:pb-32">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 md:items-end"
                >
                    <div>
                        <Image
                            src={`${IMG_BASE}/6-keyboard-animation.png`}
                            alt={t("image_alt.keyboard_animation")}
                            width={1000}
                            height={750}
                            sizes="(max-width: 768px) 90vw, 45vw"
                            quality={75}
                            className="w-full h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                        />
                    </div>

                    <div className="flex flex-col gap-8 md:h-full md:justify-between">
                        <p className="max-w-md leading-relaxed">
                            {t("realistic.description")}
                        </p>

                        <div className="flex items-end gap-4 md:gap-6">
                            <Image
                                src={`${IMG_BASE}/7-styles.png`}
                                alt={t("image_alt.realistic_preview")}
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 40vw, 18vw"
                                quality={75}
                                className="w-1/2 max-w-[180px] h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                            />
                            <Image
                                src={`${IMG_BASE}/8-appearance.png`}
                                alt={t("image_alt.appearance_panel")}
                                width={400}
                                height={600}
                                sizes="(max-width: 768px) 40vw, 18vw"
                                quality={75}
                                className="w-1/2 max-w-[180px] h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Subtítulo: Animación final ───────────────────────── */}
            <section className="container-xl pb-8">
                <motion.h2
                    {...revealProps}
                    className="mx-auto max-w-5xl text-neutral-700"
                >
                    {t("final_render.section_title")}
                </motion.h2>
            </section>

            {/* ─── 5. Render final (video 9) ──────────────────────────── */}
            <section className="container-xl pb-24 md:pb-32">
                <motion.div {...revealProps} className="mx-auto max-w-3xl">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={t("image_alt.final_render")}
                        poster={`${IMG_BASE}/9-keyboard-final.png`}
                        className="w-full h-auto rounded-[var(--radius-card)] shadow-[var(--shadow-card-xs)]"
                    >
                        <source
                            src={`${IMG_BASE}/9-keyboard-final.mp4`}
                            type="video/mp4"
                        />
                    </video>
                </motion.div>
            </section>
        </div>
    );
}
