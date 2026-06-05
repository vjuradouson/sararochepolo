"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { PawPrint, Play } from "lucide-react";

const IMG_BASE = "/media/projects/ux-ui-design/pet-buddy";
const BAND_COLOR = "#D3E3E4";

const highlight = (chunks: React.ReactNode) => (
    <strong className="font-bold">{chunks}</strong>
);

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const revealProps = {
    variants: fadeInUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: "easeOut" as const },
};

type T = ReturnType<typeof useTranslations>;

/** Filas de foco del primer bloque: cada una con su icono y un color de círculo. */
const focusRows = [
    { key: "focus_1", logo: "subject-icon.png", circle: "#F4D35E" },
    { key: "focus_2", logo: "calendar-icon.png", circle: "#9CC4C5" },
    { key: "focus_3", logo: "alarm-icon.png", circle: "#E8A87C" },
];

/** Pilares del vínculo: cada uno con su propio logo (la tile de color va horneada en el PNG) y color de acento. */
const bondItems = [
    { key: "trust", logo: "trust-logo.png", color: "#88BAB5" },
    { key: "closeness", logo: "closeness-logo.png", color: "#CC7836" },
    { key: "simplicity", logo: "simplicity-logo.png", color: "#E4BF64" },
];

/** Mapa key → color de acento, para colorear las palabras inline del subtítulo. */
const bondColor: Record<string, string> = Object.fromEntries(
    bondItems.map((i) => [i.key, i.color])
);

/** Handler de t.rich que pinta el texto en negrita con un color concreto. */
const colorChunk = (color: string) =>
    function ColoredChunk(chunks: React.ReactNode) {
        return (
            <strong className="font-bold" style={{ color }}>
                {chunks}
            </strong>
        );
    };

function GetIcon({
    src,
    alt,
    color,
}: {
    src: string;
    alt: string;
    color: string;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={80}
            height={80}
            quality={75}
            className="w-15 h-15 md:w-20 md:h-20 object-contain self-center"
        />
    );
}

function HeroSection({ t }: { t: T }) {
    return (
        <section className="w-full mt-4 md:mt-6" style={{ backgroundColor: BAND_COLOR }}>
            <div className="container-xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-8 py-10 md:py-20">
                <div>
                    <p className="text-xl md:6xl uppercase tracking-widest mb-6">
                        {(() => {
                            const [left, right] = t("eyebrow").split(" · ");
                            if (!right) return t("eyebrow");
                            return (
                                <>
                                    {left}
                                    <br className="min-[480px]:hidden" />
                                    <span className="hidden min-[480px]:inline"> · </span>
                                    {right}
                                </>
                            );
                        })()}
                    </p>
                    <h1 className="flex items-center gap-3 mb-6 text-5xl md:text-8xl font-light tracking-tight">
                        {t("title")}
                        <PawPrint
                            className="w-18 h-15 md:w-18 md:h-18"
                            aria-hidden="true"
                            strokeWidth={1.5}
                        />
                    </h1>
                    <p className="text-2xl md:text-3xl font-light leading-snug max-w-md">
                        {t("hero_subtitle")}
                    </p>
                </div>
                <Image
                    src="/media/home/projects/figma-pet-buddy.png"
                    alt={t("image_alt.hero")}
                    width={2283}
                    height={2089}
                    sizes="(max-width: 768px) 90vw, 520px"
                    quality={90}
                    className="w-full h-auto max-w-[520px] mx-auto object-contain xl:scale-[1.2]"
                    priority
                    fetchPriority="high"
                />
            </div>
        </section>
    );
}

function IntroSection({ t }: { t: T }) {
    return (
        <section className="container-xl py-16 md:py-24">
            <motion.div
                {...revealProps}
                className="flex flex-col gap-6 leading-relaxed"
            >
                <p>{t.rich("intro_1", { highlight })}</p>
                <p>{t.rich("intro_2", { highlight })}</p>
                <p>{t.rich("intro_3", { highlight })}</p>
            </motion.div>
        </section>
    );
}

