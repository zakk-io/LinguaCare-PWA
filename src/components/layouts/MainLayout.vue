<template>
  <div class="flex h-screen bg-background text-text-light">
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-background pb-16 md:pb-0">
        <div class="container mx-auto px-6 py-8">
          <RouterView />
        </div>
      </main>
      <BottomNav />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideBar from './SideBar.vue'
import BottomNav from './BottomNav.vue'
</script>
