"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

import { Variants } from "framer-motion";

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        },
    },
};

export default function Hero() {
    const t = useTranslations("app");

    return (
        <section className="w-full py-20">
            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12"
                variants={container}
                initial="hidden"
                animate="show"
            >

                {/* TOP */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT */}
                    <div>
                        <motion.p
                            variants={item}
                            className="uppercase tracking-[0.3em] text-xl text-brand-muted mb-6"
                        >
                            {t("home.hero.product_designer")}
                        </motion.p>

                        <motion.h1
                            variants={item}
                            className="text-4xl md:text-5xl leading-tight"
                        >
                            {t.rich("home.hero.h1", {
                                line: () => <br />,
                                highlight: (chunks) => (
                                    <span className="italic font-bold">{chunks}</span>
                                )
                            })}
                        </motion.h1>
                    </div>

                    {/* RIGHT */}
                    <motion.div
                        variants={item}
                        className="relative"
                    >
                        <div className="relative overflow-hidden p-16 h-[400px]">

                            <div className="absolute hero-shape-nav-bg bottom-0 left-0 w-32 h-32 rounded-tr-[60px]" />
                            <div className="absolute hero-shape-square-right rounded-tr-[60px]" />
                            <div className="absolute hero-shape-square-middle" />
                            <div className="absolute hero-shape-square-left rounded-tr-[60px]" />

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64"
                            >
                                <Image
                                    src="/media/about/profile.png"
                                    alt={t("portfolio.owner")}
                                    width={500}
                                    height={500}
                                    className="w-full h-auto"
                                    unoptimized
                                />
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.4,
                                        },
                                    },
                                }}
                                className="absolute hero-shape-nav flex flex-col gap-1 items-center justify-evenly"
                            >
                                {[1, 2, 3, 4].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8 },
                                            show: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: { duration: 0.3 },
                                            },
                                        }}
                                        className="hero-sidebar-items w-6 h-6 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center shadow-md"
                                    >
                                        <img
                                            src="/media/icons/mail-icon.svg"
                                            alt="icon"
                                            className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM */}
                <motion.div variants={item} className="mt-16">
                    <p className="text-lg md:text-body-xl text-brand-muted leading-relaxed">
                        {t.rich("home.hero.description", {
                            line: () => <br />,
                            highlight: (chunks) => (
                                <span className="italic font-bold">{chunks}</span>
                            )
                        })}
                    </p>
                </motion.div>

            </motion.div>
        </section>
    );
}