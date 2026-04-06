'use client'

import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Intro from './components/Intro'
import ProjectsSection from './components/ProjectsSection'
/*import ServicesSection from './components/ServicesSection'
import MasonryGrid from './components/MasonryGrid'
import StickySplitSection from './components/StickySplitSection'*/

export default function HomeClient() {
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const handler = () => {
            setRefreshKey(prev => prev + 1)
        }

        window.addEventListener('reanimate-effects', handler)

        return () => {
            window.removeEventListener('reanimate-effects', handler)
        }
    }, [])

    return (
        <div className="flex flex-col w-full" key={refreshKey}>
            <Hero />
            <Intro />
            <ProjectsSection />
            {/*
            <ServicesSection key={refreshKey + 3} />
<StickySplitSection key={refreshKey + 3} />
<MasonryGrid key={refreshKey + 4} />
            <PortfolioPreview key={refreshKey + 5} />
            */}
        </div>
    )
}