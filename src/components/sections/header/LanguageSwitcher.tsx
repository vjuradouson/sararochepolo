"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Locale, LOCALES } from "@/lib/config";
import { trackLanguageChange } from "@/lib/gtm";

/**
 * Hand-crafted swap icon: each chevron is one polyline (single linejoin at the
 * apex) and each horizontal is offset by 1 viewBox unit so it doesn't share an
 * endpoint with the chevron — the round caps close the gap visually but no
 * three strokes ever overlap, so the apex pixels stay even-toned.
 */
function SwapIcon({ size = 14, className }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <polyline points="8 3 4 7 8 11" />
            <line x1="5" y1="7" x2="20" y2="7" />
            <polyline points="16 13 20 17 16 21" />
            <line x1="4" y1="17" x2="19" y2="17" />
        </svg>
    );
}

function persistLocaleCookie(locale: Locale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}

export default function LanguageSwitcher() {
    const t = useTranslations("app.header.language_switcher");
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();

    const nextLocale = (LOCALES.find((l) => l !== locale) ?? locale) as Locale;
    const canSwap = nextLocale !== locale;

    const handleSwap = () => {
        if (!canSwap) return;
        trackLanguageChange({
            lang_change_from_locale: locale,
            lang_change_to_locale: nextLocale,
            lang_change_location: String(pathname),
        });
        persistLocaleCookie(nextLocale);
        router.push(pathname, { locale: nextLocale });
    };

    return (
        <button
            type="button"
            onClick={handleSwap}
            aria-label={t(nextLocale)}
            className="group flex cursor-pointer items-center gap-1 md:gap-2 rounded-full border border-foreground/15 px-2 md:px-3 py-1 text-normal font-thin
            uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[var(--color-dark-blue)]/40
            focus-visible:border-[var(--color-dark-blue)]/60 focus-visible:outline-none"
        >
            <span className="font-bold">{locale}</span>
            <SwapIcon
                size={15}
                className="text-foreground/60 transition-colors duration-300 group-hover:text-[var(--color-dark-blue)]/60"
            />
            <span className="text-foreground/60">{nextLocale}</span>
        </button>
    );
}
