import type { setLanguage } from '../lang'

type Language = ReturnType<typeof setLanguage>
type LanguageUnion = Language[keyof Language]

export const Workspace: Record<string, string>
export const Blocks: Record<string, string> & LanguageUnion['Blocks']
