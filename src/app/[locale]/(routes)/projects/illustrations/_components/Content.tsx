"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const IMG = "/media/projects/illustrations/imploded";

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

type ImageAsset = {
    src: string;
    width: number;
    height: number;
    maxWidth: number;
    altKey: string;
    /** Extra Tailwind classes applied to the <Image> element. */
    imgClassName?: string;
    /** Extra Tailwind classes applied to the wrapper around the <Image>. */
    wrapperClassName?: string;
    /** Override the default `sizes` attribute. Needed when CSS scales the image beyond its layout box (e.g. `scale-[2]`) so Next serves a higher-res srcset variant. */
    sizes?: string;
};

type PairConfig = {
    key: string;
    left: ImageAsset;
    right: ImageAsset;
    priority?: boolean;
    split?: "50-50" | "60-40";
    /** Extra Tailwind classes applied to the <section>. */
    sectionClassName?: string;
};

type SingleConfig = {
    key: string;
    image: ImageAsset;
    /** Extra Tailwind classes applied to the <section>. */
    sectionClassName?: string;
};

const intoTheWoods: PairConfig = {
    key: "into_the_woods",
    left: {
        src: `${IMG}/into-the-woods-lineart.png`,
        width: 630,
        height: 621,
        maxWidth: 600,
        altKey: "projects.into_the_woods.image_alt.lineart",
    },
    right: {
        src: `${IMG}/into-the-woods-final.png`,
        width: 471,
        height: 640,
        maxWidth: 400,
        altKey: "projects.into_the_woods.image_alt.final",
    },
    priority: true,
    split: "60-40",
};

const hiHunnyDesktop: PairConfig = {
    key: "hi_hunny",
    sectionClassName: "mt-0 md:mt-24 hidden md:block",
    left: {
        src: `${IMG}/hi-hunny-sketch.png`,
        width: 666,
        height: 754,
        maxWidth: 600,
        altKey: "projects.hi_hunny.image_alt.sketch",
        imgClassName: "md:scale-[1.1]",
    },
    right: {
        src: `${IMG}/hi-hunny-final.png`,
        width: 669,
        height: 553,
        maxWidth: 600,
        altKey: "projects.hi_hunny.image_alt.final",
    },
};

const coffeeMaker: SingleConfig = {
    key: "coffee_maker",
    image: {
        src: `${IMG}/coffee-maker.png`,
        width: 1536,
        height: 1024,
        maxWidth: 1000,
        altKey: "projects.coffee_maker.image_alt",
        wrapperClassName: "justify-start md:-ml-[3%]",
        imgClassName: "scale-[2] ml-[-40%] md:scale-[1.20] md:ml-[0%]",
        sizes: "(max-width: 768px) 200vw, 60vw",
    },
    sectionClassName: "-mt-8 md:-mt-48 mb-24 md:mb-0",
};

const adventureDesktop: SingleConfig = {
    key: "adventure",
    sectionClassName: "mt-0 md:mt-24 hidden md:block",
    image: {
        src: `${IMG}/adventure.png`,
        width: 1159,
        height: 1073,
        maxWidth: 900,
        altKey: "projects.adventure.image_alt",
        imgClassName: "scale-[1.05] md:scale-[1.10]"
    },
};

type T = ReturnType<typeof useTranslations>;

function PairSection({ cfg, t }: { cfg: PairConfig; t: T }) {
    const isSixtyForty = cfg.split === "60-40";
    const gridCols = isSixtyForty ? "md:grid-cols-10" : "md:grid-cols-2";
    const leftSpan = isSixtyForty ? "md:col-span-6" : "";
    const rightSpan = isSixtyForty ? "md:col-span-4" : "";
    const leftSizes = isSixtyForty ? "(max-width: 768px) 90vw, 48vw" : "(max-width: 768px) 90vw, 40vw";
    const rightSizes = isSixtyForty ? "(max-width: 768px) 80vw, 32vw" : "(max-width: 768px) 80vw, 36vw";

    return (
        <section className={`container-xl pb-16 md:pb-24 ${cfg.sectionClassName ?? ""}`}>
            <motion.div
                {...revealProps}
                className={`grid grid-cols-1 ${gridCols} gap-y-10 md:gap-x-12 lg:gap-x-16 items-center`}
            >
                <div className={`${leftSpan} flex justify-center md:justify-end ${cfg.left.wrapperClassName ?? ""}`}>
                    <Image
                        src={cfg.left.src}
                        alt={t(cfg.left.altKey)}
                        width={cfg.left.width}
                        height={cfg.left.height}
                        sizes={leftSizes}
                        className={`h-auto w-full object-contain ${cfg.left.imgClassName ?? ""}`}
                        style={{ maxWidth: `${cfg.left.maxWidth}px` }}
                        priority={cfg.priority}
                        fetchPriority={cfg.priority ? "high" : "auto"}
                    />
                </div>
                <div className={`${rightSpan} flex justify-center md:justify-start ${cfg.right.wrapperClassName ?? ""}`}>
                    <Image
                        src={cfg.right.src}
                        alt={t(cfg.right.altKey)}
                        width={cfg.right.width}
                        height={cfg.right.height}
                        sizes={rightSizes}
                        className={`h-auto w-full object-contain ${cfg.right.imgClassName ?? ""}`}
                        style={{ maxWidth: `${cfg.right.maxWidth}px` }}
                    />
                </div>
            </motion.div>
        </section>
    );
}

