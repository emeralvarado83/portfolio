'use client'

import { createContext, useContext, useState } from 'react'
import { translations } from '@/i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_lang') || 'es'
    }
    return 'es'
  })

  const setLanguage = (newLang) => {
    setLang(newLang)
    localStorage.setItem('portfolio_lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
