<script setup lang="ts">
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import { getWorkouts, type Workout } from '@/models/workout';
import {ref} from 'vue';

const allWorkouts = ref<Workout[]>([])
getWorkouts().then(data => {
  allWorkouts.value = data;
});
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths is-flex is-flex-direction-column-reverse">
      <template v-for="workout in allWorkouts" :key="workout.userID">
        <WorkoutMedia :workout="workout" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
