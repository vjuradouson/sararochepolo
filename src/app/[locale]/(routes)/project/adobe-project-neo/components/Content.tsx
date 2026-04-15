"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const revealProps = {
    variants: fadeInUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: "easeOut" as const },
};

const IMG_BASE = "/media/project/adobe-project-neo";

export default function AdobeProjectNeoContent() {
    const t = useTranslations("app.project.adobe_project_neo");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div key={refreshKey}>
            {/* ─── HEADER ─────────────────────────────────────────────── */}
            <section className="container-xl pt-24 md:pt-36 pb-16 md:pb-24">
                <motion.div {...revealProps} className="max-w-full">
                    <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                        Diseño 3D
                    </p>
                    <h1 className="mb-10 text-5xl md:text-7xl font-light tracking-tight">
                        Adobe Project Neo
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed">
                        Exploración de Adobe Project Neo, una herramienta experimental que permite crear
                        composiciones con profundidad y apariencia tridimensional desde un enfoque gráfico.
                        A través de esta plataforma, desarrollo ilustraciones y piezas visuales que combinan
                        volumen, perspectiva y color, sin recurrir a procesos complejos de modelado 3D,
                        integrando el resultado dentro de un flujo de trabajo más amplio de diseño digital.
                    </p>
                </motion.div>
            </section>

            {/* ─── 1. Interfaz + Styles overlay ──────────────────────── */}
            <section className="container-xl pb-16 md:pb-32">
                <motion.div
                    {...revealProps}
                    className="relative mx-auto md:pb-[12%]"
                >
                    <Image
                        src={`${IMG_BASE}/1-white-frame.png`}
                        alt="Interfaz principal de Adobe Project Neo con frame en blanco"
                        width={1600}
                        height={1000}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        quality={90}
                        className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
                    />
                    <Image
                        src={`${IMG_BASE}/2-styles.png`}
                        alt="Panel de estilos mostrando la opción Vector Art seleccionada"
                        width={500}
                        height={600}
                        sizes="(max-width: 768px) 50vw, 22vw"
                        quality={90}
                        className="block mx-auto mt-8 w-1/2 max-w-[280px]
                                   md:absolute md:mt-0 md:mx-0
                                   md:bottom-0 md:right-[6%] md:translate-y-[30%]
                                   md:w-[26%] md:max-w-[320px]
                                   h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                    />
                </motion.div>

                <motion.p
                    {...revealProps}
                    className="mt-16 md:mt-0 md:max-w-md lg:max-w-lg xl:max-w-4xl md:text-lg leading-relaxed"
                >
                    Establecemos el estilo con el que queremos trabajar. Yo comienzo los proyectos con un{" "}
                    <strong className="font-semibold">estilo Vector Art</strong> que imita
                    lo que sería un{" "}
                    <strong className="font-semibold">&ldquo;blueprint&rdquo;</strong>{" "}
                    para, una vez establecido el diseño, pasar a un diseño realista.
                </motion.p>
            </section>

            {/* ─── 2. Formas simples (img 3) ─────────────────────────── */}
            <section className="container-xl pb-16 md:pb-24">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
                >
                    <div>
                        <Image
                            src={`${IMG_BASE}/3-keyboard-forms.png`}
                            alt="Formas simples del menú lateral en Project Neo"
                            width={700}
                            height={600}
                            sizes="(max-width: 768px) 80vw, 40vw"
                            quality={90}
                            className="mx-auto w-full max-w-sm h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                        />
                    </div>
                    <p className="max-w-md md:text-lg leading-relaxed">
                        Mediante las{" "}
                        <strong className="font-semibold">formas simples</strong> que
                        encontramos en el menú lateral podemos comenzar a diseñar de manera muy intuitiva.
                    </p>
                </motion.div>
            </section>

            {/* ─── 3. Animación wiggle (img 4 + 5 overlay) ───────────── */}
            <section className="container-xl pb-16 md:pb-32">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    <p className="order-2 md:order-1 max-w-md md:text-lg leading-relaxed">
                        Una vez tenemos el diseño, podemos añadirle pequeñas{" "}
                        <strong className="font-semibold">animaciones</strong> a los
                        elementos deseados. Por ejemplo, en este proyecto decidí que ciertas teclas iban a
                        tener una{" "}
                        <strong className="font-semibold">animación de pulsación</strong>.
                        Esto lo conseguimos añadiendo la animación{" "}
                        <strong className="font-semibold">&ldquo;Wiggle&rdquo;</strong> y
                        configurando el eje en el que deseamos el movimiento, así como{" "}
                        <strong className="font-semibold">la amplitud y el tiempo</strong>.
                    </p>

                    <div className="order-1 md:order-2 relative md:pb-[15%]">
                        <Image
                            src={`${IMG_BASE}/4-keyboard-prototype.png`}
                            alt="Keypad isométrico en estilo blueprint en Project Neo"
                            width={900}
                            height={700}
                            sizes="(max-width: 768px) 90vw, 45vw"
                            quality={90}
                            className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                        />
                        <Image
                            src={`${IMG_BASE}/5-motion.png`}
                            alt="Panel de animación Wiggle con ajustes de amplitud, eje y tiempo"
                            width={400}
                            height={600}
                            sizes="(max-width: 768px) 45vw, 18vw"
                            quality={90}
                            className="block mx-auto mt-6 w-1/2 max-w-[240px]
                                       md:absolute md:mt-0 md:mx-0
                                       md:bottom-0 md:left-[-8%] md:translate-y-[25%]
                                       md:w-[45%] md:max-w-[220px]
                                       h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ─── Subtítulo: Animación estilo vectorial ─────────────── */}
            <section className="container-xl pb-8">
                <motion.p
                    {...revealProps}
                    className="mx-auto max-w-5xl text-xl text-neutral-700"
                >
                    — Animación estilo vectorial
                </motion.p>
            </section>

            {/* ─── 4. Blueprint grande + realista (img 6 / 7 / 8) ────── */}
            <section className="container-xl pb-16 md:pb-32">
                <motion.div
                    {...revealProps}
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    <div>
                        <Image
                            src={`${IMG_BASE}/6-keyboard-animation.png`}
                            alt="Diseño final del keypad en estilo blueprint animado"
                            width={1000}
                            height={750}
                            sizes="(max-width: 768px) 90vw, 45vw"
                            quality={90}
                            className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
                        />
                    </div>

                    <div className="flex flex-col gap-8">
                        <p className="max-w-md md:text-lg leading-relaxed">
                            Una vez vemos cómo quedaría el movimiento final y hechos los últimos ajustes,
                            podemos pasar a darle el estilo que la pieza tendrá finalmente, en este caso
                            realista.
                        </p>

                        <div className="flex items-end gap-4 md:gap-6">
                            <Image
                                src={`${IMG_BASE}/7-styles.png`}
                                alt="Vista previa del keypad en estilo realista"
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 40vw, 18vw"
                                quality={90}
                                className="w-1/2 max-w-[180px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                            />
                            <Image
                                src={`${IMG_BASE}/8-appearance.png`}
                                alt="Panel de apariencia con ajustes de material realista"
                                width={400}
                                height={600}
                                sizes="(max-width: 768px) 40vw, 18vw"
                                quality={90}
                                className="w-1/2 max-w-[220px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Subtítulo: Animación final ───────────────────────── */}
            <section className="container-xl pb-8">
                <motion.p
                    {...revealProps}
                    className="mx-auto max-w-5xl text-xl text-neutral-700"
                >
                    — Animación final
                </motion.p>
            </section>

            {/* ─── 5. Render final (img 9) ───────────────────────────── */}
            <section className="container-xl pb-24 md:pb-32">
                <motion.div {...revealProps} className="mx-auto max-w-3xl">
                    <Image
                        src={`${IMG_BASE}/9-keyboard-final.gif`}
                        alt="Render final del teclado numérico con acabado realista"
                        width={1600}
                        height={1000}
                        sizes="(max-width: 768px) 100vw, 70vw"
                        quality={95}
                        className="w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.1)]"
                    />
                </motion.div>
            </section>
        </div>
    );
}
