<script setup lang="ts">
import { useSession } from '@/models/session'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import AddWorkoutModal from '@/components/AddWorkoutModal.vue'
import DeleteWorkout from '@/components/DeleteWorkoutModal.vue'
import type { Workout } from '@/models/workout'
import { reactive } from 'vue'
import { useWorkouts } from '@/models/workout'
const session = useSession()
const workouts = useWorkouts()
const modalBooleans = reactive({
  isAddWorkoutModalActive: false as boolean,
  isDeleteWorkoutModalActive: false as boolean
})

function toggle(modal: string) {
  if (modal == 'add') {
    modalBooleans.isAddWorkoutModalActive = !modalBooleans.isAddWorkoutModalActive
  } else {
    modalBooleans.isDeleteWorkoutModalActive = !modalBooleans.isDeleteWorkoutModalActive
  }
}

function submit(form: Workout) {
  console.log({ form })
  workouts.push(form)
}
</script>

<template>
  <div class="columns is-centered" v-if="session.user">
    <div class="column">
      <div class="buttons">
        <button class="button is-info is-fullwidth" @click="toggle('add')">Add Workout</button>
        <AddWorkoutModal
          @toggle="toggle"
          :isModalActive="modalBooleans.isAddWorkoutModalActive"
          @submit="submit"
        />
        <button class="button is-danger is-fullwidth" @click="toggle('delete')">
          Delete Workout
        </button>
        <DeleteWorkout @toggle="toggle" :isModalActive="modalBooleans.isDeleteWorkoutModalActive" />
      </div>
    </div>
    <div class="column is-half is-flex is-flex-direction-column-reverse">
      <template v-for="workout in workouts" :key="workout.userID">
        <WorkoutMedia v-if="workout.userID == session.user.id" :workout="workout" />
      </template>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped></style>
