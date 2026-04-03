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