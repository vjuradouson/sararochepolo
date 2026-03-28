import { createNavigation } from 'next-intl/navigation'
import { notFound } from 'next/navigation'

import { routing } from './routing'

const { Link, useRouter, usePathname, redirect, getPathname } = createNavigation(routing)

export { Link, usePathname, redirect, useRouter, getPathname, notFound }
