<template>
  <div>
    <h1 class="text-3xl font-bold text-text-light mb-8">{{ $t('dashboard') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <RouterLink to="/chat" class="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition-shadow duration-300 flex items-center space-x-4">
        <font-awesome-icon icon="comments" class="text-4xl text-primary" />
        <div>
          <h2 class="text-xl font-bold text-text-light">{{ $t('ai_chatbot') }}</h2>
          <p class="text-text-dark">{{ $t('get_support') }}</p>
        </div>
      </RouterLink>

      <RouterLink to="/hospitals" class="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition-shadow duration-300 flex items-center space-x-4">
        <font-awesome-icon icon="hospital" class="text-4xl text-primary" />
        <div>
          <h2 class="text-xl font-bold text-text-light">{{ $t('find_hospitals') }}</h2>
          <p class="text-text-dark">{{ $t('nearby_hospitals') }}</p>
        </div>
      </RouterLink>

      <RouterLink to="/settings" class="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition-shadow duration-300 flex items-center space-x-4">
        <font-awesome-icon icon="cog" class="text-4xl text-primary" />
        <div>
          <h2 class="text-xl font-bold text-text-light">{{ $t('settings') }}</h2>
          <p class="text-text-dark">{{ $t('configure_preferences') }}</p>
        </div>
      </RouterLink>

      <RouterLink to="/settings" class="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition-shadow duration-300 flex items-center space-x-4">
        <font-awesome-icon icon="language" class="text-4xl text-primary" />
        <div>
          <h2 class="text-xl font-bold text-text-light">{{ $t('language') }}</h2>
          <p class="text-text-dark">{{ $t('set_language') }}</p>
        </div>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
