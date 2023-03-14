<script setup lang="ts">
import { useSession } from '@/models/session'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import AddWorkoutModal from '@/components/AddWorkoutModal.vue'
import DeleteWorkout from '@/components/DeleteWorkoutModal.vue'
import type { Workout } from '@/models/workout'
import { reactive, unref } from 'vue'
import { useUserWorkouts, workouts } from '@/models/workouts'

const session = useSession()
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
  if (form.picture == '') {
    form.picture = 'https://bulma.io/images/placeholders/600x480.png'
  }
  /**
    {
        "userID": 1,
        "title": "hooray!",
        "content": "yes sir",
        "picture": "https://www.usnews.com/dims4/USNEWS/f5b7039/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F0d%2Fe8642fe073041e9345dd1b9d7807a5%2Fcollege-photo_14230.jpg",
        "distance": "10 miles",
        "duration": "15 minutes",
        "distanceUnit": "miles",
        "date": "03-07-2023",
        "type": "Cardio"
    }
*/
  let item: Workout = {
    userID: form.userID,
    title: form.title,
    content: form.content,
    picture: form.picture,
    distance: form.distance,
    duration: form.duration,
    distanceUnit: form.distanceUnit,
    date: form.date,
    type: form.type,
    location: form.location
  }

  const uWorkouts = useUserWorkouts()
  uWorkouts.value.push(unref(item))
  workouts.push(unref(item))
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
