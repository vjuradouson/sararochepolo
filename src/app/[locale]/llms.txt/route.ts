import { getTranslations } from 'next-intl/server';
import { LOCALES, Locale } from '@/lib/config';
import { buildLlmsTxt, LLMS_TXT_HEADERS } from '@/lib/seo/llms';

export const dynamic = 'force-static';

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ locale: string }> }
) {
    const { locale } = await params;

    if (!LOCALES.includes(locale)) {
        return new Response('Not Found', { status: 404 });
    }

    const t = await getTranslations({ locale });

    return new Response(buildLlmsTxt({ t, locale: locale as Locale }), {
        headers: LLMS_TXT_HEADERS
    });
}
