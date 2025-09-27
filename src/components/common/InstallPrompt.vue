<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
    <div class="bg-background border border-accent rounded-lg shadow-lg p-4">
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="download" class="text-background text-lg" />
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-text-light">
            {{ $t('installApp.title') }}
          </h3>
          <p class="text-sm text-text-dark mt-1">
            {{ $t('installApp.description') }}
          </p>
          <div class="flex space-x-2 mt-3">
            <button
              @click="installApp"
              class="bg-accent text-background px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              {{ $t('installApp.install') }}
            </button>
            <button
              @click="dismissPrompt"
              class="text-text-dark hover:text-text-light px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              {{ $t('installApp.later') }}
            </button>
          </div>
        </div>
        <button
          @click="dismissPrompt"
          class="flex-shrink-0 text-text-dark hover:text-text-light transition-colors"
        >
          <font-awesome-icon icon="times" class="text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showInstallPrompt = ref(false)
const deferredPrompt = ref(null)

// Check if app is already installed
const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true ||
         window.pwaState?.isInstalled === true
}

// Check if user has dismissed the prompt recently
const isPromptDismissed = () => {
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (!dismissed) return false
  
  const dismissedTime = parseInt(dismissed)
  const now = Date.now()
  // Show again after 7 days
  return (now - dismissedTime) < 7 * 24 * 60 * 60 * 1000
}

onMounted(() => {
  // Don't show prompt in development mode
  if (import.meta.env.DEV) {
    console.log('PWA disabled in development mode')
    return
  }

  // Don't show prompt if app is already installed
  if (isAppInstalled()) {
    console.log('App is already installed, not showing prompt')
    return
  }

  // Don't show if user recently dismissed
  if (isPromptDismissed()) {
    console.log('User recently dismissed prompt, not showing')
    return
  }

  // Listen for PWA install availability
  const handleInstallAvailable = () => {
    console.log('PWA install prompt available')
    deferredPrompt.value = window.pwaState?.deferredPrompt
    
    // Show the install prompt after a delay
    setTimeout(() => {
      if (deferredPrompt.value && !isPromptDismissed()) {
        showInstallPrompt.value = true
      }
    }, 3000) // Show after 3 seconds
  }

  // Listen for PWA installed
  const handleInstalled = () => {
    console.log('PWA was installed')
    showInstallPrompt.value = false
    deferredPrompt.value = null
  }

  // Add event listeners
  window.addEventListener('pwa-install-available', handleInstallAvailable)
  window.addEventListener('pwa-installed', handleInstalled)

  // Fallback: Show install prompt after 5 seconds if no beforeinstallprompt event
  setTimeout(() => {
    if (!deferredPrompt.value && !isPromptDismissed() && !isAppInstalled()) {
      console.log('Showing fallback install prompt')
      showInstallPrompt.value = true
    }
  }, 5000)

  // Listen for manual install prompt trigger
  window.addEventListener('show-install-prompt', () => {
    console.log('Manual install prompt triggered')
    showInstallPrompt.value = true
  })
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('pwa-install-available', handleInstallAvailable)
  window.removeEventListener('pwa-installed', handleInstalled)
})

const installApp = async () => {
  const prompt = deferredPrompt.value || window.pwaState?.deferredPrompt
  
  if (prompt) {
    try {
      // Use the native install prompt
      prompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await prompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      
      // Clear the deferredPrompt
      deferredPrompt.value = null
      window.pwaState.deferredPrompt = null
      showInstallPrompt.value = false
    } catch (error) {
      console.error('Error showing install prompt:', error)
      showManualInstallInstructions()
    }
  } else {
    // Fallback: Show manual install instructions
    showManualInstallInstructions()
  }
}

const showManualInstallInstructions = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)
  
  let message = ''
  
  if (isIOS) {
    message = 'لتثبيت التطبيق على iOS:\n1. اضغط على زر المشاركة في Safari\n2. اختر "إضافة إلى الشاشة الرئيسية"\n3. اضغط "إضافة"'
  } else if (isAndroid) {
    message = 'لتثبيت التطبيق على Android:\n1. اضغط على القائمة في Chrome\n2. اختر "إضافة إلى الشاشة الرئيسية"\n3. اضغط "إضافة"'
  } else {
    message = 'لتثبيت التطبيق:\n1. ابحث عن أيقونة التثبيت في شريط العنوان\n2. أو استخدم قائمة المتصفح\n3. اختر "تثبيت التطبيق"'
  }
  
  alert(message)
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  // Store dismissal in localStorage to avoid showing again for a while
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}
</script>
