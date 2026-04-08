"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import NeoButton from "@/components/ui/NeoButton";
import { Variants } from "framer-motion";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

export default function Hero() {
    const t = useTranslations("app");

    return (
        <section className="w-full py-4 md:py-16">

            <div className="container-xxl mx-auto lg:px-6">

                <motion.div
                    className="overflow-hidden relative 
                    shadow-[var(--shadow-card)] rounded-[var(--radius-card)]"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* BACKGROUND */}
                    <div className="absolute lg:right-[10%] top-0 h-full lg:w-[60%] pointer-events-none">
                        <motion.div className="
                            absolute right-[-10%] top-1/2 -translate-y-1/2
                            hero-bg-circle
                            rounded-full
                            rotate-[30deg]
                            bg-[radial-gradient(circle_at_left_center,_#f3f3f1_0%,_#f4f4f4_50%,_#e3df5a_50%,_#f4f4f4_75%)]
                        "
                            variants={item}
                        />
                    </div>

                    {/* WRAPPER */}
                    <div className="h-full">

                        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

                            {/* LEFT */}
                            <div className="order-1 pl-8 pt-6 lg:ml-18 lg:pb-36 md:pt-36 px-6 z-10">
                                <motion.h1
                                    variants={item}
                                    className="uppercase tracking-[0.3em] text-lg md:text-2xl mb-2"
                                >
                                    {t("home.hero.h1")}
                                </motion.h1>
                                <motion.p
                                    variants={item}
                                    className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500"
                                >
                                    {t("home.hero.h1_meta")}
                                </motion.p>
                                <motion.p
                                    variants={item}
                                    className="text-xl mt-6 lg:text-5xl leading-tight text-gray-900"
                                >
                                    {t.rich("home.hero.product_designer", {
                                        line: () => <br className="hidden lg:block" />,
                                        highlight: (chunks) => (
                                            <span className="italic font-bold">{chunks}</span>
                                        )
                                    })}
                                </motion.p>

                                <motion.div variants={item} className="mt-8">
                                    <NeoButton size="sm">
                                        <span className="text-2xl">→</span>
                                        <span className="uppercase">{t("home.hero.button.label")}</span>
                                    </NeoButton>
                                </motion.div>
                            </div>

                            {/* RIGHT */}
                            <motion.div variants={item}
                                className="mb-12 md:mb-0 order-2 relative h-[500px] lg:h-[90%]">
                                <Image
                                    src="/media/home/hero/apps_hero.png"
                                    title={t("home.hero.image_title")}
                                    alt={t("home.hero.image_alt")}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                                    priority
                                    fetchPriority="high"
                                />
                            </motion.div>

                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}