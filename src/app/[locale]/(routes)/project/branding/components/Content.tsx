"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";

const goudyOldStyle = localFont({
    src: [
        {
            path: "../../../../../../styles/fonts/goudy-old-style.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../../../../styles/fonts/goudy-old-style.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
});


const IMG_BASE = "/media/project/branding_la_esquinita";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

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

export default function BrandingProjectLaEsquinitaContent() {
    const t = useTranslations("app.project.branding_la_esquinita.content");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div key={refreshKey} className="text-lg md:text-xl xl:text-2xl">
            <section className="w-full md:pt-16 mt-20 md:mt-10">
                <motion.div {...revealProps} className="container-xl mx-auto pb-10">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("eyebrow")}
                    </p>
                    <h1 className="-ml-1 mb-10 text-5xl md:text-7xl font-light tracking-tight">
                        {t("title")}
                    </h1>
                </motion.div>
                <motion.div {...revealProps} className="container-xxl mx-auto lg:px-6">
                    <motion.div {...revealProps} className="flex items-center justify-center bg-white py-12 px-6 md:py-20 md:px-12 rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                        <Image
                            src={`${IMG_BASE}/framed_logo.png`}
                            alt={t("image_alt.interface")}
                            width={800}
                            height={1000}
                            sizes="(max-width: 768px) 50vw, 30vw"
                            quality={90}
                            className="w-[55%] max-w-[320px] md:max-w-[300px] h-auto"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── About ─────────────────────────────────────────────── */}
            <section className="container-xl py-16 md:py-32">
                <motion.div {...revealProps} className="max-w">
                    <h2 className="-ml-0.5 mb-2 text-3xl md:text-4xl tracking-tight">
                        {t("about.heading")}
                    </h2>
                    <p className="mb-8 text-md md:text-lg italic">
                        {t("about.tagline")}
                    </p>
                    <div className="flex flex-col gap-6 leading-relaxed">
                        <p>{t.rich("about.paragraph_1", { highlight })}</p>
                        <p>{t.rich("about.paragraph_2", { highlight })}</p>
                    </div>
                </motion.div>
            </section>

            {/* ─── Logo variations ────────────────────────────────────── */}
            <section className="w-full bg-[#f5f5f5] py-12 md:pt-5 md:pb-0">
                <h2 className="sr-only">{t("logos_h2")}</h2>
                <motion.div
                    {...revealProps}
                    className="bg-white"
                >
                    <div className="container-xl grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-stretch bg-white"
                    >
                        {/* Framed logo */}
                        <motion.div {...revealProps}
                            className="flex items-center justify-center p-6 md:p-10">
                            <Image
                                src={`${IMG_BASE}/framed_logo.png`}
                                alt={t("image_alt.framed_logo")}
                                width={400}
                                height={500}
                                sizes="(max-width: 768px) 40vw, 25vw"
                                quality={90}
                                className="w-full max-w-[200px] md:max-w-[240px] h-auto"
                            />
                        </motion.div>

                        {/* Square logo */}
                        <motion.div {...revealProps}
                            className="flex items-center justify-center p-6 md:p-10">
                            <Image
                                src={`${IMG_BASE}/square_logo.png`}
                                alt={t("image_alt.square_logo")}
                                width={400}
                                height={500}
                                sizes="(max-width: 768px) 40vw, 25vw"
                                quality={90}
                                className="w-full max-w-[200px] md:max-w-[240px] h-auto"
                            />
                        </motion.div>

                        {/* Horizontal logo */}
                        <motion.div {...revealProps}
                            className="col-span-2 md:col-span-1 flex items-center justify-center p-6 md:p-10">
                            <Image
                                src={`${IMG_BASE}/horizontal_logo.png`}
                                alt={t("image_alt.horizontal_logo")}
                                width={800}
                                height={300}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                quality={90}
                                className="w-full max-w-[320px] md:max-w-[280px] h-auto"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Color palette ──────────────────────────────────────── */}
            <section className="w-full">
                <h2 className="sr-only">{t("colors_h2")}</h2>
                <motion.div
                    {...revealProps}
                    className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0"
                >
                    <div className="bg-[#F6F3EC] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="font-bold text-lg text-neutral-800">{t("colors.light_brown")}</p>
                            <p className="text-lg text-neutral-600">#F6F3EC</p>
                            <p className="text-lg text-neutral-600">rgb(246, 243, 236)</p>
                            <p className="text-lg text-neutral-600">hsl(42, 36, 95)</p>
                        </div>
                    </div>
                    <div className="bg-[#D6C7B2] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="font-bold text-lg text-neutral-800">{t("colors.medium_brown")}</p>
                            <p className="text-lg">#D6C7B2</p>
                            <p className="text-lg">rgb(214, 199, 178)</p>
                            <p className="text-lg">hsl(35, 31, 77)</p>
                        </div>
                    </div>
                    <div className="bg-[#8D7C6A] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="font-bold text-lg text-white">{t("colors.dark_brown")}</p>
                            <p className="text-lg text-white">#8D7C6A</p>
                            <p className="text-lg text-white">rgb(141, 124, 106)</p>
                            <p className="text-lg text-white">hsl(31, 14, 48)</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Typography ─────────────────────────────────────────── */}
            <section className="w-full bg-[#f5f5f5] py-12 md:py-20">
                <h2 className="sr-only">{t("typography_h2")}</h2>
                <motion.div
                    {...revealProps}
                    className={`container-xl md:w-[90%] xl:w-[70%] grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 xl:gap-0 items-center justify-items-center ${goudyOldStyle.className}`}
                >
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-9xl md:text-[240px] leading-none">Aa</span>
                        <span className="text-2xl md:text-4xl mt-2">Goudy Old Style</span>
                    </div>
                    <div className="flex flex-col gap-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-center md:text-left break-all">
                        <p>abcdefghijklmnñopqrstuvwxyz</p>
                        <p>0123456789</p>
                        <p className="uppercase mt-4">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ</p>
                        <p>0123456789</p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
