<script setup lang="ts">
import { useWorkouts } from '@/models/workouts'
import { useUsers, getUserFromID } from '@/models/users'
import WorkoutMedia from '@/components/WorkoutMedia.vue';
const workouts = useWorkouts()
const users = useUsers()
console.log({users})
function getUserPhotoFromID(id: number){
  return getUserFromID(id)?.photo;
}

function getUserFullNameFromID(id: number) {
  return getUserFromID(id)?.firstName + ' ' + getUserFromID(id)?.lastName
}

function getUserHandleFromID(id: number) {
  return getUserFromID(id)?.handle
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths is-flex is-flex-direction-column-reverse">
      <template v-for="workout in workouts" :key="workout.userID">
        <WorkoutMedia>
          <template #profilepic>
            <img class="is-rounded" :src="getUserPhotoFromID(workout.userID)" />
          </template>
          <template v-slot:name>
            {{ getUserFullNameFromID(workout.userID) }}
          </template>
          <template #handle>
            {{ getUserHandleFromID(workout.userID) }}
          </template>
          <template #title>
            {{ workout.title }}
          </template>
          <template #content>
            {{ workout.content }}
          </template>
          <template #date>
            {{ workout.date }}
          </template>
          <template #picture>
            <img :src="workout.picture" />
          </template>
          <template #distance>{{ workout.distance }}</template>
          <template #duration> {{ workout.duration }} </template>
        </WorkoutMedia>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
