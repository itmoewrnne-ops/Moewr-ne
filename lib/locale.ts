import { cookies } from 'next/headers'
import { cache } from 'react'
import type { Locale } from './translations'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = cache(async (): Promise<Locale> => {
  try {
    const cookieStore = await cookies()
    const locale = cookieStore.get(COOKIE_NAME)?.value
    if (locale === 'en' || locale === 'so' || locale === 'ar') return locale
  } catch {
    // Server component may run before cookies are available
  }
  return 'en'
})
