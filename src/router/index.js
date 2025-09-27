import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/layouts/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import HospitalsView from '../views/HospitalsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'chat',
          name: 'chat',
          component: ChatView,
        },
        {
          path: 'hospitals',
          name: 'hospitals',
          component: HospitalsView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
        },
      ]
    }
  ],
})

export default router
