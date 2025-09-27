<template>
  <div class="flex flex-col h-full">
    <h1 class="text-3xl font-bold text-text-light mb-8">{{ $t('settings') }}</h1>

    <div class="flex-1">
      <h2 class="text-xl font-semibold text-text-light mb-4">{{ $t('language') }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="settingsStore.setLanguage(lang.code)"
          :class="[
            'p-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3',
            settingsStore.language === lang.code
              ? 'bg-primary text-white shadow-lg'
              : 'bg-card hover:bg-primary/20',
          ]"
        >
          <span :class="['fi', `fi-${lang.flag}`]"></span>
          <span class="font-semibold">{{ lang.name }}</span>
        </button>
      </div>
    </div>

    <div class="mt-auto space-y-4">
      <!-- Install App Button -->
      <button 
        v-if="!isAppInstalled"
        @click="showInstallPrompt"
        class="w-full bg-accent hover:bg-accent/90 text-background font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <font-awesome-icon icon="download" />
        <span>Install App</span>
      </button>
      
      <!-- Logout Button -->
      <button class="w-full bg-status-red/80 hover:bg-status-red text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
        {{ $t('logout') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const isAppInstalled = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'rw', name: 'Kinyarwanda', flag: 'rw' },
  { code: 'ar', name: 'Arabic', flag: 'sa' },
  { code: 'fr', name: 'French', flag: 'fr' },
]

// Check if app is already installed
const checkInstallStatus = () => {
  isAppInstalled.value = window.matchMedia('(display-mode: standalone)').matches || 
                        window.navigator.standalone === true ||
                        window.pwaState?.isInstalled === true
}

const showInstallPrompt = () => {
  // Trigger the install prompt
  window.dispatchEvent(new CustomEvent('show-install-prompt'))
}

onMounted(() => {
  // Don't show install button in development mode
  if (import.meta.env.DEV) {
    console.log('PWA disabled in development mode')
    return
  }
  
  checkInstallStatus()
  
  // Listen for installation status changes
  window.addEventListener('pwa-installed', checkInstallStatus)
})
</script>
