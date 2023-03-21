<script setup lang="ts">
import { getDistanceUnit, getPaceUnit } from '@/models/measurement'
import { useStats } from '@/models/workouts'
const data = useStats()
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="box is-primary is-outlined">
        <h1 class="title is-4">Biometrics</h1>
        <p class="content">Height: 160 cm</p>
        <p class="content">Weight: 82 kg</p>
        <p class="content">Age: 21</p>
        <p class="content">Sex: Male</p>
      </div>
    </div>
    <div class="column is-half">
      <div v-for="(item, index) in data" class="box" :key="item.distance">
        <h1 class="title is-4 has-text-centered">{{ index }}</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.distance }} {{ getDistanceUnit() }}</h2>
            <h2 class="subtitle has-text-centered">Distance</h2>
          </div>
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.duration }}</h2>
            <h2 class="subtitle has-text-centered">Duration</h2>
          </div>
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.pace }} {{ getPaceUnit() }}</h2>
            <h2 class="subtitle has-text-centered">Avg Pace</h2>
          </div>
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.calories }}</h2>
            <h2 class="subtitle has-text-centered">Calories</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-one-quarter">
      <div class="box"></div>
    </div>
  </div>
</template>

<style scoped></style>
