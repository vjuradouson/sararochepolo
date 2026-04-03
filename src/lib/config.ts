export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.sararochepolo.com'
export const LOCALES = process.env.NEXT_PUBLIC_LOCALES?.split(',') ?? ['es', 'en']
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
export const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY || ''
export const MAIL_FROM = process.env.NEXT_PUBLIC_MAIL_FROM || ''

export type Locale = typeof LOCALES[number];
export const LANGUAGE_META: Record<Locale, {}> = {
    es: {},
    en: {},
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
    UY: 'es'  // Uruguay
};