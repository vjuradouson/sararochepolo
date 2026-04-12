'use client'

import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Intro from './components/Intro'
import ProjectsSection from './components/ProjectsSection'

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
        </div>
    )
}