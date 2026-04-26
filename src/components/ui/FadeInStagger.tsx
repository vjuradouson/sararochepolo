"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type Tag = "div" | "ul" | "ol" | "section" | "article" | "nav" | "li" | "span";

type FadeInStaggerProps = {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delayChildren?: number;
    duration?: number;
    y?: number;
    once?: boolean;
    viewportMargin?: string;
    inherit?: boolean;
    as?: Tag;
};

export function FadeInStagger({
    children,
    className,
    stagger = 0.2,
    delayChildren = 0.3,
    duration = 1.2,
    y = 20,
    once = true,
    viewportMargin = "-100px",
    inherit = false,
    as = "div",
}: FadeInStaggerProps) {
    const variants: Variants = {
        hidden: { opacity: 0, y },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: EASE,
                staggerChildren: stagger,
                delayChildren,
            },
        },
    };

    const Component = motion[as];

    if (inherit) {
        return (
            <Component variants={variants} className={className}>
                {children}
            </Component>
        );
    }

    return (
        <Component
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once, margin: viewportMargin }}
            className={className}
        >
            {children}
        </Component>
    );
}

type FadeInStaggerItemProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
    y?: number;
    as?: Tag;
};

export function FadeInStaggerItem({
    children,
    className,
    duration = 0.8,
    y = 12,
    as = "div",
}: FadeInStaggerItemProps) {
    const variants: Variants = {
        hidden: { opacity: 0, y },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: EASE,
            },
        },
    };

    const Component = motion[as];

    return (
        <Component variants={variants} className={className}>
            {children}
        </Component>
    );
}