function FocusSection({ t }: { t: T }) {
    return (
        <section className="container-xl pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-24 md:gap-0">
                <motion.div {...revealProps} className="flex justify-center">
                    <Image
                        src={`${IMG_BASE}/buster-muse-screen.png`}
                        alt={t("image_alt.buster_muse")}
                        width={423}
                        height={770}
                        sizes="(max-width: 768px) 70vw, 300px"
                        quality={90}
                        className="scale-[1.1] md:scale-[1.2] w-full h-auto max-w-[300px] rounded-2xl drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                    />
                </motion.div>
                <ul className="flex flex-col gap-8 md:gap-10">
                    {focusRows.map((row) => (
                        <motion.li
                            key={row.key}
                            {...revealProps}
                            className="flex items-start gap-5"
                        >
                            <GetIcon
                                src={`${IMG_BASE}/${row.logo}`}
                                alt={t(`image_alt.${row.key}`)}
                                color={row.circle}
                            />
                            <p className="leading-relaxed">
                                {t(row.key)}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function AccessSection({ t }: { t: T }) {
    return (
        <section className="w-full mt-12 mb-12 md:mt-24 md:mb-24" style={{ backgroundColor: BAND_COLOR }}>
            <div className="container-xl grid grid-cols-1 md:grid-cols-[2fr_3fr] items-center gap-20 md:gap-16 py-16">
                <motion.div
                    {...revealProps}
                    className="flex flex-col gap-6 leading-relaxed"
                >
                    <p>{t("access_1")}</p>
                    <p>{t("access_2")}</p>
                </motion.div>
                <motion.div
                    {...revealProps}
                    className="flex flex-col items-center gap-10 w-full mx-auto md:block md:relative md:max-w-[480px] md:h-[420px] lg:h-[460px]"
                >
                    {/* Calendario: a la izquierda, sube y asoma por encima del banner */}
                    <Image
                        src={`${IMG_BASE}/calendar-screen.png`}
                        alt={t("image_alt.calendar")}
                        width={430}
                        height={932}
                        sizes="(max-width: 768px) 56vw, 280px"
                        quality={90}
                        className="w-full max-w-[280px] h-auto rounded-2xl drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] md:absolute md:left-0 md:top-0 md:max-w-none md:w-[45%] xl:w-[42%] md:-translate-y-24 md:scale-[1.1] xl:scale-[1.3]"
                    />
                    {/* Alertas: a la derecha, baja y asoma por debajo del banner */}
                    <Image
                        src={`${IMG_BASE}/alerts-screen.png`}
                        alt={t("image_alt.alerts")}
                        width={430}
                        height={932}
                        sizes="(max-width: 768px) 56vw, 280px"
                        quality={90}
                        className="w-full max-w-[280px] h-auto rounded-2xl drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] md:absolute md:right-0 md:bottom-0 md:z-10 md:max-w-none md:w-[45%] xl:w-[42%] md:translate-y-24 md:scale-[1.1] xl:scale-[1.3]"
                    />
                </motion.div>
            </div>
        </section>
    );
}

function BondSection({ t }: { t: T }) {
    return (
        <section className="container-xl py-12 md:py-24 pb-24 overflow-hidden md:mt-36">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-24 md:gap-0">
                <motion.div {...revealProps} className="flex justify-center order-2 md:order-1">
                    <Image
                        src={`${IMG_BASE}/strengthen-bond-screen.png`}
                        alt={t("image_alt.strengthen_bond")}
                        width={514}
                        height={807}
                        sizes="(max-width: 768px) 70vw, 340px"
                        quality={90}
                        className="scale-[1.2] md:scale-[1.4] w-full h-auto max-w-[340px] rounded-2xl -rotate-[3deg] drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                    />
                </motion.div>
                <div className="order-1 md:order-2">
                    <div className="md:ml-20">
                        <motion.h2
                            {...revealProps}
                            className="mb-5 text-3xl md:text-4xl font-bold tracking-tight text-neutral-800"
                        >
                            {t.rich("bond_heading", { highlight: colorChunk(bondColor.trust) })}
                        </motion.h2>
                        <motion.p
                            {...revealProps}
                            className="mb-10 leading-relaxed"
                        >
                            {t.rich("bond_intro", {
                                trust: colorChunk(bondColor.trust),
                                closeness: colorChunk(bondColor.closeness),
                                simplicity: colorChunk(bondColor.simplicity),
                            })}
                        </motion.p>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-8">
                            {bondItems.map((item) => (
                                <motion.li
                                    key={item.key}
                                    {...revealProps}
                                    className="flex items-center gap-5"
                                >
                                    <Image
                                        src={`${IMG_BASE}/${item.logo}`}
                                        alt={t(`image_alt.${item.key}`)}
                                        width={100}
                                        height={100}
                                        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20"
                                    />
                                    <div
                                        className="flex-1 self-stretch border-l-2 pl-5"
                                        style={{ borderColor: item.color }}
                                    >
                                        <h3
                                            className="mb-1 text-xl md:text-2xl font-semibold"
                                            style={{ color: item.color }}
                                        >
                                            {t(`bond.${item.key}.title`)}
                                        </h3>
                                        <p className="leading-relaxed text-base md:text-lg">
                                            {t(`bond.${item.key}.text`)}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function VideoSection({ t }: { t: T }) {
    return (
        <section className="container-xl mt-12 md:mt-24 pb-24 md:pb-32">
            <motion.video
                {...revealProps}
                className="mx-auto w-full aspect-[3/2] object-cover md:aspect-auto md:h-auto md:w-auto md:max-h-[70vh] md:max-w-full md:object-contain rounded-2xl drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
                src={`${IMG_BASE}/pet-buddy-video-loop.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={t("video_label")}
            />
        </section>
    );
}

function DemoVideoSection({ t }: { t: T }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const handlePlay = () => {
        videoRef.current?.play();
        setStarted(true);
    };

    const handleEnded = () => {
        videoRef.current?.load();
        setStarted(false);
    };

    return (
        <section className="container-xl flex flex-col items-center pb-24 md:pb-32">
            <motion.div
                {...revealProps}
                className="mb-10 md:mb-14 max-w-2xl text-center"
            >
                <p className="mb-3 text-sm md:text-base uppercase tracking-widest">
                    {t("video_demo_eyebrow")}
                </p>
                <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight">
                    {t("video_demo_title")}
                </h2>
                <p className="leading-relaxed">
                    {t("video_demo_subtitle")}
                </p>
            </motion.div>
            <motion.div
                {...revealProps}
                className="relative mx-auto w-fit max-w-[90vw] md:max-w-[450px]"
            >
                <video
                    ref={videoRef}
                    className="rounded-[2.5rem] md:rounded-[3.5rem] mx-auto block w-auto h-[65svh] md:h-[75vh] aspect-[404/838] object-cover drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] bg-[#D3E3E4]"
                    src={`${IMG_BASE}/pet-buddy-video-demo.mp4`}
                    poster={`${IMG_BASE}/pet-buddy-video-demo-poster.jpg`}
                    controls={started}
                    controlsList="nofullscreen noremoteplayback"
                    disablePictureInPicture
                    preload="metadata"
                    playsInline
                    muted
                    aria-label={t("video_demo_label")}
                    onPlay={() => setStarted(true)}
                    onEnded={handleEnded}
                />
                {!started && (
                    <button
                        type="button"
                        onClick={handlePlay}
                        aria-label={t("video_demo_play")}
                        className="group absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
                    >
                        <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-focus-visible:ring-4 group-focus-visible:ring-[#88BAB5]/60">
                            <Play
                                className="w-7 h-7 md:w-9 md:h-9 ml-1 text-[#88BAB5]"
                                fill="currentColor"
                                strokeWidth={0}
                            />
                        </span>
                    </button>
                )}
            </motion.div>
        </section>
    );
}

export default function UxUiDesignPetBuddyContent() {
    const t = useTranslations("app.projects.ux_ui_design.projects.pet_buddy.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl">
            <HeroSection t={t} />
            <IntroSection t={t} />
            <FocusSection t={t} />
            <AccessSection t={t} />
            <BondSection t={t} />
            <VideoSection t={t} />
            <DemoVideoSection t={t} />
        </div>
    );
}
