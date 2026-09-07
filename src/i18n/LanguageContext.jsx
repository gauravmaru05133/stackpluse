import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'stackpulse-lang'

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && translations[saved] ? saved : 'en'
  })

  const setLang = (code) => {
    if (!translations[code]) return
    if (code === lang) return
    localStorage.setItem(STORAGE_KEY, code)
    window.location.reload()
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dict = translations[lang] || translations.en
    const t = (path) => {
      const value = getByPath(dict, path)
      if (value == null) {
        const fallback = getByPath(translations.en, path)
        return fallback == null ? path : fallback
      }
      return value
    }
    return { lang, setLang, t }
  }, [lang])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
