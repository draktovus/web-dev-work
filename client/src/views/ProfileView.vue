<script setup lang="ts">
import { useSession, api, addMessage } from '@/models/session'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import AddWorkoutModal from '@/components/AddWorkoutModal.vue'
import DeleteWorkout from '@/components/DeleteWorkoutModal.vue'
import { type Workout, getWorkouts } from '@/models/workout'
import { reactive, ref } from 'vue'
import { type Biometric, getBiometricById } from '@/models/biometrics'

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
  // Better way to copy an object
  // https://stackoverflow.com/questions/62847820/how-to-copy-json-object-without-reference-in-vue
  const item: Workout = JSON.parse(JSON.stringify(form))

  api('workouts', item, 'POST').then((res) => {
    console.log(res)
    getWorkouts().then((data) => {
      workouts.value = data.data
    })
    modalBooleans.isAddWorkoutModalActive = false
    addMessage('Workout created successfully.', `${res.isSuccess ? 'success' : 'danger'}`)
  })
  .catch(res=>{
    console.log(res)
    addMessage('Workout could not be created.', `${res.isSuccess ? 'success' : 'danger'}`)
  })
}

const workouts = ref<Workout[]>([])
getWorkouts().then((data) => {
  workouts.value = data.data
})

const biometrics = ref<Biometric>({} as Biometric)
getBiometricById(session.user ? session.user.id : 0).then((res) => {
  biometrics.value = res.data
})
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
