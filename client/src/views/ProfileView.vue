<script setup lang="ts">
import { useSession } from '@/models/session'
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import AddWorkoutModal from '@/components/AddWorkoutModal.vue';
import DeleteWorkout from '@/components/DeleteWorkoutModal.vue';
import type { WorkoutForm } from '@/types/types';
import { reactive } from 'vue';

const session = useSession()
const modalBooleans = reactive({
  isAddWorkoutModalActive:false as boolean,
  isDeleteWorkoutModalActive:false as boolean,
})

function toggle(modal:string){
  if (modal=="add"){
    modalBooleans.isAddWorkoutModalActive=!modalBooleans.isAddWorkoutModalActive
  }else{
    modalBooleans.isDeleteWorkoutModalActive=!modalBooleans.isDeleteWorkoutModalActive
  }
}

function submit(form:WorkoutForm){
  console.log({form})
}
</script>

<template>
  <div class="columns is-centered" v-if="session.user">
    <div class="column">
      <div class="buttons">
        <button class="button is-info is-fullwidth" @click="toggle('add')">Add Workout</button>
        <AddWorkoutModal @toggle="toggle" :isModalActive="modalBooleans.isAddWorkoutModalActive" @submit="submit"/>
        <button class="button is-danger is-fullwidth" @click="toggle('delete')">Delete Workout</button>
        <DeleteWorkout @toggle="toggle" :isModalActive="modalBooleans.isDeleteWorkoutModalActive" />
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
