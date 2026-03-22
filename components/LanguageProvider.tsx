'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getTranslations, type Locale } from '@/lib/translations'

type Translations = ReturnType<typeof getTranslations>

interface LanguageContextType {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'moewr-locale'
const COOKIE_NAME = 'NEXT_LOCALE'

function setLocaleCookie(lang: Locale) {
  document.cookie = `${COOKIE_NAME}=${lang};path=/;max-age=31536000`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [language, setLanguageState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === 'en' || stored === 'so' || stored === 'ar') {
      setLanguageState(stored)
      setLocaleCookie(stored)
      document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr'
      if (stored !== 'en') router.refresh()
    }
    setMounted(true)
  }, [router])

  const setLanguage = useCallback((lang: Locale) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
      setLocaleCookie(lang)
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      router.refresh()
    }
  }, [router])

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    }
  }, [language, mounted])

  const t = getTranslations(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
