"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
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

export default function Intro() {
    const t = useTranslations("app");

    return (
        <section className="w-full py-24 mb-16">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="container-xl mx-auto px-6 grid md:grid-cols-2 gap-16"
            >

                {/* LEFT IMAGE */}
                <motion.div
                    variants={item}
                    className="order-1 md:order-1 relative w-full"
                >
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        className="lg:w-[80%] mx-auto relative aspect-square rounded-2xl bg-gray-100 rounded-card shadow-card"
                    >

                        {/* CARTEL (DETRÁS SIEMPRE) */}
                        <motion.div
                            variants={{
                                rest: {
                                    y: 0,
                                    boxShadow: "inset 8px 8px 8px #44444490, inset -2px -2px 8px #44444490",
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 18,
                                        mass: 0.8
                                    }
                                },
                                hover: {
                                    y: 80,
                                    boxShadow: "inset 8px 8px 8px #44444490, inset -2px -2px 8px #44444490",
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 18,
                                        mass: 0.8
                                    }
                                }
                            }}
                            className="
                                absolute
                                inset-0
                                bg-[var(--color-yellow)]
                                rounded-2xl
                                z-0
                                flex
                                items-end
                                justify-center
                                pb-6
                                text-3xl
                                italic
                                shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_#ffffff]
                            "
                        >
                            {t("home.intro.hover.label")}
                        </motion.div>

                        {/* IMAGEN (ENCIMA + LIFT) */}
                        <motion.div
                            variants={{
                                rest: { y: 0, scale: 1 },
                            }}
                            className="absolute inset-0 rounded-2xl overflow-hidden z-10"
                        >
                            <Image
                                src="/media/home/intro/sara_moleskine.png"
                                title={t("home.intro.image_title")}
                                alt={t("home.intro.image_alt")}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={90}
                                fill
                                className="object-cover scale-105"
                            />
                        </motion.div>

                    </motion.div>
                </motion.div>

                {/* RIGHT CONTENT  */}
                <div className="order-2 md:order-2 text-xl">
                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xlleading-[1.7] tracking-[0.01em]"
                    >
                        {t.rich("home.intro.description", {
                            line: () => <br />,
                            highlight: (chunks) => (
                                <span className="font-bold italic">
                                    {chunks}
                                </span>
                            )
                        })}
                    </motion.p>

                    <motion.div
                        variants={item}
                        className="mt-12 md:mt-16 md:ml-12 grid grid-cols-2 gap-x-12 gap-y-4 tracking-[0.2em]">
                        {[
                            "ADOBE PHOTOSHOP",
                            "ADOBE ILLUSTRATOR",
                            "ADOBE EXPRESS",
                            "ADOBE PROJECT NEO",
                            "FIGMA",
                            "WORDPRESS",
                        ].map((tool) => (
                            <div key={tool} className="group relative inline-flex items-center cursor-pointer w-fit pl-5">

                                {/* LINEA INICIAL (antes era el dot) */}
                                <span className="
                                    absolute left-0 bottom-[2px]
                                    w-2 h-[4px] bg-yellow z-10
                                " />

                                {/* TEXTO */}
                                <span className="relative z-10 tracking-[0.2em] text-sm md:text-lg">
                                    {tool}
                                </span>

                                {/* LINEA QUE CRECE */}
                                <span className="
                                    absolute left-0 bottom-[2px]
                                    h-[4px] bg-yellow
                                    w-full
                                    origin-left
                                    scale-x-0
                                    transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)]
                                    group-hover:scale-x-100
                                " />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </motion.div>
        </section>
    );
}