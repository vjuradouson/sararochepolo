'use client'

import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MasonryGrid from './components/MasonryGrid'
import PortfolioPreview from './components/PortfolioPreview'

export default function HomeClient() {
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const handler = () => {
            setRefreshKey(prev => prev + 1)
        }

        window.addEventListener('reanimate-home', handler)

        return () => {
            window.removeEventListener('reanimate-home', handler)
        }
    }, [])

    return (
        <div className="flex flex-col w-full">
            <Hero key={refreshKey} />
            <MasonryGrid key={refreshKey + 1} />
            <PortfolioPreview key={refreshKey + 2} />
        </div>
    )
}