"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";


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

export default function BrandingProjectDonTostadoContent() {
    const t = useTranslations("app.project.branding_dont_tostado.content");
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
            </section>
        </div>
    );
}
