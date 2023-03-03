<script setup lang="ts">
import { useSession } from '@/models/session'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
const session = useSession()
</script>

<template>
  <div class="columns is-centered" v-if="session.user">
    <div class="column">
      <div class="buttons">
        <button class="button is-info is-fullwidth">Add Workout</button>
        <button class="button is-danger is-fullwidth">Delete Workout</button>
      </div>
    </div>
    <div class="column is-half">
      <WorkoutMedia>
        <template v-slot:name> Manuel Reyes </template>
        <template #handle> @TheManuelReyes </template>
        <template #picture>
          <img
            src="https://www.usnews.com/dims4/USNEWS/f5b7039/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F0d%2Fe8642fe073041e9345dd1b9d7807a5%2Fcollege-photo_14230.jpg"
          />
        </template>
        <template #distance> 1.0 miles </template>
        <template #duration> 10:00 s </template>
      </WorkoutMedia>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped></style>
