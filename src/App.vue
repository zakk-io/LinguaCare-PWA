<script setup>
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from 'vue-i18n'
import InstallPrompt from '@/components/common/InstallPrompt.vue'

const settingsStore = useSettingsStore()
const { locale } = useI18n()

onMounted(() => {
  settingsStore.initialize().then(() => {
    locale.value = settingsStore.language
  })
})

watch(() => settingsStore.language, (newLanguage) => {
  locale.value = newLanguage
})
</script>

<template>
  <RouterView />
  <InstallPrompt />
</template>
