import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { locales } from '@/types/ContextOptions'

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (key in target && typeof target[key] === 'object' && typeof source[key] === 'object') {
      target[key] = deepMerge({ ...source[key], ...target[key] }, source[key])
    } else if (!(key in target)) {
      target[key] = source[key]
    }
  }
  return target
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const fallbackMessages = (await import(`./locale/en`)).default

  const localeMessages =
    locale === locales._EN ? fallbackMessages : (await import(`./locale/${locale}.ts`)).default

  const mergedMessages = deepMerge(localeMessages, fallbackMessages)

  return {
    locale,
    messages: mergedMessages,
  }
})
