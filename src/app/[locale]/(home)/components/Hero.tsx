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
        <section className="w-full py-16">

            <div className="max-w-[1400px] mx-auto px-6">

                <motion.div
                    className="overflow-hidden relative 
                    shadow-[var(--shadow-card)] rounded-[var(--radius-card)]"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* BACKGROUND */}
                    <div className="absolute right-[10%] top-0 h-full w-[60%] pointer-events-none">
                        <motion.div className="
                            absolute right-[-10%] top-1/2 -translate-y-1/2
                            w-[110%] h-[190%]
                            rounded-full
                            rotate-[30deg]
                            bg-[radial-gradient(circle_at_left_center,_#f3f3f1_0%,_#f4f4f4_50%,_#e3df5a_50%,_#f4f4f4_75%)]
                        "
                            variants={item}
                        />
                    </div>

                    {/* 👉 WRAPPER CON PADDING */}
                    <div className="h-full">

                        <div className="grid md:grid-cols-2 gap-12 items-center h-full">

                            {/* LEFT */}
                            <div className="pl-8 md:pl-16 pt-28 pb-28 ml-20 z-10">
                                <motion.p
                                    variants={item}
                                    className="uppercase tracking-[0.3em] text-xl text-gray-500 mb-6"
                                >
                                    {t("home.hero.product_designer")}
                                </motion.p>

                                <motion.h1
                                    variants={item}
                                    className="text-2xl md:text-5xl leading-tight text-gray-900"
                                >
                                    {t.rich("home.hero.h1", {
                                        line: () => <br />,
                                        highlight: (chunks) => (
                                            <span className="italic font-bold">{chunks}</span>
                                        )
                                    })}
                                </motion.h1>

                                <motion.div variants={item} className="mt-8">
                                    <NeoButton size="sm">
                                        <span className="text-xl">→</span>
                                        <span>CONTACTO</span>
                                    </NeoButton>
                                </motion.div>
                            </div>

                            {/* RIGHT */}
                            <motion.div variants={item} className="relative h-[90%]">
                                <Image
                                    src="/media/home/hero/apps_hero.png"
                                    alt={t("portfolio.owner")}
                                    fill
                                    sizes="100vw"
                                    quality={90}
                                    className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                                    priority
                                />
                            </motion.div>

                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}