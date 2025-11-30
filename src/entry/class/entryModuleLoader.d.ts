interface EntryHardwareBlockModule {
  setLanguage(): Record<string, Record<string, Record<string, unknown>>>
}

export class EntryModuleLoader {
  setLanguageTemplates(moduleObject: EntryHardwareBlockModule): void
}
