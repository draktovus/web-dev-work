<script setup lang="ts">
import { measurementSystem, toggleMeasurement } from '@/models/measurement'

let measurement = measurementSystem

function toggle() {
  toggleMeasurement()
}
</script>

<template>
  <div class="navbar-item">
    <div class="button" v-if="measurement == `imperial`" @click="toggle">
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-scale-unbalanced"></i>
        </span>
        <span> Imperial </span>
      </span>
    </div>
    <div class="button" v-else @click="toggle">
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-scale-unbalanced-flip"></i>
        </span>
        <span> Metric </span>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
