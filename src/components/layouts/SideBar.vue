<template>
  <aside class="hidden md:flex flex-col w-64 bg-card text-text-light">
    <div class="flex items-center justify-center h-20 shadow-md">
      <h1 class="text-2xl font-bold text-primary">LinguaCare</h1>
    </div>
    <nav class="flex-1 px-4 py-8 space-y-2">
      <RouterLink to="/" class="flex items-center px-4 py-2 text-text-dark hover:bg-gray-700 hover:text-text-light rounded-md transition-colors duration-200" active-class="bg-primary text-white">
        <font-awesome-icon icon="home" class="mr-3" />
        <span>{{ $t('home') }}</span>
      </RouterLink>
      <RouterLink to="/chat" class="flex items-center px-4 py-2 text-text-dark hover:bg-gray-700 hover:text-text-light rounded-md transition-colors duration-200" active-class="bg-primary text-white">
        <font-awesome-icon icon="comments" class="mr-3" />
        <span>{{ $t('chat') }}</span>
      </RouterLink>
      <RouterLink to="/hospitals" class="flex items-center px-4 py-2 text-text-dark hover:bg-gray-700 hover:text-text-light rounded-md transition-colors duration-200" active-class="bg-primary text-white">
        <font-awesome-icon icon="hospital" class="mr-3" />
        <span>{{ $t('hospitals') }}</span>
      </RouterLink>
      <RouterLink to="/settings" class="flex items-center px-4 py-2 text-text-dark hover:bg-gray-700 hover:text-text-light rounded-md transition-colors duration-200" active-class="bg-primary text-white">
        <font-awesome-icon icon="cog" class="mr-3" />
        <span>{{ $t('settings') }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
