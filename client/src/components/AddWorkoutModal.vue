<script setup lang="ts">
import { reactive } from 'vue'
import type { WorkoutForm } from '@/models/workout'
import { useSession } from '@/models/session'

const session = useSession()

defineProps<{
  isModalActive: boolean
}>()

/*
_id?: string | undefined;
    userID: number;
    title: string;
    content: string;
    picture: string;
    distance: number;
    distanceUnit: "miles" | 'kilometers';
    duration: number;
    durationUnit: 'minutes' | 'hours' | 'seconds';
    location: string;
    date: string;
    type: 'run' | 'walk' | 'cardio' | 'bike' | 'strength';
*/
const formInfo = reactive<WorkoutForm>({
  userID: session.user ? session.user.id : -1,
  title: '',
  content: '',
  picture: '',
  distance: 0,
  distanceUnit: 'miles',
  duration: 0,
  durationUnit: 'minutes',
  location: '',
  date: '',
  type: 'run',
} as WorkoutForm)

/**reactive({
  form: {
    userID: session.user?.id,
    content: '' as string,
    title: '' as string,
    date: '',
    duration: 0 as number,
    durationUnit: 'minutes' as 'minutes' | 'hours' | 'seconds',
    distance: 0 as number,
    distanceUnit: 'miles' as 'miles' | 'kilometers',
    location: '' as string,
    picture: '' as string,
    type: '' as string
  } as Workout
})*/
</script>

<template>
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Workout</p>
        <button class="delete" @click="$emit('toggle', 'add')" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <!-- Title -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Title</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input type="text" class="input" v-model="formInfo.title" />
              </div>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Content</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input type="text" class="input" v-model="formInfo.content" />
              </div>
            </div>
          </div>
        </div>
        <!-- Date -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Date</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input type="date" class="input" v-model="formInfo.date" />
              </div>
            </div>
          </div>
        </div>
        <!-- Distance -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Distance</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input type="number" class="input" v-model="formInfo.distance" />
              </p>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="formInfo.distanceUnit">
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Duration -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Duration</label>
          </div>
          <div class="field-body">
            <div class="field is-expanded">
              <div class="control">
                <input type="number" class="input" v-model="formInfo.duration" />
              </div>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="formInfo.durationUnit">
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Location -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Location</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" v-model="formInfo.location" />
              </div>
            </div>
          </div>
        </div>
        <!-- Picture -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Picture</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" class="input" v-model="formInfo.picture" />
              </div>
            </div>
          </div>
        </div>
        <!-- Type -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Type</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="formInfo.type">
                    <option value="run">Run</option>
                    <option value="walk">Walk</option>
                    <option value="bike">Bike</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('submit', formInfo)">Save changes</button>
        <button class="button" @click="$emit('toggle', 'add')" aria-label="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
