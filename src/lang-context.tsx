import React, { createContext, useContext } from 'react'

export type Lang = 'ja' | 'en'

export const LangContext = createContext<Lang>('ja')

export function useLang(): Lang {
  return useContext(LangContext)
}

/** Inline bilingual helper — picks ja or en based on current lang context */
export function useT() {
  const lang = useLang()
  return function t(ja: string, en: string): string {
    return lang === 'en' ? en : ja
  }
}
