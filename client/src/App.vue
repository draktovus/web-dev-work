<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <NavBar />
  <div class="section">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </div>
  <TheFooter />
</template>

<style scoped>
.container,
.section {
  min-height: 75vh;
}
</style>
