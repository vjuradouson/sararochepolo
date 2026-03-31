import '@/styles/globals.css'
import { ReactNode } from 'react'
import type { Viewport } from 'next'

type Props = {
  children: ReactNode
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'overlays-content',
}

export default function RootLayout({ children }: Props) {
  return <>{children}</>
}
