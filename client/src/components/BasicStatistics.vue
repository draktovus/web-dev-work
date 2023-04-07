<script setup lang="ts">
import { getDistanceUnit, getPaceUnit } from '@/models/measurement'
import { useSession } from '@/models/session';
import { getWorkoutsByUserId, type Workout } from '@/models/workout';
import { calcStats } from '@/models/statistics'
import { ref } from 'vue';

//const data = useStats()

const data = ref<Workout[]>([])
getWorkoutsByUserId( useSession().user?.id ?? 0 ).then(res => {
  res.data.forEach(w => {
    data.value.push(w)
  })
})
const stats = calcStats(data.value)

</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="box">
        <h1 class="title is-4">Biometrics</h1>
        <p class="content">Height: 160 cm</p>
        <p class="content">Weight: 82 kg</p>
        <p class="content">Age: 21</p>
        <p class="content">Sex: Male</p>
      </div>
      <div class="box">
        <h1 class="title is-4">Insights</h1>
        <p class="content">
          Based on your height, weight, and age...

          <br />
          You should consume CALORIES and be burning CALORIES.
        </p>
      </div>
    </div>
    <div class="column is-half">
      <div v-for="(item, index) in stats" class="box" :key="item.calories">
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
      <div class="box">
        <h1 class="title is-4">Daily Goals</h1>
        <div class="block">
          Distance goal: 10 km
          <progress class="progress is-success mb-0" value="60" max="100">60%</progress>
          <div class="help is-success has-text-centered">you are almost there!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
