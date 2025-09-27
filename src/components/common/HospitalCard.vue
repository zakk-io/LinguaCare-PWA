<template>
  <div class="bg-card p-4 rounded-lg shadow-lg flex items-center space-x-4">
    <img :src="hospital.photo" alt="Hospital Image" class="w-24 h-24 object-cover rounded-md" v-if="hospital.photo">
    <div class="w-24 h-24 bg-gray-700 rounded-md flex items-center justify-center" v-else>
      <font-awesome-icon icon="hospital" class="text-4xl text-gray-500" />
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-bold text-text-light">{{ hospital.name }}</h3>
      <div class="flex items-center my-2" v-if="hospital.rating">
        <div class="flex items-center text-yellow-400">
          <font-awesome-icon v-for="n in Math.round(hospital.rating)" :key="n" icon="star" />
        </div>
        <span class="text-text-dark ml-2">({{ hospital.rating }})</span>
      </div>
      <div class="flex items-center">
        <span
          v-if="hospital.isOpen !== undefined"
          class="px-2 py-1 text-xs font-semibold rounded-full"
          :class="hospital.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
        >
          {{ hospital.isOpen ? 'Open' : 'Closed' }}
        </span>
        <a :href="`tel:${hospital.phone}`" class="text-primary ml-4 hover:underline" v-if="hospital.phone">{{ hospital.phone }}</a>
      </div>
    </div>
    <a :href="hospital.mapUrl" target="_blank" class="bg-primary text-white p-3 rounded-full hover:bg-primary/80 transition-colors">
      <font-awesome-icon icon="map-marker-alt" />
    </a>
  </div>
</template>

<script setup>
defineProps({
  hospital: {
    type: Object,
    required: true,
  },
})
</script>
