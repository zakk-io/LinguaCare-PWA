import { defineStore } from 'pinia'
import localforage from 'localforage'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'en',
    _initialized: false,
  }),
  actions: {
    setLanguage(language) {
      this.language = language
      localforage.setItem('settings-language', language)
    },
    async initialize() {
      if (this._initialized) return;

      const language = await localforage.getItem('settings-language');
      if (language) {
        this.language = language;
      }
      this._initialized = true;
    }
  },
})
