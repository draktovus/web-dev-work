<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import TheFooter from './components/TheFooter.vue'

</script>

<template>
  <NavBar />
  <div class="section mt-5">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </div>
  <TheFooter />
</template>

<style scoped>
.container {
  min-height: 82vh;
}
</style>
