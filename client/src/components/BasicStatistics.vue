<script setup lang="ts">
import { reactive } from 'vue'
import { todayStatsDistance } from '@/models/workouts';
const data = reactive({
  today: {
    name: 'Today',
    distance: 0.0,
    duration: 0.0,
    pace: '-',
    calories: 0.0
  },
  week: {
    name: 'Week',
    distance: 0.0,
    duration: 0.0,
    pace: '-',
    calories: 0.0
  },
  allTime: {
    name: 'All Time',
    distance: 0.0,
    duration: 0.0,
    pace: '-',
    calories: 0.0
  }
})
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="box"></div>
    </div>
    <div class="column is-half">
      <div v-for="item in data" class="box" :key="item.name">
        <h1 class="title is-4 has-text-centered">{{ item.name }}</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ todayStatsDistance }}</h2>
            <h2 class="subtitle has-text-centered">Distance</h2>
          </div>
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.duration }}</h2>
            <h2 class="subtitle has-text-centered">Duration</h2>
          </div>
          <div class="column is-half">
            <h2 class="title has-text-centered">{{ item.pace }}</h2>
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
