<script setup lang="ts">
import { displayDistanceOfWorkout, getDistanceUnit } from '@/models/measurement'
import { useSession } from '@/models/session'
import { getUser, type User } from '@/models/users'
import type { Workout } from '@/models/workout'
import { ref } from 'vue'
import { calculateWorkoutCalories } from '@/models/statistics'

const session = useSession()
const user = ref<User>({} as User)

const props = defineProps<{
  workout: Workout
  isDeleteActive?: boolean
}>()

const emit = defineEmits<{
  (event: 'delete'): void
}>()

getUser(props.workout.userID).then((res) => {
  user.value = res.data
})
</script>

<template>
  <article class="media box">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" :src="user.photo" alt="placeholder image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong class="mr-2">{{ user.firstName }} {{ user.lastName }}</strong>
        <small class="mr-2">{{ user.handle }}</small>
        <small>
          {{ new Date(workout.date).toISOString().split('T')[0] }}
        </small>
        <br />
        <h6 class="mt-2">{{ workout.title }}</h6>
        <p>
           {{ workout.taggedUsers ? workout.taggedUsers : null }} 
        </p>
        <p>
          {{ workout.content }}
        </p>

        <div class="container">
          <div class="columns is-centered">
            <div class="column is-4">
              <figure class="image">
                <img :src="workout.picture" alt="placeholder image" />
              </figure>
            </div>
          </div>
        </div>

        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Distance</p>
              <p class="title is-4">
                {{ displayDistanceOfWorkout(workout).toFixed(2) }} {{ getDistanceUnit() }}
              </p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Time</p>
              <p class="title is-4">{{ workout.duration }} {{ workout.durationUnit }}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Calories</p>
              <p class="title is-4">{{ calculateWorkoutCalories(workout).toFixed(2) }} kCals</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Type</p>
              <p class="title is-4">
                {{ workout.type }}
              </p>
            </div>
          </div>
        </nav>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <slot name="delete">
        <button
          class="delete"
          v-if="isDeleteActive && session.user && session.user.id == user.id"
          @click="emit('delete')"
        ></button>
      </slot>
    </div>
  </article>
</template>

<style scoped></style>
