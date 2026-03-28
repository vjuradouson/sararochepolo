'use client'

import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MasonryGrid from './components/MasonryGrid'
import StickySplitSection from './components/StickySplitSection'
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
            <StickySplitSection key={refreshKey + 1} />
            <MasonryGrid key={refreshKey + 2    } />
            <PortfolioPreview key={refreshKey + 3} />
        </div>
    )
}