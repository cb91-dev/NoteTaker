<template>
  <div class="bg-green-50 max-h-full">
    <NavBar/>
    <div class="max-w-screen-lg mx-auto pt-3">
      <RouterView />
    </div>
    <footer class="bg-green-50 py-5"></footer>
  </div>
</template>

<script setup>

import NavBar from './components/layout/NavBar.vue';
import { useStoreAuth } from '@/stores/storeAuth';
import { onMounted } from 'vue';
// Store
const storeAuth = useStoreAuth()

// Mounted
onMounted(() => {
  storeAuth.init()
})
</script>

<style>
    input:focus {
        outline:none !important;
    }
</style>