<script setup lang="ts">
import WorkoutMedia from '@/components/WorkoutMedia.vue'
import { getWorkouts, type Workout } from '@/models/workout'
import { ref } from 'vue'
import { useSession } from '@/models/session'

const session = useSession()
const allWorkouts = ref<Workout[]>([])
getWorkouts().then((data) => {
  allWorkouts.value = data.data
  const val = allWorkouts.value.some((entry) => {
    if (entry.userID != session.user?._id) {
      return true
    } else {
      return false
    }
  })
  console.log('No friends?', val)
  noFriends.value = !val
})

const noFriends = ref(false)
// Get workouts, filter by friends.
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths is-flex is-flex-direction-column-reverse">
      <template v-if="noFriends">
        <p class="content is-size-4">
          Looks like you have no friends, but thats ok! While there is no actual friend request
          system, try making and logging into a new user and adding a workout. Then, logging back
          into this account, you should see it pop up here! Here, everyone is your friend! &#128512;
        </p>
      </template>
      <template v-for="workout in allWorkouts" :key="workout.userID">
        <WorkoutMedia :workout="workout" v-show="workout.userID != session.user?._id" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
