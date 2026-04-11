"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import NeoButton from "@/components/ui/NeoButton";

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
        <section className="w-full py-2 md:py-16">
            <div className="container-xxl mx-auto lg:px-6">
                <motion.div
                    className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* BACKGROUND */}
                    <div className="pointer-events-none absolute top-0 h-full lg:right-[10%] lg:w-[60%]">
                        <motion.div
                            className="
                                hero-bg-circle absolute right-[-10%] top-1/2
                                -translate-y-1/2 rounded-full rotate-[30deg]
                                bg-[radial-gradient(circle_at_left_center,_#f3f3f1_0%,_#f4f4f4_50%,_#e3df5a_50%,_#f4f4f4_75%)]
                            "
                            variants={item}
                        />
                    </div>

                    {/* WRAPPER */}
                    <div className="h-full">
                        <div className="grid h-full gap-8 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-center lg:gap-12">
                            {/* TEXT */}
                            <div className="order-1 z-10 px-6 pl-8 pt-6 lg:col-start-1 lg:row-start-1 lg:ml-18 lg:pb-0 lg:pt-20">
                                <motion.h1
                                    variants={item}
                                    className="mb-2 text-lg uppercase tracking-[0.3em] md:text-2xl"
                                >
                                    {t("home.hero.h1")}
                                </motion.h1>

                                <motion.p
                                    variants={item}
                                    className="text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
                                >
                                    {t("home.hero.h1_meta")}
                                </motion.p>

                                <motion.p
                                    variants={item}
                                    className="mt-6 text-xl leading-tight text-gray-900 lg:text-5xl"
                                >
                                    {t.rich("home.hero.product_designer", {
                                        line: () => <br className="hidden lg:block" />,
                                        highlight: (chunks) => (
                                            <span className="font-bold italic">{chunks}</span>
                                        ),
                                    })}
                                </motion.p>
                            </div>

                            {/* IMAGE */}
                            <motion.div
                                variants={item}
                                className="order-2 relative mb-0 h-[380px] px-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[500px] lg:px-0"
                            >
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

                            {/* BUTTON */}
                            <motion.div
                                variants={item}
                                className="order-3 z-10 px-6 pb-8 lg:col-start-1 lg:row-start-2 lg:ml-18 lg:mt-8 lg:px-6 lg:pb-20"
                            >
                                <div className="flex justify-center lg:justify-start">
                                    <NeoButton size="sm">
                                        <span className="text-2xl">→</span>
                                        <span className="uppercase">
                                            {t("home.hero.button.label")}
                                        </span>
                                    </NeoButton>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}