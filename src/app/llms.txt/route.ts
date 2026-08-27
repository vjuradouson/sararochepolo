import { getTranslations } from 'next-intl/server';
import { DEFAULT_LOCALE, Locale } from '@/lib/config';
import { buildLlmsTxt, LLMS_TXT_HEADERS } from '@/lib/seo/llms';

export const dynamic = 'force-static';

/** Ruta canónica de llms.txt: sirve el idioma por defecto en la raíz del dominio. */
export async function GET() {
    const locale = DEFAULT_LOCALE as Locale;
    const t = await getTranslations({ locale });

    return new Response(buildLlmsTxt({ t, locale }), { headers: LLMS_TXT_HEADERS });
}
