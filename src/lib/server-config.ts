// Server-only env vars. Do NOT import this file from client components.
// Vars here intentionally have no NEXT_PUBLIC_ prefix so Next.js does not
// inline them into the client bundle.

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || ''
export const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
export const MAIL_FROM = process.env.MAIL_FROM || ''
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || ''
