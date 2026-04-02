export const COOKIE_CONSENT_NAME = 'cookie_consent_v1';

export type CookieConsent = {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    updatedAt: string;
};

export const defaultConsent: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    updatedAt: '',
};

export function safeParseConsent(value: string | undefined): CookieConsent | null {
    if (!value) return null;

    try {
        const parsed = JSON.parse(value) as Partial<CookieConsent>;

        return {
            necessary: true,
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
            preferences: Boolean(parsed.preferences),
            updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
        };
    } catch {
        return null;
    }
}

export function buildConsent(
    input: Partial<Omit<CookieConsent, 'necessary' | 'updatedAt'>>
): CookieConsent {
    return {
        necessary: true,
        analytics: Boolean(input.analytics),
        marketing: Boolean(input.marketing),
        preferences: Boolean(input.preferences),
        updatedAt: new Date().toISOString(),
    };
}