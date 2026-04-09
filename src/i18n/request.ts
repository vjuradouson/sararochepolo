import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { ROUTING } from "./routing";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/config";

// =========================
// Utils
// =========================

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (
      key in target &&
      typeof target[key] === "object" &&
      typeof source[key] === "object"
    ) {
      target[key] = deepMerge(
        { ...source[key], ...target[key] },
        source[key]
      );
    } else if (!(key in target)) {
      target[key] = source[key];
    }
  }
  return target;
}

// =========================
// Types
// =========================

type Locale = (typeof LOCALES)[number];

// =========================
// Config
// =========================

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale: Locale = hasLocale(ROUTING.locales, requested)
    ? (requested as Locale)
    : DEFAULT_LOCALE;

  const loaders: Record<Locale, () => Promise<any>> = Object.fromEntries(
    LOCALES.map((loc) => [
      loc,
      () => import(`./locale/${loc}`),
    ])
  ) as Record<Locale, () => Promise<any>>;

  const safeLocale: Locale =
    locale in loaders ? locale : DEFAULT_LOCALE;

  const fallbackMessages = (await loaders[DEFAULT_LOCALE]()).default;

  const localeMessages = (await loaders[safeLocale]()).default;

  const mergedMessages = deepMerge(localeMessages, fallbackMessages);

  return {
    locale,
    messages: mergedMessages,
  };
});