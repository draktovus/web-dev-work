<script setup lang="ts">
import { reactive } from 'vue';
import type { WorkoutForm } from '@/types/types'

defineProps<{
    isModalActive:boolean
}>()
 
const formInfo = reactive({
    form: {
        title: "",
        date: "",
        duration: "",
        location: "",
        picture: "",
        type: ""
    } as WorkoutForm
})
</script>

<template>
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Workout</p>
        <button class="delete" @click="$emit('toggle','add')" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <!-- Title -->
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input type="text" class="input" v-model="formInfo.form.title">
            </div>
        </div>
        <!-- Date -->
        <div class="field">
            <label class="label">Date</label>
            <div class="control">
                <input type="date" class="input" v-model="formInfo.form.date">
            </div>
        </div>
        <!-- Duration -->
        <div class="field">
            <label class="label">Duration</label>
            <div class="control">
                <input type="text" class="input" v-model="formInfo.form.duration">
            </div>
        </div>
        <!-- Location -->
        <div class="field">
            <label class="label">Location</label>
            <div class="control">
                <input type="text" class="input" v-model="formInfo.form.location">
            </div>
        </div>
        <!-- Picture -->
        <div class="field">
            <label class="label">Picture</label>
            <div class="control">
                <input type="text" class="input" v-model="formInfo.form.picture">
            </div>
        </div>
        <!-- Type -->
        <div class="field">
            <label class="label">Type</label>
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('submit', formInfo.form)">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
