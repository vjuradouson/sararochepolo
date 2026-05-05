"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const IMG = "/media/project/illustrations/imploded";

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

const hiHunny: PairConfig = {
    key: "hi_hunny",
    sectionClassName: "mt-0 md:mt-24",
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
        imgClassName: "scale-[2] ml-[-35%] md:scale-[1.20] md:ml-[0%]",
    },
    sectionClassName: "-mt-8 md:-mt-48 mb-24 md:mb-0",
};

const adventure: SingleConfig = {
    key: "adventure",
    sectionClassName: "mt-0 md:mt-24",
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
                    sizes="(max-width: 768px) 92vw, 60vw"
                    className={`h-auto w-full object-contain ${cfg.image.imgClassName ?? ""}`}
                    style={{ maxWidth: `${cfg.image.maxWidth}px` }}
                />
            </motion.div>
        </section>
    );
}

const INDIVIDUAL = "/media/project/illustrations/individual";

function BillTheBearSection({ t }: { t: T }) {
    return (
        <section className="relative py-16 md:py-24 mb-16 md:mb-24">
            <Image
                src={`${IMG}/kraft-paper-bg.png`}
                alt=""
                fill
                aria-hidden
                sizes="100vw"
                quality={90}
                className="-z-10 object-fill select-none pointer-events-none"
            />
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

export default function IllustrationsContent() {
    const t = useTranslations("app.projects.illustrations.content");

    return (
        <div className="text-lg md:text-xl xl:text-2xl overflow-x-clip">
            <section className="container-xl md:pt-16 mt-20 md:mt-10 mb-16 md:mb-24">
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
            <PairSection cfg={hiHunny} t={t} />
            <SingleSection cfg={adventure} t={t} />
        </div>
    );
}
