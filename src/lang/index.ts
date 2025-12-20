import ko from './ko'
import en from './en'

export interface Lang extends Omit<typeof globalThis.Lang, 'Blocks'> {
  Blocks: Record<string, string>
}

export type LanguagePack = Record<string, Record<string, string | ((...args: unknown[]) => string) | object>>

export function setLanguage() {
  const Lang: Lang = globalThis.Lang

  return {
    ko: ko(Lang),
    en: en(Lang),
  }
}
