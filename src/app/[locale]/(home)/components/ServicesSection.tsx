"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from 'next/image';

const services = [
    {
        title: "Figma diseño",
        color: "bg-[#D6D86A]",
        content: "Diseño en Figma\nPrototipos y UI kits",
        image: "/media/home/services/service-1.jpg"
    },
    {
        title: "WordPress",
        color: "bg-[#9BBFC2]",
        content: "Desarrollo WordPress\nThemes personalizados",
        image: "/media/home/services/service-2.jpg"
    },
    {
        title: "Redes Sociales",
        color: "bg-[#0F3F46]",
        content: "Contenido social\nEstrategia visual",
        image: "/media/home/services/service-3.jpg"
    },
    {
        title: "Material impreso",
        color: "bg-[#D6D86A]",
        content: "Branding físico\nPackaging y print",
        image: "/media/home/services/service-4.jpg"
    },
];

const ServicesSection: React.FC = () => {
    const t = useTranslations("app");
    const [activeIndex, setActiveIndex] = useState(0);
    const MotionImage = motion(Image);

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* HEADER */}
                <div className="mb-12">
                    <p className="text-3xl text-gray-400 mb-2">{t("home.services.title")}</p>
                    <h2 className="text-4xl font-bold">{t("home.services.subtitle")}</h2>
                </div>

                {/* CONTENT */}
                <div className="services-section-content max-w-4xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-20">

                    {/* LEFT */}
                    <div className="flex-1 max-w-sm w-full flex flex-col justify-center">
                        <div className="flex flex-col gap-6">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-full flex items-center gap-4 bg-white pl-12 pr-6 py-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.40)] cursor-pointer transition-all duration-300
                                        ${activeIndex === index ? "scale-105 shadow-[0_8px_20px_rgba(0,0,0,0.80)]" : "hover:scale-105"}
                                    `}
                                >
                                    <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${service.color}`}>
                                        <span className="text-white text-lg">↗</span>
                                    </div>

                                    <span className="text-lg font-semibold">
                                        {service.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 relative flex items-stretch justify-center">

                        <div className="relative h-full aspect-square max-h-full">

                            {/* BACK SHAPES */}
                            <div className="absolute w-full h-full bg-[#9BBFC2] rounded-3xl rotate-6"></div>
                            <div className="absolute w-full h-full bg-[#D6D86A] rounded-3xl -rotate-6"></div>

                            {/* MAIN CARD ANIMADA */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute inset-0 bg-[#0F3F46] rounded-3xl flex flex-col items-center justify-center text-center px-6 shadow-xl will-change-transform overflow-hidden"
                                >

                                    {/* IMAGE */}
                                    <MotionImage
                                        key={services[activeIndex].image}
                                        src={services[activeIndex].image}
                                        alt=""
                                        width={128}
                                        height={128}
                                        initial={{ opacity: 0, scale: 1.1, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-32 h-32 object-cover rounded-xl mb-6 shadow-lg"
                                    />

                                    {/* TEXT */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                        className="text-white tracking-[0.2em] text-xl leading-relaxed whitespace-pre-line"
                                    >
                                        {services[activeIndex].content}
                                    </motion.p>

                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServicesSection;