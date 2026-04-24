"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const IMG_BASE = "/media/project/branding-don-tostado";

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

type LogoVariantAltKey = "logo_cyan" | "logo_pink" | "logo_navy";

type LogoVariant = {
    src: string;
    color: string;
    textColor: string;
    altKey: LogoVariantAltKey;
    rgb: string;
    hsl: string;
};

const logoVariants: LogoVariant[] = [
    {
        src: "don-tostado-logo-with-title.png",
        color: "#C9FBF8",
        textColor: "#14005F",
        altKey: "logo_cyan",
        rgb: "rgb(201, 251, 248)",
        hsl: "hsl(176, 86, 89)",
    },
    {
        src: "don-tostado-logo-with-title.png",
        color: "#FFCFDF",
        textColor: "#14005F",
        altKey: "logo_pink",
        rgb: "rgb(255, 207, 223)",
        hsl: "hsl(340, 100, 91)",
    },
    {
        src: "don-tostado-logo-with-title-light.png",
        color: "#14005F",
        textColor: "#C9FBF8",
        altKey: "logo_navy",
        rgb: "rgb(20, 0, 95)",
        hsl: "hsl(253, 100, 19)",
    },
];

export default function BrandingProjectDonTostadoContent() {
    const t = useTranslations("app.project.branding_don_tostado.content");
    const [refreshKey] = useState(0);

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

                {/* ─── Coffee cup + logo panel ────────────────────────────── */}
                <motion.div {...revealProps} className="container-xxl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-20 items-stretch">
                        <motion.div {...revealProps} className="relative md:col-span-13 aspect-[3/2]">
                            <Image
                                src={`${IMG_BASE}/coffee-cup.png`}
                                alt={t("image_alt.coffee_cup")}
                                fill
                                sizes="(max-width: 768px) 100vw, 70vw"
                                quality={75}
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            {...revealProps}
                            className="md:col-span-7 bg-[#FFCFDF] flex items-center justify-center aspect-square md:aspect-auto p-10 md:p-12"
                        >
                            <Image
                                src={`${IMG_BASE}/don-tostado-logo-with-title.png`}
                                alt={t("image_alt.logo_with_title")}
                                width={400}
                                height={700}
                                sizes="(max-width: 768px) 70vw, 20vw"
                                quality={75}
                                className="w-auto h-full max-h-[280px] md:max-h-[75%]"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ─── About ─────────────────────────────────────────────── */}
            <section className="container-xl py-16 md:py-32">
                <motion.div {...revealProps} className="max-w">
                    <h2 className="-ml-0.5 mb-2 text-3xl md:text-4xl tracking-tight">
                        {t("about.heading")}
                    </h2>
                    <p className="mb-8 text-md md:text-xl italic">
                        {t("about.tagline")}
                    </p>
                    <div className="flex flex-col gap-6 leading-relaxed">
                        <p>{t.rich("about.paragraph_1", { highlight })}</p>
                        <p>{t.rich("about.paragraph_2", { highlight })}</p>
                        <p>{t.rich("about.paragraph_3", { highlight })}</p>
                    </div>
                </motion.div>
            </section>

            {/* ─── Logo variations ───────────────────────────────────── */}
            <section className="container-xl pb-20 md:pb-24">
                <h2 className="sr-only">{t("logos_h2")}</h2>
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-y-28 md:gap-y-0"
                >
                    {logoVariants.map((variant) => (
                        <motion.div
                            key={variant.altKey}
                            {...revealProps}
                            className="relative aspect-[4/5] flex items-center justify-center p-10 pb-24"
                            style={{ backgroundColor: variant.color }}
                        >
                            <Image
                                src={`${IMG_BASE}/${variant.src}`}
                                alt={t(`image_alt.${variant.altKey}`)}
                                width={400}
                                height={700}
                                sizes="(max-width: 768px) 70vw, 25vw"
                                quality={75}
                                className="w-auto h-[70%] max-h-[360px]"
                            />
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[40%] aspect-square rounded-full overflow-hidden
                                 border-[6px] border-[var(--color-background)] flex flex-col items-center justify-center whitespace-nowrap
                                 leading-tight text-center gap-0.5 text-[15px] md:text-[9px] lg:text-xs xl:text-base 2xl:text-l font-bold"
                                style={{ backgroundColor: variant.color, color: variant.textColor }}
                            >
                                <p>{variant.color}</p>
                                <p>{variant.rgb}</p>
                                <p>{variant.hsl}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
