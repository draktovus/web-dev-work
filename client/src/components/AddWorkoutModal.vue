<script setup lang="ts">
import { reactive } from 'vue'
import type { Workout } from '@/models/workout'
import { useSession } from '@/models/session'

const session = useSession()

defineProps<{
  isModalActive: boolean
}>()

const formInfo = reactive({
  form: {
    userID: session.user?.id,
    content: '',
    title: '',
    date: '',
    duration: 0,
    durationUnit: 'minutes',
    distance: 0,
    distanceUnit: 'Miles',
    location: '',
    picture: '',
    type: ''
  } as Workout
})
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
                <input type="text" class="input" v-model="formInfo.form.title" />
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
                <input type="text" class="input" v-model="formInfo.form.content" />
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
                <input type="date" class="input" v-model="formInfo.form.date" />
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
                <input type="number" class="input" v-model="formInfo.form.distance" />
              </p>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="formInfo.form.distanceUnit">
                    <option value="Miles">Miles</option>
                    <option value="Kilometers">Kilometers</option>
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
                <input type="number" class="input" v-model="formInfo.form.duration" />
              </div>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="formInfo.form.durationUnit">
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
                <input type="text" class="input" v-model="formInfo.form.location" />
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
                <input type="text" class="input" v-model="formInfo.form.picture" />
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
                  <select v-model="formInfo.form.type">
                    <option value="Run">Run</option>
                    <option value="Walk">Walk</option>
                    <option value="Bike">Bike</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('submit', formInfo.form)">
          Save changes
        </button>
        <button class="button" @click="$emit('toggle', 'add')" aria-label="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
