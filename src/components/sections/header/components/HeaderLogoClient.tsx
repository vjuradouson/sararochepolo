"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

export default function HeaderLogoClient({ ownerName }: { ownerName: string }) {
    const pathname = usePathname();

    const handleLogoClick = (e: React.MouseEvent) => {
        const localeRegex = /^\/[a-z]{2}/;
        const normalizedPath = pathname.replace(localeRegex, '') || '/';

        if (normalizedPath === "/") {
            e.preventDefault();
            window.dispatchEvent(new Event('reanimate-home'));
        }
    };

    return (
        <Link
            href="/"
            onClick={handleLogoClick}
            className="font-thin text-body-lg leading-none tracking-normal text-brand-dark hover:opacity-75 transition-opacity"
        >
            {ownerName}
        </Link>
    );
}