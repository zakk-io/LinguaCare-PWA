<template>
  <div>
    <h1 class="text-3xl font-bold text-text-light mb-8">{{ $t('hospitals') }}</h1>
    
    <div class="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
      <GoogleMap
        :api-key="apiKey"
        :center="center"
        :zoom="12"
        style="width: 100%; height: 100%"
      >
        <AdvancedMarker v-for="hospital in hospitals" :key="hospital.id" :position="{ lat: hospital.lat, lng: hospital.lng }" :title="hospital.name" />
      </GoogleMap>
    </div>

    <div class="space-y-4">
      <div v-if="loading" class="text-center text-text-dark">Loading hospitals...</div>
      <HospitalCard v-for="hospital in hospitals" :key="hospital.id" :hospital="hospital" />
      <div v-if="!loading && hospitals.length === 0" class="text-center text-text-dark">
        Could not fetch hospital data. The public CORS proxy may be down.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
import { getNearbyHospitals } from '@/services/googleMaps'
import HospitalCard from '@/components/common/HospitalCard.vue'

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
const center = { lat: -1.9441, lng: 30.0619 } // Kigali

const hospitals = ref([])
const loading = ref(true)

onMounted(async () => {
  hospitals.value = await getNearbyHospitals()
  loading.value = false
})
</script>
