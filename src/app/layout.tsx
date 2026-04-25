import '@/styles/globals.css'
import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { BASE_URL } from '@/lib/config'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'overlays-content',
  themeColor: '#f4f4f4',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Props) {
  return <>{children}</>
}
