<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="flex items-center space-x-2 bg-card p-2 rounded-lg">
      <span :class="['fi', `fi-${currentLanguage.flag}`]"></span>
      <span class="text-text-light font-semibold">{{ currentLanguage.name }}</span>
      <font-awesome-icon icon="chevron-down" class="text-text-dark transition-transform duration-200" :class="{'rotate-180': isOpen}" />
    </button>
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 h-full w-full z-10"></div>
    <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-48 bg-card rounded-lg shadow-lg z-20">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="selectLanguage(lang.code)"
        class="flex items-center space-x-3 p-3 hover:bg-primary/20 w-full"
      >
        <span :class="['fi', `fi-${lang.flag}`]"></span>
        <span class="text-text-light font-semibold">{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'rw', name: 'Kinyarwanda', flag: 'rw' },
  { code: 'ar', name: 'Arabic', flag: 'sa' },
  { code: 'fr', name: 'French', flag: 'fr' },
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === settingsStore.language) || languages[0]
})

const selectLanguage = (langCode) => {
  settingsStore.setLanguage(langCode)
  isOpen.value = false
}
</script>
