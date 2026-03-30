import { createNavigation } from 'next-intl/navigation'
import { notFound } from 'next/navigation'

import { ROUTING } from './routing'

const { Link, useRouter, usePathname, redirect, getPathname } = createNavigation(ROUTING)

export { Link, usePathname, redirect, useRouter, getPathname, notFound }
