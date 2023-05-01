<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/TheFooter.vue'
import GeneralModal from './components/GeneralModal.vue';

</script>

<template>
  <NavBar />
  <div class="container mt-5">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
    
  </div>
  <TheFooter />
</template>

<style scoped>
.container {
  min-height: 82vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
