'use client'

import { useState, useEffect } from 'react'
import Hero from './Hero'
import Intro from './Intro'
import ProjectsSection from './ProjectsSection'

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