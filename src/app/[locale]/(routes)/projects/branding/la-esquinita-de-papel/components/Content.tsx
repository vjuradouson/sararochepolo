"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";

const goudyOldStyle = localFont({
    src: [
        {
            path: "../../../../../../../styles/fonts/goudy-old-style.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../../../../../styles/fonts/goudy-old-style.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
});


const IMG_BASE = "/media/project/branding-la-esquinita";

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

const MASONRY_BASE = `${IMG_BASE}/masonry`;

type MasonryAltKey =
    | "library_entry"
    | "wrapped_book"
    | "visit_card"
    | "cup"
    | "paper_bag"
    | "bookmark"
    | "schedule"
    | "ticket"
    | "tote_bag";

const masonryItems: { src: string; altKey: MasonryAltKey; span: string; objectPos?: string }[] = [
    { src: "1-library-entry.png", altKey: "library_entry", span: "col-span-1 md:col-span-6 aspect-[4/5] md:aspect-[7/5]" },
    { src: "2-wrapped-book.png", altKey: "wrapped_book", span: "col-span-1 md:col-span-6 aspect-[4/5] md:aspect-[7/5]" },
    { src: "3-visit-card.png", altKey: "visit_card", span: "col-span-1 md:col-span-6 aspect-[4/5] md:aspect-[8/5]", objectPos: "object-left" },
    { src: "4-cup.png", altKey: "cup", span: "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-full" },
    { src: "5-notebook.png", altKey: "paper_bag", span: "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-auto md:h-full" },
    { src: "6-bookmark.png", altKey: "bookmark", span: "col-span-1 md:col-span-3 aspect-[4/5]" },
    { src: "7-schedule.png", altKey: "schedule", span: "col-span-1 md:col-span-3 aspect-[4/5]" },
    { src: "8-ticket.png", altKey: "ticket", span: "col-span-1 md:col-span-3 aspect-[4/5]", objectPos: "object-top" },
    { src: "9-totebag.png", altKey: "tote_bag", span: "col-span-2 md:col-span-3 aspect-[16/9] md:aspect-[4/5]", objectPos: "object-[50%_80%]" },
];

export default function BrandingProjectLaEsquinitaDePapelContent() {
    const t = useTranslations("app.projects.branding.projects.la_esquinita_de_papel.content");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div key={refreshKey} className="text-lg md:text-xl xl:text-2xl">
            <section className="w-full md:pt-16 mt-20 md:mt-10">
                <motion.div {...revealProps} className="container-xl mx-auto pb-10">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        {t("eyebrow")}
                    </p>
                    <h1 className="-ml-1 mb-10 text-4xl md:text-5xl font-light tracking-tight">
                        {t("title")}
                    </h1>
                </motion.div>
                <motion.div {...revealProps} className="container-xxl mx-auto lg:px-6">
                    <motion.div {...revealProps} className="flex items-center justify-center bg-[#8D7C6A] py-12 px-6 md:py-20 md:px-12 rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                        <Image
                            src={`${IMG_BASE}/framed-logo-filled.png`}
                            alt={t("image_alt.interface")}
                            width={800}
                            height={1000}
                            sizes="(max-width: 768px) 50vw, 30vw"
                            quality={75}
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
            <section className="w-full bg-[#f5f5f5] py-12 md:pt-5 pb-0">
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
                                src={`${IMG_BASE}/framed-logo.png`}
                                alt={t("image_alt.framed_logo")}
                                width={400}
                                height={500}
                                sizes="(max-width: 768px) 40vw, 25vw"
                                quality={75}
                                className="w-full max-w-[200px] md:max-w-[240px] h-auto"
                            />
                        </motion.div>

                        {/* Square logo */}
                        <motion.div {...revealProps}
                            className="flex items-center justify-center p-6 md:p-10">
                            <Image
                                src={`${IMG_BASE}/square-logo.png`}
                                alt={t("image_alt.square_logo")}
                                width={400}
                                height={500}
                                sizes="(max-width: 768px) 40vw, 25vw"
                                quality={75}
                                className="w-full max-w-[200px] md:max-w-[240px] h-auto"
                            />
                        </motion.div>

                        {/* Horizontal logo */}
                        <motion.div {...revealProps}
                            className="col-span-2 md:col-span-1 flex items-center justify-center p-10">
                            <Image
                                src={`${IMG_BASE}/horizontal-logo.png`}
                                alt={t("image_alt.horizontal_logo")}
                                width={800}
                                height={300}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                quality={75}
                                className="w-full max-w-[320px] md:max-w-[280px] h-auto scale-[1.1] md:scale-[1.3]"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Framed White ──────────────────────────────────────── */}
            <motion.div {...revealProps} className="w-full mx-auto pb-5">
                <motion.div {...revealProps} className="flex items-center justify-center bg-[#8D7C6A] py-6 px-6 md:py-10 md:px-12">
                    <Image
                        src={`${IMG_BASE}/framed-logo-filled.png`}
                        alt={t("image_alt.interface")}
                        width={800}
                        height={1000}
                        sizes="(max-width: 768px) 50vw, 30vw"
                        quality={75}
                        className="w-[55%] max-w-[320px] md:max-w-[300px] h-auto"
                    />
                </motion.div>
            </motion.div>

            {/* ─── Color palette ──────────────────────────────────────── */}
            <section className="w-full font-semibold">
                <h2 className="sr-only">{t("colors_h2")}</h2>
                <motion.div
                    {...revealProps}
                    className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0"
                >
                    <div className="bg-[#F6F3EC] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="text-lg">#F6F3EC</p>
                            <p className="text-lg">rgb(246, 243, 236)</p>
                            <p className="text-lg">hsl(42, 36, 95)</p>
                        </div>
                    </div>
                    <div className="bg-[#D6C7B2] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="text-lg">#D6C7B2</p>
                            <p className="text-lg">rgb(214, 199, 178)</p>
                            <p className="text-lg">hsl(35, 31, 77)</p>
                        </div>
                    </div>
                    <div className="bg-[#8D7C6A] p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                        <div>
                            <p className="text-lg text-white">#8D7C6A</p>
                            <p className="text-lg text-white">rgb(141, 124, 106)</p>
                            <p className="text-lg text-white">hsl(31, 14, 48)</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    {...revealProps}
                    className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0"
                >
                    <div className="bg-[#F7ECD9] p-6 md:p-8 min-h-[80px] md:min-h-[100px] flex items-center justify-center">
                        <div>
                            <p className="text-lg">#F7ECD9</p>
                            <p className="text-lg">rgb(247, 236, 217)</p>
                            <p className="text-lg">hsl(38, 65, 91)</p>
                        </div>
                    </div>
                    <div className="bg-[#6B6658] p-6 md:p-8 min-h-[80px] md:min-h-[100px] flex items-center justify-center">
                        <div>
                            <p className="text-lg text-white">#6B6658</p>
                            <p className="text-lg text-white">rgb(107, 102, 88)</p>
                            <p className="text-lg text-white">hsl(44, 10, 38)</p>
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

            {/* ─── Brand applications (masonry) ─────────────────────────────────────────── */}
            <section className="container-xl bg-[#f5f5f5] px-4 md:px-10 lg:px-20 py-16 md:py-12">
                <h2 className="sr-only">{t("masonry_h2")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3">
                    {masonryItems.map((item) => (
                        <motion.div
                            key={item.src}
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative overflow-hidden ${item.span}`}
                        >
                            <Image
                                src={`${MASONRY_BASE}/${item.src}`}
                                alt={t(`image_alt.${item.altKey}`)}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                quality={75}
                                className={`object-cover ${item.objectPos ?? ""}`}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Running mouse strip ─────────────────────────────────────────── */}
            <motion.div
                {...revealProps}
                aria-hidden="true"
                className="w-full h-[70px] bg-[#8D7C6A] flex items-center justify-center gap-12 md:gap-18 overflow-hidden"
            >
                {Array.from({ length: 18 }).map((_, i) => (
                    <Image
                        key={i}
                        src={`${IMG_BASE}/mouse-running-filled.png`}
                        alt={t("image_alt.running_mouse")}
                        width={50}
                        height={50}
                        quality={75}
                        className="h-[55px] w-auto flex-shrink-0"
                    />
                ))}
            </motion.div>

        </div>
    );
}
