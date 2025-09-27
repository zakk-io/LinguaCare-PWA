<template>
  <nav class="fixed bottom-0 left-0 right-0 z-10 bg-card shadow-lg md:hidden">
    <div class="flex justify-around max-w-screen-sm mx-auto">
      <RouterLink to="/" class="flex flex-col items-center justify-center w-full pt-3 pb-2 text-text-dark hover:text-primary transition-colors duration-200" active-class="text-primary">
        <font-awesome-icon icon="home" class="text-xl" />
        <span class="text-xs font-medium">{{ $t('home') }}</span>
      </RouterLink>
      <RouterLink to="/chat" class="flex flex-col items-center justify-center w-full pt-3 pb-2 text-text-dark hover:text-primary transition-colors duration-200" active-class="text-primary">
        <font-awesome-icon icon="comments" class="text-xl" />
        <span class="text-xs font-medium">{{ $t('chat') }}</span>
      </RouterLink>
      <RouterLink to="/hospitals" class="flex flex-col items-center justify-center w-full pt-3 pb-2 text-text-dark hover:text-primary transition-colors duration-200" active-class="text-primary">
        <font-awesome-icon icon="hospital" class="text-xl" />
        <span class="text-xs font-medium">{{ $t('hospitals') }}</span>
      </RouterLink>
      <RouterLink to="/settings" class="flex flex-col items-center justify-center w-full pt-3 pb-2 text-text-dark hover:text-primary transition-colors duration-200" active-class="text-primary">
        <font-awesome-icon icon="cog" class="text-xl" />
        <span class="text-xs font-medium">{{ $t('settings') }}</span>
      </RouterLink>
      <button @click="showInstallPrompt" class="flex flex-col items-center justify-center w-full pt-3 pb-2 text-text-dark hover:text-primary transition-colors duration-200">
        <font-awesome-icon icon="download" class="text-xl" />
        <span class="text-xs font-medium">{{ $t('installApp.install') }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
// The FontAwesomeIcon component is globally registered, so no need to import it here.

const showInstallPrompt = () => {
  // Trigger the install prompt component
  window.dispatchEvent(new CustomEvent('show-install-prompt'))
}
</script>
