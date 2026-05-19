'use client';

import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';

type Props = {
    cookiePolicyLabel: string;
    manageCookiesLabel: string;
};

export default function FooterLegal({
    cookiePolicyLabel,
    manageCookiesLabel,
}: Props) {
    return (
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
            <Link href={ROUTES.COOKIE_POLICY} className="hover:underline">
                {cookiePolicyLabel}
            </Link>
            <span aria-hidden="true" className="hidden lg:inline">·</span>
            <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                className="cursor-pointer hover:underline"
            >
                {manageCookiesLabel}
            </button>
        </div>
    );
}
