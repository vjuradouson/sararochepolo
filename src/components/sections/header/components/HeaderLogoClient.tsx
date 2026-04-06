"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useSmoothScrollToTop } from "@/hooks/useSmoothScrollToTop";

export default function HeaderLogoClient({ ownerName }: { ownerName: string }) {
    const pathname = usePathname();
    const { smoothScrollToTop, isScrolling } = useSmoothScrollToTop();

    const handleLogoClick = (e: React.MouseEvent) => {
        const localeRegex = /^\/[a-z]{2}/;
        const normalizedPath = pathname.replace(localeRegex, '') || '/';

        if (normalizedPath === "/") {
            e.preventDefault();
            if (!isScrolling.current) {
                smoothScrollToTop();
            }
        }
    };

    return (
        <Link
            href="/"
            onClick={handleLogoClick}
            className="font-thin text-body-lg leading-none tracking-normal hover:opacity-75 transition-opacity"
        >
            {ownerName}
        </Link>
    );
}