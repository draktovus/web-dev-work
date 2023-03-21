<script setup lang="ts">
import { measurementSystem, displayDistanceOfWorkout, getDistanceUnit } from '@/models/measurement'
import { getUserFromID } from '@/models/users'
import type { Workout } from '@/models/workout'
import { ref } from 'vue'
defineProps<{
  workout: Workout
}>()
const distance = ref(0)
</script>

<template>
  <article class="media box">
    <figure class="media-left">
      <p class="image is-64x64">
        <img
          class="is-rounded"
          :src="getUserFromID(workout.userID)?.photo"
          alt="placeholder image"
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong class="mr-2"
          >{{ getUserFromID(workout.userID)?.firstName
          }}{{ getUserFromID(workout.userID)?.lastName }}</strong
        >
        <small class="mr-2">{{ getUserFromID(workout.userID)?.handle }}</small>
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
      <button class="delete"></button>
    </div>
  </article>
</template>

<style scoped></style>
