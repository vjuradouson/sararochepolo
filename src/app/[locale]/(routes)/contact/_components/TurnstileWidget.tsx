"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type TurnstileApi = {
    render: (
        container: HTMLElement,
        params: {
            sitekey: string;
            callback?: (token: string) => void;
            "error-callback"?: () => void;
            "expired-callback"?: () => void;
            theme?: "light" | "dark" | "auto";
            size?: "normal" | "flexible" | "compact" | "invisible";
            appearance?: "always" | "execute" | "interaction-only";
            language?: string;
        }
    ) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId?: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
        onloadTurnstileCallback?: () => void;
    }
}

interface Props {
    sitekey: string;
    locale?: string;
    onVerify: (token: string) => void;
    onExpire?: () => void;
    onError?: () => void;
}

export default function TurnstileWidget({
    sitekey,
    locale,
    onVerify,
    onExpire,
    onError,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onVerifyRef.current = onVerify;
        onExpireRef.current = onExpire;
        onErrorRef.current = onError;
    });

    useEffect(() => {
        function render() {
            if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey,
                language: locale,
                theme: "light",
                appearance: "interaction-only",
                callback: (token) => onVerifyRef.current(token),
                "expired-callback": () => onExpireRef.current?.(),
                "error-callback": () => onErrorRef.current?.(),
            });
        }

        if (window.turnstile) {
            render();
        } else {
            window.onloadTurnstileCallback = render;
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [sitekey, locale]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
                strategy="afterInteractive"
            />
            <div ref={containerRef} />
        </>
    );
}
