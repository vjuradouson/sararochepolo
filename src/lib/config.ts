export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.sararochepolo.com'
export const LOCALES = process.env.NEXT_PUBLIC_LOCALES?.split(',') ?? ['es', 'en']
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'es'
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export type Locale = typeof LOCALES[number];
export const LANGUAGE_META: Record<Locale, {}> = {
    es: {},
    en: {},
};

export const LocaleCountryMap: Record<string, string> = {
    es: "es_ES",
    en: "en_US"
};

export const COUNTRY_LOCALE_MAP: Record<string, string> = {
    // Spanish-speaking countries
    ES: 'es', // Spain
    MX: 'es', // Mexico
    AR: 'es', // Argentina
    CO: 'es', // Colombia
    CL: 'es', // Chile
    PE: 'es', // Peru
    VE: 'es', // Venezuela
    EC: 'es', // Ecuador
    GT: 'es', // Guatemala
    CU: 'es', // Cuba
    BO: 'es', // Bolivia
    DO: 'es', // Dominican Republic
    HN: 'es', // Honduras
    PY: 'es', // Paraguay
    SV: 'es', // El Salvador
    NI: 'es', // Nicaragua
    CR: 'es', // Costa Rica
    PA: 'es', // Panama
    UY: 'es', // Uruguay
    PR: 'es', // Puerto Rico
    GQ: 'es'  // Equatorial Guinea
};