function SingleSection({ cfg, t }: { cfg: SingleConfig; t: T }) {
    return (
        <section className={`container-xl pb-16 md:pb-24 ${cfg.sectionClassName ?? ""}`}>
            <motion.div {...revealProps} className={`flex ${cfg.image.wrapperClassName ?? "justify-center"}`}>
                <Image
                    src={cfg.image.src}
                    alt={t(cfg.image.altKey)}
                    width={cfg.image.width}
                    height={cfg.image.height}
                    sizes={cfg.image.sizes ?? "(max-width: 768px) 92vw, 60vw"}
                    className={`h-auto w-full object-contain ${cfg.image.imgClassName ?? ""}`}
                    style={{ maxWidth: `${cfg.image.maxWidth}px` }}
                />
            </motion.div>
        </section>
    );
}

const INDIVIDUAL = "/media/projects/illustrations/individual";

function BillTheBearSection({ t }: { t: T }) {
    return (
        <section className="relative py-16 md:py-24 mb-16 md:mb-24">
            {/* Desktop: kraft stretched to section box */}
            <Image
                src={`${IMG}/kraft-paper-bg-mobile.png`}
                alt=""
                fill
                aria-hidden
                sizes="100vw"
                quality={90}
                className="block md:hidden -z-10 object-fill select-none pointer-events-none"
            />
            <Image
                src={`${IMG}/kraft-paper-bg.png`}
                alt=""
                fill
                aria-hidden
                sizes="100vw"
                quality={90}
                className="hidden md:block -z-10 object-fill select-none pointer-events-none"
            />
            {/* Mobile: kraft sized to section height with natural aspect ratio (overflows horizontally, clipped by outer overflow-x-clip) */}
            <div
                className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 -z-10"
                style={{ aspectRatio: "1422 / 1021" }}
                aria-hidden
            >
                <Image
                    src={`${IMG}/kraft-paper-bg.png`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 200vw, 100vw"
                    quality={90}
                    className="object-fill select-none pointer-events-none"
                />
            </div>
            <div className="container-xl pb-[100px]">
                {/* Mobile: 4 stacked elements (title → research → lineart → character) */}
                <motion.div
                    {...revealProps}
                    className="md:hidden flex flex-col items-center"
                >
                    <Image
                        src={`${INDIVIDUAL}/bill-the-bear-title.png`}
                        alt={t("projects.bill_the_bear.image_alt.title")}
                        width={353}
                        height={201}
                        sizes="60vw"
                        className="h-auto w-full object-contain z-10"
                        style={{ maxWidth: "60%" }}
                    />
                    <Image
                        src={`${IMG}/bill-the-bear-research.png`}
                        alt={t("projects.bill_the_bear.image_alt.research")}
                        width={532}
                        height={1005}
                        sizes="80vw"
                        className="h-auto w-full object-contain scale-[1.15] -mt-[8%]"
                        style={{ maxWidth: "80%" }}
                    />
                    <Image
                        src={`${INDIVIDUAL}/bill-the-bear-character-sketch.png`}
                        alt={t("projects.bill_the_bear.image_alt.lineart")}
                        width={1920}
                        height={1440}
                        sizes="80vw"
                        className="h-auto w-full object-contain -mt-[25%] -mr-[45%] z-10"
                        style={{ maxWidth: "45%" }}
                    />
                    <Image
                        src={`${INDIVIDUAL}/bill-the-bear-character.png`}
                        alt={t("projects.bill_the_bear.image_alt.character")}
                        width={711}
                        height={777}
                        sizes="80vw"
                        className="h-auto w-full object-contain -mt-8 scale-[1] mt-[1%]"
                        style={{ maxWidth: "80%" }}
                    />
                </motion.div>

                {/* Desktop: 2-column layout (character composite | research) */}
                <motion.div
                    {...revealProps}
                    className="hidden md:grid md:grid-cols-12 md:gap-x-10 lg:gap-x-16 items-center"
                >
                    <div className="md:col-span-7 flex justify-center md:justify-end">
                        <Image
                            src={`${IMG}/bill-the-bear-character.png`}
                            alt={t("projects.bill_the_bear.image_alt.character")}
                            width={711}
                            height={777}
                            sizes="50vw"
                            className="h-auto w-full object-contain"
                            style={{ maxWidth: "700px" }}
                        />
                    </div>
                    <div className="md:col-span-5 flex justify-center md:justify-start">
                        <Image
                            src={`${IMG}/bill-the-bear-research.png`}
                            alt={t("projects.bill_the_bear.image_alt.research")}
                            width={532}
                            height={1005}
                            sizes="30vw"
                            className="h-auto w-full object-contain"
                            style={{ maxWidth: "500px" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

type HiHunnyMobileItem = {
    src: string;
    width: number;
    height: number;
    altKey: string;
    maxWidth: string;
    imgClassName?: string;
};

const hiHunnyMobileItems: HiHunnyMobileItem[] = [
    {
        src: `${INDIVIDUAL}/hi-hunny-title.png`,
        width: 353,
        height: 201,
        altKey: "projects.hi_hunny.image_alt.title",
        maxWidth: "60%",
        imgClassName: "z-20",
    },
    {
        src: `${INDIVIDUAL}/hi-hunny-sketch-1.png`,
        width: 365,
        height: 298,
        altKey: "projects.hi_hunny.image_alt.sketch_1",
        maxWidth: "78%",
        imgClassName: "-mt-[6%] rotate-[3deg] translate-x-[3%] z-10 scale-[1.05]",
    },
    {
        src: `${INDIVIDUAL}/hi-hunny-sketch-2.png`,
        width: 370,
        height: 463,
        altKey: "projects.hi_hunny.image_alt.sketch_2",
        maxWidth: "78%",
        imgClassName: "-mt-[8%] -rotate-[2deg] -translate-x-[3%] z-30 scale-[1.05]",
    },
    {
        src: `${IMG}/hi-hunny-final.png`,
        width: 669,
        height: 553,
        altKey: "projects.hi_hunny.image_alt.final",
        maxWidth: "92%",
        imgClassName: "mt-[6%] z-40",
    },
];

function HiHunnyMobileSection({ t }: { t: T }) {
    return (
        <section className="md:hidden container-xl pb-16 mt-32">
            <motion.div {...revealProps} className="relative flex flex-col items-center">
                {hiHunnyMobileItems.map((item) => (
                    <Image
                        key={item.src}
                        src={item.src}
                        alt={t(item.altKey)}
                        width={item.width}
                        height={item.height}
                        sizes="90vw"
                        className={`relative h-auto w-full object-contain ${item.imgClassName ?? ""}`}
                        style={{ maxWidth: item.maxWidth }}
                    />
                ))}
            </motion.div>
        </section>
    );
}

type AdventureMobileItem = {
    src: string;
    width: number;
    height: number;
    altKey: string;
    /** "end" pega la imagen al borde derecho, "start" al izquierdo. */
    align: "start" | "end";
    /** Tailwind width class, e.g. "w-[88%]". */
    widthClass: string;
    imgClassName?: string;
};

const adventureMobileItems: AdventureMobileItem[] = [
    {
        src: `${INDIVIDUAL}/adventure-left.png`,
        width: 558,
        height: 1060,
        altKey: "projects.adventure.image_alt_mobile.left",
        align: "end",
        widthClass: "w-[90%]",
    },
    {
        src: `${INDIVIDUAL}/adventure-right.png`,
        width: 559,
        height: 1060,
        altKey: "projects.adventure.image_alt_mobile.right",
        align: "start",
        widthClass: "w-[90%]",
        imgClassName: "mt-[-25%]",
    },
];

function AdventureMobileSection({ t }: { t: T }) {
    return (
        <section className="md:hidden pb-16 mt-12">
            <motion.div {...revealProps} className="flex flex-col">
                {adventureMobileItems.map((item) => (
                    <Image
                        key={item.src}
                        src={item.src}
                        alt={t(item.altKey)}
                        width={item.width}
                        height={item.height}
                        sizes="90vw"
                        className={`h-auto object-contain ${item.widthClass} ${item.align === "end" ? "self-end" : "self-start"} ${item.imgClassName ?? ""}`}
                    />
                ))}
            </motion.div>
        </section>
    );
}

export default function IllustrationsContent() {
    const t = useTranslations("app.projects.illustrations.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl overflow-x-clip">
            <section className="container-xl md:pt-4 mb-16 md:mb-24">
                <p className="text-xl uppercase tracking-widest mb-8 md:mb-10">
                    {t("eyebrow")}
                </p>
                <h1 className="mb-10 text-4xl md:text-5xl font-light tracking-tight">
                    {t("title")}
                </h1>
                <p className="leading-relaxed">
                    {t("intro")}
                </p>
            </section>

            <PairSection cfg={intoTheWoods} t={t} />
            <BillTheBearSection t={t} />
            <SingleSection cfg={coffeeMaker} t={t} />
            <HiHunnyMobileSection t={t} />
            <PairSection cfg={hiHunnyDesktop} t={t} />
            <AdventureMobileSection t={t} />
            <SingleSection cfg={adventureDesktop} t={t} />
        </div>
    );
}
