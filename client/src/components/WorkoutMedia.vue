<script setup lang="ts">
import { displayDistanceOfWorkout, getDistanceUnit } from '@/models/measurement'
import { useSession } from '@/models/session'
import { getUser, type User } from '@/models/users'
import type { Workout } from '@/models/workout'
import { ref } from 'vue'

const session = useSession()
const user = ref<User>({} as User)

const props = defineProps<{
  workout: Workout,
  isDeleteActive: boolean
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
        <strong class="mr-2">{{ user.firstName }}{{ user.lastName }}</strong>
        <small class="mr-2">{{ user.handle }}</small>
        <small>
          {{ workout.date }}
        </small>
        <br />
        <h6 class="mt-2">{{ workout.title }}</h6>
        <p>
          {{ workout.content }}
        </p>
        <div class="columns">
          <div class="column">
            <figure class="image is-16by9">
              <img :src="workout.picture" alt="placeholder image" />
            </figure>
            <div class="columns">
              <div class="column has-text-centered">
                <h1 class="title is-size-5">
                  {{ displayDistanceOfWorkout(workout) }} {{ getDistanceUnit() }}
                </h1>
              </div>
              <div class="column has-text-centered">
                <h1 class="title is-size-5">{{ workout.duration }} {{ workout.durationUnit }}</h1>
              </div>
            </div>
          </div>
        </div>
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
