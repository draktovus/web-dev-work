<script setup lang="ts">
import { getDistanceUnit, getPaceUnit } from '@/models/measurement'
import { useSession } from '@/models/session'
import { getWorkoutsByUserId } from '@/models/workout'
import { calcStats, useStats, updateWeight } from '@/models/statistics'
import { ref } from 'vue'
import { getBiometricById, type Biometric } from '@/models/biometrics'

const session = useSession()

getWorkoutsByUserId(session.user ? session.user._id : '').then((res) => {
  calcStats(res.data)
})
const stats = useStats()

const biometrics = ref<Biometric>({} as Biometric)
getBiometricById(session.user ? session.user.id : 0)
  .then((res) => {
    if (res.data == null) {
      biometrics.value = {
        userId: 1,
        height: 50,
        heightUnit: 'metric',
        weight: 10,
        weightUnit: 'kg',
        gender: 'male',
        dateOfBirth: '2000-01-01'
      } as Biometric
    } else {
      biometrics.value = res.data
    }
  })
  .catch((err) => {
    console.log(err)
    // placeholder data
    biometrics.value = {
      userId: 1,
      height: 50,
      heightUnit: 'metric',
      weight: 10,
      weightUnit: 'kg',
      gender: 'male',
      dateOfBirth: '2000-01-01'
    } as Biometric
  })
  .finally(() => {
    updateWeight(biometrics.value.weight)
  })
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="box">
        <h1 class="title is-4">Biometrics</h1>
        <p class="content">Height: {{ biometrics.height }} cm</p>
        <p class="content">Weight: {{ biometrics.weight }} kg</p>
        <p class="content">
          Age:
          {{
            new Date().getFullYear() -
            Number(biometrics.dateOfBirth ? biometrics.dateOfBirth.substring(0, 4) : 1990)
          }}
        </p>
        <p class="content">Sex: {{ biometrics.gender }}</p>
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
      <div v-for="(item, index) in stats" class="box">
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
