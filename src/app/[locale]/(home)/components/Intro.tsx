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
        <section className="w-full py-20">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16"
            >

                {/* LEFT IMAGE */}
                <motion.div variants={item} className="relative w-full">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100
                     rounded-card shadow-card
                            ">
                        <Image
                            src="/media/home/intro/sara_moleskine.png"
                            alt="profile"
                            sizes="100vw"
                            quality={90}
                            fill
                            className="object-cover scale-105"
                        />
                    </div>
                </motion.div>

                {/* RIGHT CONTENT */}
                <div className="text-4xl">
                    <motion.p
                        variants={item}
                        className="
                            text-[18px] md:text-[20px]
                            leading-[1.7]
                            tracking-[0.01em]
                        "
                    >
                        {t.rich("home.hero.description", {
                            line: () => <br />,
                            highlight: (chunks) => (
                                <span className="font-bold italic">
                                    {chunks}
                                </span>
                            )
                        })}
                    </motion.p>

                    {/* TOOLS */}
                    <motion.div
                        variants={item}
                        className="mt-16 ml-12 grid grid-cols-2 gap-x-12 gap-y-4 text-sm tracking-[0.2em]"
                    >
                        {[
                            "ADOBE PHOTOSHOP",
                            "ADOBE ILLUSTRATOR",
                            "ADOBE EXPRESS",
                            "ADOBE PROJECT NEO",
                            "FIGMA",
                            "WORDPRESS",
                        ].map((tool) => (
                            <div key={tool} className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-yellow" />
                                <span>{tool}</span>
                            </div>
                        ))}
                    </motion.div>

                </div>

            </motion.div>
        </section>
    );
}