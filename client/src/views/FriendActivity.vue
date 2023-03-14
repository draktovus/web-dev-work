<script setup lang="ts">
import { useWorkouts } from '@/models/workout'
import WorkoutMedia from '@/components/WorkoutMedia.vue';
const workouts = useWorkouts()
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths is-flex is-flex-direction-column-reverse">
      <template v-for="workout in workouts" :key="workout.userID">
        <WorkoutMedia :workout="workout" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
