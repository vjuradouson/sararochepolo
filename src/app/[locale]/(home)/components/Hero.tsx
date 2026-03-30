"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/framer-motion-variants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
    const t = useTranslations("app");

    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-20">
            {/* TOP: 2 columnas */}
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT */}
                <div>
                    {/* Eyebrow */}
                    <p className="uppercase tracking-[0.3em] text-xl text-brand-muted mb-6">
                        PRODUCT DESIGNER · UX/UI
                    </p>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl leading-tight">
                        Transformando
                        <br />
                        necesidades complejas
                        <br />
                        en <span className="italic font-bold">experiencias claras</span>
                        <br />
                        <span className="italic font-bold">y funcionales</span>
                    </h1>
                </div>

                {/* RIGHT */}
                <div className="relative">

                    {/* BLOQUE PRINCIPAL */}
                    <div className="relative  overflow-hidden p-16">

                        {/* "MORDIDA" blanca abajo izquierda */}
                        <div className="absolute hero-shape-nav-bg bottom-0 left-0 w-32 h-32 bg-white rounded-tr-[60px]" />
                        <div className="absolute hero-shape-square-right rounded-tr-[60px]" />
                        <div className="absolute hero-shape-square-middle" />
                        <div className="absolute hero-shape-square-left rounded-tr-[60px]" />

                        {/* CONTENIDO */}
                        <div className="flex items-center justify-center h-[250px]">
                            <div className="photo-hero-container relative aspect-square rounded-full overflow-hidden ring-4 ring-neutral-100">
                                <Image
                                    src="/media/about/profile.jpeg"
                                    alt={t("portfolio.owner")}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* SIDEBAR DENTRO */}
                        <div className="absolute hero-shape-nav flex flex-col gap-1 items-center justify-evenly">

                            <div className="w-6 h-6 min-w-[36px] min-h-[36px] rounded-full bg-[#D6D86A] flex items-center justify-center shadow-md">
                                <img
                                    src="/media/icons/mail-icon.svg"
                                    alt="linkedin"
                                    className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                                />
                            </div>

                            <div className="w-6 h-6 min-w-[36px] min-h-[36px] rounded-full bg-[#D6D86A] flex items-center justify-center shadow-md">
                                <img
                                    src="/media/icons/mail-icon.svg"
                                    alt="linkedin"
                                    className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                                />
                            </div>

                            <div className="w-6 h-6 min-w-[36px] min-h-[36px] rounded-full bg-[#D6D86A] flex items-center justify-center shadow-md">
                                <img
                                    src="/media/icons/mail-icon.svg"
                                    alt="linkedin"
                                    className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                                />
                            </div>

                            <div className="w-6 h-6 min-w-[36px] min-h-[36px] rounded-full bg-[#D6D86A] flex items-center justify-center shadow-md">
                                <img
                                    src="/media/icons/mail-icon.svg"
                                    alt="linkedin"
                                    className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                                />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* BOTTOM TEXT */}
            <div className="mt-16">
                <p className="text-lg md:text-body-xl text-brand-muted leading-relaxed">
                    Product Designer con más de 3 años de experiencia{" "}
                    <span className="italic font-semibold text-black">
                        diseñando interfaces intuitivas y sistemas visuales consistentes.
                    </span>{" "}
                    Combino UX, UI y comunicación visual para crear{" "}
                    <span className="italic font-semibold text-black">
                        soluciones digitales y físicas alineadas con negocio y usuario.
                    </span>
                </p>
            </div>

        </section>
    );
}