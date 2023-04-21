<script setup lang="ts">
import { reactive, ref } from 'vue'

import { useSession, api, addMessage } from '@/models/session'
import { type Workout, getWorkouts, type WorkoutForm } from '@/models/workout'

import { type Biometric, getBiometricById } from '@/models/biometrics'
import { closeModal, confirm, state } from '@/models/generalModals'
import GeneralModal from '@/components/GeneralModal.vue'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import AddWorkoutModal from '@/components/AddWorkoutModal.vue'
import DeleteWorkout from '@/components/DeleteWorkoutModal.vue'

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

function submit(form: WorkoutForm) {
  if (form.picture == '') {
    form.picture = 'https://bulma.io/images/placeholders/600x480.png'
  }
  form.userID = session.user ? session.user.id : -1
  form.date = new Date(form.date)
  // Better way to copy an object
  // https://stackoverflow.com/questions/62847820/how-to-copy-json-object-without-reference-in-vue
  const item: Workout = JSON.parse(JSON.stringify(form))

  api('workouts', item, 'POST')
    .then((res) => {
      console.log(res)
      getWorkouts().then((data) => {
        workouts.value = data.data
      })
      modalBooleans.isAddWorkoutModalActive = false
      addMessage('Workout created successfully.', `${res.isSuccess ? 'success' : 'danger'}`)
    })
    .catch((res) => {
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

function deleteWorkout(workout: Workout) {
  console.log({ workout })
  confirm('Are you sure you want to delete this workout?', 'Delete ' + workout.title)
    .then((x) => {
      api(`workouts/ + ${session.user ? session.user.id : 0}`, workout, 'DELETE')
        .then((x) => {
          const i = workouts.value.findIndex((e) => e._id === workout._id)
          workouts.value.splice(i, 1)
          addMessage('Sucessfully deleted workout', `${x.isSuccess ? 'success' : 'danger'}`)
        })
        .catch((x) => {
          addMessage(
            `Could not delete workout, something went wrong: ${x.data}`,
            `${x.isSuccess ? 'success' : 'danger'}`
          )
        })
      closeModal()
    })
    .catch((x) => {
      closeModal()
    })
}
</script>

<template>
  <GeneralModal>
    <template #footer>
      <button class="button is-danger" @click="state.resolve">Delete</button>
      <button class="button" @click="state.reject">Cancel</button>
    </template>
  </GeneralModal>

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
        <!-- <DeleteWorkout @toggle="toggle" :isModalActive="modalBooleans.isDeleteWorkoutModalActive" /> -->
      </div>
    </div>
    <div class="column is-half is-flex is-flex-direction-column-reverse">
      <template v-for="workout in workouts" :key="workout.userID">
        <WorkoutMedia
          v-if="workout.userID == session.user.id"
          :workout="workout"
          :isDeleteActive="modalBooleans.isDeleteWorkoutModalActive"
          @delete="deleteWorkout(workout)"
        />
      </template>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped></style>
