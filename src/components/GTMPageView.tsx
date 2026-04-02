'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GTMPageView() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '')

        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'page_view',
            page_location: window.location.href,
            page_path: url,
            page_title: document.title,
        });
    }, [pathname, searchParams])

    return null
}