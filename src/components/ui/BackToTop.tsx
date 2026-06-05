"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSmoothScrollToTop } from "@/hooks/useSmoothScrollToTop";

const SCROLL_THRESHOLD = 400;

export default function BackToTop() {
    const t = useTranslations("app.a11y");
    const { smoothScrollToTop } = useSmoothScrollToTop();
    const [scrolled, setScrolled] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const footer = document.querySelector("footer");
        const observer = footer
            ? new IntersectionObserver(
                  ([entry]) => setFooterVisible(entry.isIntersecting),
                  { rootMargin: "0px 0px -80px 0px" }
              )
            : null;
        if (footer && observer) observer.observe(footer);

        return () => {
            window.removeEventListener("scroll", onScroll);
            observer?.disconnect();
        };
    }, []);

    const isVisible = scrolled && !footerVisible;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={smoothScrollToTop}
                    aria-label={t("back_to_top")}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="border-white/90 border shadow-lg bg-white/80 text-black-400 fixed bottom-6 right-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:bottom-8 md:right-8"
                >
                    <MoveUp className="h-5 w-5" strokeWidth={0.75} aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
