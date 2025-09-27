import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHome, faComments, faHospital, faCog, faLanguage, faChevronDown, faPaperPlane, faRobot, faUser, faStar, faMapMarkerAlt, faUserDoctor, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHome, faComments, faHospital, faCog, faLanguage, faChevronDown, faPaperPlane, faRobot, faUser, faStar, faMapMarkerAlt, faUserDoctor, faDownload, faTimes)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('GoogleMap', GoogleMap)
app.component('AdvancedMarker', AdvancedMarker)
app.component('font-awesome-icon', FontAwesomeIcon)

// PWA Installation Logic - Let Vite PWA plugin handle service worker registration
// The Vite PWA plugin automatically registers the service worker, so we don't need to do it manually

// Global PWA state management
window.pwaState = {
  deferredPrompt: null,
  isInstalled: false
}

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available')
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later
  window.pwaState.deferredPrompt = e
  
  // Dispatch custom event for InstallPrompt component
  window.dispatchEvent(new CustomEvent('pwa-install-available'))
})

// Track successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully')
  window.pwaState.deferredPrompt = null
  window.pwaState.isInstalled = true
  
  // Clear any dismissal flags since app was installed
  localStorage.removeItem('pwa-install-dismissed')
  
  // Dispatch custom event for InstallPrompt component
  window.dispatchEvent(new CustomEvent('pwa-installed'))
})

app.mount('#app')

