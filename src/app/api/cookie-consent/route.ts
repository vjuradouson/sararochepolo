import { NextRequest, NextResponse } from 'next/server';
import {
    buildConsent,
    COOKIE_CONSENT_NAME,
} from '@/lib/cookie-consent';

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
        return NextResponse.json(
            { ok: false, error: 'Invalid payload' },
            { status: 400 }
        );
    }

    const consent = buildConsent({
        analytics: body.analytics,
        marketing: body.marketing,
        preferences: body.preferences,
    });

    const response = NextResponse.json({ ok: true, consent });

    response.cookies.set(COOKIE_CONSENT_NAME, JSON.stringify(consent), {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 180, // 180 days
    });

    return response;
}